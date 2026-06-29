import { EVENTS, LOCATIONS, LOC_COORDS } from '../data/events.js';
import { t } from './i18n.js';

export function getMapLocations(lang = 'en') {
  return LOCATIONS.map(location => ({
    ...location,
    name: t(location.nameKey, lang),
    desc: t(location.descKey, lang),
    coords: LOC_COORDS[location.id],
  })).filter(location => Boolean(location.coords));
}

export function getMapEventDots() {
  return EVENTS.map((event, i) => {
    const coords = LOC_COORDS[event.location_id];
    if (!coords) {
      return null;
    }

    const sameLocBefore = EVENTS.slice(0, i).filter(item => item.location_id === event.location_id).length;
    const angle = (sameLocBefore * 60) * (Math.PI / 180);
    const spread = sameLocBefore > 0 ? 18 : 0;

    return {
      id: event.id,
      type: event.type,
      locationId: event.location_id,
      x: coords.x + (spread ? Math.cos(angle) * spread : 0),
      y: coords.y + (spread ? Math.sin(angle) * spread : 0),
    };
  }).filter(Boolean);
}

export function getFirstEventIdByLocation(locationId) {
  return EVENTS.find(event => event.location_id === locationId)?.id ?? null;
}
