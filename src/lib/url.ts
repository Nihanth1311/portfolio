// Prefixes a site-relative path with the base the site is served from.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const withBase = (path: string) => `${base}${path}`;
