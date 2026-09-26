export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ');
}

export const clamp = (value: number, min = 0, max = 1) => Math.min(Math.max(value, min), max);

export function isExternalHref(href: string) {
  return /^(https?:)?\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:');
}

export function padIndex(index: number) {
  return String(index).padStart(2, '0');
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));
}

/** Trailing-slash normalisation matching `trailingSlash: true`. */
export function normalizePath(pathname: string) {
  if (!pathname) return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}
