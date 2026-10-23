# PockyDev website

Static website for PockyDev (Tim's Android apps Kfz Kennzeichen Finder and Phonea). Astro 7 (Node >= 22.23.4), plain CSS, deployed to GitHub Pages at https://pockydev.de by `.github/workflows/deploy.yml` on push to `main`. Communicate with Tim in German; code, commits and docs stay in English.

## Build
- `npm ci && npm run build` (output in `dist/`), `npm run dev` for local preview
- `npm run check` after the build, as in CI (`.github/workflows/check.yml`, runs on every PR): `scripts/check-dist.mjs` checks internal links, assets and anchors, the `url()` base and that every page has a German and English version linked by `hreflang`; `html-validate` (`.htmlvalidate.json`) validates the HTML. Keep both green; don't switch off a rule to get there without a reason in the PR

## Rules
- No cookies and no third-party fonts or embeds. The only third-party script is Cloudflare Web Analytics (cookieless, token in `site.cloudflareAnalyticsToken`, Tim's choice 23.10.2026). Anything else that loads from or sends data to third parties needs Tim's OK, and the privacy pages must change in the same PR.
- Work on a branch and open a PR; `main` deploys.
- Build internal links and asset paths with `url()` from `src/data/url.ts`, so the site keeps working if a base path comes back.
- The site is German (root) and English (`/en/`). Every page exists in both languages: use English path names in both languages (`/about-me/`, `/en/about-me/`), register the pair in `routes` in `src/data/i18n.ts`, pass `lang` and `routeKey` to `Base`, and change both versions in the same PR. Shared UI strings live in `ui` in `src/data/i18n.ts`; app texts per language in `src/data/apps.ts`. The German legal pages are binding.
- Placeholders and shared values (owner, address, e-mail, profile links) live in `src/data/site.ts`; app data in `src/data/apps.ts`.
- App facts (feature lists, numbers, versions) come from the apps' Play Store texts; keep them in sync when an app's listing changes.
- When an app adds or removes an SDK or data flow, update its privacy pages `src/pages/apps/<slug>/privacy/` and `src/pages/en/apps/<slug>/privacy/`.
