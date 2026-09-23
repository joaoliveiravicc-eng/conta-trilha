import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, ew, od, ep, ts } from '../../engine/exercises/factories.js';

export default [
{id:"vida1", title:"Seu balanço pessoal", icon:"🧍",
 learn:[
  {h:"Você também tem um Balanço", b:`<p>A mesma lógica das empresas funciona para você:</p>` + tbl(['Grupo','Exemplos pessoais'],[['Ativo','Dinheiro, conta, investimentos, carro, imóvel'],['Passivo','Fatura do cartão, financiamento, empréstimos'],['Patrimônio líquido','O que sobra: Ativo − Passivo']])},
  {h:"Fazendo o seu", b:box('exemplo','Conta R$ 3.000 + investimentos R$ 7.000 + carro R$ 30.000 = Ativo R$ 40.000. Financiamento R$ 18.000 + cartão R$ 2.000 = Passivo R$ 20.000. PL pessoal: <b>R$ 20.000</b>.') + box('dica','Faça seu balanço pessoal uma vez por ano e compare: seu PL está crescendo?')}
 ],
 ex:[
  cl("Ativo ou passivo pessoal?",["Ativo","Passivo"],"Saldo na poupança:0|Fatura do cartão:1|Carro quitado:0|Financiamento do apartamento:1|Ações na bolsa:0","Ativo é o que você tem; passivo é o que você deve."),
  nu("Ativo pessoal de R$ 55.000 e dívidas de R$ 21.000. Qual o seu PL?",34000,"55.000 − 21.000 = 34.000.","R$"),
  tf("Num carro financiado, o carro é ativo e o saldo do financiamento é passivo.",true,"São dois itens diferentes do seu balanço."),
  mc("Seu PL pessoal cresce quando você:",["*Paga dívidas com renda nova ou aumenta investimentos","Pega um empréstimo","Parcela uma compra","Troca dinheiro de conta"],"Pegar empréstimo aumenta ativo e passivo juntos; o PL não muda."),
  ep("Com suas palavras: o que é o patrimônio líquido de uma pessoa?","É o valor de tudo o que a pessoa tem (bens, dinheiro, investimentos) menos tudo o que ela deve (dívidas). É o quanto sobraria se pagasse todas as dívidas.",[["O que você tem","tem","bens","dinheiro","investim","ativo","possu"],["Menos o que você deve","deve","divida","passivo","obrigac","emprestim"],["É a diferença","menos","subtra","diferenc","sobr","descont","tirando"]],"PL pessoal = Ativo − Passivo.")
 ]},
{id:"vida2", title:"Orçamento pessoal", icon:"📋",
 learn:[
  {h:"Receitas e despesas da casa", b:`<p>Seu salário é receita; aluguel, mercado e lazer são despesas. A sobra é o seu “lucro”, que pode virar investimento.</p>` + ul(['<b>Fixas</b>: quase não mudam (aluguel, internet).','<b>Variáveis</b>: mudam todo mês (mercado, lazer).'])},
  {h:"A regra 50-30-20", b:tbl(['Fatia','Para quê'],[['50%','Necessidades (moradia, comida, contas)'],['30%','Desejos (lazer, compras)'],['20%','Poupar, investir ou quitar dívidas']]) + box('dica','É um ponto de partida, não uma lei. Ajuste para sua realidade.')},
  {h:"Competência na vida real", b:`<p>Uma compra no cartão em março é gasto de <b>março</b>, mesmo que a fatura vença em abril. Pensar assim evita a surpresa da fatura.</p>`}
 ],
 ex:[
  nu("Renda de R$ 4.000. Pela regra 50-30-20, quanto vai para poupar ou investir?",800,"20% de 4.000 = 800.","R$"),
  nu("Renda de R$ 4.000. Quanto seria o limite para necessidades?",2000,"50% de 4.000 = 2.000.","R$"),
  cl("Fixa ou variável?",["Fixa","Variável"],"Aluguel:0|Mercado:1|Internet:0|Delivery:1|Mensalidade da academia:0|Cinema:1","Fixas se repetem com o mesmo valor."),
  tf("Uma compra no cartão feita em março é gasto de março, mesmo que a fatura seja paga em abril.",true,"É a competência aplicada à vida pessoal."),
  od("Ordene os passos para montar um orçamento:",["Somar a renda do mês","Listar as despesas fixas","Estimar as variáveis","Definir quanto poupar","Acompanhar e ajustar"],"Primeiro o que entra, depois o que sai, depois o plano.")
 ]},
{id:"vida3", title:"Reserva e dívidas", icon:"🛟",
 learn:[
  {h:"Reserva de emergência", b:`<p>Dinheiro guardado para imprevistos: perda de renda, saúde, conserto. Uma referência comum é ter de <b>3 a 6 meses</b> dos seus gastos essenciais, numa aplicação de alta liquidez.</p>`},
  {h:"Dívidas caras primeiro", b:`<p>Cheque especial e rotativo do cartão têm juros altíssimos. Em geral, vale quitar primeiro as dívidas com <b>maior taxa</b>.</p>` + box('exemplo','Dívida A a 12% ao mês e dívida B a 2% ao mês: priorize a A.')},
  {h:"Liquidez pessoal", b:`<p>Assim como a empresa, você precisa de ativos de curto prazo para pagar as contas de curto prazo. A reserva é a sua “liquidez imediata”.</p>`}
 ],
 ex:[
  nu("Gastos essenciais de R$ 2.500 por mês. Quanto seria uma reserva de 6 meses?",15000,"6 × 2.500 = 15.000.","R$"),
  mc("Qual dívida costuma valer a pena quitar primeiro?",["*A de maior taxa de juros","A de menor valor sempre","A mais recente","Tanto faz"],"Juros mais altos crescem mais rápido."),
  tf("A reserva de emergência deve ficar em aplicação de fácil resgate.",true,"Imprevisto não espera o vencimento."),
  wr("Como se chama o dinheiro guardado para imprevistos? (três palavras)",["reserva de emergencia"],"Reserva de emergência."),
  ep("Com suas palavras: por que ter uma reserva de emergência?","Para cobrir imprevistos, como perda de renda ou despesas inesperadas, sem precisar se endividar com juros altos.",[["Cobre imprevistos","imprevist","emergenc","inesperad","problema","desempreg","perda","doenc","saude","conserto"],["Evita dívidas e juros","divid","emprestim","juros","endivid","cartao","cheque"]],"Reserva = liquidez para imprevistos.")
 ]}
];
