'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

/** Renders children everywhere except the given paths (e.g. the footer contact cards on /contact/, which has its own). */
export function HideOnPaths({ paths, children }: { paths: string[]; children: ReactNode }) {
  const pathname = usePathname();
  const normalised = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return paths.includes(normalised) ? null : <>{children}</>;
}
