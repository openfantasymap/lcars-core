import { cx } from '../_helpers.js';

const SYSTEMS = [
  ['Warp Drive', 88, ''],
  ['Shields', 72, ''],
  ['Weapons', 64, 'is-warning'],
  ['Life Support', 100, ''],
  ['Sensors', 55, ''],
  ['Deflector', 28, 'is-critical'],
];

export default {
  title: 'Engineering/Power Distribution',
  tags: ['autodocs'],
  argTypes: {
    shields: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    weapons: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: { shields: 72, weapons: 64 },
  render: ({ shields, weapons }) => {
    const rows = SYSTEMS.map(([name, val, state]) => {
      let v = val;
      if (name === 'Shields') v = shields;
      if (name === 'Weapons') v = weapons;
      let cls = state;
      if (name === 'Shields') cls = v < 35 ? 'is-critical' : v < 60 ? 'is-warning' : '';
      if (name === 'Weapons') cls = v < 35 ? 'is-critical' : v < 60 ? 'is-warning' : '';
      return `
        <div class="${cx('lcars-power__row', cls)}">
          <span class="lcars-power__label">${name}</span>
          <div class="lcars-power__bar" style="--value:${v};"><div class="lcars-power__fill"></div></div>
          <span class="lcars-power__value">${Math.round(v)}%</span>
        </div>`;
    }).join('');
    return `
      <div class="lcars-power">
        <div class="lcars-power__header">
          <span class="lcars-power__title">Power Distribution</span>
          <span class="lcars-power__total">EPS · 1.21 GW</span>
        </div>
        ${rows}
      </div>`;
  },
};

export const Playground = {};
