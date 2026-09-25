import { $, bindActs } from '../dom.js';
import { S, lessonsDone, lessonUnlocked, courseComplete } from '../../engine/state.js';
import { checkpointId, unitComplete, checkpointItems, challengeSpots, challengeItems, sampleItems, CHALLENGE_SECONDS_PER_ITEM } from '../../engine/learning.js';
import { COURSES } from '../../content/index.js';
import { areaForCourse } from '../../content/areas.js';
import { go, sheet } from '../router.js';
import { renderHome, lockedCourse } from './home.js';
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
  const spots = c.units.flatMap(u => challengeSpots(u));
  const crowns = spots.filter(sp => S.challenges[sp.id]?.perfect).length, beaten = spots.filter(sp => S.challenges[sp.id]?.passed).length;
  const html = c.units.map(u => {
    const completed = unitComplete(u, S.done), count = u.lessons.filter(l => S.done[l.id]).length;
    const current = next && u.lessons.includes(next);
    const score = S.checkpoints[checkpointId(u)];
    return `<details class="learning-unit ${completed ? 'complete' : ''}" ${current ? 'open' : ''}>
      <summary><span class="unit-index">${completed ? '✓' : u.idx + 1}</span><span class="unit-summary"><span class="eyebrow">ETAPA ${u.idx + 1}</span><strong>${u.t}</strong><span class="muted small">${count} de ${u.lessons.length} lições concluídas</span></span><span class="unit-expand" aria-hidden="true">⌄</span></summary>
      ${jumpHtml(c, u)}
      <div class="lesson-roadmap">${u.lessons.map((l, li) => {
        const done = !!S.done[l.id], unlocked = lessonUnlocked(l), active = l === next;
        return `<button class="lesson-row ${done ? 'completed' : ''} ${active ? 'current' : ''} ${unlocked ? '' : 'locked'}" data-act="lesson" data-i="${l.idx}">
          <span class="lesson-marker" aria-hidden="true">${done ? '✓' : unlocked ? l.idx + 1 : '🔒'}</span>
          <span class="lesson-description"><strong>${l.title}</strong><span>${l.optional ? 'Oficina complementar · ' : ''}≈ ${l.minutes} min · ${l.ex.length} exercícios</span></span>
          <span class="lesson-state">${done ? 'Revisar' : active ? 'Começar →' : unlocked ? 'Abrir →' : 'Bloqueada'}</span></button>` + challengeRow(u, li);
      }).join('')}</div>
      <button class="checkpoint-card ${score?.passed ? 'passed' : ''}" data-act="checkpoint" data-u="${u.idx}">
        <span class="checkpoint-icon" aria-hidden="true">${score?.passed ? '✓' : '⚑'}</span><span><strong>Selo da etapa</strong><span class="small">${completed ? 'Até 6 questões misturadas · sem perder corações' : 'Conclua as lições desta etapa para liberar'}${score ? ' · Melhor: ' + score.best + '%' : ''}</span></span><span aria-hidden="true">→</span>
      </button></details>`;
  }).join('');
  const area = areaForCourse(c.id);
  const areaPosition = area?.courseIds.indexOf(c.id) + 1 || 1;
  $('#s-path').innerHTML = `<div class="path-top"><button class="icon-btn" data-act="back" aria-label="Voltar às trilhas">←</button><div><div class="pk">Trilha ${areaPosition} de ${area?.courseIds.length || COURSES.length} · ${area?.title || 'Contabilidade'}</div><h1>${c.title}</h1></div></div>
    <div class="course-overview"><div class="eyebrow">UM PASSO DE CADA VEZ</div><p>${c.desc}</p><ul class="course-goals">${c.goals.map(g => '<li>'+g+'</li>').join('')}</ul>
      <div class="course-metrics"><span><b>${requiredDone}/${required.length}</b> lições essenciais</span><span><b>${challengesDone}/${c.units.length}</b> selos</span>${spots.length ? '<span><b>'+beaten+'/'+spots.length+'</b> desafios · 👑 '+crowns+'</span>' : ''}<span><b>${n}</b> lições no total</span></div>
      <div class="progress-track" role="progressbar" aria-label="Lições essenciais concluídas" aria-valuemin="0" aria-valuemax="${required.length}" aria-valuenow="${requiredDone}"><div class="progress-fill" style="width:${requiredDone/required.length*100}%"></div></div>
      ${next ? '<button class="btn primary" data-act="resume">Continuar: '+next.title+' →</button>' : d === n ? '<p class="small">Todas as lições concluídas. Retome uma etapa para reforçar o que aprendeu.</p>' : '<p class="small">🔒 Esta trilha ainda está bloqueada.</p><button class="btn ghost" data-act="unlock">Como liberar esta trilha</button>'}
    </div><div class="curriculum-heading"><h2>Seu caminho</h2><p>Aprenda, pratique e confira o que ficou. Os desafios ⚡ no caminho são opcionais e difíceis: sem dicas, com tempo e só 3 corações.</p></div>
    <div class="learning-units">${html}</div><div class="course-finale"><span class="eyebrow">CONCLUSÃO DA TRILHA</span><h2>${S.trophies[c.id] ? 'Troféu conquistado' : 'Teste final'}</h2><p>10 questões para reunir os conhecimentos das lições essenciais.</p><button class="btn ${courseComplete(c) ? 'primary' : 'ghost'}" data-act="final">${S.trophies[c.id] ? 'Refazer o teste' : courseComplete(c) ? 'Fazer teste final' : 'Como liberar o teste?'}</button></div>`;
  bindActs($('#s-path'), {
    back: () => { renderHome(); go('home'); }, resume: () => openLesson(next), unlock: () => lockedCourse(c),
    lesson: b => lessonSheet(c.lessons[+b.dataset.i]),
    checkpoint: b => checkpointSheet(c, c.units[+b.dataset.u]), final: () => finalSheet(c),
    challenge: b => challengeSheet(c, c.units[+b.dataset.u], +b.dataset.after),
    jump: b => jumpSheet(c, c.units[+b.dataset.u])
  });
}

