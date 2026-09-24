import { shuffle } from './random.js';

// Identificador estável: inserir outra unidade não altera desafios já salvos.
export const checkpointId = u => 'etapa:' + u.lessons[0].id;
export const unitComplete = (u, done) => u.lessons.every(l => !!done[l.id]);

export function checkpointItems(unit){
  const pools = unit.lessons.map(l => l.ex.filter(x => x.t !== 'expl'));
  const selected = pools.filter(p => p.length).map(p => shuffle(p)[0]);
  const keys = new Set(selected.map(x => x.key));
  const rest = shuffle(pools.flat().filter(x => !keys.has(x.key)));
  return shuffle(selected.concat(rest).slice(0, 6)).map(x => ({key:x.key, x}));
}

export function checkpointRecord(previous, first, total, date){
  const accuracy = total ? Math.round(first / total * 100) : 0;
  const passed = total > 0 && first / total >= 0.8;
  return { best:Math.max(previous?.best || 0, accuracy), passed:!!previous?.passed || passed,
    attempts:(previous?.attempts || 0) + 1, last:date, accuracy };
}

const INTERVALS = [1, 3, 7, 14, 30];
export function reviewRecord(previous, clean, date){
  // Praticar antes da data prevista não acelera os intervalos de revisão.
  if (clean && previous && (previous.last === date || date < previous.due)) return previous;
  const stage = clean && previous ? Math.min((previous.stage || 0) + 1, INTERVALS.length - 1) : 0;
  const next = new Date(date + 'T12:00:00'); next.setDate(next.getDate() + INTERVALS[stage]);
  const due = next.getFullYear() + '-' + String(next.getMonth()+1).padStart(2,'0') + '-' + String(next.getDate()).padStart(2,'0');
  return {stage, last:date, due};
}

export function dueLessons(courses, state, date){
  return courses.flatMap(c => c.lessons).filter(l => state.done[l.id] &&
    (!state.repetition[l.id] || state.repetition[l.id].due <= date))
    .sort((a,b) => (state.repetition[a.id]?.due || '').localeCompare(state.repetition[b.id]?.due || ''));
}

export function spacedItems(lessons){
  return shuffle(lessons.flatMap(l => shuffle(l.ex.filter(x => x.t !== 'expl')).slice(0,2)))
    .map(x => ({key:x.key,x}));
}
