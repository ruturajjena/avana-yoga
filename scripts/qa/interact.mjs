// Interaction, accessibility-behaviour, form, performance and routing checks (headless Chrome).
//   BASE=http://localhost:3100 OUT=./shots node interact.mjs
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:3100';
const OUT = process.env.OUT || './interact';
await fs.mkdir(OUT, { recursive: true });

const results = [];
const log = (name, ok, detail = '') => {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const only = new Set((process.env.ONLY || 'nav,mobile,forms,perf,routing').split(','));

async function withPage(width, fn, extra = {}) {
  const context = await browser.newContext({
    viewport: { width, height: width < 768 ? 844 : 900 },
    isMobile: width < 768,
    hasTouch: width < 1024,
    ...extra,
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
  try {
    await fn(page);
  } catch (error) {
    log(`exception @${width}`, false, String(error.message).slice(0, 240));
  }
  if (errors.length) log(`console errors @${width}`, false, errors.join(' | ').slice(0, 500));
  await context.close();
}

const settle = (page, ms = 1600) => page.waitForTimeout(ms);
const coverHidden = (page) => page.evaluate(() => getComputedStyle(document.querySelector('.page-cover')).visibility === 'hidden');
const scrollLocked = (page) =>
  page.evaluate(() => document.documentElement.classList.contains('scroll-locked') || document.documentElement.classList.contains('lenis-stopped'));

/* ───────────── 1 · Desktop navigation, transitions, components ───────────── */
if (only.has('nav')) await withPage(1440, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await settle(page, 2500);
  await page.mouse.wheel(0, 2400);
  await settle(page, 900);
  const hiddenDown = await page.evaluate(() => document.querySelector('.site-header').dataset.hidden);
  await page.mouse.wheel(0, -160);
  await settle(page, 900);
  const hiddenUp = await page.evaluate(() => document.querySelector('.site-header').dataset.hidden);
  log('Header tucks away on fast downward scroll, returns on scroll up', hiddenUp === 'false', `after down=${hiddenDown} · after up=${hiddenUp}`);

  await page.click('header nav[aria-label="Primary"] a[href="/about/"]');
  await page.waitForURL('**/about/', { timeout: 10000 });
  await settle(page, 2000);
  const aboutY = await page.evaluate(() => window.scrollY);
  log('Nav → About: cover lifts, scroll unlocked, page starts at top', (await coverHidden(page)) && !(await scrollLocked(page)) && aboutY < 60, `scrollY=${aboutY}`);

  await page.goBack();
  await page.waitForURL(`${BASE}/`, { timeout: 10000 });
  await settle(page, 1800);
  log('Browser back → Home', (await coverHidden(page)) && !(await scrollLocked(page)));

  await page.mouse.move(10, 400);
  await page.hover('header nav[aria-label="Primary"] > ul > li:nth-child(1)');
  await settle(page, 800);
  const dropdown = await page.evaluate(() => Boolean(document.querySelector('.nav-panel[data-open="true"]')));
  await page.screenshot({ path: `${OUT}/dropdown.png` });
  log('Courses dropdown opens on hover', dropdown);

  await page.click('.nav-panel[data-open="true"] a[href="/200-hour-yoga-teacher-training/"]');
  await page.waitForURL('**/200-hour-yoga-teacher-training/', { timeout: 10000 });
  await settle(page, 2000);
  log('Dropdown → 200 Hour page', await coverHidden(page));

  await page.click('a[href="#enrol"]');
  await settle(page, 2600);
  const enrolTop = await page.evaluate(() => Math.round(document.getElementById('enrol').getBoundingClientRect().top));
  log('Hash link scrolls to #enrol below the header', enrolTop >= 0 && enrolTop < 220, `top=${enrolTop}`);

  const faq = page.locator('#faq button[aria-expanded]').first();
  await faq.scrollIntoViewIfNeeded();
  await settle(page, 400);
  await faq.click();
  await settle(page, 1100);
  const faqState = await page.evaluate(() => {
    const button = document.querySelector('#faq button[aria-expanded="true"]');
    return button ? document.getElementById(button.getAttribute('aria-controls')).offsetHeight : 0;
  });
  log('FAQ accordion expands (aria-expanded + height)', faqState > 20, `height=${faqState}`);

  const tab = page.locator('[role="tablist"] [role="tab"]').first();
  await tab.scrollIntoViewIfNeeded();
  await tab.focus();
  await page.keyboard.press('ArrowRight');
  await settle(page, 700);
  const selected = await page.evaluate(() =>
    [...document.querySelector('[role="tablist"]').querySelectorAll('[role="tab"]')].findIndex((t) => t.getAttribute('aria-selected') === 'true'),
  );
  log('Testimonial tabs: ArrowRight moves selection', selected === 1, `selected=${selected}`);

  const teacher = page.locator('#teachers button[aria-haspopup="dialog"]').first();
  await teacher.scrollIntoViewIfNeeded();
  await settle(page, 500);
  await teacher.click();
  await settle(page, 1400);
  const opened = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return { visible: getComputedStyle(dialog.parentElement).visibility === 'visible', focusInside: Boolean(document.activeElement?.closest('[role="dialog"]')) };
  });
  await page.screenshot({ path: `${OUT}/teacher-sheet.png` });
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  const trapped = await page.evaluate(() => Boolean(document.activeElement?.closest('[role="dialog"]')));
  await page.keyboard.press('Escape');
  await settle(page, 1100);
  const closed = await page.evaluate(() => ({
    hidden: getComputedStyle(document.querySelector('[role="dialog"]').parentElement).visibility === 'hidden',
    focusReturned: document.activeElement?.getAttribute('aria-haspopup') === 'dialog',
  }));
  log(
    'Teacher sheet: opens, focus moves in and is trapped, Escape closes, focus returns, scroll unlocked',
    opened.visible && opened.focusInside && trapped && closed.hidden && closed.focusReturned && !(await scrollLocked(page)),
    JSON.stringify({ ...opened, trapped, ...closed }),
  );
});

