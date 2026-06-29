import './MapPanel.css';
import { getFirstEventIdByLocation } from '../utils/map.js';
import { t } from '../utils/i18n.js';

export default function MapPanel({
  handleMapMouseMove,
  handleMapMouseLeave,
  mask,
  mapLocations,
  mapEventDots,
  selectedEventId,
  setSelectedEventId,
  activeLocationId,
  lang,
}) {
  return (
    <div id="map-panel" onMouseMove={handleMapMouseMove} onMouseLeave={handleMapMouseLeave}>
      <div id="grime-overlay" style={{ '--mx': mask.mx, '--my': mask.my }}></div>
      <svg id="map-svg" viewBox="0 0 700 600" preserveAspectRatio="xMidYMid meet">
        <defs>
          <filter id="glow-amber">
            <feGaussianBlur stdDeviation="3" result="blur"></feGaussianBlur>
            <feMerge>
              <feMergeNode in="blur"></feMergeNode>
              <feMergeNode in="SourceGraphic"></feMergeNode>
            </feMerge>
          </filter>
          <pattern id="terrain-dots" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.5" fill="rgba(80,60,40,0.18)"></circle>
          </pattern>
        </defs>

        <rect width="700" height="600" fill="#0d1a1c"></rect>
        <rect width="700" height="600" fill="url(#terrain-dots)"></rect>

        <path d="M 460 520 Q 540 540 600 520 Q 650 500 680 480 L 700 600 L 400 600 Z" fill="rgba(20,50,70,0.6)" stroke="rgba(42,74,78,0.4)" strokeWidth="0.7"></path>
        <text x="570" y="565" className="sea-label" textAnchor="middle">{t('map_sea_persian_gulf', lang)}</text>

        <path d="M 600 0 Q 660 30 680 80 Q 700 130 690 160 L 700 0 Z" fill="rgba(20,50,70,0.4)"></path>
        <text x="660" y="70" className="sea-label" fontSize="9" textAnchor="middle" transform="rotate(-60 660 70)">{t('map_sea_caspian', lang)}</text>

        <g className="mountain-mark">
          <polygon points="490,80 505,55 520,80"></polygon>
          <polygon points="510,95 525,68 540,95"></polygon>
          <polygon points="530,75 545,52 558,75"></polygon>
          <polygon points="548,105 563,80 576,105"></polygon>
          <polygon points="565,130 580,105 595,130"></polygon>
          <polygon points="575,160 590,135 605,160"></polygon>
          <polygon points="580,195 595,170 608,195"></polygon>
          <polygon points="573,235 588,210 600,235"></polygon>
          <polygon points="560,270 575,245 588,270"></polygon>
          <polygon points="545,305 560,280 573,305"></polygon>
          <polygon points="530,335 545,310 560,335"></polygon>
          <polygon points="505,355 520,330 535,355"></polygon>
        </g>
        <text x="570" y="220" className="region-label" fontSize="9" transform="rotate(75 570 220)">{t('map_region_zagros', lang)}</text>

        <g className="mountain-mark">
          <polygon points="60,30 75,8 90,30"></polygon>
          <polygon points="100,25 115,5 130,25"></polygon>
          <polygon points="145,30 160,8 175,30"></polygon>
          <polygon points="195,22 210,4 225,22"></polygon>
          <polygon points="240,28 255,8 270,28"></polygon>
          <polygon points="290,20 305,2 320,20"></polygon>
        </g>
        <text x="190" y="18" className="region-label" fontSize="9" letterSpacing="3">{t('map_region_taurus', lang)}</text>

        <path d="M 30 40 Q 200 30 280 60 Q 350 80 380 100 Q 320 120 240 130 Q 140 140 60 130 Z" className="region-fill" opacity="0.5"></path>
        <text x="130" y="110" className="region-label" textAnchor="middle">{t('map_region_upper_mesopotamia', lang)}</text>

        <path id="tigris-path" className="river" stroke="#1d6a7a" d="M 380 40 Q 370 80 360 120 Q 345 165 340 210 Q 330 260 328 300 Q 322 350 310 390 Q 298 430 288 460 Q 278 490 265 515 Q 255 535 245 550"></path>
        <text className="river-label">
          <textPath href="#tigris-path" startOffset="15%" fontSize="9">Tigris</textPath>
        </text>

        <path id="euphrates-path" className="river" stroke="#1a5e6e" d="M 80 50 Q 120 70 160 100 Q 200 130 220 165 Q 240 200 245 240 Q 248 280 248 315 Q 245 355 238 390 Q 228 430 218 465 Q 208 495 195 525"></path>
        <text className="river-label">
          <textPath href="#euphrates-path" startOffset="15%" fontSize="9">Euphrates</textPath>
        </text>

        <path className="river" strokeWidth="1" stroke="rgba(29,106,122,0.5)" d="M 430 150 Q 400 200 375 240 Q 355 270 338 300"></path>

        <path d="M 195 525 Q 220 545 260 550 Q 290 545 310 390 Q 322 350 328 300 Q 330 260 340 210 Q 345 165 360 120 Q 370 80 380 40 Q 300 50 240 60 Q 180 70 130 100 Q 110 120 80 50 Q 90 80 120 120 Q 140 145 160 100 Q 200 130 220 165 Q 240 200 245 240 Q 248 280 248 315 Q 245 355 238 390 Q 228 430 218 465 Z" fill="rgba(30,55,40,0.15)" stroke="none"></path>

        <text x="280" y="200" className="region-label" textAnchor="middle" opacity="0.5">{t('map_region_assyria', lang)}</text>
        <text x="220" y="330" className="region-label" textAnchor="middle" opacity="0.5">{t('map_region_babylonia', lang)}</text>
        <text x="245" y="490" className="region-label" textAnchor="middle" opacity="0.5" fontSize="9">{t('map_region_sumer', lang)}</text>

        <g id="map-locations">
          {mapLocations.map(location => (
            <g
              key={location.id}
              className={`map-loc ${activeLocationId === location.id ? 'active-loc' : ''}`.trim()}
              data-locid={location.id}
              onClick={() => {
                const targetEventId = getFirstEventIdByLocation(location.id);
                if (targetEventId) {
                  setSelectedEventId(targetEventId);
                }
              }}
            >
              <circle className="outer" cx={location.coords.x} cy={location.coords.y} r="9"></circle>
              <circle className="inner" cx={location.coords.x} cy={location.coords.y} r="3"></circle>
              <text className="map-loc-label" x={location.coords.x + 12} y={location.coords.y + 3}>{location.name}</text>
            </g>
          ))}
        </g>

        <g id="map-events">
          {mapEventDots.map(dot => (
            <g
              key={dot.id}
              className="map-event-dot"
              data-id={dot.id}
              data-type={dot.type}
              onClick={() => setSelectedEventId(dot.id)}
            >
              <circle cx={dot.x} cy={dot.y} r={selectedEventId === dot.id ? 7 : 5}></circle>
            </g>
          ))}
        </g>
      </svg>

      <div id="map-title">
        <div className="map-eyebrow">{t('map_eyebrow', lang)}</div>
        <div className="map-heading">{t('map_heading', lang)}</div>
      </div>

      <div id="map-legend">
        <div className="legend-title">{t('legend_title', lang)}</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(29,158,117,0.7)', borderColor: '#5dcaa5' }}></div>{t('type.founding', lang)}</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(186,117,23,0.7)', borderColor: '#e8c87a' }}></div>{t('type.discovery', lang)}</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(127,119,221,0.6)', borderColor: '#af9ec4' }}></div>{t('type.ritual', lang)}</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(61,106,112,0.7)', borderColor: '#7ab8c0' }}></div>{t('type.cultural', lang)}</div>
        <div className="legend-item"><div className="legend-dot" style={{ background: 'rgba(194,82,32,0.7)', borderColor: '#c25220' }}></div>{t('type.collapse', lang)}</div>
      </div>

      <div id="hint">
        {t('hint', lang).split('\n').map((line, index) => (
          <span key={`${line}-${index}`}>
            {index > 0 ? <br /> : null}
            {line}
          </span>
        ))}
      </div>
    </div>
  );
}
