import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"dc", title:"Débito e Crédito", icon:"✍️", color:"#1C3D5A",
  desc:"O coração da Contabilidade: razonetes, natureza das contas e o método das partidas dobradas.",
  lessons:[
  {id:"dc1", title:"O razonete (conta T)", icon:"🆃",
   learn:[
    {h:"O que é uma conta", b:`<p>Cada item do patrimônio tem uma <b>conta</b>: Caixa, Estoques, Fornecedores, Capital Social... A conta guarda todos os aumentos e diminuições daquele item.</p>`},
    {h:"O razonete", b:`<p>O jeito mais visual de enxergar uma conta é o <b>razonete</b>, que tem formato de T:</p>` + T('Caixa',['1.000','500'],['300']) +
      `<p>O lado <b>esquerdo</b> é o <b>débito</b>. O lado <b>direito</b> é o <b>crédito</b>.</p>` +
      box('atencao','Aqui, débito e crédito <b>não</b> significam “bom” ou “ruim”, nem “dívida”. São apenas os nomes dos lados: esquerdo e direito.')},
    {h:"Saldo", b:`<p>O <b>saldo</b> é a diferença entre os dois lados. Ele recebe o nome do lado maior.</p>` + T('Caixa',['1.000','500'],['300'],'Saldo devedor: 1.200') +
      `<p>Débitos (1.500) − créditos (300) = <b>saldo devedor</b> de 1.200.</p>`},
    {h:"Um macete visual", b:`<p>Lembre do desenho da equação patrimonial:</p>` + tbl(['Lado esquerdo (débito)','Lado direito (crédito)'],[['Ativo','Passivo + PL']]) +
      `<p>Cada grupo “mora” em um lado e <b>aumenta no lado em que mora</b>. Ativo aumenta no débito; Passivo e PL aumentam no crédito.</p>`}
   ],
   ex:[
    {t:"mc", q:"No razonete, o lado esquerdo é o:", o:["Débito","Crédito","Saldo","Total"], a:0, e:"Esquerdo = débito; direito = crédito."},
    {t:"tf", q:"Débito significa sempre que a empresa está devendo algo.", a:false, e:"Débito é só o nome do lado esquerdo da conta, não tem relação com dívida."},
    {t:"num", q:"A conta Caixa tem débitos de R$ 5.000 e R$ 2.000 e um crédito de R$ 3.500. Qual é o saldo?", a:3500, u:"R$", e:"(5.000 + 2.000) − 3.500 = 3.500, saldo devedor."},
    {t:"mc", q:"Uma conta com débitos de 800 e créditos de 1.200 tem saldo:", o:["Devedor de 400","Credor de 400","Devedor de 2.000","Credor de 2.000"], a:1, e:"O lado do crédito é maior: 1.200 − 800 = 400 credor."},
    {t:"fill", q:"O lado direito do razonete é o ___ e o lado esquerdo é o ___.", o:["crédito","débito","saldo","ativo"], a:["crédito","débito"], e:"Esquerda: débito. Direita: crédito."},
    {t:"tf", q:"O saldo recebe o nome do lado que tem o maior total.", a:true, e:"Se os débitos somam mais, o saldo é devedor; se os créditos somam mais, é credor."}
   ]},
  {id:"dc2", title:"Natureza das contas", icon:"🧭",
   learn:[
    {h:"A tabela mais importante", b:tbl(['Grupo','Aumenta com','Diminui com','Saldo normal'],[['Ativo','Débito','Crédito','Devedor'],['Passivo','Crédito','Débito','Credor'],['PL','Crédito','Débito','Credor'],['Receita','Crédito','Débito','Credor'],['Despesa','Débito','Crédito','Devedor']])},
    {h:"Por que despesa é devedora?", b:`<p>Despesa <b>diminui</b> o PL. Como o PL aumenta no crédito, aquilo que o diminui vai para o débito.</p><p>Receita <b>aumenta</b> o PL, por isso vai para o crédito, igual ao PL.</p>`},
    {h:"Contas redutoras", b:`<p>Algumas contas ficam em um grupo mas têm natureza oposta, para <b>reduzir</b> outra conta:</p>` +
      ul(['<b>Depreciação acumulada</b>: fica no Ativo, mas é credora. Reduz o valor das máquinas, veículos etc.','<b>Capital a integralizar</b>: fica no PL, mas é devedora. Reduz o capital que os sócios ainda não entregaram.'])},
    {h:"Resumindo em uma frase", b:box('regra','<b>Ativo e Despesa</b> aumentam no DÉBITO.<br><b>Passivo, PL e Receita</b> aumentam no CRÉDITO.') + `<p>Com essa regra, você já consegue fazer a maior parte dos lançamentos do dia a dia.</p>`}
   ],
   ex:[
    {t:"class", q:"Qual a natureza (saldo normal) de cada conta?", cats:["Devedora","Credora"], items:[["Caixa",0],["Fornecedores",1],["Capital social",1],["Despesa com aluguel",0],["Receita de vendas",1],["Estoques",0],["Depreciação acumulada",1]], e:"Ativo e despesa são devedores; passivo, PL e receita são credores. Depreciação acumulada é redutora do ativo, por isso credora."},
    {t:"mc", q:"Uma conta de Passivo aumenta com um lançamento a:", o:["Débito","Crédito","Saldo","Estorno"], a:1, e:"Passivo tem natureza credora: aumenta no crédito."},
    {t:"tf", q:"Despesas têm natureza devedora porque reduzem o Patrimônio Líquido.", a:true, e:"O PL aumenta no crédito; o que o reduz vai para o débito."},
    {t:"mc", q:"Qual destas é uma conta redutora do Ativo?", o:["Depreciação acumulada","Capital social","Clientes","Salários a pagar"], a:0, e:"Depreciação acumulada reduz o valor dos bens do imobilizado."},
    {t:"match", pairs:[["Ativo","Devedor, bens e direitos"],["Passivo","Credor, obrigações com terceiros"],["Receita","Credora, aumenta o PL"],["Despesa","Devedora, reduz o PL"]], e:"Essa é a base de todos os lançamentos."},
    {t:"fill", q:"Ativo e ___ aumentam no débito; Passivo, PL e ___ aumentam no crédito.", o:["Despesa","Receita","Caixa","Fornecedores"], a:["Despesa","Receita"], e:"Regra de ouro da natureza das contas."}
   ]},
  {id:"dc3", title:"Partidas dobradas na prática", icon:"🔁",
   learn:[
    {h:"Não há débito sem crédito", b:`<p>O método das <b>partidas dobradas</b>, divulgado por Luca Pacioli em 1494, diz que todo fato é registrado com pelo menos <b>um débito e um crédito</b> de mesmo valor.</p>` +
      box('regra','Soma dos débitos = soma dos créditos. Sempre.')},
    {h:"Passo a passo para lançar", b:ol(['Quais contas mudaram com esse fato?','Cada uma <b>aumentou</b> ou <b>diminuiu</b>?','Aplique a natureza: aumento de Ativo vai a débito, aumento de Passivo vai a crédito, e assim por diante.','Confira se débitos e créditos têm o mesmo valor.'])},
    {h:"Exemplo 1: compra à vista", b:`<p>Compra de mercadorias por R$ 1.000, paga em dinheiro.</p><p>Estoques (Ativo) <b>aumenta</b>: débito. Caixa (Ativo) <b>diminui</b>: crédito.</p>` +
      TT(T('Estoques',['1.000'],[]), T('Caixa',[],['1.000'])) + lanc([['D','Estoques','1.000'],['C','Caixa','1.000']])},
    {h:"Exemplo 2: compra a prazo", b:`<p>A mesma compra, mas com pagamento em 30 dias.</p><p>Estoques aumenta: débito. Surge uma dívida: Fornecedores (Passivo) <b>aumenta</b>: crédito.</p>` +
      TT(T('Estoques',['1.000'],[]), T('Fornecedores',[],['1.000'])) + lanc([['D','Estoques','1.000'],['C','Fornecedores','1.000']])}
   ],
   ex:[
    {t:"entry", q:"Os sócios depositam R$ 50.000 no banco para abrir a empresa.", accts:["Bancos","Capital social","Caixa","Fornecedores","Receita de vendas"], d:["Bancos"], c:["Capital social"], e:"Bancos (Ativo) aumenta: débito. Capital social (PL) aumenta: crédito."},
    {t:"entry", q:"Compra de um computador por R$ 4.000, pago em dinheiro.", accts:["Computadores","Caixa","Fornecedores","Despesa com equipamentos"], d:["Computadores"], c:["Caixa"], e:"O computador é um bem (Ativo) que aumenta; o Caixa diminui."},
    {t:"entry", q:"Compra de mercadorias a prazo, R$ 3.000.", accts:["Estoques","Fornecedores","Caixa","Clientes"], d:["Estoques"], c:["Fornecedores"], e:"Estoques aumenta (débito) e nasce a dívida com Fornecedores (crédito)."},
    {t:"entry", q:"Pagamento de R$ 3.000 ao fornecedor, pelo banco.", accts:["Fornecedores","Bancos","Estoques","Despesas gerais"], d:["Fornecedores"], c:["Bancos"], e:"A dívida (Passivo) diminui: débito. O dinheiro no banco (Ativo) diminui: crédito."},
    {t:"entry", q:"Recebimento de R$ 1.500 de um cliente, em dinheiro.", accts:["Caixa","Clientes","Receita de vendas","Fornecedores"], d:["Caixa"], c:["Clientes"], e:"Caixa aumenta (débito) e o direito a receber de Clientes diminui (crédito). A receita já tinha sido registrada na venda."},
    {t:"tf", q:"Em um lançamento correto, a soma dos débitos é igual à soma dos créditos.", a:true, e:"É o princípio das partidas dobradas."},
    {t:"mc", q:"Ao pagar uma dívida com fornecedor, o que acontece com Ativo e Passivo?", o:["Ambos diminuem","Ambos aumentam","O Ativo aumenta e o Passivo diminui","Nada muda"], a:0, e:"Sai dinheiro (Ativo diminui) e a dívida acaba (Passivo diminui)."}
   ]},
  {id:"dc4", title:"Tipos de fatos contábeis", icon:"🔀",
   learn:[
    {h:"Fatos permutativos", b:`<p>Apenas <b>trocam</b> valores entre contas, sem mudar o PL.</p>` + box('exemplo','Comprar mercadoria à vista: Caixa diminui, Estoques aumenta. O PL continua igual.')},
    {h:"Fatos modificativos", b:`<p><b>Alteram o PL</b>. Envolvem receitas ou despesas.</p>` +
      ul(['<b>Aumentativos</b>: receitas. Ex: serviço prestado e recebido à vista.','<b>Diminutivos</b>: despesas. Ex: pagamento da conta de luz.']) +
      lanc([['D','Caixa','2.000'],['C','Receita de serviços','2.000']])},
    {h:"Fatos mistos", b:`<p>Juntam uma permuta e uma modificação no mesmo fato.</p>` + box('exemplo','Pagar uma dívida de R$ 1.000 com R$ 50 de juros: a dívida sai (permuta) e os juros são despesa (modificação).') +
      lanc([['D','Fornecedores','1.000'],['D','Despesa de juros','50'],['C','Caixa','1.050']])},
    {h:"Fórmulas de lançamento", b:tbl(['Fórmula','Composição'],[['1ª','1 débito e 1 crédito'],['2ª','1 débito e 2 ou mais créditos'],['3ª','2 ou mais débitos e 1 crédito'],['4ª','2 ou mais débitos e 2 ou mais créditos']]) + `<p>O exemplo dos juros acima é de 3ª fórmula: dois débitos e um crédito.</p>`}
   ],
   ex:[
    {t:"class", q:"Classifique o tipo de fato", cats:["Permutativo","Modif. aumentativo","Modif. diminutivo"], items:[["Compra de mercadoria à vista",0],["Serviço prestado e recebido à vista",1],["Pagamento da conta de luz",2],["Recebimento de um cliente",0],["Juros ganhos em aplicação",1],["Empréstimo obtido no banco",0]], e:"Só receitas e despesas alteram o PL. Empréstimo e recebimento de clientes apenas trocam valores."},
    {t:"entry", q:"Serviço prestado e recebido à vista: R$ 2.000.", accts:["Caixa","Receita de serviços","Clientes","Capital social"], d:["Caixa"], c:["Receita de serviços"], e:"Caixa aumenta (débito) e a receita aumenta o PL (crédito)."},
    {t:"entry", q:"Pagamento do aluguel do mês, R$ 1.200, pelo banco.", accts:["Despesa de aluguel","Bancos","Aluguéis a receber","Fornecedores"], d:["Despesa de aluguel"], c:["Bancos"], e:"Despesa aumenta (débito) e o saldo bancário diminui (crédito)."},
    {t:"entry", q:"Pagamento de uma dívida de R$ 1.000 com fornecedor, mais R$ 50 de juros, em dinheiro. Marque todas as contas.", accts:["Fornecedores","Despesa de juros","Caixa","Receita de juros","Estoques"], d:["Fornecedores","Despesa de juros"], c:["Caixa"], e:"Dois débitos (dívida que sai e despesa de juros) e um crédito (Caixa 1.050). Fato misto, 3ª fórmula."},
    {t:"mc", q:"Um lançamento com dois débitos e um crédito é de qual fórmula?", o:["1ª","2ª","3ª","4ª"], a:2, e:"3ª fórmula: vários débitos e um crédito."},
    {t:"tf", q:"Um fato permutativo altera o valor do Patrimônio Líquido.", a:false, e:"Fatos permutativos só trocam valores entre contas; quem altera o PL são os modificativos."}
   ]},
  {id:"dc5", title:"Erros e estornos", icon:"↩️",
   learn:[
    {h:"Todo mundo erra", b:`<p>Lançou na conta errada ou com o valor errado? Na Contabilidade <b>não se apaga</b>: faz-se um estorno e depois o lançamento correto.</p>` + box('atencao','Rasurar ou apagar registros não é permitido: a contabilidade precisa deixar rastro.')},
    {h:"O estorno", b:`<p>Estorno é o lançamento original <b>ao contrário</b>.</p>` + box('exemplo','Lançado por engano: D Despesa de aluguel / C Caixa, R$ 500. Era conta de energia.') + `<p>Estorno:</p>` + lanc([['D','Caixa','500'],['C','Despesa de aluguel','500']]) + `<p>Correto:</p>` + lanc([['D','Despesa com energia','500'],['C','Caixa','500']])},
    {h:"Transferência e complemento", b:ul(['<b>Transferência</b>: corrige de uma vez, debitando a conta certa e creditando a errada.','<b>Complemento</b>: se lançou valor a menor, lança-se só a diferença.']) + lanc([['D','Despesa com energia','500'],['C','Despesa de aluguel','500']])}
   ],
   ex:[
    {t:"mc", q:"Como se corrige um lançamento errado?", o:["Com um estorno e, depois, o lançamento correto","Apagando o lançamento","Rasurando o livro","Ignorando o erro"], a:0, e:"A contabilidade corrige deixando rastro."},
    {t:"entry", q:"Estorne o lançamento feito por engano: D Despesa de aluguel / C Caixa, R$ 500.", d:["Caixa"], c:["Despesa de aluguel"], accts:["Caixa","Despesa de aluguel","Despesa com energia","Bancos"], e:"O estorno inverte débito e crédito.", h:"Inverta os lados do lançamento original."},
    {t:"tf", q:"Um estorno é o lançamento original com débito e crédito invertidos.", a:true, e:"Assim os saldos voltam ao que eram."},
    {t:"num", q:"Uma venda de R$ 1.500 foi lançada como R$ 1.200. Qual o valor do lançamento complementar?", a:300, e:"Falta a diferença: 1.500 − 1.200 = 300.", u:"R$"},
    {t:"wr", q:"Como se chama o lançamento que anula outro, invertendo débito e crédito?", a:["estorno"], e:"Estorno."},
    {t:"ew", q:"Uma despesa de energia de R$ 200 foi lançada em Despesa de aluguel. Escreva o lançamento de transferência que corrige direto.", d:["Despesa com energia"], c:["Despesa de aluguel"], e:"Debita-se a conta certa e credita-se a errada.", h:"Qual conta precisa receber o valor?"}
   ]}
  ]
};

