/* Exercícios bônus, anexados a lições já existentes (chave = id da lição). */
import { mc, tf, fl, mt, en, cl, nu, wr, ew, od, ep, ts } from '../engine/exercises/factories.js';

export default {
 base1:[
  od("Coloque as etapas do trabalho contábil em ordem:",["Registrar","Classificar","Resumir","Interpretar"],"Registrar, classificar, resumir e interpretar."),
  wr("Qual área é chamada de “linguagem dos negócios”?",["contabilidade"],"Contabilidade."),
  ep("Com suas palavras: para que serve a Contabilidade?","Para registrar e organizar os fatos que afetam o patrimônio de uma empresa e gerar informações que ajudam as pessoas a tomar decisões.",[["Registra e gera informação","inform","registr","dado","numer","relator","organiz","control"],["Ajuda a decidir","decis","decid","escolh","gest","planej"],["Sobre o patrimônio da empresa","patrim","dinheiro","bens","empresa","financ","negoc"]],"Informação útil sobre o patrimônio para decidir.")
 ],
 base2:[
  wr("Como se chamam os valores que a empresa tem a receber? (uma palavra)",["direitos","direito"],"Direitos."),
  wr("E as dívidas da empresa com terceiros? (uma palavra)",["obrigacoes","obrigacao","dividas"],"Obrigações."),
  ep("Explique a diferença entre um bem e um direito.","Bem é algo que a empresa possui, como dinheiro, máquinas ou estoques. Direito é um valor que ela tem a receber de terceiros, como uma venda a prazo.",[["Bem é algo que a empresa possui","possu","tem","propri","objeto","coisa","maquin","estoque","dinheiro"],["Direito é algo a receber de terceiros","receb","terceir","cliente","prazo","outro"]],"Bem: possui. Direito: tem a receber.")
 ],
 base3:[
  wr("Complete: Ativo = Passivo + ___ (duas palavras)",["patrimonio liquido","pl"],"Patrimônio Líquido."),
  nu("Passivo de R$ 70.000 e PL de R$ 50.000. Qual o Ativo?",120000,"70.000 + 50.000 = 120.000.","R$"),
  ep("Com suas palavras: por que o Ativo é sempre igual a Passivo + PL?","Porque todo recurso que a empresa tem veio de algum lugar: ou de terceiros, que é o passivo, ou dos sócios, que é o patrimônio líquido.",[["Todo recurso tem uma origem","origem","veio","vem","financi","fonte","de onde"],["Terceiros (passivo)","terceir","passivo","divid","credor","emprest"],["Sócios (PL)","soci","dono","pl","patrimonio","propri","capital"]],"O Ativo mostra onde estão os recursos; Passivo + PL mostram de onde vieram.")
 ],
 base4:[
  wr("Como se chama o resultado quando as despesas superam as receitas?",["prejuizo"],"Prejuízo."),
  nu("Receitas de R$ 12.000 e despesas de R$ 9.700. Qual o lucro?",2300,"12.000 − 9.700 = 2.300.","R$"),
  ep("Com suas palavras: o que é o regime de competência?","É registrar receitas e despesas no período em que acontecem, independentemente de quando o dinheiro é recebido ou pago.",[["No período em que acontecem","acontec","ocorr","fato gerador","period","mes","momento","quando"],["Não importa quando entra ou sai dinheiro","independ","nao importa","pagamento","recebimento","dinheiro","caixa","pago","recebido"]],"Competência: pelo fato, não pelo dinheiro.")
 ],
 dc1:[
  ts("Caixa",[3000,1500],[2000],"Débitos 4.500 − créditos 2.000 = 2.500, saldo devedor."),
  ts("Fornecedores",[1000],[4000,2500],"Créditos 6.500 − débitos 1.000 = 5.500, saldo credor."),
  wr("Como se chama o lado esquerdo de uma conta?",["debito"],"Débito.")
 ],
 dc2:[
  wr("Uma conta de Ativo aumenta com lançamento a débito ou a crédito?",["debito"],"Ativo aumenta a débito."),
  wr("E uma conta de Receita, aumenta a...?",["credito"],"Receita aumenta a crédito, como o PL."),
  ts("Receita de vendas",[],[5000,3000],"Só créditos: 8.000, saldo credor, a natureza normal da receita."),
  ep("Com suas palavras: por que a receita aumenta a crédito?","Porque a receita aumenta o patrimônio líquido, e o PL tem natureza credora, aumentando a crédito.",[["Receita aumenta o PL","aument","pl","patrimonio","lucro"],["O PL é credor","credor","credit","natureza","lado direito"]],"Receita segue a natureza do PL.")
 ],
 dc3:[
  ew("Compra de mercadorias à vista, em dinheiro, R$ 800.","Estoques","Caixa","Estoques aumenta (D); Caixa diminui (C)."),
  ew("Empréstimo bancário de R$ 10.000 creditado na conta.","Bancos","Empréstimos a pagar","Bancos aumenta (D); nasce a dívida (C)."),
  ew("Aporte de capital dos sócios, em dinheiro, R$ 5.000.","Caixa","Capital social","Caixa aumenta (D); Capital social aumenta (C)."),
  od("Ordene os passos para fazer um lançamento:",["Identificar as contas envolvidas","Ver se cada uma aumentou ou diminuiu","Aplicar débito ou crédito conforme a natureza","Conferir se débitos = créditos"],"Esse roteiro resolve qualquer lançamento.")
 ],
 dc4:[
  ew("Serviço prestado e recebido pelo banco, R$ 3.000.","Bancos","Receita de serviços","Bancos (D) e Receita de serviços (C)."),
  ew("Pagamento da conta de energia do mês, em dinheiro, R$ 250.","Despesa com energia","Caixa","Despesa (D) e Caixa (C)."),
  wr("Como se chama o fato que só troca valores entre contas, sem alterar o PL?",["permutativo","fato permutativo"],"Fato permutativo.")
 ],
 lanc1:[
  ew("Venda a prazo de mercadorias, R$ 4.000 (registro da receita).","Clientes","Receita de vendas","Clientes (D) e Receita de vendas (C)."),
  ew("Baixa do custo das mercadorias vendidas, R$ 2.500.","CMV","Estoques","CMV (D) e Estoques (C)."),
  ep("Com suas palavras: por que a venda de mercadoria tem dois lançamentos?","Um registra a receita pelo preço de venda e o outro dá baixa no estoque pelo custo, lançando o CMV.",[["Registra a receita pelo preço de venda","receita","venda","preco","faturamento"],["Dá baixa no estoque pelo custo (CMV)","custo","cmv","estoque","baixa","saida"]],"Receita pelo preço; CMV pelo custo.")
 ],
 lanc2:[
  ew("Salários do mês a pagar, R$ 8.000.","Despesa com salários","Salários a pagar","Despesa (D) e obrigação (C)."),
  ew("Pagamento dos salários pelo banco, R$ 8.000.","Salários a pagar","Bancos","Quita a obrigação (D) e sai do banco (C)."),
  wr("Qual o percentual do FGTS sobre a remuneração? (só o número)",["8","8%","oito"],"8%.")
 ],
 lanc3:[
  ew("Empréstimo de R$ 15.000 recebido no banco.","Bancos","Empréstimos a pagar","Bancos (D) e Empréstimos a pagar (C)."),
  ew("Pagamento de juros de R$ 400 pelo banco.","Despesa de juros","Bancos","Despesa financeira (D) e Bancos (C)."),
  nu("Juros compostos: empréstimo de R$ 10.000 a 2% ao mês por 2 meses. Qual o saldo devedor?",10404,"10.000 × 1,02 × 1,02 = 10.404.","R$","Aplique 2% duas vezes.")
 ],
 lanc4:[
  ew("Depreciação do mês de um veículo, R$ 1.000.","Despesa de depreciação","Depreciação acumulada","Despesa (D) e redutora do ativo (C)."),
  nu("Máquina de R$ 36.000, sem valor residual, vida útil de 10 anos. Qual a depreciação mensal?",300,"36.000 ÷ 10 = 3.600 por ano; ÷ 12 = 300.","R$","Calcule o ano e divida por 12."),
  ep("Com suas palavras: por que a depreciação é despesa se não sai dinheiro?","Porque o bem se desgasta com o uso e o tempo, e pela competência o seu custo deve ser distribuído como despesa ao longo da vida útil.",[["O bem se desgasta","desgast","uso","consum","perde valor","perda","vida util","tempo","velh"],["O custo é distribuído no tempo (competência)","competenc","distribu","ao longo","period","custo","anos","mes"]],"Depreciação = consumo do bem ao longo do tempo.")
 ],
 lanc5:[
  od("Ordene o fluxo contábil:",["Documento","Livro Diário","Livro Razão","Balancete","Demonstrações"],"Do fato comprovado até o relatório."),
  wr("Qual livro registra os fatos em ordem cronológica?",["diario","livro diario"],"Livro Diário."),
  ts("Bancos",[10000,2500],[4000,1500],"12.500 − 5.500 = 7.000, saldo devedor.")
 ],
 demo1:[
  wr("O Balanço mostra a posição em uma data ou em um período? (uma palavra)",["data","uma data"],"Em uma data: é uma fotografia."),
  od("Ordene do mais líquido ao menos líquido:",["Caixa","Clientes","Estoques","Imobilizado"],"Liquidez decrescente."),
  ep("Com suas palavras: qual a diferença entre circulante e não circulante?","Circulante é o que se realiza ou vence em até 12 meses (curto prazo); não circulante é o que passa de 12 meses (longo prazo).",[["O critério é 12 meses","12","doze","um ano","1 ano","ano"],["Circulante é curto prazo","curto","ate","menos","antes","rapido"],["Não circulante é longo prazo","longo","mais de","acima","depois","apos"]],"Até 12 meses: circulante.")
 ],
 demo2:[
  od("Ordene as linhas da DRE:",["Receita bruta","Receita líquida","Lucro bruto","Resultado antes do IR e CSLL","Lucro líquido"],"De cima para baixo, deduzindo."),
  nu("Lucro bruto de R$ 50.000, despesas operacionais de R$ 20.000, despesas financeiras de R$ 5.000 e IR e CSLL de R$ 7.500. Qual o lucro líquido?",17500,"50.000 − 20.000 − 5.000 − 7.500 = 17.500.","R$"),
  wr("Receita líquida menos CMV é igual a...",["lucro bruto"],"Lucro bruto.")
 ],
 demo3:[
  wr("Qual a sigla da Demonstração dos Fluxos de Caixa?",["dfc"],"DFC."),
  nu("Caixa inicial de R$ 10.000; operações +R$ 25.000; investimentos −R$ 30.000; financiamentos +R$ 8.000. Qual o caixa final?",13000,"10.000 + 25.000 − 30.000 + 8.000 = 13.000.","R$"),
  ep("Com suas palavras: por que uma empresa com lucro pode ficar sem caixa?","Porque o lucro é apurado por competência: ela pode vender a prazo e ainda não ter recebido, ou gastar o dinheiro com estoques e investimentos.",[["Vendas a prazo ainda não recebidas","prazo","receb","cliente","ainda nao","depois"],["Lucro é competência, caixa é dinheiro","competenc","dinheiro","caixa","pagament","estoque","investim","gast","divid"]],"Lucro ≠ caixa.")
 ],
 demo4:[
  nu("Disponível de R$ 30.000 e Passivo Circulante de R$ 60.000. Qual a liquidez imediata?",0.5,"30.000 ÷ 60.000 = 0,5."),
  nu("Passivo total de R$ 80.000 e Ativo total de R$ 200.000. Qual o endividamento?",40,"80.000 ÷ 200.000 = 40%.","%"),
  ep("Com suas palavras: o que indica uma liquidez corrente abaixo de 1?","Que as dívidas de curto prazo são maiores que os recursos de curto prazo, então a empresa pode ter dificuldade para pagar as contas do próximo ano.",[["Dívidas de curto prazo maiores","divid","passivo","obrigac","deve","contas"],["Recursos de curto prazo não bastam","ativo","recurso","menor","nao tem","falt","insuficient","dificuldade","aperto"]],"Abaixo de 1: faltam recursos de curto prazo.")
 ],
 cust1:[
  wr("Gasto com a produção é custo ou despesa?",["custo"],"Custo."),
  ep("Com suas palavras: qual a diferença entre custo e despesa?","Custo é o gasto ligado à produção dos bens ou serviços. Despesa é o gasto para vender e administrar a empresa.",[["Custo está ligado à produção","produ","fabric","fabrica","fazer"],["Despesa é vender e administrar","vend","administr","escritorio","comerci","gest"]],"Produção = custo; vender/administrar = despesa.")
 ],
 cust2:[
  nu("Custo fixo de R$ 12.000, variável de R$ 4 por unidade e produção de 3.000 unidades. Qual o custo total?",24000,"12.000 + 4 × 3.000 = 24.000.","R$"),
  nu("No mesmo exemplo, qual o custo total por unidade?",8,"24.000 ÷ 3.000 = 8.","R$"),
  wr("Custo que não muda com o volume produzido se chama custo...",["fixo"],"Fixo.")
 ],
 cust3:[
  nu("Custos fixos de R$ 20.000 e MC unitária de R$ 25. Quantas unidades são necessárias para lucro de R$ 5.000?",1000,"(20.000 + 5.000) ÷ 25 = 1.000.","unidades","Some o lucro desejado aos custos fixos."),
  wr("Preço menos custos variáveis por unidade é a margem de...",["contribuicao"],"Margem de contribuição."),
  ep("Com suas palavras: o que é o ponto de equilíbrio?","É o volume de vendas em que a receita cobre exatamente todos os custos e despesas, e o lucro é zero.",[["Lucro zero","lucro zero","nem lucro","sem lucro","zero","empat","nulo"],["Receita cobre os custos","cobr","igual","pag","custo","despesa"]],"Nem lucro, nem prejuízo.")
 ],
 cust4:[
  wr("Por qual orçamento se começa? (uma palavra)",["vendas","venda"],"Vendas."),
  od("Ordene a sequência do orçamento:",["Vendas","Produção","Compras e custos","Despesas","Caixa"],"Tudo parte das vendas."),
  nu("Clientes a receber de R$ 60.000 e vendas a prazo de R$ 360.000 no ano. Qual o prazo médio de recebimento, em dias (ano de 360 dias)?",60,"60.000 ÷ 360.000 × 360 = 60 dias.","dias")
 ],
 trib1:[
  wr("Qual esfera de governo cobra o ISS?",["municipal","municipio","municipios","prefeitura"],"Municípios."),
  ep("Com suas palavras: qual a diferença entre imposto e taxa?","O imposto é cobrado sem uma contrapartida específica do governo. A taxa é paga por um serviço público específico ou por uma fiscalização.",[["Imposto não tem contrapartida específica","sem uma contrapart","sem contrapartida","nao tem contrapartida","geral","independ","nao vincul","nao depende"],["Taxa paga um serviço específico","servic","especific","fiscaliz","policia","alvara","contrapartida"]],"Taxa tem contrapartida; imposto não.")
 ],
 trib2:[
  nu("Prestadora de serviços no Lucro Presumido com receita trimestral de R$ 200.000 e presunção de 32%. Qual a base do IRPJ?",64000,"200.000 × 32% = 64.000.","R$"),
  wr("Qual a sigla da guia única do Simples Nacional?",["das"],"DAS."),
  nu("Lucro Real de R$ 50.000 em um mês. Quanto é o adicional de 10% do IRPJ?",3000,"(50.000 − 20.000) × 10% = 3.000.","R$","O adicional só incide acima de R$ 20 mil.")
 ],
 trib3:[
  wr("Qual novo tributo federal substitui PIS e Cofins? (sigla)",["cbs"],"CBS."),
  wr("E qual substitui ICMS e ISS? (sigla)",["ibs"],"IBS."),
  od("Ordene a linha do tempo da Reforma:",["Ano de teste (2026)","CBS plena e fim de PIS/Cofins (2027)","Transição de ICMS e ISS (2029 a 2032)","Novo sistema completo (2033)"],"A transição vai de 2026 a 2033.")
 ],
 aud1:[
  wr("A auditoria oferece segurança absoluta ou razoável?",["razoavel","seguranca razoavel"],"Razoável."),
  ep("Com suas palavras: por que o auditor precisa ser independente?","Para que a opinião dele seja imparcial e confiável, sem conflito de interesse com a empresa auditada.",[["Opinião confiável e imparcial","credib","confian","confiavel","imparc","isen","neutr","verdad"],["Sem conflito de interesse","vincul","conflito","interesse","propri trabalho","relacao","ligac","influen"]],"Independência gera credibilidade.")
 ],
 aud2:[
  nu("Receita de R$ 10.000.000 e materialidade de 1% da receita. Qual o valor?",100000,"10.000.000 × 1% = 100.000.","R$"),
  wr("Qual componente do risco o auditor controla? (uma palavra)",["deteccao"],"Detecção.")
 ],
 aud3:[
  wr("Separar aprovar, pagar e registrar entre pessoas diferentes é a segregação de...",["funcoes","funcao"],"Segregação de funções."),
  ep("Com suas palavras: qual a diferença entre controle preventivo e detectivo?","O preventivo evita que o erro aconteça, como uma senha ou dupla aprovação. O detectivo encontra o erro depois, como uma conciliação.",[["Preventivo evita antes","evit","antes","previn","impede","bloque"],["Detectivo encontra depois","depois","detect","encontr","identific","descobr","acha"]],"Antes: preventivo. Depois: detectivo.")
 ],
 aud4:[
  wr("Contar o estoque testa qual asserção?",["existencia"],"Existência."),
  od("Ordene da evidência mais confiável para a menos confiável:",["Confirmação enviada por um banco direto ao auditor","Documento externo apresentado pela empresa","Documento interno da empresa","Explicação verbal de um funcionário"],"Externa e direta vale mais que interna e verbal.")
 ],
 aud5:[
  wr("Opinião quando falta evidência e os efeitos podem ser generalizados: ___ de opinião.",["abstencao"],"Abstenção de opinião."),
  od("Ordene as opiniões da mais favorável para a mais grave (com evidência obtida):",["Sem ressalva","Com ressalva","Adversa"],"Quanto maior e mais espalhado o problema, mais grave.")
 ]
};
