import { $ } from '../dom.js';
import { normTxt } from '../../engine/exercises/grading.js';
import { GLOSS } from '../../content/index.js';

export function renderGlossary(q){
  q = normTxt(q || '');
  const list = GLOSS.filter(g => !q || normTxt(g[0] + ' ' + g[1]).indexOf(q) >= 0);
  $('#g-list').innerHTML = list.length ? list.map(g => '<div class="gi"><dt>' + g[0] + '</dt><dd>' + g[1] + '</dd></div>').join('') : '<div class="gl-empty">Nenhum termo encontrado. Tente outra palavra.</div>';
}
