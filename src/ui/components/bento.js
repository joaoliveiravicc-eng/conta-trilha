/* Bento, o castor, desenhado em SVG (coordenadas da arte de referência, 1254 × 1254).
   Humores, roupas e acessórios usam o mesmo sistema de coordenadas: nada sai do lugar. */
import { S } from '../../engine/state.js';

const C = {
  fur:'#A8531C', body:'#B35C22', shade:'#9E4C1A', face:'#CC7433', cheek:'#D6813C', muzzle:'#DD8B45',
  light:'#F3B872', dark:'#7B3913', tail:'#6C3A28', tailLine:'#55281A', pupil:'#3B3B3B',
  nose:'#6E3212', mouth:'#7C1D1F', tongue:'#E0434C'
};
const MOODS = new Set(['idle','happy','cheer','sad','think','wow']);
let uid = 0;

export function bento(mood, equip, cls){
  mood = MOODS.has(mood) ? mood : 'idle';
  return '<span class="bento-stage bento ' + mood + ' ' + (cls || '') + '">' + bentoSVG(mood, equip || S.equip) + '</span>';
}

export function bentoSVG(mood, equip, viewBox, headOnly){
  equip = equip || {};
  const id = 'bt' + (++uid);
  const outfit = OUTFIT[equip.body];
  const sleeve = outfit ? outfit.sleeve : C.fur;
  const pose = POSES[mood] || POSES.idle;
  if (headOnly) return '<svg class="bsvg" viewBox="' + viewBox + '" role="img" aria-label="Bento, o castor"><g class="b-head">' + head(pose) + headItem(equip.head) + '</g></svg>';
  return '<svg class="bsvg" viewBox="' + (viewBox || '40 70 1180 1110') + '" role="img" aria-label="Bento, o castor">' +
    '<defs><clipPath id="' + id + '"><path d="' + TAIL + '"/></clipPath></defs>' +
    '<g class="b-rig">' +
      '<g class="b-tail"><path d="' + TAIL + '" fill="' + C.tail + '"/><g clip-path="url(#' + id + ')" stroke="' + C.tailLine + '" stroke-width="16" opacity=".85">' + TAIL_LINES + '</g></g>' +
      '<ellipse cx="520" cy="1082" rx="68" ry="55" transform="rotate(25 520 1082)" fill="' + C.dark + '"/>' +
      '<path d="' + BODY + '" fill="' + C.body + '"/>' +
      '<path d="M470 700 C430 800 420 950 470 1030 C510 1058 560 1066 600 1068 C560 1000 540 900 560 800 C570 750 590 715 620 695 Z" fill="' + C.shade + '"/>' +
      '<ellipse cx="762" cy="862" rx="162" ry="160" fill="' + C.light + '"/>' +
      (outfit ? outfit.svg : '') +
      '<ellipse cx="930" cy="1045" rx="92" ry="55" transform="rotate(-28 930 1045)" fill="' + C.dark + '"/>' +
      (equip.neck && NECK[equip.neck] ? NECK[equip.neck] : '') +
      '<g class="b-arm-r">' + pose.armR(sleeve) + '</g>' +
      '<g class="b-arm-l">' + pose.armL(sleeve) + '</g>' +
      '<g class="b-head">' + head(pose) + headItem(equip.head) + '</g>' +
    '</g></svg>';
}

const TAIL = 'M200 632 C130 640 88 720 98 810 C110 915 200 1005 320 1020 C400 1030 455 1000 450 950 C440 880 400 780 350 700 C310 645 260 628 200 632Z';
const TAIL_LINES = [560, 650, 740, 830].map(b => '<path d="M40 ' + (b + 22) + ' L500 ' + (b + 275) + '"/>').join('') +
  [190, 285, 380, 475].map(x => '<path d="M' + x + ' 600 L' + (x - 70) + ' 1060"/>').join('');
const BODY = 'M470 700 C430 800 420 950 470 1030 C530 1075 760 1070 880 1045 C965 1020 990 930 968 830 C945 740 890 690 800 685 Z';

