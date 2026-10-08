/* Ajudantes dos testes do Live contra um PostgreSQL LOCAL. Recusa qualquer host que não seja local. */
import pg from 'pg';
import crypto from 'node:crypto';
import { COURSES } from '../../src/content/index.js';
import { projectExercise, isLiveSupported } from '../../src/live/projection.js';

export const CFG = {
  host: process.env.LIVE_PGHOST || '127.0.0.1', port: +(process.env.LIVE_PGPORT || 54329),
  user: process.env.LIVE_PGUSER || 'postgres', database: process.env.LIVE_PGDATABASE || 'contalive_test',
};
if (!['127.0.0.1', 'localhost', '::1'].includes(CFG.host)) throw new Error('recusado: o banco de testes precisa ser local (' + CFG.host + ')');
if (!/_(test|dev|demo)$/.test(CFG.database)) throw new Error('recusado: o banco deve terminar em _test, _dev ou _demo (' + CFG.database + ')');

export const pool = new pg.Pool({ ...CFG, max: 40 });
export const close = () => pool.end();

const claims = uid => JSON.stringify({ sub: uid, role: 'authenticated', aud: 'authenticated' });

/* Executa UMA chamada como o usuário (papel authenticated + claims), em transação própria.
   Cada chamada usa uma conexão do pool, então chamadas em Promise.all são concorrentes de verdade. */
export async function as(uid, sql, params = []){
  const c = await pool.connect();
  try {
    await c.query('begin');
    await c.query(uid ? 'set local role authenticated' : 'set local role anon');
    if (uid) await c.query("select set_config('request.jwt.claims', $1, true)", [claims(uid)]);
    const r = await c.query(sql, params);
    await c.query('commit');
    return r.rows;
  } catch (e) { try { await c.query('rollback'); } catch (_) {} throw e; }
  finally { c.release(); }
}
/* rpc(uid, 'live_join_room', 'ABC234', 'Ana') -> valor jsonb devolvido */
export async function rpc(uid, fn, ...args){
  const ph = args.map((_, i) => '$' + (i + 1) + (typeof args[i] === 'object' && args[i] !== null ? '::jsonb' : '')).join(', ');
  const rows = await as(uid, 'select public.' + fn + '(' + ph + ') as r', args.map(a => (a !== null && typeof a === 'object') ? JSON.stringify(a) : a));
  return rows[0].r;
}
/* Como o superusuário do banco (o dono do projeto): para preparar cenários e inspecionar. */
export async function admin(sql, params = []){ return (await pool.query(sql, params)).rows; }

export async function newUser(label = 'u'){
  const id = crypto.randomUUID();
  await admin('insert into auth.users(id, email) values ($1, $2)', [id, label + '-' + id.slice(0, 8) + '@teste.local']);
  return id;
}
export async function newTeacher(label = 'prof'){
  const id = await newUser(label);
  await admin('insert into public.live_teacher_grants(user_id) values ($1)', [id]);
  return id;
}

/* Rejeição esperada: devolve a mensagem do erro (ou falha o teste se não houve erro). */
export async function rejects(promise){
  try { await promise; } catch (e) { return e; }
  throw new Error('esperava um erro, mas a chamada funcionou');
}

/* Itens reais do catálogo de Contabilidade Introdutória: 1 mc, 1 tf e 1 num (D8), com gabarito conhecido. */
export function pilotExercises(){
  const out = { mc: [], tf: [], num: [] };
  for (const id of ['base', 'dc']) {
    const c = COURSES.find(c => c.id === id);
    c.lessons.forEach(l => (l.ex || []).forEach(x => { if (out[x.t] && isLiveSupported(x)) out[x.t].push(x); }));
  }
  return out;
}
const seeded = seed => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
export function pilotItems(n = { mc: 2, tf: 2, num: 2 }, seed = 11){
  const p = pilotExercises();
  const xs = [...p.mc.slice(0, n.mc), ...p.tf.slice(0, n.tf), ...p.num.slice(0, n.num)];
  return xs.map((x, i) => ({ x, item: projectExercise(x, { rng: seeded(seed + i) }) }));
}

/* Cria atividade + sala como o professor; devolve também os gabaritos para os testes conferirem. */
export async function setupRoom({ teacher, mode = 'teacher_paced', feedback = 'after_reveal', ttl = 240, max = 40, items } = {}){
  teacher = teacher || await newTeacher();
  const built = items || pilotItems();
  const activity = await rpc(teacher, 'live_create_activity', 'Atividade ' + crypto.randomUUID().slice(0, 6), 'formative',
    { mode, feedback, materials: ['calculadora'] }, built.map(b => b.item));
  const room = await rpc(teacher, 'live_create_room', activity, ttl, max);
  return { teacher, activity, room_id: room.room_id, code: room.code, built };
}
export const wrongPayload = item => {
  if (item.type === 'mc') return { choice: (item.key.answer + 1) % item.public.options.length };
  if (item.type === 'tf') return { value: !item.key.answer };
  return { value: item.key.answer + item.key.tol * 2 + 7 };
};
export const rightPayload = item => item.type === 'mc' ? { choice: item.key.answer } : { value: item.key.answer };
export const nonce = () => crypto.randomUUID();
