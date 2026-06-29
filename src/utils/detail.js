import { EVENTS, LOC_MAP } from '../data/events.js';

export const TYPE_COLORS = {
  founding: { bg: 'rgba(29,158,117,0.15)', color: '#5dcaa5' },
  discovery: { bg: 'rgba(186,117,23,0.15)', color: '#e8c87a' },
  ritual: { bg: 'rgba(127,119,221,0.15)', color: '#af9ec4' },
  cultural: { bg: 'rgba(61,106,112,0.15)', color: '#7ab8c0' },
  collapse: { bg: 'rgba(194,82,32,0.15)', color: '#c25220' },
};

export function getEventById(id) {
  return EVENTS.find(event => event.id === id) ?? null;
}

export function getTypeColor(type) {
  return TYPE_COLORS[type] ?? TYPE_COLORS.cultural;
}

export function getEventDetailModel(eventId) {
  const event = getEventById(eventId);
  if (!event) {
    return null;
  }

  const location = LOC_MAP[event.location_id];

  return {
    event,
    badgeText: event.type.toUpperCase(),
    typeColor: getTypeColor(event.type),
    locationText: `⬦ ${location?.name ?? ''} — ${location?.desc ?? ''}`,
    ritualText: `"${event.ritual_text}"`,
  };
}
