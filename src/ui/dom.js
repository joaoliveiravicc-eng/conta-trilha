export const $ = (s, r) => (r || document).querySelector(s);
export const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
export function el(tag, cls, html){ const e = document.createElement(tag); if (cls) e.className = cls; if (html !== undefined) e.innerHTML = html; return e; }
export function mount(m, node){ m.appendChild(node); return node; }
export function bindActs(root, map){ $$('[data-act]', root).forEach(b => { const fn = map[b.dataset.act]; if (fn) b.addEventListener('click', e => fn(b, e)); }); }
