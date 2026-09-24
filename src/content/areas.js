/* Catálogo leve: pode ser mostrado antes de carregar o conteúdo das lições. */
export const AREAS = [
  { id:'fundamentos', icon:'📘', title:'Contabilidade do zero', short:'Do zero', color:'#4059AD',
    description:'Porcentagem, patrimônio, débito e crédito e os lançamentos do dia a dia.',
    courseIds:['antes','base','dc','lanc'] },
  { id:'digital', icon:'💻', title:'Contabilidade digital', short:'Digital', color:'#268A7D',
    description:'Documentos eletrônicos, ERP, conciliação, arrendamento e fechamento digital.',
    courseIds:['digital','imob','estoq'] },
  { id:'gestao', icon:'📊', title:'Análise e gestão', short:'Gestão', color:'#8A61BD',
    description:'Demonstrações, indicadores, custos e decisões de negócio.',
    courseIds:['demo','cust'] },
  { id:'fiscal', icon:'🧾', title:'Tributos e auditoria', short:'Fiscal', color:'#B06C2D',
    description:'Apuração, documentos, controles e evidências.',
    courseIds:['trib','aud'] },
  { id:'vida', icon:'🏠', title:'Finanças pessoais', short:'Vida', color:'#BD7132',
    description:'Patrimônio pessoal, orçamento, dívidas e planejamento.',
    courseIds:['vida'] },
];

export const DEFAULT_AREA = 'fundamentos';
export const areaById = id => AREAS.find(area => area.id === id) || AREAS[0];
export const areaForCourse = courseId => AREAS.find(area => area.courseIds.includes(courseId));
export const coursesForArea = (courses, areaId) => {
  const ids = areaById(areaId).courseIds;
  return ids.map(id => courses.find(course => course.id === id)).filter(Boolean);
};
