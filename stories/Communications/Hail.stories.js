import { cx, esc } from '../_helpers.js';

export default {
  title: 'Communications/Hail',
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    subtitle: { control: 'text' },
    variant: { control: 'inline-radio', options: ['incoming', 'secure', 'priority'] },
    actions: { control: 'boolean' },
  },
  args: {
    title: 'Incoming Transmission',
    subtitle: 'USS Defiant · Priority One',
    variant: 'incoming',
    actions: true,
  },
  render: ({ title, subtitle, variant, actions }) => `
    <div class="${cx('lcars-hail', `lcars-hail--${variant}`)}" style="max-width:34rem;">
      <span class="lcars-hail__icon"></span>
      <div class="lcars-hail__body">
        <span class="lcars-hail__title">${esc(title)}</span>
        <span class="lcars-hail__subtitle">${esc(subtitle)}</span>
      </div>
      ${
        actions
          ? `<div class="lcars-hail__actions">
              <button class="lcars-button lcars-button--rounded lcars-button--success">Accept</button>
              <button class="lcars-button lcars-button--rounded lcars-button--danger">Reject</button>
            </div>`
          : ''
      }
    </div>`,
};

export const Playground = {};

export const Variants = {
  render: () => `
    <div class="lcars-column" style="gap:0.75rem;max-width:34rem;">
      <div class="lcars-hail lcars-hail--incoming">
        <span class="lcars-hail__icon"></span>
        <div class="lcars-hail__body"><span class="lcars-hail__title">Incoming Hail</span><span class="lcars-hail__subtitle">Unidentified vessel</span></div>
      </div>
      <div class="lcars-hail lcars-hail--secure">
        <span class="lcars-hail__icon"></span>
        <div class="lcars-hail__body"><span class="lcars-hail__title">Secure Channel</span><span class="lcars-hail__subtitle">Encrypted · Starfleet Intelligence</span></div>
      </div>
      <div class="lcars-hail lcars-hail--priority">
        <span class="lcars-hail__icon"></span>
        <div class="lcars-hail__body"><span class="lcars-hail__title">Priority One</span><span class="lcars-hail__subtitle">Fleet-wide distress</span></div>
      </div>
    </div>`,
};
