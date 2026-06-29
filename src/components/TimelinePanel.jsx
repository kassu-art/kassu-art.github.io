import './TimelinePanel.css';
import { LOC_MAP } from '../data/events.js';
import { FILTERS } from '../utils/timeline.js';

export default function TimelinePanel({
  filter,
  setFilter,
  selectedEventId,
  setSelectedEventId,
  tapGlowId,
  timelineRows,
  timelineItemRefs,
}) {
  return (
    <div id="timeline-panel">
      <div id="timeline-header">
        <div className="eyebrow">Codex Kassu - Forgotten Annals</div>
        <h1>
          قوم کاسی
          <br />
          The Kassu Chronicles
        </h1>
        <div className="subtitle">
          Records recovered from the dust of Mesopotamia.
          <br />
          Move the torch. Read what remains.
        </div>
      </div>

      <div id="timeline-filters">
        {FILTERS.map(item => (
          <button
            key={item.id}
            className={`filter-btn ${filter === item.id ? 'active' : ''}`}
            data-type={item.id}
            onClick={() => setFilter(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div id="timeline-scroll">
        {timelineRows.map(row => {
          if (row.kind === 'era') {
            return (
              <div key={row.key} className="tl-era-label">
                {row.era}
              </div>
            );
          }

          const event = row.event;
          const isActive = selectedEventId === event.id;
          const isTapGlow = tapGlowId === event.id;

          return (
            <div
              key={row.key}
              ref={node => {
                if (node) {
                  timelineItemRefs.current.set(event.id, node);
                } else {
                  timelineItemRefs.current.delete(event.id);
                }
              }}
              className={`tl-item ${isActive ? 'active' : ''} ${isTapGlow ? 'tap-glow' : ''}`.trim()}
              data-id={event.id}
              data-type={event.type}
              onClick={() => setSelectedEventId(event.id)}
            >
              <div className="tl-dot"></div>
              <div className="tl-content">
                <div className="tl-year">{event.year}</div>
                <div className="tl-title">{event.title}</div>
                <div className="tl-loc">{LOC_MAP[event.location_id]?.name ?? ''}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
