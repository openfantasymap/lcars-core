import { createStore, bind } from '../../src/js/index.js';

export default {
  title: 'Transporter/Console',
  parameters: { layout: 'fullscreen' },
};

// Keep one timer/unbind across re-renders so nothing leaks between visits.
let timer = null;
let unbind = null;

export const EnergizeSequence = {
  name: 'Energize sequence (data-driven)',
  render: () => {
    if (timer) clearInterval(timer);
    if (unbind) unbind();

    const root = document.createElement('div');
    root.innerHTML = `
      <div class="lcars-transporter-console">
        <div class="lcars-transporter-pad" data-pads>
          ${Array.from({ length: 6 }, () => '<div class="lcars-transporter-pad__pad is-locked"></div>').join('')}
        </div>

        <div class="lcars-transporter lcars-transporter--progress" data-bind-style="--progress: progress">
          <div class="lcars-transporter__subject">🖖</div>
          <div class="lcars-transporter__beam"></div>
        </div>

        <div class="lcars-transporter-console__controls">
          <div class="lcars-gauge lcars-gauge--accent lcars-gauge--sm" data-bind-style="--value: progress">
            <span class="lcars-gauge__value" data-bind-text="progress|round">100</span>
            <span class="lcars-gauge__label">Pattern</span>
          </div>
          <span class="lcars-indicator lcars-indicator--online"
                data-bind-class="lcars-indicator--online: !energizing; lcars-indicator--alert: energizing">
            <span class="lcars-indicator__light"></span>
            <span class="lcars-indicator__label" data-bind-text="status">Materialized</span>
          </span>
          <button class="lcars-button lcars-button--rounded lcars-button--accent" data-action="energize">Energize</button>
        </div>
      </div>`;

    const store = createStore({ progress: 100, status: 'Materialized', energizing: false });
    unbind = bind(root, store);

    root.querySelector('[data-action="energize"]').addEventListener('click', () => {
      if (store.get('energizing')) return;
      const target = store.get('progress') > 50 ? 0 : 100;
      const dir = target > store.get('progress') ? 1 : -1;
      store.set({ energizing: true, status: dir > 0 ? 'Materializing' : 'Dematerializing' });
      timer = setInterval(() => {
        let p = store.get('progress') + dir * 4;
        if ((dir > 0 && p >= 100) || (dir < 0 && p <= 0)) {
          p = target;
          clearInterval(timer);
          timer = null;
          store.set({ progress: p, energizing: false, status: p === 100 ? 'Materialized' : 'In Buffer' });
        } else {
          store.set('progress', p);
        }
      }, 40);
    });

    return root;
  },
};
