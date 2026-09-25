/* Unidades "Na prática" escritas à mão: um mesmo cenário ao longo de várias lições. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Antes de Tudo: a barraca da feira ---------------- */
{id:"feira1", title:"Montando a barraca", icon:"🍅",
 learn:[
  {h:"A barraca do Seu Jorge", b:`<p>Seu Jorge vende frutas e verduras na feira de sábado. Antes de sair de casa, ele faz as contas: quanto gasta com mercadoria, quanto cobra e quanto sobra.</p>` + tbl(['Item','Custo'],[['Caixa de tomate (20 kg)','R$ 80'],['Caixa de banana (15 dúzias)','R$ 60'],['Aluguel da barraca no dia','R$ 40']])},
  {h:"Preço por unidade", b:eq('Custo por kg de tomate = 80 ÷ 20 = R$ 4') + box('dica','Dividir o custo total pela quantidade dá o custo de cada unidade. É o ponto de partida para decidir o preço.')}
 ],
 ex:[
  nu("Caixa de tomate com 20 kg custou R$ 80. Qual o custo por kg?",4,"80 ÷ 20 = 4.","R$"),
  nu("Caixa de banana com 15 dúzias custou R$ 60. Custo por dúzia?",4,"60 ÷ 15 = 4.","R$"),
  nu("Seu Jorge quer ganhar 50% sobre o custo do tomate (R$ 4 o kg). Por quanto vende o kg?",6,"4 × 1,5 = 6.","R$"),
  nu("Tomate R$ 80 + banana R$ 60 + aluguel R$ 40. Quanto ele gasta para montar a barraca?",180,"80 + 60 + 40 = 180.","R$"),
  tf("O aluguel da barraca também precisa ser coberto pelas vendas do dia.",true,"Todo gasto do dia entra na conta."),
  mc("Se o tomate estraga e ele joga fora 2 kg, o custo de cada kg vendido:",["*Aumenta, porque o mesmo gasto é dividido por menos quilos","Diminui","Fica igual","Vira zero"],"R$ 80 ÷ 18 kg ≈ R$ 4,44.")
 ]},
{id:"feira2", title:"Troco, desconto e pechincha", icon:"🪙",
 learn:[
  {h:"Vendendo na hora", b:`<p>Na feira tudo é rápido: somar, dar troco e decidir se aceita a pechincha do cliente.</p>` + box('exemplo','Cliente leva 2 kg de tomate (R$ 6 o kg) e 1 dúzia de banana (R$ 6). Total: 12 + 6 = R$ 18. Pagou com R$ 50: troco de R$ 32.')},
  {h:"Desconto de fim de feira", b:`<p>Às 13h, Seu Jorge dá 30% de desconto para não levar mercadoria de volta.</p>` + eq('R$ 6 com 30% de desconto = 6 × 0,70 = R$ 4,20')}
 ],
 ex:[
  nu("3 kg de tomate a R$ 6 e 2 dúzias de banana a R$ 6. Total?",30,"18 + 12 = 30.","R$"),
  nu("Compra de R$ 30 paga com uma nota de R$ 50. Troco?",20,"50 − 30 = 20.","R$"),
  nu("Tomate a R$ 6 o kg com 30% de desconto. Novo preço?",4.2,"6 × 0,7 = 4,20.","R$"),
  mc("Com o desconto, o tomate sai por R$ 4,20 e custou R$ 4. Ainda dá lucro?",["*Sim, R$ 0,20 por kg","Não, dá prejuízo","Dá lucro de R$ 2","Dá empate exato"],"4,20 − 4,00 = 0,20."),
  nu("Cliente pede 10% de desconto numa compra de R$ 40. Quanto paga?",36,"40 × 0,9 = 36.","R$"),
  tf("Vender abaixo do custo no fim da feira pode fazer sentido se a mercadoria vai estragar.",true,"Recuperar parte do custo é melhor que perder tudo.")
 ]},
{id:"feira3", title:"Pix, dinheiro e maquininha", icon:"📱",
 learn:[
  {h:"Cada forma de pagamento tem um custo", b:tbl(['Forma','Quando o dinheiro chega','Custo'],[['Dinheiro','Na hora','Nenhum, mas risco de perda'],['Pix','Na hora','Geralmente nenhum para pessoa física; pode haver tarifa para empresas'],['Cartão de débito','Em geral no dia seguinte','Taxa da maquininha'],['Cartão de crédito','Em geral após 30 dias','Taxa maior'],]) + box('atencao','Taxas variam por contrato e maquininha. Os números desta lição são exemplos.')},
  {h:"Quanto sobra de verdade", b:box('exemplo','Venda de R$ 100 no crédito com taxa de 3%: Seu Jorge recebe R$ 97. A receita da venda é R$ 100; os R$ 3 são despesa com taxa.')}
 ],
 ex:[
  nu("Venda de R$ 200 no débito com taxa de 1,5%. Quanto ele recebe?",197,"200 − 3 = 197.","R$"),
  nu("Venda de R$ 150 no crédito com taxa de 3%. Qual a taxa em reais?",4.5,"3% de 150 = 4,50.","R$"),
  cl("Quando o dinheiro chega, em geral?",["Na hora","Depois"],"Pix:0|Dinheiro:0|Cartão de crédito:1|Cartão de débito:1","Crédito e débito dependem da administradora."),
  tf("A receita de uma venda no cartão é o valor da venda, e a taxa é uma despesa.",true,"Assim a taxa fica visível."),
  mc("Para não perder dinheiro com troco errado e notas falsas, Seu Jorge pode:",["*Incentivar o Pix e conferir as notas","Aceitar qualquer nota","Não dar troco","Vender fiado sempre"],"Menos dinheiro vivo, menos risco."),
  nu("No dia: R$ 300 em dinheiro, R$ 450 em Pix e R$ 250 no débito (taxa 2%). Quanto entra no total, depois da taxa?",995,"300 + 450 + 245 = 995.","R$")
 ]},
{id:"feira4", title:"Fechando o sábado", icon:"🧮",
 learn:[
  {h:"O resultado da feira", b:tbl(['Item','Valor'],[['Vendas do dia','R$ 1.000'],['Custo das mercadorias vendidas','R$ 520'],['Aluguel da barraca','R$ 40'],['Taxas de cartão','R$ 5'],['Lucro do dia','R$ 435']]) + box('regra','Lucro = vendas − custo do que foi vendido − despesas do dia.')},
  {h:"Mercadoria que sobrou", b:`<p>O que não foi vendido não é custo do dia: continua sendo estoque para o próximo sábado (se não estragar).</p>`}
 ],
 ex:[
  nu("Vendas R$ 1.000; custo do que foi vendido R$ 520; aluguel R$ 40; taxas R$ 5. Lucro do dia?",435,"1.000 − 520 − 40 − 5 = 435.","R$"),
  nu("Comprou R$ 700 de mercadoria e sobraram R$ 180 em bom estado. Qual o custo do que foi vendido?",520,"700 − 180 = 520.","R$"),
  tf("A mercadoria que sobrou em bom estado é despesa do sábado.",false,"Continua sendo estoque."),
  nu("Com lucro de R$ 435 por sábado, quanto ele ganha em 4 sábados?",1740,"435 × 4 = 1.740.","R$"),
  mc("Seu Jorge vendeu R$ 1.000 e ficou com R$ 900 no bolso. Isso significa:",["*Vendas não são lucro: parte do dinheiro repõe o custo","Que ele teve lucro de R$ 900","Que ele teve prejuízo","Nada"],"Do que entrou, é preciso descontar o custo."),
  od("Ordene o fechamento do dia:",["Somar as vendas","Contar a mercadoria que sobrou","Calcular o custo do que foi vendido","Descontar as despesas do dia","Chegar ao lucro"],"Das vendas ao lucro.")
 ]},

