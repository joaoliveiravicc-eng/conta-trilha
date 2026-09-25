import test from 'node:test';
import assert from 'node:assert/strict';
import { EX } from '../src/content/index.js';
import { analyze } from '../src/engine/ai/nlp.js';
import { grade } from './ai-eval.mjs';
import { coverage, review } from '../src/engine/ai/review.js';
import { CASES, ADVERSARIAL, KNOWN_KEYWORD_LEAKS } from './ai-cases.js';
import { HOLDOUT } from './ai-holdout.js';
import { HOLDOUT2 } from './ai-holdout2.js';
import { evalExpl } from '../src/engine/exercises/grading.js';

test('IA: nenhuma resposta errada é aceita ou sugerida', () => {
  for (const [key, answer, label] of [...CASES, ...HOLDOUT, ...HOLDOUT2]) if (label === 'wrong') assert.equal(grade(key, answer).final, 'wrong', key + ': ' + answer);
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

test('IA: recusa papéis trocados e o oposto do assunto, mesmo com as palavras-chave certas', () => {
  for (const [key, answer] of KNOWN_KEYWORD_LEAKS){
    assert.equal(evalExpl(answer, EX[key].x).ok, true, 'as palavras-chave aceitariam: ' + answer);
    assert.equal(grade(key, answer).final, 'wrong', key + ': ' + answer);
  }
});

test('IA: explicações certas que citam o oposto para contrastar continuam certas', () => {
  for (const [key, answer, label] of HOLDOUT2) if (label === 'right') assert.equal(grade(key, answer).final, 'right', key + ': ' + answer);
});

test('IA: contraste e ressalva na leitura', () => {
  const find = (text, id) => { const m = analyze(text).matches.find(m => m.id === id) || {}; return { neg:!!m.neg, hedged:!!m.hedged }; };
  assert.equal(find('independentemente de quando o dinheiro é recebido ou pago', 'pagar').neg, true);
  assert.equal(find('Diferente do regime de caixa, a competência registra', 'caixa').neg, true);
  assert.equal(find('Diferente do regime de caixa, a competência registra', 'competencia').neg, false);
  assert.equal(find('não quando o dinheiro entra no caixa', 'caixa').hedged, true);
  assert.equal(find('para não depender de crédito caro quando surgir um problema', 'imprevisto').neg, false);
  assert.equal(find('sem precisar se endividar', 'endividar').neg, true);
});

test('base de conhecimento cobre todas as questões escritas e ideias (conteúdo novo precisa entrar em lexicon.js)', () => {
  for (const [key, e] of Object.entries(EX)){
    if (e.x.t === 'wr' && !/^[\d\/%.,\s]+$/.test(e.x.a[0])) assert.ok(coverage(e.x).concepts > 0, key + ': nenhum conceito para ' + e.x.a.join(' / '));
    if (e.x.t === 'expl') coverage(e.x).ideas.forEach((n, i) => assert.ok(n > 0, key + ': ideia sem conceito — ' + e.x.k[i][0]));
  }
});

test('IA: explica o erro com o glossário quando a resposta é outro conceito', () => {
  const r = review(EX['base6#5'].x, 'regime de caixa');
  assert.equal(r.verdict, 'wrong');
  assert.match(r.note, /Receitas e despesas|dinheiro/i);
});
