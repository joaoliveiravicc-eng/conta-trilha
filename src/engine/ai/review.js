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
import { CONCEPTS, TERM_CONCEPTS, DEFINITIONS } from '../../content/lexicon.js';
import { normTxt, normAns, evalExpl } from '../exercises/grading.js';
import { GLOSS } from '../../content/glossary.js';
import { analyze, stem, tokenize, opposites, oppositeWords } from './nlp.js';

const label = id => (CONCEPTS[id] || [id])[0].replace(/^~/, '');
/* Definição do glossário do app para um conceito, para explicar por que a resposta é outra coisa. */
let GLOSS_BY_ID = null;
function definition(id){
  if (!GLOSS_BY_ID){
    GLOSS_BY_ID = new Map();
    const names = GLOSS.map(([name, def]) => [[name, name.replace(/\s*\(.*?\)/g, ''), (name.match(/\((.*?)\)/) || [])[1]].filter(Boolean).map(normAns), name, def]);
    for (const [cid, terms] of Object.entries(CONCEPTS)){
      const forms = new Set(terms.filter(t => !t.startsWith('~')).map(normAns));
      const hit = names.find(([variants]) => variants.some(v => forms.has(v)));
      if (hit) GLOSS_BY_ID.set(cid, hit[1] + ': ' + hit[2]);
    }
  }
  return GLOSS_BY_ID.get(id) || DEFINITIONS[id] || '';
}
const withDef = (text, id) => { const d = definition(id); return d ? text + ' ' + d : text; };
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
  if (why){
    const cands = found.matches.filter(m => !m.neg && !m.weak && !expected.has(m.id));
    const said = cands.find(m => TERM_CONCEPTS[m.id] && definition(m.id)) || cands.find(m => definition(m.id));
    return { verdict:'wrong', note:said ? withDef('A IA viu um problema: ' + why + '.', said.id) : 'A IA viu um problema: ' + why + '.' };
  }
  const hits = found.matches.filter(m => !m.neg && expected.has(m.id));
  const strong = hits.find(m => !m.weak), weak = hits.find(m => m.weak);
  const others = found.matches.filter(m => !m.neg && !m.weak && !expected.has(m.id));
  const named = m => stem(label(m.id)) === stem(m.term);
  const other = others.find(m => named(m) && TERM_CONCEPTS[m.id]) || others.find(named) || others.find(m => m.exact && TERM_CONCEPTS[m.id]) || others.find(m => m.exact) || others.find(m => TERM_CONCEPTS[m.id]) || others[0];
  /* dois termos técnicos ligados por "ou", "e", vírgula ou barra ("DFC ou DRE") é chute */
  const rival = hedged(input) && others.find(m => TERM_CONCEPTS[m.id]);
  if (strong && rival) return { verdict:'wrong', note:'A IA viu dois termos diferentes na resposta: ' + quote(strong.term) + ' e ' + quote(rival.term) + '.' };
  /* palavras que sobram sem explicação: uma resposta longa que só contém o termo não é certeza */
  const leftovers = found.free.length;
  if (strong && leftovers <= 3) return { verdict:'right', note:'A IA entendeu: ' + quote(strong.term) + ' é o mesmo que ' + quote(label(strong.id)) + '.' };
  if (strong) return { verdict:'unsure', note:'A resposta tem ' + quote(strong.term) + ', mas também outras coisas. Confira com a resposta esperada.' };
  /* termo aproximado sozinho vira sugestão; acompanhado de outras ideias, não */
  if (weak && !others.length && !found.free.length) return { verdict:'unsure', note:quote(weak.term) + ' está perto de ' + quote(label(weak.id)) + ', mas não é exatamente o termo pedido.' };
  if (other) return { verdict:'wrong', note:withDef('A IA entendeu que você respondeu ' + quote(label(other.id)) + ', que é outro conceito.', other.id) };
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
    const ids = new Map();                           /* conceito → polaridades usadas no modelo */
    model.matches.forEach(m => {
      if (m.weak) return;
      let inside = false; for (let p = m.start; p < m.end; p++) if (pos.has(p)) inside = true;
      if (pos.has(m.start) || (inside && !topic.has(m.id))){ if (!ids.has(m.id)) ids.set(m.id, new Set()); ids.get(m.id).add(!!m.neg); }
    });
    return ids;
  });
  ideaCache.set(x, groups);
  return groups;
}

