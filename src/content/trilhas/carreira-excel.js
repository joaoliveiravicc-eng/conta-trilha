/* Área Carreira · Trilha 1: Excel para a vaga de Analista Administrativo Financeiro Jr.
   Sintaxe conferida no suporte da Microsoft em pt-BR (set/2026). Dados fictícios. */
import { box, eq, tbl, ul, ol, planilha, download } from '../render-helpers.js';
import { mc, tf, fl, mt, cl, nu, od, ep } from '../../engine/exercises/factories.js';

const NOTAS = [
  ['Nota','Fornecedor','Centro','Valor','Status'],
  [1001,'Alfa','Administrativo','1.200','Paga'],
  [1002,'Beta','TI','3.500','Aberta'],
  [1003,'Alfa','Comercial','800','Paga'],
  [1004,'Gama','Marketing','5.000','Aberta'],
  [1005,'Beta','TI','1.500','Paga']
];
const FORN = [
  ['Código','Fornecedor','Centro','Prazo'],
  ['F01','Alfa','Administrativo',30],
  ['F02','Beta','TI',45],
  ['F03','Gama','Marketing',15],
  ['F04','Delta','Administrativo',30]
];
const DATAS = [
  ['Data','Descrição','Valor'],
  ['05/03/2026','Energia elétrica','900'],
  ['18/03/2026','Aluguel','4.000'],
  ['02/04/2026','Energia elétrica','950'],
  ['20/04/2026','Internet','300']
];
const g = (rows, mark, opts) => planilha(rows, Object.assign({ mark: mark || [] }, opts || {}));
const notas = mark => g(NOTAS, mark);
const forn = mark => g(FORN, mark);
const PIVOT = tbl(['Centro de custo','Aberta','Paga','Total geral'],[['Administrativo','','1.200','1.200'],['Comercial','','800','800'],['Marketing','5.000','','5.000'],['TI','3.500','1.500','5.000'],['<b>Total geral</b>','<b>8.500</b>','<b>3.500</b>','<b>12.000</b>']]);

