# Aditya Prakash portfolio

A React site built with Vite.

## Run it locally

```bash
npm install
npm run dev
```

`npm run build` outputs a static site to `dist/`.

## Edit content

- `src/App.jsx`: projects, jobs, skills, awards (`AWARDS`) and links.
- `src/Lab.jsx`: the code-to-circuit examples (`EXAMPLES`).
- `src/Hero.jsx`: the animated canvas hero.
- `src/styles.css`: colours are tokens at the top; change `--accent` to re-theme the highlights.

## Deploy

Any static host works.

- **Netlify / Vercel:** import the repo. Build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** deploy the `dist` folder (e.g. with a GitHub Actions Pages workflow).

## Built in

Responsive down to small phones, keyboard focus styles, skip link, `prefers-reduced-motion` support,
hero animation that pauses when off-screen, and illustration motion that plays on hover (or when scrolled into view on touch screens).
