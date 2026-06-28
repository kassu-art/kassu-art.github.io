import { EVENTS, LOC_MAP } from '../data/events.js';
import { selectEvent } from './detail.js';

/** Render timeline items, optionally filtered by event type. */
export function renderTimeline(filter = 'all') {
  const scroll = document.getElementById('timeline-scroll');
  scroll.innerHTML = '';
  let lastEra = null;

  EVENTS.forEach(ev => {
    if (filter !== 'all' && ev.type !== filter) return;

    if (ev.era !== lastEra) {
      const eraDiv = document.createElement('div');
      eraDiv.className = 'tl-era-label';
      eraDiv.textContent = ev.era;
      scroll.appendChild(eraDiv);
      lastEra = ev.era;
    }

    const item = document.createElement('div');
    item.className = 'tl-item';
    item.dataset.id = ev.id;
    item.dataset.type = ev.type;
    item.innerHTML = `
      <div class="tl-dot"></div>
      <div class="tl-content">
        <div class="tl-year">${ev.year}</div>
        <div class="tl-title">${ev.title}</div>
        <div class="tl-loc">${LOC_MAP[ev.location_id]?.name || ''}</div>
      </div>
    `;
    item.addEventListener('click', () => selectEvent(ev.id));
    scroll.appendChild(item);
  });
}

/** Wire up filter buttons. */
export function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTimeline(btn.dataset.type);
    });
  });
}
