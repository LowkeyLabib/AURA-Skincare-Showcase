# AURA — Skincare Showcase

Responsive fictional skincare storefront: React, Vite, JavaScript, Tailwind CSS, React Router, and Lucide. Includes 20 products, filters, search, sorting, product galleries and variants, persistent cart and wishlist, informational pages, and demo forms. No backend, accounts, payments, environment variables, or paid APIs.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to Vercel

Import this repository in Vercel and select the Vite preset. Build command: `npm run build`. Output directory: `dist`. Deploy with no environment variables. `vercel.json` rewrites application routes to `index.html` so nested URLs work on refresh; local assets are served directly.

Alternatively, with an authenticated Vercel CLI, run `vercel --prod` from this directory.

## Publish to GitHub

Create an empty public repository named `aura-skincare-showcase`, then run:

```bash
git add .
git commit -m "Build AURA skincare portfolio storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/aura-skincare-showcase.git
git push -u origin main
```

If an origin already exists, inspect it first with `git remote -v` and use the intended remote without overwriting or force-pushing. Skip the commit command if the files are already committed.

## Source

- `src/data.js`: 20 fictional products, variants, ingredients, usage.
- `src/store.jsx`: validated browser-local cart/wishlist state.
- `src/App.jsx`: reusable storefront components and routes.
- `src/styles.css`: Tailwind, responsive editorial styles, reduced motion.
- `public/art/`: original local SVG product and botanical illustrations.
- `scripts/generate-art.mjs`: regenerate artwork with `node scripts/generate-art.mjs` after changing packaging content in the catalog.

Artwork is original code-generated illustration created for this project, with no remote image, font, or third-party photo dependencies. All products and claims (including SPF labels) are fictional. Forms never submit personal data. Checkout is a demo. Local storage only holds product selections; the interface reports if persistence is unavailable.
