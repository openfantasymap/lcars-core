import { COLOR_ROLES, cx } from '../_helpers.js';

export default {
  title: 'Tools/Slider',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    color: { control: 'select', options: COLOR_ROLES },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    showValue: { control: 'boolean' },
  },
  args: { value: 72, color: 'primary', orientation: 'horizontal', showValue: true },
  render: ({ value, color, orientation, showValue }) => `
    <div class="${cx(
      'lcars-slider',
      orientation === 'vertical' && 'lcars-slider--vertical',
      `lcars-slider--${color}`
    )}" style="--value:${value};${orientation === 'horizontal' ? 'max-width:24rem;' : ''}">
      <div class="lcars-slider__track">
        <div class="lcars-slider__fill"></div>
        <div class="lcars-slider__knob"></div>
      </div>
      ${showValue && orientation === 'horizontal' ? `<span class="lcars-slider__value">${value}%</span>` : ''}
    </div>`,
};

export const Playground = {};

export const VerticalBank = {
  name: 'Vertical bank',
  render: () => `
    <div style="display:flex;gap:1.25rem;align-items:flex-end;">
      ${[80, 55, 30, 95, 65]
        .map(
          (v, i) =>
            `<div class="lcars-slider lcars-slider--vertical lcars-slider--${
              ['primary', 'secondary', 'tertiary', 'butterscotch', 'hopbush'][i]
            }" style="--value:${v};"><div class="lcars-slider__track"><div class="lcars-slider__fill"></div><div class="lcars-slider__knob"></div></div></div>`
        )
        .join('')}
    </div>`,
};