/* ---------------- Estoques: Supermercado Bom Preço ---------------- */
{id:"mercado1", title:"Chegou o caminhão", icon:"🚚",
 learn:[
  {h:"Recebendo mercadorias", b:`<p>O Supermercado Bom Preço recebe arroz de dois fornecedores na mesma semana.</p>` + tbl(['Lote','Quantidade','Custo unitário','Total'],[['Segunda','100 pacotes','R$ 20','R$ 2.000'],['Quinta','100 pacotes','R$ 24','R$ 2.400']])},
  {h:"Conferir antes de guardar", b:ol(['Conferir a nota com o pedido.','Contar e ver a validade.','Registrar a entrada no estoque.']) + box('dica','Divergência entre nota e mercadoria se resolve antes de assinar o recebimento.')}
 ],
 ex:[
  nu("O supermercado recebeu dois lotes de arroz: 100 pacotes a R$ 20 e 100 pacotes a R$ 24. Qual o custo total dos dois lotes?",4400,"2.000 + 2.400 = 4.400.","R$"),
  nu("Dois lotes de arroz: 100 pacotes a R$ 20 e 100 pacotes a R$ 24. Qual o custo médio por pacote depois dos dois lotes?",22,"4.400 ÷ 200 = 22.","R$"),
  en("Recebeu o lote de quinta, R$ 2.400, a prazo.","Estoques","Fornecedores",["CMV","Caixa"],"Entra estoque, surge a dívida."),
  tf("A nota dizia 100 pacotes, mas chegaram 95. O certo é assinar e resolver depois.",false,"Divergência se resolve no recebimento."),
  od("Ordene o recebimento:",["Conferir a nota com o pedido","Contar e ver a validade","Registrar a entrada no estoque","Guardar nas prateleiras"],"Conferir antes de registrar."),
  nu("Chegaram só 95 dos 100 pacotes do lote de quinta (R$ 24 cada). Qual valor deve ser registrado?",2280,"95 × 24 = 2.280.","R$")
 ]},
{id:"mercado2", title:"PEPS no corredor do arroz", icon:"🍚",
 learn:[
  {h:"Vende primeiro o que entrou primeiro", b:`<p>No PEPS, a baixa do estoque usa primeiro o custo do lote mais antigo.</p>` + box('exemplo','Vendeu 150 pacotes: 100 do lote de segunda (R$ 20) + 50 do lote de quinta (R$ 24). CMV = 2.000 + 1.200 = <b>R$ 3.200</b>. Sobram 50 pacotes a R$ 24 = R$ 1.200.')},
  {h:"Por que o PEPS combina com supermercado", b:`<p>Produtos com validade devem sair na ordem de chegada. O método de custo acompanha o fluxo físico.</p>`}
 ],
 ex:[
  nu("Lotes: 100 a R$ 20 e 100 a R$ 24. Venda de 150 pelo PEPS. CMV?",3200,"100 × 20 + 50 × 24 = 3.200.","R$"),
  nu("Lotes de 100 pacotes a R$ 20 e 100 a R$ 24. Vendeu 150 pelo PEPS. Qual o valor do estoque final?",1200,"Sobram 50 pacotes do lote mais novo: 50 × 24 = 1.200.","R$"),
  nu("Venda de 80 pacotes pelo PEPS. CMV?",1600,"80 × 20 = 1.600.","R$"),
  tf("No PEPS, com preços subindo, o estoque final fica avaliado pelos custos mais recentes.",true,"Os mais antigos saem primeiro."),
  en("Baixa do custo das 150 unidades vendidas, R$ 3.200.","CMV","Estoques",["Receita de vendas","Fornecedores"],"Custo do que foi vendido."),
  mc("Por que supermercados costumam organizar a prateleira pelo PEPS físico?",["*Para vender antes o que vence antes","Para aumentar o imposto","Porque é proibido o contrário","Para esconder produtos"],"Evita perdas por validade.")
 ]},
{id:"mercado3", title:"Custo médio no corredor do óleo", icon:"🫙",
 learn:[
  {h:"Média ponderada móvel", b:`<p>No custo médio, a cada compra recalcula-se o custo unitário de todo o estoque.</p>` + tbl(['Movimento','Qtd.','Custo unit.','Saldo'],[['Estoque inicial','60','R$ 8','60 × 8 = 480'],['Compra','40','R$ 10','100 un · R$ 880 → média R$ 8,80'],['Venda','50','R$ 8,80','50 un · R$ 440']])},
  {h:"A venda não muda a média", b:box('regra','Compras recalculam a média; vendas saem pela média vigente.')}
 ],
 ex:[
  nu("60 un a R$ 8 e compra de 40 un a R$ 10. Qual o novo custo médio?",8.8,"(480 + 400) ÷ 100 = 8,80.","R$"),
  nu("Venda de 50 unidades a custo médio de R$ 8,80. CMV?",440,"50 × 8,80 = 440.","R$"),
  nu("Depois da venda, restam 50 un a R$ 8,80. Nova compra de 50 un a R$ 11,20. Nova média?",10,"(440 + 560) ÷ 100 = 10.","R$"),
  tf("Uma venda altera o custo médio unitário do estoque.",false,"Só as compras mudam a média."),
  mc("Com preços subindo, comparado ao PEPS, o custo médio tende a dar:",["*CMV maior e estoque final menor","CMV menor","O mesmo CMV sempre","Estoque final maior"],"A média inclui custos mais altos na saída."),
  fl("No custo médio, a média é recalculada a cada {compra}.",["venda","mês"],"Média ponderada móvel.")
 ]},
{id:"mercado4", title:"Quebras e validade", icon:"🗑️",
 learn:[
  {h:"Perdas fazem parte", b:`<p>Produtos vencidos, embalagens rasgadas e furtos reduzem o estoque sem gerar venda. Essa perda vai para o resultado.</p>` + lanc([['D','Perdas com estoques','300'],['C','Estoques','300']])},
  {h:"Medindo a perda", b:eq('Índice de quebra = Perdas ÷ Vendas') + box('exemplo','Perdas de R$ 1.500 num mês com vendas de R$ 150.000: quebra de 1%.')}
 ],
 ex:[
  en("Iogurtes vencidos, com custo de R$ 300, foram descartados.","Perdas com estoques","Estoques",["CMV","Receita de vendas"],"A perda sai do estoque e vai para o resultado."),
  nu("Perdas de R$ 2.400 e vendas de R$ 200.000. Índice de quebra em %?",1.2,"2.400 ÷ 200.000 = 1,2%.","%"),
  nu("Sistema: 120 caixas de leite. Contagem: 112. Custo de R$ 45 por caixa. Valor da perda?",360,"8 × 45 = 360.","R$"),
  tf("Produto vencido descartado continua no estoque até o fim do ano.",false,"Deve ser baixado quando descartado."),
  cl("Causa comum de quebra?",["Sim","Não"],"Produto vencido:0|Embalagem danificada:0|Furto:0|Venda normal com nota:1","Quebra é saída sem venda."),
  mc("Uma boa forma de reduzir quebras por validade é:",["*Colocar na frente os produtos que vencem antes","Comprar sempre o dobro","Esconder os vencidos","Não contar o estoque"],"PEPS físico na prateleira.")
 ]},

