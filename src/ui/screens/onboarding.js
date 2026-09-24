import { $, bindActs } from '../dom.js';
import { S } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { sfx } from '../components/sound.js';
import { bento } from '../components/bento.js';
import { COURSES } from '../../content/index.js';
import { AREAS, areaById, coursesForArea, DEFAULT_AREA } from '../../content/areas.js';
import { go, renderTop } from '../router.js';
import { renderHome } from './home.js';
import { openLesson } from './learn.js';

export let ONB = { step:0, goal:30, area:null };
export function resetOnb(goal, area){ ONB = { step:0, goal:goal || 30, area:area || null }; }
export function renderOnb(){
  const s = $('#s-onb'); let h = '', btns = '';
  if (ONB.step === 0){
    h = '<div class="bento-wrap xl center-b">' + bento('idle', {}) + '</div><h1>Oi, eu sou o Bento!</h1><p class="lead">Vou te ensinar Contabilidade do absoluto zero, um passo de cada vez — como construir uma represa: tronco por tronco.</p><p class="lead">Teoria explicada com calma, exercícios variados, dicas quando você travar e revisão automática dos seus erros.</p>';
    btns = '<button class="btn primary" data-act="n">Vamos começar</button>';
  } else if (ONB.step === 1){
    h = '<h1>O que você quer estudar?</h1><p class="lead">Escolha uma área para começar. Depois você poderá trocar quando quiser.</p><div class="onb-area-list">' +
      AREAS.map(area => '<button class="area-card' + (ONB.area === area.id ? ' selected' : '') + '" data-act="area" data-id="' + area.id + '" style="--area:' + area.color + '"><span class="area-icon" aria-hidden="true">' + area.icon + '</span><span class="area-copy"><strong>' + area.title + '</strong><span>' + area.description + '</span></span><span class="area-arrow" aria-hidden="true">' + (ONB.area === area.id ? '✓' : '→') + '</span></button>').join('') + '</div>';
    btns = '<div class="row"><button class="btn ghost" data-act="b">Voltar</button><button class="btn primary" data-act="n" ' + (ONB.area ? '' : 'disabled') + '>Continuar</button></div>';
  } else if (ONB.step === 2){
    h = '<div class="bento-wrap sm">' + bento('think') + '</div><h1>Qual sua meta diária?</h1><p class="lead">Uma lição vale cerca de 15 a 25 XP. Dá para mudar isso depois.</p>' +
      [[15, '🌿', 'Leve', '≈ 1 lição por dia'], [30, '📘', 'Regular', '≈ 2 lições por dia'], [50, '🚀', 'Intensa', '≈ 3 lições por dia'], [80, '🏆', 'Imersão', '4 lições ou mais']]
        .map(o => '<button class="goalopt' + (ONB.goal === o[0] ? ' on' : '') + '" data-act="g" data-g="' + o[0] + '"><span class="ge">' + o[1] + '</span><div><div class="gt">' + o[2] + '</div><div class="gs">' + o[3] + '</div></div><span class="gx">' + o[0] + ' XP</span></button>').join('');
    btns = '<div class="row"><button class="btn ghost" data-act="b">Voltar</button><button class="btn primary" data-act="n">Continuar</button></div>';
  } else {
    const area = areaById(ONB.area || DEFAULT_AREA);
    h = '<h1>Seu caminho em ' + area.short + '</h1><p class="lead">Comece pela primeira trilha. Cada uma prepara a seguinte. Você poderá trocar de área sem perder este progresso.</p><ul class="plan">' +
      coursesForArea(COURSES, area.id).map(c => '<li><span style="--c:' + c.color + '33">' + c.icon + '</span><div><b>' + c.title + '</b><div class="small muted">' + c.lessons.length + ' lições</div></div></li>').join('') + '</ul>';
    btns = '<button class="btn primary" data-act="start">Fazer a primeira lição</button><button class="btn ghost" data-act="home">Ver as trilhas primeiro</button>';
  }
  s.innerHTML = '<div class="onb">' + h + '</div><div class="foot">' + btns + '</div>';
  bindActs(s, {
    n: () => { if (ONB.step === 1 && !ONB.area) return; ONB.step++; renderOnb(); window.scrollTo(0, 0); },
    b: () => { ONB.step--; renderOnb(); },
    area: b => { ONB.area = b.dataset.id; sfx.tap(); renderOnb(); },
    g: b => { ONB.goal = +b.dataset.g; sfx.tap(); renderOnb(); },
    start: () => { finishOnb(); openLesson(coursesForArea(COURSES, ONB.area)[0].lessons[0]); },
    home: () => { finishOnb(); renderHome(); go('home'); }
  });
}
export function finishOnb(){ S.goal = ONB.goal; S.area = ONB.area || DEFAULT_AREA; S.onboarded = true; save(); renderTop(); }
