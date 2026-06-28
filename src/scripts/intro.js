import { INTRO_PHRASES } from '../data/intro-phrases.js';

const STORAGE_KEY  = 'kassu-visited';
const CHAR_DELAY   = 38;   // ms per character
const CHAR_JITTER  = 18;   // random extra ms per character
const FADE_MS      = 800;  // phrase fade CSS transition duration (must match intro.css)
const OVERLAY_FADE = 1500; // overlay fade CSS transition duration (must match intro.css)

let audioEl      = null;
let audioEnabled = false;

/**
 * Initialise the intro sequence.
 * Calls `onReady` immediately if the user has already visited,
 * otherwise plays the typewriter sequence then calls `onReady`.
 * @param {() => void} onReady
 */
export function initIntro(onReady) {
  if (localStorage.getItem(STORAGE_KEY)) {
    skipIntro(onReady);
    return;
  }

  const overlay  = document.getElementById('intro-overlay');
  const eyebrow  = document.getElementById('intro-eyebrow');
  const divider  = document.getElementById('intro-divider');
  const audioBtn = document.getElementById('audio-toggle');

  // Fade in decorative elements
  setTimeout(() => eyebrow.classList.add('visible'), 500);
  setTimeout(() => divider.classList.add('visible'), 800);

  // Show audio toggle after the first phrase has had time to start
  setTimeout(() => audioBtn.classList.add('visible'), 2200);

  audioBtn.addEventListener('click', toggleAudio);

  runSequence(() => {
    overlay.classList.add('fade-out');
    stopAudio();

    delay(OVERLAY_FADE).then(() => {
      overlay.style.display = 'none';
      localStorage.setItem(STORAGE_KEY, '1');
      onReady();
    });
  });
}

// ── PRIVATE ──────────────────────────────────────────────────────────────────

function skipIntro(onReady) {
  const overlay = document.getElementById('intro-overlay');
  if (overlay) overlay.style.display = 'none';
  onReady();
}

async function runSequence(onDone) {
  const phraseText = document.getElementById('phrase-text');
  const cursor     = document.getElementById('type-cursor');

  for (let i = 0; i < INTRO_PHRASES.length; i++) {
    const { text, pause } = INTRO_PHRASES[i];
    const isLast = i === INTRO_PHRASES.length - 1;

    // Reset state
    phraseText.textContent = '';
    phraseText.classList.remove('fade-out', 'pulse');
    cursor.classList.remove('hidden');

    // Type characters
    for (const char of text) {
      if (char === '\n') {
        phraseText.appendChild(document.createElement('br'));
      } else {
        phraseText.appendChild(document.createTextNode(char));
      }
      await delay(CHAR_DELAY + Math.random() * CHAR_JITTER);
    }

    // Pause at end of phrase
    cursor.classList.add('hidden');
    await delay(pause);

    if (isLast) {
      // Final phrase: pulse, then signal completion
      phraseText.classList.add('pulse');
      await delay(1800);
      phraseText.classList.add('fade-out');
      await delay(FADE_MS);
      onDone();
    } else {
      // Fade out, then continue
      phraseText.classList.add('fade-out');
      await delay(FADE_MS + 200);
    }
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function toggleAudio() {
  const btn = document.getElementById('audio-toggle');

  if (!audioEl) {
    // Audio element created on first user gesture to satisfy browser policy
    audioEl = new Audio('/audio/ambient.mp3');
    audioEl.loop   = true;
    audioEl.volume = 0.3;
  }

  if (audioEnabled) {
    audioEl.pause();
    audioEnabled = false;
    btn.textContent = 'Sound On';
  } else {
    // play() may reject gracefully if the audio file doesn't exist yet
    audioEl.play().catch(() => {});
    audioEnabled = true;
    btn.textContent = 'Sound Off';
  }
}

function stopAudio() {
  if (audioEl && audioEnabled) {
    audioEl.pause();
    audioEnabled = false;
  }
}
