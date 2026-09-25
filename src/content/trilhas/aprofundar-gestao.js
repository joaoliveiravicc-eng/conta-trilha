/* Unidade "Aprofundando" das trilhas Demonstrações, Custos, Tributos, Auditoria e Vida. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Demonstrações Financeiras ---------------- */
{id:"demox1", title:"Lucro não é caixa", icon:"🔍",
 learn:[
  {h:"Por que o lucro e o caixa diferem", b:tbl(['Item','Afeta o lucro?','Afeta o caixa?'],[['Venda a prazo','Sim, no mês da venda','Só no recebimento'],['Depreciação','Sim (despesa)','Não'],['Compra de estoque à vista','Só quando vendido (CMV)','Sim, na compra'],['Pagamento de empréstimo (principal)','Não','Sim']])},
  {h:"Do lucro ao caixa", b:box('exemplo','Lucro de R$ 50.000. Depreciação de R$ 10.000 (não saiu dinheiro): soma. Clientes a receber aumentaram R$ 25.000 (vendeu e não recebeu): subtrai. Caixa das operações: 50 + 10 − 25 = <b>R$ 35.000</b>.')}
 ],
 ex:[
  tf("A depreciação reduz o lucro, mas não tira dinheiro do caixa no período.",true,"É uma despesa sem saída de caixa."),
  nu("Lucro 40.000; depreciação 8.000; aumento de clientes a receber 12.000. Caixa das operações?",36000,"40 + 8 − 12 = 36 mil.","R$"),
  cl("Afeta o lucro, o caixa ou os dois (no momento do fato)?",["Só o lucro","Só o caixa","Os dois"],"Depreciação do mês:0|Pagamento do principal de empréstimo:1|Venda à vista:2|Venda a prazo:0|Compra de máquina à vista:1","Competência x movimento de dinheiro."),
  mc("Uma empresa lucrativa ficou sem caixa. Uma causa possível é:",["*Vender muito a prazo e demorar a receber","Ter uma depreciação alta em relação às vendas","Ter uma margem de lucro alta nas vendas","Pagar pouco imposto sobre o lucro do ano"],"O lucro está em clientes, não no banco."),
  nu("Lucro 20.000; depreciação 5.000; estoques aumentaram 9.000. Caixa das operações?",16000,"20 + 5 − 9 = 16 mil.","R$"),
  fl("Aumento de clientes a receber {reduz} o caixa em relação ao lucro.",["aumenta","não altera"],"Vendeu e ainda não recebeu.")
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
  mc("A margem bruta caiu, mas as vendas subiram. Uma possível causa é:",["*O custo das mercadorias subiu mais que o preço","As despesas administrativas caíram no período","O lucro líquido subiu mais que as vendas","Nenhuma: isso nunca acontece com vendas em alta"],"Margem bruta depende de preço e custo."),
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
  tf("A liquidez seca inclui os estoques no cálculo, como a liquidez corrente.",false,"A liquidez seca desconsidera os estoques, porque eles ainda precisam ser vendidos para virar dinheiro."),
  mc("CCL negativo indica que:",["*As dívidas de curto prazo superam o ativo circulante","A empresa tem prejuízo com certeza, mesmo que as vendas cresçam","O estoque da empresa é zero no fim do mês","O patrimônio líquido da empresa é negativo"],"Aperto de liquidez, não necessariamente prejuízo."),
  mc("Uma loja com muito estoque tem liquidez corrente 1,5 e seca 0,6. Isso indica:",["*Depende de vender o estoque para quitar as dívidas curtas","Liquidez perfeita, sem qualquer dependência da venda do estoque","Que o estoque não existe ou já foi todo vendido","Que não tem dívidas de curto prazo com fornecedores"],"Sem o estoque, os recursos não cobrem o passivo circulante."),
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
  tf("O ROE mostra o retorno sobre o total dos ativos da empresa.",false,"O ROE é o retorno sobre o patrimônio líquido, o capital dos sócios. O retorno sobre o ativo é o ROA."),
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
  nu("Vendas de 2.000 unidades e ponto de equilíbrio em 1.500. Qual a margem de segurança em %?",25,"(2.000 − 1.500) ÷ 2.000 = 500 ÷ 2.000 = 25%.","%"),
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
  mc("Qual empresa tende a ter maior alavancagem operacional?",["*A que tem custos fixos altos em relação aos variáveis","A que só tem custos variáveis, sem nenhum custo fixo","A que não tem nenhuma venda no período analisado","Todas iguais, porque a alavancagem não depende dos custos"],"Custo fixo é a 'alavanca'."),
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
  mc("Num tributo sobre a propriedade de veículo, o fato gerador é:",["*Ser o proprietário do veículo em cada ano","Dirigir o veículo pelas ruas da cidade","Vender o veículo para outra pessoa","Abastecer o veículo em um posto"],"A situação prevista em lei é a propriedade."),
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
  mc("Para que servem as obrigações acessórias?",["*Permitir ao fisco controlar as operações","Aumentar o lucro da empresa no fim do ano","Substituir o pagamento do tributo devido","Nada: servem só para gerar burocracia"],"Informação para fiscalização.")
 ]},
{id:"tribx3", title:"Crédito e não cumulatividade", icon:"🔁",
 learn:[
  {h:"Tributo em cascata x com crédito", b:`<p>Num tributo <b>cumulativo</b>, ele incide em cada etapa sobre o valor total, e o que foi pago antes não é descontado. Num <b>não cumulativo</b>, quem compra pode abater o tributo pago na etapa anterior (o <b>crédito</b>).</p>`},
  {h:"Exemplo com alíquota fictícia de 10%", b:tbl(['Etapa','Venda','Tributo na venda','Crédito da compra','A recolher'],[['Indústria','1.000','100','0','100'],['Loja','1.500','150','100','50']]) + box('dica','Com crédito, cada etapa paga sobre o valor que acrescentou.')}
 ],
 ex:[
  nu("Alíquota fictícia de 10%, não cumulativa. A loja comprou por 2.000 e vendeu por 3.000. Quanto recolhe?",100,"Débito 300 − crédito 200 = 100.","R$"),
  nu("Alíquota fictícia de 10%, cumulativa (sem crédito). A loja comprou por 2.000 e vendeu por 3.000. Quanto recolhe?",300,"10% de 3.000, sem abater nada.","R$"),
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
{id:"audx1", title:"Papéis de trabalho", icon:"🗃️",
 learn:[
  {h:"O que o auditor documenta", b:`<p>Os <b>papéis de trabalho</b> registram o que foi planejado, os procedimentos feitos, a evidência obtida e as conclusões. São a prova de que a auditoria foi feita.</p>` + ul(['Objetivo do teste','Amostra e documentos examinados','Resultados e exceções encontradas','Conclusão e quem revisou'])},
  {h:"Por que importa", b:box('regra','O que não está documentado é tratado como não feito. Um revisor experiente deve entender o trabalho só pelos papéis.')}
 ],
 ex:[
  tf("Se o procedimento não foi documentado, considera-se que não foi feito.",true,"A documentação comprova o trabalho."),
  mc("Os papéis de trabalho servem principalmente para:",["*Registrar procedimentos, evidências e conclusões","Substituir a contabilidade mantida pela empresa","Guardar só o relatório final entregue ao cliente","Calcular os impostos devidos pela empresa"],"São a trilha do trabalho do auditor."),
  od("Ordene o que um papel de trabalho costuma registrar:",["Objetivo do teste","Amostra selecionada","Resultados e exceções","Conclusão","Revisão"],"Do objetivo à revisão."),
  tf("Um revisor deveria conseguir entender o trabalho só lendo os papéis.",true,"Esse é o padrão de qualidade."),
  cl("Deve constar no papel de trabalho?",["Sim","Não"],"Documentos examinados:0|Exceções encontradas:0|Opinião pessoal sobre os funcionários, sem relação com o teste:1|Conclusão do teste:0","Registre o que sustenta a conclusão."),
  fl("A documentação da auditoria é feita nos papéis de {trabalho}.",["parede","caixa"],"Registro do que foi feito.")
 ]},
{id:"audx2", title:"Amostragem", icon:"🎲",
 learn:[
  {h:"Não dá para ver tudo", b:`<p>Com milhares de documentos, o auditor examina uma <b>amostra</b> e usa o resultado para concluir sobre o conjunto.</p>` + ul(['<b>Aleatória</b>: todos têm chance de ser escolhidos.','<b>Por valor</b>: itens grandes têm mais chance.','<b>Itens-chave</b>: examina 100% dos itens acima de um valor.'])},
  {h:"Cuidados", b:box('atencao','Se a amostra só pega o que é fácil, a conclusão fica distorcida. A escolha precisa representar a população.')}
 ],
 ex:[
  tf("Na auditoria, é comum examinar uma amostra em vez de 100% dos itens.",true,"Por eficiência, com critério."),
  mc("Uma amostra aleatória é aquela em que:",["*Cada item tem a mesma chance de ser escolhido","Só os itens grandes entram na seleção","O cliente escolhe os itens que serão vistos","Só os itens mais recentes entram na seleção"],"Evita viés de seleção."),
  mc("O auditor decide examinar todos os pagamentos acima de R$ 100 mil. Isso é:",["*Seleção de itens-chave","Amostra aleatória","Erro","Materialidade"],"Itens relevantes vistos por completo."),
  nu("Numa amostra de 50 notas, 2 tinham erro. Qual a taxa de erro da amostra em %?",4,"2 ÷ 50 = 4%.","%"),
  tf("Deixar o cliente escolher a amostra é uma boa prática.",false,"Compromete a independência e a representatividade."),
  fl("A amostra precisa {representar} a população para a conclusão valer.",["ignorar","substituir"],"Senão a conclusão é enviesada.")
 ]},
{id:"audx3", title:"Eventos subsequentes", icon:"📆",
 learn:[
  {h:"Depois da data do balanço", b:`<p>Fatos que acontecem entre a data das demonstrações e a data da sua autorização podem exigir ajuste ou divulgação.</p>` + tbl(['Tipo','Exemplo','Tratamento'],[['Evidencia algo que já existia na data','Cliente que já estava em dificuldade entra em falência','Ajustar as demonstrações'],['Surge depois da data','Incêndio na fábrica em janeiro','Não ajustar; divulgar se relevante']])},
  {h:"Papel do auditor", b:`<p>O auditor procura esses eventos até a data do relatório: lê atas, conversa com a administração e acompanha processos.</p>`}
 ],
 ex:[
  mc("Balanço em 31/12. Em fevereiro, um cliente que já não pagava desde novembro tem a falência decretada. Tratamento:",["*Ajustar: a condição já existia na data do balanço","Ignorar, porque o fato ocorreu depois do fechamento","Só divulgar em nota, sem mexer nos valores","Registrar como receita do período seguinte"],"Evidencia uma perda que já existia."),
  mc("Balanço em 31/12. Uma enchente destrói o estoque em março. Tratamento:",["*Não ajustar; divulgar em nota se relevante","Ajustar o estoque que estava no balanço de 31/12","Ignorar sempre, porque o balanço já foi fechado","Registrar a perda em dezembro, como se já tivesse ocorrido"],"A causa surgiu depois da data."),
  tf("Eventos após a data do balanço nunca afetam as demonstrações.",false,"Alguns exigem ajuste; outros, divulgação."),
  cl("Ajustar ou apenas divulgar?",["Ajustar","Divulgar"],"Sentença confirma processo que já existia em 31/12:0|Incêndio em janeiro:1|Venda de estoque abaixo do custo logo após a data, mostrando perda que já existia:0|Aquisição de outra empresa em fevereiro:1","A condição existia na data do balanço?"),
  tf("O auditor procura eventos subsequentes até a data do seu relatório.",true,"Leitura de atas, entrevistas e processos."),
  fl("Eventos que revelam condições já existentes na data do balanço exigem {ajuste}.",["divulgação apenas","nada"],"Refletem a situação daquela data.")
 ]},
{id:"audx4", title:"Independência e ética", icon:"⚖️",
 learn:[
  {h:"Por que independência importa", b:`<p>A opinião do auditor só tem valor se ele for <b>independente</b> da empresa auditada, de fato e na aparência.</p>` + ul(['Não ter participação financeira relevante no cliente.','Não auditar o próprio trabalho (ex.: ter feito a contabilidade que vai auditar).','Não depender excessivamente de honorários de um único cliente.'])},
  {h:"Ceticismo profissional", b:`<p>Atitude de questionar, ficar alerta a sinais de erro ou fraude e avaliar criticamente a evidência, sem supor desonestidade nem honestidade absoluta.</p>`}
 ],
 ex:[
  tf("Um auditor que tem ações relevantes da empresa auditada mantém a independência.",false,"Interesse financeiro ameaça a independência."),
  cl("Ameaça à independência?",["Ameaça","Não ameaça"],"Auditar a contabilidade que ele mesmo fez:0|Cônjuge ser diretor financeiro do cliente:0|Receber honorários contratados normais:1|Ter ações relevantes do cliente:0|Seguir as normas de auditoria:1","Interesse, autorrevisão e laços pessoais são ameaças."),
  mc("Ceticismo profissional significa:",["*Questionar e avaliar criticamente a evidência","Desconfiar de tudo e de todos o tempo todo","Acreditar em tudo o que o cliente diz sem checar","Não fazer perguntas para não incomodar"],"Postura crítica e alerta."),
  fl("A opinião do auditor só tem valor se ele for {independente}.",["amigo do cliente","sócio do cliente"],"De fato e na aparência."),
  tf("Independência 'na aparência' importa porque terceiros precisam confiar no trabalho.",true,"A confiança dos usuários depende disso."),
  mc("Um único cliente paga quase todos os honorários do auditor. Isso é:",["*Uma ameaça de dependência econômica do cliente","Irrelevante para a independência do auditor","Obrigatório pelas normas de auditoria","Uma boa prática de relacionamento com o cliente"],"Pode pressionar a opinião.")
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
  mc("Rendimento de 3% com inflação de 5% significa:",["*Perda de poder de compra, apesar do rendimento","Ganho real de 3% sobre o dinheiro aplicado","Nada muda, porque o rendimento é positivo","Lucro garantido, porque o rendimento é de 3%"],"Rendeu menos que os preços subiram."),
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
  mc("Qual a melhor forma de usar o cartão?",["*Pagar a fatura inteira no vencimento","Pagar sempre só o valor mínimo da fatura","Atrasar e pagar depois, com juros","Usar o limite inteiro todos os meses"],"Evita juros."),
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
  mc("Qual meta está mais bem definida?",["*Juntar R$ 12.000 em 2 anos para a entrada do carro","Ficar rico o quanto antes e sem depender de ninguém","Guardar mais dinheiro do que eu guardo hoje","Gastar menos a partir de algum dia do ano que vem"],"Tem valor, prazo e finalidade."),
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
