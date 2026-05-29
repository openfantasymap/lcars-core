import { COLOR_ROLES, cx, esc } from '../_helpers.js';

export default {
  title: 'Primitives/Elbow',
  tags: ['autodocs'],
  argTypes: {
    corner: { control: 'inline-radio', options: ['left-bottom', 'left-top', 'right-bottom', 'right-top'] },
    color: { control: 'select', options: COLOR_ROLES },
    label: { control: 'text' },
    width: { control: { type: 'range', min: 8, max: 28, step: 0.5 }, description: 'overall width (rem)' },
    height: { control: { type: 'range', min: 3, max: 16, step: 0.5 }, description: 'overall height (rem)' },
    arm: { control: { type: 'range', min: 1.5, max: 12, step: 0.5 }, description: 'trunk width (rem) · --lcars-elbow-arm' },
    bar: { control: { type: 'range', min: 1, max: 6, step: 0.25 }, description: 'arm thickness (rem) · --lcars-elbow-bar' },
  },
  args: {
    corner: 'left-bottom',
    color: 'primary',
    label: 'DECK 5',
    width: 16,
    height: 5,
    arm: 7.5,
    bar: 1.5,
  },
  render: ({ corner, color, label, width, height, arm, bar }) => `
    <div class="${cx('lcars-elbow', corner, `lcars-elbow--${color}`)}"
         style="width:${width}rem;height:${height}rem;--lcars-elbow-arm:${arm}rem;--lcars-elbow-bar:${bar}rem;">
      ${label ? `<span class="lcars-elbow__label">${esc(label)}</span>` : ''}
    </div>`,
};

export const Playground = {};

export const AllCorners = {
  name: 'All corners',
  render: () => `
    <div style="display:grid;grid-template-columns:repeat(2,12rem);gap:1.5rem;">
      ${['left-top', 'right-top', 'left-bottom', 'right-bottom']
        .map(
          (c) => `<div class="lcars-elbow ${c} lcars-elbow--primary" style="width:11rem;height:5rem;">
            <span class="lcars-elbow__label">${c}</span></div>`
        )
        .join('')}
    </div>`,
};

export const Framed = {
  name: 'Framed corner (with bars)',
  render: () => `
    <div style="display:inline-flex;flex-direction:column;">
      <div style="display:flex;align-items:flex-end;">
        <div class="lcars-elbow left-bottom lcars-elbow--primary" style="width:11rem;height:5rem;">
          <span class="lcars-elbow__label">MAIN</span>
        </div>
        <div class="lcars-bar cap-right lcars-bar--primary" style="height:1.5rem;flex:1;min-width:18rem;align-self:flex-start;">
          <span class="lcars-bar__title">SYSTEMS STATUS</span>
        </div>
      </div>
    </div>`,
};
