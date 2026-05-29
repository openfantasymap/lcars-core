import { cx } from '../_helpers.js';

export default {
  title: 'Systems/Bar graph',
  tags: ['autodocs'],
  argTypes: {
    bars: { control: { type: 'range', min: 3, max: 16, step: 1 } },
    mono: { control: 'boolean' },
    live: { control: 'boolean', description: 'Animate as an equalizer' },
  },
  args: { bars: 8, mono: false, live: false },
  render: ({ bars, mono, live }) => {
    // Deterministic pseudo-values so re-renders are stable.
    const vals = Array.from({ length: bars }, (_, i) => 25 + ((i * 37 + 13) % 70));
    return `
      <div class="${cx('lcars-bargraph', mono && 'lcars-bargraph--mono', live && 'lcars-bargraph--live')}"
           style="width:${Math.max(18, bars * 2.4)}rem;">
        ${vals.map((v) => `<div class="lcars-bargraph__bar" style="--value:${v};"></div>`).join('')}
      </div>`;
  },
};

export const Playground = {};

export const LiveEqualizer = {
  name: 'Live equalizer',
  render: () => `
    <div class="lcars-bargraph lcars-bargraph--live" style="width:26rem;">
      ${Array.from({ length: 12 }, (_, i) => 30 + ((i * 29 + 7) % 65))
        .map((v) => `<div class="lcars-bargraph__bar" style="--value:${v};"></div>`)
        .join('')}
    </div>`,
};
