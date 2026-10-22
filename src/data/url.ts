// Prefixes a root-relative path with the configured base (e.g. /pockydev-website on GitHub Pages).
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
