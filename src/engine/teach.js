/* Liga teoria e prática: encontra a parte da teoria que explica cada exercício e
   escolhe perguntas rápidas para fazer logo depois de cada parte (prática de
   recuperação: lembrar logo após ler fixa melhor do que só reler). */
import { normTxt } from './exercises/grading.js';
import { stem } from './stem.js';
import { COURSES } from '../content/index.js';

const STOP = new Set(('o a os as um uma uns umas de da do das dos e ou em no na nos nas ao aos com por para pra pro ' +
  'pelo pela pelos pelas que se eh ser sao foi era ele ela eles elas isso isto esse essa este esta lhe seu sua seus suas ' +
  'voce quando como mas porque pois entao tambem ja so mesmo muito muita pouco pouca bem qual quais cada todo toda ' +
  'todos todas tudo algo algum alguma vai vao ha sobre entre quanto quanta ai la aqui nao sim mais menos r pode podem ' +
  'deve devem fica ficam tem esta estao sera outro outra outros outras certo certa errado correta correto verdadeiro ' +
  'falso exemplo dica atencao regra ouro').split(' '));
const plain = html => String(html || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ');
const terms = text => normTxt(plain(text)).split(' ').filter(w => w.length > 1 && !STOP.has(w) && !/\d/.test(w)).map(stem);

/* Tudo o que um exercício diz: enunciado, resposta, explicação e dica. */
function exerciseText(x){
  const parts = [x.q, x.e, x.h, x.model, x.name];
  if (x.t === 'mc') parts.push(x.o[x.a]);
  if (x.t === 'wr') parts.push(x.a[0]);
  if (x.t === 'fill') parts.push(x.a.join(' '));
  if (x.pairs) parts.push(x.pairs.flat().join(' '));
  if (x.items) parts.push([].concat(x.items).flat().join(' '));
  if (x.cats) parts.push(x.cats.join(' '));
  if (x.d) parts.push([].concat(x.d).join(' '), [].concat(x.c).join(' '));
  if (x.k) parts.push(x.k.map(g => g.join(' ')).join(' '));
  return parts.filter(v => typeof v === 'string').join(' ');
}

/* Palavras que aparecem em quase toda a teoria ("empresa", "conta") pesam menos. */
let GLOBAL = null;
function globalWeight(t){
  if (!GLOBAL){
    GLOBAL = { df:new Map(), n:0 };
    COURSES.forEach(c => c.lessons.forEach(l => l.learn.forEach(card => {
      GLOBAL.n++; new Set(terms(card.h + ' ' + card.b)).forEach(w => GLOBAL.df.set(w, (GLOBAL.df.get(w) || 0) + 1));
    })));
  }
  return Math.log(1 + GLOBAL.n / (GLOBAL.df.get(t) || 1)) / Math.log(1 + GLOBAL.n);
}
const lessonCache = new WeakMap();
function lessonIndex(l){
  let idx = lessonCache.get(l);
  if (!idx){
    const cards = l.learn.map(c => ({ h:new Set(terms(c.h)), b:new Set(terms(c.h + ' ' + c.b)) }));
    const df = new Map(); cards.forEach(c => c.b.forEach(t => df.set(t, (df.get(t) || 0) + 1)));
    idx = { cards, df }; lessonCache.set(l, idx);
  }
  return idx;
}
/* Partes da teoria da lição ordenadas pela ligação com o exercício: palavras em comum,
   raras na lição e no curso, contam mais; palavras do título da parte valem o dobro. */
export function rankCards(l, x){
  const { cards, df } = lessonIndex(l), n = cards.length, q = new Set(terms(exerciseText(x)));
  return cards.map((c, i) => {
    let s = 0;
    q.forEach(t => { if (c.b.has(t)) s += Math.log(1 + n / df.get(t)) * globalWeight(t) * (c.h.has(t) ? 2 : 1); });
    return { i, s:s / Math.pow(c.b.size || 1, 0.3) };
  }).sort((a, b) => b.s - a.s || a.i - b.i);
}
/* A parte da teoria que melhor explica o exercício (índice em l.learn). */
export function theoryCard(l, x){
  if (!l || !l.learn || !l.learn.length) return 0;
  const r = rankCards(l, x);
  return r[0].s > 0 ? r[0].i : 0;
}

/* Perguntas rápidas: para cada parte sem pergunta própria, um verdadeiro/falso ou uma
   múltipla escolha da lição que trate claramente daquela parte. Ficam de fora as
   perguntas que dependem de outra ("com os mesmos dados", "do exemplo anterior"). */
const DEPENDS = /\b(anterior|mesmos dados|mesma empresa|mesmo caso|mesmo exemplo|essas?|esses?|dess[ae]s?|ness[ae]s?|daquel[ae]|acima|continuando|ainda sobre)\b/i;
export function quickChecks(l){
  const best = new Map();
  l.ex.forEach(x => {
    if (!(x.t === 'tf' || (x.t === 'mc' && x.o.length <= 4)) || DEPENDS.test(plain(x.q))) return;
    const r = rankCards(l, x); if (!r.length || r[0].s < 1.2) return;
    const margin = r[1] ? r[0].s / (r[1].s || 0.001) : 9; if (margin < 1.4) return;
    const cur = best.get(r[0].i); if (!cur || cur.margin < margin) best.set(r[0].i, { x, margin });
  });
  const out = {};
  l.learn.forEach((card, i) => {
    const b = best.get(i); if (card.check || !b) return;
    const x = b.x;
    out[i] = x.t === 'tf'
      ? { q:'Verdadeiro ou falso? ' + x.q, o:['Verdadeiro', 'Falso'], a:x.a ? 0 : 1, e:x.e, key:x.key }
      : { q:x.q, o:x.o.slice(), a:x.a, e:x.e, key:x.key };
  });
  return out;
}
