import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"lanc", title:"Lançamentos do Dia a Dia", icon:"📝", color:"#1F6F78",
  desc:"Compras, vendas, salários, empréstimos e depreciação: os lançamentos que toda empresa faz.",
  lessons:[
  {id:"lanc1", title:"Compra e venda de mercadorias", icon:"🛒",
   learn:[
    {h:"Mercadoria é estoque", b:`<p>A mercadoria comprada para revender entra no Ativo como <b>Estoques</b>. Ela só vira custo quando é <b>vendida</b>.</p>` + lanc([['D','Estoques','600'],['C','Fornecedores','600']])},
    {h:"A venda tem duas partes", b:ol(['<b>Receita</b>, pelo preço de venda: D Caixa ou Clientes, C Receita de vendas.','<b>Baixa do estoque</b>, pelo custo: D CMV (Custo das Mercadorias Vendidas), C Estoques.']) +
      box('exemplo','Mercadoria que custou R$ 600 é vendida à vista por R$ 1.000.') +
      lanc([['D','Caixa','1.000'],['C','Receita de vendas','1.000'],['D','CMV','600'],['C','Estoques','600']]) + `<p>Lucro bruto: 1.000 − 600 = <b>400</b>.</p>`},
    {h:"CMV no inventário periódico", b:`<p>Quando a empresa só conta o estoque no fim do período, calcula o CMV pela fórmula:</p>` + eq('CMV = Estoque inicial + Compras − Estoque final') +
      box('exemplo','EI 5.000 + Compras 20.000 − EF 7.000 = CMV 18.000.')},
    {h:"Inventário permanente", b:`<p>Controla cada entrada e saída em tempo real, com baixa do custo a cada venda. É o mais comum hoje, com sistemas.</p><p>Para atribuir custo às saídas, usa-se o <b>PEPS</b> (primeiro que entra, primeiro que sai) ou o <b>custo médio ponderado</b>.</p>` +
      box('atencao','O <b>UEPS</b> (último que entra, primeiro que sai) não é aceito pelas normas contábeis nem pela legislação fiscal brasileira.')}
   ],
   ex:[
    {t:"entry", q:"Venda de mercadorias à vista por R$ 1.000 (registro da receita).", accts:["Caixa","Receita de vendas","Estoques","CMV"], d:["Caixa"], c:["Receita de vendas"], e:"Entra dinheiro (débito em Caixa) e reconhece-se a receita (crédito)."},
    {t:"entry", q:"Baixa do custo da mercadoria vendida, R$ 600.", accts:["CMV","Estoques","Caixa","Receita de vendas"], d:["CMV"], c:["Estoques"], e:"O custo vai para o resultado (débito em CMV) e o estoque sai (crédito)."},
    {t:"num", q:"Estoque inicial R$ 8.000, compras de R$ 30.000 e estoque final de R$ 10.000. Qual o CMV?", a:28000, u:"R$", e:"8.000 + 30.000 − 10.000 = 28.000."},
    {t:"num", q:"Mercadoria que custou R$ 3.200 foi vendida por R$ 5.000. Qual o lucro bruto?", a:1800, u:"R$", e:"5.000 − 3.200 = 1.800."},
    {t:"tf", q:"O método UEPS é aceito no Brasil para avaliar estoques.", a:false, e:"No Brasil usam-se PEPS ou custo médio ponderado."},
    {t:"entry", q:"Venda de mercadorias a prazo por R$ 2.500 (registro da receita).", accts:["Clientes","Receita de vendas","Fornecedores","Caixa"], d:["Clientes"], c:["Receita de vendas"], e:"Na venda a prazo, nasce um direito a receber: débito em Clientes."},
    {t:"mc", q:"Quando a mercadoria comprada vira custo (CMV)?", o:["No momento da compra","Quando é vendida","Quando é paga ao fornecedor","Sempre no fim do ano"], a:1, e:"Enquanto não vendida, a mercadoria é Ativo (Estoques)."}
   ]},
  {id:"lanc2", title:"Salários e encargos", icon:"👷",
   learn:[
    {h:"Reconhecendo a despesa", b:`<p>Salário é despesa do mês <b>trabalhado</b> (competência), mesmo que seja pago no mês seguinte.</p>` + lanc([['D','Despesa com salários','10.000'],['C','Salários a pagar','10.000']])},
    {h:"Pagando os salários", b:lanc([['D','Salários a pagar','10.000'],['C','Bancos','10.000']]) + box('atencao','O pagamento <b>não</b> é uma nova despesa. Ele só quita a dívida registrada antes.')},
    {h:"Encargos da empresa", b:`<p>Além do salário, a empresa tem encargos próprios, como o <b>FGTS</b> (8% da remuneração) e, em regra, a contribuição patronal ao INSS, que na maioria das empresas fora do Simples Nacional é de 20%.</p>` + lanc([['D','Despesa com FGTS','800'],['C','FGTS a recolher','800']])},
    {h:"Descontos do funcionário", b:`<p>O INSS e o Imposto de Renda <b>descontados do empregado</b> não são despesa da empresa: ela apenas retém e repassa ao governo.</p>` +
      box('exemplo','Salário bruto de R$ 3.000, com R$ 250 de INSS retido (valor ilustrativo).') +
      lanc([['D','Despesa com salários','3.000'],['C','Salários a pagar','2.750'],['C','INSS a recolher','250']])}
   ],
   ex:[
    {t:"entry", q:"Reconhecimento dos salários de março, R$ 10.000, que serão pagos em abril.", accts:["Despesa com salários","Salários a pagar","Bancos","Receita de serviços"], d:["Despesa com salários"], c:["Salários a pagar"], e:"A despesa é de março (competência) e nasce a obrigação de pagar."},
    {t:"entry", q:"Pagamento dos salários de março, em abril, pelo banco.", accts:["Salários a pagar","Bancos","Despesa com salários","Caixa"], d:["Salários a pagar"], c:["Bancos"], e:"Quita-se a obrigação: débito no Passivo, crédito em Bancos."},
    {t:"num", q:"Qual é o FGTS (8%) sobre uma folha de R$ 10.000?", a:800, u:"R$", e:"10.000 × 8% = 800."},
    {t:"tf", q:"O INSS descontado do salário do empregado é despesa da empresa.", a:false, e:"A empresa só retém e repassa esse valor. A despesa dela é o salário bruto e os encargos patronais."},
    {t:"mc", q:"Em que mês se registra a despesa do salário de março pago em 5 de abril?", o:["Março","Abril","Maio","Depende do banco"], a:0, e:"Pelo regime de competência, a despesa é do mês trabalhado."},
    {t:"entry", q:"Folha bruta de R$ 5.000, com R$ 400 de INSS retido do empregado. Marque todas as contas.", accts:["Despesa com salários","Salários a pagar","INSS a recolher","Bancos"], d:["Despesa com salários"], c:["Salários a pagar","INSS a recolher"], e:"Despesa de 5.000; a empresa deve 4.600 ao funcionário e 400 ao INSS. É um lançamento de 2ª fórmula."}
   ]},
  {id:"lanc3", title:"Empréstimos e juros", icon:"🏦",
   learn:[
    {h:"Pegando o empréstimo", b:lanc([['D','Bancos','20.000'],['C','Empréstimos a pagar','20.000']]) + `<p>Entra dinheiro e nasce uma obrigação.</p>` + box('atencao','Dinheiro de empréstimo <b>não é receita</b>. Ele terá de ser devolvido.')},
    {h:"Juros são despesa financeira", b:`<p>Os juros remuneram o banco pelo tempo. São reconhecidos por competência, mês a mês, como <b>despesa financeira</b>.</p>` + lanc([['D','Despesa de juros','300'],['C','Juros a pagar','300']])},
    {h:"Curto ou longo prazo?", b:tbl(['Vencimento','Classificação'],[['Até 12 meses','Passivo Circulante'],['Após 12 meses','Passivo Não Circulante']]) + `<p>Um empréstimo de 3 anos tem parcelas nos dois grupos: as do próximo ano no Circulante e o resto no Não Circulante.</p>`},
    {h:"O outro lado: aplicações", b:`<p>Quando a empresa aplica dinheiro, os juros que ela ganha são <b>receita financeira</b>.</p>` + lanc([['D','Aplicações financeiras','150'],['C','Receita financeira','150']])}
   ],
   ex:[
    {t:"entry", q:"Empréstimo de R$ 20.000 creditado na conta bancária.", accts:["Bancos","Empréstimos a pagar","Receita financeira","Capital social"], d:["Bancos"], c:["Empréstimos a pagar"], e:"Entra dinheiro (Ativo) e nasce a dívida (Passivo)."},
    {t:"tf", q:"O dinheiro recebido de um empréstimo é uma receita da empresa.", a:false, e:"É uma obrigação: o valor terá de ser devolvido."},
    {t:"entry", q:"Juros do mês sobre o empréstimo, R$ 300, a pagar.", accts:["Despesa de juros","Juros a pagar","Receita financeira","Bancos"], d:["Despesa de juros"], c:["Juros a pagar"], e:"Despesa financeira reconhecida por competência, com a obrigação correspondente."},
    {t:"num", q:"Empréstimo de R$ 20.000 a juros simples de 2% ao mês. Quanto de juros em 3 meses?", a:1200, u:"R$", e:"20.000 × 2% = 400 por mês; × 3 = 1.200."},
    {t:"mc", q:"Uma parcela de empréstimo que vence daqui a 3 anos fica no:", o:["Passivo Circulante","Passivo Não Circulante","Ativo Circulante","Patrimônio Líquido"], a:1, e:"Vencimento após 12 meses: Passivo Não Circulante."},
    {t:"entry", q:"Rendimento de R$ 150 em uma aplicação financeira, somado à própria aplicação.", accts:["Aplicações financeiras","Receita financeira","Despesa de juros","Bancos"], d:["Aplicações financeiras"], c:["Receita financeira"], e:"A aplicação (Ativo) cresce e reconhece-se a receita financeira."}
   ]},
  {id:"lanc4", title:"Depreciação", icon:"🚚",
   learn:[
    {h:"O que é depreciação", b:`<p>Máquinas, veículos e computadores perdem valor com o uso e o tempo. A <b>depreciação</b> distribui o custo do bem ao longo da sua vida útil, como despesa.</p>`},
    {h:"Método linear", b:eq('Depreciação anual = (Custo − Valor residual) ÷ Vida útil') +
      box('exemplo','Máquina de R$ 50.000, valor residual de R$ 5.000 e vida útil de 5 anos: (50.000 − 5.000) ÷ 5 = <b>9.000 por ano</b>, ou 750 por mês.')},
    {h:"O lançamento", b:lanc([['D','Despesa de depreciação','750'],['C','Depreciação acumulada','750']]) +
      `<p>A depreciação acumulada é <b>redutora do Ativo</b>. O bem continua registrado pelo custo, e o acumulado mostra quanto já foi consumido.</p>` + eq('Valor contábil = Custo − Depreciação acumulada')},
    {h:"O que não deprecia", b:ul(['<b>Terrenos</b> não sofrem depreciação: a vida útil é indefinida.','Recursos naturais (minas, florestas) sofrem <b>exaustão</b>.','Intangíveis com vida útil definida sofrem <b>amortização</b>.'])}
   ],
   ex:[
    {t:"num", q:"Veículo de R$ 60.000, valor residual de R$ 12.000 e vida útil de 4 anos. Qual a depreciação anual?", a:12000, u:"R$", e:"(60.000 − 12.000) ÷ 4 = 12.000 por ano."},
    {t:"entry", q:"Depreciação do mês de uma máquina, R$ 750.", accts:["Despesa de depreciação","Depreciação acumulada","Máquinas","Caixa"], d:["Despesa de depreciação"], c:["Depreciação acumulada"], e:"A despesa vai a débito; a redutora do Ativo aumenta a crédito. Nenhum dinheiro sai."},
    {t:"tf", q:"Terrenos são depreciados ao longo do tempo.", a:false, e:"Terrenos têm vida útil indefinida e não são depreciados."},
    {t:"num", q:"Máquina com custo de R$ 50.000 e depreciação acumulada de R$ 18.000. Qual o valor contábil?", a:32000, u:"R$", e:"50.000 − 18.000 = 32.000."},
    {t:"match", pairs:[["Depreciação","Bens tangíveis, como máquinas"],["Amortização","Intangíveis com vida útil definida"],["Exaustão","Recursos naturais, como minas"]], e:"Três nomes para a mesma ideia: consumir o custo ao longo do tempo."},
    {t:"mc", q:"A conta Depreciação acumulada tem natureza:", o:["Credora, redutora do Ativo","Devedora, do Passivo","Credora, de Receita","Devedora, do PL"], a:0, e:"Ela fica no Ativo, mas com saldo credor, para reduzir o valor dos bens."}
   ]},
  {id:"lanc5", title:"Diário, Razão e Balancete", icon:"📚",
   learn:[
    {h:"Livro Diário", b:`<p>Registra <b>todos</b> os lançamentos em <b>ordem cronológica</b>: data, contas, histórico e valor.</p><p>É um livro obrigatório e hoje é entregue em formato digital pela ECD, dentro do SPED.</p>`},
    {h:"Livro Razão", b:`<p>Reúne os lançamentos <b>por conta</b>. É, na prática, a coleção de todos os razonetes, e mostra o saldo de cada conta.</p>` + T('Fornecedores',['3.000'],['5.000','2.000'],'Saldo credor: 4.000')},
    {h:"Balancete de verificação", b:`<p>Lista todas as contas com seus saldos. O total dos saldos devedores deve ser igual ao total dos saldos credores.</p>` +
      tbl(['Conta','Devedor','Credor'],[['Caixa','3.000',''],['Estoques','2.000',''],['Fornecedores','','1.500'],['Capital social','','3.500'],['<b>Total</b>','<b>5.000</b>','<b>5.000</b>']])},
    {h:"O fluxo completo", b:ol(['Documento (nota fiscal, recibo, contrato)','Livro Diário','Livro Razão','Balancete','Demonstrações financeiras']) +
      box('atencao','Balancete fechado não garante ausência de erros. Lançar o valor certo na conta errada, por exemplo, passa despercebido.')}
   ],
   ex:[
    {t:"mc", q:"Qual livro registra os fatos em ordem cronológica?", o:["Diário","Razão","Balancete","Inventário"], a:0, e:"O Diário segue a ordem das datas; o Razão organiza por conta."},
    {t:"fill", q:"O ___ agrupa os lançamentos por conta, e o ___ confere se os saldos devedores e credores batem.", o:["Razão","balancete","Diário","contrato"], a:["Razão","balancete"], e:"Razão = por conta. Balancete = conferência dos saldos."},
    {t:"num", q:"Saldos devedores: Caixa 4.000, Estoques 6.000 e Despesas 2.000. Saldos credores: Fornecedores 3.000, Capital 7.000 e Receitas. Qual deve ser o saldo de Receitas para o balancete fechar?", a:2000, u:"R$", e:"Devedores = 12.000. Credores sem Receitas = 10.000. Faltam 2.000."},
    {t:"tf", q:"Se o balancete fecha, não existe nenhum erro na contabilidade.", a:false, e:"Erros como usar a conta errada com o valor certo não aparecem no balancete."},
    {t:"mc", q:"Qual é a ordem correta do processo contábil?", o:["Documento, Diário, Razão, Balancete","Razão, Diário, Documento, Balancete","Balancete, Razão, Diário, Documento","Diário, Balancete, Documento, Razão"], a:0, e:"O documento comprova o fato; depois vêm Diário, Razão e Balancete."},
    {t:"tf", q:"Todo lançamento deve estar apoiado em um documento que comprove o fato.", a:true, e:"Sem documento, o registro não tem comprovação."}
   ]},
  {id:"lanc6", title:"Despesas antecipadas", icon:"🛡️",
   learn:[
    {h:"Pagou antes de usar", b:`<p>Um seguro anual pago à vista cobre 12 meses. Pela competência, ele <b>não</b> vira despesa de uma vez.</p>`},
    {h:"No pagamento", b:lanc([['D','Seguros a apropriar','12.000'],['C','Bancos','12.000']]) + `<p>Despesa antecipada é um <b>Ativo</b>: o direito de usar o serviço no futuro.</p>`},
    {h:"A cada mês", b:lanc([['D','Despesa com seguros','1.000'],['C','Seguros a apropriar','1.000']]) + `<p>Esse lançamento mensal se chama <b>apropriação</b>.</p>`},
    {h:"Outros exemplos", b:ul(['Aluguel pago adiantado','Assinatura anual de software','IPTU pago em cota única'])}
   ],
   ex:[
    {t:"entry", q:"Pagamento à vista, pelo banco, de seguro anual de R$ 12.000.", d:["Seguros a apropriar"], c:["Bancos"], accts:["Seguros a apropriar","Bancos","Despesa com seguros","Capital social"], e:"No pagamento nasce um ativo.", h:"O seguro ainda não foi usado."},
    {t:"entry", q:"Apropriação do seguro do mês, R$ 1.000.", d:["Despesa com seguros"], c:["Seguros a apropriar"], accts:["Despesa com seguros","Seguros a apropriar","Bancos","Receita de serviços"], e:"A despesa vai ao resultado e o ativo diminui."},
    {t:"num", q:"Seguro anual de R$ 9.600 pago em 1º de janeiro. Qual o saldo a apropriar após 3 meses?", a:7200, e:"Apropriados 3 × 800 = 2.400; restam 7.200.", u:"R$", h:"Quanto é um mês de seguro?"},
    {t:"tf", q:"Despesa paga antecipadamente fica inicialmente no Ativo.", a:true, e:"É um direito de receber o serviço."},
    {t:"mc", q:"Qual regime explica por que o seguro anual não vira despesa de uma vez?", o:["Regime de competência","Regime de caixa","Simples Nacional","Lucro Presumido"], a:0, e:"A despesa acompanha o período de uso."},
    {t:"expl", q:"Com suas palavras: por que um seguro anual pago em janeiro não é despesa toda em janeiro?", model:"Pelo regime de competência, a despesa é reconhecida no período em que o benefício é usado. Como o seguro cobre 12 meses, ele fica no ativo e vira despesa aos poucos, mês a mês.", k:[["Regime de competência","competenc"],["Cobre vários meses","mes","meses","periodo","ano","12","doze"],["Vira despesa aos poucos","aos pouco","cada mes","mensal","apropri","proporcion","parcel","divid","ao longo"]], e:"Competência + apropriação mensal."}
   ]},
  {id:"lanc7", title:"Provisões: férias e 13º", icon:"🏖️",
   learn:[
    {h:"O que é provisão", b:`<p>Obrigação que já existe por fatos passados, mas com valor ou data de pagamento incertos. Exemplos: férias e 13º dos empregados, processos trabalhistas prováveis.</p>`},
    {h:"13º salário", b:`<p>A cada mês trabalhado, o empregado ganha direito a <b>1/12</b> do 13º. A empresa reconhece essa despesa mês a mês.</p>` + eq('Provisão mensal = Salário ÷ 12') + lanc([['D','Despesa com 13º salário','250'],['C','13º salário a pagar','250']])},
    {h:"Férias", b:`<p>Também 1/12 por mês, mais o <b>terço constitucional</b> (1/3 a mais).</p>` + box('exemplo','Salário de R$ 3.000: férias = 3.000 + 1.000 = R$ 4.000. Por mês: 4.000 ÷ 12 ≈ R$ 333,33.')},
    {h:"Por que provisionar", b:`<p>Para que cada mês carregue seu custo real (competência) e o Balanço mostre a dívida que já existe.</p>`}
   ],
   ex:[
    {t:"num", q:"Salário de R$ 2.400. Qual a provisão mensal do 13º?", a:200, e:"2.400 ÷ 12 = 200.", u:"R$"},
    {t:"entry", q:"Provisão mensal do 13º salário, R$ 200.", d:["Despesa com 13º salário"], c:["13º salário a pagar"], accts:["Despesa com 13º salário","13º salário a pagar","Bancos","Salários a pagar"], e:"Reconhece-se a despesa e a obrigação a cada mês."},
    {t:"num", q:"Salário de R$ 3.600. Qual o valor das férias com o terço constitucional?", a:4800, e:"3.600 + 3.600 ÷ 3 = 4.800.", u:"R$", h:"Some um terço do salário."},
    {t:"tf", q:"Provisões são obrigações que já existem, mesmo com valor ou data incertos.", a:true, e:"Nascem de fatos passados."},
    {t:"mc", q:"A provisão de férias atende a qual regime?", o:["Competência","Caixa","Presumido","Nenhum"], a:0, e:"A despesa é do mês trabalhado."},
    {t:"wr", q:"Qual fração do 13º o empregado ganha por mês trabalhado? (ex: 1/2)", a:["1/12","um doze avos"], e:"Um doze avos (1/12) por mês."}
   ]},
  {id:"lanc8", title:"Devoluções e abatimentos", icon:"↪️",
   learn:[
    {h:"Quando o cliente devolve", b:`<p>Uma venda pode ser desfeita, total ou parcialmente: o produto veio com defeito, ou não era o que o cliente pediu. Isso é uma <b>devolução de vendas</b>.</p>`},
    {h:"Duas partes, de novo", b:`<p>A devolução desfaz a venda em espelho: cancela a receita e devolve o custo ao estoque.</p>` +
      lanc([['D','Devolução de vendas','1.000'],['C','Caixa ou Clientes','1.000']]) + lanc([['D','Estoques','600'],['C','CMV','600']]) +
      `<p><b>Devolução de vendas</b> é uma conta redutora da receita bruta, e aparece deduzindo a receita bruta na DRE.</p>`},
    {h:"Abatimento", b:`<p>Diferente da devolução, no <b>abatimento</b> o cliente <b>fica com a mercadoria</b>, mas recebe um desconto por algum problema (um defeito pequeno, um atraso na entrega).</p>` +
      lanc([['D','Abatimento sobre vendas','100'],['C','Caixa ou Clientes','100']]) + `<p>Não há baixa de estoque, porque o produto não voltou.</p>`},
    {h:"Na DRE", b:tbl(['Linha','R$'],[['Receita bruta','10.000'],['(−) Devoluções e abatimentos','(300)'],['(=) Receita líquida','9.700']]) + box('dica','Devoluções e abatimentos são deduções da receita bruta, junto com os impostos sobre vendas.')}
   ],
   ex:[
    {t:"entry", q:"Cliente devolve mercadoria vendida por R$ 500, que havia sido paga em dinheiro. Registre o cancelamento da receita.", accts:["Devolução de vendas","Caixa","Estoques","CMV"], d:["Devolução de vendas"], c:["Caixa"], e:"A devolução reduz a receita (débito) e o dinheiro volta ao cliente (crédito em Caixa)."},
    {t:"entry", q:"O estoque devolvido no exemplo anterior custava R$ 320. Registre o retorno ao estoque.", accts:["Estoques","CMV","Devolução de vendas","Caixa"], d:["Estoques"], c:["CMV"], e:"O produto volta ao estoque (débito) e o custo que havia ido para o resultado é estornado (crédito em CMV)."},
    {t:"tf", q:"Na devolução de vendas, o estoque também retorna para a empresa.", a:true, e:"Diferente do abatimento, na devolução a mercadoria volta fisicamente."},
    {t:"tf", q:"No abatimento sobre vendas, o cliente devolve a mercadoria e recebe o dinheiro de volta.", a:false, e:"No abatimento o cliente fica com a mercadoria; só o preço é reduzido."},
    {t:"mc", q:"Na DRE, devoluções e abatimentos aparecem:", o:["Deduzindo a receita bruta","Somados ao CMV","Como despesa financeira","Não aparecem na DRE"], a:0, e:"Junto com os impostos sobre vendas, formam as deduções da receita bruta."},
    {t:"mc", q:"Um cliente recebe R$ 80 de desconto por um pequeno defeito, mas fica com o produto. Isso é:", o:["Um abatimento sobre vendas","Uma devolução de vendas","Uma perda de estoque","Uma despesa financeira"], a:0, e:"Não há devolução física da mercadoria: é um abatimento."}
   ]},
  {id:"lanc9", title:"Provisão para devedores duvidosos", icon:"🚨",
   learn:[
    {h:"Nem todo cliente paga", b:`<p>Quando a empresa vende a prazo, sabe, pela experiência, que uma parte dos clientes não vai pagar. Registrar essa expectativa <b>antes</b> que aconteça é aplicar o princípio da <b>prudência</b>.</p>`},
    {h:"A provisão", b:`<p>A <b>Provisão para Devedores Duvidosos (PDD)</b>, também chamada de perdas estimadas em créditos de liquidação duvidosa, é uma conta <b>redutora do Ativo</b> (de Clientes).</p>` +
      lanc([['D','Despesa com devedores duvidosos','2.000'],['C','Provisão para devedores duvidosos','2.000']]) + box('exemplo','Clientes de R$ 100.000, com histórico de 2% de inadimplência: provisão de R$ 2.000.')},
    {h:"No Balanço", b:tbl(['Conta','R$'],[['Clientes','100.000'],['(−) Provisão para devedores duvidosos','(2.000)'],['<b>Clientes, líquido</b>','<b>98.000</b>']]) + `<p>O Ativo já aparece pelo valor que a empresa realisticamente espera receber.</p>`},
    {h:"Quando o cliente não paga mesmo", b:`<p>Se depois um cliente específico realmente não paga, a baixa usa a provisão que já existia, sem gerar uma nova despesa:</p>` + lanc([['D','Provisão para devedores duvidosos','500'],['C','Clientes','500']])}
   ],
   ex:[
    {t:"mc", q:"A Provisão para Devedores Duvidosos existe para aplicar qual princípio?", o:["Prudência","Competência","Entidade","Continuidade"], a:0, e:"Reconhecer a perda provável antes que ela se confirme é prudência."},
    {t:"entry", q:"Constituição da provisão para devedores duvidosos, R$ 2.000, estimada sobre o saldo de Clientes.", accts:["Despesa com devedores duvidosos","Provisão para devedores duvidosos","Clientes","Caixa"], d:["Despesa com devedores duvidosos"], c:["Provisão para devedores duvidosos"], e:"A despesa vai ao resultado; a provisão reduz o Ativo (Clientes)."},
    {t:"num", q:"Saldo de Clientes de R$ 150.000, com 3% estimados como incobráveis. Qual o valor da provisão?", a:4500, u:"R$", e:"150.000 × 3% = 4.500."},
    {t:"mc", q:"No Balanço, a Provisão para Devedores Duvidosos aparece:", o:["Reduzindo o saldo de Clientes","Somada ao Passivo","Como despesa financeira","No Patrimônio Líquido"], a:0, e:"É uma conta redutora do Ativo, junto de Clientes."},
    {t:"tf", q:"Quando um cliente específico não paga e já havia provisão constituída, a baixa gera uma nova despesa.", a:false, e:"A baixa usa a provisão que já existia; a despesa já tinha sido reconhecida antes."},
    {t:"num", q:"Clientes de R$ 80.000 e provisão de R$ 3.000. Qual o valor líquido de Clientes no Balanço?", a:77000, u:"R$", e:"80.000 − 3.000 = 77.000."}
   ]}
  ]
};

