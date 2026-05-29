import { cx, esc } from '../_helpers.js';

export default {
  title: 'Transporter/Chamber',
  tags: ['autodocs'],
  argTypes: {
    subject: { control: 'text' },
    state: { control: 'inline-radio', options: ['materialized', 'cycle', 'energizing', 'dematerializing', 'materializing'] },
    rate: { control: { type: 'range', min: 1, max: 5, step: 0.2 }, description: 'seconds' },
  },
  args: { subject: '◊', state: 'cycle', rate: 2.4 },
  render: ({ subject, state, rate }) => `
    <div class="${cx(
      'lcars-transporter',
      state === 'cycle' && 'lcars-transporter--cycle',
      state === 'energizing' && 'is-energizing',
      state === 'dematerializing' && 'is-dematerializing',
      state === 'materializing' && 'is-materializing'
    )}" style="--rate:${rate}s;">
      <div class="lcars-transporter__subject">${esc(subject)}</div>
      <div class="lcars-transporter__beam"></div>
    </div>`,
};

export const Playground = {};

// Interactive demo: an Energize button that beams the subject out and back.
export const InteractiveConsole = {
  name: 'Interactive console',
  render: () => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.gap = '1.5rem';
    wrap.style.alignItems = 'flex-start';
    wrap.innerHTML = `
      <div class="lcars-transporter" style="--rate:2.2s;">
        <div class="lcars-transporter__subject">🖖</div>
        <div class="lcars-transporter__beam"></div>
      </div>
      <div class="lcars-column" style="gap:0.5rem;">
        <button class="lcars-button lcars-button--rounded lcars-button--accent" data-action="energize">Energize</button>
        <button class="lcars-button lcars-button--rounded lcars-button--secondary" data-action="cycle">Toggle cycle</button>
        <span class="lcars-indicator lcars-indicator--standby" style="margin-top:0.5rem;">
          <span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Pattern Buffer</span>
        </span>
      </div>`;

    const chamber = wrap.querySelector('.lcars-transporter');
    const indicator = wrap.querySelector('.lcars-indicator');
    let beamedOut = false;

    wrap.querySelector('[data-action="energize"]').addEventListener('click', () => {
      chamber.classList.remove('lcars-transporter--cycle');
      if (!beamedOut) {
        chamber.classList.remove('is-materializing');
        chamber.classList.add('is-dematerializing');
        indicator.className = 'lcars-indicator lcars-indicator--alert';
        indicator.querySelector('.lcars-indicator__label').textContent = 'Dematerializing';
      } else {
        chamber.classList.remove('is-dematerializing');
        chamber.classList.add('is-materializing');
        indicator.className = 'lcars-indicator lcars-indicator--online';
        indicator.querySelector('.lcars-indicator__label').textContent = 'Materializing';
      }
      beamedOut = !beamedOut;
    });

    wrap.querySelector('[data-action="cycle"]').addEventListener('click', () => {
      chamber.classList.remove('is-dematerializing', 'is-materializing');
      chamber.classList.toggle('lcars-transporter--cycle');
    });

    return wrap;
  },
};
