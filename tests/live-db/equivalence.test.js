/* Equivalência: o veredito do corretor SQL (live_grade) é o mesmo do corretor do app (reference-grader)
   para todos os mc/tf/num do catálogo, incluindo as bordas da tolerância numérica. */
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { COURSES } from '../../src/content/index.js';
import { projectExercise, isLiveSupported } from '../../src/live/projection.js';
import { refGradeMC, refGradeTF, refGradeNum } from '../../src/live/reference-grader.js';
import { admin, rpc, newTeacher, close } from './helpers.js';

after(close);
const seeded = seed => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const catalog = COURSES.flatMap(c => c.lessons.flatMap(l => l.ex || [])).filter(x => ['mc', 'tf', 'num'].includes(x.t));

function candidates(x, it){
  if (x.t === 'mc') return it.public.options.map((o, i) => ({ payload: { choice: i }, expected: refGradeMC(x, o) }));
  if (x.t === 'tf') return [true, false].map(v => ({ payload: { value: v }, expected: refGradeTF(x, v) }));
  const t = it.key.tol, a = x.a, vals = new Set([a, a + t, a - t, a + t * (1 + 1e-9), a - t * (1 + 1e-9), a + t + 0.005, a - t - 0.005,
    a + t * 0.999999, a * 2, -a, 0, a + 1, a - 1, a + 0.01, a + 0.015, a * 1.002, a * 0.998, a * 1.0021, a * 0.9979]);
  return [...vals].filter(Number.isFinite).map(v => ({ payload: { value: v }, expected: refGradeNum(x, v) }));
}

test('live_grade == corretor do app em todo o catálogo mc/tf/num (inclui bordas da tolerância)', async () => {
  const cases = [];
  catalog.forEach((x, k) => {
    const it = projectExercise(x, { rng: seeded(k + 1) });
    candidates(x, it).forEach(c => cases.push({ i: cases.length, k: x.key, t: it.type, pub: it.public, key: it.key, payload: c.payload, expected: c.expected }));
  });
  assert.ok(cases.length > 5000, 'casos gerados: ' + cases.length);
  const rows = await admin(`select x.i, public.live_grade(x.t, x.key, x.payload) as got, public.live_payload_ok(x.t, x.pub, x.payload) as valid
                            from jsonb_to_recordset($1::jsonb) as x(i int, t text, pub jsonb, key jsonb, payload jsonb)`, [JSON.stringify(cases)]);
  assert.equal(rows.length, cases.length);
  const diverge = rows.filter(r => r.got !== cases[r.i].expected).slice(0, 5).map(r => ({ ex: cases[r.i].k, payload: cases[r.i].payload, key: cases[r.i].key, sql: r.got, app: cases[r.i].expected }));
  assert.deepEqual(diverge, [], 'divergência entre app e SQL');
  assert.equal(rows.filter(r => !r.valid).length, 0, 'o validador de payload recusou uma resposta legítima');
  const byType = {}; cases.forEach(c => { byType[c.t] = (byType[c.t] || 0) + 1; });
  const right = cases.filter(c => c.expected).length;
  console.log('equivalência: ' + cases.length + ' veredictos idênticos', JSON.stringify(byType), 'corretos:', right, 'errados:', cases.length - right);
});

test('o servidor aceita como válido todo o catálogo projetado (1 atividade por 40 itens)', async () => {
  const teacher = await newTeacher('equiv');
  let total = 0;
  for (let i = 0; i < catalog.length; i += 40) {
    const items = catalog.slice(i, i + 40).map((x, k) => projectExercise(x, { rng: seeded(i + k + 1) }));
    const id = await rpc(teacher, 'live_create_activity', 'Catálogo ' + i, 'formative', {}, items);
    assert.ok(id);
    total += items.length;
  }
  assert.equal(total, catalog.length);
  const [{ n }] = await admin('select count(*)::int n from public.live_activity_item_keys k join public.live_activity_items i on i.id = k.item_id join public.live_activities a on a.id = i.activity_id where a.owner_id = $1', [teacher]);
  assert.equal(n, catalog.length);
});
