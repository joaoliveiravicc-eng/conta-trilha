import { $, $$, bindActs } from '../dom.js';
import { ACORN } from '../components/icons.js';
import { S } from '../../engine/state.js';
import { save } from '../../engine/storage.js';
import { checkBadges } from '../../engine/gamification.js';
import { sfx } from '../components/sound.js';
import { toast } from '../components/toast.js';
import { bento } from '../components/bento.js';
import { OUTFITS } from '../../content/shop-items.js';
import { renderTop } from '../router.js';

export function renderShop(){
  const s = $('#s-shop');
  s.innerHTML = '<div class="pad"><h1 style="font-size:1.45rem">Loja do Bento</h1><div class="pill xp" style="width:fit-content;margin:6px 0 16px">' + ACORN + ' <span>' + S.coins + '</span> bolotas</div>' +
    '<div class="shop-preview"><div class="bento-wrap lg">' + bento('idle', S.equip, 'shop-avatar') + '</div><div class="shop-current"><span class="eyebrow">VISUAL ATUAL</span><strong>' + currentLook() + '</strong><span>Combine acessórios e visuais para personalizar o Bento.</span></div></div>' +
    '<h2 class="sec-h" style="margin:6px 0 10px">Represa da sequência</h2><div class="card" style="display:flex;align-items:center;gap:12px"><span style="font-size:1.8rem">🛡️</span><div style="flex:1"><div style="font-weight:700">Represa de sequência</div><div class="small muted">Protege sua sequência se você faltar um dia. Você tem ' + S.freezes + '.</div></div><button class="btn primary" data-act="buyfreeze" style="width:auto;padding:10px 16px" ' + (S.coins < 80 ? 'disabled' : '') + '>80' + ACORN + '</button></div>' +
    '<h2 class="sec-h shop-section-title">Visuais completos</h2><p class="shop-intro">Roupas para o Bento. Combinam com qualquer chapéu e acessório.</p><div class="shop-grid body-skins">' + OUTFITS.filter(o => o.slot === 'body').map(shopCard).join('') + '</div>' +
    '<h2 class="sec-h shop-section-title">Acessórios</h2><p class="shop-intro">Escolha um item para a cabeça ou para o pescoço.</p><div class="shop-grid">' + OUTFITS.filter(o => o.slot !== 'body').map(shopCard).join('') + '</div></div>';
  bindActs(s, { buyfreeze: buyFreeze });
  $$('[data-buy]', s).forEach(b => b.onclick = () => buyOutfit(b.dataset.buy));
  $$('[data-eq]', s).forEach(b => b.onclick = () => equipOutfit(b.dataset.eq));
}
function shopCard(o){
  const owned = !!S.owned[o.id], eq = S.equip[o.slot] === o.id;
  const btn = owned ? ('<button class="' + (eq ? 'seqbtn on' : 'seqbtn') + '" data-eq="' + o.id + '">' + (eq ? 'Equipado ✓' : 'Equipar') + '</button>') : ('<button class="seqbtn buy" data-buy="' + o.id + '" ' + (S.coins < o.p ? 'disabled' : '') + '>' + o.p + '' + ACORN + '</button>');
  const prevEquip = Object.assign({}, S.equip); prevEquip[o.slot] = o.id;
  return '<div class="shop-card ' + (eq ? 'selected' : '') + '"><div class="sc-prev">' + bento('idle', prevEquip, 'shop-item') + '</div><div class="sc-n">' + o.n + '</div>' + (o.d ? '<div class="sc-desc">' + o.d + '</div>' : '') + btn + '</div>';
}
function currentLook(){
  const parts = OUTFITS.filter(o => S.equip[o.slot] === o.id).map(o => o.n);
  return parts.length ? parts.join(' · ') : 'Bento original';
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
