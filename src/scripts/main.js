import { initIntro }         from './intro.js';
import { renderTimeline, initFilters } from './timeline.js';
import { renderMapLocations, renderMapEvents, initTorchCursor } from './map.js';
import { selectEvent, initDetailClose } from './detail.js';
import { EVENTS }            from '../data/events.js';

function init() {
  renderTimeline('all');
  renderMapLocations();
  renderMapEvents();
  initFilters();
  initDetailClose();
  initTorchCursor();
  // Pre-select the first event after layout settles
  setTimeout(() => selectEvent(EVENTS[0].id), 400);
}

// Boot: play intro on first visit, skip on subsequent ones
initIntro(() => {
  document.getElementById('app').classList.add('revealed');
  init();
});
