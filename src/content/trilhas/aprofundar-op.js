/* Unidade "Aprofundando" das trilhas Rotina Digital, Imobilizado e Estoques. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Rotina Contábil Digital ---------------- */
{id:"digitalx1", title:"Módulos integrados do ERP", icon:"🔗",
 learn:[
  {h:"Um fato, vários módulos", b:`<p>No ERP, uma venda nasce no módulo <b>comercial</b>, gera a nota no <b>fiscal</b>, a baixa no <b>estoque</b>, o título no <b>financeiro</b> e o lançamento na <b>contabilidade</b>.</p>` + ol(['Pedido de venda','Nota fiscal emitida','Estoque baixado','Conta a receber criada','Lançamento contábil gerado'])},
  {h:"Integração exige cadastro certo", b:box('atencao','Se o cadastro do produto aponta a conta errada, todas as vendas daquele produto vão para a conta errada. Revise os cadastros que alimentam a integração.')}
 ],
 ex:[
  od("Ordene o caminho de uma venda no ERP:",["Pedido de venda","Emissão da nota fiscal","Baixa do estoque","Conta a receber no financeiro","Lançamento na contabilidade"],"Da venda ao registro contábil."),
  mt([["Comercial","Pedido do cliente"],["Fiscal","Nota fiscal"],["Estoque","Baixa da mercadoria"],["Financeiro","Título a receber"]],"Cada módulo, sua parte."),
  tf("Um erro no cadastro de um produto pode afetar todas as vendas dele na contabilidade.",true,"A integração repete o cadastro."),
  mc("A vantagem principal da integração entre módulos é:",["*Registrar o fato uma vez e reaproveitar os dados","Dispensar a conferência","Eliminar a nota fiscal","Aumentar o estoque"],"Menos digitação, menos erro."),
  tf("Com o ERP integrado, a contabilidade não precisa mais conferir nada.",false,"Conciliações e revisões continuam necessárias."),
  fl("A baixa da mercadoria vendida acontece no módulo de {estoque}.",["folha","ponto"],"Controle das quantidades.")
 ]},
{id:"digitalx2", title:"Centro de custo", icon:"🎯",
 learn:[
  {h:"Onde o gasto aconteceu", b:`<p>A conta diz <b>o que</b> foi gasto (energia, salários). O centro de custo diz <b>onde</b>: produção, vendas, administração, filial.</p>` + tbl(['Lançamento','Conta','Centro de custo'],[['Energia da fábrica','Despesa com energia','Produção'],['Salário do vendedor','Despesa com salários','Comercial'],['Salário do contador','Despesa com salários','Administrativo']])},
  {h:"Para que serve", b:ul(['Saber quanto custa cada área.','Comparar filiais.','Cobrar responsáveis pelo orçamento de cada área.'])}
 ],
 ex:[
  mc("A diferença entre conta contábil e centro de custo é:",["*A conta diz o que foi gasto; o centro de custo diz onde","São a mesma coisa","Centro de custo é o banco","Conta é só para receitas"],"Duas dimensões do mesmo lançamento."),
  cl("Qual centro de custo?",["Produção","Comercial","Administrativo"],"Manutenção das máquinas:0|Comissão de vendedores:1|Honorários do contador:2|Matéria-prima consumida:0|Propaganda:1","Pergunte: em qual área o gasto foi usado?"),
  tf("Com centros de custo, dá para comparar o gasto de duas filiais.",true,"Cada filial vira um centro."),
  nu("Energia total de R$ 6.000: fábrica consome 70%. Quanto vai para o centro Produção?",4200,"70% de 6.000 = 4.200.","R$"),
  fl("A conta contábil mostra o que foi gasto; o {centro de custo} mostra onde.",["plano de contas","balancete"],"Dimensão de área."),
  mc("Um gestor quer saber quanto a filial Norte gastou. O que ajuda?",["*Lançamentos com centro de custo por filial","Somar só o caixa","Olhar só o Balanço","Contar os funcionários"],"Centro de custo separa por área.")
 ]},
{id:"digitalx3", title:"Indicadores e painéis", icon:"📊",
 learn:[
  {h:"Números que viram decisão", b:`<p>Um painel (dashboard) reúne poucos indicadores que mostram a saúde do negócio: faturamento, margem, caixa, contas a receber vencidas.</p>` + box('dica','Bom indicador tem definição clara, fonte confiável e é acompanhado com frequência.')},
  {h:"Cuidados", b:ul(['Mesmo nome, mesma fórmula em todos os relatórios.','Dados do painel conciliados com a contabilidade.','Poucos indicadores, bem escolhidos, valem mais que dezenas.'])}
 ],
 ex:[
  nu("Contas a receber de R$ 80.000, das quais R$ 12.000 estão vencidas. Qual o % vencido?",15,"12.000 ÷ 80.000 = 15%.","%"),
  tf("Um painel com dezenas de indicadores é sempre melhor.",false,"Poucos e bem definidos ajudam mais a decidir."),
  mc("O faturamento do painel não bate com a DRE. O que fazer?",["*Conciliar as fontes antes de usar o número","Usar o maior","Ignorar a DRE","Apagar o painel"],"Número sem conciliação não sustenta decisão."),
  cl("Bom indicador para um painel mensal?",["Sim","Não"],"Margem bruta do mês:0|Saldo de caixa:0|Cor preferida do gerente:1|Recebíveis vencidos:0|Número de cadeiras do escritório:1","Precisa ajudar a decidir."),
  nu("Receita do mês de R$ 250.000 e lucro bruto de R$ 75.000. Margem bruta em %?",30,"75.000 ÷ 250.000 = 30%.","%"),
  fl("O painel que reúne indicadores do negócio também é chamado de {dashboard}.",["balancete","razonete"],"Visão rápida para decidir.")
 ]},
{id:"digitalx4", title:"Dados pessoais e segurança", icon:"🔒",
 learn:[
  {h:"A contabilidade guarda dados sensíveis", b:`<p>Folha, cadastro de clientes e fornecedores têm <b>dados pessoais</b>: CPF, endereço, salário. A LGPD (Lei Geral de Proteção de Dados) pede que eles sejam tratados com finalidade, necessidade e segurança.</p>`},
  {h:"Boas práticas", b:ul(['Cada pessoa acessa só o que precisa.','Senhas fortes e acesso em dois passos.','Backup regular, testado.','Não enviar planilhas com CPFs por canais abertos.'])}
 ],
 ex:[
  tf("Salário e CPF de funcionários são dados pessoais.",true,"Identificam ou se referem a uma pessoa."),
  mc("Quem deveria acessar a folha de pagamento?",["*Só quem precisa para trabalhar com ela","Todos da empresa","Qualquer fornecedor","Ninguém nunca"],"Acesso pelo princípio da necessidade."),
  tf("Backup que nunca foi testado garante a recuperação dos dados.",false,"Só um teste de restauração comprova."),
  cl("Prática segura ou arriscada?",["Segura","Arriscada"],"Acesso em dois passos:0|Senha compartilhada no grupo:1|Backup testado:0|Planilha de salários enviada para e-mail pessoal:1|Perfis por função:0","Menos acesso e mais controle."),
  fl("A lei brasileira de proteção de dados pessoais é a {LGPD}.",["CLT","NBC"],"Lei Geral de Proteção de Dados."),
  mc("Um colaborador saiu da empresa. O que fazer com o acesso dele ao sistema?",["*Remover no mesmo dia","Manter por segurança","Passar a senha para o substituto","Nada"],"Acesso de quem saiu é risco.")
 ]},

