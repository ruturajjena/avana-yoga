// QA harness for the Avana Yoga rebuild (headless Chrome via playwright-core).
// Modes:
//   crawl  — every route at 1440 & 390: console/page errors, failed requests, h1, metadata, alt, clipped overflow, JSON-LD
//   widths — key templates at all QA widths: clipped overflow only
//   links  — every internal href found by crawl → HTTP status after redirects
//   shots  — viewport screenshots through a page (by section) at a given width
//   reduced — prefers-reduced-motion screenshots
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.BASE || 'http://localhost:3100';
const OUT = process.env.OUT || path.resolve('out');
const mode = process.argv[2] || 'crawl';
await fs.mkdir(OUT, { recursive: true });

const KEY_ROUTES = [
  '/',
  '/about/',
  '/courses/',
  '/200-hour-yoga-teacher-training/',
  '/300-hour-yoga-teacher-training/',
  '/50-hour-yin-yttc/',
  '/continuing-education/',
  '/pregnancy-yoga/',
  '/yoga-retreats/',
  '/austria-retreat/',
  '/goa-retreat/',
  '/events/',
  '/contact/',
  '/online-yoga-classes/',
  '/online-yoga-courses/',
  '/yoga-styles/',
  '/yoga-classes/',
  '/books/',
  '/yogi-madhav/',
  '/pyc/',
  '/pranayama/',
  '/yoga-therapy/',
  '/registration-form/',
  '/blogs/',
  '/what-is-meditation/',
  '/yoga-retreats-in-india/',
  '/200-hour-yoga-teacher-training-course-landing-page/',
  '/privacy-policy/',
];

async function allRoutes() {
  const xml = await (await fetch(`${BASE}/sitemap.xml`)).text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  return [...new Set([...urls, '/blog/', '/downloads/', '/thank-you/', '/experience-the-ultimate-yoga-retreat-in-india-with-avana-yoga-2/'])];
}

async function pool(items, size, fn) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: size }, async () => {
      while (i < items.length) {
        const index = i++;
        results[index] = await fn(items[index], index);
      }
    }),
  );
  return results;
}

async function scrollThrough(page, step = 700, pause = 70) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height + step; y += step) {
    await page.mouse.wheel(0, step);
    await page.waitForTimeout(pause);
  }
  await page.waitForTimeout(700);
}

