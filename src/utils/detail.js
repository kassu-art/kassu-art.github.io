import { EVENTS, LOC_MAP } from '../data/events.js';
import { t } from './i18n.js';

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

export function getEventDetailModel(eventId, lang = 'en') {
  const event = getEventById(eventId);
  if (!event) {
    return null;
  }

  const location = LOC_MAP[event.location_id];

  return {
    event,
    year: t(event.yearKey, lang),
    badgeText: t(`type.${event.type}`, lang),
    typeColor: getTypeColor(event.type),
    locationText: `⬦ ${t(location?.nameKey ?? '', lang)} — ${t(location?.descKey ?? '', lang)}`,
    ritualText: `"${t(event.ritualTextKey, lang)}"`,
    description: t(event.descriptionKey, lang),
    significance: t(event.significanceKey, lang),
    title: t(event.titleKey, lang),
  };
}
