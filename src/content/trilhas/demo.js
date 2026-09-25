import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"demo", title:"Demonstrações Financeiras", icon:"📊", color:"#A87E1F",
  desc:"Balanço Patrimonial, DRE, Fluxo de Caixa e como analisar os números com índices.",
  lessons:[
  {id:"demo1", title:"Balanço Patrimonial", icon:"🏛️",
   learn:[
    {h:"Uma fotografia", b:`<p>O Balanço Patrimonial mostra a posição do patrimônio em <b>uma data</b>, por exemplo 31 de dezembro. Ativo de um lado; Passivo e PL do outro.</p>`},
    {h:"Estrutura do Ativo", b:`<p>Ordenado pela <b>liquidez</b>: do que vira dinheiro mais rápido para o mais lento.</p>` +
      tbl(['Grupo','Exemplos'],[['Ativo Circulante (até 12 meses)','Caixa, bancos, clientes, estoques'],['Realizável a longo prazo','Valores a receber após 12 meses'],['Investimentos','Participações em outras empresas, imóveis para renda'],['Imobilizado','Máquinas, veículos, prédios usados na operação'],['Intangível','Marcas, softwares, patentes']])},
    {h:"Estrutura do Passivo e PL", b:`<p>O Passivo é ordenado pela <b>exigibilidade</b>: o que vence antes vem primeiro.</p>` +
      tbl(['Grupo','Exemplos'],[['Passivo Circulante','Fornecedores, salários, impostos, parcelas do próximo ano'],['Passivo Não Circulante','Financiamentos que vencem após 12 meses'],['Patrimônio Líquido','Capital social, reservas, ações em tesouraria, prejuízos acumulados']])},
    {h:"Um balanço simples", b:tbl(['Ativo','R$','Passivo e PL','R$'],[['Caixa','10.000','Fornecedores','12.000'],['Estoques','15.000','Empréstimo longo prazo','18.000'],['Imobilizado','35.000','Capital social','25.000'],['','','Reservas','5.000'],['<b>Total</b>','<b>60.000</b>','<b>Total</b>','<b>60.000</b>']])}
   ],
   ex:[
    {t:"class", q:"Onde cada item aparece no Balanço?", cats:["Ativo Circ.","Ativo Não Circ.","Passivo Circ.","Passivo Não Circ.","PL"], items:[["Estoques",0],["Máquinas",1],["Fornecedores (30 dias)",2],["Financiamento em 5 anos",3],["Capital social",4],["Marcas e patentes",1],["Clientes (60 dias)",0]], e:"Prazo de até 12 meses define o circulante. Capital social pertence aos sócios (PL)."},
    {t:"mc", q:"Como o Ativo é ordenado no Balanço?", o:["Por liquidez, da maior para a menor","Em ordem alfabética","Pelo valor, do maior para o menor","Pela data de compra"], a:0, e:"Primeiro o que vira dinheiro mais rápido."},
    {t:"tf", q:"O Balanço Patrimonial mostra o desempenho de um período inteiro, como um filme.", a:false, e:"O Balanço é uma fotografia de uma data. Quem mostra o período é a DRE."},
    {t:"mc", q:"Um terreno comprado para construir a sede da empresa é classificado em:", o:["Imobilizado","Investimentos","Estoques","Intangível"], a:0, e:"É usado na operação, por isso é Imobilizado."},
    {t:"mc", q:"E um terreno comprado apenas para alugar ou valorizar?", o:["Investimentos","Imobilizado","Estoques","Caixa"], a:0, e:"Imóveis para renda ou valorização, fora da operação, ficam em Investimentos."},
    {t:"num", q:"Ativo Circulante de R$ 40.000, Ativo Não Circulante de R$ 60.000 e Passivo total de R$ 55.000. Qual o PL?", a:45000, u:"R$", e:"Ativo total 100.000 − Passivo 55.000 = 45.000."}
   ]},
  {id:"demo2", title:"DRE", icon:"🧮",
   learn:[
    {h:"Um filme do período", b:`<p>A <b>Demonstração do Resultado do Exercício (DRE)</b> mostra como a empresa chegou ao lucro ou prejuízo em um período, como um ano ou um trimestre.</p>`},
    {h:"A estrutura, de cima para baixo", b:tbl(['Linha','O que é'],[['Receita bruta','Total vendido'],['(−) Deduções','Devoluções, descontos e impostos sobre vendas'],['(=) Receita líquida',''],['(−) CMV / CPV / CSP','Custo do que foi vendido'],['(=) Lucro bruto',''],['(−) Despesas operacionais','Vendas, administrativas e outras'],['(±) Resultado financeiro','Juros pagos e recebidos'],['(=) Resultado antes do IR e CSLL',''],['(−) IR e CSLL','Tributos sobre o lucro'],['(=) Lucro líquido','']])},
    {h:"Exemplo numérico", b:tbl(['Linha','R$'],[['Receita bruta','100.000'],['(−) Deduções','(10.000)'],['(=) Receita líquida','90.000'],['(−) CMV','(50.000)'],['(=) Lucro bruto','40.000'],['(−) Despesas operacionais','(25.000)'],['(−) Resultado financeiro','(3.000)'],['(=) Antes do IR e CSLL','12.000'],['(−) IR e CSLL','(3.000)'],['<b>(=) Lucro líquido</b>','<b>9.000</b>']]) + `<p>Valores ilustrativos.</p>`},
    {h:"DRE e Balanço conversam", b:`<p>O lucro líquido da DRE vai para o Patrimônio Líquido do Balanço, na forma de reservas ou de dividendos a distribuir. Por isso as demonstrações se conectam.</p>`}
   ],
   ex:[
    {t:"num", q:"Receita bruta de R$ 80.000 e deduções de R$ 8.000. Qual a receita líquida?", a:72000, u:"R$", e:"80.000 − 8.000 = 72.000."},
    {t:"num", q:"Receita líquida de R$ 72.000 e CMV de R$ 40.000. Qual o lucro bruto?", a:32000, u:"R$", e:"72.000 − 40.000 = 32.000."},
    {t:"mc", q:"Onde entram os impostos sobre vendas, como o ICMS?", o:["Deduções da receita bruta","Despesas administrativas","Resultado financeiro","CMV"], a:0, e:"Impostos sobre vendas reduzem a receita bruta para chegar à receita líquida."},
    {t:"tf", q:"Os juros de um empréstimo aparecem no resultado financeiro da DRE.", a:true, e:"Juros pagos e recebidos formam o resultado financeiro."},
    {t:"fill", q:"Receita líquida − ___ = Lucro bruto.", o:["CMV","Imposto de renda","Receita bruta","Dividendos"], a:["CMV"], e:"O lucro bruto considera só o custo do que foi vendido."},
    {t:"mc", q:"A DRE mostra:", o:["O resultado de um período","A posição do patrimônio em uma data","Apenas o saldo de caixa","Apenas o capital dos sócios"], a:0, e:"A DRE é o “filme” do período; o Balanço é a “fotografia”."}
   ]},
  {id:"demo3", title:"Fluxo de Caixa", icon:"💵",
   learn:[
    {h:"Lucro não é caixa", b:`<p>Uma empresa pode ter lucro e ficar sem dinheiro, por exemplo se vende tudo a prazo. A <b>Demonstração dos Fluxos de Caixa (DFC)</b> mostra as entradas e saídas <b>reais</b> de dinheiro.</p>`},
    {h:"As três atividades", b:tbl(['Atividade','Exemplos'],[['Operacionais','Recebimentos de clientes, pagamentos a fornecedores e salários'],['Investimento','Compra e venda de imobilizado, participações em outras empresas'],['Financiamento','Empréstimos obtidos e pagos, aportes de sócios, dividendos pagos']])},
    {h:"Método direto e indireto", b:ul(['<b>Direto</b>: lista os recebimentos e pagamentos das operações.','<b>Indireto</b>: parte do lucro líquido e ajusta o que não mexe no caixa (como a depreciação) e as variações de clientes, estoques e fornecedores.'])},
    {h:"Depreciação no método indireto", b:box('exemplo','Lucro de 10.000 + depreciação de 2.000 = 12.000 de caixa das operações, antes das variações de capital de giro.') + `<p>A depreciação é somada de volta porque reduziu o lucro sem tirar dinheiro do caixa.</p>`}
   ],
   ex:[
    {t:"class", q:"Em que atividade da DFC entra cada item?", cats:["Operacional","Investimento","Financiamento"], items:[["Recebimento de clientes",0],["Compra de máquina",1],["Empréstimo obtido",2],["Pagamento de salários",0],["Pagamento de dividendos",2],["Venda de um veículo da frota",1]], e:"Operacional = dia a dia; Investimento = ativos de longo prazo; Financiamento = sócios e credores."},
    {t:"tf", q:"Uma empresa lucrativa nunca pode ficar sem caixa.", a:false, e:"Lucro é apurado por competência; caixa depende de recebimentos e pagamentos reais."},
    {t:"mc", q:"No método indireto, a depreciação é:", o:["Somada ao lucro líquido","Subtraída do lucro líquido","Ignorada","Tratada como investimento"], a:0, e:"Ela reduziu o lucro sem saída de dinheiro, então volta somando."},
    {t:"num", q:"Lucro líquido de R$ 15.000 e depreciação de R$ 3.000, sem outras variações. Qual o caixa das operações pelo método indireto?", a:18000, u:"R$", e:"15.000 + 3.000 = 18.000."},
    {t:"mc", q:"Um aporte de capital feito pelos sócios, em dinheiro, é atividade de:", o:["Financiamento","Investimento","Operacional","Nenhuma"], a:0, e:"Recursos vindos de sócios ou credores são financiamento."}
   ]},
  {id:"demo4", title:"Análise por índices", icon:"🔎",
   learn:[
    {h:"Liquidez", b:tbl(['Índice','Fórmula'],[['Liquidez corrente','Ativo Circulante ÷ Passivo Circulante'],['Liquidez seca','(Ativo Circulante − Estoques) ÷ Passivo Circulante'],['Liquidez imediata','Disponível ÷ Passivo Circulante']]) + `<p>Acima de 1: há mais recursos de curto prazo do que dívidas de curto prazo.</p>`},
    {h:"Endividamento", b:eq('Endividamento = Passivo total ÷ Ativo total') + `<p>Mostra quanto do Ativo é financiado por dinheiro de terceiros.</p>`},
    {h:"Rentabilidade", b:tbl(['Índice','Fórmula'],[['Margem líquida','Lucro líquido ÷ Receita líquida'],['ROA','Lucro líquido ÷ Ativo total'],['ROE','Lucro líquido ÷ Patrimônio Líquido']])},
    {h:"Vertical e horizontal", b:ul(['<b>Análise vertical</b>: cada item como percentual de uma base, como a receita líquida.','<b>Análise horizontal</b>: a evolução de um item ao longo dos anos.']) +
      box('dica','Um índice isolado diz pouco. Compare com anos anteriores e com empresas do mesmo setor.')}
   ],
   ex:[
    {t:"num", q:"Ativo Circulante de R$ 120.000 e Passivo Circulante de R$ 80.000. Qual a liquidez corrente?", a:1.5, e:"120.000 ÷ 80.000 = 1,5."},
    {t:"num", q:"Ativo Circulante de R$ 120.000, estoques de R$ 50.000 e Passivo Circulante de R$ 80.000. Qual a liquidez seca? (duas casas decimais)", a:0.875, tol:0.006, e:"(120.000 − 50.000) ÷ 80.000 = 0,875, cerca de 0,88."},
    {t:"num", q:"Lucro líquido de R$ 30.000 e receita líquida de R$ 200.000. Qual a margem líquida?", a:15, s:"%", e:"30.000 ÷ 200.000 = 0,15 = 15%."},
    {t:"num", q:"Lucro líquido de R$ 30.000 e PL de R$ 150.000. Qual o ROE?", a:20, s:"%", e:"30.000 ÷ 150.000 = 0,20 = 20%."},
    {t:"mc", q:"Qual índice de liquidez desconsidera os estoques?", o:["Liquidez seca","Liquidez corrente","Liquidez geral","Endividamento"], a:0, e:"A liquidez seca tira os estoques porque eles demoram mais para virar dinheiro."},
    {t:"tf", q:"A análise horizontal compara cada item com o total do mesmo período.", a:false, e:"Isso é a análise vertical. A horizontal compara a evolução de um item entre períodos diferentes."}
   ]},
  {id:"demo5", title:"DMPL, DVA e notas explicativas", icon:"🗒️",
   learn:[
    {h:"O conjunto completo", b:`<p>Além de Balanço, DRE e DFC, o conjunto de demonstrações inclui a <b>DMPL</b>, a <b>DRA</b> (resultado abrangente), a <b>DVA</b> (obrigatória para companhias abertas) e as <b>notas explicativas</b>.</p>`},
    {h:"DMPL", b:`<p>A Demonstração das Mutações do Patrimônio Líquido mostra como cada conta do PL mudou: lucro, dividendos, aumento de capital, reservas.</p>` + tbl(['Movimento','R$'],[['PL inicial','100.000'],['(+) Lucro do ano','30.000'],['(−) Dividendos','(10.000)'],['<b>PL final</b>','<b>120.000</b>']])},
    {h:"Notas explicativas e DVA", b:ul(['<b>Notas explicativas</b>: detalham critérios e números, como políticas contábeis, estoques e processos judiciais.','<b>DVA</b>: mostra a riqueza gerada e como foi distribuída entre empregados, governo, financiadores e sócios.'])}
   ],
   ex:[
    {t:"match", pairs:[["DMPL","Mudanças no Patrimônio Líquido"],["DVA","Riqueza gerada e distribuída"],["Notas explicativas","Detalham critérios e números"],["DFC","Entradas e saídas de caixa"]], e:"Cada demonstração responde a uma pergunta."},
    {t:"mc", q:"Qual demonstração mostra dividendos e aumento de capital dentro do PL?", o:["DMPL","DRE","DFC","DVA"], a:0, e:"A DMPL acompanha todas as contas do PL."},
    {t:"tf", q:"As notas explicativas fazem parte das demonstrações financeiras.", a:true, e:"Sem elas os números perdem contexto."},
    {t:"num", q:"PL inicial de R$ 100.000, lucro de R$ 30.000 e dividendos de R$ 10.000. Qual o PL final?", a:120000, e:"100.000 + 30.000 − 10.000 = 120.000.", u:"R$"},
    {t:"mc", q:"A DVA é obrigatória para:", o:["Companhias abertas","Todo MEI","Nenhuma empresa","Só bancos"], a:0, e:"Companhias abertas publicam a DVA."},
    {t:"wr", q:"Qual a sigla da demonstração das mutações do patrimônio líquido?", a:["dmpl"], e:"DMPL."}
   ]},
  {id:"demo6", title:"Ciclo operacional e financeiro", icon:"🔁",
   learn:[
    {h:"Do estoque ao dinheiro de volta", b:`<p>O <b>ciclo operacional</b> é o tempo entre comprar mercadoria (ou matéria-prima) e receber o dinheiro da venda dela.</p>` + eq('Ciclo operacional = Prazo médio de estoque + Prazo médio de recebimento')},
    {h:"Prazos médios", b:tbl(['Prazo','Fórmula (em dias)'],[['Médio de estoque (PME)','Estoque médio ÷ CMV × 360'],['Médio de recebimento (PMR)','Clientes médio ÷ Receita × 360'],['Médio de pagamento (PMP)','Fornecedores médio ÷ Compras × 360']]) + box('dica','360 é uma convenção comum para simplificar a conta; alguns usam 365.')},
    {h:"O ciclo financeiro", b:`<p>O <b>ciclo financeiro</b> (ou ciclo de caixa) desconta o tempo que a empresa tem para pagar os fornecedores:</p>` + eq('Ciclo financeiro = Ciclo operacional − PMP') +
      box('exemplo','PME de 40 dias + PMR de 30 dias = ciclo operacional de 70 dias. Com PMP de 25 dias, o ciclo financeiro é 70 − 25 = <b>45 dias</b> financiados pela própria empresa.')},
    {h:"Por que isso importa", b:`<p>Quanto <b>maior</b> o ciclo financeiro, mais dinheiro a empresa precisa ter disponível para bancar sua própria operação, antes de o dinheiro do cliente voltar. Reduzir o PME e o PMR, ou negociar um PMP maior, libera caixa.</p>`}
   ],
   ex:[
    {t:"num", q:"Estoque médio de R$ 20.000 e CMV anual de R$ 180.000. Qual o prazo médio de estoque, em dias (base 360)?", a:40, s:"dias", e:"20.000 ÷ 180.000 × 360 = 40 dias."},
    {t:"num", q:"Clientes médio de R$ 15.000 e receita anual de R$ 180.000. Qual o prazo médio de recebimento, em dias (base 360)?", a:30, s:"dias", e:"15.000 ÷ 180.000 × 360 = 30 dias."},
    {t:"num", q:"Com PME de 40 dias e PMR de 30 dias, qual o ciclo operacional?", a:70, s:"dias", e:"40 + 30 = 70 dias."},
    {t:"num", q:"Ciclo operacional de 70 dias e prazo médio de pagamento a fornecedores de 20 dias. Qual o ciclo financeiro?", a:50, s:"dias", e:"70 − 20 = 50 dias que a empresa financia com recursos próprios."},
    {t:"tf", q:"Quanto maior o ciclo financeiro, menos caixa próprio a empresa precisa para bancar a operação.", a:false, e:"É o contrário: um ciclo financeiro maior exige mais caixa próprio, porque a empresa paga antes de receber."},
    {t:"mc", q:"Negociar um prazo maior com os fornecedores tende a:", o:["Reduzir o ciclo financeiro","Aumentar o ciclo financeiro","Não afetar o ciclo financeiro","Aumentar o ciclo operacional"], a:0, e:"Um PMP maior é descontado do ciclo operacional, reduzindo o ciclo financeiro."}
   ]},
  {id:"demo7", title:"Revisão: demonstrações financeiras", icon:"🔄",
   learn:[
    {h:"Quem responde o quê", b:tbl(['Demonstração','Pergunta que responde'],[['Balanço Patrimonial','O que a empresa tem e deve, numa data?'],['DRE','Como ela chegou ao lucro, num período?'],['DFC','Por onde o dinheiro entrou e saiu de verdade?'],['Índices','A situação é boa, comparada a quê?'],['DMPL','O que mudou no Patrimônio Líquido?']])}
   ],
   ex:[
    {t:"mc", q:"Qual demonstração é uma \"fotografia\" de uma data, e não de um período?", o:["Balanço Patrimonial","DRE","DFC","DMPL"], a:0, e:"O Balanço mostra a posição numa data; a DRE e a DFC mostram um período."},
    {t:"num", q:"Receita líquida de R$ 90.000 e CMV de R$ 55.000. Qual o lucro bruto?", a:35000, u:"R$", e:"90.000 − 55.000 = 35.000."},
    {t:"num", q:"Ativo Circulante de R$ 150.000 e Passivo Circulante de R$ 100.000. Qual a liquidez corrente?", a:1.5, e:"150.000 ÷ 100.000 = 1,5."},
    {t:"tf", q:"No método indireto da DFC, a depreciação é subtraída do lucro líquido.", a:false, e:"Ela reduziu o lucro sem tirar dinheiro do caixa. Por isso é somada de volta, e não subtraída."},
    {t:"class", q:"Em que atividade da DFC entra cada item?", cats:["Operacional","Investimento","Financiamento"], items:[["Recebimento de clientes",0],["Compra de uma máquina",1],["Pagamento de dividendos",2]], e:"Operacional é o dia a dia; investimento são ativos de longo prazo; financiamento envolve sócios e credores."},
    {t:"mc", q:"Uma empresa lucrativa pode, ainda assim, ficar sem caixa. Por quê?", o:["O lucro segue a competência, e o caixa depende de recebimentos","Porque a DRE sempre apresenta números que não correspondem à realidade","Porque isso nunca acontece em empresas que dão lucro","Porque o Balanço sempre erra o cálculo do caixa da empresa"], a:0, e:"Vender tudo a prazo, por exemplo, gera lucro contábil sem entrada imediata de caixa."}
   ]}
  ]
};

