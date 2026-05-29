export default {
  title: 'Introduction',
  parameters: {
    layout: 'fullscreen',
    options: { showPanel: false },
  },
};

export const Welcome = {
  name: 'Welcome',
  render: () => `
    <div class="lcars-app" style="min-height:auto;grid-template-rows:auto auto;">
      <aside class="lcars-app__sidebar">
        <div class="lcars-elbow left-bottom lcars-elbow--primary" style="width:9.5rem;height:5rem;">
          <span class="lcars-elbow__label">LCARS</span>
        </div>
        <nav class="lcars-nav" style="flex:1;">
          <a class="lcars-nav__item is-active">Primitives</a>
          <a class="lcars-nav__item">Tools</a>
          <a class="lcars-nav__item">Systems</a>
          <a class="lcars-nav__item">Navigation</a>
          <a class="lcars-nav__item lcars-nav__item--accent">Transporter</a>
        </nav>
        <div class="lcars-elbow left-top lcars-elbow--tertiary" style="width:9.5rem;height:5rem;"></div>
      </aside>

      <header class="lcars-app__header">
        <div class="lcars-bar-group lcars-bar-group--thick">
          <div class="lcars-bar cap-left lcars-bar--primary"></div>
          <div class="lcars-bar fill lcars-bar--primary">
            <span class="lcars-bar__title">@ofm/lcars-lib</span>
          </div>
          <div class="lcars-bar cap-right lcars-bar--accent lcars-bar--decorated" style="min-width:5rem;"></div>
        </div>
      </header>

      <main class="lcars-app__content">
        <h1 class="lcars-text-primary">LCARS Component Library</h1>
        <p>
          A reusable, themeable component kit for building
          <strong>Library Computer Access/Retrieval System</strong> interfaces.
          Authored in <strong>Stylus</strong>, documented here in Storybook.
        </p>

        <div class="lcars-row wrap" style="margin:1rem 0;gap:1rem;">
          <div class="lcars-readout"><span class="lcars-readout__label">Components</span><span class="lcars-readout__value">19</span></div>
          <div class="lcars-readout lcars-readout--secondary"><span class="lcars-readout__label">Categories</span><span class="lcars-readout__value">6</span></div>
          <div class="lcars-readout lcars-readout--tertiary"><span class="lcars-readout__label">Styling</span><span class="lcars-readout__value">Stylus</span></div>
          <div class="lcars-readout lcars-readout--success"><span class="lcars-readout__label">Theming</span><span class="lcars-readout__value">CSS vars</span></div>
        </div>

        <h3 class="lcars-text-secondary">Categories</h3>
        <div class="lcars-row wrap" style="gap:0.5rem;">
          <span class="lcars-button lcars-button--rounded lcars-button--primary">Primitives</span>
          <span class="lcars-button lcars-button--rounded lcars-button--secondary">Tools</span>
          <span class="lcars-button lcars-button--rounded lcars-button--tertiary">Systems</span>
          <span class="lcars-button lcars-button--rounded lcars-button--butterscotch">Navigation</span>
          <span class="lcars-button lcars-button--rounded lcars-button--accent">Transporter</span>
        </div>

        <h3 class="lcars-text-secondary" style="margin-top:1.5rem;">Quick start</h3>
        <pre class="lcars-panel" style="white-space:pre-wrap;font-family:monospace;color:var(--lcars-pale-canary);">// Stylus
@import '@ofm/lcars-lib/src/index'

// or compiled CSS
&lt;link rel="stylesheet" href="@ofm/lcars-lib/dist/lcars.css"&gt;

// wrap your UI so the theme + font apply
&lt;div class="lcars"&gt; … &lt;/div&gt;</pre>

        <p class="lcars-text-muted">Pick a story from the sidebar to explore each component with live controls.</p>
      </main>
    </div>
  `,
};