/* ---------- braços por pose ---------- */
const hand = (x, y, r = 0) => '<ellipse cx="' + x + '" cy="' + y + '" rx="45" ry="56" transform="rotate(' + r + ' ' + x + ' ' + y + ')" fill="' + C.dark + '"/>';
const ARM = {
  wave: s => '<path d="M858 700 C950 650 1015 585 1060 530 C1100 490 1170 520 1162 585 C1150 650 1080 720 975 792 C928 812 885 790 858 700Z" fill="' + s + '"/>' + hand(1118, 565, 20),
  front: s => '<path d="M570 760 C500 742 430 748 395 775 C368 800 378 850 420 864 C470 877 535 860 580 840 Z" fill="' + s + '"/>' + hand(395, 792),
  upL: s => '<path d="M545 785 C470 720 380 610 325 520 C300 468 238 480 245 535 C258 610 380 740 470 825 Z" fill="' + s + '"/>' + hand(272, 478, -25),
  downR: s => '<path d="M880 730 C945 780 975 850 965 910 C958 945 912 950 895 915 C878 872 866 820 850 785 Z" fill="' + s + '"/>' + hand(935, 925, -15),
  downL: s => '<path d="M560 760 C505 790 480 850 488 910 C494 945 540 950 555 915 C570 870 580 820 600 790 Z" fill="' + s + '"/>' + hand(520, 925, 15),
  chin: s => '<path d="M930 780 C930 730 890 700 850 705 C815 712 815 752 850 772 Z" fill="' + s + '"/>' + hand(830, 712, 60)
};

/* ---------- rosto por pose ---------- */
const eyeOpen = (big, dx = 0, dy = 0) => {
  const k = big ? 1.12 : 1, p = big ? 0.8 : 1;
  return '<g class="b-eye"><ellipse cx="585" cy="478" rx="' + 88 * k + '" ry="' + 82 * k + '" transform="rotate(-8 585 478)" fill="#fff"/>' +
    '<ellipse cx="' + (548 + dx) + '" cy="' + (490 + dy) + '" rx="' + 42 * p + '" ry="' + 60 * p + '" fill="' + C.pupil + '"/><circle cx="' + (525 + dx) + '" cy="' + (466 + dy) + '" r="15" fill="#fff"/></g>' +
    '<g class="b-eye"><ellipse cx="842" cy="400" rx="' + 80 * k + '" ry="' + 72 * k + '" transform="rotate(-12 842 400)" fill="#fff"/>' +
    '<ellipse cx="' + (808 + dx) + '" cy="' + (420 + dy) + '" rx="' + 38 * p + '" ry="' + 58 * p + '" fill="' + C.pupil + '"/><circle cx="' + (788 + dx) + '" cy="' + (395 + dy) + '" r="14" fill="#fff"/></g>';
};
const EYES_HAPPY = '<g fill="none" stroke="' + C.pupil + '" stroke-width="20" stroke-linecap="round"><path d="M515 500 Q585 410 655 485"/><path d="M775 425 Q840 350 900 408"/></g>';
const brows = (l, r) => '<g fill="none" stroke="' + C.dark + '" stroke-width="18" stroke-linecap="round"><path d="' + l + '"/><path d="' + r + '"/></g>';
const MOUTH_OPEN = '<path d="M662 578 C672 650 735 690 790 675 C822 660 825 600 812 545 C765 565 705 578 662 578Z" fill="' + C.mouth + '"/>' +
  '<path d="M690 642 C715 622 782 616 802 640 C792 670 742 690 702 670Z" fill="' + C.tongue + '"/>' +
  '<rect x="728" y="548" width="44" height="92" rx="8" transform="rotate(-10 750 594)" fill="#fff"/><path d="M752 553 L745 632" stroke="#E4E4E4" stroke-width="4"/>';
const TOOTH = '<rect x="726" y="555" width="40" height="62" rx="8" transform="rotate(-10 746 586)" fill="#fff"/><path d="M748 560 L742 612" stroke="#E4E4E4" stroke-width="4"/>';
const MOUTH = {
  open: MOUTH_OPEN,
  sad: TOOTH.replace('y="555"', 'y="600"').replace('height="62"', 'height="44"').replace('M748 560 L742 612', 'M748 604 L744 640') + '<path d="M672 628 Q740 584 810 612" fill="none" stroke="' + C.mouth + '" stroke-width="16" stroke-linecap="round"/>',
  think: TOOTH + '<path d="M688 628 Q740 646 800 612" fill="none" stroke="' + C.mouth + '" stroke-width="16" stroke-linecap="round"/>',
  wow: '<ellipse cx="742" cy="628" rx="42" ry="54" fill="' + C.mouth + '"/><ellipse cx="742" cy="660" rx="28" ry="18" fill="' + C.tongue + '"/>' + TOOTH.replace('y="555"', 'y="548"').replace('height="62"', 'height="40"')
};

