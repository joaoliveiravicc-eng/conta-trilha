import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"base", title:"Primeiros Passos", icon:"🌱", color:"#1E8A4C",
  desc:"Para quem nunca estudou Contabilidade: o que ela é, o que é patrimônio e como se mede o lucro.",
  lessons:[
  {id:"base1", title:"Para que serve a Contabilidade", icon:"📒",
   learn:[
    {h:"Bem-vindo(a)! 👋", b:`<p>Contabilidade é a <b>linguagem dos negócios</b>. Ela registra tudo o que acontece com o dinheiro, os bens e as dívidas de uma empresa para que as pessoas tomem boas decisões.</p>` +
      box('exemplo', 'Dona Ana abriu uma padaria. Ela quer saber: estou ganhando dinheiro? Quanto devo aos fornecedores? Posso contratar mais alguém? A Contabilidade responde a todas essas perguntas.')},
    {h:"O que a Contabilidade faz", b:`<p>O trabalho acontece em quatro etapas, sempre nesta ordem:</p>` +
      ol(['<b>Registrar</b> os fatos: uma venda, uma compra, um pagamento.','<b>Classificar</b> cada fato na conta certa.','<b>Resumir</b> tudo em relatórios (as demonstrações).','<b>Interpretar</b> os números para decidir.'])},
    {h:"Quem usa essas informações", b:ul(['<b>Sócios</b>: querem saber se há lucro.','<b>Bancos</b>: avaliam se podem emprestar.','<b>Governo</b>: calcula e cobra tributos.','<b>Gestores</b>: decidem preços, compras e contratações.','<b>Fornecedores</b>: decidem se vendem a prazo.']) +
      box('dica','Como tanta gente lê os mesmos números, existem regras comuns. No Brasil, as normas são elaboradas pelo CPC e aprovadas pelo CFC, alinhadas ao padrão internacional IFRS.')},
    {h:"A empresa tem vida própria", b:`<p>Um conceito essencial: o dinheiro da empresa <b>não se mistura</b> com o dinheiro do dono.</p><p>Se Dona Ana paga a conta de luz da casa dela com o caixa da padaria, isso bagunça os números da empresa.</p>` +
      box('regra','<b>Entidade:</b> o patrimônio da empresa é separado do patrimônio dos sócios.')}
   ],
   ex:[
    {t:"mc", q:"Qual é o principal objetivo da Contabilidade?", o:["Calcular apenas os impostos que a empresa deve pagar","Fornecer informações úteis sobre o patrimônio para decisões","Fiscalizar o trabalho dos funcionários da empresa","Controlar apenas o dinheiro pessoal do dono do negócio"], a:1, e:"A Contabilidade gera informação útil sobre o patrimônio e o desempenho para quem precisa decidir."},
    {t:"tf", q:"Um banco que analisa um pedido de empréstimo é um usuário da informação contábil.", a:true, e:"Bancos analisam as demonstrações para avaliar se a empresa consegue pagar o que deve."},
    {t:"fill", q:"A Contabilidade primeiro ___ os fatos, depois os classifica, ___ em relatórios e, por fim, interpreta os números.", o:["registra","resume","esconde","apaga"], a:["registra","resume"], e:"Registrar, classificar, resumir e interpretar: essa é a sequência do trabalho contábil."},
    {t:"tf", q:"Pagar a conta de luz da casa do dono com o dinheiro da empresa está correto, afinal o dono é a empresa.", a:false, e:"Pela ideia de Entidade, o patrimônio da empresa é separado do patrimônio dos sócios."},
    {t:"match", pairs:[["Sócios","Querem saber o lucro"],["Bancos","Avaliam se podem emprestar"],["Governo","Cobra tributos"],["Gestores","Decidem o dia a dia"]], e:"Cada usuário olha para os números com um interesse diferente."},
    {t:"mc", q:"Qual destes é um fato que a Contabilidade registra?", o:["A venda de um bolo por R$ 50","O dono ficar feliz com o movimento","Um cliente elogiar o pão","A previsão do tempo"], a:0, e:"Registram-se fatos que afetam o patrimônio e podem ser medidos em dinheiro."}
   ]},
  {id:"base2", title:"Bens, direitos e obrigações", icon:"🧺",
   learn:[
    {h:"Patrimônio", b:`<p><b>Patrimônio</b> é o conjunto de <b>bens</b>, <b>direitos</b> e <b>obrigações</b> de uma empresa. Vamos ver cada parte.</p>` +
      box('exemplo','A padaria tem fornos (bem), tem vendas a prazo para receber (direito) e deve para o moinho que vende farinha (obrigação).')},
    {h:"Bens", b:`<p>Coisas que a empresa <b>possui</b> e que podem ser medidas em dinheiro.</p>` +
      ul(['Dinheiro em caixa','Mercadorias em estoque','Máquinas, veículos, móveis e imóveis','Marcas e softwares, que são <b>bens intangíveis</b> (não dá para tocar)'])},
    {h:"Direitos", b:`<p>Valores que a empresa tem a <b>receber</b> de outras pessoas ou empresas.</p>` +
      ul(['Clientes: vendas feitas a prazo','Aluguéis a receber','Dinheiro depositado no banco (um direito contra o banco)']) +
      box('dica','Muitos direitos terminam com “a receber”.')},
    {h:"Obrigações", b:`<p>Dívidas da empresa com terceiros: valores que ela tem a <b>pagar</b>.</p>` +
      ul(['Fornecedores (compras a prazo)','Salários a pagar','Impostos a pagar','Empréstimos a pagar']) +
      box('dica','Muitas obrigações terminam com “a pagar”. “Fornecedores” é uma exceção no nome, mas também é obrigação.')}
   ],
   ex:[
    {t:"class", q:"Classifique cada item do patrimônio", cats:["Bem","Direito","Obrigação"], items:[["Mercadorias em estoque",0],["Clientes (vendas a prazo)",1],["Salários a pagar",2],["Veículos",0],["Fornecedores",2],["Aluguéis a receber",1]], e:"Bens a empresa possui, direitos ela vai receber e obrigações ela vai pagar."},
    {t:"mc", q:"A empresa vendeu R$ 2.000 a prazo. O valor que ela vai receber do cliente é um:", o:["Bem","Direito","Obrigação","Prejuízo"], a:1, e:"Valores a receber de terceiros são direitos."},
    {t:"tf", q:"Um software comprado pela empresa é um bem, mesmo não sendo algo que se possa tocar.", a:true, e:"Softwares, marcas e patentes são bens intangíveis."},
    {t:"fill", q:"Contas que terminam com “a ___” costumam ser direitos; as que terminam com “a ___” costumam ser obrigações.", o:["receber","pagar","vender","comprar"], a:["receber","pagar"], e:"É um bom atalho para reconhecer direitos e obrigações."},
    {t:"mc", q:"Qual destes NÃO é um bem da empresa?", o:["Computadores","Dinheiro em caixa","Impostos a pagar","Imóvel da loja"], a:2, e:"Impostos a pagar são uma obrigação, não um bem."},
    {t:"match", pairs:[["Dinheiro em caixa","Bem numerário"],["Duplicatas a receber","Direito"],["Empréstimos a pagar","Obrigação"],["Marca registrada","Bem intangível"]], e:"Bens podem ser tangíveis (caixa, máquinas) ou intangíveis (marcas)."}
   ]},
  {id:"base3", title:"A equação patrimonial", icon:"⚖️",
   learn:[
    {h:"Ativo e Passivo", b:`<p>Os <b>bens e direitos</b> formam o <b>Ativo</b>: tudo o que a empresa tem.</p><p>As <b>obrigações</b> formam o <b>Passivo</b>: tudo o que ela deve a terceiros.</p>`},
    {h:"Patrimônio Líquido", b:`<p>A diferença entre o que a empresa tem e o que ela deve é a parte que realmente pertence aos donos: o <b>Patrimônio Líquido (PL)</b>.</p>` + eq('Ativo − Passivo = PL') +
      box('exemplo','A padaria tem R$ 80.000 em ativos e deve R$ 30.000. O PL é R$ 50.000.')},
    {h:"A equação fundamental", b:eq('Ativo = Passivo + Patrimônio Líquido') +
      `<p>Leia assim: tudo o que a empresa tem (Ativo) veio de algum lugar. Ou veio de terceiros (Passivo) ou veio dos donos (PL). Por isso os dois lados sempre se equilibram.</p>` +
      tbl(['Ativo','Passivo + PL'],[['Caixa 20.000','Fornecedores 30.000'],['Estoques 25.000','Capital social 50.000'],['Fornos 35.000',''],['<b>Total 80.000</b>','<b>Total 80.000</b>']])},
    {h:"Situações possíveis", b:tbl(['Situação','Resultado'],[['Ativo maior que Passivo','PL positivo'],['Ativo igual ao Passivo','PL igual a zero'],['Ativo menor que Passivo','PL negativo']]) +
      box('atencao','PL negativo é chamado de <b>passivo a descoberto</b>: os passivos superam os ativos pelos valores contábeis. PL positivo, sozinho, não garante dinheiro disponível nem boa saúde financeira. Os valores de venda dos ativos também podem ser diferentes dos valores registrados.')}
   ],
   ex:[
    {t:"num", q:"Uma empresa tem Ativo de R$ 100.000 e Passivo de R$ 40.000. Qual é o Patrimônio Líquido?", a:60000, u:"R$", e:"PL = Ativo − Passivo = 100.000 − 40.000 = 60.000."},
    {t:"mc", q:"Qual é a equação fundamental da Contabilidade?", o:["Ativo = Passivo + Patrimônio Líquido","Ativo = Passivo − Patrimônio Líquido","Passivo = Ativo + Patrimônio Líquido","Lucro = Ativo + Passivo"], a:0, e:"O que a empresa tem é igual ao que ela deve a terceiros mais o que pertence aos donos."},
    {t:"num", q:"Ativo de R$ 250.000 e PL de R$ 90.000. Quanto é o Passivo?", a:160000, u:"R$", e:"Passivo = Ativo − PL = 250.000 − 90.000 = 160.000."},
    {t:"tf", q:"Se o Passivo é maior que o Ativo, o PL é negativo, situação chamada de passivo a descoberto.", a:true, e:"Com PL negativo, as dívidas superam tudo o que a empresa tem."},
    {t:"fill", q:"O ___ reúne bens e direitos; o ___ reúne as obrigações com terceiros.", o:["Ativo","Passivo","Lucro","Caixa"], a:["Ativo","Passivo"], e:"Ativo = bens + direitos. Passivo = obrigações."},
    {t:"mc", q:"Os sócios colocam R$ 20.000 em dinheiro para abrir a empresa. O que acontece?", o:["Aumenta o Ativo (Caixa) e o PL (Capital Social)","Aumenta o Ativo (Caixa) e aumenta o Passivo (Dívidas)","Diminui o Ativo (Caixa) e aumenta o PL (Capital)","Nada muda no patrimônio, só troca de lugar"], a:0, e:"Entra dinheiro (Ativo) e os sócios passam a ter essa parte na empresa (Capital Social, no PL)."},
    {t:"class", q:"Em que grupo fica cada conta?", cats:["Ativo","Passivo","PL"], items:[["Caixa",0],["Capital social",2],["Fornecedores",1],["Estoques",0],["Empréstimos a pagar",1],["Reservas de lucros",2]], e:"Capital social e reservas pertencem aos sócios, por isso ficam no PL."}
   ]},
  {id:"base4", title:"Receitas, despesas e resultado", icon:"📈",
   learn:[
    {h:"Receita", b:`<p><b>Receita</b> é o valor que a empresa ganha com a sua atividade: vender produtos, prestar serviços, receber juros de aplicações.</p><p>Receita <b>aumenta</b> o Patrimônio Líquido.</p>`},
    {h:"Despesa", b:`<p><b>Despesa</b> é o consumo de recursos para funcionar e gerar receitas: aluguel, salários, energia, propaganda.</p><p>Despesa <b>diminui</b> o Patrimônio Líquido.</p>`},
    {h:"Resultado: lucro ou prejuízo", b:eq('Receitas − Despesas = Resultado') + `<p>Se o resultado é positivo, é <b>lucro</b>. Se é negativo, é <b>prejuízo</b>. O lucro aumenta o PL: é a recompensa dos donos.</p>` +
      box('exemplo','No mês, a padaria teve R$ 30.000 de receitas e R$ 22.000 de despesas. Lucro de R$ 8.000.')},
    {h:"Competência: quando registrar", b:`<p>Conceito importantíssimo: receitas e despesas são registradas <b>quando acontecem</b>, e não quando o dinheiro entra ou sai. Isso é o <b>regime de competência</b>.</p>` +
      box('exemplo','A padaria fez os doces de uma festa em dezembro e o cliente só pagou em janeiro. A receita é de dezembro.') +
      box('regra','A contabilidade das empresas no Brasil segue o regime de competência. O regime de caixa (registrar só quando o dinheiro se move) é usado apenas em situações específicas.')}
   ],
   ex:[
    {t:"class", q:"Receita ou despesa?", cats:["Receita","Despesa"], items:[["Venda de mercadorias",0],["Aluguel da loja",1],["Serviços prestados",0],["Conta de energia",1],["Juros ganhos em aplicação",0],["Salários dos funcionários",1]], e:"Receitas vêm da atividade e aumentam o PL; despesas consomem recursos e diminuem o PL."},
    {t:"num", q:"Receitas de R$ 45.000 e despesas de R$ 38.500 no mês. Qual foi o lucro?", a:6500, u:"R$", e:"45.000 − 38.500 = 6.500 de lucro."},
    {t:"mc", q:"Qual o efeito do lucro do período no Patrimônio Líquido?", o:["Aumenta","Diminui","Não altera","Zera"], a:0, e:"O lucro pertence aos donos, então aumenta o PL."},
    {t:"tf", q:"Pelo regime de competência, o aluguel de março pago só em abril é despesa de março.", a:true, e:"A despesa pertence ao mês em que o imóvel foi usado: março."},
    {t:"mc", q:"Receitas de R$ 20.000 e despesas de R$ 26.000 resultam em:", o:["Lucro de R$ 6.000","Prejuízo de R$ 6.000","Lucro de R$ 46.000","Resultado nulo"], a:1, e:"20.000 − 26.000 = −6.000: prejuízo."},
    {t:"fill", q:"Receitas ___ o Patrimônio Líquido e despesas o ___.", o:["aumentam","diminuem","dobram","ignoram"], a:["aumentam","diminuem"], e:"Por isso o resultado (receitas − despesas) altera o PL."}
   ]},
  {id:"base5", title:"Plano de contas", icon:"🗂️",
   learn:[
    {h:"Organizando as contas", b:`<p>O <b>plano de contas</b> é a lista oficial das contas da empresa, organizada em grupos e com códigos.</p>`},
    {h:"Códigos em níveis", b:tbl(['Código','Conta'],[['1','Ativo'],['1.1','Ativo Circulante'],['1.1.1','Disponível'],['1.1.1.01','Caixa'],['1.1.1.02','Bancos'],['2','Passivo'],['2.1.1.01','Fornecedores']]) + `<p>Os códigos variam de empresa para empresa; a lógica de níveis é sempre parecida.</p>`},
    {h:"Sintéticas e analíticas", b:ul(['<b>Sintéticas</b> agrupam outras (ex: Disponível).','<b>Analíticas</b> são o último nível e recebem os lançamentos (ex: Caixa).']) + box('regra','Só contas analíticas recebem lançamentos.')},
    {h:"Para que serve", b:`<p>Padronizar: todos registram do mesmo jeito, os relatórios saem automaticamente e dá para comparar um mês com outro.</p>`}
   ],
   ex:[
    {t:"mc", q:"O que é o plano de contas?", o:["A lista organizada das contas usadas pela empresa","Um plano de negócios para os próximos anos","O orçamento anual aprovado pela diretoria","Um tipo de imposto cobrado sobre as contas bancárias"], a:0, e:"Ele padroniza os registros."},
    {t:"tf", q:"Contas sintéticas recebem lançamentos diretamente.", a:false, e:"Quem recebe lançamentos são as analíticas."},
    {t:"ord", q:"Ordene do grupo mais amplo para a conta mais específica:", items:["Ativo","Ativo Circulante","Disponível","Caixa"], e:"Do geral para o detalhe."},
    {t:"class", q:"Sintética ou analítica?", cats:["Sintética","Analítica"], items:[["Ativo Circulante",0],["Caixa",1],["Disponível",0],["Banco do Bairro S.A.",1],["Passivo Circulante",0]], e:"Analíticas são o último nível."},
    {t:"wr", q:"Como se chamam as contas do último nível, que recebem os lançamentos?", a:["analiticas","analitica","contas analiticas"], e:"Contas analíticas."},
    {t:"mc", q:"Qual a principal vantagem de um plano de contas bem feito?", o:["Registros padronizados e relatórios comparáveis","Pagar menos impostos em todos os períodos","Dispensar os documentos que comprovam os fatos","Eliminar a necessidade de auditoria externa"], a:0, e:"Padronização gera informação confiável."}
   ]},
  {id:"base6", title:"Competência x caixa", icon:"🗓️",
   learn:[
    {h:"Dois jeitos de contar", b:`<p>Já vimos que receitas e despesas entram <b>quando acontecem</b> (competência). Existe também o <b>regime de caixa</b>, que só registra quando o dinheiro efetivamente entra ou sai.</p>`},
    {h:"Comparando na prática", b:tbl(['Fato','Regime de competência','Regime de caixa'],[['Venda em dezembro, recebida em janeiro','Receita de dezembro','Receita de janeiro'],['Aluguel de março, pago em abril','Despesa de março','Despesa de abril'],['Conta de luz de maio, paga em maio','Despesa de maio (mesmo mês nos dois)','Despesa de maio']])},
    {h:"Quem usa cada um", b:ul(['<b>Competência</b>: regra geral da Contabilidade societária no Brasil, obrigatória para a maioria das empresas.','<b>Caixa</b>: permitido em situações específicas, como o MEI e algumas apurações tributárias simplificadas.']) + box('regra','As demonstrações financeiras das empresas seguem o regime de competência, porque ele mostra melhor o desempenho real do período.')},
    {h:"Por que competência é mais fiel", b:`<p>O regime de caixa pode distorcer o resultado: uma empresa pode parecer lucrativa só porque recebeu adiantado, ou parecer no prejuízo só porque pagou tudo de uma vez.</p>` + box('exemplo','Uma escola recebe a mensalidade de dezembro só em janeiro. Pelo caixa, dezembro parece fraco e janeiro parece ótimo — mas o serviço foi prestado em dezembro.')}
   ],
   ex:[
    {t:"mc", q:"Pelo regime de competência, uma venda feita em dezembro e recebida em janeiro é receita de:", o:["Dezembro","Janeiro","Metade em cada mês","Do mês em que o boleto vence"], a:0, e:"A receita pertence ao mês em que o fato ocorreu, não ao mês do recebimento."},
    {t:"tf", q:"O regime de caixa registra receitas e despesas só quando o dinheiro entra ou sai de fato.", a:true, e:"É a diferença central entre os dois regimes."},
    {t:"mc", q:"Qual regime as demonstrações financeiras das empresas seguem, como regra geral, no Brasil?", o:["Competência","Caixa","Metade competência, metade caixa","Depende do dia do mês"], a:0, e:"A competência mostra melhor o desempenho real do período."},
    {t:"class", q:"Nesta situação, em que mês fica cada despesa pelo regime de COMPETÊNCIA?", cats:["Mês do fato gerador","Mês do pagamento"], items:[["Aluguel de março pago em abril",0],["Salário de junho pago em julho",0],["Conta de telefone de maio paga em maio",0],["Serviço prestado em agosto, cobrado em setembro",0]], e:"Pela competência, tudo vai para o mês em que o fato realmente aconteceu, não para o mês do pagamento."},
    {t:"tf", q:"O regime de caixa pode fazer um mês parecer mais lucrativo do que realmente foi.", a:true, e:"Um recebimento adiantado, por exemplo, infla o caixa de um mês que na verdade teve pouca atividade."},
    {t:"wr", q:"Qual regime registra os fatos no momento em que eles acontecem, e não quando o dinheiro se move?", a:["competencia","regime de competencia"], e:"Regime de competência."}
   ]},
  {id:"base7", title:"Revisão: os pilares da Contabilidade", icon:"🔄",
   learn:[
    {h:"O que você já sabe", b:tbl(['Conceito','Resumo'],[['Patrimônio','Bens + direitos − obrigações'],['Equação fundamental','Ativo = Passivo + PL'],['Resultado','Receitas − Despesas'],['Competência','Registra quando acontece, não quando paga/recebe'],['Plano de contas','Organiza as contas em níveis; só analíticas recebem lançamento']])}
   ],
   ex:[
    {t:"num", q:"Ativo de R$ 180.000 e Passivo de R$ 70.000. Qual o Patrimônio Líquido?", a:110000, u:"R$", e:"180.000 − 70.000 = 110.000."},
    {t:"class", q:"Bem, direito, obrigação ou nenhum dos três?", cats:["Bem","Direito","Obrigação"], items:[["Veículos",0],["Duplicatas a receber",1],["Empréstimos a pagar",2],["Estoques",0]], e:"Bens você tem, direitos você vai receber, obrigações você vai pagar."},
    {t:"num", q:"Receitas de R$ 60.000 e despesas de R$ 47.000 no mês. Qual o resultado?", a:13000, u:"R$", e:"60.000 − 47.000 = 13.000 de lucro."},
    {t:"mc", q:"Uma venda feita em outubro e recebida em novembro é receita de:", o:["Outubro","Novembro","Metade em cada mês","Do mês do boleto"], a:0, e:"Regime de competência: a receita é do mês do fato, não do recebimento."},
    {t:"tf", q:"Uma conta sintética, como \"Ativo Circulante\", pode receber lançamentos diretamente.", a:false, e:"Só as contas analíticas (o último nível) recebem lançamentos."},
    {t:"mc", q:"Os sócios integralizam R$ 40.000 em dinheiro na abertura da empresa. O que acontece com o patrimônio?", o:["Ativo e PL aumentam juntos","Só o Ativo aumenta","Só o PL aumenta","Nada muda"], a:0, e:"Entra dinheiro (Ativo) e nasce o Capital Social (PL): os dois lados da equação sobem juntos."}
   ]}
  ]
};
