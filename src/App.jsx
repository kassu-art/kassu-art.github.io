import { useEffect, useMemo, useRef, useState } from 'react';

import { getEventDetailModel } from './utils/detail.js';
import { useIntroSequence } from './hooks/useIntroSequence.js';
import { getMapEventDots, getMapLocations } from './utils/map.js';
import { useTorchCursor } from './hooks/useTorchCursor.js';
import { useAppModel } from './hooks/useAppModel.js';
import { getDirection, normalizeLang, setLang as setGlobalLang } from './utils/i18n.js';

import DetailPanel from './components/DetailPanel.jsx';
import IntroOverlay from './components/IntroOverlay.jsx';
import MapPanel from './components/MapPanel.jsx';
import TimelinePanel from './components/TimelinePanel.jsx';
import TorchCursor from './components/TorchCursor.jsx';

export default function App({ initialLang = 'en' }) {
  const [lang, setLang] = useState(normalizeLang(initialLang));

  const intro = useIntroSequence(true, lang);
  const {
    filter,
    setFilter,
    selectedEventId,
    setSelectedEventId,
    tapGlowId,
    timelineRows,
  } = useAppModel(intro.appRevealed, lang);
  const { torch, mask, handleMapMouseMove, handleMapMouseLeave } = useTorchCursor();

  const timelineItemRefs = useRef(new Map());

  const mapLocations = useMemo(() => getMapLocations(lang), [lang]);
  const mapEventDots = useMemo(() => getMapEventDots(), []);
  const detailModel = useMemo(() => getEventDetailModel(selectedEventId, lang), [selectedEventId, lang]);

  useEffect(() => {
    setGlobalLang(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = getDirection(lang);

    const url = new URL(window.location.href);
    url.searchParams.set('lang', lang);
    window.history.replaceState({}, '', url);
  }, [lang]);

  useEffect(() => {
    if (!selectedEventId) {
      return;
    }

    const selectedItem = timelineItemRefs.current.get(selectedEventId);
    if (selectedItem) {
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest', container: 'nearest' });
    }
  }, [selectedEventId]);

  const activeLocationId = detailModel?.event.location_id ?? null;

  const toggleLanguage = () => {
    setLang(prev => (prev === 'fa' ? 'en' : 'fa'));
  };

  return (
    <>
      {intro.introVisible ? (
        <IntroOverlay
          overlayFadeOut={intro.overlayFadeOut}
          eyebrowVisible={intro.eyebrowVisible}
          dividerVisible={intro.dividerVisible}
          phraseText={intro.phraseText}
          phraseFadeOut={intro.phraseFadeOut}
          phrasePulse={intro.phrasePulse}
          cursorHidden={intro.cursorHidden}
          audioVisible={intro.audioVisible}
          audioEnabled={intro.audioEnabled}
          toggleAudio={intro.toggleAudio}
          lang={lang}
          onToggleLanguage={toggleLanguage}
        />
      ) : null}

      <TorchCursor torch={torch} />

      <div id="app" className={intro.appRevealed ? 'revealed' : ''}>
        <TimelinePanel
          filter={filter}
          setFilter={setFilter}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          tapGlowId={tapGlowId}
          timelineRows={timelineRows}
          timelineItemRefs={timelineItemRefs}
          lang={lang}
          onToggleLanguage={toggleLanguage}
        />

        <MapPanel
          handleMapMouseMove={handleMapMouseMove}
          handleMapMouseLeave={handleMapMouseLeave}
          mask={mask}
          mapLocations={mapLocations}
          mapEventDots={mapEventDots}
          selectedEventId={selectedEventId}
          setSelectedEventId={setSelectedEventId}
          activeLocationId={activeLocationId}
          lang={lang}
        />
      </div>

      <DetailPanel detailModel={detailModel} setSelectedEventId={setSelectedEventId} lang={lang} />
    </>
  );
}
