/* Motor da sessão de exercícios: fila de itens, corações, combo, revisão de erros. */
import { $, el, bindActs } from '../dom.js';
import { cloudAvailable, isLoggedIn } from '../../engine/sync-supabase.js';
import { ACORN } from '../components/icons.js';
import { S, today, curStreak, addXP, addCoins, registerActivity, levelInfo, courseComplete } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { mprog, checkBadges } from '../../engine/gamification.js';
import { shuffle, pick } from '../../engine/random.js';
import { sfx, buzz } from '../components/sound.js';
import { bento } from '../components/bento.js';
import { confetti } from '../components/confetti.js';
import { SAY } from '../../content/dialogues.js';
import { COURSES, EX } from '../../content/index.js';
import { areaForCourse } from '../../content/areas.js';
import { checkpointRecord, reviewRecord, challengeRecord } from '../../engine/learning.js';
import { render, answerText, loadAI } from './quiz-renderers.js';
import { go, sheet, renderTop } from '../router.js';
import { openPath } from './path.js';
import { startLearn } from './learn.js';
import { renderPractice } from './practice.js';
import { caseBalanceteHTML } from './cases.js';

export let SES = null, R = null;
const PRAISE = ['Muito bem!', 'Isso aí!', 'Correto!', 'Mandou bem!', 'Perfeito!', 'Exato!', 'Excelente!', 'Show de bola!'];