/* ---------------- Imobilizado e Intangíveis ---------------- */
{id:"imobx1", title:"Vida útil e valor residual", icon:"⏳",
 learn:[
  {h:"Quanto tempo e quanto sobra", b:`<p><b>Vida útil</b> é o tempo que a empresa espera usar o bem. <b>Valor residual</b> é quanto espera obter por ele no fim desse uso.</p>` + eq('Depreciação anual = (Custo − Valor residual) ÷ Vida útil')},
  {h:"Exemplo", b:box('exemplo','Van de R$ 120.000, valor residual R$ 20.000, vida útil 5 anos: (120.000 − 20.000) ÷ 5 = <b>R$ 20.000 por ano</b>.') + box('dica','Vida útil é estimativa da empresa, baseada no uso esperado. Deve ser revisada se as condições mudarem.')}
 ],
 ex:[
  nu("Máquina de R$ 50.000, valor residual R$ 5.000, vida útil 9 anos. Depreciação anual?",5000,"(50.000 − 5.000) ÷ 9 = 5.000.","R$"),
  nu("Computador de R$ 6.000, sem valor residual, vida útil 3 anos. Depreciação mensal?",166.67,"6.000 ÷ 36 meses ≈ 166,67.","R$",undefined,0.02),
  tf("O valor residual reduz a base que será depreciada.",true,"Deprecia-se custo menos residual."),
  mc("A vida útil de um bem é:",["*O período em que a empresa espera usá-lo","Sempre 10 anos","O prazo da garantia","O prazo do financiamento"],"É uma estimativa de uso."),
  nu("Veículo de R$ 80.000, residual R$ 16.000, depreciação anual de R$ 16.000. Qual a vida útil em anos?",4,"(80.000 − 16.000) ÷ 16.000 = 4.","anos"),
  fl("Depreciação anual = (custo − {valor residual}) ÷ vida útil.",["depreciação acumulada","receita"],"Base depreciável.")
 ]},
{id:"imobx2", title:"Manutenção ou melhoria?", icon:"🔧",
 learn:[
  {h:"Duas naturezas", b:tbl(['Gasto','Tratamento'],[['Manutenção que mantém o bem funcionando','Despesa do período'],['Melhoria que aumenta capacidade ou vida útil','Soma ao custo do ativo']])},
  {h:"Exemplos", b:ul(['Troca de óleo e pneus do caminhão: despesa.','Motor novo que aumenta a vida útil em 3 anos: ativo.','Pintura de rotina: despesa.']) + lanc([['D','Veículos','15.000'],['C','Bancos','15.000']])}
 ],
 ex:[
  cl("Despesa ou ativo?",["Despesa","Ativo"],"Troca de óleo:0|Ampliação do galpão:1|Conserto de rotina da impressora:0|Motor novo que aumenta a vida útil:1|Limpeza das máquinas:0","Melhoria que gera benefício futuro adicional vai para o ativo."),
  en("Pagou pelo banco R$ 800 de manutenção preventiva da máquina.","Despesa de manutenção","Bancos",["Máquinas e equipamentos","Fornecedores"],"Mantém, não melhora: despesa."),
  en("Pagou pelo banco R$ 25.000 por uma ampliação que aumenta a capacidade da máquina.","Máquinas e equipamentos","Bancos",["Despesa de manutenção","Caixa"],"Aumenta o benefício futuro: ativo."),
  tf("Todo gasto com um bem do imobilizado vira ativo.",false,"Manutenção comum é despesa."),
  mc("Um gasto que aumenta a vida útil de um caminhão de 5 para 8 anos é:",["*Adicionado ao custo do ativo","Despesa do mês","Receita","Passivo"],"Gera benefício futuro adicional."),
  fl("Gastos que apenas mantêm o bem funcionando são {despesa} do período.",["ativo","receita"],"Não aumentam o benefício futuro.")
 ]},
{id:"imobx3", title:"Depreciação, amortização e exaustão", icon:"🪨",
 learn:[
  {h:"Três nomes, uma ideia", b:tbl(['Termo','Aplica-se a','Exemplo'],[['Depreciação','Bens tangíveis do imobilizado','Máquinas, veículos'],['Amortização','Intangíveis com vida útil definida','Software, licença com prazo'],['Exaustão','Recursos naturais extraídos','Mina, reserva florestal']])},
  {h:"O que tem em comum", b:`<p>Todas distribuem o custo de um ativo ao longo do período em que ele gera benefícios.</p>` + box('atencao','Intangível com vida útil indefinida, como o goodwill, não é amortizado: é testado quanto à recuperabilidade.')}
 ],
 ex:[
  mt([["Depreciação","Máquinas e veículos"],["Amortização","Software com licença de 5 anos"],["Exaustão","Jazida de minério"]],"Cada termo tem seu tipo de ativo."),
  mc("A redução do custo de uma licença de software de 4 anos chama-se:",["*Amortização","Depreciação","Exaustão","Provisão"],"Intangível com vida útil definida."),
  tf("Goodwill é amortizado todo ano.",false,"Tem vida útil indefinida: faz-se teste de recuperabilidade."),
  nu("Licença de software de R$ 24.000 por 4 anos. Amortização anual?",6000,"24.000 ÷ 4 = 6.000.","R$"),
  wr("Como se chama a redução do custo de recursos naturais extraídos?",["exaustao"],"Exaustão."),
  fl("Depreciação, amortização e exaustão distribuem o {custo} de um ativo ao longo do seu uso.",["lucro","caixa"],"Confronto com os benefícios.")
 ]},
{id:"imobx4", title:"Terrenos e edifícios", icon:"🏗️",
 learn:[
  {h:"Terreno não se deprecia", b:`<p>Na compra de um imóvel, separa-se o valor do <b>terreno</b> e o da <b>construção</b>. O edifício se desgasta e é depreciado; o terreno, em regra, não.</p>` + box('exemplo','Imóvel de R$ 1.000.000: terreno R$ 400.000 e edifício R$ 600.000. Se o edifício tem vida útil de 25 anos e residual zero: 600.000 ÷ 25 = R$ 24.000 por ano.')},
  {h:"Onde fica", b:lanc([['D','Terrenos','400.000'],['D','Edificações','600.000'],['C','Bancos','1.000.000']])}
 ],
 ex:[
  tf("O terreno de uma fábrica é depreciado como o prédio.",false,"Terreno, em regra, não se deprecia."),
  nu("Imóvel de R$ 900.000, sendo R$ 300.000 de terreno. Edifício com vida útil de 25 anos, sem residual. Depreciação anual?",24000,"600.000 ÷ 25 = 24.000.","R$"),
  en("Comprou um imóvel pelo banco: terreno R$ 200.000 e edificação R$ 500.000.","Terrenos+Edificações","Bancos",["Despesa de aluguel","Estoques"],"Separe o terreno da construção."),
  mc("Por que separar terreno e edifício na compra?",["*Porque só o edifício é depreciado","Para pagar menos imposto","Porque o banco exige","Não é preciso separar"],"Base de depreciação diferente."),
  mc("Um terreno comprado por uma loteadora para revender é:",["*Estoque","Imobilizado","Intangível","Despesa"],"A finalidade define a classificação."),
  fl("Na compra de imóvel, só a {edificação} entra na base de depreciação.",["área","escritura"],"O terreno fica fora.")
 ]},

