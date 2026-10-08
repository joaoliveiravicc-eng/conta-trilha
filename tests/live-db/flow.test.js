/* ContaTrilha Live — ciclo da sala, envio duplicado, concorrência, expiração e reconexão. */
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { as, rpc, admin, newUser, newTeacher, rejects, setupRoom, wrongPayload, rightPayload, nonce, close } from './helpers.js';

after(close);
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function joinN(code, n, prefix = 'Aluno'){
  const out = [];
  for (let i = 0; i < n; i++){ const s = await newUser('aluno'); const j = await rpc(s, 'live_join_room', code, prefix + ' ' + i); assert.equal(j.ok, true, JSON.stringify(j)); out.push(s); }
  return out;
}
const answers = async room => (await admin('select * from public.live_answers where room_id = $1', [room]));

test('ciclo completo: lobby -> questão aberta -> fechada -> revelada -> sala encerrada, com resultado agregado', async () => {
  const r = await setupRoom();
  const [a, b, c, d, e] = await joinN(r.code, 5);
  const lobby = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.equal(lobby.room.status, 'lobby');
  assert.equal(lobby.members_count, 5);
  assert.deepEqual(lobby.room.materials, ['calculadora']);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce()))).message, /room_not_running/);

  await rpc(r.teacher, 'live_start_room', r.room_id);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce()))).message, /item_not_open/);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  assert.match((await rejects(rpc(r.teacher, 'live_open_item', r.room_id, 2, 60))).message, /another_item_open/);

  const item = r.built[0].item;
  const res = await Promise.all([a, b, c].map(s => rpc(s, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce())));
  res.forEach(x => assert.equal(x.status, 'accepted'));
  await rpc(d, 'live_submit_answer', r.room_id, 1, wrongPayload(item), nonce());
  await rpc(r.teacher, 'live_close_item', r.room_id, 1);
  assert.match((await rejects(rpc(e, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce()))).message, /item_not_open/);
  await rpc(r.teacher, 'live_reveal_item', r.room_id, 1);

  const out = await rpc(r.teacher, 'live_room_results', r.room_id);
  assert.equal(out.official_grade, false);
  assert.equal(out.members, 5);
  const q1 = out.items[0];
  assert.deepEqual([q1.answered, q1.correct, q1.status], [4, 3, 'revealed']);
  assert.ok(Object.keys(q1.distribution).length >= 1);
  assert.ok(!JSON.stringify(out).includes('Aluno'), 'o resultado agregado não lista alunos');

  await rpc(r.teacher, 'live_close_room', r.room_id);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 2, { value: true }, nonce()))).message, /room_not_running/);
  const ev = (await admin('select event from public.live_audit_events where room_id = $1 order by id', [r.room_id])).map(x => x.event);
  assert.deepEqual(ev, ['room_created', 'room_started', 'item_opened', 'item_closed', 'item_revealed', 'room_closed']);
});

test('envio duplicado: mesmo nonce devolve o mesmo resultado; outro nonce não sobrescreve a primeira resposta', async () => {
  const r = await setupRoom({ feedback: 'immediate' });
  const [a] = await joinN(r.code, 1);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item, n1 = nonce();
  const first = await rpc(a, 'live_submit_answer', r.room_id, 1, wrongPayload(item), n1);
  assert.equal(first.status, 'accepted');
  const again = await rpc(a, 'live_submit_answer', r.room_id, 1, wrongPayload(item), n1);
  assert.equal(again.status, 'replayed');
  assert.equal(again.submitted_at, first.submitted_at);
  const changed = await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce());
  assert.equal(changed.status, 'already_answered');
  assert.deepEqual(changed.payload, wrongPayload(item), 'a primeira resposta deve permanecer');
  assert.equal(changed.is_correct, false);
  const rows = await answers(r.room_id);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].payload, wrongPayload(item));
});

