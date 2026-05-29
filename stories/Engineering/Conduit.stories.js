import { cx } from '../_helpers.js';

export default {
  title: 'Engineering/EPS Conduit',
  tags: ['autodocs'],
  argTypes: {
    load: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    rate: { control: { type: 'range', min: 0.3, max: 3, step: 0.1 }, description: 'flow period (s)' },
    state: { control: 'inline-radio', options: ['normal', 'critical', 'offline'] },
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
  args: { load: 70, rate: 1.2, state: 'normal', orientation: 'horizontal' },
  render: ({ load, rate, state, orientation }) => `
    <div class="${cx(
      'lcars-conduit',
      state === 'critical' && 'lcars-conduit--critical',
      state === 'offline' && 'lcars-conduit--offline',
      orientation === 'vertical' && 'lcars-conduit--vertical'
    )}" style="--load:${load};--rate:${rate}s;${orientation === 'horizontal' ? 'width:24rem;' : ''}">
      <div class="lcars-conduit__plasma"></div>
    </div>`,
};

export const Playground = {};

export const Grid = {
  name: 'EPS grid',
  render: () => `
    <div class="lcars-column" style="gap:0.5rem;max-width:24rem;">
      ${[90, 70, 45, 30]
        .map(
          (l, i) =>
            `<div class="${i === 3 ? 'lcars-conduit lcars-conduit--critical' : 'lcars-conduit'}" style="--load:${l};width:24rem;"><div class="lcars-conduit__plasma"></div></div>`
        )
        .join('')}
    </div>`,
};