const POSES = {
  idle:  { eyes:() => eyeOpen(false), mouth:MOUTH.open, armR:ARM.wave, armL:ARM.front },
  happy: { eyes:() => EYES_HAPPY, mouth:MOUTH.open, armR:ARM.wave, armL:ARM.front },
  cheer: { eyes:() => EYES_HAPPY, mouth:MOUTH.open, armR:ARM.wave, armL:ARM.upL },
  sad:   { eyes:() => eyeOpen(false, 6, 18) + brows('M500 412 L625 372', 'M768 322 L890 350'), mouth:MOUTH.sad, armR:ARM.downR, armL:ARM.downL },
  think: { eyes:() => eyeOpen(false, 18, -20) + brows('M505 372 L625 392', 'M770 300 Q830 262 890 290'), mouth:MOUTH.think, armR:ARM.chin, armL:ARM.front },
  wow:   { eyes:() => eyeOpen(true, 4, 0) + brows('M500 360 Q565 318 630 352', 'M770 292 Q830 252 890 282'), mouth:MOUTH.wow, armR:ARM.downR, armL:ARM.front }
};

function head(pose){
  return '<circle cx="400" cy="278" r="80" fill="' + C.fur + '"/><circle cx="405" cy="302" r="33" fill="' + C.dark + '"/>' +
    '<ellipse cx="757" cy="185" rx="68" ry="72" fill="' + C.fur + '"/>' +
    '<path d="M358 440 C360 320 470 225 630 205 C790 188 905 260 945 410 C1000 415 1035 470 1025 545 C1015 625 950 680 870 700 C760 728 560 728 455 705 C395 690 350 650 342 612 C318 600 320 570 345 552 C350 510 352 470 358 440Z" fill="' + C.fur + '"/>' +
    '<path d="M432 470 C438 395 510 350 610 355 C660 330 720 318 780 322 C860 330 905 380 915 430 C965 440 995 490 985 545 C972 615 905 668 820 680 C700 700 560 700 475 672 C418 645 402 575 432 470Z" fill="' + C.face + '"/>' +
    '<path d="M770 330 C790 300 810 285 822 300 C835 280 858 285 860 310 Z" fill="' + C.face + '"/>' +
    pose.eyes() +
    '<ellipse cx="505" cy="615" rx="100" ry="82" fill="' + C.cheek + '"/>' +
    '<ellipse cx="620" cy="630" rx="115" ry="78" fill="' + C.muzzle + '"/>' +
    '<ellipse cx="915" cy="522" rx="80" ry="80" fill="' + C.cheek + '"/>' +
    pose.mouth +
    '<ellipse cx="702" cy="548" rx="52" ry="36" transform="rotate(-10 702 548)" fill="' + C.light + '"/>' +
    '<ellipse cx="800" cy="518" rx="46" ry="34" transform="rotate(-15 800 518)" fill="' + C.light + '"/>' +
    '<path d="M698 497 C700 472 775 462 790 487 C798 507 772 537 745 538 C718 538 697 520 698 497Z" fill="' + C.nose + '"/>' +
    '<ellipse cx="728" cy="488" rx="16" ry="9" fill="#fff" opacity=".22"/>';
}

/* ---------- itens da loja ---------- */
const VISOR = '<path d="M355 388 C420 300 560 215 700 192 C760 182 800 188 806 204 L804 250 C700 252 560 300 368 425 Z" fill="#3FB51D"/>' +
  '<path d="M478 330 C600 255 760 208 900 212 C958 215 985 245 972 268 C900 248 760 268 600 312 C560 322 510 332 478 330Z" fill="#86D443"/>' +
  '<path d="M820 228 C900 214 970 232 975 262 C955 290 905 300 880 305 C885 275 865 248 820 228Z" fill="#22890F"/>' +
  '<rect x="612" y="202" width="140" height="42" rx="12" transform="rotate(-9 682 223)" fill="#D6F2AE"/>';