export function startLessonQuiz(l){ startSession({ kind:'lesson', lesson:l, course:l.course, items:l.ex.map(x => ({ key:x.key, x:x })), hearts:99 }); }
export function startFinal(c){
  const pool = []; c.lessons.filter(l => !l.optional).forEach(l => l.ex.forEach(x => { if (['expl'].indexOf(x.t) < 0) pool.push({ key:x.key, x:x }); }));
  startSession({ kind:'final', course:c, items:shuffle(pool).slice(0, 10), hearts:3 });
}
export function startSession(o){
  stopClock();
  if (o.items.some(it => ['wr', 'expl'].includes(it.x.t))) loadAI();
  SES = Object.assign({}, o, { queue:o.items.slice(), total:o.items.length, done:0, first:0, combo:0, maxCombo:0, wrong:{}, cleanKeys:[], phase:'answer', maxHearts:o.hearts, usedHint:false });
  if (o.timeLimit){ SES.deadline = Date.now() + o.timeLimit * 1000; CLOCK = setInterval(tick, 250); }
  go('quiz'); renderItem();
}
let CLOCK = null;
function stopClock(){ if (CLOCK){ clearInterval(CLOCK); CLOCK = null; } }
function heartsHtml(){
  const hearts = SES.maxHearts >= 99 ? '<span class="free-practice">Sem limite</span>' : '<span class="hi">❤️</span>' + SES.hearts;
  if (!SES.deadline) return hearts;
  const left = Math.max(0, Math.ceil((SES.deadline - Date.now()) / 1000));
  return hearts + '<span class="q-clock' + (left <= 15 ? ' low' : '') + '">⏱ ' + Math.floor(left / 60) + ':' + String(left % 60).padStart(2, '0') + '</span>';
}
function tick(){
  if (!SES || !SES.deadline){ stopClock(); return; }
  $('#q-hearts').innerHTML = heartsHtml();
  if (Date.now() >= SES.deadline){ stopClock(); SES.timeout = true; failScreen(); }
}
function setBtn(txt, dis){ const b = $('#q-btn'); b.textContent = txt; b.disabled = !!dis; }
function bentoQuiz(mood){ const w = $('#q-bento'); if (w) w.innerHTML = bento(mood); }
export function renderItem(){
  const it = SES.queue[0], x = it.x, body = $('#q-body'), foot = $('#q-foot');
  SES.phase = 'answer'; foot.className = 'foot'; body.classList.remove('locked'); SES.undo = null;
  $('#q-hearts').innerHTML = heartsHtml();
  $('#q-bar').style.width = (SES.done / SES.total * 100) + '%';
  body.innerHTML = '';
  body.appendChild(el('div','session-context', '<span>'+ (SES.kind==='challenge'?'⚡ Desafio · sem dicas':SES.kind==='jump'?'⏩ Teste para pular':SES.kind==='unlock'?'🔓 Teste para liberar':SES.kind==='checkpoint'?'Selo · '+SES.unit.t:SES.kind==='spaced'?'Revisão do dia':SES.lesson?SES.lesson.title:SES.kind==='final'?'Teste final':'Prática') +'</span><span>'+SES.done+' de '+SES.total+' concluídas</span>'));
  bentoQuiz('idle');
  const retry = !!SES.wrong[it.key];
  body.appendChild(el('div', 'qk', (SAY.quiz[x.t] || 'Responda:') + (retry ? ' <span class="tagnew">Tente de novo</span>' : '')));
  const mountEl = el('div'); body.appendChild(mountEl);
  const startedHint = S.st.hints; SES.itemHintStart = startedHint;
  R = render(x, mountEl, () => { if (SES.phase === 'answer') $('#q-btn').disabled = !R.ready(); }, () => { if (SES.phase === 'answer') resolve(true); });
  if (SES.noHints) mountEl.querySelectorAll('.hintrow').forEach(h => h.remove());
  if (S.st.hints > startedHint) SES.usedHint = true;
  setBtn(R.auto ? 'Forme todos os pares' : 'Verificar', true);
  window.scrollTo(0, 0);
}
export function primary(){
  if (!SES) return;
  if (SES.phase === 'answer'){
    if (!R.ready()) return;
    let ok = R.check(), ai = null;
    /* as regras recusaram uma resposta escrita: o corretor inteligente dá uma segunda olhada */
    if (!ok && R.ai){ ai = R.ai(); if (ai && ai.verdict === 'right') ok = true; }
    resolve(ok, ai);
  }
  else nextItem();
}
function resolve(ok, ai){
  if (SES.timeout) return;
  const it = SES.queue[0], x = it.x;
  SES.phase = 'feedback'; R.reveal(ok, ai);
  $('#q-body').classList.add('locked');
  const itemHint = S.st.hints > SES.itemHintStart;
  if (itemHint) SES.usedHint = true;
  if (ok){
    SES.done++;
    const clean = !SES.wrong[it.key] && !itemHint && !(R.imperfect && R.imperfect());
    if (clean){ SES.first++; SES.cleanKeys.push(it.key); if (S.mistakes[it.key]) delete S.mistakes[it.key]; }
    else if (R.imperfect && R.imperfect()) S.mistakes[it.key] = (S.mistakes[it.key] || 0) + 1;
    SES.combo++; SES.maxCombo = Math.max(SES.maxCombo, SES.combo); mprog('combo', SES.combo);
    if (x.t === 'entry' || x.t === 'ew'){ S.st.entries++; mprog('entries', 1); }
    if (x.t === 'wr' || x.t === 'ew' || x.t === 'expl'){ S.st.writes++; mprog('writes', 1); }
    SES.queue.shift(); sfx.ok(); bentoQuiz('happy');
  } else {
    SES.undo = { wasWrong:!!SES.wrong[it.key], mistakes:S.mistakes[it.key], combo:SES.combo, hearts:SES.hearts, hint:itemHint };
    if (SES.maxHearts < 99) SES.hearts--;
    SES.wrong[it.key] = true;
    S.mistakes[it.key] = (S.mistakes[it.key] || 0) + 1;
    SES.combo = 0; SES.queue.push(SES.queue.shift()); sfx.bad(); buzz(); bentoQuiz('sad');
  }
  $('#q-hearts').innerHTML = heartsHtml();
  $('#q-bar').style.width = (SES.done / SES.total * 100) + '%';
  const foot = $('#q-foot'); foot.className = 'foot ' + (ok ? 'ok' : 'bad');
  let title = ok ? '✅ ' + pick(PRAISE) : '❌ Não foi dessa vez';
  if (ok && [3, 5, 8, 12].indexOf(SES.combo) >= 0) title = '🔥 ' + SES.combo + ' seguidas! ' + pick(PRAISE);
  $('#fb-t').innerHTML = title;
  const reaction = bentoReaction(ok, SES.combo, SES.hearts, SES.maxHearts);
  $('#fb-bento').innerHTML = bento(reaction.mood, undefined, 'react');
  $('#fb-say').textContent = reaction.say;
  const aiNote = ai && ai.note ? '<div class="ai-note' + (ai.verdict === 'unsure' ? ' unsure' : '') + '"><span aria-hidden="true">🤖</span> ' + ai.note + '</div>' : '';
  $('#fb-b').innerHTML = aiNote + (ok ? '' : '<div class="fb-ans">Resposta: ' + answerText(x) + '</div>') + x.e + (!ok && SES.hearts > 0 ? '<div class="small muted" style="margin-top:6px">Esta questão volta no final.</div>' : '') +
    (!ok && canContest(x) ? '<button class="link contest" id="fb-contest">' + (ai && ai.verdict === 'unsure' ? 'A IA acha que pode estar certa: contar como certa' : 'Minha resposta estava certa') + '</button>' : '');
  const contest = $('#fb-contest'); if (contest) contest.onclick = acceptMine;
  setBtn('Continuar', false);
  save();
}
/* Respostas escritas podem ser contestadas: o corretor automático pode não reconhecer
   um jeito diferente de dizer a mesma coisa. Nos testes (final, selos, desafios) não. */
