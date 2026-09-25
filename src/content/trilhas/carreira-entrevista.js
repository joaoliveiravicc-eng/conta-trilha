/* Área Carreiras · Trilha: Entrevista da vaga de Analista Administrativo Financeiro Jr (Grupo Massa, Curitiba).
   Fontes consultadas em 25/09/2026: anúncio da vaga no portal de vagas do Grupo Massa; site oficial
   grupomassa.com.br; CF/88 art. 7º; CLT art. 71; Lei 7.418/1985 art. 4º; Lei 8.036/1990 art. 15;
   Ajuste SINIEF 07/2005, cláusula décima quarta-A (Confaz). Valores de exemplo são fictícios. */
import { box, eq, tbl, ul, ol, lanc, planilha, download } from '../render-helpers.js';
import { mc, tf, mt, cl, nu, od, ep, en } from '../../engine/exercises/factories.js';

const FONTE = d => '<p class="small muted">Fonte: ' + d + ', consultada em 25/09/2026.</p>';
const g = (rows, mark) => planilha(rows, { mark: mark || [] });
const OCS = [
  ['OC','Compra','Valor','Recebido','Saldo'],
  [4521,'Papel','2.800','1.680','1.120'],
  [4522,'Notebook','9.000','9.000','0'],
  [4523,'Banners','3.500','0','3.500']
];
const CONTRATOS = [
  ['Contrato','Fim','Índice','Aviso'],
  ['Aluguel','31/12/2026','IGP-M','90 dias'],
  ['Limpeza','30/11/2026','IPCA','30 dias'],
  ['Sistema','31/03/2027','IPCA','60 dias']
];

