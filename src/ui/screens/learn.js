import { $, bindActs } from '../dom.js';
import { pick } from '../../engine/random.js';
import { SAY } from '../../content/dialogues.js';
import { bento } from '../components/bento.js';
import { sfx } from '../components/sound.js';
import { go } from '../router.js';
import { openPath } from './path.js';
import { startLessonQuiz } from './quiz.js';

export let LRN = null;
export function openLesson(l){ if (!l) return; startLearn(l, 'lesson'); }
export function startLearn(l, mode){ LRN = { l:l, i:0, mode:mode, say:pick(SAY.learn) }; go('learn'); renderLearn(); }
export function renderLearn(){
  const l = LRN.l, i = LRN.i, card = l.learn[i], last = i === l.learn.length - 1, s = $('#s-learn');
  s.innerHTML = '<div class="ltop" style="--cc:' + l.course.color + '"><button class="icon-btn" data-act="x" aria-label="Fechar">✕</button><div class="dots">' +
    l.learn.map((_, k) => '<span class="' + (k <= i ? 'on' : '') + '"></span>').join('') + '</div>' + (LRN.mode === 'lesson' && !last ? '<button class="link" data-act="skip">Pular</button>' : '') + '</div>' +
    '<div class="lbody"><div class="lk">' + l.icon + ' ' + l.title + ', parte ' + (i + 1) + ' de ' + l.learn.length + '</div>' +
    (i === 0 ? '<div class="bento-row tight"><div class="bento-wrap xs">' + bento('think') + '</div><div class="speech sm">' + LRN.say + '</div></div>' : '') +
    '<h2>' + card.h + '</h2><div class="lc">' + card.b + '</div></div>' +
    '<div class="foot"><div class="row">' + (i > 0 ? '<button class="btn ghost" data-act="prev">Voltar</button>' : '') +
    '<button class="btn primary" data-act="next">' + (last ? (LRN.mode === 'lesson' ? 'Começar exercícios' : 'Concluir revisão') : 'Continuar') + '</button></div></div>';
  bindActs(s, {
    x: () => openPath(l.course),
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
