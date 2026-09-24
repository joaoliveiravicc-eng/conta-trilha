/* Unidade "Aprofundando" das trilhas da área Contabilidade do zero. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Antes de Tudo ---------------- */
{id:"antesx1", title:"Descontos e aumentos em sequência", icon:"🏷️",
 learn:[
  {h:"10% + 10% não é 20%", b:`<p>Quando um percentual é aplicado <b>sobre o resultado</b> de outro, os efeitos se multiplicam, não se somam.</p>` + eq('Aumento de 10% e depois mais 10%: 100 × 1,10 × 1,10 = 121') + `<p>O aumento total foi de <b>21%</b>, não 20%.</p>`},
  {h:"Desconto em cima de desconto", b:box('exemplo','Produto de R$ 200 com 20% de desconto e mais 10% no caixa: 200 × 0,80 × 0,90 = <b>R$ 144</b>. O desconto total foi de 28%, não 30%.') + box('atencao','Um aumento de 50% seguido de um desconto de 50% não volta ao preço original: 100 × 1,5 × 0,5 = 75.')}
 ],
 ex:[
  nu("Preço de R$ 100 com aumento de 10% e depois outro de 10%. Novo preço?",121,"100 × 1,1 × 1,1 = 121.","R$"),
  nu("Produto de R$ 500 com 20% de desconto e mais 10% sobre o novo valor. Preço final?",360,"500 × 0,8 = 400; 400 × 0,9 = 360.","R$"),
  nu("No caso anterior, qual foi o desconto total em %?",28,"360 é 72% de 500: desconto de 28%.","%"),
  tf("Um aumento de 50% seguido de um desconto de 50% devolve o preço original.",false,"100 × 1,5 × 0,5 = 75."),
  mc("Dois aumentos seguidos de 20% equivalem a um aumento de:",["*44%","40%","20%","22%"],"1,2 × 1,2 = 1,44."),
  fl("Percentuais aplicados em sequência se {multiplicam}, não se somam.",["somam","anulam"],"Cada um incide sobre o resultado anterior.")
 ]},
{id:"antesx2", title:"Vale mais agora ou depois?", icon:"⏳",
 learn:[
  {h:"O dinheiro tem valor no tempo", b:`<p>R$ 1.000 hoje valem mais que R$ 1.000 daqui a um ano, porque o dinheiro de hoje pode render. Para comparar valores em datas diferentes, traga-os para a mesma data.</p>` + eq('Valor futuro = Valor hoje × (1 + taxa)') + eq('Valor hoje = Valor futuro ÷ (1 + taxa)')},
  {h:"Comparando propostas", b:box('exemplo','Um cliente oferece R$ 1.000 hoje ou R$ 1.080 daqui a um ano. Se o dinheiro rende 10% ao ano, R$ 1.000 hoje virariam R$ 1.100 em um ano: receber hoje é melhor.') + box('dica','É a mesma ideia de um desconto para pagamento à vista: compare com quanto o dinheiro renderia.')}
 ],
 ex:[
  nu("R$ 2.000 hoje, aplicados a 10% ao ano. Quanto valerão em 1 ano?",2200,"2.000 × 1,10 = 2.200.","R$"),
  nu("Quanto vale hoje receber R$ 1.100 daqui a 1 ano, se a taxa é de 10% ao ano?",1000,"1.100 ÷ 1,10 = 1.000.","R$"),
  mc("Taxa de 10% ao ano. O que é melhor receber?",["*R$ 5.000 hoje","R$ 5.300 daqui a 1 ano","Dá no mesmo","Não é possível comparar"],"5.000 hoje viram 5.500 em um ano, mais que 5.300."),
  tf("R$ 100 hoje e R$ 100 daqui a um ano valem a mesma coisa.",false,"O dinheiro de hoje pode render até lá."),
  mc("Desconto de 5% para pagar hoje ou valor cheio em 30 dias. O dinheiro rende 1% ao mês. O que compensa?",["*Pagar hoje com o desconto","Pagar em 30 dias","Dá no mesmo","Não dá para saber"],"O desconto de 5% é maior que o 1% que o dinheiro renderia no mês."),
  fl("Para comparar valores em datas diferentes, é preciso trazê-los para a mesma {data}.",["moeda","conta"],"Valor do dinheiro no tempo.")
 ]},
{id:"antesx3", title:"Lendo o extrato bancário", icon:"🏧",
 learn:[
  {h:"O extrato é o olhar do banco", b:`<p>No extrato, <b>crédito</b> significa dinheiro que entrou na sua conta e <b>débito</b>, dinheiro que saiu. É o registro do ponto de vista do banco: para ele, o seu saldo é uma dívida com você.</p>` + tbl(['Data','Histórico','Valor'],[['02','PIX recebido — Cliente A','+ 1.500'],['03','Tarifa pacote','− 35'],['05','Boleto pago — Fornecedor','− 800']])},
  {h:"Não confunda os lados", b:box('atencao','Na contabilidade da empresa, dinheiro que entra no banco é <b>débito</b> na conta Bancos (ativo aumenta). No extrato, o banco mostra como crédito. Os dois estão certos, cada um do seu ponto de vista.')}
 ],
 ex:[
  mc("No extrato, 'C 1.500 — PIX recebido' significa que:",["*Entrou dinheiro na conta","Saiu dinheiro da conta","A empresa deve ao banco","É uma tarifa"],"Crédito no extrato é entrada."),
  nu("Saldo inicial R$ 2.000; PIX recebido de R$ 1.500; tarifa de R$ 35; boleto pago de R$ 800. Saldo final?",2665,"2.000 + 1.500 − 35 − 800 = 2.665.","R$"),
  tf("Uma entrada que aparece como crédito no extrato é registrada como débito na conta Bancos da empresa.",true,"O ativo Bancos aumenta a débito."),
  cl("No extrato, isso aparece como:",["Crédito (entrada)","Débito (saída)"],"PIX recebido de cliente:0|Tarifa bancária:1|Rendimento da aplicação:0|Pagamento de boleto:1|Depósito em dinheiro:0","Olhe se o dinheiro entrou ou saiu."),
  en("O extrato mostra 'D 35 — Tarifa pacote'. Lance na empresa.","Despesa bancária","Bancos",["Receita financeira","Caixa"],"Despesa sobe; o saldo no banco cai."),
  fl("No extrato, dinheiro que sai da conta aparece como {débito}.",["crédito","saldo"],"Saída do ponto de vista do banco.")
 ]},
{id:"antesx4", title:"Fluxo de caixa simples", icon:"💧",
 learn:[
  {h:"Entradas, saídas e saldo", b:`<p>O fluxo de caixa acompanha o dinheiro que <b>entra</b> e que <b>sai</b>, dia a dia ou mês a mês.</p>` + eq('Saldo final = Saldo inicial + Entradas − Saídas')},
  {h:"Projetar evita susto", b:tbl(['Semana','Entradas','Saídas','Saldo'],[['Início','—','—','1.000'],['1','2.000','1.500','1.500'],['2','500','2.200','−200']]) + box('dica','Na semana 2 faltaria dinheiro. Sabendo antes, dá para antecipar uma cobrança ou adiar um pagamento.')}
 ],
 ex:[
  nu("Saldo inicial R$ 1.200, entradas R$ 3.000, saídas R$ 2.700. Qual o saldo final?",1500,"1.200 + 3.000 − 2.700 = 1.500.","R$"),
  nu("Saldo inicial R$ 500, entradas R$ 800, saídas R$ 1.600. Quanto dinheiro faltaria para pagar tudo?",300,"500 + 800 = 1.300 disponíveis; 1.600 − 1.300 = 300 faltando.","R$"),
  cl("Entrada ou saída de caixa?",["Entrada","Saída"],"Recebimento de cliente:0|Pagamento de fornecedor:1|Empréstimo recebido do banco:0|Pagamento de salários:1|Venda à vista:0","Olhe para o dinheiro: chegou ou saiu?"),
  tf("Uma venda a prazo aumenta o caixa no dia da venda.",false,"O dinheiro só entra no recebimento."),
  mc("A projeção mostra saldo negativo daqui a duas semanas. Uma boa atitude é:",["*Planejar agora: cobrar clientes, negociar prazos ou buscar recursos","Esperar para ver","Parar de registrar as saídas","Ignorar, pois é só projeção"],"Projetar serve para agir antes do problema."),
  fl("Saldo final = saldo inicial + {entradas} − saídas.",["receitas","lucros"],"Fluxo de caixa olha o dinheiro, não a receita.")
 ]},

