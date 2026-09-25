/* Oficinas originais. Valores fictícios; as hipóteses estão em cada caso. */
import { box, eq, tbl, ol, lanc } from './render-helpers.js';
import { mc, tf, nu, od } from '../engine/exercises/factories.js';

export const COURSE_GOALS = {
  antes:['Calcular percentuais e comparar valores','Interpretar pagamentos e documentos'],
  base:['Distinguir patrimônio de resultado','Separar competência de caixa'],
  dc:['Explicar o efeito de cada lançamento','Conferir débitos e créditos'],
  lanc:['Registrar operações e ajustes do mês','Conciliar documentos e saldos'],
  digital:['Organizar documentos e regras no ERP','Conciliar dados e preservar a trilha de auditoria'],
  imob:['Calcular custo e depreciação de bens','Avaliar perdas e valores residuais','Reconhecer e acompanhar arrendamentos no sistema contábil'],
  estoq:['Apurar estoque e custo das vendas','Investigar diferenças no inventário'],
  demo:['Relacionar balanço, resultado e caixa','Interpretar indicadores com contexto'],
  cust:['Distinguir custos e despesas','Usar margem para avaliar decisões'],
  trib:['Entender apuração e obrigações','Conferir bases, créditos e documentos'],
  aud:['Relacionar riscos a procedimentos','Sustentar conclusões com evidências'],
  vida:['Organizar patrimônio e orçamento','Projetar compromissos e imprevistos'],
  financeirojr:['Executar a rotina de contas a pagar, a receber, bancos e conciliação','Planejar o caixa e explicar lucro, caixa e indicadores','Aplicar a rotina a um grupo de mídia e agro, e se sair bem na entrevista']
};

