# PockyDev website

Static website for PockyDev (Android apps Kfz Kennzeichen Finder and Phonea), built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions. No cookies, no tracking, no external fonts or scripts.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

Astro 5 needs Node 18.20+, 20.3+ or 22.

During development the site runs as a GitHub Pages project site at https://pockydev.github.io/pockydev-website/ (`base: '/pockydev-website'` in `astro.config.mjs`) and every page carries `noindex` (`preview: true` in `src/data/site.ts`). Always build internal links and image paths with `url()` from `src/data/url.ts` so they work with and without the base path.

## Structure

- `src/data/site.ts` – owner, address, e-mail, profile links (TODO placeholders until decided)
- `src/data/apps.ts` – app list (name, package, icon, screenshots) used by home page and app pages
- `src/pages/` – one file per page: home, `apps/<slug>/`, `apps/<slug>/datenschutz/`, `ueber-mich`, `impressum`, `datenschutz`, `404`
- `public/app-ads.txt` – AdMob seller record for the Kfz Kennzeichen Finder
- `.github/workflows/deploy.yml` – builds on push to `main` and deploys to GitHub Pages

## Go-live checklist

1. Fill the TODOs in `src/data/site.ts` (name, address, e-mail, LinkedIn, XING)
2. Have the privacy policy drafts checked (`/datenschutz/`, `/apps/*/datenschutz/`)
3. Settings > Pages > Source: GitHub Actions (already possible during development, pages are `noindex`)
4. Domain: in `astro.config.mjs` set `site` to the domain and remove `base`, add `public/CNAME` and a `public/robots.txt` with the sitemap URL, set `preview: false` in `src/data/site.ts`, configure DNS (A records to GitHub Pages or Cloudflare, `www` CNAME to `pockydev.github.io`), enable "Enforce HTTPS". `app-ads.txt` only works at the domain root, so AdMob verification needs the own domain.
5. Play Console: website and privacy policy URL of both apps; AdMob: verify app-ads.txt
6. Google Search Console: verify domain, submit `sitemap-index.xml`
