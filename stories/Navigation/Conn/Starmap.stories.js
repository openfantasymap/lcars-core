import { cx } from '../../_helpers.js';

// Map footprint (matches the component default) for px-accurate vectors.
const W = 22;
const H = 14;

const STARS = [
  [12, 22, ''],
  [30, 70, 'lcars-starmap__star--giant'],
  [48, 30, ''],
  [62, 80, 'lcars-starmap__star--dim'],
  [82, 55, 'lcars-starmap__star--giant'],
  [90, 18, ''],
  [20, 50, 'lcars-starmap__star--dim'],
  [70, 40, ''],
];

const stars = () =>
  STARS.map(
    ([x, y, cls]) =>
      `<span class="${cx('lcars-starmap__star', cls)}" style="--x:${x};--y:${y};"></span>`
  ).join('');

export default {
  title: 'Navigation/Conn/Stellar Map',
  tags: ['autodocs'],
  argTypes: {
    shipX: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    shipY: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    wpX: { control: { type: 'range', min: 0, max: 100, step: 1 }, name: 'waypointX' },
    wpY: { control: { type: 'range', min: 0, max: 100, step: 1 }, name: 'waypointY' },
    sector: { control: 'text' },
  },
  args: { shipX: 28, shipY: 55, wpX: 82, wpY: 28, sector: 'SECTOR 001' },
  render: ({ shipX, shipY, wpX, wpY, sector }) => {
    // Course vector in rem (axes have different rem-per-percent).
    const dx = (wpX - shipX) * (W / 100);
    const dy = (wpY - shipY) * (H / 100);
    const len = Math.hypot(dx, dy).toFixed(2);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    const rot = (angle + 90).toFixed(1); // ship triangle points "up" by default
    return `
      <div class="lcars-starmap">
        ${stars()}
        <div class="lcars-starmap__course" style="--x:${shipX};--y:${shipY};--len:${len}rem;--angle:${angle.toFixed(1)};"></div>
        <span class="lcars-starmap__ship" style="--x:${shipX};--y:${shipY};--rot:${rot};"></span>
        <span class="lcars-starmap__waypoint" style="--x:${wpX};--y:${wpY};"></span>
        <span class="lcars-starmap__label">${sector}</span>
      </div>`;
  },
};

export const Playground = {};
