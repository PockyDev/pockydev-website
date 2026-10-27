# PockyDev website

Static website for PockyDev (Android apps Kfz Kennzeichen Finder and Phonea), built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions. No cookies, no external fonts; the only third-party script is Cloudflare Web Analytics (cookieless).

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
npm run check    # after build: links, language pairs, HTML validation
```

Astro 7 needs Node 22.23.4 or newer (`engines` in `package.json`); CI and deploy use Node 24.

The site runs on GitHub Pages under the custom domain https://pockydev.de (`public/CNAME`, no `base`). `preview: true` in `src/data/site.ts` puts `noindex` on every page. Always build internal links and image paths with `url()` from `src/data/url.ts` so they work with and without a base path.

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
4. ~~Domain pockydev.de (INWX): config, DNS (A/AAAA to GitHub Pages, `www` CNAME to `pockydev.github.io`), Enforce HTTPS~~ done (23.10.2026)
5. ~~Play Console: website and privacy policy URL of both apps~~ done; AdMob: verify `app-ads.txt` (only the Google line; the old host app-ads-txt.com also listed tappx, which the app doesn't use)
6. ~~Google Search Console: verify domain, submit `sitemap-index.xml`~~ done (24.10.2026)
