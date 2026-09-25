import { $, bindActs } from '../dom.js';
import { S, today, courseComplete, lessonsDone } from '../../engine/state.js';
import { dueLessons, spacedItems } from '../../engine/learning.js';
import { shuffle } from '../../engine/random.js';
import { COURSES, EX } from '../../content/index.js';
import { coursesForArea } from '../../content/areas.js';
import { items } from './quiz-renderers.js';
import { startSession } from './quiz.js';
import { renderCases } from './cases.js';
import { openBlitz } from './blitz.js';

export function renderPractice(){
  const s = $('#s-practice');
  const activeCourses = coursesForArea(COURSES, S.area);
  const due = dueLessons(activeCourses,S,today());
  const mk = Object.keys(S.mistakes).filter(k => EX[k] && activeCourses.includes(EX[k].c));
  const doneEx = Object.keys(EX).map(k => EX[k]).filter(o => activeCourses.includes(o.c) && S.done[o.l.id] && o.x.t !== 'expl');
  const drill = doneEx.filter(o => ['entry', 'ew', 'class', 'num', 'tsal'].indexOf(o.x.t) >= 0);
  s.innerHTML = '<div class="pad"><h1 style="font-size:1.45rem">Praticar</h1><p class="muted small" style="margin:4px 0 16px">Repetir é o que transforma teoria em habilidade.</p>' +
    '<div class="daily-review"><span class="eyebrow">UM POUCO A CADA DIA</span><h2>Revisão do dia</h2><p>'+(due.length ? (due.length === 1 ? '1 lição pronta para retomar. Esta rodada traz 2 questões dela.' : due.length+' lições prontas para retomar. Esta rodada mistura questões de '+Math.min(3, due.length)+' delas.') : doneEx.length ? 'Tudo em dia. A próxima revisão aparece aqui quando chegar a hora.' : 'Conclua uma lição para começar. O conteúdo volta em intervalos de 1, 3, 7, 14 e 30 dias, conforme seus acertos.')+'</p><button class="btn primary" data-act="spaced" '+(due.length?'':'disabled')+'>Revisar agora →</button></div>' +
    '<button class="pcard" data-act="rev" ' + (mk.length ? '' : 'disabled') + '><div class="pe">🔁</div><div><div class="pt">Revisar meus erros</div><div class="ps">' + (mk.length ? 'Questões que você errou. Acertou de primeira, sai da lista.' : 'Nenhum erro pendente. Ótimo trabalho!') + '</div></div>' + (mk.length ? '<div class="cnt">' + mk.length + '</div>' : '') + '</button>' +
    '<button class="pcard" data-act="quick" ' + (doneEx.length ? '' : 'disabled') + '><div class="pe">⚡</div><div><div class="pt">Prática rápida</div><div class="ps">' + (doneEx.length ? '8 questões sorteadas das lições que você já fez.' : 'Conclua sua primeira lição para liberar.') + '</div></div></button>' +
    '<button class="pcard" data-act="drill" ' + (drill.length >= 3 ? '' : 'disabled') + '><div class="pe">✍️</div><div><div class="pt">Treino de lançamentos e cálculos</div><div class="ps">' + (drill.length >= 3 ? 'Só débito e crédito, classificações e contas.' : 'Libera após a trilha Débito e Crédito.') + '</div></div></button>' +
    '<button class="pcard" data-act="blitz"><div class="pe">🥊</div><div><div class="pt">Modo Relâmpago</div><div class="ps">60 segundos de lançamentos. Recorde: ' + S.best.blitz + ' pontos.</div></div></button>' +
    '<h2 class="sec-h" style="margin:22px 0 8px">Casos práticos</h2><div id="case-list"></div>' +
    '<h2 class="sec-h" style="margin:22px 0 8px">Troféus</h2><div class="card">' +
    activeCourses.map(c => '<div class="trow"><span class="tr-i">' + (S.trophies[c.id] ? '🏆' : c.icon) + '</span><span>' + c.title + '</span><span class="tr-s">' + (S.trophies[c.id] ? 'Conquistado' : (courseComplete(c) ? 'Teste liberado' : lessonsDone(c) + '/' + c.lessons.length)) + '</span></div>').join('') + '</div></div>';
  renderCases($('#case-list'), activeCourses);
  bindActs(s, {
    spaced: () => { const lessons=due.slice(0,3); if(lessons.length) startSession({kind:'spaced',items:spacedItems(lessons),reviewLessons:lessons,hearts:99}); },
    rev: () => { const list = shuffle(mk).sort((a, b) => S.mistakes[b] - S.mistakes[a]).slice(0, 10).map(k => ({ key:k, x:EX[k].x })); startSession({ kind:'review', items:shuffle(list), hearts:5 }); },
    quick: () => startSession({ kind:'practice', items:items(shuffle(doneEx).slice(0, 8)), hearts:5 }),
    drill: () => startSession({ kind:'practice', items:items(shuffle(drill).slice(0, 8)), hearts:5 }),
    blitz: openBlitz
  });
}
