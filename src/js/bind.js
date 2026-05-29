// =============================================================================
//  LCARS · DOM binder
// -----------------------------------------------------------------------------
//  Wire a DOM subtree to a store so it updates in real time. Annotate markup
//  with data-bind-* attributes:
//
//    data-bind-style="--value: shields; --heading: heading|round"
//        → element.style.setProperty(prop, format(state[key], fmt))
//    data-bind-text="warp|warp"
//        → element.textContent = format(state.warp, 'warp')
//    data-bind-class="is-alert: redAlert; lcars-indicator--online: !offline"
//        → toggle each class when its (optionally negated) key is truthy
//    data-bind-attr="aria-valuenow: shields|round"
//        → element.setAttribute(name, format(state[key], fmt))
//
//  Usage:
//    const store = createStore({ shields: 98 });
//    const unbind = bind(rootEl, store);
//    store.set('shields', 91);   // bound DOM updates instantly
//    unbind();                   // stop listening
// =============================================================================

import { format as fmtValue } from './format.js';

function parsePairs(str) {
  return str
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((pair) => {
      const idx = pair.indexOf(':');
      const target = pair.slice(0, idx).trim();
      let expr = pair.slice(idx + 1).trim();
      let fmt = null;
      const bar = expr.indexOf('|');
      if (bar !== -1) {
        fmt = expr.slice(bar + 1).trim();
        expr = expr.slice(0, bar).trim();
      }
      let negate = false;
      if (expr.startsWith('!')) {
        negate = true;
        expr = expr.slice(1).trim();
      }
      return { target, key: expr, fmt, negate };
    });
}

export function bind(root, store) {
  const bindings = []; // { key, apply(state) }
  const add = (key, apply) => bindings.push({ key, apply });

  const els = [root, ...root.querySelectorAll('*')];

  for (const el of els) {
    const styleAttr = el.getAttribute && el.getAttribute('data-bind-style');
    if (styleAttr) {
      for (const { target, key, fmt } of parsePairs(styleAttr)) {
        add(key, (st) => el.style.setProperty(target, String(fmtValue(st[key], fmt))));
      }
    }
    const textAttr = el.getAttribute && el.getAttribute('data-bind-text');
    if (textAttr) {
      const [p] = parsePairs('t:' + textAttr);
      add(p.key, (st) => {
        el.textContent = String(fmtValue(st[p.key], p.fmt));
      });
    }
    const classAttr = el.getAttribute && el.getAttribute('data-bind-class');
    if (classAttr) {
      for (const { target, key, negate } of parsePairs(classAttr)) {
        add(key, (st) => {
          const on = negate ? !st[key] : !!st[key];
          el.classList.toggle(target, on);
        });
      }
    }
    const attrAttr = el.getAttribute && el.getAttribute('data-bind-attr');
    if (attrAttr) {
      for (const { target, key, fmt } of parsePairs(attrAttr)) {
        add(key, (st) => el.setAttribute(target, String(fmtValue(st[key], fmt))));
      }
    }
  }

  // Index bindings by key for O(changed) updates.
  const byKey = new Map();
  for (const b of bindings) {
    if (!byKey.has(b.key)) byKey.set(b.key, []);
    byKey.get(b.key).push(b.apply);
  }

  // Initial paint.
  const initial = store.state;
  for (const b of bindings) b.apply(initial);

  // React to changes.
  return store.subscribe((keys, st) => {
    for (const k of keys) {
      const fns = byKey.get(k);
      if (fns) for (const fn of fns) fn(st);
    }
  });
}
