export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position used when the frame crops the image. */
  position?: string;
};

export type Film = {
  id: 'origin' | 'breath' | 'transformation' | 'practice' | 'journey' | 'austria' | 'goa' | 'ttc200';
  title: string;
  /** 1440–1600 px landscape encode. */
  desktop: string;
  /** 960 px landscape encode (tablets, phones held sideways). */
  mobile: string;
  /** 540×960 portrait crop for phones held upright: the only part of the frame a phone ever shows. */
  portrait: string;
  /** First frame — matches the scrub start state. */
  poster: string;
  /** Representative frame for reduced motion, slow connections and fallback. */
  still: string;
  portraitPoster: string;
  portraitStill: string;
  /** object-position for the landscape encode in narrow frames (e.g. a 4:5 hero on a phone). */
  mobilePosition?: string;
  alt: string;
  fps: number;
  duration: number;
};

export type Link = { label: string; href: string };
