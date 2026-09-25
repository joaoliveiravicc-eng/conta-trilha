/* Radical de palavras em português, usado pelo corretor inteligente e para ligar
   exercícios à teoria. Fica num arquivo pequeno, fora do pacote da IA. */
import { normTxt } from './exercises/grading.js';

/* Radical leve: tira plural, gênero e terminações verbais/nominais comuns, mantendo
   pelo menos 3 letras. "receber", "recebimento" e "recebido" viram "receb";
   "receita" vira "receit". Não mexe em -dor ("devedor", "contador"), para não
   juntar "contador" com "conta". */
const SUFFIXES = ['amentos', 'imentos', 'amento', 'imento', 'acoes', 'icoes', 'ucoes', 'acao', 'icao', 'ucao',
  'arios', 'arias', 'ario', 'ariam', 'eriam', 'iriam', 'arao', 'erao', 'irao', 'aria', 'eria', 'iria',
  'ando', 'endo', 'indo', 'ados', 'adas', 'idos', 'idas', 'ado', 'ada', 'ido', 'ida', 'aram', 'eram', 'iram', 'avam', 'ava', 'amos', 'emos',
  'imos', 'ar', 'er', 'ir', 'am', 'em', 'ou', 'eu', 'iu', 'oes', 'aes', 'ais', 'eis', 'ois', 'es', 'as', 'os', 'is', 'a', 'o', 'e', 's'];
const stemCache = new Map();
export function stem(word){
  const w = normTxt(word);
  if (w.length <= 3 || /\d/.test(w)) return w;
  if (stemCache.has(w)) return stemCache.get(w);
  let s = w;
  if (/veis$/.test(s)) s = s.slice(0, -4) + 'vel';                    /* recebíveis → recebível */
  else if (/[dr]ores$/.test(s)) s = s.slice(0, -2);                  /* credores → credor */
  else if (s.endsWith('ns')) s = s.slice(0, -2) + 'm';               /* bens → bem */
  else for (const suf of SUFFIXES){ if (s.endsWith(suf) && s.length - suf.length >= 3){ s = s.slice(0, -suf.length); break; } }
  if (/[dr]ora$/.test(w)) s = w.slice(0, -1);                         /* devedora → devedor */
  if (/vel$/.test(w)) s = w;                                          /* comparável fica inteiro */
  stemCache.set(w, s);
  return s;
}
