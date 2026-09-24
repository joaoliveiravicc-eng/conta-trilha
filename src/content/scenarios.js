/* Unidades "Na prática": um negócio fictício vive um mês. Cada lição é um episódio com
   fatos do dia; os exercícios (lançamentos, saldos, resultado e balancete do fechamento)
   são montados a partir dos fatos, e os totais são conferidos ao carregar o módulo. */
import { box, tbl, ol } from './render-helpers.js';
import { mc, tf, en, cl, nu } from '../engine/exercises/factories.js';

const GROUP = {
  'Caixa':'AC', 'Bancos':'AC', 'Clientes':'AC', 'Estoques':'AC', 'Estoque de materiais':'AC', 'Cartões a receber':'AC', 'Seguros a apropriar':'AC',
  'Máquinas e equipamentos':'ANC', 'Móveis e utensílios':'ANC', 'Depreciação acumulada':'RANC',
  'Fornecedores':'PC', 'Salários a pagar':'PC', 'Contas a pagar':'PC', 'Comissões a pagar':'PC', 'Adiantamento de clientes':'PC', '13º salário a pagar':'PC',
  'Empréstimos a pagar':'PNC', 'Financiamentos a pagar':'PNC', 'Capital social':'PL',
  'Receita de vendas':'REC', 'Receita de serviços':'REC', 'Devoluções de vendas':'RREC', 'CMV':'DESP'
};
const groupOf = a => GROUP[a] || (a.startsWith('Despesa') ? 'DESP' : null);
const NAME = { AC:'Ativo', ANC:'Ativo', RANC:'Redutora do ativo', PC:'Passivo', PNC:'Passivo', PL:'Patrimônio líquido', REC:'Receita', RREC:'Redutora da receita', DESP:'Despesa' };
const DEBIT_NATURE = new Set(['AC', 'ANC', 'DESP', 'RREC']);
const RESULT = new Set(['REC', 'RREC', 'DESP']);
const money = v => 'R$ ' + Number(v).toLocaleString('pt-BR');
const sum = side => side.reduce((a, x) => a + x[1], 0);
const names = side => side.map(x => x[0]).join(' e ');

function applyTx(bal, t){
  t.d.forEach(([a, v]) => { bal[a] = (bal[a] || 0) + (DEBIT_NATURE.has(groupOf(a)) ? v : -v); });
  t.c.forEach(([a, v]) => { bal[a] = (bal[a] || 0) + (DEBIT_NATURE.has(groupOf(a)) ? -v : v); });
}
const cash = bal => (bal['Caixa'] || 0) + (bal['Bancos'] || 0);
function result(txs){
  let r = 0;
  txs.forEach(t => { t.c.forEach(([a, v]) => { if (RESULT.has(groupOf(a))) r += v; }); t.d.forEach(([a, v]) => { if (RESULT.has(groupOf(a))) r -= v; }); });
  return r;
}
function check(sc, cond, msg){ if (!cond) throw new Error('Cenário ' + sc.id + ': ' + msg); }

function accountsTable(accts){
  return tbl(['Conta', 'Grupo', 'Aumenta com'], accts.map(a => { const g = groupOf(a); return [a, NAME[g], DEBIT_NATURE.has(g) ? 'Débito' : 'Crédito']; }));
}

function classifyEx(accts, q){
  const pool = accts.filter(a => groupOf(a)).slice(0, 6);
  const cats = [...new Set(pool.map(a => NAME[groupOf(a)]))];
  if (cats.length < 2) return [];
  return [cl(q, cats, pool.map(a => a + ':' + cats.indexOf(NAME[groupOf(a)])).join('|'), 'Olhe a natureza de cada conta: bem ou direito, obrigação, capital dos sócios, receita ou despesa.')];
}

