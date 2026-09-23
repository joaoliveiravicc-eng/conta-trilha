import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"imob", title:"Imobilizado e Intangíveis", icon:"🏗️", color:"#3D6B8C",
  desc:"Bens de uso duradouro, métodos de depreciação, baixa de ativos, intangíveis e avaliação pelo valor recuperável.",
  lessons:[
  {id:"imob1", title:"O que é o Imobilizado", icon:"🏢",
   learn:[
    {h:"Bens de uso duradouro", b:`<p>O <b>Ativo Imobilizado</b> reúne os bens tangíveis usados na operação da empresa por <b>mais de um ano</b>: máquinas, veículos, móveis, prédios, computadores. Diferente do estoque, eles não são comprados para revenda.</p>`},
    {h:"O que entra no custo", b:`<p>O custo inicial do bem inclui tudo o que é necessário para deixá-lo <b>pronto para uso</b>: preço de compra, frete, seguro no transporte, instalação e testes.</p>` +
      box('exemplo','Máquina de R$ 40.000, frete de R$ 1.500 e instalação de R$ 2.500: custo capitalizado de <b>R$ 44.000</b>.')},
    {h:"Capitalizar ou jogar como despesa?", b:`<p>Gastos que <b>aumentam a vida útil ou a capacidade</b> do bem são capitalizados (somados ao custo do Ativo). Gastos que só <b>mantêm</b> o bem funcionando normalmente são despesa do período.</p>` +
      tbl(['Gasto','Tratamento'],[['Troca de peça que amplia a vida útil da máquina','Capitaliza (Ativo)'],['Manutenção de rotina, como troca de óleo','Despesa do período'],['Reforma que aumenta a capacidade produtiva','Capitaliza (Ativo)'],['Conserto de um vazamento comum','Despesa do período']])},
    {h:"O lançamento inicial", b:lanc([['D','Máquinas e equipamentos','44.000'],['C','Caixa ou Fornecedores','44.000']]) + box('regra','O Imobilizado entra pelo custo total até ficar pronto para o uso pretendido, não apenas pelo preço de compra.')}
   ],
   ex:[
    {t:"mc", q:"O que caracteriza um bem do Ativo Imobilizado?", o:["É tangível, usado na operação e tem vida útil de mais de um ano","É comprado para ser revendido","Vira despesa assim que é comprado","Só existe em empresas industriais"], a:0, e:"Diferente do estoque, o Imobilizado serve à operação por vários anos."},
    {t:"num", q:"Máquina comprada por R$ 30.000, com frete de R$ 800 e instalação de R$ 1.200. Qual o custo capitalizado?", a:32000, u:"R$", e:"30.000 + 800 + 1.200 = 32.000."},
    {t:"class", q:"Capitaliza (vira Ativo) ou é despesa do período?", cats:["Capitaliza","Despesa do período"], items:[["Reforma que amplia a capacidade da fábrica",0],["Troca de óleo de rotina do veículo",1],["Frete para trazer uma máquina nova",0],["Conserto de um vazamento comum",1]], e:"Gastos que ampliam vida útil ou capacidade capitalizam; manutenção de rotina é despesa."},
    {t:"tf", q:"O custo do Imobilizado inclui apenas o preço pago ao fornecedor do bem.", a:false, e:"Também entram frete, seguro no transporte, instalação e testes até o bem ficar pronto para uso."},
    {t:"entry", q:"Compra à vista de um veículo por R$ 60.000, já pronto para uso.", accts:["Veículos","Caixa","Despesa com veículos","Fornecedores"], d:["Veículos"], c:["Caixa"], e:"O bem (Ativo) aumenta; o dinheiro (Ativo) diminui."},
    {t:"mc", q:"Uma máquina comprada para ser revendida por uma loja de equipamentos é, para essa loja, um:", o:["Estoque, não Imobilizado","Imobilizado, sempre","Intangível","Investimento"], a:0, e:"O que define o grupo é a finalidade: se é para revender, é estoque, mesmo sendo uma máquina."}
   ]},
  {id:"imob2", title:"Métodos de depreciação", icon:"📐",
   learn:[
    {h:"Relembrando o método linear", b:`<p>O método linear (ou das quotas constantes) distribui o mesmo valor de depreciação em cada período. É o mais simples e o mais usado.</p>` + eq('Depreciação anual = (Custo − Valor residual) ÷ Vida útil')},
    {h:"Método das somas dos dígitos (acelerado)", b:`<p>Deprecia <b>mais no início</b> e menos no fim, para bens que perdem valor ou rendimento mais rápido logo nos primeiros anos.</p>` +
      box('exemplo','Vida útil de 4 anos: soma dos dígitos = 1+2+3+4 = 10. No 1º ano deprecia-se 4/10 do valor depreciável; no 2º, 3/10; no 3º, 2/10; no 4º, 1/10.')},
    {h:"Método das unidades produzidas", b:`<p>Em vez do tempo, usa o <b>quanto o bem realmente produziu</b>: horas de uso, quilômetros rodados, unidades fabricadas.</p>` + eq('Depreciação = (Custo − Valor residual) ÷ Capacidade total × Uso do período') +
      box('exemplo','Máquina de R$ 100.000 (sem valor residual), capacidade total de 200.000 unidades. Produziu 30.000 no ano: depreciação = 100.000 ÷ 200.000 × 30.000 = <b>R$ 15.000</b>.')},
    {h:"Qual escolher?", b:`<p>A norma contábil pede que o método reflita o <b>padrão de consumo dos benefícios econômicos</b> do bem — não é uma escolha livre. Um caminhão usado de forma irregular, por exemplo, combina melhor com o método de unidades produzidas (quilômetros rodados) do que com o linear.</p>`}
   ],
   ex:[
    {t:"num", q:"Bem com vida útil de 4 anos, pelo método das somas dos dígitos. Qual fração do valor depreciável é reconhecida no 1º ano?", a:0.4, tol:0.01, e:"Soma dos dígitos = 1+2+3+4 = 10. No 1º ano: 4/10 = 0,40 (40%)."},
    {t:"num", q:"Máquina de R$ 80.000 sem valor residual, capacidade total de 100.000 unidades. Produziu 25.000 unidades no ano. Qual a depreciação do ano?", a:20000, u:"R$", e:"80.000 ÷ 100.000 × 25.000 = 20.000."},
    {t:"mc", q:"O método que deprecia mais nos primeiros anos e menos nos últimos é chamado de:", o:["Método acelerado (soma dos dígitos)","Método linear","Método das unidades produzidas","Método do custo médio"], a:0, e:"Ele concentra mais depreciação no início da vida útil do bem."},
    {t:"mc", q:"Para um caminhão cujo desgaste depende muito da quilometragem rodada, qual método costuma refletir melhor o consumo do bem?", o:["Unidades produzidas (quilômetros rodados)","Linear, sempre","Soma dos dígitos, sempre","Nenhum: caminhão não deprecia"], a:0, e:"Quando o consumo do bem está ligado ao uso, e não só ao tempo, as unidades produzidas refletem melhor a realidade."},
    {t:"tf", q:"A escolha do método de depreciação é livre e não precisa ter relação com o uso real do bem.", a:false, e:"O método deve refletir o padrão em que os benefícios econômicos do bem são consumidos."}
   ]},
  {id:"imob3", title:"Baixa e venda de bens", icon:"📤",
   learn:[
    {h:"Tirando o bem do Ativo", b:`<p>Quando um bem é vendido, doado ou descartado, ele precisa <b>sair</b> do Imobilizado — junto com toda a depreciação acumulada dele.</p>`},
    {h:"Valor contábil líquido", b:eq('Valor contábil líquido = Custo − Depreciação acumulada') + box('exemplo','Máquina com custo de R$ 50.000 e depreciação acumulada de R$ 35.000: valor contábil líquido de <b>R$ 15.000</b>.')},
    {h:"Ganho ou perda na venda", b:`<p>Compara-se o <b>valor recebido</b> na venda com o <b>valor contábil líquido</b> do bem.</p>` + eq('Resultado na venda = Valor de venda − Valor contábil líquido') +
      box('exemplo','A máquina do exemplo (valor contábil de R$ 15.000) é vendida por R$ 18.000: ganho de <b>R$ 3.000</b>. Se fosse vendida por R$ 10.000: perda de <b>R$ 5.000</b>.')},
    {h:"O lançamento completo", b:`<p>Baixam-se de uma vez o custo, a depreciação acumulada e reconhece-se o ganho ou a perda:</p>` +
      lanc([['D','Caixa','18.000'],['D','Depreciação acumulada','35.000'],['C','Máquinas e equipamentos','50.000'],['C','Ganho na venda de imobilizado','3.000']]) + box('dica','Esse ganho ou perda vai para a DRE, normalmente fora do resultado operacional, como "outras receitas e despesas".')}
   ],
   ex:[
    {t:"num", q:"Veículo com custo de R$ 70.000 e depreciação acumulada de R$ 42.000. Qual o valor contábil líquido?", a:28000, u:"R$", e:"70.000 − 42.000 = 28.000."},
    {t:"num", q:"O veículo do exercício anterior (valor contábil de R$ 28.000) é vendido por R$ 33.000. Qual o resultado da venda?", a:5000, u:"R$", e:"33.000 − 28.000 = 5.000 de ganho.", h:"Ganho = valor de venda − valor contábil líquido."},
    {t:"num", q:"Uma máquina com valor contábil de R$ 20.000 é vendida por R$ 14.000. Qual o resultado? (use o sinal de menos para perda)", a:-6000, u:"R$", e:"14.000 − 20.000 = −6.000, uma perda."},
    {t:"mc", q:"Ao baixar um bem vendido, o que sai do Ativo Imobilizado?", o:["O custo do bem e toda a depreciação acumulada dele","Só o custo do bem","Só a depreciação acumulada","Nada sai, só se registra o dinheiro recebido"], a:0, e:"As duas contas relacionadas ao bem são baixadas juntas."},
    {t:"tf", q:"Se o valor de venda for maior que o valor contábil líquido, a empresa reconhece um ganho.", a:true, e:"Vendeu por mais do que o bem valia nos livros: ganho na venda."}
   ]},
  {id:"imob4", title:"Ativos intangíveis", icon:"💡",
   learn:[
    {h:"Sem existência física", b:`<p><b>Intangíveis</b> são ativos não monetários e <b>sem substância física</b>, mas que geram benefícios econômicos futuros: marcas, patentes, softwares, direitos de uso.</p>`},
    {h:"Três testes de reconhecimento", b:ul(['<b>Identificável</b>: pode ser separado e vendido, ou vem de um direito legal/contratual.','<b>Controlado</b> pela empresa: ela consegue impedir que outros usem sem permissão.','Capaz de gerar <b>benefícios econômicos futuros</b>.']) + box('atencao','Marcas e listas de clientes desenvolvidas internamente, sem uma compra separada, em geral não podem ser reconhecidas como Ativo — o gasto vira despesa.')},
    {h:"Vida útil definida ou indefinida", b:tbl(['Tipo','Exemplo','Tratamento'],[['Vida útil definida','Uma patente com prazo legal de proteção','Amortiza ao longo da vida útil'],['Vida útil indefinida','Uma marca que a empresa pretende manter indefinidamente','Não amortiza; é testada por impairment todo ano']])},
    {h:"Ágio por rentabilidade futura (goodwill)", b:`<p>Quando uma empresa compra outra pagando mais do que o valor justo dos ativos líquidos identificáveis, a diferença é o <b>ágio por rentabilidade futura</b> (goodwill). Ele <b>não é amortizado</b>: fica sujeito a teste anual de valor recuperável.</p>`}
   ],
   ex:[
    {t:"mc", q:"Qual destes NÃO é um requisito para reconhecer um ativo intangível?", o:["Ter existência física","Ser identificável","Estar sob controle da empresa","Gerar benefícios econômicos futuros"], a:0, e:"A ausência de substância física é justamente o que caracteriza um intangível."},
    {t:"class", q:"Vida útil definida ou indefinida?", cats:["Definida","Indefinida"], items:[["Patente com prazo legal de proteção",0],["Marca que a empresa vai manter indefinidamente",1],["Licença de software por 3 anos",0],["Goodwill (ágio por rentabilidade futura)",1]], e:"Intangíveis de vida indefinida não são amortizados; são testados por impairment."},
    {t:"tf", q:"Uma marca desenvolvida internamente pela empresa, sem gasto separado identificável, pode normalmente ser registrada como Ativo pelo seu valor de mercado estimado.", a:false, e:"Marcas geradas internamente, em geral, não atendem aos critérios de reconhecimento; o gasto vira despesa."},
    {t:"mc", q:"O ágio por rentabilidade futura (goodwill) é:", o:["Amortizado ao longo do tempo","Não amortizado, mas testado anualmente por impairment","Sempre lançado direto como despesa","Um tipo de estoque"], a:1, e:"Diferente dos intangíveis de vida definida, o goodwill não é amortizado."},
    {t:"wr", q:"Como se chama, em português, o teste que verifica se um ativo intangível de vida indefinida ainda vale o que está registrado nos livros?", a:["teste de impairment","impairment","teste de valor recuperavel","valor recuperavel"], e:"Teste de valor recuperável (impairment)."}
   ]},
  {id:"imob5", title:"Valor recuperável (impairment)", icon:"📉",
   learn:[
    {h:"O Ativo não pode valer mais do que realmente vale", b:`<p>Pelo princípio da <b>prudência</b>, um ativo nunca deve ficar registrado por um valor <b>maior</b> do que a empresa conseguiria recuperar usando-o ou vendendo-o.</p>`},
    {h:"Valor recuperável", b:`<p>É o <b>maior</b> entre duas opções:</p>` + ul(['<b>Valor justo líquido de venda</b>: quanto se conseguiria vendendo o ativo hoje, menos os custos da venda.','<b>Valor em uso</b>: o valor presente dos benefícios futuros que o ativo ainda vai gerar em uso.'])},
    {h:"Quando reconhecer a perda", b:eq('Valor contábil > Valor recuperável → reconhece perda por impairment') +
      box('exemplo','Equipamento com valor contábil de R$ 100.000. Valor recuperável estimado: R$ 70.000. Perda por impairment de <b>R$ 30.000</b>.') +
      lanc([['D','Perda por impairment','30.000'],['C','Imobilizado (ajuste ao valor recuperável)','30.000']])},
    {h:"Quando testar", b:`<p>Bens com vida útil definida são testados sempre que há <b>indícios</b> de perda de valor (queda de demanda, obsolescência, dano físico). Ativos de vida indefinida, como certas marcas e o goodwill, são testados <b>todo ano</b>, com ou sem indício.</p>`}
   ],
   ex:[
    {t:"num", q:"Um equipamento tem valor contábil de R$ 250.000. O valor recuperável estimado é R$ 190.000. Qual a perda por impairment a ser reconhecida?", a:60000, u:"R$", e:"250.000 − 190.000 = 60.000."},
    {t:"mc", q:"O valor recuperável de um ativo é:", o:["O maior entre o valor justo líquido de venda e o valor em uso","O menor entre custo e valor de mercado","Sempre o custo histórico","A soma do valor de venda com o valor em uso"], a:0, e:"Usa-se o maior dos dois, porque é o que a empresa efetivamente conseguiria recuperar por qualquer um dos caminhos."},
    {t:"tf", q:"Um ativo pode ficar registrado por um valor contábil maior do que o seu valor recuperável, sem qualquer ajuste.", a:false, e:"Pela prudência, quando o valor contábil supera o recuperável, reconhece-se a perda."},
    {t:"mc", q:"Ativos intangíveis de vida útil indefinida, como o goodwill, devem ser testados quanto ao valor recuperável:", o:["Todo ano, com ou sem indício de perda","Só quando a empresa quiser","Nunca, porque não amortizam","Só no ano da compra"], a:0, e:"Por não terem amortização regular, a checagem anual é obrigatória."},
    {t:"tf", q:"Havendo indícios de perda de valor, um bem de vida útil definida também deve ser testado quanto ao valor recuperável, mesmo fora do teste anual obrigatório dos intangíveis de vida indefinida.", a:true, e:"Indícios de perda de valor disparam o teste a qualquer momento, para qualquer tipo de ativo."}
   ]},
  {id:"imob6", title:"Revisão: imobilizado e intangíveis", icon:"🔄",
   learn:[
    {h:"Do custo à baixa", b:ol(['Reconhecimento: custo total até o bem ficar pronto para uso.','Depreciação: distribui o custo ao longo da vida útil (linear, acelerado ou por unidades produzidas).','Baixa: compara o valor de venda com o valor contábil líquido para achar ganho ou perda.','Impairment: se o valor recuperável cair abaixo do valor contábil, reconhece-se a perda.'])}
   ],
   ex:[
    {t:"num", q:"Equipamento de R$ 25.000, com frete de R$ 1.000 e instalação de R$ 2.000. Qual o custo capitalizado?", a:28000, u:"R$", e:"25.000 + 1.000 + 2.000 = 28.000."},
    {t:"num", q:"Bem com custo de R$ 60.000, valor residual de R$ 10.000 e vida útil de 5 anos. Qual a depreciação anual pelo método linear?", a:10000, u:"R$", e:"(60.000 − 10.000) ÷ 5 = 10.000."},
    {t:"num", q:"Máquina com custo de R$ 40.000 e depreciação acumulada de R$ 24.000, vendida por R$ 20.000. Qual o resultado da venda?", a:4000, u:"R$", e:"Valor contábil = 40.000 − 24.000 = 16.000. Resultado = 20.000 − 16.000 = 4.000 de ganho."},
    {t:"tf", q:"O ágio por rentabilidade futura (goodwill) é amortizado mensalmente, como qualquer outro intangível.", a:false, e:"O goodwill não é amortizado; é testado por impairment todo ano."},
    {t:"mc", q:"Um ativo com valor contábil de R$ 90.000 e valor recuperável de R$ 65.000 deve:", o:["Reconhecer uma perda por impairment de R$ 25.000","Ser reavaliado para cima","Continuar sem nenhum ajuste","Virar despesa integral imediatamente"], a:0, e:"90.000 − 65.000 = 25.000 de perda, pelo princípio da prudência."},
    {t:"mc", q:"Terrenos, em geral, sofrem:", o:["Nenhuma depreciação, por terem vida útil indefinida","Depreciação acelerada","Amortização mensal","Exaustão"], a:0, e:"Terrenos não se desgastam com o uso da mesma forma que máquinas e veículos."}
   ]}
  ]
};
