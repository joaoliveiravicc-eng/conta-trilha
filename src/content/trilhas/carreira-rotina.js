/* Área Carreiras · Trilha: Notas, compras e contratos (rotina do Analista Administrativo Financeiro Jr).
   Complementa ent7-ent9 e ent12 (nível de entrevista) e fj13 (tabela de retenções).
   Fontes consultadas em 25/09/2026: Ajuste SINIEF 07/2005 (cláusulas 1ª, 12ª, 14ª-A e 15ª-A/C, com os
   Ajustes SINIEF 44/20 e 14/26); Manual de Orientação do Contribuinte da NF-e (chave de acesso);
   Lei 10.833/2003 arts. 30-32; RIR/2018 (Decreto 9.580) arts. 714 e 716; Lei 8.212/1991 art. 31;
   LC 116/2003 arts. 6º, 8º e 8º-A e lista anexa; LC 214/2025 arts. 62, 343, 344, 346, 347 e 348
   (com a LC 227/2026); Lei 10.192/2001 art. 2º. Empresas, CNPJs e valores de exemplo são fictícios. */
import { box, tbl, ul, ol, lanc } from '../render-helpers.js';
import { mc, tf, mt, cl, nu, od, ep, en } from '../../engine/exercises/factories.js';

const FONTE = d => '<p class="small muted">Fonte: ' + d + ', consultada em 25/09/2026.</p>';
const COTACAO = tbl(['Fornecedor','Preço + frete','Entrega','Pagamento'],[['A','10.000 + 800','20 dias','30 dias'],['B','10.300, frete grátis','7 dias','30 dias'],['C','9.800 + 900','15 dias','À vista']]);
const CONTRATO = tbl(['Item','Situação'],[['Objeto','Manutenção predial, R$ 12.000 por mês'],['Vigência','01/10/2025 a 30/09/2026'],['Renovação','Automática, salvo aviso com 30 dias de antecedência'],['Reajuste','Anual, pelo IPCA, na data-base de outubro'],['SLA','Glosa de 3% por mês com atendimento fora do prazo']]);