function episodeLesson(sc, ep, n, bal){
  const cashBefore = cash(bal);
  ep.tx.forEach(t => { check(sc, sum(t.d) === sum(t.c), '"' + t.f + '" não fecha'); t.d.concat(t.c).forEach(([a]) => check(sc, groupOf(a), 'conta sem grupo: ' + a)); applyTx(bal, t); });
  Object.entries(bal).forEach(([a, v]) => check(sc, v >= 0, 'saldo negativo em ' + a + ' no episódio ' + n));
  const cashAfter = cash(bal), res = result(ep.tx);
  const accts = [...new Set(ep.tx.flatMap(t => t.d.concat(t.c).map(x => x[0])))];
  const others = sc.pool.filter(a => !accts.includes(a));
  const ex = [];
  ep.tx.forEach((t, i) => {
    if (sc.entries === false){ return; }
    const own = t.d.concat(t.c).map(x => x[0]);
    const extra = others.concat(accts).filter(a => !own.includes(a)).filter((a, k, arr) => arr.indexOf(a) === k);
    const pickTwo = [extra[(i * 3 + n) % extra.length], extra[(i * 3 + n + 1) % extra.length]].filter((a, k, arr) => a && arr.indexOf(a) === k);
    ex.push(en(t.f, t.d.map(x => x[0]).join('+'), t.c.map(x => x[0]).join('+'), pickTwo, 'Débito: ' + names(t.d) + '. Crédito: ' + names(t.c) + '. ' + t.e));
  });
  if (sc.entries === false){
    const cats = ['Receita', 'Despesa', 'Nenhum dos dois'];
    const kind = t => t.c.some(([a]) => groupOf(a) === 'REC') ? 0 : t.d.some(([a]) => groupOf(a) === 'DESP') ? 1 : 2;
    ex.push(cl('Esse fato é receita, despesa ou nenhum dos dois?', cats, ep.tx.map(t => t.short + ':' + kind(t)).join('|'), 'Receita e despesa mudam o resultado. Trocar bens, pagar ou receber dívidas, ou receber adiantado, não.'));
    ep.tx.forEach(t => { if (t.why) ex.push(t.why); });
  }
  if (cashAfter !== cashBefore) ex.push(nu('Caixa + Bancos começaram este episódio com ' + money(cashBefore) + '. Quanto têm ao final?', cashAfter, 'Some as entradas e subtraia as saídas de dinheiro: ' + money(cashBefore) + ' → ' + money(cashAfter) + '. Transferências entre caixa e banco não mudam o total.', 'R$'));
  if (res > 0) ex.push(nu('Qual foi o resultado deste episódio (receitas − custos e despesas)?', res, 'Só receitas, custos e despesas entram na conta do resultado: lucro de ' + money(res) + '.', 'R$'));
  else if (res < 0) ex.push(nu('Este episódio terminou com prejuízo. De quanto?', -res, 'Receitas menos custos e despesas deram ' + money(res) + ': prejuízo de ' + money(-res) + '. Compras de bens e empréstimos não entram no resultado.', 'R$'));
  ex.push(...classifyEx(accts, 'Classifique as contas que apareceram:'));
  if (ep.extra) ex.push(...ep.extra);
  return {
    id: sc.id + n, title: ep.title, icon: ep.icon || sc.icon,
    learn: [
      { h: ep.title, b: '<p>' + ep.story + '</p><p><b>O que aconteceu:</b></p>' + ol(ep.tx.map(t => t.f)) },
      { h: 'Contas deste episódio', b: accountsTable(accts) + box('dica', sc.entries === false ? 'Pergunte sempre: isso muda o resultado (receita ou despesa) ou só troca bens e dívidas de lugar?' : 'Para cada fato, pergunte: o que aumentou ou diminuiu? Aumento de ativo e despesa é débito; de passivo, patrimônio líquido e receita é crédito.') }
    ],
    ex, res
  };
}

