export const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'founding', label: 'Founding' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'ritual', label: 'Ritual' },
  { id: 'cultural', label: 'Cultural' },
  { id: 'collapse', label: 'Collapse' },
];

export function filterEventsByType(events, filter = 'all') {
  if (filter === 'all') {
    return events;
  }
  return events.filter(event => event.type === filter);
}

export function buildTimelineRows(events) {
  const rows = [];
  let lastEra = null;

  events.forEach(event => {
    if (event.era !== lastEra) {
      rows.push({
        kind: 'era',
        key: `era-${event.era}`,
        era: event.era,
      });
      lastEra = event.era;
    }

    rows.push({
      kind: 'event',
      key: `event-${event.id}`,
      event,
    });
  });

  return rows;
}
