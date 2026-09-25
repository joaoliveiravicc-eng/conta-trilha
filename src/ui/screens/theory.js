/* Teoria sob demanda: abre, por cima do exercício, a parte da lição que explica a
   questão. Dá para passar para as outras partes sem perder o exercício. */
import { $, $$ } from '../dom.js';
import { sheet } from '../router.js';
import { theoryCard } from '../../engine/teach.js';

export function openTheory(l, x){
  if (!l || !l.learn || !l.learn.length) return;
  let i = x ? theoryCard(l, x) : 0;
  sheet('<div class="theory-sheet"><div class="ts-card"></div>' +
    (l.learn.length > 1 ? '<div class="ts-nav"><button class="btn ghost" data-tn="-1">‹ Anterior</button><span class="ts-pos"></span><button class="btn ghost" data-tn="1">Próxima ›</button></div>' : '') +
    '<button class="btn primary" data-s="x">Voltar ao exercício</button></div>', {});
  const root = $('#sheet-root'), draw = () => {
    const card = l.learn[i];
    $('.ts-card', root).innerHTML = '<span class="eyebrow">📖 TEORIA · PARTE ' + (i + 1) + ' DE ' + l.learn.length + '</span><h3>' + card.h + '</h3><div class="lc">' + card.b + '</div>';
    const pos = $('.ts-pos', root); if (pos) pos.textContent = (i + 1) + ' / ' + l.learn.length;
    $$('[data-tn]', root).forEach(b => { const to = i + +b.dataset.tn; b.disabled = to < 0 || to >= l.learn.length; });
    const box = $('.sheet', root); if (box) box.scrollTop = 0;
  };
  $$('[data-tn]', root).forEach(b => b.onclick = () => { const to = i + +b.dataset.tn; if (to >= 0 && to < l.learn.length){ i = to; draw(); } });
  draw();
}
