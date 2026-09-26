import { createHash } from 'node:crypto';

export const DOWNLOADS_COOKIE = 'avana_downloads';

export function downloadsToken(secret: string) {
  return createHash('sha256').update(`avana-downloads:${secret}`).digest('hex');
}

export type DownloadItem = { title: string; description?: string; href: string; size?: string };

/**
 * The live /downloads/ page is password-protected, so its files are not public.
 * Nothing is invented here: add the student materials (e.g. into /public/media/downloads/) when ready.
 */
export const downloads: DownloadItem[] = [];
