import { COLOR_ROLES } from '../_helpers.js';

const NAMED = [
  'orange', 'golden-tanoi', 'butterscotch', 'pale-canary', 'sunflower', 'tomato',
  'periwinkle', 'blue-bell', 'lilac', 'hopbush', 'ice',
  'red-alert', 'amber', 'okuda-green',
];

const SEMANTIC = ['primary', 'secondary', 'tertiary', 'accent', 'muted', 'danger', 'warning', 'success'];

const swatch = (token) => `
  <div style="display:flex;flex-direction:column;gap:0.25rem;">
    <div style="height:4.5rem;border-radius:0.5rem;background:var(--lcars-${token});box-shadow:inset 0 0 0 1px rgba(255,255,255,0.1);"></div>
    <span style="font-weight:700;text-transform:uppercase;letter-spacing:0.04em;font-size:0.8rem;">${token}</span>
    <span class="lcars-text-muted" style="font-size:0.75rem;">--lcars-${token}</span>
  </div>`;

const grid = (tokens) => `
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(8rem,1fr));gap:1rem;">
    ${tokens.map(swatch).join('')}
  </div>`;

export default {
  title: 'Foundations/Colours',
  parameters: { layout: 'fullscreen' },
};

export const SemanticRoles = {
  name: 'Semantic roles',
  render: () => `<h2 class="lcars-text-primary">Semantic roles</h2>
    <p class="lcars-text-muted">Use these for intent. They are what component <code>--variant</code> modifiers map to.</p>
    ${grid(SEMANTIC)}`,
};

export const NamedStops = {
  name: 'Named palette',
  render: () => `<h2 class="lcars-text-primary">Named LCARS palette</h2>
    <p class="lcars-text-muted">The canonical Okuda colour stops, exposed as <code>--lcars-*</code> custom properties.</p>
    ${grid(NAMED)}`,
};

export const Theming = {
  name: 'Re-theming',
  render: () => `<h2 class="lcars-text-primary">Runtime re-theming</h2>
    <p class="lcars-text-muted">Override any <code>--lcars-*</code> property on a <code>.lcars</code> ancestor to re-skin everything.</p>
    <div class="lcars-row wrap" style="gap:1rem;">
      <div class="lcars" style="--lcars-primary:#66ccff;padding:1rem;border-radius:0.5rem;background:#0a0a0a;">
        <p class="lcars-text-muted">--lcars-primary:#66ccff</p>
        <button class="lcars-button lcars-button--rounded">Blue theme</button>
      </div>
      <div class="lcars" style="--lcars-primary:#cc3366;padding:1rem;border-radius:0.5rem;background:#0a0a0a;">
        <p class="lcars-text-muted">--lcars-primary:#cc3366</p>
        <button class="lcars-button lcars-button--rounded">Magenta theme</button>
      </div>
      <div class="lcars" style="--lcars-primary:#99cc66;padding:1rem;border-radius:0.5rem;background:#0a0a0a;">
        <p class="lcars-text-muted">--lcars-primary:#99cc66</p>
        <button class="lcars-button lcars-button--rounded">Green theme</button>
      </div>
    </div>`,
};