/* ---------------- Primeiros Passos ---------------- */
{id:"basex1", title:"A empresa não é o dono", icon:"🏢",
 learn:[
  {h:"Princípio da entidade", b:`<p>O patrimônio da empresa é separado do patrimônio dos sócios. A contabilidade da empresa registra só o que é <b>da empresa</b>.</p>` + box('exemplo','O dono paga a escola do filho com o dinheiro da empresa. Isso não é despesa da empresa: é uma retirada do sócio.')},
  {h:"Por que separar", b:ul(['Mostra se o negócio dá lucro de verdade.','Evita misturar dívidas pessoais com as da empresa.','Facilita crédito, impostos e decisões.'])}
 ],
 ex:[
  tf("O carro pessoal do sócio, usado só pela família, deve estar no Ativo da empresa.",false,"Pertence ao sócio, não à empresa."),
  mc("O sócio usa o cartão da empresa para uma viagem de férias pessoal. Isso é:",["*Retirada do sócio, não despesa da empresa","Despesa de viagem da empresa","Receita","Investimento da empresa"],"O gasto não é da atividade da empresa."),
  cl("É da empresa ou do sócio?",["Empresa","Sócio"],"Máquina usada na produção:0|Apartamento onde o sócio mora:1|Estoque da loja:0|Conta de luz da casa do sócio:1|Aluguel do galpão da empresa:0","Olhe quem é o dono e para que serve."),
  wr("Qual princípio diz que o patrimônio da empresa é separado do dos sócios?",["entidade","principio da entidade"],"Princípio da entidade."),
  tf("Separar as contas ajuda a saber se o negócio dá lucro de verdade.",true,"Misturar despesas pessoais distorce o resultado."),
  mc("A melhor prática para um pequeno empreendedor é:",["*Ter conta bancária separada para a empresa","Usar a mesma conta para tudo","Não registrar retiradas","Pagar despesas pessoais pela empresa e lançar como despesa"],"Conta separada facilita a separação.")
 ]},
{id:"basex2", title:"Continuidade e prudência", icon:"🧭",
 learn:[
  {h:"Continuidade", b:`<p>Em regra, as demonstrações são preparadas supondo que a empresa <b>vai continuar operando</b>. Por isso uma máquina é registrada pelo custo e depreciada ao longo do uso, e não pelo valor que renderia num leilão amanhã.</p>`},
  {h:"Prudência", b:`<p>Diante de incerteza, a contabilidade age com <b>cautela</b>: não superestima ativos e receitas nem subestima passivos e despesas.</p>` + box('atencao','Prudência não é esconder lucro. É não inflar números com base em otimismo.')}
 ],
 ex:[
  tf("Pela continuidade, supõe-se que a empresa seguirá operando no futuro previsível.",true,"É a base de várias mensurações."),
  mc("Uma empresa tem forte indício de que um cliente não vai pagar. Pela prudência, ela:",["*Reconhece a perda esperada","Ignora até o vencimento","Aumenta a receita","Registra o valor em dobro"],"Não manter no ativo um valor que provavelmente não se realizará."),
  tf("Prudência significa reduzir o lucro de propósito para pagar menos imposto.",false,"Isso seria distorcer a informação."),
  mc("Se a empresa vai encerrar as atividades em breve:",["*A premissa de continuidade deixa de valer e isso precisa ser informado","Nada muda","Ela deve dobrar a depreciação","Os ativos somem"],"A base de preparação muda."),
  fl("Não superestimar ativos nem subestimar passivos é agir com {prudência}.",["otimismo","pressa"],"Cautela diante da incerteza."),
  cl("Atitude prudente ou não?",["Prudente","Não prudente"],"Reconhecer perda provável com cliente:0|Registrar venda que ainda não aconteceu:1|Revisar estoque obsoleto:0|Ignorar dívida já assumida:1","Prudência evita números inflados.")
 ]},
{id:"basex3", title:"Quem usa a informação", icon:"👥",
 learn:[
  {h:"Usuários internos e externos", b:tbl(['Usuário','O que quer saber'],[['Sócios e investidores','A empresa dá retorno?'],['Bancos','Ela consegue pagar o empréstimo?'],['Fornecedores','Vai pagar em dia?'],['Governo','Quanto de tributo é devido?'],['Gestores (internos)','Onde cortar custos e investir?']])},
  {h:"Informação útil", b:`<p>Para ajudar decisões, a informação precisa ser <b>relevante</b> e representar <b>fielmente</b> a realidade. Também ajuda ser comparável, verificável, tempestiva e compreensível.</p>`}
 ],
 ex:[
  cl("Usuário interno ou externo?",["Interno","Externo"],"Gerente financeiro:0|Banco:1|Fornecedor:1|Diretor de produção:0|Receita Federal:1","Interno está dentro da empresa."),
  mt([["Banco","Capacidade de pagar empréstimos"],["Investidor","Retorno do capital"],["Governo","Tributos devidos"],["Gestor","Decisões do dia a dia"]],"Cada usuário tem sua pergunta."),
  tf("Uma informação que chega tarde demais perde utilidade para decidir.",true,"Isso é a tempestividade."),
  mc("A qualidade de representar a realidade como ela é chama-se:",["*Representação fidedigna","Prudência","Materialidade","Competência"],"Completa, neutra e sem erros."),
  wr("Diga uma qualidade que torna a informação contábil útil.",["relevancia","relevante","representacao fidedigna","fidedigna","comparabilidade","comparavel","verificabilidade","tempestividade","compreensibilidade"],"Relevância, representação fidedigna, comparabilidade, verificabilidade, tempestividade ou compreensibilidade."),
  tf("A contabilidade serve só para pagar impostos.",false,"Ela informa sócios, bancos, gestores e outros.")
 ]},
{id:"basex4", title:"Custo histórico e valor justo", icon:"🧾",
 learn:[
  {h:"Por quanto registrar?", b:tbl(['Base','O que é','Exemplo'],[['Custo histórico','O valor pago na aquisição','Máquina comprada por R$ 80.000'],['Valor justo','Preço que seria recebido numa venda entre partes independentes','Ações cotadas em bolsa']]) + `<p>A maioria dos ativos operacionais, como máquinas e estoques, parte do <b>custo</b>. Alguns ativos, como certos instrumentos financeiros, são medidos a valor justo.</p>`},
  {h:"Por que o custo é tão usado", b:ul(['É objetivo: há documento comprovando.','É verificável por terceiros.','Não depende de estimativas de mercado a cada dia.']) + box('dica','Custo histórico não significa ignorar perdas: se o bem perder valor, reconhece-se a perda.')}
 ],
 ex:[
  mc("Uma empresa comprou um terreno por R$ 300.000 há 5 anos; hoje ele valeria R$ 500.000. Em regra, ele fica registrado por:",["*R$ 300.000, o custo","R$ 500.000","R$ 800.000","Zero"],"Imobilizado parte do custo."),
  tf("O custo histórico é verificável porque há documento da compra.",true,"Por isso é objetivo."),
  mt([["Custo histórico","Valor pago na aquisição"],["Valor justo","Preço de venda entre partes independentes"],["Documento de compra","Prova do custo"]],"Bases de mensuração."),
  tf("Por usar o custo histórico, a empresa nunca reconhece perda de valor de um bem.",false,"Perdas de valor são reconhecidas."),
  mc("Qual item costuma ser medido a valor justo?",["*Ações negociadas em bolsa mantidas para negociação","Máquina da fábrica","Estoque de mercadorias","Móveis do escritório"],"Há preço de mercado observável."),
  fl("O valor pago na aquisição de um bem é o custo {histórico}.",["futuro","justo"],"Base mais usada para ativos operacionais.")
 ]},

