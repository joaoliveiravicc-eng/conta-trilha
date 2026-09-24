import { $, bindActs } from '../dom.js';
import { S, courseUnlocked } from '../../engine/state.js';
import { fmt } from '../../engine/format.js';
import { shuffle } from '../../engine/random.js';
import { tbl } from '../../content/render-helpers.js';
import { COURSES } from '../../content/index.js';
import { CASES } from '../../content/cases.js';
import { CHART } from '../../content/chart-of-accounts.js';
import { sheet } from '../router.js';
import { startSession } from './quiz.js';

export function caseBalanceteHTML(cs){
  const bal = {};
  cs.ev.forEach(e => { e[1].forEach(p => { bal[p[0]] = (bal[p[0]] || 0) + p[1]; }); e[2].forEach(p => { bal[p[0]] = (bal[p[0]] || 0) - p[1]; }); });
  const g = { AC:[], ANC:[], PC:[], PNC:[], PL:[], REC:[], DESP:[] };
  Object.keys(bal).forEach(a => { const grp = CHART[a]; if (grp && Math.abs(bal[a]) > 0.004) g[grp].push([a, bal[a]]); });
  const ativo = g.AC.concat(g.ANC), passivo = g.PC.concat(g.PNC);
  const ativoT = ativo.reduce((a, x) => a + x[1], 0);
  const passivoT = passivo.reduce((a, x) => a - x[1], 0);
  const plBase = g.PL.reduce((a, x) => a - x[1], 0);
  const receitaT = g.REC.reduce((a, x) => a - x[1], 0), despesaT = g.DESP.reduce((a, x) => a + x[1], 0);
  const lucro = receitaT - despesaT, plT = plBase + lucro;
  const rows = []; const maxN = Math.max(ativo.length, passivo.length + 2);
  for (let i = 0; i < maxN; i++){
    const L = ativo[i] ? [ativo[i][0], fmt(ativo[i][1])] : ['', ''];
    let Rn = '', Rv = '';
    if (i < passivo.length){ Rn = passivo[i][0]; Rv = fmt(passivo[i][1]); }
    else if (i === passivo.length) { Rn = 'Capital social e reservas'; Rv = fmt(plBase); }
    else if (i === passivo.length + 1) { Rn = 'Lucro do período'; Rv = fmt(lucro); }
    rows.push([L[0], L[1], Rn, Rv]);
  }
  rows.push(['<b>Total do Ativo</b>', '<b>' + fmt(ativoT) + '</b>', '<b>Total</b>', '<b>' + fmt(passivoT + plT) + '</b>']);
  return '<div class="card" style="margin-top:14px;text-align:left"><div class="sec-h" style="margin:0 0 10px">📒 Balanço da sua empresa</div>' + tbl(['Ativo', 'R$', 'Passivo e PL', 'R$'], rows) +
    '<div class="small muted" style="padding:0 2px 2px">Receitas de R$ ' + fmt(receitaT) + ' menos despesas de R$ ' + fmt(despesaT) + ' = lucro de R$ ' + fmt(lucro) + '. Seus lançamentos fecharam certinho: Ativo = Passivo + PL!</div></div>';
}
export function renderCases(root, activeCourses = COURSES){
  const visible = CASES.filter(cs => activeCourses.some(c => c.id === cs.req));
  root.innerHTML = visible.length ? visible.map(cs => {
    const req = COURSES.find(c => c.id === cs.req), un = req && courseUnlocked(req);
    const done = !!S.cases[cs.id];
    return '<button class="pcard" data-act="case" data-id="' + cs.id + '" ' + (un ? '' : 'disabled') + '><div class="pe" style="background:' + cs.color + '22">' + cs.icon + '</div><div><div class="pt">' + cs.title + (done ? ' ✓' : '') + '</div><div class="ps">' + (un ? (cs.ev.length + ' lançamentos para registrar' + (done ? ' · concluído' : '')) : ('Libera após a trilha ' + (req ? req.title : ''))) + '</div></div></button>';
  }).join('') : '<p class="small muted">Os casos desta área aparecem aqui conforme você avança.</p>';
  bindActs(root, { case: b => openCase(CASES.find(c => c.id === b.dataset.id)) });
}
export function openCase(cs){
  sheet('<div class="sh-i">' + cs.icon + '</div><h3>' + cs.title + '</h3><p class="sh-s">' + cs.story + '</p><button class="btn primary" data-s="go">Começar o caso</button><button class="btn ghost" data-s="x">Agora não</button>',
    { go: () => startCase(cs) });
}
export function startCase(cs){
  const items = cs.ev.map((e, i) => ({ key:cs.id + '#' + i, x:{ t:'entry', q:e[0], d:e[1].map(p => p[0]), c:e[2].map(p => p[0]), accts:shuffle(e[1].map(p => p[0]).concat(e[2].map(p => p[0]), e[3])), e:caseExplain(e) } }));
  startSession({ kind:'case', caseObj:cs, items:items, hearts:999 });
}
export function caseExplain(e){
  const d = e[1].map(p => p[0] + ' R$ ' + fmt(p[1])).join(' + '), c = e[2].map(p => p[0] + ' R$ ' + fmt(p[1])).join(' + ');
  return 'Débito: ' + d + '. Crédito: ' + c + '.';
}
