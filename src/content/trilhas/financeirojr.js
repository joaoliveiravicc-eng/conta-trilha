import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od, ep } from '../../engine/exercises/factories.js';

/* Carreiras · Analista Financeiro Jr: do zero ao que a rotina e a entrevista da vaga cobram. */
export default [
{id:"fj1", title:"O patrimônio de uma empresa", icon:"🏢",
 learn:[
  {h:"Ativo, Passivo e Patrimônio Líquido", b:`<p>Toda empresa tem um <b>patrimônio</b>: o conjunto de bens, direitos e obrigações que ela tem numa data.</p>` + tbl(['Grupo','O que é','Exemplos'],[['Ativo','O que a empresa tem ou tem a receber','Dinheiro no banco, clientes a receber, estoque, máquinas'],['Passivo','O que a empresa deve','Fornecedores, empréstimos, salários a pagar'],['Patrimônio Líquido (PL)','O que sobra: Ativo − Passivo','Capital dos sócios e lucros acumulados']])},
  {h:"A equação fundamental", b:eq('Ativo = Passivo + Patrimônio Líquido') + box('exemplo','Ativo de R$ 100.000 e Passivo de R$ 40.000: o PL é R$ 60.000. É o que sobraria para os sócios se a empresa pagasse tudo o que deve.')},
  {h:"Por que isso importa no financeiro", b:`<p>Toda conta que você vai ver no sistema da empresa pertence a um desses grupos. Contas a receber é Ativo; contas a pagar é Passivo.</p>` + box('dica','Diante de qualquer valor, pergunte: isso é algo que a empresa tem, algo que ela deve, ou o que sobra para os sócios?')}
 ],
 ex:[
  cl("Ativo ou passivo?",["Ativo","Passivo"],"Dinheiro no banco:0|Fornecedores a pagar:1|Clientes a receber:0|Empréstimo bancário:1|Estoque de mercadorias:0","Ativo é o que a empresa tem; passivo é o que ela deve."),
  nu("Uma empresa tem Ativo de R$ 250.000 e Passivo de R$ 90.000. Qual é o Patrimônio Líquido?",160000,"250.000 − 90.000 = 160.000.","R$"),
  mc("Qual destes itens é um Passivo?",["*Salários a pagar aos funcionários","Dinheiro em conta corrente","Máquinas da fábrica","Estoque de produtos"],"Salário a pagar é uma obrigação da empresa."),
  tf("Contas a receber de clientes é um Ativo da empresa.",true,"É um direito: dinheiro que a empresa vai receber."),
  fl("Ativo = Passivo + {Patrimônio Líquido}.",["Lucro","Receita"],"É a equação fundamental da Contabilidade.")
 ]},
{id:"fj2", title:"Débito e crédito, direto ao ponto", icon:"✍️",
 learn:[
  {h:"A regra que você vai usar todo dia", b:`<p>Todo lançamento tem <b>débito</b> e <b>crédito</b> de mesmo valor. Débito e crédito não significam “bom” ou “ruim”: são só os dois lados do registro.</p>` + tbl(['Grupo','Aumenta com','Diminui com'],[['Ativo','Débito','Crédito'],['Passivo e PL','Crédito','Débito'],['Despesa','Débito','Crédito'],['Receita','Crédito','Débito']])},
  {h:"Um recebimento de cliente", b:`<p>A empresa recebe no banco R$ 5.000 de um cliente que comprou a prazo:</p>` + lanc([['D','Bancos','5.000'],['C','Clientes','5.000']]) + box('exemplo','Bancos (Ativo) aumenta por débito. Clientes (Ativo) diminui por crédito: o direito virou dinheiro.')},
  {h:"Um pagamento de fornecedor", b:`<p>A empresa paga R$ 2.000 a um fornecedor pelo banco:</p>` + lanc([['D','Fornecedores','2.000'],['C','Bancos','2.000']]) + box('dica','No dia a dia, o sistema (ERP) costuma sugerir as contas. Entender débito e crédito é o que permite conferir se o lançamento automático está certo.')}
 ],
 ex:[
  mc("Uma conta de Ativo aumenta com:",["*Débito","Crédito","Nenhum dos dois"],"Ativo aumenta por débito e diminui por crédito."),
  mc("Uma conta de Passivo aumenta com:",["Débito","*Crédito"],"Passivo aumenta por crédito."),
  en("A empresa pagou R$ 800 de aluguel pelo banco.","Despesa de aluguel","Bancos",["Fornecedores","Receita de serviços"],"A despesa aumenta por débito; o banco diminui por crédito."),
  en("Um cliente pagou no banco R$ 3.000 de uma venda feita a prazo.","Bancos","Clientes",["Receita de vendas","Fornecedores"],"O direito a receber vira dinheiro. A receita já foi registrada na venda."),
  cl("Qual lado aumenta cada grupo?",["Débito","Crédito"],"Ativo:0|Receita:1|Despesa:0|Passivo:1|Patrimônio Líquido:1","Ativo e despesa aumentam por débito; passivo, PL e receita, por crédito."),
  tf("Num lançamento, o total de débitos precisa ser igual ao total de créditos.",true,"É o método das partidas dobradas.")
 ]},
{id:"fj3", title:"Receita, despesa e lucro", icon:"📈",
 learn:[
  {h:"De onde vem o lucro", b:`<p>A <b>DRE</b> (Demonstração do Resultado do Exercício) mostra, num período, quanto a empresa ganhou de receita e quanto consumiu de custos e despesas.</p>` + eq('Lucro = Receitas − Custos − Despesas')},
  {h:"Um mês simples", b:tbl(['Item','Valor'],[['Receita de vendas','R$ 40.000'],['(−) Custo das mercadorias vendidas','R$ 22.000'],['(−) Despesas administrativas','R$ 9.000'],['= Lucro do período','R$ 9.000']]) + box('dica','O lucro do mês é um dos primeiros números que um gestor pergunta ao financeiro.')},
  {h:"Receita não é dinheiro na mão", b:`<p>Uma venda a prazo já é <b>receita</b> no mês da venda, mesmo que o dinheiro entre depois. Esse é o regime de <b>competência</b>.</p>` + box('atencao','Lucro alto não significa caixa cheio. Você vai ver isso de novo no fluxo de caixa.')}
 ],
 ex:[
  nu("Receita de R$ 50.000 e custos e despesas de R$ 34.000. Qual é o lucro do período?",16000,"50.000 − 34.000 = 16.000.","R$"),
  mc("Uma venda feita a prazo em março e recebida em abril é receita de:",["*Março","Abril","Metade em cada mês"],"Pelo regime de competência, a receita pertence ao mês da venda."),
  tf("Uma empresa pode ter lucro no mês e, ainda assim, pouco dinheiro no banco.",true,"Vendas a prazo geram lucro antes de virar dinheiro."),
  nu("Despesas de R$ 12.000 e lucro de R$ 3.000 no mês. Qual foi a receita?",15000,"Receita = lucro + despesas = 3.000 + 12.000 = 15.000.","R$"),
  cl("Receita ou despesa?",["Receita","Despesa"],"Venda de mercadorias:0|Conta de energia:1|Serviço prestado a um cliente:0|Salário dos funcionários:1|Tarifa bancária:1","Receita é o que a empresa ganha com sua atividade; despesa é o que ela consome para funcionar.")
 ]},
{id:"fj4", title:"A rotina de contas a pagar", icon:"🧾",
 learn:[
  {h:"O que faz o contas a pagar", b:`<p>Controla tudo o que a empresa <b>deve pagar</b>: fornecedores, contas de consumo, tributos, aluguel. O objetivo é pagar o valor certo, para a pessoa certa, na data certa.</p>`},
  {h:"O ciclo de uma conta a pagar", b:ol(['Receber a nota fiscal e o boleto.','Conferir com o pedido de compra: fornecedor, valor, quantidade e vencimento.','Lançar no sistema e agendar o pagamento para a data de vencimento.','Depois do pagamento, dar baixa no título e arquivar o comprovante.']) + box('dica','Pagar muito antes do vencimento tira dinheiro do caixa sem necessidade, a não ser que haja desconto que compense.')},
  {h:"Erros que a conferência evita", b:ul(['Pagar duas vezes o mesmo boleto.','Pagar uma nota emitida para outra empresa (CNPJ errado).','Perder o vencimento e pagar multa e juros.','Pagar boleto falso: confira se o beneficiário é mesmo o fornecedor.']) + box('atencao','Conferir antes de pagar é a parte mais importante da rotina de um analista júnior.')}
 ],
 ex:[
  od("Ordene o ciclo de uma conta a pagar:",["Receber a nota fiscal e o boleto","Conferir com o pedido de compra","Lançar e agendar para o vencimento","Dar baixa e arquivar o comprovante"],"Do documento ao comprovante."),
  mc("Antes de pagar um boleto, o mais importante é:",["*Conferir fornecedor, valor e vencimento com a nota e o pedido","Pagar o quanto antes, sempre","Pagar primeiro e conferir depois"],"A conferência evita pagamento errado, duplicado ou fraudado."),
  tf("Pagar sempre antes do vencimento é a melhor prática, mesmo sem desconto.",false,"Sem desconto, antecipar só tira dinheiro do caixa mais cedo."),
  mc("O beneficiário do boleto é uma empresa diferente do fornecedor da nota. O que fazer?",["*Suspender o pagamento e confirmar com o fornecedor por um canal conhecido","Pagar, porque o valor está certo","Mudar o beneficiário no banco"],"Pode ser boleto adulterado. Confirme antes de pagar."),
  en("A empresa pagou pelo banco R$ 4.500 a um fornecedor.","Fornecedores","Bancos",["Despesa de compras","Clientes"],"A dívida diminui por débito e o banco diminui por crédito.")
 ]},
{id:"fj5", title:"A rotina de contas a receber", icon:"💰",
 learn:[
  {h:"O espelho do contas a pagar", b:`<p>Contas a receber cuida do que os <b>clientes devem</b> à empresa: emissão de boletos, acompanhamento dos vencimentos, baixa dos pagamentos e cobrança de quem atrasa.</p>`},
  {h:"Da venda ao recebimento", b:ol(['Emitir a nota fiscal e o boleto.','Registrar o título no sistema com o vencimento.','Conferir no extrato se o pagamento entrou e dar baixa.','Cobrar quem não pagou, com educação e firmeza.']) + box('exemplo','Um boleto de R$ 3.000 venceu dia 10. No dia 11, sem pagamento no extrato, o cliente entra na lista de cobrança.')},
  {h:"Prazo médio de recebimento", b:`<p>Quantos dias, em média, a empresa demora para receber suas vendas. Quanto <b>menor</b>, mais rápido o dinheiro chega ao caixa.</p>` + eq('Prazo médio = (Contas a receber ÷ Vendas a prazo do período) × dias do período')}
 ],
 ex:[
  od("Ordene o ciclo de uma conta a receber:",["Emitir nota fiscal e boleto","Registrar o título com o vencimento","Conferir o pagamento no extrato e dar baixa","Cobrar quem atrasou"],"Da venda à cobrança."),
  wr("Como se chama a situação do cliente que não pagou até o vencimento? (uma palavra)",["inadimplência","inadimplente","inadimplencia"],"Inadimplência é o atraso no pagamento."),
  nu("Contas a receber de R$ 30.000, vendas a prazo de R$ 90.000 no mês e mês de 30 dias. Qual é o prazo médio de recebimento?",10,"(30.000 ÷ 90.000) × 30 = 10 dias.","dias"),
  tf("Reduzir o prazo médio de recebimento costuma ser bom para o caixa.",true,"O dinheiro das vendas chega mais cedo."),
  mc("Um cliente pagou, mas o título continua em aberto no sistema. O que faltou?",["*Dar baixa no título a partir do extrato","Emitir outra nota fiscal","Cobrar o cliente de novo"],"Sem a baixa, o sistema mostra uma dívida que não existe mais e o cliente pode ser cobrado por engano.")
 ]},
{id:"fj6", title:"Juros, multa e inadimplência", icon:"⏰",
 learn:[
  {h:"O preço do atraso", b:`<p>Quando um pagamento atrasa, costumam incidir <b>multa</b> e <b>juros de mora</b>.</p>` + tbl(['Encargo','Como funciona'],[['Multa','Percentual fixo sobre o valor, cobrado uma única vez'],['Juros de mora','Percentual por dia ou por mês de atraso, sobre o valor em aberto']])},
  {h:"Calculando", b:box('exemplo','Boleto de R$ 1.000, multa de 2% e juros de 1% ao mês (0,033% ao dia), pago com 10 dias de atraso: multa R$ 20 e juros de cerca de R$ 3,33. Total: R$ 1.023,33.') + box('dica','Os percentuais valem os que estão no boleto ou no contrato. Confira sempre o documento.')},
  {h:"Perda esperada com clientes", b:`<p>Quando é provável que um cliente não pague, a empresa reconhece essa <b>perda estimada</b> antes de ela se confirmar, para não mostrar no balanço um valor a receber maior do que vai receber de fato.</p>` + box('dica','O relatório de títulos vencidos por faixa de atraso (aging) é a base dessa estimativa, e montá-lo costuma ser tarefa do júnior.')}
 ],
 ex:[
  nu("Boleto de R$ 2.000 com multa de 2% por atraso. Qual é o valor da multa?",40,"2% de 2.000 = 40.","R$"),
  nu("Boleto de R$ 3.000 pago com 1 mês de atraso, com juros de 1% ao mês e sem multa. Quanto se paga no total?",3030,"Juros: 1% de 3.000 = 30. Total: 3.000 + 30 = 3.030.","R$"),
  mc("A multa por atraso normalmente é cobrada:",["*Uma única vez, como percentual fixo","A cada dia de atraso","Só depois de um ano"],"Os juros de mora crescem com o tempo; a multa não."),
  wr("Como se chamam os juros cobrados pelo tempo de atraso? (três palavras)",["juros de mora","juros moratórios","juros moratorios"],"Juros de mora."),
  tf("A empresa pode reconhecer uma perda estimada com clientes antes de ter certeza de que eles não vão pagar.",true,"Assim o valor a receber no balanço fica mais próximo do que deve ser recebido."),
  mc("Um relatório que separa os títulos vencidos por faixa de atraso (até 30 dias, 31 a 60...) se chama:",["*Aging","Balancete","Razonete"],"O aging mostra há quanto tempo cada valor está vencido.")
 ]},
{id:"fj7", title:"Conciliação bancária", icon:"🏦",
 learn:[
  {h:"O que é conciliar", b:`<p><b>Conciliação bancária</b> é comparar os lançamentos do sistema da empresa com o extrato do banco, item por item, até os saldos baterem.</p>`},
  {h:"Passo a passo", b:ol(['Importar o extrato do banco do período.','Comparar cada movimento do extrato com um lançamento do sistema.','Investigar o que aparece só de um lado.','Registrar os ajustes com documento e conferir o saldo final.']) + box('exemplo','Uma tarifa bancária de R$ 45 aparece no extrato, mas não no sistema. É um item sem par que precisa ser lançado.')},
  {h:"Diferenças mais comuns", b:tbl(['Aparece só no...','Exemplo','O que fazer'],[['Extrato','Tarifa, juros, recebimento sem identificação','Lançar no sistema ou identificar o cliente'],['Sistema','Pagamento agendado que ainda não saiu','Acompanhar até cair no extrato'],['Os dois, com valor diferente','Digitação errada','Corrigir o lançamento']]) + box('atencao','Nunca force o saldo a bater sem entender a diferença. Isso esconde um erro real.')}
 ],
 ex:[
  od("Ordene a conciliação bancária:",["Importar o extrato","Comparar com os lançamentos do sistema","Investigar os itens sem par","Ajustar com documento e conferir o saldo"],"A investigação vem antes do ajuste."),
  en("Na conciliação, apareceu no extrato uma tarifa bancária de R$ 45 que não estava no sistema. Lance-a.","Despesas bancárias","Bancos",["Receita financeira","Fornecedores"],"É uma despesa e uma saída do banco."),
  tf("Se a diferença é pequena, dá para ajustar o saldo sem investigar.",false,"Diferenças pequenas também podem esconder erros ou fraudes."),
  mc("Um pagamento aparece no sistema com R$ 1.250 e no extrato com R$ 1.520. O mais provável é:",["*Erro de digitação no lançamento","Tarifa bancária","Juros recebidos"],"Números com dígitos trocados costumam ser erro de digitação."),
  wr("Como se chama comparar o extrato do banco com os lançamentos do sistema? (uma palavra)",["conciliação","conciliacao"],"Conciliação bancária."),
  nu("O extrato mostra saldo de R$ 10.300. Há um cheque de R$ 700 já lançado no sistema que ainda não foi descontado no banco. Qual deve ser o saldo do sistema?",9600,"10.300 − 700 = 9.600. O sistema já tirou o cheque; o banco ainda não.","R$")
 ]},
{id:"fj8", title:"Fluxo de caixa", icon:"💵",
 learn:[
  {h:"Dinheiro que entra e sai", b:`<p>O <b>fluxo de caixa</b> registra só o que mexe no dinheiro. Não importa se é receita, empréstimo ou aporte dos sócios.</p>` + tbl(['Movimento','No caixa'],[['Recebimento de clientes','Entrada'],['Pagamento a fornecedores','Saída'],['Empréstimo recebido','Entrada'],['Pagamento de salários','Saída']])},
  {h:"A conta do saldo", b:eq('Saldo final = Saldo inicial + Entradas − Saídas') + box('exemplo','Saldo inicial de R$ 8.000, entradas de R$ 15.000 e saídas de R$ 12.000: saldo final de R$ 11.000.')},
  {h:"Fluxo de caixa projetado", b:`<p>Além de registrar o que aconteceu, o analista <b>projeta</b> os próximos dias e semanas com o que já está programado para entrar e sair. Assim a empresa sabe com antecedência se vai faltar dinheiro.</p>` + box('dica','Com o fluxo projetado você consegue avisar: “no dia 20 o saldo fica negativo se aquele recebimento não entrar”.')}
 ],
 ex:[
  nu("Saldo inicial de R$ 5.000, entradas de R$ 9.000 e saídas de R$ 6.500. Qual é o saldo final?",7500,"5.000 + 9.000 − 6.500 = 7.500.","R$"),
  cl("Entrada ou saída de caixa?",["Entrada","Saída"],"Recebimento de um cliente:0|Pagamento de fornecedor:1|Empréstimo recebido do banco:0|Pagamento de salários:1|Aporte dos sócios:0","O fluxo de caixa olha só se o dinheiro entrou ou saiu."),
  tf("Um empréstimo recebido é entrada de caixa, mesmo não sendo receita.",true,"Entra dinheiro, mas também surge uma dívida."),
  mc("O fluxo de caixa projetado serve principalmente para:",["*Saber com antecedência se vai faltar ou sobrar dinheiro","Calcular o lucro do ano","Substituir a conciliação bancária"],"É uma ferramenta de planejamento do curto prazo."),
  nu("Saldo de R$ 2.000 hoje. Nesta semana entram R$ 6.000 e saem R$ 9.500. Quanto vai faltar no fim da semana?",1500,"2.000 + 6.000 − 9.500 = −1.500. Faltam R$ 1.500: é hora de avisar o gestor.","R$")
 ]},
{id:"fj9", title:"Caixa não é lucro", icon:"⚖️",
 learn:[
  {h:"Duas perguntas diferentes", b:tbl(['Pergunta','Onde se responde'],[['Quanto a empresa ganhou no período?','DRE, pelo regime de competência'],['Quanto dinheiro ela tem e terá?','Fluxo de caixa, pelo regime de caixa']])},
  {h:"Um caso clássico", b:`<p>Uma empresa vende R$ 20.000 a prazo, para receber em 60 dias, e paga R$ 8.000 de despesas à vista no mesmo mês.</p>` + eq('Lucro do mês = 20.000 − 8.000 = R$ 12.000') + eq('Caixa do mês = 0 − 8.000 = R$ 8.000 a menos') + box('atencao','A empresa teve lucro, mas o caixa diminuiu. O analista precisa saber explicar esse descompasso.')},
  {h:"O que também não passa pela DRE", b:ul(['Empréstimo recebido: entra caixa, mas não é receita.','Pagamento de empréstimo: sai caixa, mas não é despesa (só os juros são).','Compra de uma máquina: sai caixa, mas a despesa vem aos poucos, pela depreciação.'])}
 ],
 ex:[
  nu("Vendas a prazo de R$ 15.000 e despesas pagas à vista de R$ 6.000 no mês. Qual é o lucro do mês?",9000,"15.000 − 6.000 = 9.000, pelo regime de competência.","R$"),
  nu("No mesmo mês, nada das vendas foi recebido e as despesas de R$ 6.000 foram pagas. Em quanto o caixa diminuiu?",6000,"Não entrou nada e saíram 6.000. O caixa caiu mesmo com lucro de 9.000.","R$"),
  mc("A DRE segue o regime de:",["*Competência","Caixa"],"Receitas e despesas entram no período em que acontecem."),
  tf("Pagar a parcela principal de um empréstimo é uma despesa na DRE.",false,"É saída de caixa que reduz a dívida. Só os juros são despesa."),
  wr("Qual regime registra o valor só quando o dinheiro entra ou sai? (uma palavra)",["caixa"],"Regime de caixa.")
 ]},
{id:"fj10", title:"Lendo o Balanço e a DRE", icon:"📊",
 learn:[
  {h:"O Balanço em poucas linhas", b:`<p>O <b>Balanço Patrimonial</b> é uma foto da empresa numa data: o que ela tem, o que deve e o que sobra para os sócios.</p>` + tbl(['Ativo','Passivo + PL'],[['Circulante: caixa, clientes, estoque','Circulante: fornecedores, salários, tributos a pagar'],['Não circulante: imóveis, máquinas','Não circulante: financiamentos longos'],['','Patrimônio Líquido']])},
  {h:"Circulante e não circulante", b:`<p><b>Circulante</b> é o que vira dinheiro ou vence em até 12 meses. É onde ficam os saldos de contas a receber e a pagar do dia a dia.</p>` + box('dica','Um financiamento de 5 anos tem uma parte no Passivo Circulante (parcelas dos próximos 12 meses) e o restante no Não Circulante.')},
  {h:"A DRE por dentro", b:`<p>Se o Balanço é uma foto, a DRE é um <b>filme</b> de um período:</p>` + ol(['Receita bruta','(−) Deduções e tributos sobre vendas','= Receita líquida','(−) Custos e despesas','= Resultado antes dos tributos sobre o lucro','(−) IR e CSLL','= Lucro líquido'])}
 ],
 ex:[
  mc("O Balanço Patrimonial mostra a situação da empresa:",["*Numa data específica","Ao longo de um período","Só no dia da fundação"],"É uma foto; a DRE cobre um período."),
  cl("Ativo circulante ou não circulante?",["Circulante","Não circulante"],"Dinheiro no banco:0|Imóvel da sede:1|Clientes a receber em 30 dias:0|Máquinas da fábrica:1|Estoque de mercadorias:0","Circulante vira dinheiro em até 12 meses."),
  tf("Fornecedores a pagar no mês que vem ficam no Passivo Circulante.",true,"Vencem dentro de 12 meses."),
  od("Ordene a DRE:",["Receita bruta","Tributos sobre vendas","Receita líquida","Custos e despesas","Lucro líquido"],"Da venda até o lucro."),
  nu("Receita bruta de R$ 100.000 e tributos sobre vendas de R$ 15.000. Qual é a receita líquida?",85000,"100.000 − 15.000 = 85.000.","R$")
 ]},
{id:"fj11", title:"Indicadores essenciais", icon:"📐",
 learn:[
  {h:"Liquidez corrente", b:`<p>Mostra se a empresa tem recursos de curto prazo para pagar as dívidas de curto prazo.</p>` + eq('Liquidez corrente = Ativo Circulante ÷ Passivo Circulante') + box('exemplo','Ativo circulante de R$ 80.000 e passivo circulante de R$ 40.000: liquidez de 2. São R$ 2 para cada R$ 1 que vence no curto prazo.')},
  {h:"Margens", b:eq('Margem bruta = Lucro bruto ÷ Receita líquida') + eq('Margem líquida = Lucro líquido ÷ Receita líquida') + box('dica','Margem líquida de 10% quer dizer que, de cada R$ 100 vendidos, sobram R$ 10 de lucro.')},
  {h:"Prazo médio de pagamento", b:eq('Prazo médio de pagamento = (Fornecedores ÷ Compras do período) × dias') + box('regra','Se a empresa recebe dos clientes antes de pagar os fornecedores, sobra fôlego no caixa. Se é o contrário, ela precisa financiar a diferença.')}
 ],
 ex:[
  nu("Ativo circulante de R$ 60.000 e passivo circulante de R$ 40.000. Qual é a liquidez corrente?",1.5,"60.000 ÷ 40.000 = 1,5.","vezes"),
  nu("Receita líquida de R$ 200.000 e lucro líquido de R$ 20.000. Qual é a margem líquida?",10,"20.000 ÷ 200.000 = 10%.","%"),
  tf("Liquidez corrente abaixo de 1 indica que as dívidas de curto prazo são maiores que o ativo circulante.",true,"Falta ativo de curto prazo para cobrir tudo o que vence em breve."),
  nu("Fornecedores de R$ 40.000, compras de R$ 120.000 no mês e mês de 30 dias. Qual é o prazo médio de pagamento?",10,"(40.000 ÷ 120.000) × 30 = 10 dias.","dias"),
  mc("A empresa recebe dos clientes em 45 dias e paga os fornecedores em 30. O que acontece?",["*Ela paga antes de receber e precisa de caixa para cobrir essa diferença","Sobra dinheiro no caixa","Não faz diferença"],"São 15 dias em que a empresa financia a operação com dinheiro próprio ou emprestado.")
 ]},
{id:"fj12", title:"Excel do analista financeiro", icon:"📑",
 learn:[
  {h:"Por que o Excel aparece em quase toda vaga", b:`<p>O analista júnior passa boa parte do dia organizando, cruzando e conferindo dados em planilhas: extratos, títulos em aberto, relatórios do sistema.</p>` + tbl(['Função','Para que serve'],[['SOMA','Somar uma coluna ou um intervalo'],['SE','Mostrar um resultado conforme uma condição'],['SOMASE','Somar só o que atende a uma condição'],['PROCV / PROCX','Buscar um dado em outra tabela'],['Tabela dinâmica','Resumir uma lista grande por cliente, mês ou categoria']])},
  {h:"PROCV na prática", b:`<p>Você tem a lista de títulos com o código do cliente e quer trazer o nome de cada um de outra tabela:</p>` + eq('=PROCV(A2; Clientes!A:B; 2; 0)') + box('exemplo','Busca o código em A2 na primeira coluna da tabela de clientes e devolve a 2ª coluna (o nome). O 0 exige correspondência exata.')},
  {h:"SOMASE e SE", b:eq('=SOMASE(C:C; "Vencido"; D:D)') + `<p>Soma os valores da coluna D das linhas em que a coluna C diz “Vencido”.</p>` + eq('=SE(E2<HOJE(); "Vencido"; "A vencer")') + box('dica','Numa entrevista, explicar quando usar cada ferramenta costuma valer mais do que decorar a sintaxe.')}
 ],
 ex:[
  mc("Para trazer o nome do cliente a partir do código dele, de outra tabela, você usa:",["*PROCV","SOMA","MÉDIA"],"PROCV (ou PROCX) busca um dado em outra tabela."),
  mc("Para somar só os títulos com status “Vencido”, a função mais direta é:",["*SOMASE","PROCV","CONT.NÚM"],"SOMASE soma apenas o que atende à condição."),
  tf("Uma tabela dinâmica resume uma lista grande de lançamentos por cliente, mês ou categoria sem precisar escrever fórmulas.",true,"É uma das ferramentas mais usadas em relatórios financeiros."),
  fl("No PROCV, o último argumento {0} exige correspondência exata.",["1","2"],"Com 0 (ou FALSO), o Excel só traz o valor se encontrar exatamente o código."),
  mc("A fórmula =SE(E2<HOJE(); \"Vencido\"; \"A vencer\") mostra “Vencido” quando:",["*A data em E2 já passou","A data em E2 é futura","E2 está vazia"],"Se o vencimento é anterior a hoje, o título está vencido.")
 ]},
{id:"fj13", title:"Tributos e retenções na rotina", icon:"🧮",
 learn:[
  {h:"Os nomes que aparecem nas notas", b:tbl(['Tributo','Sobre o quê','Esfera'],[['ICMS','Circulação de mercadorias','Estadual'],['ISS','Prestação de serviços','Municipal'],['PIS e COFINS','Receita (faturamento)','Federal'],['IRPJ e CSLL','Lucro','Federal']]) + box('atencao','A Reforma Tributária vai substituir aos poucos ICMS, ISS, PIS e COFINS por IBS e CBS, numa transição que vai de 2026 a 2033. Por enquanto, os nomes antigos continuam aparecendo.')},
  {h:"Retenção na fonte", b:`<p>Em muitos serviços, quem <b>paga</b> desconta um tributo e recolhe direto ao governo. O fornecedor recebe menos do que o valor da nota.</p>` + box('exemplo','Nota de serviço de R$ 1.000 com retenção de 5% de ISS: o fornecedor recebe R$ 950, e a empresa recolhe os R$ 50 à prefeitura.')},
  {h:"O que isso muda no contas a pagar", b:ul(['O valor pago ao fornecedor é o líquido, não o total da nota.','O valor retido vira uma obrigação: tributo a recolher, com prazo próprio.','Esquecer de recolher o que foi retido gera multa para a empresa que reteve.'])}
 ],
 ex:[
  nu("Nota de serviço de R$ 2.000 com retenção de 5% de ISS. Quanto o fornecedor recebe?",1900,"Retenção: 5% de 2.000 = 100. Líquido: 2.000 − 100 = 1.900.","R$"),
  nu("Nota de R$ 5.000 com retenção de 3% de um tributo. Qual é o valor retido?",150,"3% de 5.000 = 150.","R$"),
  mt([["ICMS","Circulação de mercadorias"],["ISS","Prestação de serviços"],["PIS e COFINS","Receita da empresa"],["IRPJ e CSLL","Lucro"]],"Cada tributo tem sua base."),
  tf("Na retenção na fonte, quem paga a nota desconta o tributo e se responsabiliza por recolhê-lo.",true,"Por isso o valor retido vira uma obrigação de quem pagou."),
  mc("Um fornecedor reclama que recebeu R$ 950 por uma nota de serviço de R$ 1.000. O mais provável é:",["*Houve retenção de tributo na fonte","O banco cobrou tarifa dele","Houve erro de digitação"],"A diferença de 5% bate com uma retenção de ISS, por exemplo.")
 ]},
{id:"fj14", title:"Sigilo e LGPD no financeiro", icon:"🔒",
 learn:[
  {h:"O que é a LGPD", b:`<p>A <b>Lei Geral de Proteção de Dados</b> define regras para coletar, guardar e usar dados pessoais: nome, CPF, endereço, dados bancários, salário.</p>`},
  {h:"Por que isso cai numa vaga financeira", b:`<p>O financeiro lida o tempo todo com dados de clientes, fornecedores e funcionários. Um vazamento pode gerar multa para a empresa e prejuízo para as pessoas.</p>` + box('atencao','Nunca envie planilhas com dados de clientes ou funcionários por canais pessoais, como WhatsApp ou e-mail particular.')},
  {h:"Boas práticas simples", b:ul(['Acessar só os dados necessários para a sua tarefa.','Usar os canais e pastas oficiais da empresa.','Não compartilhar login e senha de sistemas nem de banco.','Desconfiar de pedidos urgentes para mudar dados bancários de um fornecedor: confirme por um canal conhecido.'])}
 ],
 ex:[
  fl("A lei brasileira de proteção de dados pessoais é a {LGPD}.",["CLT","NBC"],"Lei Geral de Proteção de Dados."),
  mc("CPF e dados bancários de um cliente são:",["*Dados pessoais, protegidos pela LGPD","Informação pública","Problema só da área de TI"],"Quem trata esses dados precisa protegê-los."),
  tf("Mandar a planilha de clientes para o WhatsApp pessoal, para trabalhar de casa, é uma prática segura.",false,"Os dados saem dos canais controlados pela empresa."),
  mc("Um e-mail “urgente” pede para trocar a conta bancária de um fornecedor antes do pagamento de hoje. O que fazer?",["*Confirmar com o fornecedor por um telefone ou contato já conhecido","Trocar logo para não atrasar","Responder o e-mail pedindo a nova conta"],"É um golpe comum. Confirme por um canal que você já conhecia."),
  mc("Qual é uma boa prática no dia a dia?",["*Acessar apenas os dados necessários para a sua tarefa","Compartilhar o login para agilizar","Guardar cópias no computador pessoal"],"Acesso mínimo necessário é um princípio central da LGPD.")
 ]},
{id:"fj15", title:"Currículo e entrevista", icon:"🎯",
 learn:[
  {h:"O que o recrutador procura", b:ul(['Formação em Contabilidade, Administração, Economia ou área próxima. Estar cursando costuma bastar para vaga júnior.','Noção de contas a pagar e a receber, conciliação bancária e fluxo de caixa.','Excel: pelo menos PROCV, SOMASE, filtros e tabela dinâmica.','Organização, atenção a detalhes e cumprimento de prazos.']) + box('dica','Escreva o que você fez com números: “conciliei 3 contas bancárias por mês” diz mais do que “ajudei no financeiro”.')},
  {h:"Perguntas comuns", b:tbl(['Pergunta','O que avaliam'],[['O que é conciliação bancária?','Se você conhece a rotina'],['Qual a diferença entre lucro e caixa?','Se você entende os números'],['Conte uma vez em que encontrou um erro.','Atenção a detalhes'],['Como você organiza tarefas com prazo?','Organização'],['Por que a área financeira?','Interesse real pela função']])},
  {h:"Como responder bem", b:`<p>Para perguntas sobre experiências, use uma estrutura simples: <b>situação</b>, o que você <b>fez</b> e qual foi o <b>resultado</b>. Serve até para exemplos da faculdade, de um estágio ou das finanças da sua família.</p>` + box('regra','Ninguém espera que um júnior saiba tudo. Avaliam se você entende a lógica básica e aprende rápido. Se não souber algo, diga como faria para descobrir.')},
  {h:"Antes do dia", b:ol(['Pesquise a empresa: o que ela vende, onde atua e como é o setor dela.','Releia a descrição da vaga e relacione cada requisito com esta trilha.','Treine em voz alta: conciliação, lucro x caixa e contas a pagar.','Prepare uma pergunta sobre a rotina da área para fazer no final.'])}
 ],
 ex:[
  mc("Numa vaga júnior, o que costuma pesar mais?",["*Entender a lógica básica da rotina e mostrar que aprende rápido","Ter muitos anos de experiência","Saber programar"],"Vagas júnior avaliam base e potencial."),
  tf("No currículo, descrever o que você fez com números concretos é mais forte do que frases genéricas.",true,"Números mostram tamanho e resultado."),
  od("Ordene a estrutura de uma boa resposta sobre experiência:",["Situação","O que você fez","Resultado"],"Contexto, ação e resultado."),
  ep("Treine a pergunta mais comum: o que é conciliação bancária?","É comparar os lançamentos do sistema da empresa com o extrato do banco, item por item, investigar as diferenças e ajustar com documento até os saldos baterem.",[["Compara sistema e banco","compar","confront","extrato","banco","sistema"],["Investiga as diferenças","diferenc","investig","sem par","diverg"],["Ajusta até bater","ajust","bater","saldo","corrig","igual"]],"Treine essa resposta em voz alta até sair natural."),
  ep("Treine outra pergunta comum: por que uma empresa pode ter lucro e estar sem dinheiro?","Porque o lucro segue a competência: vendas a prazo entram como receita antes de o dinheiro chegar. Além disso, pagamentos de dívidas, compras de bens e estoques tiram dinheiro do caixa sem virar despesa na hora.",[["Vendas a prazo","prazo","ainda nao receb","receber depois","competenc"],["Saídas que não são despesa","divid","emprestim","estoque","maquin","compra","investim"]],"Mostra que você entende a diferença entre DRE e fluxo de caixa.")
 ]},
{id:"fj16", title:"Revisão: Analista Financeiro Jr", icon:"🔄",
 learn:[
  {h:"O que você viu nesta trilha", b:tbl(['Tema','Em uma frase'],[['Patrimônio','Ativo = Passivo + PL'],['Contas a pagar','Conferir antes de pagar, na data certa'],['Contas a receber','Registrar, dar baixa e cobrar quem atrasa'],['Conciliação','Sistema e extrato, item por item'],['Fluxo de caixa','Saldo inicial + entradas − saídas'],['Indicadores','Liquidez, margem e prazos médios'],['Rotina','Excel, retenções e cuidado com dados pessoais']])}
 ],
 ex:[
  nu("Ativo de R$ 180.000 e Passivo de R$ 70.000. Qual é o PL?",110000,"180.000 − 70.000 = 110.000.","R$"),
  en("A empresa pagou pelo banco R$ 1.200 a um fornecedor.","Fornecedores","Bancos",["Clientes","Receita de vendas"],"A dívida e o banco diminuem."),
  nu("Boleto de R$ 1.500 com multa de 2%. Qual é o valor da multa?",30,"2% de 1.500 = 30.","R$"),
  od("Ordene a conciliação bancária:",["Importar o extrato","Comparar com o sistema","Investigar os itens sem par","Ajustar com documento"],"Investigar antes de ajustar."),
  nu("Saldo inicial de R$ 4.000, entradas de R$ 11.000 e saídas de R$ 9.000. Qual é o saldo final?",6000,"4.000 + 11.000 − 9.000 = 6.000.","R$"),
  tf("Uma empresa pode ter lucro no mês e o caixa diminuir no mesmo mês.",true,"Vendas a prazo geram lucro antes de gerar dinheiro."),
  nu("Ativo circulante de R$ 90.000 e passivo circulante de R$ 45.000. Qual é a liquidez corrente?",2,"90.000 ÷ 45.000 = 2.","vezes"),
  nu("Nota de serviço de R$ 3.000 com retenção de 5% de ISS. Quanto o fornecedor recebe?",2850,"5% de 3.000 = 150. 3.000 − 150 = 2.850.","R$"),
  mc("Para somar só os títulos vencidos numa planilha, a função mais direta é:",["*SOMASE","PROCV","MÉDIA"],"SOMASE soma o que atende a uma condição.")
 ]}
];