/* ---------------- Débito e Crédito ---------------- */
{id:"dcx1", title:"Lançamentos compostos", icon:"🧩",
 learn:[
  {h:"Mais de duas contas", b:`<p>Um fato pode envolver três ou mais contas. A regra continua: <b>soma dos débitos = soma dos créditos</b>.</p>` + box('exemplo','Compra de mercadoria de R$ 10.000: R$ 4.000 à vista e R$ 6.000 a prazo.') + lanc([['D','Estoques','10.000'],['C','Caixa','4.000'],['C','Fornecedores','6.000']])},
  {h:"Conferindo", b:eq('Débitos: 10.000 &nbsp;=&nbsp; Créditos: 4.000 + 6.000')}
 ],
 ex:[
  en("Compra de um veículo de R$ 50.000: R$ 20.000 pelo banco e o restante financiado.","Veículos","Bancos+Financiamentos a pagar",["Caixa","Despesa com veículos"],"Débito no bem; crédito em quem pagou e em quem financiou."),
  nu("Venda de R$ 8.000: R$ 3.000 à vista e o resto a prazo. Quanto vai para Clientes?",5000,"8.000 − 3.000 = 5.000.","R$"),
  tf("Num lançamento composto, a soma dos débitos precisa ser igual à soma dos créditos.",true,"É o método das partidas dobradas."),
  en("Pagamento de salários de R$ 6.000: R$ 1.000 em dinheiro e R$ 5.000 pelo banco (salários já estavam a pagar).","Salários a pagar","Caixa+Bancos",["Despesa com salários","Receita de serviços"],"Baixa a dívida; saem o dinheiro e o banco."),
  mc("Débitos de R$ 12.000 e créditos de R$ 11.500. O que isso indica?",["*Há erro: o lançamento não fecha","Está correto","A empresa teve lucro","Faltou receita"],"Débitos e créditos precisam fechar."),
  nu("Compra de R$ 9.000: R$ 2.500 em dinheiro, R$ 3.500 pelo banco e o resto a prazo. Quanto fica a pagar ao fornecedor?",3000,"9.000 − 2.500 − 3.500 = 3.000.","R$")
 ]},
{id:"dcx2", title:"Balancete de verificação", icon:"⚖️",
 learn:[
  {h:"A lista dos saldos", b:`<p>O balancete lista todas as contas com seus saldos devedores e credores. Se os lançamentos seguiram as partidas dobradas, <b>total devedor = total credor</b>.</p>` + tbl(['Conta','Devedor','Credor'],[['Caixa','5.000',''],['Estoques','3.000',''],['Fornecedores','','2.000'],['Capital social','','6.000'],['<b>Total</b>','<b>8.000</b>','<b>8.000</b>']])},
  {h:"O que ele não pega", b:ul(['Lançar na conta errada, mas com o valor certo nos dois lados.','Esquecer um lançamento inteiro.','Lançar o mesmo fato duas vezes.']) + box('atencao','Balancete fechando não prova que está tudo certo. Só prova que débitos e créditos se equilibram.')}
 ],
 ex:[
  tf("Se o balancete fecha, a contabilidade está certamente sem erros.",false,"Erros compensados ou omissões não aparecem."),
  nu("Saldos devedores: Caixa 4.000, Clientes 2.500, Estoques 3.500. Credores: Fornecedores 3.000 e Capital. Qual o Capital para o balancete fechar?",7000,"Devedor total 10.000; 10.000 − 3.000 = 7.000.","R$"),
  mc("Qual erro o balancete NÃO revela?",["*Esquecer de lançar uma compra inteira","Lançar débito de 500 e crédito de 50","Somar errado só um dos lados","Lançar só o débito"],"Omitir o lançamento inteiro mantém o equilíbrio."),
  cl("Saldo normalmente devedor ou credor?",["Devedor","Credor"],"Caixa:0|Fornecedores:1|Estoques:0|Capital social:1|Despesa de aluguel:0|Receita de vendas:1","Ativo e despesa: devedor. Passivo, PL e receita: credor."),
  fl("No balancete, o total {devedor} deve ser igual ao total credor.",["positivo","ativo"],"Reflexo das partidas dobradas."),
  tf("O balancete ajuda a montar o Balanço e a DRE.",true,"Os saldos são a base das demonstrações.")
 ]},
{id:"dcx3", title:"Contas redutoras", icon:"➖",
 learn:[
  {h:"Natureza oposta ao grupo", b:`<p>Algumas contas ficam num grupo, mas têm saldo <b>contrário</b> a ele, para reduzi-lo sem apagar a informação original.</p>` + tbl(['Conta redutora','Reduz','Saldo'],[['Depreciação acumulada','Imobilizado (ativo)','Credor'],['Perdas estimadas com clientes','Clientes (ativo)','Credor'],['Devoluções de vendas','Receita de vendas','Devedor']])},
  {h:"Por que não baixar direto?", b:box('exemplo','Máquina de R$ 50.000 com depreciação acumulada de R$ 20.000: o Balanço mostra o custo (50.000), quanto já foi depreciado (20.000) e o valor contábil (30.000). Informação mais rica que mostrar só 30.000.')}
 ],
 ex:[
  mc("Depreciação acumulada tem saldo:",["*Credor, reduzindo o ativo","Devedor, aumentando o ativo","Credor, aumentando o passivo","Devedor, como despesa"],"É redutora do Imobilizado."),
  nu("Veículo de R$ 90.000 com depreciação acumulada de R$ 36.000. Valor contábil?",54000,"90.000 − 36.000 = 54.000.","R$"),
  tf("Devoluções de vendas reduzem a receita e têm saldo devedor.",true,"Natureza oposta à receita, que é credora."),
  cl("Qual grupo a conta reduz?",["Ativo","Receita"],"Depreciação acumulada:0|Devoluções de vendas:1|Perdas estimadas com clientes:0|Descontos concedidos na venda:1","Redutora fica no grupo que reduz."),
  mc("Por que usar Depreciação acumulada em vez de reduzir direto a conta Máquinas?",["*Para manter visível o custo original e quanto já foi depreciado","Porque é obrigatório apagar o custo","Para aumentar o lucro","Não há motivo"],"Mais informação no Balanço."),
  fl("Uma conta com saldo oposto ao do grupo em que está é uma conta {redutora}.",["sintética","de resultado"],"Reduz o grupo sem apagar o original.")
 ]},
{id:"dcx4", title:"Contas de resultado no razonete", icon:"📒",
 learn:[
  {h:"Receitas e despesas também têm lado", b:`<p>Despesas aumentam a <b>débito</b> e receitas aumentam a <b>crédito</b>. Faz sentido: despesa diminui o PL (que é credor), e receita aumenta o PL.</p>` + tbl(['Conta','Aumenta com','Saldo normal'],[['Despesa','Débito','Devedor'],['Receita','Crédito','Credor']])},
  {h:"Um mês no razonete", b:box('exemplo','Receitas de serviços: 3.000 + 2.000 (créditos) = saldo credor de 5.000. Despesas de aluguel: 1.500 (débito). Resultado do mês: 5.000 − 1.500 = lucro de 3.500.')}
 ],
 ex:[
  mc("Uma despesa de energia de R$ 400 é lançada:",["*A débito na despesa","A crédito na despesa","A débito na receita","Não é lançada"],"Despesa aumenta a débito."),
  tf("Receita de serviços tem saldo normal credor.",true,"Receita aumenta o PL, que é credor."),
  nu("Receitas lançadas no mês: 4.000 e 2.500. Despesas: 1.200 e 800. Qual o lucro?",4500,"6.500 − 2.000 = 4.500.","R$"),
  en("Prestou serviço de R$ 1.500 e recebeu à vista.","Caixa","Receita de serviços",["Despesa com salários","Clientes"],"Entra dinheiro; reconhece a receita."),
  en("Pagou a conta de energia do mês, R$ 350, pelo banco.","Despesa com energia","Bancos",["Receita de vendas","Fornecedores"],"Reconhece a despesa; sai do banco."),
  cl("Aumenta a débito ou a crédito?",["Débito","Crédito"],"Despesa com salários:0|Receita de vendas:1|Despesa de juros:0|Receita financeira:1|CMV:0","Despesa a débito; receita a crédito.")
 ]},

