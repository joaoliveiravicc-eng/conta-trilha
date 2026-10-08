/* Demonstração local do ContaTrilha Live (entrega 1): 1 professora e 5 alunos FICTÍCIOS num PostgreSQL local.
   Questões reais de Contabilidade Introdutória (trilhas "Primeiros Passos" e "Débito e Crédito").
   Não é uma interface: mostra o contrato do servidor (salas, correção protegida, privacidade, reconexão). */
import { as, rpc, admin, newUser, newTeacher, rejects, pilotItems, rightPayload, wrongPayload, nonce, close, CFG } from '../tests/live-db/helpers.js';

const line = (t = '') => console.log(t);
const h = t => { line(); line('━━ ' + t); };
const plain = s => s.replace(/<[^>]+>/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const short = (s, n = 88) => (plain(s).length > n ? plain(s).slice(0, n - 1) + '…' : plain(s));
const sleep = ms => new Promise(r => setTimeout(r, ms));

line('ContaTrilha Live — demonstração local (banco: ' + CFG.host + ':' + CFG.port + '/' + CFG.database + ')');
line('Todos os nomes abaixo são fictícios. Conteúdo NÃO homologado por professor (D8).');

h('1. Professora cria a atividade (formativa) a partir de 6 questões do catálogo');
const helena = await newTeacher('helena');
const built = pilotItems({ mc: 2, tf: 2, num: 2 });
const activity = await rpc(helena, 'live_create_activity', 'Patrimônio e partidas dobradas — aquecimento', 'formative',
  { mode: 'teacher_paced', feedback: 'after_reveal', materials: ['calculadora', 'rascunho'] }, built.map(b => b.item));
built.forEach((b, i) => line(`  Q${i + 1} [${b.item.type}] ${short(b.item.public.q)}   (origem ${b.item.source_key})`));

h('2. Abre a sala');
const room = await rpc(helena, 'live_create_room', activity, 120, 30);
line(`  código da sala: ${room.code}   (expira em 2 h, até 30 participantes)`);

h('3. Cinco alunos entram pelo código (um digita em minúsculas, com hífen)');
const nomes = ['Ana', 'Bruno', 'Carla', 'Diego', 'Elisa'];
const alunos = {};
for (const [i, n] of nomes.entries()) {
  alunos[n] = await newUser(n.toLowerCase());
  const code = i === 2 ? room.code.slice(0, 3).toLowerCase() + '-' + room.code.slice(3).toLowerCase() : room.code;
  const j = await rpc(alunos[n], 'live_join_room', code, n);
  line(`  ${n.padEnd(6)} → ${j.ok ? 'entrou' : 'recusada: ' + j.error}  | materiais: ${j.materials.join(', ')}`);
}
const intruso = await newUser('intruso');
const bad = await rpc(intruso, 'live_join_room', 'ZZZZZZ', 'Intruso');
line(`  Intruso com código errado → ${JSON.stringify(bad)}`);

h('4. Lobby: o que a professora vê e o que um aluno vê');
const lobbyP = await rpc(helena, 'live_room_snapshot', room.room_id);
line(`  professora: ${lobbyP.members.map(m => m.display_name).join(', ')} (${lobbyP.members_count})`);
const lobbyA = await rpc(alunos.Ana, 'live_room_snapshot', room.room_id);
line(`  Ana: só vê a contagem (${lobbyA.members_count}) e o status "${lobbyA.room.status}"; enunciados ainda ocultos: ${lobbyA.items.every(i => i.public === null)}`);

await rpc(helena, 'live_start_room', room.room_id);

/* Roteiro de comportamento: 'R' certo, 'E' errado, '-' não responde, 'D' certo, mas a confirmação se perde e o aparelho reenvia. */
const roteiro = { Ana: 'RRRRRR', Bruno: 'EREREE', Carla: 'RRRRER', Diego: 'RRDREE', Elisa: 'RE-RRR' };
const marca = {};
nomes.forEach(n => { marca[n] = []; });

for (let q = 1; q <= built.length; q++) {
  const item = built[q - 1].item;
  h(`5.${q} Questão ${q} (${item.type}): professora abre por 60 s`);
  await rpc(helena, 'live_open_item', room.room_id, q, 60);
  await Promise.all(nomes.map(async n => {
    const c = roteiro[n][q - 1];
    if (c === '-') { marca[n].push('—'); return; }
    const payload = c === 'E' ? wrongPayload(item) : rightPayload(item);
    const nn = nonce();
    const r1 = await rpc(alunos[n], 'live_submit_answer', room.room_id, q, payload, nn);
    if (c === 'D') {
      const r2 = await rpc(alunos[n], 'live_submit_answer', room.room_id, q, payload, nn);       // reenvio após queda de rede
      line(`  ${n}: enviou, perdeu a confirmação, reenviou → ${r1.status} / ${r2.status} (uma só resposta gravada)`);
    }
    marca[n].push(c === 'E' ? '✗' : '✓');
  }));
  const vis = await rpc(helena, 'live_room_snapshot', room.room_id);
  line(`  respostas recebidas: ${vis.items[q - 1].answered_count}/5`);
  if (q === 2) {                                              // privacidade, com a questão aberta
    h('   Teste de privacidade durante a questão 2 (Bruno tenta espiar)');
    const tabs = ['live_answers', 'live_activity_item_keys', 'live_activity_items', 'live_rooms'];
    for (const t of tabs) line(`  Bruno lê ${t.padEnd(24)} → ${(await as(alunos.Bruno, 'select count(*)::int n from public.' + t))[0].n} linhas`);
    const snB = await rpc(alunos.Bruno, 'live_room_snapshot', room.room_id);
    const vazam = snB.items.filter(i => i.status !== 'revealed' && (i.answer !== undefined || i.explanation !== undefined)).map(i => 'Q' + i.position);
    line(`  snapshot de Bruno: questões ainda não reveladas que expõem gabarito/explicação: ${vazam.length ? vazam.join(',') : 'nenhuma'}; campo "tol" presente: ${JSON.stringify(snB).includes('"tol"')}; resposta de outro aluno visível: ${JSON.stringify(snB).includes('Ana')}`);
    line(`  (a Q1 já foi revelada pela professora, então o gabarito dela aparece, como deve: ${snB.items[0].answer !== undefined})`);
    const e = await rejects(as(alunos.Bruno, "insert into public.live_answers(room_id, position, user_id, payload, is_correct, nonce) values ($1, 2, $2, '{}', true, 'xxxxxxxxxx')", [room.room_id, alunos.Bruno]));
    line(`  Bruno tenta inserir resposta direto na tabela → ${e.message}`);
    const e2 = await rejects(rpc(intruso, 'live_room_snapshot', room.room_id));
    line(`  Intruso (fora da sala) pede o snapshot → ${e2.message}`);
  }
  await rpc(helena, 'live_close_item', room.room_id, q);
  if (q === 3) {
    const e = await rejects(rpc(alunos.Elisa, 'live_submit_answer', room.room_id, 3, rightPayload(item), nonce()));
    line(`  Elisa tenta responder a Q3 depois do fechamento → ${e.message}`);
  }
  await rpc(helena, 'live_reveal_item', room.room_id, q);
}

h('6. Reconexão: Diego "abre em outro aparelho" no meio da aula');
const dSnap = await rpc(alunos.Diego, 'live_room_snapshot', room.room_id);
line(`  Diego recupera ${dSnap.items.filter(i => i.my_answer).length} respostas já gravadas e vê o gabarito das questões reveladas (Q1: opção ${dSnap.items[0].answer}).`);

h('7. Resultado da turma (agregado) e quadro por aluno — só a professora vê');
await rpc(helena, 'live_close_room', room.room_id);
const res = await rpc(helena, 'live_room_results', room.room_id);
line(`  nota oficial: ${res.official_grade}  (atividade formativa, sem nota)`);
res.items.forEach(i => line(`  Q${i.position} ${i.type.padEnd(3)} respostas ${i.answered}/5  corretas ${i.correct}  distribuição ${JSON.stringify(i.distribution)}`));
line();
line('  aluno   ' + built.map((_, i) => 'Q' + (i + 1)).join('  '));
nomes.forEach(n => line('  ' + n.padEnd(7) + ' ' + marca[n].map(m => m.padEnd(2)).join('  ')));
const real = await admin('select u.email, a.position, a.is_correct from public.live_answers a join auth.users u on u.id = a.user_id where a.room_id = $1 order by 1, 2', [room.room_id]);
const acertos = real.filter(r => r.is_correct).length;
line(`  conferência no banco: ${real.length} respostas gravadas, ${acertos} corretas (nenhuma duplicada)`);

h('8. Auditoria da professora');
(await rpc(helena, 'live_is_teacher') && await as(helena, 'select event from public.live_audit_events where room_id = $1 order by id', [room.room_id]))
  .forEach(e => line('  · ' + e.event));
line();
await close();
