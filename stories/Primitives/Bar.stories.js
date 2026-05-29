import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Primitives/Bar',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    color: { control: 'select', options: COLOR_ROLES },
    thick: { control: 'boolean' },
    decorated: { control: 'boolean' },
    titleSide: { control: 'inline-radio', options: ['right', 'left'] },
  },
  args: {
    title: 'SENSORS',
    color: 'primary',
    thick: true,
    decorated: true,
    titleSide: 'right',
  },
  render: ({ title, color, thick, decorated, titleSide }) => `
    <div class="${cx('lcars-bar-group', thick && 'lcars-bar-group--thick')}">
      <div class="${cx('lcars-bar', 'cap-left', `lcars-bar--${color}`)}" style="min-width:4rem;"></div>
      <div class="${cx('lcars-bar', 'fill', `lcars-bar--${color}`)}">
        ${title ? `<span class="${cx('lcars-bar__title', titleSide === 'left' && 'left')}">${esc(title)}</span>` : ''}
      </div>
      <div class="${cx('lcars-bar', 'cap-right', `lcars-bar--${color}`, decorated && 'lcars-bar--decorated')}" style="min-width:5rem;"></div>
    </div>`,
};

export const Playground = {};

export const Vertical = {
  render: () => `
    <div style="display:flex;gap:0.75rem;height:16rem;">
      <div class="lcars-bar-vertical cap-top cap-bottom lcars-bar-vertical--primary"></div>
      <div class="lcars-bar-vertical cap-top cap-bottom lcars-bar-vertical--secondary"></div>
      <div class="lcars-bar-vertical cap-top cap-bottom lcars-bar-vertical--tertiary"></div>
      <div class="lcars-bar-vertical cap-top cap-bottom lcars-bar-vertical--butterscotch"></div>
    </div>`,
};

export const SegmentedRow = {
  name: 'Segmented row',
  render: () => `
    <div class="lcars-bar-group lcars-bar-group--thick">
      <div class="lcars-bar cap-left lcars-bar--primary" style="min-width:3rem;"></div>
      <div class="lcars-bar lcars-bar--secondary" style="min-width:6rem;"></div>
      <div class="lcars-bar fill lcars-bar--tertiary"><span class="lcars-bar__title">NAV CONTROL</span></div>
      <div class="lcars-bar lcars-bar--butterscotch" style="min-width:4rem;"></div>
      <div class="lcars-bar cap-right lcars-bar--primary lcars-bar--decorated" style="min-width:5rem;"></div>
    </div>`,
};