test('concorrência: 40 envios simultâneos do mesmo aluno resultam em exatamente 1 resposta aceita', async () => {
  const r = await setupRoom();
  const [a] = await joinN(r.code, 1);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item;
  const tries = Array.from({ length: 40 }, (_, i) => rpc(a, 'live_submit_answer', r.room_id, 1, i % 2 ? rightPayload(item) : wrongPayload(item), nonce()));
  const out = await Promise.all(tries);
  const accepted = out.filter(x => x.status === 'accepted');
  assert.equal(accepted.length, 1, 'aceitos: ' + accepted.length);
  assert.equal(out.filter(x => x.status === 'already_answered').length, 39);
  const rows = await answers(r.room_id);
  assert.equal(rows.length, 1);
  assert.deepEqual(rows[0].payload, accepted[0].payload, 'o que ficou gravado é o que foi aceito');
  out.forEach(x => assert.deepEqual(x.payload, accepted[0].payload, 'todos recebem o mesmo veredito final'));
});

test('concorrência: 20 alunos x 3 reenvios cada, em paralelo, geram 20 respostas e sem pontuação duplicada', async () => {
  const r = await setupRoom();
  const students = await joinN(r.code, 20);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item;
  await Promise.all(students.flatMap(s => { const n = nonce(); return [0, 1, 2].map(() => rpc(s, 'live_submit_answer', r.room_id, 1, rightPayload(item), n)); }));
  const rows = await answers(r.room_id);
  assert.equal(rows.length, 20);
  const res = await rpc(r.teacher, 'live_room_results', r.room_id);
  assert.deepEqual([res.items[0].answered, res.items[0].correct], [20, 20]);
});

test('concorrência: professor fecha a questão enquanto 25 alunos enviam; nenhuma resposta entra depois do fechamento', async () => {
  const r = await setupRoom();
  const students = await joinN(r.code, 25);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item;
  const sub = students.map(async (s, i) => { await sleep(i * 2); try { return await rpc(s, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce()); } catch (e) { return { err: e.message }; } });
  const closer = (async () => { await sleep(25); return rpc(r.teacher, 'live_close_item', r.room_id, 1); })();
  const out = await Promise.all([closer, ...sub]);
  const okCount = out.slice(1).filter(x => x.status === 'accepted').length;
  const rejected = out.slice(1).filter(x => x.err);
  rejected.forEach(x => assert.match(x.err, /item_not_open/));
  assert.equal(okCount + rejected.length, 25);
  const [it] = await admin('select closed_at from public.live_room_items where room_id = $1 and position = 1', [r.room_id]);
  const rows = await answers(r.room_id);
  assert.equal(rows.length, okCount);
  rows.forEach(x => assert.ok(x.submitted_at <= it.closed_at, 'resposta gravada depois do fechamento: ' + x.submitted_at.toISOString() + ' > ' + it.closed_at.toISOString()));
});

test('expiração: tempo da questão, extensão, sala expirada e código vencido', async () => {
  const r = await setupRoom();
  const [a, b] = await joinN(r.code, 2);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  const item = r.built[0].item;

  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 5);
  assert.equal((await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce())).status, 'accepted');
  await sleep(5300);
  assert.match((await rejects(rpc(b, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce()))).message, /item_closed/, 'relógio do servidor decide o prazo');
  await rpc(r.teacher, 'live_close_item', r.room_id, 1);
  assert.match((await rejects(rpc(r.teacher, 'live_extend_item', r.room_id, 1, 30))).message, /invalid_state/, 'não se estende questão fechada');

  await rpc(r.teacher, 'live_open_item', r.room_id, 2, 5);
  await rpc(r.teacher, 'live_extend_item', r.room_id, 2, 60);
  const [{ closes_at, now }] = await admin('select closes_at, clock_timestamp() now from public.live_room_items where room_id = $1 and position = 2', [r.room_id]);
  assert.ok(closes_at - now > 55000, 'extensão não aplicada');
  await rpc(r.teacher, 'live_close_item', r.room_id, 2);

  await rpc(r.teacher, 'live_open_item', r.room_id, 3, 60);
  await admin("update public.live_rooms set expires_at = clock_timestamp() - interval '1 second' where id = $1", [r.room_id]);
  assert.match((await rejects(rpc(b, 'live_submit_answer', r.room_id, 3, { value: true }, nonce()))).message, /room_expired/);
  assert.equal((await rpc(b, 'live_room_snapshot', r.room_id)).room.status, 'expired');
  const late = await newUser('atrasado');
  assert.deepEqual(await rpc(late, 'live_join_room', r.code), { ok: false, error: 'invalid_code' });
  const [{ status }] = await admin('select status from public.live_rooms where id = $1', [r.room_id]);
  assert.equal(status, 'closed', 'sala vencida é encerrada ao tentar entrar');
});

