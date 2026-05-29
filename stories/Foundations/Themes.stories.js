const FEDERATION = [
  ['tng', 'Federation · TNG'],
  ['picard', 'Federation · Picard'],
  ['ds9', 'Federation · DS9'],
  ['voyager', 'Federation · Voyager'],
];
const FACTIONS = [
  ['klingon', 'Klingon Empire'],
  ['romulan', 'Romulan Star Empire'],
  ['cardassian', 'Cardassian Union'],
  ['ferengi', 'Ferengi Alliance'],
];

// A self-contained sample console rendered inside a forced theme wrapper.
const card = ([id, title]) => `
  <div class="lcars lcars-theme-${id}" style="background:var(--lcars-bg);border-radius:0.75rem;padding:0.85rem;box-shadow:inset 0 0 0 2px var(--lcars-primary);">
    <div class="lcars-bar-group lcars-bar-group--thick" style="margin-bottom:0.6rem;">
      <div class="lcars-bar cap-left lcars-bar--primary" style="min-width:2.5rem;"></div>
      <div class="lcars-bar fill lcars-bar--primary"><span class="lcars-bar__title">${title}</span></div>
      <div class="lcars-bar cap-right lcars-bar--accent" style="min-width:3rem;"></div>
    </div>
    <div style="display:flex;gap:0.8rem;align-items:center;flex-wrap:wrap;">
      <div class="lcars-gauge lcars-gauge--primary lcars-gauge--sm" style="--value:72;">
        <span class="lcars-gauge__value">72<small>%</small></span>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.3rem;">
        <button class="lcars-button lcars-button--rounded lcars-button--primary">Engage</button>
        <button class="lcars-button lcars-button--rounded lcars-button--secondary">Scan</button>
        <button class="lcars-button lcars-button--rounded lcars-button--danger">Alert</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.35rem;">
        <span class="lcars-indicator lcars-indicator--online"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Online</span></span>
        <span class="lcars-indicator lcars-indicator--standby"><span class="lcars-indicator__light"></span><span class="lcars-indicator__label">Standby</span></span>
        <div class="lcars-slider lcars-slider--primary" style="--value:60;max-width:9rem;"><div class="lcars-slider__track"><div class="lcars-slider__fill"></div><div class="lcars-slider__knob"></div></div></div>
      </div>
    </div>
  </div>`;

const grid = (themes) => `
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(22rem,1fr));gap:1rem;">
    ${themes.map(card).join('')}
  </div>`;

export default {
  title: 'Foundations/Themes',
  parameters: { layout: 'fullscreen' },
};

export const FederationEras = {
  name: 'Federation eras',
  render: () => `<h2 class="lcars-text-primary">Federation eras</h2>
    <p class="lcars-text-muted">Add a theme class on the <code>.lcars</code> element, or use the <strong>Theme</strong> toolbar (top bar) to re-skin any story.</p>
    ${grid(FEDERATION)}`,
};

export const Factions = {
  name: 'Faction skins',
  render: () => `<h2 class="lcars-text-primary">Faction skins</h2>
    <p class="lcars-text-muted"><code>.lcars-theme-klingon</code> · <code>romulan</code> · <code>cardassian</code> · <code>ferengi</code></p>
    ${grid(FACTIONS)}`,
};
