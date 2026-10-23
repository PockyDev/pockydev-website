# PockyDev website

Static website for PockyDev (Android apps Kfz Kennzeichen Finder and Phonea), built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions. No cookies, no tracking, no external fonts or scripts.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run check    # after build: links, language pairs, HTML validation
```

Astro 7 needs Node 22.23.4 or newer (`engines` in `package.json`); CI and deploy use Node 24.

During development the site runs as a GitHub Pages project site at https://pockydev.github.io/pockydev-website/ (`base: '/pockydev-website'` in `astro.config.mjs`) and every page carries `noindex` (`preview: true` in `src/data/site.ts`). Always build internal links and image paths with `url()` from `src/data/url.ts` so they work with and without the base path.

## Structure

- `src/data/site.ts` – owner, address, e-mail, profile links (TODO placeholders until decided)
- `src/data/i18n.ts` – languages, the German/English path of every page (`routes`) and shared UI strings
- `src/data/apps.ts` – app texts per language (name, tagline, facts, screenshots) used by home page and app pages
- `src/pages/` – German pages at the root (home, `apps/<slug>/`, `apps/<slug>/privacy/`, `about-me`, `imprint`, `privacy`, `404`), English pages with the same paths under `src/pages/en/`
- `public/app-ads.txt` – AdMob seller record for the Kfz Kennzeichen Finder
- `.github/workflows/deploy.yml` – builds on push to `main` and deploys to GitHub Pages

## Go-live checklist

1. ~~Fill `src/data/site.ts`~~ done
2. ~~Check the privacy policies against the apps' code~~ done (October 2026); re-check when an app adds or removes an SDK or data flow
3. ~~Settings > Pages > Source: GitHub Actions~~ done
4. Domain: in `astro.config.mjs` set `site` to the domain and remove `base`, add `public/CNAME` and a `public/robots.txt` with the sitemap URL, set `preview: false` in `src/data/site.ts`, configure DNS (A records to GitHub Pages or Cloudflare, `www` CNAME to `pockydev.github.io`), enable "Enforce HTTPS". `app-ads.txt` only works at the domain root, so AdMob verification needs the own domain.
5. Play Console: website and privacy policy URL of both apps; AdMob: verify app-ads.txt
6. Google Search Console: verify domain, submit `sitemap-index.xml`
