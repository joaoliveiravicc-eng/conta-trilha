import { $, bindActs } from '../dom.js';
import { ACORN } from '../components/icons.js';
import { S, today, curStreak, doneCount, levelInfo, applyTheme, fresh, setState } from '../../engine/state.js';
import { save, flush } from '../../engine/storage.js';
import { sfx } from '../components/sound.js';
import { toast } from '../components/toast.js';
import { bento } from '../components/bento.js';
import { ALL_COURSE_IDS, TOTAL_LESSONS } from '../../content/catalog.js';
import { BADGES } from '../../content/badges.js';
import { areaById } from '../../content/areas.js';
import { go, sheet, renderTop } from '../router.js';
import { renderHome } from './home.js';
import { cloudAvailable, isLoggedIn, currentEmail, signOut } from '../../engine/sync-supabase.js';

function accountCardHtml(){
  if (!cloudAvailable()) return '';
  if (isLoggedIn()){
    return '<h2 class="sec-h">Conta</h2><div class="card acct-card">' +
      '<div class="acct-state ok"><span aria-hidden="true">✅</span><div><b>Progresso salvo na nuvem</b><span>' + currentEmail() + '</span></div></div>' +
      '<div class="acct-actions"><button class="link" data-act="newpass">Trocar senha</button><button class="link" data-act="signout">Sair</button></div></div>';
  }
  return '<h2 class="sec-h">Conta</h2><div class="card acct-card">' +
    '<div class="acct-state warn"><span aria-hidden="true">⚠️</span><div><b>Progresso só neste aparelho</b><span>Se limpar o navegador ou trocar de celular, ele se perde. Crie uma conta para guardar.</span></div></div>' +
    '<button class="btn primary" data-act="signup">Criar conta grátis</button><button class="btn ghost" data-act="signin">Já tenho conta</button></div>';
}

