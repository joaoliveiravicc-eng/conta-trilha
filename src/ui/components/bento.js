/* Mascote 'Bento', o castor: ilustração de referência (por humor, sem roupas) quando
   nada está equipado; a mesma ilustração com as peças da loja sobrepostas caso contrário. */
import { S } from '../../engine/state.js';

const MOOD_IMG = { idle:1, happy:1, cheer:1, sad:1, think:1, wow:1 };

export function bento(mood, equip, cls){
  mood = mood || 'idle'; equip = equip || S.equip;
  const noEquip = !equip.glasses && !equip.head && !equip.neck;
  if (noEquip && MOOD_IMG[mood]){
    return '<img class="bento-img bento ' + mood + ' ' + (cls || '') + '" src="/images/bento/' + mood + '.png" alt="Bento, o castor" width="120" height="132">';
  }
  return bentoEquipped(mood, equip, cls);
}

/* Com acessórios: usa a mesma ilustração de referência e sobrepõe as peças da loja. */
function bentoEquipped(mood, equip, cls){
  const G = '<g transform="translate(-53 -40) scale(3.8)">';
  const glasses = equip.glasses ? G + '<g fill="rgba(255,255,255,.18)" stroke="#1C3D5A" stroke-width="2.2"><circle cx="47" cy="47" r="10"/><circle cx="73" cy="47" r="10"/></g><path d="M57 46 Q60 43 63 46" stroke="#1C3D5A" stroke-width="2.2" fill="none"/></g>' : '';
  const head = equip.head && HEAD[equip.head] ? '<g transform="translate(-53 -12) scale(3.8)">' + HEAD[equip.head] + '</g>' : '';
  const neck = equip.neck && NECK[equip.neck] ? '<g transform="translate(-53 -68) scale(3.8)">' + NECK[equip.neck] + '</g>' : '';
  return '<span class="bento-eq bento ' + mood + ' ' + (cls || '') + '"><img src="/images/bento/idle.png" alt="Bento, o castor" width="120" height="132"><svg viewBox="0 0 320 419" aria-hidden="true">' + neck + glasses + head + '</svg></span>';
}

const HEAD = {
  viseira:'<path d="M29 34 Q60 22 91 34 L91 38 Q60 27 29 38Z" fill="#2E9A5B"/><path d="M36 37 Q60 29 84 37 L90 45 Q60 36 30 45Z" fill="#3DBB73" opacity=".85"/>',
  capacete:'<path d="M30 33 Q30 9 60 9 Q90 9 90 33Z" fill="#F2B705"/><rect x="24" y="30" width="72" height="7" rx="3.5" fill="#D39A00"/><rect x="56" y="10" width="8" height="21" rx="3" fill="#FFD23F"/>',
  capelo:'<rect x="41" y="17" width="38" height="12" rx="2" fill="#1C3D5A"/><path d="M60 3 L98 15 L60 27 L22 15Z" fill="#244B6E"/><path d="M92 16 v17" stroke="#E0B750" stroke-width="2.4"/><circle cx="92" cy="35" r="3.2" fill="#E0B750"/>',
  bone:'<path d="M31 32 Q31 11 60 11 Q89 11 89 32Z" fill="#B3432B"/><path d="M58 29 Q88 24 106 33 Q88 38 58 33Z" fill="#8E3321"/><circle cx="60" cy="12" r="3" fill="#8E3321"/>',
  coroa:'<path d="M38 27 L41 7 L51 19 L60 3 L69 19 L79 7 L82 27Z" fill="#E0B750" stroke="#A87E1F" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="18" r="3" fill="#B3432B"/>',
  fones:'<path d="M28 50 Q28 13 60 13 Q92 13 92 50" stroke="#2B2B2B" stroke-width="5" fill="none"/><rect x="21" y="42" width="11" height="18" rx="5" fill="#2B2B2B"/><rect x="88" y="42" width="11" height="18" rx="5" fill="#2B2B2B"/><rect x="23" y="45" width="7" height="12" rx="3" fill="#1F6F78"/><rect x="90" y="45" width="7" height="12" rx="3" fill="#1F6F78"/>'
};
const NECK = {
  gravata:'<path d="M55 77 h10 l-2 6 h-6z" fill="#8E3321"/><path d="M57 83 L53 103 L60 110 L67 103 L63 83Z" fill="#B3432B"/>',
  cachecol:'<path d="M36 74 Q60 86 84 74 L84 83 Q60 95 36 83Z" fill="#1F6F78"/><path d="M69 84 l4 20 l9 -2 l-4 -20z" fill="#18585F"/><path d="M40 78 h40" stroke="#E0B750" stroke-width="2" stroke-dasharray="4 4"/>'
};
