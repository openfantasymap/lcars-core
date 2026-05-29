export default {
  title: 'Tools/D-pad',
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'range', min: 6, max: 20, step: 0.5 }, description: 'rem (--lcars-dpad-size)' },
  },
  args: { size: 12 },
  render: ({ size }) => {
    const wrap = document.createElement('div');
    wrap.style.display = 'flex';
    wrap.style.flexDirection = 'column';
    wrap.style.alignItems = 'flex-start';
    wrap.style.gap = '0.75rem';
    wrap.innerHTML = `
      <div class="lcars-dpad" style="--lcars-dpad-size:${size}rem">
        <svg viewBox="0 0 80 80" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path class="seg corner"   data-dir="NE" d="m47 33v-32.35c15.992 2.4474 29.977 16.417 32.424 32.35z"></path>
          <path class="seg corner"   data-dir="SW" d="m33 47v32.35c-15.992-2.4474-29.977-16.417-32.424-32.35z"></path>
          <path class="seg corner"   data-dir="SE" d="m47 47v32.35c15.992-2.4474 29.977-16.417 32.424-32.35z"></path>
          <path class="seg cardinal" data-dir="N"  d="m34 10h12v-9.5c-3.8785-0.47437-8.044-0.4824-12 0z"></path>
          <path class="seg cardinal" data-dir="W"  d="m10 46v-12h-9.5c-0.47437 3.8785-0.4824 8.044 0 12z"></path>
          <path class="seg cardinal" data-dir="E"  d="m70 34v12h9.5c0.47437-3.8785 0.4824-8.044 0-12z"></path>
          <path class="seg cardinal" data-dir="S"  d="m46 70h-12v9.5c3.8785 0.47437 8.044 0.4824 12 0z"></path>
          <path class="hub" d="m11 34v12h23v23h12v-23h23v-12h-23v-23h-12v23z"></path>
          <path class="seg corner"   data-dir="NW" d="m32.977 33v-32.35c-15.992 2.4474-29.977 16.417-32.424 32.35z"></path>
        </svg>
      </div>
      <div class="lcars-readout"><span class="lcars-readout__label">Heading</span><span class="lcars-readout__value">—</span></div>`;
    const value = wrap.querySelector('.lcars-readout__value');
    wrap.querySelectorAll('.seg').forEach((seg) =>
      seg.addEventListener('click', () => {
        value.textContent = seg.getAttribute('data-dir');
      })
    );
    return wrap;
  },
};

export const Playground = {};