function closingLesson(sc, n, bal, lessons){
  const total = lessons.reduce((a, l) => a + l.res, 0);
  const rows = Object.entries(bal).filter(([, v]) => v);
  const byGroup = g => rows.filter(([a]) => groupOf(a) === g).reduce((s, [, v]) => s + v, 0);
  const ativo = byGroup('AC') + byGroup('ANC') - byGroup('RANC');
  const passivo = byGroup('PC') + byGroup('PNC');
  const pl = byGroup('PL') + total;
  check(sc, ativo === passivo + pl, 'balanço não fecha: ' + ativo + ' ≠ ' + passivo + ' + ' + pl);
  const receitas = byGroup('REC');
  const debitRows = rows.filter(([a]) => DEBIT_NATURE.has(groupOf(a))), creditRows = rows.filter(([a]) => !DEBIT_NATURE.has(groupOf(a)));
  const td = debitRows.reduce((s, [, v]) => s + v, 0), tc = creditRows.reduce((s, [, v]) => s + v, 0);
  check(sc, td === tc, 'balancete não fecha');
  const ex = [
    nu('Qual o total de receitas do mês?', receitas, 'Somando as contas de receita no balancete: ' + money(receitas) + '.', 'R$'),
    total >= 0 ? nu('Qual foi o lucro do mês?', total, 'Receitas menos custos e despesas (e redutoras da receita): lucro de ' + money(total) + '.', 'R$')
               : nu('O mês fechou com prejuízo. De quanto?', -total, 'Receitas menos custos e despesas: prejuízo de ' + money(-total) + '.', 'R$'),
    nu('Qual o total do Ativo no fim do mês? (desconte as contas redutoras)', ativo, 'Bens e direitos somados, menos a depreciação acumulada: ' + money(ativo) + '.', 'R$'),
    nu('Qual o patrimônio líquido no fim do mês (capital + resultado do mês)?', pl, 'Capital de ' + money(byGroup('PL')) + (total >= 0 ? ' + lucro de ' : ' − prejuízo de ') + money(Math.abs(total)) + ' = ' + money(pl) + '.', 'R$'),
    tf('No balancete do fim do mês, o total de saldos devedores é igual ao total de saldos credores.', true, 'Os dois lados somam ' + money(td) + ': todos os lançamentos seguiram as partidas dobradas.'),
    mc('Ativo de ' + money(ativo) + ' e passivo de ' + money(passivo) + '. Quanto é o patrimônio líquido?', [ '*' + money(pl), money(ativo + passivo), money(passivo), money(ativo) ].filter((o, i, a) => a.indexOf(o) === i), 'PL = Ativo − Passivo = ' + money(pl) + '.')
  ];
  if (sc.closingExtra) ex.push(...sc.closingExtra);
  return {
    id: sc.id + n, title: 'Fechando o mês', icon: '📒',
    learn: [
      { h: 'O balancete de ' + sc.name, b: '<p>Depois de todos os episódios, estes são os saldos das contas:</p>' + tbl(['Conta', 'Devedor', 'Credor'], debitRows.map(([a, v]) => [a, money(v), '']).concat(creditRows.map(([a, v]) => [a, '', money(v)]), [['<b>Total</b>', '<b>' + money(td) + '</b>', '<b>' + money(tc) + '</b>']])) },
      { h: 'Do balancete às demonstrações', b: tbl(['Item', 'Valor'], [['Receitas do mês', money(receitas)], ['Resultado do mês', (total >= 0 ? 'Lucro de ' : 'Prejuízo de ') + money(Math.abs(total))], ['Ativo total', money(ativo)], ['Passivo', money(passivo)], ['Patrimônio líquido', money(pl)]]) + box('regra', 'Ativo = Passivo + Patrimônio líquido: ' + money(ativo) + ' = ' + money(passivo) + ' + ' + money(pl) + '.') }
    ],
    ex
  };
}

export function buildScenario(sc){
  const bal = {};
  if (sc.start) applyTx(bal, { d: sc.start.d, c: sc.start.c });
  const lessons = sc.episodes.map((ep, i) => episodeLesson(sc, ep, i + 1, bal));
  const all = lessons.concat(sc.closing === false ? [] : [closingLesson(sc, lessons.length + 1, bal, lessons)]);
  return all.map(({ res, ...l }) => l);
}

/* ---------------- Os negócios ---------------- */
const tx = (f, d, c, e, extra) => Object.assign({ f, d, c, e }, extra || {});

