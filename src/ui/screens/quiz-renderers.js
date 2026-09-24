/* Um 'renderizador' por tipo de exercício: monta o DOM da pergunta e devolve
   { ready, check, reveal, key? } consumido pela sessão de quiz (ui/screens/quiz.js). */
import { $, el, mount } from '../dom.js';
import { shuffle } from '../../engine/random.js';
import { sfx, buzz } from '../components/sound.js';
import { S } from '../../engine/state.js';
import { fmt, parseBR } from '../../engine/format.js';
import { bestMatchInfo, acctMatchInfo, acceptNote, evalExpl } from '../../engine/exercises/grading.js';
import { T } from '../../content/render-helpers.js';

/* ---------- util de render ---------- */
/* Respostas que a pessoa marcou como certas ("Minha resposta estava certa"): passam a valer para aquela questão. */
const learned = id => (id && S.accepted && S.accepted[id]) || [];
function learn(id, value){
  const v = String(value || '').trim(); if (!id || !v) return;
  S.accepted = S.accepted || {}; const list = S.accepted[id] = S.accepted[id] || [];
  if (!list.includes(v)) list.push(v);
}
export function hintRow(x, onUsed){
  if (!x.h) return null;
  const wrap = el('div', 'hintrow');
  const btn = el('button', 'link hintbtn', '💡 Pedir uma dica');
  const box = el('div', 'hintbox');
  btn.onclick = () => { box.textContent = '🦫 ' + x.h; box.classList.add('show'); btn.remove(); S.st.hints++; if (onUsed) onUsed(); sfx.tap(); };
  wrap.appendChild(btn); wrap.appendChild(box);
  return wrap;
}
export function optionsUI(labels, order, wrapCls, on){
  let sel = null, locked = false;
  const wrap = el('div', wrapCls);
  const btns = order.map((oi, k) => {
    const b = el('button', 'opt', '<span class="okey">' + (k + 1) + '</span><span>' + labels[oi] + '</span>');
    b.onclick = () => { if (locked) return; sel = oi; btns.forEach(x => x.classList.remove('sel')); b.classList.add('sel'); sfx.tap(); on(); };
    wrap.appendChild(b); return b;
  });
  return { wrap:wrap, btns:btns, get sel(){ return sel; }, lock(){ locked = true; btns.forEach(b => b.disabled = true); } };
}

