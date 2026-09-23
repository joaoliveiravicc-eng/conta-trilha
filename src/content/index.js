/* Monta o currículo final: as 7 trilhas originais + as lições novas (antes/vida) +
   os exercícios bônus, na ordem definida em layout.js. */
import base from './trilhas/base.js';
import dc from './trilhas/dc.js';
import lanc from './trilhas/lanc.js';
import demo from './trilhas/demo.js';
import cust from './trilhas/cust.js';
import trib from './trilhas/trib.js';
import aud from './trilhas/aud.js';
import imob from './trilhas/imob.js';
import antes from './trilhas/antes.js';
import vida from './trilhas/vida.js';
import estoq from './trilhas/estoq.js';
import EXTRA from './extra.js';
import { buildCourses } from './layout.js';
import { GLOSSARY, GLOSS_ADD } from './glossary.js';

const rawCourses = [base, dc, lanc, demo, cust, trib, aud, imob];
const newLessons = antes.concat(vida, estoq);

export const COURSES = buildCourses(rawCourses, newLessons, EXTRA);

/* Anota cada trilha/unidade/lição com seu índice (idx) e uma referência de volta
   (course/unit), e monta o índice EX (chave "licaoId#n" -> {x,l,c}) usado pela
   revisão de erros. Precisa rodar uma vez, depois que COURSES está montado. */
export const EX = {};
COURSES.forEach((c, ci) => {
  c.idx = ci;
  c.units.forEach((u, ui) => { u.idx = ui; u.course = c; u.lessons.forEach(l => { l.unit = u; }); });
  c.lessons.forEach((l, li) => { l.idx = li; l.course = c; l.ex.forEach((x, xi) => { x.key = l.id + '#' + xi; EX[x.key] = { x:x, l:l, c:c }; }); });
});

export const TOTAL_LESSONS = COURSES.reduce((a, c) => a + c.lessons.length, 0);
export const GLOSS = GLOSSARY.concat(GLOSS_ADD).sort((a, b) => a[0].localeCompare(b[0], 'pt-BR'));

export { CASES } from './cases.js';
export { TIPS } from './tips.js';
export { BADGES } from './badges.js';
export { MPOOL } from './missions.js';
export { OUTFITS } from './shop-items.js';
export { CHART, GROUP_NAME, ALIASES, ENTRY_TPL } from './chart-of-accounts.js';
