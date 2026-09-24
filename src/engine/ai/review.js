/* Corretor inteligente, sem internet e sem custo: roda no próprio aparelho.
   Ele só é consultado quando as regras do corretor comum recusam uma resposta
   escrita, e nunca rebaixa uma resposta que as regras aceitaram.

   Como decide:
   - Respostas curtas: descobre a que conceito a resposta se refere (usando a base de
     conhecimento de contabilidade, com sinônimos) e compara com o conceito esperado.
   - Explicações: procura cada ideia esperada também por sinônimos e palavras da mesma
     família, e confere se a resposta não diz o oposto da resposta-modelo.
   - Em qualquer caso, termos opostos (débito × crédito, aumenta × diminui...) e
     negações bloqueiam a aceitação.

   Resultado: { verdict:'right'|'unsure'|'wrong'|'none', note, ideas? }
   'right' = pode aceitar; 'unsure' = sugerir à pessoa; 'none' = a IA não sabe avaliar. */
import { CONCEPTS, TERM_CONCEPTS } from '../../content/lexicon.js';
import { normTxt, evalExpl } from '../exercises/grading.js';
import { analyze, stem, tokenize, opposites, oppositeWords } from './nlp.js';

const label = id => (CONCEPTS[id] || [id])[0].replace(/^~/, '');
const hedged = text => /\s(ou|e)\s|[,;\/]/i.test(' ' + String(text).trim() + ' ');
const quote = s => '“' + s + '”';

/* Conceitos (fortes) presentes nas respostas aceitas de uma questão. */
function expectedConcepts(answers){
  const ids = new Set(), norm = new Set(answers.map(a => normTxt(a)));
  answers.forEach(a => analyze(a).matches.forEach(m => { if (!m.weak && !m.neg) ids.add(m.id); }));
  for (const [id, terms] of Object.entries(CONCEPTS)) if (terms.some(t => !t.startsWith('~') && norm.has(normTxt(t)))) ids.add(id);
  return ids;
}
/* A resposta contradiz o esperado? Um conceito oposto a um conceito esperado, sem que a
   própria referência use os dois lados. Em respostas curtas também valem os opostos de
   contexto, as palavras opostas e o conceito esperado negado. */
function contradicts(found, expected, opts = {}){
  const short = !!opts.short, has = id => found.matches.some(x => x.id === id && !x.neg);
  for (const m of found.matches){
    if (m.neg){ if (short && expected.has(m.id)) return quote(m.term) + ' foi negado'; continue; }
    if (expected.has(m.id)) continue;
    for (const o of opposites(m.id, !short)) if (expected.has(o) && !has(o)) return quote(m.term) + ' é o oposto de ' + quote(label(o));
  }
  if (short && opts.words) for (const t of found.tokens){
    if (t.stop || t.negated || opts.words.has(t.s)) continue;
    for (const o of oppositeWords(t.s)) if (opts.words.has(o) && !found.tokens.some(x => x.s === o && !x.negated)) return quote(t.w) + ' é o oposto do esperado';
  }
  return '';
}

/* ---------- respostas curtas ---------- */
export function reviewShort(x, input, extra = []){
  const answers = x.a.concat(extra), expected = expectedConcepts(answers);
  if (!expected.size) return { verdict:'none' };
  const found = analyze(input);
  const expectedWords = new Set(answers.flatMap(a => tokenize(a).filter(t => !t.stop).map(t => t.s)));
  const why = contradicts(found, expected, { short:true, words:expectedWords });
  if (why) return { verdict:'wrong', note:'A IA viu um problema: ' + why + '.' };
  const hits = found.matches.filter(m => !m.neg && expected.has(m.id));
  const strong = hits.find(m => !m.weak), weak = hits.find(m => m.weak);
  const others = found.matches.filter(m => !m.neg && !m.weak && !expected.has(m.id)), other = others.find(m => m.exact) || others[0];
  /* dois termos técnicos ligados por "ou", "e", vírgula ou barra ("DFC ou DRE") é chute */
  const rival = hedged(input) && others.find(m => TERM_CONCEPTS[m.id]);
  if (strong && rival) return { verdict:'wrong', note:'A IA viu dois termos diferentes na resposta: ' + quote(strong.term) + ' e ' + quote(rival.term) + '.' };
  /* palavras que sobram sem explicação: uma resposta longa que só contém o termo não é certeza */
  const leftovers = found.free.length;
  if (strong && leftovers <= 3) return { verdict:'right', note:'A IA entendeu: ' + quote(strong.term) + ' é o mesmo que ' + quote(label(strong.id)) + '.' };
  if (strong) return { verdict:'unsure', note:'A resposta tem ' + quote(strong.term) + ', mas também outras coisas. Confira com a resposta esperada.' };
  /* termo aproximado sozinho vira sugestão; acompanhado de outras ideias, não */
  if (weak && !others.length && !found.free.length) return { verdict:'unsure', note:quote(weak.term) + ' está perto de ' + quote(label(weak.id)) + ', mas não é exatamente o termo pedido.' };
  if (other) return { verdict:'wrong', note:'A IA entendeu que você respondeu ' + quote(label(other.id)) + ', que é outro conceito.' };
  return { verdict:'none' };
}

