import './TimelinePanel.css';
import { LOC_MAP } from '../data/events.js';
import { FILTERS } from '../utils/timeline.js';
import { t } from '../utils/i18n.js';

export default function TimelinePanel({
  filter,
  setFilter,
  selectedEventId,
  setSelectedEventId,
  tapGlowId,
  timelineRows,
  timelineItemRefs,
  lang,
  onToggleLanguage,
}) {
  return (
    <div id="timeline-panel">
      <div id="timeline-header">
        <div className="eyebrow">{t('eyebrow', lang)}</div>
        <button id="language-toggle" type="button" onClick={onToggleLanguage}>
          {lang === 'fa' ? t('lang_en', lang) : t('lang_fa', lang)}
        </button>
        <h1>
          {t('title_line1', lang)}
        </h1>
        <div className="subtitle">{t('subtitle', lang)}</div>
      </div>

      {/* <div id="timeline-filters">
        {FILTERS.map(item => (
          <button
            key={item}
            className={`filter-btn ${filter === item ? 'active' : ''}`}
            data-type={item}
            onClick={() => setFilter(item)}
          >
            {t(`type.${item}`, lang)}
          </button>
        ))}
      </div> */}

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
              {event.image && (
                <img className="tl-thumb" src={`/${event.image}`} alt={t(event.titleKey, lang)} />
              )}
              <div className="tl-content">
                <div className="tl-year">{t(event.yearKey, lang)}</div>
                <div className="tl-title">{t(event.titleKey, lang)}</div>
                <div className="tl-loc">{t(LOC_MAP[event.location_id]?.nameKey ?? '', lang)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
