/* Estado do jogador: formato, normalização, e as funções puras que leem
   xp/streak/coins/lições concluídas para decidir o que está desbloqueado. */
import { COURSES } from '../content/index.js';
import { ALL_LESSON_IDS } from '../content/catalog.js';
import { LATER_IDS } from '../content/layout.js';
import { AREAS, areaForCourse, coursesForArea } from '../content/areas.js';
import { mprog } from './gamification.js';
import { toast } from '../ui/components/toast.js';

export const LS_KEY = 'contatrilha_v2';
export const LS_OLD = 'contatrilha_progress_v1';

export function fresh(){
  return { v:6, area:null, xp:0, streak:0, lastActive:null, done:{}, perfect:{}, trophies:{}, unlocked:{}, mistakes:{}, days:{}, goal:30, sound:true, onboarded:false,
    badges:{}, checkpoints:{}, challenges:{}, repetition:{}, lessons:0, reviews:0, coins:0, freezes:0, boostUntil:0, owned:{}, equip:{ head:null, neck:null, body:null },
    daily:{ date:null, ms:[], chest:false }, best:{ blitz:0 }, cases:{}, st:{ correct:0, entries:0, writes:0, hints:0, coins:0, marathons:0 }, theme:'auto', usedFreeze:0, seen:{} };
}

export let S = fresh();
export function setState(next){ S = next; }

export function normalize(d){
  const s = fresh();
  if (!d || typeof d !== 'object') return s;
  Object.keys(s).forEach(k => {
    const v = d[k];
    if (v === undefined || v === null) return;
    if (s[k] !== null && typeof s[k] === 'object'){ if (typeof v === 'object' && !Array.isArray(v)) s[k] = Object.assign({}, s[k], v); }
    else if (s[k] === null || typeof v === typeof s[k]) s[k] = v;
  });
  if (!Array.isArray(s.daily.ms)) s.daily = { date:null, ms:[], chest:false };
  if (s.area && !AREAS.some(area => area.id === s.area)) s.area = null;
  if ((+d.v || 0) < 6) keepUnlockedAfterDeepen(s);
  s.v = 6;
  return s;
}

/* Quem terminou uma trilha antes da unidade 'Aprofundando' existir mantém a próxima liberada. */
function keepUnlockedAfterDeepen(s){
  AREAS.forEach(area => area.courseIds.forEach((id, i) => {
    if (i === 0) return;
    const previous = COURSES.find(c => c.id === area.courseIds[i - 1]);
    if (previous && previous.lessons.every(l => l.optional || LATER_IDS.has(l.id) || s.done[l.id])) s.unlocked[id] = true;
  }));
}

export function loadLocal(){
  try {
    const r = localStorage.getItem(LS_KEY); if (r) return normalize(JSON.parse(r));
    const o = localStorage.getItem(LS_OLD); if (o) return normalize(JSON.parse(o));
  } catch (e) {}
  return fresh();
}

export function applyTheme(){ const r = document.documentElement; if (S.theme === 'auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme', S.theme); }

/* ---------- progresso, sequência, moedas ---------- */
export const LEVELS = [[0,'Estagiário(a)'],[60,'Auxiliar contábil'],[150,'Assistente contábil'],[300,'Analista júnior'],[500,'Analista pleno'],[800,'Analista sênior'],[1200,'Contador(a)'],[1700,'Coordenador(a) contábil'],[2400,'Controller'],[3300,'Gerente financeiro(a)'],[4500,'Diretor(a) financeiro(a)'],[6000,'Lenda da Contabilidade']];
export function levelInfo(xp){
  let i = 0; while (i + 1 < LEVELS.length && xp >= LEVELS[i + 1][0]) i++;
  const cur = LEVELS[i], nx = LEVELS[i + 1];
  return { n:i + 1, name:cur[1], from:cur[0], to:nx ? nx[0] : null, next:nx ? nx[1] : null, pct: nx ? (xp - cur[0]) / (nx[0] - cur[0]) : 1 };
}

export function today(d){ d = d || new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); }
export function dayDiff(a, b){ return Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 86400000); }

export function curStreak(){
  if (!S.lastActive) return 0;
  const d = dayDiff(S.lastActive, today());
  if (d <= 1) return S.streak;
  return (d - 1 <= S.freezes) ? S.streak : 0;
}
export function studiedToday(){ return S.lastActive === today(); }
export function registerActivity(){
  const t = today(); if (S.lastActive === t) return;
  const diff = S.lastActive ? dayDiff(S.lastActive, t) : 99;
  if (diff === 1) S.streak++;
  else if (diff > 1 && diff < 99 && diff - 1 <= S.freezes){ S.freezes -= (diff - 1); S.usedFreeze += (diff - 1); S.streak++; toast('🛡️ Sua represa protegeu a sequência!'); }
  else S.streak = 1;
  S.lastActive = t;
}
export function boostOn(){ return Date.now() < S.boostUntil; }
export function addXP(n){ if (boostOn()) n *= 2; S.xp += n; const t = today(); S.days[t] = (S.days[t] || 0) + n; mprog('xp', n); return n; }
export function addCoins(n){ S.coins += n; S.st.coins += n; return n; }
export const lessonsDone = c => c.lessons.filter(l => S.done[l.id]).length;
export const courseComplete = c => c.lessons.filter(l => !l.optional).every(l => S.done[l.id]);
export const courseUnlocked = c => {
  const area = areaForCourse(c.id);
  const position = area?.courseIds.indexOf(c.id) ?? 0;
  const previous = position > 0 ? COURSES.find(item => item.id === area.courseIds[position - 1]) : null;
  return !previous || courseComplete(previous) || !!S.unlocked[c.id] || lessonsDone(c) > 0;
};
export const lessonUnlocked = l => {
  if (S.done[l.id]) return true;
  if (l.optional) {
    const previousRequired = l.course.lessons.slice(0, l.idx).filter(item => !item.optional).at(-1);
    return !previousRequired || !!S.done[previousRequired.id];
  }
  return l.idx === 0 ? courseUnlocked(l.course) : !!S.done[l.course.lessons[l.idx - 1].id];
};
export function nextLesson(){
  for (const c of coursesForArea(COURSES, S.area)){ if (!courseUnlocked(c)) continue; for (const l of c.lessons){ if (!l.optional && !S.done[l.id] && lessonUnlocked(l)) return l; } }
  return null;
}
export const doneCount = () => Object.keys(S.done).filter(id => ALL_LESSON_IDS.has(id)).length;
