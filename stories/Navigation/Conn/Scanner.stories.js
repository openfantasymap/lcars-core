import { cx } from '../../_helpers.js';

const TYPES = ['', 'lcars-scanner__contact--hostile', 'lcars-scanner__contact--neutral'];

// Deterministic contacts so re-renders are stable.
const contacts = (n) =>
  Array.from({ length: n }, (_, i) => {
    const range = 25 + ((i * 47 + 11) % 70);
    const bearing = (i * 67 + 23) % 360;
    const type = TYPES[(i * 2 + 1) % 3];
    return `<span class="${cx('lcars-scanner__contact', type)}" style="--range:${range};--bearing:${bearing};"></span>`;
  }).join('');

export default {
  title: 'Navigation/Conn/Sensor Scanner',
  tags: ['autodocs'],
  argTypes: {
    rate: { control: { type: 'range', min: 1, max: 8, step: 0.5 }, description: 'sweep period (s)' },
    contactCount: { control: { type: 'range', min: 0, max: 12, step: 1 } },
    size: { control: { type: 'range', min: 6, max: 12, step: 0.5 }, description: 'radius (rem)' },
  },
  args: { rate: 3, contactCount: 5, size: 8 },
  render: ({ rate, contactCount, size }) => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.75rem;">
      <div class="lcars-scanner" style="--rate:${rate}s;--scope-r:${size}rem;">
        <div class="lcars-scanner__grid"></div>
        <div class="lcars-scanner__sweep"></div>
        ${contacts(contactCount)}
        <div class="lcars-scanner__hub"></div>
      </div>
      <div class="lcars-readout lcars-readout--success" style="min-width:0;">
        <span class="lcars-readout__label">Contacts</span>
        <span class="lcars-readout__value">${contactCount}</span>
      </div>
    </div>`,
};

export const Playground = {};

export const ThreatBoard = {
  name: 'Threat board',
  render: () => `
    <div class="lcars-scanner" style="--rate:2.4s;--scope-r:9rem;">
      <div class="lcars-scanner__grid"></div>
      <div class="lcars-scanner__sweep"></div>
      <span class="lcars-scanner__contact" style="--range:40;--bearing:30;"></span>
      <span class="lcars-scanner__contact lcars-scanner__contact--neutral" style="--range:65;--bearing:120;"></span>
      <span class="lcars-scanner__contact lcars-scanner__contact--hostile" style="--range:85;--bearing:200;"></span>
      <span class="lcars-scanner__contact lcars-scanner__contact--hostile" style="--range:55;--bearing:300;"></span>
      <div class="lcars-scanner__hub"></div>
    </div>`,
};
