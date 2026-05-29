import { COLOR_ROLES, cx } from '../../_helpers.js';

const pad3 = (n) => String(Math.round(n)).padStart(3, '0');

export default {
  title: 'Navigation/Conn/Bearing Compass',
  tags: ['autodocs'],
  argTypes: {
    heading: { control: { type: 'range', min: 0, max: 359, step: 1 }, description: 'azimuth °' },
    mark: { control: { type: 'range', min: 0, max: 90, step: 1 }, description: 'elevation (mark)' },
    color: { control: 'select', options: COLOR_ROLES },
  },
  args: { heading: 87, mark: 21, color: 'primary' },
  render: ({ heading, mark, color }) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
      <div class="${cx('lcars-compass', `lcars-compass--${color}`)}" style="--heading:${heading};">
        <span class="lcars-compass__cardinal lcars-compass__cardinal--n">N</span>
        <span class="lcars-compass__cardinal lcars-compass__cardinal--e">E</span>
        <span class="lcars-compass__cardinal lcars-compass__cardinal--s">S</span>
        <span class="lcars-compass__cardinal lcars-compass__cardinal--w">W</span>
        <div class="lcars-compass__needle"></div>
        <div class="lcars-compass__hub"></div>
        <div class="lcars-compass__readout">${pad3(heading)}<small>MARK ${mark}</small></div>
      </div>
      <div class="lcars-textbox lcars-textbox--middle lcars-textbox--text-primary" style="min-width:0;">
        COURSE ${pad3(heading)} MARK ${mark}
      </div>
    </div>`,
};

export const Playground = {};
