# FridgeStreet AI — The Next Neighbor

An interactive, ten-scene cinematic design case study about community-powered food sharing. Built with React, TypeScript, Vite and GSAP.

## Development

Requires Node.js 22.6 or later.

```sh
npm ci
npm run dev
```

## Validation and production build

```sh
npm test
npm run build
npm run preview
```

The build validates every required phone screen, cinematic video and poster before creating the static site in `dist/`. All media is included. No API keys, database or environment variables are required.

## GitHub Pages

In repository Settings → Pages, select **GitHub Actions** as the source. The included workflow tests and builds pushes to `main`, then deploys `dist/` to GitHub Pages. It can also be run manually from Actions.

Asset paths are relative, so the site works at a repository subpath or a root domain. In-page chapter navigation uses URL fragments.

## Project context

FridgeStreet AI is a concept project with illustrative data. AI suggestions require human review. A separate on-site volunteer check does not certify food safety. The demonstrations run locally in the visitor's browser; no reports or photographs are uploaded.

The original FridgeStreet AI branding, interface designs and film assets are included for this project. No license to reuse them is granted by publication of this repository.
