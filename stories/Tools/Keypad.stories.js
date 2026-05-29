import { cx } from '../_helpers.js';

export default {
  title: 'Tools/Keypad',
  tags: ['autodocs'],
  argTypes: {
    cols: { control: { type: 'range', min: 2, max: 5, step: 1 } },
    mono: { control: 'boolean' },
  },
  args: { cols: 3, mono: false },
  render: ({ cols, mono }) => {
    const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
    return `
      <div class="${cx('lcars-keypad', mono && 'lcars-keypad--mono')}" style="--cols:${cols};">
        ${keys.map((k) => `<button class="lcars-keypad__key">${k}</button>`).join('')}
      </div>`;
  },
};

export const Playground = {};

export const CommandPad = {
  name: 'Command pad',
  render: () => `
    <div class="lcars-keypad" style="--cols:3;">
      <button class="lcars-keypad__key">SCAN</button>
      <button class="lcars-keypad__key">LOCK</button>
      <button class="lcars-keypad__key">HAIL</button>
      <button class="lcars-keypad__key">WARP</button>
      <button class="lcars-keypad__key">IMP</button>
      <button class="lcars-keypad__key">STOP</button>
      <button class="lcars-keypad__key lcars-keypad__key--wide">PHASERS</button>
      <button class="lcars-keypad__key lcars-keypad__key--accent">FIRE</button>
    </div>`,
};
