/* Renderização do Bento e das peças da loja, no mesmo espaço das ilustrações (300 × 420). */
import { S } from '../../engine/state.js';

const MOODS = new Set(['idle','happy','cheer','sad','think','wow']);
const WALK_SHEETS = {
  blazer: 'walk-blazer.webp?v=2',
  moletom: 'walk-moletom.webp?v=2',
  auditor: 'walk-auditor.webp?v=2'
};

export function bento(mood, equip, cls){
  mood = MOODS.has(mood) ? mood : 'idle';
  equip = equip || S.equip;
  const walking = mood === 'idle';
  const accessories = !!(equip.head || equip.neck);
  if (walking) {
    const sheet = WALK_SHEETS[equip.body] || 'walk-sheet.webp?v=2';
    const art = '<span class="bento-walk" style="--bento-sheet:url(\'/images/bento/' + sheet + '\')" role="img" aria-label="Bento, o castor caminhando"></span>';
    const layers = accessories ? '<svg class="bento-overlay" viewBox="0 0 300 420" aria-hidden="true">' +
      (equip.neck && NECK[equip.neck] ? NECK[equip.neck] : '') +
      (equip.head && HEAD[equip.head] ? HEAD[equip.head] : '') + '</svg>' : '';
    return '<span class="bento-stage bento ' + mood + ' ' + (cls || '') + '">' + art + layers + '</span>';
  }
  const P = POSE[mood];
  const art = '<img class="bento-art" src="/images/bento/' + mood + '.webp" alt="Bento, o castor" width="120" height="132">';
  const layers = '<svg class="bento-overlay" viewBox="0 0 320 ' + P.h + '" aria-hidden="true">' +
    (equip.neck && NECK[equip.neck] ? place(NECK[equip.neck], 168, 244, P.neck, P.s) : '') +
    glasses(P.eyes) +
    (equip.head && HEAD[equip.head] ? place(HEAD[equip.head], 160, 30, P.head, P.s) : '') + '</svg>';
  return '<span class="bento-stage bento ' + mood + ' ' + (cls || '') + '">' + art + layers + '</span>';
}

/* Cada humor é uma ilustração com enquadramento próprio: onde ficam o alto da
   cabeça, o pescoço e os olhos (em pixels da imagem de 320 de largura). */
const POSE = {
  happy: { h:344, s:1.10, head:[172, 28, 0], neck:[167, 212], eyes:[[112,118],[218,118]] },
  cheer: { h:364, s:1.00, head:[172, 30, 8], neck:[170, 210], eyes:[[135,120],[212,118]] },
  sad:   { h:382, s:1.30, head:[185, 26, 0], neck:[185, 256], eyes:[[130,170],[240,166]] },
  think: { h:365, s:1.13, head:[175, 22, -6], neck:[185, 224], eyes:[[143,129],[225,112]] },
  wow:   { h:395, s:1.30, head:[195, 52, 0], neck:[195, 254], eyes:[[150,172],[233,160]] },
};

function place(svg, ax, ay, [x, y, rot = 0], s){
  return '<g transform="translate(' + x + ' ' + y + ') rotate(' + rot + ') scale(' + s + ') translate(' + (-ax) + ' ' + (-ay) + ')">' + svg + '</g>';
}

function glasses([[x1, y1], [x2, y2]]){
  const d = Math.hypot(x2 - x1, y2 - y1), r = d * 0.27, a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
  const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2, h = d / 2;
  return '<g transform="translate(' + cx + ' ' + cy + ') rotate(' + a + ')" fill="rgba(255,255,255,.12)" stroke="#1F4A36" stroke-width="' + (r * 0.24) + '" stroke-linecap="round">' +
    '<circle cx="' + (-h) + '" cy="0" r="' + r + '"/><circle cx="' + h + '" cy="0" r="' + r + '"/>' +
    '<path d="M' + (-h + r) + ' -2 Q0 ' + (-r * 0.45) + ' ' + (h - r) + ' -2" fill="none"/>' +
    '<path d="M' + (-h - r) + ' -3 L' + (-h - r * 1.7) + ' -8 M' + (h + r) + ' -3 L' + (h + r * 1.7) + ' -8" fill="none"/></g>';
}

const HEAD = {
  viseira: '<path d="M74 66 Q165 31 256 66 L250 80 Q165 56 80 82Z" fill="#237A55" stroke="#185C40" stroke-width="3"/><path d="M83 77 Q165 58 248 77 L261 91 Q165 73 70 94Z" fill="#39A979" stroke="#185C40" stroke-width="2"/>',
  bone: '<path d="M78 76 Q80 35 164 33 Q236 34 241 76Z" fill="#B3432B" stroke="#8E3321" stroke-width="3"/><path d="M159 73 Q220 64 261 82 Q240 98 161 89Z" fill="#8E3321" stroke="#742A1D" stroke-width="3"/><path d="M111 54 Q153 39 191 49" fill="none" stroke="#D96A4F" stroke-width="5" stroke-linecap="round"/>',
  capacete: '<path d="M77 77 Q77 29 164 27 Q245 29 244 77Z" fill="#F2B705" stroke="#A97800" stroke-width="4"/><path d="M62 74 Q164 61 258 75 L253 91 Q163 81 68 92Z" fill="#D99F00" stroke="#A97800" stroke-width="3"/><path d="M116 39 Q164 28 204 39" fill="none" stroke="#FFE27A" stroke-width="6" stroke-linecap="round"/>',
  capelo: '<path d="M165 13 L256 47 L165 78 L74 47Z" fill="#244B6E" stroke="#1C3D5A" stroke-width="4"/><path d="M119 51 H211 V81 Q166 94 119 81Z" fill="#1C3D5A"/><path d="M239 53 V95" stroke="#E0B750" stroke-width="4"/><circle cx="239" cy="99" r="5" fill="#E0B750"/>',
  coroa: '<path d="M104 75 L111 31 L139 56 L165 18 L191 56 L219 31 L226 75Z" fill="#E0B750" stroke="#A87E1F" stroke-width="4" stroke-linejoin="round"/><path d="M111 77 H219 V88 H111Z" fill="#C5962B"/><circle cx="165" cy="68" r="7" fill="#B3432B"/>',
  fones: '<path d="M81 151 V126 Q81 43 165 43 Q249 43 249 126 V151" fill="none" stroke="#294941" stroke-width="10" stroke-linecap="round"/><rect x="70" y="119" width="27" height="48" rx="12" fill="#39788A" stroke="#294941" stroke-width="4"/><rect x="233" y="119" width="27" height="48" rx="12" fill="#39788A" stroke="#294941" stroke-width="4"/><path d="M77 131 V153 M253 131 V153" stroke="#80B7B0" stroke-width="4" stroke-linecap="round"/>'
};

const NECK = {
  gravata: '<path d="M153 244 H183 L177 258 H159Z" fill="#8E3321"/><path d="M159 257 L177 257 L184 325 L168 340 L152 325Z" fill="#B3432B" stroke="#8E3321" stroke-width="3" stroke-linejoin="round"/><path d="M163 266 L173 266 L178 318" fill="none" stroke="#D96A4F" stroke-width="3" stroke-linecap="round"/>',
  cachecol: '<path d="M119 235 Q165 254 212 235 L208 261 Q165 281 123 261Z" fill="#1F6F78" stroke="#18585F" stroke-width="3"/><path d="M190 257 L215 256 L224 322 L199 326Z" fill="#18585F" stroke="#12484E" stroke-width="3"/><path d="M128 250 Q165 265 201 250" fill="none" stroke="#E0B750" stroke-width="4" stroke-dasharray="7 7"/>'
};
