/* ContaTrilha Live — privacidade e autorização (RLS + funções). Roda contra o PostgreSQL local. */
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { as, rpc, admin, newUser, newTeacher, rejects, setupRoom, wrongPayload, rightPayload, nonce, close } from './helpers.js';

after(close);

/* Sala em andamento com 1 professor, 5 alunos e a primeira questão aberta. */
async function runningRoom(extra = {}){
  const r = await setupRoom(extra);
  const students = [];
  for (let i = 0; i < 5; i++){ const s = await newUser('aluno' + i); const j = await rpc(s, 'live_join_room', r.code, 'Aluno ' + i); assert.equal(j.ok, true); students.push(s); }
  await rpc(r.teacher, 'live_start_room', r.room_id);
  if (r.teacher) await rpc(r.teacher, 'live_open_item', r.room_id, 1, 120);
  return { ...r, students };
}
const secrets = JSON.stringify;

test('aluno não lê o gabarito, os itens, as salas nem as respostas dos colegas (SELECT direto)', async () => {
  const r = await runningRoom();
  const [a, b] = r.students;
  await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce());
  await rpc(b, 'live_submit_answer', r.room_id, 1, wrongPayload(r.built[0].item), nonce());
  for (const t of ['live_activity_item_keys', 'live_activity_items', 'live_activities', 'live_rooms', 'live_room_items', 'live_answers', 'live_audit_events']) {
    const rows = await as(a, 'select * from public.' + t);
    assert.equal(rows.length, 0, 'aluno viu linhas de ' + t);
  }
  const members = await as(a, 'select user_id from public.live_room_members');
  assert.deepEqual(members.map(m => m.user_id), [a], 'aluno só pode ver a própria entrada na sala');
  for (const t of ['live_teacher_grants', 'live_join_attempts']) {
    const e = await rejects(as(a, 'select * from public.' + t));
    assert.match(e.message, /permission denied/, t);
  }
});

test('o snapshot do aluno não traz gabarito, tolerância, explicação nem respostas de outros alunos', async () => {
  const r = await runningRoom();
  const [a, b] = r.students;
  await rpc(b, 'live_submit_answer', r.room_id, 1, wrongPayload(r.built[0].item), nonce());
  const snap = await rpc(a, 'live_room_snapshot', r.room_id);
  const txt = secrets(snap);
  assert.equal(snap.is_host, false);
  assert.equal(snap.room.code, undefined, 'o aluno não recebe o código pela API de snapshot');
  assert.ok(snap.items[0].public, 'a questão aberta deve ter enunciado');
  assert.equal(snap.items[1].public, null, 'questão ainda pendente não revela enunciado');
  assert.ok(!/"answer"|"tol"|"explanation"|"key"/.test(txt), 'campos de gabarito no snapshot do aluno: ' + txt.slice(0, 300));
  assert.equal(snap.items[0].my_answer, undefined, 'a não respondeu, então não pode haver resposta');
  assert.equal(snap.members, null, 'aluno não vê a lista de participantes');
  assert.equal(snap.members_count, 5);
  assert.ok(!txt.includes('Aluno 1'), 'nome de outro participante vazou');
});

test('professor vê gabarito e aluno só vê o próprio envio', async () => {
  const r = await runningRoom();
  const [a, b] = r.students;
  await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce());
  const t = await rpc(r.teacher, 'live_room_snapshot', r.room_id);
  assert.equal(t.is_host, true);
  assert.equal(t.room.code, r.code);
  assert.equal(t.items[0].answer, r.built[0].item.key.answer);
  assert.equal(t.items[0].answered_count, 1);
  assert.equal(t.members.length, 5);
  const sb = await rpc(b, 'live_room_snapshot', r.room_id);
  assert.equal(sb.items[0].my_answer, undefined, 'b não respondeu e não pode ver a resposta de a');
  const sa = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.deepEqual(sa.items[0].my_answer.payload, rightPayload(r.built[0].item));
  assert.equal(sa.items[0].my_answer.is_correct, undefined, 'sem feedback imediato, o acerto só aparece após a revelação');
});

test('gabarito só aparece depois da revelação; antes dela nem quem respondeu o vê', async () => {
  const r = await runningRoom();
  const [a] = r.students;
  await rpc(a, 'live_submit_answer', r.room_id, 1, rightPayload(r.built[0].item), nonce());
  await rpc(r.teacher, 'live_close_item', r.room_id, 1);
  let s = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.equal(s.items[0].answer, undefined, 'fechada, mas ainda não revelada');
  await rpc(r.teacher, 'live_reveal_item', r.room_id, 1);
  s = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.equal(s.items[0].answer, r.built[0].item.key.answer);
  assert.equal(s.items[0].my_answer.is_correct, true);
  assert.ok(s.items[0].explanation !== undefined);
});

