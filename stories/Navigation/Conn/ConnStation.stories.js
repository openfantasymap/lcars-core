export default {
  title: 'Navigation/Conn/CONN Station',
  parameters: { layout: 'fullscreen' },
};

export const Showcase = {
  name: 'Helm showcase',
  render: () => `
    <div style="display:flex;flex-direction:column;gap:0.5rem;">
      <div class="lcars-bar-group lcars-bar-group--thick">
        <div class="lcars-bar cap-left lcars-bar--primary" style="min-width:4rem;"></div>
        <div class="lcars-bar fill lcars-bar--primary"><span class="lcars-bar__title">CONN · FLIGHT CONTROL</span></div>
        <div class="lcars-bar cap-right lcars-bar--butterscotch lcars-bar--decorated" style="min-width:5rem;"></div>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:1.5rem;align-items:flex-start;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
          <div class="lcars-compass" style="--heading:87;">
            <span class="lcars-compass__cardinal lcars-compass__cardinal--n">N</span>
            <span class="lcars-compass__cardinal lcars-compass__cardinal--e">E</span>
            <span class="lcars-compass__cardinal lcars-compass__cardinal--s">S</span>
            <span class="lcars-compass__cardinal lcars-compass__cardinal--w">W</span>
            <div class="lcars-compass__needle"></div>
            <div class="lcars-compass__hub"></div>
            <div class="lcars-compass__readout">087<small>MARK 21</small></div>
          </div>
        </div>

        <div class="lcars-scanner" style="--rate:3s;--scope-r:8rem;">
          <div class="lcars-scanner__grid"></div>
          <div class="lcars-scanner__sweep"></div>
          <span class="lcars-scanner__contact" style="--range:40;--bearing:30;"></span>
          <span class="lcars-scanner__contact lcars-scanner__contact--neutral" style="--range:65;--bearing:120;"></span>
          <span class="lcars-scanner__contact lcars-scanner__contact--hostile" style="--range:85;--bearing:210;"></span>
          <div class="lcars-scanner__hub"></div>
        </div>

        <div style="display:flex;flex-direction:column;gap:0.5rem;">
          <div class="lcars-starmap">
            <span class="lcars-starmap__star" style="--x:12;--y:22;"></span>
            <span class="lcars-starmap__star lcars-starmap__star--giant" style="--x:30;--y:70;"></span>
            <span class="lcars-starmap__star" style="--x:48;--y:30;"></span>
            <span class="lcars-starmap__star lcars-starmap__star--giant" style="--x:82;--y:55;"></span>
            <span class="lcars-starmap__star lcars-starmap__star--dim" style="--x:62;--y:80;"></span>
            <div class="lcars-starmap__course" style="--x:28;--y:55;--len:12.47rem;--angle:-17.6;"></div>
            <span class="lcars-starmap__ship" style="--x:28;--y:55;--rot:72.4;"></span>
            <span class="lcars-starmap__waypoint" style="--x:82;--y:28;"></span>
            <span class="lcars-starmap__label">SECTOR 001 · DEEP SPACE</span>
          </div>
        </div>

        <div class="lcars-helm" style="--warp:6.2;--impulse:75;--throttle:80;">
          <div class="lcars-helm__head">
            <div class="lcars-helm__metric"><span class="lcars-helm__label">Warp Factor</span><span class="lcars-helm__value">6.2</span></div>
            <div class="lcars-helm__metric" style="align-items:flex-end;"><span class="lcars-helm__label">Impulse</span><span class="lcars-helm__value">75%</span></div>
          </div>
          <div class="lcars-helm__bar lcars-helm__bar--warp" style="--segments:9;"><div class="lcars-helm__fill"></div></div>
          <div class="lcars-helm__bar lcars-helm__bar--impulse" style="--segments:10;"><div class="lcars-helm__fill"></div></div>
          <span class="lcars-helm__throttle-label">Throttle · 80%</span>
          <div class="lcars-helm__bar lcars-helm__bar--throttle" style="--segments:20;"><div class="lcars-helm__fill"></div></div>
          <div class="lcars-helm__readouts">
            <div class="lcars-readout"><span class="lcars-readout__label">Heading</span><span class="lcars-readout__value">087</span></div>
            <div class="lcars-readout lcars-readout--success"><span class="lcars-readout__label">ETA</span><span class="lcars-readout__value">00:18:00</span></div>
          </div>
        </div>
      </div>
    </div>`,
};
