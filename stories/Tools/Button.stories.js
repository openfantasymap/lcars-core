import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Tools/Button',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    color: { control: 'select', options: COLOR_ROLES },
    shape: { control: 'inline-radio', options: ['default', 'rounded', 'left', 'square'] },
    inactive: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Engage',
    color: 'primary',
    shape: 'default',
    inactive: false,
    disabled: false,
  },
  render: ({ label, color, shape, inactive, disabled }) => `
    <button class="${cx(
      'lcars-button',
      `lcars-button--${color}`,
      shape !== 'default' && `lcars-button--${shape}`,
      inactive && 'lcars-button--inactive'
    )}"${disabled ? ' disabled' : ''}>${esc(label)}</button>`,
};

export const Playground = {};

export const Shapes = {
  render: () => `
    <div class="lcars-row wrap" style="gap:0.5rem;">
      <button class="lcars-button lcars-button--primary">Default</button>
      <button class="lcars-button lcars-button--rounded lcars-button--primary">Rounded</button>
      <button class="lcars-button lcars-button--left lcars-button--primary">Left</button>
      <button class="lcars-button lcars-button--square lcars-button--primary">Square</button>
    </div>`,
};

export const States = {
  render: () => `
    <div class="lcars-row wrap" style="gap:0.5rem;">
      <button class="lcars-button lcars-button--primary">Active</button>
      <button class="lcars-button lcars-button--inactive">Inactive</button>
      <button class="lcars-button lcars-button--primary" disabled>Disabled</button>
    </div>`,
};

export const Palette = {
  render: () =>
    `<div class="lcars-row wrap" style="gap:0.5rem;">${COLOR_ROLES.map(
      (c) => `<button class="lcars-button lcars-button--rounded lcars-button--${c}">${c}</button>`
    ).join('')}</div>`,
};

export const WithBadge = {
  name: 'With badge',
  render: () => `
    <button class="lcars-button lcars-button--secondary" style="min-width:11rem;">
      <span class="lcars-button__badge">7</span>Hails
    </button>`,
};
