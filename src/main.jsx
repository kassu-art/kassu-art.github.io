import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { getDirection, normalizeLang } from './utils/i18n.js';

import './styles/main.css';

const initialLang = normalizeLang(new URLSearchParams(window.location.search).get('lang'));
document.documentElement.lang = initialLang;
document.documentElement.dir = getDirection(initialLang);

createRoot(document.getElementById('root')).render(<App initialLang={initialLang} />);