test('reconexão: abrir em outro aparelho mantém respostas; reenviar depois do fechamento não perde nem duplica', async () => {
  const r = await setupRoom({ feedback: 'immediate' });
  const [a, b] = await joinN(r.code, 2);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item, n = nonce();
  await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(item), n);       // a resposta chegou ao servidor, mas o aparelho não viu a confirmação
  const again = await rpc(a, 'live_join_room', r.code, 'Outro nome');              // reentrada por código (outro aparelho/aba)
  assert.equal(again.ok, true);
  assert.equal((await admin('select count(*)::int n from public.live_room_members where room_id = $1', [r.room_id]))[0].n, 2, 'reentrada não duplica participante');
  assert.notEqual((await admin('select display_name from public.live_room_members where user_id = $1', [a]))[0].display_name, 'Outro nome', 'reentrada não troca o nome');
  const snap = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.deepEqual(snap.items[0].my_answer.payload, rightPayload(item), 'o snapshot devolve a resposta já gravada');
  await rpc(r.teacher, 'live_close_item', r.room_id, 1);
  const replay = await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(item), n);
  assert.equal(replay.status, 'replayed', 'reenvio depois do fechamento recebe a confirmação do que já estava gravado');
  assert.match((await rejects(rpc(b, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce()))).message, /item_not_open/, 'quem não tinha enviado continua fora');
  assert.equal((await answers(r.room_id)).length, 1);
  const late = await newUser('retardatario');
  assert.equal((await rpc(late, 'live_join_room', r.code, 'Chegou tarde')).ok, true);
  await rpc(r.teacher, 'live_open_item', r.room_id, 2, 60);
  assert.ok((await rpc(late, 'live_room_snapshot', r.room_id)).items[1].public, 'quem entra com a sala em andamento vê a questão aberta');
});

test('ritmo do aluno: tudo abre ao iniciar, qualquer ordem, e fecha com a sala', async () => {
  const r = await setupRoom({ mode: 'self_paced' });
  const [a] = await joinN(r.code, 1);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  const snap = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.ok(snap.items.every(i => i.status === 'open' && i.public));
  assert.match((await rejects(rpc(r.teacher, 'live_open_item', r.room_id, 1, 30))).message, /invalid_state/);
  const last = r.built.length;
  assert.equal((await rpc(a, 'live_submit_answer', r.room_id, last, rightPayload(r.built[last - 1].item), nonce())).status, 'accepted');
  assert.equal((await rpc(a, 'live_submit_answer', r.room_id, 1, wrongPayload(r.built[0].item), nonce())).status, 'accepted');
  await rpc(r.teacher, 'live_close_room', r.room_id);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 2, { value: true }, nonce()))).message, /room_not_running/);
  await rpc(r.teacher, 'live_reveal_item', r.room_id, 1);
  assert.equal((await rpc(a, 'live_room_snapshot', r.room_id)).items[0].my_answer.is_correct, false);
});

