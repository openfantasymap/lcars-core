import { cx } from '../_helpers.js';

const CHANNELS = [
  ['Starfleet Command', 96, true],
  ['USS Defiant', 78, false],
  ['Deep Space 9', 64, false],
  ['Bajoran Militia', 41, false],
  ['Emergency Channel', 12, false],
];

export default {
  title: 'Communications/Comms Panel',
  tags: ['autodocs'],
  argTypes: {
    active: { control: { type: 'range', min: 0, max: 4, step: 1 }, description: 'active channel index' },
    freq: { control: 'text' },
  },
  args: { active: 0, freq: '141.55 MHz' },
  render: ({ active, freq }) => `
    <div class="lcars-comms">
      <div class="lcars-comms__header">
        <span class="lcars-comms__title">Subspace Comms</span>
        <span class="lcars-comms__freq">${freq}</span>
      </div>
      ${CHANNELS.map(
        ([name, signal], i) => `
        <div class="${cx('lcars-comms__channel', i === Number(active) && 'is-active')}">
          <span class="lcars-indicator__light"></span>
          <span class="lcars-comms__name">${name}</span>
          <div class="lcars-comms__signal" style="--signal:${signal};"><div class="lcars-comms__signal-fill"></div></div>
        </div>`
      ).join('')}
    </div>`,
};

export const Playground = {};
