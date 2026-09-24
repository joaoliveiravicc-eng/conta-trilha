/* Ordem final das trilhas/unidades e a função que monta COURSES a partir do
   conteúdo bruto (as 7 trilhas originais + as lições novas + os exercícios bônus). */

/* Painéis: agrupam as trilhas em blocos temáticos maiores, no estilo das
   "seções" do Duolingo, só para organizar visualmente a lista de trilhas
   em src/ui/screens/home.js (courseRow/renderHome). Não afeta a lógica de
   progresso: uma trilha continua liberando a próxima na ordem de LAYOUT,
   independente do painel. */
export const PANELS = [
 {id:"fund", title:"Fundamentos", desc:"A base de tudo: matemática do dia a dia, o que é Contabilidade, débito e crédito."},
 {id:"digital", title:"Contabilidade digital", desc:"Do documento ao ERP, à conciliação e ao fechamento."},
 {id:"op", title:"Operações do dia a dia", desc:"Os lançamentos que toda empresa faz: compras, vendas, bens duradouros e estoque."},
 {id:"gestao", title:"Análise e Gestão", desc:"Ler as demonstrações e usar custos para decidir."},
 {id:"trib_aud", title:"Tributos e Auditoria", desc:"Como a empresa paga tributos e como ela é auditada."},
 {id:"extra", title:"Extras", desc:"Leve o que aprendeu para a sua própria vida financeira."}
];

export const LAYOUT = [
 {id:"antes", panel:"fund", title:"Antes de Tudo", icon:"🧮", color:"#4059AD", desc:"O básico do básico: porcentagem, juros, saldo, empresa e documentos. Para começar do zero absoluto.",
  units:[["Matemática do dia a dia",["antes1","antes2","antes3","antes4","antes9","antes10"]],["O mundo dos negócios",["antes5","antes6","antes7","antes8"]],["Revisão",["antes11"]]]},
 {id:"base", panel:"fund", title:"Primeiros Passos", icon:"🌱", color:"#1E8A4C", desc:"Para quem nunca estudou Contabilidade: o que ela é, o que é patrimônio e como se mede o lucro.", units:[["O que é Contabilidade",["base1","base2"]],["Equação e resultado",["base3","base4","base5","base6"]],["Revisão",["base7"]]]},
 {id:"dc", panel:"fund", title:"Débito e Crédito", icon:"✍️", color:"#1C3D5A", desc:"O coração da Contabilidade: razonetes, natureza das contas e o método das partidas dobradas.", units:[["Razonetes e natureza",["dc1","dc2"]],["Lançando de verdade",["dc3","dc4","dc5","dc6"]],["Revisão",["dc7"]]]},
 {id:"lanc", panel:"op", title:"Lançamentos do Dia a Dia", icon:"📝", color:"#1F6F78", desc:"Compras, vendas, salários, empréstimos e depreciação: os lançamentos que toda empresa faz.", units:[["Operações comerciais",["lanc1","lanc2","lanc3","lanc8","lanc9"]],["Ajustes e livros",["lanc4","lanc6","lanc7","lanc5"]],["Revisão",["lanc10"]]]},
 {id:"digital", panel:"digital", title:"Rotina Contábil Digital", icon:"💻", color:"#268A7D", desc:"Documentos eletrônicos, regras no ERP, conciliação, leasing, ECD e controles.",
  units:[["Documentos e regras",["digital1","digital2"]],["Conciliação e contratos",["digital3","digital4"]],["Fechamento e controles",["digital5","digital6"]]]},
 {id:"imob", panel:"op", title:"Imobilizado e Intangíveis", icon:"🏗️", color:"#3D6B8C", desc:"Bens de uso duradouro, métodos de depreciação, baixa de ativos, intangíveis e avaliação pelo valor recuperável.", units:[["Bens de uso duradouro",["imob1","imob2","imob3"]],["Intangíveis e avaliação",["imob4","imob5"]],["Revisão",["imob6"]]]},
 {id:"estoq", panel:"op", title:"Estoques e Custo de Mercadorias", icon:"📦", color:"#4C7A3F", desc:"Como o estoque vira custo: aquisição, PEPS, custo médio, apuração do CMV e ajustes por perda.",
  units:[["Do estoque ao CMV",["estoq1","estoq2","estoq3","estoq4","estoq5","estoq6"]],["Revisão",["estoq7"]]]},
 {id:"demo", panel:"gestao", title:"Demonstrações Financeiras", icon:"📊", color:"#A87E1F", desc:"Balanço Patrimonial, DRE, Fluxo de Caixa e como analisar os números com índices.", units:[["Balanço e DRE",["demo1","demo2"]],["Caixa, notas e análise",["demo3","demo5","demo4","demo6"]],["Revisão",["demo7"]]]},
 {id:"cust", panel:"gestao", title:"Custos e Gerencial", icon:"🏭", color:"#6B4C8A", desc:"Custos, margem de contribuição, ponto de equilíbrio e orçamento: contabilidade para decidir.", units:[["Classificando custos",["cust1","cust2","cust5"]],["Decisões",["cust3","cust4","cust6"]],["Revisão",["cust7"]]]},
 {id:"trib", panel:"trib_aud", title:"Tributos no Brasil", icon:"🧾", color:"#8A5A2B", desc:"Tipos de tributos, regimes tributários e a Reforma Tributária do consumo.", units:[["Tributos",["trib1","trib2","trib3","trib4"]],["Revisão",["trib5"]]]},
 {id:"aud", panel:"trib_aud", title:"Auditoria", icon:"🔍", color:"#B3432B", desc:"Auditoria interna e externa, riscos, controles, evidências e o relatório do auditor.", units:[["Fundamentos",["aud1","aud2","aud3"]],["Execução e relatório",["aud4","aud5","aud6"]],["Revisão",["aud7"]]]},
 {id:"vida", panel:"extra", title:"Contabilidade para a Vida", icon:"🏠", color:"#C06A1B", desc:"Use o que aprendeu no seu dinheiro: balanço pessoal, orçamento, reserva e dívidas.",
  units:[["Finanças pessoais",["vida1","vida2","vida3","vida4"]],["Revisão",["vida5"]]]}
];

/**
 * Monta o array final de COURSES na ordem de LAYOUT, juntando:
 * - rawCourses: as 7 trilhas originais (cada uma já com título/ícone/cor/desc e lessons)
 * - newLessons: lições soltas (antes*, vida*) que só ganham título/ícone/cor via LAYOUT
 * - extra: exercícios bônus por id de lição, concatenados ao "ex" de cada lição
 */
export function buildCourses(rawCourses, newLessons, extra, layout = LAYOUT){
  const pool = {}, old = {};
  rawCourses.forEach(c => { old[c.id] = c; c.lessons.forEach(l => pool[l.id] = l); });
  newLessons.forEach(l => pool[l.id] = l);
  Object.keys(extra).forEach(id => { if (pool[id]) pool[id].ex = pool[id].ex.concat(extra[id]); });
  return layout.map(L => {
    const o = old[L.id] || {};
    const c = { id:L.id, panel:L.panel, title:L.title || o.title, icon:L.icon || o.icon, color:L.color || o.color, desc:L.desc || o.desc };
    c.units = L.units.map(u => ({ t:u[0], lessons:u[1].map(id => pool[id]) }));
    c.lessons = [].concat.apply([], c.units.map(u => u.lessons));
    return c;
  });
}
