/* Mascote 'Bento', o castor: SVG procedural com estados de humor e roupas equipadas. */
import { S } from '../../engine/state.js';

export function bento(mood, equip, cls){
  mood = mood || 'idle'; equip = equip || S.equip;
  const fur = '#A9692E', dark = '#6B4122', light = '#F2CB9B', nose = '#3B2417';
  let eyes, mouth, arms, brows = '';
  const openEye = (x, px, py) => '<circle cx="' + x + '" cy="47" r="8.8" fill="#fff"/><circle cx="' + (x + px) + '" cy="' + (48 + py) + '" r="4.8" fill="' + nose + '"/><circle cx="' + (x + px + 1.6) + '" cy="' + (46.2 + py) + '" r="1.6" fill="#fff"/>';
  if (mood === 'happy' || mood === 'cheer'){ eyes = '<path d="M39 49 Q47 39 55 49" stroke="' + nose + '" stroke-width="3.4" fill="none" stroke-linecap="round"/><path d="M65 49 Q73 39 81 49" stroke="' + nose + '" stroke-width="3.4" fill="none" stroke-linecap="round"/>'; }
  else if (mood === 'sad'){ eyes = openEye(47, 0, 2) + openEye(73, 0, 2); brows = '<path d="M40 37 L53 40" stroke="' + dark + '" stroke-width="2.6" stroke-linecap="round"/><path d="M80 37 L67 40" stroke="' + dark + '" stroke-width="2.6" stroke-linecap="round"/>'; }
  else if (mood === 'think'){ eyes = openEye(47, 1.5, -2.5) + openEye(73, 1.5, -2.5); brows = '<path d="M66 36 Q73 32 80 35" stroke="' + dark + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>'; }
  else if (mood === 'wow'){ eyes = openEye(47, 0, 0).replace('r="8.8"', 'r="9.8"') + openEye(73, 0, 0).replace('r="8.8"', 'r="9.8"'); }
  else eyes = openEye(47, 0.5, 0) + openEye(73, 0.5, 0);
  if (mood === 'happy' || mood === 'cheer') mouth = '<path d="M49 64 Q60 80 71 64 Z" fill="#7A2E22"/><path d="M54 71 Q60 75 66 71 Q60 77 54 71Z" fill="#E77B6B"/>';
  else if (mood === 'sad') mouth = '<path d="M52 70 Q60 64 68 70" stroke="' + nose + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  else if (mood === 'wow') mouth = '<ellipse cx="60" cy="69" rx="5" ry="6" fill="#7A2E22"/>';
  else if (mood === 'think') mouth = '<path d="M54 67 Q60 69 66 65" stroke="' + nose + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  else mouth = '<path d="M50 64 Q60 73 70 64" stroke="' + nose + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
  const teeth = (mood === 'wow' || mood === 'sad') ? '' : '<rect x="54.3" y="' + (mood === 'happy' || mood === 'cheer' ? 63.5 : 65.5) + '" width="5.2" height="7.8" rx="1.3" fill="#fff" stroke="#d9c7b0" stroke-width=".6"/><rect x="60.1" y="' + (mood === 'happy' || mood === 'cheer' ? 63.5 : 65.5) + '" width="5.2" height="7.8" rx="1.3" fill="#fff" stroke="#d9c7b0" stroke-width=".6"/>';
  if (mood === 'cheer') arms = '<ellipse cx="27" cy="74" rx="7" ry="14" fill="' + fur + '" transform="rotate(-35 27 74)"/><ellipse cx="93" cy="74" rx="7" ry="14" fill="' + fur + '" transform="rotate(35 93 74)"/>';
  else if (mood === 'think') arms = '<ellipse cx="33" cy="98" rx="7" ry="12" fill="' + fur + '" transform="rotate(18 33 98)"/><ellipse cx="80" cy="80" rx="6.5" ry="12" fill="' + fur + '" transform="rotate(-40 80 80)"/>';
  else if (mood === 'happy') arms = '<ellipse cx="31" cy="92" rx="7" ry="12" fill="' + fur + '" transform="rotate(35 31 92)"/><ellipse cx="89" cy="92" rx="7" ry="12" fill="' + fur + '" transform="rotate(-35 89 92)"/>';
  else arms = '<ellipse cx="33" cy="98" rx="7" ry="12" fill="' + fur + '" transform="rotate(18 33 98)"/><ellipse cx="87" cy="98" rx="7" ry="12" fill="' + fur + '" transform="rotate(-18 87 98)"/>';
  const glasses = equip.glasses ? '<g fill="rgba(255,255,255,.18)" stroke="#1C3D5A" stroke-width="2.4"><circle cx="47" cy="47" r="10"/><circle cx="73" cy="47" r="10"/></g><path d="M57 46 Q60 43 63 46" stroke="#1C3D5A" stroke-width="2.4" fill="none"/>' : '';
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
  return '<svg class="bento ' + mood + ' ' + (cls || '') + '" viewBox="0 0 120 132" role="img" aria-label="Bento, o castor">' +
    '<g transform="rotate(-24 90 110)"><rect x="70" y="94" width="46" height="27" rx="13.5" fill="#5A3A1E"/><path d="M79 97v21M88 95v25M97 95v25M106 97v21M73 107h40" stroke="#7B5534" stroke-width="2"/></g>' +
    '<ellipse cx="60" cy="100" rx="31" ry="27" fill="' + fur + '"/><ellipse cx="60" cy="104" rx="19" ry="19" fill="' + light + '"/>' +
    '<ellipse cx="45" cy="125" rx="10" ry="5.5" fill="' + dark + '"/><ellipse cx="75" cy="125" rx="10" ry="5.5" fill="' + dark + '"/>' + arms +
    (equip.neck && NECK[equip.neck] ? NECK[equip.neck] : '') +
    '<circle cx="34" cy="24" r="9.8" fill="' + fur + '"/><circle cx="34" cy="24" r="5" fill="' + dark + '"/><circle cx="86" cy="24" r="9.8" fill="' + fur + '"/><circle cx="86" cy="24" r="5" fill="' + dark + '"/>' +
    '<circle cx="60" cy="50" r="32" fill="' + fur + '"/><ellipse cx="60" cy="65" rx="19.5" ry="15.5" fill="' + light + '"/>' +
    '<circle cx="36" cy="63" r="5" fill="#F08A7A" opacity=".4"/><circle cx="84" cy="63" r="5" fill="#F08A7A" opacity=".4"/>' +
    eyes + brows + '<ellipse cx="60" cy="57" rx="7.2" ry="5" fill="' + nose + '"/><ellipse cx="58" cy="55.5" rx="2" ry="1.3" fill="#fff" opacity=".5"/>' + mouth + teeth + glasses +
    (equip.head && HEAD[equip.head] ? HEAD[equip.head] : '') + '</svg>';
}