test('código da sala: normalização, erro único, limite de tentativas, sala cheia e unicidade enquanto ativa', async () => {
  const r = await setupRoom({ max: 2 });
  assert.match(r.code, /^[A-HJ-NP-Z2-9]{6}$/);
  const u = await newUser('digitador');
  const spaced = r.code.slice(0, 3).toLowerCase() + ' - ' + r.code.slice(3).toLowerCase();
  assert.equal((await rpc(u, 'live_join_room', spaced, '  Marina\u0007  ')).ok, true, 'minúsculas, espaço e hífen são aceitos');
  assert.equal((await admin('select display_name from public.live_room_members where user_id = $1', [u]))[0].display_name, 'Marina', 'nome limpo de caracteres de controle');

  assert.equal((await rpc(await newUser(), 'live_join_room', r.code)).ok, true);
  const third = await rpc(await newUser(), 'live_join_room', r.code);
  assert.deepEqual(third, { ok: false, error: 'room_full' });
  assert.deepEqual(await rpc(r.teacher, 'live_join_room', r.code), { ok: false, error: 'host_cannot_join' });

  const guesser = await newUser('chutador');
  for (let i = 0; i < 8; i++) assert.deepEqual(await rpc(guesser, 'live_join_room', 'ZZZZZ' + (i % 8 + 2)), { ok: false, error: 'invalid_code' });
  const blocked = await rpc(guesser, 'live_join_room', 'ZZZZZ9');
  assert.deepEqual(blocked, { ok: false, error: 'too_many_attempts' }, 'o 9º palpite é bloqueado');
  const [{ n }] = await admin('select count(*)::int n from public.live_join_attempts where user_id = $1 and not ok', [guesser]);
  assert.equal(n, 8, 'as falhas ficam registradas (não são desfeitas por rollback)');
  const r2 = await setupRoom({ max: 5 });
  assert.deepEqual(await rpc(guesser, 'live_join_room', r2.code), { ok: false, error: 'too_many_attempts' }, 'nem o código certo passa durante o bloqueio');
  assert.equal((await rpc(await newUser(), 'live_join_room', r2.code)).ok, true, 'o bloqueio é por usuário');

  const dup = await rejects(admin('insert into public.live_rooms(activity_id, host_id, code, mode, feedback, expires_at) values ($1, $2, $3, $4, $5, now() + interval \'1 hour\')',
    [r2.activity, r2.teacher, r2.code, 'teacher_paced', 'after_reveal']));
  assert.match(dup.message, /live_rooms_active_code/, 'código repetido enquanto a sala está ativa');
  await rpc(r2.teacher, 'live_close_room', r2.room_id);
  assert.deepEqual(await rpc(await newUser(), 'live_join_room', r2.code), { ok: false, error: 'invalid_code' }, 'sala encerrada não aceita entrada');
  await admin('insert into public.live_rooms(activity_id, host_id, code, mode, feedback, expires_at) values ($1, $2, $3, $4, $5, now() + interval \'1 hour\')',
    [r2.activity, r2.teacher, r2.code, 'teacher_paced', 'after_reveal']);
});

test('geração de códigos: formato, sem I/O, boa dispersão e sem colisão em 3000 salas', async () => {
  const rows = await admin("select public.live_gen_code() c from generate_series(1, 3000)");
  const set = new Set(rows.map(x => x.c));
  rows.forEach(x => assert.match(x.c, /^[A-HJ-NP-Z2-9]{6}$/));
  assert.ok(set.size >= 2995, 'códigos repetidos demais: ' + set.size);
  const freq = {}; rows.forEach(x => [...x.c].forEach(ch => { freq[ch] = (freq[ch] || 0) + 1; }));
  assert.equal(Object.keys(freq).length, 32, 'todos os 32 símbolos devem aparecer');
  const exp = rows.length * 6 / 32, max = Math.max(...Object.values(freq)), min = Math.min(...Object.values(freq));
  assert.ok(max < exp * 1.25 && min > exp * 0.75, 'distribuição enviesada: ' + min + '..' + max + ' (esperado ~' + Math.round(exp) + ')');
});

