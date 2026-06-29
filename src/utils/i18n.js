import en from '../data/locales/en.json';
import fa from '../data/locales/fa.json';

const LOCALES = { en, fa };

/** Active language — change to 'fa' to switch to Persian */
let currentLang = 'en';

/**
 * Translate a key for the current (or specified) language.
 * Falls back to English if the key is missing in the target locale.
 * @param {string} key
 * @param {string} [lang]
 * @returns {string}
 */
export function t(key, lang = currentLang) {
  return (LOCALES[lang]?.[key] ?? LOCALES['en'][key]) || key;
}

/** Set the active language globally. */
export function setLang(lang) {
  if (LOCALES[lang]) currentLang = lang;
}

export function getLang() {
  return currentLang;
}
