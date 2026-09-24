import { $, bindActs } from '../dom.js';
import { AREAS, coursesForArea } from '../../content/areas.js';
import { COURSES } from '../../content/index.js';
import { S } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { CUR, go, renderTop } from '../router.js';
import { renderHome } from './home.js';
import { toast } from '../components/toast.js';

let origin = 'home';
export function renderAreas(){
  const root = $('#s-areas');
  root.innerHTML = `<div class="area-page">
    <div class="area-page-head">${S.area ? '<button class="icon-btn" data-act="back" aria-label="Voltar">←</button>' : ''}<div><span class="eyebrow">ESCOLHA SEU CAMINHO</span><h1>O que você quer estudar?</h1><p>Troque de área quando quiser. Seu progresso em cada lição fica guardado.</p></div></div>
    <div class="area-grid">${AREAS.map(area => {
      const courses = coursesForArea(COURSES, area.id);
      const total = courses.reduce((n,c) => n + c.lessons.length, 0);
      const done = courses.reduce((n,c) => n + c.lessons.filter(l => S.done[l.id]).length, 0);
      return `<button class="area-card ${S.area === area.id ? 'selected' : ''}" data-act="area" data-id="${area.id}" style="--area:${area.color}">
        <span class="area-icon" aria-hidden="true">${area.icon}</span><span class="area-copy"><strong>${area.title}</strong><span>${area.description}</span><small>${courses.length} ${courses.length === 1 ? 'trilha' : 'trilhas'} · ${done} de ${total} lições concluídas</small></span><span class="area-arrow" aria-hidden="true">${S.area === area.id ? '✓' : '→'}</span>
      </button>`;
    }).join('')}</div>
    <p class="area-note">Os pontos de experiência e a sequência diária contam para todas as áreas.</p>
  </div>`;
  bindActs(root, {
    back: async () => {
      if (origin === 'profile') { (await import('./profile.js')).renderProfile(); go('profile'); }
      else if (origin === 'practice') { (await import('./practice.js')).renderPractice(); go('practice'); }
      else if (origin === 'shop') { (await import('./shop.js')).renderShop(); go('shop'); }
      else if (origin === 'glossary') { (await import('./glossary.js')).renderGlossary($('#g-search').value); go('glossary'); }
      else { renderHome(); go('home'); }
    },
    area: button => {
      const area = AREAS.find(item => item.id === button.dataset.id);
      if (!area) return;
      S.area = area.id; save(); renderTop(); renderHome(); go('home');
      toast('Agora você está estudando ' + area.title + '.');
    },
  });
}

export function openAreas(){ origin = CUR; renderAreas(); go('areas'); }
