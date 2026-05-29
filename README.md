# @openfantasymap/lcars-core

A reusable, themeable **LCARS** (Star Trek *Library Computer Access/Retrieval
System*) component library, authored in **Stylus** and documented in
**Storybook**.

It covers the full LCARS vocabulary:

| Category | Components |
|----------|-----------|
| **Primitives** | elbow, bar (h/v + end-caps + titles), bracket/frame, text box & readout |
| **Tools** | button, toggle switch, slider (h/v), keypad, status indicator, d-pad |
| **Systems** | radial gauge, bar graph / equalizer, data cascade, warp core, condition alert |
| **Navigation** | sidebar nav, tabs, breadcrumb |
| **Ship nav (CONN)** | bearing compass, sensor scanner (radar), stellar map, helm console |
| **Engineering** | EPS conduit, power distribution, master systems display (MSD) |
| **Communications** | comms/channel panel, signal waveform, incoming-hail banner |
| **Transporter** | emitter pad platform, materialization chamber (data-driven `--progress`) |
| **Overview** | general schematic from your own annotated SVG (status + live binding) |

Plus foundations: a themeable colour palette, condensed typography, a flex
layout kit, the LCARS sizing grid, and an app-shell scaffold.

---

## The `@openfantasymap/lcars-*` family

| Package | What | Folder |
|---------|------|--------|
| **`@openfantasymap/lcars-core`** | this package — themeable Stylus/CSS + optional data-binding runtime (`/js`) | `lcars-lib/` |
| **`@openfantasymap/lcars-react`** | React components + hooks (signals via `useSyncExternalStore`) | `lcars-react/` |
| **`@openfantasymap/lcars-ngx`** | Angular standalone components + signal store | `lcars-ngx/` |

The wrappers add nothing visual — they map framework props/signals onto this
package's CSS classes and `--lcars-*` variables, and bridge the core store. Use
the core directly for static HTML, Vue, Svelte, etc.

## Why Stylus + framework-agnostic CSS?

The library ships as **plain CSS classes** driven by **CSS custom properties**.
There is no *required* JS runtime and no framework dependency, so it drops into
Angular, React, Vue, Svelte, or static HTML alike. Stylus is the authoring
language; you can consume either the compiled CSS or the Stylus source (tokens +
mixins) to compose your own widgets.

## Install

```bash
npm install            # dev: pulls Storybook + Stylus
```

> **Node:** the toolchain targets Node ≥ 16 (Storybook 7 + Vite 4). This repo's
> sandbox runs Node 16.20.2.

## Usage

Wrap your UI in a `.lcars` element (this is where the theme variables and the
condensed font live), then use the component classes:

```html
<div class="lcars">
  <button class="lcars-button lcars-button--rounded lcars-button--primary">
    Engage
  </button>
</div>
```

### Option A — compiled CSS

```html
<link rel="stylesheet" href="node_modules/@openfantasymap/lcars-core/dist/lcars.css" />
```

`npm run build` produces `dist/lcars.css` (minified) and
`dist/lcars.expanded.css` (readable).

### Option B — Stylus source

```stylus
// your-app.styl
@import '@openfantasymap/lcars-core/src/index'
```

### Option C — compose with the tokens + mixins

```stylus
@import '@openfantasymap/lcars-core/src/lib/tokens'
@import '@openfantasymap/lcars-core/src/lib/mixins'

.my-corner
  lcars-elbow(left-bottom, 12rem, 5rem, 1.5rem, 9rem, 'accent')
```

## Theming

Every colour and metric is a CSS custom property on `.lcars`. Override any of
them on a `.lcars` ancestor — no recompile needed:

```html
<div class="lcars" style="--lcars-primary:#66ccff; --lcars-secondary:#cc3366;">
  …everything re-skins…
</div>
```

Semantic roles: `--lcars-primary`, `--lcars-secondary`, `--lcars-tertiary`,
`--lcars-accent`, `--lcars-muted`, `--lcars-danger`, `--lcars-warning`,
`--lcars-success`. Named Okuda stops are also exposed (`--lcars-golden-tanoi`,
`--lcars-periwinkle`, `--lcars-lilac`, `--lcars-hopbush`, …).

