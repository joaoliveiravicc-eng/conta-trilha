import { $, $$, bindActs } from '../dom.js';
import { pick } from '../../engine/random.js';
import { SAY } from '../../content/dialogues.js';
import { bento } from '../components/bento.js';
import { sfx } from '../components/sound.js';
import { go } from '../router.js';
import { openPath } from './path.js';
import { startLessonQuiz } from './quiz.js';

export let LRN = null;
export function openLesson(l){ if (!l) return; startLearn(l, 'lesson'); }
export function startLearn(l, mode){ LRN = { l:l, i:0, mode:mode, checks:{}, say:pick(SAY.learn) }; go('learn'); renderLearn(); }
export function renderLearn(){
  const l = LRN.l, i = LRN.i, card = l.learn[i], last = i === l.learn.length - 1, s = $('#s-learn');
  s.innerHTML = '<div class="ltop" style="--cc:' + l.course.color + '"><button class="icon-btn" data-act="x" aria-label="Fechar">✕</button><div class="dots">' +
    l.learn.map((_, k) => '<button class="lesson-dot ' + (k <= i ? 'on' : '') + '" data-act="card" data-i="'+k+'" aria-label="Parte '+(k+1)+'" '+(k===i?'aria-current="step"':'')+'></button>').join('') + '</div>' + (LRN.mode === 'lesson' && !last ? '<button class="link" data-act="skip">Ir à prática</button>' : '') + '</div>' +
    '<div class="lbody"><div class="lk">' + l.icon + ' ' + l.title + ', parte ' + (i + 1) + ' de ' + l.learn.length + '</div>' +
    (i === 0 ? '<div class="bento-row tight"><div class="bento-wrap xs">' + bento('think') + '</div><div class="speech sm">' + LRN.say + '</div></div>' : '') +
    (i === 0 ? '<div class="learning-goal"><span class="eyebrow">AO FINAL DESTA LIÇÃO</span><p>'+l.goal+'</p><span class="small muted">≈ '+l.minutes+' minutos · Aprenda → Pratique → Revise</span></div>' : '') +
    '<article class="theory-card"><span class="eyebrow">PARTE '+(i+1)+' DE '+l.learn.length+'</span><h2>' + card.h + '</h2><div class="lc">' + card.b + '</div></article>' +
    (card.check ? quickCheck(card.check, LRN.checks[i]) : '') +
    (last ? '<aside class="lesson-recap"><h3>Leve com você</h3><ul>'+(l.recap || l.learn.map(c=>c.h)).map(t=>'<li>'+t+'</li>').join('')+'</ul><p class="small muted">Na prática, erros recebem explicação e voltam para uma nova tentativa.</p></aside>' : '') + '</div>' +
    '<div class="foot"><div class="row">' + (i > 0 ? '<button class="btn ghost" data-act="prev">Voltar</button>' : '') +
    '<button class="btn primary" data-act="next">' + (last ? (LRN.mode === 'lesson' ? 'Começar exercícios' : 'Concluir revisão') : 'Continuar') + '</button></div></div>';
  bindActs(s, {
    x: () => openPath(l.course),
    card: b => { LRN.i=+b.dataset.i; renderLearn(); window.scrollTo(0,0); },
    check: b => {
      if (LRN.checks[i] !== undefined) return;
      const answer=+b.dataset.answer; LRN.checks[i]=answer;
      const root=$('.quick-check',s);
      $$('[data-act="check"]',root).forEach(btn=>{ btn.disabled=true; btn.classList.toggle('right',+btn.dataset.answer===card.check.a); btn.classList.toggle('wrong',+btn.dataset.answer===answer && answer!==card.check.a); });
      $('.quick-feedback',root).textContent=(answer===card.check.a?'Isso! ':'Vamos entender: ')+card.check.e;
    },
    skip: () => startLessonQuiz(l),
    prev: () => { LRN.i--; renderLearn(); window.scrollTo(0, 0); },
    next: () => {
      sfx.tap();
      if (!last){ LRN.i++; renderLearn(); window.scrollTo(0, 0); }
      else if (LRN.mode === 'lesson') startLessonQuiz(l);
      else openPath(l.course);
    }
  });
}

function quickCheck(check, answer){
  const answered = answer !== undefined;
  return '<section class="quick-check"><span class="eyebrow">SUA VEZ · SEM VALER PONTOS</span><h3>'+check.q+'</h3><div class="options">'+check.o.map((o,k)=>'<button data-act="check" data-answer="'+k+'" class="opt '+(answered && k===check.a?'right':answered && k===answer?'wrong':'')+'" '+(answered?'disabled':'')+'>'+o+'</button>').join('')+'</div><p class="quick-feedback" role="status" aria-live="polite">'+(answered?check.e:'Pense no exemplo e escolha uma resposta.')+'</p></section>';
}
