/**
 * The scroll-controlled films: five narrative films, the two retreat hero films and the 200 Hour hero film. Sources and encodes are documented in docs/ASSET-MAP.md.
 * Three encodes per film: desktop (landscape), mobile (landscape, 960 px) and portrait (540×960 crop for upright phones:
 * breath framed at 30%, practice at 40%, the rest centred).
 * All: short GOP, no B-frames, faststart, video track only — every seek decodes at most 7–9 frames.
 */
import type { Film } from '@/lib/types';

const V = '/media/video';
const P = '/media/posters';

const encodes = (name: string, still: string) => ({
  desktop: `${V}/${name}-desktop.mp4`,
  mobile: `${V}/${name}-mobile.mp4`,
  portrait: `${V}/${name}-portrait.mp4`,
  poster: `${P}/${name}.webp`,
  still: `${P}/${still}.webp`,
  portraitPoster: `${P}/${name}-portrait.webp`,
  portraitStill: `${P}/${still}-portrait.webp`,
});

export const films: Record<Film['id'], Film> = {
  origin: {
    id: 'origin',
    title: 'The Origin',
    ...encodes('the-origin', 'the-origin-end'),
    alt: 'A single ring pressed into sand ripples outward into concentric circles that rise into mountain ranges around a seated meditator.',
    fps: 24,
    duration: 10,
  },
  breath: {
    id: 'breath',
    title: 'The Breath',
    // Source: surya-namaskar-updated.mov (2026-09), one continuous take, 60 → 30 fps. The yogi sits left of centre.
    // '-v2' names: new files, so browsers never reuse a cached copy of the previous film (media is cached 30 days).
    ...encodes('the-breath-v2', 'the-breath-v2-still'),
    mobilePosition: '30% 50%',
    alt: 'A yogi in white moves through Surya Namaskar, the sun salutation, beside an ancient temple.',
    fps: 30,
    duration: 10.3,
  },
  transformation: {
    id: 'transformation',
    title: 'The Transformation',
    ...encodes('the-transformation', 'the-transformation-still'),
    alt: 'A dark stone on sand is carved into a mandala, dissolves into smoke and redraws itself as a human figure in Warrior II before settling as a smooth pale stone.',
    fps: 24,
    duration: 10,
  },
  practice: {
    id: 'practice',
    title: 'The Practice',
    ...encodes('the-practice', 'the-practice-still'),
    // Head, arms and knees of Bakasana stay in a narrow crop.
    mobilePosition: '31% 50%',
    alt: 'A yogi in white lowers into Bakasana, crow pose, and holds the balance beside a temple ruin.',
    fps: 30,
    duration: 11.73,
  },
  journey: {
    id: 'journey',
    title: 'The Journey',
    ...encodes('the-journey', 'the-journey-still'),
    alt: 'A yogi in white rises into a headstand and moves through inversions in the courtyard of an ancient temple.',
    fps: 30,
    duration: 12.27,
  },
  // Austria: generated in Google Flow from the live hero photograph, trimmed to 238 frames.
  austria: {
    id: 'austria',
    title: 'Austria',
    ...encodes('austria-hero', 'austria-hero'),
    alt: 'The camera rises slowly over a rooftop yoga class in Schladming towards the Dachstein mountains and the valley below.',
    fps: 24,
    duration: 9.92,
  },
  goa: {
    id: 'goa',
    title: 'Goa',
    // Source: goa-retreat .mov (2026-09), 60 → 30 fps. Its letterboxed opening shot is cropped to fill the frame.
    ...encodes('goa-hero-v2', 'goa-hero-v2'),
    alt: 'Aerial views of palm-lined beaches and the coast of Goa, the sun setting over rice fields, and a group practising yoga on a hilltop above the sea.',
    fps: 30,
    duration: 12.9,
  },
  ttc200: {
    id: 'ttc200',
    title: '200 Hour Yoga Teacher Training',
    // Source: 200-hour.mov (2026-09), 60 → 30 fps: a montage of hands-on adjustments in the shala.
    ...encodes('ttc200-hero', 'ttc200-hero-still'),
    mobilePosition: '45% 50%',
    alt: 'A teacher guides and adjusts a student through a supported headstand in a yoga shala.',
    fps: 30,
    duration: 12.43,
  },
};
