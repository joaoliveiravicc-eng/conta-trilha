import test from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, EX } from '../src/content/index.js';
import { areaForCourse } from '../src/content/areas.js';
import { BADGES } from '../src/content/badges.js';
import { fresh, normalize } from '../src/engine/state.js';
import { mergeProgress } from '../src/engine/merge.js';
import { spacedItems } from '../src/engine/learning.js';
import { TRAIN_SIZE, TRAIN_MIN, BANK_SHARE, trainingBank, trainingSize, previousCourseOf, trainingSources, trainingSpot, trainingSpots, trainingReady, trainingItems,
  trainingRecord, trainingReward, trainedLessons, rescheduleReviews, trainingId } from '../src/engine/training.js';

const prevOf = c => previousCourseOf(c, COURSES, areaForCourse);
const doneAll = lessons => Object.fromEntries(lessons.map(l => [l.id, true]));
const DATE = '2026-09-25';

test('treino: cada etapa revisa só o que veio antes; oficinas e a primeira trilha da área não têm treino', () => {
  for (const c of COURSES){
    const prev = prevOf(c);
    for (const u of c.units){
      const sources = trainingSources(c, u, prev);
      if (u.lessons.some(l => l.optional)){ assert.deepEqual(sources, [], c.id + ' oficina'); continue; }
      sources.forEach(l => { assert.ok(!l.optional); assert.ok(l.course === c ? l.unit.idx < u.idx : l.course === prev); });
      if (u.idx > 0) assert.ok(sources.length > 0, c.id + ' etapa ' + u.idx);
      if (u.idx === 0) assert.equal(sources.length > 0, !!prev && !c.open, c.id + ' primeira etapa');
    }
  }
  const antes = COURSES.find(c => c.id === 'antes'), base = COURSES.find(c => c.id === 'base');
  assert.equal(trainingSpot(antes, antes.units[0], null), null);
  assert.equal(trainingSpot(base, base.units[0], antes).sources.length, antes.lessons.filter(l => !l.optional).length);
  const excel = COURSES.find(c => c.id === 'car_excel');
  assert.equal(trainingSpot(excel, excel.units[0], prevOf(excel)), null, 'trilha aberta não revisa a anterior');
  assert.ok(trainingSpots(COURSES[0], null).length >= 3);
});

test('treino: abre só para quem chegou à etapa e já estudou o suficiente', () => {
  const c = COURSES[0], spot = trainingSpot(c, c.units[1], null);
  assert.equal(trainingReady(spot, {}, true), false);
  assert.equal(trainingReady(spot, doneAll(c.units[0].lessons.slice(0, TRAIN_MIN - 1)), true), false);
  assert.equal(trainingReady(spot, doneAll(c.units[0].lessons), false), false);
  assert.equal(trainingReady(spot, doneAll(c.units[0].lessons), true), true);
});

test('treino: escolhe só lições concluídas, sem questão aberta, sem repetir e com tamanho proporcional', () => {
  const c = COURSES[0], lessons = c.lessons.filter(l => !l.optional);
  const state = Object.assign(fresh(), { done:doneAll(lessons) });
  const items = trainingItems(lessons, state, DATE);
  assert.equal(items.length, TRAIN_SIZE);
  assert.equal(new Set(items.map(i => i.key)).size, items.length);
  items.forEach(i => { assert.notEqual(i.x.t, 'expl'); assert.equal(EX[i.key].x, i.x); });
  // só as lições concluídas entram
  const few = Object.assign(fresh(), { done:doneAll(lessons.slice(0, 2)) });
  const small = trainingItems(lessons, few, DATE);
  assert.equal(small.length, trainingSize(2));
  small.forEach(i => (EX[i.key].x.covers || [EX[i.key].l.id]).forEach(id => assert.ok(few.done[id] || few.done[EX[i.key].l.id], i.key)));
  small.filter(i => !EX[i.key].x.covers).forEach(i => assert.ok(few.done[EX[i.key].l.id]));
  assert.equal(trainingItems(lessons, fresh(), DATE).length, 0);
});

test('treino: começa pelo que a pessoa mais errou e cobre várias lições', () => {
  const lessons = COURSES[0].lessons.filter(l => !l.optional).slice(0, 8);
  const state = Object.assign(fresh(), { done:doneAll(lessons) });
  const target = lessons[5], wrongKey = target.ex.find(x => x.t !== 'expl').key;
  state.mistakes[wrongKey] = 3;
  for (let i = 0; i < 25; i++){
    const items = trainingItems(lessons, state, DATE);
    assert.ok(items.some(it => it.key === wrongKey), 'questão errada deve entrar no treino');
    assert.ok(new Set(items.map(it => EX[it.key].l.id)).size >= Math.min(lessons.length, TRAIN_SIZE) - 1, 'uma questão de cada lição antes de repetir');
  }
});

