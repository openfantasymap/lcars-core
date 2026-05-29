// =============================================================================
//  @ofm/lcars-lib · JS runtime (optional)
// -----------------------------------------------------------------------------
//  Dependency-free helpers that make the CSS components data-driven and live.
//  The CSS works without any of this; import it only when you want to bind a
//  data feed to the DOM.
//
//    import { createStore, bind, simulate, formatters } from '@ofm/lcars-lib/js';
//
//  Wiring a real feed (e.g. MQTT) is just: map messages → store.set(...).
//    client.on('message', (topic, buf) => store.set(TOPIC_MAP[topic], +buf));
// =============================================================================

export { createStore } from './store.js';
export { bind } from './bind.js';
export { simulate } from './simulate.js';
export { format, formatters } from './format.js';
export { loadOverview } from './overview.js';