test('feedback imediato: o aluno vê o próprio acerto e gabarito só depois de enviar', async () => {
  const r = await runningRoom({ feedback: 'immediate' });
  const [a, b] = r.students;
  const before = await rpc(a, 'live_room_snapshot', r.room_id);
  assert.equal(before.items[0].answer, undefined, 'antes de enviar não há gabarito');
  const res = await rpc(a, 'live_submit_answer', r.room_id, 1, wrongPayload(r.built[0].item), nonce());
  assert.equal(res.is_correct, false);
  assert.equal(res.answer, r.built[0].item.key.answer);
  const sb = await rpc(b, 'live_room_snapshot', r.room_id);
  assert.equal(sb.items[0].answer, undefined, 'b ainda não enviou: não recebe o gabarito');
});

test('quem não é da sala não entra no snapshot nem envia resposta; o professor de outra sala também não', async () => {
  const r = await runningRoom();
  const other = await runningRoom();
  const stranger = await newUser('estranho');
  assert.match((await rejects(rpc(stranger, 'live_room_snapshot', r.room_id))).message, /not_member/);
  assert.match((await rejects(rpc(stranger, 'live_submit_answer', r.room_id, 1, { choice: 0 }, nonce()))).message, /not_member/);
  assert.match((await rejects(rpc(other.students[0], 'live_room_snapshot', r.room_id))).message, /not_member/);
  assert.match((await rejects(rpc(other.teacher, 'live_room_snapshot', r.room_id))).message, /not_member/);
  assert.match((await rejects(rpc(other.teacher, 'live_room_results', r.room_id))).message, /not_host/);
});

test('professor B não controla, não lê nem usa a atividade do professor A', async () => {
  const r = await runningRoom();
  const b = await newTeacher('profB');
  for (const [fn, args] of [['live_start_room', [r.room_id]], ['live_open_item', [r.room_id, 2, 30]], ['live_close_item', [r.room_id, 1]],
                            ['live_reveal_item', [r.room_id, 1]], ['live_close_room', [r.room_id]], ['live_extend_item', [r.room_id, 1, 30]]]) {
    assert.match((await rejects(rpc(b, fn, ...args))).message, /not_host/, fn);
  }
  assert.match((await rejects(rpc(b, 'live_create_room', r.activity))).message, /not_owner/);
  for (const t of ['live_activities', 'live_activity_items', 'live_activity_item_keys', 'live_rooms', 'live_room_items', 'live_room_members', 'live_answers', 'live_audit_events']) {
    assert.equal((await as(b, 'select * from public.' + t)).length, 0, 'professor B viu ' + t + ' do A');
  }
});

test('ninguém se promove a professor: sem concessão não cria atividade nem sala; revogar tira o controle', async () => {
  const u = await newUser('sem-grant');
  const items = (await setupRoom()).built.map(b => b.item);
  assert.match((await rejects(rpc(u, 'live_create_activity', 'x', 'formative', {}, items))).message, /not_teacher/);
  assert.equal(await rpc(u, 'live_is_teacher'), false);
  const e = await rejects(as(u, 'insert into public.live_teacher_grants(user_id) values ($1)', [u]));
  assert.match(e.message, /permission denied/);
  const r = await runningRoom();
  await admin('update public.live_teacher_grants set revoked_at = now() where user_id = $1', [r.teacher]);
  assert.match((await rejects(rpc(r.teacher, 'live_close_room', r.room_id))).message, /not_teacher/);
});

test('o cliente não escreve direto em nenhuma tabela live_* (insert/update/delete negados ou sem efeito)', async () => {
  const r = await runningRoom();
  const [a] = r.students;
  const tables = ['live_activities', 'live_activity_items', 'live_activity_item_keys', 'live_rooms', 'live_room_items', 'live_room_members', 'live_answers', 'live_audit_events', 'live_teacher_grants', 'live_join_attempts'];
  for (const u of [a, r.teacher]) for (const t of tables) {
    const [{ column_name: col }] = await admin("select column_name from information_schema.columns where table_schema = 'public' and table_name = $1 and is_identity = 'NO' order by ordinal_position limit 1", [t]);
    for (const stmt of ['insert into public.' + t + ' default values', 'update public.' + t + ' set ' + col + ' = ' + col, 'delete from public.' + t]) {
      const e = await rejects(as(u, stmt));
      assert.match(e.message, /permission denied/, t + ': ' + stmt);
    }
  }
  const [{ n }] = await admin('select count(*)::int n from public.live_answers where room_id = $1', [r.room_id]);
  assert.equal(n, 0);
});

