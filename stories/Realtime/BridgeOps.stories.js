import { createStore, bind, simulate } from '../../src/js/index.js';

export default {
  title: 'Realtime/Bridge Ops',
  parameters: { layout: 'fullscreen' },
};

// Shared cleanup so leaving the story stops the feed.
let stop = null;
let unbind = null;

export const LiveTelemetry = {
  name: 'Live telemetry',
  render: () => {
    if (stop) stop();
    if (unbind) unbind();

    const root = document.createElement('div');
    root.innerHTML = `
      <div class="lcars-bar-group lcars-bar-group--thick" style="margin-bottom:0.75rem;">
        <div class="lcars-bar cap-left lcars-bar--primary" style="min-width:3rem;"></div>
        <div class="lcars-bar fill lcars-bar--primary"><span class="lcars-bar__title">USS ENTERPRISE · BRIDGE OPS</span></div>
        <div class="lcars-bar cap-right lcars-bar--danger" style="min-width:4rem;"
             data-bind-class="lcars-blink: redAlert"></div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:flex-start;">

        <!-- Status gauges -->
        <div style="display:flex;gap:1rem;">
          <div class="lcars-gauge lcars-gauge--success lcars-gauge--sm" data-bind-style="--value: hull">
            <span class="lcars-gauge__value" data-bind-text="hull|round">100</span><span class="lcars-gauge__label">Hull</span>
          </div>
          <div class="lcars-gauge lcars-gauge--primary lcars-gauge--sm" data-bind-style="--value: shields">
            <span class="lcars-gauge__value" data-bind-text="shields|round">98</span><span class="lcars-gauge__label">Shields</span>
          </div>
          <div class="lcars-gauge lcars-gauge--warning lcars-gauge--sm" data-bind-style="--value: power">
            <span class="lcars-gauge__value" data-bind-text="power|round">80</span><span class="lcars-gauge__label">Power</span>
          </div>
        </div>

        <!-- Heading + helm -->
        <div class="lcars-compass" style="--compass-size:11rem;" data-bind-style="--heading: heading">
          <span class="lcars-compass__cardinal lcars-compass__cardinal--n">N</span>
          <span class="lcars-compass__cardinal lcars-compass__cardinal--e">E</span>
          <span class="lcars-compass__cardinal lcars-compass__cardinal--s">S</span>
          <span class="lcars-compass__cardinal lcars-compass__cardinal--w">W</span>
          <div class="lcars-compass__needle"></div>
          <div class="lcars-compass__hub"></div>
          <div class="lcars-compass__readout" data-bind-text="heading|pad3">000</div>
        </div>

        <div class="lcars-helm" style="min-width:18rem;"
             data-bind-style="--warp: warp; --impulse: impulse; --throttle: throttle">
          <div class="lcars-helm__head">
            <div class="lcars-helm__metric"><span class="lcars-helm__label">Warp</span><span class="lcars-helm__value" data-bind-text="warp|fixed1">5.0</span></div>
            <div class="lcars-helm__metric" style="align-items:flex-end;"><span class="lcars-helm__label">Impulse</span><span class="lcars-helm__value" data-bind-text="impulse|pct">50%</span></div>
          </div>
          <div class="lcars-helm__bar lcars-helm__bar--warp" style="--segments:9;"><div class="lcars-helm__fill"></div></div>
          <div class="lcars-helm__bar lcars-helm__bar--impulse" style="--segments:10;"><div class="lcars-helm__fill"></div></div>
          <span class="lcars-helm__throttle-label">Throttle</span>
          <div class="lcars-helm__bar lcars-helm__bar--throttle" style="--segments:20;"><div class="lcars-helm__fill"></div></div>
        </div>

        <!-- Warp core -->
        <div class="lcars-warpcore" style="height:14rem;"
             data-bind-class="lcars-warpcore--critical: redAlert">
          <div class="lcars-warpcore__plasma"></div>
          <div class="lcars-warpcore__core"></div>
        </div>

        <!-- Engineering: EPS + power -->
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:20rem;">
          <div class="lcars-conduit" style="width:20rem;" data-bind-style="--load: eps"><div class="lcars-conduit__plasma"></div></div>
          <div class="lcars-power" style="min-width:20rem;">
            <div class="lcars-power__row"><span class="lcars-power__label">Shields</span><div class="lcars-power__bar" data-bind-style="--value: shields"><div class="lcars-power__fill"></div></div><span class="lcars-power__value" data-bind-text="shields|pct">0</span></div>
            <div class="lcars-power__row"><span class="lcars-power__label">Weapons</span><div class="lcars-power__bar" data-bind-style="--value: weapons"><div class="lcars-power__fill"></div></div><span class="lcars-power__value" data-bind-text="weapons|pct">0</span></div>
            <div class="lcars-power__row"><span class="lcars-power__label">Sensors</span><div class="lcars-power__bar" data-bind-style="--value: sensors"><div class="lcars-power__fill"></div></div><span class="lcars-power__value" data-bind-text="sensors|pct">0</span></div>
          </div>
        </div>

        <!-- Comms waveform + signal -->
        <div style="display:flex;flex-direction:column;gap:0.5rem;min-width:18rem;">
          <div class="lcars-waveform lcars-waveform--accent" style="width:18rem;">
            ${Array.from({ length: 14 }, (_, i) => `<span class="lcars-waveform__bar" data-bind-style="--value: eq${i % 6}"></span>`).join('')}
          </div>
          <div class="lcars-comms" style="min-width:18rem;">
            <div class="lcars-comms__channel is-active">
              <span class="lcars-indicator__light"></span>
              <span class="lcars-comms__name">Starfleet Command</span>
              <div class="lcars-comms__signal" data-bind-style="--signal: signal"><div class="lcars-comms__signal-fill"></div></div>
            </div>
          </div>
          <span class="lcars-indicator lcars-indicator--online"
                data-bind-class="lcars-indicator--alert: redAlert; lcars-indicator--online: !redAlert">
            <span class="lcars-indicator__light"></span>
            <span class="lcars-indicator__label" data-bind-text="condition">Condition Green</span>
          </span>
        </div>

      </div>`;

    const store = createStore({
      hull: 100, shields: 98, power: 80, weapons: 60, sensors: 70,
      warp: 5, impulse: 50, throttle: 60, heading: 87, eps: 75, signal: 90,
      eq0: 40, eq1: 60, eq2: 30, eq3: 80, eq4: 50, eq5: 70,
      redAlert: false, condition: 'Condition Green',
    });

    // Derived state: condition + red alert from hull/shields.
    store.subscribe((keys) => {
      if (!keys.includes('hull') && !keys.includes('shields')) return;
      const st = store.state;
      const alert = st.hull < 45 || st.shields < 30;
      store.set({ redAlert: alert, condition: alert ? 'Red Alert' : 'Condition Green' });
    });

    unbind = bind(root, store);

    stop = simulate(store, {
      hull: { min: 25, max: 100, step: 9 },
      shields: { min: 10, max: 100, step: 12 },
      power: [40, 100], weapons: [30, 100], sensors: [40, 100],
      warp: { min: 1, max: 9, step: 0.5 },
      impulse: [20, 100], throttle: [20, 100],
      heading: { min: 0, max: 359, step: 12, wrap: true },
      eps: [30, 100], signal: [45, 100],
      eq0: [10, 100], eq1: [10, 100], eq2: [10, 100], eq3: [10, 100], eq4: [10, 100], eq5: [10, 100],
    }, 600);

    return root;
  },
};
