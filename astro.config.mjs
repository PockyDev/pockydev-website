import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// TODO: final domain (pockydev.de or pockydev.github.io), see README
export default defineConfig({
  site: 'https://pockydev.de',
  trailingSlash: 'always',
  integrations: [sitemap()],
});
