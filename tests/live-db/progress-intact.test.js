/* O progresso atual dos alunos (public.progress + merge/normalize do app) continua intacto depois da migration 0002.
   Usa um banco próprio e descartável: aplica shim + 0001, grava progresso real, aplica 0002 e compara. */
import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import pg from 'pg';
import { CFG } from './helpers.js';
import { normalize, fresh } from '../../src/engine/state.js';
import { mergeProgress } from '../../src/engine/merge.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');
const DB = 'contalive_progress_test';
const sql = f => fs.readFileSync(path.join(ROOT, f), 'utf8');
const admin = new pg.Client({ ...CFG, database: 'postgres' });
let db;
after(async () => { if (db) await db.end(); await admin.query(`drop database if exists ${DB} with (force)`); await admin.end(); });

async function snapshot(c){
  const cols = (await c.query("select column_name, data_type, is_nullable, column_default from information_schema.columns where table_schema = 'public' and table_name = 'progress' order by ordinal_position")).rows;
  const pol = (await c.query("select policyname, cmd, roles, qual, with_check from pg_policies where schemaname = 'public' and tablename = 'progress' order by policyname")).rows;
  const rls = (await c.query("select relrowsecurity, relforcerowsecurity from pg_class where oid = 'public.progress'::regclass")).rows;
  const grants = (await c.query("select grantee, privilege_type from information_schema.role_table_grants where table_schema = 'public' and table_name = 'progress' order by 1, 2")).rows;
  const rows = (await c.query('select user_id, data, updated_at from public.progress order by user_id')).rows;
  return crypto.createHash('sha256').update(JSON.stringify({ cols, pol, rls, grants, rows })).digest('hex') + ' ' + JSON.stringify({ policies: pol.length, rows: rows.length });
}
const asUser = async (uid, q, p = []) => { await db.query('begin'); try { await db.query('set local role authenticated'); await db.query("select set_config('request.jwt.claims', $1, true)", [JSON.stringify({ sub: uid, role: 'authenticated' })]); const r = await db.query(q, p); await db.query('commit'); return r.rows; } catch (e) { await db.query('rollback'); throw e; } };

test('0002 não altera a tabela progress, suas políticas, privilégios nem os dados existentes', async () => {
  await admin.connect();
  await admin.query(`drop database if exists ${DB} with (force)`); await admin.query(`create database ${DB}`);
  db = new pg.Client({ ...CFG, database: DB }); await db.connect();
  await db.query(sql('supabase/dev/00_supabase_shim.sql'));
  await db.query(sql('supabase/migrations/0001_progress.sql'));

  const [u1, u2] = [crypto.randomUUID(), crypto.randomUUID()];
  for (const u of [u1, u2]) await db.query('insert into auth.users(id, email) values ($1, $2)', [u, u + '@t.local']);
  const s1 = normalize({ xp: 640, streak: 5, done: { dc1: true, dc2: true, base3: true }, coins: 12, cases: { padaria: true } });
  const s2 = normalize({ xp: 90, done: { base1: true } });
  await db.query('insert into public.progress(user_id, data) values ($1, $2), ($3, $4)', [u1, s1, u2, s2]);

  const before = await snapshot(db);
  await db.query(sql('supabase/migrations/0002_live_rooms.sql'));
  const after_ = await snapshot(db);
  assert.equal(after_, before, 'a migration 0002 mexeu em public.progress');

  // O sync do app (upsert da própria linha / leitura da própria linha) segue funcionando e isolado.
  const mine = await asUser(u1, 'select data from public.progress');
  assert.equal(mine.length, 1);
  assert.deepEqual(mine[0].data.done, s1.done);
  assert.equal(mine[0].data.xp, 640);
  const upd = await asUser(u1, "update public.progress set data = jsonb_set(data, '{xp}', '700'), updated_at = now() where user_id = $1 returning (data->>'xp')::int xp", [u1]);
  assert.equal(upd[0].xp, 700);
  const theirs = await asUser(u1, 'update public.progress set data = $2 where user_id = $1 returning 1', [u2, s1]);
  assert.equal(theirs.length, 0, 'u1 não pode alterar o progresso de u2');
  assert.equal((await asUser(u2, 'select data from public.progress'))[0].data.xp, 90);
});

test('o estado local do app e o merge não dependem de nada do Live (formato v6 inalterado)', () => {
  const f = fresh();
  assert.equal(f.v, 6);
  assert.deepEqual(Object.keys(f).filter(k => /live|room|sala/i.test(k)), [], 'o Live não pode criar chaves em S');
  const a = normalize({ xp: 10, done: { x1: true } }), b = normalize({ xp: 20, done: { y1: true } });
  const m = mergeProgress(a, b);
  assert.deepEqual(Object.keys(m.done).sort(), ['x1', 'y1']);
  assert.equal(m.xp, 20);
});
