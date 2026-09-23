/* Pool de missões diárias (uma delas é sempre 'ganhe X XP'; duas são sorteadas deste pool por dia). */

export const MPOOL = [
  {id:'lessons', n:[1,2,3], txt:n => n > 1 ? 'Conclua ' + n + ' lições' : 'Conclua 1 lição', i:'📘'},
  {id:'combo', n:[5,8,10], txt:n => 'Acerte ' + n + ' seguidas', i:'🔥', max:true},
  {id:'entries', n:[3,5,8], txt:n => 'Acerte ' + n + ' lançamentos', i:'⚖️'},
  {id:'writes', n:[2,3,5], txt:n => 'Acerte ' + n + ' respostas escritas', i:'✍️'},
  {id:'perfect', n:[1], txt:() => 'Faça 1 lição sem erros', i:'💯'},
  {id:'blitz', n:[5,8,12], txt:n => 'Faça ' + n + ' pontos no Relâmpago', i:'⚡', max:true},
  {id:'practice', n:[1], txt:() => 'Complete 1 treino ou revisão', i:'🏋️'},
  {id:'nohint', n:[1], txt:() => 'Conclua 1 lição sem usar dicas', i:'🧠'}
];
