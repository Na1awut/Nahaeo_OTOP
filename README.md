# Na Haeo Glow

A product website for an organic macadamia lip balm from a Thai school science project in Na Haeo. Scanning a product's NFC tag or QR code verifies the item and opens a page about the product and its local story.

## Features

- **Product verification:** `/verify` checks a product ID against Firestore and records the scan
- **Product storytelling:** a home page with a flip-book story of the products and Na Haeo
- **Scan tracking:** scan events are stored for each product
- **WebAR prototype:** the root `index.html` is an earlier "Tap to Bloom" static prototype using `model-viewer`

## Tech stack

React 19, Vite (rolldown), Tailwind CSS 4, React Router, Firebase Firestore and Analytics, `html5-qrcode`, `react-pageflip`, and Render static hosting.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Other commands:

```bash
npm run build
npm run lint
npm run preview
```

### Firebase

The Firebase web config is in `frontend/src/lib/firebase.js`. To use your own project, replace that config and seed products with `frontend/scripts/seed-products.mjs`, which has its own copy of the config. A Firebase web config is not a password, so protect the data with Firestore security rules.

## Deployment

[`render.yaml`](render.yaml) deploys `frontend/` as a static site on Render and rewrites every route to `index.html`.

## Project structure

```text
frontend/        Current React app
  src/pages/     HomePage, StoryPage and VerifyPage
  src/lib/       Firebase helpers
  scripts/       Image conversion and product seeding
index.html       Earlier WebAR prototype
verify.html      Earlier verification page
js/, css/        Prototype scripts and styles
assets/models/   Folders and notes for 3D models
โครงงาน.md       Science project report (Thai)
project.pdf      Science project document
```

## 3D models

Put models in `assets/models/<name>/`. Use `.glb` or `.gltf` for the web and `.usdz` for iOS AR Quick Look.
