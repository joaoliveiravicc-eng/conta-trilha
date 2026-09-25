import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"cust", title:"Custos e Gerencial", icon:"🏭", color:"#6B4C8A",
  desc:"Custos, margem de contribuição, ponto de equilíbrio e orçamento: contabilidade para decidir.",
  lessons:[
  {id:"cust1", title:"Gasto, custo, despesa e investimento", icon:"🧩",
   recap:["Gasto é qualquer sacrifício financeiro; o destino define o nome: investimento, custo, despesa ou perda.", "O custo de produção fica no estoque e vai para a DRE como CPV quando o produto é vendido.", "Custo direto é identificado no produto; o indireto atende vários produtos e precisa de rateio."],
 learn:[
    {h:"Tudo começa com um gasto", b:`<p><b>Gasto</b> é qualquer sacrifício financeiro para obter um bem ou serviço. Dependendo do destino, o gasto recebe um nome diferente.</p>`},
    {h:"Os quatro destinos", b:tbl(['Tipo','O que é','Exemplo'],[['Investimento','Gasto que fica no Ativo','Compra de máquina, estoque de matéria-prima'],['Custo','Gasto para produzir bens ou serviços','Matéria-prima usada, salário da fábrica'],['Despesa','Gasto para vender e administrar','Comissões, salário do escritório'],['Perda','Consumo anormal e involuntário','Estoque destruído em enchente']])},
    {h:"Custo vira despesa na venda", b:`<p>O custo de produção fica guardado no estoque de produtos prontos. Quando o produto é vendido, esse custo vai para a DRE como <b>CPV</b> (custo dos produtos vendidos).</p>`},
    {h:"Diretos e indiretos", b:ul(['<b>Custo direto</b>: identificado no produto sem esforço. Ex: matéria-prima, embalagem.','<b>Custo indireto</b>: atende vários produtos e precisa ser <b>rateado</b>. Ex: aluguel da fábrica, energia geral.'])}
   ],
   ex:[
    {t:"class", q:"Classifique cada gasto", cats:["Custo","Despesa","Investimento","Perda"], items:[["Matéria-prima consumida",0],["Comissão de vendedores",1],["Compra de uma máquina",2],["Estoque destruído em enchente",3],["Salário do operário da fábrica",0],["Aluguel do escritório administrativo",1]], e:"Custo está ligado à produção; despesa, a vender e administrar; investimento fica no Ativo; perda é anormal."},
    {t:"tf", q:"O salário do pessoal administrativo é custo de produção.", a:false, e:"Pessoal administrativo gera despesa, não custo de produção."},
    {t:"mc", q:"O aluguel de uma fábrica que produz vários produtos é um custo:", o:["Indireto","Direto","Sempre variável","Que nunca vai para a DRE"], a:0, e:"Como atende vários produtos, precisa de rateio: é indireto."},
    {t:"mc", q:"Quando o custo de produção aparece na DRE?", o:["Quando o produto é vendido, como CPV","Na compra da matéria-prima, como despesa","Nunca aparece na DRE da empresa","No pagamento ao fornecedor da matéria-prima"], a:0, e:"Até a venda, o custo fica no estoque."},
    {t:"fill", q:"Custos ___ são identificados diretamente no produto; custos ___ exigem rateio.", o:["diretos","indiretos","fixos","perdidos"], a:["diretos","indiretos"], e:"Direto: mede-se no produto. Indireto: precisa de critério de rateio."}
   ]},
  {id:"cust2", title:"Custos fixos e variáveis", icon:"📉",
   recap:["Custos variáveis mudam com o volume; custos fixos não mudam dentro de uma faixa de atividade.", "Quanto mais se produz, menor o custo fixo que cada unidade carrega.", "Custos semivariáveis têm uma parte fixa e outra variável."],
 learn:[
    {h:"Custos variáveis", b:`<p>Variam junto com o volume produzido: matéria-prima, embalagem, comissão por venda. Se a produção é zero, o custo variável é zero.</p>`},
    {h:"Custos fixos", b:`<p>Não mudam com o volume, dentro de uma faixa de atividade: aluguel, salário do gerente, seguro.</p>`},
    {h:"O efeito escala", b:tbl(['Produção','Custo fixo total','Custo fixo por unidade'],[['100 unidades','10.000','100,00'],['1.000 unidades','10.000','10,00']]) + `<p>Quanto mais se produz, menor o custo fixo que cada unidade carrega.</p>`},
    {h:"Semivariáveis", b:`<p>Têm uma parte fixa e uma parte variável. Exemplo: conta de energia com uma taxa mínima mais o consumo.</p>` + box('dica','O custo variável <b>por unidade</b> tende a ser constante. O custo fixo <b>por unidade</b> cai com o volume.')}
   ],
   ex:[
    {t:"class", q:"Fixo ou variável?", cats:["Fixo","Variável"], items:[["Aluguel do galpão",0],["Matéria-prima",1],["Salário do gerente",0],["Comissão de 5% sobre vendas",1],["Seguro anual",0],["Embalagens",1]], e:"Variável acompanha o volume; fixo não."},
    {t:"num", q:"Custo fixo de R$ 20.000 e produção de 4.000 unidades. Qual o custo fixo por unidade?", a:5, u:"R$", e:"20.000 ÷ 4.000 = 5."},
    {t:"tf", q:"O custo variável unitário tende a ser constante, enquanto o total varia com o volume.", a:true, e:"Cada unidade usa a mesma matéria-prima; o total cresce com a quantidade."},
    {t:"num", q:"Custo variável de R$ 8 por unidade e produção de 1.500 unidades. Qual o custo variável total?", a:12000, u:"R$", e:"8 × 1.500 = 12.000."},
    {t:"mc", q:"Se a produção dobrar, o custo fixo total:", o:["Permanece o mesmo, por ser fixo","Dobra junto com a produção","Cai pela metade do valor atual","Zera, porque a produção dobrou"], a:0, e:"O total fixo não muda; o que cai é o custo fixo por unidade."}
   ]},
  {id:"cust3", title:"Margem de contribuição e ponto de equilíbrio", icon:"🎯",
   recap:["Margem de contribuição unitária = preço − custos e despesas variáveis por unidade.", "Ponto de equilíbrio = custos fixos ÷ margem de contribuição unitária: resultado zero.", "Em reais: custos fixos ÷ índice de margem de contribuição."],
 learn:[
    {h:"Margem de contribuição", b:eq('MC unitária = Preço − Custos e despesas variáveis por unidade') + `<p>É quanto cada unidade vendida “contribui” para pagar os custos fixos e, depois, gerar lucro.</p>`},
    {h:"Ponto de equilíbrio", b:eq('PE (unidades) = Custos e despesas fixos ÷ MC unitária') + `<p>Nesse volume, a empresa não tem lucro nem prejuízo: o resultado é zero.</p>`},
    {h:"Exemplo completo", b:box('exemplo','Preço de R$ 50 e custo variável de R$ 30: MC de R$ 20.<br>Custos fixos de R$ 10.000: PE = 10.000 ÷ 20 = <b>500 unidades</b>.<br>Vendendo 700 unidades: 200 acima do PE × R$ 20 = <b>lucro de R$ 4.000</b>.')},
    {h:"Ponto de equilíbrio em reais", b:eq('PE (R$) = Custos fixos ÷ Índice de MC') + `<p>O índice de MC é a MC dividida pelo preço. No exemplo, 20 ÷ 50 = 40%. Então 10.000 ÷ 0,40 = <b>R$ 25.000</b> de vendas.</p>`}
   ],
   ex:[
    {t:"num", q:"Preço de venda de R$ 80 e custo variável de R$ 50 por unidade. Qual a MC unitária?", a:30, u:"R$", e:"80 − 50 = 30."},
    {t:"num", q:"Custos fixos de R$ 30.000 e MC unitária de R$ 30. Qual o ponto de equilíbrio em unidades?", a:1000, e:"30.000 ÷ 30 = 1.000 unidades."},
    {t:"num", q:"Com MC de R$ 30 e custos fixos de R$ 30.000, qual o lucro vendendo 1.300 unidades?", a:9000, u:"R$", e:"1.300 × 30 = 39.000 de MC total − 30.000 = 9.000."},
    {t:"num", q:"Custos fixos de R$ 18.000 e índice de MC de 40%. Qual o ponto de equilíbrio em reais?", a:45000, u:"R$", e:"18.000 ÷ 0,40 = 45.000."},
    {t:"tf", q:"No ponto de equilíbrio, a empresa tem lucro zero.", a:true, e:"A margem de contribuição total é igual aos custos fixos."},
    {t:"mc", q:"Se o preço de venda cai e os custos continuam iguais, o ponto de equilíbrio:", o:["Aumenta","Diminui","Não muda","Zera"], a:0, e:"A MC unitária diminui, então são necessárias mais unidades para cobrir os fixos."}
   ]},
  {id:"cust4", title:"Orçamento e indicadores", icon:"🗓️",
   recap:["O orçamento começa pelas vendas, porque todo o resto depende delas.", "Orçado x realizado: favorável é melhor que o previsto; desfavorável é pior.", "EBITDA, giro do estoque e outros indicadores acompanham o desempenho."],
 learn:[
    {h:"Orçamento", b:`<p>É o plano financeiro para o futuro, geralmente anual. Começa pelo <b>orçamento de vendas</b>, porque todo o resto depende de quanto se espera vender.</p>`},
    {h:"A sequência", b:ol(['Vendas','Produção','Compras e custos','Despesas','Caixa','DRE e Balanço projetados'])},
    {h:"Orçado x realizado", b:`<p>Comparar o previsto com o real mostra onde estão os desvios.</p>` + ul(['<b>Favorável</b>: melhor que o previsto (receita maior ou gasto menor).','<b>Desfavorável</b>: pior que o previsto.']) +
      `<p>O <b>orçamento flexível</b> ajusta os valores esperados ao volume que realmente aconteceu.</p>`},
    {h:"Indicadores gerenciais", b:tbl(['Indicador','O que mostra'],[['EBITDA','Lucro antes de juros, impostos, depreciação e amortização; aproxima a geração de caixa operacional'],['Giro do estoque','CMV ÷ estoque médio: quantas vezes o estoque se renova'],['Prazo médio de recebimento','Quantos dias os clientes levam para pagar']])}
   ],
   ex:[
    {t:"mc", q:"O orçamento empresarial geralmente começa por:", o:["Vendas","Caixa","Balanço projetado","Impostos"], a:0, e:"As vendas esperadas definem produção, compras e despesas."},
    {t:"tf", q:"Uma despesa realizada acima do orçado é uma variação desfavorável.", a:true, e:"Gastar mais que o previsto piora o resultado."},
    {t:"num", q:"Vendas orçadas de R$ 100.000 e realizadas de R$ 92.000. De quanto foi a variação?", a:8000, u:"R$", e:"100.000 − 92.000 = 8.000, uma variação desfavorável."},
    {t:"num", q:"CMV anual de R$ 240.000 e estoque médio de R$ 40.000. Quantas vezes o estoque girou?", a:6, s:"vezes", e:"240.000 ÷ 40.000 = 6."},
    {t:"mc", q:"EBITDA é o lucro antes de:", o:["Juros, impostos, depreciação e amortização","Apenas os impostos sobre o lucro do período","Todos os custos e as despesas da operação","Dividendos e juros sobre o capital próprio"], a:0, e:"Earnings Before Interest, Taxes, Depreciation and Amortization."},
    {t:"mc", q:"Um orçamento flexível:", o:["Ajusta os valores ao volume real de atividade","Nunca muda depois de aprovado pela diretoria","Substitui a DRE no relatório de fim de ano","É feito só uma vez na vida da empresa"], a:0, e:"Ele recalcula o esperado para o volume que de fato ocorreu."}
   ]},
  {id:"cust5", title:"Custeio por absorção x variável", icon:"⚗️",
   recap:["Absorção: todos os custos de produção vão para o produto e ficam no estoque até a venda.", "Variável: só os custos variáveis vão para o produto; o fixo de fábrica vira despesa do período.", "Se a empresa produz mais do que vende, o lucro pela absorção fica maior que pelo variável."],
 learn:[
    {h:"Duas formas de custear o produto", b:`<p>Os dois métodos tratam os <b>custos fixos de fábrica</b> de um jeito diferente.</p>`},
    {h:"Custeio por absorção", b:`<p>Todos os custos de produção — fixos e variáveis — vão para o produto e ficam no estoque até a venda. É o método exigido pela <b>Contabilidade societária e fiscal</b> no Brasil.</p>` + box('exemplo','Custo variável de R$ 10/un + custo fixo de fábrica de R$ 4/un = custo do produto de R$ 14/un.')},
    {h:"Custeio variável (ou direto)", b:`<p>Só os <b>custos variáveis</b> vão para o produto. Os custos fixos de fábrica viram despesa do período <b>inteira</b>, direto na DRE, não importa quanto foi vendido.</p>` + box('exemplo','Mesmo caso: custo do produto de R$ 10/un pelo variável; o custo fixo de fábrica vai inteiro para a DRE do período.') + box('dica','O custeio variável é muito usado internamente, porque facilita calcular a margem de contribuição.')},
    {h:"O efeito no lucro", b:`<p>Quando a empresa <b>produz mais do que vende</b>, uma parte do custo fixo fica “presa” no estoque pelo absorção, e o lucro do período fica maior do que pelo variável. Quando vende tudo o que produz, os dois métodos dão o mesmo lucro.</p>` +
      tbl(['Situação','Absorção x Variável'],[['Produção = Vendas','Lucros iguais'],['Produção > Vendas','Absorção mostra lucro maior'],['Produção < Vendas','Absorção mostra lucro menor']])}
   ],
   ex:[
    {t:"mc", q:"No custeio por absorção, os custos fixos de fábrica:", o:["Vão para o produto e ficam no estoque até a venda","Viram despesa do período inteira, direto na DRE","São ignorados no cálculo do custo dos produtos","Viram receita no mês em que são pagos"], a:0, e:"É a marca registrada do custeio por absorção: nada de fixo fica de fora do produto."},
    {t:"mc", q:"Qual método é exigido pela Contabilidade societária e fiscal no Brasil?", o:["Custeio por absorção","Custeio variável","Os dois, à escolha da empresa","Nenhum dos dois"], a:0, e:"O absorção é o método oficial para fins societários e fiscais."},
    {t:"tf", q:"No custeio variável, os custos fixos de fábrica também entram no custo do produto.", a:false, e:"No variável, só os custos variáveis entram no produto; os fixos vão direto para a DRE do período."},
    {t:"mc", q:"Se a empresa produziu mais do que vendeu no período, o lucro pelo custeio por absorção tende a ser:", o:["Maior do que pelo custeio variável","Menor do que pelo custeio variável","Sempre igual","Impossível calcular"], a:0, e:"Parte do custo fixo fica no estoque que não foi vendido, reduzindo o custo do período."},
    {t:"tf", q:"Quando a empresa vende exatamente tudo o que produziu no período, os dois métodos mostram o mesmo lucro.", a:true, e:"Sem estoque final de produção nova, não há custo fixo retido a mais em um método."},
    {t:"mc", q:"O custeio variável é especialmente útil para calcular:", o:["A margem de contribuição","O valor do ICMS","A depreciação acumulada","O capital social"], a:0, e:"Separar custos variáveis facilita diretamente a conta de margem de contribuição."}
   ]},
  {id:"cust6", title:"Formação de preço de venda", icon:"🏷️",
   recap:["Mark-up divisor: preço = custo ÷ (1 − soma dos percentuais sobre o preço).", "Somar os percentuais ao custo é um erro comum e deixa o lucro abaixo do desejado.", "O preço final também depende do mercado: concorrentes e disposição do cliente a pagar."],
 learn:[
    {h:"Partindo do custo", b:`<p>Uma forma comum de precificar é aplicar um <b>mark-up</b> sobre o custo do produto: um multiplicador que cobre despesas, impostos sobre a venda e a margem de lucro desejada.</p>`},
    {h:"Mark-up divisor", b:eq('Preço de venda = Custo ÷ (1 − soma dos percentuais sobre o preço)') +
      box('exemplo','Custo de R$ 60. Despesas variáveis de 10%, impostos de 15% e lucro desejado de 15% do preço, total 40%.<br>Preço = 60 ÷ (1 − 0,40) = 60 ÷ 0,60 = <b>R$ 100</b>.')},
    {h:"Conferindo o resultado", b:box('exemplo','Vendendo a R$ 100: despesas (10) + impostos (15) + lucro (15) = 40. Sobra 100 − 40 − 60 (custo) = <b>0</b>. A conta fecha, porque os percentuais foram todos calculados sobre o preço de venda.')},
    {h:"Preço não é só matemática", b:`<p>O mark-up dá um ponto de partida, mas o preço final também depende do <b>mercado</b>: o que os concorrentes cobram e quanto o cliente está disposto a pagar. Um preço calculado “certo” pode ser alto demais para vender.</p>` + box('atencao','Cuidado ao confundir margem sobre o <b>custo</b> com margem sobre o <b>preço de venda</b>: são contas diferentes e dão números diferentes.')}
   ],
   ex:[
    {t:"num", q:"Custo de R$ 40. Soma dos percentuais sobre o preço (despesas + impostos + lucro) é 20%. Qual o preço de venda pelo mark-up divisor?", a:50, u:"R$", e:"40 ÷ (1 − 0,20) = 40 ÷ 0,80 = 50."},
    {t:"num", q:"Custo de R$ 90 e soma dos percentuais sobre o preço de 40%. Qual o preço de venda?", a:150, u:"R$", e:"90 ÷ 0,60 = 150."},
    {t:"mc", q:"No mark-up divisor, os percentuais de despesas, impostos e lucro incidem sobre:", o:["O preço de venda","O custo do produto","O lucro líquido total da empresa","O capital social"], a:0, e:"Por isso a fórmula divide o custo por (1 − soma dos percentuais), em vez de multiplicar."},
    {t:"tf", q:"Um preço calculado pelo mark-up sempre garante que o produto vai vender bem no mercado.", a:false, e:"O mark-up é um ponto de partida; a concorrência e a disposição do cliente a pagar também definem o preço."},
    {t:"tf", q:"Margem sobre o custo e margem sobre o preço de venda são a mesma conta.", a:false, e:"São bases diferentes e dão resultados diferentes; é preciso saber qual está sendo usada."}
   ]},
  {id:"cust7", title:"Revisão: custos e gerencial", icon:"🔄",
   recap:["Todo gasto nasce como investimento, custo, despesa ou perda; custos podem ser diretos ou indiretos, fixos ou variáveis.", "Margem de contribuição = preço − custo variável, e o ponto de equilíbrio = fixos ÷ margem.", "Vender acima do ponto de equilíbrio gera lucro."],
 learn:[
    {h:"O caminho do gasto", b:ol(['Todo gasto nasce como <b>investimento</b>, <b>custo</b>, <b>despesa</b> ou <b>perda</b>.','Custos podem ser <b>diretos</b> ou <b>indiretos</b>, e <b>fixos</b> ou <b>variáveis</b>.','A <b>margem de contribuição</b> (preço − custo variável) define o <b>ponto de equilíbrio</b>.','O <b>orçamento</b> parte das vendas esperadas e se desdobra em produção, compras e caixa.'])}
   ],
   ex:[
    {t:"class", q:"Classifique cada gasto", cats:["Custo","Despesa","Investimento"], items:[["Matéria-prima consumida",0],["Comissão de vendas",1],["Compra de uma máquina nova",2],["Salário do supervisor de fábrica",0]], e:"Custo é da produção; despesa é de vender/administrar; investimento fica no Ativo."},
    {t:"num", q:"Preço de venda de R$ 60 e custo variável de R$ 35 por unidade. Qual a margem de contribuição unitária?", a:25, u:"R$", e:"60 − 35 = 25."},
    {t:"num", q:"Custos fixos de R$ 20.000 e margem de contribuição unitária de R$ 25. Qual o ponto de equilíbrio, em unidades?", a:800, e:"20.000 ÷ 25 = 800."},
    {t:"mc", q:"No custeio por absorção, os custos fixos de fábrica:", o:["Vão para o produto e ficam no estoque até a venda","Viram despesa do período inteira, direto na DRE","São ignorados no cálculo do custo dos produtos","Viram receita no mês em que são pagos"], a:0, e:"É a diferença central em relação ao custeio variável."},
    {t:"tf", q:"Se a produção dobra, o custo fixo total também dobra.", a:false, e:"O custo fixo total não muda com o volume; o que cai é o custo fixo por unidade."},
    {t:"num", q:"Custo de R$ 50 e soma dos percentuais sobre o preço de 50%. Qual o preço de venda pelo mark-up divisor?", a:100, u:"R$", e:"50 ÷ (1 − 0,50) = 50 ÷ 0,50 = 100."}
   ]}
  ]
};