async function audit(context, route, width) {
  const page = await context.newPage();
  const issues = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' || msg.type() === 'warning') issues.push(`${msg.type()}: ${msg.text().slice(0, 260)}`);
  });
  page.on('pageerror', (err) => issues.push(`pageerror: ${err.message.slice(0, 260)}`));
  page.on('response', (res) => {
    const url = res.url();
    if (url.startsWith(BASE) && res.status() >= 400) issues.push(`HTTP ${res.status()} ${url.replace(BASE, '')}`);
  });
  page.on('requestfailed', (req) => {
    const url = req.url();
    const error = req.failure()?.errorText || '';
    if (url.startsWith(BASE) && !/ERR_ABORTED/.test(error)) issues.push(`FAILED ${error} ${url.replace(BASE, '')}`);
  });

  let status = null;
  try {
    const response = await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 60000 });
    status = response?.status() ?? null;
    await page.waitForTimeout(1200);
    await scrollThrough(page);
  } catch (error) {
    issues.push(`goto: ${String(error.message).slice(0, 200)}`);
  }

  const report = await page
    .evaluate(() => {
      const vw = window.innerWidth;
      const clipped = [];
      const hasClippingAncestor = (el) => {
        for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
          const s = getComputedStyle(node);
          if (/(hidden|clip|auto|scroll)/.test(s.overflowX) || s.position === 'fixed') return true;
        }
        return false;
      };
      document.querySelectorAll('body *').forEach((el) => {
        const s = getComputedStyle(el);
        if (s.position === 'fixed' || s.visibility === 'hidden' || s.display === 'none') return;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.right > vw + 2 || r.left < -2) {
          if (!hasClippingAncestor(el)) clipped.push(`${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}.${String(el.className).split(' ').slice(0, 3).join('.')} [${Math.round(r.left)}→${Math.round(r.right)}]`);
        }
      });
      const named = (el) => {
        const text = (el.textContent || '').replace(/\s+/g, ' ').trim();
        return text || el.getAttribute('aria-label') || el.querySelector('img[alt]:not([alt=""])') || el.getAttribute('title');
      };
      const unnamed = [...document.querySelectorAll('a[href], button')]
        .filter((el) => el.getAttribute('aria-hidden') !== 'true' && el.getAttribute('tabindex') !== '-1' && !named(el))
        .map((el) => el.outerHTML.slice(0, 140));
      const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
      const dupIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];
      return {
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '',
        robots: document.querySelector('meta[name="robots"]')?.getAttribute('content') || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '',
        h1: document.querySelectorAll('h1').length,
        imgNoAlt: [...document.querySelectorAll('img:not([alt])')].map((img) => img.getAttribute('src')).slice(0, 5),
        unnamed: unnamed.slice(0, 5),
        dupIds: dupIds.slice(0, 8),
        clipped: clipped.slice(0, 6),
        jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
          try {
            JSON.parse(s.textContent);
            return 'ok';
          } catch {
            return 'bad';
          }
        }),
        links: [...new Set([...document.querySelectorAll('a[href]')].map((a) => a.getAttribute('href')))],
        triggers: window.ScrollTrigger ? window.ScrollTrigger.getAll().length : null,
      };
    })
    .catch((error) => ({ evaluateError: String(error.message).slice(0, 200) }));

  await page.close();
  return { route, width, status, issues: [...new Set(issues)], ...report };
}

async function newContext(browser, width, extra = {}) {
  return browser.newContext({
    viewport: { width, height: width < 768 ? 844 : width < 1100 ? 1024 : 900 },
    deviceScaleFactor: 1,
    isMobile: width < 768,
    hasTouch: width < 1024,
    ...extra,
  });
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });

if (mode === 'crawl') {
  const routes = process.env.ROUTES ? process.env.ROUTES.split(',') : await allRoutes();
  const widths = (process.env.WIDTHS || '1440,390').split(',').map(Number);
  const all = [];
  for (const width of widths) {
    const context = await newContext(browser, width);
    const results = await pool(routes, Number(process.env.CONCURRENCY || 4), (route) => audit(context, route, width));
    await context.close();
    all.push(...results);
  }
  await fs.writeFile(path.join(OUT, `crawl-${Date.now()}.json`), JSON.stringify(all, null, 2));
  for (const r of all) {
    const problems = [
      r.status !== 200 && r.route !== '/downloads/' ? `status ${r.status}` : null,
      r.h1 !== 1 ? `h1=${r.h1}` : null,
      !r.title ? 'no title' : null,
      !r.description ? 'no description' : null,
      !r.canonical ? 'no canonical' : null,
      r.imgNoAlt?.length ? `imgNoAlt ${r.imgNoAlt.join(' ')}` : null,
      r.unnamed?.length ? `unnamed ${r.unnamed.join(' | ')}` : null,
      r.dupIds?.length ? `dupIds ${r.dupIds.join(',')}` : null,
      r.clipped?.length ? `clipped ${r.clipped.join(' | ')}` : null,
      r.jsonld?.includes('bad') ? 'bad jsonld' : null,
      r.evaluateError ? r.evaluateError : null,
      ...(r.issues || []),
    ].filter(Boolean);
    if (problems.length) console.log(`\n✗ ${r.width} ${r.route}\n  - ${problems.join('\n  - ')}`);
  }
  const titles = new Map();
  all.filter((r) => r.width === widths[0]).forEach((r) => titles.set(r.title, [...(titles.get(r.title) || []), r.route]));
  const dupTitles = [...titles.entries()].filter(([, routes]) => routes.length > 1);
  if (dupTitles.length) console.log('\nDuplicate titles:', JSON.stringify(dupTitles, null, 1));
  const links = [...new Set(all.flatMap((r) => r.links || []))];
  await fs.writeFile(path.join(OUT, 'links.json'), JSON.stringify(links, null, 1));
  console.log(`\nAudited ${all.length} page loads · ${links.length} unique hrefs · clean: ${all.filter((r) => !(r.issues || []).length && r.h1 === 1 && !(r.clipped || []).length).length}`);
}

