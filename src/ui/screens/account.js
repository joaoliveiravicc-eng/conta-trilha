/* Conta: criar, entrar, recuperar senha. O progresso local é juntado ao da nuvem ao entrar. */
import { $, $$ } from '../dom.js';
import { sheet, closeSheet } from '../router.js';
import { toast } from '../components/toast.js';
import { doneCount } from '../../engine/state.js';
import { signUp, signIn, sendPasswordReset, updatePassword, resendConfirmation, cloudAvailable } from '../../engine/sync-supabase.js';

const esc = s => String(s || '').replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
let lastEmail = '';

function message(e){
  const m = String(e && (e.message || e.code) || '');
  if (/offline|Failed to fetch|NetworkError/i.test(m)) return 'Sem conexão com a internet. Tente de novo quando estiver on-line.';
  if (/Invalid login credentials/i.test(m)) return 'E-mail ou senha incorretos.';
  if (/Email not confirmed/i.test(m)) return 'confirm';
  if (/already_registered|already registered|already been registered/i.test(m)) return 'Esse e-mail já tem conta. Use "Entrar".';
  if (/Password should be|at least 6|weak/i.test(m)) return 'A senha precisa ter pelo menos 6 caracteres.';
  if (/rate limit|too many|429|seconds/i.test(m)) return 'Muitas tentativas agora. Espere alguns minutos e tente de novo.';
  if (/valid email|invalid.*email|Unable to validate email/i.test(m)) return 'Esse e-mail não parece válido.';
  return 'Não deu certo agora. Tente de novo em instantes.';
}

const field = (id, type, label, auto, value) =>
  '<label class="acct-field"><span>' + label + '</span><input id="' + id + '" type="' + type + '" autocomplete="' + auto + '" value="' + esc(value) + '"' + (type === 'password' ? ' minlength="6"' : '') + ' required></label>';

export function openAccount(mode = 'signup'){
  if (!cloudAvailable()){ toast('A conta está indisponível nesta versão do app.'); return; }
  const n = doneCount();
  const intro = {
    signup: n ? 'Você já fez ' + n + (n === 1 ? ' lição' : ' lições') + '. Crie uma conta para guardar tudo e continuar em qualquer aparelho.' : 'Crie uma conta para guardar seu progresso e continuar em qualquer aparelho.',
    signin: 'Entre para trazer seu progresso salvo. O que você fez neste aparelho também é mantido.',
    reset: 'Enviaremos um link para você criar uma senha nova.',
    newpass: 'Escolha sua nova senha.'
  }[mode];
  const title = { signup:'Salve seu progresso', signin:'Entrar na sua conta', reset:'Esqueci minha senha', newpass:'Nova senha' }[mode];
  const fields = mode === 'newpass' ? field('acct-pass', 'password', 'Nova senha', 'new-password', '')
    : field('acct-email', 'email', 'E-mail', 'email', lastEmail) + (mode === 'reset' ? '' : field('acct-pass', 'password', 'Senha (mínimo 6 caracteres)', mode === 'signup' ? 'new-password' : 'current-password', ''));
  const submit = { signup:'Criar conta', signin:'Entrar', reset:'Enviar link', newpass:'Salvar senha' }[mode];
  const links = mode === 'signup' ? '<button type="button" class="link" data-mode="signin">Já tenho conta</button>'
    : mode === 'signin' ? '<button type="button" class="link" data-mode="signup">Criar conta</button><button type="button" class="link" data-mode="reset">Esqueci a senha</button>'
    : mode === 'reset' ? '<button type="button" class="link" data-mode="signin">Voltar para entrar</button>' : '';
  sheet('<div class="sh-i" aria-hidden="true">🔐</div><h3>' + title + '</h3><p class="sh-s">' + intro + '</p>' +
    '<form class="acct-form" novalidate>' + fields + '<p class="acct-error" role="alert"></p>' +
    '<button class="btn primary" type="submit">' + submit + '</button></form>' +
    '<div class="acct-links">' + links + '</div>');
  const root = $('#sheet-root'), form = $('.acct-form', root), err = $('.acct-error', root), btn = $('button[type=submit]', form);
  $$('[data-mode]', root).forEach(b => b.onclick = () => { lastEmail = ($('#acct-email')?.value || lastEmail).trim(); openAccount(b.dataset.mode); });
  setTimeout(() => (mode === 'newpass' ? $('#acct-pass') : (lastEmail && mode !== 'reset' ? $('#acct-pass') : $('#acct-email')))?.focus(), 60);
  form.onsubmit = async ev => {
    ev.preventDefault();
    const email = ($('#acct-email')?.value || '').trim(), pass = $('#acct-pass')?.value || '';
    if (mode !== 'newpass' && !/^\S+@\S+\.\S+$/.test(email)){ err.textContent = 'Digite um e-mail válido.'; return; }
    if (mode !== 'reset' && pass.length < 6){ err.textContent = 'A senha precisa ter pelo menos 6 caracteres.'; return; }
    lastEmail = email || lastEmail; err.textContent = ''; btn.disabled = true; btn.textContent = 'Aguarde...';
    try {
      if (mode === 'signup'){
        const inside = await signUp(email, pass);
        if (inside){ closeSheet(); toast('Conta criada! Seu progresso agora fica salvo.'); }
        else confirmSheet(email);
      } else if (mode === 'signin'){ await signIn(email, pass); closeSheet(); toast('Pronto! Progresso sincronizado.'); }
      else if (mode === 'reset'){ await sendPasswordReset(email); closeSheet(); toast('Enviamos o link para ' + email + '. Confira também o spam.'); }
      else { await updatePassword(pass); closeSheet(); toast('Senha alterada.'); }
    } catch (e){
      const m = message(e);
      if (m === 'confirm') return confirmSheet(email);
      err.textContent = m; btn.disabled = false; btn.textContent = submit;
    }
  };
}

function confirmSheet(email){
  sheet('<div class="sh-i" aria-hidden="true">📧</div><h3>Confirme seu e-mail</h3><p class="sh-s">Enviamos um link para <b>' + esc(email) + '</b>. Abra o e-mail (confira o spam), toque no link e depois volte aqui e entre com sua senha. Seu progresso continua salvo neste aparelho enquanto isso.</p>' +
    '<button class="btn primary" data-s="in">Já confirmei, entrar</button><button class="btn ghost" data-s="again">Reenviar e-mail</button>', {
    in: () => openAccount('signin'),
    again: async () => { try { await resendConfirmation(email); toast('E-mail reenviado.'); } catch (e){ toast(message(e)); } }
  });
}
