/* Helpers de conteúdo: geram HTML para os cards de teoria das lições. */

export function T(name, deb, cred, saldo){
  deb = deb || []; cred = cred || [];
  const rows = Math.max(deb.length, cred.length, 1);
  let d = '', c = '';
  for (let i = 0; i < rows; i++){
    d += '<div>' + (deb[i] !== undefined ? deb[i] : '&nbsp;') + '</div>';
    c += '<div>' + (cred[i] !== undefined ? cred[i] : '&nbsp;') + '</div>';
  }
  return '<div class="tacct"><div class="tname">' + name + '</div>' +
    '<div class="tdc"><span>Débito</span><span>Crédito</span></div>' +
    '<div class="tbody"><div class="tcol">' + d + '</div><div class="tcol">' + c + '</div></div>' +
    (saldo ? '<div class="tsaldo">' + saldo + '</div>' : '') + '</div>';
}
export function TT(){ return '<div class="tgroup">' + Array.prototype.slice.call(arguments).join('') + '</div>'; }
export function box(kind, html){
  const lbl = { dica:'💡 Dica', exemplo:'📌 Exemplo', atencao:'⚠️ Atenção', regra:'📏 Regra de ouro' }[kind];
  return '<div class="callout ' + kind + '"><div class="cl-h">' + lbl + '</div><div class="cl-b">' + html + '</div></div>';
}
export function eq(html){ return '<div class="eqn">' + html + '</div>'; }
export function tbl(head, rows){
  return '<div class="tblwrap"><table><thead><tr>' + head.map(function(x){ return '<th>' + x + '</th>'; }).join('') +
    '</tr></thead><tbody>' + rows.map(function(r){ return '<tr>' + r.map(function(c){ return '<td>' + c + '</td>'; }).join('') + '</tr>'; }).join('') +
    '</tbody></table></div>';
}
export function lanc(lines){
  return '<div class="lanc">' + lines.map(function(l){
    return '<div class="ln ' + (l[0] === 'D' ? 'd' : 'c') + '"><span class="dc">' + l[0] + '</span><span class="acc">' + l[1] + '</span><span class="val">' + (l[2] || '') + '</span></div>';
  }).join('') + '</div>';
}
export function ul(items){ return '<ul class="blist">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
export function ol(items){ return '<ol class="steps">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ol>'; }
