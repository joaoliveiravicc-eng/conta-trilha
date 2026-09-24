/* Processamento de texto em português para o corretor inteligente: radical das
   palavras (stemmer leve), negação e localização dos conceitos da base de conhecimento. */
import { normTxt, lev } from '../exercises/grading.js';
import { CONCEPTS, OPPOSITES, CONTEXT_OPPOSITES, OPPOSITE_WORDS } from '../../content/lexicon.js';
import { knownWords as contentWords } from '../vocab.js';

/* Palavras conhecidas: as do conteúdo do app e as da base de conhecimento. */
let KNOWN = null;
function knownWords(){
  if (KNOWN) return KNOWN;
  KNOWN = new Set(contentWords());
  Object.values(CONCEPTS).flat().forEach(t => normTxt(t.replace(/^~/, '')).split(' ').forEach(w => w && KNOWN.add(w)));
  return KNOWN;
}

/* Palavras que não carregam sentido sozinhas. "não", "nem", "sem" ficam de fora de
   propósito: elas mudam o sentido do que vem depois. */
export const STOPWORDS = new Set(('o a os as um uma uns umas de da do das dos e ou em no na nos nas ao aos à às ' +
  'com por para pra pro pelo pela pelos pelas que se é eh ser são sao foi era ele ela eles elas isso isto esse essa ' +
  'este esta aquele aquela lhe seu sua seus suas meu minha nosso nossa voce você quando como mas porque pois entao ' +
  'então também tambem ja já so só mesmo muito muita pouco pouca bem qual quais cada todo toda todos todas ' +
  'tudo algo algum alguma vai vão vao há ha sobre entre quanto quanta aí ai lá la aqui').split(' ').map(w => normTxt(w)));
const NEGATION = new Set(['nao', 'nem', 'nunca', 'jamais', 'sem', 'ninguem', 'nenhum', 'nenhuma']);
/* Verbos auxiliares são transparentes para a negação: em "não pode ter vínculo", o negado é "vínculo". */
const AUX = new Set(['pode', 'podem', 'poder', 'deve', 'devem', 'ter', 'tem', 'teve', 'tinha', 'precisa', 'precisam', 'consegue', 'conseguem', 'esta', 'estao', 'estar', 'fica', 'ficar', 'seja', 'sejam', 'vai', 'vao', 'dar', 'da', 'haver', 'houver'].map(w => w));

/* Radical leve: tira plural, gênero e terminações verbais/nominais comuns, mantendo
   pelo menos 3 letras. "receber", "recebimento" e "recebido" viram "receb";
   "receita" vira "receit". Não mexe em -dor ("devedor", "contador"), para não
   juntar "contador" com "conta". */
const SUFFIXES = ['amentos', 'imentos', 'amento', 'imento', 'acoes', 'icoes', 'ucoes', 'acao', 'icao', 'ucao',
  'arios', 'arias', 'ario', 'ariam', 'eriam', 'iriam', 'arao', 'erao', 'irao', 'aria', 'eria', 'iria',
  'ando', 'endo', 'indo', 'ados', 'adas', 'idos', 'idas', 'ado', 'ada', 'ido', 'ida', 'aram', 'eram', 'iram', 'avam', 'ava', 'amos', 'emos',
  'imos', 'ar', 'er', 'ir', 'am', 'em', 'ou', 'eu', 'iu', 'oes', 'aes', 'ais', 'eis', 'ois', 'es', 'as', 'os', 'is', 'a', 'o', 'e', 's'];
const stemCache = new Map();
export function stem(word){
  const w = normTxt(word);
  if (w.length <= 3 || /\d/.test(w)) return w;
  if (stemCache.has(w)) return stemCache.get(w);
  let s = w;
  if (/veis$/.test(s)) s = s.slice(0, -4) + 'vel';                    /* recebíveis → recebível */
  else if (/[dr]ores$/.test(s)) s = s.slice(0, -2);                  /* credores → credor */
  else if (s.endsWith('ns')) s = s.slice(0, -2) + 'm';               /* bens → bem */
  else for (const suf of SUFFIXES){ if (s.endsWith(suf) && s.length - suf.length >= 3){ s = s.slice(0, -suf.length); break; } }
  if (/[dr]ora$/.test(w)) s = w.slice(0, -1);                         /* devedora → devedor */
  if (/vel$/.test(w)) s = w;                                          /* comparável fica inteiro */
  stemCache.set(w, s);
  return s;
}
/* Dois radicais equivalentes: iguais ou com um erro de digitação (palavras maiores). */
export function sameStem(a, b){
  if (a === b) return true;
  if (a.length < 5 || b.length < 5 || a[0] !== b[0]) return false;
  return lev(a, b) <= 1;
}