test('treino: recompensa maior na primeira vez e no treino perfeito; melhor resultado não cai', () => {
  const first = trainingReward(undefined, 8, 10), again = trainingReward({ count:1 }, 8, 10), perfect = trainingReward({ count:1 }, 10, 10);
  assert.equal(first.firstTime, true); assert.ok(first.xp > again.xp && first.coins > again.coins);
  assert.equal(perfect.perfect, true); assert.ok(perfect.xp > again.xp);
  const a = trainingRecord(undefined, 9, 10, DATE), b = trainingRecord(a, 5, 10, '2026-09-26');
  assert.equal(a.count, 1); assert.equal(b.count, 2); assert.equal(b.best, 90); assert.equal(b.accuracy, 50);
  assert.equal(trainingRecord(undefined, 0, 0, DATE).accuracy, 0);
});

test('treino: reagenda a revisão espaçada das lições treinadas conforme os acertos', () => {
  const [a, b] = COURSES[0].lessons;
  const state = Object.assign(fresh(), { done:{ [a.id]:true, [b.id]:true } });
  const items = [{ key:a.ex[0].key }, { key:a.ex[1].key }, { key:b.ex[0].key }];
  const trained = trainedLessons(items, [a.ex[0].key, b.ex[0].key], key => [EX[key].l]);
  assert.deepEqual(trained.map(t => [t.lesson.id, t.clean]), [[a.id, false], [b.id, true]]);
  rescheduleReviews(state, trained, DATE);
  assert.equal(state.repetition[a.id].due, '2026-09-26'); assert.equal(state.repetition[a.id].stage, 0);
  assert.equal(state.repetition[b.id].due, '2026-09-26');
  // lição que não foi concluída não ganha agenda
  const other = COURSES[0].lessons[10];
  rescheduleReviews(state, [{ lesson:other, clean:true }], DATE);
  assert.equal(state.repetition[other.id], undefined);
});

test('treino: progresso salvo e sincronizado entre aparelhos; conquistas do halter', () => {
  assert.deepEqual(fresh().training, {});
  assert.deepEqual(normalize({ v:6 }).training, {});
  const local = Object.assign(fresh(), { xp:50, training:{ 'treino:a':{ count:2, best:70, last:'2026-09-20' }, 'treino:b':{ count:1, best:100, last:'2026-09-21' } } });
  const cloud = Object.assign(fresh(), { xp:90, training:{ 'treino:a':{ count:3, best:60, last:'2026-09-24' }, 'treino:c':{ count:1, best:80, last:'2026-09-22' } } });
  const merged = mergeProgress(local, cloud);
  assert.deepEqual(Object.keys(merged.training).sort(), ['treino:a', 'treino:b', 'treino:c']);
  assert.equal(merged.training['treino:a'].count, 3); assert.equal(merged.training['treino:a'].best, 70); assert.equal(merged.training['treino:a'].last, '2026-09-24');
  assert.doesNotThrow(() => mergeProgress(local, Object.assign(fresh(), { training:undefined })));
  const one = Object.assign(fresh(), { training:{ x:{ count:1 } } }), ten = Object.assign(fresh(), { training:{ x:{ count:6 }, y:{ count:4 } } });
  const gym1 = BADGES.find(b => b.id === 'gym1'), gym10 = BADGES.find(b => b.id === 'gym10');
  assert.equal(gym1.t(fresh()), false); assert.equal(gym1.t(one), true);
  assert.equal(gym10.t(one), false); assert.equal(gym10.t(ten), true);
});

test('treino: identificador estável por etapa e revisão do dia continua independente', () => {
  const ids = new Set();
  for (const c of COURSES) for (const s of trainingSpots(c, prevOf(c))){ assert.equal(s.id, trainingId(s.unit)); assert.ok(!ids.has(s.id)); ids.add(s.id); }
  assert.ok(ids.size >= 60);
  assert.equal(spacedItems([]).length, 0);
});

const strip = s => String(s).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

