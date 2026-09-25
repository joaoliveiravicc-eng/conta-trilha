/* Área Carreiras · Trilha: Orçamento e indicadores, no nível do Analista Administrativo Financeiro Jr.
   Complementa cust4 (orçamento empresarial), fjc2 (orçado x realizado e fechamento), fj11 (prazo médio
   de pagamento) e xl21 (previsto x realizado no Excel). A "Rede Capivara" é um grupo fictício.
   13º salário: Lei 4.749/1965, arts. 1º e 2º (consultada em 25/09/2026). Valores de exemplo são fictícios. */
import { box, eq, tbl, ul, ol, lanc, planilha, download } from '../render-helpers.js';
import { mc, tf, mt, cl, nu, od, ep, en } from '../../engine/exercises/factories.js';

const g = (rows, mark) => planilha(rows, { mark: mark || [] });
const CAPIVARA = [
  ['Centro','Previsto','Realizado'],
  ['Jornalismo','180.000','196.000'],
  ['Programação','120.000','112.800'],
  ['Técnica','90.000','99.000'],
  ['Comercial','60.000','58.500'],
  ['Administrativo','50.000','50.500'],
  ['Total','500.000','516.800']
];
const AGING = tbl(['Faixa','R$'],[['A vencer em até 30 dias','45.000'],['A vencer em 31 a 60 dias','20.000'],['Vencido há até 30 dias','12.000'],['Vencido há 31 a 60 dias','3.000'],['Vencido há mais de 60 dias','1.000']]);

