import { $, bindActs } from '../dom.js';
import { S, lessonsDone, lessonUnlocked, courseComplete } from '../../engine/state.js';
import { checkpointId, unitComplete, checkpointItems } from '../../engine/learning.js';
import { COURSES } from '../../content/index.js';
import { areaForCourse } from '../../content/areas.js';
import { go, sheet } from '../router.js';
import { renderHome } from './home.js';
import { openLesson, startLearn } from './learn.js';
import { startLessonQuiz, startFinal, startSession } from './quiz.js';

export let PATHC = null;
export function openPath(c){ PATHC = c; renderPath(); go('path'); }

export function renderPath(){
  const c = PATHC, d = lessonsDone(c), n = c.lessons.length;
  const next = c.lessons.find(l => !S.done[l.id] && lessonUnlocked(l));
  const required = c.lessons.filter(l => !l.optional);
  const requiredDone = required.filter(l => S.done[l.id]).length;
  const challengesDone = c.units.filter(u => S.checkpoints[checkpointId(u)]?.passed).length;
  const html = c.units.map(u => {
    const completed = unitComplete(u, S.done), count = u.lessons.filter(l => S.done[l.id]).length;
    const current = next && u.lessons.includes(next);
    const score = S.checkpoints[checkpointId(u)];
    return `<details class="learning-unit ${completed ? 'complete' : ''}" ${current ? 'open' : ''}>
      <summary><span class="unit-index">${completed ? '✓' : u.idx + 1}</span><span class="unit-summary"><span class="eyebrow">ETAPA ${u.idx + 1}</span><strong>${u.t}</strong><span class="muted small">${count} de ${u.lessons.length} lições concluídas</span></span><span class="unit-expand" aria-hidden="true">⌄</span></summary>
      <div class="lesson-roadmap">${u.lessons.map(l => {
        const done = !!S.done[l.id], unlocked = lessonUnlocked(l), active = l === next;
        return `<button class="lesson-row ${done ? 'completed' : ''} ${active ? 'current' : ''} ${unlocked ? '' : 'locked'}" data-act="lesson" data-i="${l.idx}">
          <span class="lesson-marker" aria-hidden="true">${done ? '✓' : unlocked ? l.idx + 1 : '🔒'}</span>
          <span class="lesson-description"><strong>${l.title}</strong><span>${l.optional ? 'Oficina complementar · ' : ''}≈ ${l.minutes} min · ${l.ex.length} exercícios</span></span>
          <span class="lesson-state">${done ? 'Revisar' : active ? 'Começar →' : unlocked ? 'Abrir →' : 'Bloqueada'}</span></button>`;
      }).join('')}</div>
      <button class="checkpoint-card ${score?.passed ? 'passed' : ''}" data-act="checkpoint" data-u="${u.idx}">
        <span class="checkpoint-icon" aria-hidden="true">${score?.passed ? '✓' : '⚑'}</span><span><strong>Desafio da etapa</strong><span class="small">${completed ? 'Até 6 questões misturadas · sem perder corações' : 'Conclua as lições desta etapa para liberar'}${score ? ' · Melhor: ' + score.best + '%' : ''}</span></span><span aria-hidden="true">→</span>
      </button></details>`;
  }).join('');
  const area = areaForCourse(c.id);
  const areaPosition = area?.courseIds.indexOf(c.id) + 1 || 1;
  $('#s-path').innerHTML = `<div class="path-top"><button class="icon-btn" data-act="back" aria-label="Voltar às trilhas">←</button><div><div class="pk">Trilha ${areaPosition} de ${area?.courseIds.length || COURSES.length} · ${area?.title || 'Contabilidade'}</div><h1>${c.title}</h1></div></div>
    <div class="course-overview"><div class="eyebrow">UM PASSO DE CADA VEZ</div><p>${c.desc}</p><ul class="course-goals">${c.goals.map(g => '<li>'+g+'</li>').join('')}</ul>
      <div class="course-metrics"><span><b>${requiredDone}/${required.length}</b> lições essenciais</span><span><b>${challengesDone}/${c.units.length}</b> desafios</span><span><b>${n}</b> lições no total</span></div>
      <div class="progress-track" role="progressbar" aria-label="Lições essenciais concluídas" aria-valuemin="0" aria-valuemax="${required.length}" aria-valuenow="${requiredDone}"><div class="progress-fill" style="width:${requiredDone/required.length*100}%"></div></div>
      ${next ? '<button class="btn primary" data-act="resume">Continuar: '+next.title+' →</button>' : '<p class="small">Todas as lições concluídas. Retome uma etapa para reforçar o que aprendeu.</p>'}
    </div><div class="curriculum-heading"><h2>Seu caminho</h2><p>Aprenda, pratique e confira o que ficou. As oficinas e os desafios são complementares.</p></div>
    <div class="learning-units">${html}</div><div class="course-finale"><span class="eyebrow">CONCLUSÃO DA TRILHA</span><h2>${S.trophies[c.id] ? 'Troféu conquistado' : 'Teste final'}</h2><p>10 questões para reunir os conhecimentos das lições essenciais.</p><button class="btn ${courseComplete(c) ? 'primary' : 'ghost'}" data-act="final">${S.trophies[c.id] ? 'Refazer o teste' : courseComplete(c) ? 'Fazer teste final' : 'Como liberar o teste?'}</button></div>`;
  bindActs($('#s-path'), {
    back: () => { renderHome(); go('home'); }, resume: () => openLesson(next),
    lesson: b => lessonSheet(c.lessons[+b.dataset.i]),
    checkpoint: b => checkpointSheet(c, c.units[+b.dataset.u]), final: () => finalSheet(c)
  });
}

