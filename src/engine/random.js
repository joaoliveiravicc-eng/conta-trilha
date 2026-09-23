export function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
export const rint = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = a => a[Math.random() * a.length | 0];

/* Gerador determinístico a partir de uma string (usado pelas missões diárias, que
   precisam sortear as mesmas missões pra todo mundo no mesmo dia). */
export function seeded(str){
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++){ h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  return function(){ h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); h ^= h >>> 16; return (h >>> 0) / 4294967296; };
}
