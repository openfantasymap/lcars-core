export default {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export const Headings = {
  render: () => `
    <h1>Heading 1 · Stardate</h1>
    <h2>Heading 2 · Subspace</h2>
    <h3>Heading 3 · Telemetry</h3>
    <h4>Heading 4 · Sensors</h4>
    <h5>Heading 5 · Logs</h5>
    <h6>Heading 6 · Notes</h6>
    <p>Body copy uses the same condensed face. The quick brown fox jumps over the lazy dog. 0123456789.</p>
    <p><a href="#">An inline link</a> within a paragraph.</p>`,
};

export const TextUtilities = {
  name: 'Text utilities',
  render: () => `
    <p class="lcars-text-primary">.lcars-text-primary</p>
    <p class="lcars-text-secondary">.lcars-text-secondary</p>
    <p class="lcars-text-tertiary">.lcars-text-tertiary</p>
    <p class="lcars-text-danger">.lcars-text-danger</p>
    <p class="lcars-text-muted">.lcars-text-muted</p>
    <p class="lcars-uppercase">.lcars-uppercase forces caps</p>
    <p class="lcars-mono">.lcars-mono · 0123456789 tabular</p>
    <p class="lcars-blink lcars-text-danger">.lcars-blink (klaxon)</p>`,
};
