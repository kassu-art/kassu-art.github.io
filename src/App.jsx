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

  const audioRef = useRef(null);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const autoStartAttempted = useRef(false);

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

  const toggleAudio = () => {
    if (!audioRef.current) {
      const el = new Audio('/soul_serenity_sounds-ambient-noise-236388.mp3');
      el.loop = true;
      el.volume = 0.3;
      audioRef.current = el;
    }

    if (audioEnabled) {
      audioRef.current.pause();
      setAudioEnabled(false);
    } else {
      audioRef.current.play().catch(() => {});
      setAudioEnabled(true);
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) audioRef.current.pause();
    };
  }, []);

  // Attempt to auto-start audio when the app is first revealed.
  useEffect(() => {
    if (!intro.appRevealed) return;
    if (audioEnabled) return;
    if (autoStartAttempted.current) return;

    autoStartAttempted.current = true;

    if (!audioRef.current) {
      const el = new Audio('/soul_serenity_sounds-ambient-noise-236388.mp3');
      el.loop = true;
      el.volume = 0.3;
      audioRef.current = el;
    }

    audioRef.current.play().then(() => {
      setAudioEnabled(true);
    }).catch(() => {
      // Autoplay blocked; leave audio disabled. User can enable via UI.
    });
  }, [intro.appRevealed, audioEnabled]);

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
          audioEnabled={audioEnabled}
          toggleAudio={toggleAudio}
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