test('limites e validação: salas abertas por professor, respostas malformadas, nonce curto', async () => {
  const t = await newTeacher();
  const base = await setupRoom({ teacher: t });
  for (let i = 0; i < 4; i++) await rpc(t, 'live_create_room', base.activity);
  assert.match((await rejects(rpc(t, 'live_create_room', base.activity))).message, /too_many_open_rooms/);
  assert.match((await rejects(rpc(t, 'live_create_room', base.activity, 1))).message, /too_many_open_rooms|invalid_ttl/);

  const r = await setupRoom();
  const [a] = await joinN(r.code, 1);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);        // mc
  const bad = async (p, re) => assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 1, p, nonce()))).message, re, JSON.stringify(p));
  await bad({ choice: 99 }, /invalid_payload/);
  await bad({ choice: -1 }, /invalid_payload/);
  await bad({ choice: 0.5 }, /invalid_payload/);
  await bad({ choice: '0' }, /invalid_payload/);
  await bad({ choice: 0, extra: 1 }, /invalid_payload/);
  await bad({ value: true }, /invalid_payload/);
  await bad([0], /invalid_payload/);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 1, { choice: 0 }, 'curto'))).message, /invalid_nonce/);
  assert.match((await rejects(rpc(a, 'live_submit_answer', r.room_id, 40, { choice: 0 }, nonce()))).message, /invalid_position/);
  assert.equal((await answers(r.room_id)).length, 0, 'nada malformado é gravado');
  await rpc(r.teacher, 'live_close_item', r.room_id, 1);
  await rpc(r.teacher, 'live_open_item', r.room_id, 5, 60);        // num (itens 5 e 6)
  const num = async p => rejects(rpc(a, 'live_submit_answer', r.room_id, 5, p, nonce()));
  assert.match((await num({ value: '12' })).message, /invalid_payload/);
  assert.match((await num({ value: 1e15 })).message, /invalid_payload/);
});

test('apagar uma conta apaga seus dados na sala (cascata), sem afetar os demais', async () => {
  const r = await setupRoom();
  const [a, b] = await joinN(r.code, 2);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  for (const s of [a, b]) await rpc(s, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce());
  await admin('delete from auth.users where id = $1', [a]);
  const rows = await answers(r.room_id);
  assert.deepEqual(rows.map(x => x.user_id), [b]);
  assert.equal((await admin('select count(*)::int n from public.live_room_members where room_id = $1', [r.room_id]))[0].n, 1);
});

test('serialização determinística: envio que chega durante um fechamento em andamento espera e é recusado', async () => {
  const r = await setupRoom();
  const [a] = await joinN(r.code, 1);
  await rpc(r.teacher, 'live_start_room', r.room_id);
  await rpc(r.teacher, 'live_open_item', r.room_id, 1, 60);
  const item = r.built[0].item;

  // Simula live_close_item no meio da transação: a linha da questão já foi atualizada, mas o commit ainda não aconteceu.
  const closer = await (await import('./helpers.js')).pool.connect();
  try {
    await closer.query('begin');
    await closer.query("update public.live_room_items set status = 'closed', closed_at = clock_timestamp() where room_id = $1 and position = 1", [r.room_id]);

    let settled = false;
    const submit = rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(item), nonce()).then(v => { settled = true; return { v }; }, e => { settled = true; return { e }; });
    await sleep(400);
    assert.equal(settled, false, 'o envio não pode passar por cima de um fechamento em andamento (falta o lock em live_room_items)');
    await closer.query('commit');
    const out = await submit;
    assert.ok(out.e && /item_not_open/.test(out.e.message), 'depois do commit do fechamento o envio deve ser recusado, veio: ' + JSON.stringify(out));
  } finally { closer.release(); }
  assert.equal((await answers(r.room_id)).length, 0);
});
