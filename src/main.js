/* Ponto de entrada: liga os eventos globais e inicializa o app (localStorage + sync opcional). */
import { $, $$ } from './ui/dom.js';
import { S, setState, loadLocal, normalize, applyTheme, LS_KEY } from './engine/state.js';
import { initCloud, syncDown, onAuthChange } from './engine/sync-supabase.js';
import { flush } from './engine/storage.js';
import { sfx } from './ui/components/sound.js';
import { go, CUR, closeSheet, renderTop } from './ui/router.js';
import { renderHome } from './ui/screens/home.js';
import { renderPractice } from './ui/screens/practice.js';
import { renderShop } from './ui/screens/shop.js';
import { renderGlossary } from './ui/screens/glossary.js';
import { renderProfile } from './ui/screens/profile.js';
import { renderOnb, resetOnb } from './ui/screens/onboarding.js';
import { primary, quitQuiz, SES, R } from './ui/screens/quiz.js';
import { toast } from './ui/components/toast.js';

/* ---------- PWA: atualiza sozinho quando sobe uma versão nova, para nunca
   ficar preso a um bundle antigo em cache junto com assets novos. ---------- */
if ('serviceWorker' in navigator){
  import('virtual:pwa-register').then(({ registerSW }) => {
    let refreshing = false;
    const doUpdate = () => { if (refreshing) return; refreshing = true; toast('Nova versão disponível, atualizando...'); setTimeout(() => updateSW(true), 900); };
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh: doUpdate,
      onRegisteredSW(url, reg){
        if (!reg) return;
        if (reg.waiting) doUpdate();
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          if (!nw) return;
          nw.addEventListener('statechange', () => { if (nw.state === 'installed' && reg.waiting) doUpdate(); });
        });
        setInterval(() => reg.update().catch(() => {}), 60 * 60 * 1000);
      }
    });
  }).catch(() => {});
}

/* ---------- eventos globais ---------- */
$('#q-btn').addEventListener('click', primary);
$('#q-close').addEventListener('click', quitQuiz);
$$('#bottomnav button').forEach(b => b.addEventListener('click', () => {
  const t = b.dataset.tab; sfx.tap();
  if (t === 'home') renderHome();
  if (t === 'practice') renderPractice();
  if (t === 'shop') renderShop();
  if (t === 'glossary') renderGlossary($('#g-search').value);
  if (t === 'profile') renderProfile();
  go(t);
}));
$('#g-search').addEventListener('input', e => renderGlossary(e.target.value));
document.addEventListener('keydown', e => {
  if ($('#sheet-root').classList.contains('open')){ if (e.key === 'Escape') closeSheet(); return; }
  if (CUR !== 'quiz' || !SES) return;
  if (e.key === 'Enter'){ e.preventDefault(); if (!$('#q-btn').disabled) primary(); return; }
  if (SES.phase === 'answer' && R && R.key && /^[1-9]$/.test(e.key) && document.activeElement.tagName !== 'INPUT') R.key(+e.key);
});

/* ---------- início ---------- */
function route(){
  applyTheme(); renderTop();
  if (!S.onboarded){ resetOnb(S.goal); renderOnb(); go('onb'); }
  else { renderHome(); go('home'); }
}
async function mergeCloud(){
  const cloudData = await syncDown();
  if (cloudData){
    const cs = normalize(cloudData);
    if (cs.xp > S.xp || (cs.xp === S.xp && cs.onboarded && !S.onboarded)){
      setState(cs); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
      if (['home', 'onb', 'practice', 'profile', 'glossary', 'path', 'shop'].indexOf(CUR) >= 0) route();
      return;
    }
    if (S.xp > cs.xp || S.onboarded !== cs.onboarded) flush();
  } else if (S.xp > 0 || S.onboarded) flush();
  if (CUR === 'profile') renderProfile();
}
(async function boot(){
  setState(loadLocal()); route();
  try { await initCloud(); await mergeCloud(); } catch (e) {}
})();
onAuthChange((event) => {
  if (event === 'SIGNED_IN') mergeCloud().catch(() => {});
  else if (event === 'SIGNED_OUT' && CUR === 'profile') renderProfile();
});
