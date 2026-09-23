/* Funções-fábrica que descrevem um exercício de forma compacta. */
/* Cada uma retorna um objeto { t: <tipo>, ... } consumido pelo motor de exercícios (engine/exercises/grading.js e ui/screens/quiz.js). */

export function mc(q, o, e, h){ const a = o.findIndex(s => s[0] === '*'); return { t:'mc', q:q, o:o.map(s => s.replace(/^\*/, '')), a:a, e:e, h:h }; }
export function tf(q, a, e, h){ return { t:'tf', q:q, a:a, e:e, h:h }; }
export function fl(q, extra, e, h){ const a = []; const qq = q.replace(/\{([^}]+)\}/g, function(_, w){ a.push(w); return '___'; }); return { t:'fill', q:qq, o:a.concat(extra), a:a, e:e, h:h }; }
export function mt(pairs, e){ return { t:'match', pairs:pairs, e:e }; }
export function en(q, d, c, extra, e, h){ d = d.split('+'); c = c.split('+'); return { t:'entry', q:q, d:d, c:c, accts:d.concat(c, extra), e:e, h:h }; }
export function cl(q, cats, items, e){ return { t:'class', q:q, cats:cats, items:items.split('|').map(function(s){ const i = s.lastIndexOf(':'); return [s.slice(0, i), +s.slice(i + 1)]; }), e:e }; }
export function nu(q, a, e, u, h, tol){ const o = { t:'num', q:q, a:a, e:e, h:h }; if (u === 'R$') o.u = 'R$'; else if (u) o.s = u; if (tol !== undefined) o.tol = tol; return o; }
export function wr(q, a, e, h){ return { t:'wr', q:q, a:[].concat(a), e:e, h:h }; }
export function ew(q, d, c, e, h){ return { t:'ew', q:q, d:d.split('+'), c:c.split('+'), e:e, h:h }; }
export function od(q, items, e, h){ return { t:'ord', q:q, items:items, e:e, h:h }; }
export function ep(q, model, k, e, min){ return { t:'expl', q:q, model:model, k:k, e:e, min:min }; }
export function ts(name, deb, cred, e){ return { t:'tsal', name:name, deb:deb, cred:cred, e:e }; }
