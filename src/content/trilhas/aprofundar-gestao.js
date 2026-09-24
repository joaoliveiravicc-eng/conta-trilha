/* Unidade "Aprofundando" das trilhas Demonstrações, Custos, Tributos, Auditoria e Vida. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Demonstrações Financeiras ---------------- */
{id:"demox1", title:"A DRE linha a linha", icon:"🪜",
 learn:[
  {h:"De cima para baixo", b:tbl(['Linha','Exemplo'],[['Receita bruta','100.000'],['(−) Deduções (devoluções, tributos sobre vendas)','(15.000)'],['= Receita líquida','85.000'],['(−) CMV','(45.000)'],['= Lucro bruto','40.000'],['(−) Despesas operacionais','(22.000)'],['= Resultado antes dos tributos sobre o lucro','18.000'],['(−) Tributos sobre o lucro','(4.000)'],['= Lucro líquido','14.000']])},
  {h:"O que cada degrau mostra", b:ul(['<b>Lucro bruto</b>: quanto sobra da venda depois do custo do que foi vendido.','<b>Despesas operacionais</b>: vender, administrar, financiar.','<b>Lucro líquido</b>: o que sobra para os sócios.'])}
 ],
 ex:[
  nu("Receita bruta 200.000; deduções 30.000. Qual a receita líquida?",170000,"200.000 − 30.000 = 170.000.","R$"),
  nu("Receita líquida 170.000; CMV 90.000. Qual o lucro bruto?",80000,"170.000 − 90.000 = 80.000.","R$"),
  nu("Lucro bruto 80.000; despesas operacionais 50.000; tributos sobre o lucro 7.000. Lucro líquido?",23000,"80.000 − 50.000 − 7.000 = 23.000.","R$"),
  od("Ordene as linhas da DRE:",["Receita bruta","Receita líquida","Lucro bruto","Resultado antes dos tributos sobre o lucro","Lucro líquido"],"Das vendas até o que sobra."),
  mc("Devoluções de vendas aparecem na DRE como:",["*Dedução da receita bruta","Despesa administrativa","CMV","Receita financeira"],"Reduzem a receita."),
  tf("Lucro bruto já considera as despesas administrativas.",false,"Lucro bruto = receita líquida − custo das vendas.")
 ]},
{id:"demox2", title:"Margens", icon:"📐",
 learn:[
  {h:"Lucro em relação às vendas", b:eq('Margem bruta = Lucro bruto ÷ Receita líquida') + eq('Margem líquida = Lucro líquido ÷ Receita líquida')},
  {h:"Lendo as margens", b:box('exemplo','Receita líquida 500.000, lucro bruto 200.000, lucro líquido 50.000: margem bruta 40%, margem líquida 10%. De cada R$ 100 vendidos, sobram R$ 10 de lucro.') + box('dica','Compare margens com anos anteriores e com empresas do mesmo setor. Setores diferentes têm margens naturalmente diferentes.')}
 ],
 ex:[
  nu("Lucro bruto 60.000 e receita líquida 200.000. Margem bruta em %?",30,"60.000 ÷ 200.000 = 30%.","%"),
  nu("Lucro líquido 18.000 e receita líquida 240.000. Margem líquida em %?",7.5,"18.000 ÷ 240.000 = 7,5%.","%"),
  tf("Margem líquida de 10% significa R$ 10 de lucro a cada R$ 100 vendidos.",true,"É a leitura da margem."),
  mc("A margem bruta caiu, mas as vendas subiram. Uma possível causa é:",["*O custo das mercadorias subiu mais que o preço","As despesas administrativas caíram","O lucro líquido subiu","Nenhuma"],"Margem bruta depende de preço e custo."),
  nu("Receita líquida 400.000 com margem líquida de 5%. Qual o lucro líquido?",20000,"5% de 400.000 = 20.000.","R$"),
  fl("Margem líquida = lucro líquido ÷ {receita líquida}.",["ativo total","patrimônio líquido"],"Lucro sobre vendas.")
 ]},
{id:"demox3", title:"Capital circulante líquido", icon:"🌊",
 learn:[
  {h:"Folga de curto prazo", b:eq('CCL = Ativo circulante − Passivo circulante') + `<p>CCL positivo indica que os recursos de curto prazo cobrem as dívidas de curto prazo, com sobra.</p>`},
  {h:"Liquidez seca", b:eq('Liquidez seca = (Ativo circulante − Estoques) ÷ Passivo circulante') + box('dica','Tira os estoques porque eles ainda precisam ser vendidos para virar dinheiro.')}
 ],
 ex:[
  nu("Ativo circulante 150.000 e passivo circulante 100.000. Qual o CCL?",50000,"150.000 − 100.000 = 50.000.","R$"),
  nu("AC 150.000, estoques 60.000, PC 100.000. Qual a liquidez seca?",0.9,"(150.000 − 60.000) ÷ 100.000 = 0,9.","",undefined,0.005),
  tf("A liquidez seca desconsidera os estoques.",true,"Estoque ainda precisa ser vendido."),
  mc("CCL negativo indica que:",["*As dívidas de curto prazo superam os recursos de curto prazo","A empresa tem prejuízo com certeza","O estoque é zero","O patrimônio líquido é negativo"],"Aperto de liquidez, não necessariamente prejuízo."),
  mc("Uma loja com muito estoque tem liquidez corrente 1,5 e seca 0,6. Isso indica:",["*Depende de vender o estoque para pagar as dívidas de curto prazo","Liquidez perfeita","Que o estoque não existe","Que não tem dívidas"],"Sem o estoque, os recursos não cobrem o passivo circulante."),
  fl("CCL = ativo circulante − {passivo circulante}.",["patrimônio líquido","passivo não circulante"],"Folga de curto prazo.")
 ]},
{id:"demox4", title:"Retorno sobre o patrimônio", icon:"💹",
 learn:[
  {h:"ROE", b:eq('ROE = Lucro líquido ÷ Patrimônio líquido') + `<p>Mostra quanto a empresa gerou de lucro para cada real investido pelos sócios.</p>`},
  {h:"ROA", b:eq('ROA = Lucro líquido ÷ Ativo total') + box('exemplo','Lucro 30.000, PL 200.000, Ativo 500.000: ROE 15%, ROA 6%.') + box('dica','Compare o ROE com o que os sócios ganhariam em outra aplicação de risco parecido.')}
 ],
 ex:[
  nu("Lucro líquido 40.000 e patrimônio líquido 250.000. ROE em %?",16,"40.000 ÷ 250.000 = 16%.","%"),
  nu("Lucro líquido 40.000 e ativo total 800.000. ROA em %?",5,"40.000 ÷ 800.000 = 5%.","%"),
  mt([["ROE","Lucro ÷ Patrimônio líquido"],["ROA","Lucro ÷ Ativo total"],["Margem líquida","Lucro ÷ Receita líquida"],["Liquidez corrente","AC ÷ PC"]],"Cada índice, sua fórmula."),
  tf("O ROE mostra o retorno sobre o capital dos sócios.",true,"PL é o capital dos sócios."),
  mc("Lucro igual em duas empresas, mas a empresa A tem PL menor. Então:",["*O ROE de A é maior","O ROE de A é menor","Os ROEs são iguais","Não dá para saber nada"],"Mesmo lucro sobre base menor."),
  fl("ROA = lucro líquido ÷ {ativo total}.",["receita","passivo"],"Retorno sobre os ativos.")
 ]},

