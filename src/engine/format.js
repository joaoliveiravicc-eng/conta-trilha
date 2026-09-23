export function fmt(n){ return Number(n).toLocaleString('pt-BR', { maximumFractionDigits: 3 }); }
export function money(n){ return 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 2 }); }

/* Lê um número digitado no formato brasileiro (1.234,56, ou com "R$"/"%"/texto solto). */
export function parseBR(s){
  s = String(s).trim().replace(/R\$|%|\s|vezes|dias|unidades/gi, '').replace(/[−–]/g, '-');
  if (!s) return NaN;
  if (s.indexOf(',') >= 0) s = s.replace(/\./g, '').replace(',', '.');
  else if (/^-?[1-9]\d{0,2}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
  return Number(s);
}
