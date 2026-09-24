/* Monta o currículo completo na ordem das áreas (areas.js). Tudo é carregado de
   uma vez: conquistas, revisão e desbloqueio entre trilhas precisam do catálogo inteiro. */
import base from './trilhas/base.js';
import dc from './trilhas/dc.js';
import lanc from './trilhas/lanc.js';
import demo from './trilhas/demo.js';
import cust from './trilhas/cust.js';
import trib from './trilhas/trib.js';
import aud from './trilhas/aud.js';
import imob from './trilhas/imob.js';
import antes from './trilhas/antes.js';
import vida from './trilhas/vida.js';
import estoq from './trilhas/estoq.js';
import digital from './trilhas/digital.js';
import extra from './extra.js';
import { enrichCourses } from './workshops.js';
import { AREAS } from './areas.js';
import { buildCourses, LAYOUT } from './layout.js';
import { TOTAL_LESSONS } from './catalog.js';

const layouts = AREAS.flatMap(area => area.courseIds).map(id => LAYOUT.find(course => course.id === id));

export const COURSES = enrichCourses(buildCourses(
  [base, dc, lanc, demo, cust, trib, aud, imob],
  antes.concat(vida, estoq, digital),
  extra, layouts
));

export const EX = {};
COURSES.forEach((course, courseIndex) => {
  course.idx = courseIndex;
  course.units.forEach((unit, unitIndex) => {
    unit.idx = unitIndex; unit.course = course;
    unit.lessons.forEach(lesson => { lesson.unit = unit; });
  });
  course.lessons.forEach((lesson, lessonIndex) => {
    lesson.idx = lessonIndex; lesson.course = course;
    lesson.ex.forEach((exercise, exerciseIndex) => {
      exercise.key = lesson.id + '#' + exerciseIndex;
      EX[exercise.key] = { x:exercise, l:lesson, c:course };
    });
  });
});

export { TOTAL_LESSONS };
