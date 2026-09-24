/* Contabilidade digital: primeiro o processo, depois o registro e a conferência. */
import { box, eq, tbl, ol, lanc } from '../render-helpers.js';
import { mc, tf, nu, od } from '../../engine/exercises/factories.js';

export default [
  {id:'digital1', title:'Da operação ao documento digital', icon:'📥',
   learn:[
    {h:'Um arquivo ainda não é um lançamento', b:'<p>Uma compra começa com um fato econômico. O documento eletrônico registra a operação e fornece dados para a contabilidade. O ERP pode importar esses dados, mas alguém precisa conferir fornecedor, data, valor, natureza e autorização.</p>'+box('dica','Documento, aprovação, lançamento e pagamento são eventos diferentes. Guarde o vínculo entre eles.')},
    {h:'Quatro pontos de controle', b:ol(['Receber o documento e verificar autenticidade e duplicidade.','Relacionar ao pedido, contrato ou serviço recebido.','Classificar contas, centro de custo e período.','Aprovar, registrar e arquivar a evidência.'])+tbl(['Campo','Por que conferir'],[['Data da operação','Define o período a analisar'],['Identificador do documento','Ajuda a detectar duplicidade'],['Fornecedor e valor','Permitem conciliar com contrato e pagamento']]), check:mc('A mesma nota importada duas vezes deve gerar:',['Dois lançamentos iguais','*Um alerta para investigar duplicidade','Receita de crédito'],'Importação automática não elimina a conferência de documentos repetidos.')},
    {h:'Competência e caixa continuam diferentes', b:'<p>Uma consultoria foi recebida e faturada em março por R$ 1.200, para pagamento em abril. Sob as hipóteses do caso, a despesa pertence a março; o pagamento de abril liquida a obrigação.</p>'+lanc([['D','Despesa de consultoria','1.200'],['C','Fornecedores','1.200']])+box('atencao','O ERP não deve criar uma segunda despesa ao baixar o pagamento.')},
    {h:'Feche o ciclo', b:'<p>Quando o banco pagar os R$ 1.200, confronte o extrato com o título e registre a baixa. O documento original e a aprovação permanecem vinculados ao histórico.</p>'+lanc([['D','Fornecedores','1.200'],['C','Bancos','1.200']])}
   ], ex:[
    mc('Qual conferência ajuda a evitar lançamento duplicado?',['Só olhar o nome do arquivo','*Comparar identificador, fornecedor, valor e data','Conferir somente o saldo do banco'],'O identificador e os dados da operação ajudam a detectar importações repetidas.'),
    tf('Um documento eletrônico importado pelo ERP dispensa classificação e aprovação.',false,'A automatização precisa de regras, conferência e trilha de aprovação.'),
    mc('Serviço recebido em março e pago em abril, no exemplo. Em que mês reconhecer a despesa?',['*Março','Abril','Em ambos'],'A despesa pertence ao período do serviço recebido.'),
    nu('A consultoria custa R$ 1.200 e foi paga integralmente. Quanto deve restar em Fornecedores desse título?',0,'A baixa de R$ 1.200 quita os R$ 1.200 registrados.','R$'),
    od('Ordene o fluxo antes da baixa bancária:',['Receber e validar o documento','Conferir a operação e o período','Aprovar e registrar o lançamento','Vincular documento e evidências'],'O fluxo preserva a origem e a decisão contábil.')
   ]},
  {id:'digital2', title:'Plano de contas e regras no ERP', icon:'🗂️',
   learn:[
    {h:'Uma regra precisa representar o fato', b:'<p>O ERP propõe contas com base em cadastro, produto e histórico. A mesma palavra no documento pode representar fatos diferentes: um computador para uso da empresa pode ser imobilizado; mercadorias para revenda são estoque.</p>'+box('dica','Uma boa regra automatizada tem escopo, responsável, aprovação e exceções claras.')},
    {h:'Mapeie contas e centro de custo', b:tbl(['Compra','Conta no exemplo'],[['Máquina para a produção','Máquinas e equipamentos'],['Mercadorias para revenda','Estoques'],['Serviço já consumido','Despesa do período']])+'<p>Centro de custo ajuda a analisar quem consumiu o recurso, mas não substitui a conta contábil. O cadastro deve permitir revisão quando a operação fugir do padrão.</p>', check:mc('Uma máquina comprada para uso da fábrica deve ser mapeada automaticamente como:',['Mercadorias para revenda','*Imobilizado, após conferir o fato','Receita de vendas'],'A finalidade de uso determina a classificação no exemplo.')},
    {h:'Exemplo de aquisição', b:'<p>A fábrica compra máquina por R$ 5.000 a prazo e paga R$ 200 de frete necessário para colocá-la em condições de uso. Sem outros gastos, o custo do bem será R$ 5.200.</p>'+eq('Custo inicial = 5.000 + 200 = R$ 5.200')+'<p>O sistema deve reunir os documentos da compra e do frete no histórico do ativo. O lançamento exato da contrapartida depende de como cada gasto foi pago.</p>'},
    {h:'Teste a regra antes de expandir', b:ol(['Defina o fato que a regra deve reconhecer.','Teste um documento comum e um caso de exceção.','Confira conta, valor, período e centro de custo.','Registre quem aprovou a regra e quando ela mudou.'])}
   ], ex:[
    mc('Mercadoria adquirida para revenda entra, em geral, em:',['*Estoques','Máquinas e equipamentos','Receita','Empréstimos'],'A finalidade é revenda.'),
    mc('Qual campo ajuda a analisar a área que consumiu o recurso, sem substituir a conta contábil?',['CNPJ do banco','*Centro de custo','Número do navegador'],'Centro de custo é uma dimensão gerencial.'),
    nu('Máquina de R$ 5.000 mais frete necessário de R$ 200. Qual o custo inicial no exemplo?',5200,'5.000 + 200 = 5.200.','R$'),
    tf('Uma regra automática correta hoje pode precisar de revisão quando contrato ou operação mudar.',true,'Mudanças de operação e cadastro podem alterar a classificação.'),
    od('Antes de ativar uma regra para todos os documentos:',['Definir o fato e a conta','Testar um caso comum','Testar uma exceção','Aprovar e documentar a regra'],'Uma exceção testada evita repetir o mesmo erro em escala.')
   ]},
  {id:'digital3', title:'Conciliação bancária no sistema', icon:'🏦',
   learn:[
    {h:'Dois registros da mesma movimentação', b:'<p>O extrato mostra o que o banco processou. O razão de Bancos mostra o que a contabilidade registrou. A conciliação compara ambos, item por item, e explica diferenças de data, valor ou omissão.</p>'+box('atencao','Saldo igual por acaso não prova que todas as transações foram lançadas corretamente.')},
    {h:'A tarifa que faltou', b:'<p>Saldo inicial: R$ 2.000. Entrou R$ 1.500 de cliente; saiu R$ 600 para fornecedor e R$ 25 de tarifa. O extrato termina em R$ 2.875. O ERP mostra R$ 2.900 porque a tarifa ainda não foi lançada.</p>'+eq('2.000 + 1.500 − 600 − 25 = R$ 2.875')+lanc([['D','Despesa bancária','25'],['C','Bancos','25']]), check:mc('ERP mostra R$ 2.900 e o extrato, R$ 2.875. Qual diferença investigar?',['*R$ 25','R$ 600','R$ 125','R$ 2.875'],'2.900 − 2.875 = 25: exatamente a tarifa que ainda não foi lançada.')},
    {h:'Não force a conciliação', b:'<p>Uma diferença pode ser tarifa, lançamento duplicado, pagamento em trânsito ou data distinta. Busque a evidência antes de criar um ajuste. Depois, associe extrato, comprovante e lançamento.</p>'+box('dica','A conciliação deve apontar itens pendentes, responsável e prazo de solução.')},
    {h:'Roteiro do fechamento', b:ol(['Importe o extrato sem duplicar períodos.','Compare movimentos por valor, data e referência.','Identifique itens sem par e investigue a causa.','Faça ajustes documentados e confira o saldo final.'])}
   ], ex:[
    nu('Saldo inicial de R$ 2.000, entrada de R$ 1.500, saídas de R$ 600 e R$ 25. Qual o saldo final?',2875,'2.000 + 1.500 − 600 − 25 = 2.875.','R$'),
    mc('A tarifa de R$ 25 ausente do razão exige:',['Aumentar receita','*Registrar a despesa e reduzir Bancos','Apagar o extrato'],'O ajuste depende da evidência da tarifa.'),
    tf('Saldos iguais dispensam conferir os movimentos individuais.',false,'Omissões e duplicações podem se compensar.'),
    mc('Uma diferença sem explicação deve ser:',['Ajustada para fechar a conta','*Investigada com extrato e comprovantes','Ignorada até o ano seguinte'],'A conciliação documenta a causa antes de ajustar.'),
    od('Ordene a conciliação:',['Importar extrato','Comparar com o razão','Investigar itens sem par','Ajustar com evidência e conferir saldo'],'A evidência precede o ajuste.')
   ]},
  {id:'digital4', title:'Leasing: contrato e agenda no ERP', icon:'🚚',
   learn:[
    {h:'O contrato define o trabalho', b:'<p>Antes de criar lançamentos periódicos, cadastre o contrato, identifique o bem, o prazo, os pagamentos, opções relevantes e a taxa de desconto. O sistema precisa guardar a versão do documento que sustenta cada cálculo.</p>'+box('dica','Uma planilha e o ERP precisam usar as mesmas datas, taxa e hipóteses.')},
    {h:'Um exemplo mensal simplificado', b:'<p>Uma van identificada é arrendada por 24 meses, com 24 pagamentos de R$ 1.000 ao fim de cada mês e taxa de 1% ao mês. Sem outros componentes iniciais, o valor presente dos pagamentos é aproximadamente R$ 21.243,39.</p>'+eq('Passivo inicial = valor presente dos pagamentos futuros = R$ 21.243,39')+lanc([['D','Ativo de direito de uso','21.243,39'],['C','Passivo de arrendamento','21.243,39']]), check:mc('Qual valor o sistema precisa usar para o passivo inicial deste exemplo?',['R$ 24.000 nominais','*R$ 21.243,39 de valor presente','R$ 1.000 da primeira parcela'],'Os pagamentos futuros são descontados à taxa do exemplo.')},
    {h:'Agenda mensal e conciliação', b:'<p>No primeiro mês, juros aproximados de R$ 212,43 aumentam o passivo; o pagamento de R$ 1.000 o reduz. O saldo após a parcela fica em R$ 20.455,82. A depreciação do direito de uso é calculada separadamente conforme as hipóteses do contrato.</p>'+box('atencao','Alterações de prazo, pagamentos ou opções podem exigir remensuração. A oficina complementar de Imobilizado aprofunda os lançamentos do mês.')},
    {h:'O que conferir no fechamento', b:ol(['Versão do contrato e parâmetros aprovados.','Agenda de pagamentos e extrato bancário.','Saldo do passivo, juros e direito de uso.','Alterações contratuais, evidências e responsáveis.'])+'<p class="small">Base: <a href="https://www.cpc.org.br/CPC/Documentos-Emitidos/Pronunciamentos/Pronunciamento?Id=37" target="_blank" rel="noopener noreferrer">CPC 06 (R2) — Arrendamentos</a>. Valores didáticos.</p>'}
   ], ex:[
    mc('Qual informação é necessária para calcular a agenda de um arrendamento?',['Só a cor da van','*Prazo, pagamentos, datas e taxa de desconto','Só o nome do fornecedor'],'A agenda depende do contrato e das hipóteses de mensuração.'),
    nu('Passivo inicial de R$ 21.243,39 à taxa mensal de 1%. Quanto são os juros aproximados do primeiro mês?',212.43,'21.243,39 × 1% ≈ 212,43.','R$'),
    nu('Parcela de R$ 1.000 menos juros de R$ 212,43. Quanto reduz o passivo?',787.57,'1.000 − 212,43 = 787,57.','R$'),
    tf('Uma mudança contratual nunca altera a agenda registrada no ERP.',false,'Certas modificações podem exigir revisão da mensuração e dos lançamentos.'),
    mc('Qual item ajuda a revisar o valor calculado meses depois?',['Somente o saldo final','*Contrato, taxa, memória de cálculo e histórico de alterações','Uma imagem sem identificação'],'A trilha de cálculo precisa ser reproduzível.')
   ]},
  {id:'digital5', title:'Fechamento digital e ECD', icon:'📚',
   learn:[
    {h:'Fechar antes de transmitir', b:'<p>O fechamento reúne lançamentos, concilia saldos, revisa períodos e gera relatórios. A ECD integra o SPED e substitui, nos casos em que é exigida, livros contábeis em papel por arquivos digitais transmitidos. O arquivo precisa refletir a escrituração revisada.</p>'+box('atencao','Obrigação, leiaute e prazo devem ser conferidos nas orientações oficiais vigentes para cada entidade e período.')},
    {h:'Do razão ao arquivo', b:ol(['Feche movimentos e concilie contas relevantes.','Revise plano de contas, cadastros e saldos.','Gere o arquivo no leiaute aplicável.','Valide, corrija inconsistências e documente a versão entregue.'])+'<p>O envio é uma etapa do processo; um arquivo validado formalmente ainda exige que os fatos contábeis estejam corretos.</p>', check:mc('A validação técnica do arquivo prova, sozinha, que todas as contas estão corretas?',['Sim','*Não'],'É preciso revisar saldos, classificações e evidências.')},
    {h:'Uma diferença no balancete', b:'<p>O razão de Bancos aponta R$ 8.400, mas a conciliação documentada indica R$ 8.350. Investigue os R$ 50 antes de gerar o arquivo final. Pode haver tarifa, duplicidade ou corte de período.</p>'+eq('Diferença a investigar = 8.400 − 8.350 = R$ 50')},
    {h:'Guarde o pacote de evidências', b:'<p>Preserve versão do arquivo, recibo quando aplicável, conciliações, balancete, relatórios de validação e registro de correções. A Receita Federal descreve a ECD e seus livros na página oficial do SPED.</p><p class="small">Fonte: <a href="https://sped.rfb.gov.br/pagina/show/499" target="_blank" rel="noopener noreferrer">SPED — O que é a ECD</a>.</p>'}
   ], ex:[
    mc('A ECD está relacionada principalmente a:',['Envio de mensagens da equipe','*Escrituração contábil em formato digital','Controle de ponto dos funcionários'],'A ECD integra o SPED e trata de livros contábeis digitais.'),
    tf('Um arquivo aceito tecnicamente dispensa revisar lançamentos e saldos.',false,'A validação de formato não substitui revisão contábil.'),
    nu('Razão de Bancos R$ 8.400; conciliação indica R$ 8.350. Qual diferença investigar?',50,'8.400 − 8.350 = 50.','R$'),
    mc('Antes de afirmar um prazo ou obrigação de ECD para uma empresa real, consulte:',['Uma regra fixa para todas','*Orientação oficial vigente para entidade e período','A tela inicial do ERP apenas'],'Aplicabilidade e prazo dependem da regra vigente.'),
    od('Ordene o fechamento:',['Conciliar e revisar saldos','Conferir cadastros e plano de contas','Gerar e validar o arquivo','Guardar versão, recibo e evidências'],'O arquivo vem depois da revisão da escrituração.')
   ]},
  {id:'digital6', title:'Permissões, erros e trilha de auditoria', icon:'🔐',
   learn:[
    {h:'Quem fez o quê?', b:'<p>Um sistema confiável registra quem incluiu, alterou, aprovou e exportou dados, com data e motivo. Permissões devem acompanhar a função da pessoa. Uma correção contábil precisa preservar o histórico e a evidência do ajuste.</p>'+box('dica','Registrar usuário, data, valor anterior e novo valor facilita explicar mudanças no fechamento.')},
    {h:'Separe tarefas sensíveis', b:'<p>Quem cadastra fornecedor não deveria, sozinho, aprovar qualquer pagamento para esse fornecedor. Pequenas equipes podem usar revisão posterior documentada quando uma separação completa não for possível.</p>'+tbl(['Risco','Controle ilustrativo'],[['Pagamento indevido','Aprovação independente e comprovante'],['Nota duplicada','Alerta por identificador e fornecedor'],['Alteração sem rastro','Log e revisão de mudanças']]), check:mc('Que controle reduz risco de pagamento duplicado?',['Desativar todos os logs','*Alerta de duplicidade e revisão antes da aprovação','Usar somente o saldo final'],'A comparação dos dados do documento pode detectar a repetição.')},
    {h:'Automação também amplia erros', b:'<p>Uma regra que classifica errado 100 documentos gera 100 erros consistentes. Monitore exceções e reconcilie amostras após mudanças de regra. Treine a equipe para interromper o fluxo quando a evidência não sustentar o registro.</p>'},
    {h:'Um fechamento reproduzível', b:ol(['Restrinja acesso e reveja perfis periodicamente.','Registre alterações e aprovações.','Faça backup e teste a recuperação.','Concilie dados de origem, razão e relatórios finais.'])}
   ], ex:[
    mc('Qual informação é mais útil em um log de alteração?',['Só a cor da tela','*Usuário, data, valor anterior e novo valor','Somente o nome do software'],'Esses dados permitem reconstruir a mudança.'),
    tf('Automação elimina a necessidade de monitorar exceções.',false,'Uma regra errada pode repetir o erro em muitos documentos.'),
    mc('Quem cadastra um fornecedor também aprovar sozinho todos os pagamentos aumenta qual risco?',['Nenhum','*Pagamento indevido ou não detectado','Apenas lentidão'],'Separação de funções e revisão ajudam a reduzir o risco.'),
    mc('Um backup é mais confiável quando:',['Nunca é aberto','*A recuperação é testada','Só existe no mesmo computador'],'O teste confirma que os dados podem ser restaurados.'),
    od('Organize a resposta a uma regra automática errada:',['Interromper ou limitar a regra','Identificar documentos afetados','Corrigir com histórico e aprovação','Reconciliar os saldos resultantes'],'A correção precisa ser rastreável e completa.')
   ]}
];