/* ---------------- Custos: Hamburgueria do Beto ---------------- */
{id:"burger1", title:"Quanto custa um hambúrguer?", icon:"🍔",
 learn:[
  {h:"Ficha técnica", b:`<p>O Beto lista tudo o que vai em um hambúrguer, com a quantidade e o custo.</p>` + tbl(['Ingrediente','Custo por lanche'],[['Pão','R$ 1,50'],['Carne 150 g','R$ 6,00'],['Queijo','R$ 1,80'],['Salada e molho','R$ 0,70'],['Embalagem','R$ 1,00'],['<b>Total variável</b>','<b>R$ 11,00</b>']])},
  {h:"Por que a ficha técnica importa", b:box('dica','Sem ficha técnica, o preço é chute. Com ela, cada ingrediente que sobe de preço aparece na hora.')}
 ],
 ex:[
  nu("Pão 1,50 + carne 6,00 + queijo 1,80 + salada e molho 0,70 + embalagem 1,00. Custo variável do lanche?",11,"Soma: 11,00.","R$"),
  nu("A carne subiu para R$ 7,20 por porção. Novo custo variável do lanche?",12.2,"11,00 + 1,20 = 12,20.","R$"),
  cl("Custo variável ou fixo da hamburgueria?",["Variável","Fixo"],"Carne do lanche:0|Aluguel do ponto:1|Embalagem:0|Salário do gerente:1|Pão:0","Variável muda com cada lanche vendido."),
  tf("A embalagem de viagem é um custo variável.",true,"Cada lanche vendido usa uma."),
  nu("Custo variável de R$ 11 por lanche. Quanto custam os ingredientes de 300 lanches?",3300,"300 × 11 = 3.300.","R$"),
  mc("A ficha técnica serve principalmente para:",["*Saber o custo de cada produto e controlar o preço","Pagar o aluguel","Contratar funcionários","Fazer propaganda"],"Custo por unidade.")
 ]},
{id:"burger2", title:"Margem de contribuição do lanche", icon:"💵",
 learn:[
  {h:"O que sobra de cada venda", b:eq('Margem de contribuição = Preço − Custos e despesas variáveis') + box('exemplo','Lanche vendido por R$ 30. Custo variável R$ 11 e taxa do aplicativo de entrega de 20% do preço (R$ 6). Margem: 30 − 11 − 6 = <b>R$ 13</b>.')},
  {h:"Balcão ou aplicativo?", b:tbl(['Canal','Preço','Variáveis','Margem'],[['Balcão','R$ 30','R$ 11','R$ 19'],['Aplicativo (20%)','R$ 30','R$ 17','R$ 13']])}
 ],
 ex:[
  nu("Preço R$ 30, custo variável R$ 11, sem taxa (venda no balcão). Margem de contribuição?",19,"30 − 11 = 19.","R$"),
  nu("Preço R$ 30, custo variável R$ 11, taxa do aplicativo de 20% do preço. Margem?",13,"30 − 11 − 6 = 13.","R$"),
  nu("Combo por R$ 42 com custo variável de R$ 16 e taxa de 20%. Margem?",17.6,"42 − 16 − 8,40 = 17,60.","R$"),
  tf("A taxa do aplicativo é uma despesa variável, porque acompanha cada venda.",true,"Muda com o volume vendido."),
  mc("Para melhorar a margem no aplicativo, Beto pode:",["*Ter preço um pouco maior no aplicativo ou reduzir custos variáveis","Aumentar o aluguel","Contratar mais gente","Nada"],"A margem depende de preço e variáveis."),
  fl("Margem de contribuição = preço − custos e despesas {variáveis}.",["fixos","totais"],"O que sobra para pagar os fixos.")
 ]},
{id:"burger3", title:"Quantos lanches para empatar?", icon:"⚖️",
 learn:[
  {h:"Os custos fixos do mês", b:tbl(['Fixo','Valor'],[['Aluguel','R$ 4.000'],['Salários','R$ 7.000'],['Energia e gás (parte fixa)','R$ 1.000'],['<b>Total</b>','<b>R$ 12.000</b>']])},
  {h:"Ponto de equilíbrio", b:eq('PE = Custos fixos ÷ Margem de contribuição por lanche') + box('exemplo','12.000 ÷ 16 (margem média) = <b>750 lanches</b> por mês, cerca de 25 por dia.')}
 ],
 ex:[
  nu("Custos fixos de R$ 12.000 e margem média de R$ 16. Quantos lanches no mês para empatar?",750,"12.000 ÷ 16 = 750.","lanches"),
  nu("750 lanches por mês, abrindo 30 dias. Quantos por dia?",25,"750 ÷ 30 = 25.","lanches"),
  nu("Vendendo 900 lanches com margem de R$ 16 e fixos de R$ 12.000, qual o lucro?",2400,"900 × 16 − 12.000 = 2.400.","R$"),
  tf("Se o aluguel subir, o ponto de equilíbrio sobe.",true,"Mais custo fixo para cobrir."),
  nu("Beto reduziu o custo variável e a margem foi para R$ 20. Novo ponto de equilíbrio?",600,"12.000 ÷ 20 = 600.","lanches"),
  mc("Vender 700 lanches no mês significa:",["*Prejuízo, porque está abaixo dos 750","Lucro","Empate","Não dá para saber"],"Abaixo do ponto de equilíbrio.")
 ]},
{id:"burger4", title:"Promoção vale a pena?", icon:"🎉",
 learn:[
  {h:"Terça em dobro", b:`<p>Beto pensa em vender o segundo lanche pela metade às terças, dia fraco. A pergunta: a promoção aumenta o lucro?</p>` + box('exemplo','Sem promoção: 20 lanches a R$ 30, margem R$ 19 cada = R$ 380. Com promoção: 50 lanches, metade a R$ 30 e metade a R$ 15. Margens: 25 × 19 + 25 × 4 = <b>R$ 575</b>.')},
  {h:"Os fixos não mudam", b:box('regra','Numa decisão de curto prazo, com capacidade sobrando, compare a margem extra: aluguel e salários já existem de qualquer jeito.')}
 ],
 ex:[
  nu("Lanche com promoção por R$ 15 e custo variável de R$ 11. Margem desse lanche?",4,"15 − 11 = 4.","R$"),
  nu("Terça sem promoção: 20 lanches com margem de R$ 19. Margem total?",380,"20 × 19 = 380.","R$"),
  nu("Com promoção: 25 lanches com margem de R$ 19 e 25 com margem de R$ 4. Margem total?",575,"475 + 100 = 575.","R$"),
  tf("Nesse exemplo, a promoção aumenta a margem total da terça.",true,"575 é maior que 380."),
  mc("Uma promoção com preço abaixo do custo variável:",["*Reduz o resultado a cada unidade vendida","Sempre aumenta o lucro","Não afeta nada","Reduz os custos fixos"],"Margem negativa em cada venda."),
  tf("Na decisão da promoção, o aluguel da loja deve ser dividido de novo pelos lanches extras.",false,"O aluguel já existe de qualquer forma.")
 ]},