function challengeRow(u, li){
  const spot = challengeSpots(u).find(sp => sp.after === li);
  if (!spot) return '';
  const rec = S.challenges[spot.id], ready = spot.lessons.every(l => S.done[l.id]);
  const icon = rec?.perfect ? '👑' : rec?.passed ? '✓' : ready ? '⚡' : '🔒';
  const note = rec?.perfect ? 'Lendário: coroa conquistada' : rec?.passed ? 'Vencido · falta a coroa (zero erros)' : ready ? 'Opcional · difícil · sem dicas · com tempo' : 'Conclua as lições acima para liberar';
  return '<button class="challenge-row ' + (rec?.perfect ? 'crown' : rec?.passed ? 'won' : ready ? 'ready' : 'locked') + '" data-act="challenge" data-u="' + u.idx + '" data-after="' + li + '">' +
    '<span class="challenge-marker" aria-hidden="true"><i>' + icon + '</i></span><span class="lesson-description"><strong>Desafio ' + (rec?.perfect ? 'lendário' : 'relâmpago') + '</strong><span>' + note + '</span></span><span class="lesson-state">' + (ready ? (rec ? 'Refazer →' : 'Encarar →') : 'Bloqueado') + '</span></button>';
}

export function challengeSheet(c, u, after){
  const spot = challengeSpots(u).find(sp => sp.after === after); if (!spot) return;
  const rec = S.challenges[spot.id], ready = spot.lessons.every(l => S.done[l.id]);
  const items = challengeItems(spot.lessons), secs = items.length * CHALLENGE_SECONDS_PER_ITEM;
  const h = '<div class="sh-i" aria-hidden="true">' + (rec?.perfect ? '👑' : '⚡') + '</div><h3>Desafio relâmpago</h3><p class="sh-s">' + items.length + ' questões das lições “' + spot.lessons[0].title + '” até “' + spot.lessons.at(-1).title + '”.</p>' +
    '<ul class="challenge-rules"><li>❤️ Só 3 corações</li><li>🚫 Sem dicas</li><li>⏱ ' + Math.floor(secs / 60) + ':' + String(secs % 60).padStart(2, '0') + ' no total</li><li>👑 Zero erros = coroa lendária</li></ul>' +
    (rec ? '<p class="small">' + (rec.perfect ? 'Você já tem a coroa deste desafio.' : 'Já vencido. Falta a coroa.') + ' Tentativas: ' + rec.attempts + '</p>' : '<p class="small">Opcional: não bloqueia a trilha. Recompensa: XP extra e bolotas.</p>');
  if (!ready) return sheet(h + '<p class="sh-s">Conclua as lições acima para liberar este desafio.</p><button class="btn ghost" data-s="x">Entendi</button>', {});
  sheet(h + '<button class="btn primary" data-s="go">Aceitar o desafio</button><button class="btn ghost" data-s="x">Agora não</button>', {
    go: () => startSession({ kind:'challenge', course:c, unit:u, challengeId:spot.id, items, hearts:3, noHints:true, timeLimit:secs })
  });
}

