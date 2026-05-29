import { cx } from '../_helpers.js';

export default {
  title: 'Transporter/Pad platform',
  tags: ['autodocs'],
  argTypes: {
    energizing: { control: 'boolean', description: 'Whole platform ripples' },
    active: { control: { type: 'range', min: 0, max: 6, step: 1 }, description: 'individually lit pads' },
  },
  args: { energizing: false, active: 0 },
  render: ({ energizing, active }) => `
    <div class="${cx('lcars-transporter-pad', energizing && 'lcars-transporter-pad--energizing')}">
      ${Array.from(
        { length: 6 },
        (_, i) =>
          `<div class="${cx('lcars-transporter-pad__pad', !energizing && i < Number(active) && 'is-active')}"></div>`
      ).join('')}
    </div>`,
};

export const Playground = {};

export const Energizing = {
  render: () => `<div class="lcars-transporter-pad lcars-transporter-pad--energizing">
    ${Array.from({ length: 6 }, () => '<div class="lcars-transporter-pad__pad"></div>').join('')}
  </div>`,
};
