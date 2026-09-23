/* Conquistas e missões diárias: leem/gravam em S (engine/state.js) e usam os
   dados de content/badges.js e content/missions.js. */
import { S, today } from './state.js';
import { seeded } from './random.js';
import { BADGES } from '../content/badges.js';
import { MPOOL } from '../content/missions.js';
import { toast } from '../ui/components/toast.js';

export function checkBadges(){ const out = []; BADGES.forEach(b => { if (!S.badges[b.id] && b.t(S)){ S.badges[b.id] = today(); out.push(b); } }); return out; }

/* ---------- missões diárias ---------- */
export function ensureDaily(){
  const t = today(); if (S.daily.date === t) return;
  const rnd = seeded('m' + t), pool = MPOOL.slice(), ms = [{ id:'xp', n:S.goal, p:0, done:false, claimed:false }];
  for (let k = 0; k < 2; k++){ const i = Math.floor(rnd() * pool.length); const m = pool.splice(i, 1)[0]; ms.push({ id:m.id, n:m.n[Math.floor(rnd() * m.n.length)], p:0, done:false, claimed:false }); }
  S.daily = { date:t, ms:ms, chest:false };
}
export function mdef(id){ return id === 'xp' ? { id:'xp', txt:n => 'Ganhe ' + n + ' XP', i:'⭐' } : MPOOL.find(m => m.id === id); }
export function mprog(id, val){
  ensureDaily();
  S.daily.ms.forEach(m => {
    if (m.id !== id || m.done) return;
    const d = mdef(id); m.p = d.max ? Math.max(m.p, val) : m.p + val;
    if (m.p >= m.n){ m.p = m.n; m.done = true; toast('🎯 Missão concluída: ' + d.txt(m.n)); }
  });
}
export function missionsReady(){ ensureDaily(); return S.daily.ms.filter(m => m.done && !m.claimed).length + (S.daily.ms.every(m => m.claimed) && !S.daily.chest ? 1 : 0); }