export function renderProfile(){
  const s = $('#s-profile'), lv = levelInfo(S.xp);
  const area = areaById(S.area);
  const bars = []; for (let i = 6; i >= 0; i--){ const d = new Date(); d.setDate(d.getDate() - i); const k = today(d); bars.push({ k:k, xp:S.days[k] || 0, l:d.toLocaleDateString('pt-BR', { weekday:'short' }).replace('.', '') }); }
  const max = Math.max(S.goal, ...bars.map(b => b.xp));
  s.innerHTML = '<div class="bento-row" style="padding:16px 16px 0"><div class="bento-wrap sm">' + bento('idle', S.equip) + '</div><div class="speech">Oi! Sou o Bento. Vamos revisar seu progresso?</div></div>' +
    '<div class="lvl"><div class="lk2">Nível ' + lv.n + '</div><div class="ln2">' + lv.name + '</div><div class="progress-track"><div class="progress-fill" style="width:' + (lv.pct * 100) + '%"></div></div><div class="lm">' + (lv.to ? S.xp + ' de ' + lv.to + ' XP para ' + lv.next : 'Nível máximo alcançado!') + '</div></div>' +
    '<div class="sgrid">' +
    '<div class="sbox"><span class="se">🔥</span><div><div class="sv">' + curStreak() + '</div><div class="sl">dias seguidos</div></div></div>' +
    '<div class="sbox"><span class="se">' + ACORN + '</span><div><div class="sv">' + S.coins + '</div><div class="sl">bolotas</div></div></div>' +
    '<div class="sbox"><span class="se">📚</span><div><div class="sv">' + doneCount() + '/' + TOTAL_LESSONS + '</div><div class="sl">lições concluídas</div></div></div>' +
    '<div class="sbox"><span class="se">🏆</span><div><div class="sv">' + Object.keys(S.trophies).length + '/' + ALL_COURSE_IDS.length + '</div><div class="sl">troféus</div></div></div></div>' +
    accountCardHtml() +
    '<h2 class="sec-h">Últimos 7 dias</h2><div class="week">' + bars.map(b => '<div class="wb' + (b.k === today() ? ' today' : '') + '"><div class="wb-v">' + (b.xp || '') + '</div><div class="wb-bar"><div class="' + (b.xp >= S.goal ? 'hit' : '') + '" style="height:' + (b.xp / max * 100) + '%"></div></div><div class="wb-l">' + b.l + '</div></div>').join('') + '</div>' +
    '<h2 class="sec-h">Conquistas (' + Object.keys(S.badges).length + '/' + BADGES.length + ')</h2><div class="bgrid">' + BADGES.map(b => '<div class="bd' + (S.badges[b.id] ? '' : ' off') + '"><div class="bi">' + b.i + '</div><div class="bn">' + b.n + '</div><div class="bs">' + b.d + '</div></div>').join('') + '</div>' +
    '<h2 class="sec-h">Área de estudo</h2><div class="profile-area"><span class="area-icon" aria-hidden="true">' + area.icon + '</span><div><strong>' + area.title + '</strong><span>Seu progresso fica salvo ao trocar.</span></div><button class="area-change" data-act="area">Trocar</button></div>' +
    '<h2 class="sec-h">Configurações</h2><div class="card" style="margin:0 16px">' +
    '<div style="padding-bottom:12px; border-bottom:1px solid var(--line)"><div style="font-weight:600; margin-bottom:8px">Meta diária</div><div class="segctl">' + [15, 30, 50, 80].map(g => '<button data-act="goal" data-g="' + g + '" class="' + (S.goal === g ? 'on' : '') + '">' + g + ' XP</button>').join('') + '</div></div>' +
    '<div style="padding:12px 0; border-bottom:1px solid var(--line)"><div style="font-weight:600; margin-bottom:8px">Aparência</div><div class="segctl" style="grid-template-columns:repeat(3,1fr)">' + [['auto', '🌗 Auto'], ['light', '☀️ Claro'], ['dark', '🌙 Escuro']].map(t => '<button data-act="theme" data-th="' + t[0] + '" class="' + (S.theme === t[0] ? 'on' : '') + '">' + t[1] + '</button>').join('') + '</div></div>' +
    '<div class="setrow"><span>Efeitos sonoros</span><button class="switch' + (S.sound ? ' on' : '') + '" data-act="snd" role="switch" aria-checked="' + S.sound + '" aria-label="Efeitos sonoros"></button></div>' +
    '<div class="setrow"><span>Apagar todo o progresso</span><button class="link" data-act="reset" style="color:var(--red)">Apagar</button></div></div>';
  bindActs(s, {
    area: async () => (await import('./areas.js')).openAreas(),
    signup: async () => (await import('./account.js')).openAccount('signup'),
    signin: async () => (await import('./account.js')).openAccount('signin'),
    newpass: async () => (await import('./account.js')).openAccount('newpass'),
    signout: async () => { await flush(); await signOut(); toast('Você saiu. O progresso continua neste aparelho.'); renderProfile(); },
    goal: b => { S.goal = +b.dataset.g; save(); renderProfile(); toast('Meta diária: ' + S.goal + ' XP'); },
    theme: b => { S.theme = b.dataset.th; applyTheme(); save(); renderProfile(); },
    snd: () => { S.sound = !S.sound; save(); renderProfile(); if (S.sound) sfx.ok(); },
    reset: () => sheet('<div class="sh-i">⚠️</div><h3>Apagar todo o progresso?</h3><p class="sh-s">XP, lições, troféus, sequência, bolotas e conquistas serão zerados. Não dá para desfazer.</p><button class="btn danger" data-s="yes">Apagar tudo</button><button class="btn ghost" data-s="x">Cancelar</button>',
      { yes: () => {
        const g = S.goal, snd = S.sound, th = S.theme, areaId = S.area;
        const ns = fresh(); ns.goal = g; ns.sound = snd; ns.theme = th; ns.area = areaId; ns.onboarded = true;
        setState(ns);
        applyTheme(); save(); renderTop(); renderHome(); go('home'); toast('Progresso apagado');
      } })
  });
}
