import test from 'node:test';
import assert from 'node:assert/strict';
import { EX } from '../src/content/index.js';
import { analyze } from '../src/engine/ai/nlp.js';
import { grade } from './ai-eval.mjs';
import { CASES, ADVERSARIAL } from './ai-cases.js';
import { HOLDOUT } from './ai-holdout.js';

test('IA: nenhuma resposta errada é aceita ou sugerida', () => {
  for (const [key, answer, label] of [...CASES, ...HOLDOUT]) if (label === 'wrong') assert.equal(grade(key, answer).final, 'wrong', key + ': ' + answer);
  for (const [key, answer] of ADVERSARIAL) assert.equal(grade(key, answer).final, 'wrong', key + ': ' + answer);
});

test('IA: aceita as respostas certas do conjunto principal', () => {
  for (const [key, answer, label] of CASES) if (label === 'right') assert.equal(grade(key, answer).final, 'right', key + ': ' + answer);
});

test('IA: generaliza para respostas que não foram escritas junto com a base', () => {
  const right = HOLDOUT.filter(c => c[2] === 'right'), ok = right.filter(([k, a]) => grade(k, a).final === 'right');
  const onlyRules = right.filter(([k, a]) => grade(k, a, { noAI:true }).final === 'right');
  assert.ok(ok.length >= right.length - 3, `aceitou ${ok.length} de ${right.length}`);
  assert.ok(ok.length > onlyRules.length + 5, `IA ${ok.length} x regras ${onlyRules.length}`);
});

test('IA: negação respeita vírgula e o "não" depois da palavra', () => {
  const neg = (text, id) => analyze(text).matches.find(m => m.id === id)?.neg || false;
  assert.equal(neg('absoluta não, razoável', 'absoluta'), true);
  assert.equal(neg('absoluta não, razoável', 'razoavel'), false);
  assert.equal(neg('não aumenta o PL', 'aumentar'), true);
  assert.equal(neg('ele não pode ter vínculo com a empresa', 'conflito'), true);
  assert.equal(analyze('não importa quando o dinheiro entra').matches.some(m => m.id === 'independente_de' && !m.neg), true);
});

test('IA: palavra que existe não vira erro de digitação de outra', () => {
  assert.equal(analyze('a empresa').matches.length, 0);
  assert.ok(analyze('inadimplensia').matches.some(m => m.id === 'inadimplencia'));
  assert.ok(analyze('conciliasão bancária').matches.some(m => m.id === 'conciliacao'));
});

test('IA: toda questão escrita tem o conceito esperado reconhecido ou cai nas regras', () => {
  for (const [key, e] of Object.entries(EX)) if (e.x.t === 'wr') for (const a of e.x.a) assert.equal(grade(key, a).final, 'right', key + ': ' + a);
});
