import { chromium } from '@playwright/test';
import { spawn } from 'child_process';

const VIEWPORTS = [
  { name: 'Desktop 1440x900', width: 1440, height: 900 },
  { name: 'Desktop 1280x800', width: 1280, height: 800 },
  { name: 'Tablet 768x1024', width: 768, height: 1024 },
  { name: 'Mobile 375x812', width: 375, height: 812 },
  { name: 'Mobile 390x844', width: 390, height: 844 },
];

const ROUTES = [
  '/',
  '/explore',
  '/shop',
  '/categories',
  '/category/electronics',
  '/category/accessories',
  '/product/prod-aero-headphones',
  '/product/prod-urban-backpack',
  '/wishlist',
  '/cart',
  '/checkout',
  '/confirmation',
  '/order-confirmed',
];

async function runAudit() {
  console.log('--- Launching Preview Server for UI/UX Audit ---');
  const server = spawn('cmd.exe', ['/c', 'npm', 'run', 'preview', '--', '--port', '4173'], {
    env: { ...process.env, PATH: `D:\\programfiles\\nodejs\\nodejs;${process.env.PATH}` },
    stdio: 'pipe',
  });

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const auditResults = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n=== Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
    });

    for (const route of ROUTES) {
      const page = await context.newPage();
      const consoleErrors = [];
      const pageErrors = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (err) => {
        pageErrors.push(err.message);
      });

      try {
        await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle' });

        // Check horizontal overflow
        const overflow = await page.evaluate(() => {
          const docEl = document.documentElement;
          const body = document.body;
          const scrollWidth = Math.max(docEl.scrollWidth, body.scrollWidth);
          const clientWidth = Math.min(docEl.clientWidth, body.clientWidth || docEl.clientWidth);
          return {
            hasOverflow: scrollWidth > clientWidth,
            scrollWidth,
            clientWidth,
            delta: scrollWidth - clientWidth,
          };
        });

        // Check broken images
        const brokenImages = await page.evaluate(() => {
          const imgs = Array.from(document.querySelectorAll('img'));
          return imgs.filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.src);
        });

        const status = {
          viewport: vp.name,
          route,
          overflow: overflow.hasOverflow ? `YES (+${overflow.delta}px)` : 'NO',
          brokenImagesCount: brokenImages.length,
          consoleErrorsCount: consoleErrors.length,
          pageErrorsCount: pageErrors.length,
        };

        if (overflow.hasOverflow || brokenImages.length > 0 || consoleErrors.length > 0 || pageErrors.length > 0) {
          console.warn(`[ISSUE] ${vp.name} on ${route}:`, status);
          if (consoleErrors.length > 0) console.warn(' Console errors:', consoleErrors);
          if (pageErrors.length > 0) console.warn(' Page errors:', pageErrors);
        } else {
          console.log(`[PASS] ${vp.name} on ${route}`);
        }

        auditResults.push(status);
      } catch (err) {
        console.error(`[FAIL] Error loading ${route} on ${vp.name}:`, err.message);
      } finally {
        await page.close();
      }
    }

    await context.close();
  }

  await browser.close();
  server.kill('SIGTERM');

  console.log('\n--- Audit Run Completed ---');
  const issues = auditResults.filter(
    (r) => r.overflow !== 'NO' || r.brokenImagesCount > 0 || r.consoleErrorsCount > 0 || r.pageErrorsCount > 0
  );
  console.log(`Total Checks: ${auditResults.length}, Total Issues: ${issues.length}`);
  process.exit(0);
}

runAudit().catch((err) => {
  console.error('Audit failed:', err);
  process.exit(1);
});