/* ---------------- Estoques ---------------- */
{id:"estoqx1", title:"Inventário periódico e permanente", icon:"📋",
 learn:[
  {h:"Dois jeitos de controlar", b:tbl(['Sistema','Como funciona','CMV'],[['Permanente','Cada entrada e saída é registrada na hora','Conhecido a cada venda'],['Periódico','Conta-se o estoque no fim do período','Calculado no fim: EI + Compras − EF']])},
  {h:"Contar continua importante", b:`<p>Mesmo no permanente, a contagem física confere o sistema: perdas, furtos e erros de registro aparecem na diferença.</p>`}
 ],
 ex:[
  nu("Periódico: estoque inicial 8.000, compras 22.000, estoque final contado 5.000. Qual o CMV?",25000,"8.000 + 22.000 − 5.000 = 25.000.","R$"),
  mc("No inventário permanente, o CMV:",["*É registrado a cada venda","Só é conhecido no fim do ano","Não existe","É igual às compras"],"Cada saída já baixa o estoque."),
  tf("Com inventário permanente, não é preciso fazer contagem física.",false,"A contagem confere o sistema."),
  nu("Sistema mostra 500 unidades; contagem encontra 470. Quantas unidades faltam?",30,"500 − 470 = 30.","unidades"),
  fl("No sistema {periódico}, o estoque é contado no fim do período.",["permanente","automático"],"CMV calculado por diferença."),
  cl("Permanente ou periódico?",["Permanente","Periódico"],"Baixa do estoque a cada venda no sistema:0|CMV por EI + compras − EF:1|Saldo disponível a qualquer momento:0|Contagem só no fechamento:1","Registro contínuo x cálculo no fim.")
 ]},
{id:"estoqx2", title:"Ponto de pedido e estoque de segurança", icon:"📦",
 learn:[
  {h:"Quando comprar de novo", b:`<p>Pedir cedo demais prende dinheiro; tarde demais, falta mercadoria. O <b>ponto de pedido</b> diz em que nível de estoque fazer a compra.</p>` + eq('Ponto de pedido = Consumo diário × Prazo de entrega + Estoque de segurança')},
  {h:"Exemplo", b:box('exemplo','A loja vende 20 unidades por dia, o fornecedor entrega em 5 dias e mantém-se 40 de segurança: 20 × 5 + 40 = <b>140 unidades</b>. Quando o estoque chegar a 140, faz-se o pedido.') + box('dica','O estoque de segurança protege contra atrasos e picos de venda.')}
 ],
 ex:[
  nu("Consumo de 30 unidades por dia, prazo de entrega de 4 dias e estoque de segurança de 50. Ponto de pedido?",170,"30 × 4 + 50 = 170.","unidades"),
  nu("Consumo de 12 por dia e prazo de 10 dias, sem estoque de segurança. Ponto de pedido?",120,"12 × 10 = 120.","unidades"),
  tf("O estoque de segurança protege contra atrasos do fornecedor.",true,"É uma folga."),
  mc("Estoque de segurança muito alto tende a:",["*Prender dinheiro em mercadoria parada","Aumentar o caixa","Eliminar os custos","Aumentar o giro"],"Mais estoque, mais recursos parados."),
  nu("Ponto de pedido de 200, consumo de 25 por dia e prazo de 6 dias. Qual o estoque de segurança?",50,"200 − 25 × 6 = 50.","unidades"),
  fl("Ponto de pedido = consumo diário × prazo de entrega + estoque de {segurança}.",["giro","venda"],"Folga contra imprevistos.")
 ]},
{id:"estoqx3", title:"Giro do estoque", icon:"🔄",
 learn:[
  {h:"Quantas vezes o estoque roda", b:eq('Giro = CMV ÷ Estoque médio') + eq('Estoque médio = (Estoque inicial + Estoque final) ÷ 2')},
  {h:"Em dias", b:eq('Prazo médio de estocagem = 360 ÷ Giro') + box('exemplo','CMV R$ 120.000, estoque médio R$ 20.000: giro 6 vezes no ano, ou cerca de 60 dias parado em média.') + box('dica','Estoque parado é dinheiro parado. Giro maior, em geral, libera caixa.')}
 ],
 ex:[
  nu("CMV anual de R$ 180.000 e estoque médio de R$ 30.000. Qual o giro?",6,"180.000 ÷ 30.000 = 6.","vezes"),
  nu("Com giro de 6 vezes no ano (ano de 360 dias), quantos dias o estoque fica parado em média?",60,"360 ÷ 6 = 60.","dias"),
  nu("Estoque inicial 16.000 e final 24.000. Qual o estoque médio?",20000,"(16.000 + 24.000) ÷ 2 = 20.000.","R$"),
  tf("Um giro maior significa que o estoque fica menos tempo parado.",true,"Roda mais vezes no período."),
  mc("O que tende a acontecer com o caixa se o estoque gira mais devagar?",["*Mais dinheiro fica preso no estoque","O caixa aumenta sozinho","Nada muda","O lucro dobra"],"Estoque parado prende recursos."),
  fl("Prazo médio de estocagem = 360 ÷ {giro}.",["CMV","lucro"],"Converte o giro em dias.")
 ]},
{id:"estoqx4", title:"Custo ou valor realizável?", icon:"🏷️",
 learn:[
  {h:"O menor dos dois", b:`<p>O estoque é mensurado pelo <b>menor valor</b> entre o custo e o <b>valor realizável líquido</b> (preço de venda estimado menos os gastos para concluir e vender).</p>` + eq('VRL = Preço de venda estimado − Gastos para vender')},
  {h:"Exemplo", b:box('exemplo','Custo R$ 1.000. Preço de venda caiu para R$ 900 e a comissão é R$ 50: VRL = R$ 850. O estoque passa a valer R$ 850 e a perda de R$ 150 vai para o resultado.')}
 ],
 ex:[
  nu("Custo R$ 2.000; preço de venda estimado R$ 1.800; gastos para vender R$ 100. Qual o VRL?",1700,"1.800 − 100 = 1.700.","R$"),
  nu("No caso anterior (custo 2.000 e VRL 1.700), qual a perda a reconhecer?",300,"2.000 − 1.700 = 300.","R$"),
  nu("Custo R$ 500; preço de venda R$ 800; gastos para vender R$ 60. Por quanto o estoque fica mensurado?",500,"VRL = 740, maior que o custo: fica pelo custo, 500.","R$"),
  tf("Se o VRL for maior que o custo, o estoque é aumentado até o VRL.",false,"Fica pelo custo: o menor dos dois."),
  mc("Mercadorias fora de moda tiveram o preço de venda reduzido abaixo do custo. O que fazer?",["*Reduzir o estoque ao VRL e reconhecer a perda","Manter pelo custo","Aumentar o estoque","Lançar como receita"],"Não se mantém ativo acima do que ele deve render."),
  fl("O estoque é mensurado pelo menor valor entre o custo e o valor {realizável líquido}.",["de mercado bruto","histórico"],"Regra de mensuração de estoques.")
 ]}
];