/* ---------------- Custos e Gerencial ---------------- */
{id:"custx1", title:"Diretos, indiretos e rateio", icon:"🧮",
 learn:[
  {h:"Dá para medir por produto?", b:tbl(['Tipo','Característica','Exemplo'],[['Direto','Medido diretamente em cada produto','Matéria-prima, mão de obra do produto'],['Indireto','Comum a vários produtos','Aluguel da fábrica, supervisão, energia geral']])},
  {h:"Rateio", b:`<p>Custos indiretos são distribuídos aos produtos por um critério: horas-máquina, horas de mão de obra, área.</p>` + box('exemplo','Aluguel da fábrica R$ 10.000. Produto A usa 300 horas-máquina, B usa 200. A recebe 3/5 = R$ 6.000; B recebe R$ 4.000.')}
 ],
 ex:[
  cl("Direto ou indireto?",["Direto","Indireto"],"Tecido usado na camisa:0|Aluguel da fábrica:1|Salário do supervisor geral:1|Botões da camisa:0|Seguro do prédio fabril:1","Dá para medir por unidade?"),
  nu("Custos indiretos de R$ 8.000 rateados por horas: X usou 150 h e Y 250 h. Quanto vai para X?",3000,"150 ÷ 400 = 37,5%; 37,5% de 8.000 = 3.000.","R$"),
  tf("Custos indiretos precisam de um critério de rateio para chegar aos produtos.",true,"Não dá para medir direto."),
  mc("Um bom critério de rateio é aquele que:",["*Tem relação com o consumo do recurso","É sempre dividido igualmente","É escolhido ao acaso","Considera só o preço de venda"],"O critério deve refletir o uso."),
  nu("Energia da fábrica R$ 12.000 rateada por área: produção A 600 m², B 400 m². Quanto vai para B?",4800,"400 ÷ 1.000 = 40%; 40% de 12.000 = 4.800.","R$"),
  fl("Custos comuns a vários produtos são custos {indiretos}.",["diretos","variáveis"],"Precisam de rateio.")
 ]},
{id:"custx2", title:"Margem de segurança", icon:"🛟",
 learn:[
  {h:"Quanto as vendas podem cair", b:eq('Margem de segurança = Vendas atuais − Vendas no ponto de equilíbrio') + `<p>Mostra a folga antes de a empresa começar a ter prejuízo.</p>`},
  {h:"Em percentual", b:eq('MS % = (Vendas atuais − Vendas no PE) ÷ Vendas atuais') + box('exemplo','Vende 1.000 unidades; ponto de equilíbrio em 750. Margem de segurança: 250 unidades, ou 25%.')}
 ],
 ex:[
  nu("Vendas de 2.000 unidades e ponto de equilíbrio em 1.500. Margem de segurança em unidades?",500,"2.000 − 1.500 = 500.","unidades"),
  nu("No caso anterior, qual a margem de segurança em %?",25,"500 ÷ 2.000 = 25%.","%"),
  tf("Quanto maior a margem de segurança, mais as vendas podem cair antes do prejuízo.",true,"É a folga da operação."),
  nu("Custos fixos de R$ 30.000 e margem de contribuição de R$ 20 por unidade. Qual o ponto de equilíbrio em unidades?",1500,"30.000 ÷ 20 = 1.500.","unidades"),
  mc("Vendas abaixo do ponto de equilíbrio significam:",["*Prejuízo","Lucro","Resultado zero sempre","Margem de segurança positiva"],"Não cobrem os custos fixos."),
  fl("Margem de segurança = vendas atuais − vendas no {ponto de equilíbrio}.",["mês anterior","orçamento"],"Folga até o resultado zero.")
 ]},
{id:"custx3", title:"Alavancagem operacional", icon:"🏋️",
 learn:[
  {h:"Custos fixos amplificam", b:`<p>Com custos fixos altos, uma variação nas vendas causa uma variação <b>maior</b> no lucro, para cima e para baixo.</p>` + eq('GAO = Margem de contribuição total ÷ Lucro operacional')},
  {h:"Exemplo", b:box('exemplo','Margem de contribuição 100.000; custos fixos 80.000; lucro 20.000. GAO = 5. Se as vendas subirem 10%, o lucro tende a subir cerca de 50%. Se caírem 10%, cai cerca de 50%.')}
 ],
 ex:[
  nu("Margem de contribuição total 60.000 e lucro operacional 15.000. Qual o grau de alavancagem operacional?",4,"60.000 ÷ 15.000 = 4.","vezes"),
  nu("GAO de 4 e vendas subindo 5%. Em quantos % o lucro tende a subir?",20,"4 × 5% = 20%.","%"),
  tf("A alavancagem operacional amplifica também as quedas de vendas.",true,"Funciona nos dois sentidos."),
  mc("Qual empresa tende a ter maior alavancagem operacional?",["*A que tem custos fixos altos em relação aos variáveis","A que só tem custos variáveis","A que não tem vendas","Todas iguais"],"Custo fixo é a 'alavanca'."),
  nu("MC 100.000 e custos fixos 75.000. Qual o GAO?",4,"Lucro = 25.000; 100.000 ÷ 25.000 = 4.","vezes"),
  fl("GAO = margem de contribuição total ÷ {lucro operacional}.",["custo fixo","receita"],"Sensibilidade do lucro às vendas.")
 ]},
{id:"custx4", title:"Custo-padrão", icon:"📏",
 learn:[
  {h:"Quanto deveria custar", b:`<p>O <b>custo-padrão</b> é uma meta: quanto um produto deveria custar em condições normais. Depois, compara-se com o <b>custo real</b>.</p>` + eq('Variação = Custo real − Custo-padrão')},
  {h:"Lendo a variação", b:tbl(['Situação','Leitura'],[['Real maior que o padrão','Variação desfavorável: investigar'],['Real menor que o padrão','Variação favorável']]) + box('exemplo','Padrão: 2 kg de farinha por bolo a R$ 5/kg = R$ 10. Real: 2,2 kg a R$ 5/kg = R$ 11. Variação desfavorável de R$ 1 por bolo, causada pela quantidade.')}
 ],
 ex:[
  nu("Custo-padrão R$ 50 por unidade; custo real R$ 56. Variação por unidade?",6,"56 − 50 = 6 (desfavorável).","R$"),
  mc("Custo real abaixo do padrão indica variação:",["*Favorável","Desfavorável","Nula","Impossível"],"Gastou menos que o previsto."),
  nu("Padrão: 3 horas por peça a R$ 20/hora. Qual o custo-padrão de mão de obra por peça?",60,"3 × 20 = 60.","R$"),
  tf("O custo-padrão serve para controlar e investigar desvios.",true,"É uma referência de desempenho."),
  nu("Padrão de 2 kg por unidade a R$ 8/kg. Real: 2,5 kg a R$ 8/kg. Variação de quantidade por unidade?",4,"0,5 kg × 8 = 4 (desfavorável).","R$"),
  fl("Quando o custo real supera o padrão, a variação é {desfavorável}.",["favorável","neutra"],"Gastou mais que o previsto.")
 ]},

