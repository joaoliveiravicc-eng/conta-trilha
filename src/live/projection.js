/* ContaTrilha Live — projeção de um exercício do catálogo em ENUNCIADO (público na sala) e GABARITO (privado).
   Módulo puro: não importa estado, armazenamento nem Supabase, e nada aqui altera o progresso de quem estuda.

   Entrega 1: só mc, tf e num. O catálogo inteiro é público no pacote do app, então as atividades criadas
   por aqui são FORMATIVAS: servem para acompanhar a turma, não para nota oficial nem prova protegida. */

export const LIVE_TYPES = ['mc', 'tf', 'num'];

/* Tolerância padrão do app para respostas numéricas (a mesma de rNum em ui/screens/quiz-renderers.js). */
export const defaultNumTolerance = a => 0.015 + Math.abs(a) * 0.002;

/* Embaralha as alternativas de forma reprodutível quando recebe um rng com semente. */
function permutation(n, rng){
  const p = Array.from({ length:n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--){ const j = Math.floor(rng() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; }
  return p;
}

/* Diz se o exercício cabe nesta entrega (tipo aceito e forma que o servidor valida). */
export function isLiveSupported(x){
  if (!x || !LIVE_TYPES.includes(x.t) || typeof x.q !== 'string' || x.q.length < 1 || x.q.length > 4000) return false;
  if (x.t === 'mc') return Array.isArray(x.o) && x.o.length >= 2 && x.o.length <= 8 && new Set(x.o).size === x.o.length
    && x.o.every(o => typeof o === 'string' && o.length >= 1 && o.length <= 400) && Number.isInteger(x.a) && x.a >= 0 && x.a < x.o.length;
  if (x.t === 'tf') return typeof x.a === 'boolean';
  return Number.isFinite(x.a) && Math.abs(x.a) < 1e12 && (x.tol === undefined || (Number.isFinite(x.tol) && x.tol >= 0 && x.tol < 1e12))
    && (x.u === undefined || (typeof x.u === 'string' && x.u.length <= 24)) && (x.s === undefined || (typeof x.s === 'string' && x.s.length <= 24));
}

/* Converte um exercício em item de atividade: { source_key, type, public, key, explanation }.
   Fica de fora de `public` tudo o que revela ou ajuda a resposta: gabarito, explicação e dica. */
export function projectExercise(x, { sourceKey = x && x.key, rng = Math.random } = {}){
  if (!isLiveSupported(x)) throw new Error('exercício não suportado no Live: ' + (x && x.t) + ' ' + sourceKey);
  const base = { source_key: sourceKey ? String(sourceKey).slice(0, 80) : null, type: x.t, explanation: x.e ? String(x.e) : '' };
  if (x.t === 'mc'){
    const perm = permutation(x.o.length, rng);
    return { ...base, public: { q: x.q, options: perm.map(i => x.o[i]) }, key: { answer: perm.indexOf(x.a) } };
  }
  if (x.t === 'tf') return { ...base, public: { q: x.q }, key: { answer: x.a } };
  const pub = { q: x.q };
  if (x.u) pub.prefix = x.u;
  if (x.s) pub.suffix = x.s;
  return { ...base, public: pub, key: { answer: x.a, tol: x.tol !== undefined ? x.tol : defaultNumTolerance(x.a) } };
}

/* Atalho: lista de exercícios -> itens prontos para live_create_activity. */
export function buildActivityItems(exercises, opts){
  return exercises.map(x => projectExercise(x, opts));
}
