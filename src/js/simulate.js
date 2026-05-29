// =============================================================================
//  LCARS · Telemetry simulator (demo / test utility)
// -----------------------------------------------------------------------------
//  Drives a store with random-walk values so you can SEE components update live
//  without a real feed. Not part of the runtime contract — purely for demos,
//  Storybook, and tests.
//
//    const stop = simulate(store, {
//      shields: [80, 100],            // [min, max]
//      warp:    { min: 1, max: 9, step: 0.3 },
//      heading: { min: 0, max: 359, step: 6, wrap: true },
//    }, 700);
//    // …later…
//    stop();
// =============================================================================

export function simulate(store, spec, intervalMs = 700) {
  const norm = {};
  for (const k in spec) {
    const s = spec[k];
    if (Array.isArray(s)) {
      norm[k] = { min: s[0], max: s[1], step: (s[1] - s[0]) / 10, wrap: false };
    } else {
      const min = s.min ?? 0;
      const max = s.max ?? 100;
      norm[k] = { min, max, step: s.step ?? (max - min) / 10, wrap: !!s.wrap };
    }
  }

  const tick = () => {
    const patch = {};
    for (const k in norm) {
      const { min, max, step, wrap } = norm[k];
      const cur = Number(store.get(k) ?? (min + max) / 2);
      let v = cur + (Math.random() * 2 - 1) * step;
      if (wrap) {
        const span = max - min;
        v = ((((v - min) % span) + span) % span) + min;
      } else {
        v = Math.max(min, Math.min(max, v));
      }
      patch[k] = v;
    }
    store.set(patch);
  };

  tick();
  const id = setInterval(tick, intervalMs);
  return () => clearInterval(id);
}
