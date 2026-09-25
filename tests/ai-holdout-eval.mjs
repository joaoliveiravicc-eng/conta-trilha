import { EX } from '../src/content/index.js';
import { grade } from './ai-eval.mjs';
import { HOLDOUT } from './ai-holdout.js';
const tally = {}, bad = [];
for (const [key, answer, label] of HOLDOUT){
  const rules = grade(key, answer, { noAI:true }).final, g = grade(key, answer), k = EX[key].x.t + ':' + label;
  tally[k] = tally[k] || { regras:0, ia:0, sugestao:0, total:0 }; tally[k].total++;
  if (rules === 'right') tally[k].regras++; if (g.final === 'right') tally[k].ia++; if (g.final === 'unsure') tally[k].sugestao++;
  if ((label === 'wrong' && g.final !== 'wrong') || (label === 'right' && g.final !== 'right')) bad.push(`${label.padEnd(5)} → ${g.final.padEnd(6)} ${key.padEnd(9)} ${JSON.stringify(answer)} ${g.note ? '| ' + g.note : ''}`);
}
for (const [k, v] of Object.entries(tally).sort()) console.log(k.padEnd(12), 'total', String(v.total).padStart(2), '| aceitas só regras', String(v.regras).padStart(2), '| aceitas regras+IA', String(v.ia).padStart(2), '| sugestão', String(v.sugestao).padStart(2));
console.log('--- divergências (' + bad.length + ')'); bad.forEach(b => console.log(' ', b));