/* ---------------- Demonstrações: Farmácia Vida ---------------- */
{id:"farmacia1", title:"O balanço da Farmácia Vida", icon:"💊",
 learn:[
  {h:"A fotografia de 31/12", b:tbl(['Ativo','R$'],[['Caixa e bancos','40.000'],['Clientes (convênios)','60.000'],['Estoques','150.000'],['Imobilizado líquido','110.000'],['<b>Total do ativo</b>','<b>360.000</b>']]) + tbl(['Passivo e PL','R$'],[['Fornecedores','90.000'],['Salários a pagar','20.000'],['Empréstimos (longo prazo)','100.000'],['Patrimônio líquido','150.000'],['<b>Total</b>','<b>360.000</b>']])},
  {h:"O que chama atenção", b:ul(['O estoque é o maior ativo: remédio parado é dinheiro parado.','Os convênios pagam depois: surgem valores a receber.','Ativo total = Passivo + PL.'])}
 ],
 ex:[
  nu("Farmácia Vida: caixa e bancos R$ 40.000, clientes R$ 60.000, estoques R$ 150.000 e imobilizado líquido R$ 110.000. Qual o ativo circulante (caixa, clientes e estoques)?",250000,"40 + 60 + 150 = 250 mil.","R$"),
  nu("Farmácia Vida: fornecedores R$ 90.000, salários a pagar R$ 20.000 e empréstimos de longo prazo R$ 100.000. Qual o passivo circulante?",110000,"Passivo circulante = fornecedores + salários a pagar: 90 + 20 = 110 mil. O empréstimo é de longo prazo, fora do circulante.","R$"),
  nu("Farmácia Vida: ativo circulante de R$ 250.000 e passivo circulante de R$ 110.000. Qual a liquidez corrente? (use vírgula)",2.27,"250 ÷ 110 ≈ 2,27.","",undefined,0.01),
  nu("Farmácia Vida: ativo circulante de R$ 250.000, dos quais R$ 150.000 são estoques, e passivo circulante de R$ 110.000. Qual a liquidez seca (sem os estoques)? (use vírgula)",0.91,"(250 − 150) ÷ 110 ≈ 0,91.","",undefined,0.01),
  tf("Uma farmácia com liquidez seca de 0,91 depende de vender o estoque para cobrir as dívidas de curto prazo.",true,"Sem contar os estoques, o ativo circulante não cobre o passivo circulante: a liquidez seca é menor que 1."),
  mc("Na Farmácia Vida, o caixa e os bancos somam R$ 40 mil, os clientes R$ 60 mil, os estoques R$ 150 mil e o imobilizado R$ 110 mil. Qual é o maior ativo?",["*Estoques","Caixa e bancos","Clientes","Imobilizado"],"R$ 150 mil em remédios e produtos: dinheiro parado nas prateleiras.")
 ]},
{id:"farmacia2", title:"A DRE da farmácia", icon:"📈",
 learn:[
  {h:"O ano em números", b:tbl(['Linha','R$'],[['Receita líquida','1.200.000'],['(−) CMV','(840.000)'],['= Lucro bruto','360.000'],['(−) Despesas operacionais','(288.000)'],['= Resultado antes dos tributos sobre o lucro','72.000'],['(−) Tributos sobre o lucro','(12.000)'],['= Lucro líquido','60.000']])},
  {h:"As margens", b:eq('Margem bruta = 360 ÷ 1.200 = 30%') + eq('Margem líquida = 60 ÷ 1.200 = 5%')}
 ],
 ex:[
  nu("Receita líquida 1.200.000 e CMV 840.000. Lucro bruto?",360000,"1.200.000 − 840.000 = 360.000.","R$"),
  nu("Receita líquida de R$ 1.200.000 e lucro bruto de R$ 360.000. Qual a margem bruta em %?",30,"360 ÷ 1.200 = 30%.","%"),
  nu("Receita líquida de R$ 1.200.000 e lucro líquido de R$ 60.000. Qual a margem líquida em %?",5,"60 ÷ 1.200 = 5%.","%"),
  nu("ROE com lucro de 60.000 e PL de 150.000, em %?",40,"60 ÷ 150 = 40%.","%"),
  tf("Uma margem líquida de 5% significa R$ 5 de lucro a cada R$ 100 vendidos.",true,"Leitura da margem."),
  mc("Se uma farmácia negociar desconto com os fornecedores, qual margem melhora primeiro?",["*A margem bruta","Nenhuma","Só a liquidez","O capital social"],"CMV menor, lucro bruto maior.")
 ]},
{id:"farmacia3", title:"Prazos: estoque, convênio e fornecedor", icon:"⏱️",
 learn:[
  {h:"Os três prazos", b:tbl(['Prazo','Fórmula','Farmácia'],[['Estocagem','Estoque ÷ CMV × 360','150 ÷ 840 × 360 ≈ 64 dias'],['Recebimento','Clientes ÷ Receita × 360','60 ÷ 1.200 × 360 = 18 dias'],['Pagamento','Fornecedores ÷ Compras × 360','≈ 38 dias (compras de 850 mil)']])},
  {h:"Ciclo financeiro", b:eq('Ciclo financeiro = 64 + 18 − 38 = 44 dias') + box('dica','Durante 44 dias a farmácia financia a operação com recursos próprios ou empréstimos.')}
 ],
 ex:[
  nu("Estoque 150 mil e CMV anual 840 mil. Prazo médio de estocagem, em dias (ano de 360)? (arredonde)",64,"150 ÷ 840 × 360 ≈ 64.","dias",undefined,1),
  nu("Clientes 60 mil e receita anual 1.200 mil. Prazo médio de recebimento em dias?",18,"60 ÷ 1.200 × 360 = 18.","dias"),
  nu("Estocagem 64 dias, recebimento 18 e pagamento 38. Ciclo financeiro?",44,"64 + 18 − 38 = 44.","dias"),
  tf("Negociar prazo maior com fornecedores reduz o ciclo financeiro.",true,"O prazo de pagamento é subtraído."),
  mc("Qual ação reduz o ciclo financeiro da farmácia?",["*Comprar remédios em menor quantidade e com mais frequência","Aumentar o estoque parado","Dar mais prazo aos convênios","Pagar fornecedores antes do vencimento"],"Menos dias de estoque."),
  fl("Ciclo financeiro = estocagem + recebimento − {pagamento}.",["lucro","venda"],"Tempo que a empresa financia a operação.")
 ]},

