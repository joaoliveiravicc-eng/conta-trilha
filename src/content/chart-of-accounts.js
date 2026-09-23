/* Plano de contas simplificado, sinônimos aceitos e modelos de lançamento — usados pelos casos práticos e pelo treino infinito. */

export const CHART = {
 'Caixa':'AC','Bancos':'AC','Aplicações financeiras':'AC','Clientes':'AC','Estoques':'AC','Seguros a apropriar':'AC',
 'Máquinas e equipamentos':'ANC','Veículos':'ANC','Móveis e utensílios':'ANC','Computadores':'ANC','Ferramentas':'ANC','Depreciação acumulada':'ANC',
 'Fornecedores':'PC','Salários a pagar':'PC','Contas a pagar':'PC','Juros a pagar':'PC','INSS a recolher':'PC','13º salário a pagar':'PC','Impostos a pagar':'PC',
 'Empréstimos a pagar':'PNC','Financiamentos a pagar':'PNC',
 'Capital social':'PL','Reservas de lucros':'PL',
 'Receita de vendas':'REC','Receita de serviços':'REC','Receita financeira':'REC',
 'CMV':'DESP','Custo dos serviços prestados':'DESP','Despesa de aluguel':'DESP','Despesa com salários':'DESP','Despesa com energia':'DESP','Despesa de juros':'DESP','Despesa de depreciação':'DESP','Despesa com seguros':'DESP','Despesa com 13º salário':'DESP'
};
export const GROUP_NAME = { AC:'Ativo', ANC:'Ativo', PC:'Passivo', PNC:'Passivo', PL:'Patrimônio Líquido', REC:'Receita', DESP:'Despesa' };

/* Sinônimos aceitos quando você escreve o nome de uma conta */
export const ALIASES = {
 'Caixa':['dinheiro','caixa geral','caixa da empresa'],
 'Bancos':['banco','bancos conta movimento','banco conta movimento','conta corrente','conta bancaria','deposito bancario','bancos c/ movimento'],
 'Estoques':['estoque','mercadorias','estoque de mercadorias','mercadorias para revenda','estoque de mercadoria'],
 'Fornecedores':['fornecedor','duplicatas a pagar','fornecedores a pagar'],
 'Clientes':['cliente','contas a receber','duplicatas a receber','valores a receber','clientes a receber'],
 'Receita de vendas':['vendas','receita','receita bruta','receita bruta de vendas','vendas de mercadorias','receita com vendas'],
 'Receita de serviços':['receita','servicos prestados','receita de prestacao de servicos','receita com servicos','receita de servico'],
 'Capital social':['capital','capital subscrito','capital integralizado'],
 'Empréstimos a pagar':['emprestimos','emprestimo','emprestimos bancarios','emprestimo bancario','financiamentos','financiamento'],
 'Financiamentos a pagar':['financiamento','financiamentos','emprestimos a pagar','financiamento de veiculo'],
 'Despesa de aluguel':['aluguel','despesa com aluguel','despesas de aluguel','aluguel do mes','aluguel passivo'],
 'Despesa com salários':['salarios','despesa de salarios','despesas com salarios','salarios e ordenados','despesa com pessoal','folha de pagamento'],
 'Salários a pagar':['salario a pagar','ordenados a pagar','salarios e ordenados a pagar'],
 'CMV':['custo das mercadorias vendidas','custo da mercadoria vendida','custo das vendas','custo de mercadoria vendida'],
 'Despesa de depreciação':['depreciacao','despesa com depreciacao','despesas de depreciacao','depreciacao do mes'],
 'Depreciação acumulada':['(-) depreciacao acumulada','depreciacoes acumuladas'],
 'Despesa com energia':['energia','energia eletrica','despesa de energia','despesa com energia eletrica','conta de luz','luz'],
 'Contas a pagar':['despesas a pagar','energia a pagar','contas a pagar diversas'],
 'Despesa de juros':['juros','despesas financeiras','despesa financeira','juros passivos','juros pagos','despesa com juros'],
 'Móveis e utensílios':['moveis','moveis e equipamentos','moveis e utensilio'],
 'Veículos':['veiculo','carro','carros'],
 'Máquinas e equipamentos':['maquinas','maquina','equipamentos'],
 'Seguros a apropriar':['despesas antecipadas','seguro a apropriar','seguros antecipados','despesa antecipada'],
 'Despesa com seguros':['seguros','despesa de seguros','seguro'],
 'Despesa com 13º salário':['13 salario','decimo terceiro','despesa com decimo terceiro','despesa de 13 salario'],
 '13º salário a pagar':['decimo terceiro a pagar','13 salario a pagar','provisao de 13 salario']
};

/* Modelos de lançamento para o treino infinito */
export const ENTRY_TPL = [
 ["Compra de mercadorias à vista, em dinheiro, {v}.","Estoques","Caixa"],
 ["Compra de mercadorias a prazo, {v}.","Estoques","Fornecedores"],
 ["Venda de mercadorias à vista, em dinheiro, {v} (registro da receita).","Caixa","Receita de vendas"],
 ["Venda de mercadorias a prazo, {v} (registro da receita).","Clientes","Receita de vendas"],
 ["Pagamento de {v} a um fornecedor, pelo banco.","Fornecedores","Bancos"],
 ["Recebimento de {v} de um cliente, em dinheiro.","Caixa","Clientes"],
 ["Recebimento de {v} de um cliente via Pix.","Bancos","Clientes"],
 ["Pagamento do aluguel do mês, {v}, em dinheiro.","Despesa de aluguel","Caixa"],
 ["Empréstimo bancário de {v} creditado na conta.","Bancos","Empréstimos a pagar"],
 ["Depósito de {v} do caixa na conta bancária.","Bancos","Caixa"],
 ["Saque de {v} do banco para o caixa.","Caixa","Bancos"],
 ["Aporte de capital dos sócios, em dinheiro, {v}.","Caixa","Capital social"],
 ["Compra de um veículo financiado, {v}.","Veículos","Financiamentos a pagar"],
 ["Serviço prestado a prazo, {v}.","Clientes","Receita de serviços"],
 ["Serviço prestado e recebido no banco, {v}.","Bancos","Receita de serviços"],
 ["Conta de energia do mês, a pagar, {v}.","Despesa com energia","Contas a pagar"],
 ["Pagamento da conta de energia já registrada, {v}, pelo banco.","Contas a pagar","Bancos"],
 ["Depreciação do mês, {v}.","Despesa de depreciação","Depreciação acumulada"],
 ["Salários do mês a pagar, {v}.","Despesa com salários","Salários a pagar"],
 ["Pagamento de salários já registrados, {v}, pelo banco.","Salários a pagar","Bancos"],
 ["Juros de empréstimo pagos pelo banco, {v}.","Despesa de juros","Bancos"],
 ["Compra de móveis para a loja, à vista, pelo banco, {v}.","Móveis e utensílios","Bancos"],
 ["Baixa do custo das mercadorias vendidas, {v}.","CMV","Estoques"],
 ["Pagamento de seguro anual antecipado, pelo banco, {v}.","Seguros a apropriar","Bancos"]
];