test('revisão integrada: toda trilha tem perguntas novas, válidas e ligadas a lições que existem', () => {
  for (const c of COURSES){
    assert.ok(c.review, c.id + ' sem revisão integrada');
    assert.ok(c.review.ex.length >= 5, c.id + ' com poucas perguntas');
    assert.equal(c.review.virtual, true);
    assert.ok(!c.lessons.includes(c.review), 'a revisão não conta como lição');
    const ids = new Set(c.lessons.map(l => l.id));
    c.review.ex.forEach((x, i) => {
      assert.equal(x.key, c.review.id + '#' + i); assert.equal(EX[x.key].x, x); assert.equal(EX[x.key].c, c);
      assert.ok(Array.isArray(x.covers) && x.covers.length >= 1, x.key + ' sem covers');
      x.covers.forEach(id => assert.ok(ids.has(id), x.key + ' cobre lição inexistente ' + id));
      assert.ok(!x.covers.some(id => c.lessons.find(l => l.id === id).optional), x.key + ' depende de oficina');
      assert.notEqual(x.t, 'expl'); assert.ok(x.e && strip(x.e).length > 20, x.key + ' explicação curta');
      if (x.t === 'mc') assert.ok(Number.isInteger(x.a) && x.a >= 0 && x.a < x.o.length);
      if (x.t === 'num') assert.ok(Number.isFinite(x.a));
    });
    // variedade: nem tudo é conta, nem tudo é múltipla escolha
    assert.ok(new Set(c.review.ex.map(x => x.t)).size >= 3, c.id + ' com pouca variedade de tipos');
  }
  const keys = COURSES.flatMap(c => c.review.ex.map(x => x.key));
  assert.equal(new Set(keys).size, keys.length);
  assert.ok(keys.length >= 100, 'esperava pelo menos 100 perguntas de revisão integrada, achei ' + keys.length);
});

test('revisão integrada: alternativas equilibradas (a certa não pode ser sempre a mais longa)', () => {
  let mc = 0, longest = 0; const obvious = [];
  for (const c of COURSES) for (const x of c.review.ex) if (x.t === 'mc'){
    mc++;
    const lens = x.o.map(o => strip(o).length), right = lens[x.a], other = Math.max(...lens.filter((_, i) => i !== x.a));
    if (right > other) longest++;
    if (right > other * 1.35) obvious.push(x.key + ' (' + right + ' x ' + other + ')');
  }
  assert.deepEqual(obvious, [], 'alternativa certa destoa das outras');
  assert.ok(longest / mc <= 0.5, 'a certa é a mais longa em ' + Math.round(longest / mc * 100) + '% das perguntas');
});

test('treino: só usa perguntas integradas de lições já concluídas e limita a 40% da rodada', () => {
  const c = COURSES.find(x => x.id === 'dc'), lessons = c.lessons.filter(l => !l.optional);
  const some = Object.assign(fresh(), { done:doneAll(lessons.filter(l => ['dc1', 'dc2', 'dc3'].includes(l.id))) });
  const bank = trainingBank(lessons, some);
  assert.ok(bank.length >= 1);
  bank.forEach(x => x.covers.forEach(id => assert.ok(some.done[id], x.key + ' cobre ' + id + ' que não foi concluída')));
  assert.equal(trainingBank(lessons, fresh()).length, 0);
  const all = Object.assign(fresh(), { done:doneAll(lessons) });
  for (let i = 0; i < 20; i++){
    const items = trainingItems(lessons, all, DATE);
    const fromBank = items.filter(it => it.key.startsWith('rev-')).length;
    assert.ok(fromBank >= 1 && fromBank <= Math.ceil(TRAIN_SIZE * BANK_SHARE), 'perguntas integradas na rodada: ' + fromBank);
    assert.equal(new Set(items.map(it => it.key)).size, items.length);
  }
});

test('treino: errar uma pergunta integrada devolve as lições que ela cobre para a revisão', () => {
  const c = COURSES.find(x => x.id === 'estoq'), x = c.review.ex.find(q => q.covers.length === 2 && q.covers[0] !== q.covers[1]);
  const lessonOf = id => c.lessons.find(l => l.id === id);
  const trained = trainedLessons([{ key:x.key }], [], key => EX[key].x.covers.map(lessonOf));
  assert.deepEqual(trained.map(t => t.lesson.id).sort(), x.covers.slice().sort());
  assert.ok(trained.every(t => t.clean === false));
  const cleanTrained = trainedLessons([{ key:x.key }], [x.key], key => EX[key].x.covers.map(lessonOf));
  assert.ok(cleanTrained.every(t => t.clean === true));
});

test('treino: todos os treinos do caminho montam uma rodada completa quando as lições estão concluídas', () => {
  let spots = 0;
  for (const c of COURSES) for (const spot of trainingSpots(c, prevOf(c))){
    spots++;
    const state = Object.assign(fresh(), { done:doneAll(spot.sources) });
    const items = trainingItems(spot.sources, state, DATE);
    assert.ok(items.length >= 5, spot.id + ' com ' + items.length + ' questões');
    assert.ok(items.length <= TRAIN_SIZE);
    assert.equal(new Set(items.map(i => i.key)).size, items.length, spot.id);
    items.forEach(i => { assert.ok(i.x && i.key === i.x.key); assert.notEqual(i.x.t, 'expl'); });
    assert.ok(trainingReady(spot, state.done, true), spot.id);
  }
  assert.ok(spots >= 60);
});
