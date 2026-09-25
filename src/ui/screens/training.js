/* Treino de revisão (o halter): nós no caminho de cada trilha e o hub "Trilhas de treino" em Praticar.
   A lógica de escolha das questões e das recompensas fica em engine/training.js. */
import { DUMBBELL } from '../components/icons.js';
import { S, today, lessonUnlocked } from '../../engine/state.js';
import { mprog } from '../../engine/gamification.js';
import { COURSES, EX } from '../../content/index.js';
import { areaById, areaForCourse } from '../../content/areas.js';
import { sheet } from '../router.js';
import { startSession } from './quiz.js';
import { trainingSize, TRAIN_MIN, trainingSpot, trainingSpots, trainingReady, trainingItems, trainingRecord, trainingReward,
  trainedLessons, rescheduleReviews, courseTrainingId, areaTrainingId, previousCourseOf } from '../../engine/training.js';

const essential = lessons => lessons.filter(l => !l.optional);
const previousCourse = c => previousCourseOf(c, COURSES, areaForCourse);
const spotOf = (c, u) => trainingSpot(c, u, previousCourse(c));
const readyOf = spot => trainingReady(spot, S.done, lessonUnlocked(spot.unit.lessons[0]));
/* Lições a que uma questão se refere: a sua própria ou, na revisão integrada, as que ela cobre. */
let LESSON = null;
const lessonsOf = key => {
  const e = EX[key]; if (!e) return [];
  if (!e.x.covers) return [e.l];
  LESSON = LESSON || Object.fromEntries(COURSES.flatMap(c => c.lessons).map(l => [l.id, l]));
  return e.x.covers.map(id => LESSON[id]).filter(Boolean);
};
const plural = (n, one, many) => n + ' ' + (n === 1 ? one : many);

export const trainingCount = c => trainingSpots(c, previousCourse(c)).length;
export const trainingDone = c => trainingSpots(c, previousCourse(c)).filter(sp => S.training[sp.id]).length;

/* ---------- nó no caminho ---------- */
export function trainingRow(c, u){
  const spot = spotOf(c, u); if (!spot) return '';
  const rec = S.training[spot.id], ready = readyOf(spot), known = spot.sources.filter(l => S.done[l.id]).length;
  const note = !ready ? 'Conclua a etapa anterior para liberar'
    : rec ? 'Feito ' + plural(rec.count, 'vez', 'vezes') + ' · melhor ' + rec.best + '% · sem tempo · com dicas'
    : 'Revê ' + plural(known, 'lição', 'lições') + ' que você já estudou · sem tempo · com dicas';
  return '<button class="train-row ' + (!ready ? 'locked' : rec ? 'done' : 'ready') + '" data-act="train" data-u="' + u.idx + '">' +
    '<span class="train-marker" aria-hidden="true">' + DUMBBELL + (rec ? '<i>✓</i>' : '') + '</span>' +
    '<span class="lesson-description"><strong>Treino de revisão</strong><span>' + note + '</span></span>' +
    '<span class="lesson-state">' + (!ready ? 'Bloqueado' : rec ? 'Treinar de novo →' : 'Treinar →') + '</span></button>';
}

const RULES = '<ul class="challenge-rules train-rules"><li>❤️ Sem perder corações</li><li>💡 Dicas liberadas</li><li>⏱ Sem tempo</li><li>↻ Reagenda suas revisões</li></ul>';

export function trainingSheet(c, u){
  const spot = spotOf(c, u); if (!spot) return;
  const rec = S.training[spot.id], known = spot.sources.filter(l => S.done[l.id]);
  const head = '<div class="sh-i train-i" aria-hidden="true">' + DUMBBELL + '</div><h3>Treino de revisão</h3>';
  if (!readyOf(spot)) return sheet(head + '<p class="sh-s">Este treino revisa o que veio antes de “' + u.t + '”. Ele abre quando você chega nesta etapa, com pelo menos ' + Math.min(TRAIN_MIN, spot.sources.length) + ' lições estudadas.</p><button class="btn ghost" data-s="x">Entendi</button>', {});
  const where = u.idx === 0 ? 'na trilha anterior' : 'nas etapas anteriores';
  sheet(head + '<p class="sh-s">' + trainingSize(known.length) + ' questões de ' + plural(known.length, 'lição concluída', 'lições concluídas') + ' ' + where + '. Começa pelo que você mais errou e pelo que já está na hora de rever.</p>' + RULES +
    (rec ? '<p class="small">Você já fez este treino ' + plural(rec.count, 'vez', 'vezes') + '. Melhor resultado: ' + rec.best + '%.</p>' : '<p class="small">Opcional: não bloqueia a trilha. Recompensa: XP e bolotas.</p>') +
    '<button class="btn primary" data-s="go">Começar o treino</button><button class="btn ghost" data-s="x">Agora não</button>', {
    go: () => startTraining({ id:spot.id, course:c, unit:u, sources:spot.sources })
  });
}

