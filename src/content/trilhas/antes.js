import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, ew, od, ep, ts } from '../../engine/exercises/factories.js';

export default [
{id:"antes1", title:"Porcentagem", icon:"💯",
 learn:[
  {h:"O que é porcentagem", b:`<p>Porcentagem significa <b>“por cem”</b>. 25% são 25 partes de cada 100.</p>` + eq('25% = 25 ÷ 100 = 0,25') + box('exemplo','25% de R$ 200 = 0,25 × 200 = <b>R$ 50</b>.')},
  {h:"Atalhos para fazer de cabeça", b:tbl(['Percentual','Atalho','Exemplo com 360'],[['10%','Divida por 10','36'],['1%','Divida por 100','3,6'],['50%','Metade','180'],['5%','Metade de 10%','18'],['20%','Dobro de 10%','72']])},
  {h:"Aumentos e descontos", b:eq('Valor final = Valor × (1 ± taxa)') + ul(['Aumento de 10% sobre 200: 200 × 1,10 = <b>220</b>','Desconto de 10% sobre 200: 200 × 0,90 = <b>180</b>'])},
  {h:"Quanto por cento é?", b:eq('Percentual = parte ÷ total × 100') + box('exemplo','Lucro de 30 em vendas de 200: 30 ÷ 200 = 0,15 = <b>15%</b>. Isso é a margem de lucro!') + box('dica','Porcentagem aparece em tudo na Contabilidade: impostos, margens, juros, índices.')}
 ],
 ex:[
  nu("Quanto é 10% de R$ 450?",45,"Divida por 10: 450 ÷ 10 = 45.","R$","10% é dividir por 10."),
  nu("Quanto é 25% de R$ 800?",200,"0,25 × 800 = 200. Ou: um quarto de 800.","R$","25% é um quarto."),
  mc("Como fica 8% na forma decimal?",["*0,08","0,8","8,0","0,008"],"8 ÷ 100 = 0,08."),
  nu("Um produto de R$ 150 teve aumento de 20%. Qual o novo preço?",180,"150 × 1,20 = 180.","R$","Multiplique por 1,20."),
  nu("Um produto de R$ 80 teve desconto de 15%. Por quanto ficou?",68,"80 × 0,85 = 68.","R$","Desconto de 15%: multiplique por 0,85."),
  nu("Vendas de R$ 400 geraram lucro de R$ 60. Qual a margem?",15,"60 ÷ 400 = 0,15 = 15%.","%","Parte ÷ total × 100."),
  tf("5% de um valor é a metade de 10% desse valor.",true,"10% ÷ 2 = 5%. Atalho ótimo para conta de cabeça."),
  wr("Porcentagem significa “por ___”. Escreva o número por extenso.",["cem","cento"],"Por cento = por cem. 30% são 30 de cada 100."),
  fl("Para calcular {10%} de um valor, basta dividi-lo por {10}.",["50%","100"],"Dividir por 10 dá 10%; dividir por 100 dá 1%.")
 ]},
{id:"antes2", title:"Regra de três e rateio", icon:"🔺",
 learn:[
  {h:"Proporção", b:`<p>Quando duas grandezas crescem juntas na mesma medida, elas são <b>diretamente proporcionais</b>.</p>` + box('exemplo','2 pães custam R$ 3. Então 4 pães custam R$ 6.')},
  {h:"Regra de três", b:tbl(['Pães','Preço'],[['2','3'],['10','x']]) + `<p>Multiplique cruzado: 2 × x = 10 × 3, então x = 30 ÷ 2 = <b>15</b>.</p>`},
  {h:"Na Contabilidade", b:box('exemplo','Depreciação de R$ 12.000 por ano. Quanto em 5 meses? 12.000 ÷ 12 × 5 = <b>R$ 5.000</b>.') + `<p>Sempre que algo é distribuído no tempo (seguro, depreciação, 13º), aparece uma regra de três.</p>`},
  {h:"Rateio proporcional", b:`<p><b>Rateio</b> é dividir um valor entre partes de forma proporcional.</p>` + box('exemplo','Aluguel de R$ 3.000 dividido pela área: setor A tem 60 m² e setor B 40 m². A fica com 60% = R$ 1.800; B com 40% = R$ 1.200.')}
 ],
 ex:[
  nu("3 cadernos custam R$ 18. Quanto custam 7 cadernos?",42,"18 ÷ 3 = 6 por caderno; 6 × 7 = 42.","R$","Ache primeiro o preço de um."),
  nu("Um seguro anual de R$ 2.400 cobre 12 meses. Quanto corresponde a 1 mês?",200,"2.400 ÷ 12 = 200.","R$"),
  nu("Depreciação anual de R$ 6.000. Quanto em 4 meses?",2000,"6.000 ÷ 12 × 4 = 2.000.","R$","Descubra o valor de um mês."),
  nu("Aluguel de R$ 5.000 rateado por área: setor A tem 30 m² e setor B 70 m². Quanto fica para o setor A?",1500,"A tem 30% da área: 5.000 × 0,30 = 1.500.","R$","Qual a fatia de A no total de 100 m²?"),
  tf("Se 4 horas de trabalho custam R$ 100, 8 horas custam R$ 200.",true,"Proporção direta: dobra uma, dobra a outra."),
  mc("Na regra de três direta, depois de montar a tabela você:",["*Multiplica cruzado e isola o x","Soma todos os números","Divide tudo por 100","Subtrai os valores"],"Multiplicação cruzada: a × x = b × c."),
  fl("Dividir um custo entre setores de forma proporcional se chama {rateio}.",["estorno","saldo"],"O rateio aparece muito nos custos indiretos."),
  wr("Qual é o nome da técnica de multiplicar cruzado para achar um valor proporcional? (três palavras)",["regra de tres","regra de 3"],"Regra de três.")
 ]},
{id:"antes3", title:"Positivo, negativo e saldo", icon:"➕",
 learn:[
  {h:"Entrou e saiu", b:`<p>Pense na sua conta do banco: entradas somam, saídas subtraem. O resultado é o <b>saldo</b>.</p>` + tbl(['Movimento','Valor'],[['Saldo inicial','500'],['Salário','+ 2.000'],['Mercado','− 350'],['Conta de luz','− 150'],['<b>Saldo final</b>','<b>2.000</b>']])},
  {h:"Números negativos", b:`<p>Saldo negativo quer dizer que saiu mais do que entrou: você está devendo.</p>` + ul(['300 − 500 = <b>−200</b> (faltaram 200)','−200 é <b>menor</b> que −50']) + box('dica','Na Contabilidade, em vez de sinais, usamos lados: débito e crédito. Mas a lógica de somar e subtrair é a mesma.')},
  {h:"Parênteses nos relatórios", b:`<p>Em relatórios contábeis, número entre parênteses é <b>negativo</b> ou dedução.</p>` + tbl(['Linha','R$'],[['Receita','50.000'],['(−) Despesas','(35.000)'],['Resultado','15.000']])}
 ],
 ex:[
  nu("Saldo inicial de R$ 1.200, entrada de R$ 800 e saída de R$ 1.500. Qual o saldo final?",500,"1.200 + 800 − 1.500 = 500.","R$"),
  nu("Você tinha R$ 300 e pagou uma conta de R$ 450 usando o limite. Qual o saldo? (use o sinal de menos)",-150,"300 − 450 = −150. O sinal de menos indica dívida.","R$","Faça 300 − 450."),
  mc("Em um relatório contábil, o que significa (4.500)?",["*Um valor negativo de 4.500","Um valor positivo de 4.500","Um valor aproximado","Um valor em dólar"],"Parênteses indicam valor negativo ou dedução."),
  tf("−300 é maior que −100.",false,"Quanto mais à esquerda na reta, menor: −300 < −100."),
  od("Coloque em ordem, do menor para o maior:",["−500","−20","0","35","1.000"],"Negativos com número maior são menores."),
  nu("Lucro de R$ 2.000 em janeiro e prejuízo de R$ 3.500 em fevereiro. Qual o resultado acumulado?",-1500,"2.000 − 3.500 = −1.500 (prejuízo acumulado).","R$"),
  wr("Como se chama a diferença entre tudo o que entrou e tudo o que saiu de uma conta?",["saldo"],"Saldo = entradas − saídas.")
 ]},
{id:"antes4", title:"Juros simples e compostos", icon:"📈",
 learn:[
  {h:"O que são juros", b:`<p>Juros são o <b>preço do dinheiro no tempo</b>. Quem empresta recebe juros; quem pega emprestado paga.</p>` + tbl(['Termo','Significado'],[['Capital (C)','Valor inicial'],['Taxa (i)','Percentual por período'],['Tempo (t)','Número de períodos'],['Montante (M)','Capital + juros']])},
  {h:"Juros simples", b:eq('J = C × i × t') + box('exemplo','R$ 1.000 a 2% ao mês por 3 meses: 1.000 × 0,02 × 3 = <b>R$ 60</b>. Montante: R$ 1.060.')},
  {h:"Juros compostos", b:`<p>Juros sobre juros: a cada mês a taxa incide sobre o montante anterior.</p>` + eq('M = C × (1 + i)<sup>t</sup>') + tbl(['Mês','Montante a 2%'],[['0','1.000,00'],['1','1.020,00'],['2','1.040,40'],['3','1.061,21']])},
  {h:"Por que importa", b:`<p>Empréstimos, financiamentos, cartão de crédito e aplicações usam juros compostos. Na empresa, juros pagos são <b>despesa financeira</b> e juros recebidos são <b>receita financeira</b>.</p>` + box('atencao','O rotativo do cartão de crédito está entre as taxas mais altas do mercado.')}
 ],
 ex:[
  nu("Juros simples: R$ 2.000 a 3% ao mês por 4 meses. Quanto de juros?",240,"2.000 × 0,03 × 4 = 240.","R$","J = C × i × t."),
  nu("Qual o montante do exemplo anterior (capital + juros)?",2240,"2.000 + 240 = 2.240.","R$"),
  nu("Juros compostos: R$ 1.000 a 10% ao mês por 2 meses. Qual o montante?",1210,"1.000 × 1,1 = 1.100; 1.100 × 1,1 = 1.210.","R$","Aplique 10% duas vezes seguidas."),
  mc("Em juros compostos, a taxa incide sobre:",["*O montante acumulado até o período anterior","Sempre o capital inicial","Apenas os juros","Nada"],"É o famoso juros sobre juros."),
  tf("Com mesma taxa e prazo maior que um período, juros compostos rendem mais que juros simples.",true,"Os juros também passam a render juros."),
  mt([["Capital","Valor inicial"],["Taxa","Percentual por período"],["Montante","Capital + juros"],["Juros","Preço do dinheiro no tempo"]],"Vocabulário básico de matemática financeira."),
  mc("Para uma empresa que pegou empréstimo, os juros pagos são:",["*Despesa financeira","Receita financeira","Capital social","Ativo"],"Juros pagos reduzem o resultado."),
  wr("Como se chama o capital somado aos juros?",["montante"],"Montante = capital + juros.")
 ]},
{id:"antes5", title:"O que é uma empresa", icon:"🏪",
 learn:[
  {h:"Empresa e sócios", b:`<p>Empresa é uma organização que produz ou vende algo buscando <b>lucro</b>. Quem investe nela são os <b>sócios</b> (ou o empresário individual).</p>`},
  {h:"Formatos comuns no Brasil", b:tbl(['Tipo','Resumo'],[['MEI','Microempreendedor individual, faturamento de até R$ 81 mil por ano'],['SLU','Sociedade limitada com um único sócio'],['LTDA','Sociedade limitada: sócios respondem até o valor do capital'],['S.A.','Capital dividido em ações']])},
  {h:"CNPJ", b:`<p>O CNPJ é como o “CPF da empresa”: o número de cadastro na Receita Federal. Com ele a empresa emite notas, abre conta e paga tributos.</p>` + box('regra','CPF (pessoa) e CNPJ (empresa) são pessoas diferentes. O dinheiro de um não se mistura com o do outro.')},
  {h:"Comércio, indústria e serviços", b:ul(['<b>Comércio</b>: compra e revende (loja, mercado).','<b>Indústria</b>: transforma matéria-prima (fábrica).','<b>Serviços</b>: vende trabalho (salão, oficina, contador).'])}
 ],
 ex:[
  cl("Que tipo de atividade é?",["Comércio","Indústria","Serviços"],"Loja de roupas:0|Fábrica de móveis:1|Salão de beleza:2|Mercadinho:0|Escritório de contabilidade:2|Fábrica de sorvetes:1","Comércio revende; indústria transforma; serviços vende trabalho."),
  mc("O que é o CNPJ?",["*O cadastro da empresa na Receita Federal","O CPF do dono","Um tipo de imposto","Um livro contábil"],"Cadastro Nacional da Pessoa Jurídica."),
  tf("O MEI pode faturar até R$ 81 mil por ano.",true,"Esse é o limite anual do MEI."),
  mt([["MEI","Até R$ 81 mil por ano"],["LTDA","Sócios respondem até o capital"],["S.A.","Capital dividido em ações"],["SLU","Limitada com um só sócio"]],"Principais formatos de empresa."),
  wr("Qual a sigla do cadastro que funciona como o “CPF da empresa”?",["cnpj"],"CNPJ."),
  mc("Quem transforma matéria-prima em produto é uma empresa de:",["*Indústria","Comércio","Serviços","Governo"],"A indústria fabrica; o comércio revende."),
  ep("Com suas palavras: por que o dinheiro da empresa deve ficar separado do dinheiro do dono?","Porque a empresa é uma entidade separada do dono. Misturar os dois bagunça os números e impede saber se a empresa realmente dá lucro.",[["A empresa é separada do dono","separ","entidade","distint","diferent","nao mistur","outra pessoa","propri"],["Misturar distorce os números e o lucro","numer","controle","saber","lucro","resultado","informac","distorc","bagunc","errad","confus","prejuiz","conta"]],"Essa é a ideia de Entidade: patrimônio da empresa ≠ patrimônio do sócio.")
 ]},
{id:"antes6", title:"À vista, a prazo e parcelado", icon:"💳",
 learn:[
  {h:"À vista", b:`<p>Pagamento <b>na hora</b>: dinheiro, Pix, cartão de débito. Na Contabilidade, mexe direto no Caixa ou no Banco.</p>`},
  {h:"A prazo", b:`<p>Pagamento <b>depois</b>: em 30, 60 dias. Cada lado ganha algo diferente:</p>` + tbl(['Quem','O que surge'],[['Vendedor','Um direito a receber (Clientes)'],['Comprador','Uma dívida (Fornecedores)']])},
  {h:"Parcelado e cartão de crédito", b:`<p>Parcelado é a prazo dividido em partes. Numa venda no cartão de crédito, a loja recebe da operadora <b>depois</b>: até lá, é um valor a receber.</p>` + box('exemplo','R$ 1.000 a prazo ou R$ 950 à vista: desconto de 5% para pagar na hora.')}
 ],
 ex:[
  mc("Uma loja vende a prazo. Para ela, o valor a receber é:",["*Um direito (Clientes)","Uma dívida (Fornecedores)","Uma despesa","Capital social"],"Quem vende a prazo tem a receber."),
  mc("Uma empresa compra a prazo. Para ela, surge:",["*Uma obrigação com o fornecedor","Um direito","Uma receita","Um aumento de capital"],"Quem compra a prazo passa a dever."),
  cl("À vista ou a prazo?",["À vista","A prazo"],"Pix na hora:0|Boleto para 30 dias:1|Dinheiro no balcão:0|3 parcelas mensais:1|Duplicata para 60 dias:1","À vista é pago no ato; a prazo, depois."),
  nu("Preço de R$ 2.000 com 5% de desconto à vista. Quanto se paga à vista?",1900,"2.000 × 0,95 = 1.900.","R$"),
  nu("Compra de R$ 1.200 em 4 parcelas iguais, sem juros. Qual o valor de cada parcela?",300,"1.200 ÷ 4 = 300.","R$"),
  tf("Uma venda no cartão de crédito gera para a loja um valor a receber da operadora.",true,"O dinheiro chega depois; até lá é um direito."),
  wr("Complete: comprar e pagar só depois é comprar a ___.",["prazo"],"A prazo = pagamento futuro.")
 ]},
{id:"antes7", title:"Nota fiscal, boleto e recibo", icon:"🧾",
 learn:[
  {h:"Sem documento, sem registro", b:`<p>Todo registro contábil precisa de um <b>documento</b> que comprove o fato. É a prova de que ele aconteceu.</p>`},
  {h:"Os principais documentos", b:tbl(['Documento','Para que serve'],[['Nota fiscal','Comprova a venda e destaca tributos'],['Boleto','Cobrança bancária'],['Recibo','Comprova um pagamento'],['Duplicata','Título de uma venda a prazo'],['Contrato','Registra um acordo (aluguel, empréstimo)'],['Extrato bancário','Mostra a movimentação da conta']])},
  {h:"Lendo uma nota fiscal", b:ul(['Emitente (quem vendeu) e seu CNPJ','Destinatário (quem comprou)','Produtos, quantidades e valores','Tributos destacados, como ICMS e IPI','Valor total','Chave de acesso de 44 dígitos, para consultar a nota'])},
  {h:"Guarde tudo", b:box('dica','Em regra, documentos fiscais devem ser guardados por pelo menos 5 anos, prazo em que o Fisco pode revisar os tributos.')}
 ],
 ex:[
  mt([["Nota fiscal","Comprova a venda e destaca tributos"],["Boleto","Cobrança bancária"],["Recibo","Comprova um pagamento"],["Extrato bancário","Mostra a movimentação da conta"]],"Cada documento prova um tipo de fato."),
  tf("Um lançamento contábil pode ser feito sem nenhum documento que comprove o fato.",false,"Todo lançamento deve ter documento de suporte."),
  mc("Quantos dígitos tem a chave de acesso de uma NF-e?",["*44","11","14","20"],"A chave de 44 dígitos permite consultar a nota."),
  mc("Qual documento representa uma venda a prazo que pode ser cobrada?",["*Duplicata","Recibo","Extrato","Contrato social"],"A duplicata nasce da venda a prazo."),
  wr("Qual documento comprova a venda de mercadorias e destaca os tributos? (duas palavras)",["nota fiscal","nfe","nf","nota fiscal eletronica"],"A nota fiscal é o principal documento de uma venda."),
  tf("Em regra, documentos fiscais devem ser guardados por pelo menos 5 anos.",true,"É o prazo em que o Fisco pode revisar os tributos."),
  od("Ordene o caminho de uma venda a prazo:",["Emissão da nota fiscal","Envio do boleto ao cliente","Cliente paga o boleto","Banco credita o valor na conta"],"Primeiro se documenta, depois se cobra e se recebe.")
 ]},
{id:"antes8", title:"Caixa, banco e Pix", icon:"🏦",
 learn:[
  {h:"Caixa", b:`<p>Dinheiro em espécie guardado na empresa (gaveta, cofre). A conta se chama <b>Caixa</b>.</p>`},
  {h:"Bancos", b:`<p>Dinheiro em conta corrente. A conta se chama <b>Bancos</b> (ou Bancos conta movimento). Pix, TED e boletos passam por aqui.</p>` + box('dica','Pix recebido = dinheiro entrando no banco na hora.')},
  {h:"Aplicações e disponível", b:`<p>Dinheiro investido (CDB, fundos) rende juros: <b>Aplicações financeiras</b>.</p>` + eq('Disponível = Caixa + Bancos + aplicações de liquidez imediata') + `<p>Mover dinheiro entre elas não muda o total: depositar o caixa no banco é só uma troca de lugar.</p>`}
 ],
 ex:[
  en("Um cliente paga R$ 300 via Pix por uma venda feita a prazo.","Bancos","Clientes",["Caixa","Receita de vendas"],"O Pix cai no banco (débito) e baixa o valor a receber (crédito).","O dinheiro entrou em qual conta?"),
  en("A empresa deposita R$ 1.000 do caixa na conta bancária.","Bancos","Caixa",["Capital social","Receita de vendas"],"Bancos aumenta e Caixa diminui.","Uma conta de Ativo sobe e outra desce."),
  tf("Depositar dinheiro do caixa no banco aumenta o total disponível.",false,"É só uma troca entre contas do Ativo."),
  cl("Onde fica cada valor?",["Caixa","Bancos","Aplicações"],"Dinheiro na gaveta:0|Saldo da conta corrente:1|CDB de liquidez diária:2|Pix recebido:1|Troco no cofre:0","Espécie é Caixa; conta corrente é Bancos; investimento é Aplicação."),
  mc("O que forma o “Disponível” da empresa?",["*Caixa, bancos e aplicações de liquidez imediata","Estoques e máquinas","Fornecedores","Capital social"],"É o dinheiro que pode ser usado agora."),
  wr("Qual conta registra o dinheiro em espécie guardado na empresa?",["caixa"],"Caixa = dinheiro físico."),
  nu("Caixa R$ 800, Bancos R$ 5.200 e aplicação de liquidez imediata R$ 2.000. Qual o disponível?",8000,"800 + 5.200 + 2.000 = 8.000.","R$")
 ]}
];
