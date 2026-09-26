// Mobile performance probe: iPhone-sized viewport, DPR 3, 4× CPU slowdown, "slow 4G" network (1.6 Mbps / 150 ms RTT).
// Reports FCP, LCP, TBT, CLS, bytes by type, JS chunks, WebGL presence, and scroll jank under throttling.
import { chromium } from 'playwright-core';
import fs from 'node:fs/promises';

const BASE = process.env.BASE || 'http://localhost:3200';
const LABEL = process.env.LABEL || 'baseline';
const OUT = process.env.OUT || '.';
const routes = (process.env.ROUTES || '/,/200-hour-yoga-teacher-training/,/austria-retreat/,/about/,/courses/,/what-is-meditation/').split(',');

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const rows = [];

for (const route of routes) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions', {
    offline: false,
    latency: 150,
    downloadThroughput: (1.6 * 1024 * 1024) / 8,
    uploadThroughput: (750 * 1024) / 8,
  });
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });

  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));

  await page.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0, fcp: 0, long: [] };
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__m.lcp = e.startTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (e.name === 'first-contentful-paint') window.__m.fcp = e.startTime;
    }).observe({ type: 'paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) window.__m.long.push([e.startTime, e.duration]);
    }).observe({ type: 'longtask', buffered: true });
  });

  await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 180000 });
  await page.waitForTimeout(9000);

  const load = await page.evaluate(() => {
    const m = window.__m;
    const tbt = m.long.filter(([start]) => start >= m.fcp).reduce((total, [, duration]) => total + Math.max(0, duration - 50), 0);
    const resources = performance.getEntriesByType('resource');
    const kb = (filter) => Math.round(resources.filter(filter).reduce((t, r) => t + (r.transferSize || 0), 0) / 1024);
    const scripts = resources
      .filter((r) => r.name.includes('.js'))
      .map((r) => [r.name.split('/').pop().slice(0, 28), Math.round((r.transferSize || 0) / 1024), Math.round((r.decodedBodySize || 0) / 1024)])
      .sort((a, b) => b[1] - a[1]);
    return {
      fcp: Math.round(m.fcp),
      lcp: Math.round(m.lcp),
      tbt: Math.round(tbt),
      cls: Number(m.cls.toFixed(3)),
      jsKB: kb((r) => r.name.includes('.js')),
      imgKB: kb((r) => r.name.includes('/_next/image') || r.initiatorType === 'img'),
      fontKB: kb((r) => r.name.includes('.woff2')),
      videoKB: kb((r) => r.name.includes('/media/video/')),
      requests: resources.length,
      webgl: Boolean(document.querySelector('canvas.breath-canvas')),
      scripts: scripts.slice(0, 7),
    };
  });

  const scroll = await page.evaluate(async () => {
    const frames = [];
    let last = performance.now();
    let running = true;
    const loop = (t) => {
      frames.push(t - last);
      last = t;
      if (running) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    const longBefore = window.__m.long.length;
    const total = Math.min(document.documentElement.scrollHeight - innerHeight, 14000);
    for (let y = 0; y <= total; y += 70) {
      window.scrollTo(0, y);
      await new Promise((resolve) => requestAnimationFrame(resolve));
    }
    running = false;
    const sorted = [...frames].sort((a, b) => a - b);
    const long = window.__m.long.slice(longBefore);
    return {
      frames: frames.length,
      jankyFrames: frames.filter((f) => f > 50).length,
      p95ms: Math.round(sorted[Math.floor(sorted.length * 0.95)] || 0),
      longTasks: long.length,
      longTaskMs: Math.round(long.reduce((t, [, d]) => t + d, 0)),
    };
  });

  const row = { label: LABEL, route, ...load, scroll, errors: errors.length };
  rows.push(row);
  console.log(
    `${route}  FCP ${load.fcp} · LCP ${load.lcp} · TBT ${load.tbt} · CLS ${load.cls} · JS ${load.jsKB}KB · img ${load.imgKB}KB · font ${load.fontKB}KB · video ${load.videoKB}KB · req ${load.requests} · webgl ${load.webgl} · scroll: ${scroll.jankyFrames}/${scroll.frames} janky, p95 ${scroll.p95ms}ms, long ${scroll.longTasks} (${scroll.longTaskMs}ms) · errors ${errors.length}`,
  );
  console.log(`   top JS: ${load.scripts.map(([n, t, d]) => `${n} ${t}KB/${d}KB`).join(' · ')}`);
  await context.close();
}

await fs.writeFile(`${OUT}/mobile-perf-${LABEL}.json`, JSON.stringify(rows, null, 2));
await browser.close();
