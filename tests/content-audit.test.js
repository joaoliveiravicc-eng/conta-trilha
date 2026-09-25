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
