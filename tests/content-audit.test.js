import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES } from '../src/content/index.js';
import { GLOSS } from '../src/content/glossary.js';
import { TIPS } from '../src/content/tips.js';

/* Verificações de qualidade do conteúdo que nasceram da auditoria de setembro de 2026.
   Cada uma protege contra um defeito que já existiu de verdade. */

const strip = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const lessons = COURSES.flatMap(c => c.lessons);
const reviews = COURSES.filter(c => c.review).map(c => c.review);
const exercises = lessons.concat(reviews).flatMap(l => l.ex.map((x, i) => ({ l, x, i, id: l.id + '#' + i })));

test('HTML: só tags conhecidas (um "<HOJE()" solto já cortou uma pergunta)', () => {
  const allowed = new Set(['p', 'b', 'div', 'table', 'thead', 'tr', 'th', 'tbody', 'td', 'ul', 'li', 'ol', 'span', 'br', 'a', 'code', 'sup', 'strong', 'em', 'i', 'small', 'sub']);
  const found = [];
  const walk = (v, where) => {
    if (typeof v === 'string'){ for (const m of v.matchAll(/<\/?([a-zA-Z][a-zA-Z0-9]*)/g)) if (!allowed.has(m[1].toLowerCase())) found.push(where + ' → ' + m[0]); }
    else if (Array.isArray(v)) v.forEach((x, i) => walk(x, where + '[' + i + ']'));
    else if (v && typeof v === 'object') Object.keys(v).filter(k => !['course', 'unit', 'lesson'].includes(k)).forEach(k => walk(v[k], where + '.' + k));
  };
  lessons.forEach(l => { walk({ t: l.title, g: l.goal, r: l.recap, learn: l.learn }, l.id); });
  exercises.forEach(({ x, id }) => walk(x, id));
  walk(GLOSS, 'GLOSS'); walk(TIPS, 'TIPS');
  assert.deepEqual(found, []);
});

test('HTML: tags de abertura e fechamento equilibradas nos cartões de teoria', () => {
  const bad = [];
  for (const l of lessons) l.learn.forEach((card, i) => {
    const open = (card.b.match(/<(div|p|ul|ol|table|span|b|strong|em|li|tr|td|th)\b/g) || []).length;
    const close = (card.b.match(/<\/(div|p|ul|ol|table|span|b|strong|em|li|tr|td|th)>/g) || []).length;
    if (open !== close) bad.push(l.id + ' cartão ' + (i + 1));
  });
  assert.deepEqual(bad, []);
});

