import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Live on the own domain (GitHub Pages custom domain, see public/CNAME)
export default defineConfig({
  site: 'https://pockydev.de',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