export default [
/* ================= Como o orçamento funciona ================= */
{id:"orc1", title:"Do plano ao número", icon:"🗓️",
 goal:"Entender como o orçamento anual é montado, com premissas, e quem participa de cada etapa.",
 recap:["Premissas, projeção das áreas, consolidação, aprovação e acompanhamento mensal.","Base histórica é rápida mas repete vícios; base zero justifica cada gasto.","OPEX é o gasto do dia a dia; CAPEX é investimento em bens duráveis."],
 learn:[
  {h:"O ciclo do orçamento", b:ol(['<b>Premissas</b>: inflação esperada, reajustes de contratos, reajuste salarial, número de pessoas, metas de venda.','<b>Projeção das áreas</b>: cada gestor estima os gastos por conta, centro de custo e mês.','<b>Consolidação</b>: o financeiro ou a controladoria junta tudo e ajusta.','<b>Aprovação</b> pela diretoria.','<b>Acompanhamento</b> mensal: previsto x realizado, com explicações.']) + box('dica','O analista júnior costuma entrar no acompanhamento: lançar e classificar certo, comparar e explicar as diferenças.')},
  {h:"Duas formas de começar", b:tbl(['Método','Como funciona'],[['Base histórica','Parte do gasto do ano anterior e ajusta pelas premissas. É rápido, mas pode repetir desperdícios.'],['Base zero','Cada gasto precisa ser justificado desde o início. Dá mais trabalho e revela o que pode ser cortado.']]) + box('exemplo','Aluguel de R$ 10.000 por mês, com reajuste de 4% em julho: janeiro a junho somam R$ 60.000; julho a dezembro, 6 × R$ 10.400 = R$ 62.400. Orçamento do ano: R$ 122.400.')},
  {h:"OPEX e CAPEX", b:ul(['<b>OPEX</b>: despesas do dia a dia, como aluguel, energia, serviços e salários.','<b>CAPEX</b>: investimentos em bens duráveis, como câmeras, transmissores e reformas. Vão para o imobilizado e viram despesa aos poucos, pela depreciação.']) + `<p>Os dois são orçados e acompanhados separadamente.</p>`,
   check:mc("A compra de uma câmera de R$ 80.000 para o jornalismo entra em:",["*CAPEX","OPEX","Nenhum dos dois"],"É um bem durável: investimento, que vai para o imobilizado.")}
 ],
 ex:[
  nu("Aluguel de R$ 10.000 por mês, com reajuste de 4% a partir de julho. Qual o total orçado para o ano?",122400,"6 × 10.000 + 6 × 10.400 = 60.000 + 62.400 = 122.400.","R$"),
  nu("Contrato de limpeza de R$ 6.000 por mês, com reajuste de 5% a partir de janeiro. Quanto orçar para o ano?",75600,"6.000 × 1,05 = 6.300 por mês. 6.300 × 12 = 75.600.","R$"),
  cl("No orçamento, o gasto é OPEX ou CAPEX?",["OPEX","CAPEX"],"Conta de energia:0|Compra de um transmissor:1|Salários da equipe:0|Reforma do estúdio:1|Assinatura mensal de software:0|Compra de câmeras novas:1","Gasto recorrente do dia a dia é OPEX; bem durável comprado para usar por anos é CAPEX."),
  mc("Qual premissa mais afeta o orçamento de salários?",["*O reajuste da categoria e o número de pessoas previsto","O prazo médio de recebimento dos clientes ao longo do ano","O saldo bancário disponível no início de cada mês","A quantidade de notas fiscais lançadas no período"],"Folha = pessoas × salários. Reajuste e contratações mudam o total."),
  od("Ordene o ciclo do orçamento:",["Definir as premissas","Áreas projetam seus gastos","Consolidar e ajustar","Aprovar","Acompanhar mês a mês"],"Do plano à aprovação, e depois o acompanhamento."),
  tf("No orçamento base zero, cada gasto precisa ser justificado desde o início, sem partir do ano anterior.",true,"É o oposto da base histórica."),
  mc("Qual o principal risco de orçar só pela base histórica?",["*Repetir gastos desnecessários do ano anterior","Não conseguir calcular os valores de cada mês do ano","Ignorar sempre a inflação nos preços dos fornecedores","Ficar sem nenhum centro de custo para acompanhar"],"Se o ano anterior tinha desperdício, ele passa para o novo orçamento.")
 ]},
{id:"orc2", title:"Centros de custo e contas", icon:"🏷️",
 goal:"Classificar cada gasto na conta e no centro de custo certos, e ratear o que é compartilhado.",
 recap:["A conta diz o que foi gasto; o centro de custo, onde.","Classificação errada faz um centro parecer estourado e outro sobrar.","Rateio divide um gasto comum por um critério fixo, como m², horas ou pessoas."],
 learn:[
  {h:"Conta e centro, na prática", b:`<p>O orçamento é controlado em duas dimensões: a <b>conta</b> (o que foi gasto) e o <b>centro de custo</b> (qual área gastou). Numa emissora, por exemplo:</p>` + tbl(['Gasto','Conta','Centro'],[['Diesel do carro de reportagem','Combustíveis','Jornalismo'],['Conserto do transmissor','Manutenção','Técnica'],['Brindes para anunciantes','Brindes','Comercial']])},
  {h:"Por que a classificação importa", b:ul(['Uma nota no centro errado faz um centro parecer estourado e outro parecer que sobrou verba.','O custo de cada área fica distorcido.','O erro vira retrabalho no fechamento.']) + box('regra','Na dúvida, pergunte a quem pediu a compra ou ao gestor do centro. Classificar certo na entrada evita reclassificar no fechamento.')},
  {h:"Rateio de gastos compartilhados", b:`<p>Aluguel, energia do prédio ou TI servem a várias áreas. O <b>rateio</b> divide o gasto por um critério:</p>` + tbl(['Área','m²','Rateio do aluguel de R$ 50.000'],[['Jornalismo','400','20.000'],['Técnica','300','15.000'],['Comercial','200','10.000'],['Administrativo','100','5.000']]) + box('dica','Outros critérios comuns: horas de uso, número de pessoas, faturamento. O importante é usar sempre o mesmo, definido pela empresa.')}
 ],
 ex:[
  cl("Numa emissora, qual centro de custo recebe o gasto?",["Jornalismo","Técnica","Comercial"],"Diesel do carro de reportagem:0|Manutenção do transmissor:1|Brindes para anunciantes:2|Diárias da equipe de reportagem:0|Peças da antena:1|Comissão dos vendedores:2","Pergunte qual área usou o recurso."),
  nu("Aluguel de R$ 50.000 rateado por m². A Técnica ocupa 300 dos 1.000 m². Quanto vai para a Técnica?",15000,"300 ÷ 1.000 = 30%. 30% de 50.000 = 15.000.","R$"),
  nu("O estúdio custa R$ 24.000 por mês e foi usado 120 horas: 90 pelo Jornalismo e 30 pela Programação. Quanto cabe à Programação?",6000,"30 ÷ 120 = 25%. 25% de 24.000 = 6.000.","R$"),
  mc("Uma nota de R$ 8.000 do Comercial foi lançada no centro Administrativo. O que acontece no relatório?",["*O Administrativo parece gastar R$ 8.000 a mais, e o Comercial a menos","Nada acontece: o total da empresa é o mesmo, então nenhum centro muda de valor","Os dois centros ficam R$ 8.000 acima do previsto no relatório","A nota some do relatório até o lançamento ser corrigido"],"O total não muda, mas a análise por área fica errada."),
  tf("Como o total da empresa não muda, lançar uma nota no centro de custo errado não tem importância.",false,"O orçamento é controlado por centro. O erro distorce a análise e a cobrança de cada gestor."),
  mt([["Conta contábil","O que foi gasto"],["Centro de custo","Qual área gastou"],["Rateio","Divisão de um gasto comum entre áreas"],["Critério de rateio","A regra da divisão, como m² ou pessoas"]],"O vocabulário da classificação."),
  mc("O diesel do gerador que abastece o prédio inteiro deve ir para:",["*Um centro comum ou rateio entre as áreas, pelo critério da empresa","Sempre o centro do Jornalismo, que é a maior área da empresa","Nenhum centro, porque despesa de infraestrutura não entra no orçamento","O centro de quem pagou o boleto do combustível"],"Gasto que serve a todos é rateado ou fica num centro comum.")
 ]},
{id:"orc3", title:"Previsto, comprometido e realizado", icon:"🔒",
 goal:"Calcular o saldo disponível do orçamento considerando o que já está comprometido em ordens de compra.",
 recap:["Disponível = previsto − realizado − comprometido.","Quando a nota é lançada, o valor sai do comprometido e entra no realizado.","Dividir uma compra para caber na alçada é fracionamento: uma quebra de controle."],
 learn:[
  {h:"Três números, não dois", b:ul(['<b>Previsto</b>: o valor aprovado no orçamento.','<b>Comprometido</b>: ordens de compra aprovadas e contratos que ainda não viraram nota.','<b>Realizado</b>: notas já lançadas.']) + eq('Disponível = Previsto − Realizado − Comprometido') + box('exemplo','TI no ano: previsto de R$ 120.000, notas lançadas de R$ 70.000 e OCs em aberto de R$ 30.000. Disponível: R$ 20.000.')},
  {h:"Quando a OC vira realizado", b:ul(['Quando a nota chega e é lançada, o valor sai do comprometido e entra no realizado. O total consumido não muda.','Numa entrega parcial, só a parte faturada vira realizado.','OC cancelada libera o comprometido.']) + box('atencao','OC esquecida em aberto “prende” verba que a área poderia usar. Encerre as que não serão mais atendidas.')},
  {h:"Consultar o saldo antes de comprar", b:`<p>Antes de emitir uma OC, confira o disponível da conta e do centro. Se não houver saldo:</p>` + ul(['<b>remanejar</b> verba de outra linha, com aprovação;','pedir <b>aprovação do estouro</b> a quem tem alçada;','<b>adiar</b> a compra.']) + box('regra','Nunca divida uma compra em várias OCs para caber na alçada de quem aprova. Isso é fracionamento, uma quebra de controle.'),
   check:mc("Dividir uma compra de R$ 20.000 em duas OCs de R$ 10.000 para caber na alçada do gestor é:",["*Fracionamento, uma quebra de controle","Uma boa prática","Obrigatório"],"A compra é uma só e precisa da aprovação correspondente ao valor total.")}
 ],
 ex:[
  nu("Centro de TI: previsto de R$ 120.000, realizado de R$ 70.000 e comprometido de R$ 30.000. Quanto está disponível?",20000,"120.000 − 70.000 − 30.000 = 20.000.","R$"),
  nu("Uma OC de R$ 12.000 teve entrega parcial, com nota de R$ 7.000 lançada. Quanto continua comprometido?",5000,"12.000 − 7.000 = 5.000 ainda em aberto.","R$"),
  mc("Previsto de R$ 50.000, realizado de R$ 38.000 e comprometido de R$ 9.000. Uma compra de R$ 5.000 cabe?",["*Não: sobram R$ 3.000, e falta verba para a compra","Sim: sobram R$ 12.000, porque o comprometido ainda não conta","Sim: sobram R$ 5.000, exatamente o valor da compra","Não dá para saber sem consultar o gestor da área"],"50.000 − 38.000 − 9.000 = 3.000 disponíveis."),
  tf("Quando a nota de uma OC é lançada, o valor sai do comprometido e entra no realizado.",true,"O consumo do orçamento continua o mesmo; só muda de coluna."),
  mc("A área cancelou uma OC de R$ 4.000 que não será usada. O que acontece com o orçamento?",["*O comprometido cai R$ 4.000 e a verba volta a ficar disponível","O realizado aumenta R$ 4.000, porque a OC foi encerrada","Nada muda, porque a compra nunca chegou a ser feita","O previsto cai R$ 4.000, porque a área abriu mão dessa verba do ano"],"Cancelar libera a verba que estava reservada."),
  cl("No controle do orçamento, isto é previsto, comprometido ou realizado?",["Previsto","Comprometido","Realizado"],"Verba aprovada para o ano:0|OC aprovada, aguardando entrega:1|Nota fiscal lançada:2|Parcelas futuras de um contrato assinado:1|Nota paga no mês passado:2","Previsto é o plano; comprometido, o que já foi contratado; realizado, o que já virou nota."),
  mc("Um gestor com alçada de até R$ 10.000 pede duas OCs de R$ 9.000 para a mesma compra. O que fazer?",["*Não dividir: a compra é de R$ 18.000 e exige aprovação de quem tem alçada","Emitir as duas OCs, porque cada uma delas cabe na alçada do gestor que pediu","Emitir uma OC de R$ 10.000 e outra de R$ 8.000, para caber","Pagar sem OC, porque o gestor já autorizou verbalmente"],"Isso é fracionamento, e as auditorias procuram exatamente esse padrão.")
 ]},
{id:"orc4", title:"Mês a mês: sazonalidade", icon:"📅",
 goal:"Distribuir o orçamento anual pelos meses e reconhecer variações que são só de calendário.",
 recap:["Orçamento anual se distribui pelos meses conforme o gasto acontece.","Pela competência, seguro anual e 13º viram despesa mês a mês; no caixa, saem de uma vez.","Quando o problema é o calendário, compare o acumulado do ano."],
 learn:[
  {h:"Orçamento anual, controle mensal", b:`<p>O orçamento é aprovado para o ano, mas acompanhado por mês. Dividir tudo por 12 funciona para o aluguel. Para outros gastos, a distribuição precisa seguir o calendário real.</p>` + box('exemplo','Manutenção de R$ 84.000 no ano, com R$ 40.000 de parada programada em julho: os outros 11 meses ficam com R$ 44.000 ÷ 11 = R$ 4.000 cada.')},
  {h:"Competência ou caixa?", b:tbl(['Gasto','No caixa','Na competência'],[['Seguro anual','Sai tudo no pagamento','1/12 por mês de vigência'],['13º salário','Metade entre fevereiro e novembro e o resto até 20/12','Provisão de 1/12 por mês'],['Parada programada','No mês do serviço','No mês do serviço']]) + box('atencao','Descubra se o relatório que você acompanha é de despesa (competência) ou de caixa. Os meses mudam muito de um para o outro.') + '<p class="small muted">13º: Lei 4.749/1965, arts. 1º e 2º, consultada em 25/09/2026.</p>'},
  {h:"Compare o acumulado", b:`<p>Quando a diferença é só de calendário, o mês engana. O <b>acumulado no ano</b> mostra a tendência.</p>` + tbl(['Período','Previsto','Realizado','Variação'],[['Só março','10.000','14.000','+40%'],['Janeiro a março','30.000','31.500','+5%']])}
 ],
 ex:[
  nu("Manutenção de R$ 84.000 no ano: R$ 40.000 em julho e o restante dividido igualmente pelos outros 11 meses. Qual o previsto de agosto?",4000,"84.000 − 40.000 = 44.000. 44.000 ÷ 11 = 4.000.","R$"),
  nu("Seguro anual de R$ 24.000, pago em março, com vigência de 12 meses. Pela competência, qual a despesa de cada mês?",2000,"24.000 ÷ 12 = 2.000 por mês de vigência.","R$"),
  mc("O seguro anual de R$ 24.000 foi pago à vista em março. No fluxo de caixa, quando sai o dinheiro?",["*Tudo em março","R$ 2.000 por mês","Em dezembro","Não sai"],"O caixa segue o pagamento; a despesa segue a vigência."),
  nu("Previsto acumulado de janeiro a março: R$ 30.000. Realizado acumulado: R$ 31.500. Qual a variação acumulada em %?",5,"1.500 ÷ 30.000 = 5%.","%"),
  tf("Pela competência, a empresa provisiona 1/12 do 13º salário por mês, mesmo pagando em novembro e dezembro.",true,"A despesa é reconhecida ao longo do ano em que o direito é adquirido."),
  mc("Março mostra +40% em manutenção, mas o acumulado do ano está +5%. A leitura mais provável:",["*O gasto se concentrou em março, sem estouro relevante no ano","A área perdeu o controle dos gastos de manutenção no ano","O orçamento da manutenção foi feito com números errados","A nota foi lançada em duplicidade, com certeza"],"Diferença de calendário: o mês engana, o acumulado mostra a tendência."),
  od("Ordene a análise de um mês que parece estourado:",["Ver a variação do mês","Checar se é gasto de calendário ou antecipado","Comparar o acumulado do ano","Explicar a diferença no relatório"],"Primeiro entender o calendário, depois concluir.")
 ]},

/* ================= Analisando variações ================= */
{id:"orc5", title:"O sinal da variação", icon:"➕",
 goal:"Calcular variações em R$ e em %, dizer se são favoráveis e decidir quais precisam de explicação.",
 recap:["Receita acima é favorável; despesa acima é desfavorável.","Percentual alto sobre base pequena pode importar pouco: olhe também os reais.","Despesa abaixo do previsto pode ser só atraso."],
 learn:[
  {h:"Receita e despesa têm sinais opostos", b:tbl(['Linha','Realizado acima','Realizado abaixo'],[['Receita','Favorável','Desfavorável'],['Despesa','Desfavorável','Favorável']]) + box('dica','Na dúvida, pergunte: isso melhora ou piora o resultado da empresa?')},
  {h:"Percentual sobre base pequena", b:tbl(['Conta','Previsto','Realizado','Variação'],[['Correios','200','500','+300 (+150%)'],['Aluguel','100.000','105.000','+5.000 (+5%)']]) + `<p>O aluguel tem o menor percentual e a maior diferença em reais. Por isso muitas empresas só pedem comentário quando a variação passa dos <b>dois</b> limites, em % e em R$.</p>` + box('exemplo','Critério fictício: comentar quando a variação passar de 10% e de R$ 2.000 ao mesmo tempo.')},
  {h:"Nem toda variação é o que parece", b:ul(['Despesa abaixo do previsto pode ser <b>atraso</b>: o gasto ainda vai acontecer.','Despesa acima pode ser <b>antecipação</b> de um gasto do mês seguinte.','Receita abaixo pode ser uma campanha que mudou de mês.'])}
 ],
 ex:[
  cl("A variação é favorável ou desfavorável?",["Favorável","Desfavorável"],"Receita de publicidade acima do previsto:0|Energia acima do previsto:1|Viagens abaixo do previsto:0|Receita de eventos abaixo do previsto:1|Manutenção abaixo do previsto:0","Receita acima e despesa abaixo melhoram o resultado."),
  nu("Correios: previsto de R$ 200 e realizado de R$ 500. Qual a variação em %?",150,"300 ÷ 200 = 150%.","%"),
  mc("Critério da empresa: comentar variações acima de 10% e de R$ 2.000 ao mesmo tempo. Qual linha precisa de comentário?",["*Viagens: previsto de R$ 20.000 e realizado de R$ 23.000","Correios: previsto de R$ 200 e realizado de R$ 500","Aluguel: previsto de R$ 100.000 e realizado de R$ 101.000","Café: previsto de R$ 1.000 e realizado de R$ 1.080"],"Viagens: +3.000 e +15%. As outras não passam dos dois limites."),
  nu("Receita de eventos: prevista de R$ 40.000 e realizada de R$ 34.000. Em quantos % ficou abaixo do previsto?",15,"6.000 ÷ 40.000 = 15%.","%"),
  tf("Despesa abaixo do previsto é sempre economia.",false,"Pode ser só atraso: o gasto vai aparecer mais tarde."),
  mc("Qual pergunta resolve a dúvida entre favorável e desfavorável?",["*Isso melhora ou piora o resultado da empresa?","O número da variação é positivo ou negativo?","A conta contábil começa com o número 3 ou com o 4?","O gestor da área gostou do resultado do mês?"],"O sinal da conta confunde; o efeito no resultado, não."),
  ep("Explique por que uma variação de 150% pode importar menos do que uma de 5%.","Porque o percentual depende da base. Um aumento de 150% sobre R$ 200 são só R$ 300, enquanto 5% sobre R$ 100.000 são R$ 5.000. O impacto no resultado está nos reais, por isso se olham os dois critérios.",[["Depende da base","base","pequen","sobre","valor baixo"],["Diferença em reais","reais","real","valor","dinheiro","300","5.000","5000"],["Impacto no resultado","impact","resultado","relev","importa","material","peso"]],"Percentual e valor em reais: sempre os dois.")
 ]},
{id:"orc6", title:"Acumulado e forecast", icon:"🔭",
 goal:"Usar o acumulado do ano e o forecast para saber se o orçamento vai fechar o ano dentro do previsto.",
 recap:["Acumulado no ano soma de janeiro até o mês atual.","Forecast = realizado até agora + previsão dos meses que faltam.","Forecast acima do orçamento pede aviso cedo e opções de ação."],
 learn:[
  {h:"Acumulado no ano", b:tbl(['Mês','Previsto','Realizado'],[['Janeiro','10.000','8.000'],['Fevereiro','10.000','12.000'],['Março','10.000','9.000'],['Abril','10.000','13.000'],['<b>Acumulado</b>','<b>40.000</b>','<b>42.000</b>']]) + `<p>Os meses sobem e descem, mas o acumulado mostra: R$ 2.000 acima, ou 5%.</p>`},
  {h:"Forecast: a nova previsão do ano", b:eq('Forecast = Realizado até agora + Previsão dos meses que faltam') + `<p>Os meses que faltam podem seguir o orçamento, a média recente ou, melhor, fatos já conhecidos: um contrato reajustado, uma compra aprovada.</p>` + box('exemplo','Orçamento anual de R$ 120.000. Realizado de janeiro a abril: R$ 42.000. Com um reajuste de contrato, os 8 meses seguintes devem custar R$ 11.000 cada. Forecast: 42.000 + 88.000 = R$ 130.000, ou R$ 10.000 acima do orçamento.')},
  {h:"Forecast acima do orçamento", b:ul(['Avise cedo, com números.','Leve opções: adiar gastos que não são essenciais, renegociar contratos, remanejar verba de outra linha ou pedir aprovação do estouro.','Atualize o forecast todo mês e explique o que mudou.']) + box('regra','O orçamento aprovado continua sendo a referência. O forecast é a melhor estimativa de onde o ano vai terminar.')}
 ],
 ex:[
  nu("Previsto acumulado de R$ 40.000 e realizado acumulado de R$ 42.000. Qual a variação acumulada em %?",5,"2.000 ÷ 40.000 = 5%.","%"),
  nu("Realizado de janeiro a abril: R$ 42.000. De maio a dezembro, a previsão é de R$ 11.000 por mês. Qual o forecast do ano?",130000,"42.000 + 8 × 11.000 = 130.000.","R$"),
  nu("Orçamento anual de R$ 120.000 e forecast de R$ 130.000. Quanto se prevê estourar no ano?",10000,"130.000 − 120.000 = 10.000.","R$"),
  mc("Qual forecast é mais confiável?",["*O que parte do realizado e ajusta os meses restantes com fatos conhecidos","O que repete o orçamento original sem mudar nenhum número, mesmo com fatos novos","O que multiplica o mês mais caro do ano por doze meses","O que usa um valor redondo estimado de cabeça pelo gestor"],"Realizado + fatos conhecidos: é o que dá para defender."),
  tf("Com o forecast pronto, o orçamento aprovado deixa de ser usado na comparação.",false,"O orçamento segue como referência. O forecast mostra onde o ano deve terminar."),
  mc("Em abril, o forecast indica estouro de R$ 10.000 no ano. Qual a melhor atitude?",["*Avisar o gestor já, com opções para adiar, renegociar ou remanejar","Esperar até dezembro para ver se o estouro se confirma","Lançar parte das notas do ano no exercício seguinte","Não falar nada por enquanto, porque o resultado do ano ainda pode melhorar"],"Quanto antes o aviso, mais opções o gestor tem."),
  od("Ordene o cálculo do forecast:",["Somar o realizado até o mês","Projetar os meses que faltam","Ajustar por fatos conhecidos","Comparar com o orçamento do ano"],"Realizado, projeção, ajustes e comparação.")
 ]},
{id:"orc7", title:"Preço ou volume?", icon:"⚖️",
 goal:"Separar uma variação em efeito preço e efeito volume, e saber quem pode agir em cada um.",
 recap:["Efeito volume = (quantidade real − prevista) × preço previsto.","Efeito preço = (preço real − previsto) × quantidade real.","Volume se discute com a área que usa; preço, com compras e contratos."],
 learn:[
  {h:"Duas causas misturadas", b:`<p>Muitos gastos são <b>quantidade × preço</b>. Quando os dois mudam, a variação mistura duas causas. Separe assim:</p>` + eq('Efeito volume = (Quantidade real − Quantidade prevista) × Preço previsto') + eq('Efeito preço = (Preço real − Preço previsto) × Quantidade real') + `<p>A soma dos dois é a variação total.</p>`},
  {h:"Exemplo: diesel da reportagem", b:tbl(['','Litros','Preço','Total'],[['Previsto','2.000','6,00','12.000'],['Realizado','2.200','6,50','14.300']]) + ul(['Variação total: 14.300 − 12.000 = <b>+2.300</b>.','Volume: (2.200 − 2.000) × 6,00 = <b>+1.200</b>.','Preço: (6,50 − 6,00) × 2.200 = <b>+1.100</b>.'])},
  {h:"Por que separar", b:ul(['<b>Volume</b> é decisão de uso: mais pautas, mais viagens, mais horas. Converse com a área.','<b>Preço</b> é mercado e negociação: reajuste, fornecedor, contrato. Converse com compras.']) + box('dica','“Gastamos R$ 2.300 a mais: R$ 1.200 porque rodamos mais e R$ 1.100 porque o diesel subiu” é uma análise completa.')}
 ],
 ex:[
  nu("Diesel: previsto de 2.000 litros a R$ 6,00; realizado de 2.200 litros a R$ 6,50. Qual a variação total?",2300,"14.300 − 12.000 = 2.300.","R$"),
  nu("Diesel: previsto de 2.000 litros a R$ 6,00; realizado de 2.200 litros a R$ 6,50. Qual o efeito volume?",1200,"(2.200 − 2.000) × 6,00 = 1.200.","R$"),
  nu("Diesel: previsto de 2.000 litros a R$ 6,00; realizado de 2.200 litros a R$ 6,50. Qual o efeito preço?",1100,"(6,50 − 6,00) × 2.200 = 1.100.","R$"),
  nu("Energia: previsto de 50.000 kWh a R$ 0,80; realizado de 48.000 kWh a R$ 0,90. Qual o efeito preço?",4800,"(0,90 − 0,80) × 48.000 = 4.800. O volume ajudou: (48.000 − 50.000) × 0,80 = −1.600.","R$"),
  mc("A empresa consumiu menos energia, mas a conta subiu. O que explica?",["*A tarifa subiu mais do que a economia obtida no consumo","O consumo aumentou, mas a tarifa ficou igual no período","A conta está errada, com certeza, e deve ser contestada","O efeito volume foi positivo e explica sozinho o aumento"],"Efeito volume favorável, efeito preço desfavorável e maior."),
  cl("A variação vem de preço ou de volume?",["Preço","Volume"],"O fornecedor reajustou o valor da hora:0|A equipe fez mais viagens:1|O litro do diesel subiu:0|Mais freelancers foram contratados:1|A tarifa de energia aumentou:0","Preço é quanto custa cada unidade; volume é quantas unidades."),
  tf("No efeito volume se usa o preço previsto; no efeito preço, a quantidade real.",true,"Assim os dois efeitos somam exatamente a variação total.")
 ]},
{id:"orc8", title:"Mês errado, centro errado", icon:"🔁",
 goal:"Reconhecer erros de registro que distorcem o orçamento e corrigi-los com reclassificação, provisão e apropriação.",
 recap:["Centro errado: reclassificação.","Gasto do mês sem nota: provisão.","Pagamento de vários meses: despesa antecipada, apropriada mês a mês."],
 learn:[
  {h:"Três ajustes do fechamento", b:tbl(['Situação','Ajuste'],[['Nota no centro de custo errado','Reclassificação: tira de um centro e põe no outro'],['Gasto do mês ainda sem nota, como a energia de março','Provisão no mês do consumo'],['Pagamento que cobre vários meses, como seguro ou licença anual','Despesa antecipada, apropriada mês a mês']])},
  {h:"Reclassificação na prática", b:`<p>Uma nota de marketing de R$ 8.000, do Comercial, foi lançada no Administrativo:</p>` + lanc([['D','Marketing – Comercial','8.000'],['C','Marketing – Administrativo','8.000']]) + box('regra','O total da empresa não muda. Registre o motivo: qual nota, quem pediu a correção e por quê.')},
  {h:"Provisão e a conta real", b:`<p>A energia de março, estimada em R$ 9.000, é provisionada em março. Em abril chega a conta de R$ 9.300: a provisão é baixada, e a diferença de R$ 300 é ajustada em abril.</p>` + box('dica','Estime pela média recente ou pela leitura do medidor e anote a base da estimativa.')}
 ],
 ex:[
  cl("Qual ajuste resolve cada caso no fechamento?",["Reclassificar","Provisionar","Apropriar"],"Nota do Comercial lançada no Administrativo:0|Energia de março com conta só em abril:1|Licença anual de software paga em janeiro:2|Seguro anual pago à vista:2|Limpeza de março ainda sem nota no fechamento:1|Diesel do Jornalismo lançado na Técnica:0","Centro errado se reclassifica; gasto sem nota se provisiona; pagamento de vários meses se apropria."),
  en("Reclassifique R$ 8.000 de marketing lançados no centro Administrativo que eram do Comercial.","Marketing – Comercial","Marketing – Administrativo",["Bancos","Fornecedores"],"Debita o centro certo e credita o errado. O total não muda."),
  nu("Licença anual de software de R$ 36.000, paga em janeiro, para 12 meses. Qual a despesa de cada mês?",3000,"36.000 ÷ 12 = 3.000.","R$"),
  mc("A energia de março, estimada em R$ 9.000, só chega em abril. O que fazer no fechamento de março?",["*Provisionar R$ 9.000 como despesa de março","Esperar a conta e lançar tudo em abril","Lançar só quando pagar","Ignorar, porque ainda não há nota"],"Pela competência, o consumo é de março."),
  nu("Provisão de R$ 9.000 para a energia de março. A conta chegou de R$ 9.300. Qual a diferença a ajustar?",300,"9.300 − 9.000 = 300.","R$"),
  tf("Reclassificar uma nota entre centros de custo muda o total de despesas da empresa.",false,"Só muda a área. O total continua igual."),
  od("Ordene uma reclassificação:",["Identificar a nota e o centro certo","Confirmar com o gestor da área","Fazer o lançamento de reclassificação","Registrar o motivo"],"Conferir, confirmar, lançar e documentar.")
 ]},

/* ================= Indicadores e relatório ================= */
{id:"orc9", title:"Indicadores de contas a pagar", icon:"🧾",
 goal:"Ler o aging de fornecedores, medir a pontualidade e enxergar o custo dos atrasos.",
 recap:["O aging separa títulos a vencer e vencidos por faixa de dias.","Pontualidade = pagos em dia ÷ total pago.","Multa e juros de atraso são custo evitável: vale medir."],
 learn:[
  {h:"Aging de fornecedores", b:`<p>O mesmo aging usado para clientes serve para o que a empresa deve:</p>` + AGING + box('dica','Título vencido e parado quase sempre tem um motivo: nota com divergência, falta de aprovação ou boleto que não chegou. O aging ajuda a achá-los.')},
  {h:"Pontualidade e custo do atraso", b:eq('Pontualidade = Títulos pagos em dia ÷ Total de títulos pagos') + ul(['200 títulos pagos no mês, 190 em dia: pontualidade de 95%.','Some as multas e os juros pagos por atraso: é um custo que dá para evitar.'])},
  {h:"Vencimentos concentrados", b:`<p>Muitos títulos vencendo no mesmo dia apertam o caixa e aumentam o risco de erro. Negociar datas fixas com os fornecedores, como os dias 10 e 25, organiza a programação.</p>`,
   check:mc("Concentrar muitos vencimentos no mesmo dia:",["*Aperta o caixa e aumenta o risco de erro","Facilita o controle","Não faz diferença"],"Distribuir os vencimentos suaviza a saída de caixa.")}
 ],
 ex:[
  nu("No mês, a empresa pagou 200 títulos, 190 deles em dia. Qual a pontualidade?",95,"190 ÷ 200 = 95%.","%"),
  nu("Qual o total vencido no aging de fornecedores?" + AGING,16000,"12.000 + 3.000 + 1.000 = 16.000.","R$"),
  mc("No aging de fornecedores, um título que venceu há 45 dias aparece na faixa:",["*Vencido há 31 a 60 dias","Vencido há até 30 dias","A vencer em 31 a 60 dias","Vencido há mais de 60 dias"],"45 dias de atraso ficam entre 31 e 60."),
  mc("Em março, a empresa pagou R$ 1.200 de multas e juros por atraso. Isso é:",["*Um custo evitável, que vale acompanhar como indicador","Um investimento em relacionamento com os fornecedores","Uma receita financeira, porque envolve juros no mês","Normal e sem importância para a análise do mês"],"Atraso custa dinheiro e desgasta a relação com o fornecedor."),
  mc("Para que serve o aging de contas a pagar?",["*Programar o caixa e achar títulos parados ou vencidos","Calcular a depreciação mensal dos bens usados na operação","Medir a receita reconhecida em cada mês do ano","Substituir a conciliação bancária feita todo mês"],"Mostra o que vence quando e o que está atrasado."),
  cl("Hoje é 15/04/2026. O título está a vencer ou vencido?",["A vencer","Vencido"],"Vence em 20/04/2026:0|Venceu em 10/04/2026:1|Vence em 30/04/2026:0|Venceu em 01/03/2026:1","Vencimento antes de hoje, sem pagamento, é título vencido."),
  tf("Negociar datas fixas de vencimento com os fornecedores ajuda a organizar a programação de pagamentos.",true,"Menos datas, menos risco de esquecer e mais previsibilidade no caixa.")
 ]},
{id:"orc10", title:"Indicadores de compras e notas", icon:"🛒",
 goal:"Medir saving, lead time e a qualidade do processo de compras e de notas.",
 recap:["Saving só vale com uma base honesta de comparação.","Lead time: requisição → OC (interno) e OC → entrega (fornecedor).","Compras sem OC e concentração de fornecedores são alertas."],
 learn:[
  {h:"Saving com base honesta", b:eq('Saving = (Preço de referência − Preço negociado) ÷ Preço de referência') + ul(['A referência pode ser o último preço pago, a primeira cotação ou o orçamento. Diga qual.','Exemplo: último preço de R$ 100 a hora; novo contrato a R$ 95. Saving de 5%.']) + box('atencao','Saving calculado sobre uma cotação inicial inflada parece grande, mas não é economia real.')},
  {h:"Lead time de compras", b:tbl(['Etapa','Data','Dias'],[['Requisição','02/03',''],['Ordem de compra','06/03','4 (interno)'],['Entrega','16/03','10 (fornecedor)']]) + `<p>Lead time total: 14 dias. Separar as etapas mostra onde está a demora.</p>`},
  {h:"Qualidade do processo", b:ul(['<b>Compras sem OC</b>, regularizadas depois: quanto menor, melhor.','<b>Notas com divergência</b>: mostram fornecedores ou pedidos com problema.','<b>Concentração</b>: quanto do gasto está nos 5 maiores fornecedores. Muito concentrado é risco se um deles falhar.'])}
 ],
 ex:[
  nu("Requisição em 02/03, ordem de compra em 06/03 e entrega em 16/03. Qual o lead time total, em dias?",14,"4 dias internos + 10 do fornecedor = 14.","dias"),
  nu("Último preço pago: R$ 100 por hora. Novo contrato: R$ 95 por hora. Qual o saving em %?",5,"5 ÷ 100 = 5%.","%"),
  nu("Das 80 compras do mês, 12 foram feitas sem OC e regularizadas depois. Qual o percentual?",15,"12 ÷ 80 = 15%.","%"),
  nu("Gasto total de R$ 500.000; os 5 maiores fornecedores somam R$ 350.000. Qual a concentração?",70,"350.000 ÷ 500.000 = 70%.","%"),
  mc("O saving foi calculado sobre uma cotação inicial muito acima do mercado. O problema é que:",["*O saving parece maior do que a economia real","O saving fica negativo, porque a compra saiu mais cara","Não há problema, pois toda economia vale do mesmo jeito","A compra fica mais cara para a empresa no fim"],"A base de comparação precisa ser honesta."),
  tf("Lead time interno é o tempo entre a requisição e a emissão da ordem de compra.",true,"É a parte que depende da própria empresa."),
  mt([["Saving","Economia obtida na negociação"],["Lead time","Tempo do pedido até a entrega"],["Compras sem OC","Falhas no processo de compras"],["Concentração","Dependência dos maiores fornecedores"]],"Cada indicador responde a uma pergunta.")
 ]},
{id:"orc11", title:"O relatório mensal", icon:"📰",
 goal:"Montar um relatório de previsto x realizado que o gestor lê em 2 minutos e em que confia.",
 recap:["Resumo, tabela por centro, comentários das variações relevantes e forecast.","Comentário bom: valor, causa, se repete e o que fazer.","Total que bate com o sistema vem antes de gráfico bonito."],
 learn:[
  {h:"Estrutura em 4 blocos", b:ol(['<b>Resumo</b>: três frases com o que importa.','<b>Tabela por centro de custo</b>: previsto, realizado, variação em R$ e em %.','<b>Comentários</b> só das variações relevantes: causa, se vai se repetir e a ação.','<b>Forecast</b> e próximos passos.']) + box('dica','Um semáforo ajuda. Exemplo fictício: verde até 5% acima, amarelo de 5% a 10%, vermelho acima de 10%.')},
  {h:"Comentário bom x ruim", b:tbl(['Ruim','Bom'],[['“Gasto maior que o previsto.”','“Manutenção +R$ 6.000: conserto urgente do gerador, não recorrente.”'],['“Verificar.”','“Nota de R$ 2.000 de maio lançada em abril: será reclassificada.”'],['“Economia.”','“Viagens −R$ 4.000: evento adiado para junho, o gasto vai acontecer.”']])},
  {h:"Confiável antes de bonito", b:ul(['Data de corte definida.','Total do relatório igual ao do sistema.','Mesma versão do orçamento em todas as abas.','Fórmulas ligadas à base, não números digitados.','Versão e data de atualização no arquivo.']),
   check:mc("O total do relatório não bate com o sistema. O que fazer?",["*Achar a diferença antes de enviar","Enviar e corrigir depois","Ajustar um número à mão para bater"],"Ajustar à mão esconde o erro. Encontre a causa.")}
 ],
 ex:[
  mc("Qual comentário é o melhor para o gestor?",["*“Manutenção +R$ 6.000: conserto urgente do gerador, não recorrente.”","“O gasto ficou maior do que o previsto neste mês, por motivos diversos da área.”","“Verificar com a área o que aconteceu com essa conta.”","“Manutenção estourou o orçamento e precisa ser revista.”"],"Valor, causa e se vai se repetir."),
  od("Ordene o relatório mensal:",["Resumo em três frases","Tabela por centro de custo","Comentários das variações relevantes","Forecast e próximos passos"],"Do essencial ao detalhe, terminando no que vem pela frente."),
  mc("Semáforo: verde até 5% acima, amarelo de 5% a 10%, vermelho acima de 10%. Um centro com previsto de R$ 20.000 e realizado de R$ 21.600 fica:",["*Amarelo","Verde","Vermelho","Sem cor"],"1.600 ÷ 20.000 = 8%."),
  cl("O comentário ajuda o gestor ou não?",["Ajuda","Não ajuda"],"Viagens −R$ 4.000: evento adiado para junho:0|Verificar:1|Energia +R$ 3.200: tarifa subiu, consumo caiu:0|Gasto maior:1|Nota de maio lançada em abril, será reclassificada:0","Bom comentário tem valor e causa, e diz o que vai acontecer."),
  tf("Se o total do relatório não bate com o sistema, é melhor enviar assim mesmo e corrigir depois.",false,"Relatório com total errado perde a confiança do gestor. Ache a diferença antes."),
  ep("Escreva o comentário para o gestor: Viagens teve previsto de R$ 30.000 e realizado de R$ 18.000, porque a cobertura de um evento foi adiada para junho.","Viagens ficou R$ 12.000 abaixo do previsto (−40%) porque a cobertura do evento foi adiada para junho. Não é economia: o gasto vai acontecer em junho, e o forecast já foi ajustado.",[["Valor ou percentual","12","40","abaixo","variac","reais"],["A causa","adiad","evento","cobertura","junho"],["Não é economia: o gasto vai acontecer","nao e economia","vai acontecer","vai ocorrer","sera gasto","depois","desloc"],["Ação ou forecast","forecast","previsao","ajust","acompanh","reprogram"]],"Valor, causa, se é economia de verdade e o que muda no forecast.")
 ]},

/* ================= Na prática: a Rede Capivara ================= */
{id:"orc12", title:"Rede Capivara: o fechamento de março", icon:"📺",
 goal:"Aplicar tudo num fechamento: calcular variações, escolher o que comentar e corrigir uma classificação.",
 recap:["Calcule a variação de cada centro e a do total.","Use o critério da empresa para decidir o que comentar.","Corrija o centro errado antes de concluir."],
 learn:[
  {h:"O caso", b:`<p>A <b>Rede Capivara</b> é um grupo <b>fictício</b>, criado para este exercício, com TV, rádio e portal. Você fecha o mês de março:</p>` + g(CAPIVARA) + box('regra','Critério da empresa: comentar variações acima de 5% e de R$ 5.000, para mais ou para menos.')},
  {h:"O que você descobriu", b:ul(['<b>Jornalismo</b>: diárias e combustível de uma cobertura especial.','<b>Técnica</b>: R$ 7.000 de conserto urgente do transmissor e R$ 2.000 de uma nota de equipamento do Jornalismo lançada por engano na Técnica.','<b>Programação</b>: a estreia de um programa foi adiada para maio.']) + box('dica','Primeiro corrija o centro errado. Só depois escreva os comentários.')},
  {h:"Treine na planilha", b:`<p>A aba Orçamento da planilha de treino tem outro caso de previsto x realizado para resolver com SOMASES:</p>` + download('/carreira/treino-excel-analista.xlsx','Baixar a planilha de treino (.xlsx)')}
 ],
 ex:[
  nu("Qual a variação total da Rede Capivara em março?" + g(CAPIVARA),16800,"516.800 − 500.000 = 16.800.","R$"),
  nu("Qual a variação da Técnica em %?" + g(CAPIVARA),10,"99.000 − 90.000 = 9.000. 9.000 ÷ 90.000 = 10%.","%"),
  mc("Critério: comentar variações acima de 5% e de R$ 5.000, para mais ou para menos. Na Rede Capivara, em março, quais centros precisam de comentário?" + g(CAPIVARA),["*Jornalismo, Programação e Técnica","Somente o centro de Jornalismo","Todos os centros da Rede Capivara","Comercial e Administrativo, apenas"],"Jornalismo +16.000 (+8,9%), Programação −7.200 (−6%) e Técnica +9.000 (+10%). Comercial e Administrativo não passam dos limites."),
  en("Na Rede Capivara, reclassifique a nota de equipamento de R$ 2.000 do Jornalismo que foi lançada na Técnica.","Equipamentos – Jornalismo","Equipamentos – Técnica",["Bancos","Fornecedores"],"Debita o centro certo e credita o errado."),
  nu("Na Rede Capivara, o Jornalismo tinha R$ 196.000 realizados. Depois de receber a nota de R$ 2.000 reclassificada da Técnica, qual o realizado do Jornalismo?",198000,"196.000 + 2.000 = 198.000.","R$"),
  nu("Na Rede Capivara, a Técnica tinha previsto de R$ 90.000 e realizado de R$ 99.000. Depois de tirar a nota de R$ 2.000 do Jornalismo, qual a variação da Técnica, em reais?",7000,"99.000 − 2.000 = 97.000. 97.000 − 90.000 = 7.000: o conserto urgente.","R$"),
  mc("A Programação ficou R$ 7.200 abaixo porque a estreia de um programa foi adiada para maio. Como comentar?",["*Não é economia: o gasto só foi adiado para maio","Economia de R$ 7.200 no ano, que pode ser usada em outra área","A área cortou custos e merece destaque no relatório do mês","Erro de lançamento, que deve ser corrigido antes do fechamento"],"Gasto adiado não é gasto evitado.")
 ]},
{id:"orc13", title:"Rede Capivara: forecast e plano de ação", icon:"🧭",
 goal:"Projetar o ano, medir o estouro previsto e propor um plano de ação ao gestor.",
 recap:["Forecast = realizado acumulado + projeção dos meses restantes.","Sobra de gasto adiado não cobre estouro de outra área.","Leve ao gestor o número, a causa e opções com custo."],
 learn:[
  {h:"O Jornalismo no ano", b:tbl(['Item','R$'],[['Orçamento anual (180.000 × 12)','2.160.000'],['Realizado: janeiro','186.000'],['Realizado: fevereiro','186.000'],['Realizado: março, já reclassificado','198.000']]) + `<p>Com as coberturas especiais já contratadas, a previsão é de R$ 190.000 por mês de abril a dezembro.</p>`},
  {h:"A conta do forecast", b:eq('Forecast = 570.000 + 9 × 190.000 = R$ 2.280.000') + `<p>Estouro previsto: 2.280.000 − 2.160.000 = <b>R$ 120.000</b>, cerca de 5,6% do orçamento.</p>`},
  {h:"O plano de ação", b:ul(['Avise o gestor agora, em abril, com o forecast.','Mostre a causa: coberturas especiais, com diárias e combustível.','Traga opções com valores: renegociar diárias e combustível, rever a escala das coberturas ou pedir suplementação aprovada.']) + box('atencao','Não use a “sobra” da Programação para cobrir o Jornalismo: aquele gasto só foi adiado para maio.')}
 ],
 ex:[
  nu("Na Rede Capivara, o Jornalismo realizou R$ 186.000 em janeiro, R$ 186.000 em fevereiro e R$ 198.000 em março. Qual o realizado acumulado?",570000,"186.000 + 186.000 + 198.000 = 570.000.","R$"),
  nu("Na Rede Capivara, o Jornalismo tem R$ 570.000 realizados até março e previsão de R$ 190.000 por mês de abril a dezembro. Qual o forecast do ano?",2280000,"570.000 + 9 × 190.000 = 2.280.000.","R$"),
  nu("Na Rede Capivara, o Jornalismo tem orçamento anual de R$ 2.160.000 e forecast de R$ 2.280.000. Qual o estouro previsto?",120000,"2.280.000 − 2.160.000 = 120.000.","R$"),
  nu("Estouro previsto de R$ 120.000 sobre um orçamento de R$ 2.160.000. Quanto é isso em %, com uma casa decimal?",5.6,"120.000 ÷ 2.160.000 ≈ 5,6%.","%",undefined,0.06),
  mc("A Programação está R$ 7.200 abaixo porque uma estreia foi adiada para maio. Usar essa “sobra” para cobrir o estouro do Jornalismo é:",["*Arriscado: o gasto vai acontecer em maio, então a sobra não é real","Uma boa solução, porque o total da empresa fica dentro do previsto","Obrigatório, porque orçamento sempre precisa fechar no zero","Indiferente, porque tudo depende só da vontade do gestor"],"Gasto adiado não libera verba de verdade."),
  mc("Qual é o melhor encaminhamento para o estouro previsto do Jornalismo?",["*Avisar já o gestor, com o forecast e opções com valores para renegociar ou rever a escala","Esperar o fim do ano para ver se o estouro se confirma de verdade, sem tomar nenhuma providência","Lançar parte dos gastos em outros centros de custo para o estouro desaparecer","Cortar a cobertura jornalística sem falar com ninguém para economizar logo"],"Número, causa e opções. A decisão é do gestor."),
  od("Ordene o plano de ação:",["Atualizar o forecast","Identificar a causa do estouro","Levantar opções com valores","Levar ao gestor para decidir","Acompanhar no mês seguinte"],"Do número à decisão, e depois o acompanhamento."),
  ep("Escreva o resumo de três frases do relatório de março da Rede Capivara para o diretor.","Março fechou R$ 16.800 acima do previsto (+3,4%), puxado pelas coberturas especiais do Jornalismo e por um conserto urgente na Técnica. A Programação ficou abaixo só porque uma estreia foi adiada para maio. O forecast do Jornalismo indica estouro de R$ 120.000 no ano, e trago opções para decidirmos.",[["Resultado total do mês","16.800","16800","3,4","acima","total","marco"],["Principais causas","jornalismo","cobertura","tecnica","conserto","transmissor"],["Gasto adiado não é economia","programac","adiad","maio","estreia"],["Forecast ou plano","forecast","120","estouro","opc","plano","decid"]],"Resultado, causas, o que não é economia e o que vem pela frente.")
 ]}
];
