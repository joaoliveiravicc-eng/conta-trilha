/* Os 3 estudos de caso completos (sequência de fatos a lançar).
   'req' é o id da trilha que precisa estar concluída para desbloquear o caso. */

export const CASES = [
 {id:"padaria", title:"Abrindo a Padaria da Dona Ana", icon:"🥖", color:"#1E8A4C", req:"dc",
  story:"Dona Ana vai abrir a padaria dos sonhos e contratou você como contador(a). Registre cada fato do primeiro mês. No final, eu monto o balanço com os seus lançamentos!",
  ev:[
   ["Dona Ana deposita R$ 30.000 no banco como capital da padaria.",[["Bancos",30000]],[["Capital social",30000]],["Caixa","Receita de vendas"]],
   ["Ela saca R$ 2.000 do banco para o caixa, para ter troco.",[["Caixa",2000]],[["Bancos",2000]],["Capital social","Receita de vendas"]],
   ["Compra um forno por R$ 12.000, pagando pelo banco.",[["Máquinas e equipamentos",12000]],[["Bancos",12000]],["Fornecedores","Despesa com energia"]],
   ["Compra farinha e insumos a prazo: R$ 3.000.",[["Estoques",3000]],[["Fornecedores",3000]],["Caixa","CMV"]],
   ["Vende pães e bolos à vista, em dinheiro: R$ 5.000 (receita).",[["Caixa",5000]],[["Receita de vendas",5000]],["Clientes","Estoques"]],
   ["Baixa do custo do que foi vendido: R$ 1.800.",[["CMV",1800]],[["Estoques",1800]],["Receita de vendas","Caixa"]],
   ["Paga o aluguel do mês pelo banco: R$ 1.500.",[["Despesa de aluguel",1500]],[["Bancos",1500]],["Fornecedores","Caixa"]],
   ["Salário do ajudante do mês, a pagar no mês seguinte: R$ 1.600.",[["Despesa com salários",1600]],[["Salários a pagar",1600]],["Bancos","Caixa"]],
   ["Paga metade da dívida com o fornecedor pelo banco: R$ 1.500.",[["Fornecedores",1500]],[["Bancos",1500]],["Estoques","CMV"]],
   ["Deposita R$ 4.000 do caixa no banco.",[["Bancos",4000]],[["Caixa",4000]],["Receita de vendas","Capital social"]]
  ]},
 {id:"loja", title:"Loja de Roupas Estilo", icon:"👗", color:"#1F6F78", req:"lanc",
  story:"A Loja Estilo começou com capital dos sócios e um empréstimo. Tem compras a prazo, vendas, seguro antecipado, juros e depreciação. Mostre que você domina os ajustes!",
  ev:[
   ["Sócios depositam R$ 50.000 no banco como capital.",[["Bancos",50000]],[["Capital social",50000]],["Caixa","Receita de vendas"]],
   ["Empréstimo de longo prazo de R$ 20.000 creditado no banco.",[["Bancos",20000]],[["Empréstimos a pagar",20000]],["Receita financeira","Capital social"]],
   ["Compra de mercadorias a prazo: R$ 30.000.",[["Estoques",30000]],[["Fornecedores",30000]],["Bancos","CMV"]],
   ["Compra de móveis para a loja pelo banco: R$ 8.000.",[["Móveis e utensílios",8000]],[["Bancos",8000]],["Fornecedores","Estoques"]],
   ["Pagamento antecipado do seguro anual pelo banco: R$ 2.400.",[["Seguros a apropriar",2400]],[["Bancos",2400]],["Despesa com seguros","Fornecedores"]],
   ["Vendas a prazo no mês: R$ 25.000 (receita).",[["Clientes",25000]],[["Receita de vendas",25000]],["Bancos","Estoques"]],
   ["Baixa do custo das mercadorias vendidas: R$ 14.000.",[["CMV",14000]],[["Estoques",14000]],["Receita de vendas","Fornecedores"]],
   ["Recebimento de clientes no banco: R$ 10.000.",[["Bancos",10000]],[["Clientes",10000]],["Receita de vendas","Caixa"]],
   ["Apropriação do seguro do mês: R$ 200.",[["Despesa com seguros",200]],[["Seguros a apropriar",200]],["Bancos","Contas a pagar"]],
   ["Juros do empréstimo do mês, a pagar: R$ 300.",[["Despesa de juros",300]],[["Juros a pagar",300]],["Receita financeira","Bancos"]],
   ["Depreciação dos móveis no mês: R$ 100.",[["Despesa de depreciação",100]],[["Depreciação acumulada",100]],["Móveis e utensílios","Caixa"]],
   ["Pagamento a fornecedores pelo banco: R$ 12.000.",[["Fornecedores",12000]],[["Bancos",12000]],["Estoques","Clientes"]]
  ]},
 {id:"oficina", title:"Oficina Mecânica do Seu Zé", icon:"🔧", color:"#6B4C8A", req:"demo",
  story:"Seu Zé abriu uma oficina de serviços. Aqui aparecem lançamentos compostos, custo dos serviços, retenção de INSS e provisão de 13º. É o desafio final!",
  ev:[
   ["Seu Zé entrega como capital ferramentas de R$ 15.000 e deposita R$ 10.000 no banco. Marque todas as contas.",[["Ferramentas",15000],["Bancos",10000]],[["Capital social",25000]],["Caixa","Receita de serviços"]],
   ["Compra peças para estoque, à vista, pelo banco: R$ 4.000.",[["Estoques",4000]],[["Bancos",4000]],["Fornecedores","Custo dos serviços prestados"]],
   ["Presta serviços a prazo: R$ 6.000.",[["Clientes",6000]],[["Receita de serviços",6000]],["Bancos","Receita de vendas"]],
   ["Peças usadas nesses serviços: R$ 1.500.",[["Custo dos serviços prestados",1500]],[["Estoques",1500]],["CMV","Bancos"]],
   ["Presta serviços recebidos em dinheiro: R$ 2.500.",[["Caixa",2500]],[["Receita de serviços",2500]],["Clientes","Capital social"]],
   ["Conta de energia do mês, a pagar: R$ 400.",[["Despesa com energia",400]],[["Contas a pagar",400]],["Bancos","Caixa"]],
   ["Folha do mês: salários de R$ 3.000, com R$ 240 de INSS retido do empregado. Marque todas as contas.",[["Despesa com salários",3000]],[["Salários a pagar",2760],["INSS a recolher",240]],["Bancos","Contas a pagar"]],
   ["Depreciação das ferramentas no mês: R$ 250.",[["Despesa de depreciação",250]],[["Depreciação acumulada",250]],["Ferramentas","Contas a pagar"]],
   ["Recebe de clientes pelo banco: R$ 4.000.",[["Bancos",4000]],[["Clientes",4000]],["Receita de serviços","Caixa"]],
   ["Provisão do 13º salário do mês: R$ 250.",[["Despesa com 13º salário",250]],[["13º salário a pagar",250]],["Salários a pagar","Bancos"]]
  ]}
];
