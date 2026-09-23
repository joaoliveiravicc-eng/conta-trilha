import { $, $$, bindActs } from '../dom.js';
import { ACORN } from '../components/icons.js';
import { S } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { checkBadges } from '../../engine/gamification.js';
import { sfx } from '../components/sound.js';
import { toast } from '../components/toast.js';
import { bento } from '../components/bento.js';
import { OUTFITS } from '../../content/index.js';
import { renderTop } from '../router.js';

export function renderShop(){
  const s = $('#s-shop');
  s.innerHTML = '<div class="pad"><h1 style="font-size:1.45rem">Loja do Bento</h1><div class="pill xp" style="width:fit-content;margin:6px 0 16px">' + ACORN + ' <span>' + S.coins + '</span> bolotas</div>' +
    '<div class="shop-preview"><div class="bento-wrap lg">' + bento('happy', S.equip) + '</div></div>' +
    '<h2 class="sec-h" style="margin:6px 0 10px">Represa da sequência</h2><div class="card" style="display:flex;align-items:center;gap:12px"><span style="font-size:1.8rem">🛡️</span><div style="flex:1"><div style="font-weight:700">Represa de sequência</div><div class="small muted">Protege sua sequência se você faltar um dia. Você tem ' + S.freezes + '.</div></div><button class="btn primary" data-act="buyfreeze" style="width:auto;padding:10px 16px" ' + (S.coins < 80 ? 'disabled' : '') + '>80' + ACORN + '</button></div>' +
    '<h2 class="sec-h" style="margin:18px 0 10px">Acessórios para o Bento</h2><div class="shop-grid">' + OUTFITS.map(shopCard).join('') + '</div></div>';
  bindActs(s, { buyfreeze: buyFreeze });
  $$('[data-buy]', s).forEach(b => b.onclick = () => buyOutfit(b.dataset.buy));
  $$('[data-eq]', s).forEach(b => b.onclick = () => equipOutfit(b.dataset.eq));
}
function shopCard(o){
  const owned = !!S.owned[o.id], eq = S.equip[o.slot] === o.id;
  const btn = owned ? ('<button class="' + (eq ? 'seqbtn on' : 'seqbtn') + '" data-eq="' + o.id + '">' + (eq ? 'Equipado ✓' : 'Equipar') + '</button>') : ('<button class="seqbtn buy" data-buy="' + o.id + '" ' + (S.coins < o.p ? 'disabled' : '') + '>' + o.p + '' + ACORN + '</button>');
  const prevEquip = Object.assign({}, S.equip); prevEquip[o.slot] = o.id;
  return '<div class="shop-card"><div class="sc-prev">' + bento('idle', prevEquip) + '</div><div class="sc-n">' + o.n + '</div>' + btn + '</div>';
}
function buyOutfit(id){
  const o = OUTFITS.find(x => x.id === id); if (!o || S.owned[id] || S.coins < o.p) return;
  S.coins -= o.p; S.owned[id] = true; S.equip[o.slot] = id; sfx.coin(); toast('Você comprou: ' + o.n); checkBadges(); save(); renderTop(); renderShop();
}
function equipOutfit(id){
  const o = OUTFITS.find(x => x.id === id); if (!o || !S.owned[id]) return;
  S.equip[o.slot] = (S.equip[o.slot] === id) ? null : id; sfx.tap(); save(); renderShop();
}
function buyFreeze(){
  if (S.coins < 80) return; S.coins -= 80; S.freezes++; sfx.coin(); toast('🛡️ Represa comprada!'); save(); renderTop(); renderShop();
}
