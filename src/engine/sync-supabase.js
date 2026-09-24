/* Sync opcional de progresso via Supabase (substitui o antigo window.claude.use('db'/'user')
   da API de Artifacts do Claude). Sem VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY configuradas,
   ou sem usuário logado, tudo aqui vira no-op e o app funciona só com localStorage — igual
   ao comportamento original quando a API de Artifacts não estava disponível. */
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export let supabase = null;
let initializing = null;

let cachedUserId = null;
let cachedEmail = null;
const listeners = [];

/** Chama fn(event, session) sempre que o estado de login mudar (login, logout, token renovado). */
export function onAuthChange(fn){ listeners.push(fn); }

export async function initCloud(){
  if (!url || !anonKey) return;
  if (!initializing) initializing = (async () => {
    const { createClient } = await import('@supabase/supabase-js');
    supabase = createClient(url, anonKey);
    supabase.auth.onAuthStateChange((event, session) => {
      cachedUserId = session ? session.user.id : null;
      cachedEmail = session ? session.user.email : null;
      listeners.forEach(fn => fn(event, session));
    });
    const { data } = await supabase.auth.getSession();
    cachedUserId = data.session ? data.session.user.id : null;
    cachedEmail = data.session ? data.session.user.email : null;
  })();
  return initializing;
}

export function isLoggedIn(){ return !!cachedUserId; }
export function currentEmail(){ return cachedEmail; }

export async function signInWithEmail(email){
  if (!supabase) throw new Error('Supabase não configurado.');
  const { error } = await supabase.auth.signInWithOtp({ email });
  if (error) throw error;
}

export async function signOut(){
  if (!supabase) return;
  await supabase.auth.signOut();
  cachedUserId = null; cachedEmail = null;
}

export async function syncUp(payload){
  if (!supabase || !cachedUserId) return;
  try {
    await supabase.from('progress').upsert({ user_id: cachedUserId, data: payload, updated_at: new Date().toISOString() });
  } catch (e) { /* offline ou erro transitório: localStorage já guardou o progresso */ }
}

export async function syncDown(){
  if (!supabase || !cachedUserId) return null;
  try {
    const { data, error } = await supabase.from('progress').select('data').eq('user_id', cachedUserId).maybeSingle();
    if (error || !data) return null;
    return data.data;
  } catch (e) { return null; }
}
