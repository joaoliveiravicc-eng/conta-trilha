import { T, TT, box, eq, tbl, lanc, ul, ol } from '../render-helpers.js';

export default {
  id:"aud", title:"Auditoria", icon:"🔍", color:"#B3432B",
  desc:"Auditoria interna e externa, riscos, controles, evidências e o relatório do auditor.",
  lessons:[
  {id:"aud1", title:"O que é auditoria", icon:"🕵️",
   learn:[
    {h:"Definição", b:`<p>Auditoria é o exame <b>independente</b> das demonstrações financeiras para aumentar a confiança de quem as usa.</p><p>No fim, o auditor emite uma <b>opinião</b>: as demonstrações estão adequadas, em todos os aspectos relevantes?</p>`},
    {h:"Interna x externa", b:tbl(['','Interna','Externa (independente)'],[['Quem faz','Área da própria empresa','Firma sem vínculo com a empresa'],['Foco','Controles, riscos e processos','Demonstrações financeiras'],['Para quem','Administração e conselho','Sócios, investidores e mercado']]) +
      `<p>A auditoria externa é obrigatória para companhias abertas e sociedades de grande porte.</p>`},
    {h:"Segurança razoável", b:`<p>A auditoria não examina 100% das transações nem dá certeza absoluta. Ela oferece <b>segurança razoável</b>, usando testes e amostragem.</p>`},
    {h:"Ceticismo e independência", b:ul(['<b>Ceticismo profissional</b>: questionar e avaliar criticamente as evidências.','<b>Independência</b>: o auditor não pode, por exemplo, ter participação no cliente nem fazer a contabilidade que ele mesmo vai auditar.']) +
      box('dica','No Brasil, as normas de auditoria são as NBC TA, convergentes com as normas internacionais (ISA).')}
   ],
   ex:[
    {t:"mc", q:"Qual é o objetivo da auditoria das demonstrações financeiras?", o:["Emitir uma opinião sobre a adequação das demonstrações","Fazer a contabilidade da empresa no dia a dia","Descobrir todas as fraudes que existirem na empresa","Calcular os impostos que a empresa deve pagar"], a:0, e:"O produto final é a opinião do auditor."},
    {t:"tf", q:"A auditoria garante com certeza absoluta que não há erros nas demonstrações.", a:false, e:"Ela oferece segurança razoável, não absoluta."},
    {t:"match", pairs:[["Auditoria interna","Área da empresa, foca em controles"],["Auditoria externa","Firma independente, opina sobre as demonstrações"],["Ceticismo profissional","Avaliar criticamente as evidências"],["NBC TA","Normas brasileiras de auditoria"]], e:"Conceitos básicos do mundo da auditoria."},
    {t:"tf", q:"Um auditor externo pode fazer a contabilidade da empresa que ele mesmo audita.", a:false, e:"Isso comprometeria a independência: ele auditaria o próprio trabalho."},
    {t:"mc", q:"A auditoria independente é obrigatória por lei para:", o:["Companhias abertas e sociedades de grande porte","Todo MEI, mesmo com faturamento muito pequeno","Somente os órgãos públicos e as autarquias","Nenhuma empresa, porque a auditoria é sempre voluntária"], a:0, e:"Quem tem investidores no mercado ou grande porte precisa de auditoria externa."}
   ]},
  {id:"aud2", title:"Risco e materialidade", icon:"🎲",
   learn:[
    {h:"Materialidade", b:`<p>É o valor a partir do qual um erro poderia <b>mudar a decisão</b> de quem lê as demonstrações.</p>` +
      box('exemplo','Um erro de R$ 100 numa empresa que fatura bilhões não é material. Numa empresa muito pequena, pode ser. Uma referência comum é um percentual do lucro antes dos impostos, por exemplo 5%.')},
    {h:"Risco de auditoria", b:`<p>É o risco de o auditor dar uma opinião inadequada, como dizer que está tudo certo quando existe uma distorção relevante.</p>` + eq('Risco de auditoria = Risco inerente × Risco de controle × Risco de detecção')},
    {h:"Os componentes", b:tbl(['Risco','Significado'],[['Inerente','Suscetibilidade natural de um item a erro (estimativas, operações complexas)'],['De controle','Os controles da empresa não evitarem ou não detectarem o erro'],['De detecção','Os procedimentos do auditor não encontrarem o erro']]) +
      `<p>Só o risco de <b>detecção</b> é controlado pelo auditor.</p>`},
    {h:"Como eles se relacionam", b:`<p>Quanto <b>maior</b> o risco inerente e de controle, <b>menor</b> precisa ser o risco de detecção. Na prática: mais testes e mais evidências.</p>`}
   ],
   ex:[
    {t:"mc", q:"Qual componente do risco de auditoria o auditor controla diretamente?", o:["Risco de detecção","Risco inerente","Risco de controle","Risco de mercado"], a:0, e:"Ele ajusta o risco de detecção mudando a natureza, a época e a extensão dos testes."},
    {t:"tf", q:"Se os controles internos são fracos, o auditor tende a aumentar os seus testes.", a:true, e:"Risco de controle alto exige menor risco de detecção, ou seja, mais testes."},
    {t:"mc", q:"Materialidade é:", o:["O valor a partir do qual um erro influencia decisões","O preço cobrado pelo auditor pelo trabalho realizado","O número de documentos examinados pelo auditor","O total dos ativos físicos que a empresa possui"], a:0, e:"Ela orienta onde o auditor concentra o trabalho."},
    {t:"match", pairs:[["Risco inerente","Suscetibilidade natural a erro"],["Risco de controle","Controles da empresa falharem"],["Risco de detecção","Testes do auditor não acharem o erro"]], e:"Os três componentes do risco de auditoria."},
    {t:"num", q:"Lucro antes dos impostos de R$ 2.000.000 e materialidade definida em 5%. Qual o valor da materialidade?", a:100000, u:"R$", e:"2.000.000 × 5% = 100.000."}
   ]},
  {id:"aud3", title:"Controles internos", icon:"🛡️",
   learn:[
    {h:"O que são", b:`<p>Políticas e procedimentos para <b>proteger os ativos</b>, garantir informações confiáveis, operações eficientes e o cumprimento das leis.</p>`},
    {h:"COSO: cinco componentes", b:ul(['<b>Ambiente de controle</b>: cultura, ética e exemplo da liderança.','<b>Avaliação de riscos</b>: identificar o que pode dar errado.','<b>Atividades de controle</b>: aprovações, conciliações, segregação.','<b>Informação e comunicação</b>: a informação certa chega a quem precisa.','<b>Monitoramento</b>: verificar se os controles funcionam.'])},
    {h:"Exemplos de controles", b:tbl(['Controle','Como funciona'],[['Segregação de funções','Quem aprova não paga nem registra'],['Alçadas','Pagamentos grandes exigem duas aprovações'],['Conciliação bancária','Conferir o saldo contábil com o extrato'],['Inventário físico','Contar o estoque e comparar com o sistema'],['Controle de acesso','Senhas e perfis nos sistemas']])},
    {h:"Preventivos x detectivos", b:ul(['<b>Preventivos</b> evitam o erro antes que aconteça: senha, dupla aprovação.','<b>Detectivos</b> encontram o erro depois: conciliações, revisões, contagens.'])}
   ],
   ex:[
    {t:"mc", q:"Segregação de funções significa:", o:["Separar entre pessoas diferentes autorizar, registrar e guardar","Concentrar tudo em uma só pessoa de confiança, ligada à diretoria","Demitir quem comete erros nas tarefas de controle","Eliminar a supervisão para agilizar o trabalho dos setores"], a:0, e:"Assim, ninguém consegue cometer e esconder um erro ou fraude sozinho."},
    {t:"class", q:"Preventivo ou detectivo?", cats:["Preventivo","Detectivo"], items:[["Dupla aprovação de pagamentos",0],["Conciliação bancária mensal",1],["Senha de acesso ao sistema",0],["Contagem física do estoque",1],["Revisão de relatório de exceções",1]], e:"Preventivo age antes; detectivo encontra depois."},
    {t:"tf", q:"Uma mesma pessoa aprovar, pagar e registrar as compras é um bom controle.", a:false, e:"Isso viola a segregação de funções."},
    {t:"match", pairs:[["Ambiente de controle","Cultura e ética da organização"],["Avaliação de riscos","Identificar o que pode dar errado"],["Atividades de controle","Aprovações, conciliações, segregação"],["Monitoramento","Avaliar se os controles funcionam"]], e:"Quatro dos cinco componentes do COSO."},
    {t:"mc", q:"A conciliação bancária compara:", o:["O saldo contábil com o extrato do banco","O estoque contábil com as vendas do período","Os salários pagos com os impostos do mês","A DRE com a DFC do mesmo período"], a:0, e:"Diferenças apontam lançamentos faltando, duplicados ou erros."}
   ]},
  {id:"aud4", title:"Evidências e procedimentos", icon:"🧪",
   learn:[
    {h:"Evidência de auditoria", b:`<p>São as informações que sustentam a opinião do auditor. Precisam ser:</p>` + ul(['<b>Suficientes</b>: quantidade.','<b>Apropriadas</b>: qualidade, ou seja, relevância e confiabilidade.'])},
    {h:"O que é mais confiável", b:ul(['Evidência <b>externa</b> é mais confiável que interna.','Obtida <b>diretamente</b> pelo auditor é mais confiável que obtida de forma indireta.','<b>Documental</b> é mais confiável que verbal.','<b>Original</b> é mais confiável que cópia.'])},
    {h:"Procedimentos", b:tbl(['Procedimento','O que é'],[['Inspeção','Examinar documentos ou ativos'],['Observação','Ver um processo acontecendo'],['Confirmação externa','Resposta direta de um terceiro, como um banco'],['Recálculo','Refazer contas'],['Reexecução','Refazer um controle da empresa'],['Procedimentos analíticos','Comparar tendências e índices'],['Indagação','Fazer perguntas']])},
    {h:"Asserções", b:`<p>São as afirmações implícitas nas demonstrações que o auditor testa:</p>` + ul(['<b>Existência</b>: o ativo existe?','<b>Integridade</b>: tudo foi registrado?','<b>Direitos e obrigações</b>','<b>Avaliação</b>: o valor está certo?','<b>Corte</b>: o registro está no período certo?','<b>Classificação</b>']) +
      box('dica','Contar o estoque testa existência. Procurar contas a pagar não registradas testa integridade.')}
   ],
   ex:[
    {t:"match", pairs:[["Confirmação externa","Carta enviada ao banco pedindo o saldo"],["Inspeção","Examinar a nota fiscal"],["Recálculo","Refazer a conta da depreciação"],["Observação","Acompanhar a contagem do estoque"]], e:"Cada procedimento gera um tipo de evidência."},
    {t:"mc", q:"Qual evidência é, em geral, a mais confiável?", o:["Confirmação do banco enviada direto ao auditor","Declaração verbal de um gerente da área auditada","Cópia de uma planilha interna feita pela empresa","E-mail trocado entre funcionários da própria empresa"], a:0, e:"É externa, documental e obtida diretamente pelo auditor."},
    {t:"tf", q:"Evidência suficiente se refere à quantidade; evidência apropriada, à qualidade.", a:true, e:"Suficiência = quantidade. Adequação = relevância e confiabilidade."},
    {t:"mc", q:"Contar fisicamente os estoques testa principalmente a asserção de:", o:["Existência","Integridade","Classificação","Corte"], a:0, e:"A contagem confirma que o estoque registrado de fato existe."},
    {t:"mc", q:"Verificar se vendas de 2 de janeiro foram registradas em dezembro testa a asserção de:", o:["Corte","Existência","Direitos e obrigações","Avaliação"], a:0, e:"Corte verifica se as transações estão no período correto."}
   ]},
  {id:"aud5", title:"Relatório do auditor", icon:"📝",
   learn:[
    {h:"A opinião", b:`<p>Ao final do trabalho, o auditor emite o <b>relatório do auditor independente</b>, com sua opinião sobre as demonstrações.</p>`},
    {h:"Tipos de opinião", b:tbl(['Opinião','Quando'],[['Sem ressalva (não modificada)','As demonstrações estão adequadas'],['Com ressalva','Distorção relevante, mas não generalizada'],['Adversa','Distorções relevantes e generalizadas'],['Abstenção de opinião','Sem evidência suficiente, com possíveis efeitos relevantes e generalizados']])},
    {h:"Seções adicionais", b:ul(['<b>Parágrafo de ênfase</b>: chama atenção para algo já divulgado corretamente, como um processo judicial relevante. <b>Não muda</b> a opinião.','<b>Principais Assuntos de Auditoria (PAA)</b>: temas que exigiram mais atenção; obrigatórios para companhias listadas.'])},
    {h:"Continuidade operacional", b:`<p>Se existe dúvida relevante sobre a capacidade de a empresa continuar operando, o auditor inclui uma seção específica sobre <b>incerteza relevante relacionada à continuidade operacional</b>.</p>`}
   ],
   ex:[
    {t:"class", q:"Qual opinião combina com cada situação?", cats:["Sem ressalva","Com ressalva","Adversa","Abstenção"], items:[["Tudo adequado",0],["Distorção relevante em um item isolado",1],["Distorções relevantes e generalizadas",2],["Falta de evidência com possíveis efeitos generalizados",3]], e:"A gravidade e a abrangência do problema definem o tipo de opinião."},
    {t:"tf", q:"Um parágrafo de ênfase muda a opinião do auditor.", a:false, e:"A ênfase só destaca algo já divulgado; a opinião continua a mesma."},
    {t:"mc", q:"O auditor obteve evidências e concluiu que as demonstrações estão erradas de forma generalizada. A opinião é:", o:["Adversa","Abstenção","Com ressalva","Sem ressalva"], a:0, e:"Com evidências e erros generalizados, a opinião é adversa. Abstenção é quando faltam evidências."},
    {t:"mc", q:"Os Principais Assuntos de Auditoria (PAA) são:", o:["Os temas que mais exigiram atenção do auditor","As previsões de lucro que a empresa divulga","A lista de clientes atendidos pelo auditor","Os honorários cobrados pela auditoria no ano"], a:0, e:"Eles dão transparência sobre as áreas mais sensíveis da auditoria."},
    {t:"tf", q:"A abstenção de opinião ocorre quando o auditor não consegue evidência suficiente e os possíveis efeitos são relevantes e generalizados.", a:true, e:"Nesse caso, ele não tem base para opinar."}
   ]},
  {id:"aud6", title:"Fraude x erro", icon:"🎭",
   learn:[
    {h:"A diferença é a intenção", b:`<p>Uma distorção nas demonstrações pode ser um <b>erro</b> (não intencional) ou uma <b>fraude</b> (intencional, para obter vantagem indevida).</p>`},
    {h:"Tipos de fraude", b:ul(['<b>Manipulação de resultados</b> (fraudulent financial reporting): inflar receitas, esconder despesas ou dívidas.','<b>Apropriação indevida de ativos</b>: desviar dinheiro ou bens da empresa para uso próprio.']) + box('dica','A fraude de manipulação costuma partir da alta administração; a apropriação de ativos costuma ser de funcionários.')},
    {h:"O triângulo da fraude", b:tbl(['Elemento','Significado'],[['Pressão','Uma necessidade ou incentivo para cometer a fraude'],['Oportunidade','Controles fracos que permitem agir sem ser percebido'],['Racionalização','A justificativa que a pessoa dá para si mesma']]) + box('exemplo','Um funcionário endividado (pressão), sem segregação de funções no caixa (oportunidade), que pensa “só estou pegando emprestado” (racionalização).')},
    {h:"O papel do auditor", b:`<p>O auditor é responsável por obter segurança razoável de que as demonstrações estão livres de distorção relevante, <b>seja por erro, seja por fraude</b> — mas a responsabilidade de <b>prevenir e detectar</b> fraudes no dia a dia é da administração, por meio dos controles internos.</p>` +
      box('atencao','Fraudes costumam ser mais difíceis de detectar do que erros, porque envolvem conluio, documentos forjados e omissões deliberadas.')}
   ],
   ex:[
    {t:"mc", q:"O que diferencia fraude de erro?", o:["A intenção: fraude é deliberada, erro não","O valor envolvido, que é sempre maior na fraude","Quem descobriu o problema primeiro na empresa","O tipo de empresa em que o problema ocorreu"], a:0, e:"Fraude é intencional; erro é não intencional."},
    {t:"match", pairs:[["Pressão","Uma necessidade ou incentivo para fraudar"],["Oportunidade","Controles fracos que permitem agir sem ser percebido"],["Racionalização","A justificativa que a pessoa dá para si mesma"]], e:"Os três elementos do triângulo da fraude."},
    {t:"tf", q:"A responsabilidade primária por prevenir e detectar fraudes no dia a dia é da administração da empresa.", a:true, e:"Os controles internos, mantidos pela administração, são a primeira linha de defesa."},
    {t:"mc", q:"Um funcionário que desvia dinheiro do caixa para uso pessoal comete:", o:["Apropriação indevida de ativos","Manipulação de resultados","Um erro contábil","Uma estimativa incorreta"], a:0, e:"É o desvio de um ativo específico, diferente de maquiar o resultado da empresa toda."},
    {t:"tf", q:"Fraudes costumam ser mais fáceis de detectar do que erros, porque deixam mais rastros.", a:false, e:"O contrário: fraudes envolvem ocultação deliberada, o que as torna mais difíceis de detectar."}
   ]},
  {id:"aud7", title:"Revisão: auditoria", icon:"🔄",
   learn:[
    {h:"Do planejamento à opinião", b:ol(['Avaliar <b>risco</b> e definir a <b>materialidade</b>.','Entender e testar os <b>controles internos</b>.','Coletar <b>evidências</b> (inspeção, confirmação, recálculo...).','Emitir o <b>relatório</b>, com opinião sem ressalva, com ressalva, adversa ou abstenção.'])}
   ],
   ex:[
    {t:"mc", q:"A auditoria das demonstrações financeiras oferece:", o:["Segurança razoável, não certeza absoluta","Certeza absoluta de que não há erros","Garantia de lucro futuro","Aprovação do plano de negócios"], a:0, e:"Ela usa testes e amostragem, não examina 100% das transações."},
    {t:"num", q:"Lucro antes dos impostos de R$ 800.000 e materialidade de 5%. Qual o valor da materialidade?", a:40000, u:"R$", e:"800.000 × 5% = 40.000."},
    {t:"mc", q:"Segregação de funções significa:", o:["Pessoas diferentes autorizam, registram e guardam","Uma só pessoa de confiança cuida de todo o processo","Eliminar toda supervisão para ganhar agilidade","Trocar de contador a cada ano, por segurança"], a:0, e:"Assim ninguém consegue cometer e esconder um erro ou fraude sozinho."},
    {t:"match", pairs:[["Confirmação externa","Resposta direta de um terceiro, como um banco"],["Recálculo","Refazer as contas"],["Observação","Ver um processo acontecendo, como a contagem do estoque"]], e:"Cada procedimento produz um tipo de evidência."},
    {t:"tf", q:"Um parágrafo de ênfase no relatório do auditor muda a opinião emitida.", a:false, e:"A ênfase só destaca algo já divulgado corretamente; a opinião continua a mesma."},
    {t:"mc", q:"Distorções relevantes e generalizadas nas demonstrações levam a uma opinião:", o:["Adversa","Sem ressalva","Sempre com ressalva","Não é preciso opinar"], a:0, e:"Quando o problema é ao mesmo tempo relevante e espalhado pelas demonstrações, a opinião é adversa."}
   ]}
  ]
};

