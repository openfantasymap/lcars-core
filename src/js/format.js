// =============================================================================
//  LCARS · Value formatters
// -----------------------------------------------------------------------------
//  Named formatters used by data-bind expressions, e.g. data-bind-text="warp|warp".
//  Extend at runtime:  import { formatters } from '@ofm/lcars-lib/js';
//                      formatters.kelvin = v => `${Math.round(v)} K`;
// =============================================================================

export const formatters = {
  raw: (v) => (v == null ? '' : v),
  round: (v) => String(Math.round(Number(v))),
  fixed1: (v) => Number(v).toFixed(1),
  fixed2: (v) => Number(v).toFixed(2),
  pct: (v) => `${Math.round(Number(v))}%`,
  pad2: (v) => String(Math.round(Number(v))).padStart(2, '0'),
  pad3: (v) => String(Math.round(Number(v))).padStart(3, '0'),
  warp: (v) => `Warp ${Number(v).toFixed(1)}`,
  upper: (v) => String(v == null ? '' : v).toUpperCase(),
};

export function format(value, name) {
  if (!name) return value == null ? '' : value;
  const f = formatters[name];
  return f ? f(value) : value == null ? '' : value;
}
