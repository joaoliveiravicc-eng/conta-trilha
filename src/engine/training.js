/* Treino de revisão (o halter no caminho): retoma o que já foi estudado, sem tempo e com dicas.
   Funções puras: recebem o estado e as lições, para poderem ser testadas sem a interface.

   Diferente do desafio ⚡ (difícil, com tempo, sobre a etapa atual) e do selo ⚑ (etapa atual),
   o treino olha para trás: etapas anteriores da trilha e, na primeira etapa, a trilha anterior.
   Ele começa pelo que a pessoa mais errou e pelo que está com a revisão vencida. */
import { shuffle } from './random.js';
import { reviewRecord } from './learning.js';

export const TRAIN_SIZE = 10;
/* Poucas lições estudadas: treino menor, para não virar uma repetição das próprias lições. */
export const trainingSize = known => Math.min(TRAIN_SIZE, Math.max(5, known * 3));
/* Lições já concluídas, entre as revisáveis, para o treino abrir. */
export const TRAIN_MIN = 2;

export const trainingId = unit => 'treino:' + unit.lessons[0].id;
export const courseTrainingId = course => 'treino:trilha:' + course.id;
export const areaTrainingId = area => 'treino:area:' + area.id;

const essential = lessons => lessons.filter(l => !l.optional);

/* Trilha que vem antes na mesma área (areaOf devolve a área de uma trilha). */
export function previousCourseOf(course, courses, areaOf){
  const area = areaOf(course.id), i = area ? area.courseIds.indexOf(course.id) : -1;
  return i > 0 ? courses.find(x => x.id === area.courseIds[i - 1]) || null : null;
}

/* Lições que o treino de uma etapa revisa. Oficinas não têm treino. Trilhas abertas
   (open, como as de carreira) não dependem de outra trilha, então não revisam a anterior. */
export function trainingSources(course, unit, previousCourse){
  if (unit.lessons.some(l => l.optional)) return [];
  const before = essential(course.units.filter(u => u.idx < unit.idx).flatMap(u => u.lessons));
  if (before.length) return before;
  return !course.open && previousCourse ? essential(previousCourse.lessons) : [];
}
export function trainingSpot(course, unit, previousCourse){
  const sources = trainingSources(course, unit, previousCourse);
  return sources.length ? { id:trainingId(unit), course, unit, sources } : null;
}
export const trainingSpots = (course, previousCourse) => course.units.map(u => trainingSpot(course, u, previousCourse)).filter(Boolean);

/* `unlocked`: a primeira lição da etapa já está liberada, ou seja, a pessoa chegou até aqui. */
export function trainingReady(spot, done, unlocked){
  const known = spot.sources.filter(l => done[l.id]).length;
  return !!unlocked && known >= Math.min(TRAIN_MIN, spot.sources.length);
}

/* Parte do treino que vem da revisão integrada (perguntas novas, que misturam lições). */
export const BANK_SHARE = 0.4;

/* Perguntas da revisão integrada que este treino pode usar: todas as lições que elas cobrem já
   foram concluídas e fazem parte do que está sendo revisado. */
export function trainingBank(lessons, state){
  const known = new Set(lessons.filter(l => state.done[l.id]).map(l => l.id));
  return [...new Set(lessons.map(l => l.course))].flatMap(c => (c && c.review ? c.review.ex : [])).filter(x => x.covers.every(id => known.has(id)));
}

/* Escolhe as questões: até 40% da revisão integrada, e o resto do jeito clássico: uma de cada lição
   (as mais fracas primeiro), depois a segunda de cada uma, e assim por diante. Dentro da lição, as
   questões erradas vêm antes. */
export function trainingItems(lessons, state, date, size, rnd = Math.random){
  const mistakes = key => state.mistakes[key] || 0;
  size = size || trainingSize(lessons.filter(l => state.done[l.id]).length);
  const bank = trainingBank(lessons, state).map(x => ({ x, s:mistakes(x.key) * 4 + rnd() })).sort((a, b) => b.s - a.s)
    .slice(0, Math.min(Math.ceil(size * BANK_SHARE), size)).map(o => o.x);
  const weight = l => {
    const r = state.repetition[l.id];
    return l.ex.reduce((sum, x) => sum + mistakes(x.key), 0) * 3 + (!r ? 1 : r.due <= date ? 2 : 0) + rnd();
  };
  const queues = lessons.filter(l => state.done[l.id]).map(l => ({
    w:weight(l),
    ex:l.ex.filter(x => x.t !== 'expl').map(x => ({ x, s:mistakes(x.key) * 4 + rnd() })).sort((a, b) => b.s - a.s)
  })).filter(q => q.ex.length).sort((a, b) => b.w - a.w);
  const picked = bank.slice();
  for (let round = 0; picked.length < size && queues.some(q => q.ex.length > round); round++){
    for (const q of queues){ if (picked.length >= size) break; if (q.ex[round]) picked.push(q.ex[round].x); }
  }
  return shuffle(picked).map(x => ({ key:x.key, x }));
}

export function trainingRecord(previous, first, total, date){
  const accuracy = total ? Math.round(first / total * 100) : 0;
  return { count:(previous?.count || 0) + 1, best:Math.max(previous?.best || 0, accuracy), last:date, accuracy };
}
export function trainingReward(previous, first, total){
  const perfect = total > 0 && first === total, firstTime = !previous;
  return { perfect, firstTime, xp:(firstTime ? 12 : 5) + first + (perfect ? 3 : 0), coins:(firstTime ? 8 : 3) + (perfect ? 2 : 0) };
}

/* Para cada lição treinada: acertou tudo de primeira? Serve para reagendar a revisão espaçada.
   lessonsOf(key) devolve as lições a que a questão se refere (várias, nas questões integradas). */
export function trainedLessons(items, cleanKeys, lessonsOf){
  const map = new Map();
  items.forEach(it => {
    lessonsOf(it.key).forEach(l => {
      const prev = map.get(l);
      map.set(l, (prev === undefined ? true : prev) && cleanKeys.includes(it.key));
    });
  });
  return [...map].map(([lesson, clean]) => ({ lesson, clean }));
}
export function rescheduleReviews(state, trained, date){
  trained.forEach(({ lesson, clean }) => {
    if (state.done[lesson.id]) state.repetition[lesson.id] = reviewRecord(state.repetition[lesson.id], clean, date);
  });
}