export const PADARIA = {
  id:'padaria', name:'Padaria da Dona Rosa', icon:'🥖',
  pool:['Caixa','Bancos','Clientes','Estoques','Máquinas e equipamentos','Fornecedores','Salários a pagar','Empréstimos a pagar','Capital social','Receita de vendas','CMV','Despesa de aluguel','Despesa com energia'],
  episodes:[
    { title:'Abrindo a padaria', icon:'🔑', story:'Dona Rosa decidiu abrir uma padaria no bairro. Antes de vender o primeiro pão, ela precisa colocar dinheiro no negócio, comprar o forno e os insumos e pagar o aluguel.', tx:[
      tx('Dona Rosa depositou R$ 10.000 na conta da padaria como capital.', [['Bancos',10000]], [['Capital social',10000]], 'Entra dinheiro e aumenta o capital dos sócios.'),
      tx('Comprou um forno por R$ 6.000, pago pelo banco.', [['Máquinas e equipamentos',6000]], [['Bancos',6000]], 'Troca dinheiro por um bem de uso duradouro.'),
      tx('Sacou R$ 500 do banco para o caixa da padaria.', [['Caixa',500]], [['Bancos',500]], 'O dinheiro só muda de lugar.'),
      tx('Comprou farinha e insumos a prazo por R$ 1.200.', [['Estoques',1200]], [['Fornecedores',1200]], 'Entra estoque e surge uma dívida com o fornecedor.'),
      tx('Pagou o aluguel do mês, R$ 1.500, pelo banco.', [['Despesa de aluguel',1500]], [['Bancos',1500]], 'Aluguel do mês é despesa.')
    ]},
    { title:'Primeiro dia de vendas', icon:'🥐', story:'Cheiro de pão quentinho às 6h! O primeiro dia teve fila na porta, uma encomenda de bolo e a primeira conta de energia.', tx:[
      tx('Vendeu pães à vista por R$ 800.', [['Caixa',800]], [['Receita de vendas',800]], 'Venda à vista: entra dinheiro e surge a receita.'),
      tx('Os produtos vendidos custaram R$ 300 de insumos.', [['CMV',300]], [['Estoques',300]], 'O custo do que foi vendido sai do estoque e vira CMV.'),
      tx('Vendeu um bolo por encomenda por R$ 250, para receber na semana que vem.', [['Clientes',250]], [['Receita de vendas',250]], 'Venda a prazo também é receita: o direito fica em Clientes.'),
      tx('Pagou a conta de energia, R$ 180, em dinheiro.', [['Despesa com energia',180]], [['Caixa',180]], 'Energia consumida é despesa.'),
      tx('Depositou R$ 400 do caixa no banco.', [['Bancos',400]], [['Caixa',400]], 'Transferência entre contas de dinheiro.')
    ]},
    { title:'Fornecedores e clientes', icon:'🤝', story:'Semana de acertar as contas: o cliente do bolo pagou, o fornecedor da farinha também foi pago e Dona Rosa pegou um empréstimo para comprar uma batedeira no mês que vem.', tx:[
      tx('Recebeu via Pix os R$ 250 do bolo encomendado.', [['Bancos',250]], [['Clientes',250]], 'Recebimento de venda já registrada: troca o direito pelo dinheiro.'),
      tx('Pagou ao fornecedor da farinha os R$ 1.200, pelo banco.', [['Fornecedores',1200]], [['Bancos',1200]], 'Baixa a dívida e sai dinheiro.'),
      tx('Comprou embalagens para os pães, à vista, por R$ 150 em dinheiro.', [['Estoques',150]], [['Caixa',150]], 'Embalagens usadas na venda vão para o estoque.'),
      tx('Pegou um empréstimo de R$ 5.000, creditado na conta.', [['Bancos',5000]], [['Empréstimos a pagar',5000]], 'Empréstimo não é receita: é uma dívida.'),
      tx('Pagou R$ 50 de juros do empréstimo pelo banco.', [['Despesa de juros',50]], [['Bancos',50]], 'Juros são o custo do dinheiro emprestado: despesa.')
    ]},
    { title:'Equipe e fim do mês', icon:'👩‍🍳', story:'A padaria contratou ajudantes, repôs os insumos e teve um fim de mês movimentado. Hora de registrar também o que foi usado e ainda não pago.', tx:[
      tx('Comprou mais farinha, leite e ovos, à vista, por R$ 2.500 pelo banco.', [['Estoques',2500]], [['Bancos',2500]], 'Reposição de estoque.'),
      tx('Vendeu R$ 6.000 à vista ao longo das últimas semanas.', [['Caixa',6000]], [['Receita de vendas',6000]], 'Receita das vendas à vista.'),
      tx('Essas vendas consumiram R$ 2.200 de insumos.', [['CMV',2200]], [['Estoques',2200]], 'Baixa do custo dos produtos vendidos.'),
      tx('Salários do mês, R$ 2.400, serão pagos no dia 5 do mês que vem.', [['Despesa com salários',2400]], [['Salários a pagar',2400]], 'A despesa é deste mês, mesmo paga depois.'),
      tx('Depreciação do forno no mês: R$ 100.', [['Despesa de depreciação',100]], [['Depreciação acumulada',100]], 'O desgaste do forno vira despesa; a conta redutora aumenta.'),
      tx('Pagou a internet do mês, R$ 120, pelo banco.', [['Despesa com internet',120]], [['Bancos',120]], 'Serviço do mês é despesa.')
    ]}
  ],
  closingExtra:[ tf('A padaria teve lucro mesmo pagando só parte das despesas em dinheiro no mês.', true, 'O resultado segue a competência: salários a pagar já entraram como despesa.') ]
};

