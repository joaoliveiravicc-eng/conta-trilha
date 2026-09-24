/* Motor da sessão de exercícios: fila de itens, corações, combo, revisão de erros. */
import { $, el, bindActs } from '../dom.js';
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
import { checkpointRecord, reviewRecord } from '../../engine/learning.js';
import { render, answerText } from './quiz-renderers.js';
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
  SES = Object.assign({}, o, { queue:o.items.slice(), total:o.items.length, done:0, first:0, combo:0, maxCombo:0, wrong:{}, cleanKeys:[], phase:'answer', maxHearts:o.hearts, usedHint:false });
  go('quiz'); renderItem();
}
function setBtn(txt, dis){ const b = $('#q-btn'); b.textContent = txt; b.disabled = !!dis; }
function bentoQuiz(mood){ const w = $('#q-bento'); if (w) w.innerHTML = bento(mood); }
export function renderItem(){
  const it = SES.queue[0], x = it.x, body = $('#q-body'), foot = $('#q-foot');
  SES.phase = 'answer'; foot.className = 'foot';
  $('#q-hearts').innerHTML = SES.maxHearts >= 99 ? '<span class="free-practice">Sem limite</span>' : '<span class="hi">❤️</span>' + SES.hearts;
  $('#q-bar').style.width = (SES.done / SES.total * 100) + '%';
  body.innerHTML = '';
  body.appendChild(el('div','session-context', '<span>'+ (SES.kind==='checkpoint'?'Desafio · '+SES.unit.t:SES.kind==='spaced'?'Revisão do dia':SES.lesson?SES.lesson.title:SES.kind==='final'?'Teste final':'Prática') +'</span><span>'+SES.done+' de '+SES.total+' concluídas</span>'));
  bentoQuiz('idle');
  const retry = !!SES.wrong[it.key];
  body.appendChild(el('div', 'qk', (SAY.quiz[x.t] || 'Responda:') + (retry ? ' <span class="tagnew">Tente de novo</span>' : '')));
  const mountEl = el('div'); body.appendChild(mountEl);
  const startedHint = S.st.hints; SES.itemHintStart = startedHint;
  R = render(x, mountEl, () => { if (SES.phase === 'answer') $('#q-btn').disabled = !R.ready(); }, () => { if (SES.phase === 'answer') resolve(true); });
  if (S.st.hints > startedHint) SES.usedHint = true;
  setBtn(R.auto ? 'Forme todos os pares' : 'Verificar', true);
  window.scrollTo(0, 0);
}
export function primary(){
  if (!SES) return;
  if (SES.phase === 'answer'){ if (!R.ready()) return; const ok = R.check(); resolve(ok); }
  else nextItem();
}
function resolve(ok){
  const it = SES.queue[0], x = it.x;
  SES.phase = 'feedback'; R.reveal(ok);
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
    if (SES.maxHearts < 99) SES.hearts--;
    SES.wrong[it.key] = true;
    S.mistakes[it.key] = (S.mistakes[it.key] || 0) + 1;
    SES.combo = 0; SES.queue.push(SES.queue.shift()); sfx.bad(); buzz(); bentoQuiz('sad');
  }
  $('#q-hearts').innerHTML = SES.maxHearts >= 99 ? '<span class="free-practice">Sem limite</span>' : '<span class="hi">❤️</span>' + SES.hearts;
  $('#q-bar').style.width = (SES.done / SES.total * 100) + '%';
  const foot = $('#q-foot'); foot.className = 'foot ' + (ok ? 'ok' : 'bad');
  let title = ok ? '✅ ' + pick(PRAISE) : '❌ ' + pick(SAY.bad);
  if (ok && [3, 5, 8, 12].indexOf(SES.combo) >= 0) title = '🔥 ' + SES.combo + ' seguidas! ' + pick(PRAISE);
  $('#fb-t').innerHTML = title;
  $('#fb-b').innerHTML = (ok ? '' : '<div class="fb-ans">Resposta: ' + answerText(x) + '</div>') + x.e + (!ok && SES.hearts > 0 ? '<div class="small muted" style="margin-top:6px">Esta questão volta no final.</div>' : '');
  setBtn('Continuar', false);
  save();
}
function nextItem(){
  if (SES.hearts <= 0) return failScreen();
  if (!SES.queue.length) return finish();
  renderItem();
}
export function quitQuiz(){
  sheet('<div class="sh-i">🤔</div><h3>Sair agora?</h3><p class="sh-s">O progresso desta sessão será perdido. Os erros já registrados continuam na sua revisão.</p>' +
    '<button class="btn primary" data-s="stay">Continuar estudando</button><button class="btn ghost" data-s="quit">Sair</button>',
    { quit: () => { const s = SES; SES = null; exitTo(s); } });
}
function exitTo(s){
  if (s && s.course && ['lesson','final','checkpoint'].includes(s.kind)) openPath(s.course);
  else { renderPractice(); go('practice'); }
}
function finish(){
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
  const scr = $('#s-result');
  scr.innerHTML = '<div class="center" style="--cc:' + cc + '"><div class="bento-wrap md"><div class="bento-wrap-inner">' + bento(mood) + '</div></div><h1>' + title + '</h1><p class="sub">' + sub + '</p>' +
    '<div class="rstats"><div class="rs"><div class="rl">XP</div><div class="rv">+' + xp + '</div></div>' +
    '<div class="rs"><div class="rl">Bolotas</div><div class="rv">+' + coins + '' + ACORN + '</div></div>' +
    '<div class="rs"><div class="rl">Sequência</div><div class="rv">🔥' + curStreak() + '</div></div></div>' +
    caseHtml + extra.map(e => '<div class="note"><span class="ne">' + e[0] + '</span><span>' + e[1] + '</span></div>').join('') + '</div>' +
    '<div class="foot"><button class="btn primary" data-act="go">Continuar</button></div>';
  SES = null;
  bindActs(scr, { go: () => exitTo(s), theory: b => { const l=COURSES.flatMap(c=>c.lessons).find(l=>l.id===b.dataset.id); if(l) startLearn(l,'review'); } });
  go('result');
  if (s.kind !== 'checkpoint' || s.first / s.total >= 0.8){ sfx.win(); confetti(); }
}
export function failScreen(){
  const s = SES, scr = $('#s-fail');
  scr.innerHTML = '<div class="center"><div class="bento-wrap md"><div class="bento-wrap-inner">' + bento('sad') + '</div></div><h1>Acabaram os corações</h1><p class="sub">Errar faz parte do aprendizado. As questões que você errou foram para a sua revisão. Revise a teoria e tente de novo.</p></div>' +
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
