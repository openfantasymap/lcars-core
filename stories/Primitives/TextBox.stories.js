import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Primitives/Text box & Readout',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    size: { control: 'inline-radio', options: ['default', 'big', 'large', 'huge'] },
    align: { control: 'inline-radio', options: ['left', 'center', 'right'] },
    textColor: { control: 'select', options: ['none', ...COLOR_ROLES] },
  },
  args: { text: 'STARDATE 47988.1', size: 'default', align: 'left', textColor: 'none' },
  render: ({ text, size, align, textColor }) => `
    <div class="${cx(
      'lcars-textbox',
      size !== 'default' && `lcars-textbox--${size}`,
      align === 'center' && 'lcars-textbox--center',
      align === 'right' && 'lcars-textbox--right',
      'lcars-textbox--middle',
      textColor !== 'none' && `lcars-textbox--text-${textColor}`
    )}">${esc(text)}</div>`,
};

export const Playground = {};

export const Readouts = {
  render: () => `
    <div class="lcars-row wrap" style="gap:1rem;">
      <div class="lcars-readout"><span class="lcars-readout__label">Shields</span><span class="lcars-readout__value">98%</span></div>
      <div class="lcars-readout lcars-readout--success"><span class="lcars-readout__label">Hull</span><span class="lcars-readout__value">100%</span></div>
      <div class="lcars-readout lcars-readout--warning"><span class="lcars-readout__label">Power</span><span class="lcars-readout__value">62%</span></div>
      <div class="lcars-readout lcars-readout--danger lcars-readout--right"><span class="lcars-readout__label">Antimatter</span><span class="lcars-readout__value">11%</span></div>
    </div>`,
};

export const Sizes = {
  render: () => `
    <div class="lcars-column" style="gap:0.5rem;">
      <div class="lcars-textbox lcars-textbox--middle">DEFAULT</div>
      <div class="lcars-textbox lcars-textbox--big lcars-textbox--middle">BIG</div>
      <div class="lcars-textbox lcars-textbox--large lcars-textbox--middle">LARGE</div>
      <div class="lcars-textbox lcars-textbox--huge lcars-textbox--middle lcars-textbox--text-primary">47988</div>
    </div>`,
};
