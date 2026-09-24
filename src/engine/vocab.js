/* Palavras que existem no conteúdo do app. Uma palavra conhecida nunca é tratada como
   erro de digitação de outra: "empresa" não é "emprestado" escrito errado, e "receita"
   não é "recebida". */
import { COURSES } from '../content/index.js';
import { GLOSSARY } from '../content/glossary.js';

const norm = s => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
let KNOWN = null;
export function knownWords(){
  if (KNOWN) return KNOWN;
  KNOWN = new Set();
  const skip = new Set(['course', 'unit', 'lessons', 'l', 'c', 'key']);
  const add = v => {
    if (typeof v === 'string') norm(v.replace(/<[^>]+>/g, ' ')).split(' ').forEach(w => { if (w) KNOWN.add(w); });
    else if (Array.isArray(v)) v.forEach(add);
    else if (v && typeof v === 'object') for (const [k, val] of Object.entries(v)) if (!skip.has(k)) add(val);
  };
  COURSES.forEach(c => c.lessons.forEach(l => { add(l.title); l.learn.forEach(card => add([card.h, card.b])); l.ex.forEach(x => add(x)); }));
  add(GLOSSARY);
  return KNOWN;
}
