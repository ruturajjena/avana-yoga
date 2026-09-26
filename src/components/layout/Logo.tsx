import Image from 'next/image';

type LogoProps = {
  className?: string;
  /** Accessible name. Omit for decorative marks (header, footer, covers). */
  title?: string;
  /** Above-the-fold marks (header) load eagerly. */
  preload?: boolean;
};

/**
 * Avana Yoga's mark: the AY ring, supplied by the client (public/media/brand/ay-mark.png).
 * The single source of the logo across the site — header, footer, page-transition cover,
 * media placeholders and the call-to-action seed.
 */
export function Logo({ className, title, preload = false }: LogoProps) {
  return (
    <Image
      src="/media/brand/ay-mark.png"
      alt={title ?? ''}
      width={512}
      height={512}
      preload={preload}
      className={className}
      aria-hidden={title ? undefined : true}
    />
  );
}