Components ship a `--<role>` modifier for each role, e.g.
`lcars-button--danger`, `lcars-gauge--periwinkle`, `lcars-bracket--accent`.

> **Drop-in for `lcars-mqtt`:** the existing Angular app themes via
> `--main-color` / `--secondary-color` / `--tertiary-color`. Those names are
> aliased to the new roles, so the library inherits that app's theme verbatim.

### Theme presets (eras & factions)

Add a theme class on the **same element** as `.lcars` to re-skin everything:

```html
<div class="lcars lcars-theme-klingon"> … </div>
```

| Family | Classes |
|--------|---------|
| Federation eras | `lcars-theme-tng` · `lcars-theme-picard` · `lcars-theme-ds9` · `lcars-theme-voyager` |
| Factions | `lcars-theme-klingon` · `lcars-theme-romulan` · `lcars-theme-cardassian` · `lcars-theme-ferengi` |

In Storybook, the **Theme** toolbar (top bar) switches the theme for every story.
Add your own by defining a `.lcars-theme-x` class that overrides the roles.

## Real-time data binding

The CSS is already data-driven through CSS custom properties (`--value`,
`--heading`, `--warp`, `--load`, …). The optional JS runtime keeps the DOM in
sync with a live feed — no framework, no dependencies:

```js
import { createStore, bind, simulate } from '@openfantasymap/lcars-core/js';

const store = createStore({ shields: 98, warp: 6.2, redAlert: false });
const unbind = bind(document.querySelector('.lcars'), store);

store.set('shields', 91);            // bound DOM updates instantly
store.set({ warp: 7.4, redAlert: true });
```

Annotate markup with `data-bind-*`:

```html
<div class="lcars-gauge" data-bind-style="--value: shields">
  <span class="lcars-gauge__value" data-bind-text="shields|round"></span>
</div>
<div class="lcars-helm" data-bind-style="--warp: warp; --impulse: impulse"></div>
<span class="lcars-indicator"
      data-bind-class="lcars-indicator--alert: redAlert; lcars-indicator--online: !redAlert">…</span>
```

- `data-bind-style="--prop: key|fmt; …"` — set CSS variables
- `data-bind-text="key|fmt"` — set text content
- `data-bind-class="className: key; other: !key"` — toggle classes (truthy / negated)
- `data-bind-attr="name: key|fmt"` — set attributes

Formatters: `round · fixed1 · fixed2 · pct · pad2 · pad3 · warp · upper` (extend
via `import { formatters } from '@openfantasymap/lcars-core/js'`).

**Wiring a real feed** (transport-agnostic — map any source to `store.set`):

```js
// MQTT (e.g. the sibling lcars-mqtt app)
const TOPICS = { 'ship/shields': 'shields', 'ship/heading': 'heading' };
client.on('message', (topic, buf) => store.set(TOPICS[topic], Number(buf)));

// or WebSocket / EventSource / poll → same store.set(...)
```

`simulate(store, spec)` drives random-walk values for demos and tests (see the
**Realtime/Bridge Ops** story).

## Overview — bring your own annotated SVG

The **Overview** component turns any SVG (deck plan, systems diagram, EPS grid…)
into a themed, interactive, data-driven schematic. Annotate elements in your SVG:

```xml
<rect data-lcars-region data-lcars-id="reactor" data-lcars-label="M/ARA Reactor"
      data-lcars-status="nominal"
      data-bind-attr="data-lcars-status: reactorState"
      x="170" y="105" width="80" height="50" rx="8"/>
```

| Annotation | Effect |
|------------|--------|
| `data-lcars-region` | mark as an interactive/status region |
| `data-lcars-id` | logical id (for `setStatus` / select events) |
| `data-lcars-label` | name → legend, tooltip, aria-label |
| `data-lcars-role="primary"` | static fill from a theme role (re-skins with the theme) |
| `data-lcars-status="critical"` | status fill: `nominal · warning · critical · offline` (critical pulses) |
| `data-bind-attr` / `data-bind-*` | optional live binding to a store |

