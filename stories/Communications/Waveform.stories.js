import { COLOR_ROLES, cx } from '../_helpers.js';

export default {
  title: 'Communications/Waveform',
  tags: ['autodocs'],
  argTypes: {
    bars: { control: { type: 'range', min: 8, max: 48, step: 1 } },
    level: { control: { type: 'range', min: 5, max: 100, step: 1 }, description: 'amplitude %' },
    live: { control: 'boolean' },
    color: { control: 'select', options: COLOR_ROLES },
  },
  args: { bars: 28, level: 70, live: true, color: 'accent' },
  render: ({ bars, level, live, color }) => {
    // Deterministic carrier shape scaled by level.
    const vals = Array.from({ length: bars }, (_, i) => {
      const wave = Math.abs(Math.sin(i * 0.6)) * 0.7 + Math.abs(Math.sin(i * 0.21)) * 0.3;
      return Math.max(6, Math.round(wave * level));
    });
    return `
      <div class="${cx('lcars-waveform', `lcars-waveform--${color}`, live && 'lcars-waveform--live')}"
           style="width:26rem;">
        ${vals.map((v) => `<span class="lcars-waveform__bar" style="--value:${v};"></span>`).join('')}
      </div>`;
  },
};

export const Playground = {};
