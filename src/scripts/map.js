import { EVENTS, LOCATIONS, LOC_COORDS } from '../data/events.js';
import { selectEvent } from './detail.js';

const NS = 'http://www.w3.org/2000/svg';

/** Render static location markers onto the SVG map. */
export function renderMapLocations() {
  const g = document.getElementById('map-locations');
  LOCATIONS.forEach(loc => {
    const c = LOC_COORDS[loc.id];
    if (!c) return;

    const group = document.createElementNS(NS, 'g');
    group.setAttribute('class', 'map-loc');
    group.setAttribute('data-locid', loc.id);
    group.innerHTML = `
      <circle class="outer" cx="${c.x}" cy="${c.y}" r="9"/>
      <circle class="inner" cx="${c.x}" cy="${c.y}" r="3"/>
      <text class="map-loc-label" x="${c.x + 12}" y="${c.y + 3}">${loc.name}</text>
    `;
    group.addEventListener('click', () => {
      const first = EVENTS.find(e => e.location_id === loc.id);
      if (first) selectEvent(first.id);
    });
    g.appendChild(group);
  });
}

/** Render event dots onto the SVG map. */
export function renderMapEvents() {
  const g = document.getElementById('map-events');
  EVENTS.forEach((ev, i) => {
    const c = LOC_COORDS[ev.location_id];
    if (!c) return;

    // Spread multiple events at the same location radially
    const sameLocBefore = EVENTS.slice(0, i).filter(e => e.location_id === ev.location_id).length;
    const angle = (sameLocBefore * 60) * (Math.PI / 180);
    const spread = sameLocBefore > 0 ? 18 : 0;
    const ex = c.x + (spread ? Math.cos(angle) * spread : 0);
    const ey = c.y + (spread ? Math.sin(angle) * spread : 0);

    const dot = document.createElementNS(NS, 'g');
    dot.setAttribute('class', 'map-event-dot');
    dot.setAttribute('data-id', ev.id);
    dot.setAttribute('data-type', ev.type);
    dot.innerHTML = `<circle cx="${ex}" cy="${ey}" r="5"/>`;
    dot.addEventListener('click', () => selectEvent(ev.id));
    g.appendChild(dot);
  });
}

/** Initialise the torch cursor and grime overlay mouse tracking. */
export function initTorchCursor() {
  const torchEl      = document.getElementById('torch-cursor');
  const grimeOverlay = document.getElementById('grime-overlay');
  const mapPanel     = document.getElementById('map-panel');
  const isMobile     = () => window.innerWidth <= 768;

  mapPanel.addEventListener('mousemove', e => {
    if (isMobile()) return;
    const rect = mapPanel.getBoundingClientRect();
    const pctX = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1) + '%';
    const pctY = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1) + '%';

    grimeOverlay.style.setProperty('--mx', pctX);
    grimeOverlay.style.setProperty('--my', pctY);

    torchEl.style.left    = e.clientX + 'px';
    torchEl.style.top     = e.clientY + 'px';
    torchEl.style.display = 'block';
  });

  mapPanel.addEventListener('mouseleave', () => {
    grimeOverlay.style.setProperty('--mx', '-200%');
    grimeOverlay.style.setProperty('--my', '-200%');
    torchEl.style.display = 'none';
  });
}
