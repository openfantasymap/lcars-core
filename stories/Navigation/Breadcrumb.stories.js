import { cx } from '../_helpers.js';

export default {
  title: 'Navigation/Breadcrumb',
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'inline-radio', options: ['chevron', 'ticks'] },
  },
  args: { separator: 'chevron' },
  render: ({ separator }) => `
    <nav class="${cx('lcars-breadcrumb', separator === 'ticks' && 'lcars-breadcrumb--ticks')}">
      <a class="lcars-breadcrumb__crumb">USS Enterprise</a>
      <a class="lcars-breadcrumb__crumb">Deck 5</a>
      <a class="lcars-breadcrumb__crumb">Section 7</a>
      <span class="lcars-breadcrumb__crumb is-current">Main Engineering</span>
    </nav>`,
};

export const Playground = {};