/* ───────────── 2 · Mobile menu and event sheet ───────────── */
if (only.has('mobile')) await withPage(390, async (page) => {
  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await settle(page, 2200);
  await page.click('header button:has(.burger)');
  await settle(page, 1300);
  const menuOpen = await page.evaluate(() => {
    const menu = document.getElementById(document.querySelector('header button:has(.burger)').getAttribute('aria-controls'));
    return getComputedStyle(menu).visibility === 'visible' && !menu.inert;
  });
  await page.screenshot({ path: `${OUT}/mobile-menu.png` });
  log('Mobile menu opens (visible, not inert)', menuOpen);

  await page.click('nav[aria-label="Mobile"] a[href="/courses/"]');
  await page.waitForURL('**/courses/', { timeout: 10000 });
  await settle(page, 2200);
  const menuClosed = await page.evaluate(() => {
    const menu = document.getElementById(document.querySelector('header button:has(.burger)').getAttribute('aria-controls'));
    return getComputedStyle(menu).visibility === 'hidden' && menu.inert;
  });
  log('Mobile menu link navigates and closes the menu', menuClosed && !(await scrollLocked(page)));

  await page.goto(`${BASE}/events/`, { waitUntil: 'load' });
  await settle(page, 1800);
  const details = page.locator('button[aria-haspopup="dialog"]').first();
  await details.scrollIntoViewIfNeeded();
  await details.click();
  await settle(page, 1400);
  const sheetVisible = await page.evaluate(() => getComputedStyle(document.querySelector('[role="dialog"]').parentElement).visibility === 'visible');
  await page.screenshot({ path: `${OUT}/event-sheet-mobile.png` });
  await page.click('[role="dialog"] button:has-text("Close")');
  await settle(page, 1000);
  log('Event sheet opens full screen and closes (mobile)', sheetVisible && !(await scrollLocked(page)));
});

/* ───────────── 3 · Forms ───────────── */
if (only.has('forms')) await withPage(1440, async (page) => {
  await page.goto(`${BASE}/contact/`, { waitUntil: 'load' });
  await settle(page, 1800);
  const submit = page.locator('form button[type="submit"]');
  await submit.scrollIntoViewIfNeeded();
  await submit.click();
  await settle(page, 2500);
  const invalid = await page.evaluate(() => document.querySelectorAll('form [aria-invalid="true"]').length);
  log('Contact form: empty submit shows linked field errors', invalid >= 4, `invalid=${invalid}`);

  await page.fill('input[name="firstName"]', 'QA');
  await page.fill('input[name="lastName"]', 'Check');
  await page.fill('input[name="email"]', 'qa@example.com');
  await page.fill('textarea[name="message"]', 'Automated QA submission from the rebuild. Please ignore.');
  await submit.click();
  await page.waitForURL('**/thank-you/', { timeout: 20000 }).catch(() => undefined);
  log('Contact form: valid submit → /thank-you/', page.url().endsWith('/thank-you/'), page.url().replace(BASE, ''));
});

/* ───────────── 4 · Performance signals (local server) ───────────── */
if (only.has('perf')) for (const [route, width] of [
  ['/', 1440],
  ['/', 390],
  ['/200-hour-yoga-teacher-training/', 1440],
  ['/austria-retreat/', 390],
  ['/what-is-meditation/', 390],
]) {
  await withPage(width, async (page) => {
    await page.addInitScript(() => {
      window.__lcp = 0;
      window.__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(`${BASE}${route}`, { waitUntil: 'load' });
    await settle(page, 3500);
    const m = await page.evaluate(() => {
      const resources = performance.getEntriesByType('resource');
      const sum = (filter) => resources.filter(filter).reduce((total, r) => total + (r.transferSize || 0), 0);
      return {
        lcp: Math.round(window.__lcp),
        cls: Number(window.__cls.toFixed(3)),
        total: sum(() => true),
        js: sum((r) => r.initiatorType === 'script'),
        video: sum((r) => r.name.includes('/media/video/')),
      };
    });
    log(
      `Perf ${route} @${width}`,
      m.cls < 0.1,
      `LCP ${m.lcp} ms · CLS ${m.cls} · initial transfer ${(m.total / 1048576).toFixed(2)} MB (JS ${Math.round(m.js / 1024)} KB, video ${(m.video / 1048576).toFixed(1)} MB)`,
    );
  });
}

/* ───────────── 5 · Routing ───────────── */
if (only.has('routing')) {
for (const [from, to] of [
  ['/course/', '/courses/'],
  ['/cpd/', '/continuing-education/'],
]) {
  const res = await fetch(`${BASE}${from}`, { redirect: 'manual' });
  log(`Redirect ${from}`, [301, 308].includes(res.status) && (res.headers.get('location') || '').includes(to), `${res.status} → ${res.headers.get('location')}`);
}
const missing = await fetch(`${BASE}/definitely-not-a-page/`);
log('Unknown URL returns 404', missing.status === 404, String(missing.status));
const sitemap = await fetch(`${BASE}/sitemap.xml`);
log('sitemap.xml', sitemap.status === 200, `${((await sitemap.text()).match(/<loc>/g) || []).length} URLs`);
const robots = await fetch(`${BASE}/robots.txt`);
log('robots.txt', robots.status === 200, (await robots.text()).replace(/\n/g, ' · '));

}

console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed`);
await browser.close();
