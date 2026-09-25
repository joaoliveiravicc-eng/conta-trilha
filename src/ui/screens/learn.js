import { $, $$, bindActs } from '../dom.js';
import { pick } from '../../engine/random.js';
import { SAY } from '../../content/dialogues.js';
import { bento } from '../components/bento.js';
import { sfx } from '../components/sound.js';
import { go } from '../router.js';
import { openPath } from './path.js';
import { startLessonQuiz } from './quiz.js';
import { quickChecks } from '../../engine/teach.js';

export let LRN = null;
export function openLesson(l){ if (!l) return; startLearn(l, 'lesson'); }
export function startLearn(l, mode){ LRN = { l:l, i:0, mode:mode, checks:{}, auto:quickChecks(l), say:pick(SAY.learn) }; go('learn'); renderLearn(); }
/* A pergunta rápida da parte: a escrita para ela ou uma questão da lição sobre o mesmo assunto. */
const checkOf = i => LRN.l.learn[i].check || LRN.auto[i];
/* Questões da lição já respondidas nas perguntas rápidas: vão para o fim da prática. */
const answered = () => Object.keys(LRN.checks).map(i => LRN.auto[i] && LRN.auto[i].key).filter(Boolean);
export function renderLearn(){
  const l = LRN.l, i = LRN.i, card = l.learn[i], last = i === l.learn.length - 1, s = $('#s-learn');
  s.innerHTML = '<div class="ltop" style="--cc:' + l.course.color + '"><button class="icon-btn" data-act="x" aria-label="Fechar">✕</button><div class="dots">' +
    l.learn.map((_, k) => '<button class="lesson-dot ' + (k <= i ? 'on' : '') + '" data-act="card" data-i="'+k+'" aria-label="Parte '+(k+1)+'" '+(k===i?'aria-current="step"':'')+'></button>').join('') + '</div>' + (LRN.mode === 'lesson' && !last ? '<button class="link" data-act="skip">Ir à prática</button>' : '') + '</div>' +
    '<div class="lbody"><div class="lk">' + l.icon + ' ' + l.title + '</div>' +
    (i === 0 ? '<div class="bento-row tight"><div class="bento-wrap xs">' + bento('think') + '</div><div class="speech sm">' + LRN.say + '</div></div>' : '') +
    (i === 0 ? lessonMap(l) : '') +
    '<article class="theory-card"><span class="eyebrow">PARTE '+(i+1)+' DE '+l.learn.length+'</span><h2>' + card.h + '</h2><div class="lc">' + card.b + '</div></article>' +
    (checkOf(i) ? quickCheck(checkOf(i), LRN.checks[i]) : '') +
    (last ? recap(l) : '') + '</div>' +
    '<div class="foot"><div class="row">' + (i > 0 ? '<button class="btn ghost" data-act="prev">Voltar</button>' : '') +
    '<button class="btn primary" data-act="next">' + (last ? (LRN.mode === 'lesson' ? 'Começar exercícios' : 'Concluir revisão') : 'Continuar') + '</button></div></div>';
  bindActs(s, {
    x: () => openPath(l.course),
    card: b => { LRN.i=+b.dataset.i; renderLearn(); window.scrollTo(0,0); },
    check: b => {
      if (LRN.checks[i] !== undefined) return;
      const qc = checkOf(i), answer=+b.dataset.answer; LRN.checks[i]=answer;
      const root=$('.quick-check',s), ok = answer===qc.a;
      $$('[data-act="check"]',root).forEach(btn=>{ btn.disabled=true; btn.classList.toggle('right',+btn.dataset.answer===qc.a); btn.classList.toggle('wrong',+btn.dataset.answer===answer && !ok); });
      const fb = $('.quick-feedback',root); fb.textContent=(ok?'Isso! ':'Quase. ')+qc.e; fb.className='quick-feedback '+(ok?'ok':'bad');
      ok ? sfx.ok() : sfx.bad();
    },
    skip: () => startLessonQuiz(l, answered()),
    prev: () => { LRN.i--; renderLearn(); window.scrollTo(0, 0); },
    next: () => {
      sfx.tap();
      if (!last){ LRN.i++; renderLearn(); window.scrollTo(0, 0); }
      else if (LRN.mode === 'lesson') startLessonQuiz(l, answered());
      else openPath(l.course);
    }
  });
}

function quickCheck(check, answer){
  const answered = answer !== undefined, ok = answer === check.a;
  return '<section class="quick-check"><span class="eyebrow">SUA VEZ · SEM VALER PONTOS</span><h3>'+check.q+'</h3><div class="options'+(check.o.length === 2 ? ' two' : '')+'">'+check.o.map((o,k)=>'<button data-act="check" data-answer="'+k+'" class="opt '+(answered && k===check.a?'right':answered && k===answer?'wrong':'')+'" '+(answered?'disabled':'')+'>'+o+'</button>').join('')+'</div>' +
    '<p class="quick-feedback'+(answered ? (ok ? ' ok' : ' bad') : '')+'" role="status" aria-live="polite">'+(answered?(ok?'Isso! ':'Quase. ')+check.e:'Responda de cabeça, antes de seguir: lembrar agora ajuda a fixar.')+'</p></section>';
}
/* Mapa da lição: o que vem pela frente, em partes curtas. */
function lessonMap(l){
  return '<div class="learning-goal"><span class="eyebrow">'+(l.goal ? 'AO FINAL DESTA LIÇÃO' : 'O QUE VOCÊ VAI VER')+'</span>' +
    (l.goal ? '<p>'+l.goal+'</p>' : '') +
    '<ol class="lesson-map">'+l.learn.map(c => '<li>'+c.h+'</li>').join('')+'</ol>' +
    '<span class="small muted">≈ '+l.minutes+' min · '+l.learn.length+' '+(l.learn.length === 1 ? 'parte' : 'partes')+' · '+l.ex.length+' exercícios</span></div>';
}
/* Resumo ativo: antes de conferir, a pessoa tenta lembrar o que cada parte ensinou. */
function recap(l){
  const earlier = l.learn.slice(0, -1);
  return '<aside class="lesson-recap"><h3>Leve com você</h3>' +
    (l.recap ? '<ul>'+l.recap.map(t=>'<li>'+t+'</li>').join('')+'</ul>' : '') +
    (earlier.length ? '<p class="small">Tente lembrar o que cada parte ensinou. Depois toque para conferir.</p><div class="recall-list">' +
      earlier.map((c, k) => '<details class="recall"><summary><span class="rn">'+(k + 1)+'</span><span class="rt">'+c.h+'</span><span class="rv">Conferir</span></summary><div class="lc">'+c.b+'</div></details>').join('')+'</div>' : '') +
    '<p class="small muted">Na prática, cada erro vem com explicação e a questão volta no final.</p></aside>';
}