/* ---------- renderizadores por tipo ---------- */
export function rMC(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const order = shuffle(x.o.map((_, i) => i));
  const ui = optionsUI(x.o, order, 'options', on); m.appendChild(ui.wrap);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  return {
    ready: () => ui.sel !== null, check: () => ui.sel === x.a,
    reveal(){ ui.lock(); ui.btns.forEach((b, k) => { const oi = order[k]; if (oi === x.a) b.classList.add('right'); else if (oi === ui.sel) b.classList.add('wrong'); }); },
    key(n){ if (ui.btns[n - 1]) ui.btns[n - 1].click(); }
  };
}
export function rTF(x, m, on){
  m.appendChild(el('div', 'qq state', '“' + x.q + '”'));
  const ui = optionsUI(['Verdadeiro', 'Falso'], [0, 1], 'tfrow', on); m.appendChild(ui.wrap);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  const ans = x.a ? 0 : 1;
  return {
    ready: () => ui.sel !== null, check: () => ui.sel === ans,
    reveal(){ ui.lock(); ui.btns.forEach((b, k) => { if (k === ans) b.classList.add('right'); else if (k === ui.sel) b.classList.add('wrong'); }); },
    key(n){ if (ui.btns[n - 1]) ui.btns[n - 1].click(); }
  };
}
export function rFill(x, m, on){
  const parts = x.q.split('___'), n = parts.length - 1, filled = Array(n).fill(null), opts = shuffle(x.o);
  let locked = false;
  const sent = el('div', 'fill-sent'), blanks = [];
  parts.forEach((p, i) => {
    sent.appendChild(document.createTextNode(p));
    if (i < n){
      const b = el('button', 'blank'); b.setAttribute('aria-label', 'Lacuna ' + (i + 1));
      b.onclick = () => { if (locked || filled[i] === null) return; chips[filled[i]].classList.remove('used'); filled[i] = null; paint(); on(); };
      blanks.push(b); sent.appendChild(b);
    }
  });
  const bank = el('div', 'chipbank');
  const chips = opts.map((t, ci) => {
    const c = el('button', 'chip', t);
    c.onclick = () => { if (locked || c.classList.contains('used')) return; const slot = filled.indexOf(null); if (slot < 0) return; filled[slot] = ci; c.classList.add('used'); sfx.tap(); paint(); on(); };
    bank.appendChild(c); return c;
  });
  function paint(){ blanks.forEach((b, i) => { b.textContent = filled[i] === null ? '' : opts[filled[i]]; b.classList.toggle('filled', filled[i] !== null); }); }
  m.appendChild(sent); m.appendChild(bank);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  return {
    ready: () => filled.every(v => v !== null),
    check: () => filled.every((ci, i) => opts[ci] === x.a[i]),
    reveal(){ locked = true; chips.forEach(c => c.disabled = true); blanks.forEach((b, i) => b.classList.add(opts[filled[i]] === x.a[i] ? 'right' : 'wrong')); }
  };
}
export function rMatch(x, m, on, auto){
  m.appendChild(el('div', 'qq', x.q || 'Toque um item de cada coluna para formar os pares.'));
  const n = x.pairs.length, L = shuffle([...Array(n).keys()]), R = shuffle([...Array(n).keys()]);
  let sl = null, sr = null, errs = 0, got = 0;
  const grid = el('div', 'mgrid'), cl2 = el('div', 'mcol'), cr = el('div', 'mcol');
  function mk(side, idx, col){
    const b = el('button', 'mbtn', x.pairs[idx][side === 'l' ? 0 : 1]);
    b.onclick = () => {
      if (b.classList.contains('done')) return;
      if (side === 'l'){ if (sl) sl.b.classList.remove('sel'); sl = { i:idx, b:b }; } else { if (sr) sr.b.classList.remove('sel'); sr = { i:idx, b:b }; }
      b.classList.add('sel'); sfx.tap();
      if (sl && sr){
        const a = sl, c = sr; sl = sr = null;
        a.b.classList.remove('sel'); c.b.classList.remove('sel');
        if (a.i === c.i){ a.b.classList.add('done'); c.b.classList.add('done'); a.b.disabled = c.b.disabled = true; got++; if (got === n) setTimeout(auto, 250); }
        else { errs++; a.b.classList.add('no'); c.b.classList.add('no'); buzz(); setTimeout(() => { a.b.classList.remove('no'); c.b.classList.remove('no'); }, 450); }
      }
    };
    col.appendChild(b);
  }
  L.forEach(i => mk('l', i, cl2)); R.forEach(i => mk('r', i, cr));
  grid.appendChild(cl2); grid.appendChild(cr); m.appendChild(grid);
  return { ready: () => got === n, check: () => true, reveal(){}, imperfect: () => errs > 0, auto:true };
}
export function rEntry(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const d = [].concat(x.d), c = [].concat(x.c), accts = shuffle(x.accts), st = accts.map(() => 0);
  let locked = false;
  const prev = el('div', 'lanc live');
  const hint = el('div', 'hint', 'Toque 1 vez para <b>Débito</b>, 2 vezes para <b>Crédito</b> e 3 vezes para limpar.');
  const bank = el('div', 'chipbank');
  const chips = accts.map((a, i) => {
    const b = el('button', 'chip', '<span class="tag"></span><span>' + a + '</span>');
    b.onclick = () => { if (locked) return; st[i] = (st[i] + 1) % 3; sfx.tap(); paint(); on(); };
    bank.appendChild(b); return b;
  });
  function line(dc, a){ return '<div class="ln ' + (dc === 'D' ? 'd' : 'c') + '"><span class="dc">' + dc + '</span><span class="acc">' + a + '</span></div>'; }
  function paint(){
    chips.forEach((b, i) => { b.dataset.s = st[i]; $('.tag', b).textContent = st[i] === 1 ? 'D' : st[i] === 2 ? 'C' : ''; });
    const D = accts.filter((_, i) => st[i] === 1), C = accts.filter((_, i) => st[i] === 2);
    prev.innerHTML = (D.length || C.length) ? D.map(a => line('D', a)).join('') + C.map(a => line('C', a)).join('') : '<div class="lanc-empty">Seu lançamento aparece aqui</div>';
  }
  paint(); m.appendChild(prev); m.appendChild(hint); m.appendChild(bank);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  const same = (A, B) => A.length === B.length && A.every(v => B.indexOf(v) >= 0);
  return {
    ready: () => st.indexOf(1) >= 0 && st.indexOf(2) >= 0,
    check: () => same(accts.filter((_, i) => st[i] === 1), d) && same(accts.filter((_, i) => st[i] === 2), c),
    reveal(){
      locked = true;
      chips.forEach((b, i) => {
        b.disabled = true; const a = accts[i], want = d.indexOf(a) >= 0 ? 1 : (c.indexOf(a) >= 0 ? 2 : 0);
        if (want && st[i] === want) b.classList.add('right');
        else if (st[i] && st[i] !== want) b.classList.add('wrong');
        else if (want){ b.classList.add('miss'); b.dataset.s = want; $('.tag', b).textContent = want === 1 ? 'D' : 'C'; }
      });
    }
  };
}
export function rClass(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const items = shuffle(x.items.map(it => ({ t:it[0], a:it[1] }))), ch = items.map(() => null), rows = [];
  let locked = false;
  items.forEach((it, i) => {
    const r = el('div', 'crow2'); r.appendChild(el('div', 'cl', it.t));
    const seg = el('div', 'seg');
    const bs = x.cats.map((cat, ci) => {
      const b = el('button', '', cat);
      b.onclick = () => { if (locked) return; ch[i] = ci; bs.forEach(z => z.classList.remove('on')); b.classList.add('on'); sfx.tap(); on(); };
      seg.appendChild(b); return b;
    });
    r.appendChild(seg); m.appendChild(r); rows.push({ r:r, bs:bs });
  });
  return {
    ready: () => ch.every(v => v !== null),
    check: () => items.every((it, i) => ch[i] === it.a),
    reveal(){
      locked = true;
      rows.forEach((o, i) => {
        o.bs.forEach(b => b.disabled = true);
        const ok = ch[i] === items[i].a; o.r.classList.add(ok ? 'r' : 'w');
        if (!ok){ o.bs[ch[i]].classList.remove('on'); o.bs[ch[i]].classList.add('wrong'); }
        o.bs[items[i].a].classList.remove('on'); o.bs[items[i].a].classList.add('right');
      });
    }
  };
}
export function rNum(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const w = el('div', 'numwrap', (x.u ? '<span>' + x.u + '</span>' : '') + '<input type="text" inputmode="decimal" autocomplete="off" placeholder="Sua resposta" aria-label="Resposta">' + (x.s ? '<span>' + x.s + '</span>' : ''));
  const inp = $('input', w); inp.addEventListener('input', on);
  m.appendChild(w);
  m.appendChild(el('div', 'hint', 'Use vírgula para decimais. Pontos de milhar são opcionais.'));
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  setTimeout(() => { try { inp.focus({ preventScroll:true }); } catch (e) {} }, 60);
  return {
    ready: () => inp.value.trim() !== '' && !isNaN(parseBR(inp.value)),
    check: () => Math.abs(parseBR(inp.value) - x.a) <= (x.tol !== undefined ? x.tol : 0.015 + Math.abs(x.a) * 0.002),
    reveal(ok){ inp.disabled = true; w.classList.add(ok ? 'right' : 'wrong'); }
  };
}
export function rWR(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const w = el('div', 'numwrap wide', '<input type="text" autocomplete="off" placeholder="Escreva sua resposta" aria-label="Resposta">');
  const inp = $('input', w); inp.addEventListener('input', on);
  m.appendChild(w);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  setTimeout(() => { try { inp.focus({ preventScroll:true }); } catch (e) {} }, 60);
  let info = { lvl:0 };
  return {
    ready: () => inp.value.trim() !== '',
    check(){ info = bestMatchInfo(inp.value, x.a.concat(learned(x.key))); return info.lvl >= 1; },
    reveal(ok){
      inp.disabled = true; w.classList.add(ok ? 'right' : 'wrong');
      const note = ok && acceptNote(info); if (note) mount(m, el('div', 'small muted accept-note', note));
    },
    typed: () => inp.value.trim(),
    learn(){ learn(x.key, inp.value); w.classList.remove('wrong'); w.classList.add('right'); }
  };
}
export function rEW(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  function row(label){
    const wrap = el('div', 'ewrow'); wrap.appendChild(el('div', 'ewlabel', label));
    const w = el('div', 'numwrap wide'); const inp = document.createElement('input');
    inp.type = 'text'; inp.autocomplete = 'off'; inp.placeholder = 'Nome da conta'; inp.setAttribute('aria-label', label);
    inp.addEventListener('input', on); w.appendChild(inp); wrap.appendChild(w);
    return { wrap:wrap, inp:inp, box:w };
  }
  const rd = row('Conta a débito'), rc = row('Conta a crédito');
  m.appendChild(rd.wrap); m.appendChild(rc.wrap);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  setTimeout(() => { try { rd.inp.focus({ preventScroll:true }); } catch (e) {} }, 60);
  let dOk = false, cOk = false;
  const side = (inp, canon, id) => {
    const info = acctMatchInfo(inp.value, canon);
    return info.lvl >= 1 || learned(id).some(v => acctMatchInfo(inp.value, v).lvl >= 1);
  };
  return {
    ready: () => rd.inp.value.trim() !== '' && rc.inp.value.trim() !== '',
    check(){ dOk = side(rd.inp, x.d[0], x.key && x.key + '#d'); cOk = side(rc.inp, x.c[0], x.key && x.key + '#c'); return dOk && cOk; },
    reveal(){
      rd.inp.disabled = true; rc.inp.disabled = true;
      rd.box.classList.add(dOk ? 'right' : 'wrong'); rc.box.classList.add(cOk ? 'right' : 'wrong');
      if (!dOk) rd.wrap.appendChild(el('div', 'ewans', 'Resposta: ' + x.d[0]));
      if (!cOk) rc.wrap.appendChild(el('div', 'ewans', 'Resposta: ' + x.c[0]));
    },
    typed: () => rd.inp.value.trim() + ' / ' + rc.inp.value.trim(),
    learn(){
      if (!dOk && x.key) learn(x.key + '#d', rd.inp.value);
      if (!cOk && x.key) learn(x.key + '#c', rc.inp.value);
      [rd.box, rc.box].forEach(b => { b.classList.remove('wrong'); b.classList.add('right'); });
    }
  };
}
export function rOrd(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const n = x.items.length, order = shuffle(x.items.map((_, i) => i)), chosen = [];
  const strip = el('div', 'ordstrip'), bank = el('div', 'chipbank');
  function paint(){
    strip.innerHTML = chosen.length ? chosen.map((oi, pos) => '<div class="ordslot"><span class="on">' + (pos + 1) + '</span>' + x.items[oi] + '</div>').join('') : '<div class="lanc-empty">Toque os itens abaixo, na ordem certa</div>';
  }
  const chips = order.map(oi => {
    const b = el('button', 'chip', x.items[oi]);
    b.onclick = () => { if (b.classList.contains('used')) return; chosen.push(oi); b.classList.add('used'); sfx.tap(); paint(); on(); };
    bank.appendChild(b); return b;
  });
  strip.addEventListener('click', e => {
    const slot = e.target.closest('.ordslot'); if (!slot || strip.classList.contains('locked')) return;
    const idx = Array.from(strip.children).indexOf(slot), oi = chosen[idx];
    chosen.splice(idx, 1); chips[order.indexOf(oi)].classList.remove('used'); paint(); on();
  });
  paint(); m.appendChild(strip); m.appendChild(bank);
  const hr = hintRow(x); if (hr) m.appendChild(hr);
  return {
    ready: () => chosen.length === n,
    check: () => chosen.every((oi, pos) => oi === pos),
    reveal(ok){
      chips.forEach(c2 => c2.disabled = true); strip.classList.add('locked');
      if (ok) strip.classList.add('right');
      else { strip.classList.add('wrong'); strip.innerHTML = x.items.map((t, pos) => '<div class="ordslot right"><span class="on">' + (pos + 1) + '</span>' + t + '</div>').join(''); }
    }
  };
}
export function rExpl(x, m, on){
  m.appendChild(el('div', 'qq', x.q));
  const ta = document.createElement('textarea'); ta.rows = 4; ta.className = 'explta'; ta.placeholder = 'Escreva aqui, com suas próprias palavras...';
  ta.addEventListener('input', on); m.appendChild(ta);
  m.appendChild(el('div', 'hint', 'Não existe resposta perfeita: vou procurar as ideias principais no que você escrever.'));
  let res = null;
  return {
    ready: () => ta.value.trim().length >= 8,
    check(){ res = evalExpl(ta.value, x); return res.ok; },
    reveal(){
      ta.disabled = true;
      const list = x.k.map((g, i) => '<li class="' + (res.hits[i] ? 'hit' : 'miss') + '">' + (res.hits[i] ? '✅' : '⭕') + ' ' + g[0] + '</li>').join('');
      mount(m, el('div', 'explcheck', '<div class="small muted" style="margin:10px 0 4px">Ideias identificadas (' + res.n + ' de ' + x.k.length + '):</div><ul class="explist">' + list + '</ul><div class="modelans"><b>Uma resposta-modelo:</b> ' + x.model + '</div>'));
    },
    typed: () => ta.value.trim(),
    learn(){}
  };
}
export function rTsal(x, m, on){
  m.appendChild(el('div', 'qq', 'Qual é o saldo desta conta?'));
  mount(m, el('div', '', T(x.name, x.deb.map(v => 'R$ ' + fmt(v)), x.cred.map(v => 'R$ ' + fmt(v)))));
  const seg = el('div', 'seg tsseg'); let side = null;
  const bd = el('button', '', 'Devedor'), bc = el('button', '', 'Credor');
  [bd, bc].forEach((b, i) => { b.onclick = () => { side = i === 0 ? 'D' : 'C'; bd.classList.toggle('on', i === 0); bc.classList.toggle('on', i === 1); sfx.tap(); on(); }; seg.appendChild(b); });
  m.appendChild(seg);
  const w = el('div', 'numwrap', '<span>R$</span><input type="text" inputmode="decimal" placeholder="Valor do saldo" aria-label="Valor do saldo">');
  const inp = $('input', w); inp.addEventListener('input', on); m.appendChild(w);
  const sumD = x.deb.reduce((a, b) => a + b, 0), sumC = x.cred.reduce((a, b) => a + b, 0), diff = sumD - sumC;
  const ansSide = diff >= 0 ? 'D' : 'C', ansVal = Math.abs(diff);
  return {
    ready: () => side && inp.value.trim() !== '' && !isNaN(parseBR(inp.value)),
    check: () => side === ansSide && Math.abs(parseBR(inp.value) - ansVal) <= 0.015,
    reveal(ok){ inp.disabled = true; bd.disabled = true; bc.disabled = true; w.classList.add(ok ? 'right' : 'wrong'); }
  };
}
export function render(x, m, on, auto){
  return { mc:rMC, tf:rTF, fill:rFill, match:rMatch, entry:rEntry, class:rClass, num:rNum, wr:rWR, ew:rEW, ord:rOrd, expl:rExpl, tsal:rTsal }[x.t](x, m, on, auto);
}
export function tsalAnswer(x){ const d = x.deb.reduce((a, b) => a + b, 0) - x.cred.reduce((a, b) => a + b, 0); return (d >= 0 ? 'Devedor' : 'Credor') + ' de R$ ' + fmt(Math.abs(d)); }
export function answerText(x){
  switch (x.t){
    case 'mc': return x.o[x.a];
    case 'tf': return x.a ? 'Verdadeiro' : 'Falso';
    case 'fill': return x.a.join(' / ');
    case 'entry': return 'Débito: ' + [].concat(x.d).join(' e ') + '. Crédito: ' + [].concat(x.c).join(' e ') + '.';
    case 'ew': return 'Débito: ' + x.d[0] + '. Crédito: ' + x.c[0] + '.';
    case 'num': return (x.u ? x.u + ' ' : '') + fmt(x.a) + (x.s ? (x.s === '%' ? '%' : ' ' + x.s) : '');
    case 'wr': return x.a[0];
    case 'ord': return x.items.join(' → ');
    case 'tsal': return tsalAnswer(x);
    case 'expl': return x.model;
    case 'class': return 'Veja as correções destacadas acima.';
    default: return '';
  }
}

/* ---------- índice de exercícios (para revisão/prática) já criado em EX na Parte A ---------- */
export function items(list){ return list.map(o => ({ key:o.x.key, x:o.x })); }