/* ---------- recusas com alta certeza (explicações) ----------
   Mesmo quando as palavras-chave batem, a resposta está errada se:
   1. troca os papéis numa pergunta "qual a diferença entre A e B" (diz de A o que vale para B);
   2. afirma, sem ressalva, o oposto do próprio assunto da pergunta ("natureza devedora" numa
      pergunta sobre "aumenta a crédito"), sem citar o assunto e sem o oposto aparecer no modelo. */
const qText = x => String(x.q).replace(/<[^>]+>/g, ' ');
const strongIds = text => new Set(analyze(text).matches.filter(m => !m.weak && !m.neg).map(m => m.id));
const subjectCache = new WeakMap();
function subjects(x){
  if (subjectCache.has(x)) return subjectCache.get(x);
  const m = qText(x).match(/diferen[cç]a entre (.+?) e (.+?)\s*(?:\?|$)/i);
  let out = null;
  if (m){
    const A = strongIds(m[1]), B = strongIds(m[2]);
    [...A].forEach(id => { if (B.has(id)){ A.delete(id); B.delete(id); } });
    if (A.size && B.size){
      const model = attribute(analyze(x.model), A, B), all = new Set([...A, ...B]);
      /* só as ideias-chave da questão definem um papel: um verbo genérico como "cobrar" não */
      const key = new Set(ideaConcepts(x).flatMap(ids => [...ids.keys()]));
      const dist = (own, other) => new Set([...own].filter(id => !other.has(id) && !all.has(id) && key.has(id)));
      const fa = new Set(model.A.map(f => f.id)), fb = new Set(model.B.map(f => f.id));
      out = { A, B, DA:dist(fa, fb), DB:dist(fb, fa) };
    }
  }
  subjectCache.set(x, out);
  return out;
}
/* Atribui cada conceito ao sujeito (A ou B) de que o trecho está falando. Depois de um
   sujeito citado em contraste ("diferente do detectivo, que..."), o trecho seguinte fica
   sem dono: não dá para saber de quem ele fala. */
function attribute(found, A, B){
  const out = { A:[], B:[] }, ms = [...found.matches].sort((a, b) => a.start - b.start);
  const clauseOf = [], t = found.tokens; let c = 0;
  t.forEach((tok, i) => { clauseOf[i] = c; if (tok.end) c++; });
  let cur = null, muteUntil = -1;
  for (let i = 0; i < ms.length; i++){
    const group = ms.filter(m => m.start === ms[i].start), subj = group.find(m => !m.weak && (A.has(m.id) || B.has(m.id)));
    if (subj){
      if (subj.neg) muteUntil = clauseOf[subj.start] + 1;
      else { cur = A.has(subj.id) ? 'A' : 'B'; muteUntil = -1; }
      i += group.length - 1; continue;
    }
    const m = ms[i];
    if (!cur || m.weak || m.neg || clauseOf[m.start] <= muteUntil) continue;
    out[cur].push(m);
  }
  return out;
}
function swapProblem(x, found){
  const s = subjects(x); if (!s) return '';
  const said = attribute(found, s.A, s.B);
  const side = (feats, own, other) => ({ described:feats.some(f => own.has(f.id) || other.has(f.id)),
    mine:feats.filter(f => own.has(f.id)).length, theirs:feats.filter(f => other.has(f.id) && !f.hedged) });
  const a = side(said.A, s.DA, s.DB), b = side(said.B, s.DB, s.DA);
  const wrongA = a.theirs.length > 0 && a.theirs.length > a.mine, wrongB = b.theirs.length > 0 && b.theirs.length > b.mine;
  /* com os dois lados descritos, a troca precisa aparecer nos dois; com um só, basta nele */
  const swapped = a.described && b.described ? wrongA && wrongB : wrongA || wrongB;
  if (!swapped) return '';
  const [from, to, f] = wrongA ? [s.A, s.B, a.theirs[0]] : [s.B, s.A, b.theirs[0]];
  return 'você ligou ' + quote(f.term) + ' a ' + quote(label([...from][0])) + ', mas isso vale para ' + quote(label([...to][0]));
}
function topicContradiction(x, found){
  const topic = strongIds(qText(x)), model = strongIds(x.model);
  for (const id of [...topic]) for (const o of opposites(id)) if (topic.has(o)){ topic.delete(id); topic.delete(o); }
  for (const m of found.matches){
    if (m.neg || m.weak || m.hedged || topic.has(m.id) || model.has(m.id)) continue;
    for (const o of opposites(m.id)) if (topic.has(o) && !found.matches.some(f => f.id === o && !f.neg)) return quote(m.term) + ' é o oposto de ' + quote(label(o)) + ', que é o assunto da pergunta';
  }
  return '';
}
export function veto(x, input){
  if (x.t !== 'expl' || !input) return '';
  const found = analyze(input);
  return swapProblem(x, found) || topicContradiction(x, found);
}