export default [
/* ================= Fundamentos rápidos ================= */
{id:"xl1", title:"A planilha por dentro", icon:"📄",
 recap:["A planilha é uma grade: colunas com letras, linhas com números e células com endereço, como B2.", "A1:A5 é um intervalo de 5 células; B2:C4 é o retângulo de B2 a C4.", "Toda fórmula começa com =, e no Excel em português os argumentos se separam por ponto e vírgula."],
 learn:[
  {h:"Células, linhas e colunas", b:`<p>Uma planilha é uma grade. As colunas têm letras (A, B, C…) e as linhas, números (1, 2, 3…). Cada célula tem um endereço: a letra da coluna e depois o número da linha.</p>` + g([['Item','Qtd','Preço'],['Caneta','10','2,50'],['Papel A4','3','28,00']],['B3']) + box('exemplo','A célula destacada é a <b>B3</b>: coluna B, linha 3. Ela guarda o número 3.')},
  {h:"Intervalos e fórmulas", b:ul(['<b>A1:A5</b> vai de A1 até A5 (5 células).','<b>B2:C4</b> é o retângulo de B2 a C4 (6 células).','Toda fórmula começa com <b>=</b>.','No Excel em português, os argumentos são separados por <b>;</b> (ponto e vírgula).']) + eq('=SOMA(D2:D6) &nbsp;·&nbsp; =B2*C2 &nbsp;·&nbsp; =MÉDIA(B2:B10)')}
 ],
 ex:[
  mc("Qual o endereço da célula na coluna C, linha 7?",["*C7","7C","C:7","L7C3"],"Primeiro a letra da coluna, depois o número da linha."),
  nu("Quantas células há no intervalo B2:C4?",6,"Duas colunas (B e C) × três linhas (2 a 4) = 6."),
  tf("No Excel em português, os argumentos das funções são separados por ponto e vírgula (;).",true,"Ex.: =SOMA(A1;A5). No Excel em inglês se usa a vírgula."),
  nu("Qual o resultado de =B2*C2?" + g([['Item','Qtd','Preço'],['Caneta','10','2,50']],['B2','C2']),25,"10 × 2,50 = 25."),
  fl("Para somar de D2 até D6: ={SOMA}({D2:D6})",["MÉDIA","D2;D6","CONT"],"SOMA soma o intervalo inteiro. D2;D6 somaria só as duas células."),
  mc("Uma fórmula sempre começa com:",["*= (sinal de igual)","# (cerquilha)","@ (arroba)","Aspas"],"Sem o sinal de igual, o Excel trata o conteúdo como texto.")
 ]},
{id:"xl2", title:"Referências relativas e absolutas", icon:"📌",
 recap:["Ao copiar uma fórmula, as referências relativas mudam junto com a linha ou a coluna.", "O cifrão trava: $A$1 não muda, A$1 trava a linha e $A1 trava a coluna.", "A tecla F4 alterna entre relativa e absoluta enquanto você edita."],
 learn:[
  {h:"Copiar muda as referências", b:`<p>Se C2 tem =A2*B2 e você copia para C3, a fórmula vira =A3*B3. Isso é a referência <b>relativa</b>: ela anda junto com a fórmula.</p>` + g([['Qtd','Preço','Total'],['10','5','=A2*B2'],['4','8','=A3*B3']])},
  {h:"O cifrão trava", b:ul(['<b>$A$1</b>: trava coluna e linha (referência absoluta).','<b>$A1</b>: trava só a coluna.','<b>A$1</b>: trava só a linha.','A tecla <b>F4</b> alterna entre os tipos enquanto você edita a fórmula.']) + box('exemplo','Para o % de cada linha sobre o total em B10: =B2/$B$10. Copiando para baixo, B2 vira B3, B4…, mas $B$10 continua fixo.')}
 ],
 ex:[
  mc("C2 tem =A2*B2. Copiando para C5, a fórmula fica:",["*=A5*B5","=A2*B2","=A5*B2","=C5*D5"],"Referências relativas acompanham a linha."),
  mc("C2 tem =B2*$F$1. Copiando para C3, a fórmula fica:",["*=B3*$F$1","=B3*$F$2","=B2*$F$1","=B3*F2"],"$F$1 está travada; B2 anda."),
  fl("Percentual sobre o total em B10, para copiar para baixo: =B2/{$B$10}",["B10","$B10","B$11"],"A linha 10 precisa ficar fixa ao copiar para baixo: $B$10."),
  tf("A tecla F2 alterna entre referência relativa e absoluta enquanto você edita a fórmula.",false,"Quem alterna é a tecla F4: A1 → $A$1 → A$1 → $A1 → A1. A F2 só coloca a célula em modo de edição."),
  nu("Qual o resultado em C3 (em %)?" + g([['Centro','Gasto','%'],['TI','2.000','=B2/$B$6'],['Adm','1.000','=B3/$B$6'],['Mkt','1.500','=B4/$B$6'],['RH','500','=B5/$B$6'],['Total','5.000','']],['C3']),20,"1.000 ÷ 5.000 = 20%.","%"),
  mc("Qual referência trava só a linha 1?",["*A$1","$A1","$A$1","A1"],"O cifrão antes do número trava a linha.")
 ]},
{id:"xl3", title:"Funções essenciais", icon:"🧮",
 recap:["SOMA, MÉDIA, MÁXIMO, MÍNIMO, CONT.NÚM e CONT.VALORES são as funções do dia a dia.", "CONT.NÚM conta células com número; CONT.VALORES conta células não vazias.", "Numa base de notas, elas resumem valores por coluna."],
 learn:[
  {h:"As que você vai usar todo dia", b:tbl(['Função','O que faz'],[['SOMA','Soma. <br><code>=SOMA(D2:D6)</code>'],['MÉDIA','Média. <br><code>=MÉDIA(D2:D6)</code>'],['MÁXIMO / MÍNIMO','Maior / menor valor. <br><code>=MÁXIMO(D2:D6)</code>'],['CONT.NÚM','Conta células com número. <br><code>=CONT.NÚM(D2:D6)</code>'],['CONT.VALORES','Conta células não vazias. <br><code>=CONT.VALORES(B2:B6)</code>'],['ARRED','Arredonda. <br><code>=ARRED(D2/3;2)</code>']])},
  {h:"Numa base de notas", b:notas() + box('dica','Antes de qualquer relatório, confira o total com =SOMA. É o jeito mais rápido de perceber uma linha esquecida.')}
 ],
 ex:[
  nu("Qual o resultado de =SOMA(D2:D6)?" + notas(),12000,"1.200 + 3.500 + 800 + 5.000 + 1.500 = 12.000."),
  nu("Qual o resultado de =MÉDIA(D2:D6)?" + notas(),2400,"12.000 ÷ 5 = 2.400."),
  nu("Qual o resultado de =MÁXIMO(D2:D6)?" + notas(),5000,"A maior nota é a da Gama."),
  nu("Qual o resultado de =CONT.VALORES(B2:B6)?" + notas(),5,"Cinco células preenchidas."),
  mt([["SOMA","Soma os valores"],["MÉDIA","Calcula a média"],["CONT.NÚM","Conta células com número"],["ARRED","Arredonda um número"]],"Cada função, seu uso."),
  nu("Qual o resultado de =ARRED(10/3;2)?",3.33,"10 ÷ 3 = 3,333…; com 2 casas, 3,33.","",undefined,0.001)
 ]},
{id:"xl4", title:"SE, E e OU", icon:"🔀",
 recap:["=SE(teste; se verdadeiro; se falso): textos sempre entre aspas.", "E exige todas as condições; OU exige só uma.", "SE aninhado serve para mais de duas saídas."],
 learn:[
  {h:"Uma decisão dentro da fórmula", b:eq('=SE(teste_lógico; valor_se_verdadeiro; valor_se_falso)') + box('exemplo','=SE(D2>1000;"Gestor";"Automática"): nota acima de R$ 1.000 vai para aprovação do gestor.') + ul(['Texto sempre entre aspas.','Comparadores: = , &lt;&gt; (diferente), &gt;, &lt;, &gt;=, &lt;=.'])},
  {h:"E, OU e SE dentro de SE", b:ul(['<b>E</b>: todas as condições precisam ser verdadeiras. =SE(E(D2>1000;E2="Aberta");"Priorizar";"OK")','<b>OU</b>: basta uma. =SE(OU(C2="TI";C2="Marketing");"Revisar";"—")','<b>SE aninhado</b>, para mais de duas saídas: =SE(D2>5000;"Diretoria";SE(D2>1000;"Gestor";"Automática"))'])}
 ],
 ex:[
  mc('=SE(D2>1000;"Gestor";"Automática") com D2 = 800 retorna:',["*Automática","Gestor","800","FALSO"],"800 não é maior que 1.000."),
  mc('=SE(E(D2>1000;E2="Aberta");"Priorizar";"OK") com D2 = 3.500 e E2 = Aberta retorna:',["*Priorizar","OK","VERDADEIRO","#VALOR!"],"As duas condições são verdadeiras."),
  mc('=SE(OU(C2="TI";C2="Marketing");"Revisar";"—") com C2 = Comercial retorna:',["*—","Revisar","Comercial","FALSO"],"Nenhuma das condições é verdadeira."),
  fl('Complete: =SE(D2{>}1000;{"Gestor"};"Automática")',["<","Gestor"],"Acima de 1.000 vai para o gestor, e texto precisa de aspas."),
  tf("Dentro de uma fórmula, textos precisam ficar entre aspas.",true,"Sem aspas, o Excel procura uma função ou um nome com aquele texto."),
  mc('=SE(D2>5000;"Diretoria";SE(D2>1000;"Gestor";"Automática")) com D2 = 3.500 retorna:',["*Gestor","Diretoria","Automática","3.500"],"Não passa de 5.000, mas passa de 1.000.")
 ]},

/* ================= Organizando dados ================= */
{id:"xl5", title:"Classificar e filtrar", icon:"🔽",
 recap:["O filtro só oculta linhas, não apaga nada.", "Classificar pode usar várias colunas, como centro de custo e depois valor.", "Selecione a tabela inteira antes de classificar, para não embaralhar as colunas."],
 learn:[
  {h:"Filtro não apaga nada", b:`<p>Em <b>Dados › Filtro</b>, cada cabeçalho ganha uma setinha. Você escolhe o que ver: só um fornecedor, só notas abertas, valores acima de um limite. As outras linhas ficam ocultas, não apagadas.</p>` + box('atencao','Com o filtro ligado, =SOMA soma também as linhas ocultas. Para somar só o que está visível, use =SUBTOTAL(9;D2:D100).')},
  {h:"Classificar", b:ul(['<b>Dados › Classificar</b>: por uma ou várias colunas (ex.: centro de custo e, depois, valor do maior para o menor).','Selecione a tabela inteira antes, para não embaralhar uma coluna separada das outras.'])}
 ],
 ex:[
  tf("Aplicar um filtro apaga as linhas que não aparecem.",false,"Elas só ficam ocultas."),
  mc("Com a base filtrada só em TI, qual fórmula soma apenas as linhas visíveis?",["*=SUBTOTAL(9;D2:D100)","=SOMA(D2:D100)","=CONT.VALORES(D2:D100)","=MÉDIA(D2:D100)"],"SUBTOTAL ignora as linhas ocultas pelo filtro."),
  nu("Filtrando a base por Status = Aberta, quanto somam os valores visíveis?" + notas(),8500,"3.500 + 5.000 = 8.500."),
  od("Ordene para ver as notas abertas do maior para o menor valor:",["Selecionar a tabela","Ligar o filtro (Dados › Filtro)","Filtrar Status = Aberta","Classificar Valor do maior para o menor"],"Filtrar e depois ordenar o que ficou."),
  mc("Por que selecionar a tabela inteira antes de classificar?",["*Para as colunas não se desalinharem das linhas","Para o processo ficar mais rápido no Excel","Porque o Excel exige que a tabela tenha cor","Não faz diferença: o Excel sempre escolhe sozinho"],"Classificar uma coluna sozinha embaralha os registros."),
  tf("Dá para classificar por duas colunas ao mesmo tempo, como centro de custo e depois valor.",true,"Adicione níveis em Dados › Classificar.")
 ]},
{id:"xl6", title:"Tabela formatada e dados limpos", icon:"🧹",
 recap:["Formatar como tabela faz as linhas novas entrarem nas fórmulas e na tabela dinâmica (depois de Atualizar).", "Vilões da base: número guardado como texto, espaços sobrando e linhas duplicadas.", "ARRUMAR tira os espaços; converta o texto em número."],
 learn:[
  {h:"Formatar como tabela", b:`<p>Em <b>Página Inicial › Formatar como Tabela</b>, o intervalo vira uma tabela com nome. Vantagens:</p>` + ul(['Linhas novas entram automaticamente nas fórmulas e na tabela dinâmica (depois de Atualizar).','Uma fórmula digitada numa coluna se completa sozinha até o fim.','Filtros e linhas zebradas já vêm prontos.'])},
  {h:"Os vilões da base", b:tbl(['Problema','Sinal','Solução'],[['Número guardado como texto','Alinhado à esquerda, triângulo verde','Converter em número'],['Espaços sobrando','"Beta " diferente de "Beta"','=ARRUMAR(B2)'],['Linhas duplicadas','Mesma nota duas vezes','Dados › Remover Duplicatas'],['Tudo numa coluna só','"1001;Alfa;TI"','Dados › Texto para Colunas']])}
 ],
 ex:[
  mc("Um número alinhado à esquerda com um triângulo verde no canto provavelmente:",["*Está guardado como texto, não como número","É uma fórmula que ainda não foi calculada","Está negativo e precisa ser corrigido","Está vindo de outra aba da mesma planilha"],"Número como texto não entra em somas nem casa com o PROCV."),
  mc("Qual função remove os espaços sobrando no começo e no fim de um texto?",["*ARRUMAR","SEERRO","CONCAT","ARRED"],"=ARRUMAR(B2) limpa espaços extras."),
  tf("Numa tabela formatada, uma fórmula digitada na coluna se completa sozinha nas outras linhas.",true,"É uma das vantagens da tabela."),
  cl("Qual recurso resolve?",["Remover Duplicatas","Texto para Colunas","ARRUMAR"],"Nota 1003 lançada duas vezes:0|Código, fornecedor e valor numa coluna só:1|\"Alfa \" com espaço no fim:2","Cada problema, sua ferramenta."),
  tf("Remover duplicatas pode ser feito sem conferir quais linhas são repetidas.",false,"Confira antes: duas notas de mesmo valor podem ser legítimas."),
  mc("Por que números guardados como texto são um problema?",["*SOMA e PROCV podem ignorá-los ou não encontrá-los","Porque eles ficam coloridos e atrapalham a leitura","Porque ocupam mais espaço no arquivo da planilha","Não são problema: o Excel converte tudo sozinho"],"Texto não entra na soma e não é igual a número numa busca.")
 ]},
{id:"xl7", title:"Validação e formatação condicional", icon:"🚦",
 recap:["A lista suspensa (validação de dados) evita variações como “Pg” e “Paga ” na mesma coluna.", "A formatação condicional pinta células por regra, como vencimentos passados.", "Regras com fórmula permitem várias condições, como vencida e ainda não paga."],
 learn:[
  {h:"Lista suspensa", b:`<p>Em <b>Dados › Validação de Dados › Lista</b>, a célula só aceita valores de uma lista (ex.: Aberta, Recebida, Paga). Isso evita "Paga", "Pg" e "Paga " (com espaço) misturados, que viram categorias diferentes nas somas e na tabela dinâmica.</p>`},
  {h:"Destacar o que importa", b:`<p>Em <b>Página Inicial › Formatação Condicional</b>, você pinta células por regra: vencimentos passados em vermelho, valores acima do orçamento em amarelo.</p>` + box('exemplo','Regra com fórmula para notas vencidas: =E($F2&lt;HOJE();$E2&lt;&gt;"Paga") — vencimento no passado e ainda não paga.')}
 ],
 ex:[
  mc('Para impedir que alguém digite "Pg" em vez de "Paga", use:',["*Validação de dados com lista","Formatação condicional","Filtro","Remover duplicatas"],"A validação controla o que pode ser digitado."),
  tf("A formatação condicional muda o valor da célula.",false,"Ela só muda a aparência."),
  mc('A regra =E($F2&lt;HOJE();$E2&lt;&gt;"Paga") destaca:',["*Notas vencidas que ainda não foram pagas","Todas as notas que já foram pagas","Só as notas que vencem exatamente hoje","Nenhuma nota, porque a regra está incompleta"],"As duas condições precisam ser verdadeiras."),
  tf('"Paga" e "Paga " (com espaço no fim) viram categorias diferentes numa tabela dinâmica.',true,"O espaço torna os textos diferentes."),
  cl("Validação ou formatação condicional?",["Validação de dados","Formatação condicional"],"Limitar o status a uma lista:0|Pintar de vermelho as notas vencidas:1|Aceitar só datas no campo de vencimento:0|Destacar valores acima de R$ 10.000:1","Validação controla o que entra; formatação muda a aparência."),
  mc("Qual função retorna a data de hoje?",["*HOJE()","DATA()","DIA()","ANO()"],"HOJE() se atualiza sozinha a cada dia.")
 ]},

/* ================= PROCV ================= */
{id:"xl8", title:"PROCV: buscando informações", icon:"🔎",
 recap:["O PROCV busca um valor na primeira coluna da matriz e traz um dado de outra coluna.", "Ele tem quatro pedaços: o que procurar, onde, qual coluna trazer e o tipo de correspondência.", "A tabela deve começar pela coluna do código."],
 learn:[
  {h:"Para que serve", b:`<p>O PROCV procura um valor na <b>primeira coluna</b> de uma tabela e traz o que está na mesma linha, em outra coluna. No financeiro: trazer o nome do fornecedor pelo código, o centro de custo, o prazo de pagamento.</p>` + eq('=PROCV(valor_procurado; matriz_tabela; núm_índice_coluna; [procurar_intervalo])')},
  {h:"Um exemplo", b:forn() + box('exemplo','=PROCV("F02";A2:D5;2;FALSO) procura F02 na coluna A e traz a 2ª coluna da tabela: <b>Beta</b>. Com 4 no lugar do 2, traz o prazo: <b>45</b>.')},
  {h:"Os quatro pedaços", b:ol(['<b>O que procurar</b>: um código, um CNPJ, um número de nota (pode ser uma célula, como H2).','<b>Onde procurar</b>: a tabela inteira, começando pela coluna do código.','<b>Qual coluna trazer</b>: contando a partir da primeira coluna da tabela (1, 2, 3…).','<b>FALSO</b>: correspondência exata. Use sempre para códigos.'])}
 ],
 ex:[
  mc('=PROCV("F03";A2:D5;2;FALSO) retorna:' + forn(),["*Gama","Marketing","15","F03"],"F03 está na linha 4; a 2ª coluna é o nome."),
  nu('=PROCV("F01";A2:D5;4;FALSO) retorna:' + forn(),30,"F01 está na linha 2; a 4ª coluna é o prazo: 30."),
  od("Ordene os argumentos do PROCV:",["Valor procurado","Matriz da tabela","Número da coluna a trazer","FALSO (correspondência exata)"],"O quê, onde, qual coluna e tipo de busca."),
  fl("Trazer o centro de custo do código em H2: =PROCV({H2};A2:D5;{3};{FALSO})",["2","VERDADEIRO","A2"],"H2 é o código, 3 é a coluna do centro de custo e FALSO pede a correspondência exata."),
  mc("Na matriz A2:D5, o número 3 do PROCV indica:",["*A 3ª coluna da matriz, ou seja, a coluna C","A linha 3 da matriz, de cima para baixo","O terceiro fornecedor da lista encontrada","A quantidade de resultados que serão devolvidos"],"A contagem começa na primeira coluna da matriz."),
  tf("O PROCV procura o valor em qualquer coluna da matriz, à sua escolha.",false,"O PROCV procura sempre na primeira coluna da matriz. Por isso a tabela deve começar pela coluna do código.")
 ]},
{id:"xl9", title:"Correspondência exata e erros", icon:"⚠️",
 recap:["O último argumento FALSO (ou 0) exige correspondência exata.", "#N/D significa que não achou; #REF! indica coluna fora da matriz; #NOME? indica nome de função errado.", "Códigos que parecem iguais podem diferir por espaço ou por serem texto e número."],
 learn:[
  {h:"FALSO não é detalhe", b:`<p>O último argumento define o tipo de busca. <b>FALSO</b> (ou 0) é a correspondência exata. Se ele for <b>omitido</b>, o Excel usa VERDADEIRO (aproximada), que presume a primeira coluna em ordem e pode trazer a linha errada sem avisar.</p>` + box('regra','Buscou código, CNPJ ou número de nota? Sempre FALSO.')},
  {h:"Os erros e o que significam", b:tbl(['Erro','Causa comum'],[['#N/D','O valor procurado não existe na 1ª coluna (ou está escrito diferente)'],['#REF!','O número da coluna é maior que o número de colunas da matriz'],['#NOME?','Nome da função errado ou texto sem aspas']]) + box('dica','=SEERRO(PROCV(H2;A2:D5;2;FALSO);"Não cadastrado") troca o erro por uma mensagem.')}
 ],
 ex:[
  tf("Se o último argumento do PROCV for omitido, o Excel usa correspondência exata.",false,"Omitido, vale VERDADEIRO (aproximada). Para códigos, escreva FALSO."),
  mc('=PROCV("F09";A2:D5;2;FALSO) retorna:' + forn(),["*#N/D","#REF!","Delta","0"],"F09 não existe na coluna A."),
  mc('=PROCV("F02";A2:D5;6;FALSO) retorna:' + forn(),["*#REF!","#N/D","45","Beta"],"A matriz tem só 4 colunas."),
  fl('Mostrar "Não cadastrado" em vez do erro: ={SEERRO}(PROCV(H2;A2:D5;2;FALSO);"Não cadastrado")',["SE","ARRUMAR"],"SEERRO devolve o resultado ou, se der erro, o texto indicado."),
  mc("Qual último argumento usar para buscar um CNPJ?",["*FALSO (exata)","VERDADEIRO (aproximada)","Tanto faz","Nenhum"],"Identificadores pedem correspondência exata."),
  tf("#NOME? costuma aparecer quando o nome da função está escrito errado.",true,"Ex.: =PROCVV(…).")
 ]},
{id:"xl10", title:"Travando a matriz e armadilhas", icon:"🔒",
 recap:["Ao copiar o PROCV para baixo, trave a matriz com $: $F$2:$H$50.", "Se o código aparece duas vezes, o PROCV traz a primeira ocorrência.", "Quando não acha, confira espaços, texto x número e o cadastro."],
 learn:[
  {h:"Copiando o PROCV para baixo", b:`<p>Numa base de notas, o PROCV é copiado para centenas de linhas. Sem cifrão, a matriz anda junto (A2:D5 vira A3:D6, A4:D7…) e os primeiros fornecedores somem da busca.</p>` + eq('=PROCV(B2;$A$2:$D$5;2;FALSO)') + box('dica','Outra saída é usar colunas inteiras ($A:$D) ou uma tabela formatada, que não andam.')},
  {h:"Quando o PROCV não acha", b:ul(['A coluna procurada precisa ser a <b>primeira</b> da matriz: o PROCV não olha para a esquerda.','<b>Número x texto</b>: "1001" (texto) não é igual a 1001 (número).','<b>Espaços</b>: "F02 " não é "F02". Limpe com ARRUMAR.','<b>Duplicados</b>: se o código aparece duas vezes, o PROCV traz a primeira ocorrência.'])}
 ],
 ex:[
  mc("B2 tem =PROCV(A2;F2:H50;2;FALSO) e foi copiada até B200. O problema é:",["*A matriz se desloca ao copiar; o certo é $F$2:$H$50","Nenhum: a fórmula funciona igual em todas as linhas","O número da coluna muda sozinho ao copiar para baixo","O FALSO vira VERDADEIRO nas linhas de baixo"],"Sem cifrão, F2:H50 vira F3:H51, F4:H52…"),
  fl("Trave a matriz: =PROCV(A2;{$F$2:$H$50};2;FALSO)",["F2:H50","$F2:H$50"],"Com cifrão nas duas pontas, a matriz não anda ao copiar."),
  tf("O PROCV consegue trazer um valor de uma coluna à esquerda da coluna procurada.",false,"Ele só olha para a direita. Use PROCX ou ÍNDICE+CORRESP."),
  mc('Na base, o código está como "F02 " (com espaço). O PROCV por "F02" retorna:',["*#N/D","Beta","#REF!","F02"],"O espaço torna os textos diferentes."),
  mc("A nota 1001 está como texto numa tabela e como número na outra. O PROCV:",["*Não encontra (#N/D)","Encontra normalmente","Retorna zero","Soma os dois"],"Texto e número não são iguais para a busca."),
  tf("Se o código aparece duas vezes, o PROCV soma os dois resultados.",false,"O PROCV traz só a primeira ocorrência, sem somar. Por isso vale remover duplicados do cadastro.")
 ]},
{id:"xl11", title:"PROCX e ÍNDICE + CORRESP", icon:"🧭",
 recap:["O PROCX indica onde procurar e de onde trazer, em qualquer direção, com correspondência exata por padrão.", "ÍNDICE + CORRESP funciona em qualquer versão e em qualquer direção.", "O PROCX existe no Microsoft 365 e no Excel 2021 ou mais novo."],
 learn:[
  {h:"PROCX", b:`<p>No Microsoft 365 e no Excel 2021 ou mais novo existe o PROCX: você indica onde procurar e de onde trazer, em qualquer direção, e a correspondência já é exata por padrão.</p>` + eq('=PROCX(valor; matriz_procura; matriz_retorno; [se_não_encontrado])') + box('exemplo','=PROCX("Beta";B2:B5;A2:A5;"Não achei") traz F02, que está numa coluna <b>à esquerda</b>.')},
  {h:"ÍNDICE + CORRESP", b:eq('=ÍNDICE(A2:A5; CORRESP("Beta"; B2:B5; 0))') + ul(['CORRESP acha a posição (0 = correspondência exata).','ÍNDICE traz o valor daquela posição.','Funciona em qualquer versão e em qualquer direção.']) + box('dica','Na entrevista: PROCV é o básico esperado; mostrar que conhece o PROCX é um diferencial.')}
 ],
 ex:[
  mc('=PROCX("Gama";B2:B5;A2:A5) retorna:' + forn(),["*F03","Marketing","15","#N/D"],"Procura em B e traz de A."),
  tf("O PROCX usa correspondência exata por padrão.",true,"Diferente do PROCV com o último argumento omitido."),
  nu('=CORRESP("Gama";B2:B5;0) retorna a posição:' + forn(),3,"Alfa (1), Beta (2), Gama (3)."),
  mc("Qual combinação busca à esquerda em qualquer versão do Excel?",["*ÍNDICE + CORRESP","SOMA + SE","PROCV com VERDADEIRO","CONT.SE"],"CORRESP acha a posição; ÍNDICE traz o valor."),
  mt([["PROCV","Busca na 1ª coluna e traz à direita"],["PROCX","Busca em qualquer coluna, exata por padrão"],["CORRESP","Retorna a posição de um valor"],["ÍNDICE","Retorna o valor de uma posição"]],"Ferramentas de busca."),
  tf("Numa empresa com Excel antigo, o PROCX pode não estar disponível.",true,"Ele existe no Microsoft 365 e no Excel 2021 ou mais novo.")
 ]},

/* ================= SOMASE, SOMASES e CONT.SES ================= */
{id:"xl12", title:"SOMASE: somar com uma condição", icon:"➕",
 recap:["SOMASE soma com uma condição: intervalo do critério, critério e intervalo a somar.", "Na SOMASE o intervalo a somar vem por último; na SOMASES, primeiro.", "O critério pode estar numa célula."],
 learn:[
  {h:"A sintaxe", b:eq('=SOMASE(intervalo; critérios; [intervalo_soma])') + notas() + box('exemplo','=SOMASE(B2:B6;"Alfa";D2:D6) soma as notas da Alfa: 1.200 + 800 = <b>2.000</b>.')},
  {h:"Critério numa célula", b:`<p>Em vez de digitar o nome, aponte para uma célula: =SOMASE($B$2:$B$6;G2;$D$2:$D$6). A mesma fórmula serve para cada fornecedor listado na coluna G.</p>` + box('dica','Sem o intervalo_soma, a SOMASE soma o próprio intervalo do critério. Útil para "somar valores acima de 1.000".')}
 ],
 ex:[
  nu('Qual o resultado de =SOMASE(C2:C6;"TI";D2:D6)?' + notas(),5000,"3.500 + 1.500 = 5.000."),
  nu('Qual o resultado de =SOMASE(E2:E6;"Paga";D2:D6)?' + notas(),3500,"1.200 + 800 + 1.500 = 3.500."),
  nu('Qual o resultado de =SOMASE(D2:D6;">1000")?' + notas(),11200,"Sem intervalo_soma, soma o próprio intervalo: 1.200 + 3.500 + 5.000 + 1.500."),
  od("Ordene os argumentos da SOMASE:",["Intervalo do critério","Critério","Intervalo a somar"],"Na SOMASE, o que se soma vem por último."),
  fl('Somar as notas da Beta: =SOMASE({B2:B6};"Beta";{D2:D6})',["C2:C6","E2:E6"],"O critério é o fornecedor (coluna B) e a soma é o valor (coluna D)."),
  tf("Na SOMASES, o intervalo a somar é o último argumento.",false,"Na SOMASES o intervalo a somar é o primeiro. Só na SOMASE ele vem por último. Atenção a essa diferença.")
 ]},
{id:"xl13", title:"SOMASES: várias condições", icon:"➕",
 recap:["SOMASES soma com várias condições, e todas precisam ser atendidas ao mesmo tempo.", "Sintaxe: intervalo a somar, depois pares de intervalo e critério.", "Funciona como um E entre as condições."],
 learn:[
  {h:"A sintaxe", b:eq('=SOMASES(intervalo_soma; intervalo_critérios1; critérios1; intervalo_critérios2; critérios2; …)') + box('atencao','A ordem muda! Na SOMASES, o intervalo a somar vem <b>primeiro</b>. Na SOMASE, ele vem por último.')},
  {h:"Um exemplo", b:notas() + box('exemplo','=SOMASES(D2:D6;C2:C6;"TI";E2:E6;"Paga") soma as notas de TI já pagas: <b>1.500</b>.') + `<p>Todas as condições precisam ser verdadeiras ao mesmo tempo (funciona como um E). O Excel aceita até 127 pares de critérios.</p>`}
 ],
 ex:[
  nu('Qual o resultado de =SOMASES(D2:D6;C2:C6;"TI";E2:E6;"Aberta")?' + notas(),3500,"Só a nota 1002 é de TI e está aberta."),
  nu('Qual o resultado de =SOMASES(D2:D6;B2:B6;"Alfa";E2:E6;"Paga")?' + notas(),2000,"1.200 + 800 = 2.000."),
  mc("Qual fórmula soma as notas de Marketing em aberto?",['*=SOMASES(D2:D6;C2:C6;"Marketing";E2:E6;"Aberta")','=SOMASES(C2:C6;"Marketing";D2:D6;E2:E6;"Aberta")','=SOMASE(D2:D6;C2:C6;"Marketing";"Aberta")','=SOMASES("Marketing";C2:C6;D2:D6)'],"Intervalo a somar primeiro, depois os pares intervalo/critério."),
  tf("Na SOMASES, todas as condições precisam ser atendidas ao mesmo tempo.",true,"Funciona como um E."),
  od("Ordene os argumentos da SOMASES:",["Intervalo a somar","Intervalo do 1º critério","1º critério","Intervalo do 2º critério","2º critério"],"Soma primeiro; depois os pares."),
  nu('Qual o resultado de =SOMASES(D2:D6;C2:C6;"Comercial";E2:E6;"Aberta")?' + notas(),0,"Não há nota do Comercial em aberto.")
 ]},
{id:"xl14", title:"Critérios com operadores, células e datas", icon:"📅",
 recap:["Critérios aceitam operadores (\">1000\", \"<>Paga\") e curingas (*, ?).", "Para usar o valor de uma célula, junte o operador com &: \">=\"&G1.", "Para somar um mês, use datas de corte com DATA e FIMMÊS."],
 learn:[
  {h:"Escrevendo critérios", b:tbl(['Critério','Significa'],[['">1000"','maior que 1.000'],['"&lt;&gt;Paga"','diferente de Paga'],['"&gt;="&amp;G1','maior ou igual ao valor em G1'],['"*Energia*"','contém "Energia" (curinga *)'],['"F0?"','F0 e mais um caractere (curinga ?)']]) + box('regra','Operador e célula se juntam com &amp;: "&gt;="&amp;G1.')},
  {h:"Somando um mês", b:`<p>Para somar março de 2026 numa coluna de datas (A):</p>` + eq('=SOMASES(C:C; A:A; ">="&DATA(2026;3;1); A:A; "<="&FIMMÊS(DATA(2026;3;1);0))') + box('dica','FIMMÊS(data;0) devolve o último dia do mês daquela data. É o jeito seguro para meses de 28, 30 ou 31 dias.') + g(DATAS)}
 ],
 ex:[
  nu('Qual o resultado de =SOMASES(C2:C5;A2:A5;">="&DATA(2026;4;1);A2:A5;"<="&FIMMÊS(DATA(2026;4;1);0))?' + g(DATAS),1250,"Abril: 950 + 300 = 1.250."),
  nu('Qual o resultado de =SOMASE(B2:B5;"*Energia*";C2:C5)?' + g(DATAS),1850,"As duas contas de energia: 900 + 950."),
  nu('Qual o resultado de =SOMASES(C2:C5;C2:C5;">500")?' + g(DATAS),5850,"900 + 4.000 + 950 = 5.850."),
  mc("Qual critério soma tudo o que NÃO está pago?",['*"<>Paga"','"=Paga"','"!Paga"','"-Paga"'],"No Excel, diferente é <>."),
  fl('Critério apontando para a célula G1: ">="{&}G1',["+","*"],"O & junta o operador com o valor da célula."),
  tf("FIMMÊS(DATA(2026;2;1);0) devolve 29/02/2026.",false,"2026 não é ano bissexto: fevereiro termina em 28/02/2026.")
 ]},
{id:"xl15", title:"CONT.SES e MÉDIASES", icon:"🔢",
 recap:["CONT.SE e CONT.SES contam com uma ou várias condições; MÉDIASES tira média com condições.", "Contagens alimentam indicadores, como % de notas em aberto.", "Exemplo: 2 abertas em 5 notas são 40%."],
 learn:[
  {h:"Contar e tirar média com condições", b:tbl(['Função','O que faz'],[['CONT.SE','Conta com 1 condição. <br><code>=CONT.SE(E2:E6;"Aberta")</code>'],['CONT.SES','Conta com várias condições. <br><code>=CONT.SES(C2:C6;"TI";E2:E6;"Paga")</code>'],['MÉDIASES','Média com condições. <br><code>=MÉDIASES(D2:D6;C2:C6;"TI")</code>']]) + notas()},
  {h:"Indicadores com contagem", b:box('exemplo','% de notas em aberto = CONT.SE(E2:E6;"Aberta") ÷ CONT.VALORES(A2:A6) = 2 ÷ 5 = <b>40%</b>.') + box('dica','Contagens alimentam indicadores como "% de notas com divergência" e "% de ordens de compra no prazo".')}
 ],
 ex:[
  nu('Qual o resultado de =CONT.SE(B2:B6;"Beta")?' + notas(),2,"Duas notas da Beta."),
  nu('Qual o resultado de =CONT.SES(C2:C6;"TI";E2:E6;"Paga")?' + notas(),1,"Só a nota 1005."),
  nu('Qual o resultado de =MÉDIASES(D2:D6;C2:C6;"TI")?' + notas(),2500,"(3.500 + 1.500) ÷ 2 = 2.500."),
  nu("Que percentual das notas está pago?" + notas(),60,"3 notas pagas ÷ 5 notas = 60%.","%"),
  mt([["SOMASES","Soma com condições"],["CONT.SES","Conta com condições"],["MÉDIASES","Média com condições"],["CONT.VALORES","Conta células preenchidas"]],"A família SES."),
  mc("Na MÉDIASES, o primeiro argumento é:",["*O intervalo com os valores para a média","O critério que será usado para filtrar as linhas","O intervalo onde está o critério de filtro","A célula onde o resultado vai aparecer"],"Igual à SOMASES: os valores vêm primeiro.")
 ]},

/* ================= Tabela dinâmica ================= */
{id:"xl16", title:"Preparando a base", icon:"🧱",
 recap:["Uma boa base tem cabeçalho único, uma linha por lançamento, sem linhas vazias, totais ou células mescladas.", "Prefira uma coluna Data a uma coluna para cada mês.", "Base limpa antes da tabela dinâmica evita relatório errado."],
 learn:[
  {h:"Regras de uma boa base", b:ul(['Uma linha por registro (uma nota por linha).','Um cabeçalho em cada coluna, sem repetir nomes.','Sem linhas ou colunas totalmente em branco no meio.','Sem células mescladas.','Datas como data e valores como número.']) + box('dica','Formate a base como tabela: ao incluir linhas novas, a tabela dinâmica as encontra depois de Atualizar.')},
  {h:"Base ruim x base boa", b:tbl(['Base ruim','Base boa'],[['Subtotais no meio das linhas','Só registros; os totais ficam na tabela dinâmica'],['Meses nas colunas (jan, fev, mar…)','Uma coluna Data ou Mês'],['"TI" mesclado em 5 linhas','"TI" repetido em cada linha']])}
 ],
 ex:[
  cl("Isso atrapalha a tabela dinâmica?",["Atrapalha","Tudo bem"],"Célula mesclada no centro de custo:0|Linha de subtotal no meio da base:0|Cabeçalho em todas as colunas:1|Datas em formato de data:1|Coluna sem cabeçalho:0","Base limpa: um registro por linha e cabeçalho em tudo."),
  tf("Linhas de subtotal dentro da base ajudam a tabela dinâmica.",false,"Ela somaria o subtotal junto com os registros, dobrando valores."),
  mc("Qual formato é melhor para analisar gastos por mês?",["*Uma coluna Data, com cada lançamento numa linha","Uma coluna para cada mês do ano, lado a lado, com os totais","Uma aba separada para cada mês do ano","Um arquivo separado para cada mês do ano"],"A tabela dinâmica agrupa as datas por mês para você."),
  tf("Formatar a base como tabela ajuda a tabela dinâmica a incluir as linhas novas.",true,"A fonte de dados cresce junto."),
  mc("Uma coluna sem cabeçalho na base faz com que:",["*O Excel não crie a tabela dinâmica até a coluna ter nome","Nada aconteça, porque o Excel inventa um nome para a coluna","Os valores da coluna sejam dobrados na tabela dinâmica","As cores da tabela mudem para o padrão do Excel"],"Todo campo precisa de um nome."),
  od("Ordene a preparação da base:",["Conferir os cabeçalhos","Remover linhas em branco e subtotais","Desfazer células mescladas","Formatar como tabela"],"Limpar primeiro, formatar no fim.")
 ]},
{id:"xl17", title:"Montando a tabela dinâmica", icon:"🧩",
 recap:["Na tabela dinâmica, arraste campos para Linhas, Colunas, Valores e Filtros.", "Campo de texto em Valores vira Contagem; campo numérico vira Soma.", "Confira: o total geral tem de bater com a soma da base."],
 learn:[
  {h:"As quatro áreas", b:`<p>Em <b>Inserir › Tabela Dinâmica</b>, escolha a base e onde colocar. Depois arraste os campos:</p>` + tbl(['Área','Para quê','Exemplo'],[['Linhas','Itens de cima para baixo','Centro de custo'],['Colunas','Itens lado a lado','Status'],['Valores','O que somar ou contar','Soma de Valor'],['Filtros','Filtrar o relatório inteiro','Fornecedor']])},
  {h:"O resultado com a base de notas", b:PIVOT + box('dica','Campo de texto em Valores vira Contagem; campo de número vira Soma. Dá para trocar em Configurações do Campo de Valor.')}
 ],
 ex:[
  cl("Em que área colocar?",["Linhas","Valores","Filtros"],"Centro de custo, para listar cada um:0|Valor, para somar:1|Fornecedor, para ver um de cada vez:2","Linhas listam, Valores calculam, Filtros recortam."),
  nu("Nesta tabela dinâmica, quanto o TI tem em aberto?" + PIVOT,3500,"Cruzamento TI × Aberta."),
  nu("Qual o total geral das notas pagas?" + PIVOT,3500,"Coluna Paga, linha Total geral."),
  tf("Um campo de texto colocado em Valores é contado, não somado.",true,"Texto não se soma."),
  od("Ordene a criação:",["Clicar dentro da base","Inserir › Tabela Dinâmica","Arrastar Centro de custo para Linhas","Arrastar Valor para Valores"],"Criar e depois montar."),
  mc("Para ver cada status numa coluna separada, arraste Status para:",["*Colunas","Valores","Filtros","Linhas"],"Colunas mostram itens lado a lado.")
 ]},
{id:"xl18", title:"Agrupar, mostrar % e atualizar", icon:"🔄",
 recap:["Agrupe datas por mês, mostre valores como % do total e dê duplo clique para ver os lançamentos.", "A tabela dinâmica não se atualiza sozinha: use Atualizar.", "Se a base cresceu e não é tabela formatada, altere a fonte de dados."],
 learn:[
  {h:"Três recursos que impressionam", b:ul(['<b>Agrupar datas</b>: clique direito numa data › Agrupar › Meses (e Anos, se houver mais de um ano).','<b>% do total</b>: clique direito no valor › Mostrar Valores Como › % do Total Geral.','<b>Detalhar</b>: duplo clique num número mostra as linhas que o formam.'])},
  {h:"Ela não se atualiza sozinha", b:box('atencao','Mudou a base? Clique direito na tabela dinâmica › Atualizar. Sem isso, o relatório mostra os números antigos.') + `<p>Se a base cresceu e não é uma tabela formatada, ajuste o intervalo em <b>Alterar Fonte de Dados</b>.</p>`}
 ],
 ex:[
  tf("Ao alterar um valor na base, a tabela dinâmica se atualiza automaticamente.",false,"É preciso clicar em Atualizar."),
  nu("Com % do Total Geral, quanto representa Marketing (5.000 de 12.000)? Arredonde para inteiro.",42,"5.000 ÷ 12.000 ≈ 41,7%, ou 42%.","%",undefined,0.5),
  mc("Para ver os lançamentos que formam um número da tabela dinâmica:",["*Dar duplo clique no número que interessa","Apagar a tabela dinâmica e criar outra","Desfazer a última ação com Ctrl+Z","Filtrar a base de dados original"],"O Excel abre uma aba com as linhas de origem."),
  mc("A base ganhou 200 linhas novas e não é uma tabela formatada. Além de atualizar, é preciso:",["*Alterar a fonte de dados para incluir as linhas novas","Nada: atualizar já inclui as linhas novas automaticamente","Recriar o arquivo do zero em uma nova planilha","Mesclar as células novas com as células antigas"],"A fonte antiga não enxerga as linhas de baixo."),
  od("Ordene depois de corrigir um valor na base:",["Corrigir o valor na base","Clicar na tabela dinâmica","Clique direito › Atualizar","Conferir o total com a soma da base"],"Atualizar e conferir."),
  tf("Dá para mostrar os valores como percentual do total geral.",true,"Mostrar Valores Como › % do Total Geral.")
 ]},
{id:"xl19", title:"Segmentação, gráfico e a ferramenta certa", icon:"🎛️",
 recap:["A segmentação filtra a tabela dinâmica com botões, e o gráfico dinâmico acompanha os filtros.", "Tabela dinâmica serve para explorar; SOMASES serve para relatório com layout fixo.", "Na entrevista, explique quando usar cada ferramenta."],
 learn:[
  {h:"Deixando interativo", b:ul(['<b>Segmentação de dados</b>: botões para filtrar a tabela dinâmica com um clique (Analisar Tabela Dinâmica › Inserir Segmentação de Dados).','<b>Gráfico dinâmico</b>: um gráfico que acompanha os filtros da tabela dinâmica.'])},
  {h:"Tabela dinâmica ou SOMASES?", b:tbl(['Situação','Melhor escolha'],[['Explorar a base e descobrir onde está o gasto','Tabela dinâmica'],['Relatório mensal com layout fixo e comentários','SOMASES'],['Resumo rápido para uma reunião','Tabela dinâmica'],['Previsto x realizado lado a lado','SOMASES (o previsto está em outra tabela)']])}
 ],
 ex:[
  cl("Qual ferramenta?",["Tabela dinâmica","SOMASES"],"Descobrir rapidamente qual centro gastou mais:0|Relatório fixo de previsto x realizado:1|Resumo para uma reunião em 5 minutos:0|Célula que alimenta um indicador do painel:1","Explorar pede tabela dinâmica; layout fixo pede fórmulas."),
  mc("A segmentação de dados serve para:",["*Filtrar a tabela dinâmica com botões","Somar os valores de várias tabelas dinâmicas","Mesclar células da tabela dinâmica em grupos","Proteger a planilha contra alterações de outras pessoas"],"Filtro visual, com um clique."),
  tf("O gráfico dinâmico muda junto com os filtros da tabela dinâmica.",true,"Eles ficam ligados."),
  mc("Por que o previsto x realizado costuma ser feito com SOMASES?",["*Previsto e realizado vêm de tabelas diferentes","Porque a tabela dinâmica não sabe somar valores","Porque a função SOMASES deixa o relatório mais bonito","Não há motivo: dá no mesmo usar qualquer ferramenta"],"A fórmula junta as duas fontes no layout que o gestor espera."),
  tf("Na entrevista, vale explicar quando usar tabela dinâmica e quando usar fórmulas.",true,"Mostra critério, não só técnica."),
  mt([["Segmentação de dados","Filtro com botões"],["Gráfico dinâmico","Gráfico ligado à tabela dinâmica"],["Atualizar","Relê a base"],["Mostrar Valores Como","% do total e outras visões"]],"Recursos da tabela dinâmica.")
 ]},

/* ================= Na prática: o teste de Excel ================= */
{id:"xl20", title:"Teste 1: notas e fornecedores", icon:"🧪",
 recap:["O teste costuma pedir PROCV, SOMASES e uma tabela dinâmica.", "Roteiro: ler tudo, conferir a base, resolver com fórmulas e conferir os totais.", "Nunca digite resultados à mão."],
 learn:[
  {h:"O que costuma cair", b:`<p>Muitas seleções para analista aplicam um teste prático curto: completar colunas com PROCV, resumir valores com SOMASES e montar uma tabela dinâmica. As lições desta unidade simulam isso. Para treinar no Excel de verdade, baixe a planilha:</p>` + download('/carreira/treino-excel-analista.xlsx','Baixar a planilha de treino (.xlsx)') + box('dica','Faça no computador, marcando o tempo. O gabarito está na última aba: só olhe no fim.')},
  {h:"Roteiro para qualquer teste", b:ol(['Leia todo o enunciado antes de começar.','Confira a base: cabeçalhos, espaços sobrando, números como texto.','Resolva com fórmulas, sem digitar resultados à mão.','Confira os totais: o resumo precisa bater com a soma da base.','Formate os valores e salve com o nome pedido.'])},
  {h:"A base deste teste", b:`<p>Na aba Notas, a coluna D deve trazer o nome do fornecedor e a E, o prazo, a partir do código da coluna B. O cadastro de fornecedores está em H1:K5:</p>` + g([['Nota','Código','Valor','Fornecedor','Prazo'],[2001,'F02','4.000','',''],[2002,'F04','600','',''],[2003,'F02','1.100','','']],['D2']) + g(FORN,[],{startCol:'H'})}
 ],
 ex:[
  mc("Qual fórmula em D2 traz o nome do fornecedor e pode ser copiada para baixo?",["*=PROCV(B2;$H$2:$K$5;2;FALSO)","=PROCV(B2;H2:K5;2)","=PROCV($B$2;H2:K5;2;FALSO)","=PROCV(B2;$H$2:$K$5;1;FALSO)"],"B2 anda, a matriz fica travada, coluna 2 e FALSO."),
  mc("Copiada para D3 (nota 2002, código F04), a fórmula mostra:",["*Delta","Beta","#N/D","F04"],"F04 é a Delta."),
  fl("Prazo em E2: =PROCV(B2;$H$2:$K$5;{4};FALSO)",["2","3"],"O prazo é a 4ª coluna do cadastro (H, I, J, K)."),
  nu("Qual o prazo da nota 2001?" + g(FORN,[],{startCol:'H'}),45,"F02 tem prazo de 45 dias."),
  nu("Qual o total das notas da Beta (F02) nesta base?" + g([['Nota','Código','Valor'],[2001,'F02','4.000'],[2002,'F04','600'],[2003,'F02','1.100']]),5100,"4.000 + 1.100 = 5.100."),
  tf("Digitar os nomes dos fornecedores à mão é aceitável no teste, desde que fiquem certos.",false,"O avaliador quer ver fórmulas, que se atualizam quando a base muda."),
  od("Ordene o roteiro do teste:",["Ler todo o enunciado","Conferir a base","Resolver com fórmulas","Conferir os totais","Salvar com o nome pedido"],"Entender, conferir, resolver, validar e entregar.")
 ]},
{id:"xl21", title:"Teste 2: previsto x realizado", icon:"🧪",
 recap:["O previsto x realizado por centro pode vir de SOMASES com referências travadas.", "Variação = realizado − previsto; variação % = variação ÷ previsto.", "Para despesa, gastar acima do previsto é desfavorável, e totais iguais podem esconder centros estourados."],
 learn:[
  {h:"O resumo pedido", b:`<p>Com a base de notas (aba Notas, colunas C = centro de custo e D = valor), preencha o realizado de cada centro e a variação contra o previsto:</p>` + g([['Centro','Previsto','Realizado','Variação','%'],['Administrativo','1.500','','',''],['Comercial','1.000','','',''],['Marketing','4.000','','',''],['TI','5.500','','','']],['C2']) + eq('C2: =SOMASES(Notas!$D:$D;Notas!$C:$C;A2) &nbsp;·&nbsp; D2: =C2-B2 &nbsp;·&nbsp; E2: =D2/B2')},
  {h:"Como ler a variação", b:ul(['Variação = Realizado − Previsto.','Numa despesa, variação positiva significa gasto <b>acima</b> do previsto (desfavorável).','% = Variação ÷ Previsto.']) + box('dica','Total igual ao previsto não quer dizer que está tudo certo: olhe cada linha.')}
 ],
 ex:[
  mc("Qual fórmula traz o realizado do centro em A2, pronta para copiar para baixo?",["*=SOMASES(Notas!$D:$D;Notas!$C:$C;A2)","=SOMASES(Notas!$C:$C;Notas!$D:$D;A2)","=SOMASE(Notas!$D:$D;A2;Notas!$C:$C)","=PROCV(A2;Notas!$C:$D;2;FALSO)"],"Somar a coluna de valor com o critério do centro de custo. PROCV traria só a primeira nota."),
  nu("Qual o realizado de Marketing?" + notas(),5000,"Só a nota 1004, de R$ 5.000."),
  nu("Qual a variação de Marketing (realizado − previsto de R$ 4.000)?",1000,"5.000 − 4.000 = 1.000.","R$"),
  nu("Marketing: previsto de R$ 4.000 e realizado de R$ 5.000. Qual a variação percentual?",25,"1.000 ÷ 4.000 = 25%.","%"),
  mc("Marketing gastou 25% acima do previsto. Para uma despesa, isso é:",["*Desfavorável","Favorável","Neutro","Impossível"],"Gastou mais do que o planejado."),
  mc("O total previsto (R$ 12.000) é igual ao realizado (R$ 12.000). Conclusão:",["*Não basta: Marketing estourou e outros centros sobraram","Está tudo sob controle, porque os totais são iguais","O orçamento está errado, porque não deveria fechar igual","Não precisa de análise, pois nenhum centro passou do total"],"Variações opostas se compensam no total. Analise por centro."),
  tf("A variação percentual se calcula dividindo a variação pelo previsto.",true,"% = (Realizado − Previsto) ÷ Previsto.")
 ]},
{id:"xl22", title:"Teste 3: resumo e apresentação", icon:"🧪",
 recap:["O resumo por tabela dinâmica precisa ter total geral igual à soma da base.", "Escolha o gráfico pelo objetivo: colunas para comparar, linhas para evolução, pizza com moderação.", "Explique em três partes: o que foi pedido, como resolveu e como conferiu."],
 learn:[
  {h:"Resumo com tabela dinâmica", b:PIVOT + box('dica','Confira: o total geral da tabela dinâmica (12.000) precisa bater com =SOMA da coluna Valor da base.')},
  {h:"Qual gráfico usar", b:tbl(['Objetivo','Gráfico'],[['Comparar centros de custo','Colunas ou barras'],['Evolução mês a mês','Linhas'],['Participação no total, com poucas categorias','Pizza (com moderação)'],['Previsto x realizado','Colunas agrupadas']])},
  {h:"Explicando o que você fez", b:`<p>No fim do teste, é comum pedirem para você explicar a solução. Fale em três partes: o que foi pedido, como resolveu (quais funções) e como conferiu.</p>` + box('exemplo','"Usei PROCV com correspondência exata para trazer fornecedor e prazo, SOMASES para o realizado por centro de custo e conferi que o total da tabela dinâmica bate com a soma da base."')}
 ],
 ex:[
  cl("Qual gráfico?",["Colunas ou barras","Linhas"],"Comparar os gastos de cada centro de custo:0|Mostrar a despesa de energia mês a mês:1|Comparar fornecedores pelo valor comprado:0|Acompanhar o saldo de caixa ao longo do ano:1","Comparar categorias pede colunas; evolução no tempo pede linhas."),
  tf("Conferir se o total da tabela dinâmica bate com a soma da base é uma boa prática.",true,"É a validação mais simples e mais importante."),
  nu("Na tabela dinâmica do resumo, qual o total geral em aberto?" + PIVOT,8500,"Coluna Aberta, linha Total geral."),
  mc("Como mostrar quantas notas há por status, em vez da soma dos valores?",["*Trocar Soma por Contagem nas configurações do campo","Apagar a coluna Valor e criar uma tabela nova sem ela","Usar SOMASES em vez da tabela dinâmica para contar","Mesclar as células de status para agrupar as notas"],"Resumir valores por: Contagem."),
  ep("Explique, como numa entrevista, o que o PROCV faz e um cuidado importante ao usá-lo.","O PROCV procura um valor, como um código de fornecedor, na primeira coluna de uma tabela e traz a informação de outra coluna da mesma linha. O cuidado principal é usar FALSO para correspondência exata e travar a matriz com cifrão ao copiar.",[["Procura um valor","procur","busc","codigo","valor"],["Na primeira coluna","primeira coluna","1a coluna","coluna"],["Traz outra informação da linha","traz","retorn","mesma linha","outra coluna","informac"],["Correspondência exata ou matriz travada","falso","exat","cifrao","trav","absolut","$"]],"Resposta curta, com exemplo e um cuidado técnico, mostra domínio."),
  od("Ordene a explicação da sua solução:",["O que foi pedido","Quais funções você usou","Como você conferiu o resultado"],"Pedido, solução e validação.")
 ]}
];
