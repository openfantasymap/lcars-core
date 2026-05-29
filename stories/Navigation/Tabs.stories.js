import { cx } from '../_helpers.js';

const TABS = ['Tactical', 'Science', 'Comms', 'Ops'];

export default {
  title: 'Navigation/Tabs',
  tags: ['autodocs'],
  argTypes: {
    active: { control: { type: 'range', min: 0, max: 3, step: 1 } },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { active: 0, orientation: 'horizontal' },
  render: ({ active, orientation }) => `
    <div class="${cx('lcars-tabs', orientation === 'vertical' && 'lcars-tabs--vertical')}">
      ${TABS.map(
        (t, i) =>
          `<button class="${cx('lcars-tabs__tab', i === Number(active) && 'is-active')}">${t}</button>`
      ).join('')}
    </div>`,
};

export const Playground = {};

export const WithPanel = {
  name: 'With panel',
  render: () => `
    <div class="lcars-column" style="gap:0.25rem;max-width:30rem;">
      <div class="lcars-tabs">
        <button class="lcars-tabs__tab is-active">Tactical</button>
        <button class="lcars-tabs__tab">Science</button>
        <button class="lcars-tabs__tab">Comms</button>
      </div>
      <div class="lcars-panel">
        <h4 class="lcars-text-primary" style="margin-top:0;">Tactical</h4>
        <p style="margin:0;">Phaser banks charged. Torpedo bays loaded. Target lock available.</p>
      </div>
    </div>`,
};