/* ---------------- Tributos no Brasil ---------------- */
{id:"tribx1", title:"Os elementos de um tributo", icon:"🧱",
 learn:[
  {h:"As peças", b:tbl(['Elemento','Pergunta que responde'],[['Fato gerador','O que faz o tributo ser devido?'],['Contribuinte','Quem deve pagar?'],['Base de cálculo','Sobre qual valor?'],['Alíquota','Qual percentual (ou valor) aplicar?']])},
  {h:"Exemplo didático", b:box('exemplo','Tributo fictício de 10% sobre vendas. Fato gerador: a venda. Contribuinte: quem vende. Base: R$ 5.000 de vendas. Alíquota: 10%. Valor devido: R$ 500.') + box('atencao','As alíquotas desta lição são fictícias. Alíquotas reais variam por tributo, local e regime e mudam com a legislação.')}
 ],
 ex:[
  mt([["Fato gerador","O que torna o tributo devido"],["Contribuinte","Quem deve pagar"],["Base de cálculo","Valor sobre o qual se aplica o percentual"],["Alíquota","Percentual aplicado"]],"As quatro peças básicas."),
  nu("Tributo fictício de 8% sobre uma base de R$ 12.500. Valor devido?",1000,"8% de 12.500 = 1.000.","R$"),
  nu("Tributo fictício devido de R$ 900 sobre base de R$ 6.000. Qual a alíquota em %?",15,"900 ÷ 6.000 = 15%.","%"),
  mc("Num tributo sobre a propriedade de veículo, o fato gerador é:",["*Ser proprietário do veículo","Dirigir o veículo","Vender o veículo","Abastecer"],"A situação prevista em lei é a propriedade."),
  tf("A base de cálculo é o percentual aplicado.",false,"O percentual é a alíquota; a base é o valor."),
  fl("A situação prevista em lei que faz o tributo ser devido é o {fato gerador}.",["contribuinte","recibo"],"Sem fato gerador, não há tributo.")
 ]},
{id:"tribx2", title:"Obrigação principal e acessória", icon:"📑",
 learn:[
  {h:"Pagar e informar", b:tbl(['Obrigação','O que é','Exemplo'],[['Principal','Pagar o tributo ou a multa','Recolher a guia'],['Acessória','Fazer ou prestar algo para o controle do fisco','Emitir nota, entregar declarações, escriturar livros']])},
  {h:"As duas importam", b:`<p>Mesmo sem tributo a pagar, a empresa pode ter declarações a entregar. Deixar de cumprir uma obrigação acessória pode gerar multa.</p>`}
 ],
 ex:[
  cl("Principal ou acessória?",["Principal","Acessória"],"Pagar a guia do tributo:0|Emitir nota fiscal:1|Entregar declaração ao fisco:1|Pagar multa por atraso:0|Manter a escrituração:1","Pagar é principal; informar e registrar são acessórias."),
  tf("Uma empresa sem tributo a pagar no mês nunca tem obrigações acessórias.",false,"Declarações podem ser exigidas mesmo assim."),
  mc("Não entregar uma declaração obrigatória no prazo pode gerar:",["*Multa","Crédito tributário a favor da empresa","Nada","Receita"],"O descumprimento é penalizado."),
  fl("Emitir notas e entregar declarações são obrigações {acessórias}.",["principais","opcionais"],"Servem ao controle do fisco."),
  tf("A multa em dinheiro, depois de aplicada, passa a ser obrigação principal.",true,"Envolve pagamento."),
  mc("Para que servem as obrigações acessórias?",["*Permitir ao fisco controlar e verificar as operações","Aumentar o lucro","Substituir o pagamento","Nada"],"Informação para fiscalização.")
 ]},
{id:"tribx3", title:"Crédito e não cumulatividade", icon:"🔁",
 learn:[
  {h:"Tributo em cascata x com crédito", b:`<p>Num tributo <b>cumulativo</b>, ele incide em cada etapa sobre o valor total, e o que foi pago antes não é descontado. Num <b>não cumulativo</b>, quem compra pode abater o tributo pago na etapa anterior (o <b>crédito</b>).</p>`},
  {h:"Exemplo com alíquota fictícia de 10%", b:tbl(['Etapa','Venda','Tributo na venda','Crédito da compra','A recolher'],[['Indústria','1.000','100','0','100'],['Loja','1.500','150','100','50']]) + box('dica','Com crédito, cada etapa paga sobre o valor que acrescentou.')}
 ],
 ex:[
  nu("Alíquota fictícia de 10%, não cumulativa. A loja comprou por 2.000 e vendeu por 3.000. Quanto recolhe?",100,"Débito 300 − crédito 200 = 100.","R$"),
  nu("Mesmo caso, mas cumulativo (sem crédito). Quanto a loja recolhe?",300,"10% de 3.000, sem abater nada.","R$"),
  tf("Na não cumulatividade, o tributo pago na compra pode virar crédito para abater o da venda.",true,"Essa é a ideia."),
  mc("O efeito 'cascata' é típico de tributos:",["*Cumulativos","Não cumulativos","Sobre o lucro","Sobre a propriedade"],"Imposto sobre imposto em cada etapa."),
  nu("Alíquota fictícia 20%, não cumulativa. Compra de 500, venda de 800. Valor a recolher?",60,"160 − 100 = 60.","R$"),
  fl("O valor pago na etapa anterior que pode ser abatido chama-se {crédito}.",["débito","multa"],"Base da não cumulatividade.")
 ]},
{id:"tribx4", title:"Tributos sobre vendas e sobre o lucro", icon:"📊",
 learn:[
  {h:"Onde aparecem na DRE", b:tbl(['Tipo','Incide sobre','Posição na DRE'],[['Tributos sobre vendas','A receita das vendas','Deduções da receita bruta'],['Tributos sobre o lucro','O resultado','Depois do resultado antes dos tributos']])},
  {h:"Diferença prática", b:`<p>Tributos sobre vendas existem mesmo com prejuízo, pois incidem sobre a receita. Tributos sobre o lucro, em regra, dependem de haver lucro tributável.</p>` + box('atencao','Regras de apuração e alíquotas reais dependem do regime tributário e mudam com a legislação.')}
 ],
 ex:[
  cl("Onde entra na DRE?",["Dedução da receita","Após o resultado antes dos tributos"],"Tributo sobre a venda de mercadorias:0|Tributo sobre o lucro:1|Tributo sobre serviços prestados:0","Sobre a venda: dedução. Sobre o lucro: no fim."),
  tf("Uma empresa com prejuízo pode ainda assim ter tributos sobre vendas.",true,"Eles incidem sobre a receita."),
  nu("Receita bruta 100.000 e tributos sobre vendas de 9.250. Receita líquida?",90750,"100.000 − 9.250 = 90.750.","R$"),
  mc("Tributos sobre o lucro são calculados sobre:",["*O resultado tributável","A receita bruta","O estoque","O ativo"],"Dependem do resultado."),
  od("Ordene na DRE:",["Receita bruta","Tributos sobre vendas","Receita líquida","Resultado antes dos tributos sobre o lucro","Tributos sobre o lucro","Lucro líquido"],"Venda primeiro, lucro no fim."),
  fl("Tributos sobre vendas aparecem como {deduções} da receita bruta.",["despesas financeiras","ativos"],"Reduzem a receita.")
 ]},

