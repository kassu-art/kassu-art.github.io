import './DetailPanel.css';
import { t } from '../utils/i18n.js';

export default function DetailPanel({ detailModel, setSelectedEventId, lang }) {
  return (
    <div id="detail-panel" className={detailModel ? 'visible' : ''}>
      <button id="detail-close" aria-label={t('detail_close', lang)} onClick={() => setSelectedEventId(null)}>{t('detail_close', lang)}</button>
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
        <div id="detail-year">{detailModel?.year ?? ''}</div>
        <div id="detail-title">{detailModel?.title ?? ''}</div>
        <div id="detail-location">{detailModel?.locationText ?? ''}</div>
      </div>
      <div id="detail-description">{detailModel?.description ?? ''}</div>
      <div id="detail-ritual-header">{t('detail_ritual_header', lang)}</div>
      <div id="detail-ritual">{detailModel?.ritualText ?? ''}</div>
      <div id="detail-significance-block">
        <div className="sig-label">{t('detail_significance_label', lang)}</div>
        <div id="detail-significance">{detailModel?.significance ?? ''}</div>
      </div>
    </div>
  );
}
