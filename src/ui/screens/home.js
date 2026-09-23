import { $, bindActs } from '../dom.js';
import { S, today, nextLesson, doneCount, curStreak, courseComplete, courseUnlocked, lessonsDone } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { pick } from '../../engine/random.js';
import { COURSES, TIPS } from '../../content/index.js';
import { SAY } from '../../content/dialogues.js';
import { bento } from '../components/bento.js';
import { go, sheet, ring, missionCard, claimMission, claimChest } from '../router.js';
import { openLesson } from './learn.js';
import { openPath } from './path.js';
import { renderPractice } from './practice.js';

export function renderHome(){
  const s = $('#s-home'), nl = nextLesson(), tx = S.days[today()] || 0, hit = tx >= S.goal;
  let cont;
  if (nl){
    cont = '<button class="continue" data-act="cont" style="--cc:' + nl.course.color + '"><div class="k">' + (doneCount() ? 'Continuar de onde parou' : 'Comece por aqui') + '</div>' +
      '<div class="t">' + nl.icon + ' ' + nl.title + '</div><div class="s">' + nl.course.title + ' · lição ' + (nl.idx + 1) + ' de ' + nl.course.lessons.length + '</div><div class="play">▶</div></button>';
  } else {
    const pend = COURSES.filter(c => courseComplete(c) && !S.trophies[c.id]);
    cont = '<button class="continue alldone" data-act="' + (pend.length ? 'final' : 'prac') + '"><div class="k">Todas as lições concluídas</div><div class="t">' + (pend.length ? '🏆 Conquiste os troféus' : '🏋️ Mantenha a prática') + '</div><div class="s">' + (pend.length ? pend.length + ' teste(s) final(is) disponível(is)' : 'Revise erros, treine e jogue o Relâmpago') + '</div><div class="play">▶</div></button>';
  }
  const cs = curStreak();
  const bubble = pick(cs >= 3 ? ['Sua sequência de ' + cs + ' dias está incrível! 🔥', SAY.learn[0]] : [pick(TIPS)]);
  s.innerHTML = '<div class="bento-row"><div class="bento-wrap sm">' + bento('idle') + '</div><div class="speech">' + bubble + '</div></div>' +
    '<div class="goal-row">' + ring(Math.min(1, tx / S.goal), hit) + '<div><div class="goal-t">' + (hit ? 'Meta de hoje concluída!' : 'Meta de hoje') + '</div><div class="goal-s">' + tx + ' de ' + S.goal + ' XP</div></div></div>' +
    cont + missionCard() + '<h2 class="sec-h">Trilhas do curso</h2><div class="course-list">' + COURSES.map(courseRow).join('') + '</div>';
  bindActs(s, {
    cont: () => openLesson(nl),
    final: () => { const c = COURSES.find(c => courseComplete(c) && !S.trophies[c.id]); openPath(c); },
    prac: () => { renderPractice(); go('practice'); },
    claim: b => claimMission(b.dataset.id),
    chest: claimChest,
    course: b => { const c = COURSES[+b.dataset.i]; if (courseUnlocked(c)) openPath(c); else lockedCourse(c); }
  });
}
export function courseRow(c){
  const d = lessonsDone(c), n = c.lessons.length, lk = !courseUnlocked(c);
  return '<button class="crow' + (lk ? ' locked' : '') + '" data-act="course" data-i="' + c.idx + '" style="--cc:' + c.color + '">' +
    '<div class="badge">' + (lk ? '🔒' : c.icon) + '<span class="num">' + (c.idx + 1) + '</span></div>' +
    '<div class="ci"><div class="ct">' + c.title + (S.trophies[c.id] ? ' 🏆' : '') + '</div><div class="cs">' + c.desc + '</div>' +
    '<div class="progress-track"><div class="progress-fill" style="width:' + (d / n * 100) + '%"></div></div>' +
    '<div class="cm"><span>' + d + ' de ' + n + ' lições</span><span>' + (lk ? 'Bloqueada' : (d === n ? 'Concluída' : '')) + '</span></div></div><div class="chev">›</div></button>';
}
export function lockedCourse(c){
  sheet('<div class="sh-i">🔒</div><h3>' + c.title + '</h3><p class="sh-s">Esta trilha é liberada quando você conclui a trilha anterior, “' + COURSES[c.idx - 1].title + '”. Se já conhece o assunto, pode liberar agora.</p>' +
    '<button class="btn primary" data-s="un">Liberar mesmo assim</button><button class="btn ghost" data-s="x">Voltar</button>',
    { un: () => { S.unlocked[c.id] = true; save(); openPath(c); } });
}
