import en from '../data/locales/en.json';
import fa from '../data/locales/fa.json';

const LOCALES = { en, fa };
const DEFAULT_LANG = 'en';

/** Active language — change to 'fa' to switch to Persian */
let currentLang = DEFAULT_LANG;

/**
 * Translate a key for the current (or specified) language.
 * Falls back to English if the key is missing in the target locale.
 * @param {string} key
 * @param {string} [lang]
 * @returns {string}
 */
export function t(key, lang = currentLang) {
  const normalizedLang = normalizeLang(lang);
  return (LOCALES[normalizedLang]?.[key] ?? LOCALES[DEFAULT_LANG][key]) || key;
}

/** Set the active language globally. */
export function setLang(lang) {
  currentLang = normalizeLang(lang);
}

export function getLang() {
  return currentLang;
}

export function normalizeLang(lang) {
  return LOCALES[lang] ? lang : DEFAULT_LANG;
}

export function getDirection(lang = currentLang) {
  return normalizeLang(lang) === 'fa' ? 'rtl' : 'ltr';
}

export function getSupportedLangs() {
  return Object.keys(LOCALES);
}