export const WORKSHOPS = [
  {courseId:'antes', id:'oficina-antes', title:'Descontos que enganam', icon:'🏷️',
   goal:'Comparar duas ofertas usando a mesma base e o custo total.',
   recap:['Descontos sucessivos incidem sobre bases diferentes.','Compare o total, incluindo os custos informados.','Taxa e prazo precisam estar na mesma unidade.'],
   learn:[
    {h:'A compra da calculadora', b:'<p>Ana precisa de uma calculadora de R$ 200. A loja A dá 10% de desconto e depois mais 5%. A loja B dá 15% de uma vez. Qual é a mais barata, sem frete?</p>'+box('dica','Antes de calcular, estime: o segundo desconto de A será aplicado sobre um preço menor.')},
    {h:'Resolva uma etapa de cada vez', b:ol(['Na loja A: 200 × 0,90 = R$ 180.','Depois: 180 × 0,95 = R$ 171.','Na loja B: 200 × 0,85 = R$ 170.'])+box('exemplo','O desconto total de A é R$ 29: 29 ÷ 200 = 14,5%. A loja B é R$ 1 mais barata.'), check:mc('Sobre qual valor incide o segundo desconto da loja A?',['*R$ 180','R$ 200','R$ 171'],'O primeiro desconto já reduziu a base para R$ 180.')},
    {h:'O preço da etiqueta não é tudo', b:'<p>Agora A cobra R$ 4 de frete e B cobra R$ 10. Os totais passam a ser R$ 175 e R$ 180. Com essas condições, A custa menos.</p>'+eq('Custo total = preço final + custos adicionais')},
    {h:'Seu roteiro de comparação', b:ol(['Identifique a base de cada percentual.','Calcule as etapas sem somar taxas de bases diferentes.','Acrescente frete e encargos informados.','Compare ofertas para a mesma quantidade e prazo.'])}
   ], ex:[
    nu('Um item de R$ 300 recebe 10% de desconto e depois 10% sobre o preço reduzido. Quanto custa?',243,'300 × 0,90 = 270; 270 × 0,90 = 243.','R$','Calcule o primeiro desconto antes do segundo.'),
    nu('No item de R$ 300 que terminou em R$ 243, qual foi o desconto total em percentual?',19,'A redução foi 57. Então 57 ÷ 300 × 100 = 19%.','%'),
    tf('Dois descontos sucessivos de 10% equivalem a um desconto único de 20%.',false,'O segundo 10% incide sobre 90% do preço original. A redução total é de 19%.'),
    mc('Oferta A: R$ 240 + R$ 20 de frete. Oferta B: R$ 255 com frete grátis. Para o mesmo produto, qual custa menos?',['A','*B','Custam o mesmo'],'A totaliza R$ 260 e B, R$ 255.'),
    nu('Uma compra de R$ 900 é dividida em 3 parcelas iguais, sem juros nem taxas. Qual é cada parcela?',300,'900 ÷ 3 = 300. Compare também o total, que continua R$ 900.','R$'),
    od('Organize a comparação de descontos sucessivos:',['Identificar o preço inicial','Aplicar o primeiro desconto','Aplicar o segundo desconto ao preço reduzido','Somar o frete e comparar os totais'],'A ordem preserva a base correta de cada desconto.')
   ]},
  {courseId:'base', id:'oficina-base', title:'Uma empresa com lucro e pouco caixa', icon:'🧩',
   goal:'Explicar por que lucro, dinheiro disponível e patrimônio não são o mesmo número.',
   recap:['Receita a prazo pode gerar lucro antes do recebimento.','Um empréstimo aumenta caixa e dívida, sem criar receita.','PL positivo não garante dinheiro para pagar hoje.'],
   learn:[
    {h:'O primeiro mês do estúdio', b:'<p>Os sócios colocam R$ 5.000 no banco. O estúdio presta R$ 4.000 de serviços a prazo e consome R$ 1.500 em aluguel, pago no mês. Considere apenas esses fatos, sem tributos.</p>'+tbl(['Fato','Caixa','Resultado'],[['Aporte dos sócios','+5.000','Não é receita'],['Serviço prestado a prazo','0','+4.000'],['Aluguel consumido e pago','−1.500','−1.500']])},
    {h:'Três perguntas, três respostas', b:eq('Lucro = 4.000 − 1.500 = R$ 2.500')+eq('Banco = 5.000 − 1.500 = R$ 3.500')+'<p>Ativo: Banco 3.500 + Clientes 4.000 = 7.500. Sem dívidas neste caso, PL = capital 5.000 + lucro 2.500 = 7.500.</p>', check:mc('Receber os R$ 4.000 do cliente no mês seguinte cria outra receita?',['Sim, toda entrada é receita','*Não, troca Clientes por Banco'],'A receita foi reconhecida ao prestar o serviço. O recebimento liquida o direito.')},
    {h:'Uma dívida não vira lucro', b:'<p>Se entrar um empréstimo de R$ 2.000, Banco e Empréstimos a pagar aumentam em R$ 2.000. O lucro continua igual, antes de quaisquer juros.</p>'+box('atencao','Entrada de caixa pode ser capital, empréstimo ou recebimento de uma venda antiga. Investigue a origem.')},
    {h:'Leia patrimônio com contexto', b:'<p>Um PL positivo informa que ativos superam passivos pelos valores contábeis. Não garante liquidez: uma empresa pode ter imóveis e pouco dinheiro disponível para dívidas que vencem hoje.</p>'+box('dica','Pergunte: quanto tenho? Quanto devo? Quando vou receber e pagar?')}
   ], ex:[
    nu('Uma consultoria prestou R$ 6.000 de serviços a prazo e consumiu R$ 2.000 em despesas. Sem outros fatos, qual é o lucro?',4000,'6.000 − 2.000 = 4.000, independentemente da data de recebimento.','R$'),
    mc('Um cliente paga hoje por um serviço já reconhecido no mês anterior. Qual é o efeito?',['Receita nova','*Aumenta Banco e diminui Clientes','Aumenta despesa'],'O direito a receber se transforma em dinheiro.'),
    tf('Ter PL positivo garante pagar todas as dívidas que vencem hoje.',false,'Os ativos podem estar em estoques, imóveis ou direitos ainda não recebidos.'),
    nu('Ativos de R$ 18.000 e obrigações de R$ 7.000. Qual é o PL?',11000,'PL = 18.000 − 7.000 = 11.000.','R$'),
    mc('Qual entrada aumenta uma obrigação, sem criar receita?',['Venda de serviço à vista','*Empréstimo recebido','Aporte de capital'],'O empréstimo cria dívida; o aporte aumenta PL.'),
    nu('Banco inicial de R$ 5.000, aluguel pago de R$ 1.500 e empréstimo recebido de R$ 2.000. Qual o saldo final?',5500,'5.000 − 1.500 + 2.000 = 5.500. O empréstimo não faz parte do lucro.','R$')
   ]},
  {courseId:'dc', id:'oficina-dc', title:'Detetive dos lançamentos', icon:'🔎',
   goal:'Encontrar erros que não aparecem na simples soma de débitos e créditos.',
   recap:['Débitos iguais a créditos são necessários, mas não provam que tudo está correto.','Confira fato, contas, valor e período.','Pagamento de dívida não é uma nova despesa.'],
   learn:[
    {h:'O balancete bateu. Está tudo certo?', b:'<p>Uma loja comprou R$ 800 de mercadorias a prazo. O registro correto aumenta Estoques e Fornecedores.</p>'+lanc([['D','Estoques','800'],['C','Fornecedores','800']])},
    {h:'O erro que se equilibra', b:'<p>Alguém registrou D Despesa de aluguel e C Fornecedores, ambos por R$ 800. Os totais batem, mas a conta devedora não representa o fato.</p>'+box('regra','Conferir o equilíbrio é uma etapa. Confronte também o lançamento com o documento e a natureza da operação.'), check:mc('Qual problema existe no lançamento errado?',['Débito diferente do crédito','*Conta devedora incompatível com a compra'],'Os dois lados têm R$ 800. O erro está na classificação.')},
    {h:'Quando a dívida é paga', b:'<p>No pagamento de R$ 800 por banco: a dívida diminui por débito e o banco diminui por crédito.</p>'+lanc([['D','Fornecedores','800'],['C','Bancos','800']])+box('atencao','Não registre a compra novamente ao pagar o fornecedor.')},
    {h:'Quatro conferências', b:ol(['Leia o documento e identifique o fato.','Determine as contas e o que aumenta ou diminui.','Confira valor e data de competência.','Verifique se débitos e créditos são iguais.'])}
   ], ex:[
    mc('Compra de mercadorias a prazo por R$ 900. Qual lançamento corresponde ao fato?',['*D Estoques / C Fornecedores','D Caixa / C Receita','D Aluguel / C Fornecedores'],'Estoque e obrigação aumentam.'),
    mc('Pagamento de R$ 900 ao fornecedor pelo banco:',['D Despesa / C Receita','*D Fornecedores / C Bancos','D Bancos / C Fornecedores'],'A obrigação diminui por débito; o ativo Banco diminui por crédito.'),
    tf('Uma compra omitida dos dois lados pode deixar o balancete equilibrado.',true,'A omissão não cria diferença entre débitos e créditos, mas deixa patrimônio incompleto.'),
    nu('Débitos somam R$ 5.400 e créditos somam R$ 5.100. Qual a diferença a investigar?',300,'5.400 − 5.100 = 300. A diferença orienta a busca, mas não identifica a causa sozinha.','R$'),
    mc('Uma despesa de fevereiro foi registrada em março, pelo valor correto. Qual aspecto falhou?',['Valor','*Período','Equilíbrio aritmético'],'A competência foi atribuída ao período errado.'),
    mc('Um registro equilibrado tem a conta errada. O melhor próximo passo é:',['Ignorar porque os totais batem','*Conferir a evidência e fazer a correção documentada','Apagar toda a contabilidade'],'A correção precisa refletir o fato e preservar a rastreabilidade.')
   ]},
  {courseId:'lanc', id:'oficina-lanc', title:'Fechamento e conciliação do banco', icon:'🏦',
   goal:'Separar diferenças de prazo de movimentos que ainda precisam ser registrados.',
   recap:['Conciliação compara registros e extrato na mesma data.','Um movimento já registrado não deve ser lançado duas vezes.','Diferenças precisam de evidência e acompanhamento.'],
   learn:[
    {h:'Dois saldos para a mesma conta', b:'<p>Em 30/04, o razão de Bancos mostra R$ 5.000 e o extrato, R$ 4.850. O extrato contém tarifa de R$ 50 e débito automático de R$ 100 ainda não registrados. Considere somente essas diferenças.</p>'},
    {h:'Ajuste o que está faltando', b:tbl(['Ajuste no razão','Valor'],[['Saldo antes da conciliação','5.000'],['Tarifa bancária','−50'],['Débito automático documentado','−100'],['Saldo conciliado','4.850']])+box('exemplo','A tarifa gera despesa financeira. O débito automático deve ser classificado pela sua origem: pode liquidar uma obrigação já registrada.'), check:mc('O débito automático quita uma conta já reconhecida. É correto registrar outra despesa?',['Sim','*Não'],'A baixa deve ser na obrigação; registrar despesa de novo duplicaria o consumo.')},
    {h:'Diferença de prazo não é lançamento novo', b:'<p>Um depósito de R$ 300 já aparece no razão, mas a compensação ainda não chegou ao extrato. Documente a pendência e confira depois. Registrar outra entrada duplicaria Banco.</p>'+box('dica','Uma diferença pode exigir ajuste no razão ou apenas acompanhamento da compensação.')},
    {h:'Feche com uma trilha de evidências', b:ol(['Fixe a data de corte.','Compare extrato, razão e comprovantes.','Classifique cada diferença.','Registre apenas os ajustes necessários.','Acompanhe pendências até sua resolução.'])}
   ], ex:[
    nu('Razão: R$ 8.000. Tarifa bancária de R$ 60 está só no extrato. Sem outras diferenças, qual o razão ajustado?',7940,'8.000 − 60 = 7.940.','R$'),
    mc('Pagamento no extrato quita Fornecedores já registrado. O débito contábil será em:',['Despesa novamente','*Fornecedores','Receita'],'Debitar Fornecedores baixa a obrigação existente.'),
    tf('Depósito já registrado, aguardando compensação, deve ser lançado de novo.',false,'A diferença de prazo é acompanhada; duplicar o lançamento aumentaria o saldo indevidamente.'),
    nu('Razão de R$ 6.000 tem tarifa de R$ 40 e pagamento de R$ 160 ainda não registrados. Qual o saldo ajustado?',5800,'6.000 − 40 − 160 = 5.800.','R$'),
    mc('A conciliação compara principalmente:',['Vendas de empresas diferentes','*Extrato e razão na mesma data','Lucro de um ano com caixa de outro'],'A data de corte comum permite identificar diferenças explicáveis.'),
    od('Ordene uma conciliação:',['Fixar a data de corte','Comparar extrato e razão','Investigar e documentar diferenças','Registrar ajustes e acompanhar pendências'],'Primeiro defina o escopo; ajuste apenas depois de entender cada diferença.')
   ]},
  {courseId:'imob', id:'oficina-imob', title:'Quanto custa usar uma máquina?', icon:'⚙️',
   goal:'Calcular a base depreciável e interpretar o valor contábil de um equipamento.',
   recap:['Custo inclui gastos diretamente atribuíveis para colocar o bem em condições de uso.','Base depreciável é custo menos residual.','Depreciação não é uma nova saída de caixa a cada mês.'],
   learn:[
    {h:'Prepare o equipamento para uso', b:'<p>Uma máquina custa R$ 20.000. Frete de R$ 1.000 e instalação necessária de R$ 3.000 a deixam pronta para operar. Neste caso simplificado, não há tributos recuperáveis.</p>'+eq('Custo = 20.000 + 1.000 + 3.000 = 24.000')},
    {h:'O que será consumido ao longo do tempo?', b:'<p>Com valor residual estimado de R$ 4.000 e vida útil de 5 anos, a base depreciável é R$ 20.000. Pelo método linear, R$ 4.000 por ano completo de uso.</p>'+eq('(24.000 − 4.000) ÷ 5 = 4.000 por ano'), check:mc('Por que subtrair o valor residual?',['Para registrar um desconto de compra','*Porque essa parte não será alocada como depreciação'],'A base representa o custo que se espera consumir durante a vida útil.')},
    {h:'Depois de dois anos completos', b:'<p>A depreciação acumulada será R$ 8.000 e o valor contábil, R$ 16.000, sem perdas adicionais. Isso não é uma avaliação do preço de venda.</p>'+box('atencao','A depreciação começa quando o ativo está disponível para uso. Vida útil e residual são estimativas revisáveis; não copie automaticamente uma taxa fiscal.')},
    {h:'Uso, pagamento e manutenção', b:'<p>Pagar a máquina e consumir seus benefícios são eventos diferentes. Manutenção rotineira costuma ser despesa; uma substituição relevante exige analisar os critérios de reconhecimento de um ativo.</p>'+box('dica','Pergunte o que o gasto faz: manter a operação ou atender aos critérios para reconhecer um novo recurso?')}
   ], ex:[
    nu('Equipamento de R$ 30.000, frete de R$ 2.000 e instalação necessária de R$ 4.000. Sem tributos recuperáveis, qual o custo?',36000,'30.000 + 2.000 + 4.000 = 36.000.','R$'),
    nu('Custo de R$ 36.000, residual de R$ 6.000 e vida útil de 5 anos. Qual a depreciação linear anual?',6000,'(36.000 − 6.000) ÷ 5 = 6.000.','R$'),
    nu('No equipamento anterior, qual o valor contábil após 2 anos completos, sem outras perdas?',24000,'36.000 − 2 × 6.000 = 24.000.','R$'),
    tf('Depreciação mensal exige que saia dinheiro do banco todo mês.',false,'É alocação do custo do ativo; não é um novo pagamento.'),
    mc('A depreciação normalmente começa quando o bem:',['É apenas encomendado','*Está disponível para uso','É totalmente pago'],'A disponibilidade para uso é a referência, não a quitação.'),
    mc('Valor contábil de R$ 24.000 significa que o bem pode ser vendido exatamente por esse valor?',['Sim','*Não'],'Valor contábil e preço de venda são medidas diferentes.')
   ]},
  {courseId:'estoq', id:'oficina-estoq', title:'Inventário: faltou mercadoria', icon:'📋',
   goal:'Conciliar quantidades, apurar diferenças e avaliar perdas de estoque.',
   recap:['Estoque final esperado = inicial + entradas − saídas.','Uma diferença de contagem deve ser investigada antes do ajuste.','Compare custo e valor realizável líquido.'],
   learn:[
    {h:'Conte unidades antes de contar dinheiro', b:'<p>A loja tinha 40 unidades, comprou 20 e vendeu 25. O controle indica 35 unidades. A contagem física encontrou 33.</p>'+eq('40 + 20 − 25 = 35 unidades esperadas')},
    {h:'Investigue as duas unidades', b:'<p>Confira recontagem, documentos, data de corte e saídas não registradas. Confirmada uma perda de 2 unidades, com custo unitário de R$ 12, o ajuste é de R$ 24.</p>'+box('atencao','Não conclua automaticamente que houve furto: erro de contagem ou de registro também pode explicar a diferença.'), check:mc('Qual deve ser a primeira reação à diferença?',['Acusar um funcionário','*Recontar e investigar documentos','Aumentar o lucro'],'A evidência determina a causa e o ajuste apropriado.')},
    {h:'Nem todo estoque recupera seu custo', b:'<p>Um item custou R$ 100. A venda estimada é R$ 95 e os gastos necessários para concluir e vender são R$ 10. Seu valor realizável líquido é R$ 85; a redução do custo é R$ 15.</p>'+eq('VRL = venda estimada − gastos para concluir e vender')},
    {h:'Uma rotina de controle', b:ol(['Defina o corte das movimentações.','Conte e reconte diferenças.','Confronte quantidades e documentos.','Avalie itens danificados ou obsoletos.','Aprove e registre ajustes documentados.'])}
   ], ex:[
    nu('Estoque inicial de 70 unidades, compras de 30 e vendas de 45. Qual o saldo esperado?',55,'70 + 30 − 45 = 55.','unidades'),
    nu('O controle indica 55 unidades e a contagem confirmada tem 52. Qual a falta?',3,'55 − 52 = 3.','unidades'),
    nu('Uma falta confirmada de 3 unidades com custo de R$ 18 cada gera perda de quanto?',54,'3 × 18 = 54. Use custo, não preço de venda.','R$'),
    nu('Custo de R$ 80, venda estimada de R$ 75 e gastos necessários de venda de R$ 5. Qual o VRL?',70,'75 − 5 = 70. Como é menor que o custo, a redução é de R$ 10.','R$'),
    mc('Qual valor deve orientar o estoque do exemplo anterior?',['R$ 80','*R$ 70','R$ 75'],'O menor entre custo (80) e VRL (70).'),
    tf('Qualquer diferença entre contagem e controle comprova furto.',false,'É preciso investigar contagem, corte e documentos antes de concluir a causa.')
   ]},
  {courseId:'demo', id:'oficina-demo', title:'Leia os números e faça perguntas', icon:'📊',
   goal:'Combinar indicadores e prazos para interpretar uma empresa.',
   recap:['Índice isolado não fecha um diagnóstico.','Composição e vencimento importam.','Margens comparam resultado e receita da mesma base.'],
   learn:[
    {h:'O relatório resumido da loja', b:tbl(['Indicador','Valor'],[['Ativo circulante','R$ 18.000'],['Passivo circulante','R$ 12.000'],['Receita líquida','R$ 50.000'],['Lucro líquido','R$ 4.000']])+'<p>Esses dados ajudam a formular perguntas sobre liquidez e rentabilidade.</p>'},
    {h:'Calcule e interprete', b:eq('Liquidez corrente = 18.000 ÷ 12.000 = 1,5')+eq('Margem líquida = 4.000 ÷ 50.000 × 100 = 8%')+'<p>Há R$ 1,50 de ativo circulante por R$ 1 de passivo circulante. A cada R$ 100 de receita líquida, sobraram R$ 8 de lucro.</p>', check:mc('Liquidez corrente de 1,5 garante pagar uma dívida amanhã?',['Sim','*Não'],'O ativo pode incluir estoque ou clientes com vencimento posterior.')},
    {h:'Olhe dentro do total', b:'<p>Dos R$ 18.000 de ativo circulante, R$ 14.000 são estoques. Banco e clientes somam R$ 4.000. Se R$ 8.000 de dívidas vencem amanhã, faltam informações sobre conversão do estoque e recebimentos para avaliar o pagamento.</p>'+box('dica','Não confunda classificação como circulante com disponibilidade imediata.')},
    {h:'Da conta à decisão', b:ol(['Confira o período e a base do indicador.','Compare com períodos anteriores e contexto da atividade.','Investigue prazos e composição dos saldos.','Busque as notas e formule uma pergunta concreta.'])}
   ], ex:[
    nu('Ativo circulante de R$ 24.000 e passivo circulante de R$ 16.000. Qual a liquidez corrente?',1.5,'24.000 ÷ 16.000 = 1,5.','vezes'),
    nu('Lucro líquido de R$ 3.600 e receita líquida de R$ 60.000. Qual a margem líquida?',6,'3.600 ÷ 60.000 × 100 = 6%.','%'),
    mc('Qual informação ajuda a avaliar um pagamento que vence amanhã?',['Só o lucro anual','*Dinheiro disponível e prazos de recebimento','Só o número de funcionários'],'A questão é a disponibilidade no prazo da obrigação.'),
    tf('Uma empresa com lucro pode enfrentar falta de caixa.',true,'Vendas a prazo e estoques podem prender recursos mesmo com resultado positivo.'),
    nu('Receita de R$ 100.000 e margem líquida de 7%. Qual o lucro líquido?',7000,'100.000 × 0,07 = 7.000.','R$'),
    mc('Antes de comparar duas margens, confira:',['A cor do relatório','*Se usam a mesma definição e períodos comparáveis','A ordem alfabética das empresas'],'Bases distintas podem produzir uma comparação enganosa.')
   ]},
  {courseId:'cust', id:'oficina-cust', title:'Pedido extra: vale a pena?', icon:'🧠',
   goal:'Avaliar uma decisão incremental com capacidade, custos e restrições explícitos.',
   recap:['Margem de contribuição = preço menos custos e despesas variáveis.','Avalie os gastos que mudam com a decisão.','Capacidade e efeitos sobre outras vendas importam.'],
   learn:[
    {h:'Um pedido fora da rotina', b:'<p>Uma oficina tem capacidade ociosa. Um cliente oferece R$ 35 por unidade para um pedido de 100 unidades. O gasto variável por unidade é R$ 22. Não haverá custo fixo adicional, tributos extras nem perda de outras vendas neste exemplo.</p>'},
    {h:'Calcule o que muda', b:eq('Contribuição unitária = 35 − 22 = R$ 13')+eq('Contribuição do pedido = 100 × 13 = R$ 1.300')+'<p>Sob essas hipóteses, o pedido aumenta o resultado em R$ 1.300. Isso não significa que R$ 35 deva virar o preço de todos os pedidos.</p>', check:mc('Se o pedido exigir R$ 500 de preparação adicional, o ganho cai para:',['R$ 1.800','*R$ 800','R$ 500'],'1.300 − 500 = 800 de resultado incremental.')},
    {h:'Quando a capacidade está cheia', b:'<p>Se aceitar o pedido impedir outra venda, considere a contribuição perdida. Um pedido que gera R$ 1.300 mas desloca R$ 1.700 de contribuição reduz o resultado em R$ 400.</p>'+box('atencao','Não decida só porque o preço supera o custo variável. Confira capacidade, qualidade, prazo e efeito nos clientes habituais.')},
    {h:'Uma decisão explicável', b:ol(['Liste receitas e gastos que mudam.','Inclua preparação e custos adicionais.','Verifique contribuição sacrificada por falta de capacidade.','Registre as hipóteses antes de recomendar.'])}
   ], ex:[
    nu('Preço de R$ 50 e gasto variável de R$ 32. Qual a contribuição unitária?',18,'50 − 32 = 18.','R$'),
    nu('200 unidades com contribuição unitária de R$ 18. Qual a contribuição total?',3600,'200 × 18 = 3.600.','R$'),
    nu('Pedido contribui com R$ 3.600, mas exige preparação adicional de R$ 900. Qual o ganho incremental?',2700,'3.600 − 900 = 2.700.','R$'),
    tf('Com capacidade cheia, pode ser necessário considerar a margem de outras vendas sacrificadas.',true,'A contribuição perdida é relevante para comparar alternativas.'),
    nu('Um pedido gera R$ 2.000 de contribuição, mas desloca R$ 2.600 de outro. Qual a variação no resultado?',-600,'2.000 − 2.600 = −600.','R$'),
    mc('Qual dado falta para decidir sobre um pedido extra?',['A cor da embalagem apenas','*Capacidade disponível e custos que mudam','O valor do capital social apenas'],'A decisão depende de seus efeitos incrementais e restrições.')
   ]},
  {courseId:'trib', id:'oficina-trib', title:'Conferência de uma apuração', icon:'🧾',
   goal:'Conferir bases e créditos em um modelo didático, sem confundir taxa fictícia com regra legal.',
   recap:['Identifique base, período e regra aplicável antes de calcular.','Crédito depende de elegibilidade e documentação.','O percentual deste caso é fictício.'],
   learn:[
    {h:'Uma simulação, com regra explícita', b:'<p>Neste exercício, um tributo fictício usa alíquota de 10% sobre vendas de R$ 8.000. A regra simulada permite R$ 300 de créditos documentados. Não estamos calculando um tributo real.</p>'+box('atencao','Na prática, verifique a legislação vigente, o regime e a operação. Esta taxa não representa ICMS, IBS, CBS nem outro tributo específico.')},
    {h:'Conferir antes de subtrair', b:eq('Débito da simulação = 8.000 × 10% = 800')+eq('Saldo a recolher = 800 − 300 = 500')+'<p>Base e créditos precisam pertencer ao período e atender às condições da regra informada.</p>', check:mc('Uma compra sem comprovação permite tomar crédito automaticamente?',['Sim, toda compra dá crédito','*Não, é preciso verificar direito e documentação'],'O exemplo só admite créditos elegíveis e documentados.')},
    {h:'A planilha também pode errar', b:'<p>Se uma nota de R$ 1.000 aparecer duas vezes, a base fica superestimada. O cálculo matemático pode estar perfeito e a apuração errada.</p>'+box('dica','Concilie documentos com a base antes de aplicar a taxa; depois confira créditos, pagamentos e saldo.')},
    {h:'Seu checklist de apuração', b:ol(['Identifique período, operação e regra.','Concilie documentos e elimine duplicidades.','Valide base e créditos admitidos.','Recalcule, confira pagamentos e documente diferenças.'])}
   ], ex:[
    nu('Simulação: base de R$ 12.000 e taxa fictícia de 10%. Qual o débito calculado?',1200,'12.000 × 0,10 = 1.200. A taxa é apenas didática.','R$'),
    nu('Na simulação, débito de R$ 1.200 e créditos admitidos de R$ 450. Qual o saldo a recolher?',750,'1.200 − 450 = 750.','R$'),
    mc('Uma nota duplicada na base pode:',['Não alterar nada','*Superestimar o valor apurado','Garantir um crédito'],'A duplicação altera a base, mesmo que a fórmula esteja certa.'),
    tf('A taxa fictícia de 10% deste exercício vale para qualquer empresa real.',false,'A regra real depende do tributo, da operação, do regime e da legislação aplicável.'),
    nu('Uma base informada de R$ 15.000 inclui documento duplicado de R$ 2.000. Qual a base corrigida?',13000,'15.000 − 2.000 = 13.000.','R$'),
    od('Ordene uma conferência de apuração:',['Identificar a regra e o período','Conferir documentos e base','Validar créditos admitidos','Calcular e conciliar o saldo'],'Primeiro confira os dados e a regra; depois faça a conta.')
   ]},
  {courseId:'aud', id:'oficina-aud', title:'Que evidência responde à pergunta?', icon:'🔬',
   goal:'Escolher um procedimento coerente com o risco que se deseja investigar.',
   recap:['Existência e completude fazem perguntas diferentes.','O sentido do teste importa.','Uma divergência exige investigação antes da conclusão.'],
   learn:[
    {h:'Comece pela pergunta', b:'<p>Um estoque consta no relatório. Para investigar se existe, parta do registro e procure o item físico. Para investigar se itens físicos ficaram fora do relatório, parta deles e procure seus registros.</p>'+tbl(['Pergunta','Direção ilustrativa'],[['O registrado existe?','Registro → item físico'],['Tudo foi registrado?','Item físico → registro']])},
    {h:'Risco e procedimento precisam combinar', b:'<p>Somar corretamente o relatório não prova que os produtos existem. Inspecionar os produtos também não resolve, sozinho, se o custo está correto.</p>'+box('exemplo','Preço de compra pode ser confrontado com documentos; existência pode envolver observação da contagem e testes físicos.'), check:mc('Partir dos itens físicos para os registros ajuda a investigar:',['*Completude do registro','Apenas cálculo dos juros'],'Essa direção procura itens existentes que possam ter sido omitidos.')},
    {h:'Evidência não é certeza absoluta', b:'<p>Informações de fontes diferentes podem reforçar ou contradizer uma hipótese. Avalie relevância, confiabilidade e suficiência. Um único documento não responde automaticamente a todas as afirmações.</p>'},
    {h:'Divergência vira investigação', b:ol(['Descreva o risco e a afirmação.','Escolha o procedimento e a amostra adequada.','Registre o que foi encontrado.','Investigue exceções e suas possíveis causas.','Forme uma conclusão compatível com a evidência.'])}
   ], ex:[
    mc('Para investigar existência, uma direção útil é:',['*Do registro para o bem físico','Do bem físico para o registro','Somente do saldo para a calculadora'],'Partir do registrado ajuda a verificar se ele existe.'),
    mc('Para investigar itens omitidos do registro, uma direção útil é:',['Do registro para o item','*Do item físico para o registro','Somente conferir a soma'],'Partir do físico ajuda a avaliar completude.'),
    tf('Um relatório com somas corretas comprova que todos os bens listados existem.',false,'Correção aritmética não comprova existência.'),
    mc('Contagem física correta prova, sozinha, o valor de custo dos produtos?',['Sim','*Não'],'A avaliação requer outros procedimentos e evidências de custo.'),
    mc('Uma divergência foi encontrada. A resposta adequada é:',['Concluir fraude imediatamente','*Investigar a causa e avaliar o efeito','Excluir a amostra'],'Exceções exigem investigação; não determinam a causa por si só.'),
    od('Organize o raciocínio de auditoria:',['Identificar o risco','Planejar o procedimento','Obter e avaliar evidências','Investigar exceções e concluir'],'A conclusão precisa responder ao risco e ser sustentada pela evidência.')
   ]},
  {courseId:'vida', id:'oficina-vida', title:'Um orçamento que enxerga o ano', icon:'🗓️',
   goal:'Incluir despesas anuais e compromissos futuros no orçamento mensal.',
   recap:['Despesas previsíveis anuais precisam entrar no planejamento.','Parcela pequena também ocupa renda futura.','Saldo mensal e patrimônio respondem a perguntas diferentes.'],
   learn:[
    {h:'O mês parecia sobrar', b:'<p>Em um exemplo fictício, a renda mensal é R$ 3.000 e os gastos recorrentes são R$ 2.400. Parece sobrar R$ 600. Mas há despesas anuais previsíveis de R$ 2.400 ainda fora da conta.</p>'},
    {h:'Distribua o que já é previsível', b:eq('Reserva mensal para despesas anuais = 2.400 ÷ 12 = 200')+eq('Folga planejada = 3.000 − 2.400 − 200 = 400')+'<p>Separar R$ 200 por mês evita tratar uma despesa prevista como surpresa. O exemplo supõe um ano completo para acumular esse valor.</p>', check:mc('Se a conta de R$ 2.400 vence em 6 meses e nada foi guardado, separar R$ 200 por mês basta?',['Sim','*Não'],'Seriam apenas R$ 1.200. Para a meta dada, sem rendimentos, seriam necessários R$ 400 por mês.')},
    {h:'Enxergue as parcelas futuras', b:'<p>Uma nova parcela de R$ 150 deixa a folga do exemplo em R$ 250. Antes de assumir, anote quantas parcelas faltam, o custo total e outros compromissos previstos.</p>'+box('dica','Uma despesa anual conhecida é previsível; um imprevisto exige outra margem de segurança. Não conte o mesmo dinheiro duas vezes.')},
    {h:'Revise o plano com os fatos', b:ol(['Liste renda e gastos por data.','Inclua parcelas e despesas anuais.','Compare o previsto com o realizado.','Ajuste o mês seguinte com base nas diferenças.'])}
   ], ex:[
    nu('Despesas anuais previsíveis de R$ 3.600, com 12 meses para guardar e sem rendimentos. Quanto separar por mês?',300,'3.600 ÷ 12 = 300.','R$'),
    nu('Renda de R$ 4.000, gastos recorrentes de R$ 3.100 e reserva mensal de R$ 300 para contas anuais. Qual a folga?',600,'4.000 − 3.100 − 300 = 600.','R$'),
    nu('Uma conta de R$ 1.800 vence em 6 meses. Nada foi guardado. Sem rendimentos, quanto guardar por mês?',300,'1.800 ÷ 6 = 300. O prazo disponível muda a conta.','R$'),
    tf('Uma despesa anual previsível deve ser ignorada até o mês do pagamento.',false,'Planejá-la ao longo dos meses ajuda a evitar falta de caixa na data.'),
    nu('Uma folga de R$ 600 passa a ter uma nova parcela mensal de R$ 180. Quanto resta?',420,'600 − 180 = 420.','R$'),
    mc('Para avaliar uma compra parcelada, olhe:',['Só o valor da primeira parcela','*Custo total, prazo e compromissos futuros','Só o limite disponível'],'A parcela ocupa renda futura e o custo total permite comparar opções.')
   ]},
  {courseId:'imob', id:'oficina-imob-leasing', title:'Leasing no ERP: do contrato aos lançamentos', icon:'🧾',
   goal:'Identificar um arrendamento e acompanhar ativo de direito de uso, passivo, juros, pagamento e depreciação.',
   recap:['No modelo geral do CPC 06 (R2), o arrendatário reconhece ativo de direito de uso e passivo de arrendamento.','O passivo inicial é o valor presente dos pagamentos ainda não realizados.','Depois, separe juros, redução do passivo e depreciação; mantenha o contrato rastreável no sistema.'],
   learn:[
    {h:'Do contrato ao controle do bem', b:'<p>Uma empresa contrata por 24 meses uma van específica, identificada pelo chassi. Ela decide como e para qual finalidade a van será usada durante o período e paga parcelas mensais. Antes de lançar, a equipe lê o contrato e confirma se há um ativo identificado e se a empresa controla o uso durante o prazo em troca de contraprestação.</p>'+box('dica','Digitalizar um contrato, por si só, não o torna arrendamento. O sistema ajuda a organizar dados; o julgamento contábil continua necessário.')},
    {h:'Cadastre os dados que sustentam a conta', b:'<p>No módulo de contratos, registre identificador do bem, início, prazo, pagamentos e datas, opções de renovação ou compra, incentivos e a taxa de desconto aprovada. Guarde o documento e o responsável pela revisão. Neste exemplo didático, são 24 pagamentos de R$ 1.000 no fim de cada mês, taxa de 1% ao mês e nenhuma entrada, incentivo, custo direto inicial ou obrigação de restauração.</p>'+eq('Valor presente = 1.000 × [1 − (1,01)<sup>−24</sup>] ÷ 0,01 = R$ 21.243,39')+'<p>Como simplificação didática, a taxa já foi determinada. Na aplicação, use a taxa implícita se puder ser prontamente determinada; caso contrário, a taxa incremental de empréstimo do arrendatário, conforme os requisitos aplicáveis.</p>', check:mc('Qual é a base do passivo inicial neste exemplo?',['O total nominal de R$ 24.000','*O valor presente dos pagamentos futuros: R$ 21.243,39','A primeira parcela de R$ 1.000'],'O valor presente considera o prazo e a taxa mensal informada.')},
    {h:'Reconhecimento inicial e trilha de auditoria', b:'<p>No início do arrendamento, sob as hipóteses simplificadas do caso:</p>'+lanc([['D','Ativo de direito de uso — veículo','21.243,39'],['C','Passivo de arrendamento','21.243,39']])+'<p>O custo do ativo pode incluir outros componentes, como pagamentos feitos até o início, custos diretos iniciais e estimativas de desmontagem/restauração, além de refletir incentivos. Por isso, não copie esta conta sem revisar o contrato e a política contábil.</p>'+box('atencao','O CPC 06 (R2) permite opções de reconhecimento para arrendamentos de curto prazo (até 12 meses no início, sem opção de compra) e para ativos de baixo valor, se os requisitos e a opção aplicável forem atendidos. Não há um limite monetário universal para baixo valor nesta oficina.')},
    {h:'Feche o primeiro mês sem misturar despesas', b:'<p>Com taxa de 1% sobre o saldo inicial, os juros do primeiro mês são R$ 212,43. Dos R$ 1.000 pagos, R$ 787,57 reduzem o passivo. O saldo após pagamento fica em R$ 20.455,82.</p>'+lanc([['D','Despesa financeira — juros','212,43'],['D','Passivo de arrendamento','787,57'],['C','Banco','1.000,00']])+ '<p>Se não houver transferência da propriedade nem opção de compra razoavelmente certa, o ativo é depreciado pelo prazo do arrendamento ou pela vida útil, o que for menor. Neste exemplo simplificado, a depreciação linear em 24 meses é R$ 885,14 por mês.</p>'+lanc([['D','Despesa de depreciação','885,14'],['C','Depreciação acumulada — direito de uso','885,14']])+'<p>Em cada fechamento, concilie saldo do contrato, extrato bancário, juros e depreciação; registre alterações contratuais com data, documento e aprovação.</p><p class="small">Referências: <a href="https://www.cpc.org.br/CPC/Documentos-Emitidos/Pronunciamentos/Pronunciamento?Id=37" target="_blank" rel="noopener noreferrer">CPC 06 (R2) — Arrendamentos</a> e <a href="https://www.ifrs.org/issued-standards/list-of-standards/ifrs-16-leases/" target="_blank" rel="noopener noreferrer">IFRS 16</a>. Os valores desta oficina são didáticos.</p>'}
   ], ex:[
    mc('O que deve ser verificado antes de cadastrar um contrato como arrendamento?',['Somente se foi assinado digitalmente','*Se existe ativo identificado e a empresa controla o uso no período','Se a parcela cabe no orçamento mensal'],'A análise considera ativo identificado, controle do uso e contraprestação no período.'),
    nu('Qual é o valor presente de 24 parcelas de R$ 1.000 no fim do mês, a 1% ao mês?',21243.39,'1.000 × [1 − (1,01)^−24] ÷ 0,01 ≈ 21.243,39.','R$'),
    mc('No reconhecimento inicial deste caso, o lançamento geral é:',['D Banco / C Receita','*D Ativo de direito de uso / C Passivo de arrendamento','D Despesa de juros / C Banco'],'O ativo e o passivo são reconhecidos no início, conforme o modelo geral e as hipóteses do caso.'),
    nu('Sobre passivo de R$ 21.243,39, com juros mensais de 1%, quanto são os juros aproximados do primeiro mês?',212.43,'21.243,39 × 0,01 ≈ 212,43.','R$'),
    nu('Na parcela de R$ 1.000, se R$ 212,43 são juros, quanto reduz o passivo?',787.57,'1.000 − 212,43 = 787,57.','R$'),
    nu('Ativo de direito de uso de R$ 21.243,39, depreciado linearmente por 24 meses no exemplo. Qual a depreciação mensal?',885.14,'21.243,39 ÷ 24 ≈ 885,14.','R$'),
    tf('Toda parcela de arrendamento deve ser registrada integralmente como despesa de aluguel no mês do pagamento, no modelo geral do arrendatário.',false,'O modelo geral reconhece ativo de direito de uso e passivo; depois há juros, pagamento e depreciação, com exceções previstas.'),
    mc('Que evidência melhora a rastreabilidade do contrato no ERP?',['Somente o valor da parcela','*Contrato, parâmetros, memória de cálculo, responsável e alterações aprovadas','Uma anotação sem data'],'Os dados e documentos permitem revisar a classificação e refazer os saldos.')
   ]}
].map(l => ({...l, optional:true, workshop:true}));

export function enrichCourses(courses){
  courses.forEach(c => {
    c.goals = COURSE_GOALS[c.id];
    const lessons = WORKSHOPS.filter(l => l.courseId === c.id);
    lessons.forEach(lesson => {
      c.units.push({t:'Oficina · ' + lesson.title, lessons:[lesson]});
      c.lessons.push(lesson);
    });
    c.lessons.forEach(l => {
      l.minutes = Math.max(4, Math.ceil(l.learn.length * 0.8 + l.ex.length * 0.55));
    });
  });
  return courses;
}
