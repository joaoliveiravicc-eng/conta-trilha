/* Unidade "Aprofundando" das trilhas da área Contabilidade do zero. */
import { box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../../engine/exercises/factories.js';

export default [
/* ---------------- Antes de Tudo ---------------- */
{id:"antesx1", title:"Regra de três", icon:"➗",
 learn:[
  {h:"Quando as coisas crescem juntas", b:`<p>Se 3 cadernos custam R$ 24, quanto custam 5? Grandezas que crescem na mesma proporção são <b>diretamente proporcionais</b>. A regra de três resolve:</p>` + eq('3 → 24<br>5 → x &nbsp;&nbsp; x = 5 × 24 ÷ 3 = 40')},
  {h:"No dia a dia da contabilidade", b:ul(['Aluguel proporcional a dias usados no mês.','Rateio de uma conta de energia entre setores.','Converter um valor anual em mensal.']) + box('exemplo','Aluguel de R$ 3.000 por 30 dias. A empresa ocupou o imóvel por 12 dias: 12 × 3.000 ÷ 30 = <b>R$ 1.200</b>.')}
 ],
 ex:[
  nu("Se 4 caixas custam R$ 60, quanto custam 7 caixas?",105,"60 ÷ 4 = 15 por caixa; 7 × 15 = 105.","R$"),
  nu("Um aluguel mensal de R$ 2.400 (30 dias) foi usado por 10 dias. Qual o valor proporcional?",800,"10 × 2.400 ÷ 30 = 800.","R$"),
  nu("Um seguro anual custa R$ 1.800. Quanto corresponde a um mês?",150,"1.800 ÷ 12 = 150.","R$"),
  tf("Se o preço unitário é fixo, dobrar a quantidade dobra o valor total.",true,"É a proporcionalidade direta."),
  mc("Energia de R$ 900 dividida pela área: fábrica 200 m², escritório 100 m². Quanto cabe à fábrica?",["*R$ 600","R$ 450","R$ 300","R$ 900"],"A fábrica tem 2/3 da área: 2/3 × 900 = 600."),
  fl("Grandezas que aumentam na mesma razão são {diretamente} proporcionais.",["inversamente","igualmente"],"Mais itens, maior valor, na mesma razão.")
 ]},
{id:"antesx2", title:"Juros compostos", icon:"📈",
 learn:[
  {h:"Juros sobre juros", b:`<p>Nos <b>juros simples</b>, os juros de cada mês são calculados sempre sobre o valor inicial. Nos <b>juros compostos</b>, os juros de um mês passam a render juros no mês seguinte.</p>` + eq('Montante = Capital × (1 + taxa)<sup>meses</sup>')},
  {h:"Vendo mês a mês", b:tbl(['Mês','Simples (10% a.m. sobre 1.000)','Composto (10% a.m.)'],[['1','1.100','1.100'],['2','1.200','1.210'],['3','1.300','1.331']]) + box('dica','A diferença parece pequena no começo e cresce com o tempo. É por isso que dívida no rotativo assusta e investimento de longo prazo compensa.')}
 ],
 ex:[
  nu("R$ 1.000 a 10% ao mês, juros compostos. Qual o montante após 2 meses?",1210,"1.000 × 1,1 × 1,1 = 1.210.","R$"),
  nu("R$ 2.000 a 5% ao mês, juros compostos. Montante após 2 meses?",2205,"2.000 × 1,05 = 2.100; 2.100 × 1,05 = 2.205.","R$"),
  nu("R$ 1.000 a 10% ao mês, juros simples. Montante após 3 meses?",1300,"Juros de 100 por mês × 3 = 300; 1.000 + 300.","R$"),
  tf("Com a mesma taxa e prazo maior que 1 mês, juros compostos rendem mais que juros simples.",true,"Os juros passam a render juros."),
  mc("Por que uma dívida no rotativo do cartão cresce tão rápido?",["*Juros altos e compostos: os juros viram dívida e também rendem juros","Porque a taxa é zero","Porque os juros são simples","Porque a fatura não vence"],"Taxa alta + capitalização composta."),
  fl("Nos juros compostos, os juros de um mês são somados ao {capital} e passam a render no mês seguinte.",["prazo","desconto"],"Esse é o efeito 'juros sobre juros'.")
 ]},
{id:"antesx3", title:"Lendo uma nota fiscal", icon:"🧾",
 learn:[
  {h:"O que a nota prova", b:`<p>A nota fiscal documenta uma venda de mercadoria ou prestação de serviço. Para a contabilidade, ela é o <b>documento que comprova</b> o lançamento.</p>` + tbl(['Campo','Para que serve'],[['Emitente','Quem vendeu'],['Destinatário','Quem comprou'],['Itens, quantidade e valor','O que foi negociado'],['Data de emissão','Quando o fato aconteceu'],['Tributos destacados','Tributos que incidiram na operação']])},
  {h:"Conferir antes de lançar", b:ol(['A nota é mesmo da sua empresa (destinatário correto)?','Os itens e valores batem com o pedido?','A mercadoria ou serviço foi recebido?','A nota não foi lançada antes?']) + box('atencao','Nota lançada duas vezes duplica a despesa ou o estoque. Conferir número e emitente evita isso.')}
 ],
 ex:[
  mc("Numa nota de compra recebida, quem é o destinatário?",["*A sua empresa, que comprou","O fornecedor","O governo","O transportador"],"O destinatário é quem recebe a mercadoria ou serviço."),
  tf("A nota fiscal serve de documento para comprovar o lançamento contábil.",true,"Todo lançamento precisa de um documento que o comprove."),
  mt([["Emitente","Quem vendeu"],["Destinatário","Quem comprou"],["Data de emissão","Quando a operação ocorreu"],["Valor total","Quanto custou a operação"]],"Cada campo responde a uma pergunta."),
  mc("Chegou uma nota com o mesmo número e emitente de outra já lançada. O que fazer?",["*Investigar possível duplicidade antes de lançar","Lançar de novo","Jogar fora sem verificar","Lançar como receita"],"Pode ser a mesma nota importada duas vezes."),
  od("Ordene a conferência de uma nota de compra:",["Confirmar que o destinatário é a empresa","Comparar itens e valores com o pedido","Confirmar o recebimento","Verificar se já não foi lançada","Lançar"],"Conferir primeiro, lançar depois."),
  tf("Uma nota emitida para outra empresa pode ser lançada na sua contabilidade se o valor estiver certo.",false,"Precisa ser da sua empresa: é o princípio da entidade.")
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
{id:"basex4", title:"Tipos de fatos contábeis", icon:"🔀",
 learn:[
  {h:"Permutativo, modificativo, misto", b:tbl(['Tipo','O que acontece com o PL','Exemplo'],[['Permutativo','Não muda','Comprar mercadoria à vista'],['Modificativo','Aumenta ou diminui','Pagar aluguel (despesa)'],['Misto','Troca + muda o PL','Receber de cliente com juros']])},
  {h:"Como identificar", b:box('dica','Pergunte: houve receita ou despesa? Se não, é permutativo. Se só houve receita ou despesa, modificativo. Se houve troca de ativos/passivos junto com receita ou despesa, misto.')}
 ],
 ex:[
  cl("Classifique o fato:",["Permutativo","Modificativo","Misto"],"Compra de computador à vista:0|Pagamento de salários do mês:1|Venda de mercadoria com lucro:2|Depósito do caixa no banco:0|Receita de serviço à vista:1","Olhe se o PL muda e se houve troca."),
  tf("Pegar um empréstimo bancário é um fato permutativo.",true,"Entra dinheiro (ativo) e surge uma dívida (passivo); o PL não muda."),
  mc("Pagar uma dívida de R$ 1.000 com R$ 100 de juros é:",["*Misto diminutivo","Permutativo","Modificativo aumentativo","Nenhum"],"Há troca (dívida e caixa) e uma despesa de juros."),
  mc("Receber R$ 500 por um serviço prestado à vista é:",["*Modificativo aumentativo","Permutativo","Misto diminutivo","Modificativo diminutivo"],"Só há receita: o PL aumenta."),
  fl("Fatos {permutativos} trocam elementos sem alterar o patrimônio líquido.",["modificativos","mistos"],"Só permutam."),
  tf("Todo fato que envolve despesa diminui o patrimônio líquido.",true,"Despesa reduz o resultado e, portanto, o PL.")
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
{id:"dcx3", title:"Erros e estornos", icon:"↩️",
 learn:[
  {h:"Não se apaga, se estorna", b:`<p>Um lançamento errado não é rasurado. Faz-se um <b>estorno</b>: um lançamento com as mesmas contas e o mesmo valor, com débito e crédito <b>invertidos</b>. Depois, lança-se o correto.</p>` + box('exemplo','Aluguel de R$ 2.000 foi lançado como despesa de energia.') + lanc([['D','Despesa de aluguel','2.000'],['C','Despesa com energia','2.000']])},
  {h:"Por que assim", b:`<p>O estorno deixa um histórico claro do erro e da correção. Isso ajuda a auditoria e evita dúvidas depois.</p>`}
 ],
 ex:[
  tf("Para corrigir um lançamento errado, o ideal é apagar e fingir que não existiu.",false,"A correção deve ficar registrada."),
  mc("O estorno de 'D Estoques / C Caixa R$ 500' é:",["*D Caixa / C Estoques R$ 500","D Estoques / C Caixa R$ 500","D Caixa / C Fornecedores R$ 500","D Estoques / C Estoques R$ 500"],"Mesmo valor, lados invertidos."),
  en("Uma compra a prazo de R$ 800 foi lançada, por engano, como paga pelo banco (D Estoques / C Bancos). Corrija só a conta de crédito.","Bancos","Fornecedores",["Estoques","Caixa"],"Devolve ao banco o que saiu por engano e reconhece a dívida."),
  fl("O lançamento que inverte um lançamento errado chama-se {estorno}.",["débito","balancete"],"Estornar = desfazer registrando."),
  tf("O estorno usa o mesmo valor do lançamento original.",true,"Para anulá-lo por completo."),
  od("Ordene a correção de um erro:",["Identificar o lançamento errado","Fazer o estorno","Lançar o registro correto","Conferir os saldos"],"Primeiro desfaz, depois refaz.")
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
{id:"lancx1", title:"Despesas pagas antecipadamente", icon:"🛡️",
 learn:[
  {h:"Pagou antes, usa depois", b:`<p>Um seguro de 12 meses pago hoje não é despesa só deste mês. O valor vai para o Ativo e vira despesa <b>mês a mês</b>, conforme o período passa.</p>` + lanc([['D','Seguros a apropriar','12.000'],['C','Bancos','12.000']])},
  {h:"Todo mês", b:lanc([['D','Despesa com seguros','1.000'],['C','Seguros a apropriar','1.000']]) + box('regra','Competência: a despesa é do mês em que o benefício é usado, não do mês em que foi paga.')}
 ],
 ex:[
  en("Pagou pelo banco um seguro anual de R$ 6.000, com cobertura a partir de hoje.","Seguros a apropriar","Bancos",["Despesa com seguros","Fornecedores"],"Vai para o Ativo; será despesa ao longo do ano."),
  nu("Seguro anual de R$ 6.000. Qual a despesa de cada mês?",500,"6.000 ÷ 12 = 500.","R$"),
  en("Apropriação mensal do seguro: R$ 500.","Despesa com seguros","Seguros a apropriar",["Bancos","Caixa"],"A despesa aparece e o ativo diminui."),
  nu("Seguro anual de R$ 9.600 pago em janeiro. Qual saldo resta em Seguros a apropriar após 3 meses?",7200,"9.600 − 3 × 800 = 7.200.","R$"),
  tf("Todo o seguro anual pago em janeiro é despesa de janeiro.",false,"É despesa distribuída pelos 12 meses."),
  mc("Seguros a apropriar é uma conta de:",["*Ativo","Passivo","Receita","Patrimônio líquido"],"É um direito de cobertura ainda não usada.")
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
{id:"lancx3", title:"Empréstimo bancário", icon:"🏦",
 learn:[
  {h:"Captação", b:`<p>Quando o banco libera o dinheiro, entra caixa e surge uma dívida.</p>` + lanc([['D','Bancos','20.000'],['C','Empréstimos a pagar','20.000']])},
  {h:"Juros e pagamento", b:`<p>Os juros são <b>despesa</b> do período em que correm. No pagamento da parcela, parte baixa a dívida e parte são juros.</p>` + lanc([['D','Empréstimos a pagar','2.000'],['D','Despesa de juros','300'],['C','Bancos','2.300']])}
 ],
 ex:[
  en("Recebeu um empréstimo bancário de R$ 30.000 creditado na conta.","Bancos","Empréstimos a pagar",["Receita financeira","Capital social"],"Empréstimo não é receita: é dívida."),
  tf("O valor recebido num empréstimo é receita da empresa.",false,"É uma obrigação a devolver."),
  en("Pagou parcela de R$ 1.500 pelo banco: R$ 1.200 de principal e R$ 300 de juros.","Empréstimos a pagar+Despesa de juros","Bancos",["Receita financeira","Caixa"],"Principal baixa a dívida; juros são despesa."),
  nu("Parcela de R$ 2.600 com R$ 400 de juros. Quanto do principal foi amortizado?",2200,"2.600 − 400 = 2.200.","R$"),
  mc("Juros de um empréstimo que correram em junho, mas serão pagos em julho, são despesa de:",["*Junho","Julho","Nenhum mês","Do mês da contratação"],"Competência."),
  cl("Onde vai cada item?",["Passivo","Despesa"],"Saldo do empréstimo:0|Juros do mês:1|Parcelas futuras a pagar:0|Tarifa bancária do mês:1","Dívida é passivo; custo do dinheiro é despesa.")
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
