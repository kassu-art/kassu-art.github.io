import './DetailPanel.css';

export default function DetailPanel({ detailModel, setSelectedEventId }) {
  return (
    <div id="detail-panel" className={detailModel ? 'visible' : ''}>
      <button id="detail-close" onClick={() => setSelectedEventId(null)}>✕</button>
      <div id="detail-header-bg">
        <div
          id="detail-type-badge"
          style={
            detailModel
              ? {
                  background: detailModel.typeColor.bg,
                  color: detailModel.typeColor.color,
                  border: `1px solid ${detailModel.typeColor.color}40`,
                }
              : undefined
          }
        >
          {detailModel?.badgeText ?? ''}
        </div>
        <div id="detail-year">{detailModel?.event.year ?? ''}</div>
        <div id="detail-title">{detailModel?.event.title ?? ''}</div>
        <div id="detail-location">{detailModel?.locationText ?? ''}</div>
      </div>
      <div id="detail-description">{detailModel?.event.description ?? ''}</div>
      <div id="detail-ritual-header">Ritual Text</div>
      <div id="detail-ritual">{detailModel?.ritualText ?? ''}</div>
      <div id="detail-significance-block">
        <div className="sig-label">Historical Significance</div>
        <div id="detail-significance">{detailModel?.event.significance ?? ''}</div>
      </div>
    </div>
  );
}
