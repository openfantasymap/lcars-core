import { COLOR_ROLES, cx } from '../_helpers.js';

export default {
  title: 'Primitives/Bracket',
  tags: ['autodocs'],
  argTypes: {
    side: { control: 'inline-radio', options: ['full', 'left', 'right', 'top', 'bottom'] },
    color: { control: 'select', options: COLOR_ROLES },
    solid: { control: 'boolean' },
  },
  args: { side: 'full', color: 'primary', solid: false },
  render: ({ side, color, solid }) => `
    <div class="${cx('lcars-bracket', `lcars-bracket--${side}`, `lcars-bracket--${color}`, solid && 'lcars-bracket--solid')}"
         style="max-width:24rem;">
      <h4 style="margin:0 0 0.5rem;">Containment Field</h4>
      <p style="margin:0;">Plasma flow nominal. Pressure within tolerance. All conduits sealed.</p>
    </div>`,
};

export const Playground = {};

export const Sides = {
  render: () => `
    <div style="display:grid;grid-template-columns:repeat(2,minmax(12rem,1fr));gap:1rem;">
      ${['left', 'right', 'top', 'bottom']
        .map(
          (s) => `<div class="lcars-bracket lcars-bracket--${s} lcars-bracket--secondary">
            <strong>${s}</strong> bracket</div>`
        )
        .join('')}
    </div>`,
};
