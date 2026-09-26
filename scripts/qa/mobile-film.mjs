// Functional check of the mobile media strategy against a running production build.
// Phone: no film bytes before interaction, portrait encodes + posters on full-screen stages, landscape encode with
// film framing on 4:5 heroes, scrubbing still works after the first scroll, no WebGL, no Lenis, anchor offset.
// Desktop: desktop encodes load after idle, WebGL + Lenis active. Reduced motion / Save-Data: stills + Play button.
import { chromium } from 'playwright-core';

const BASE = process.env.BASE || 'http://localhost:3200';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? `  — ${detail}` : ''}`);
};
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const only = process.env.ONLY ? new Set(process.env.ONLY.split(',')) : null;
const run = (group) => !only || only.has(group);

async function withPage(options, fn) {
  const context = await browser.newContext(options);
  const page = await context.newPage();
  const videos = [];
  const errors = [];
  page.on('request', (request) => {
    if (/\.mp4(\?|$)/.test(request.url())) videos.push(request.url().replace(BASE, ''));
  });
  page.on('pageerror', (error) => errors.push(error.message));
  try {
    await fn(page, videos, errors);
  } finally {
    await context.close();
  }
}

const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

/** Scrolls through the section that owns a film and samples video.currentTime at each fraction. */
async function sampleFilm(page, id, fractions) {
  const samples = [];
  for (const f of fractions) {
    await page.evaluate(
      ([filmId, fraction]) => {
        const wrap = document.querySelector(`[data-film="${filmId}"]`);
        const section = wrap.closest('[data-video-trigger], section') || wrap;
        const top = section.getBoundingClientRect().top + window.scrollY;
        const range = Math.max(section.offsetHeight - window.innerHeight, 1);
        window.scrollTo(0, top + range * fraction);
      },
      [id, f],
    );
    await wait(900);
    samples.push(await page.evaluate((filmId) => Number(document.querySelector(`[data-film="${filmId}"] video`).currentTime.toFixed(2)), id));
  }
  return samples;
}

const rising = (values) => values.every((v, i) => i === 0 || v > values[i - 1]);

// ─── Phone · home ───────────────────────────────────────────────────────────────
if (run('phone-home')) await withPage(phone, async (page, videos, errors) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await wait(4000);
  check('phone /: no film bytes before interaction', videos.length === 0, videos.join(', '));
  const env = await page.evaluate(() => ({
    noWebgl: document.documentElement.classList.contains('no-webgl'),
    canvases: document.querySelectorAll('canvas').length,
    lenis: document.documentElement.classList.contains('lenis'),
    poster: document.querySelector('[data-film="origin"] img')?.currentSrc ?? '',
    grain: (() => {
      const g = document.querySelector('.grain');
      return g ? getComputedStyle(g).display : 'absent';
    })(),
  }));
  check('phone /: WebGL skipped (static rings)', env.noWebgl && env.canvases === 0, `canvases ${env.canvases}`);
  check('phone /: native scrolling (no Lenis)', !env.lenis);
  check('phone /: portrait poster', env.poster.includes('the-origin-portrait'), decodeURIComponent(env.poster).slice(-70));
  check('phone /: grain overlay off', env.grain === 'none' || env.grain === 'absent', env.grain);

  await page.evaluate(() => window.scrollBy(0, 120));
  await page.waitForSelector('[data-film="origin"][data-video-ready="true"]', { timeout: 15000 }).catch(() => undefined);
  check('phone /: origin portrait encode after first scroll', videos.includes('/media/video/the-origin-portrait.mp4'), videos.join(', '));
  const origin = await sampleFilm(page, 'origin', [0.15, 0.45, 0.75]);
  check('phone /: origin scrubs with scroll', rising(origin), origin.join(' → '));

  for (const id of ['breath', 'practice', 'journey', 'transformation']) {
    await sampleFilm(page, id, [0]);
    await page.waitForSelector(`[data-film="${id}"][data-video-ready="true"]`, { timeout: 15000 }).catch(() => undefined);
    const fractions = id === 'practice' ? [0.1, 0.25, 0.4] : id === 'journey' ? [0.6, 0.75, 0.9] : [0.25, 0.5, 0.75];
    const samples = await sampleFilm(page, id, fractions);
    const encode = `/media/video/the-${id}-portrait.mp4`;
    check(`phone /: ${id} portrait encode + scrub`, videos.includes(encode) && rising(samples), `${samples.join(' → ')}`);
  }
  check('phone /: no landscape encodes requested', !videos.some((v) => /-(desktop|mobile)\.mp4/.test(v)), videos.join(', '));
  check('phone /: no page errors', errors.length === 0, errors.join(' | '));
});

// ─── Phone · 200hr (4:5 hero keeps the landscape encode, film framing) + anchor offset without Lenis ───────
if (run('phone-200')) await withPage(phone, async (page, videos, errors) => {
  await page.goto(`${BASE}/200-hour-yoga-teacher-training/`, { waitUntil: 'load' });
  await wait(1500);
  const hero = await page.evaluate(() => {
    const img = document.querySelector('[data-film="breath"] img');
    return { src: img?.currentSrc ?? '', position: img ? getComputedStyle(img).objectPosition : '' };
  });
  check('phone 200hr: landscape poster in 4:5 hero', hero.src.includes('the-breath.webp') && !hero.src.includes('portrait'), decodeURIComponent(hero.src).slice(-60));
  check('phone 200hr: film framing 18% 50%', hero.position === '18% 50%', hero.position);

  const link = page.getByRole('link', { name: /dates & details/i }).first();
  await link.click();
  await wait(1800);
  const offset = await page.evaluate(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const el = id ? document.getElementById(id) : null;
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  });
  check('phone 200hr: anchor clears the fixed header', offset !== null && offset >= 40 && offset <= 160, `target top ${offset}px`);

  await page.evaluate(() => window.scrollTo(0, 0));
  await wait(600);
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForSelector('[data-film="breath"][data-video-ready="true"]', { timeout: 15000 }).catch(() => undefined);
  check('phone 200hr: mobile landscape encode', videos.includes('/media/video/the-breath-mobile.mp4'), videos.join(', '));
  check('phone 200hr: no page errors', errors.length === 0, errors.join(' | '));
});

// ─── Phone · reduced motion ─────────────────────────────────────────────────────
if (run('reduced')) await withPage({ ...phone, reducedMotion: 'reduce' }, async (page, videos) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.evaluate(() => window.scrollBy(0, 400));
  await wait(3500);
  const state = await page.evaluate(() => ({
    poster: document.querySelector('[data-film="origin"] img')?.currentSrc ?? '',
    button: Boolean(document.querySelector('[data-film="breath"] button')),
  }));
  check('reduced motion: stills, Play button on Breath, no film bytes', state.poster.includes('the-origin-end-portrait') && state.button && videos.length === 0, `${decodeURIComponent(state.poster).slice(-45)} · button ${state.button} · videos ${videos.length}`);
});

// ─── Phone · Save-Data ──────────────────────────────────────────────────────────
if (run('savedata')) await withPage(phone, async (page, videos) => {
  await page.addInitScript(() => {
    const info = Object.assign(new EventTarget(), { saveData: true, effectiveType: '4g' });
    Object.defineProperty(Navigator.prototype, 'connection', { get: () => info, configurable: true });
  });
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.evaluate(() => window.scrollBy(0, 400));
  await wait(3500);
  const button = await page.evaluate(() => Boolean(document.querySelector('[data-film="breath"] button')));
  check('save-data: stills, Play button on Breath, no film bytes', button && videos.length === 0, `button ${button} · videos ${videos.join(', ') || 0}`);
});

// ─── Desktop · home ─────────────────────────────────────────────────────────────
if (run('desktop')) await withPage({ viewport: { width: 1440, height: 900 } }, async (page, videos, errors) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForSelector('canvas', { timeout: 8000 }).catch(() => undefined);
  await wait(2500);
  const env = await page.evaluate(() => ({
    canvases: document.querySelectorAll('canvas').length,
    lenis: document.documentElement.classList.contains('lenis'),
    poster: document.querySelector('[data-film="origin"] img')?.currentSrc ?? '',
  }));
  check('desktop /: WebGL breath field active', env.canvases > 0);
  check('desktop /: Lenis active', env.lenis);
  check('desktop /: landscape poster', env.poster.includes('the-origin.webp'), decodeURIComponent(env.poster).slice(-60));
  check('desktop /: desktop encode after idle (no interaction needed)', videos.includes('/media/video/the-origin-desktop.mp4'), videos.join(', '));
  check('desktop /: no page errors', errors.length === 0, errors.join(' | '));
});

await browser.close();
const failed = results.filter((r) => !r.ok).length;
console.log(`\n${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
