# Iky Portfolio — React + Vite

Portfolio website Risky Januar (Iky) dibangun ulang menggunakan **React + Vite + React Router**.

## Tech Stack

- **React 19** — UI library
- **Vite** — Build tool & dev server
- **React Router v7** — Client-side routing
- **CSS Variables** — Design tokens & theming

## Struktur Project

```
src/
├── components/
│   ├── Cursor.jsx     — Custom cursor dengan smooth animation
│   ├── Footer.jsx     — Footer shared
│   ├── Loader.jsx     — Page loader animation
│   └── Navbar.jsx     — Navbar responsive + mobile menu
├── hooks/
│   └── useReveal.js   — Scroll reveal animation hook
├── pages/
│   ├── Home.jsx       — Landing page
│   ├── About.jsx      — About + skills + timeline
│   ├── Portfolio.jsx  — Portfolio grid + filter
│   └── Contact.jsx    — Contact form
├── App.jsx            — Root component + routing
├── main.jsx           — Entry point
└── index.css          — Global styles + design tokens
```

## Routes

| Path | Page |
|------|------|
| `/` | Home |
| `/about` | About |
| `/portfolio` | Portfolio |
| `/contact` | Contact |