const STRICT = ['final', 'unlock', 'jump', 'checkpoint', 'challenge'];
function canContest(x){ return ['wr', 'ew', 'expl'].includes(x.t) && !STRICT.includes(SES.kind) && !!R.learn && !!SES.undo; }
function acceptMine(){
  const u = SES.undo; if (!u || SES.phase !== 'feedback') return;
  SES.undo = null;
  const it = SES.queue.pop(), x = it.x;
  SES.hearts = u.hearts;
  if (u.wasWrong) SES.wrong[it.key] = true; else delete SES.wrong[it.key];
  if (u.mistakes) S.mistakes[it.key] = u.mistakes; else delete S.mistakes[it.key];
  SES.done++;
  if (!u.wasWrong && !u.hint){ SES.first++; SES.cleanKeys.push(it.key); }
  SES.combo = u.combo + 1; SES.maxCombo = Math.max(SES.maxCombo, SES.combo); mprog('combo', SES.combo);
  if (x.t === 'ew'){ S.st.entries++; mprog('entries', 1); }
  S.st.writes++; mprog('writes', 1);
  R.learn();
  sfx.ok(); bentoQuiz('happy');
  $('#q-hearts').innerHTML = heartsHtml();
  $('#q-bar').style.width = (SES.done / SES.total * 100) + '%';
  $('#q-foot').className = 'foot ok';
  $('#fb-t').innerHTML = '✅ Combinado: contei como certa';
  $('#fb-bento').innerHTML = bento('happy', undefined, 'react');
  $('#fb-say').textContent = x.t === 'expl' ? 'Boa! Compare com a resposta-modelo.' : 'Anotado! Na próxima, aceito essa resposta.';
  $('#fb-b').innerHTML = '<div class="fb-ans">Resposta de referência: ' + answerText(x) + '</div>' + x.e;
  save();
}
/* O Bento reage a cada resposta: comemora sequências e consola nos erros. */
const SAY_OK = ['Você está pegando o jeito!', 'Tô gostando de ver!', 'Tronco por tronco, a represa sobe!', 'Esse você dominou!', 'Sabia que você ia acertar!'];
const SAY_COMBO = ['Que sequência! Você está voando!', 'Ninguém te segura hoje!', 'Isso é que é ritmo!'];
const SAY_BAD = ['Quase! Leia a explicação comigo.', 'Errar faz parte. Vamos entender juntos.', 'Opa! Olha só a resposta certa.'];
const SAY_LAST = ['Cuidado: só resta um coração!', 'Último coração. Respira e lê com calma.'];
function bentoReaction(ok, combo, hearts, maxHearts){
  if (ok) return combo >= 3 ? { mood:'cheer', say:pick(SAY_COMBO) } : { mood:'happy', say:pick(SAY_OK) };
  if (maxHearts < 99 && hearts === 1) return { mood:'wow', say:pick(SAY_LAST) };
  return { mood:'sad', say:pick(SAY_BAD) };
}
function nextItem(){
  if (SES.hearts <= 0) return failScreen();
  if (!SES.queue.length) return finish();
  renderItem();
}
export function quitQuiz(){
  sheet('<div class="sh-i">🤔</div><h3>Sair agora?</h3><p class="sh-s">O progresso desta sessão será perdido. Os erros já registrados continuam na sua revisão.</p>' +
    '<button class="btn primary" data-s="stay">Continuar estudando</button><button class="btn ghost" data-s="quit">Sair</button>',
    { quit: () => { const s = SES; stopClock(); SES = null; exitTo(s); } });
}
function exitTo(s){
  if (s && s.course && ['lesson','final','checkpoint','challenge','jump','unlock'].includes(s.kind)) openPath(s.course);
  else { renderPractice(); go('practice'); }
}
function finish(){
  stopClock();
  const s = SES, perfect = s.first === s.total, before = S.days[today()] || 0, lvBefore = levelInfo(S.xp).n;
  let xp = 0, coins = 0, title = '', sub = '', emoji = '🎉', mood = 'cheer', extra = [], caseHtml = '';
  if (s.kind === 'lesson'){
    const firstTime = !S.done[s.lesson.id];
    xp = (firstTime ? 10 : 5) + s.first + (perfect ? 5 : 0); coins = (firstTime ? 6 : 3) + (perfect ? 4 : 0);
    S.done[s.lesson.id] = true; if (perfect && !s.usedHint) S.perfect[s.lesson.id] = true; S.lessons++;
    S.repetition[s.lesson.id] = reviewRecord(S.repetition[s.lesson.id], perfect, today());
    mprog('lessons', 1); if (!s.usedHint) mprog('nohint', 1); if (perfect) mprog('perfect', 1);
    title = perfect ? 'Lição perfeita!' : 'Lição concluída!'; sub = s.lesson.title; emoji = perfect ? '💯' : '🎉';
    if (firstTime && !s.lesson.optional && courseComplete(s.course)) extra.push(['🏁', 'Você concluiu as lições essenciais de “' + s.course.title + '”. O teste final está liberado!']);
  } else if (s.kind === 'checkpoint'){
    const previous = S.checkpoints[s.checkpointId];
    const record = checkpointRecord(previous,s.first,s.total,today());
    const passed = s.first / s.total >= 0.8, firstPass = passed && !previous?.passed;
    S.checkpoints[s.checkpointId] = record;
    xp = passed ? (firstPass ? 18 : 5) : s.first;
    coins = firstPass ? 10 : 0;
    title = passed ? 'Etapa consolidada!' : 'Mais uma rodada de prática';
    sub = s.first+' de '+s.total+' acertos de primeira, sem dicas · '+record.accuracy+'%';
    mood = passed ? 'cheer' : 'think';
    extra.push([passed ? '✓' : '↻', passed ? 'Selo conquistado. Retome esta etapa quando quiser reforçar.' : 'O selo pede pelo menos 80%. Reveja os pontos abaixo e tente novamente.']);
    const revisit = [...new Set(s.items.filter(it=>!s.cleanKeys.includes(it.key)).map(it=>EX[it.key]?.l).filter(Boolean))];
    caseHtml = revisit.length ? '<div class="result-review"><h2>Vale retomar</h2>'+revisit.map(l=>'<button class="btn ghost" data-act="theory" data-id="'+l.id+'">'+l.title+' →</button>').join('')+'</div>' : '';
  } else if (s.kind === 'jump'){
    s.skipLessons.forEach(l => { S.done[l.id] = S.done[l.id] || true; });
    xp = 10 + s.first; coins = 5;
    title = 'Etapas puladas!'; sub = s.skipLessons.length + ' lições marcadas como concluídas em “' + s.course.title + '”.';
    extra.push(['↻', 'Essas lições entram na sua revisão diária, para você não esquecer.']);
  } else if (s.kind === 'unlock'){
    S.unlocked[s.course.id] = true;
    xp = 10 + s.first; coins = 5;
    title = 'Trilha liberada!'; sub = s.course.title;
    extra.push(['🔓', 'Você mostrou que já domina a trilha anterior.']);
  } else if (s.kind === 'challenge'){
    const previous = S.challenges[s.challengeId], firstPass = !previous?.passed, firstCrown = perfect && !previous?.perfect;
    S.challenges[s.challengeId] = challengeRecord(previous, perfect, today());
    xp = (firstPass ? 20 : 6) + s.first + (firstCrown ? 10 : 0);
    coins = (firstPass ? 15 : 3) + (firstCrown ? 15 : 0);
    mprog('practice', 1);
    title = perfect ? 'Desafio lendário!' : 'Desafio vencido!';
    sub = perfect ? 'Tudo certo de primeira, sem dicas e dentro do tempo.' : s.first + ' de ' + s.total + ' de primeira. Acerte tudo de primeira para ganhar a coroa.';
    emoji = perfect ? '👑' : '⚡';
    if (firstCrown) extra.push(['👑', 'Coroa conquistada neste desafio.']);
    else if (!perfect) extra.push(['🎯', 'Tente de novo quando quiser: a coroa pede zero erros.']);
  } else if (s.kind === 'final'){
    const firstT = !S.trophies[s.course.id];
    xp = (firstT ? 25 : 10) + s.first; coins = firstT ? 30 : 12; S.trophies[s.course.id] = today();
    title = 'Troféu conquistado!'; sub = s.course.title; emoji = '🏆';
    const area = areaForCourse(s.course.id);
    const nx = COURSES.find(c => c.id === area?.courseIds[area.courseIds.indexOf(s.course.id) + 1]);
    if (firstT && nx) extra.push(['🔓', 'Próxima trilha liberada: ' + nx.title]);
  } else if (s.kind === 'case'){
    const cs = s.caseObj, first = !S.cases[cs.id];
    xp = first ? 20 : 8; coins = first ? 40 : 10; S.cases[cs.id] = today();
    title = 'Caso resolvido!'; sub = cs.title; emoji = '🥳';
    caseHtml = caseBalanceteHTML(cs);
  } else {
    xp = 5 + s.first; coins = 4; if (s.kind === 'review' || s.kind === 'spaced') S.reviews++;
    if (s.kind === 'spaced'){
      s.reviewLessons.forEach(l => {
        const keys = s.items.filter(it=>EX[it.key]?.l.id===l.id).map(it=>it.key);
        S.repetition[l.id] = reviewRecord(S.repetition[l.id],keys.every(k=>s.cleanKeys.includes(k)),today());
      });
      extra.push(['↻','Revisões reagendadas conforme seus acertos. Volte à área Praticar para ver o que está na hora de retomar.']);
    }
    mprog('practice', 1);
    title = ['review','spaced'].includes(s.kind) ? 'Revisão concluída!' : 'Treino concluído!';
    sub = 'Cada repetição fixa melhor o conteúdo.'; emoji = '💪'; mood = 'happy';
  }
  addXP(xp); addCoins(coins); registerActivity();
  const after = S.days[today()] || 0;
  if (before < S.goal && after >= S.goal) extra.push(['🎯', 'Meta diária de ' + S.goal + ' XP batida!']);
  const lvAfter = levelInfo(S.xp); if (lvAfter.n > lvBefore) extra.push(['⬆️', 'Novo nível: ' + lvAfter.name]);
  checkBadges().forEach(b => extra.push([b.i, 'Conquista desbloqueada: ' + b.n]));
  save(); renderTop();
  const cc = s.course ? s.course.color : (s.caseObj ? s.caseObj.color : 'var(--ink)');
  const ratio = s.total ? s.first / s.total : 1;
  let say = '';
  if (s.total && perfect){ mood = 'cheer'; say = pick(['Perfeito! Tudo certo de primeira! 🎉', 'Uau, nenhum erro! Estou orgulhoso!', 'Gabaritou! Que orgulho, parceiro!']); }
  else if (s.total && ratio < 0.6){ mood = 'think'; say = pick(['Foi puxado, mas você terminou. Vamos revisar os erros?', 'Hoje foi difícil. Os erros viraram revisão para amanhã.', 'Não desanima: é errando que a represa fica firme.']); }
  else if (s.total){ say = pick(['Mandou bem! Poucos erros.', 'Bom trabalho! Continue assim.', 'Mais um tronco na represa!']); }
  const scr = $('#s-result');
  scr.innerHTML = '<div class="center result-' + (perfect ? 'perfect' : ratio < 0.6 ? 'tough' : 'good') + '" style="--cc:' + cc + '"><div class="bento-wrap md"><div class="bento-wrap-inner">' + bento(mood) + '</div></div>' + (say ? '<div class="result-say">' + say + '</div>' : '') + '<h1>' + title + '</h1><p class="sub">' + sub + '</p>' +
    '<div class="rstats"><div class="rs"><div class="rl">XP</div><div class="rv">+' + xp + '</div></div>' +
    '<div class="rs"><div class="rl">Bolotas</div><div class="rv">+' + coins + '' + ACORN + '</div></div>' +
    '<div class="rs"><div class="rl">Sequência</div><div class="rv">🔥' + curStreak() + '</div></div></div>' +
    caseHtml + extra.map(e => '<div class="note"><span class="ne">' + e[0] + '</span><span>' + e[1] + '</span></div>').join('') +
    (cloudAvailable() && !isLoggedIn() ? '<button class="save-banner" data-act="save"><span aria-hidden="true">☁️</span><span><b>Não perca este progresso</b><small>Crie uma conta grátis para guardar suas lições.</small></span><span class="sb-go" aria-hidden="true">›</span></button>' : '') + '</div>' +
    '<div class="foot"><button class="btn primary" data-act="go">Continuar</button></div>';
  SES = null;
  bindActs(scr, { save: async () => (await import('./account.js')).openAccount('signup'), go: () => exitTo(s), theory: b => { const l=COURSES.flatMap(c=>c.lessons).find(l=>l.id===b.dataset.id); if(l) startLearn(l,'review'); } });
  go('result');
  if (s.kind !== 'checkpoint' || s.first / s.total >= 0.8){ sfx.win(); confetti(); }
}
export function failScreen(){
  stopClock();
  const s = SES, scr = $('#s-fail');
  scr.innerHTML = '<div class="center"><div class="bento-wrap md"><div class="bento-wrap-inner">' + bento('sad') + '</div></div><h1>' + (s.timeout ? 'O tempo acabou' : 'Acabaram os corações') + '</h1><p class="sub">' + (s.kind === 'challenge' ? 'Desafios são para testar seus limites. Revise as lições da etapa e tente de novo: não há limite de tentativas.' : 'Errar faz parte do aprendizado. As questões que você errou foram para a sua revisão. Revise a teoria e tente de novo.') + '</p></div>' +
    '<div class="foot">' + (s.kind === 'lesson' ? '<button class="btn primary" data-act="th">Rever a teoria</button>' : '') +
    '<button class="btn ' + (s.kind === 'lesson' ? 'ghost' : 'primary') + '" data-act="re">Tentar de novo</button><button class="btn ghost" data-act="out">Sair</button></div>';
  SES = null;
  bindActs(scr, {
    th: () => startLearn(s.lesson, 'lesson'),
    re: () => { if (s.kind === 'lesson') startLessonQuiz(s.lesson); else if (s.kind === 'final') startFinal(s.course); else startSession(Object.assign({}, s, { items:shuffle(s.items), hearts:s.maxHearts })); },
    out: () => exitTo(s)
  });
  go('fail'); sfx.bad();
}