export default [
/* ================= A vaga e a empresa ================= */
{id:"ent1", title:"Lendo a vaga como o recrutador", icon:"🔎",
 goal:"Transformar cada linha da vaga numa pergunta provável e escolher uma história sua para cada uma.",
 recap:["Cada responsabilidade da vaga vira uma pergunta na entrevista.","A vaga repete conferência, controle e confiabilidade: prove essas qualidades com exemplos.","Experiência com notas, compras e contas a pagar cobre a parte mais pesada da vaga."],
 learn:[
  {h:"O que a vaga pede", b:`<p>A vaga de <b>Analista Administrativo Financeiro Jr</b> do Grupo Massa, em Curitiba, lista seis responsabilidades. Cada uma costuma virar uma pergunta:</p>` + tbl(['Na vaga','Pergunta provável'],[
    ['Lançar e conferir notas fiscais','Como você confere uma nota antes de lançar?'],
    ['Acompanhar contratos','Como você controla vencimentos e reajustes?'],
    ['Emitir e controlar ordens de compra','Qual o caminho de uma compra, do pedido ao pagamento?'],
    ['Orçamento realizado x previsto','O realizado passou do previsto. O que você faz?'],
    ['Relatórios e indicadores','Que indicadores você acompanharia? Como garante que os dados estão certos?'],
    ['Excel: PROCV, SOMASES e tabelas dinâmicas','Explique o PROCV. Ou um teste prático.']])},
  {h:"Os requisitos e o seu encaixe", b:ul([
    '<b>Superior cursando</b> em Administração, Contabilidade, Economia, Gestão Financeira ou áreas afins.',
    '<b>Experiência</b> em rotinas administrativas ou financeiras, principalmente com documentos fiscais, controles, contratos, compras ou orçamento.',
    '<b>Noção fiscal e contábil.</b>',
    '<b>Pacote Office</b> intermediário, com <b>Excel avançado</b>: PROCV, SOMASES e tabelas dinâmicas.'])
    + box('dica','Quem já trabalha com notas, compras e contas a pagar tem a parte mais pesada da vaga. O que mais pede treino costuma ser Excel avançado, contratos e orçamento, justamente as outras trilhas desta área.')},
  {h:"As palavras que se repetem", b:`<p>O texto da vaga repete <b>conferência</b>, <b>consistência</b>, <b>controle</b>, <b>acompanhamento</b>, <b>registro adequado</b> e <b>confiabilidade dos dados</b>. A mensagem: procuram alguém cuidadoso e organizado, que segue os processos internos.</p>` + box('exemplo','Em vez de dizer que tem organização, mostre: “mantenho um controle das notas recebidas, com status, e nada vai para pagamento sem pedido e recebimento conferidos”.'),
   check:mc("Qual perfil a vaga mais valoriza?",["*Cuidadoso, organizado e que segue processos","Criativo para campanhas publicitárias","Vendedor com metas agressivas"],"As palavras da vaga giram em torno de conferência, controle e confiabilidade.")},
  {h:"Como o processo costuma ser", b:ul(['<b>Conversa com o RH</b>: trajetória, motivação e comportamento.','<b>Teste prático</b>: Excel ou conhecimentos da área.','<b>Entrevista com o gestor</b>: perguntas técnicas e casos da rotina.']) + box('atencao','Cada empresa monta o seu processo, e nem sempre há as três etapas. Prepare-se para todas.')}
 ],
 ex:[
  mt([["Lançar e conferir notas fiscais","Como você confere uma nota antes de lançar?"],["Controlar ordens de compra","Qual o caminho de uma compra até o pagamento?"],["Orçamento realizado x previsto","O realizado passou do previsto. O que você faz?"],["Acompanhar contratos","Como você controla vencimentos e reajustes?"]],"Cada responsabilidade da vaga vira uma pergunta. Prepare uma resposta com exemplo para cada uma."),
  mc("A vaga fala em “correto direcionamento dos documentos conforme os processos internos”. Na prática, isso é:",["*Mandar cada nota para a empresa, o centro de custo e o aprovador certos","Devolver toda nota ao fornecedor","Arquivar as notas em ordem alfabética","Pagar a nota no mesmo dia em que chega"],"Direcionar é fazer o documento seguir o caminho certo: empresa do grupo, centro de custo e aprovação."),
  cl("Isto está entre as responsabilidades da vaga de Analista Administrativo Financeiro Jr?",["Está na vaga","Não está"],"Conferir notas fiscais:0|Controlar ordens de compra:0|Atualizar relatórios e indicadores:0|Vender espaço publicitário:1|Calcular a folha de pagamento:1|Acompanhar o orçamento:0","A vaga é do administrativo-financeiro: notas, contratos, compras, orçamento, relatórios e Excel."),
  tf("Na vaga de Analista Administrativo Financeiro Jr, “superior cursando” significa que você ainda não precisa ter concluído a faculdade.",true,"A vaga aceita quem está cursando Administração, Contabilidade, Economia, Gestão Financeira ou áreas afins."),
  mc("Quem trabalha com notas e compras, mas usa só o básico do Excel, deve priorizar o que até a entrevista?",["*PROCV, SOMASES e tabela dinâmica, que a vaga cita como requisito","Aprender a programar","Estudar só a história da empresa","Decorar a legislação do ICMS"],"Excel avançado é requisito indispensável e costuma cair em teste prático."),
  od("Ordene a preparação a partir da vaga:",["Ler a vaga linha por linha","Anotar a pergunta provável de cada linha","Escolher uma história sua para cada pergunta","Treinar as respostas em voz alta"],"Da vaga às perguntas, das perguntas às suas histórias, e depois o treino."),
  ep("Em poucas linhas: por que o seu perfil combina com esta vaga?","Trabalho com lançamento e conferência de notas fiscais, compras e contas a pagar, então já comparo nota, pedido e recebimento no dia a dia. Tenho organização com controles e prazos, estou cursando Administração e venho treinando Excel avançado, com PROCV, SOMASES e tabela dinâmica.",[["Experiência com notas fiscais","nota","nf","fiscal"],["Compras ou contas a pagar","compra","pedido","ordem","contas a pagar","pagament","fornecedor"],["Organização e conferência","confer","organiz","control","detalh","atenc","cuidad","prazo"],["Formação ou Excel","curs","faculdade","formac","graduac","excel","planilha","procv"]],"Ligue a sua experiência real às linhas da vaga. É isso que o recrutador procura.")
 ]},
{id:"ent2", title:"O Grupo Massa", icon:"🏢",
 goal:"Falar do Grupo Massa com fatos do site oficial e ligar os valores da empresa ao seu trabalho.",
 recap:["Grupo paranaense de comunicação, idealizado por Carlos Massa, o Ratinho, com mais de 18 anos.","Marcas: Rede Massa | SBT, Massa FM, Massa.com.br, Ponto OH e Instituto Solange Massa.","Valores: paixão pelo que fazemos, integridade, foco nas pessoas, atitude criativa, compromisso com o resultado e união."],
 learn:[
  {h:"Quem é o grupo", b:ul([
    'Nasceu no <b>Paraná</b>, pela visão do empresário e apresentador <b>Carlos Massa, o Ratinho</b>, e tem mais de <b>18 anos</b> de história.',
    'Atua em <b>comunicação</b>, <b>agropecuária</b>, administração de <b>marcas</b> e personagens, <b>programas de TV</b> e administração de <b>imóveis</b>.',
    'Sede na <b>Rua Antônio Parolin Júnior, 355</b>, bairro Parolin, Curitiba.'])
    + FONTE('site oficial do Grupo Massa (grupomassa.com.br)') + box('dica','Releia o site na véspera da entrevista: números e marcas podem mudar.')},
  {h:"As marcas", b:tbl(['Marca','O que é'],[
    ['Rede Massa | SBT','O SBT no Paraná, presente em todo o estado'],
    ['Massa FM','Rede de rádios, com mais de 90 emissoras pelo país'],
    ['Massa.com.br','Portal e redes do Massa Digital'],
    ['Ponto OH','Mídia nos pontos de grande circulação da cidade'],
    ['Instituto Solange Massa','Saúde, educação, empreendedorismo e capacitação'],
    ['Soluções Massa','Canal para quem quer anunciar no grupo']])},
  {h:"Propósito, missão e valores", b:ul([
    '<b>Propósito</b>: levar informação e entretenimento de forma simples a todas as pessoas.',
    '<b>Missão</b>, resumida: engajar e fidelizar o público com comunicação inovadora e resultados que dá para medir, respeitando a identidade regional.',
    '<b>Visão</b>, resumida: aprender sempre, ter foco no resultado e liderar em engajamento e alcance.'])
    + tbl(['Valores'],[['Paixão pelo que fazemos'],['Integridade'],['Foco nas pessoas'],['Atitude criativa'],['Compromisso com o resultado'],['União']])},
  {h:"Como usar isso na entrevista", b:`<p>Não decore frases do site. Mostre que entendeu o negócio e ligue os valores a atitudes do cargo:</p>` + tbl(['Valor','Na rotina do cargo'],[
    ['Integridade','Nenhuma nota vai para pagamento sem conferência e aprovação'],
    ['Compromisso com o resultado','Controles em dia para o fechamento sair no prazo'],
    ['União','Trabalhar junto com compras, jurídico e as áreas que pedem pagamentos'],
    ['Foco nas pessoas','Atender bem o colega que pediu a compra e o fornecedor']])
    + box('exemplo','“Vi que o grupo reúne TV, rádios, portal e mídia nas ruas, além de agro e imóveis. Imagino muitas notas e contratos de naturezas diferentes, e isso me atrai.”')}
 ],
 ex:[
  mc("Onde o Grupo Massa nasceu?",["*No Paraná","Em São Paulo","No Rio de Janeiro","Em Santa Catarina"],"O grupo é paranaense, com sede em Curitiba."),
  mt([["Rede Massa | SBT","O SBT no Paraná"],["Massa FM","Rede com mais de 90 rádios"],["Massa.com.br","Portal e redes do Massa Digital"],["Instituto Solange Massa","Saúde, educação e capacitação"]],"As principais marcas do grupo, segundo o site oficial."),
  cl("Está entre os valores declarados do Grupo Massa?",["É um valor","Não está"],"Integridade:0|União:0|Atitude criativa:0|Compromisso com o resultado:0|Lucro acima de tudo:1|Hierarquia rígida:1","Os seis valores: paixão pelo que fazemos, integridade, foco nas pessoas, atitude criativa, compromisso com o resultado e união."),
  mc("Numa entrevista no Grupo Massa, qual resposta mostra que você pesquisou a empresa?",["*“O grupo reúne TV, rádios, portal e mídia nas ruas, além de agro e imóveis. Imagino muitas notas e contratos diferentes.”","“É a empresa do Ratinho, né?”","“Não pesquisei, mas me adapto rápido.”","“Sempre quis trabalhar na TV.”"],"Relacionar o negócio da empresa ao dia a dia do cargo mostra preparo."),
  tf("Recitar a missão da empresa palavra por palavra é o melhor jeito de mostrar interesse.",false,"Soa decorado. Mostre que entendeu o negócio e ligue os valores a atitudes suas, com exemplos."),
  mc("Segundo o site oficial do Grupo Massa, a Massa FM está presente no país com:",["*Mais de 90 rádios","Uma rádio em Curitiba","Cerca de 10 rádios","Mais de 900 rádios"],"É a rede de rádios do grupo, com mais de 90 emissoras."),
  ep("Escolha um ou dois valores do Grupo Massa e diga como você os pratica na rotina do administrativo-financeiro.","Integridade: nenhuma nota vai para pagamento sem conferir pedido, recebimento e aprovação, mesmo com pressa. Compromisso com o resultado: mantenho o controle de notas em dia para o fechamento sair no prazo. No meu trabalho atual, isso já evitou um pagamento em duplicidade.",[["Cita um valor da empresa","integr","uniao","compromisso","resultado","paixao","foco nas pessoas","criativ"],["Liga a uma atitude da rotina","nota","confer","prazo","fechamento","orcament","contrato","compra","pagament","fornecedor"],["Dá um exemplo concreto","exemplo","quando","evit","reduz","economi","corrig","uma vez"]],"Valor, atitude e exemplo: é assim que os valores deixam de ser frase de efeito.")
 ]},
{id:"ent3", title:"CLT, jornada e benefícios", icon:"📄",
 goal:"Entender o contrato CLT e os benefícios da vaga para conversar sobre a proposta com segurança.",
 recap:["FGTS: a empresa deposita 8% da remuneração todo mês, sem descontar do salário.","Vale-transporte: o desconto é de até 6% do salário básico; a empresa paga o que passar disso.","Das 9h às 18h, com 1 hora de almoço, dá 8 horas por dia e 40 por semana."],
 learn:[
  {h:"O que a CLT garante", b:ul([
    '<b>Carteira assinada</b> e salário mensal.',
    '<b>13º salário</b> e <b>férias</b> anuais pagas com pelo menos <b>1/3 a mais</b>.',
    '<b>FGTS</b>: todo mês, até o dia 20, a empresa deposita <b>8%</b> da remuneração numa conta em seu nome. Não sai do seu salário.',
    '<b>INSS</b>: é descontado do salário, com alíquotas que crescem por faixa.',
    '<b>Jornada</b> de até 8 horas por dia e 44 por semana.'])
    + FONTE('Constituição Federal, art. 7º, e Lei 8.036/1990, art. 15')},
  {h:"A jornada desta vaga", b:`<p>A vaga é de segunda a sexta, das <b>9h às 18h</b>. Pela CLT, quem trabalha mais de 6 horas seguidas tem direito a um intervalo de pelo menos 1 hora.</p>` + eq('9h às 18h = 9 horas − 1 hora de almoço = <b>8 horas por dia</b> × 5 dias = <b>40 horas por semana</b>') + box('dica','Confirme o intervalo na entrevista: “O almoço é de 1 hora?”') + FONTE('CLT, art. 71')},
  {h:"Os benefícios anunciados", b:tbl(['Benefício','O que é'],[
    ['Vale-transporte','A empresa custeia o transporte casa–trabalho. Pode descontar até 6% do seu salário básico.'],
    ['VR e/ou VA','Refeição ou alimentação, no iFood Benefícios'],
    ['TotalPass','Academias e bem-estar'],
    ['Seguro de vida','Proteção financeira para a família'],
    ['Day-off','Folga no dia ou no mês do aniversário'],
    ['Extras','Sorteios de shows e eventos do grupo e cesta de Natal']])
    + box('exemplo','Salário básico de R$ 3.000 e passagens de R$ 264 no mês (valores fictícios): o desconto máximo é 6% × 3.000 = R$ 180, e a empresa paga os R$ 84 restantes.') + FONTE('anúncio da vaga e Lei 7.418/1985, art. 4º')},
  {h:"Pretensão salarial", b:ul([
    'O anúncio não informa o salário. Pesquise a faixa de analista júnior em Curitiba em sites de salários e em vagas parecidas.',
    'Responda com uma <b>faixa de salário bruto mensal</b>, que é o costume ao falar de CLT.',
    'Compare propostas pelo pacote: salário, benefícios, jornada e chance de crescer.'])
    + box('atencao','Não chute. Se perguntarem cedo, dê a faixa que pesquisou e diga que quer conhecer o pacote completo.'),
   check:mc("Ao falar de pretensão numa vaga CLT, o costume é informar:",["*O salário bruto mensal","O salário líquido","O valor por hora","O total do ano com 13º"],"O líquido depende de descontos como INSS e IR. Por isso se fala em bruto.")}
 ],
 ex:[
  nu("Salário básico de R$ 2.800. Qual o desconto máximo de vale-transporte?",168,"6% de 2.800 = 168.","R$"),
  nu("Salário básico de R$ 3.000 e passagens de R$ 264 no mês. Quanto a empresa paga do vale-transporte?",84,"O empregado paga até 6% × 3.000 = 180. A empresa paga 264 − 180 = 84.","R$"),
  nu("Remuneração de R$ 3.200 no mês. Quanto a empresa deposita de FGTS?",256,"8% de 3.200 = 256, depositados pela empresa, sem descontar do salário.","R$"),
  tf("O FGTS de 8% é descontado do salário do empregado.",false,"É um depósito feito pela empresa, além do salário."),
  nu("Das 9h às 18h, com 1 hora de almoço, de segunda a sexta. Quantas horas de trabalho por semana?",40,"8 horas por dia × 5 dias = 40.","horas"),
  cl("No contrato CLT, isto sai do seu salário ou é pago pela empresa?",["Sai do salário","Empresa paga"],"INSS:0|Até 6% do salário básico no vale-transporte:0|Depósito de 8% do FGTS:1|Parte do vale-transporte acima de 6%:1","INSS e a parte do VT até 6% saem do salário. FGTS e o restante do VT são custo da empresa."),
  mc("Pela Constituição, as férias anuais são pagas com um adicional de pelo menos:",["*Um terço do salário","10% do salário","Um salário extra inteiro","Nenhum adicional"],"É o terço constitucional de férias."),
  mc("O recrutador pergunta sua pretensão salarial. A resposta mais profissional é:",["*Uma faixa de salário bruto, baseada em pesquisa, considerando também os benefícios","“Quanto vocês pagam?”","“Qualquer valor serve.”","O valor líquido que você quer receber"],"Faixa pesquisada, em bruto, mostra preparo e deixa espaço para negociar.")
 ]},

/* ================= Sua história ================= */
{id:"ent4", title:"Fale sobre você", icon:"🙋",
 goal:"Montar uma apresentação de 1 a 2 minutos que liga a sua experiência à vaga.",
 recap:["Presente, passado e futuro: o que você faz, como chegou e por que esta vaga.","Cite números da sua rotina: notas por mês, fornecedores, prazos.","Treine em voz alta e cronometre."],
 learn:[
  {h:"A pergunta que abre a entrevista", b:`<p>“Fale um pouco sobre você” não pede a sua história de vida. Pede um <b>resumo profissional</b>, voltado para a vaga, em 1 a 2 minutos. Uma ordem que funciona:</p>` + ol(['<b>Presente</b>: o que você faz hoje e com quais resultados.','<b>Passado</b>: formação e experiências que trouxeram você até aqui.','<b>Futuro</b>: por que esta vaga é o seu próximo passo.']),
   check:mc("Qual ordem funciona bem para se apresentar?",["*Presente, passado e futuro","Infância, escola e família","O currículo inteiro, em ordem de datas"],"Começar pelo presente mostra logo o que você sabe fazer.")},
  {h:"Um exemplo para adaptar", b:box('exemplo','“Hoje trabalho no administrativo-financeiro da [empresa]. Lanço e confiro cerca de [quantidade] notas por mês, acompanho os pedidos de compra e organizo os pagamentos a fornecedores. Estou no [semestre] de [curso] e venho aprofundando o Excel, com PROCV, SOMASES e tabela dinâmica. Quero crescer para uma função com contratos, orçamento e indicadores, e esta vaga reúne exatamente isso.”') + `<p>Troque os colchetes pelos seus dados. Números reais deixam a fala concreta.</p>`},
  {h:"O que evitar", b:ul(['Contar a vida pessoal em detalhes.','Ler o currículo em ordem de datas.','Falar mal do emprego atual ou do chefe.','Passar de 2 minutos.','Frases genéricas, sem nenhum número.']) + box('dica','Grave no celular e cronometre. Se passar de 2 minutos, corte o passado, não o presente.')}
 ],
 ex:[
  od("Ordene a sua apresentação na entrevista:",["O que você faz hoje","Como você chegou até aqui","Por que você quer esta vaga"],"Presente, passado e futuro."),
  mc("Qual é o melhor começo para “fale sobre você”?",["*“Hoje trabalho com lançamento e conferência de notas, compras e contas a pagar.”","“Nasci em Curitiba e tenho dois irmãos.”","“Bom, está tudo no meu currículo.”","“Estou precisando muito desta vaga.”"],"Comece pelo que você faz e que conversa com a vaga."),
  tf("Vale citar números na apresentação, como quantas notas você confere por mês.",true,"Números mostram tamanho e responsabilidade."),
  mc("Quanto tempo deve durar a resposta para “fale sobre você”?",["*De 1 a 2 minutos","Uns 10 segundos","5 minutos ou mais","O tempo que for preciso para contar tudo"],"Curta o bastante para prender a atenção e longa o bastante para mostrar o essencial."),
  cl("Entra na sua apresentação para a vaga?",["Entra","Fica de fora"],"Sua rotina atual com notas e compras:0|O curso que você está fazendo:0|Por que esta vaga te interessa:0|Detalhes da vida pessoal:1|Críticas ao chefe atual:1","Só o que ajuda o entrevistador a ver você na vaga."),
  mc("“Vi que você está empregado. Por que quer sair?” A melhor resposta:",["*Falar do que busca: crescer para contratos, orçamento e indicadores, sem criticar a empresa atual","“Meu chefe é difícil.”","“Lá eu não aprendo nada.”","“É só pelo salário.”"],"Fale do que você quer construir, não do que quer deixar para trás."),
  ep("Escreva a sua apresentação de 1 minuto: presente, passado e futuro.","Hoje trabalho no administrativo-financeiro de uma distribuidora, onde lanço e confiro cerca de 300 notas por mês, acompanho pedidos de compra e organizo os pagamentos. Estou no 5º semestre de Administração. Quero crescer para uma função com contratos, orçamento e indicadores, e esta vaga reúne isso.",[["Presente: o que faz hoje","hoje","atualmente","trabalho","atuo"],["Rotina ligada à vaga","nota","compra","pagar","pagament","fornecedor","pedido","contrato","orcament"],["Formação","curs","facul","gradua","formac","estud","semestre"],["Futuro: por que esta vaga","vaga","cresc","desenvolv","quero","oportunidade","ampliar","proximo passo"]],"Leia em voz alta e cronometre. O ideal é ficar entre 1 e 2 minutos.")
 ]},
{id:"ent5", title:"Histórias no método STAR", icon:"⭐",
 goal:"Contar experiências reais com situação, tarefa, ação e resultado.",
 recap:["STAR: situação, tarefa, ação e resultado.","A ação é a parte mais longa: diga o que você fez.","Tenha 4 ou 5 histórias prontas da sua rotina."],
 learn:[
  {h:"S, T, A, R", b:`<p>Perguntas como “conte uma vez em que…” pedem uma história. O método <b>STAR</b> organiza a resposta:</p>` + tbl(['Parte','Exemplo'],[
    ['<b>S</b>ituação: o contexto','Semana do fechamento, chegou uma nota de manutenção de R$ 12.400.'],
    ['<b>T</b>arefa: o que cabia a você','Eu precisava lançar a nota e liberar o pagamento.'],
    ['<b>A</b>ção: o que você fez','Comparei com o pedido, que era de R$ 10.400, segurei o lançamento e falei com o comprador e o fornecedor.'],
    ['<b>R</b>esultado: o que mudou','O fornecedor emitiu uma nota nova, e a empresa não pagou R$ 2.000 a mais.']])},
  {h:"Seu banco de histórias", b:`<p>Com 4 ou 5 histórias prontas, você responde quase tudo. Tire da sua rotina com notas, compras e contas a pagar:</p>` + tbl(['História','Mostra'],[
    ['Um erro que você encontrou','Atenção a detalhes'],
    ['Um prazo apertado','Organização'],
    ['Uma cobrança ou conflito com fornecedor','Relacionamento'],
    ['Um controle ou planilha que você criou','Iniciativa'],
    ['Um erro seu e como corrigiu','Honestidade e aprendizado']])},
  {h:"Erros comuns", b:ul(['Dizer só “nós”. O entrevistador quer saber o que <b>você</b> fez.','Terminar sem resultado.','Gastar mais tempo na situação do que na ação.','Inventar: as perguntas seguintes desmontam a história.']) + box('atencao','Se nunca viveu a situação, diga que é hipotético e explique como agiria.'),
   check:mc("Qual parte do STAR deve ser a mais detalhada?",["*A ação","A situação","O resultado"],"É na ação que o entrevistador vê como você trabalha.")}
 ],
 ex:[
  cl("No método STAR (situação, tarefa, ação e resultado), qual parte é cada frase?",["S","T","A","R"],"Era semana de fechamento e chegou uma nota de manutenção:0|Eu precisava lançar a nota e liberar o pagamento:1|Comparei a nota com o pedido e com o recebimento:2|A nota foi corrigida e evitamos pagar R$ 2.000 a mais:3","Situação, tarefa, ação e resultado."),
  od("Ordene esta história no método STAR:",["Na semana do fechamento, chegou uma nota de R$ 12.400","Eu precisava lançar a nota e liberar o pagamento","Conferi com o pedido, de R$ 10.400, e acionei o fornecedor","A nota foi corrigida e a empresa não pagou R$ 2.000 a mais"],"Situação, tarefa, ação e resultado."),
  nu("O pedido era de 40 unidades a R$ 35. A nota cobrou 46 unidades ao mesmo preço. Quanto a nota cobrou a mais?",210,"6 unidades a mais × 35 = 210.","R$"),
  mc("Numa entrevista: “Nós organizamos o processo e deu tudo certo.” O que falta nessa resposta?",["*O que você fez e qual foi o resultado concreto","Mais adjetivos","O nome da empresa","A data exata"],"Troque o “nós” pelo que você fez e mostre o resultado, se der, com número."),
  tf("Se você nunca viveu a situação da pergunta, o melhor é inventar uma história convincente.",false,"Diga que é hipotético e explique como agiria. Inventar costuma ser descoberto nas perguntas seguintes."),
  mc("Qual história mostra melhor a sua iniciativa?",["*Você criou uma planilha que avisa as notas perto do vencimento","Você sempre chega no horário","Você nunca faltou","Você fez tudo o que o chefe mandou"],"Iniciativa é melhorar algo sem ninguém pedir."),
  ep("No método STAR, conte uma vez em que você encontrou um erro numa nota, num pedido ou num pagamento.","Situação: no fechamento de março, chegou uma nota de serviço de R$ 8.600. Tarefa: eu precisava lançar e liberar o pagamento. Ação: comparei com o pedido de compra, que era de R$ 6.800, vi que os números estavam invertidos e pedi ao fornecedor uma nota nova. Resultado: a nota foi reemitida e evitamos pagar R$ 1.800 a mais.",[["Situação","quando","fechamento","chegou","situac","mes","semana"],["Sua tarefa","precisava","responsav","tarefa","cabia","minha funcao","tinha que"],["Ação: conferiu e agiu","confer","compar","verifiq","ligu","contat","acion","pedi","solicit"],["Resultado","evit","corrig","resultado","economi","reduz","reemit","a mais"]],"Treine também as outras histórias do seu banco: prazo apertado, fornecedor, iniciativa e um erro seu.")
 ]},
{id:"ent6", title:"Pontos fortes, fracos e motivação", icon:"💪",
 goal:"Responder sobre qualidades, pontos a melhorar e motivação com honestidade e provas.",
 recap:["Ponto forte = qualidade + exemplo.","Ponto a melhorar = algo real + o que você já está fazendo.","Por que esta vaga: o cargo, a empresa e o que você entrega."],
 learn:[
  {h:"Ponto forte: qualidade com prova", b:`<p>Escolha 2 ou 3 qualidades ligadas à vaga e prove cada uma com um fato:</p>` + ul(['<b>Atenção a detalhes</b>: você confere nota, pedido e recebimento antes de lançar.','<b>Organização</b>: você controla vencimentos e nada atrasa.','<b>Responsabilidade com prazo</b>: o fechamento sai no dia.']) + box('exemplo','“Tenho atenção a detalhes. No mês passado, na conferência, achei uma nota emitida para o CNPJ de outra filial e evitei um lançamento errado.”')},
  {h:"Ponto a melhorar: real e em andamento", b:`<p>Escolha algo verdadeiro, que não seja o centro da vaga, e mostre o que você já faz para melhorar.</p>` + box('exemplo','“Eu tinha dificuldade de apresentar números ao gestor. Passei a mandar um resumo curto antes das reuniões, e hoje apresento o fechamento do mês.”') + ul(['Evite “sou perfeccionista”: soa ensaiado.','Evite “não tenho defeitos”.','Evite citar como fraqueza um requisito da vaga, como Excel avançado. Se perguntarem do Excel, fale do que você já faz e do que está aprofundando.'])},
  {h:"Por que esta vaga? Por que aqui?", b:ol(['<b>O cargo</b>: amplia a sua experiência com notas e compras para contratos, orçamento e indicadores.','<b>A empresa</b>: um grupo grande e diverso do Paraná, com comunicação, agro e imóveis.','<b>Você</b>: o que você entrega desde o primeiro dia e o que quer aprender.']) + box('dica','“Onde você se vê em 5 anos?” Mostre ambição compatível com a empresa: graduação concluída, mais experiência e análises maiores, como orçamento e controladoria.')}
 ],
 ex:[
  mc("Numa entrevista para analista, qual é a melhor resposta sobre ponto forte?",["*“Atenção a detalhes: confiro nota, pedido e recebimento antes de lançar, e isso já evitou pagamentos errados.”","“Sou perfeito em tudo o que faço.”","“Sou esforçado.”","“Sou muito ativo nas redes sociais.”"],"Qualidade ligada à vaga e provada com um fato."),
  mc("Numa entrevista, qual é a melhor resposta sobre ponto a melhorar?",["*Algo real, fora do centro da vaga, com o que você já faz para melhorar","“Sou perfeccionista.”","“Não tenho pontos fracos.”","“Sou desorganizado com prazos.”"],"Honestidade com plano de melhoria. Desorganização com prazos derrubaria você nesta vaga."),
  tf("“Sou perfeccionista” é uma boa resposta sobre ponto fraco porque parece uma qualidade.",false,"É o clichê mais conhecido e soa ensaiado."),
  cl("Serve como argumento principal para “por que esta vaga”?",["Bom argumento","Evite"],"Ampliar a experiência para contratos e orçamento:0|Conhecer as marcas e o tamanho do grupo:0|Aprender com uma equipe que atende várias empresas:0|Fica perto da minha casa:1|Qualquer vaga serve:1","Fale do cargo, da empresa e do que você entrega."),
  mc("“Onde você se vê em 5 anos?” A melhor resposta:",["*Com a graduação concluída, mais experiência e assumindo análises maiores, como orçamento e controladoria","“No seu lugar.”","“Não faço ideia.”","“Com um negócio próprio, fora da área.”"],"Ambição compatível com a empresa e com a área."),
  od("Ordene a resposta para “por que esta vaga?”:",["O que o cargo acrescenta à sua experiência","O que atrai você na empresa","O que você entrega desde o começo"],"Cargo, empresa e você."),
  ep("Responda: por que você quer esta vaga no Grupo Massa?","Porque ela amplia o que já faço com notas e compras para contratos, orçamento e indicadores. O grupo é grande e diverso, com comunicação, agro e imóveis, e isso traz uma rotina variada para aprender. Chego com experiência em conferência e controle para contribuir desde o início.",[["O cargo e o que acrescenta","contrato","orcament","indicador","relatori","ampli","cresc","desenvolv","aprend"],["A empresa","grupo","massa","comunicac","empresa","marca","tv","radio","parana"],["O que você entrega","experienc","nota","compra","confer","organiz","contribu","entreg"]],"Cargo, empresa e você, com fatos, sem frases prontas.")
 ]},

/* ================= Técnica: notas, compras e contratos ================= */
{id:"ent7", title:"Notas fiscais na entrevista", icon:"🧾",
 goal:"Explicar como você confere e lança uma nota e o que faz quando ela vem errada.",
 recap:["Confira empresa, fornecedor, itens, valores, condições e validade.","Direcione a nota para a empresa, o centro de custo e o aprovador certos.","Carta de correção não muda valor, quantidade, imposto, quem vende, quem compra nem a data de emissão."],
 learn:[
  {h:"Conferência em 6 pontos", b:ol([
    '<b>Destinatário</b>: o CNPJ é o da empresa certa do grupo?',
    '<b>Emitente</b>: é o fornecedor do pedido, com o cadastro em dia?',
    '<b>Itens</b>: descrição, quantidade e preço batem com a ordem de compra e com o que foi recebido?',
    '<b>Valores e impostos</b>: total, impostos destacados e, nas notas de serviço, as retenções.',
    '<b>Condições</b>: vencimento e forma de pagamento.',
    '<b>Validade</b>: NF-e consultada pela chave de acesso; nota de serviço, no portal onde foi emitida.'])},
  {h:"Direcionamento: cada nota no lugar certo", b:ul(['Empresa do grupo e <b>centro de custo</b> corretos.','<b>Aprovador</b> certo, conforme a alçada.','Natureza da despesa, para a conta contábil certa.','Data de competência: o mês em que o gasto aconteceu.','Pedido e comprovante de recebimento anexados no sistema.']) + box('dica','Na entrevista, cite o seu sistema atual: “no ERP, vinculo a nota à ordem de compra e anexo o recebimento”.')},
  {h:"Quando a nota vem errada", b:tbl(['Erro','Caminho'],[
    ['Valor, quantidade, preço ou imposto','Carta de correção não serve. O fornecedor cancela, se ainda der tempo, e emite outra, ou a nota é recusada ou devolvida.'],
    ['Quem compra ou quem vende','Também não cabe carta de correção: é preciso nova nota.'],
    ['Erro que não muda valor nem as partes, como um endereço digitado errado','Carta de correção eletrônica (CC-e).'],
    ['Nota sem ordem de compra','Não lance: fale com quem pediu e siga o processo interno.']])
    + FONTE('Ajuste SINIEF 07/2005, cláusula décima quarta-A (Confaz)')}
 ],
 ex:[
  od("Ordene a conferência de uma nota fiscal:",["Conferir destinatário e emitente","Comparar itens e valores com a ordem de compra","Confirmar o recebimento","Direcionar ao centro de custo e ao aprovador","Lançar no sistema"],"Primeiro conferir, depois direcionar e lançar."),
  mc("A nota veio com quantidade maior do que a recebida. O que fazer?",["*Não lançar e pedir ao fornecedor nova nota, porque carta de correção não muda quantidade","Emitir carta de correção com a quantidade certa","Lançar e ajustar no mês seguinte","Pagar a quantidade da nota"],"Quantidade mexe no valor e no imposto. A CC-e não pode corrigir isso."),
  tf("A carta de correção eletrônica pode corrigir o valor de uma NF-e.",false,"Valor, base de cálculo, alíquota, quantidade e preço não podem ser corrigidos por CC-e."),
  cl("Na NF-e, dá para corrigir com carta de correção?",["Cabe CC-e","Não cabe"],"Endereço digitado errado:0|Quantidade errada:1|Preço unitário errado:1|Informação complementar faltando:0|Alíquota errada:1|Data de emissão errada:1","A CC-e não corrige o que muda imposto ou valor, as partes da nota nem a data de emissão."),
  nu("Pedido: 40 unidades a R$ 35. Recebidas: 38. Quanto vale o que foi recebido?",1330,"38 × 35 = 1.330.","R$"),
  mt([["Destinatário","CNPJ da empresa certa do grupo"],["Itens","Iguais ao pedido e ao recebido"],["Validade","Chave de acesso consultada"],["Direcionamento","Centro de custo e aprovador certos"]],"Os pontos da conferência de uma nota."),
  ep("Pergunta clássica: como você confere uma nota fiscal antes de lançar?","Confiro se a nota está no CNPJ da empresa certa e se o fornecedor é o do pedido. Comparo itens, quantidades e preços com a ordem de compra e com o recebimento, confiro valores, impostos e retenções e consulto a chave de acesso. Depois direciono para o centro de custo e o aprovador certos e lanço no sistema.",[["Empresa e CNPJ certos","cnpj","destinat","empresa cert","tomador"],["Compara com o pedido","pedido","ordem de compra","cotac"],["Confirma o recebimento","receb","entreg","prestad","medic"],["Valores e impostos","valor","imposto","retenc","tribut","total"],["Direciona e registra","centro de custo","aprov","lanc","sistema","erp","direcion"]],"Fale em sequência, como quem faz isso todo dia. É a pergunta mais provável da entrevista.")
 ]},
{id:"ent8", title:"Compras e ordens de compra", icon:"🛒",
 goal:"Descrever o caminho de uma compra e mostrar como a ordem de compra protege a empresa.",
 recap:["Requisição, cotação, aprovação, ordem de compra, recebimento, conferência e pagamento.","A OC autoriza a compra, compromete o orçamento e é a base para conferir a nota.","Ordem de compra, recebimento e nota precisam bater."],
 learn:[
  {h:"Do pedido ao pagamento", b:ol(['<b>Requisição</b>: a área pede o que precisa.','<b>Cotação</b>: compras busca orçamentos, muitas vezes três, conforme a política.','<b>Aprovação</b> por quem tem alçada para aquele valor.','<b>Ordem de compra</b> emitida e enviada ao fornecedor.','<b>Recebimento</b> do material ou do serviço.','<b>Conferência</b> da nota contra a OC e o recebimento.','<b>Lançamento e pagamento</b> no vencimento.'])},
  {h:"A ordem de compra", b:`<p>A OC traz número, fornecedor, itens, quantidades, preços, condição de pagamento, prazo de entrega, centro de custo e aprovador. Ela:</p>` + ul(['autoriza a compra antes do gasto;','compromete o orçamento do centro de custo;','é a base para conferir a nota.']) + box('exemplo','OC 4521: 100 resmas a R$ 28 = R$ 2.800. Chegaram 60. A OC fica <b>parcialmente atendida</b>, com saldo de 40 resmas (R$ 1.120).')},
  {h:"Conferência em três vias", b:`<p>Ordem de compra, recebimento e nota precisam bater em item, quantidade e preço. Se algo não bater, a nota fica pendente até resolver.</p>` + box('dica','Nota sem OC, de uma compra feita “por fora”, é um alerta: o processo interno manda regularizar antes de pagar.'),
   check:mc("O que precisa bater na conferência em três vias?",["*Ordem de compra, recebimento e nota fiscal","Nota, boleto e extrato","Requisição, cotação e contrato"],"São os três documentos da compra.")},
  {h:"O controle das OCs", b:`<p>Numa planilha ou no ERP, acompanhe o que ainda falta receber:</p>` + g(OCS,['E2']) + ul(['<b>4521</b>: parcialmente atendida.','<b>4522</b>: atendida, sem saldo.','<b>4523</b>: aberta, nada recebido.'])}
 ],
 ex:[
  od("Ordene o caminho de uma compra:",["Requisição","Cotação","Aprovação pela alçada","Ordem de compra","Recebimento","Conferência e pagamento"],"Primeiro se aprova e se formaliza. Depois se recebe, confere e paga."),
  nu("OC de 100 resmas a R$ 28. Chegaram 60. Qual o saldo em aberto da OC, em reais?",1120,"Faltam 40 resmas × 28 = 1.120.","R$"),
  mc("Uma OC de 100 resmas recebeu 60. Qual o status dela?",["*Parcialmente atendida","Encerrada","Cancelada","Aguardando aprovação"],"Ainda há saldo a receber."),
  nu("Qual o saldo total das ordens de compra em aberto?" + g(OCS),4620,"1.120 + 0 + 3.500 = 4.620.","R$"),
  mc("Um gestor pede para pagar uma nota de serviço que não tem ordem de compra. O que fazer?",["*Explicar o processo e pedir a regularização, com aprovação pela alçada, antes de programar o pagamento","Pagar, já que o gestor pediu","Recusar sem explicar","Criar a OC com data antiga, sem aprovação"],"O processo protege a empresa e o próprio gestor."),
  mt([["Requisição","Pedido interno da área"],["Cotação","Comparação de preços entre fornecedores"],["Alçada","Limite de valor que cada gestor pode aprovar"],["Ordem de compra","Documento que formaliza a compra com o fornecedor"]],"O vocabulário de compras."),
  tf("A ordem de compra deve ser emitida só depois de a nota fiscal chegar.",false,"A OC vem antes: ela autoriza a compra."),
  ep("Explique ao entrevistador por que a ordem de compra é importante.","Porque ela formaliza e autoriza a compra antes do gasto, com aprovação de quem tem alçada. Também compromete o orçamento do centro de custo e é a base para conferir se a nota e o recebimento estão certos antes de pagar.",[["Formaliza e autoriza","formaliz","autoriz","aprov","alcad","document"],["Controla o orçamento","orcament","comprometid","gasto","custo","centro de custo"],["Base para conferir","confer","nota","receb","compar","bater"]],"Três ideias: autoriza, controla o orçamento e serve de base para a conferência.")
 ]},
{id:"ent9", title:"Contratos sob controle", icon:"📑",
 goal:"Mostrar como você acompanha contratos: vigência, valores, reajustes e renovações.",
 recap:["Controle vigência, valor, índice de reajuste, aviso prévio e responsável.","Fatura diferente do contrato só se paga com reajuste previsto ou aditivo.","Avise antes do prazo: o aviso prévio decide se o contrato renova."],
 learn:[
  {h:"O que olhar num contrato", b:ul(['Partes, objeto e valor.','<b>Vigência</b>: início e fim.','<b>Reajuste</b>: índice (IPCA, IGP-M…) e data-base.','<b>Renovação</b>: automática ou não, e o <b>aviso prévio</b> para rescindir.','Multas e nível de serviço combinado.','Responsável interno pelo contrato.']) + box('dica','O jurídico cuida da redação. O analista controla prazos e confere se o que é cobrado bate com o contrato.')},
  {h:"A planilha de controle", b:g(CONTRATOS) + `<p>Uma coluna calculada “Avisar até” (fim menos o aviso) e uma formatação condicional que pinta os contratos a menos de 60 dias do prazo evitam renovações sem querer.</p>`},
  {h:"Reajuste, aditivo e medição", b:ul(['<b>Reajuste</b>: aplica o índice acumulado do período sobre o valor.','<b>Aditivo</b>: documento que muda prazo, valor ou escopo. Sem aditivo, não se paga valor diferente do contrato.','<b>Medição</b>: em serviços por demanda, a fatura segue a medição aprovada pela área.']) + box('exemplo','Contrato de R$ 5.000 por mês e índice acumulado de 4,5% em 12 meses (fictício): 5.000 × 1,045 = R$ 5.225.')}
 ],
 ex:[
  nu("Contrato de R$ 5.000 por mês, reajustado por um índice acumulado de 4,5%. Qual o novo valor?",5225,"5.000 × 1,045 = 5.225.","R$"),
  mc("Um contrato termina em 30/11/2026 e pede aviso de 30 dias para não renovar. Até quando avisar?",["*31/10/2026","30/11/2026","30/12/2026","01/12/2026"],"30 dias antes de 30/11 é 31/10."),
  tf("Se o fornecedor faturou mais do que o contrato prevê, o analista paga e avisa depois.",false,"Primeiro confere: há reajuste previsto ou aditivo? Sem isso, a fatura volta para correção."),
  mc("A empresa de limpeza mandou a fatura 8% maior, dizendo que é reajuste. O que conferir?",["*Se o contrato prevê reajuste, com qual índice e data-base, e se 8% bate com o índice acumulado","Nada: reajuste é automático","Só se o e-mail veio do fornecedor certo","Se a limpeza foi bem feita"],"O reajuste segue o que está no contrato."),
  mt([["Vigência","Período de validade do contrato"],["Reajuste","Atualização do valor por um índice"],["Aditivo","Documento que altera o contrato"],["Aviso prévio","Antecedência para não renovar ou rescindir"]],"Os termos que mais aparecem nos contratos."),
  cl("Vale uma coluna na planilha de controle de contratos?",["Sim","Não precisa"],"Data de fim da vigência:0|Índice e data do reajuste:0|Prazo de aviso para rescindir:0|Valor mensal:0|Texto inteiro do contrato digitado:1","Na planilha, só o que controla prazos e valores. O contrato fica no arquivo, com um link."),
  ep("Como você controlaria os contratos da área?","Manteria uma planilha ou o cadastro no sistema com cada contrato: vigência, valor, índice e data do reajuste, aviso prévio e responsável. Colocaria um alerta para os que vencem em 60 dias e conferiria cada fatura com o contrato antes de pagar.",[["Planilha ou sistema","planilha","control","sistema","cadastr","lista"],["Vigência e vencimentos","vigenc","venc","prazo","fim","renov"],["Reajuste e valores","reajust","indice","valor","ipca","igp"],["Alerta ou ação antecipada","alert","aviso","anteced","lembret","formatac","condicional","avis"]],"Mostre controle e antecedência: é o que “manter controles atualizados” quer dizer.")
 ]},

/* ================= Técnica: orçamento, indicadores e fiscal ================= */
{id:"ent10", title:"Previsto x realizado", icon:"📊",
 goal:"Explicar uma variação de orçamento com número, causa e proposta.",
 recap:["Variação = realizado − previsto; % = variação ÷ previsto.","Nem todo estouro é gasto a mais: pode ser erro de mês ou de centro de custo.","Leve ao gestor: quanto, onde, por quê e o que propõe."],
 learn:[
  {h:"A pergunta do gestor", b:`<p>“Por que estourou?” Responda em quatro passos:</p>` + ol(['<b>Quanto</b>: variação em R$ e em %.','<b>Onde</b>: qual conta, fornecedor ou nota.','<b>Por quê</b>: a causa.','<b>E agora</b>: é pontual ou vai continuar? O que você propõe?']) + eq('Variação = Realizado − Previsto &nbsp;·&nbsp; % = Variação ÷ Previsto')},
  {h:"Causas típicas", b:tbl(['Causa','Exemplo'],[['Preço','O fornecedor reajustou'],['Volume','A área comprou mais'],['Mês errado','Nota de maio lançada em abril'],['Centro errado','Nota do Comercial lançada no Administrativo'],['Imprevisto','Conserto urgente']]) + box('atencao','Mês errado e centro errado não são gasto a mais: são erro de registro. Confira antes de alarmar.')},
  {h:"Uma resposta-modelo", b:box('exemplo','“Manutenção fechou abril com R$ 58.000 contra R$ 50.000 previstos: R$ 8.000 acima, 16%. Abrindo por fornecedor, R$ 6.000 são um conserto urgente do gerador, que não estava previsto, e R$ 2.000 são uma nota de maio lançada em abril. Proponho reclassificar a nota e rever a previsão de manutenção.”')}
 ],
 ex:[
  nu("Previsto de R$ 50.000 e realizado de R$ 58.000. Qual a variação?",8000,"58.000 − 50.000 = 8.000.","R$"),
  nu("Previsto de R$ 50.000 e realizado de R$ 58.000. Qual a variação em %?",16,"8.000 ÷ 50.000 = 16%.","%"),
  cl("O orçamento estourou. É gasto a mais de verdade ou erro de registro?",["Gasto a mais","Erro de registro"],"O fornecedor aumentou o preço:0|A área comprou o dobro:0|Nota de maio lançada em abril:1|Nota do Comercial lançada no Administrativo:1|Conserto urgente não previsto:0","Erros de mês e de centro de custo se corrigem com reclassificação."),
  mc("Numa despesa, realizado abaixo do previsto é:",["*Favorável, mas vale ver se foi economia ou só atraso","Sempre desfavorável","Sinal de erro no orçamento","Irrelevante"],"Um gasto que só atrasou vai aparecer no mês seguinte."),
  mc("Numa receita, realizado abaixo do previsto é:",["*Desfavorável","Favorável","Neutro"],"Entrou menos do que o planejado."),
  od("Ordene a análise de um estouro de orçamento:",["Calcular a variação em R$ e em %","Abrir por conta e fornecedor","Encontrar a causa","Propor uma ação ao gestor"],"Quanto, onde, por quê e o que fazer."),
  ep("O gestor pergunta por que um centro de custo estourou o orçamento. Como você responde?","Primeiro calculo a variação em reais e em percentual. Depois abro os lançamentos por fornecedor e por nota para achar a causa: preço, volume, imprevisto ou erro de mês ou de centro de custo. Levo ao gestor a explicação e uma proposta, como reclassificar a nota errada ou rever a previsão.",[["Quantifica a variação","variac","percent","acima","diferenc","reais"],["Abre o detalhe","abr","detalh","fornecedor","conta","lancament","nota"],["Aponta a causa","causa","motivo","porque","por que","preco","volume","reajust","imprevist","urgent","erro"],["Propõe uma ação","propon","propost","sugir","reclassific","previsao","forecast","revis","acao","plano"]],"Número, causa e proposta: é o que o gestor quer ouvir.")
 ]},
{id:"ent11", title:"Relatórios e indicadores", icon:"📈",
 goal:"Citar indicadores do administrativo-financeiro e mostrar como garantir dados confiáveis.",
 recap:["Indicadores: execução do orçamento, notas no prazo, divergências, OCs em aberto, contratos a vencer e saving.","Dado confiável: base única, data de corte, total que bate com o sistema e fórmulas.","Relatório bom cabe numa página e destaca o que pede decisão."],
 learn:[
  {h:"Indicadores da área", b:tbl(['Indicador','Como calcular'],[
    ['Execução do orçamento','Realizado ÷ Previsto'],
    ['Notas lançadas no prazo','Notas no prazo ÷ Total de notas'],
    ['Notas com divergência','Notas com problema ÷ Notas conferidas'],
    ['OCs em aberto','Quantidade e saldo das OCs não atendidas'],
    ['Contratos a vencer','Contratos que vencem nos próximos 60 dias'],
    ['Saving','(Preço inicial − Preço negociado) ÷ Preço inicial']])},
  {h:"Dados confiáveis", b:`<p>A vaga pede “organização e confiabilidade dos dados”. Na prática:</p>` + ul(['Uma <b>base única</b>, sem várias versões do mesmo arquivo.','Uma <b>data de corte</b> igual para todos os números.','O total do relatório <b>bate com o sistema</b>.','<b>Fórmulas</b> ligadas à base, em vez de números digitados.','Fonte e data de atualização escritas no relatório.']),
   check:mc("Qual é a conferência mais simples antes de enviar um relatório?",["*Ver se o total bate com o sistema","Mudar as cores","Aumentar a fonte"],"Se o total não bate, algo ficou de fora ou entrou duas vezes.")},
  {h:"O relatório que o gestor lê", b:ul(['Cabe em <b>uma página</b>.','Os números principais vêm no topo.','Compara com o previsto ou com o mês anterior.','Destaca o que pede decisão, com um comentário curto.']) + box('exemplo','“Execução do orçamento em abril: 96%. Destaque: Manutenção ficou 16% acima por um conserto urgente.”')}
 ],
 ex:[
  nu("Realizado de R$ 96.000 e previsto de R$ 100.000. Qual a execução do orçamento?",96,"96.000 ÷ 100.000 = 96%.","%"),
  nu("De 240 notas conferidas no mês, 18 tinham divergência. Qual o percentual?",7.5,"18 ÷ 240 = 7,5%.","%"),
  nu("A primeira cotação foi de R$ 12.000 e a compra saiu por R$ 10.800. Qual o saving em %?",10,"Economia de 1.200. 1.200 ÷ 12.000 = 10%.","%"),
  tf("Digitar os números à mão no relatório, em vez de usar fórmulas ligadas à base, deixa o relatório mais confiável.",false,"Número digitado não se atualiza e esconde erros. Fórmula ligada à base é rastreável."),
  mc("Dois relatórios do mesmo mês mostram totais diferentes. A causa mais provável é:",["*Datas de corte ou bases diferentes","O Excel errou a conta","Um gráfico diferente","A fonte da letra"],"Por isso se define uma base única e uma data de corte."),
  mt([["Execução do orçamento","Quanto do previsto já foi gasto"],["Notas com divergência","Qualidade das notas recebidas"],["Saving","Economia obtida nas compras"],["Contratos a vencer","Renovações que pedem decisão"]],"Cada indicador responde a uma pergunta do gestor."),
  ep("Que indicadores você acompanharia nesta vaga, e por quê?","Acompanharia a execução do orçamento por centro de custo, o percentual de notas lançadas no prazo e com divergência, as ordens de compra em aberto e os contratos a vencer em 60 dias. Eles mostram ao gestor onde agir antes que vire problema.",[["Orçamento","orcament","previsto","realizado","execuc"],["Notas e prazos","nota","prazo","lancad","diverg","atras"],["Compras e contratos","compra","ordem","contrato","saving","fornecedor"],["Por que acompanhar","decis","control","gestor","acompanh","agir","ident","alert","problema"]],"Cite 3 ou 4 indicadores e diga para que servem.")
 ]},
{id:"ent12", title:"Noção fiscal e contábil", icon:"🧮",
 goal:"Responder às perguntas de noção fiscal e contábil que a vaga pede, sem se enrolar.",
 recap:["Nota de mercadoria: ICMS, IPI quando houver, PIS e COFINS. Nota de serviço: ISS e possíveis retenções.","Retenção: quem paga desconta o tributo e recolhe em nome do prestador.","A nota vira lançamento: débito na despesa, no estoque ou no imobilizado e crédito em fornecedores."],
 learn:[
  {h:"Tributos que aparecem nas notas", b:tbl(['Nota de…','Tributos comuns'],[['Mercadoria','ICMS, IPI (quando há industrialização), PIS e COFINS'],['Serviço','ISS, que é municipal, e, conforme o serviço, retenções de IR, PIS, COFINS, CSLL e INSS']]) + box('atencao','A Reforma Tributária (LC 214/2025) cria a CBS e o IBS, que vão substituir PIS, COFINS, ICMS e ISS, numa transição que começa em 2026. Por isso as notas estão ganhando campos novos.')},
  {h:"Retenção em uma frase", b:`<p>Na retenção, <b>quem paga</b> o serviço desconta parte do valor e <b>recolhe o tributo</b> ao governo em nome de quem prestou. O fornecedor recebe o valor líquido.</p>` + box('exemplo','Nota de serviço de R$ 10.000 com R$ 465 de retenções federais e R$ 200 de ISS retido (valores de exemplo): o fornecedor recebe R$ 9.335, e a empresa recolhe R$ 665 aos governos.')},
  {h:"A nota vira lançamento", b:`<p>Serviço de limpeza de R$ 4.000, prestado em março, com vencimento em abril:</p>` + lanc([['D','Despesa com limpeza','4.000'],['C','Fornecedores','4.000']]) + `<p>No pagamento, em abril:</p>` + lanc([['D','Fornecedores','4.000'],['C','Bancos','4.000']]) + box('regra','A despesa é de março, quando o serviço aconteceu, mesmo que o pagamento seja em abril. É o regime de competência.')},
  {h:"Despesa, estoque ou imobilizado?", b:tbl(['A compra','Vai para'],[['Material de limpeza, energia, serviços','Despesa'],['Mercadoria para revender','Estoque'],['Bem durável para usar por anos, como um notebook ou um veículo','Imobilizado']])}
 ],
 ex:[
  nu("Nota de serviço de R$ 10.000 com R$ 465 de retenções federais e R$ 200 de ISS retido. Quanto o fornecedor recebe?",9335,"10.000 − 465 − 200 = 9.335.","R$"),
  mc("Na retenção de tributos de uma nota de serviço, quem recolhe o valor retido ao governo?",["*A empresa que paga o serviço, em nome de quem prestou","O fornecedor, depois de receber","O banco, automaticamente","Ninguém: o valor fica com a empresa"],"O tomador desconta e recolhe. Por isso ele responde pelo recolhimento."),
  en("Chegou a nota do serviço de limpeza de março, R$ 4.000, a pagar em abril. Qual o lançamento?","Despesa com limpeza","Fornecedores",["Bancos","Receita de serviços","Tributos a recolher"],"A despesa entra na competência, e a dívida com o fornecedor fica em aberto até o pagamento."),
  mc("O serviço foi prestado em março e pago em abril. A despesa é de:",["*Março","Abril","Metade em cada mês"],"Competência: vale o mês em que o serviço aconteceu."),
  cl("A compra vai para despesa, estoque ou imobilizado?",["Despesa","Estoque","Imobilizado"],"Material de limpeza do escritório:0|Mercadoria comprada para revender:1|Notebook para a equipe usar por anos:2|Conta de energia:0|Veículo da empresa:2","Consumo vira despesa, revenda vira estoque e bem durável de uso vira imobilizado."),
  tf("O ISS é um tributo municipal sobre serviços.",true,"Por isso as regras de retenção dependem da lei de cada município."),
  ep("Explique, em palavras simples, o que é retenção de impostos numa nota de serviço.","É quando a empresa que contrata o serviço desconta do pagamento uma parte dos tributos e recolhe ao governo em nome do prestador. O fornecedor recebe o valor líquido, e a empresa fica responsável por pagar a guia no prazo.",[["Quem paga desconta","descont","retem","retid","segur","abat","deduz"],["Recolhe em nome do prestador","recolh","governo","fisco","guia","prefeitura","receita","em nome"],["Fornecedor recebe o líquido","liquid","recebe menos","valor menor","restante"]],"Retenção é comum em notas de serviço. Saber explicar mostra a noção fiscal que a vaga pede.")
 ]},

/* ================= Reta final ================= */
{id:"ent13", title:"Perguntas para o entrevistador", icon:"❓",
 goal:"Fechar a entrevista com perguntas que mostram interesse e ajudam você a decidir.",
 recap:["Prepare três perguntas e faça uma ou duas.","Pergunte sobre rotina, sistemas, equipe e expectativas.","Feche agradecendo, reforçando o interesse e perguntando os próximos passos."],
 learn:[
  {h:"Por que perguntar", b:`<p>“Você tem alguma pergunta?” também avalia você: mostra interesse e preparo. E ajuda a descobrir se a vaga combina com o que você quer.</p>` + box('dica','Prepare três perguntas. Alguma pode ser respondida durante a conversa.')},
  {h:"Boas perguntas para esta vaga", b:ul(['Quais empresas do grupo o analista vai atender?','Qual sistema vocês usam para notas, compras e contratos?','Como é o fechamento do mês? Quais dias são mais puxados?','O orçamento é acompanhado por centro de custo, em planilha ou no sistema?','O que seria uma boa entrega nos primeiros 90 dias?','Como é a equipe, e a quem o cargo responde?'])},
  {h:"O que guardar e como fechar", b:ul(['Deixe salário e benefícios para quando o RH abordar, ou para a etapa com o RH.','Não pergunte o que a empresa faz: isso você pesquisou.','Evite perguntas sobre faltas e atrasos logo de cara.']) + `<p>Para fechar: agradeça, reforce o interesse em uma frase e pergunte quais são os próximos passos.</p>`}
 ],
 ex:[
  cl("Boa pergunta para o fim da entrevista?",["Boa","Evite"],"Quais empresas do grupo o analista atende?:0|Qual sistema vocês usam para notas e compras?:0|O que seria uma boa entrega em 90 dias?:0|O que o Grupo Massa faz?:1|Posso sair mais cedo às sextas?:1|Quantas faltas posso ter?:1","Pergunte sobre o trabalho, não sobre como trabalhar menos."),
  mc("O entrevistador pergunta: “Você tem alguma pergunta?” A melhor atitude:",["*Fazer uma ou duas perguntas preparadas sobre a rotina da área","Dizer “não, está tudo claro”","Perguntar primeiro o salário","Perguntar o que a empresa faz"],"Mostra interesse e preparo."),
  od("Ordene o fim da entrevista:",["Fazer suas perguntas","Agradecer pela conversa","Reforçar o interesse na vaga","Perguntar os próximos passos"],"Pergunta, agradecimento, interesse e próximos passos."),
  tf("Perguntar quais são os próximos passos do processo é adequado no fim da entrevista.",true,"Mostra interesse e ajuda você a se organizar."),
  mc("Qual pergunta ao entrevistador ajuda a entender a rotina real do cargo?",["*“Como é o fechamento do mês e quais dias são mais puxados?”","“Tem estacionamento?”","“Posso trabalhar de casa?”","“Quando são as férias coletivas?”"],"A rotina de fechamento diz muito sobre o dia a dia da função."),
  ep("Escreva duas perguntas que você faria no fim desta entrevista.","Quais empresas do grupo o analista vai atender e qual sistema vocês usam para notas e compras? E o que seria uma boa entrega nos primeiros 90 dias?",[["Rotina ou empresas atendidas","rotina","empresa","grupo","fechamento","dia a dia","atend"],["Sistemas ou ferramentas","sistema","erp","ferrament","planilha","excel","sap","totvs"],["Expectativas ou equipe","expect","90 dias","primeiros","equipe","time","gestor","entrega","desafi","indicador"]],"Perguntas sobre rotina, ferramentas e expectativas mostram que você já se imagina no cargo.")
 ]},
{id:"ent14", title:"O dia da entrevista", icon:"📅",
 goal:"Chegar com tudo pronto: local, horário, material e postura, presencial ou online.",
 recap:["Confirme data, horário, formato e endereço; chegue de 10 a 15 minutos antes.","Leve documento, currículo impresso, caderno e caneta.","Depois, mande um agradecimento curto."],
 learn:[
  {h:"Na véspera", b:ol(['Confirme data, horário, formato (presencial ou online) e o nome de quem vai entrevistar você.','Se for presencial: o anúncio indica a <b>Rua Antônio Parolin Júnior, 355</b>, no Parolin, em Curitiba. Confirme o endereço no convite e planeje chegar de 10 a 15 minutos antes.','Releia a vaga, suas histórias STAR e as perguntas técnicas.','Separe documento com foto, currículo impresso, caderno e caneta.','Durma bem.'])},
  {h:"Se for online", b:ul(['Teste câmera, microfone e internet com antecedência.','Fundo neutro, luz de frente e celular no silencioso.','Deixe a vaga e suas anotações por perto, sem ler as respostas.','Ao responder, olhe para a câmera.'])},
  {h:"Durante a conversa", b:ul(['Roupa arrumada e confortável: num escritório administrativo, camisa ou blusa e calça social costumam funcionar.','Ouça a pergunta inteira e pense um instante antes de responder.','Respostas de 1 a 2 minutos.','Se não souber, diga o que sabe e como descobriria o resto.']) + box('dica','Se houver teste de Excel, leia todo o enunciado antes de começar. Treine com a planilha:') + download('/carreira/treino-excel-analista.xlsx','Baixar a planilha de treino (.xlsx)')},
  {h:"Depois", b:ul(['Mande uma mensagem curta de agradecimento a quem conduziu o processo, pelo canal que usaram com você.','Anote as perguntas que fizeram: servem para a próxima etapa.','Se o prazo de retorno passar, pergunte com educação.'])}
 ],
 ex:[
  mc("A entrevista presencial é às 10h. Que horas chegar?",["*Entre 9h45 e 9h50","Às 10h em ponto","Às 9h","Às 10h10"],"De 10 a 15 minutos antes: tempo para se anunciar sem esperar demais."),
  od("Ordene a preparação para a entrevista:",["Confirmar horário e endereço","Revisar a vaga e suas histórias","Chegar de 10 a 15 minutos antes","Mandar um agradecimento depois"],"Confirmar, revisar, chegar cedo e agradecer."),
  tf("Se não souber responder a uma pergunta técnica na entrevista, o melhor é inventar com confiança.",false,"Diga o que sabe e como descobriria o resto. Inventar tira a sua credibilidade."),
  mc("Na entrevista online, para onde olhar ao responder?",["*Para a câmera","Para a sua própria imagem","Para as anotações o tempo todo","Para o teclado"],"Olhar para a câmera passa a sensação de olho no olho."),
  cl("Levar para a entrevista presencial?",["Levar","Não precisa"],"Documento com foto:0|Currículo impresso:0|Caderno e caneta:0|Todos os diplomas originais:1|Um lanche para comer na sala:1","O essencial cabe numa pasta."),
  mc("Na entrevista, perguntam sobre uma regra de imposto que você não conhece. Como agir?",["*Dizer o que sabe, admitir o que não sabe e explicar onde buscaria a resposta","Mudar de assunto","Dizer que isso não é importante","Responder qualquer coisa com segurança"],"Honestidade e saber pesquisar valem mais do que decorar tudo."),
  ep("Escreva a mensagem de agradecimento que você mandaria depois da entrevista.","Olá, Ana! Agradeço a conversa de hoje sobre a vaga de Analista Administrativo Financeiro Jr. Gostei de conhecer a rotina da área, e meu interesse pela oportunidade só aumentou. Fico à disposição para os próximos passos.",[["Agradece","agradec","obrigad"],["Reforça o interesse","interess","vaga","conversa","gostei","anim","entusias","oportunidade"],["Coloca-se à disposição","disposic","disponivel","contato","aguardo","proximos passos"]],"Curta, educada e no mesmo dia.")
 ]},
{id:"ent15", title:"Simulado final da entrevista", icon:"🏁",
 goal:"Responder a uma entrevista completa, com perguntas de RH, técnicas e sobre a empresa.",
 recap:["Treine as respostas abertas em voz alta, cronometrando.","Revise o que errou: cada erro volta na revisão.","Na véspera, repasse o checklist final."],
 learn:[
  {h:"Como funciona", b:`<p>Oito perguntas no estilo da entrevista, misturando RH, técnica e empresa. Nas respostas abertas, escreva como você falaria.</p>` + box('dica','Depois, leia suas respostas em voz alta. Melhor ainda: peça a alguém para fazer o papel do entrevistador.')},
  {h:"Checklist final", b:ul(['Apresentação de 1 a 2 minutos.','4 ou 5 histórias STAR.','Conferência de nota em 6 pontos.','Caminho da compra e papel da OC.','Controle de contratos.','Variação de orçamento com causa e proposta.','PROCV, SOMASES e tabela dinâmica explicados em palavras.','Duas perguntas para o final.'])}
 ],
 ex:[
  ep("Entrevistador: “Fale um pouco sobre você.”","Hoje trabalho no administrativo-financeiro, lançando e conferindo notas, acompanhando compras e organizando pagamentos. Estou cursando Administração e aprofundando o Excel. Quero crescer para contratos, orçamento e indicadores, e esta vaga reúne isso.",[["O que faz hoje","hoje","atualmente","trabalho","atuo"],["Rotina ligada à vaga","nota","compra","pagament","fornecedor","contrato","orcament"],["Formação ou objetivo","curs","facul","formac","vaga","cresc","quero"]],"Presente, passado e futuro."),
  mc("A nota chegou com preço unitário diferente da ordem de compra. O que fazer?",["*Segurar o lançamento, confirmar com compras o preço combinado e pedir nova nota se o erro for do fornecedor","Lançar pelo preço da nota","Mandar carta de correção com o preço certo","Pagar e descontar na próxima compra"],"Preço mexe no valor: não cabe carta de correção."),
  nu("Numa despesa, previsto de R$ 20.000 e realizado de R$ 23.000. Qual a variação em %?",15,"3.000 ÷ 20.000 = 15%, desfavorável.","%"),
  ep("Entrevistador: “Explique o que a SOMASES faz, com um exemplo da rotina.”","A SOMASES soma uma coluna de valores só nas linhas que atendem a várias condições. Por exemplo, somar as notas em aberto do centro de custo de TI no mês de março.",[["Soma valores","soma","somar"],["Com mais de uma condição","criterio","condic","mais de um","varias","varios","atend"],["Exemplo da rotina","centro de custo","fornecedor","mes","status","aberta","nota"]],"Soma, condições e exemplo."),
  mc("Qual destes NÃO é um valor declarado do Grupo Massa?",["Integridade","União","Foco nas pessoas","*Lucro acima de tudo"],"Os valores são paixão pelo que fazemos, integridade, foco nas pessoas, atitude criativa, compromisso com o resultado e união."),
  nu("Salário básico de R$ 3.500. Qual o desconto máximo de vale-transporte?",210,"6% de 3.500 = 210.","R$"),
  mc("Você percebe que lançou uma nota no centro de custo errado no mês passado. O que fazer?",["*Avisar o responsável, corrigir com uma reclassificação e registrar o motivo","Deixar como está","Apagar o lançamento antigo sem avisar","Esperar alguém perceber"],"Corrigir com transparência é integridade na prática."),
  ep("Entrevistador: “Explique o que é uma tabela dinâmica e quando você a usaria.”","É um recurso que resume uma base grande arrastando campos para linhas, colunas e valores. Eu usaria para ver o total de notas por centro de custo e por mês, ou por fornecedor, e conferir com a base.",[["Resume uma base grande","resum","agrup","consolid","sintetiz"],["Arrastando campos","linha","coluna","valor","campo","arrast","filtro"],["Uso na rotina","centro de custo","fornecedor","mes","relatori","orcament","total"]],"Resumo, campos e um uso real.")
 ]}
];