/* ---------------- Vida: primeiro emprego ---------------- */
{id:"emprego1", title:"O primeiro holerite", icon:"📄",
 learn:[
  {h:"Bruto não é o que cai na conta", b:`<p>Ana começou a trabalhar. No holerite aparecem o salário <b>bruto</b>, os <b>descontos</b> (contribuição previdenciária, imposto de renda quando houver, vale-transporte) e o <b>líquido</b>, que cai na conta.</p>` + box('atencao','Percentuais e faixas de desconto mudam por lei. Nesta lição, os valores de desconto são exemplos dados no próprio exercício.')},
  {h:"Um holerite de exemplo", b:tbl(['Item','R$'],[['Salário bruto','2.500,00'],['(−) Previdência (exemplo)','(200,00)'],['(−) Vale-transporte (exemplo)','(150,00)'],['= Líquido','2.150,00']])}
 ],
 ex:[
  nu("Bruto R$ 2.500; descontos de R$ 200 e R$ 150. Salário líquido?",2150,"2.500 − 350 = 2.150.","R$"),
  mt([["Salário bruto","Valor antes dos descontos"],["Descontos","Previdência, IR, benefícios"],["Salário líquido","O que cai na conta"]],"Termos do holerite."),
  tf("O orçamento pessoal deve partir do salário líquido.",true,"É o dinheiro que realmente entra."),
  nu("Bruto de R$ 3.000 com descontos totais de R$ 420. Líquido?",2580,"3.000 − 420 = 2.580.","R$"),
  mc("Ana viu 'FGTS' no holerite, mas o valor não saiu do salário dela. Isso porque:",["*O FGTS é depositado pelo empregador, sem desconto do salário","É um erro","É um desconto escondido","É uma multa"],"É um depósito feito pela empresa em conta vinculada."),
  nu("Descontos totais de R$ 350 sobre bruto de R$ 2.500. Que % do bruto foi descontado?",14,"350 ÷ 2.500 = 14%.","%")
 ]},
{id:"emprego2", title:"O orçamento da Ana", icon:"🗓️",
 learn:[
  {h:"Dividindo o líquido", b:tbl(['Destino','R$'],[['Aluguel dividido e contas','900'],['Mercado e transporte','500'],['Lazer','300'],['Curso','150'],['Reserva','300']]) + box('dica','Pagar a reserva primeiro, no dia do salário, ajuda a não gastar o que era para guardar.')},
  {h:"Competência na vida real", b:`<p>A compra no cartão feita hoje vai para a fatura do mês que vem, mas o gasto é de hoje. Anotar no dia evita susto.</p>`}
 ],
 ex:[
  nu("Líquido de R$ 2.150 e gastos planejados de R$ 1.850 (sem a reserva). Quanto sobra para a reserva?",300,"2.150 − 1.850 = 300.","R$"),
  nu("Guardando R$ 300 por mês, em quantos meses Ana junta R$ 3.600?",12,"3.600 ÷ 300 = 12.","meses"),
  tf("Guardar só o que sobra no fim do mês costuma funcionar melhor do que guardar no dia do salário.",false,"O que sobra no fim costuma ser nada."),
  cl("Necessidade ou desejo?",["Necessidade","Desejo"],"Aluguel:0|Transporte para o trabalho:0|Tênis de marca novo:1|Mercado:0|Streaming extra:1","Necessidade é o essencial para viver e trabalhar."),
  nu("Ana gasta R$ 40 por semana em lanches. Quanto isso dá em um mês de 4 semanas?",160,"40 × 4 = 160.","R$"),
  mc("Uma compra parcelada em 10 vezes:",["*Compromete o orçamento dos próximos 10 meses","Só afeta o mês da compra","Não precisa ser anotada","Não tem custo se não tiver juros"],"Cada parcela reduz a folga futura.")
 ]},
{id:"emprego3", title:"13º, férias e a reserva", icon:"🎁",
 learn:[
  {h:"Dinheiro que vem uma vez por ano", b:`<p>O 13º salário e as férias (com o adicional de um terço) são valores maiores que chegam em datas certas. Planejar evita que sumam em gastos pequenos.</p>` + eq('Férias = salário + salário ÷ 3')},
  {h:"Um plano simples", b:ol(['Reservar para os gastos do começo do ano (material, impostos da casa, seguros).','Reforçar a reserva de emergência.','Quitar dívidas caras.','Só então pensar em compras maiores.'])}
 ],
 ex:[
  nu("Salário de R$ 2.400. Quanto é o adicional de 1/3 de férias?",800,"2.400 ÷ 3 = 800.","R$"),
  nu("Salário de R$ 2.400. Salário de férias + 1/3 (valor bruto)?",3200,"2.400 + 800 = 3.200.","R$"),
  nu("Ana trabalhou 6 meses no ano. Com salário de R$ 2.400, qual o 13º proporcional bruto?",1200,"2.400 × 6 ÷ 12 = 1.200.","R$"),
  od("Ordene o plano para o 13º:",["Reservar para os gastos do começo do ano","Reforçar a reserva de emergência","Quitar dívidas caras","Pensar em compras maiores"],"Do essencial ao desejo."),
  tf("O 13º é proporcional aos meses trabalhados no ano.",true,"Um doze avos por mês trabalhado (em regra, 15 dias ou mais contam como mês)."),
  mc("Ana tem uma dívida no rotativo do cartão e recebeu o 13º. Uma boa decisão é:",["*Quitar a dívida do rotativo","Comprar um celular novo","Deixar o dinheiro parado na conta","Pagar só o mínimo da fatura"],"Juros do rotativo são muito altos.")
 ]},
{id:"emprego4", title:"Primeiros investimentos", icon:"🌱",
 learn:[
  {h:"Com a reserva formada", b:`<p>Com seis meses de gastos guardados, Ana começa a investir para objetivos de longo prazo.</p>` + tbl(['Objetivo','Prazo','Onde faz sentido pensar'],[['Reserva de emergência','Já','Liquidez diária e baixo risco'],['Intercâmbio','3 anos','Renda fixa com vencimento próximo do objetivo'],['Aposentadoria','30 anos','Carteira diversificada']])},
  {h:"Juros compostos a favor", b:box('exemplo','R$ 300 por mês, rendendo 0,8% ao mês, viram cerca de R$ 3.760 em 12 meses: R$ 3.600 guardados e cerca de R$ 160 de rendimentos.') + box('atencao','Rendimentos variam com as taxas do mercado. Os números são ilustrativos.')}
 ],
 ex:[
  nu("Gastos essenciais de R$ 1.700 por mês. Reserva de 6 meses?",10200,"6 × 1.700 = 10.200.","R$"),
  nu("R$ 1.000 rendendo 1% ao mês por 2 meses, juros compostos. Montante?",1020.1,"1.000 × 1,01 × 1,01 = 1.020,10.","R$",undefined,0.02),
  mc("Para a reserva de emergência, o mais importante é:",["*Resgate rápido e baixo risco","O maior retorno possível","Prazo de 10 anos","Ações de uma só empresa"],"A reserva precisa estar disponível."),
  tf("Investir antes de formar a reserva e com dívida no rotativo costuma ser um bom plano.",false,"Primeiro reserva e dívidas caras."),
  cl("Prazo do objetivo:",["Curto","Longo"],"Viagem em 8 meses:0|Aposentadoria:1|Curso no próximo semestre:0|Faculdade dos filhos daqui a 15 anos:1","Curto: até 1 ano; longo: muitos anos."),
  fl("Não coloque todos os ovos na mesma {cesta}.",["caixa","conta"],"Diversificar reduz o risco.")
 ]},

