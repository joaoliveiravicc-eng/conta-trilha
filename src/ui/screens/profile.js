import { $, bindActs } from '../dom.js';
import { ACORN } from '../components/icons.js';
import { S, today, curStreak, doneCount, levelInfo, applyTheme, fresh, setState } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { sfx } from '../components/sound.js';
import { toast } from '../components/toast.js';
import { bento } from '../components/bento.js';
import { COURSES, TOTAL_LESSONS, BADGES } from '../../content/index.js';
import { go, sheet, renderTop } from '../router.js';
import { renderHome } from './home.js';
import { supabase, isLoggedIn, currentEmail, signInWithEmail, signOut } from '../../engine/sync-supabase.js';

function accountCardHtml(){
  if (!supabase) return '';
  if (isLoggedIn()){
    return '<h2 class="sec-h">Conta</h2><div class="card" style="margin:0 16px">' +
      '<div class="setrow"><span>Conectado como ' + currentEmail() + '</span><button class="link" data-act="signout">Sair</button></div>' +
      '<p class="small muted" style="padding:8px 2px 0">Seu progresso sincroniza automaticamente entre dispositivos.</p></div>';
  }
  return '<h2 class="sec-h">Conta</h2><div class="card" style="margin:0 16px">' +
    '<div style="font-weight:600;margin-bottom:6px">Sincronizar entre dispositivos</div>' +
    '<p class="small muted" style="margin-bottom:10px">Receba um link por e-mail para entrar, sem senha.</p>' +
    '<input type="email" id="acct-email" placeholder="seu@email.com" autocomplete="email" style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--line);background:var(--card);color:var(--ink);margin-bottom:8px;box-sizing:border-box">' +
    '<button class="btn primary" data-act="signin">Enviar link de acesso</button></div>';
}

export function renderProfile(){
  const s = $('#s-profile'), lv = levelInfo(S.xp);
  const bars = []; for (let i = 6; i >= 0; i--){ const d = new Date(); d.setDate(d.getDate() - i); const k = today(d); bars.push({ k:k, xp:S.days[k] || 0, l:d.toLocaleDateString('pt-BR', { weekday:'short' }).replace('.', '') }); }
  const max = Math.max(S.goal, ...bars.map(b => b.xp));
  s.innerHTML = '<div class="bento-row" style="padding:16px 16px 0"><div class="bento-wrap sm">' + bento('idle', S.equip) + '</div><div class="speech">Oi! Sou o Bento. Vamos revisar seu progresso?</div></div>' +
    '<div class="lvl"><div class="lk2">Nível ' + lv.n + '</div><div class="ln2">' + lv.name + '</div><div class="progress-track"><div class="progress-fill" style="width:' + (lv.pct * 100) + '%"></div></div><div class="lm">' + (lv.to ? S.xp + ' de ' + lv.to + ' XP para ' + lv.next : 'Nível máximo alcançado!') + '</div></div>' +
    '<div class="sgrid">' +
    '<div class="sbox"><span class="se">🔥</span><div><div class="sv">' + curStreak() + '</div><div class="sl">dias seguidos</div></div></div>' +
    '<div class="sbox"><span class="se">' + ACORN + '</span><div><div class="sv">' + S.coins + '</div><div class="sl">bolotas</div></div></div>' +
    '<div class="sbox"><span class="se">📚</span><div><div class="sv">' + doneCount() + '/' + TOTAL_LESSONS + '</div><div class="sl">lições concluídas</div></div></div>' +
    '<div class="sbox"><span class="se">🏆</span><div><div class="sv">' + Object.keys(S.trophies).length + '/' + COURSES.length + '</div><div class="sl">troféus</div></div></div></div>' +
    '<h2 class="sec-h">Últimos 7 dias</h2><div class="week">' + bars.map(b => '<div class="wb' + (b.k === today() ? ' today' : '') + '"><div class="wb-v">' + (b.xp || '') + '</div><div class="wb-bar"><div class="' + (b.xp >= S.goal ? 'hit' : '') + '" style="height:' + (b.xp / max * 100) + '%"></div></div><div class="wb-l">' + b.l + '</div></div>').join('') + '</div>' +
    '<h2 class="sec-h">Conquistas (' + Object.keys(S.badges).length + '/' + BADGES.length + ')</h2><div class="bgrid">' + BADGES.map(b => '<div class="bd' + (S.badges[b.id] ? '' : ' off') + '"><div class="bi">' + b.i + '</div><div class="bn">' + b.n + '</div><div class="bs">' + b.d + '</div></div>').join('') + '</div>' +
    accountCardHtml() +
    '<h2 class="sec-h">Configurações</h2><div class="card" style="margin:0 16px">' +
    '<div style="padding-bottom:12px; border-bottom:1px solid var(--line)"><div style="font-weight:600; margin-bottom:8px">Meta diária</div><div class="segctl">' + [15, 30, 50, 80].map(g => '<button data-act="goal" data-g="' + g + '" class="' + (S.goal === g ? 'on' : '') + '">' + g + ' XP</button>').join('') + '</div></div>' +
    '<div style="padding:12px 0; border-bottom:1px solid var(--line)"><div style="font-weight:600; margin-bottom:8px">Aparência</div><div class="segctl" style="grid-template-columns:repeat(3,1fr)">' + [['auto', '🌗 Auto'], ['light', '☀️ Claro'], ['dark', '🌙 Escuro']].map(t => '<button data-act="theme" data-th="' + t[0] + '" class="' + (S.theme === t[0] ? 'on' : '') + '">' + t[1] + '</button>').join('') + '</div></div>' +
    '<div class="setrow"><span>Efeitos sonoros</span><button class="switch' + (S.sound ? ' on' : '') + '" data-act="snd" role="switch" aria-checked="' + S.sound + '" aria-label="Efeitos sonoros"></button></div>' +
    '<div class="setrow"><span>Apagar todo o progresso</span><button class="link" data-act="reset" style="color:var(--red)">Apagar</button></div></div>';
  bindActs(s, {
    signin: async b => {
      const inp = $('#acct-email'); const email = inp.value.trim(); if (!email) return;
      b.disabled = true; b.textContent = 'Enviando...';
      try { await signInWithEmail(email); toast('📧 Confira seu e-mail! Enviamos um link de acesso.'); }
      catch (e){ toast('Não consegui enviar. Confira o e-mail e tente de novo.'); }
      b.disabled = false; b.textContent = 'Enviar link de acesso';
    },
    signout: async () => { await signOut(); toast('Você saiu.'); renderProfile(); },
    goal: b => { S.goal = +b.dataset.g; save(); renderProfile(); toast('Meta diária: ' + S.goal + ' XP'); },
    theme: b => { S.theme = b.dataset.th; applyTheme(); save(); renderProfile(); },
    snd: () => { S.sound = !S.sound; save(); renderProfile(); if (S.sound) sfx.ok(); },
    reset: () => sheet('<div class="sh-i">⚠️</div><h3>Apagar todo o progresso?</h3><p class="sh-s">XP, lições, troféus, sequência, bolotas e conquistas serão zerados. Não dá para desfazer.</p><button class="btn danger" data-s="yes">Apagar tudo</button><button class="btn ghost" data-s="x">Cancelar</button>',
      { yes: () => {
        const g = S.goal, snd = S.sound, th = S.theme;
        const ns = fresh(); ns.goal = g; ns.sound = snd; ns.theme = th; ns.onboarded = true;
        setState(ns);
        applyTheme(); save(); renderTop(); renderHome(); go('home'); toast('Progresso apagado');
      } })
  });
}
