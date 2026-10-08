/* ContaTrilha Live: projeção enunciado/gabarito e isolamento do progresso. Não usa banco. */
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { COURSES } from '../src/content/index.js';
import { LIVE_TYPES, isLiveSupported, projectExercise, defaultNumTolerance } from '../src/live/projection.js';
import { refGradeMC, refGradeTF, refGradeNum } from '../src/live/reference-grader.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const all = COURSES.flatMap(c => c.lessons.flatMap(l => (l.ex || []).map(x => ({ x, lesson: l.id }))));
const supported = all.filter(({ x }) => LIVE_TYPES.includes(x.t));
const seeded = seed => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };

test('live: todo mc/tf/num do catálogo pode virar item (nenhum fica de fora em silêncio)', () => {
  const bad = supported.filter(({ x }) => !isLiveSupported(x)).map(({ x }) => x.key);
  assert.deepEqual(bad, [], 'exercícios mc/tf/num que o servidor recusaria: ' + bad.join(', '));
  assert.ok(supported.length >= 1300, 'catálogo esperado com ~1350 itens, veio ' + supported.length);
});

test('live: o enunciado público nunca carrega gabarito, explicação ou dica', () => {
  const FORBIDDEN = ['a', 'answer', 'tol', 'e', 'h', 'explanation', 'model', 'k', 'hint'];
  supported.forEach(({ x }) => {
    const it = projectExercise(x, { rng: seeded(7) });
    const keys = Object.keys(it.public);
    assert.ok(keys.every(k => !FORBIDDEN.includes(k)), x.key + ': chave proibida em public ' + keys);
    const allowed = { mc: ['q', 'options'], tf: ['q'], num: ['q', 'prefix', 'suffix'] }[it.type];
    assert.ok(keys.every(k => allowed.includes(k)), x.key + ': chave fora da lista ' + keys);
    assert.ok(!('h' in it.public) && !JSON.stringify(it.public).includes(String(x.h || '\u0000')), x.key + ': dica vazou no enunciado');
  });
});

test('live: mc embaralha sem perder a alternativa correta; gabarito aponta o texto certo', () => {
  supported.filter(({ x }) => x.t === 'mc').forEach(({ x }, i) => {
    const it = projectExercise(x, { rng: seeded(i + 1) });
    assert.deepEqual([...it.public.options].sort(), [...x.o].sort(), x.key);
    assert.equal(it.public.options[it.key.answer], x.o[x.a], x.key + ': índice do gabarito não aponta a alternativa certa');
  });
});

test('live: o embaralhamento tira a certa de uma posição fixa', () => {
  const pos = new Set();
  const x = supported.find(({ x }) => x.t === 'mc').x;
  for (let s = 1; s <= 60; s++) pos.add(projectExercise(x, { rng: seeded(s * 7919) }).key.answer);
  assert.ok(pos.size >= 3, 'a certa caiu sempre nas mesmas posições: ' + [...pos]);
});

test('live: tolerância numérica resolvida na projeção é a mesma do app', () => {
  supported.filter(({ x }) => x.t === 'num').forEach(({ x }) => {
    const it = projectExercise(x);
    assert.equal(it.key.tol, x.tol !== undefined ? x.tol : 0.015 + Math.abs(x.a) * 0.002, x.key);
    assert.equal(it.key.tol, x.tol !== undefined ? x.tol : defaultNumTolerance(x.a));
    assert.equal(it.key.answer, x.a);
  });
});

test('live: tipos fora da entrega 1 são recusados', () => {
  ['wr', 'expl', 'ew', 'entry', 'tsal', 'fill', 'class', 'match', 'ord'].forEach(t => {
    const x = all.find(({ x }) => x.t === t).x;
    assert.equal(isLiveSupported(x), false, t);
    assert.throws(() => projectExercise(x), /não suportado/);
  });
});

test('live: o corretor de referência concorda com o gabarito projetado', () => {
  supported.forEach(({ x }) => {
    const it = projectExercise(x, { rng: seeded(3) });
    if (x.t === 'mc') it.public.options.forEach((o, i) => assert.equal(refGradeMC(x, o), i === it.key.answer, x.key));
    if (x.t === 'tf') { assert.equal(refGradeTF(x, x.a), true); assert.equal(refGradeTF(x, !x.a), false); }
    if (x.t === 'num') { assert.equal(refGradeNum(x, x.a), true); assert.equal(refGradeNum(x, x.a + it.key.tol * 2 + 1), false); }
  });
});

test('live: o corretor de referência ainda espelha o renderizador do app (alarme de deriva)', () => {
  const src = fs.readFileSync(path.join(ROOT, 'src/ui/screens/quiz-renderers.js'), 'utf8').replace(/\s+/g, ' ');
  [
    'check: () => ui.sel === x.a,',
    'const ans = x.a ? 0 : 1;',
    'check: () => ui.sel === ans,',
    'check: () => Math.abs(parseBR(inp.value) - x.a) <= (x.tol !== undefined ? x.tol : 0.015 + Math.abs(x.a) * 0.002)',
  ].forEach(expr => assert.ok(src.includes(expr), 'o renderizador mudou; revise src/live/reference-grader.js e a função SQL live_grade: ' + expr));
});

test('live: o código do Live não toca no progresso, no armazenamento nem no sync do app', () => {
  const dir = path.join(ROOT, 'src/live');
  fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
    const code = fs.readFileSync(path.join(dir, f), 'utf8');
    assert.ok(!/engine\/(state|storage|merge|sync-supabase|gamification)/.test(code), f + ' importa módulo de progresso');
    assert.ok(!/localStorage|sessionStorage|indexedDB/.test(code), f + ' usa armazenamento local');
  });
});
