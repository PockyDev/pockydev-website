# PockyDev website

Static website for PockyDev (Android apps Kfz Kennzeichen Finder and Phonea), built with [Astro](https://astro.build) and deployed to GitHub Pages via GitHub Actions. No cookies, no tracking, no external fonts or scripts.

## Develop

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # output in dist/
```

Astro 5 needs Node 18.20+, 20.3+ or 22.

## Structure

- `src/data/site.ts` – owner, address, e-mail, profile links (TODO placeholders until decided)
- `src/data/apps.ts` – app list (name, package, icon, screenshots) used by home page and app pages
- `src/pages/` – one file per page: home, `apps/<slug>/`, `apps/<slug>/datenschutz/`, `ueber-mich`, `impressum`, `datenschutz`, `404`
- `public/app-ads.txt` – AdMob seller record for the Kfz Kennzeichen Finder
- `.github/workflows/deploy.yml` – builds on push to `main` and deploys to GitHub Pages

## Go-live checklist

1. Fill the TODOs in `src/data/site.ts` (name, address, e-mail, LinkedIn, XING)
2. Have the privacy policy drafts checked (`/datenschutz/`, `/apps/*/datenschutz/`)
3. Create the GitHub repo, push, Settings > Pages > Source: GitHub Actions
4. Domain: set `site` in `astro.config.mjs` and `public/robots.txt`, add `public/CNAME`, configure DNS (A records to GitHub Pages, `www` CNAME to `pockydev.github.io`), enable "Enforce HTTPS"
5. Play Console: website and privacy policy URL of both apps; AdMob: verify app-ads.txt
6. Google Search Console: verify domain, submit `sitemap-index.xml`