if (mode === 'widths') {
  const widths = [1440, 1280, 1024, 768, 430, 390, 375];
  for (const width of widths) {
    const context = await newContext(browser, width);
    const results = await pool(KEY_ROUTES, 4, (route) => audit(context, route, width));
    await context.close();
    for (const r of results) {
      const bad = [...(r.clipped || []), ...(r.issues || [])];
      if (bad.length) console.log(`✗ ${width} ${r.route}\n  - ${bad.join('\n  - ')}`);
    }
    console.log(`width ${width}: ${results.filter((r) => !(r.clipped || []).length && !(r.issues || []).length).length}/${results.length} clean`);
  }
}

if (mode === 'links') {
  const file = (await fs.readdir(OUT)).find((f) => f === 'links.json');
  const links = JSON.parse(await fs.readFile(path.join(OUT, file), 'utf8'));
  const internal = links.filter((href) => href.startsWith('/') && !href.startsWith('//'));
  const external = links.filter((href) => /^https?:/.test(href));
  const bad = [];
  await pool(internal, 8, async (href) => {
    const clean = href.split('#')[0] || '/';
    const res = await fetch(`${BASE}${clean}`, { redirect: 'follow' }).catch(() => null);
    if (!res || res.status >= 400) bad.push(`${res?.status ?? 'ERR'} ${href}`);
  });
  console.log(`internal hrefs: ${internal.length} · broken: ${bad.length}`);
  bad.forEach((b) => console.log('  ✗', b));
  console.log(`external hrefs (${external.length}):\n  ${external.join('\n  ')}`);
}

if (mode === 'shots' || mode === 'reduced') {
  const route = process.env.ROUTE || '/';
  const width = Number(process.env.WIDTH || 1440);
  const tag = process.env.TAG || route.replace(/\//g, '_') || 'home';
  const context = await newContext(browser, width, mode === 'reduced' ? { reducedMotion: 'reduce' } : {});
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('console', (msg) => msg.type() === 'error' && errors.push(msg.text()));
  await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: path.join(OUT, `${tag}-${width}-00.png`) });
  const stops = await page.evaluate(() => {
    const positions = [];
    document.querySelectorAll('main > section, main > div, main > nav, footer').forEach((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const h = el.offsetHeight;
      const vh = window.innerHeight;
      if (h > vh * 1.6) {
        for (const f of [0.25, 0.5, 0.8]) positions.push(Math.round(top + (h - vh) * f));
      } else {
        positions.push(Math.round(top));
      }
    });
    return [...new Set(positions)].filter((y) => y > 40).sort((a, b) => a - b);
  });
  const limit = Number(process.env.LIMIT || 40);
  let n = 1;
  for (const y of stops.slice(0, limit)) {
    await page.evaluate((target) => window.scrollTo(0, target), y);
    await page.waitForTimeout(Number(process.env.WAIT || 1300));
    await page.screenshot({ path: path.join(OUT, `${tag}-${width}-${String(n).padStart(2, '0')}.png`) });
    n += 1;
  }
  console.log(`${tag} ${width}: ${n} shots · errors: ${errors.length ? errors.join(' | ').slice(0, 800) : 'none'}`);
  await context.close();
}

await browser.close();
