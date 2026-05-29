import { cx } from '../_helpers.js';

export default {
  title: 'Systems/Warp core',
  tags: ['autodocs'],
  argTypes: {
    state: { control: 'inline-radio', options: ['running', 'offline', 'critical'] },
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal'] },
    rate: { control: { type: 'range', min: 0.3, max: 3, step: 0.1 }, description: 'seconds per pulse' },
  },
  args: { state: 'running', orientation: 'vertical', rate: 1.5 },
  render: ({ state, orientation, rate }) => `
    <div class="${cx(
      'lcars-warpcore',
      state === 'offline' && 'lcars-warpcore--offline',
      state === 'critical' && 'lcars-warpcore--critical',
      orientation === 'horizontal' && 'lcars-warpcore--horizontal'
    )}" style="--rate:${rate}s;">
      <div class="lcars-warpcore__plasma"></div>
      <div class="lcars-warpcore__core"></div>
    </div>`,
};

export const Playground = {};

export const Conditions = {
  render: () => `
    <div style="display:flex;gap:2rem;align-items:center;">
      <div style="text-align:center;">
        <div class="lcars-warpcore"><div class="lcars-warpcore__plasma"></div><div class="lcars-warpcore__core"></div></div>
        <p class="lcars-text-muted">running</p>
      </div>
      <div style="text-align:center;">
        <div class="lcars-warpcore lcars-warpcore--critical"><div class="lcars-warpcore__plasma"></div><div class="lcars-warpcore__core"></div></div>
        <p class="lcars-text-danger">critical</p>
      </div>
      <div style="text-align:center;">
        <div class="lcars-warpcore lcars-warpcore--offline"><div class="lcars-warpcore__plasma"></div><div class="lcars-warpcore__core"></div></div>
        <p class="lcars-text-muted">offline</p>
      </div>
    </div>`,
};
