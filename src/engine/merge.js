/* Junta o progresso de dois aparelhos (local e nuvem) sem perder nada:
   lições, conquistas e compras são somadas; contadores ficam com o maior valor. */
const maxNum = (a, b) => Math.max(+a || 0, +b || 0);
const later = (a, b) => (!a ? b : !b ? a : (a > b ? a : b));

function union(a, b){ return Object.assign({}, b || {}, a || {}); }
function unionBy(a, b, pick){
  const out = Object.assign({}, a || {});
  Object.keys(b || {}).forEach(k => { out[k] = k in out ? pick(out[k], b[k]) : b[k]; });
  return out;
}
const bestRecord = (x, y) => (x && y && typeof x === 'object' && typeof y === 'object')
  ? Object.assign({}, x, y, { best:maxNum(x.best, y.best), passed:!!(x.passed || y.passed) }) : (x || y);
const laterRecord = (x, y) => {
  if (typeof x !== 'object' || typeof y !== 'object' || !x || !y) return x || y;
  return (y.last || '') > (x.last || '') ? y : x;
};

export function mergeProgress(local, cloud){
  if (!cloud) return local;
  if (!local) return cloud;
  const lead = (+cloud.xp || 0) > (+local.xp || 0) ? cloud : local;
  const m = Object.assign({}, lead);
  m.xp = maxNum(local.xp, cloud.xp);
  m.coins = maxNum(local.coins, cloud.coins);
  m.freezes = maxNum(local.freezes, cloud.freezes);
  m.lessons = maxNum(local.lessons, cloud.lessons);
  m.reviews = maxNum(local.reviews, cloud.reviews);
  m.onboarded = !!(local.onboarded || cloud.onboarded);
  m.area = lead.area || local.area || cloud.area || null;
  m.lastActive = later(local.lastActive, cloud.lastActive);
  m.streak = maxNum(local.streak, cloud.streak);
  m.boostUntil = maxNum(local.boostUntil, cloud.boostUntil);
  m.done = union(local.done, cloud.done);
  m.perfect = union(local.perfect, cloud.perfect);
  m.trophies = union(local.trophies, cloud.trophies);
  m.unlocked = union(local.unlocked, cloud.unlocked);
  m.badges = union(local.badges, cloud.badges);
  m.owned = union(local.owned, cloud.owned);
  m.cases = union(local.cases, cloud.cases);
  m.mistakes = union(local.mistakes, cloud.mistakes);
  m.checkpoints = unionBy(local.checkpoints, cloud.checkpoints, bestRecord);
  m.challenges = unionBy(local.challenges, cloud.challenges, (x, y) => Object.assign({}, x, y, { passed:!!(x.passed || y.passed), perfect:!!(x.perfect || y.perfect), attempts:maxNum(x.attempts, y.attempts) }));
  m.repetition = unionBy(local.repetition, cloud.repetition, laterRecord);
  m.days = unionBy(local.days, cloud.days, maxNum);
  m.best = unionBy(local.best, cloud.best, maxNum);
  m.st = unionBy(local.st, cloud.st, maxNum);
  return m;
}