/* ---------------- Auditoria ---------------- */
{id:"audx1", title:"Materialidade", icon:"🔎",
 learn:[
  {h:"O que é relevante", b:`<p>Uma distorção é <b>material</b> quando, sozinha ou somada a outras, poderia mudar a decisão de quem usa as demonstrações.</p>` + box('exemplo','Erro de R$ 500 numa empresa que fatura R$ 50 milhões dificilmente muda decisões. O mesmo erro numa empresa que fatura R$ 20 mil pode mudar.')},
  {h:"Valor e natureza", b:ul(['Pelo <b>valor</b>: o tamanho em relação ao todo.','Pela <b>natureza</b>: um erro pequeno pode ser material se envolver fraude ou quebra de contrato.'])}
 ],
 ex:[
  tf("Uma distorção pequena em valor nunca é material.",false,"Pela natureza (ex.: fraude), pode ser."),
  mc("Materialidade é definida pensando em:",["*Quem usa as demonstrações e suas decisões","O gosto do auditor","O tamanho do escritório","O número de funcionários"],"O foco é a decisão do usuário."),
  cl("Tende a ser material?",["Sim","Não"],"Erro de R$ 2 milhões em lucro de R$ 3 milhões:0|Diferença de R$ 3 num balanço de R$ 10 milhões:1|Pagamento pequeno, mas desviado pelo diretor:0|Arredondamento de centavos:1","Valor relativo e natureza."),
  fl("Distorção que pode mudar a decisão do usuário é {material}.",["imaterial","contábil"],"Conceito de materialidade."),
  tf("Várias distorções pequenas somadas podem ser materiais.",true,"Considera-se o conjunto."),
  mc("Um erro de R$ 50 mil numa empresa com lucro de R$ 60 mil é, provavelmente:",["*Material","Irrelevante","Impossível","Uma receita"],"Representa quase todo o lucro.")
 ]},
{id:"audx2", title:"Amostragem", icon:"🎲",
 learn:[
  {h:"Não dá para ver tudo", b:`<p>Com milhares de documentos, o auditor examina uma <b>amostra</b> e usa o resultado para concluir sobre o conjunto.</p>` + ul(['<b>Aleatória</b>: todos têm chance de ser escolhidos.','<b>Por valor</b>: itens grandes têm mais chance.','<b>Itens-chave</b>: examina 100% dos itens acima de um valor.'])},
  {h:"Cuidados", b:box('atencao','Se a amostra só pega o que é fácil, a conclusão fica distorcida. A escolha precisa representar a população.')}
 ],
 ex:[
  tf("Na auditoria, é comum examinar uma amostra em vez de 100% dos itens.",true,"Por eficiência, com critério."),
  mc("Uma amostra aleatória é aquela em que:",["*Cada item tem chance de ser escolhido","Só os itens grandes entram","O cliente escolhe","Só os mais recentes entram"],"Evita viés de seleção."),
  mc("O auditor decide examinar todos os pagamentos acima de R$ 100 mil. Isso é:",["*Seleção de itens-chave","Amostra aleatória","Erro","Materialidade"],"Itens relevantes vistos por completo."),
  nu("Numa amostra de 50 notas, 2 tinham erro. Qual a taxa de erro da amostra em %?",4,"2 ÷ 50 = 4%.","%"),
  tf("Deixar o cliente escolher a amostra é uma boa prática.",false,"Compromete a independência e a representatividade."),
  fl("A amostra precisa {representar} a população para a conclusão valer.",["ignorar","substituir"],"Senão a conclusão é enviesada.")
 ]},
{id:"audx3", title:"Tipos de opinião", icon:"📝",
 learn:[
  {h:"O que o auditor pode dizer", b:tbl(['Opinião','Quando'],[['Sem ressalva (não modificada)','Demonstrações apresentadas adequadamente'],['Com ressalva','Distorção material, mas não generalizada'],['Adversa','Distorção material e generalizada'],['Abstenção','Não obteve evidência suficiente, com efeito possivelmente generalizado']])},
  {h:"Leitura rápida", b:box('dica','Pense em duas perguntas: o problema é material? Ele se espalha pelas demonstrações todas? As respostas levam ao tipo de opinião.')}
 ],
 ex:[
  mt([["Sem ressalva","Tudo adequado em todos os aspectos relevantes"],["Com ressalva","Problema material, mas localizado"],["Adversa","Problema material e generalizado"],["Abstenção","Faltou evidência para opinar"]],"Os quatro desfechos."),
  mc("O auditor não conseguiu acesso aos registros principais da empresa. Provável opinião:",["*Abstenção de opinião","Sem ressalva","Com ressalva","Adversa"],"Falta de evidência generalizada."),
  mc("Estoques estão superavaliados em valor material, e o resto das demonstrações está adequado. Opinião:",["*Com ressalva","Adversa","Abstenção","Sem ressalva"],"Material, mas localizado."),
  tf("Opinião adversa indica que as demonstrações, no conjunto, não estão adequadas.",true,"Distorção material e generalizada."),
  tf("Opinião sem ressalva garante que não existe nenhum erro nas demonstrações.",false,"É segurança razoável, não absoluta."),
  fl("Quando a distorção é material e generalizada, a opinião é {adversa}.",["com ressalva","sem ressalva"],"O conjunto está distorcido.")
 ]},
{id:"audx4", title:"Independência e ética", icon:"⚖️",
 learn:[
  {h:"Por que independência importa", b:`<p>A opinião do auditor só tem valor se ele for <b>independente</b> da empresa auditada, de fato e na aparência.</p>` + ul(['Não ter participação financeira relevante no cliente.','Não auditar o próprio trabalho (ex.: ter feito a contabilidade que vai auditar).','Não depender excessivamente de honorários de um único cliente.'])},
  {h:"Ceticismo profissional", b:`<p>Atitude de questionar, ficar alerta a sinais de erro ou fraude e avaliar criticamente a evidência, sem supor desonestidade nem honestidade absoluta.</p>`}
 ],
 ex:[
  tf("Um auditor que tem ações relevantes da empresa auditada mantém a independência.",false,"Interesse financeiro ameaça a independência."),
  cl("Ameaça à independência?",["Ameaça","Não ameaça"],"Auditar a contabilidade que ele mesmo fez:0|Cônjuge ser diretor financeiro do cliente:0|Receber honorários contratados normais:1|Ter ações relevantes do cliente:0|Seguir as normas de auditoria:1","Interesse, autorrevisão e laços pessoais são ameaças."),
  mc("Ceticismo profissional significa:",["*Questionar e avaliar criticamente a evidência","Desconfiar de tudo e de todos","Acreditar em tudo o que o cliente diz","Não fazer perguntas"],"Postura crítica e alerta."),
  fl("A opinião do auditor só tem valor se ele for {independente}.",["amigo do cliente","sócio do cliente"],"De fato e na aparência."),
  tf("Independência 'na aparência' importa porque terceiros precisam confiar no trabalho.",true,"A confiança dos usuários depende disso."),
  mc("Um único cliente paga quase todos os honorários do auditor. Isso é:",["*Uma ameaça de dependência","Irrelevante","Obrigatório","Uma boa prática"],"Pode pressionar a opinião.")
 ]},

