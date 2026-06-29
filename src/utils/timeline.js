import { t } from './i18n.js';

export const FILTERS = ['all', 'founding', 'discovery', 'ritual', 'cultural', 'collapse'];

export function filterEventsByType(events, filter = 'all') {
  if (filter === 'all') {
    return events;
  }
  return events.filter(event => event.type === filter);
}

export function buildTimelineRows(events, lang = 'en') {
  const rows = [];
  let lastEra = null;

  events.forEach(event => {
    const eraLabel = t(event.eraKey, lang);

    if (eraLabel !== lastEra) {
      rows.push({
        kind: 'era',
        key: `era-${event.eraKey}`,
        era: eraLabel,
      });
      lastEra = eraLabel;
    }

    rows.push({
      kind: 'event',
      key: `event-${event.id}`,
      event,
    });
  });

  return rows;
}
