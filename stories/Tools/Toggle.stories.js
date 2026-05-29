import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Tools/Toggle',
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    color: { control: 'select', options: COLOR_ROLES },
    disabled: { control: 'boolean' },
  },
  args: { label: 'Deflector Dish', checked: true, color: 'success', disabled: false },
  render: ({ label, checked, color, disabled }) => `
    <label class="${cx('lcars-toggle', `lcars-toggle--${color}`, disabled && 'is-disabled')}">
      <input type="checkbox" class="lcars-toggle__input"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}>
      <span class="lcars-toggle__track"><span class="lcars-toggle__knob"></span></span>
      <span class="lcars-toggle__label">${esc(label)}</span>
    </label>`,
};

export const Playground = {};

export const Stack = {
  render: () => `
    <div class="lcars-column" style="gap:0.75rem;align-items:flex-start;">
      <label class="lcars-toggle lcars-toggle--success">
        <input type="checkbox" class="lcars-toggle__input" checked>
        <span class="lcars-toggle__track"><span class="lcars-toggle__knob"></span></span>
        <span class="lcars-toggle__label">Inertial Dampers</span>
      </label>
      <label class="lcars-toggle lcars-toggle--warning">
        <input type="checkbox" class="lcars-toggle__input" checked>
        <span class="lcars-toggle__track"><span class="lcars-toggle__knob"></span></span>
        <span class="lcars-toggle__label">Tractor Beam</span>
      </label>
      <label class="lcars-toggle lcars-toggle--danger">
        <input type="checkbox" class="lcars-toggle__input">
        <span class="lcars-toggle__track"><span class="lcars-toggle__knob"></span></span>
        <span class="lcars-toggle__label">Self Destruct</span>
      </label>
    </div>`,
};
