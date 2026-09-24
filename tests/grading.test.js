import test from 'node:test';
import assert from 'node:assert/strict';
import { EX } from '../src/content/index.js';
import { bestMatch, bestMatchInfo, acctMatch, evalExpl } from '../src/engine/exercises/grading.js';
import { parseBR } from '../src/engine/format.js';

test('resposta escrita: maiúsculas, acentos, frase curta e digitação', () => {
  for (const s of ['Saldo', 'SALDO!', 'o saldo', 'É o saldo da conta', 'sadlo', 'saldos']) assert.ok(bestMatch(s, ['saldo']) >= 1, s);
  assert.equal(bestMatchInfo('Conciliação bancária', ['conciliação']).how, 'phrase');
  assert.equal(bestMatchInfo('conciliar', ['conciliação']).how, 'root');
});

test('resposta escrita: termos diferentes continuam errados', () => {
  assert.equal(bestMatch('não é saldo', ['saldo']), 0);
  assert.equal(bestMatch('baixa', ['caixa']), 0);
  assert.equal(bestMatch('débito', ['crédito']), 0);
  assert.equal(bestMatch('credor', ['crédito']), 0);
  assert.equal(bestMatch('passivo', ['ativo']), 0);
  assert.equal(acctMatch('INSS a recolher', 'ICMS a recolher'), 0);
  assert.equal(acctMatch('Salários a pagar', 'Despesa com salários'), 0);
});

test('cada questão escrita aceita a própria resposta e não aceita a de outra', () => {
  const wr = Object.values(EX).filter(e => e.x.t === 'wr');
  for (const e of wr){
    e.x.a.forEach(a => assert.equal(bestMatch(a, e.x.a), 2, e.l.id + ': ' + a));
    for (const o of wr) if (o !== e && !e.x.a.includes(o.x.a[0])) assert.equal(bestMatch(o.x.a[0], e.x.a), 0, o.x.a[0] + ' aceito em ' + e.l.id);
  }
  Object.values(EX).filter(e => e.x.t === 'expl').forEach(e => assert.ok(evalExpl(e.x.model, e.x).ok, e.l.id));
});

test('números aceitam unidade escrita junto', () => {
  assert.equal(parseBR('45 reais'), 45); assert.equal(parseBR('R$ 1.500,50'), 1500.5);
  assert.equal(parseBR('10 dias'), 10); assert.equal(parseBR('1,5x'), 1.5); assert.equal(parseBR('−1.500'), -1500);
  assert.ok(Number.isNaN(parseBR('abc')));
});

test('erro de digitação só vale para palavra que não existe', () => {
  assert.equal(evalExpl('a receita da empresa', EX['demo3#7'].x).hits[0], false);
  assert.equal(evalExpl('conferir o extarto com o sistema e ajustar as diferenças', EX['fj15#3'].x).ok, true);
  assert.equal(bestMatch('adimplência', ['inadimplência']), 0);
  assert.equal(bestMatch('desconto condicional', ['desconto incondicional']), 0);
  assert.equal(bestMatch('municipal/estadual', ['municipal']) >= 1 && bestMatch('municipal/estadual', ['municipal']) !== 2, true);
});
