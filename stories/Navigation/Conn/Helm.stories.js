import { cx } from '../../_helpers.js';

export default {
  title: 'Navigation/Conn/Helm Console',
  tags: ['autodocs'],
  argTypes: {
    warp: { control: { type: 'range', min: 0, max: 9, step: 0.1 } },
    impulse: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: '%' },
    throttle: { control: { type: 'range', min: 0, max: 100, step: 1 }, description: '%' },
    heading: { control: { type: 'range', min: 0, max: 359, step: 1 } },
  },
  args: { warp: 6.2, impulse: 75, throttle: 80, heading: 87 },
  render: ({ warp, impulse, throttle, heading }) => {
    const head = String(Math.round(heading)).padStart(3, '0');
    // Toy ETA: faster warp → shorter time.
    const mins = Math.max(1, Math.round(120 / (warp + 0.5)));
    const eta = `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}:00`;
    return `
      <div class="lcars-helm" style="--warp:${warp};--impulse:${impulse};--throttle:${throttle};">
        <div class="lcars-helm__head">
          <div class="lcars-helm__metric">
            <span class="lcars-helm__label">Warp Factor</span>
            <span class="lcars-helm__value">${warp.toFixed(1)}</span>
          </div>
          <div class="lcars-helm__metric" style="align-items:flex-end;">
            <span class="lcars-helm__label">Impulse</span>
            <span class="lcars-helm__value">${Math.round(impulse)}%</span>
          </div>
        </div>

        <div class="lcars-helm__bar lcars-helm__bar--warp" style="--segments:9;"><div class="lcars-helm__fill"></div></div>
        <div class="lcars-helm__bar lcars-helm__bar--impulse" style="--segments:10;"><div class="lcars-helm__fill"></div></div>

        <span class="lcars-helm__throttle-label">Throttle · ${Math.round(throttle)}%</span>
        <div class="lcars-helm__bar lcars-helm__bar--throttle" style="--segments:20;"><div class="lcars-helm__fill"></div></div>

        <div class="lcars-helm__readouts">
          <div class="lcars-readout"><span class="lcars-readout__label">Heading</span><span class="lcars-readout__value">${head}</span></div>
          <div class="lcars-readout lcars-readout--secondary"><span class="lcars-readout__label">Distance</span><span class="lcars-readout__value">4.2<small> ly</small></span></div>
          <div class="lcars-readout lcars-readout--success"><span class="lcars-readout__label">ETA</span><span class="lcars-readout__value">${eta}</span></div>
        </div>
      </div>`;
  },
};

export const Playground = {};
