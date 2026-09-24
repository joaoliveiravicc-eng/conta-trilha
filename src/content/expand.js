/* Expansões de lições já publicadas: cartões de teoria extras (no fim de learn) e
   exercícios extras (no fim de ex, para não mudar as chaves dos já existentes). */
import { box, eq, tbl, lanc, ul, ol } from './render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, od } from '../engine/exercises/factories.js';

export default {
/* ---------- revisões ---------- */
antes11:{ ex:[
  nu("Um valor de R$ 800 cai 25%. Qual o novo valor?",600,"800 × 0,75 = 600.","R$"),
  nu("Juros compostos: R$ 1.000 a 2% ao mês por 2 meses. Montante?",1040.4,"1.000 × 1,02 × 1,02 = 1.040,40.","R$",undefined,0.02),
  mc("Três meses com vendas de 100, 200 e 600. A média é:",["*300","200","100","900"],"(100 + 200 + 600) ÷ 3 = 300.")
]},
base7:{ learn:[
  {h:"Os pilares num exemplo", b:box('exemplo','Uma empresa começa com R$ 20.000 de capital (PL). Compra uma máquina a prazo por R$ 8.000 (ativo e passivo sobem). Presta um serviço de R$ 3.000 à vista (ativo e PL sobem). Ativo: 31.000 = Passivo 8.000 + PL 23.000.') + box('regra','Ativo = Passivo + PL vale depois de cada fato, sempre.')}
 ], ex:[
  nu("Capital inicial de R$ 20.000, compra de máquina a prazo de R$ 8.000 e serviço à vista de R$ 3.000. Qual o Ativo total?",31000,"20.000 + 8.000 + 3.000 = 31.000.","R$"),
  cl("Receita, despesa ou nenhuma?",["Receita","Despesa","Nenhuma"],"Venda de serviço:0|Pagamento de aluguel:1|Compra de computador à vista:2|Juros pagos no empréstimo:1|Empréstimo recebido:2","Troca de ativos ou dívidas não é receita nem despesa."),
  tf("Pelo regime de competência, a despesa de dezembro paga em janeiro é despesa de dezembro.",true,"Vale o mês em que o fato ocorre.")
]},
dc7:{ learn:[
  {h:"Três armadilhas comuns", b:ul(['Confundir o extrato do banco com a conta Bancos da empresa (os lados se invertem).','Achar que débito é sempre “ruim”: débito aumenta ativo e despesa.','Esquecer que cada lançamento precisa fechar: débitos = créditos.'])}
 ], ex:[
  en("Recebeu de um cliente R$ 900 que estavam em Clientes, em dinheiro.","Caixa","Clientes",["Receita de vendas","Fornecedores"],"Troca um direito por dinheiro."),
  tf("Débito sempre significa perda de dinheiro para a empresa.",false,"Débito aumenta ativo e despesa; depende da conta."),
  nu("Um razonete tem débitos de 7.000 e 2.500 e crédito de 4.000. Qual o saldo devedor?",5500,"9.500 − 4.000 = 5.500.","R$")
]},
lanc10:{ learn:[
  {h:"Mapa rápido dos lançamentos", b:tbl(['Fato','Débito','Crédito'],[['Compra a prazo','Estoques','Fornecedores'],['Venda a prazo','Clientes','Receita de vendas'],['Baixa do estoque vendido','CMV','Estoques'],['Salários do mês a pagar','Despesa com salários','Salários a pagar'],['Depreciação','Despesa de depreciação','Depreciação acumulada']])}
 ], ex:[
  en("Vendeu a prazo mercadorias por R$ 6.000.","Clientes","Receita de vendas",["Caixa","Estoques"],"Direito a receber e receita."),
  en("Baixou do estoque o custo das mercadorias vendidas, R$ 3.500.","CMV","Estoques",["Receita de vendas","Fornecedores"],"O custo do que foi vendido vira despesa."),
  nu("Férias: salário de R$ 2.400. Qual a provisão mensal de férias, sem o adicional de 1/3?",200,"2.400 ÷ 12 = 200 por mês.","R$")
]},
imob6:{ learn:[
  {h:"Linha do tempo de um bem", b:ol(['Compra: custo + gastos para deixar em condições de uso.','Uso: depreciação mês a mês.','Revisão: vida útil, residual e sinais de perda de valor.','Baixa: venda ou descarte, com ganho ou perda.'])}
 ], ex:[
  od("Ordene a vida de um bem do imobilizado:",["Aquisição pelo custo","Depreciação ao longo do uso","Revisão de vida útil e de perdas","Baixa na venda ou descarte"],"Do custo à baixa."),
  nu("Máquina: custo 30.000, depreciação acumulada 12.000, vendida por 20.000. Ganho na venda?",2000,"Valor contábil 18.000; 20.000 − 18.000 = 2.000.","R$"),
  mc("Software com licença de 3 anos é:",["*Intangível amortizado em 3 anos","Imobilizado depreciado","Estoque","Despesa imediata sempre"],"Intangível com vida útil definida.")
]},
estoq7:{ learn:[
  {h:"PEPS e custo médio lado a lado", b:box('exemplo','Lote 1: 10 un a R$ 5. Lote 2: 10 un a R$ 7. Venda de 10 un. PEPS: CMV = 50 (sai o lote antigo). Custo médio: (50 + 70) ÷ 20 = R$ 6 por unidade, CMV = 60.') + box('dica','Com preços subindo, o PEPS gera CMV menor e estoque final maior que o custo médio.')}
 ], ex:[
  nu("Lote 1: 10 un a R$ 5; lote 2: 10 un a R$ 7. Venda de 10 un pelo custo médio. CMV?",60,"Custo médio 6 × 10 = 60.","R$"),
  nu("Mesmos lotes, venda de 10 un pelo PEPS. CMV?",50,"Saem as 10 do lote 1: 10 × 5.","R$"),
  tf("Com preços subindo, o PEPS deixa o estoque final avaliado pelos custos mais recentes.",true,"Os lotes antigos saem primeiro.")
]},
demo7:{ learn:[
  {h:"Uma pergunta, uma demonstração", b:tbl(['Pergunta','Demonstração'],[['O que a empresa tem e deve numa data?','Balanço Patrimonial'],['Teve lucro no período?','DRE'],['De onde veio e para onde foi o dinheiro?','DFC'],['Como o PL mudou?','DMPL'],['Detalhes e critérios?','Notas explicativas']])}
 ], ex:[
  mt([["Balanço Patrimonial","Posição numa data"],["DRE","Resultado do período"],["DFC","Entradas e saídas de caixa"],["DMPL","Mudanças no patrimônio líquido"]],"Cada demonstração responde uma pergunta."),
  nu("Passivo circulante de R$ 80.000 e liquidez corrente de 1,5. Qual o ativo circulante?",120000,"1,5 × 80.000 = 120.000.","R$"),
  cl("Em que atividade da DFC?",["Operacional","Investimento","Financiamento"],"Recebimento de clientes:0|Compra de máquina:1|Empréstimo obtido:2|Pagamento de fornecedores:0|Pagamento de dividendos:2","Operar, investir ou financiar.")
]},
cust7:{ learn:[
  {h:"Da classificação à decisão", b:box('exemplo','Produto: preço R$ 50, custo variável R$ 30. Margem de contribuição R$ 20. Custos fixos R$ 10.000: ponto de equilíbrio de 500 unidades. Vendendo 800, o lucro é 300 × 20 = R$ 6.000.')}
 ], ex:[
  nu("Preço 50, custo variável 30, custos fixos 10.000. Lucro vendendo 800 unidades?",6000,"MC 20 × 800 = 16.000; 16.000 − 10.000 = 6.000.","R$"),
  tf("O custo variável por unidade tende a ser constante quando a produção muda.",true,"O total varia; o unitário, em geral, não."),
  mc("Um pedido extra, com capacidade ociosa, vale a pena se o preço cobrir:",["*Os custos variáveis e ainda gerar margem de contribuição","Todos os custos fixos da empresa","Só o frete","Nada, nunca vale"],"Os fixos já existem de qualquer jeito.")
]},
trib5:{ learn:[
  {h:"Resumo sem números que mudam", b:ul(['Tributo nasce de um fato previsto em lei (fato gerador).','Regimes tributários mudam a forma de apuração.','Planejar dentro da lei é elisão; fraudar é evasão.']) + box('atencao','Alíquotas e regras mudam com a legislação: sempre confira a fonte oficial e a data de vigência.')}
 ], ex:[
  tf("Escolher o regime tributário permitido mais econômico é elisão, e é lícito.",true,"Planejamento dentro da lei."),
  mc("O fato que faz o tributo ser devido chama-se:",["*Fato gerador","Base de cálculo","Alíquota","Contribuinte"],"Situação prevista em lei."),
  cl("Lícito ou ilícito?",["Lícito","Ilícito"],"Optar por um regime permitido:0|Omitir receitas:1|Aproveitar um incentivo previsto em lei:0|Emitir nota com valor falso:1","A lei é o limite.")
]},
aud7:{ learn:[
  {h:"O fluxo de uma auditoria", b:ol(['Entender a empresa e os riscos.','Definir a materialidade.','Testar controles e saldos, com evidências.','Avaliar distorções encontradas.','Emitir a opinião no relatório.'])}
 ], ex:[
  od("Ordene as fases da auditoria:",["Entender a empresa e os riscos","Definir a materialidade","Obter evidências","Avaliar as distorções","Emitir a opinião"],"Planejar, executar, concluir."),
  mc("A opinião é emitida:",["*Depois de avaliar as evidências e as distorções","Antes de planejar","Pela própria empresa","Sem evidências"],"É a conclusão do trabalho."),
  tf("Controle interno fraco tende a exigir mais testes de saldos.",true,"Mais risco, mais evidência.")
]},
vida5:{ learn:[
  {h:"Plano pessoal em 4 passos", b:ol(['Faça seu balanço pessoal (o que tem e o que deve).','Monte o orçamento do mês.','Forme a reserva e quite as dívidas caras.','Só então invista, diversificando.'])}
 ], ex:[
  od("Ordene o plano pessoal:",["Fazer o balanço pessoal","Montar o orçamento","Formar reserva e quitar dívidas caras","Investir com diversificação"],"Organizar antes de investir."),
  nu("Renda de R$ 3.500. Pela regra 50-30-20, quanto para desejos (30%)?",1050,"30% de 3.500 = 1.050.","R$"),
  tf("Investir antes de ter reserva e ainda pagando rotativo do cartão costuma ser uma boa ideia.",false,"A dívida cara corrói o ganho do investimento.")
]},
/* ---------- finanças pessoais ---------- */
vida1:{ learn:[
  {h:"Bens que perdem valor", b:`<p>Carro e eletrônicos perdem valor com o tempo, como a depreciação de uma empresa. No seu balanço pessoal, use um valor realista, não o preço que você pagou há anos.</p>` + box('exemplo','Carro comprado por R$ 60.000 há 4 anos vale hoje cerca de R$ 38.000 no mercado. É esse o valor que entra no seu ativo.')}
 ], ex:[
  nu("Conta R$ 2.000, carro R$ 38.000, investimentos R$ 5.000; financiamento R$ 15.000 e cartão R$ 1.000. Qual o PL pessoal?",29000,"Ativo 45.000 − Passivo 16.000 = 29.000.","R$"),
  tf("No balanço pessoal, o carro deve entrar pelo preço pago há anos.",false,"Use o valor atual realista."),
  mc("Você pegou um empréstimo de R$ 5.000 e deixou o dinheiro na conta. Seu PL:",["*Não mudou","Aumentou R$ 5.000","Diminuiu R$ 5.000","Dobrou"],"Ativo e passivo subiram igualmente.")
]},
vida2:{ ex:[
  nu("Gastos fixos de R$ 2.200 e variáveis de R$ 1.300, renda de R$ 4.000. Quanto sobra?",500,"4.000 − 3.500 = 500.","R$"),
  mc("Qual gasto é mais fácil de cortar rápido?",["*Variáveis, como delivery e lazer","Aluguel","Parcela de financiamento","Plano de saúde"],"Variáveis dependem de escolhas do mês."),
  tf("Anotar os gastos por algumas semanas ajuda a descobrir para onde vai o dinheiro.",true,"Sem registro, não há controle.")
]},
vida3:{ ex:[
  nu("Dívida de R$ 1.000 no rotativo a 12% ao mês, sem pagar nada. Quanto será após 1 mês?",1120,"1.000 × 1,12 = 1.120.","R$"),
  cl("Boa atitude para sair das dívidas?",["Boa","Ruim"],"Listar todas as dívidas com taxa e valor:0|Pegar outra dívida cara para pagar a primeira:1|Trocar dívida cara por uma mais barata:0|Ignorar as cobranças:1","Organize e troque o caro pelo barato."),
  tf("Uma reserva de emergência ajuda a não recorrer ao cheque especial.",true,"É justamente para imprevistos.")
]},
vida4:{ ex:[
  tf("Renda fixa significa que o rendimento é sempre o mesmo número todo mês.",false,"Significa que as regras de remuneração são conhecidas na contratação."),
  mc("Investir em um único ativo concentra:",["*O risco","A segurança","A liquidez","A reserva"],"Diversificar dilui o risco."),
  cl("Sinal de alerta de golpe?",["Alerta","Normal"],"Retorno garantido muito acima do mercado:0|Pressa para decidir hoje:0|Empresa autorizada e informações claras:1|Pedir para indicar amigos para ganhar mais:0","Promessas fáceis demais são sinal de golpe.")
]},
/* ---------- matemática e dinheiro ---------- */
antes3:{ ex:[
  nu("Saldo de −R$ 150 e depósito de R$ 400. Novo saldo?",250,"−150 + 400 = 250.","R$"),
  tf("Num relatório contábil, (1.200) indica um valor negativo.",true,"Parênteses indicam subtração ou saldo negativo."),
  nu("Três meses: lucro de 1.000, prejuízo de 1.500 e lucro de 900. Resultado acumulado?",400,"1.000 − 1.500 + 900 = 400.","R$")
]},
antes6:{ ex:[
  nu("Preço à vista R$ 900 ou 3 parcelas de R$ 330. Quanto se paga a mais no parcelado?",90,"3 × 330 = 990; 990 − 900 = 90.","R$"),
  mc("Para a loja, uma venda parcelada no boleto próprio gera:",["*Um valor a receber de clientes","Uma dívida","Um estoque","Uma despesa"],"É um direito até o pagamento."),
  tf("Parcelar sem juros significa que o preço total é igual ao preço à vista.",true,"Se não houver juros nem desconto à vista.")
]},
antes8:{ ex:[
  en("Sacou R$ 500 do banco para o caixa da loja.","Caixa","Bancos",["Receita de vendas","Despesa bancária"],"Troca dentro do disponível."),
  tf("Transferir dinheiro do banco para o caixa muda o total disponível da empresa.",false,"Só muda de lugar."),
  nu("Caixa R$ 400, Bancos R$ 3.600, aplicação de resgate imediato R$ 1.000. Total disponível?",5000,"400 + 3.600 + 1.000 = 5.000.","R$")
]},
/* ---------- débito e crédito / demonstrações ---------- */
dc5:{ ex:[
  en("Uma despesa de energia de R$ 300 foi lançada em Despesa de aluguel. Transfira para a conta certa.","Despesa com energia","Despesa de aluguel",["Bancos","Caixa"],"Tira da conta errada e põe na certa."),
  nu("Uma compra de R$ 2.000 foi lançada como R$ 2.500. Qual o valor a estornar parcialmente?",500,"2.500 − 2.000 = 500.","R$"),
  tf("Um lançamento complementar acrescenta a diferença quando o valor foi lançado a menor.",true,"Complementa o que faltou.")
]},
demo5:{ ex:[
  nu("PL inicial 200.000, lucro 50.000, dividendos 15.000, aumento de capital 20.000. PL final?",255000,"200 + 50 − 15 + 20 = 255 mil.","R$"),
  mc("Onde a empresa explica os critérios usados para depreciar seus bens?",["*Nas notas explicativas","Na DRE","No razonete","No extrato bancário"],"Critérios e detalhes ficam nas notas."),
  tf("A DVA mostra quanto de riqueza a empresa gerou e como ela foi distribuída.",true,"Empregados, governo, financiadores e sócios.")
]},
/* ---------- rotina digital ---------- */
digital1:{ ex:[
  cl("Ponto de controle antes de lançar?",["Sim","Não"],"Conferir se a nota é da empresa:0|Verificar se já foi lançada:0|Lançar sem olhar o valor:1|Confirmar o recebimento do serviço:0","Conferir antes de registrar."),
  tf("Um XML importado pode ser lançado duas vezes se não houver controle de duplicidade.",true,"Importação automática não impede duplicidade."),
  mc("A data que define a competência de um serviço é:",["*A da prestação do serviço","A do pagamento","A da importação do arquivo","A do backup"],"Competência segue o fato.")
]},
digital2:{ ex:[
  mc("Uma regra do ERP lança toda compra do fornecedor X como despesa. X passou a vender máquinas. O que fazer?",["*Revisar a regra para separar o que é imobilizado","Manter a regra","Apagar o fornecedor","Lançar tudo como receita"],"A regra deve seguir o fato, não o fornecedor."),
  tf("Testar uma regra num lote pequeno antes de ativá-la para todos reduz o risco.",true,"Erros ficam contidos."),
  nu("Mercadoria de R$ 3.000 com frete de compra de R$ 150. Valor do estoque?",3150,"3.000 + 150 = 3.150.","R$")
]},
digital3:{ ex:[
  cl("Na conciliação, o item aparece em qual lado?",["Só no extrato","Só no razão"],"Tarifa ainda não lançada:0|Cheque emitido e não compensado:1|Rendimento creditado pelo banco:0|Depósito lançado que o banco ainda não processou:1","Compare os dois registros."),
  nu("Razão R$ 5.000; extrato R$ 4.960; tarifa de R$ 40 não lançada. Após lançar a tarifa, o razão fica em:",4960,"5.000 − 40 = 4.960, igual ao extrato.","R$"),
  tf("Criar um lançamento sem documento só para zerar a diferença é uma boa prática.",false,"A diferença precisa ser explicada.")
]},
digital4:{ ex:[
  nu("Passivo de arrendamento de R$ 10.000 a 1% ao mês. Juros do primeiro mês?",100,"1% de 10.000 = 100.","R$"),
  nu("Parcela de R$ 600 com juros de R$ 100. Quanto reduz o passivo?",500,"600 − 100 = 500.","R$"),
  tf("Uma alteração no contrato de arrendamento pode exigir recalcular a agenda.",true,"O contrato define os fluxos.")
]},
digital5:{ ex:[
  od("Ordene o fechamento digital:",["Conciliar as contas","Revisar o balancete","Corrigir as diferenças","Gerar e validar o arquivo","Guardar as evidências"],"Revisar antes de transmitir."),
  nu("Razão de Clientes R$ 42.000; relatório financeiro de títulos R$ 41.300. Diferença a investigar?",700,"42.000 − 41.300 = 700.","R$"),
  tf("Guardar as conciliações usadas no fechamento ajuda a explicar os números depois.",true,"É o pacote de evidências.")
]},
digital6:{ ex:[
  cl("Tarefas que deveriam ficar com pessoas diferentes?",["Separar","Pode juntar"],"Cadastrar fornecedor e aprovar pagamento:0|Lançar e conciliar o próprio banco sem revisão:0|Consultar relatório e imprimir relatório:1","Separe quem registra de quem aprova."),
  mc("O log de alteração mais útil registra:",["*Quem alterou, quando, o valor anterior e o novo","Só a data do dia","Só o nome do sistema","Nada"],"Permite reconstruir a mudança."),
  tf("Revisar uma amostra de lançamentos automáticos ajuda a detectar regras erradas.",true,"Monitorar exceções continua necessário.")
]},
/* ---------- imobilizado ---------- */
imob2:{ ex:[
  nu("Soma dos dígitos: bem de R$ 60.000, sem residual, vida útil 3 anos. Depreciação do 1º ano?",30000,"Soma 1+2+3 = 6; 3/6 × 60.000 = 30.000.","R$"),
  nu("Linear: bem de R$ 60.000, sem residual, 3 anos. Depreciação anual?",20000,"60.000 ÷ 3 = 20.000.","R$"),
  nu("Unidades produzidas: máquina de R$ 100.000 para 50.000 peças. Depreciação num ano com 8.000 peças?",16000,"100.000 ÷ 50.000 = R$ 2 por peça; 8.000 × 2.","R$")
]},
imob3:{ ex:[
  en("Vendeu à vista por R$ 12.000 um bem com custo de R$ 30.000 e depreciação acumulada de R$ 20.000 (ganho de R$ 2.000).","Caixa+Depreciação acumulada","Máquinas e equipamentos+Ganho na venda de imobilizado",["Receita de vendas","Estoques"],"Sai o custo e a depreciação; entra o caixa; a diferença é ganho."),
  nu("Custo 45.000, depreciação acumulada 30.000, venda por 11.000. Perda na venda?",4000,"Valor contábil 15.000; 15.000 − 11.000 = 4.000.","R$"),
  tf("Na baixa de um bem, a depreciação acumulada dele também sai do balanço.",true,"Ela pertence ao bem baixado.")
]},
imob4:{ ex:[
  cl("Pode ser intangível reconhecido?",["Sim","Não"],"Software comprado com licença:0|Marca comprada de outra empresa:0|Treinamento dos funcionários:1|Carteira de clientes gerada internamente sem custo identificável:1","Controle, benefício futuro e custo mensurável."),
  nu("Licença de R$ 36.000 com vida útil de 3 anos. Amortização mensal?",1000,"36.000 ÷ 36 = 1.000.","R$"),
  tf("Gastos com pesquisa, na fase de pesquisa, são reconhecidos como despesa.",true,"Ainda não há como demonstrar benefício futuro.")
]},
imob5:{ ex:[
  nu("Valor contábil 500.000; valor justo menos despesas de venda 380.000; valor em uso 420.000. Perda por impairment?",80000,"Recuperável = maior entre 380 e 420 = 420; 500 − 420 = 80 mil.","R$"),
  mc("Valor recuperável é o maior entre:",["*Valor justo menos despesas de venda e valor em uso","Custo e valor residual","Preço de compra e preço de venda","Depreciação e amortização"],"Definição de valor recuperável."),
  tf("Se o valor recuperável for maior que o valor contábil, não há perda a reconhecer.",true,"O ativo não está acima do que pode render.")
]},
/* ---------- custos, tributos, auditoria ---------- */
cust6:{ learn:[
  {h:"Erro comum: somar em vez de dividir", b:box('atencao','Custo R$ 60 e percentuais sobre o preço de 40%. Somar 40% ao custo dá R$ 84, mas aí os 40% calculados sobre R$ 84 são R$ 33,60, e sobram só R$ 50,40 para o custo. O correto é dividir: 60 ÷ (1 − 0,40) = <b>R$ 100</b>.')}
 ], ex:[
  nu("Custo R$ 60 e soma dos percentuais sobre o preço de 40%. Preço pelo mark-up divisor?",100,"60 ÷ 0,60 = 100.","R$"),
  nu("Custo R$ 84 e percentuais sobre o preço de 30%. Preço?",120,"84 ÷ 0,70 = 120.","R$"),
  tf("Somar o percentual ao custo dá o mesmo preço que dividir pelo complemento.",false,"Somar gera preço menor que o necessário.")
]},
trib4:{ ex:[
  cl("Elisão ou evasão?",["Elisão","Evasão"],"Escolher regime permitido mais vantajoso:0|Vender sem nota:1|Usar incentivo fiscal previsto em lei:0|Registrar despesa falsa:1","Dentro ou fora da lei."),
  tf("Planejar tributos antes de o fato gerador acontecer é característica da elisão.",true,"Escolhas lícitas feitas antes do fato."),
  mc("Esconder receita para pagar menos tributo é:",["*Evasão (ilícito)","Elisão","Planejamento legítimo","Obrigação acessória"],"Fraude é ilícita.")
]},
aud6:{ ex:[
  mt([["Pressão","Metas ou dívidas que motivam"],["Oportunidade","Controles fracos"],["Racionalização","Justificativa que a pessoa se dá"]],"Os três lados do triângulo da fraude."),
  cl("Fraude ou erro?",["Fraude","Erro"],"Lançamento esquecido por distração:1|Nota fiscal falsa para desviar dinheiro:0|Soma errada na planilha:1|Esconder dívida para melhorar o balanço:0","A diferença é a intenção."),
  mc("Qual controle reduz a oportunidade de fraude no caixa?",["*Separar quem recebe de quem registra e concilia","Uma só pessoa fazendo tudo","Não contar o caixa","Não guardar comprovantes"],"Segregação de funções.")
]}
};