export function startTraining({ id, course, unit, sources }){
  const items = trainingItems(sources, S, today());
  if (!items.length) return;
  startSession({ kind:'training', course, unit, trainingId:id, items, hearts:99 });
}

/* ---------- hub em Praticar ---------- */
export function trainingHub(activeCourses){
  const area = areaById(S.area);
  const known = list => essential(list).filter(l => S.done[l.id]).length;
  const areaKnown = known(activeCourses.flatMap(c => c.lessons));
  const card = (kind, id, title, sub, enabled, count) =>
    '<button class="pcard train-card" data-act="hubtrain" data-kind="' + kind + '" data-id="' + id + '"' + (enabled ? '' : ' disabled') + '><div class="pe" aria-hidden="true">' + DUMBBELL + '</div><div><div class="pt">' + title + '</div><div class="ps">' + sub + '</div></div>' + (count ? '<div class="cnt train-cnt">' + count + '</div>' : '') + '</button>';
  const rows = activeCourses.map(c => {
    const n = known(c.lessons), total = trainingCount(c), doneN = trainingDone(c);
    const sub = n >= TRAIN_MIN ? plural(n, 'lição estudada', 'lições estudadas') + (total ? ' · ' + doneN + ' de ' + plural(total, 'treino', 'treinos') + ' no caminho' : '') : 'Estude ' + TRAIN_MIN + ' lições desta trilha para liberar';
    return card('course', c.id, c.title, sub, n >= TRAIN_MIN, S.training[courseTrainingId(c)]?.count ? S.training[courseTrainingId(c)].count + '×' : '');
  }).join('');
  return '<h2 class="sec-h" style="margin:22px 0 4px">Trilhas de treino</h2><p class="muted small" style="margin:0 0 12px">Revisão do que você já estudou. Cada treino começa pelo que você mais errou e reagenda suas revisões.</p>' +
    card('area', area.id, 'Treino misto · ' + area.short, areaKnown >= TRAIN_MIN ? 'Sorteia de todas as trilhas desta área que você já estudou' : 'Estude ' + TRAIN_MIN + ' lições desta área para liberar', areaKnown >= TRAIN_MIN, S.training[areaTrainingId(area)]?.count ? S.training[areaTrainingId(area)].count + '×' : '') + rows;
}
export function hubTrain(btn, activeCourses){
  if (btn.dataset.kind === 'area'){
    const area = areaById(btn.dataset.id);
    return startTraining({ id:areaTrainingId(area), sources:essential(activeCourses.flatMap(c => c.lessons)) });
  }
  const c = COURSES.find(x => x.id === btn.dataset.id); if (!c) return;
  startTraining({ id:courseTrainingId(c), course:c, sources:essential(c.lessons) });
}

/* ---------- fim da sessão (chamado por quiz.js) ---------- */
export function finishTraining(s){
  const date = today(), previous = S.training[s.trainingId];
  const reward = trainingReward(previous, s.first, s.total);
  S.training[s.trainingId] = trainingRecord(previous, s.first, s.total, date);
  const trained = trainedLessons(s.items, s.cleanKeys, lessonsOf);
  rescheduleReviews(S, trained, date);
  mprog('practice', 1);
  const weak = trained.filter(t => !t.clean).map(t => t.lesson);
  return {
    xp:reward.xp, coins:reward.coins, mood:reward.perfect ? 'cheer' : 'happy',
    title:reward.perfect ? 'Treino perfeito!' : 'Treino concluído!',
    sub:s.first + ' de ' + s.total + ' de primeira · ' + plural(trained.length, 'lição revisada', 'lições revisadas'),
    extra:[['↻', 'As revisões dessas lições foram reagendadas conforme seus acertos.']],
    caseHtml:weak.length ? '<div class="result-review"><h2>Vale reforçar</h2>' + weak.slice(0, 4).map(l => '<button class="btn ghost" data-act="theory" data-id="' + l.id + '">' + l.title + ' →</button>').join('') + '</div>' : ''
  };
}
