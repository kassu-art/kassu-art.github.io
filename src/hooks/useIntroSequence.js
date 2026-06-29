import { useEffect, useRef, useState } from 'react';

import { INTRO_PHRASES } from '../data/intro-phrases.js';
import { t } from '../utils/i18n.js';

const STORAGE_KEY = 'kassu-visited';
const CHAR_DELAY = 38;
const CHAR_JITTER = 18;
const FADE_MS = 800;
const OVERLAY_FADE = 1500;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function useIntroSequence(forcePlay = false, lang = 'en') {
  const [introVisible, setIntroVisible] = useState(true);
  const [overlayFadeOut, setOverlayFadeOut] = useState(false);
  const [eyebrowVisible, setEyebrowVisible] = useState(false);
  const [dividerVisible, setDividerVisible] = useState(false);
  const [audioVisible, setAudioVisible] = useState(false);
  const [phraseText, setPhraseText] = useState('');
  const [phraseFadeOut, setPhraseFadeOut] = useState(false);
  const [phrasePulse, setPhrasePulse] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [appRevealed, setAppRevealed] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const timeouts = [];

    const setSafeTimeout = (fn, ms) => {
      const id = window.setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(id);
    };

    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setAudioEnabled(false);
    };

    const run = async () => {
      // If forcePlay is true, always show intro regardless of localStorage
      if (!forcePlay && localStorage.getItem(STORAGE_KEY)) {
        setIntroVisible(false);
        setAppRevealed(true);
        return;
      }

      setSafeTimeout(() => setEyebrowVisible(true), 500);
      setSafeTimeout(() => setDividerVisible(true), 800);
      setSafeTimeout(() => setAudioVisible(true), 2200);

      const localizedPhrases = t('intro.phrases', lang);
      const phraseSource = Array.isArray(localizedPhrases) && localizedPhrases.length > 0 ? localizedPhrases : INTRO_PHRASES;

      for (let i = 0; i < phraseSource.length; i += 1) {
        const phrase = phraseSource[i];
        const isLast = i === phraseSource.length - 1;

        setPhraseText('');
        setPhraseFadeOut(false);
        setPhrasePulse(false);
        setCursorHidden(false);

        for (const char of phrase.text) {
          if (cancelled) return;
          setPhraseText(prev => prev + char);
          await delay(CHAR_DELAY + Math.random() * CHAR_JITTER);
        }

        setCursorHidden(true);
        await delay(phrase.pause);
        if (cancelled) return;

        if (isLast) {
          setPhrasePulse(true);
          await delay(1800);
          if (cancelled) return;

          setPhraseFadeOut(true);
          await delay(FADE_MS);
          if (cancelled) return;

          setOverlayFadeOut(true);
          stopAudio();
          await delay(OVERLAY_FADE);
          if (cancelled) return;

          setIntroVisible(false);
          setAppRevealed(true);
          localStorage.setItem(STORAGE_KEY, '1');
          return;
        }

        setPhraseFadeOut(true);
        await delay(FADE_MS + 200);
        if (cancelled) return;
      }
    };

    run();

    return () => {
      cancelled = true;
      timeouts.forEach(id => window.clearTimeout(id));
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

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

  return {
    introVisible,
    overlayFadeOut,
    eyebrowVisible,
    dividerVisible,
    audioVisible,
    phraseText,
    phraseFadeOut,
    phrasePulse,
    cursorHidden,
    audioEnabled,
    appRevealed,
    toggleAudio,
  };
}
