// Shared helpers for LCARS stories.

// Colour roles that every component's `--<role>` modifier understands.
export const COLOR_ROLES = [
  'primary',
  'secondary',
  'tertiary',
  'accent',
  'muted',
  'danger',
  'warning',
  'success',
  'golden-tanoi',
  'periwinkle',
  'lilac',
  'hopbush',
  'pale-canary',
  'butterscotch',
  'tomato',
  'sunflower',
];

// A reusable argType for picking a colour role.
export const colorArgType = (name = 'Colour role') => ({
  control: 'select',
  options: COLOR_ROLES,
  description: name,
});

// Build a class list, dropping falsey entries.
export const cx = (...parts) => parts.filter(Boolean).join(' ');

// Escape user-provided text before dropping it into innerHTML.
export const esc = (s = '') =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