/* ---------------- Auditoria: auditando a Moda Aurora ---------------- */
{id:"audloja1", title:"Planejando a auditoria da loja", icon:"🔎",
 learn:[
  {h:"Entender o negócio", b:`<p>A auditoria da Moda Aurora começa por entender como ela vende: cartão, dinheiro, trocas, estoque e comissões. Onde há mais risco de erro relevante?</p>` + tbl(['Área','Risco'],[['Estoques','Alto: valor grande, perdas e furtos'],['Receita com cartão','Médio: conciliação com a administradora'],['Devoluções','Médio: podem esconder receita'],['Móveis','Baixo: valor pequeno']])},
  {h:"Materialidade", b:box('exemplo','Lucro antes dos tributos de R$ 400 mil. Se o auditor usar 5% como referência, a materialidade fica em R$ 20 mil.')}
 ],
 ex:[
  nu("Lucro antes dos tributos de R$ 400.000 e materialidade de 5%. Qual o valor?",20000,"5% de 400.000 = 20.000.","R$"),
  cl("Risco alto ou baixo nesta loja?",["Alto","Baixo"],"Estoque de roupas com muitas perdas:0|Araras e balcões:1|Receita em dinheiro sem controle de caixa:0|Seguro pago no início do ano:1","Mais risco onde é mais fácil errar ou desviar."),
  tf("O auditor dedica mais testes às áreas de maior risco.",true,"O trabalho é orientado pelo risco."),
  mc("Por que o estoque é uma área de alto risco numa loja de roupas?",["*Valor alto, perdas e furtos","Porque não tem valor","Porque não aparece no balanço","Porque é sempre exato"],"Valor e facilidade de distorção."),
  od("Ordene o início da auditoria:",["Entender o negócio","Identificar os riscos","Definir a materialidade","Planejar os testes"],"Entender antes de testar."),
  fl("As áreas com maior risco recebem {mais} procedimentos de auditoria.",["menos","nenhum"],"Abordagem baseada em risco.")
 ]},
{id:"audloja2", title:"Contagem do estoque", icon:"📦",
 learn:[
  {h:"Acompanhando o inventário", b:`<p>O auditor acompanha a contagem física no fim do ano: observa a equipe contar, faz contagens-teste e confere com o sistema.</p>` + ul(['Do sistema para a prateleira: o que está registrado existe?','Da prateleira para o sistema: o que existe está registrado?'])},
  {h:"Diferenças encontradas", b:box('exemplo','Em 40 itens testados, 3 tinham diferença. O auditor investiga as causas e amplia o teste se o erro puder ser relevante.')}
 ],
 ex:[
  mc("Pegar itens do sistema e procurá-los na prateleira testa principalmente:",["*Se os itens registrados existem","Se o preço está certo","Se o balanço fecha","Se houve lucro"],"Existência."),
  mc("Pegar itens da prateleira e procurá-los no sistema testa principalmente:",["*Se tudo o que existe foi registrado","Se os itens existem","A receita","O caixa"],"Integridade."),
  nu("Em 40 itens testados, 3 tinham diferença. Qual o % com diferença?",7.5,"3 ÷ 40 = 7,5%.","%"),
  tf("O auditor apenas lê o relatório de contagem, sem ir ao local.",false,"Ele acompanha e faz contagens-teste."),
  nu("Sistema: 200 calças a R$ 60. Contagem: 188. Valor da diferença?",720,"12 × 60 = 720.","R$"),
  mt([["Existência","Do sistema para a prateleira"],["Integridade","Da prateleira para o sistema"],["Valorização","Custo × quantidade conferidos"]],"O que cada teste confirma.")
 ]},
{id:"audloja3", title:"Receitas do cartão e devoluções", icon:"💳",
 learn:[
  {h:"Conciliando o cartão", b:`<p>O auditor compara as vendas no cartão do sistema da loja com os extratos da administradora e com os depósitos no banco.</p>` + eq('Vendas no sistema − taxas = depósitos da administradora')},
  {h:"Devoluções suspeitas", b:box('atencao','Muitas devoluções logo após o fim do ano podem indicar vendas registradas sem acontecer, para inflar a receita. O auditor olha as devoluções de janeiro.')}
 ],
 ex:[
  nu("Vendas no cartão no sistema: R$ 50.000. Taxas: R$ 1.250. Quanto deveria ter sido depositado?",48750,"50.000 − 1.250 = 48.750.","R$"),
  nu("Depósitos da administradora somaram R$ 47.750, mas o esperado era R$ 48.750. Diferença a investigar?",1000,"48.750 − 47.750 = 1.000.","R$"),
  tf("Muitas devoluções logo após o fechamento do ano merecem atenção do auditor.",true,"Podem indicar receita inflada."),
  mc("Uma venda registrada em 30/12 e 'devolvida' em 02/01, sem troca de mercadoria, pode indicar:",["*Receita registrada sem ter acontecido","Boa gestão","Nada","Erro do cliente"],"Sinal de alerta."),
  cl("Evidência útil para testar a receita do cartão?",["Sim","Não"],"Extrato da administradora:0|Depósitos no banco:0|Opinião do vendedor sobre o mês:1|Relatório de vendas do sistema:0","Evidência documental e de terceiros é mais forte."),
  fl("Comparar o sistema com o extrato da administradora é uma {conciliação}.",["depreciação","provisão"],"Confronto de duas fontes.")
 ]},

