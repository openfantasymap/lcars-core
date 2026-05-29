// =============================================================================
//  LCARS · Overview interpreter (annotated SVG)
// -----------------------------------------------------------------------------
//  Inject an annotated SVG into a `.lcars-overview` and wire it up:
//   · reads data-lcars-region / -id / -label / -status annotations,
//   · uses the SVG's own data-lcars-status values as the DEFAULT state,
//   · builds a legend from labelled regions,
//   · makes regions keyboard-focusable + clickable (onSelect),
//   · returns an API to drive status/text and bind a live store.
//
//    import { loadOverview, createStore } from '@ofm/lcars-lib/js';
//
//    const ov = await loadOverview(hostEl, svgMarkupOrUrl, {
//      onSelect(id, el) { console.log('selected', id); },
//    });
//    ov.setStatus('reactor', 'critical');     // recolours (CSS does the rest)
//    ov.statuses();                           // { reactor:'critical', … }
//    ov.bind(store);                          // live: store.set('reactorState', …)
// =============================================================================

import { bind } from './bind.js';
import { createStore } from './store.js';

const SVG_NS = 'http://www.w3.org/2000/svg';

function looksLikeUrl(s) {
  return typeof s === 'string' && /\.svg(\?|#|$)/i.test(s.trim()) && !/[<]/.test(s);
}

// From `data-bind-attr="data-lcars-status: reactorState"` pull out "reactorState".
function statusBindKey(el) {
  const attr = el.getAttribute && el.getAttribute('data-bind-attr');
  if (!attr) return null;
  for (const part of attr.split(';')) {
    const i = part.indexOf(':');
    if (i === -1) continue;
    if (part.slice(0, i).trim() !== 'data-lcars-status') continue;
    let key = part.slice(i + 1).trim();
    const bar = key.indexOf('|');
    if (bar !== -1) key = key.slice(0, bar).trim();
    if (key.startsWith('!')) key = key.slice(1).trim();
    return key;
  }
  return null;
}

export async function loadOverview(host, source, opts = {}) {
  const stage =
    host.classList && host.classList.contains('lcars-overview__stage')
      ? host
      : host.querySelector
      ? host.querySelector('.lcars-overview__stage') || host
      : host;

  // Resolve the SVG markup.
  let markup = source;
  if (source instanceof SVGElement) {
    markup = source.outerHTML;
  } else if (looksLikeUrl(source)) {
    const res = await fetch(source);
    markup = await res.text();
  }
  stage.innerHTML = typeof markup === 'string' ? markup : '';

  const svg = stage.querySelector('svg');
  if (svg) {
    svg.classList.add('lcars-overview__svg');
    if (!svg.getAttribute('preserveAspectRatio')) {
      svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    }
  }

  const regions = new Map();
  const defaults = {};
  const seed = {}; // store keys discovered from data-bind-attr, seeded from defaults

  const nodes = stage.querySelectorAll('[data-lcars-region], [data-lcars-id]');
  let i = 0;
  nodes.forEach((el) => {
    const id =
      el.getAttribute('data-lcars-id') ||
      el.getAttribute('data-lcars-label') ||
      'region-' + i++;
    regions.set(id, el);

    const status = el.getAttribute('data-lcars-status');
    if (status) defaults[id] = status;

    // If this region is data-bound to a status key, seed that key from its default.
    const key = statusBindKey(el);
    if (key) seed[key] = status || 'nominal';

    // Accessibility + interaction
    if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '0');
    el.setAttribute('role', 'button');
    const label = el.getAttribute('data-lcars-label');
    if (label) {
      el.setAttribute('aria-label', label);
      if (!el.querySelector('title')) {
        const t = document.createElementNS(SVG_NS, 'title');
        t.textContent = label;
        el.appendChild(t);
      }
    }

    const select = () => {
      regions.forEach((r) => r.classList.remove('is-selected'));
      el.classList.add('is-selected');
      if (opts.onSelect) opts.onSelect(id, el);
    };
    el.addEventListener('click', select);
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        select();
      }
    });
  });

  // Legend (from labelled regions) — opt out with { legend: false }.
  const legendEl = host.querySelector && host.querySelector('.lcars-overview__legend');
  function syncLegend(id, status) {
    if (!legendEl) return;
    const sw = legendEl.querySelector(
      '.lcars-overview__legend-item[data-for="' + id + '"] .lcars-overview__swatch'
    );
    if (sw) sw.setAttribute('data-lcars-status', status || 'nominal');
  }
  if (legendEl && opts.legend !== false) {
    legendEl.innerHTML = '';
    regions.forEach((el, id) => {
      const label = el.getAttribute('data-lcars-label') || id;
      const status = el.getAttribute('data-lcars-status') || 'nominal';
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'lcars-overview__legend-item';
      item.setAttribute('data-for', id);
      item.innerHTML =
        '<span class="lcars-overview__swatch" data-lcars-status="' + status + '"></span>' + label;
      item.addEventListener('click', () => {
        regions.forEach((r) => r.classList.remove('is-selected'));
        el.classList.add('is-selected');
        if (opts.onSelect) opts.onSelect(id, el);
      });
      legendEl.appendChild(item);
    });
  }

  // Update the summary line if present.
  const summary = host.querySelector && host.querySelector('.lcars-overview__summary');
  if (summary && !summary.dataset.locked) {
    summary.textContent = regions.size + ' systems';
  }

  return {
    host,
    stage,
    svg,
    regions,
    defaults,
    seed,
    // Auto-seed a store from the SVG's annotated defaults and bind it.
    // Pass your own store to seed it instead. Returns the store.
    connect(store) {
      const s = store || createStore({ ...seed });
      if (store) store.set({ ...seed, ...store.state }); // fill any missing keys
      this._unbind = bind(host, s);
      this.store = s;
      return s;
    },
    statuses() {
      const out = {};
      regions.forEach((el, id) => (out[id] = el.getAttribute('data-lcars-status')));
      return out;
    },
    setStatus(id, status) {
      const el = regions.get(id);
      if (el) {
        el.setAttribute('data-lcars-status', status);
        syncLegend(id, status);
      }
    },
    setText(id, text) {
      const el = regions.get(id);
      if (!el) return;
      const target = el.querySelector('[data-lcars-value]') || el;
      target.textContent = text;
    },
    select(id) {
      const el = regions.get(id);
      if (!el) return;
      regions.forEach((r) => r.classList.remove('is-selected'));
      el.classList.add('is-selected');
    },
    bind(store) {
      return bind(host, store);
    },
  };
}
