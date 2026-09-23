import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"cust", title:"Custos e Gerencial", icon:"🏭", color:"#6B4C8A",
  desc:"Custos, margem de contribuição, ponto de equilíbrio e orçamento: contabilidade para decidir.",
  lessons:[
  {id:"cust1", title:"Gasto, custo, despesa e investimento", icon:"🧩",
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
    {t:"mc", q:"Quando o custo de produção aparece na DRE?", o:["Quando o produto é vendido, como CPV","Na compra da matéria-prima","Nunca","No pagamento ao fornecedor"], a:0, e:"Até a venda, o custo fica no estoque."},
    {t:"fill", q:"Custos ___ são identificados diretamente no produto; custos ___ exigem rateio.", o:["diretos","indiretos","fixos","perdidos"], a:["diretos","indiretos"], e:"Direto: mede-se no produto. Indireto: precisa de critério de rateio."}
   ]},
  {id:"cust2", title:"Custos fixos e variáveis", icon:"📉",
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
    {t:"mc", q:"Se a produção dobrar, o custo fixo total:", o:["Permanece o mesmo","Dobra","Cai pela metade","Zera"], a:0, e:"O total fixo não muda; o que cai é o custo fixo por unidade."}
   ]},
  {id:"cust3", title:"Margem de contribuição e ponto de equilíbrio", icon:"🎯",
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
    {t:"mc", q:"EBITDA é o lucro antes de:", o:["Juros, impostos, depreciação e amortização","Apenas impostos","Custos e despesas","Dividendos"], a:0, e:"Earnings Before Interest, Taxes, Depreciation and Amortization."},
    {t:"mc", q:"Um orçamento flexível:", o:["Ajusta os valores ao volume real de atividade","Nunca muda","Substitui a DRE","É feito só uma vez na vida da empresa"], a:0, e:"Ele recalcula o esperado para o volume que de fato ocorreu."}
   ]}
  ]
};

