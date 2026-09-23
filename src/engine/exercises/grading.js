/* Corretor local (sem custo, sem IA): tolera erro de digitação e sinônimos de
   nomes de conta, e checa respostas dissertativas por palavras-chave. */
import { ALIASES } from '../../content/chart-of-accounts.js';

export function normTxt(s){
  return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/º|°/g, '').replace(/-/g, '')
    .replace(/[^a-z0-9/%\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
export const STOP = new Set(['o','a','os','as','de','da','do','das','dos','um','uma','e','em','com','para','por','no','na','nos','nas']);
export function normAns(s){
  const words = normTxt(s).split(' ').filter(Boolean);
  const kept = words.filter(w => !STOP.has(w));
  return (kept.length ? kept : words).map(w => (w.length > 3 && w.endsWith('s')) ? w.slice(0, -1) : w).join(' ');
}
export function lev(a, b){
  if (a === b) return 0; const m = a.length, n = b.length; if (!m) return n; if (!n) return m;
  let prev = Array.from({ length:n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++){ const cur = [i]; for (let j = 1; j <= n; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); prev = cur; }
  return prev[n];
}
/* 2 = exato, 1 = pequeno erro de digitação, 0 = diferente */
export function fuzzyEq(input, target){
  const a = normAns(input), b = normAns(target);
  if (!a) return 0; if (a === b) return 2;
  const tol = b.length <= 4 ? 0 : b.length <= 9 ? 1 : 2;
  return lev(a, b) <= tol ? 1 : 0;
}
export function bestMatch(input, list){ let best = 0; list.forEach(t => { best = Math.max(best, fuzzyEq(input, t)); }); return best; }
export function acctMatch(input, canon){ return bestMatch(input, [canon].concat(ALIASES[canon] || [])); }
export function evalExpl(text, x){
  const t = ' ' + normTxt(text) + ' ', words = t.trim().split(' ');
  const hits = x.k.map(g => g.slice(1).some(st => {
    const s = normTxt(st); if (!s) return false;
    if (s.indexOf(' ') >= 0) return t.indexOf(' ' + s) >= 0;
    return words.some(w => w.indexOf(s) === 0);
  }));
  const n = hits.filter(Boolean).length, need = x.min || Math.max(1, Math.ceil(x.k.length * 0.6));
  return { hits:hits, ok:n >= need, n:n, need:need };
}
