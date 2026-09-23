import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';
import { mc, tf, fl, mt, en, cl, nu, wr, ew, od, ep, ts } from '../../engine/exercises/factories.js';

export default [
{id:"estoq1", title:"Reconhecimento de estoques", icon:"📦",
 learn:[
  {h:"O que é estoque", b:`<p><b>Estoque</b> é o conjunto de bens que a empresa tem para <b>vender</b> ou <b>consumir</b> na sua atividade: mercadorias para revenda, matéria-prima, produtos em processo, produtos acabados.</p>`},
  {h:"Por que fica no Ativo", b:`<p>Enquanto não é vendido ou usado, o estoque ainda vai gerar um benefício futuro: dinheiro na venda, ou um produto pronto. Por isso é um <b>bem</b>, e fica no <b>Ativo Circulante</b>.</p>` + box('exemplo','As prateleiras cheias de uma loja de roupas são estoque: dinheiro "guardado" na forma de mercadoria.')},
  {h:"Inventário periódico x permanente", b:ul(['<b>Periódico</b>: só apura o custo do que foi vendido (CMV) no fechamento, com uma fórmula.','<b>Permanente</b>: atualiza o custo a cada compra e venda, numa ficha de estoque.']) + box('dica','Neste curso trabalhamos principalmente com o inventário periódico, mais comum em empresas pequenas.')},
  {h:"Onde aparece", b:`<p>O estoque aparece no <b>Balanço Patrimonial</b> (Ativo Circulante) enquanto não é vendido, e vira <b>CMV</b> na <b>DRE</b> quando sai.</p>`}
 ],
 ex:[
  mc("Estoques de mercadorias para revenda ficam em que grupo do Balanço?",["*Ativo Circulante","Ativo Não Circulante","Passivo Circulante","Patrimônio Líquido"],"O estoque costuma virar dinheiro em até 12 meses."),
  tf("Produtos ainda não vendidos continuam sendo um bem da empresa, e não uma despesa.",true,"Só viram custo/despesa quando são vendidos ou consumidos."),
  mc("No inventário periódico, quando o CMV é apurado?",["*Só no fechamento, por uma fórmula","A cada venda, na hora","Nunca é apurado","Todo início de mês, por estimativa"],"O periódico calcula tudo de uma vez ao final do período."),
  wr("Como se chama o estoque de produtos prontos para vender que a loja ainda não vendeu?",["mercadorias","estoque de mercadorias","mercadorias para revenda"],"Mercadorias para revenda."),
  mt([["Mercadoria para revenda","Comprada pronta para vender"],["Matéria-prima","Vai virar produto"],["Produto acabado","Já foi fabricado, pronto para vender"],["Inventário periódico","Apura o CMV só no fechamento"]],"Cada tipo de estoque tem um papel diferente na produção."),
  cl("O item é estoque ou não?",["Estoque","Não é estoque"],"Mercadorias para revenda:0|Computador do escritório:1|Matéria-prima:0|Dinheiro em caixa:1","Estoque é o que a empresa vai vender ou consumir na atividade.")
 ]},
{id:"estoq2", title:"Custo de aquisição", icon:"🧾",
 learn:[
  {h:"O que entra no custo", b:eq('Custo de aquisição = Preço da compra + Fretes e seguros − Descontos incondicionais') + `<p>Tudo o que é gasto para deixar o estoque pronto e disponível entra no custo.</p>`},
  {h:"Descontos incondicionais x financeiros", b:ul(['<b>Incondicional</b>: já vem abatido na nota, reduz o custo do estoque.','<b>Financeiro</b> (por pagamento antecipado, por exemplo): não reduz o custo, vira <b>receita financeira</b> à parte.']) + box('atencao','Só o desconto incondicional entra na conta de custo do estoque.')},
  {h:"Impostos recuperáveis", b:`<p>Quando a empresa pode recuperar um imposto pago na compra, esse valor <b>não</b> faz parte do custo do estoque: fica separado numa conta de "imposto a recuperar". Quando o imposto não é recuperável, aí sim entra no custo.</p>`},
  {h:"Exemplo completo", b:box('exemplo','Compra de R$ 10.000, frete de R$ 500, desconto incondicional de R$ 200. Custo de aquisição: 10.000 + 500 − 200 = R$ 10.300.')}
 ],
 ex:[
  nu("Compra de mercadorias por R$ 8.000, frete de R$ 300 e desconto incondicional de R$ 100. Qual o custo de aquisição?",8200,"8.000 + 300 − 100 = 8.200.","R$"),
  mc("O frete pago para trazer a mercadoria até a empresa deve:",["*Ser somado ao custo do estoque","Virar despesa imediata","Ser ignorado","Reduzir o Patrimônio Líquido diretamente"],"Frete de compra integra o custo de aquisição."),
  tf("Um desconto obtido por pagamento antecipado (financeiro) reduz o custo do estoque.",false,"Esse desconto é receita financeira; não altera o custo do estoque."),
  tf("Um imposto recuperável pago na compra normalmente não entra no custo do estoque.",true,"Ele fica numa conta separada de imposto a recuperar."),
  wr("Como se chama o desconto dado direto na nota fiscal, que reduz o custo da compra?",["incondicional","desconto incondicional"],"Desconto incondicional."),
  nu("Compra de R$ 15.000, frete de R$ 1.200, sem descontos. Qual o custo de aquisição?",16200,"15.000 + 1.200 = 16.200.","R$")
 ]},
{id:"estoq3", title:"Métodos de custeio: PEPS e custo médio", icon:"🔄",
 learn:[
  {h:"Por que existem métodos", b:`<p>Quando a empresa compra o mesmo item por preços diferentes ao longo do tempo, precisa de uma regra para decidir que custo "sai" quando vende.</p>`},
  {h:"PEPS: primeiro que entra, primeiro que sai", b:`<p>Considera que o lote mais <b>antigo</b> é vendido primeiro.</p>` + box('exemplo','Estoque: 100 un a R$ 10 (lote 1) + 200 un a R$ 13 (lote 2) = 300 un, R$ 3.600.') + `<p>Vendendo 250 un pelo PEPS: saem as 100 do lote 1 (R$ 1.000) + 150 do lote 2 (R$ 1.950) = <b>CMV R$ 2.950</b>. Sobram 50 un do lote 2 = <b>estoque final R$ 650</b>.</p>`},
  {h:"Custo médio ponderado", b:`<p>Mistura todos os custos numa média só.</p>` + eq('Custo médio = Valor total do estoque ÷ Quantidade total') + box('exemplo','(R$ 1.000 + R$ 2.600) ÷ 300 un = R$ 12/un. Vendendo 250 un: CMV = 250 × 12 = <b>R$ 3.000</b>. Estoque final: 50 × 12 = <b>R$ 600</b>.')},
  {h:"Comparando", b:tbl(['Método','CMV (250 un)','Estoque final (50 un)'],[['PEPS','R$ 2.950','R$ 650'],['Custo médio','R$ 3.000','R$ 600']]) + box('regra','Com preços subindo, o PEPS dá um CMV menor e um estoque final mais próximo do preço atual. O UEPS (o inverso do PEPS) não é aceito no Brasil.')}
 ],
 ex:[
  nu("Estoque: 80 un a R$ 5 (lote 1) e 120 un a R$ 8 (lote 2). Pelo PEPS, vendendo 150 un, qual o CMV?",960,"80 × 5 = 400 (lote 1 todo) + 70 × 8 = 560 (parte do lote 2). CMV = 400 + 560 = 960.","R$","Primeiro sai todo o lote 1, depois parte do lote 2."),
  nu("Com os mesmos dados (80 un a R$5, 120 un a R$8), qual o CMV de 150 un pelo custo médio?",1020,"Custo médio = (400 + 960) ÷ 200 = 6,80/un. CMV = 150 × 6,80 = 1.020.","R$","Ache o custo médio por unidade primeiro."),
  mc("Em época de preços subindo, qual método costuma dar o menor CMV?",["*PEPS","Custo médio","Os dois dão sempre o mesmo valor","UEPS"],"O PEPS usa primeiro os custos mais antigos e baratos."),
  tf("No PEPS, o estoque que sobra é sempre o lote mais antigo que a empresa comprou.",false,"Sobra o mais recente: o mais antigo já foi vendido primeiro."),
  wr("Qual sigla identifica o método em que o primeiro lote comprado é o primeiro a sair?",["peps"],"PEPS: primeiro que entra, primeiro que sai."),
  mt([["PEPS","O lote mais antigo sai primeiro"],["Custo médio","Mistura todos os custos numa média"],["Preços subindo","O PEPS dá um CMV menor"],["UEPS","Não é aceito no Brasil"]],"Cada método muda o valor do CMV e do estoque final.")
 ]},
{id:"estoq4", title:"Apurando o CMV", icon:"🧮",
 learn:[
  {h:"A fórmula do inventário periódico", b:eq('CMV = Estoque Inicial + Compras − Estoque Final') + `<p>É a forma mais simples de descobrir quanto custou o que foi vendido no período.</p>`},
  {h:"De onde vem cada número", b:ul(['<b>Estoque Inicial (EI)</b>: o saldo no começo do período (era o Estoque Final do período anterior).','<b>Compras</b>: tudo o que foi comprado no período, pelo custo de aquisição.','<b>Estoque Final (EF)</b>: a contagem física ao fim do período, valorizada pelo método de custeio escolhido.'])},
  {h:"Exemplo completo", b:box('exemplo','Estoque inicial R$ 5.000, compras R$ 18.000, estoque final R$ 6.000.') + eq('CMV = 5.000 + 18.000 − 6.000 = R$ 17.000')},
  {h:"Ligação com a DRE", b:`<p>O CMV é deduzido da <b>Receita de Vendas</b> para chegar ao <b>Lucro Bruto</b>: quanto maior o CMV, menor o lucro do período.</p>`}
 ],
 ex:[
  nu("Estoque inicial R$ 4.000, compras R$ 22.000, estoque final R$ 5.500. Qual o CMV?",20500,"4.000 + 22.000 − 5.500 = 20.500.","R$"),
  nu("Empresa nova, sem estoque inicial. Compras de R$ 12.000 e estoque final de R$ 3.000. Qual o CMV?",9000,"0 + 12.000 − 3.000 = 9.000.","R$"),
  mc("Se o estoque final for maior, mantendo o resto igual, o que acontece com o CMV?",["*Diminui","Aumenta","Não muda","Depende só do método"],"Um estoque final maior significa que menos coisa foi vendida."),
  tf("O CMV reduz o lucro do período, assim como uma despesa.",true,"Ele é deduzido da receita de vendas na DRE."),
  en("Baixa do custo das mercadorias vendidas do mês, R$ 20.500.","CMV","Estoques",["Caixa","Receita de vendas"],"O custo sai do estoque e vai para o resultado."),
  wr("Qual a sigla da conta que recebe o custo do que foi vendido?",["cmv"],"CMV: Custo das Mercadorias Vendidas.")
 ]},
{id:"estoq5", title:"Perdas e ajustes de estoque", icon:"⚠️",
 learn:[
  {h:"Inventário físico x contábil", b:`<p>De tempos em tempos, a empresa faz uma <b>contagem física</b> do estoque e compara com o saldo que está nos registros contábeis. Se os números não baterem, há uma diferença a ajustar.</p>`},
  {h:"Perdas comuns", b:ul(['Quebra ou avaria no manuseio','Furto ou roubo','Vencimento ou deterioração','Obsolescência (o produto ficou ultrapassado)'])},
  {h:"Ajuste ao valor de mercado", b:`<p>Pelo <b>princípio da prudência</b>, se o valor de mercado do estoque cair abaixo do custo, ele deve ser ajustado para baixo. A empresa nunca registra o estoque por um valor maior do que ele realmente vale.</p>`},
  {h:"Lançamento da perda", b:lanc([['D','Despesa com perdas de estoque','—'],['C','Estoques','—']]) + `<p>A perda reduz o estoque (Ativo) e vira despesa do período.</p>`}
 ],
 ex:[
  tf("Se a contagem física mostrar menos mercadoria do que o saldo contábil, há uma perda a registrar.",true,"A diferença entre o físico e o contábil vira ajuste."),
  mc("Pelo princípio da prudência, quando o estoque deve ser ajustado para baixo?",["*Quando o valor de mercado fica menor que o custo","Nunca","Todo fim de ano, sem motivo","Só quando o dono pedir"],"O estoque não pode ficar registrado por um valor maior do que vale."),
  wr("Como se chama a contagem física do estoque feita para conferir com os registros contábeis?",["inventario","inventário","inventario fisico","inventário físico"],"Inventário físico."),
  en("Registro de uma perda de estoque por quebra, identificada na contagem física, R$ 350.","Despesa com perdas de estoque","Estoques",["Caixa","Fornecedores"],"A perda reduz o estoque e vira despesa do período."),
  nu("O saldo contábil do estoque é R$ 12.000. A contagem física aponta R$ 11.400. Qual o valor da perda?",600,"12.000 − 11.400 = 600.","R$"),
  tf("Obsolescência (o produto ficou ultrapassado) pode justificar um ajuste do estoque para baixo.",true,"Um produto ultrapassado costuma valer menos do que custou.")
 ]},
{id:"estoq6", title:"Estoque na indústria", icon:"🏭",
 learn:[
  {h:"Três estoques, não só um", b:`<p>Numa indústria, o estoque passa por <b>três fases</b> antes de virar CMV: matéria-prima, produção em andamento e produto pronto.</p>` +
    tbl(['Conta','O que é'],[['Matéria-prima (MP)','Insumos ainda não usados na produção'],['Produtos em elaboração (PE)','O que está sendo fabricado agora, com parte do custo já aplicado'],['Produtos acabados (PA)','Já fabricado, pronto para vender']])},
  {h:"O caminho do custo", b:ol(['A matéria-prima é <b>requisitada</b> para a fábrica: sai de MP e entra em PE.','Mão de obra e outros custos de fábrica também entram em PE.','Quando termina, o custo total sai de PE e entra em PA.','Quando vende, o custo sai de PA e vira <b>CPV</b> (custo dos produtos vendidos), o equivalente ao CMV na indústria.']) +
    lanc([['D','Produtos em elaboração','8.000'],['C','Matéria-prima','8.000']])},
  {h:"Do PE ao PA", b:box('exemplo','Um lote consumiu R$ 8.000 de matéria-prima e R$ 5.000 de mão de obra e outros custos de fábrica. Custo total do lote: R$ 13.000.') +
    lanc([['D','Produtos acabados','13.000'],['C','Produtos em elaboração','13.000']]) + `<p>Só quando o produto está pronto é que o custo migra para Produtos acabados.</p>`},
  {h:"Comércio x indústria", b:`<p>No comércio, a mercadoria é comprada já pronta: um único estoque. Na indústria, o mesmo dinheiro passa por três contas diferentes até virar produto vendável — por isso o controle de custos da indústria é mais detalhado.</p>`}
 ],
 ex:[
  mc("Em qual conta fica o insumo que a fábrica ainda não usou?",["*Matéria-prima","Produtos em elaboração","Produtos acabados","CPV"],"Matéria-prima é o que ainda está no almoxarifado."),
  od("Ordene o caminho do custo na indústria, da matéria-prima até a venda:",["Matéria-prima","Produtos em elaboração","Produtos acabados","CPV (custo dos produtos vendidos)"],"O custo passa por MP, PE, PA e só vira CPV quando o produto é vendido."),
  nu("Um lote consumiu R$ 6.000 de matéria-prima e R$ 4.000 de mão de obra e custos de fábrica. Qual o custo total transferido para Produtos acabados?",10000,"6.000 + 4.000 = 10.000.","R$"),
  tf("Produtos em elaboração é o estoque do que já está pronto, esperando ser vendido.",false,"O que já está pronto é Produtos acabados. Em elaboração é o que ainda está sendo fabricado."),
  mt([["Matéria-prima","Insumo ainda não usado na produção"],["Produtos em elaboração","Está sendo fabricado agora"],["Produtos acabados","Pronto para vender"],["CPV","Custo do que já foi vendido"]],"Cada fase do estoque industrial tem seu próprio nome de conta."),
  wr("Na indústria, como se chama o custo do que foi vendido, equivalente ao CMV do comércio? (sigla)",["cpv"],"CPV: Custo dos Produtos Vendidos.")
 ]},
{id:"estoq7", title:"Revisão: estoques", icon:"🔄",
 learn:[
  {h:"O caminho do estoque", b:tbl(['Etapa','O que acontece'],[['Custo de aquisição','Preço + frete + seguro − desconto incondicional'],['Método de custeio','PEPS ou custo médio ponderado decidem o custo de saída'],['CMV','Estoque inicial + Compras − Estoque final'],['Ajuste','Contagem física pode revelar perda a ajustar']])}
 ],
 ex:[
  nu("Compra de R$ 12.000, frete de R$ 600 e desconto incondicional de R$ 300. Qual o custo de aquisição?",12300,"12.000 + 600 − 300 = 12.300.","R$"),
  nu("Estoque: 50 un a R$ 6 (lote 1) e 100 un a R$ 9 (lote 2). Pelo PEPS, vendendo 80 un, qual o CMV?",570,"50×6=300 (lote 1 todo) + 30×9=270 (parte do lote 2). CMV = 300+270=570.","R$","Primeiro sai todo o lote mais antigo."),
  nu("Estoque inicial R$ 10.000, compras R$ 40.000, estoque final R$ 9.000. Qual o CMV?",41000,"10.000 + 40.000 − 9.000 = 41.000.","R$"),
  tf("O método UEPS é aceito pelas normas contábeis brasileiras.",false,"No Brasil usam-se PEPS ou custo médio ponderado; o UEPS não é aceito."),
  mc("A contagem física do estoque aponta R$ 8.200, mas o saldo contábil é R$ 8.800. O que isso indica?",["*Uma perda de R$ 600 a ajustar","Um ganho de R$ 600","Que não há nada a fazer","Um erro que se corrige sozinho"],"8.800 − 8.200 = 600 de diferença, tratada como perda de estoque."),
  wr("Numa indústria, como se chama o estoque do que ainda está sendo fabricado?",["produtos em elaboracao","em elaboracao","produto em elaboracao"],"Produtos em elaboração.")
 ]}
];