export const LOJA = {
  id:'lojamoda', name:'Moda Aurora', icon:'🛍️',
  start:{ d:[['Bancos',20000],['Estoques',15000]], c:[['Capital social',35000]] },
  pool:['Caixa','Bancos','Estoques','Cartões a receber','Seguros a apropriar','Móveis e utensílios','Fornecedores','Salários a pagar','Contas a pagar','Comissões a pagar','Capital social','Receita de vendas','CMV','Devoluções de vendas','Despesa de aluguel'],
  episodes:[
    { title:'Abrindo a loja no shopping', icon:'🏬', story:'A Moda Aurora abriu uma loja de roupas no shopping. Aluguel e condomínio do shopping, araras, a coleção de inverno e o seguro da loja chegam antes da primeira venda.', tx:[
      tx('Pagou o aluguel da loja no shopping, R$ 4.000, pelo banco.', [['Despesa de aluguel',4000]], [['Bancos',4000]], 'Aluguel do mês é despesa.'),
      tx('Pagou o condomínio do shopping, R$ 1.200, pelo banco.', [['Despesa com condomínio',1200]], [['Bancos',1200]], 'Condomínio do mês também é despesa.'),
      tx('Comprou araras e balcão por R$ 3.000, a prazo.', [['Móveis e utensílios',3000]], [['Fornecedores',3000]], 'Bens de uso duradouro vão para o ativo.'),
      tx('Comprou a coleção de inverno a prazo por R$ 12.000.', [['Estoques',12000]], [['Fornecedores',12000]], 'Mercadoria para revenda vai para o estoque.'),
      tx('Pagou pelo banco o seguro anual da loja, R$ 2.400, com cobertura a partir de hoje.', [['Seguros a apropriar',2400]], [['Bancos',2400]], 'Seguro pago antes vira despesa mês a mês.')
    ]},
    { title:'Sábado de vendas', icon:'💳', story:'Primeiro sábado com o shopping cheio: vendas no cartão, algumas em dinheiro e comissão para as vendedoras.', tx:[
      tx('Vendeu R$ 5.000 no cartão de crédito; a taxa da administradora é de R$ 150.', [['Cartões a receber',4850],['Despesa com taxas de cartão',150]], [['Receita de vendas',5000]], 'Receita pelo valor cheio; a taxa é despesa.'),
      tx('As peças vendidas no cartão custaram R$ 2.000.', [['CMV',2000]], [['Estoques',2000]], 'Custo das mercadorias vendidas.'),
      tx('Vendeu R$ 1.500 em dinheiro.', [['Caixa',1500]], [['Receita de vendas',1500]], 'Venda à vista.'),
      tx('Essas peças vendidas em dinheiro custaram R$ 600.', [['CMV',600]], [['Estoques',600]], 'Baixa do custo.'),
      tx('Comissão das vendedoras sobre o sábado: R$ 325, a pagar no fim do mês.', [['Despesa com comissões',325]], [['Comissões a pagar',325]], 'A despesa é do dia da venda, mesmo paga depois.')
    ]},
    { title:'Trocas e devoluções', icon:'🔁', story:'Segunda-feira é dia de troca: uma cliente devolveu um casaco, a loja devolveu peças com defeito ao fornecedor e o dinheiro do cartão caiu na conta.', tx:[
      tx('Uma cliente devolveu um casaco de R$ 400 comprado em dinheiro; a loja devolveu o dinheiro.', [['Devoluções de vendas',400]], [['Caixa',400]], 'Devolução reduz a receita (conta redutora) e sai dinheiro.'),
      tx('O casaco devolvido, com custo de R$ 160, voltou ao estoque.', [['Estoques',160]], [['CMV',160]], 'A mercadoria volta e o custo da venda é desfeito.'),
      tx('A loja devolveu ao fornecedor peças com defeito, no valor de R$ 800, abatendo a dívida.', [['Fornecedores',800]], [['Estoques',800]], 'Sai do estoque e diminui a dívida.'),
      tx('A administradora do cartão depositou os R$ 4.850.', [['Bancos',4850]], [['Cartões a receber',4850]], 'Troca o direito pelo dinheiro.'),
      tx('Pagou R$ 6.000 ao fornecedor da coleção, pelo banco.', [['Fornecedores',6000]], [['Bancos',6000]], 'Baixa parte da dívida.')
    ]},
    { title:'Segunda quinzena e fechamento', icon:'📅', story:'A segunda quinzena foi forte no débito. No fim do mês a loja registra o seguro usado, salários, energia e o desgaste dos móveis.', tx:[
      tx('Vendeu R$ 14.000 no cartão de débito; taxa de R$ 140.', [['Cartões a receber',13860],['Despesa com taxas de cartão',140]], [['Receita de vendas',14000]], 'Receita pelo valor da venda; a taxa é despesa.'),
      tx('Essas vendas custaram R$ 5.600.', [['CMV',5600]], [['Estoques',5600]], 'Custo das mercadorias vendidas.'),
      tx('Apropriou o seguro do mês: R$ 200.', [['Despesa com seguros',200]], [['Seguros a apropriar',200]], 'Um doze avos do seguro anual.'),
      tx('Salários do mês, R$ 3.500, a pagar no início do mês seguinte.', [['Despesa com salários',3500]], [['Salários a pagar',3500]], 'Competência: despesa deste mês.'),
      tx('Energia do mês, R$ 450, ainda não paga.', [['Despesa com energia',450]], [['Contas a pagar',450]], 'Consumida no mês, paga depois.'),
      tx('Pagou as comissões do sábado, R$ 325, pelo banco.', [['Comissões a pagar',325]], [['Bancos',325]], 'Só baixa a obrigação: a despesa já tinha sido registrada.'),
      tx('Depreciação das araras e do balcão: R$ 50.', [['Despesa de depreciação',50]], [['Depreciação acumulada',50]], 'Desgaste do mês.')
    ]}
  ],
  closingExtra:[ mc('As devoluções de vendas aparecem na DRE como:', ['*Dedução da receita bruta','Despesa de aluguel','Ativo','Passivo'], 'Reduzem a receita das vendas.') ]
};

