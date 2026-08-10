# Upanga: The Soul Blade — temporary website

This is the separate design and content workspace for the temporary Upanga
website at `upangatest.dev`. The live `upanga-web` repository and
`upanga-game.com` deployment are not changed by this project.

The site intentionally keeps the same low-dependency GitHub Pages setup as the
live website: root HTML pages, shared CSS/JS, generated JSON content, a
`CNAME`, and a small GitHub Actions workflow. The visual layer adds GSAP,
Lenis, and Three.js from pinned browser CDN URLs so the project remains easy to
publish through GitHub Pages and Cloudflare.

## Pages

- `index.html` — immersive home page
- `gallery.html` — curated gameplay video and image gallery
- `changelog.html` — project updates, replacing the old dev tracker
- `faq.html` — generated FAQ content
- `privacy.html`, `terms.html`, `data-deletion.html` — legal pages

## Content workflow

- Edit `docs/CHANGELOG.MD` and `docs/FAQ.MD`.
- Run `node scripts/generate-changelog.mjs` and `node scripts/generate-faq.mjs`.
- GitHub Actions regenerates `data/*.json` on changes to the source documents.

The `images/` and `media/` folders contain a deliberately curated first pass
from the cleared Upanga game assets. Source game files stay in the separate
`upanga-game` repository.
