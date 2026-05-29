// Pull in the whole compiled library straight from Stylus source.
// Vite compiles .styl on the fly because `stylus` is a dependency.
import '../src/index.styl';

// Global theme switcher — applies a .lcars-theme-* class to the story wrapper,
// so every component can be previewed in every theme from the toolbar.
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'LCARS theme / faction skin',
    defaultValue: 'tng',
    toolbar: {
      icon: 'paintbrush',
      dynamicTitle: true,
      items: [
        { value: 'tng', title: 'Federation · TNG' },
        { value: 'picard', title: 'Federation · Picard' },
        { value: 'ds9', title: 'Federation · DS9' },
        { value: 'voyager', title: 'Federation · Voyager' },
        { value: 'klingon', title: 'Klingon Empire' },
        { value: 'romulan', title: 'Romulan Star Empire' },
        { value: 'cardassian', title: 'Cardassian Union' },
        { value: 'ferengi', title: 'Ferengi Alliance' },
      ],
    },
  },
};

/** @type { import('@storybook/html').Preview } */
const preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: { color: /(color|background)$/i },
      expanded: true,
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Introduction',
          'Foundations',
          'Primitives',
          'Tools',
          'Systems',
          'Navigation',
          'Engineering',
          'Communications',
          'Transporter',
          'Overview',
          'Realtime',
        ],
      },
    },
  },
  // Every story renders inside a themed `.lcars` root so tokens + font apply.
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'tng';
      const el = document.createElement('div');
      el.className = 'lcars lcars-theme-' + theme;
      el.style.padding = '1.5rem';
      el.style.minHeight = '100vh';
      el.style.boxSizing = 'border-box';
      el.style.background = 'var(--lcars-bg)';
      const content = story();
      if (typeof content === 'string') {
        el.innerHTML = content;
      } else {
        el.appendChild(content);
      }
      return el;
    },
  ],
};

export default preview;