export function checkpointSheet(c, u){
  const ready = unitComplete(u, S.done), record = S.checkpoints[checkpointId(u)];
  const h = '<div class="eyebrow">DESAFIO DA ETAPA</div><h3>'+u.t+'</h3><p class="sh-s">Misture os assuntos desta etapa. Acerte pelo menos 80% de primeira, sem dicas, para conquistar o selo. Questões erradas voltam com explicação, sem limite de tentativas.</p>' + (record ? '<p class="small">Melhor resultado: '+record.best+'% · '+record.attempts+' tentativa(s)</p>' : '');
  if (!ready) return sheet(h+'<p class="sh-s">Conclua as lições desta etapa para liberar o desafio.</p><button class="btn ghost" data-s="x">Voltar à etapa</button>', {});
  sheet(h+'<button class="btn primary" data-s="start">Começar desafio</button><button class="btn ghost" data-s="x">Agora não</button>', {
    start: () => startSession({kind:'checkpoint',course:c,unit:u,checkpointId:checkpointId(u),items:checkpointItems(u),hearts:99})
  });
}

export function lessonSheet(l){
  const done = !!S.done[l.id], un = lessonUnlocked(l);
  const h = '<div class="eyebrow">'+(l.optional ? 'OFICINA COMPLEMENTAR' : 'LIÇÃO '+(l.idx+1))+'</div><h3>'+l.title+'</h3><p class="sh-s">'+l.goal+'</p><p class="lesson-facts">≈ '+l.minutes+' min · '+l.learn.length+' partes · '+l.ex.length+' exercícios</p>';
  if (!un) return sheet(h+'<p class="sh-s">Conclua a lição anterior para liberar esta.</p><button class="btn ghost" data-s="x">Entendi</button>',{});
  if (!done) return sheet(h+'<button class="btn primary" data-s="go">Começar lição</button><button class="btn ghost" data-s="x">Agora não</button>',{go:()=>openLesson(l)});
  sheet(h+'<button class="btn primary" data-s="pr">Praticar de novo</button><button class="btn ghost" data-s="th">Rever a teoria</button>',{pr:()=>startLessonQuiz(l),th:()=>startLearn(l,'review')});
}
export function finalSheet(c){
  const ok = courseComplete(c), tro = !!S.trophies[c.id];
  const h = '<div class="sh-i">'+(tro ? '🏆' : '🏁')+'</div><h3>Teste final: '+c.title+'</h3><p class="sh-s">10 questões das lições essenciais e 3 corações. As oficinas não são obrigatórias para liberar o teste. Passe para ganhar o troféu, XP e bolotas.</p>';
  if (!ok) return sheet(h+'<p class="sh-s">Conclua as lições essenciais desta trilha para liberar.</p><button class="btn ghost" data-s="x">Entendi</button>',{});
  sheet(h+'<button class="btn primary" data-s="go">'+(tro ? 'Refazer o teste' : 'Fazer o teste')+'</button><button class="btn ghost" data-s="x">Agora não</button>',{go:()=>startFinal(c)});
}
