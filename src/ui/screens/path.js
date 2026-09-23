import { $, bindActs } from '../dom.js';
import { S, lessonsDone, lessonUnlocked, courseComplete } from '../../engine/state.js';
import { COURSES } from '../../content/index.js';
import { go, sheet } from '../router.js';
import { renderHome } from './home.js';
import { openLesson, startLearn } from './learn.js';
import { startLessonQuiz, startFinal } from './quiz.js';

export let PATHC = null;
export function openPath(c){ PATHC = c; renderPath(); go('path'); }

export function renderPath(){
  const c = PATHC, d = lessonsDone(c), n = c.lessons.length, s = $('#s-path');
  let curFound = false, html = '';
  c.units.forEach(u => {
    html += '<div class="unit-head" style="--cc:' + c.color + '"><span>' + u.t + '</span></div>';
    u.lessons.forEach(l => {
      const i = l.idx, done = !!S.done[l.id], un = lessonUnlocked(l);
      let st = done ? 'done' : (un ? 'cur' : 'locked');
      const isCur = st === 'cur' && !curFound; if (isCur) curFound = true;
      const off = Math.round(Math.sin(i * 1.1) * 66);
      html += '<div class="nwrap' + (isCur ? ' is-cur' : '') + '" style="transform:translateX(' + off + 'px)">' + (isCur ? '<div class="bubble">Começar</div>' : '') +
        '<button class="node ' + st + '" data-act="l" data-i="' + i + '" aria-label="' + l.title + '">' + (done ? '✓' : (un ? l.icon : '🔒')) + '</button><div class="ntitle">' + l.title + '</div></div>';
    });
  });
  const allDone = d === n, tro = !!S.trophies[c.id];
  html += '<div class="nwrap' + (allDone && !tro ? ' is-cur' : '') + '">' + (allDone && !tro ? '<div class="bubble">Teste final</div>' : '') +
    '<button class="node final ' + (tro ? 'trophy' : (allDone ? 'cur' : 'locked')) + '" data-act="fin" aria-label="Teste final">' + (tro ? '🏆' : (allDone ? '🏁' : '🔒')) + '</button><div class="ntitle">Teste final</div></div>';
  s.innerHTML = '<div class="path-top"><button class="icon-btn" data-act="back" aria-label="Voltar">←</button><div><div class="pk">Trilha ' + (c.idx + 1) + ' de ' + COURSES.length + '</div><h2>' + c.icon + ' ' + c.title + '</h2></div></div>' +
    '<div class="banner" style="--cc:' + c.color + '"><p>' + c.desc + '</p><div class="progress-track"><div class="progress-fill" style="width:' + (d / n * 100) + '%"></div></div><div class="bm">' + d + ' de ' + n + ' lições concluídas' + (tro ? ', troféu conquistado' : '') + '</div></div>' +
    '<div class="path" style="--cc:' + c.color + '">' + html + '</div>';
  bindActs(s, {
    back: () => { renderHome(); go('home'); },
    l: b => lessonSheet(c.lessons[+b.dataset.i]),
    fin: () => finalSheet(c)
  });
}
export function lessonSheet(l){
  const done = !!S.done[l.id], un = lessonUnlocked(l);
  let h = '<div class="sh-i">' + l.icon + '</div><h3>' + l.title + '</h3><p class="sh-s">Lição ' + (l.idx + 1) + ' de ' + l.course.lessons.length + ': ' + l.learn.length + ' cartões de teoria e ' + l.ex.length + ' exercícios.' + (S.perfect[l.id] ? ' Você já fez esta lição sem erros. 💯' : '') + '</p>';
  if (!un) return sheet(h + '<p class="sh-s">Conclua a lição anterior para liberar esta.</p><button class="btn ghost" data-s="x">Entendi</button>', {});
  if (!done) return sheet(h + '<button class="btn primary" data-s="go">Começar lição</button><button class="btn ghost" data-s="x">Agora não</button>', { go: () => openLesson(l) });
  sheet(h + '<button class="btn primary" data-s="pr">Praticar de novo</button><button class="btn ghost" data-s="th">Rever a teoria</button>',
    { pr: () => startLessonQuiz(l), th: () => startLearn(l, 'review') });
}
export function finalSheet(c){
  const ok = courseComplete(c), tro = !!S.trophies[c.id];
  const h = '<div class="sh-i">' + (tro ? '🏆' : '🏁') + '</div><h3>Teste final: ' + c.title + '</h3><p class="sh-s">10 questões misturadas de toda a trilha e só 3 corações. Passe para ganhar o troféu, XP extra e bolotas.</p>';
  if (!ok) return sheet(h + '<p class="sh-s">Conclua todas as lições desta trilha para liberar.</p><button class="btn ghost" data-s="x">Entendi</button>', {});
  sheet(h + '<button class="btn primary" data-s="go">' + (tro ? 'Refazer o teste' : 'Fazer o teste') + '</button><button class="btn ghost" data-s="x">Agora não</button>', { go: () => startFinal(c) });
}
