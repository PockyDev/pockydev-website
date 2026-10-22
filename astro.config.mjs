import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Development phase: GitHub Pages project site at https://pockydev.github.io/pockydev-website/
// Going live on the own domain: set site to 'https://pockydev.de', remove base, add public/CNAME
export default defineConfig({
  site: 'https://pockydev.github.io',
  base: '/pockydev-website',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