/* ---------------- Rotina digital: um dia no escritório contábil ---------------- */
{id:"escritorio1", title:"Segunda-feira no escritório", icon:"🗂️",
 learn:[
  {h:"A caixa de entrada", b:`<p>No escritório da Carla chegam, na segunda, documentos de vários clientes: notas de compra, extratos, recibos de aluguel e a folha de um salão.</p>` + ol(['Separar por cliente.','Conferir se o documento é da empresa certa.','Classificar e lançar.','Guardar o documento vinculado ao lançamento.'])},
  {h:"Prioridades", b:box('dica','Documentos com prazo (guias, folha) vêm primeiro. Um calendário de obrigações por cliente evita esquecimentos.')}
 ],
 ex:[
  od("Ordene a rotina com os documentos:",["Separar por cliente","Conferir se o documento é da empresa certa","Classificar e lançar","Guardar vinculado ao lançamento"],"Organizar antes de lançar."),
  mc("Chegou a nota de compra de um computador com CNPJ de outro cliente. O que fazer?",["*Devolver para correção ou lançar no cliente certo","Lançar no cliente que enviou","Ignorar","Lançar como receita"],"Entidade certa."),
  tf("Um calendário de obrigações por cliente ajuda a não perder prazos.",true,"Organização evita multas."),
  cl("Tem prazo curto e fixo?",["Prioridade","Pode esperar"],"Folha de pagamento do mês:0|Guia de tributo vencendo amanhã:0|Arquivar notas do ano passado:1|Organizar a pasta de fotos:1","Prazo manda na prioridade."),
  en("Chegou o recibo do aluguel de março do salão, pago pelo banco: R$ 1.300.","Despesa de aluguel","Bancos",["Receita de serviços","Fornecedores"],"Despesa do mês paga pelo banco."),
  fl("Todo lançamento deve ficar vinculado ao seu {documento}.",["palpite","e-mail"],"Rastreabilidade.")
 ]},
{id:"escritorio2", title:"Conciliando o banco do cliente", icon:"🏦",
 learn:[
  {h:"Extrato x razão", b:tbl(['Item','Extrato','Razão'],[['Saldo final','R$ 12.400','R$ 12.760'],['Tarifa não lançada','− 60','—'],['Cheque emitido e não compensado','—','− 300']])},
  {h:"Fechando a diferença", b:eq('Razão 12.760 − tarifa 60 = 12.700; extrato 12.400 + cheque 300 = 12.700') + box('regra','Cada diferença precisa de explicação documentada.')}
 ],
 ex:[
  nu("Razão R$ 12.760 e tarifa de R$ 60 ainda não lançada. Razão ajustado?",12700,"12.760 − 60 = 12.700.","R$"),
  nu("Extrato R$ 12.400 e cheque de R$ 300 ainda não compensado. Extrato ajustado?",12700,"12.400 + 300 = 12.700.","R$"),
  en("Lance a tarifa bancária de R$ 60 encontrada no extrato.","Despesa bancária","Bancos",["Receita financeira","Caixa"],"Despesa e saída do banco."),
  tf("O cheque emitido e ainda não compensado exige lançamento de ajuste na contabilidade.",false,"Ele já está no razão; só não chegou ao banco."),
  cl("Precisa de lançamento na contabilidade?",["Sim","Não"],"Tarifa só no extrato:0|Rendimento só no extrato:0|Cheque emitido e não compensado:1|Depósito lançado e ainda não processado pelo banco:1","Só se ajusta o que faltou registrar na contabilidade."),
  mc("Depois dos ajustes, razão e extrato ficaram em R$ 12.700. Isso indica que:",["*A conciliação fechou","Há fraude","O banco errou","O cliente tem lucro"],"Diferenças explicadas.")
 ]},
{id:"escritorio3", title:"Fechamento do mês do cliente", icon:"✅",
 learn:[
  {h:"Checklist de fechamento", b:ul(['Bancos conciliados.','Clientes e fornecedores batendo com os relatórios.','Estoque conferido.','Provisões do mês (férias, 13º, energia a pagar).','Depreciação lançada.','Balancete revisado e fechado.'])},
  {h:"Revisão analítica", b:box('dica','Compare com o mês anterior: uma despesa de energia três vezes maior pode ser erro de lançamento ou algo que o cliente precisa saber.')}
 ],
 ex:[
  od("Ordene o fechamento:",["Conciliar os bancos","Conferir clientes, fornecedores e estoque","Lançar provisões e depreciação","Revisar e fechar o balancete","Enviar os relatórios ao cliente"],"Conferir antes de fechar."),
  mc("A energia do mês veio três vezes maior que no mês anterior. Primeiro passo:",["*Verificar o documento e o lançamento","Ignorar","Apagar o lançamento","Dividir por três"],"Revisão analítica."),
  en("Provisão de férias do mês de um funcionário: R$ 280.","Despesa com férias","Férias a pagar",["Bancos","Receita de serviços"],"Despesa do mês e obrigação futura."),
  tf("Se o balancete fecha, o fechamento está automaticamente correto.",false,"Balancete fechado não prova ausência de erro de classificação."),
  nu("Energia de R$ 450 em fevereiro e R$ 1.350 em março. Quantas vezes maior?",3,"1.350 ÷ 450 = 3.","vezes"),
  cl("Faz parte do checklist de fechamento?",["Sim","Não"],"Conciliar bancos:0|Lançar a depreciação:0|Escolher a cor da capa do relatório:1|Revisar o balancete:0","Foco no que afeta os números.")
 ]},

