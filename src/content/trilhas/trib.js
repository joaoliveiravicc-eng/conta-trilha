import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"trib", title:"Tributos no Brasil", icon:"🧾", color:"#8A5A2B",
  desc:"Tipos de tributos, regimes tributários e a Reforma Tributária do consumo.",
  lessons:[
  {id:"trib1", title:"Tipos de tributos", icon:"🏷️",
   recap:["Tributo é um pagamento obrigatório, em dinheiro, criado por lei, que não é multa.", "Espécies: imposto, taxa e contribuição. Esferas: federal, estadual e municipal.", "Diretos recaem sobre quem paga; indiretos vêm embutidos no preço, como ICMS, ISS e IPI."],
 learn:[
    {h:"O que é tributo", b:`<p>Pelo Código Tributário Nacional (art. 3º), tributo é um pagamento <b>obrigatório</b> ao Estado, em dinheiro, criado por lei, e que <b>não é multa</b>.</p>`},
    {h:"Espécies", b:tbl(['Espécie','Característica','Exemplo'],[['Imposto','Não tem contrapartida específica','IR, ICMS'],['Taxa','Paga por um serviço público ou fiscalização','Alvará, coleta de lixo'],['Contribuição de melhoria','Por obra pública que valoriza o imóvel','Asfalto na rua']]) +
      box('dica','O STF reconhece ainda os empréstimos compulsórios e as contribuições especiais, como PIS, Cofins e as contribuições ao INSS.')},
    {h:"Quem cobra", b:tbl(['Esfera','Principais tributos'],[['Federal','IRPJ, CSLL, PIS, Cofins, IPI'],['Estadual','ICMS, IPVA, ITCMD'],['Municipal','ISS, IPTU, ITBI']])},
    {h:"Diretos e indiretos", b:ul(['<b>Diretos</b>: recaem sobre quem paga. Ex: Imposto de Renda, IPTU.','<b>Indiretos</b>: vêm embutidos no preço e são repassados ao consumidor. Ex: ICMS, ISS, IPI.'])}
   ],
   ex:[
    {t:"match", pairs:[["ICMS","Estadual"],["ISS","Municipal"],["IRPJ","Federal"]], e:"Cada esfera de governo tem seus próprios tributos."},
    {t:"class", q:"Qual esfera cobra cada tributo?", cats:["Federal","Estadual","Municipal"], items:[["IPVA",1],["IPTU",2],["Cofins",0],["ITBI",2],["IPI",0],["ITCMD",1]], e:"IPVA e ITCMD são estaduais; IPTU e ITBI, municipais; Cofins e IPI, federais."},
    {t:"tf", q:"Multa de trânsito é um tipo de tributo.", a:false, e:"Pela definição do CTN, tributo não é sanção por ato ilícito."},
    {t:"mc", q:"O valor pago por um alvará de funcionamento é um(a):", o:["Taxa","Imposto","Contribuição de melhoria","Multa"], a:0, e:"É a contrapartida pela fiscalização (poder de polícia) do município."},
    {t:"mc", q:"Qual destes é um tributo indireto?", o:["ICMS","IRPF","IPTU","IPVA"], a:0, e:"O ICMS vem embutido no preço e é repassado ao consumidor."}
   ]},
  {id:"trib2", title:"Regimes tributários", icon:"🏢",
   recap:["O regime define como a empresa calcula IRPJ, CSLL, PIS e Cofins.", "Simples Nacional: até R$ 4,8 milhões por ano, com guia única (DAS). Lucro Presumido: até R$ 78 milhões, com lucro presumido sobre a receita.", "Lucro Real: o imposto incide sobre o lucro contábil ajustado."],
 learn:[
    {h:"Por que o regime importa", b:`<p>O regime define como a empresa calcula IRPJ, CSLL, PIS e Cofins (e, no Simples, quase todos os tributos). Escolher bem pode reduzir muito a carga.</p>`},
    {h:"Simples Nacional", b:`<p>Para micro e pequenas empresas com receita bruta de até <b>R$ 4,8 milhões por ano</b>. Vários tributos são pagos em uma guia única, o <b>DAS</b>, com alíquotas que crescem com o faturamento.</p><p>O <b>MEI</b>, dentro do Simples, atende quem fatura até <b>R$ 81 mil por ano</b>.</p>`},
    {h:"Lucro Presumido", b:`<p>Para empresas com receita de até <b>R$ 78 milhões por ano</b>. O lucro é presumido como um percentual da receita: para o IRPJ, em geral <b>8%</b> no comércio e na indústria e <b>32%</b> na maioria dos serviços.</p>`},
    {h:"Lucro Real", b:`<p>O imposto incide sobre o lucro contábil ajustado por adições e exclusões. É obrigatório acima de R$ 78 milhões de receita e para algumas atividades, como bancos.</p><p>IRPJ de 15%, mais <b>adicional de 10%</b> sobre a parcela do lucro que passar de R$ 20 mil por mês.</p>` +
      box('dica','Empresas com margem baixa ou prejuízo costumam se beneficiar do Lucro Real, porque sem lucro não há IRPJ nem CSLL.')}
   ],
   ex:[
    {t:"mc", q:"Qual é a guia única de pagamento do Simples Nacional?", o:["DAS","DARF","GPS","GNRE"], a:0, e:"DAS: Documento de Arrecadação do Simples Nacional."},
    {t:"num", q:"No Lucro Presumido, um comércio teve receita trimestral de R$ 500.000 e a presunção é de 8%. Qual a base de cálculo do IRPJ?", a:40000, u:"R$", e:"500.000 × 8% = 40.000."},
    {t:"tf", q:"No Lucro Real, uma empresa com prejuízo paga IRPJ normalmente, mesmo sem lucro.", a:false, e:"No Lucro Real o IRPJ incide sobre o lucro; sem lucro, não há imposto."},
    {t:"match", pairs:[["Simples Nacional","Guia única para pequenas empresas"],["Lucro Presumido","Base definida por percentual da receita"],["Lucro Real","Imposto sobre o lucro contábil ajustado"],["MEI","Faturamento de até R$ 81 mil por ano"]], e:"Cada regime tem um público e um jeito de calcular."},
    {t:"mc", q:"O adicional de 10% do IRPJ incide sobre:", o:["O lucro que exceder R$ 20 mil por mês","Toda a receita bruta da empresa no mês","O prejuízo apurado no período pela empresa","Os dividendos pagos aos sócios no ano"], a:0, e:"Só a parcela acima de R$ 20 mil mensais (R$ 240 mil por ano) paga o adicional."}
   ]},
  {id:"trib3", title:"Consumo e a Reforma Tributária", icon:"🔄",
   recap:["Não cumulatividade: o imposto pago nas compras é abatido do imposto devido nas vendas.", "Reforma Tributária: a CBS substitui PIS e Cofins e o IBS substitui ICMS e ISS.", "A transição vai de 2026 a 2033, e 2026 é o ano de teste (CBS de 0,9% e IBS de 0,1%)."],
 learn:[
    {h:"Não cumulatividade", b:`<p>No ICMS, no IPI e no PIS/Cofins do regime não cumulativo, a empresa <b>desconta o imposto pago nas compras</b> (crédito) do imposto devido nas vendas (débito). Assim, paga só sobre o valor que agregou.</p>`},
    {h:"Exemplo com ICMS", b:box('exemplo','Na compra das mercadorias foram pagos R$ 180 de ICMS. Na venda, o ICMS devido é de R$ 270. A empresa recolhe só <b>R$ 90</b>.') +
      lanc([['D','ICMS sobre vendas (dedução)','270'],['C','ICMS a recolher','270']])},
    {h:"A Reforma Tributária", b:`<p>A Emenda Constitucional 132/2023 cria um IVA dual:</p>` +
      ul(['<b>CBS</b> (federal) substitui PIS e Cofins.','<b>IBS</b> (estados e municípios) substitui ICMS e ISS.','<b>Imposto Seletivo</b> incide sobre produtos prejudiciais à saúde ou ao meio ambiente.','O IPI terá alíquota zero para a maior parte dos produtos.'])},
    {h:"Linha do tempo", b:ol(['<b>2026</b>: ano de teste, com CBS de 0,9% e IBS de 0,1%.','<b>2027</b>: a CBS passa a valer e PIS e Cofins são extintos.','<b>2029 a 2032</b>: ICMS e ISS diminuem aos poucos enquanto o IBS cresce.','<b>2033</b>: o novo sistema passa a valer por completo.']) +
      box('atencao','A regulamentação continua sendo detalhada. Confira sempre as normas mais recentes.')}
   ],
   ex:[
    {t:"num", q:"ICMS pago nas compras: R$ 1.800. ICMS devido nas vendas: R$ 2.500. Quanto a empresa recolhe?", a:700, u:"R$", e:"2.500 − 1.800 = 700."},
    {t:"tf", q:"Na não cumulatividade, o imposto das compras pode ser abatido do imposto das vendas.", a:true, e:"É o sistema de débitos e créditos."},
    {t:"match", pairs:[["CBS","Substitui PIS e Cofins"],["IBS","Substitui ICMS e ISS"],["Imposto Seletivo","Produtos prejudiciais à saúde ou ao meio ambiente"]], e:"Esses são os novos tributos sobre consumo."},
    {t:"mc", q:"Em que ano o novo sistema tributário do consumo estará completo?", o:["2033","2026","2027","2030"], a:0, e:"A transição vai de 2026 a 2033."},
    {t:"entry", q:"Apuração do ICMS devido sobre as vendas do mês, R$ 2.500.", accts:["ICMS sobre vendas","ICMS a recolher","ICMS a recuperar","Caixa"], d:["ICMS sobre vendas"], c:["ICMS a recolher"], e:"O ICMS sobre vendas é dedução da receita (débito) e gera a obrigação de recolher (crédito)."}
   ]},
  {id:"trib4", title:"Planejamento tributário: elisão e evasão", icon:"⚖️",
   recap:["Elisão é reduzir tributos por meios lícitos, em regra antes do fato gerador.", "Evasão (sonegação) é reduzir ou não pagar o tributo por meios ilícitos, como omitir receita ou usar nota fria.", "A evasão é crime e gera multa e cobrança do tributo com juros."],
 learn:[
    {h:"Pagar menos imposto é crime?", b:`<p>Não necessariamente. Existe uma linha bem definida entre <b>reduzir tributos de forma lícita</b> e <b>sonegar</b>.</p>`},
    {h:"Elisão fiscal", b:`<p><b>Elisão</b> é a redução <b>lícita</b> da carga tributária, usando os meios previstos ou não vedados pela lei — geralmente feita <b>antes</b> do fato gerador acontecer.</p>` +
      box('exemplo','Uma empresa simula seu resultado nos dois regimes tributários permitidos para o seu porte e escolhe o Lucro Presumido, porque nesse caso paga legalmente menos do que pagaria no Lucro Real.')},
    {h:"Evasão fiscal", b:`<p><b>Evasão</b> (sonegação) é reduzir ou não pagar o tributo devido através de meios <b>ilícitos</b>: omitir receita, emitir nota fiscal com valor menor que o real, usar notas frias.</p>` +
      box('atencao','Sonegação fiscal é crime, previsto na Lei nº 8.137/1990, além de gerar multas e cobrança do tributo devido com juros.')},
    {h:"O critério central", b:tbl(['','Elisão','Evasão'],[['Meios','Lícitos','Ilícitos'],['Quando','Antes do fato gerador, em regra','Antes ou depois, escondendo o fato'],['Consequência','Economia legítima de tributos','Crime, multa e cobrança retroativa']]) + box('regra','A pergunta que separa as duas: o meio usado para pagar menos imposto é permitido por lei?')}
   ],
   ex:[
    {t:"mc", q:"O que é elisão fiscal?", o:["Reduzir tributos por meios lícitos, dentro da lei","Deixar de emitir nota fiscal das vendas","Omitir receita da Receita Federal para pagar menos","Qualquer forma de reduzir imposto, lícita ou não"], a:0, e:"Elisão é sempre por meios legais."},
    {t:"tf", q:"Escolher, entre dois regimes tributários permitidos para a empresa, aquele que resulta em menos imposto a pagar é elisão fiscal.", a:true, e:"É uma escolha lícita dentro do que a lei permite."},
    {t:"tf", q:"Emitir uma nota fiscal com valor menor do que o real para pagar menos imposto é elisão fiscal.", a:false, e:"Isso é evasão (sonegação): um meio ilícito, e não apenas uma escolha entre opções legais."},
    {t:"mc", q:"Sonegação fiscal é:", o:["Crime, com multa e cobrança do tributo com juros","Apenas uma infração administrativa leve, sem multa","Permitida se o valor for pequeno o bastante","O mesmo que elisão fiscal, só com outro nome"], a:0, e:"A Lei nº 8.137/1990 tipifica crimes contra a ordem tributária."},
    {t:"match", pairs:[["Elisão fiscal","Redução lícita da carga tributária"],["Evasão fiscal","Redução por meios ilícitos, como omitir receita"],["Fato gerador","O evento que faz nascer a obrigação de pagar o tributo"]], e:"O critério central é sempre a licitude do meio usado."}
   ]},
  {id:"trib5", title:"Revisão: tributos", icon:"🔄",
   recap:["Tributo nasce de um fato previsto em lei, o fato gerador.", "Regimes tributários mudam a forma de apuração.", "Planejar dentro da lei é elisão; fraudar é evasão."],
 learn:[
    {h:"O mapa dos tributos", b:tbl(['Pergunta','Resposta'],[['Imposto, taxa ou contribuição de melhoria?','Taxa tem contrapartida de serviço; contribuição de melhoria vem de obra pública'],['Direto ou indireto?','Direto recai sobre quem paga; indireto é repassado no preço'],['Qual regime?','Simples (pequenas empresas), Presumido (base por %) ou Real (sobre o lucro ajustado)'],['Lícito ou ilícito?','Elisão é legal; evasão (sonegação) é crime']])}
   ],
   ex:[
    {t:"mc", q:"O ICMS é um tributo:", o:["Indireto, embutido no preço","Direto, recai só sobre o dono da empresa","Que não existe mais","Municipal"], a:0, e:"ICMS é repassado ao consumidor no preço: tributo indireto."},
    {t:"match", pairs:[["Imposto","Sem contrapartida específica"],["Taxa","Paga por um serviço ou fiscalização"],["Contribuição de melhoria","Por obra pública que valoriza o imóvel"]], e:"As três espécies clássicas de tributo."},
    {t:"tf", q:"No Simples Nacional, vários tributos são pagos numa guia única, o DAS.", a:true, e:"É uma das principais vantagens do regime para pequenas empresas."},
    {t:"mc", q:"Escolher, entre dois regimes tributários permitidos, o que gera menos imposto a pagar é:", o:["Elisão fiscal","Evasão fiscal","Crime contra a ordem tributária","Impossível de se fazer"], a:0, e:"É uma escolha lícita, dentro do que a lei permite."},
    {t:"tf", q:"No Lucro Real, uma empresa sem lucro no período ainda paga IRPJ normalmente.", a:false, e:"No Lucro Real, o IRPJ incide sobre o lucro; sem lucro, não há imposto a pagar."},
    {t:"mc", q:"Emitir uma nota fiscal com valor menor do que o real para pagar menos imposto é:", o:["Evasão fiscal (sonegação), um crime","Elisão fiscal, uma prática legal","Irrelevante para a Contabilidade","Obrigatório em alguns casos"], a:0, e:"É um meio ilícito de reduzir tributo: evasão fiscal."}
   ]}
  ]
};

