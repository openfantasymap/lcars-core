import { cx, esc } from '../_helpers.js';

export default {
  title: 'Tools/Indicator',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    state: { control: 'inline-radio', options: ['online', 'standby', 'offline', 'alert'] },
  },
  args: { label: 'Warp Core', state: 'online' },
  render: ({ label, state }) => `
    <span class="${cx('lcars-indicator', `lcars-indicator--${state}`)}">
      <span class="lcars-indicator__light"></span>
      <span class="lcars-indicator__label">${esc(label)}</span>
    </span>`,
};

export const Playground = {};

export const Panel = {
  render: () => `
    <div class="lcars-column" style="gap:0.6rem;align-items:flex-start;">
      <span class="lcars-indicator lcars-indicator--online"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Life Support</span></span>
      <span class="lcars-indicator lcars-indicator--online"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Impulse Engines</span></span>
      <span class="lcars-indicator lcars-indicator--standby"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Transporters</span></span>
      <span class="lcars-indicator lcars-indicator--offline"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Holodeck 3</span></span>
      <span class="lcars-indicator lcars-indicator--alert"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Hull Breach</span></span>
    </div>`,
};
