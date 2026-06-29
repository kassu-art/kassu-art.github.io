import { useEffect, useMemo, useRef } from 'react';

import { getEventDetailModel } from './utils/detail.js';
import { useIntroSequence } from './hooks/useIntroSequence.js';
import { getMapEventDots, getMapLocations } from './utils/map.js';
import { useTorchCursor } from './hooks/useTorchCursor.js';
import { useAppModel } from './hooks/useAppModel.js';

import DetailPanel from './components/DetailPanel.jsx';
import IntroOverlay from './components/IntroOverlay.jsx';
import MapPanel from './components/MapPanel.jsx';
import TimelinePanel from './components/TimelinePanel.jsx';
import TorchCursor from './components/TorchCursor.jsx';

export default function App() {
  const intro = useIntroSequence(false);
  const {
    filter,
    setFilter,
    selectedEventId,
    setSelectedEventId,
    tapGlowId,
    timelineRows,
  } = useAppModel(intro.appRevealed);
  const { torch, mask, handleMapMouseMove, handleMapMouseLeave } = useTorchCursor();

  const timelineItemRefs = useRef(new Map());

  const mapLocations = useMemo(() => getMapLocations(), []);
  const mapEventDots = useMemo(() => getMapEventDots(), []);
  const detailModel = useMemo(() => getEventDetailModel(selectedEventId), [selectedEventId]);

  useEffect(() => {
    if (!selectedEventId) {
      return;
    }

    const selectedItem = timelineItemRefs.current.get(selectedEventId);
    if (selectedItem) {
      selectedItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedEventId]);

  const activeLocationId = detailModel?.event.location_id ?? null;

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
        />
      </div>

      <DetailPanel detailModel={detailModel} setSelectedEventId={setSelectedEventId} />
    </>
  );
}