export default [
/* ================= Notas fiscais por dentro ================= */
{id:"rot1", title:"Os tipos de nota", icon:"🧾",
 goal:"Reconhecer NF-e, NFC-e, NFS-e, CT-e e DANFE, e saber o que cada um documenta.",
 recap:["NF-e (modelo 55) documenta mercadorias; NFC-e (modelo 65), vendas no varejo ao consumidor.","NFS-e documenta serviços; desde 2026 os municípios precisam aceitar o padrão nacional ou compartilhar os dados.","O DANFE é só a representação impressa: a nota é o arquivo digital (XML)."],
 learn:[
  {h:"Cada operação, seu documento", b:tbl(['Documento','Para quê'],[['NF-e (modelo 55)','Venda e circulação de mercadorias'],['NFC-e (modelo 65)','Venda no varejo ao consumidor final'],['NFS-e','Prestação de serviços, com regras do município'],['CT-e','Transporte de cargas']]) + box('dica','Nota de mercadoria e nota de serviço seguem regras diferentes. A de serviço depende da prefeitura.')},
  {h:"A nota é o arquivo, não o papel", b:`<p>A NF-e é um documento “de existência apenas digital”, validado pela assinatura do emitente e pela autorização da Secretaria da Fazenda. O <b>DANFE</b> (Documento Auxiliar da NF-e) é só a representação impressa, que acompanha a mercadoria e traz a chave de acesso.</p>` + box('regra','Guarde o XML. É ele que vale como nota fiscal, não o PDF nem a foto do DANFE.') + FONTE('Ajuste SINIEF 07/2005, cláusula primeira')},
  {h:"NFS-e de padrão nacional", b:`<p>Desde 1º de janeiro de 2026, os municípios precisam permitir a emissão da NFS-e de padrão nacional ou, se tiverem emissor próprio, compartilhar as notas com o ambiente nacional. Na prática, mais notas de serviço seguem um mesmo leiaute, já com os campos de IBS e CBS.</p>` + FONTE('LC 214/2025, art. 62, § 1º')}
 ],
 ex:[
  mt([["NF-e","Mercadorias"],["NFC-e","Varejo ao consumidor"],["NFS-e","Serviços"],["CT-e","Transporte de cargas"]],"Cada documento fiscal eletrônico tem o seu uso."),
  tf("O DANFE impresso é a própria nota fiscal eletrônica.",false,"O DANFE só representa a NF-e. A nota é o arquivo digital, o XML."),
  mc("Numa compra de mercadoria, qual arquivo você guarda como a nota fiscal?",["*O XML da NF-e","Só a foto do DANFE","O boleto","O pedido de compra"],"A NF-e existe só em meio digital. O XML é o documento."),
  mc("Um consultor mandou a nota do serviço prestado. Que documento é?",["*NFS-e","NF-e modelo 55","NFC-e","CT-e"],"Serviço é documentado pela nota fiscal de serviço."),
  cl("A compra vem com NF-e (mercadoria) ou NFS-e (serviço)?",["NF-e","NFS-e"],"Compra de 50 cadeiras:0|Manutenção do ar-condicionado:1|Consultoria jurídica:1|Compra de cabos e conectores:0|Limpeza do escritório:1|Compra de toner:0","Mercadoria circula com NF-e; serviço é documentado por NFS-e."),
  mc("Desde 2026, pela LC 214/2025, os municípios precisam:",["*Permitir a NFS-e de padrão nacional ou compartilhar suas notas com o ambiente nacional","Parar de cobrar ISS","Usar a NF-e para serviços","Acabar com a nota de serviço"],"É o art. 62 da LC 214/2025, que prepara o terreno para o IBS e a CBS."),
  tf("O modelo 65 identifica a NFC-e, usada nas vendas ao consumidor final.",true,"O modelo 55 é a NF-e; o 65, a NFC-e.")
 ]},
{id:"rot2", title:"Chave de acesso e consulta", icon:"🔑",
 goal:"Ler a chave de acesso, consultar a nota e reconhecer se ela está autorizada ou cancelada.",
 recap:["A chave tem 44 números e identifica uma única nota.","Ela junta UF, ano e mês, CNPJ do emitente, modelo, série, número, tipo de emissão, código e dígito verificador.","Antes de lançar, confira se a nota está autorizada e sem cancelamento."],
 learn:[
  {h:"44 números que contam a história", b:tbl(['Parte','Dígitos','Exemplo (fictício)'],[['Código da UF','2','41 (Paraná)'],['Ano e mês','4','2609'],['CNPJ do emitente','14','12345678000199'],['Modelo','2','55'],['Série','3','001'],['Número da nota','9','000004521'],['Tipo de emissão','1','1'],['Código numérico','8','12345678'],['Dígito verificador','1','0']]) + FONTE('Manual de Orientação do Contribuinte da NF-e')},
  {h:"Consulte antes de lançar", b:ul(['A consulta pela chave, no Portal da NF-e ou no sistema da empresa, mostra o <b>status</b> e os <b>eventos</b> da nota.','<b>Autorizada</b>: pode seguir para a conferência.','<b>Cancelada</b>: não lance nem pague.','<b>Uso denegado</b>: irregularidade cadastral; a nota não vale.']) + box('dica','Quase todo ERP consulta sozinho ao importar o XML. Mesmo assim, olhe se há carta de correção ou cancelamento registrado.')},
  {h:"Pistas que a chave dá", b:ul(['Os 2 primeiros dígitos dizem o estado do emitente: 41 é o Paraná; 35, São Paulo.','Os 4 seguintes, o ano e o mês da emissão.','Do 7º ao 20º dígito vem o CNPJ do emitente. Se não for o do fornecedor do pedido, algo está errado.']),
   check:mc("Numa chave que começa com 412609…, a nota foi emitida:",["*No Paraná, em setembro de 2026","Em São Paulo, em 2041","Em qualquer estado, em 2009"],"41 é o Paraná; 2609 é o ano e o mês.")}
 ],
 ex:[
  nu("Quantos dígitos tem a chave de acesso de uma NF-e?",44,"UF, ano e mês, CNPJ, modelo, série, número, tipo de emissão, código numérico e dígito verificador.","dígitos"),
  mc("Na chave de acesso de uma NF-e, os dígitos 3 a 6 são “2609”. Isso indica:",["*Setembro de 2026, o mês da emissão","O número da nota","A série 2609","O estado do emitente"],"Depois do código da UF vêm o ano e o mês (AAMM)."),
  mc("A chave de acesso mostra um CNPJ diferente do fornecedor do pedido. O que fazer?",["*Não lançar e verificar com compras e com o fornecedor: a nota pode ser de outro emitente","Lançar assim mesmo","Trocar o fornecedor no sistema","Pagar e investigar depois"],"O CNPJ na chave é o de quem emitiu a nota."),
  cl("Consultada pela chave, a NF-e pode seguir para lançamento?",["Pode seguir","Não lance"],"Autorizada, sem eventos:0|Cancelada:1|Uso denegado:1|Autorizada, com carta de correção de endereço:0","Só nota autorizada vale. A carta de correção fica guardada junto com a nota."),
  tf("O número 55 na posição do modelo indica uma NF-e.",true,"55 é a NF-e; 65, a NFC-e."),
  mc("O fornecedor mandou só o PDF do DANFE. O que pedir?",["*O XML da nota, que é o documento fiscal","Nada: o PDF basta","Uma foto da nota","O boleto"],"Sem o XML, a empresa não tem a nota de fato."),
  od("Ordene a checagem de uma NF-e recebida:",["Importar o XML","Consultar o status pela chave","Verificar eventos, como cancelamento ou correção","Seguir para a conferência com o pedido"],"Primeiro a nota existe e vale; depois, se está certa.")
 ]},
{id:"rot3", title:"CFOP, NCM e código de serviço", icon:"🔢",
 goal:"Entender o que CFOP, NCM e código de serviço dizem sobre a operação.",
 recap:["CFOP: o primeiro dígito diz se é entrada (1, 2, 3) ou saída (5, 6, 7) e de onde para onde.","NCM: 8 dígitos que classificam a mercadoria.","Na nota de serviço, o item da lista da LC 116 e o município orientam o ISS."],
 learn:[
  {h:"CFOP: o tipo da operação", b:`<p>O <b>CFOP</b> (Código Fiscal de Operações e Prestações) tem 4 dígitos. O primeiro diz a direção:</p>` + tbl(['1º dígito','Significado'],[['1','Entrada do mesmo estado'],['2','Entrada de outro estado'],['3','Entrada do exterior'],['5','Saída para o mesmo estado'],['6','Saída para outro estado'],['7','Saída para o exterior']]) + box('exemplo','Um fornecedor de São Paulo vende para a sua empresa em Curitiba: a nota dele vem com CFOP 6.xxx. Na sua entrada, o sistema registra um CFOP 2.xxx.')},
  {h:"NCM: a identidade da mercadoria", b:`<p>A <b>NCM</b> (Nomenclatura Comum do Mercosul) tem 8 dígitos e classifica cada mercadoria. Ela orienta a tributação do produto.</p>` + box('dica','Se a mesma mercadoria chegar com uma NCM diferente da de sempre, pergunte ao fiscal antes de lançar.')},
  {h:"Nota de serviço: item e município", b:`<p>Na NFS-e, o que orienta o ISS é o <b>item da lista da LC 116</b> e o <b>município</b>. Alguns exemplos:</p>` + tbl(['Item','Serviço'],[['7.10','Limpeza e conservação de imóveis'],['11.02','Vigilância e segurança'],['17.05','Fornecimento de mão de obra']]) + `<p>A alíquota do ISS vai de 2% a 5%, conforme a cidade.</p>` + FONTE('LC 116/2003, lista anexa e arts. 8º e 8º-A')}
 ],
 ex:[
  cl("O CFOP é de entrada ou de saída?",["Entrada","Saída"],"CFOP 1.102:0|CFOP 5.102:1|CFOP 2.102:0|CFOP 6.102:1|CFOP 3.102:0|CFOP 7.102:1","1, 2 e 3 são entradas; 5, 6 e 7, saídas."),
  mc("Um fornecedor de São Paulo vende para uma empresa de Curitiba. Na nota do fornecedor, o CFOP começa com:",["*6, saída para outro estado","5, saída no mesmo estado","2, entrada de outro estado","1, entrada no mesmo estado"],"Para quem emite, é uma saída interestadual."),
  mc("Uma empresa de Curitiba compra de um fornecedor de São Paulo. Na entrada dela, o CFOP começa com:",["*2, entrada de outro estado","1, entrada do mesmo estado","6, saída para outro estado","3, entrada do exterior"],"Para quem recebe, é uma entrada interestadual."),
  nu("Quantos dígitos tem a NCM de uma mercadoria?",8,"A Nomenclatura Comum do Mercosul tem 8 dígitos.","dígitos"),
  mc("O que a NCM classifica?",["*A mercadoria","O serviço","O fornecedor","A forma de pagamento"],"É a identidade fiscal do produto."),
  tf("Na nota de serviço, o item da lista da LC 116 e o município ajudam a saber se há ISS retido.",true,"A LC 116 e a lei da cidade definem quem recolhe o ISS."),
  mt([["CFOP","Tipo e direção da operação"],["NCM","Classificação da mercadoria"],["Item da LC 116","Tipo do serviço"],["Chave de acesso","Identidade única da NF-e"]],"Os códigos que aparecem nas notas.")
 ]},
{id:"rot4", title:"Manifestação do destinatário", icon:"📣",
 goal:"Usar os eventos de manifestação para confirmar, recusar ou negar notas emitidas contra a sua empresa.",
 recap:["Ciência da Emissão é só o aviso de que a nota foi vista.","Confirmação, Operação não Realizada e Desconhecimento são as respostas conclusivas.","Desde 01/06/2026, as respostas conclusivas cabem em até 90 dias da autorização da nota."],
 learn:[
  {h:"Os quatro eventos", b:tbl(['Evento','Quando usar'],[['Ciência da Emissão','Você sabe que a nota existe, mas ainda não pode concluir'],['Confirmação da Operação','A operação aconteceu exatamente como na nota'],['Operação não Realizada','A operação é sua, mas não aconteceu ou não aconteceu como descrito'],['Desconhecimento da Operação','Ninguém da empresa pediu aquilo']]) + FONTE('Ajuste SINIEF 07/2005, cláusula décima quinta-A')},
  {h:"O prazo mudou", b:`<p>Confirmação, Operação não Realizada e Desconhecimento podem ser registrados em até <b>90 dias</b> da autorização da NF-e. Cada evento pode ser registrado até duas vezes, e vale o mais recente.</p>` + box('atencao','Até 31/05/2026 o prazo era de 180 dias. Muito material ainda cita o prazo antigo.') + FONTE('Ajuste SINIEF 07/2005, cláusula décima quinta-C, na redação do Ajuste SINIEF 14/26')},
  {h:"Por que isso protege a empresa", b:ul(['O <b>Desconhecimento</b> registra que a empresa não fez aquela compra. É a defesa contra nota fria emitida contra o seu CNPJ.','A <b>Operação não Realizada</b> documenta recusas e pedidos cancelados.','Muitos sistemas registram a Ciência sozinhos, para baixar o XML das notas destinadas.']) + box('dica','Consulte com frequência as notas emitidas contra o CNPJ da empresa. É assim que se descobre a nota que ninguém pediu.')}
 ],
 ex:[
  cl("Qual evento de manifestação registrar?",["Confirmação","Não realizada","Desconhecimento"],"A mercadoria chegou exatamente como na nota:0|A entrega foi recusada por avaria:1|Nota de um fornecedor com quem a empresa nunca negociou:2|O pedido foi cancelado e a mercadoria não veio:1|Tudo recebido e conferido:0","Confirmação quando deu certo; não realizada quando não aconteceu; desconhecimento quando ninguém pediu."),
  mc("O evento Ciência da Emissão significa:",["*Que a empresa sabe que a nota existe, mas ainda não concluiu se a operação ocorreu","Que a mercadoria foi recebida e conferida","Que a nota foi cancelada","Que o fornecedor foi pago"],"É um aviso de recebimento da informação, não uma conclusão."),
  nu("Desde 01/06/2026, em até quantos dias da autorização da NF-e se registra a Confirmação, o Desconhecimento ou a Operação não Realizada?",90,"Era 180 dias até 31/05/2026. O Ajuste SINIEF 14/26 reduziu para 90.","dias"),
  tf("Desconhecimento da Operação é o evento para uma nota emitida contra o CNPJ da empresa por algo que ninguém pediu.",true,"Ele registra que a empresa não reconhece aquela operação."),
  mc("Uma NF-e de R$ 30.000 de um fornecedor desconhecido aparece entre as notas destinadas à empresa. O que fazer?",["*Confirmar com compras e, se ninguém pediu, registrar Desconhecimento da Operação","Lançar e pagar","Ignorar, porque não foi pedida","Registrar Confirmação da Operação"],"Sem manifestação, a nota fica no nome da empresa como se a compra fosse real."),
  od("Ordene o tratamento de uma nota destinada à empresa:",["Localizar a nota emitida contra o CNPJ","Verificar com compras se há pedido","Conferir o recebimento","Registrar o evento conclusivo"],"Descobrir, verificar, conferir e responder.")
 ]},

/* ================= Quando a nota vem errada ================= */
{id:"rot5", title:"Carta de correção: pode e não pode", icon:"✏️",
 goal:"Decidir quando a carta de correção resolve e quando é preciso outro caminho.",
 recap:["A CC-e não corrige imposto, valor, quantidade, as partes, datas nem parcelas de venda a prazo.","Ela serve para erros que não mexem nisso, como dados do transportador.","Quem emite a CC-e é o emitente da nota; com várias, a última consolida todas."],
 learn:[
  {h:"O que a CC-e não pode corrigir", b:ul(['Variáveis do imposto: base de cálculo, alíquota, diferença de preço, quantidade, valor da operação.','Dados cadastrais que mudem quem vende ou quem compra.','Data de emissão ou de saída.','Campos da nota de exportação informados na DU-E.','Inclusão ou alteração de parcelas de vendas a prazo.']) + FONTE('Ajuste SINIEF 07/2005, cláusula décima quarta-A')},
  {h:"O que ela resolve", b:ul(['Erros que não mexem no imposto nem nas partes: dados do transportador, informações complementares, endereço digitado errado sem trocar o destinatário.','Com mais de uma CC-e para a mesma nota, a última precisa consolidar todas as correções anteriores.']) + box('regra','Quem emite a CC-e é o emitente da nota, ou seja, o fornecedor. Você confere se ela foi registrada e guarda o XML do evento com a nota.')}
 ],
 ex:[
  cl("Na NF-e, o erro cabe em carta de correção?",["Cabe CC-e","Não cabe"],"Nome do transportador errado:0|Valor unitário menor que o combinado:1|Parcelas de venda a prazo a incluir:1|Data de saída errada:1|Complemento do endereço de entrega:0|Base de cálculo do ICMS errada:1","Se mexe no imposto, no valor, nas partes, nas datas ou nas parcelas, a CC-e não serve."),
  tf("A empresa que recebeu a NF-e pode emitir a carta de correção.",false,"Só o emitente da nota pode emitir a CC-e."),
  mc("O fornecedor emitiu três cartas de correção para a mesma NF-e. Qual vale?",["*A última, que precisa consolidar todas as correções anteriores","A primeira","Todas, somadas","Nenhuma"],"É a regra do § 4º da cláusula décima quarta-A."),
  mc("A NF-e veio com a data de saída errada. Cabe carta de correção?",["*Não: data de emissão ou de saída não pode ser corrigida por CC-e","Sim, sempre","Sim, se o valor não mudar","Só com autorização do cliente"],"Datas estão entre as vedações."),
  mc("A NF-e de R$ 12.000 deveria ser de R$ 10.000. Qual o caminho?",["*O fornecedor cancela e emite outra nota, se ainda estiver no prazo; se não, trata-se por devolução ou recusa","Carta de correção com o valor certo","Lançar R$ 10.000 e ignorar a diferença","Pagar R$ 12.000 e pedir desconto depois"],"Valor não se corrige por CC-e."),
  od("Ordene o tratamento de um erro que cabe em carta de correção:",["Identificar o erro","Pedir a CC-e ao fornecedor","Consultar o evento pela chave","Guardar o XML da CC-e com a nota"],"A correção só existe depois de registrada.")
 ]},
{id:"rot6", title:"Cancelar, recusar ou devolver", icon:"↩️",
 goal:"Escolher entre cancelamento, recusa, devolução e nota complementar.",
 recap:["O emitente cancela a NF-e em até 24 horas da autorização, se a mercadoria não circulou.","Recusa: a mercadoria nem entra. Devolução: entrou e volta, com nota de devolução.","Nota complementar acrescenta valor ou imposto que ficou faltando."],
 learn:[
  {h:"Cancelamento: prazo curto", b:`<p>O emitente pode cancelar a NF-e em até <b>24 horas</b> da autorização, desde que a mercadoria não tenha circulado nem o serviço tenha sido prestado. Passado isso, a nota não se cancela: o problema se resolve com devolução, recusa ou nota complementar.</p>` + FONTE('Ajuste SINIEF 07/2005, cláusula décima segunda')},
  {h:"Recusa, devolução e complemento", b:tbl(['Situação','Caminho'],[['A mercadoria chega errada e nem entra','Recusa no recebimento e evento de Operação não Realizada'],['A mercadoria entrou e precisa voltar','Devolução: em geral, quem devolve emite a nota de devolução, citando a nota original'],['Faltou valor ou imposto na nota','O emitente faz uma nota complementar com a diferença']]) + box('dica','Na dúvida sobre qual nota emitir numa devolução, confirme com o fiscal. As regras variam conforme o tipo de operação.')}
 ],
 ex:[
  cl("Qual caminho resolve o caso?",["Cancelar","Devolver","Complementar"],"Nota emitida há 3 horas, mercadoria ainda no fornecedor:0|Mercadoria recebida com defeito, precisa voltar:1|Nota saiu com preço menor que o combinado:2|Nota duplicada emitida hoje, nada saiu do estoque:0|Parte do lote veio errada e foi devolvida:1","Cancelamento só no prazo e sem circulação; depois, devolução ou complemento."),
  nu("Em até quantas horas da autorização o emitente pode cancelar uma NF-e, se a mercadoria não circulou?",24,"É a regra geral da cláusula décima segunda do Ajuste SINIEF 07/2005.","horas"),
  mc("A NF-e foi autorizada há dois dias, e a mercadoria já chegou com valor acima do combinado. O fornecedor pode cancelar a nota?",["*Não: passou do prazo e a mercadoria circulou; resolve-se com devolução ou outro procedimento","Sim, a qualquer momento","Sim, se a empresa pedir","Só com carta de correção"],"Depois de 24 horas ou da circulação, não há cancelamento."),
  tf("A nota complementar serve para acrescentar valor ou imposto que faltou na nota original.",true,"Ela complementa, nunca reduz."),
  mc("Na recusa da mercadoria no recebimento, qual evento de manifestação combina?",["*Operação não Realizada","Confirmação da Operação","Ciência da Emissão","Desconhecimento da Operação"],"A operação é da empresa, mas não se efetivou."),
  mc("Numa compra entre empresas, quem costuma emitir a nota de devolução?",["*A empresa que devolve a mercadoria, citando a nota original","O banco","A transportadora","Ninguém: basta devolver"],"A devolução também é uma operação e precisa de documento.")
 ]},
{id:"rot7", title:"Notas de serviço com problema", icon:"🛠️",
 goal:"Tratar erros em notas de serviço, sabendo que as regras dependem do município.",
 recap:["A NFS-e segue regras do município: não há o prazo único de 24 horas da NF-e.","Confira tomador, competência, item da LC 116, município, valor, alíquota e retenções.","Nota errada: peça ao prestador o cancelamento ou a substituição, conforme as regras da cidade."],
 learn:[
  {h:"Cada cidade, suas regras", b:`<p>Prazo de cancelamento, substituição e correção da NFS-e dependem do município. A padronização nacional está avançando, mas não existe o prazo único de 24 horas da NF-e.</p>`},
  {h:"O que conferir numa nota de serviço", b:ul(['<b>Tomador</b>: o CNPJ da empresa certa do grupo.','<b>Competência</b>: o mês em que o serviço foi prestado.','<b>Item da LC 116</b> e <b>município</b> do serviço.','<b>Valor</b> igual ao contrato ou à medição aprovada.','<b>Alíquota do ISS</b> e <b>retenções</b> destacadas.'])},
  {h:"Quando algo está errado", b:ul(['Peça ao prestador o cancelamento e uma nova nota, ou a substituição, conforme as regras da cidade.','Não lance valor diferente do aprovado na medição.','Se as retenções vierem erradas, acerte antes de pagar: quem paga responde pelo que devia reter.'])}
 ],
 ex:[
  tf("A NFS-e tem um prazo nacional único de 24 horas para cancelamento, igual ao da NF-e.",false,"Na NFS-e, as regras são do município."),
  mc("A medição aprovada foi de R$ 18.000, mas a NFS-e veio de R$ 20.000. O que fazer?",["*Não lançar e pedir ao prestador o cancelamento ou a substituição da nota pelo valor medido","Lançar R$ 20.000","Lançar R$ 18.000 e ignorar a nota","Pagar a diferença no mês seguinte"],"A nota precisa refletir o que foi aprovado."),
  cl("Isto aparece para conferir numa NFS-e?",["Conferir","Não se aplica"],"CNPJ do tomador:0|Competência do serviço:0|Item da LC 116 e município:0|NCM da mercadoria:1|Retenções destacadas:0|Canhoto de entrega:1","NCM e canhoto são de mercadoria, não de serviço."),
  mc("A nota de consultoria veio com competência de maio, mas o serviço foi prestado em abril. Por que isso importa?",["*A despesa e os tributos seguem a competência: o mês errado distorce o fechamento e as apurações","Não importa, o valor é o mesmo","Só importa para o fornecedor","Só muda a data do pagamento"],"Competência é o mês do fato, não o da emissão."),
  mc("A NFS-e de vigilância veio sem ISS retido. O serviço é o item 11.02 da LC 116. O que fazer?",["*Verificar com o fiscal: pela LC 116, a empresa tomadora responde pelo ISS desse serviço","Pagar o valor cheio e esquecer","Reter 11% de ISS","Devolver o serviço"],"Vigilância está na lista do art. 6º, § 2º, II, da LC 116."),
  od("Ordene o tratamento de uma NFS-e com erro:",["Identificar o erro","Avisar o prestador","Pedir o cancelamento ou a substituição","Conferir a nova nota antes de lançar"],"Nota errada não entra no sistema.")
 ]},

/* ================= Retenções e Reforma Tributária ================= */
{id:"rot8", title:"Qual retenção se aplica?", icon:"🧮",
 goal:"Decidir, nota a nota, quais retenções federais e de ISS se aplicam.",
 recap:["Pergunte: que serviço é, se o fornecedor é do Simples e o que diz a lei do ISS.","Serviços profissionais: IRRF 1,5%. Limpeza, vigilância e mão de obra: IRRF 1%. PIS, COFINS e CSLL: 4,65%.","Fornecedor do Simples Nacional não sofre retenção de PIS, COFINS e CSLL."],
 learn:[
  {h:"Três perguntas antes de pagar", b:ol(['Que serviço é?','O fornecedor é do Simples Nacional?','O que a LC 116 e a lei do município dizem sobre o ISS?']) + box('dica','Registre a resposta no cadastro do fornecedor ou do serviço. Assim ninguém recalcula do zero a cada nota.')},
  {h:"Retenções federais por serviço", b:tbl(['Serviço','Retenções federais comuns'],[['Consultoria, auditoria, engenharia e outros serviços profissionais','IRRF 1,5% e PIS, COFINS e CSLL 4,65%'],['Limpeza, conservação, vigilância, locação de mão de obra','IRRF 1% e PIS, COFINS e CSLL 4,65%'],['Manutenção','PIS, COFINS e CSLL 4,65%'],['Cessão de mão de obra','Também INSS de 11%']]) + box('atencao','Pagamentos a fornecedor do Simples Nacional não sofrem retenção de PIS, COFINS e CSLL. Casos fora destes exemplos: confirme com o fiscal.') + FONTE('Lei 10.833/2003, arts. 30 a 32; RIR/2018, arts. 714 e 716; Lei 8.212/1991, art. 31')},
  {h:"ISS: a LC 116 e a cidade", b:`<p>A empresa tomadora responde pelo ISS de alguns serviços listados na própria LC 116, como limpeza e conservação de imóveis (7.10), vigilância (11.02) e fornecimento de mão de obra (17.05). Nos demais casos, vale a lei do município.</p>` + FONTE('LC 116/2003, art. 6º, § 2º, II')}
 ],
 ex:[
  cl("Fornecedor fora do Simples, sem contar INSS e ISS: que retenções federais se aplicam?",["Só 4,65%","1,5% + 4,65%","1% + 4,65%"],"Consultoria tributária:1|Auditoria:1|Vigilância:2|Limpeza:2|Manutenção de equipamentos:0","Profissionais: 1,5%; limpeza e vigilância: 1%; manutenção, em regra, só PIS, COFINS e CSLL."),
  nu("Nota de auditoria de R$ 8.000, de um fornecedor fora do Simples. Quanto se retém de IRRF (1,5%)?",120,"1,5% de 8.000 = 120.","R$"),
  nu("Nota de auditoria de R$ 8.000, de um fornecedor fora do Simples. Quanto se retém de PIS, COFINS e CSLL juntos (4,65%)?",372,"4,65% de 8.000 = 372.","R$"),
  mc("O fornecedor de consultoria é optante do Simples Nacional. E a retenção de PIS, COFINS e CSLL?",["*Não se retém","Retém 4,65% normalmente","Retém em dobro","Retém só a CSLL"],"A Lei 10.833/2003, art. 32, afasta a retenção nos pagamentos a optantes do Simples."),
  mc("Serviço de vigilância prestado a uma empresa. Pela LC 116, quem responde pelo ISS?",["*A empresa tomadora do serviço","Só o prestador","O banco","Ninguém"],"Vigilância (11.02) está na lista do art. 6º, § 2º, II."),
  tf("O INSS de 11% é retido nos serviços prestados com cessão de mão de obra.",true,"É o art. 31 da Lei 8.212/1991."),
  od("Ordene a análise de uma nota de serviço antes de pagar:",["Identificar o serviço","Ver se o fornecedor é do Simples","Checar a regra do ISS","Calcular e registrar as retenções"],"Serviço, regime, município e cálculo.")
 ]},
{id:"rot9", title:"Dispensas e valores pequenos", icon:"🪙",
 goal:"Aplicar a dispensa de retenção de pequeno valor e fugir de regras desatualizadas.",
 recap:["PIS, COFINS e CSLL: retenção de até R$ 10 é dispensada.","A antiga dispensa para pagamentos de até R$ 5.000 não vale mais.","Confira o destaque da nota com a alíquota antes de pagar."],
 learn:[
  {h:"Retenção de até R$ 10 é dispensada", b:`<p>Na retenção de PIS, COFINS e CSLL, a lei dispensa o valor retido igual ou inferior a <b>R$ 10,00</b>.</p>` + tbl(['Nota','4,65%','Retém?'],[['R$ 200','R$ 9,30','Não'],['R$ 300','R$ 13,95','Sim']]) + FONTE('Lei 10.833/2003, art. 31, § 3º, na redação da Lei 13.137/2015')},
  {h:"Cuidado com a regra antiga", b:`<p>Até 2015, a dispensa valia para pagamentos de até R$ 5.000, somando o que se pagava no mês ao mesmo fornecedor. A Lei 13.137/2015 trocou isso pelo limite de R$ 10 no valor retido e revogou a soma mensal.</p>` + box('atencao','Material antigo na internet ainda fala em R$ 5.000. Desconfie de tabelas sem data.')},
  {h:"Confira o destaque da nota", b:ul(['Calcule cada retenção sobre o valor bruto da nota.','Compare com o que o fornecedor destacou.','Se não bater, fale com o fornecedor antes de pagar.'])}
 ],
 ex:[
  nu("Nota de manutenção de R$ 200. Quanto daria a retenção de PIS, COFINS e CSLL (4,65%)?",9.3,"4,65% de 200 = 9,30.","R$"),
  mc("Nota de manutenção de R$ 200: a retenção de PIS, COFINS e CSLL daria R$ 9,30. Ela é feita?",["*Não: retenção de até R$ 10 é dispensada","Sim, sempre","Sim, somando com o mês","Só se o fornecedor pedir"],"O limite de dispensa é o valor retido de até R$ 10."),
  cl("A retenção de PIS, COFINS e CSLL (4,65%) é feita ou dispensada?",["Retém","Dispensada"],"Nota de R$ 150:1|Nota de R$ 1.000:0|Nota de R$ 210:1|Nota de R$ 400:0","150 → 6,98; 1.000 → 46,50; 210 → 9,77; 400 → 18,60. Só retém acima de R$ 10."),
  tf("Hoje, a retenção de PIS, COFINS e CSLL é dispensada para pagamentos de até R$ 5.000.",false,"Essa regra foi trocada em 2015 pelo limite de R$ 10 no valor retido."),
  nu("Qual o menor valor de nota, em reais inteiros, em que a retenção de 4,65% passa de R$ 10?",216,"215 × 4,65% = 9,9975, ainda dispensada. 216 × 4,65% = 10,04: retém.","R$"),
  mc("A nota destaca R$ 50 de PIS, COFINS e CSLL retidos, mas 4,65% de R$ 1.000 dá R$ 46,50. O que fazer?",["*Falar com o fornecedor antes de pagar: o destaque não bate com a alíquota","Pagar como está","Reter R$ 50 e esquecer","Não reter nada"],"Retenção errada é problema de quem paga.")
 ]},
{id:"rot10", title:"Do bruto ao líquido: o lançamento", icon:"📒",
 goal:"Calcular todas as retenções de uma nota e fazer o lançamento com as contas a recolher.",
 recap:["Cada retenção vira uma conta de tributo a recolher.","O fornecedor recebe o valor líquido.","INSS retido: recolher até o dia 20 do mês seguinte à emissão da nota."],
 learn:[
  {h:"Vigilância de R$ 20.000", b:`<p>Nota de vigilância com cessão de mão de obra, fornecedor fora do Simples. ISS retido com alíquota de exemplo de 5%:</p>` + tbl(['Retenção','Cálculo','R$'],[['INSS','11% × 20.000','2.200'],['IRRF','1% × 20.000','200'],['PIS, COFINS e CSLL','4,65% × 20.000','930'],['ISS (exemplo)','5% × 20.000','1.000'],['<b>Total retido</b>','','<b>4.330</b>'],['<b>Líquido ao fornecedor</b>','','<b>15.670</b>']])},
  {h:"O lançamento", b:lanc([['D','Despesa com vigilância','20.000'],['C','Fornecedores','15.670'],['C','INSS retido a recolher','2.200'],['C','IRRF a recolher','200'],['C','PIS/COFINS/CSLL a recolher','930'],['C','ISS retido a recolher','1.000']]) + box('regra','A despesa é o valor bruto da nota. As retenções não são desconto: são tributo do fornecedor que a empresa passa a dever ao governo.')},
  {h:"Depois do lançamento", b:ul(['Paga-se o <b>líquido</b> ao fornecedor.','Cada retenção vira uma guia com prazo próprio. O INSS retido vence até o dia 20 do mês seguinte ao da emissão da nota.','No fechamento, depois de pagas as guias, as contas a recolher devem zerar.']) + FONTE('Lei 8.212/1991, art. 31')}
 ],
 ex:[
  nu("Nota de vigilância de R$ 20.000: INSS 11%, IRRF 1%, PIS/COFINS/CSLL 4,65% e ISS 5%. Qual o total retido?",4330,"2.200 + 200 + 930 + 1.000 = 4.330.","R$"),
  nu("Nota de vigilância de R$ 20.000 com R$ 4.330 de retenções. Quanto se paga ao fornecedor?",15670,"20.000 − 4.330 = 15.670.","R$"),
  nu("Nota de R$ 20.000 de serviço com cessão de mão de obra. Quanto se retém de INSS (11%)?",2200,"11% de 20.000 = 2.200.","R$"),
  en("Lance a nota de vigilância de R$ 20.000 com retenções de INSS, IRRF, PIS/COFINS/CSLL e ISS.","Despesa com vigilância","Fornecedores+INSS retido a recolher+IRRF a recolher+PIS/COFINS/CSLL a recolher+ISS retido a recolher",["Bancos","Receita de serviços"],"A despesa é o bruto; o fornecedor fica com o líquido e cada retenção vira um tributo a recolher."),
  nu("Até que dia do mês seguinte ao da emissão da nota deve ser recolhido o INSS retido de 11%?",20,"Lei 8.212/1991, art. 31: até o dia 20, ou o dia útil anterior.","dia"),
  tf("Depois de pagas as guias, as contas de tributos retidos a recolher devem ficar zeradas.",true,"Saldo sobrando indica guia não paga ou retenção lançada errada."),
  mc("Na nota de vigilância de R$ 20.000 com R$ 4.330 de retenções, qual é a despesa lançada?",["*R$ 20.000, o valor bruto","R$ 15.670, o líquido","R$ 4.330","R$ 24.330"],"As retenções são tributo do fornecedor, não desconto na despesa.")
 ]},
{id:"rot11", title:"CBS e IBS em 2026", icon:"🧭",
 goal:"Entender o que a Reforma Tributária muda nas notas em 2026 e nos anos seguintes.",
 recap:["2026 é ano de teste: CBS de 0,9% e IBS de 0,1% destacados nas notas.","Quem cumpre as obrigações acessórias fica dispensado de recolher; PIS e COFINS seguem normais.","As alíquotas de teste não se aplicam ao Simples Nacional."],
 learn:[
  {h:"O ano de teste", b:ul(['<b>CBS</b> (federal): 0,9% em 2026.','<b>IBS</b> (estados e municípios): 0,1% em 2026.','Quem cumpre as obrigações acessórias, como preencher os campos novos das notas, fica <b>dispensado de recolher</b> esses valores.','<b>PIS e COFINS</b> continuam sendo pagos integralmente.','As alíquotas de teste <b>não se aplicam</b> às empresas do Simples Nacional.']) + box('exemplo','Nota de R$ 10.000 em 2026: CBS destacada de R$ 90 e IBS de R$ 10.') + FONTE('LC 214/2025, arts. 343, 346 e 348')},
  {h:"Os próximos anos", b:ul(['2027 e 2028: IBS de 0,05% estadual e 0,05% municipal; CBS pela alíquota de referência, menos 0,1 ponto.','A CBS substitui PIS e COFINS; o IBS substitui ICMS e ISS, aos poucos, até 2033.','Em 2026, quem for autuado por falha nas obrigações acessórias do IBS e da CBS tem 60 dias para corrigir, e a multa é extinta.']) + FONTE('LC 214/2025, arts. 344, 347 e 348, §§ 3º e 4º (incluídos pela LC 227/2026)')},
  {h:"O que muda na rotina", b:ul(['As notas de fornecedores fora do Simples passam a trazer campos de CBS e IBS.','O sistema da empresa precisa ler e guardar esses campos.','Dúvida sobre o preenchimento: fale com o fiscal antes de lançar.'])}
 ],
 ex:[
  nu("Nota de R$ 10.000 emitida em 2026. Qual o valor da CBS destacada (0,9%)?",90,"0,9% de 10.000 = 90.","R$"),
  nu("Nota de R$ 10.000 emitida em 2026. Qual o valor do IBS destacado (0,1%)?",10,"0,1% de 10.000 = 10.","R$"),
  nu("Nota de R$ 25.000 emitida em 2026. Quanto somam CBS (0,9%) e IBS (0,1%) destacados?",250,"1% de 25.000 = 250.","R$"),
  tf("Em 2026, quem cumpre as obrigações acessórias fica dispensado de recolher a CBS e o IBS do teste.",true,"LC 214/2025, art. 348, § 1º."),
  tf("Em 2026, PIS e COFINS deixam de ser pagos.",false,"Continuam sendo pagos integralmente (art. 348, § 2º)."),
  mc("As alíquotas de teste de 2026 se aplicam às empresas do Simples Nacional?",["*Não","Sim, iguais para todos","Só o IBS","Só a CBS"],"LC 214/2025, art. 348, III, c."),
  mt([["CBS","Substitui PIS e COFINS"],["IBS","Substitui ICMS e ISS"],["2026","Ano de teste: 0,9% e 0,1%"],["2033","Fim da transição"]],"A Reforma Tributária do consumo, em quatro pares.")
 ]},

/* ================= Compras e contratos a fundo ================= */
{id:"rot12", title:"Cotação: o menor preço nem sempre ganha", icon:"📋",
 goal:"Comparar propostas pelo custo total e pelas condições, e justificar a escolha.",
 recap:["Compare preço, frete, prazo de entrega, prazo de pagamento e garantia.","Confira CNPJ, dados bancários e regime tributário do fornecedor.","Se não escolher o menor preço, registre por quê."],
 learn:[
  {h:"O mapa de cotação", b:`<p>Compra de 10 notebooks. Três propostas:</p>` + COTACAO + `<p>Custo total: A = 10.800; B = 10.300; C = 10.700. A proposta B é a mais barata no total e a que entrega mais rápido.</p>`},
  {h:"Antes de fechar", b:ul(['Fornecedor com CNPJ ativo e cadastro completo.','Dados bancários confirmados por um canal oficial, nunca só por e-mail.','Regime tributário: fornecedor do Simples ou não muda as retenções.','Proposta por escrito, com validade.'])},
  {h:"Justifique a escolha", b:`<p>O mapa de cotação acompanha a ordem de compra na aprovação. Se a escolha não for o menor preço, escreva o motivo: prazo, garantia, qualidade, histórico do fornecedor.</p>`,
   check:mc("A empresa escolheu uma proposta mais cara que a menor. O que precisa constar?",["*A justificativa da escolha","Nada","Só a assinatura do comprador"],"Sem justificativa, a escolha parece favorecimento.")}
 ],
 ex:[
  nu("Fornecedor A: R$ 10.000 mais R$ 800 de frete. Qual o custo total?",10800,"10.000 + 800 = 10.800.","R$"),
  nu("Fornecedor C: R$ 9.800 mais R$ 900 de frete. Qual o custo total?",10700,"9.800 + 900 = 10.700.","R$"),
  mc("Qual proposta escolher no mapa de cotação?" + COTACAO,["*B: menor custo total e entrega mais rápida","C: menor preço do item","A: prazo de pagamento","Tanto faz"],"B custa 10.300 no total e entrega em 7 dias."),
  tf("O mapa de cotação deve comparar o custo total, não só o preço do item.",true,"Frete, impostos e condições mudam o resultado."),
  mc("Por que confirmar o regime tributário do fornecedor antes de comprar?",["*Porque ele muda as retenções no pagamento","Porque muda o preço do frete","Porque define o prazo de entrega","Não precisa confirmar"],"Fornecedor do Simples, por exemplo, não sofre retenção de PIS, COFINS e CSLL."),
  od("Ordene a cotação:",["Pedir propostas por escrito","Montar o mapa de cotação","Escolher e justificar","Emitir a OC para aprovação"],"Comparar com critério e documentar."),
  mc("O fornecedor escolhido mandou por e-mail uma conta bancária nova. O que fazer?",["*Confirmar por um canal oficial já conhecido antes de cadastrar","Cadastrar na hora","Responder ao mesmo e-mail pedindo confirmação","Pagar na conta antiga sem avisar"],"Troca de conta por e-mail é um golpe comum.")
 ]},
{id:"rot13", title:"Recebimento e aceite", icon:"📦",
 goal:"Receber mercadorias e aceitar serviços com registro de cada divergência.",
 recap:["Confira volumes, itens, quantidades e avarias contra a nota e a OC.","Divergência se registra na hora, com ressalva, e compras é avisado.","Serviço só se lança com o aceite de quem recebeu."],
 learn:[
  {h:"No recebimento da mercadoria", b:ol(['Confira volumes e embalagens.','Confira itens e quantidades com a nota e a OC.','Registre faltas, sobras e avarias.','Dê entrada no sistema só do que foi recebido.']) + box('regra','O canhoto do DANFE assinado comprova a entrega. Se houver problema, anote a ressalva antes de assinar.')},
  {h:"Receber, ressalvar ou recusar", b:tbl(['Situação','O que fazer'],[['Tudo conforme','Receber'],['Falta ou avaria parcial','Receber com ressalva e avisar compras'],['Produto diferente do pedido','Recusar'],['Mercadoria sem nota fiscal','Recusar']])},
  {h:"No serviço, o aceite", b:`<p>Serviço não passa pela doca. A área que recebeu atesta a execução, o <b>aceite</b>, com período e valor aprovados. Nos serviços por demanda, vale a <b>medição</b>. A nota só é lançada com esse aceite.</p>`}
 ],
 ex:[
  cl("No recebimento, o que fazer?",["Receber","Com ressalva","Recusar"],"Tudo conforme a nota e a OC:0|Faltaram 2 de 50 caixas:1|Produto diferente do pedido:2|Uma caixa amassada, conteúdo intacto:1|Entrega sem nota fiscal:2","Divergência parcial se ressalva; produto errado ou sem nota se recusa."),
  mc("Para que serve o canhoto do DANFE assinado?",["*Comprovar que a mercadoria foi entregue","Pagar o fornecedor","Cancelar a nota","Substituir o XML"],"Por isso a ressalva deve ser escrita antes da assinatura."),
  nu("OC de 50 caixas a R$ 40. Chegaram 48, mas a nota cobra as 50. Quanto a nota cobra a mais do que foi recebido?",80,"2 caixas × 40 = 80.","R$"),
  tf("A nota de um serviço deve ser lançada só depois do aceite da área que recebeu o serviço.",true,"Sem aceite, não há prova de que o serviço foi prestado como combinado."),
  mc("Faltaram itens na entrega e o motorista precisa ir embora. O que fazer?",["*Receber com ressalva, anotar a falta no canhoto e no registro de recebimento, e avisar compras","Assinar sem ressalva","Recusar tudo sem registrar","Deixar para conferir amanhã"],"A ressalva protege a empresa na hora de cobrar a diferença."),
  od("Ordene o recebimento de mercadoria:",["Conferir volumes","Conferir itens e quantidades com a nota e a OC","Registrar divergências","Dar entrada no sistema"],"Conferir antes de registrar.")
 ]},
{id:"rot14", title:"Contratos: reajuste, aditivo e glosa", icon:"📑",
 goal:"Aplicar reajuste anual por índice acumulado, formalizar mudanças em aditivo e calcular glosas.",
 recap:["Reajuste de contrato só uma vez por ano, pelo índice e na data-base do contrato.","Índices se acumulam multiplicando: 2% e 3% dão 5,06%.","Glosa é o desconto previsto no contrato quando o nível de serviço não é cumprido."],
 learn:[
  {h:"Reajuste: uma vez por ano", b:`<p>Contratos de prazo igual ou superior a um ano podem prever reajuste por índice de preços. Reajuste com periodicidade menor que um ano é nulo. O contrato define o índice e a data-base.</p>` + FONTE('Lei 10.192/2001, art. 2º')},
  {h:"Índice acumulado", b:`<p>Índices se acumulam <b>multiplicando</b>, não somando:</p>` + tbl(['Período','Índice','Fator'],[['1º semestre','2%','1,02'],['2º semestre','3%','1,03'],['<b>Acumulado</b>','<b>5,06%</b>','<b>1,0506</b>']]) + box('exemplo','Contrato de R$ 20.000: 20.000 × 1,0506 = R$ 21.012.')},
  {h:"Aditivo e glosa", b:ul(['<b>Aditivo</b>: documento assinado que muda valor, prazo ou escopo.','<b>SLA</b>: nível de serviço combinado, como o prazo de atendimento.','<b>Glosa</b>: desconto previsto no contrato quando o SLA não é cumprido. Exemplo: 3% de R$ 20.000 = R$ 600.'])}
 ],
 ex:[
  nu("Índices de 2% e 3% em dois semestres seguidos. Qual o acumulado em %?",5.06,"1,02 × 1,03 = 1,0506: 5,06%.","%",undefined,0.01),
  nu("Contrato de R$ 20.000, reajustado por um índice acumulado de 5,06%. Qual o novo valor?",21012,"20.000 × 1,0506 = 21.012.","R$"),
  tf("Pela Lei 10.192/2001, um contrato pode prever reajuste a cada 6 meses.",false,"Reajuste com periodicidade inferior a um ano é nulo."),
  nu("Contrato de R$ 20.000 com glosa de 3% por atendimento fora do prazo. Qual a glosa?",600,"3% de 20.000 = 600.","R$"),
  mc("O fornecedor pede reajuste 8 meses depois da assinatura do contrato. O que responder?",["*Que o reajuste só vale depois de 12 meses, na data-base do contrato","Aceitar","Dar metade agora","Rescindir o contrato"],"A lei exige periodicidade anual."),
  mc("O escopo do serviço aumentou e o valor vai mudar. O que formaliza isso?",["*Um aditivo contratual assinado","Um e-mail do gestor","Uma nota com valor maior","Uma ligação"],"Sem aditivo, não se paga valor diferente do contrato."),
  cl("É reajuste, aditivo ou glosa?",["Reajuste","Aditivo","Glosa"],"Atualização anual pelo IPCA:0|Inclusão de um novo andar na limpeza:1|Desconto por atendimento fora do prazo do SLA:2|Prorrogação do prazo do contrato:1|Correção pelo IGP-M na data-base:0","Índice é reajuste; mudança de escopo ou prazo é aditivo; descumprimento de SLA é glosa.")
 ]},

/* ================= Na prática ================= */
{id:"rot15", title:"A caixa de notas da segunda-feira", icon:"📥",
 goal:"Tratar uma fila real de notas: lançar, pedir correção, barrar e calcular retenções.",
 recap:["Separe as notas por situação antes de lançar.","Nota cancelada ou desconhecida não entra.","Calcule as retenções e confirme as dispensas antes de pagar."],
 learn:[
  {h:"A fila da manhã", b:tbl(['Nota','Situação'],[['1. Toner, R$ 1.200','OC e recebimento conferidos, autorizada'],['2. NF-e de móveis','Status: cancelada'],['3. Consultoria, R$ 8.000','Fornecedor fora do Simples, sem retenções destacadas'],['4. NF-e de cabos','Endereço de entrega digitado errado'],['5. NF-e de R$ 30.000','Fornecedor desconhecido, nas notas destinadas'],['6. Manutenção, R$ 200','Fornecedor fora do Simples']])},
  {h:"O que fazer com cada uma", b:ul(['<b>1</b>: lançar.','<b>2</b>: não lançar; avisar compras.','<b>3</b>: calcular IRRF (R$ 120) e PIS, COFINS e CSLL (R$ 372) e alinhar com o fornecedor e o fiscal antes de pagar.','<b>4</b>: pedir carta de correção.','<b>5</b>: confirmar com compras e registrar Desconhecimento da Operação.','<b>6</b>: pagar R$ 200: a retenção de R$ 9,30 é dispensada, e manutenção, em regra, não tem IRRF.'])}
 ],
 ex:[
  cl("Na caixa de notas da segunda-feira, o que fazer com cada nota?",["Lançar","Pedir correção","Não lançar"],"Toner com OC e recebimento conferidos:0|NF-e com status cancelada:2|NF-e com endereço de entrega errado:1|Nota de R$ 30.000 de fornecedor desconhecido:2|Consultoria sem as retenções destacadas:1","Lança o que está conferido; corrige o que tem conserto; barra o que não vale."),
  nu("Consultoria de R$ 8.000, fornecedor fora do Simples, IRRF de 1,5% e PIS/COFINS/CSLL de 4,65%, sem ISS retido. Quanto se paga ao consultor?",7508,"IRRF 120 + PIS/COFINS/CSLL 372 = 492. 8.000 − 492 = 7.508.","R$"),
  mc("Nota de manutenção de R$ 200, de fornecedor fora do Simples. Quanto se paga?",["*R$ 200: a retenção de R$ 9,30 é dispensada","R$ 190,70","R$ 197","R$ 188"],"Retenção de até R$ 10 é dispensada, e manutenção, em regra, não sofre IRRF."),
  mc("Uma NF-e de R$ 30.000 de um fornecedor desconhecido está nas notas destinadas à empresa. O que fazer?",["*Confirmar com compras e registrar Desconhecimento da Operação","Lançar","Pagar e investigar depois","Pedir carta de correção"],"Sem pedido e sem recebimento, a empresa não reconhece a operação."),
  mc("A NF-e de cabos veio com o endereço de entrega digitado errado, sem trocar o destinatário. O que pedir?",["*Carta de correção ao fornecedor","Cancelamento da nota","Nota complementar","Nada"],"Endereço, sem mudar as partes, cabe em CC-e."),
  od("Ordene a manhã:",["Separar as notas por situação","Resolver o que trava pagamentos do dia","Pedir correções aos fornecedores","Lançar as notas conferidas"],"Organizar, destravar, corrigir e lançar."),
  ep("Explique ao gestor, em três frases, o que você fez com a caixa de notas da segunda-feira.","Lancei as notas conferidas, como a do toner. Barrei a NF-e cancelada e a de R$ 30.000 de fornecedor desconhecido, que registrei como Desconhecimento da Operação. Pedi carta de correção da nota de cabos e calculei as retenções da consultoria, que vou alinhar com o fornecedor antes do pagamento.",[["Lançou as notas conferidas","lanc","confer","toner"],["Barrou notas com problema","cancelad","desconhec","barr","segur","nao lanc","nao pag"],["Pediu correções ou calculou retenções","cce","carta","correc","retenc","irrf","retid"]],"O que foi lançado, o que foi barrado e o que ficou pendente.")
 ]},
{id:"rot16", title:"Um contrato vencendo", icon:"⏳",
 goal:"Cuidar de um contrato perto do vencimento: prazo de aviso, reajuste correto, glosa e decisão.",
 recap:["Com renovação automática, o prazo de aviso é o que decide.","O reajuste segue o índice do contrato, não o pedido do fornecedor.","Leve ao gestor a data-limite, os números e uma proposta."],
 learn:[
  {h:"O contrato", b:CONTRATO + `<p>Hoje é 25/08/2026. O fornecedor pede 9% de reajuste. O IPCA acumulado dos últimos 12 meses é de 4,8% (valor fictício). No mês passado, houve atendimento fora do prazo.</p>`},
  {h:"As contas", b:ul(['Aviso para não renovar: 30 dias antes de 30/09/2026, ou seja, até <b>31/08/2026</b>.','Reajuste pelo contrato: 12.000 × 1,048 = <b>R$ 12.576</b>.','Pedido do fornecedor: 12.000 × 1,09 = R$ 13.080, ou R$ 504 a mais por mês.','Glosa do mês com atraso: 3% de 12.000 = <b>R$ 360</b>.'])},
  {h:"O que levar ao gestor", b:ol(['A data-limite para decidir: 31/08/2026.','Os números: reajuste pelo IPCA e diferença para o pedido.','O histórico do SLA e a glosa aplicada.','Uma proposta: renovar pelo índice do contrato, com aditivo se algo mudar, ou cotar outro fornecedor.'])}
 ],
 ex:[
  mc("O contrato vence em 30/09/2026, com renovação automática e aviso de 30 dias. Até quando avisar se a empresa não quiser renovar?",["*31/08/2026","30/09/2026","25/08/2026","01/10/2026"],"30 dias antes de 30/09 é 31/08."),
  nu("Contrato de R$ 12.000 por mês, reajustado pelo IPCA acumulado de 4,8%. Qual o novo valor?",12576,"12.000 × 1,048 = 12.576.","R$"),
  nu("O fornecedor pediu 9% sobre R$ 12.000, mas o IPCA acumulado é de 4,8%. Qual a diferença mensal entre o pedido e o reajuste do contrato?",504,"13.080 − 12.576 = 504.","R$"),
  nu("Contrato de R$ 12.000 com glosa de 3% por atendimento fora do prazo. Qual a glosa do mês?",360,"3% de 12.000 = 360.","R$"),
  tf("Num contrato com renovação automática, se ninguém avisar até o prazo, ele renova.",true,"Por isso o prazo de aviso vai para o controle de contratos."),
  mc("Qual é o melhor encaminhamento para o contrato de manutenção?",["*Levar ao gestor até 31/08: renovar com reajuste pelo IPCA (R$ 12.576), aplicar a glosa prevista e formalizar em aditivo se algo mudar","Aceitar os 9% para não criar atrito","Deixar renovar sem olhar","Cancelar o contrato sozinho"],"Data, números e proposta. A decisão é do gestor."),
  ep("Escreva um e-mail curto ao gestor sobre o contrato de manutenção que vence em 30/09/2026.","O contrato de manutenção renova sozinho em 30/09, e o prazo para avisar se não quisermos renovar é 31/08. O fornecedor pediu 9% de reajuste, mas o contrato prevê o IPCA, de 4,8%, o que dá R$ 12.576 por mês, R$ 504 a menos que o pedido. Houve atendimento fora do prazo em julho, com glosa de R$ 360. Proponho renovar pelo índice do contrato.",[["Prazo de decisão","31/08","prazo","aviso","renov"],["Reajuste pelo índice","ipca","4,8","12.576","12576","indice"],["Pedido do fornecedor acima do contrato","9%","acima","pedido","pediu"],["Glosa ou SLA","glosa","sla","atraso","fora do prazo"]],"Prazo, números, histórico e proposta.")
 ]}
];
