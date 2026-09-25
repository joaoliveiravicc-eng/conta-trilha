/* Relatório do corretor (regras + IA) sobre tests/ai-cases.js: node tests/ai-eval.mjs [-v] */
import { EX } from '../src/content/index.js';
import { bestMatchInfo, evalExpl } from '../src/engine/exercises/grading.js';
import { review, phraseProblem } from '../src/engine/ai/review.js';
import { CASES, KNOWN_KEYWORD_LEAKS } from './ai-cases.js';

export function grade(key, answer, opts = {}){
  const x = EX[key].x;
  let rules;
  if (x.t === 'wr'){ const info = bestMatchInfo(answer, x.a); rules = info.lvl >= 1 && !(info.how === 'phrase' && !opts.noAI && phraseProblem(x, answer)); }
  else rules = evalExpl(answer, x).ok;
  if (opts.noAI) return { final:rules ? 'right' : 'wrong', by:'regras' };
  if (rules && x.t !== 'expl') return { final:'right', by:'regras' };
  const r = review(x, answer);
  if (rules) return r.veto ? { final:'wrong', by:'IA (veto)', note:r.note } : { final:'right', by:'regras' };
  return { final:r.verdict === 'none' ? 'wrong' : r.verdict, by:'IA', note:r.note || '' };
}

const verbose = process.argv.includes('-v');
if (process.argv[1] && process.argv[1].endsWith('ai-eval.mjs')){
  for (const mode of [{ noAI:true, name:'só regras' }, { name:'regras + IA' }]){
    const tally = {}; const bad = [];
    for (const [key, answer, label] of CASES){
      const t = EX[key].x.t, g = grade(key, answer, mode), k = t + ':' + label;
      tally[k] = tally[k] || { right:0, unsure:0, wrong:0 }; tally[k][g.final]++;
      if ((label === 'wrong' && g.final !== 'wrong') || (label === 'right' && g.final !== 'right') || (label === 'maybe' && g.final === 'wrong'))
        bad.push(`${label.padEnd(5)} → ${g.final.padEnd(6)} ${key.padEnd(9)} ${JSON.stringify(answer)} ${g.note ? '| ' + g.note : ''}`);
    }
    console.log('\n=== ' + mode.name + ' ===');
    for (const [k, v] of Object.entries(tally).sort()) console.log(k.padEnd(14), 'aceitas', String(v.right).padStart(3), '| sugestão', String(v.unsure).padStart(3), '| recusadas', String(v.wrong).padStart(3));
    if (verbose || mode.name !== 'só regras'){ console.log('--- divergências (' + bad.length + ')'); bad.forEach(b => console.log(' ', b)); }
  }
  const leaks = KNOWN_KEYWORD_LEAKS.filter(([k, a]) => evalExpl(a, EX[k].x).ok), caught = leaks.filter(([k, a]) => grade(k, a).final === 'wrong');
  console.log('\nerradas que as palavras-chave aceitam:', leaks.length, '| recusadas pela IA:', caught.length);
}