test('texto: sem lixo de template (undefined, NaN, [object], caractere de substituição)', () => {
  const junk = /�|\bundefined\b|\bNaN\b|\[object|\bnull\b/;
  const bad = [];
  for (const { l, x, id } of exercises){
    const all = [x.q, x.e, x.h, x.model, ...(x.o || []), ...(x.items || []).map(v => Array.isArray(v) ? v[0] : v), ...(x.pairs || []).flat()].filter(Boolean).join(' | ');
    if (junk.test(all)) bad.push(id);
  }
  for (const l of lessons) if (junk.test(l.learn.map(c => c.h + c.b).join(' '))) bad.push(l.id + ' teoria');
  assert.deepEqual(bad, []);
});

test('perguntas valem sozinhas: nada de "no caso anterior" (desafios e revisões embaralham tudo)', () => {
  const ref = /\b(no|do|nesse|neste|desse|deste)\s+(caso|exemplo|exerc[ií]cio|epis[oó]dio)\s+anterior\b|\bmesmo\s+(caso|exemplo)\b|\bno\s+mesmo\s+exemplo\b|\bque\s+apareceram\b|\b(este|neste|deste)\s+epis[oó]dio\b/i;
  const bad = exercises.filter(({ x }) => x.t !== 'expl' && ref.test(strip(x.q || x.name || ''))).map(e => e.id + ': ' + strip(e.x.q).slice(0, 70));
  assert.deepEqual(bad, []);
});

test('lições "Na prática": perguntas de resultado e de fechamento trazem os dados junto', () => {
  const needFacts = /resultado do epis[oó]dio|Caixa \+ Bancos come[çc]am|epis[oó]dio terminou com preju/i;
  const needBalancete = /Qual o total de receitas do m[êe]s|Qual foi o lucro do m[êe]s|O m[êe]s fechou com preju|Qual o total do Ativo no fim|Qual o patrim[ôo]nio l[íi]quido no fim/i;
  let checked = 0; const bad = [];
  for (const { x, id } of exercises){
    const q = strip(x.q || '');
    if (needFacts.test(q)){ checked++; if (!/class="facts"/.test(x.q)) bad.push(id + ' sem fatos'); }
    if (needBalancete.test(q)){ checked++; if (!/<table/.test(x.q)) bad.push(id + ' sem balancete'); }
  }
  assert.ok(checked >= 40, 'esperava encontrar as perguntas dos 4 negócios, achei ' + checked);
  assert.deepEqual(bad, []);
});

test('exercícios: estrutura válida por tipo', () => {
  const bad = [];
  for (const { x, id } of exercises){
    const fail = m => bad.push(id + ' (' + x.t + '): ' + m);
    if (!x.e || strip(x.e).length < 4) fail('sem explicação');
    switch (x.t){
      case 'mc':
        if (new Set(x.o.map(s => strip(s).toLowerCase())).size !== x.o.length) fail('opções repetidas');
        if (x.o.some(s => !strip(s))) fail('opção vazia');
        if (x.o.length < 2 || x.o.length > 5) fail('número de opções');
        break;
      case 'fill':
        if ((x.q.match(/___/g) || []).length !== x.a.length) fail('lacunas ≠ respostas');
        if (x.a.some(a => !x.o.includes(a))) fail('resposta fora das fichas');
        break;
      case 'match':
        if (new Set(x.pairs.map(p => p[0])).size !== x.pairs.length || new Set(x.pairs.map(p => p[1])).size !== x.pairs.length) fail('pares repetidos');
        break;
      case 'entry':
        if (![].concat(x.d, x.c).every(a => x.accts.includes(a))) fail('conta fora do banco');
        if (new Set(x.accts).size !== x.accts.length) fail('contas repetidas');
        break;
      case 'class':
        if (x.items.some(it => !(it[1] >= 0 && it[1] < x.cats.length))) fail('categoria inválida');
        break;
      case 'ord':
        if (new Set(x.items).size !== x.items.length) fail('itens repetidos');
        break;
      case 'wr':
        if (!x.a.length || x.a.some(a => !String(a).trim())) fail('sem resposta aceita');
        break;
      case 'expl':
        if (!x.k?.length || !x.model) fail('sem ideias-chave');
        break;
    }
  }
  assert.deepEqual(bad, []);
});

test('glossário: termos únicos e definições não vazias', () => {
  const names = GLOSS.map(g => g[0].toLowerCase());
  assert.equal(new Set(names).size, names.length);
  GLOSS.forEach(g => assert.ok(g[1] && g[1].length > 10, g[0]));
});

test('múltipla escolha: a alternativa certa não se entrega pelo tamanho', () => {
  // Antes da auditoria, a certa era a mais longa em 66% das perguntas (e mais de 2 vezes maior em 102).
  const ratio = [], extreme = []; let mc = 0, longest = 0; const perCourse = {};
  for (const c of COURSES) for (const l of c.lessons) l.ex.forEach((x, i) => {
    if (x.t !== 'mc') return;
    mc++;
    assert.ok(x.o.every(o => !String(o).startsWith('*')), l.id + '#' + i + ' com "*" sobrando');
    const lens = x.o.map(o => strip(o).length), right = lens[x.a], others = lens.filter((_, k) => k !== x.a);
    const max = Math.max(...others), mean = others.reduce((a, b) => a + b, 0) / others.length;
    if (right > max) longest++;
    if (right >= 40 && right >= 1.6 * max) extreme.push(l.id + '#' + i + ' (' + right + ' x ' + max + ')');
    (perCourse[c.id] = perCourse[c.id] || []).push(right / mean); ratio.push(right / mean);
  });
  const median = a => a.slice().sort((p, q) => p - q)[Math.floor(a.length / 2)];
  assert.deepEqual(extreme, [], 'alternativa certa muito maior que as outras');
  assert.ok(longest / mc <= 0.35, 'a certa é a mais longa em ' + Math.round(longest / mc * 100) + '% das perguntas');
  assert.ok(median(ratio) <= 1.2, 'mediana geral ' + median(ratio).toFixed(2));
  for (const [id, r] of Object.entries(perCourse)) assert.ok(median(r) <= 1.3, id + ': mediana ' + median(r).toFixed(2));
});

test('verdadeiro ou falso: as respostas verdadeiras não dominam (58% antes da auditoria)', () => {
  let t = 0, f = 0; const perCourse = {};
  for (const c of COURSES) for (const l of c.lessons) for (const x of l.ex) if (x.t === 'tf'){
    x.a ? t++ : f++; const p = perCourse[c.id] = perCourse[c.id] || { t:0, f:0 }; x.a ? p.t++ : p.f++;
  }
  assert.ok(t / (t + f) <= 0.58 && t / (t + f) >= 0.42, 'verdadeiras: ' + Math.round(t / (t + f) * 100) + '%');
  for (const [id, p] of Object.entries(perCourse)) assert.ok(p.t / (p.t + p.f) <= 0.78, id + ' com ' + p.t + ' verdadeiras e ' + p.f + ' falsas');
});

test('toda lição termina com um resumo próprio ("Leve com você"), e não com os títulos dos cartões', () => {
  const bad = [];
  for (const l of lessons){
    const r = l.recap;
    if (!Array.isArray(r) || r.length < 2 || r.length > 4){ bad.push(l.id + ': ' + (r ? r.length : 0) + ' itens'); continue; }
    if (r.some(t => typeof t !== 'string' || t.trim().length < 12 || t.length > 220)) bad.push(l.id + ': item vazio ou longo demais');
    if (new Set(r).size !== r.length) bad.push(l.id + ': item repetido');
    if (/<HOJE|undefined|NaN/.test(r.join(' '))) bad.push(l.id + ': lixo de template');
  }
  assert.deepEqual(bad, []);
});
