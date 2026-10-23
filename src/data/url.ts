// Prefixes a root-relative path with the configured base (empty on the own domain).
export const url = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