test('anônimo (sem login) não lê tabelas nem chama nenhuma função live_*', async () => {
  for (const t of ['live_activities', 'live_rooms', 'live_answers', 'live_activity_item_keys', 'live_room_members']) {
    assert.match((await rejects(as(null, 'select * from public.' + t))).message, /permission denied/, t);
  }
  const fns = await admin("select p.oid::regprocedure::text sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname like 'live\\_%'");
  assert.ok(fns.length >= 20);
  for (const { sig } of fns) {
    const name = sig.slice(0, sig.indexOf('('));
    const [{ anon }] = await admin("select has_function_privilege('anon', $1::regprocedure, 'execute') anon", [sig]);
    assert.equal(anon, false, name + ' executável por anon');
  }
});

test('meta: toda tabela live_* tem RLS; funções internas não são chamáveis pela API; security definer com search_path fixo', async () => {
  const tabs = await admin("select relname, relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace where n.nspname = 'public' and c.relkind = 'r' and relname like 'live\\_%'");
  assert.ok(tabs.length >= 10);
  tabs.forEach(t => assert.equal(t.relrowsecurity, true, t.relname + ' sem RLS'));
  const grants = await admin("select table_name, privilege_type, grantee from information_schema.role_table_grants where table_schema = 'public' and table_name like 'live\\_%' and grantee in ('anon','authenticated','public')");
  grants.forEach(g => { assert.equal(g.grantee === 'authenticated' && g.privilege_type === 'SELECT', true, 'privilégio indevido: ' + JSON.stringify(g)); });
  const fns = await admin("select p.proname, p.prosecdef, p.proconfig, has_function_privilege('authenticated', p.oid, 'execute') as api from pg_proc p join pg_namespace n on n.oid = p.pronamespace where n.nspname = 'public' and p.proname like 'live\\_%'");
  const API = ['live_is_teacher', 'live_create_activity', 'live_create_room', 'live_join_room', 'live_room_snapshot', 'live_submit_answer', 'live_start_room', 'live_open_item', 'live_extend_item', 'live_close_item', 'live_reveal_item', 'live_close_room', 'live_room_results'];
  fns.forEach(f => {
    assert.equal(f.api, API.includes(f.proname), f.proname + (f.api ? ' exposta indevidamente' : ' deveria estar na API'));
    assert.ok((f.proconfig || []).some(c => c.startsWith('search_path=')), f.proname + ' sem search_path fixo');
  });
  assert.equal(fns.filter(f => API.includes(f.proname)).every(f => f.prosecdef), true);
});

test('atividade protegida não é habilitada; estrutura inválida e chaves extras são recusadas', async () => {
  const t = await newTeacher();
  const ok = (await setupRoom({ teacher: t })).built.map(b => b.item);
  assert.match((await rejects(rpc(t, 'live_create_activity', 'p', 'protected', {}, ok))).message, /protected_not_enabled/);
  const smuggled = JSON.parse(JSON.stringify(ok[0])); smuggled.public.answer = smuggled.key.answer;
  assert.match((await rejects(rpc(t, 'live_create_activity', 'a', 'formative', {}, [smuggled]))).message, /chaves inesperadas/);
  const bad = JSON.parse(JSON.stringify(ok[0])); bad.key.answer = 99;
  assert.match((await rejects(rpc(t, 'live_create_activity', 'a', 'formative', {}, [bad]))).message, /invalid_item/);
  const wr = { type: 'wr', public: { q: 'x' }, key: { answer: 'y' } };
  assert.match((await rejects(rpc(t, 'live_create_activity', 'a', 'formative', {}, [wr]))).message, /tipo não suportado/);
  assert.match((await rejects(rpc(t, 'live_create_activity', '', 'formative', {}, ok))).message, /invalid_title/);
  const rows = await admin("select kind, settings from public.live_activities where owner_id = $1", [t]);
  rows.forEach(a => { assert.equal(a.kind, 'formative'); assert.equal(a.settings.official_grade, false); assert.equal(a.settings.ranking, false); });
});
