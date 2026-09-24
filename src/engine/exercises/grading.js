/* Corretor local (sem custo, sem IA): ignora maiúsculas, acentos e pontuação,
   tolera erro de digitação, aceita a resposta dentro de uma frase curta e palavras
   da mesma família, e checa respostas dissertativas por palavras-chave. */
import { ALIASES } from '../../content/chart-of-accounts.js';

export function normTxt(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/º|°/g, '').replace(/-/g, '')
    .replace(/[^a-z0-9/%\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
export const STOP = new Set(['o','a','os','as','de','da','do','das','dos','um','uma','e','em','com','para','por','no','na','nos','nas','ao','aos','se','que','eh','sao','ser']);
const NEGATION = new Set(['nao','nem','nunca','jamais']);
const singular = w => (w.length > 3 && w.endsWith('s')) ? w.slice(0, -1) : w;
export function normAns(s){
  const words = normTxt(s).split(' ').filter(Boolean);
  const kept = words.filter(w => !STOP.has(w));
  return (kept.length ? kept : words).map(singular).join(' ');
}
/* Distância de edição; trocar duas letras vizinhas ("sadlo") conta como um erro só. */
export function lev(a, b){
  if (a === b) return 0; const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  const d = Array.from({ length:m + 1 }, (_, i) => [i].concat(Array(n).fill(0)));
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++){
    const cost = a[i - 1] === b[j - 1] ? 0 : 1;
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[m][n];
}
const tolerance = len => len <= 4 ? 0 : len <= 9 ? 1 : 2;
/* Erro de digitação aceitável. Em palavras curtas, a primeira letra precisa bater,
   para não confundir termos diferentes como "caixa" e "baixa". */
function typo(a, b){ return lev(a, b) <= tolerance(b.length) && (b.length > 6 || a[0] === b[0]); }
function commonPrefix(a, b){ let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return i; }
/* 2 = mesma palavra, 1 = digitação ou mesma família (conciliar/conciliação), 0 = diferente */
function wordMatch(w, t){
  if (w === t) return 2;
  if (typo(w, t)) return 1;
  const short = Math.min(w.length, t.length);
  return short >= 7 && commonPrefix(w, t) >= Math.max(6, Math.ceil(short * 0.7)) ? 1 : 0;
}
/* As palavras esperadas aparecem, na ordem, dentro da resposta. */
function inOrder(words, target){
  let i = 0;
  for (const t of target){ while (i < words.length && !wordMatch(words[i], t)) i++; if (i === words.length) return false; i++; }
  return true;
}
/* Compara uma resposta com uma forma aceita. Devolve { lvl, how }:
   lvl 2 = exata, 1 = aceita com diferença, 0 = diferente.
   phrase: aceita a resposta dentro de uma frase curta ("é o saldo da conta"). */
export function matchInfo(input, target, phrase = true){
  const a = normAns(input), b = normAns(target);
  if (!a || !b) return { lvl:0 };
  if (a === b) return { lvl:2, how:'exact' };
  const aw = a.split(' '), bw = b.split(' ');
  if (normTxt(input).split(' ').some(w => NEGATION.has(w))) return { lvl:0 };
  /* palavra por palavra: "INSS" e "ICMS" continuam diferentes */
  if (aw.length === bw.length){
    const m = aw.map((w, i) => wordMatch(w, bw[i]));
    if (m.every(Boolean)) return { lvl:1, how:aw.some((w, i) => m[i] === 1 && !typo(w, bw[i])) ? 'root' : 'typo' };
  }
  if (aw.length !== bw.length && lev(a.replace(/ /g, ''), b.replace(/ /g, '')) === 0) return { lvl:1, how:'typo' };
  if (phrase && aw.length > bw.length && aw.length - bw.length <= 4 && inOrder(aw, bw)) return { lvl:1, how:'phrase' };
  return { lvl:0 };
}
export function fuzzyEq(input, target){ return matchInfo(input, target).lvl; }
export function bestMatchInfo(input, list, phrase = true){
  let best = { lvl:0 };
  list.forEach(t => { const r = matchInfo(input, t, phrase); if (r.lvl > best.lvl) best = Object.assign({ target:t }, r); });
  return best;
}
export function bestMatch(input, list){ return bestMatchInfo(input, list).lvl; }
/* Nomes de conta: sem a regra da frase, porque "Salários a pagar" contém "salários". */
export function acctMatchInfo(input, canon){ return Object.assign(bestMatchInfo(input, [canon].concat(ALIASES[canon] || []), false), { target:canon }); }
export function acctMatch(input, canon){ return acctMatchInfo(input, canon).lvl; }
/* Mensagem curta para quando a resposta foi aceita com alguma diferença. */
export function acceptNote(info){
  if (!info || info.lvl !== 1) return '';
  if (info.how === 'phrase') return 'Aceitei: sua resposta tem o termo certo, “' + info.target + '”. ✓';
  if (info.how === 'root') return 'Aceitei: é a mesma ideia. O termo usado é “' + info.target + '”. ✓';
  return 'Aceitei com uma pequena diferença de digitação. O certo é “' + info.target + '”. ✓';
}
export function evalExpl(text, x){
  const t = ' ' + normTxt(text) + ' ', words = t.trim().split(' ');
  const hits = x.k.map(g => g.slice(1).some(st => {
    const s = normTxt(st); if (!s) return false;
    if (s.indexOf(' ') >= 0) return t.indexOf(' ' + s) >= 0;
    /* palavra que começa com o radical, ou com um erro de digitação nele */
    return words.some(w => w.indexOf(s) === 0 || (s.length >= 5 && w.length >= s.length && lev(w.slice(0, s.length), s) <= 1 && w[0] === s[0]));
  }));
  const n = hits.filter(Boolean).length, need = x.min || Math.max(1, Math.ceil(x.k.length * 0.6));
  return { hits:hits, ok:n >= need, n:n, need:need };
}