function skippable(c, u){
  if (u.idx === 0 || u.lessons.some(l => l.optional) || lessonUnlocked(u.lessons[0])) return null;
  const skip = c.units.filter(x => x.idx < u.idx && !x.lessons.some(l => l.optional)).flatMap(x => x.lessons).filter(l => !S.done[l.id]);
  return skip.length ? skip : null;
}
function jumpHtml(c, u){
  return skippable(c, u) ? '<button class="jump-card" data-act="jump" data-u="' + u.idx + '"><span aria-hidden="true">⏩</span><span><strong>Já sabe isso? Pule para cá</strong><span>Teste com 10 questões das etapas anteriores</span></span></button>' : '';
}
export function jumpSheet(c, u){
  const skip = skippable(c, u); if (!skip) return;
  const pool = c.units.filter(x => x.idx < u.idx && !x.lessons.some(l => l.optional)).flatMap(x => x.lessons);
  sheet('<div class="sh-i" aria-hidden="true">⏩</div><h3>Pular para “' + u.t + '”</h3><p class="sh-s">10 questões das etapas anteriores, com 3 corações e sem dicas. Passando, ' + skip.length + ' lições ficam concluídas e você começa direto nesta etapa.</p>' +
    '<button class="btn primary" data-s="go">Fazer o teste</button><button class="btn ghost" data-s="x">Agora não</button>', {
    go: () => startSession({ kind:'jump', course:c, skipLessons:skip, items:sampleItems(pool, 10), hearts:3, noHints:true })
  });
}

export function checkpointSheet(c, u){
  const ready = unitComplete(u, S.done), record = S.checkpoints[checkpointId(u)];
  const h = '<div class="eyebrow">SELO DA ETAPA</div><h3>'+u.t+'</h3><p class="sh-s">Misture os assuntos desta etapa. Acerte pelo menos 80% de primeira, sem dicas, para conquistar o selo. Questões erradas voltam com explicação, sem limite de tentativas.</p>' + (record ? '<p class="small">Melhor resultado: '+record.best+'% · '+record.attempts+(record.attempts === 1 ? ' tentativa' : ' tentativas')+'</p>' : '');
  if (!ready) return sheet(h+'<p class="sh-s">Conclua as lições desta etapa para liberar o desafio.</p><button class="btn ghost" data-s="x">Voltar à etapa</button>', {});
  sheet(h+'<button class="btn primary" data-s="start">Começar desafio</button><button class="btn ghost" data-s="x">Agora não</button>', {
    start: () => startSession({kind:'checkpoint',course:c,unit:u,checkpointId:checkpointId(u),items:checkpointItems(u),hearts:99})
  });
}

export function lessonSheet(l){
  const done = !!S.done[l.id], un = lessonUnlocked(l);
  const h = '<div class="eyebrow">'+(l.optional ? 'OFICINA COMPLEMENTAR' : 'LIÇÃO '+(l.idx+1))+'</div><h3>'+l.title+'</h3><p class="sh-s">'+(l.goal || 'Você vai ver: '+l.learn.map(c => c.h).join(' · ')+'.')+'</p><p class="lesson-facts">≈ '+l.minutes+' min · '+l.learn.length+' partes · '+l.ex.length+' exercícios</p>';
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
