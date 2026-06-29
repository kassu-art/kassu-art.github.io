import { Fragment } from 'react';
import './IntroOverlay.css';

function renderMultilineText(text) {
  const parts = text.split('\n');
  return parts.map((part, index) => (
    <Fragment key={`${part}-${index}`}>
      {index > 0 ? <br /> : null}
      {part}
    </Fragment>
  ));
}

export default function IntroOverlay({
  overlayFadeOut,
  eyebrowVisible,
  dividerVisible,
  phraseText,
  phraseFadeOut,
  phrasePulse,
  cursorHidden,
  audioVisible,
  audioEnabled,
  toggleAudio,
}) {
  return (
    <div id="intro-overlay" className={overlayFadeOut ? 'fade-out' : ''}>
      <div id="intro-eyebrow" className={eyebrowVisible ? 'visible' : ''}>Codex Kassu - Forgotten Annals</div>
      <div id="intro-divider" className={dividerVisible ? 'visible' : ''}></div>
      <div id="intro-stage">
        <div id="phrase-container">
          <p
            id="phrase-text"
            className={`${phraseFadeOut ? 'fade-out' : ''} ${phrasePulse ? 'pulse' : ''}`.trim()}
          >
            {renderMultilineText(phraseText)}
          </p>
          <span id="type-cursor" className={cursorHidden ? 'hidden' : ''}>|</span>
        </div>
      </div>
      <button
        id="audio-toggle"
        className={audioVisible ? 'visible' : ''}
        aria-label="Toggle ambient sound"
        onClick={toggleAudio}
      >
        {audioEnabled ? 'Sound Off' : 'Sound On'}
      </button>
    </div>
  );
}
