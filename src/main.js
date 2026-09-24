/* Ponto de entrada: liga os eventos globais e inicializa o app (localStorage + sync opcional). */
import { $, $$ } from './ui/dom.js';
import { S, setState, loadLocal, normalize, applyTheme, LS_KEY } from './engine/state.js';
import { initCloud, syncDown, onAuthChange } from './engine/sync-supabase.js';
import { flush } from './engine/storage.js';
import { sfx } from './ui/components/sound.js';
import { go, CUR, closeSheet, renderTop } from './ui/router.js';
import { renderHome } from './ui/screens/home.js';
import { registerSW } from 'virtual:pwa-register';
import { toast } from './ui/components/toast.js';

const loadQuiz = () => import('./ui/screens/quiz.js');
const screen = {
  practice: () => import('./ui/screens/practice.js'),
  shop: () => import('./ui/screens/shop.js'),
  glossary: () => import('./ui/screens/glossary.js'),
  profile: () => import('./ui/screens/profile.js'),
};

/* PWA: funciona offline, mas se atualiza sozinho. Uma versão nova é aplicada na
   hora, ou assim que a pessoa sai da lição em andamento, sem precisar limpar cache. */
const BUSY = ['onb', 'learn', 'quiz', 'blitz', 'result', 'fail'];
let pendingUpdate = false;
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh(){ pendingUpdate = true; applyUpdate(); },
  onRegisteredSW(url, reg){
    if (!reg) return;
    const check = () => reg.update().catch(() => {});
    document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
    setInterval(check, 30 * 60 * 1000);
  },
});
function applyUpdate(){ if (pendingUpdate && BUSY.indexOf(CUR) < 0) updateSW(true); }
setInterval(applyUpdate, 2000);

let installPrompt = null;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault(); installPrompt = event;
  $('#pwa-install')?.removeAttribute('hidden');
});
$('#pwa-install')?.addEventListener('click', async () => {
  if (!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt = null;
  $('#pwa-install')?.setAttribute('hidden', '');
});
window.addEventListener('appinstalled', () => {
  installPrompt = null; $('#pwa-install')?.setAttribute('hidden', '');
  toast('ContaTrilha instalada. Bons estudos!');
});

/* ---------- eventos globais ---------- */
$('#q-btn').addEventListener('click', async () => (await loadQuiz()).primary());
$('#q-close').addEventListener('click', async () => (await loadQuiz()).quitQuiz());
$('#area-switch').addEventListener('click', async () => (await import('./ui/screens/areas.js')).openAreas());
let navRequest = 0;
$$('#bottomnav button').forEach(b => b.addEventListener('click', async () => {
  const t = b.dataset.tab; sfx.tap();
  const request = ++navRequest;
  if (t === 'home') renderHome();
  if (t === 'practice') (await screen.practice()).renderPractice();
  if (t === 'shop') (await screen.shop()).renderShop();
  if (t === 'glossary') (await screen.glossary()).renderGlossary($('#g-search').value);
  if (t === 'profile') (await screen.profile()).renderProfile();
  if (request !== navRequest) return;
  go(t);
}));
$('#g-search').addEventListener('input', async e => (await screen.glossary()).renderGlossary(e.target.value));
document.addEventListener('keydown', async e => {
  if ($('#sheet-root').classList.contains('open')){ if (e.key === 'Escape') closeSheet(); return; }
  if (CUR !== 'quiz') return;
  if (e.key === 'Enter') e.preventDefault();
  const { SES, R, primary } = await loadQuiz();
  if (!SES) return;
  if (e.key === 'Enter'){ if (!$('#q-btn').disabled) primary(); return; }
  if (SES.phase === 'answer' && R && R.key && /^[1-9]$/.test(e.key) && document.activeElement.tagName !== 'INPUT') R.key(+e.key);
});

/* ---------- início ---------- */
async function route(){
  applyTheme(); renderTop();
  if (!S.onboarded){ const { resetOnb, renderOnb } = await import('./ui/screens/onboarding.js'); resetOnb(S.goal, S.area); renderOnb(); go('onb'); }
  else if (!S.area){ (await import('./ui/screens/areas.js')).openAreas(); }
  else { renderHome(); go('home'); }
}
async function mergeCloud(){
  const cloudData = await syncDown();
  if (cloudData){
    const cs = normalize(cloudData);
    if (cs.xp > S.xp || (cs.xp === S.xp && cs.onboarded && !S.onboarded)){
      if (!cs.area && S.area) cs.area = S.area;
      setState(cs); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); } catch (e) {}
      if (['home', 'onb', 'areas', 'practice', 'profile', 'glossary', 'path', 'shop'].indexOf(CUR) >= 0) await route();
      return;
    }
    if (S.xp > cs.xp || S.onboarded !== cs.onboarded) flush();
  } else if (S.xp > 0 || S.onboarded) flush();
  if (CUR === 'profile') (await screen.profile()).renderProfile();
}
(async function boot(){
  setState(loadLocal()); await route();
  try { await initCloud(); await mergeCloud(); } catch (e) {}
})();
onAuthChange((event) => {
  if (event === 'SIGNED_IN') mergeCloud().catch(() => {});
  else if (event === 'SIGNED_OUT' && CUR === 'profile') screen.profile().then(({renderProfile}) => renderProfile());
});