/* ---------------- Contabilidade para a Vida ---------------- */
{id:"vidax1", title:"Inflação e poder de compra", icon:"🛒",
 learn:[
  {h:"O dinheiro compra menos", b:`<p><b>Inflação</b> é o aumento geral dos preços. Se os preços sobem 5% no ano, R$ 100 compram menos do que antes.</p>` + box('exemplo','Uma cesta custava R$ 200. Com 5% de inflação, passa a custar R$ 210.')},
  {h:"Ganho real", b:`<p>Se o dinheiro rendeu 8% e a inflação foi 5%, o ganho real foi de aproximadamente <b>3%</b>. Render menos que a inflação é perder poder de compra.</p>` + eq('Ganho real ≈ Rendimento − Inflação')}
 ],
 ex:[
  nu("Produto de R$ 400 com inflação de 5% no ano. Novo preço?",420,"400 × 1,05 = 420.","R$"),
  nu("Aplicação rendeu 9% e a inflação foi 4%. Ganho real aproximado em %?",5,"9 − 4 ≈ 5%.","%"),
  tf("Deixar dinheiro parado sem render, com inflação positiva, reduz o poder de compra.",true,"Os preços sobem e o dinheiro não."),
  mc("Rendimento de 3% com inflação de 5% significa:",["*Perda de poder de compra","Ganho real","Nada muda","Lucro garantido"],"Rendeu menos que os preços subiram."),
  fl("Aumento geral dos preços chama-se {inflação}.",["deflação","juros"],"O dinheiro compra menos."),
  mc("Salário subiu 4% e a inflação foi 6%. O poder de compra:",["*Caiu","Subiu","Ficou igual","Dobrou"],"Os preços subiram mais que o salário.")
 ]},
{id:"vidax2", title:"Cartão de crédito sem susto", icon:"💳",
 learn:[
  {h:"Como a fatura funciona", b:ul(['<b>Fechamento</b>: data em que a fatura é calculada.','<b>Vencimento</b>: data de pagamento.','<b>Pagamento mínimo</b>: pagar só uma parte e o resto vai para o <b>rotativo</b>, com juros altos.'])},
  {h:"Regra prática", b:box('regra','Pague a fatura inteira. Se não der, é comum que um empréstimo pessoal ou parcelamento da fatura tenha juros menores que o rotativo; compare o custo total antes.') + box('dica','Compras parceladas comprometem as próximas faturas. Some as parcelas futuras antes de comprar.')}
 ],
 ex:[
  tf("Pagar só o mínimo da fatura evita juros.",false,"O restante vai para o rotativo, com juros."),
  nu("Três compras parceladas: R$ 120, R$ 80 e R$ 200 por mês. Quanto já está comprometido na próxima fatura?",400,"120 + 80 + 200 = 400.","R$"),
  mc("Qual a melhor forma de usar o cartão?",["*Pagar a fatura inteira no vencimento","Pagar sempre o mínimo","Atrasar e pagar depois","Usar o limite todo todo mês"],"Evita juros."),
  mt([["Fechamento","Data em que a fatura é calculada"],["Vencimento","Data de pagamento"],["Rotativo","Saldo não pago que gera juros"],["Limite","Valor máximo que pode ser gasto"]],"Termos da fatura."),
  nu("Renda de R$ 3.000; fatura com R$ 1.200 em parcelas. Que % da renda já está comprometido?",40,"1.200 ÷ 3.000 = 40%.","%"),
  fl("O saldo da fatura que não foi pago e gera juros vai para o {rotativo}.",["limite","fechamento"],"Uma das dívidas mais caras.")
 ]},
{id:"vidax3", title:"Metas financeiras", icon:"🎯",
 learn:[
  {h:"Metas com prazo e valor", b:tbl(['Prazo','Exemplo'],[['Curto (até 1 ano)','Reserva para o conserto do carro'],['Médio (1 a 5 anos)','Entrada de um apartamento'],['Longo (mais de 5 anos)','Aposentadoria']])},
  {h:"Transforme em parcela", b:eq('Valor mensal ≈ Meta ÷ Número de meses') + box('exemplo','Meta de R$ 6.000 em 12 meses: guardar R$ 500 por mês (sem contar rendimentos).')}
 ],
 ex:[
  nu("Meta de R$ 9.000 em 18 meses. Quanto guardar por mês, sem rendimentos?",500,"9.000 ÷ 18 = 500.","R$"),
  cl("Curto, médio ou longo prazo?",["Curto","Médio","Longo"],"Viagem daqui a 8 meses:0|Aposentadoria em 30 anos:2|Entrada de imóvel em 3 anos:1|Curso daqui a 5 meses:0|Faculdade do filho em 12 anos:2","Até 1 ano, 1 a 5, mais de 5."),
  tf("Uma meta com valor e prazo definidos é mais fácil de acompanhar.",true,"Vira um plano mensal."),
  nu("Guardando R$ 300 por mês, em quantos meses chega a R$ 7.200 (sem rendimentos)?",24,"7.200 ÷ 300 = 24.","meses"),
  mc("Qual meta está mais bem definida?",["*Juntar R$ 12.000 em 2 anos para a entrada do carro","Ficar rico","Guardar mais dinheiro","Gastar menos um dia"],"Tem valor, prazo e finalidade."),
  od("Ordene os passos:",["Definir o objetivo","Estimar o valor","Escolher o prazo","Calcular quanto guardar por mês","Acompanhar todo mês"],"Do sonho ao plano.")
 ]},
{id:"vidax4", title:"Financiamento: o custo total", icon:"🏠",
 learn:[
  {h:"Olhe além da parcela", b:`<p>Uma parcela que cabe no bolso pode esconder um custo total alto. Some tudo o que será pago.</p>` + eq('Custo total = Entrada + (Parcela × Número de parcelas)')},
  {h:"CET", b:`<p>O <b>Custo Efetivo Total</b> reúne juros, tarifas, seguros e tributos do financiamento. É o número certo para comparar ofertas.</p>` + box('exemplo','Carro de R$ 40.000: entrada R$ 10.000 + 48 × R$ 900 = R$ 53.200 no total. R$ 13.200 a mais que o preço à vista.')}
 ],
 ex:[
  nu("Entrada de R$ 5.000 e 24 parcelas de R$ 700. Qual o custo total?",21800,"5.000 + 24 × 700 = 21.800.","R$"),
  nu("Produto de R$ 3.000 à vista ou 12 × R$ 300. Quanto se paga a mais no parcelado?",600,"12 × 300 = 3.600; 3.600 − 3.000 = 600.","R$"),
  mc("Para comparar dois financiamentos, o melhor indicador é:",["*O Custo Efetivo Total (CET)","Só o valor da parcela","A cor do contrato","O número de parcelas"],"CET inclui juros e encargos."),
  tf("A parcela mais baixa sempre significa o financiamento mais barato.",false,"Pode ter mais parcelas e custo total maior."),
  nu("Financiamento: 60 × R$ 1.100 sem entrada, para um bem de R$ 50.000. Quanto se paga além do preço?",16000,"60 × 1.100 = 66.000; 66.000 − 50.000 = 16.000.","R$"),
  fl("O custo que reúne juros, tarifas e seguros do financiamento chama-se {CET}.",["IPCA","PIX"],"Custo Efetivo Total.")
 ]}
];