/* Divide o texto em palavras com radical e marca palavras vazias, negações e o fim de
   cada trecho (vírgula, ponto...), que limita o alcance de uma negação. */
export function tokenize(text){
  const out = [];
  String(text).split(/[,;.:!?()\n]+/).forEach(clause => {
    const words = normTxt(clause).split(' ').filter(Boolean);
    words.forEach((w, i) => out.push({ w, s:stem(w), stop:STOPWORDS.has(w), neg:NEGATION.has(w), end:i === words.length - 1 }));
  });
  return out;
}
/* Palavra do termo x palavra do texto: palavras vazias precisam ser iguais; as demais, ter o mesmo radical. */
/* Erro de digitação na palavra inteira ("conciliasão"), só para palavras que não existem no app. */
const wordTypo = (a, b) => a.length >= 6 && a[0] === b[0] && lev(a, b) <= (b.length >= 10 ? 2 : 1);
const tokMatch = (term, tok) => term.stop || term.neg ? term.w === tok.w
  : !tok.stop && (tok.s === term.s || (!knownWords().has(tok.w) && (sameStem(tok.s, term.s) || wordTypo(tok.w, term.w))));

/* ---------- índice da base de conhecimento ---------- */
let INDEX = null;
function buildIndex(){
  const byFirst = new Map(), byWord = new Map(), opp = new Map(), oppCtx = new Map(), oppWords = new Map();
  for (const [id, terms] of Object.entries(CONCEPTS)){
    for (const raw of terms){
      const weak = raw.startsWith('~'), toks = tokenize(weak ? raw.slice(1) : raw);
      if (!toks.length || toks.every(t => t.stop)) continue;
      const key = toks[0].stop || toks[0].neg ? toks[0].w : toks[0].s;
      const entry = { id, weak, toks, term:raw.replace(/^~/, '') };
      if (!byFirst.has(key)) byFirst.set(key, []);
      byFirst.get(key).push(entry);
      if (!toks[0].stop && !toks[0].neg && toks[0].w.length >= 6){ if (!byWord.has(toks[0].w)) byWord.set(toks[0].w, []); byWord.get(toks[0].w).push(entry); }
    }
  }
  for (const list of byFirst.values()) list.sort((a, b) => b.toks.length - a.toks.length);
  const add = (m, a, b) => { if (!m.has(a)) m.set(a, new Set()); m.get(a).add(b); };
  OPPOSITES.forEach(([a, b]) => { add(opp, a, b); add(opp, b, a); add(oppCtx, a, b); add(oppCtx, b, a); });
  CONTEXT_OPPOSITES.forEach(([a, b]) => { add(oppCtx, a, b); add(oppCtx, b, a); });
  OPPOSITE_WORDS.forEach(([a, b]) => { const sa = stem(a), sb = stem(b); add(oppWords, sa, sb); add(oppWords, sb, sa); });
  INDEX = { byFirst, byWord, opp, oppCtx, oppWords, keys:[...byFirst.keys()], words:[...byWord.keys()] };
  return INDEX;
}
export function index(){ return INDEX || buildIndex(); }

/* Termos que podem começar nesta palavra: mesma palavra/radical, ou radical com erro de digitação. */
function candidates(tok){
  const idx = index(), out = [];
  if (idx.byFirst.has(tok.w)) out.push(...idx.byFirst.get(tok.w));
  if (tok.s !== tok.w && idx.byFirst.has(tok.s)) out.push(...idx.byFirst.get(tok.s));
  if (out.length || tok.stop || knownWords().has(tok.w)) return out;
  if (tok.s.length >= 5) for (const k of idx.keys) if (k !== tok.s && sameStem(tok.s, k)) out.push(...idx.byFirst.get(k));
  if (!out.length) for (const w of idx.words) if (wordTypo(tok.w, w)) out.push(...idx.byWord.get(w));
  return out;
}

