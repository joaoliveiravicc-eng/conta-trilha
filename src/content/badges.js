/* Definições das 18 conquistas. 't' é o predicado testado contra o estado do jogador (ver engine/gamification.js: checkBadges). */
import { OUTFITS } from './shop-items.js';
import { ALL_COURSE_IDS, TOTAL_LESSONS } from './catalog.js';
import { doneCount } from '../engine/state.js';

export const BADGES = [
  {id:'first', i:'🎓', n:'Primeira lição', d:'Conclua uma lição', t:s => doneCount() >= 1},
  {id:'perfect', i:'💯', n:'Sem erros', d:'Lição sem nenhum erro', t:s => Object.keys(s.perfect).length >= 1},
  {id:'streak3', i:'🔥', n:'Aquecendo', d:'3 dias seguidos', t:s => s.streak >= 3},
  {id:'streak7', i:'📅', n:'Semana cheia', d:'7 dias seguidos', t:s => s.streak >= 7},
  {id:'streak30', i:'🌋', n:'Imparável', d:'30 dias seguidos', t:s => s.streak >= 30},
  {id:'l10', i:'📚', n:'Dez lições', d:'10 lições diferentes', t:s => doneCount() >= 10},
  {id:'l25', i:'🏛️', n:'Meio caminho', d:'25 lições diferentes', t:s => doneCount() >= 25},
  {id:'lall', i:'🎖️', n:'Curso completo', d:'Todas as lições', t:s => doneCount() >= TOTAL_LESSONS},
  {id:'review', i:'🔁', n:'Aprende com erros', d:'Faça uma revisão de erros', t:s => s.reviews >= 1},
  {id:'writer', i:'✍️', n:'Escritor(a)', d:'20 respostas escritas certas', t:s => s.st.writes >= 20},
  {id:'entries', i:'⚖️', n:'Partidas dobradas', d:'50 lançamentos certos', t:s => s.st.entries >= 50},
  {id:'blitz10', i:'⚡', n:'Relâmpago', d:'10 pontos no Relâmpago', t:s => s.best.blitz >= 10},
  {id:'case', i:'🥖', n:'Primeiro cliente', d:'Resolva um caso prático', t:s => Object.keys(s.cases).length >= 1},
  {id:'xp500', i:'⭐', n:'500 XP', d:'Acumule 500 XP', t:s => s.xp >= 500},
  {id:'xp2000', i:'🌟', n:'2.000 XP', d:'Acumule 2.000 XP', t:s => s.xp >= 2000},
  {id:'trophy', i:'🏆', n:'Primeiro troféu', d:'Passe em um teste final', t:s => Object.keys(s.trophies).length >= 1},
  {id:'style', i:'🎩', n:'Castor estiloso', d:'Compre uma roupa para o Bento', t:s => OUTFITS.some(o => s.owned[o.id])},
  {id:'dare1', i:'⚡', n:'Encarou o desafio', d:'Vença um desafio relâmpago da trilha', t:s => Object.values(s.challenges || {}).some(c => c.passed)},
  {id:'crown1', i:'💎', n:'Lendário', d:'Ganhe a coroa em um desafio (zero erros)', t:s => Object.values(s.challenges || {}).some(c => c.perfect)},
  {id:'dare10', i:'🔥', n:'Desafiante', d:'Vença 10 desafios relâmpago', t:s => Object.values(s.challenges || {}).filter(c => c.passed).length >= 10},
  {id:'gym1', i:'🏋️', n:'Primeiro treino', d:'Faça um treino de revisão', t:s => Object.keys(s.training || {}).length >= 1},
  {id:'gym10', i:'💪', n:'Rato de academia', d:'Faça 10 treinos de revisão', t:s => Object.values(s.training || {}).reduce((n, r) => n + (r.count || 0), 0) >= 10},
  {id:'all', i:'👑', n:'Formado(a)', d:'Todos os troféus', t:s => ALL_COURSE_IDS.every(id => s.trophies[id])}
];
