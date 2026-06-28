import { EVENTS, LOC_MAP } from '../data/events.js';

const TYPE_COLORS = {
  founding:  { bg: 'rgba(29,158,117,0.15)',  color: '#5dcaa5' },
  discovery: { bg: 'rgba(186,117,23,0.15)',  color: '#e8c87a' },
  ritual:    { bg: 'rgba(127,119,221,0.15)', color: '#af9ec4' },
  cultural:  { bg: 'rgba(61,106,112,0.15)',  color: '#7ab8c0' },
  collapse:  { bg: 'rgba(194,82,32,0.15)',   color: '#c25220' },
};

let activeId = null;

/** Select and display an event by id. */
export function selectEvent(id) {
  activeId = id;
  const ev = EVENTS.find(e => e.id === id);
  if (!ev) return;

  // Highlight timeline item
  document.querySelectorAll('.tl-item').forEach(el => el.classList.remove('active'));
  const tlItem = document.querySelector(`.tl-item[data-id="${id}"]`);
  if (tlItem) {
    tlItem.classList.add('active');
    tlItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    tlItem.classList.add('tap-glow');
    setTimeout(() => tlItem.classList.remove('tap-glow'), 600);
  }

  // Highlight map location
  document.querySelectorAll('.map-loc').forEach(el => el.classList.remove('active-loc'));
  const locEl = document.querySelector(`.map-loc[data-locid="${ev.location_id}"]`);
  if (locEl) locEl.classList.add('active-loc');

  // Highlight map event dot
  document.querySelectorAll('.map-event-dot circle').forEach(el => el.setAttribute('r', '5'));
  const evDot = document.querySelector(`.map-event-dot[data-id="${id}"] circle`);
  if (evDot) evDot.setAttribute('r', '7');

  // Fill detail panel
  const tc = TYPE_COLORS[ev.type] || TYPE_COLORS.cultural;
  const badge = document.getElementById('detail-type-badge');
  badge.textContent = ev.type.toUpperCase();
  badge.style.cssText = `background:${tc.bg};color:${tc.color};border:1px solid ${tc.color}40;`;

  document.getElementById('detail-year').textContent = ev.year;
  document.getElementById('detail-title').textContent = ev.title;
  document.getElementById('detail-location').textContent =
    '⬦ ' + (LOC_MAP[ev.location_id]?.name || '') + ' — ' + (LOC_MAP[ev.location_id]?.desc || '');
  document.getElementById('detail-description').textContent = ev.description;
  document.getElementById('detail-ritual').textContent = '"' + ev.ritual_text + '"';
  document.getElementById('detail-significance').textContent = ev.significance;

  document.getElementById('detail-panel').classList.add('visible');
}

/** Wire up the close button. */
export function initDetailClose() {
  document.getElementById('detail-close').addEventListener('click', () => {
    document.getElementById('detail-panel').classList.remove('visible');
    document.querySelectorAll('.tl-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.map-loc').forEach(el => el.classList.remove('active-loc'));
    document.querySelectorAll('.map-event-dot circle').forEach(el => el.setAttribute('r', '5'));
    activeId = null;
  });
}
