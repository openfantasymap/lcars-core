import { cx, esc } from '../_helpers.js';

export default {
  title: 'Systems/Alert',
  tags: ['autodocs'],
  argTypes: {
    text: { control: 'text' },
    condition: { control: 'inline-radio', options: ['red', 'yellow', 'blue', 'green'] },
    flash: { control: 'boolean' },
    solid: { control: 'boolean' },
  },
  args: { text: 'Red Alert · Hull Breach Deck 7', condition: 'red', flash: true, solid: false },
  render: ({ text, condition, flash, solid }) => `
    <div class="${cx(
      'lcars-alert',
      `lcars-alert--${condition}`,
      flash && 'lcars-alert--flash',
      solid && 'lcars-alert--solid'
    )}" style="max-width:38rem;">
      <span class="lcars-alert__cap"></span>
      <span class="lcars-alert__text">${esc(text)}</span>
      <span class="lcars-alert__cap"></span>
    </div>`,
};

export const Playground = {};

export const Conditions = {
  render: () => `
    <div class="lcars-column" style="gap:0.75rem;max-width:38rem;">
      ${[
        ['red', 'Red Alert'],
        ['yellow', 'Yellow Alert'],
        ['blue', 'Blue Alert'],
        ['green', 'Condition Green'],
      ]
        .map(
          ([c, t]) => `<div class="lcars-alert lcars-alert--${c}">
            <span class="lcars-alert__cap"></span>
            <span class="lcars-alert__text">${t}</span>
            <span class="lcars-alert__cap"></span></div>`
        )
        .join('')}
    </div>`,
};