export const SALAO = {
  id:'salao', name:'Studio Lu', icon:'💇', entries:false,
  start:{ d:[['Caixa',1000],['Bancos',4000]], c:[['Capital social',5000]] },
  pool:[],
  episodes:[
    { title:'Semana de abertura', icon:'✂️', story:'A Lu abriu um salão de beleza. Na primeira semana vieram os primeiros clientes, as compras de material e até uma noiva que pagou um sinal para o casamento do mês que vem.', tx:[
      tx('Cortes e escovas pagos à vista: R$ 1.200.', [['Caixa',1200]], [['Receita de serviços',1200]], '', { short:'Cortes pagos à vista' }),
      tx('Comprou shampoos e tinturas a prazo por R$ 600.', [['Estoque de materiais',600]], [['Fornecedores',600]], '', { short:'Compra de tinturas a prazo' }),
      tx('Pagou o aluguel do salão, R$ 1.300, pelo banco.', [['Despesa de aluguel',1300]], [['Bancos',1300]], '', { short:'Aluguel do mês pago' }),
      tx('Recebeu R$ 300 de sinal de uma noiva, para o penteado do mês que vem.', [['Bancos',300]], [['Adiantamento de clientes',300]], '', { short:'Sinal para serviço futuro', why:tf('O sinal da noiva, recebido antes do serviço, já é receita do salão.', false, 'É um adiantamento (passivo): vira receita quando o penteado for feito.') }),
      tx('Usou R$ 250 dos materiais nos atendimentos da semana.', [['Despesa com materiais',250]], [['Estoque de materiais',250]], '', { short:'Materiais usados nos atendimentos' })
    ]},
    { title:'Fim de semana cheio', icon:'💅', story:'O fim de semana teve agenda lotada, um evento de uma empresa e a manicure parceira para pagar. A Lu também comprou uma cadeira nova.', tx:[
      tx('Serviços pagos via Pix: R$ 2.500.', [['Bancos',2500]], [['Receita de serviços',2500]], '', { short:'Serviços pagos via Pix' }),
      tx('Atendeu um evento de uma empresa por R$ 1.800, para receber em 30 dias.', [['Clientes',1800]], [['Receita de serviços',1800]], '', { short:'Evento a receber em 30 dias', why:tf('O serviço do evento, mesmo recebido só daqui a 30 dias, é receita deste mês.', true, 'Competência: o serviço foi prestado agora.') }),
      tx('Pagou R$ 700 à manicure parceira pelos serviços do mês.', [['Despesa com serviços de terceiros',700]], [['Bancos',700]], '', { short:'Pagamento da manicure parceira' }),
      tx('Comprou uma cadeira nova por R$ 900, à vista, pelo banco.', [['Móveis e utensílios',900]], [['Bancos',900]], '', { short:'Compra de cadeira à vista', why:mc('A cadeira nova de R$ 900 é:', ['*Um ativo (móveis e utensílios)','Uma despesa do mês','Uma receita','Um passivo'], 'Ela será usada por anos: vai para o ativo.') })
    ]},
    { title:'Contas do mês', icon:'🧾', story:'Último episódio do mês: energia a pagar, fornecedor pago, o dinheiro do evento chegando e o penteado da noiva finalmente feito.', tx:[
      tx('Energia do mês, R$ 280, a pagar no mês seguinte.', [['Despesa com energia',280]], [['Contas a pagar',280]], '', { short:'Energia do mês a pagar' }),
      tx('Pagou os R$ 600 de tinturas ao fornecedor.', [['Fornecedores',600]], [['Bancos',600]], '', { short:'Pagamento ao fornecedor' }),
      tx('Recebeu da empresa os R$ 1.800 do evento.', [['Bancos',1800]], [['Clientes',1800]], '', { short:'Recebimento do evento' }),
      tx('Fez o penteado da noiva, que tinha pago R$ 300 de sinal.', [['Adiantamento de clientes',300]], [['Receita de serviços',300]], '', { short:'Penteado da noiva realizado', why:tf('Quando o penteado é feito, o adiantamento vira receita.', true, 'A obrigação com a cliente foi cumprida.') })
    ]}
  ],
  closingExtra:[ tf('Receber em dinheiro um serviço feito no mês anterior aumenta o lucro do mês em que o dinheiro entrou.', false, 'A receita já foi reconhecida quando o serviço foi prestado.') ]
};

