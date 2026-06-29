import { useEffect, useMemo, useState } from 'react';

import { EVENTS } from '../data/events.js';
import { buildTimelineRows, filterEventsByType } from '../utils/timeline.js';

export function useAppModel(introReady, lang = 'en') {
  const [filter, setFilter] = useState('all');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [tapGlowId, setTapGlowId] = useState(null);

  const visibleEvents = useMemo(() => filterEventsByType(EVENTS, filter), [filter]);
  const visibleEventIds = useMemo(() => new Set(visibleEvents.map(event => event.id)), [visibleEvents]);
  const timelineRows = useMemo(() => buildTimelineRows(visibleEvents, lang), [visibleEvents, lang]);

  useEffect(() => {
    if (!introReady) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSelectedEventId(EVENTS[0]?.id ?? null);
    }, 400);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [introReady]);

  useEffect(() => {
    if (!selectedEventId) {
      return;
    }

    setTapGlowId(selectedEventId);
    const timeoutId = window.setTimeout(() => {
      setTapGlowId(null);
    }, 600);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [selectedEventId]);

  useEffect(() => {
    if (selectedEventId && !visibleEventIds.has(selectedEventId)) {
      setSelectedEventId(visibleEvents[0]?.id ?? null);
    }
  }, [selectedEventId, visibleEventIds, visibleEvents]);

  return {
    filter,
    setFilter,
    selectedEventId,
    setSelectedEventId,
    tapGlowId,
    timelineRows,
  };
}