/* ---------------- Imobilizado: a frota da transportadora ---------------- */
{id:"frota1", title:"Comprando os caminhões", icon:"🚛",
 learn:[
  {h:"O custo de cada caminhão", b:tbl(['Item','R$'],[['Preço do caminhão','400.000'],['Frete até a empresa','6.000'],['Emplacamento e documentação','4.000'],['<b>Custo do ativo</b>','<b>410.000</b>']]) + box('dica','Gastos para deixar o bem pronto para uso entram no custo.')},
  {h:"Vida útil e residual", b:box('exemplo','Vida útil estimada de 8 anos e valor residual de R$ 90.000: depreciação anual de (410.000 − 90.000) ÷ 8 = <b>R$ 40.000</b>.')}
 ],
 ex:[
  nu("Caminhão de R$ 400.000 + frete R$ 6.000 + emplacamento R$ 4.000. Custo do ativo?",410000,"Soma: 410.000.","R$"),
  nu("Custo 410.000, residual 90.000, vida útil 8 anos. Depreciação anual?",40000,"320.000 ÷ 8 = 40.000.","R$"),
  nu("Com 5 caminhões iguais, qual a depreciação anual da frota?",200000,"5 × 40.000 = 200.000.","R$"),
  en("Comprou um caminhão de R$ 410.000 financiado.","Veículos","Financiamentos a pagar",["Despesa com veículos","Estoques"],"Bem de uso e dívida."),
  tf("O seguro anual do caminhão entra no custo do ativo.",false,"Seguro de uso é despesa ao longo do período (pago antes, fica em seguros a apropriar)."),
  mc("A depreciação mensal de um caminhão de R$ 40.000 por ano é:",["*R$ 3.333,33","R$ 40.000","R$ 4.000","R$ 333,33"],"40.000 ÷ 12.")
 ]},
{id:"frota2", title:"Quilômetros rodados", icon:"🛣️",
 learn:[
  {h:"Depreciar pelo uso", b:`<p>Para caminhões, o desgaste acompanha os quilômetros. A empresa pode usar o método das unidades produzidas (aqui, km rodados).</p>` + eq('Depreciação por km = (Custo − Residual) ÷ km totais esperados') + box('exemplo','(410.000 − 90.000) ÷ 800.000 km = R$ 0,40 por km. Um ano com 120.000 km: R$ 48.000.')},
  {h:"Manutenção x melhoria", b:tbl(['Gasto','Tratamento'],[['Troca de pneus e óleo','Despesa'],['Motor novo que aumenta a vida útil','Ativo']])}
 ],
 ex:[
  nu("Base depreciável de R$ 320.000 para 800.000 km. Depreciação por km?",0.4,"320.000 ÷ 800.000 = 0,40.","R$"),
  nu("Com R$ 0,40 por km, qual a depreciação de um ano com 120.000 km?",48000,"120.000 × 0,40 = 48.000.","R$"),
  nu("E num ano com 90.000 km?",36000,"90.000 × 0,40 = 36.000.","R$"),
  cl("Despesa ou ativo?",["Despesa","Ativo"],"Troca de pneus:0|Motor novo que estende a vida útil:1|Lavagem:0|Troca de óleo:0","Só melhoria que gera benefício extra vai para o ativo."),
  tf("Pelo método de km rodados, a depreciação varia de acordo com o uso no ano.",true,"Mais km, mais depreciação."),
  mc("Por que usar km rodados em vez do método linear para caminhões?",["*Porque o desgaste acompanha o uso","Porque é proibido o linear","Para pagar menos imposto","Porque não há vida útil"],"O método deve refletir o consumo dos benefícios.")
 ]},
{id:"frota3", title:"Vendendo um caminhão velho", icon:"🏷️",
 learn:[
  {h:"Valor contábil na venda", b:box('exemplo','Caminhão com custo de R$ 410.000 e depreciação acumulada de R$ 300.000: valor contábil de R$ 110.000. Vendido por R$ 130.000: ganho de R$ 20.000.') + lanc([['D','Bancos','130.000'],['D','Depreciação acumulada','300.000'],['C','Veículos','410.000'],['C','Ganho na venda de imobilizado','20.000']])},
  {h:"Perda na venda", b:`<p>Se o caminhão fosse vendido por R$ 90.000, haveria perda de R$ 20.000 (110.000 − 90.000).</p>`}
 ],
 ex:[
  nu("Custo 410.000, depreciação acumulada 300.000. Valor contábil?",110000,"410.000 − 300.000 = 110.000.","R$"),
  nu("Vendido por 130.000. Ganho na venda?",20000,"130.000 − 110.000 = 20.000.","R$"),
  nu("Se fosse vendido por 95.000, qual seria a perda?",15000,"110.000 − 95.000 = 15.000.","R$"),
  tf("Na venda, a depreciação acumulada do caminhão também é baixada.",true,"Ela pertence ao bem vendido."),
  mc("Ganho na venda de imobilizado aparece na DRE como:",["*Outras receitas (não é receita de vendas da atividade)","Receita de serviços de transporte","Redução do CMV","Aumento do capital"],"Não é a atividade principal."),
  tf("O valor contábil de um bem é sempre igual ao preço que ele vale no mercado.",false,"É custo menos depreciação acumulada.")
 ]}
];