export function reviewExplain(x, input){
  const base = evalExpl(input, x);
  const vetoed = veto(x, input);
  if (vetoed) return { verdict:'wrong', veto:true, hits:base.hits, n:base.n, need:base.need, note:'A IA viu um problema: ' + vetoed + '.' };
  if (base.ok) return { verdict:'right', hits:base.hits, n:base.n, need:base.need, note:'' };
  const found = analyze(input);
  const groups = ideaConcepts(x);
  const usedMatch = new Set();
  const hits = base.hits.slice(), via = [];
  groups.forEach((ids, gi) => {
    if (hits[gi]) return;
    const m = found.matches.find((mm, mi) => !mm.weak && ids.has(mm.id) && ids.get(mm.id).has(!!mm.neg) && !usedMatch.has(mi));
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

/* Quanto a base de conhecimento cobre uma questão: conceitos esperados (escritas) ou
   conceitos ancorados em cada ideia (explicações). Usado pelos testes. */
export function coverage(x){
  if (x.t === 'wr') return { concepts:expectedConcepts(x.a).size };
  if (x.t === 'expl') return { ideas:ideaConcepts(x).map(ids => ids.size) };
  return {};
}

/* O que significa uma opção (de múltipla escolha ou de lacuna) que a pessoa escolheu:
   um termo do glossário ou um único conceito da base que cubra a opção inteira.
   Um nome com palavras a mais só vale se elas estiverem no enunciado: "Caixa", numa
   questão sobre contas, não é "Regime de caixa". Devolve { name, def } ou null. */
const nameForms = name => [name, name.replace(/\s*\(.*?\)/g, ''), (name.match(/\((.*?)\)/) || [])[1]].filter(Boolean).map(normAns);
function fits(name, n, ctx){
  const forms = nameForms(name);
  if (forms.includes(n)) return 2;
  const words = n.split(' ');
  return forms.some(f => { const fw = f.split(' '); return words.every(w => fw.includes(w)) && fw.every(w => words.includes(w) || ctx.has(w)); }) ? 1 : 0;
}
export function meaning(text, context = ''){
  const n = normAns(text); if (!n) return null;
  const ctx = new Set(normAns(String(context).replace(/<[^>]+>/g, ' ')).split(' '));
  let best = null, lvl = 0;
  GLOSS.forEach(([name, def]) => { const f = fits(name, n, ctx); if (f > lvl){ lvl = f; best = name + ': ' + def; } });
  let d = best || '';
  if (!d){
    const a = analyze(text), strong = a.matches.filter(m => !m.weak && !m.neg);
    const content = a.tokens.map((t, i) => t.stop ? -1 : i).filter(i => i >= 0);
    if (strong.length === 1 && content.every(i => i >= strong[0].start && i < strong[0].end)){
      const g = definition(strong[0].id), gname = g.slice(0, g.indexOf(': '));
      d = g && fits(gname, n, ctx) ? g : (DEFINITIONS[strong[0].id] || '');
    }
  }
  const cut = d.indexOf(': ');
  return cut > 0 ? { name:d.slice(0, cut), def:d.slice(cut + 2) } : null;
}

/* Ponto de entrada: decide qual revisão usar pelo tipo de questão. */
export function review(x, input, extra = []){
  if (!input || !String(input).trim()) return { verdict:'none' };
  if (x.t === 'wr') return reviewShort(x, input, extra);
  if (x.t === 'expl') return reviewExplain(x, input);
  return { verdict:'none' };
}
export { stem };
