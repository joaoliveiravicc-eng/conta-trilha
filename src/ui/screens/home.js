import { $, bindActs } from '../dom.js';
import { cloudAvailable, isLoggedIn } from '../../engine/sync-supabase.js';
import { S, today, nextLesson, doneCount, curStreak, courseComplete, courseUnlocked, lessonsDone } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { challengeSpots } from '../../engine/learning.js';
import { pick } from '../../engine/random.js';
import { COURSES } from '../../content/index.js';
import { TIPS } from '../../content/tips.js';
import { PANELS } from '../../content/layout.js';
import { areaById, areaForCourse, coursesForArea } from '../../content/areas.js';
import { SAY } from '../../content/dialogues.js';
import { bento } from '../components/bento.js';
import { go, sheet, ring, missionCard, claimMission, claimChest, renderTop } from '../router.js';

export function renderHome(){
  const s = $('#s-home'), nl = nextLesson(), tx = S.days[today()] || 0, hit = tx >= S.goal;
  const area = areaById(S.area), areaCourses = coursesForArea(COURSES, S.area);
  let cont;
  if (nl){
    cont = '<button class="continue" data-act="cont" style="--cc:var(--green)"><div class="k">' + (doneCount() ? 'Continuar de onde parou' : 'Comece por aqui') + '</div>' +
      '<div class="t">' + nl.icon + ' ' + nl.title + '</div><div class="s">' + nl.course.title + ' · lição ' + (nl.idx + 1) + ' de ' + nl.course.lessons.length + '</div><div class="play">▶</div></button>';
  } else {
    const pend = areaCourses.filter(c => courseComplete(c) && !S.trophies[c.id]);
    cont = '<button class="continue alldone" data-act="' + (pend.length ? 'final' : 'prac') + '"><div class="k">Lições essenciais concluídas</div><div class="t">' + (pend.length ? '🏆 Conquiste os troféus' : '🏋️ Mantenha a prática') + '</div><div class="s">' + (pend.length ? pend.length + ' teste(s) final(is) disponível(is)' : 'Retome revisões, oficinas e desafios') + '</div><div class="play">▶</div></button>';
  }
  const cs = curStreak();
  const bubble = pick(cs >= 3 ? ['Sua sequência de ' + cs + ' dias está incrível! 🔥', SAY.learn[0]] : [pick(TIPS)]);
  s.innerHTML = '<div class="home-top"><div class="bento-row"><div class="bento-wrap sm">' + bento('idle', undefined, 'home-avatar') + '</div><div class="speech">' + bubble + '</div></div>' +
    '<div class="goal-row">' + ring(Math.min(1, tx / S.goal), hit) + '<div><div class="goal-t">' + (hit ? 'Meta de hoje concluída!' : 'Meta de hoje') + '</div><div class="goal-s">' + tx + ' de ' + S.goal + ' XP</div></div></div>' +
    cont + newTrackBanner() + saveBanner() + '</div><div class="home-missions">' + missionCard() + '</div><div class="home-tracks"><div class="tracks-intro"><div><div class="eyebrow">SEU PERCURSO</div><h1>' + area.title + '</h1><p class="muted">' + area.description + '</p></div><button class="area-change" data-act="areas" aria-label="Trocar área de estudo">' + area.icon + ' Trocar área</button></div><div class="panels-grid">' + panelList(areaCourses) + '</div></div>';
  bindActs(s, {
    cont: async () => { if (nl) (await import('./learn.js')).openLesson(nl); },
    final: async () => { const c = areaCourses.find(c => courseComplete(c) && !S.trophies[c.id]); if(c) (await import('./path.js')).openPath(c); },
    prac: async () => { (await import('./practice.js')).renderPractice(); go('practice'); },
    areas: async () => (await import('./areas.js')).openAreas(),
    claim: b => claimMission(b.dataset.id),
    chest: claimChest,
    save: async () => (await import('./account.js')).openAccount('signup'),
    newtrack: async () => { const c = COURSES.find(item => item.id === NEW_TRACK); S.area = areaForCourse(NEW_TRACK).id; save(); renderTop(); (await import('./path.js')).openPath(c); },
    hidenew: () => { S.seen[NEW_TRACK] = true; save(); renderHome(); },
    course: async b => { const c = COURSES[+b.dataset.i]; if (courseUnlocked(c)) (await import('./path.js')).openPath(c); else lockedCourse(c); }
  });
}
/* Aviso da trilha nova para quem estuda em outra área e ainda não começou. */
const NEW_TRACK = 'financeirojr';
function newTrackBanner(){
  const c = COURSES.find(item => item.id === NEW_TRACK), area = areaForCourse(NEW_TRACK);
  if (!c || !area || S.area === area.id || S.seen[NEW_TRACK] || lessonsDone(c)) return '';
  return '<div class="new-track"><button class="save-banner" data-act="newtrack"><span aria-hidden="true">' + c.icon + '</span><span><b>Novo em ' + area.title + ': ' + c.title + '</b><small>' + c.lessons.length + ' lições, do zero à entrevista. Toque para começar.</small></span><span class="sb-go" aria-hidden="true">›</span></button>' +
    '<button class="nt-hide" data-act="hidenew">Agora não</button></div>';
}
function saveBanner(){
  if (!cloudAvailable() || isLoggedIn() || !doneCount()) return '';
  return '<button class="save-banner" data-act="save"><span aria-hidden="true">☁️</span><span><b>Salve seu progresso</b><small>Hoje ele está só neste aparelho. Crie uma conta grátis.</small></span><span class="sb-go" aria-hidden="true">›</span></button>';
}
function panelList(areaCourses){
  let n = 0;
  return PANELS.map(p => {
    const cs = areaCourses.filter(c => c.panel === p.id);
    if (!cs.length) return '';
    n++;
    return '<div class="panel"><div class="panel-head"><div class="panel-num">' + n + '</div><div><div class="panel-t">' + p.title + '</div><div class="panel-d">' + p.desc + '</div></div></div>' +
      '<div class="course-list">' + cs.map(c => courseRow(c, areaCourses.indexOf(c) + 1)).join('') + '</div></div>';
  }).join('');
}
export function courseRow(c, number = c.idx + 1){
  const d = lessonsDone(c), n = c.lessons.length, lk = !courseUnlocked(c);
  const workshops = c.lessons.filter(l => l.optional).length;
  return '<button class="crow' + (lk ? ' locked' : '') + '" data-act="course" data-i="' + c.idx + '" style="--cc:' + c.color + '">' +
    '<div class="badge">' + (lk ? '🔒' : c.icon) + '<span class="num">' + number + '</span></div>' +
    '<div class="ci"><div class="ct">' + c.title + (S.trophies[c.id] ? ' 🏆' : '') + '</div><div class="cs">' + c.desc + '</div>' +
    '<span class="course-preview-meta">'+c.units.length+' etapas · '+c.units.flatMap(u => challengeSpots(u)).length+' desafios ⚡'+(workshops ? ' · '+workshops+' '+(workshops === 1 ? 'oficina prática' : 'oficinas práticas') : '')+'</span>' +
    '<div class="progress-track"><div class="progress-fill" style="width:' + (d / n * 100) + '%"></div></div>' +
    '<div class="cm"><span>' + d + ' de ' + n + ' lições</span><span>' + (lk ? 'Bloqueada' : (d === n ? 'Concluída' : '')) + '</span></div></div><div class="chev">›</div></button>';
}
export function lockedCourse(c){
  const area = areaForCourse(c.id), previous = COURSES.find(item => item.id === area?.courseIds[area.courseIds.indexOf(c.id) - 1]);
  sheet('<div class="sh-i">🔒</div><h3>' + c.title + '</h3><p class="sh-s">Esta trilha é liberada quando você conclui “' + (previous?.title || 'a etapa anterior') + '”. Já conhece o assunto? Faça um teste rápido: 10 questões da trilha anterior, com 3 corações.</p>' +
    (previous ? '<button class="btn primary" data-s="test">Fazer o teste e liberar</button>' : '') +
    '<button class="btn ghost" data-s="un">Liberar sem teste</button><button class="btn ghost" data-s="x">Voltar</button>',
    {
      test: async () => { const [{ startSession }, { sampleItems }] = await Promise.all([import('./quiz.js'), import('../../engine/learning.js')]);
        startSession({ kind:'unlock', course:c, items:sampleItems(previous.lessons.filter(l => !l.optional), 10), hearts:3 }); },
      un: async () => { S.unlocked[c.id] = true; save(); (await import('./path.js')).openPath(c); }
    });
}
