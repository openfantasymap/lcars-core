import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Systems/Gauge',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    label: { control: 'text' },
    color: { control: 'select', options: COLOR_ROLES },
    size: { control: 'inline-radio', options: ['sm', 'default', 'lg'] },
  },
  args: { value: 68, label: 'Shields', color: 'primary', size: 'default' },
  render: ({ value, label, color, size }) => `
    <div class="${cx('lcars-gauge', `lcars-gauge--${color}`, size !== 'default' && `lcars-gauge--${size}`)}"
         style="--value:${value};">
      <span class="lcars-gauge__value">${value}<small>%</small></span>
      ${label ? `<span class="lcars-gauge__label">${esc(label)}</span>` : ''}
    </div>`,
};

export const Playground = {};

export const Cluster = {
  render: () => `
    <div class="lcars-row wrap" style="gap:1.5rem;align-items:center;">
      <div class="lcars-gauge lcars-gauge--success" style="--value:100;"><span class="lcars-gauge__value">100<small>%</small></span><span class="lcars-gauge__label">Hull</span></div>
      <div class="lcars-gauge lcars-gauge--primary" style="--value:82;"><span class="lcars-gauge__value">82<small>%</small></span><span class="lcars-gauge__label">Shields</span></div>
      <div class="lcars-gauge lcars-gauge--warning lcars-gauge--sm" style="--value:47;"><span class="lcars-gauge__value">47<small>%</small></span><span class="lcars-gauge__label">Power</span></div>
      <div class="lcars-gauge lcars-gauge--danger lcars-gauge--sm" style="--value:14;"><span class="lcars-gauge__value">14<small>%</small></span><span class="lcars-gauge__label">Antimatter</span></div>
    </div>`,
};