/* ---------- explicações ---------- */
/* Para cada ideia da questão, os conceitos que ela aceita, ancorados na resposta-modelo:
   as palavras do modelo que batem com os radicais da ideia ("compar", "extrato") dizem
   quais conceitos da base representam aquela ideia; a IA então aceita também os
   sinônimos deles ("checar", "conferir", "movimento do banco"). O conceito guarda se
   aparece negado no modelo ("sem conflito de interesse"). */
const ideaCache = new WeakMap();
function ideaConcepts(x){
  if (ideaCache.has(x)) return ideaCache.get(x);
  const model = analyze(x.model), mt = model.tokens;
  const topic = new Set(analyze(String(x.q).replace(/<[^>]+>/g, ' ')).matches.map(m => m.id));
  const groups = x.k.map(g => {
    const pos = new Set();
    for (const raw of g.slice(1)){
      const st = normTxt(raw).split(' ').filter(Boolean);
      if (!st.length) continue;
      for (let i = 0; i + st.length <= mt.length; i++)
        if (st.every((s, j) => mt[i + j].w.startsWith(s))) for (let j = 0; j < st.length; j++) pos.add(i + j);
    }
    /* Um termo que começa numa palavra da ideia sempre vale. Se a ideia só aparece no
       meio do termo, ele não vale quando é o próprio assunto da pergunta: em "gasto para
       vender", a ideia "vender" não pode transformar a palavra "despesa" da pergunta em acerto. */
    const ids = new Map();
    model.matches.forEach(m => {
      if (m.weak) return;
      let inside = false; for (let p = m.start; p < m.end; p++) if (pos.has(p)) inside = true;
      if (pos.has(m.start) || (inside && !topic.has(m.id))) ids.set(m.id, !!m.neg);
    });
    return ids;
  });
  ideaCache.set(x, groups);
  return groups;
}

export function reviewExplain(x, input){
  const base = evalExpl(input, x);
  if (base.ok) return { verdict:'right', hits:base.hits, n:base.n, need:base.need, note:'' };
  const found = analyze(input);
  const groups = ideaConcepts(x);
  const usedMatch = new Set();
  const hits = base.hits.slice(), via = [];
  groups.forEach((ids, gi) => {
    if (hits[gi]) return;
    const m = found.matches.find((mm, mi) => !mm.weak && ids.has(mm.id) && ids.get(mm.id) === !!mm.neg && !usedMatch.has(mi));
    if (m){ hits[gi] = true; usedMatch.add(found.matches.indexOf(m)); via.push(x.k[gi][0] + ' (' + quote(m.term) + ')'); }
  });
  const n = hits.filter(Boolean).length, need = base.need;
  /* a referência é a resposta-modelo mais a própria pergunta ("o que é o regime de competência?") */
  const ref = analyze(x.model + ' ' + String(x.q).replace(/<[^>]+>/g, ' '));
  const refIds = new Set(ref.matches.filter(m => !m.neg && !m.weak).map(m => m.id));
  /* pares em que a referência já usa os dois lados não contam */
  for (const id of [...refIds]) for (const o of opposites(id)) if (refIds.has(o)){ refIds.delete(id); refIds.delete(o); }
  const why = contradicts(found, refIds);
  const words = found.tokens.filter(t => !t.stop).length;
  if (why) return { verdict:'wrong', hits, n, need, note:'A IA viu um problema: ' + why + '.' };
  if (n >= need && words >= 4) return { verdict:'right', hits, n, need, note:'A IA reconheceu as ideias com outras palavras: ' + via.join('; ') + '.' };
  if (n === need - 1 && via.length && words >= 4) return { verdict:'unsure', hits, n, need, note:'A IA encontrou ' + n + ' de ' + need + ' ideias necessárias. Compare com a resposta-modelo.' };
  return { verdict:'wrong', hits, n, need };
}

/* A regra "resposta dentro de uma frase" do corretor comum aceita "é o saldo da conta",
   mas não pode aceitar chute ("fixo ou variável") nem oposto ("saldo não"). Devolve o
   motivo para recusar, ou ''. */
export function phraseProblem(x, input, extra = []){
  const answers = x.a.concat(extra), expected = expectedConcepts(answers), found = analyze(input);
  const expectedWords = new Set(answers.flatMap(a => tokenize(a).filter(t => !t.stop).map(t => t.s)));
  const why = contradicts(found, expected, { short:true, words:expectedWords });
  if (why) return why;
  const rival = hedged(input) && found.matches.find(m => !m.neg && !m.weak && !expected.has(m.id) && TERM_CONCEPTS[m.id]);
  return rival ? 'a resposta também cita ' + quote(rival.term) : '';
}

/* Ponto de entrada: decide qual revisão usar pelo tipo de questão. */
export function review(x, input, extra = []){
  if (!input || !String(input).trim()) return { verdict:'none' };
  if (x.t === 'wr') return reviewShort(x, input, extra);
  if (x.t === 'expl') return reviewExplain(x, input);
  return { verdict:'none' };
}
export { stem };