Region colours are pure CSS (theme-aware); the interpreter reads the annotations,
uses the SVG's own `data-lcars-status` values as the **defaults**, builds a legend,
and makes regions keyboard-focusable + clickable.

```js
import { loadOverview, createStore } from '@openfantasymap/lcars-core/js';

const ov = await loadOverview(hostEl, svgMarkupOrUrl, {
  onSelect: (id, el) => console.log('selected', id),
});
ov.setStatus('reactor', 'critical');   // recolour a region
ov.statuses();                         // defaults read from the SVG

// Go live with one call — auto-seeds a store from the SVG's data-bind-attr
// annotations + their default statuses, binds it, and returns it:
const store = ov.connect();
store.set('reactorState', 'critical'); // the SVG updates instantly
// (or pass your own store: ov.connect(createStore({...})))
```

`loadOverview` accepts SVG markup, an `<svg>` element, or a `.svg` URL (fetched).
See the **Overview/Schematic** stories (interpreted + realtime).

## Storybook

```bash
npm run storybook        # dev server on http://localhost:6006
npm run build-storybook  # static build into storybook-static/
```

Every component has a **Playground** story with live controls (colour role,
size, state, value, label, …) plus example compositions. The renderer is
`@storybook/html-vite`, which compiles the Stylus source on the fly.

## Project layout

```
src/
  index.styl                 # single entry point (imports everything)
  lib/
    tokens.styl              # palette + metrics → CSS custom properties
    themes.styl              # era + faction theme presets (.lcars-theme-*)
    mixins.styl              # role(), lcars-elbow(), pill(), color-variants()…
    base.styl                # reset + typography (scoped to .lcars)
    layout.styl              # row / column / panel / app-shell
    grid.styl                # lcars-u-N / lcars-vu-N sizing units
    components/
      elbow · bar · bracket · textbox · button
      toggle · slider · keypad · indicator
      gauge · bargraph · datacascade · warpcore · alert
      nav · tabs · breadcrumb
      compass · scanner · starmap · helm    # ship navigation (CONN)
      conduit · power · msd                  # engineering
      comms · waveform · hail                # communications
      overview                               # annotated-SVG schematic
      transporter
  js/                        # optional data-driven runtime (no deps)
    store.js · bind.js · format.js · simulate.js · overview.js · index.js
stories/                     # one *.stories.js per component
.storybook/                  # main.js · preview.js · preview-head.html
dist/                        # built CSS (after `npm run build`)
```

## Scripts

| Script | Does |
|--------|------|
| `npm run build` | compile minified + expanded CSS into `dist/` |
| `npm run build:css` | minified `dist/lcars.css` only |
| `npm run watch:css` | recompile on change |
| `npm run storybook` | run Storybook dev server |
| `npm run build-storybook` | static Storybook build |

## Architecture notes

- **`.lcars` carries the theme** (custom properties) and the typographic reset.
  Component classes are **top-level** (`.lcars-button`, not `.lcars .lcars-button`)
  so they stay low-specificity and work even outside a `.lcars` wrapper — they
  just fall back to the built-in colour values via `var(--x, fallback)`.
- **Animations are pure CSS.** Warp core, equalizer, data cascade, alert klaxon
  and the transporter beam all run without JS.
- **Data-driven widgets** (slider, gauge, bar graph) are driven by a `--value`
  (0–100) custom property, so you bind one number from live telemetry.

## Releasing

Publishing is automated by `.github/workflows/publish.yml` → **npm (public)**,
with provenance. Add the repo secret **`NPM_TOKEN`** (an npm automation token),
then ship by pushing a version tag:

```bash
npm version patch            # or minor / major — updates package.json
git push --follow-tags       # tag v<version> triggers the publish workflow
```

The workflow guards that the tag matches `package.json`. Publish **core first**,
then the wrappers (`lcars-react` / `lcars-ngx`) — they build against the
published core.

## License

MIT.
