import { cx } from '../_helpers.js';

const ITEMS = ['Bridge', 'Engineering', 'Sickbay', 'Tactical', 'Science', 'Holodeck'];

export default {
  title: 'Navigation/Nav',
  tags: ['autodocs'],
  argTypes: {
    active: { control: { type: 'range', min: 0, max: 5, step: 1 }, description: 'active item index' },
    mono: { control: 'boolean' },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
  },
  args: { active: 0, mono: false, orientation: 'vertical' },
  render: ({ active, mono, orientation }) => `
    <nav class="${cx(
      'lcars-nav',
      mono && 'lcars-nav--mono',
      orientation === 'horizontal' && 'lcars-nav--horizontal'
    )}">
      ${ITEMS.map(
        (item, i) =>
          `<a class="${cx('lcars-nav__item', i === Number(active) && 'is-active')}">${item}</a>`
      ).join('')}
    </nav>`,
};

export const Playground = {};

export const FramedSidebar = {
  name: 'Framed sidebar',
  render: () => `
    <div style="display:flex;flex-direction:column;width:9.5rem;gap:0.25rem;">
      <div class="lcars-elbow left-bottom lcars-elbow--primary" style="width:9.5rem;height:4rem;">
        <span class="lcars-elbow__label">USS-1701</span>
      </div>
      <nav class="lcars-nav" style="width:9.5rem;">
        <a class="lcars-nav__item is-active">Bridge</a>
        <a class="lcars-nav__item">Engineering</a>
        <a class="lcars-nav__item">Sickbay</a>
        <a class="lcars-nav__item">Tactical</a>
        <span class="lcars-nav__spacer"></span>
        <a class="lcars-nav__item lcars-nav__item--danger">Eject Core</a>
      </nav>
      <div class="lcars-elbow left-top lcars-elbow--primary" style="width:9.5rem;height:4rem;"></div>
    </div>`,
};
