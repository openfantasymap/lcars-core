import { cx } from '../_helpers.js';

const STATUS = ['is-nominal', 'is-warning', 'is-critical', 'is-offline'];

export default {
  title: 'Engineering/Master Systems Display',
  tags: ['autodocs'],
  argTypes: {
    saucer: { control: 'select', options: STATUS },
    hull: { control: 'select', options: STATUS },
    nacelleL: { control: 'select', options: STATUS },
    nacelleR: { control: 'select', options: STATUS },
    name: { control: 'text' },
  },
  args: {
    saucer: 'is-nominal',
    hull: 'is-warning',
    nacelleL: 'is-nominal',
    nacelleR: 'is-critical',
    name: 'USS ENTERPRISE · NCC-1701-D',
  },
  render: ({ saucer, hull, nacelleL, nacelleR, name }) => `
    <div class="lcars-msd">
      <div class="${cx('lcars-msd__section lcars-msd__saucer', saucer)}"></div>
      <div class="${cx('lcars-msd__section lcars-msd__neck', saucer)}"></div>
      <div class="${cx('lcars-msd__section lcars-msd__hull', hull)}"></div>
      <div class="lcars-msd__strut lcars-msd__strut--left"></div>
      <div class="lcars-msd__strut lcars-msd__strut--right"></div>
      <div class="${cx('lcars-msd__section lcars-msd__nacelle lcars-msd__nacelle--left', nacelleL)}"></div>
      <div class="${cx('lcars-msd__section lcars-msd__nacelle lcars-msd__nacelle--right', nacelleR)}"></div>
      <span class="lcars-msd__label">${name}</span>
    </div>`,
};

export const Playground = {};

export const AllNominal = {
  name: 'All nominal',
  args: { saucer: 'is-nominal', hull: 'is-nominal', nacelleL: 'is-nominal', nacelleR: 'is-nominal' },
};