/* Encontra os conceitos citados num texto. Termos mais longos têm prioridade
   ("não importa" é um termo, não uma negação de "importa"). Uma palavra negada
   ("não aumenta") gera o conceito com neg = true. */
/* Confere um termo a partir da palavra i do texto. Palavras pequenas do termo ("de",
   "para") casam com qualquer palavra pequena do texto, ou podem faltar; negações
   precisam ser iguais. Devolve quantas palavras do texto o termo ocupa, ou 0. */
function matchAt(e, toks, used, i){
  let t = i, j = 0;
  const flexible = e.toks.some(x => !x.stop && !x.neg);   /* "não dá" (sem palavra de conteúdo) precisa vir inteiro */
  while (j < e.toks.length){
    const term = e.toks[j], tok = toks[t];
    if (term.stop && !term.neg){
      if (tok && tok.stop && !tok.neg && !used[t] && (tok.w === term.w || (j > 0 && flexible))){ t++; j++; continue; }
      if (j === 0 || !flexible) return 0;
      j++; continue;                                   /* palavra pequena do termo que faltou no texto */
    }
    if (!tok || used[t]) return 0;
    if (tokMatch(term, tok)){ t++; j++; continue; }
    if (j > 0 && flexible && tok.stop && !tok.neg && toks[t + 1] && tokMatch(term, toks[t + 1]) && !used[t + 1]){ t += 2; j++; continue; }
    return 0;
  }
  return t - i;
}

/* Encontra os conceitos citados num texto. Termos mais longos têm prioridade
   ("não importa" é um termo, não uma negação de "importa"). Uma palavra negada
   ("não aumenta") gera o conceito com neg = true. */
export function analyze(text){
  const toks = tokenize(text), used = new Array(toks.length).fill(false), matches = [];
  for (let i = 0; i < toks.length; i++){
    if (used[i]) continue;
    const cands = candidates(toks[i]);
    if (!cands.length) continue;
    let best = [], bestLen = 0, bestSize = 0;
    for (const e of cands){
      const n = matchAt(e, toks, used, i);
      if (!n) continue;
      const size = e.toks.filter(t => !t.stop).length;       /* termo mais específico vence */
      if (size > bestSize || (size === bestSize && n > bestLen)){ best = [e]; bestLen = n; bestSize = size; }
      else if (size === bestSize && n === bestLen) best.push(e);
    }
    if (!best.length) continue;
    const n = bestLen;
    for (let j = 0; j < n; j++) used[i + j] = true;
    const ids = new Map();
    best.forEach(e => { const prev = ids.get(e.id); if (!prev || (prev.weak && !e.weak)) ids.set(e.id, e); });
    const said = toks.slice(i, i + n).map(t => t.w).join(' ');
    ids.forEach(e => matches.push({ id:e.id, weak:e.weak, term:e.term, exact:normTxt(e.term) === said, start:i, end:i + n }));
  }
  /* "não", "nem", "nunca", "sem" soltos negam as duas palavras de conteúdo seguintes, sem
     passar da vírgula. No fim de um trecho ("absoluta não"), negam a palavra anterior. */
  const negate = j => { toks[j].negated = true; matches.forEach(m => { if (j >= m.start && j < m.end) m.neg = true; }); };
  toks.forEach((t, i) => {
    if (!t.neg || used[i]) return;
    if (t.end){
      for (let j = i - 1; j >= 0 && !toks[j].end; j--) if (!toks[j].stop){ negate(j); break; }
      return;
    }
    let seen = 0;
    for (let j = i + 1; j < toks.length && seen < 2; j++){
      if (toks[j].stop || (AUX.has(toks[j].w) && !matches.some(m => m.start === j))){ if (toks[j].end) break; continue; }
      seen++; negate(j);
      if (toks[j].end) break;
    }
  });
  const free = toks.filter((t, i) => !used[i] && !t.stop && !t.neg);
  return { matches, tokens:toks, free };
}

/* strict: só os opostos que valem em qualquer frase; senão, inclui os de contexto. */
export function opposites(id, strict = true){ return (strict ? index().opp : index().oppCtx).get(id) || new Set(); }
export function oppositeWords(s){ return index().oppWords.get(s) || new Set(); }