export const OFICINA = {
  id:'oficina', name:'Auto Center Silva', icon:'🔧',
  start:{ d:[['Bancos',15000],['Estoques',5000],['Máquinas e equipamentos',20000]], c:[['Capital social',40000]] },
  pool:['Caixa','Bancos','Clientes','Estoques','Máquinas e equipamentos','Fornecedores','Salários a pagar','Adiantamento de clientes','13º salário a pagar','Financiamentos a pagar','Capital social','Receita de serviços','Receita de vendas','CMV','Despesa de aluguel'],
  episodes:[
    { title:'Serviços e peças', icon:'🛠️', story:'A oficina do Silva cobra o serviço de mão de obra e as peças usadas. Hoje teve troca de óleo, a frota de uma transportadora e reposição de peças.', tx:[
      tx('Troca de óleo e revisão: cliente pagou R$ 600 à vista (R$ 400 de serviço e R$ 200 de peças).', [['Caixa',600]], [['Receita de serviços',400],['Receita de vendas',200]], 'Serviço e peças são receitas diferentes.'),
      tx('As peças usadas na revisão custaram R$ 120.', [['CMV',120]], [['Estoques',120]], 'Custo das peças vendidas.'),
      tx('Comprou peças a prazo por R$ 3.000.', [['Estoques',3000]], [['Fornecedores',3000]], 'Reposição do estoque.'),
      tx('Revisou a frota de uma transportadora por R$ 4.000, a receber.', [['Clientes',4000]], [['Receita de serviços',4000]], 'Serviço prestado a prazo é receita agora.'),
      tx('As peças aplicadas na frota custaram R$ 1.300.', [['CMV',1300]], [['Estoques',1300]], 'Baixa do custo das peças.')
    ]},
    { title:'Adiantamentos e equipamentos', icon:'🏗️', story:'Um cliente pagou adiantado uma retífica de motor, e a oficina financiou um elevador automotivo para atender mais carros.', tx:[
      tx('Cliente pagou R$ 2.000 adiantado por uma retífica que será feita no mês que vem.', [['Bancos',2000]], [['Adiantamento de clientes',2000]], 'Ainda não é receita: a oficina deve o serviço.'),
      tx('Comprou um elevador automotivo de R$ 12.000, financiado.', [['Máquinas e equipamentos',12000]], [['Financiamentos a pagar',12000]], 'Bem de uso e dívida de longo prazo.'),
      tx('Pagou a 1ª parcela do financiamento: R$ 1.000 de principal e R$ 100 de juros.', [['Financiamentos a pagar',1000],['Despesa de juros',100]], [['Bancos',1100]], 'Principal reduz a dívida; juros são despesa.'),
      tx('A transportadora pagou os R$ 4.000.', [['Bancos',4000]], [['Clientes',4000]], 'Recebimento de serviço já registrado.')
    ]},
    { title:'Equipe e fechamento', icon:'👨‍🔧', story:'Fim de mês na oficina: muitos serviços pagos via Pix, salários e 13º dos mecânicos, aluguel do galpão e o desgaste das máquinas.', tx:[
      tx('Serviços do restante do mês, pagos via Pix: R$ 11.000.', [['Bancos',11000]], [['Receita de serviços',11000]], 'Receita de serviços.'),
      tx('Salários dos mecânicos, R$ 6.000, a pagar no dia 5.', [['Despesa com salários',6000]], [['Salários a pagar',6000]], 'Despesa do mês, paga depois.'),
      tx('Provisão do 13º salário do mês: R$ 500.', [['Despesa com 13º salário',500]], [['13º salário a pagar',500]], 'Um doze avos do 13º vira despesa todo mês.'),
      tx('Depreciação das máquinas no mês: R$ 450.', [['Despesa de depreciação',450]], [['Depreciação acumulada',450]], 'Desgaste do mês.'),
      tx('Pagou o aluguel do galpão, R$ 2.500.', [['Despesa de aluguel',2500]], [['Bancos',2500]], 'Aluguel do mês.'),
      tx('Pagou os R$ 3.000 do fornecedor de peças.', [['Fornecedores',3000]], [['Bancos',3000]], 'Baixa da dívida.')
    ]}
  ],
  closingExtra:[ tf('O adiantamento da retífica aparece como passivo no fim do mês.', true, 'O serviço ainda não foi feito: a oficina deve ao cliente.') ]
};

export const SCENARIO_LESSONS = [PADARIA, LOJA, SALAO, OFICINA].flatMap(buildScenario);
export const SCENARIO_IDS = Object.fromEntries([PADARIA, LOJA, SALAO, OFICINA].map(sc => [sc.id, SCENARIO_LESSONS.filter(l => l.id.startsWith(sc.id)).map(l => l.id)]));
