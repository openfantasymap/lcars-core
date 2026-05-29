import { loadOverview } from '../../src/js/index.js';
// Vite imports the annotated SVG as a raw string.
import SYSTEMS_SVG from '../assets/systems-overview.svg?raw';

export default {
  title: 'Overview/Schematic',
  parameters: { layout: 'fullscreen' },
};

const STATES = ['nominal', 'nominal', 'nominal', 'warning', 'critical', 'offline'];

const shell = () => {
  const host = document.createElement('div');
  host.className = 'lcars-overview';
  host.style.maxWidth = '34rem';
  host.innerHTML = `
    <div class="lcars-overview__header">
      <span class="lcars-overview__title">Systems Overview</span>
      <span class="lcars-overview__summary"></span>
    </div>
    <div class="lcars-overview__stage"></div>
    <div class="lcars-overview__legend"></div>`;
  return host;
};

// ---- Static: interpret the annotated SVG, click to select ----
export const Interpreted = {
  name: 'Interpreted SVG',
  render: () => {
    const wrap = document.createElement('div');
    const host = shell();
    const readout = document.createElement('div');
    readout.className = 'lcars-readout';
    readout.style.marginTop = '0.75rem';
    readout.innerHTML =
      '<span class="lcars-readout__label">Selected</span><span class="lcars-readout__value">—</span>';
    wrap.appendChild(host);
    wrap.appendChild(readout);

    loadOverview(host, SYSTEMS_SVG, {
      onSelect: (id, el) => {
        readout.querySelector('.lcars-readout__value').textContent =
          el.getAttribute('data-lcars-label') || id;
      },
    });
    return wrap;
  },
};

// ---- Realtime: the SVG is data-bound; statuses change live ----
let stop = null;
let unbind = null;

export const Realtime = {
  name: 'Realtime (data-bound)',
  render: () => {
    if (stop) {
      clearInterval(stop);
      stop = null;
    }
    if (unbind) unbind();

    const host = shell();
    host.querySelector('.lcars-overview__title').textContent = 'Systems Overview · Live';

    loadOverview(host, SYSTEMS_SVG, { legend: false }).then((ov) => {
      // Auto-seed a store from the SVG's annotated defaults + bind it in one call.
      const store = ov.connect();
      unbind = ov._unbind;

      // Flip a random system every tick — drives the SVG via the binding.
      const keys = Object.keys(ov.seed); // e.g. reactorState, bridgeState, …
      stop = setInterval(() => {
        const k = keys[Math.floor(Math.random() * keys.length)];
        const status = STATES[Math.floor(Math.random() * STATES.length)];
        store.set(k, status);
      }, 900);
    });

    return host;
  },
};
