// Checks the built site in dist/: internal links and assets resolve, and every page
// has a German and an English version that point to each other. Run after `npm run build`.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = 'dist';
const config = readFileSync('astro.config.mjs', 'utf8');
const site = config.match(/site:\s*'([^']+)'/)?.[1].replace(/\/$/, '') ?? '';
const base = config.match(/base:\s*'([^']+)'/)?.[1].replace(/\/$/, '') ?? '';
const origin = `${site}${base}`;
const errors = [];

const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith('.html') ? [path] : [];
  });

const pages = new Map(htmlFiles(dist).map((file) => [file, readFileSync(file, 'utf8')]));

const urlOf = (file) => {
  const path = '/' + relative(dist, file).replaceAll('\\', '/');
  return origin + path.replace(/index\.html$/, '');
};

// Maps a URL on this site to its file in dist, or null for external URLs.
const fileOf = (url) => {
  let path = url.split('#')[0].split('?')[0];
  if (path.startsWith(origin + '/')) path = path.slice(origin.length);
  else if (/^[a-z]+:/i.test(path) || path.startsWith('//')) return null;
  else if (path.startsWith(base + '/')) path = path.slice(base.length);
  else return undefined;
  path = decodeURIComponent(path);
  return join(dist, path.endsWith('/') ? join(path, 'index.html') : path);
};

const ids = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const alternates = (html) =>
  Object.fromEntries(
    [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map((m) => [m[1], m[2]]),
  );

for (const [file, html] of pages) {
  const page = relative(dist, file);

  // Links and assets
  const refs = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]*)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]*)"/g)].flatMap((m) => m[1].split(',').map((s) => s.trim().split(/\s+/)[0])),
    ...[...html.matchAll(/<meta property="og:(?:image|url)" content="([^"]*)"/g)].map((m) => m[1]),
  ];
  for (const ref of new Set(refs)) {
    if (!ref || /^(mailto|tel):/.test(ref)) continue;
    if (ref.startsWith('#')) {
      if (ref.length > 1 && !ids(html).has(ref.slice(1))) errors.push(`${page}: anchor ${ref} not found`);
      continue;
    }
    const target = fileOf(ref);
    if (target === null) continue;
    if (target === undefined) {
      errors.push(`${page}: ${ref} is not under the base ${base}/ (use url())`);
      continue;
    }
    if (!existsSync(target)) {
      errors.push(`${page}: ${ref} does not exist`);
      continue;
    }
    const fragment = ref.split('#')[1];
    if (fragment && pages.has(target) && !ids(pages.get(target)).has(fragment)) {
      errors.push(`${page}: anchor #${fragment} not found in ${ref}`);
    }
  }

  // Languages
  if (page === '404.html') continue;
  const own = urlOf(file);
  const lang = html.match(/<html lang="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const alt = alternates(html);
  if (canonical && canonical !== own) errors.push(`${page}: canonical is ${canonical}, expected ${own}`);
  for (const key of ['de', 'en', 'x-default']) {
    if (!alt[key]) errors.push(`${page}: hreflang ${key} missing`);
  }
  if (alt[lang] !== own) errors.push(`${page}: hreflang ${lang} should point to the page itself`);
  if (alt['x-default'] !== alt.de) errors.push(`${page}: hreflang x-default should point to the German page`);
  for (const key of ['de', 'en']) {
    const other = alt[key] && pages.get(fileOf(alt[key]));
    if (!other) continue;
    const back = alternates(other);
    if (back.de !== alt.de || back.en !== alt.en) {
      errors.push(`${page}: hreflang ${key} page ${alt[key]} does not point back`);
    }
  }
}

if (errors.length) {
  console.error(`check-dist: ${errors.length} problem(s)\n` + errors.map((e) => `  ${e}`).join('\n'));
  process.exit(1);
}
console.log(`check-dist: ${pages.size} pages OK`);
