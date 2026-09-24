/* Metadados do currículo, sem explicações/exercícios: seguros para a entrada. */
import { LAYOUT } from './layout.js';

export const WORKSHOP_IDS = {
  antes:['oficina-antes'], base:['oficina-base'], dc:['oficina-dc'], lanc:['oficina-lanc'],
  digital:[], imob:['oficina-imob','oficina-imob-leasing'], estoq:['oficina-estoq'],
  demo:['oficina-demo'], cust:['oficina-cust'], trib:['oficina-trib'],
  aud:['oficina-aud'], vida:['oficina-vida'], financeirojr:[],
};

export const COURSE_CATALOG = LAYOUT.map(course => {
  const lessonIds = course.units.flatMap(unit => unit[1]).concat(WORKSHOP_IDS[course.id] || []);
  return {
    id:course.id, panel:course.panel, title:course.title, icon:course.icon,
    color:course.color, desc:course.desc, lessonIds,
    lessonCount:lessonIds.length,
    unitCount:course.units.length + (WORKSHOP_IDS[course.id]?.length || 0),
  };
});

export const ALL_COURSE_IDS = COURSE_CATALOG.map(course => course.id);
export const ALL_LESSON_IDS = new Set(COURSE_CATALOG.flatMap(course => course.lessonIds));
export const TOTAL_LESSONS = ALL_LESSON_IDS.size;
export const catalogForArea = (area) => area.courseIds.map(id => COURSE_CATALOG.find(course => course.id === id)).filter(Boolean);
