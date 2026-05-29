import { cx } from '../_helpers.js';

const LINES = [
  ['SCAN 0x4F · NOMINAL', 'is-ok'],
  ['PWR GRID 7 · 98.4%', ''],
  ['SUBSPACE LINK · LOCKED', 'is-ok'],
  ['SENSOR SWEEP · COMPLETE', ''],
  ['DEFLECTOR · 1.21 GW', ''],
  ['WARN: PLASMA FLUX 0x9C', 'is-alert'],
  ['NAV BUFFER · 0x00A1', ''],
  ['CORE TEMP · 2412 K', ''],
  ['SHIELD HARMONIC · 4.7', 'is-ok'],
  ['COMM ARRAY · IDLE', ''],
];

const stream = () =>
  // duplicate the set so the scroll loops seamlessly
  [...LINES, ...LINES]
    .map(([t, c]) => `<span class="${cx('lcars-cascade__line', c)}">${t}</span>`)
    .join('');

export default {
  title: 'Systems/Data cascade',
  tags: ['autodocs'],
  argTypes: {
    fast: { control: 'boolean' },
    paused: { control: 'boolean' },
  },
  args: { fast: false, paused: false },
  render: ({ fast, paused }) => `
    <div class="${cx('lcars-cascade', fast && 'lcars-cascade--fast', paused && 'lcars-cascade--paused')}"
         style="max-width:24rem;">
      <div class="lcars-cascade__stream">${stream()}</div>
    </div>`,
};

export const Playground = {};
