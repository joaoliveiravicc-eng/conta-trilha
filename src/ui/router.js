/* Troca de tela, topbar, sheet (modal) e o cartão de missões diárias da Home. */
import { $, $$ } from './dom.js';
import { ACORN } from './components/icons.js';
import { S, curStreak, addCoins } from '../engine/state.js';
import { save } from '../engine/storage.js';
import { ensureDaily, missionsReady, mdef } from '../engine/gamification.js';
import { sfx } from './components/sound.js';
import { toast } from './components/toast.js';
import { confetti } from './components/confetti.js';
import { renderHome } from './screens/home.js';
import { areaById } from '../content/areas.js';

export let CUR = 'home';
export const TAB_OF = { home:'home', path:'home', practice:'practice', shop:'shop', glossary:'glossary', profile:'profile' };

export function go(name){
  $$('.screen').forEach(x => x.classList.toggle('active', x.id === 's-' + name));
  const tab = TAB_OF[name];
  $('#bottomnav').hidden = !tab;
  $('#topbar').style.display = (tab && name !== 'path') ? '' : 'none';
  $$('#bottomnav button').forEach(b => { const on = b.dataset.tab === tab; b.classList.toggle('on', on); if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
  document.body.classList.toggle('has-nav', !!tab);
  CUR = name; window.scrollTo(0, 0);
}
export function renderTop(){
  const area = areaById(S.area);
  $('#area-switch-icon').textContent = area.icon;
  $('#area-switch').setAttribute('aria-label', 'Área atual: ' + area.title + '. Escolher outra área');
  $('#pill-streak span').textContent = curStreak();
  $('#pill-streak').classList.toggle('dim', curStreak() === 0);
  $('#pill-xp span').textContent = S.xp;
  $('#pill-coins').innerHTML = '<span>' + S.coins + '</span>' + ACORN;
}

/* ---------- sheet (modal) ---------- */
let lastFocus = null;
export function sheet(html, map){
  const root = $('#sheet-root');
  if (!root.classList.contains('open')) lastFocus = document.activeElement;
  root.innerHTML = '<div class="sheet-bg"></div><div class="sheet" role="dialog" aria-modal="true">' + html + '</div>';
  root.classList.add('open');
  $('.sheet-bg', root).onclick = closeSheet;
  $$('[data-s]', root).forEach(b => b.onclick = () => { const fn = map && map[b.dataset.s]; closeSheet(); if (fn) fn(); });
  const title = $('.sheet h3', root); if (title){ title.id = 'sheet-title'; $('.sheet', root).setAttribute('aria-labelledby', 'sheet-title'); }
  const f = $('.sheet .btn', root); if (f) f.focus();
}
/* Mantém o Tab dentro da folha aberta (o main.js chama isto no keydown). */
export function trapFocus(e){
  const items = $$('#sheet-root .sheet button:not([disabled])'); if (!items.length) return;
  const first = items[0], last = items[items.length - 1];
  if (e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
  else if (!items.includes(document.activeElement)){ e.preventDefault(); first.focus(); }
}
export function closeSheet(){
  const r = $('#sheet-root'); r.classList.remove('open'); r.innerHTML = '';
  if (lastFocus && document.contains(lastFocus) && lastFocus.focus) lastFocus.focus();
  lastFocus = null;
}

/* ---------- HOME: anel de progresso e missões ---------- */
export function ring(pct, done){
  const r = 26, c = 2 * Math.PI * r;
  return '<svg class="ring" width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="' + r + '" fill="none" stroke="var(--line)" stroke-width="7"/>' +
    '<circle cx="32" cy="32" r="' + r + '" fill="none" stroke="' + (done ? 'var(--gold)' : 'var(--green)') + '" stroke-width="7" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - pct)) + '" transform="rotate(-90 32 32)"/>' +
    '<text x="32" y="38" text-anchor="middle" font-size="18">' + (done ? '🏅' : '🎯') + '</text></svg>';
}
export function missionCard(){
  ensureDaily();
  const ready = missionsReady();
  const rows = S.daily.ms.map(m => {
    const d = mdef(m.id), pct = Math.min(100, m.p / m.n * 100);
    return '<div class="miss-row' + (m.claimed ? ' claimed' : '') + '"><span class="mi">' + d.i + '</span><div class="mtxt"><div class="mt">' + d.txt(m.n) + '</div><div class="mbar"><div style="width:' + pct + '%"></div></div></div>' +
      (m.claimed ? '<span class="mchk">✓</span>' : (m.done ? '<button class="mclaim" data-act="claim" data-id="' + m.id + '">+' + 10 + '' + ACORN + '</button>' : '<span class="mnum">' + m.p + '/' + m.n + '</span>')) + '</div>';
  }).join('');
  const allClaimed = S.daily.ms.every(m => m.claimed);
  const chest = allClaimed && !S.daily.chest ? '<button class="chest-btn" data-act="chest">🎁 Abrir baú de todas as missões (+30' + ACORN + ')</button>' : (allClaimed ? '<div class="small muted" style="text-align:center;padding:8px 0">Baú de hoje já foi aberto. Volte amanhã!</div>' : '');
  return '<div class="card miss-card"><div class="miss-h"><span>🎯 Missões de hoje</span>' + (ready ? '<span class="miss-badge">' + ready + '</span>' : '') + '</div>' + rows + chest + '</div>';
}
export function claimMission(id){
  const m = S.daily.ms.find(x => x.id === id); if (!m || !m.done || m.claimed) return;
  m.claimed = true; addCoins(10); sfx.coin(); toast('+10 bolotas!'); save(); renderTop();
  if (CUR === 'home') renderHome();
}
export function claimChest(){
  if (!S.daily.ms.every(m => m.claimed) || S.daily.chest) return;
  S.daily.chest = true; addCoins(30); sfx.coin(); confettiSmall(); toast('🎁 +30 bolotas! Todas as missões de hoje concluídas.'); save(); renderTop(); renderHome();
}
export function confettiSmall(){ if (typeof confetti === 'function') confetti(); }
