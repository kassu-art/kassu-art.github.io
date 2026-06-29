# Kassu Chronicles — The Forgotten Civilization

An interactive digital experience that explores a lost civilization called the **Kassu**, set in ancient Mesopotamia. The project blends historical fiction and storytelling into a museum-like web interface.

## Features

- **Interactive Map** — SVG-based map of ancient Mesopotamia with clickable location markers and event dots
- **Scrollable Timeline** — Filterable by event type (Founding, Discovery, Ritual, Cultural, Collapse)
- **Detail Panel** — Full event descriptions, ritual texts, and historical significance for each event
- **Intro Overlay** — Typewriter animation with atmospheric phrases; skipped on repeat visits (localStorage)
- **Torch Cursor** — Desktop interactive light effect following the mouse
- **Multilingual** — English and Persian (Farsi) localization

## Tech Stack

- **Vite** — build tool
- **Vanilla JavaScript, HTML, CSS** — no frameworks
- **SVG** — for the interactive map
- **Google Fonts** — Cinzel, IM Fell English, Crimson Pro

## Getting Started

```bash
npm install
npm run dev     # development server
npm run build   # production build
npm run preview # preview the build
```

## Structure

```
src/
├── index.html
├── scripts/        # main, timeline, map, intro, detail, i18n
├── data/           # events, intro phrases, locales (en/fa)
└── styles/         # modular CSS files
```
