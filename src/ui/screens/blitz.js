import { $, bindActs } from '../dom.js';
import { ACORN } from '../components/icons.js';
import { S, addCoins, addXP, registerActivity } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { mprog, checkBadges } from '../../engine/gamification.js';
import { pick, rint, shuffle } from '../../engine/random.js';
import { money } from '../../engine/format.js';
import { sfx, buzz } from '../components/sound.js';
import { bento } from '../components/bento.js';
import { confetti } from '../components/confetti.js';
import { ENTRY_TPL, CHART } from '../../content/chart-of-accounts.js';
import { rEntry } from './quiz-renderers.js';
import { go, sheet, renderTop } from '../router.js';
import { renderPractice } from './practice.js';

const CHART_KEYS = Object.keys(CHART);

export let BZ = null, BR = null;
export function openBlitz(){
  sheet('<div class="sh-i">⚡</div><h3>Modo Relâmpago</h3><p class="sh-s">60 segundos, lançamentos aleatórios de débito e crédito. Quantos você acerta? Seu recorde: ' + S.best.blitz + '.</p><button class="btn primary" data-s="go">Começar</button><button class="btn ghost" data-s="x">Agora não</button>',
    { go: startBlitz });
}
function randomEntryItem(){
  const tpl = pick(ENTRY_TPL), val = rint(3, 480) * 10 + pick([0, 0, 0, 50]);
  const distractors = shuffle(CHART_KEYS.filter(a => a !== tpl[1] && a !== tpl[2])).slice(0, 2);
  return { t:'entry', q:tpl[0].replace('{v}', money(val)), d:[tpl[1]], c:[tpl[2]], accts:shuffle([tpl[1], tpl[2]].concat(distractors)) };
}
export function startBlitz(){
  BZ = { score:0, t:60, timer:null };
  const s = $('#s-blitz');
  s.innerHTML = '<div class="qtop"><button class="icon-btn" id="bz-quit" aria-label="Encerrar">✕</button><div class="bz-time" id="bz-time">60</div><div class="bz-score">⚡ <span id="bz-score">0</span></div></div><div class="qbody" id="bz-body"></div>';
  $('#bz-quit').onclick = () => sheet('<div class="sh-i">⏹️</div><h3>Encerrar o Relâmpago?</h3><p class="sh-s">Sua pontuação atual será registrada.</p><button class="btn primary" data-s="stay">Continuar</button><button class="btn danger" data-s="stop">Encerrar</button>', { stop: endBlitz });
  go('blitz'); renderBlitzRound();
  BZ.timer = setInterval(() => { if (!BZ) return; BZ.t--; $('#bz-time').textContent = BZ.t; if (BZ.t <= 20) $('#bz-time').classList.add('low'); if (BZ.t <= 0) endBlitz(); }, 1000);
}
export function renderBlitzRound(){
  if (!BZ) return;
  const body = $('#bz-body'); body.innerHTML = '';
  const x = randomEntryItem(); BZ.cur = x;
  BR = rEntry(x, body, () => { if (BZ && BR.ready()) setTimeout(blitzCheck, 180); });
  $('#bz-score').textContent = BZ.score;
}
function blitzCheck(){
  if (!BZ || !BR || !BR.ready()) return;
  const ok = BR.check(); BR.reveal(ok);
  if (ok){ BZ.score++; sfx.ok(); } else { sfx.bad(); buzz(); }
  $('#bz-score').textContent = BZ.score;
  setTimeout(() => { if (BZ) renderBlitzRound(); }, ok ? 480 : 1000);
}
export function endBlitz(){
  if (!BZ) return;
  clearInterval(BZ.timer); const score = BZ.score, isBest = score > S.best.blitz;
  if (isBest) S.best.blitz = score;
  mprog('blitz', score); const coins = addCoins(score * 2); addXP(Math.round(score / 2)); registerActivity();
  const badges = checkBadges(); save(); renderTop(); BZ = null;
  const scr = $('#s-result');
  scr.innerHTML = '<div class="center" style="--cc:#B3432B"><div class="bento-wrap md"><div class="bento-wrap-inner">' + bento(score >= 8 ? 'cheer' : 'happy') + '</div></div><h1>⚡ ' + score + ' pontos!</h1><p class="sub">' + (isBest ? 'Novo recorde pessoal!' : 'Seu recorde continua sendo ' + S.best.blitz + '.') + '</p>' +
    '<div class="rstats"><div class="rs"><div class="rl">Acertos</div><div class="rv">' + score + '</div></div><div class="rs"><div class="rl">Bolotas</div><div class="rv">+' + coins + '' + ACORN + '</div></div><div class="rs"><div class="rl">Recorde</div><div class="rv">🏆' + S.best.blitz + '</div></div></div>' +
    badges.map(b => '<div class="note"><span class="ne">' + b.i + '</span><span>Conquista desbloqueada: ' + b.n + '</span></div>').join('') + '</div>' +
    '<div class="foot"><button class="btn primary" data-act="again">Jogar de novo</button><button class="btn ghost" data-act="out">Sair</button></div>';
  bindActs(scr, { again: startBlitz, out: () => { renderPractice(); go('practice'); } });
  go('result'); sfx.win(); if (isBest) confetti();
}
