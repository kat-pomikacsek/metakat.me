# metakat.me

Portfolio of Katalin Pomikacsek, a Berlin-based Product UX designer.

Built with [Astro](https://astro.build), Tailwind CSS, and content from Contentful. Deployed to Netlify.

## Setup

Requires Node.js 22.12 or newer.

```bash
npm install
cp .env-example .env
```

Fill in `.env` with your Contentful space id, delivery token, and optional preview token. In development, a preview token switches the client to the Contentful preview API.

## Scripts

```bash
npm run dev       # local site
npm run build     # static output in dist/
npm run preview   # serve the production build
npm run check     # Astro type check
```
