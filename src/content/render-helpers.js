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
/* Grade no estilo do Excel: letras nas colunas, números nas linhas. `mark` destaca células
   (ex.: ['D2']). Células que começam com "=" aparecem como fórmula. */
export function planilha(rows, opts){
  opts = opts || {};
  const cols = Math.max.apply(null, rows.map(function(r){ return r.length; }));
  const start = opts.startRow || 1, marks = opts.mark || [], col0 = (opts.startCol || 'A').charCodeAt(0) - 65;
  const letter = function(i){ return String.fromCharCode(65 + col0 + i); };
  const cell = function(v, ref){
    const txt = v === null || v === undefined ? '' : String(v);
    const cls = (marks.indexOf(ref) >= 0 ? 'mk ' : '') + (txt.charAt(0) === '=' ? 'fx' : (/^-?[\d.,]+%?$/.test(txt) ? 'nb' : ''));
    return '<td' + (cls ? ' class="' + cls.trim() + '"' : '') + '>' + txt + '</td>';
  };
  let h = '<div class="tblwrap xlwrap"><table class="xl"><thead><tr><th class="xc"></th>';
  for (let i = 0; i < cols; i++) h += '<th>' + letter(i) + '</th>';
  h += '</tr></thead><tbody>';
  rows.forEach(function(r, ri){
    const n = start + ri;
    h += '<tr><th class="xr">' + n + '</th>';
    for (let i = 0; i < cols; i++) h += cell(r[i], letter(i) + n);
    h += '</tr>';
  });
  return h + '</tbody></table></div>';
}
export function download(href, label){ return '<a class="dl-btn" href="' + href + '" download>⬇ ' + label + '</a>'; }
/* Fatos de um caso dentro do enunciado de uma pergunta: a questão fica completa mesmo fora da lição. */
export function facts(items){ return '<ul class="facts">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
export function ul(items){ return '<ul class="blist">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ul>'; }
export function ol(items){ return '<ol class="steps">' + items.map(function(i){ return '<li>' + i + '</li>'; }).join('') + '</ol>'; }
