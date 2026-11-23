import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function main() {
  const evidenceDir = path.resolve(process.cwd(), 'evidence/phase1');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  console.log('Starting preview server...');
  const server = spawn('cmd.exe', ['/c', 'npm', 'run', 'preview', '--', '--port', '4173'], {
    env: { ...process.env, PATH: `D:\\programfiles\\nodejs\\nodejs;${process.env.PATH}` },
    stdio: 'pipe',
  });

  // Wait 3 seconds for preview server
  await new Promise((r) => setTimeout(r, 3000));

  console.log('Launching Chrome browser for visual inspection...');
  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const consoleErrors = [];
  const failedRequests = [];

  // --- 1. Desktop Visual Inspection (1280x800) ---
  const desktopContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
  });
  const desktopPage = await desktopContext.newPage();

  desktopPage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  desktopPage.on('requestfailed', (req) => {
    failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  await desktopPage.goto('http://localhost:4173');
  await desktopPage.waitForSelector('[data-testid="product-catalog-grid"]');

  // Verify products
  const productA = await desktopPage.locator('[data-testid="product-card-prod-aero-headphones"]').isVisible();
  const productB = await desktopPage.locator('[data-testid="product-card-prod-urban-backpack"]').isVisible();

  // Check horizontal overflow
  const desktopOverflow = await desktopPage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  const desktopScreenshotPath = path.join(evidenceDir, 'desktop-view.png');
  await desktopPage.screenshot({ path: desktopScreenshotPath, fullPage: true });
  console.log(`Desktop screenshot captured at: ${desktopScreenshotPath}`);

  // --- 2. Mobile Visual Inspection (375x812 iPhone) ---
  const mobileContext = await browser.newContext({
    viewport: { width: 375, height: 812 },
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  mobilePage.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  mobilePage.on('requestfailed', (req) => {
    failedRequests.push(`${req.url()} (${req.failure()?.errorText})`);
  });

  await mobilePage.goto('http://localhost:4173');
  await mobilePage.waitForSelector('[data-testid="product-catalog-grid"]');

  // Check mobile horizontal overflow
  const mobileOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });

  const mobileScreenshotPath = path.join(evidenceDir, 'mobile-view.png');
  await mobilePage.screenshot({ path: mobileScreenshotPath, fullPage: true });
  console.log(`Mobile screenshot captured at: ${mobileScreenshotPath}`);

  // Clean up
  await browser.close();
  server.kill();

  console.log('--- VERIFICATION SUMMARY ---');
  console.log(`Product A (Aero Wireless Headphones) visible: ${productA}`);
  console.log(`Product B (Urban Everyday Backpack) visible: ${productB}`);
  console.log(`Desktop horizontal overflow: ${desktopOverflow}`);
  console.log(`Mobile horizontal overflow: ${mobileOverflow}`);
  console.log(`Console errors count: ${consoleErrors.length}`);
  if (consoleErrors.length > 0) {
    console.log('Console errors:', consoleErrors);
  }
  console.log(`Failed network requests: ${failedRequests.length}`);
  if (failedRequests.length > 0) {
    console.log('Failed requests:', failedRequests);
  }
}

main().catch((err) => {
  console.error('Inspection failed:', err);
  process.exit(1);
});