const HEAD = {
  bone: '<path d="M372 405 C390 262 535 182 680 178 C822 176 915 250 935 335 C800 302 560 322 372 405Z" fill="#C0432A"/>' +
    '<path d="M835 300 C900 282 995 292 1015 320 C995 352 930 358 878 352 Z" fill="#94311F"/><circle cx="662" cy="182" r="15" fill="#94311F"/>' +
    '<path d="M520 250 C590 215 660 205 730 210" fill="none" stroke="#DB6A50" stroke-width="18" stroke-linecap="round"/>',
  capacete: '<path d="M385 392 C395 250 540 168 682 166 C832 166 930 250 936 330 Z" fill="#F2B705"/>' +
    '<path d="M340 408 C520 320 765 290 980 324 L975 358 C762 322 530 352 352 442 Z" fill="#D99F00"/>' +
    '<path d="M560 205 C640 178 720 178 792 198" fill="none" stroke="#FFE27A" stroke-width="24" stroke-linecap="round"/>',
  capelo: '<path d="M462 340 C520 255 780 225 868 285 L858 338 C760 296 560 306 472 392Z" fill="#1C3D5A"/>' +
    '<path d="M652 112 L940 205 L682 298 L395 212Z" fill="#244B6E"/><circle cx="668" cy="205" r="14" fill="#E0B750"/>' +
    '<path d="M668 205 L885 225 L902 335" fill="none" stroke="#E0B750" stroke-width="10"/><circle cx="903" cy="348" r="18" fill="#E0B750"/>',
  coroa: '<path d="M492 332 L472 178 L566 250 L650 132 L732 234 L836 156 L846 304 C735 284 600 294 492 332Z" fill="#E0B750" stroke="#A87E1F" stroke-width="12" stroke-linejoin="round"/>' +
    '<circle cx="660" cy="282" r="20" fill="#B3432B"/><circle cx="560" cy="300" r="12" fill="#3FB51D"/><circle cx="765" cy="276" r="12" fill="#39788A"/>',
  fones: '<path d="M372 520 C360 300 500 190 662 185 C822 182 952 290 962 470" fill="none" stroke="#294941" stroke-width="32" stroke-linecap="round"/>' +
    '<rect x="326" y="468" width="78" height="134" rx="34" fill="#39788A" stroke="#294941" stroke-width="12"/>' +
    '<rect x="932" y="406" width="76" height="128" rx="34" fill="#39788A" stroke="#294941" stroke-width="12"/>'
};
function headItem(id){ return id && HEAD[id] ? HEAD[id] : VISOR; }

const NECK = {
  gravata: '<path d="M705 700 L778 695 L768 742 L716 745Z" fill="#8E3321"/><path d="M716 740 L768 738 L795 905 L745 958 L700 900Z" fill="#B3432B"/>' +
    '<path d="M735 760 L760 890" stroke="#D96A4F" stroke-width="8" stroke-linecap="round"/>',
  cachecol: '<path d="M465 688 C600 742 800 742 905 686 L912 748 C800 806 590 806 458 748Z" fill="#1F6F78"/>' +
    '<path d="M792 742 L858 734 L884 905 L816 912Z" fill="#18585F"/>' +
    '<path d="M500 735 C620 775 780 775 880 730" fill="none" stroke="#E0B750" stroke-width="10" stroke-dasharray="26 22"/>'
};

const jacket = (color, lapel, shirt, button) =>
  '<path d="M470 700 C430 800 420 950 470 1030 C540 1068 640 1072 705 1070 L705 905 L612 700Z" fill="' + color + '"/>' +
  '<path d="M820 688 C900 700 950 750 968 830 C990 930 965 1020 880 1045 C820 1058 765 1066 722 1070 L722 905 L800 692Z" fill="' + color + '"/>' +
  '<path d="M612 700 L705 905 L722 905 L800 692 Z" fill="' + shirt + '"/>' +
  '<path d="M612 700 L700 880 L640 800 L610 760Z" fill="' + lapel + '"/><path d="M800 692 L726 880 L790 800 L815 752Z" fill="' + lapel + '"/>' +
  '<circle cx="714" cy="960" r="13" fill="' + button + '"/><circle cx="714" cy="1015" r="13" fill="' + button + '"/>';
const OUTFIT = {
  blazer: { sleeve:'#1F5C43', svg: jacket('#1F5C43', '#17483A', '#F4F1E8', '#E0B750') },
  auditor: { sleeve:'#22304F', svg: jacket('#22304F', '#172238', '#DDE3EA', '#C9CED6') +
    '<path d="M700 705 L728 705 L740 880 L714 910 L690 880Z" fill="#B3432B"/>' },
  moletom: { sleeve:'#2E8C8C', svg:
    '<path d="' + BODY + '" fill="#2E8C8C"/>' +
    '<path d="M462 700 C590 770 800 765 895 690 L915 730 C800 812 580 812 450 742Z" fill="#257575"/>' +
    '<path d="M618 925 L902 925 L882 1022 L640 1022Z" fill="#257575"/>' +
    '<path d="M680 752 L672 850 M790 750 L800 848" stroke="#F4F1E8" stroke-width="10" stroke-linecap="round"/>' +
    '<circle cx="672" cy="858" r="11" fill="#F4F1E8"/><circle cx="800" cy="856" r="11" fill="#F4F1E8"/>' }
};