/* ---------------- Lançamentos do Dia a Dia ---------------- */
{id:"lancx1", title:"Vendas no cartão", icon:"💳",
 learn:[
  {h:"A receita é o valor da venda", b:`<p>Numa venda de R$ 1.000 no cartão, a receita é <b>R$ 1.000</b>. A taxa da administradora é uma <b>despesa</b> separada, e o valor a receber fica numa conta de ativo até cair no banco.</p>` + lanc([['D','Cartões a receber','970'],['D','Despesa com taxas de cartão','30'],['C','Receita de vendas','1.000']])},
  {h:"Quando o dinheiro cai", b:lanc([['D','Bancos','970'],['C','Cartões a receber','970']]) + box('atencao','Registrar a receita já líquida da taxa (970) esconde o custo do cartão e distorce a receita.')}
 ],
 ex:[
  en("Vendeu R$ 2.000 no cartão; a taxa é de R$ 60; o valor líquido será recebido depois.","Cartões a receber+Despesa com taxas de cartão","Receita de vendas",["Bancos","Clientes"],"Receita pelo valor cheio; taxa é despesa."),
  nu("Venda de R$ 5.000 no cartão com taxa de 3%. Quanto a empresa receberá?",4850,"5.000 − 150 = 4.850.","R$"),
  nu("No caso anterior, qual a despesa com a taxa?",150,"3% de 5.000 = 150.","R$"),
  tf("A receita de uma venda no cartão deve ser registrada já descontada a taxa.",false,"Receita pelo valor da venda; taxa como despesa."),
  en("A administradora depositou R$ 4.850 referentes a vendas já registradas.","Bancos","Cartões a receber",["Receita de vendas","Despesa com taxas de cartão"],"Só troca o direito pelo dinheiro."),
  mc("Cartões a receber é uma conta de:",["*Ativo","Passivo","Receita","Despesa"],"É um direito a receber da administradora.")
 ]},
{id:"lancx2", title:"Adiantamento de clientes", icon:"🤝",
 learn:[
  {h:"Recebeu antes de entregar", b:`<p>Quando o cliente paga antes, a empresa ainda <b>deve</b> a entrega. Isso é um <b>passivo</b>, não receita.</p>` + lanc([['D','Bancos','3.000'],['C','Adiantamento de clientes','3.000']])},
  {h:"Na entrega vira receita", b:lanc([['D','Adiantamento de clientes','3.000'],['C','Receita de serviços','3.000']]) + box('regra','Receita é reconhecida quando a obrigação com o cliente é cumprida.')}
 ],
 ex:[
  en("Recebeu pelo banco R$ 4.000 de um cliente por um serviço que será prestado no mês que vem.","Bancos","Adiantamento de clientes",["Receita de serviços","Clientes"],"Ainda não é receita: é uma obrigação."),
  en("Prestou o serviço que havia sido pago antecipadamente, R$ 4.000.","Adiantamento de clientes","Receita de serviços",["Bancos","Clientes"],"A obrigação vira receita."),
  mc("Adiantamento de clientes é classificado como:",["*Passivo","Ativo","Receita","Despesa"],"A empresa deve algo ao cliente."),
  tf("Dinheiro recebido antes da entrega já é receita do mês.",false,"Só vira receita na entrega."),
  nu("Recebidos R$ 10.000 de adiantamento; em março foi entregue 40% do serviço. Quanto é receita de março?",4000,"40% de 10.000 = 4.000.","R$"),
  mt([["Seguros a apropriar","Pagou antes de usar (ativo)"],["Adiantamento de clientes","Recebeu antes de entregar (passivo)"],["Salários a pagar","Usou antes de pagar (passivo)"],["Clientes","Entregou antes de receber (ativo)"]],"O tempo entre caixa e competência cria essas contas.")
 ]},
{id:"lancx3", title:"Capital e distribuição de lucros", icon:"🤲",
 learn:[
  {h:"Os sócios colocam dinheiro", b:`<p>Quando os sócios integralizam capital, entra recurso e aumenta o patrimônio líquido. Não é receita nem empréstimo.</p>` + lanc([['D','Bancos','50.000'],['C','Capital social','50.000']])},
  {h:"E recebem parte do lucro", b:`<p>A distribuição de lucros aos sócios <b>não é despesa</b>: é uma destinação do resultado, que reduz o patrimônio líquido.</p>` + lanc([['D','Lucros acumulados','10.000'],['C','Lucros a distribuir','10.000']]) + box('dica','Depois, no pagamento: D Lucros a distribuir / C Bancos.')}
 ],
 ex:[
  en("Os sócios depositaram R$ 30.000 para integralizar o capital.","Bancos","Capital social",["Receita de vendas","Empréstimos a pagar"],"Aumenta o PL; não é receita."),
  tf("Aporte de capital dos sócios é receita da empresa.",false,"É patrimônio líquido, não receita."),
  tf("A distribuição de lucros aos sócios é uma despesa na DRE.",false,"É destinação do lucro, fora da DRE."),
  en("Foi decidido distribuir R$ 8.000 de lucros, a pagar no mês que vem.","Lucros acumulados","Lucros a distribuir",["Despesa com salários","Bancos"],"Sai do PL e vira obrigação."),
  en("Pagou pelo banco os R$ 8.000 de lucros já registrados a distribuir.","Lucros a distribuir","Bancos",["Lucros acumulados","Despesa com salários"],"Baixa a obrigação."),
  mc("Lucros a distribuir, depois de decididos e ainda não pagos, ficam no:",["*Passivo","Ativo","Resultado","Estoque"],"É uma obrigação com os sócios.")
 ]},
{id:"lancx4", title:"Despesas a pagar", icon:"📌",
 learn:[
  {h:"Usou, mas ainda não pagou", b:`<p>A conta de energia de março chega em abril. A despesa é de <b>março</b>: reconhece-se a despesa e uma obrigação.</p>` + lanc([['D','Despesa com energia','700'],['C','Contas a pagar','700']])},
  {h:"No pagamento", b:lanc([['D','Contas a pagar','700'],['C','Bancos','700']]) + box('dica','No pagamento, a despesa não aparece de novo: ela já foi reconhecida no mês certo.')}
 ],
 ex:[
  en("Em 31/03, a energia consumida em março (R$ 900) ainda não foi paga.","Despesa com energia","Contas a pagar",["Bancos","Receita de vendas"],"Despesa no mês do consumo."),
  en("Em abril, pagou pelo banco a conta de energia de março, R$ 900, já registrada.","Contas a pagar","Bancos",["Despesa com energia","Caixa"],"Só baixa a obrigação."),
  tf("Ao pagar em abril a energia de março, reconhece-se de novo a despesa.",false,"Seria contar duas vezes."),
  en("Salários de dezembro, R$ 12.000, serão pagos no 5º dia útil de janeiro. Registre em dezembro.","Despesa com salários","Salários a pagar",["Bancos","Caixa"],"Despesa de dezembro, paga depois."),
  mc("Por que reconhecer a despesa no mês do consumo?",["*Para o resultado de cada mês refletir o que foi usado nele","Para pagar menos","Porque o banco exige","Não há motivo"],"É o regime de competência."),
  nu("Em março: aluguel 3.000 (pago), energia 800 (a pagar), salários 5.000 (a pagar). Total de despesas de março?",8800,"Todas são de março, pagas ou não: 8.800.","R$")
 ]}
];
