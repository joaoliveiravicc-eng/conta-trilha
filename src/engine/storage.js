/* Persistência do progresso: localStorage sempre, Supabase quando logado (debounced). */
import { S, LS_KEY, today } from './state.js';
import { syncUp } from './sync-supabase.js';

let saveTimer = null, saving = false, saveAgain = false;
export function save(){ clearTimeout(saveTimer); saveTimer = setTimeout(flush, 500); }

export async function flush(){
  if (saving){ saveAgain = true; return; }
  saving = true;
  const cut = new Date(); cut.setDate(cut.getDate() - 60); const ck = today(cut);
  Object.keys(S.days).forEach(k => { if (k < ck) delete S.days[k]; });
  const payload = JSON.parse(JSON.stringify(S));
  try { localStorage.setItem(LS_KEY, JSON.stringify(payload)); } catch (e) {}
  await syncUp(payload);
  saving = false;
  if (saveAgain){ saveAgain = false; flush(); }
}
