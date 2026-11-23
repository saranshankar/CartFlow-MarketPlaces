import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function executeManualQAScenarios() {
  const screenshotsDir = path.resolve(process.cwd(), 'artifacts/screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  const brainArtifactDir = 'C:\\Users\\HEMANTH\\.gemini\\antigravity\\brain\\e7e08ea3-f186-460b-a030-fb4ab9e4f033';

  console.log('--- Launching Preview Server for Manual QA Execution ---');
  const server = spawn('cmd.exe', ['/c', 'npm', 'run', 'preview', '--', '--port', '4173'], {
    env: { ...process.env, PATH: `D:\\programfiles\\nodejs\\nodejs;${process.env.PATH}` },
    stdio: 'pipe',
  });

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  // ==========================================
  // Test M01: Empty cart checkout
  // ==========================================
  console.log('\n--- Executing Test M01: Empty Cart Checkout ---');
  const contextM01 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pageM01 = await contextM01.newPage();

  await pageM01.goto('http://localhost:4173/checkout');
  await pageM01.waitForSelector('[data-testid="customer-name-input"]');

  // Step 2: Ensure cart is empty
  const isEmptyVisible = await pageM01.locator('[data-testid="empty-cart-state"]').isVisible();
  console.log(`M01 Step 2: Cart empty state initially visible: ${isEmptyVisible}`);

  // Step 3: Enter customer name "Jane Doe"
  await pageM01.fill('[data-testid="customer-name-input"]', 'Jane Doe');
  const enteredName = await pageM01.inputValue('[data-testid="customer-name-input"]');
  console.log(`M01 Step 3: Customer name entered: "${enteredName}"`);

  // Step 4: Click Place Order
  await pageM01.click('[data-testid="checkout-submit-button"]');

  // Step 5: Observe result
  const cartErrorAlert = pageM01.locator('[data-testid="cart-error"]');
  await cartErrorAlert.waitFor({ state: 'visible', timeout: 3000 });
  const errorText = await cartErrorAlert.innerText();
  const confirmationVisible = await pageM01.locator('[data-testid="order-confirmation-view"]').isVisible();
  const isUsable = await pageM01.locator('[data-testid="checkout-submit-button"]').isVisible();
  const preservedName = await pageM01.inputValue('[data-testid="customer-name-input"]');

  const m01Passed = !confirmationVisible && errorText.includes('empty') && isUsable && preservedName === 'Jane Doe';
  console.log(`M01 Observations:
  - Error message displayed: "${errorText.trim()}"
  - Success confirmation rendered: ${confirmationVisible} (Expected: false)
  - Name preserved in input: "${preservedName}"
  - Application remains usable: ${isUsable}
  - Test M01 Result: ${m01Passed ? 'PASS' : 'FAIL'}`);

  const m01ScreenshotPath = path.join(screenshotsDir, 'empty-cart-manual.png');
  await pageM01.screenshot({ path: m01ScreenshotPath, fullPage: true });
  console.log(`M01 Evidence captured at: ${m01ScreenshotPath}`);
  await contextM01.close();

  // ==========================================
  // Test M02: Rapid double-click
  // ==========================================
  console.log('\n--- Executing Test M02: Rapid Double-Click Protection ---');
  const contextM02 = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const pageM02 = await contextM02.newPage();

  // Step 1: Add product on collection page
  await pageM02.goto('http://localhost:4173/shop');
  await pageM02.waitForSelector('[data-testid="product-catalog-grid"]');
  await pageM02.click('[data-testid="add-to-cart-prod-aero-headphones"]');

  // Step 2: Navigate to checkout and enter valid customer name
  await pageM02.goto('http://localhost:4173/checkout');
  await pageM02.waitForSelector('[data-testid="customer-name-input"]');
  await pageM02.fill('[data-testid="customer-name-input"]', 'Jane Doe');

  // Step 3: Rapidly click Place Order twice in succession
  const submitButton = pageM02.locator('[data-testid="checkout-submit-button"]');
  await Promise.all([
    submitButton.click(),
    submitButton.click().catch(() => {}),
  ]);

  // Step 4 & 5: Inspect resulting interface and count confirmations
  await pageM02.waitForSelector('[data-testid="order-confirmation-view"]', { timeout: 5000 });
  const confirmationCount = await pageM02.locator('[data-testid="order-confirmation-view"]').count();

  // Step 6: Inspect generated order reference
  const orderRefText = await pageM02.locator('[data-testid="order-reference"]').innerText();
  const refMatches = /^CF-\d{8}-[A-Z0-9]{4}$/.test(orderRefText);
  const confirmedCustomer = await pageM02.locator('[data-testid="confirmation-customer-name"]').innerText();
  const confirmedTotal = await pageM02.locator('[data-testid="confirmation-total"]').innerText();

  const m02Passed = confirmationCount === 1 && refMatches && confirmedCustomer === 'Jane Doe' && confirmedTotal === '₹1,499';
  console.log(`M02 Observations:
  - Visible confirmations count: ${confirmationCount} (Expected: 1)
  - Generated order reference: "${orderRefText}" (Valid pattern: ${refMatches})
  - Confirmed customer name: "${confirmedCustomer}"
  - Confirmed total: "${confirmedTotal}"
  - Test M02 Result: ${m02Passed ? 'PASS' : 'FAIL'}`);

  const m02ScreenshotPath = path.join(screenshotsDir, 'rapid-double-click.png');
  await pageM02.screenshot({ path: m02ScreenshotPath, fullPage: true });
  console.log(`M02 Evidence captured at: ${m02ScreenshotPath}`);

  // Capture Confirmation Screen specific view
  const confirmScreenshotPath = path.join(screenshotsDir, 'confirmation-screen.png');
  await pageM02.screenshot({ path: confirmScreenshotPath, fullPage: true });

  await contextM02.close();

  // ==========================================
  // Capture Desktop & Mobile Responsive Views
  // ==========================================
  console.log('\n--- Capturing Desktop & Mobile Showcase Screenshots ---');
  const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const desktopPage = await desktopCtx.newPage();
  await desktopPage.goto('http://localhost:4173');
  await desktopPage.screenshot({ path: path.join(screenshotsDir, 'desktop-view.png'), fullPage: true });
  await desktopCtx.close();

  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileCtx.newPage();
  await mobilePage.goto('http://localhost:4173');
  await mobilePage.screenshot({ path: path.join(screenshotsDir, 'mobile-view.png'), fullPage: true });
  await mobileCtx.close();

  // Copy phase3 automated screenshots to artifacts/screenshots
  const phase3EvidenceDir = path.resolve(process.cwd(), 'evidence/phase3');
  if (fs.existsSync(phase3EvidenceDir)) {
    fs.copyFileSync(
      path.join(phase3EvidenceDir, 'mandatory-1-successful-checkout.png'),
      path.join(screenshotsDir, 'successful-checkout.png')
    );
    fs.copyFileSync(
      path.join(phase3EvidenceDir, 'mandatory-2a-missing-name.png'),
      path.join(screenshotsDir, 'missing-name-validation.png')
    );
    fs.copyFileSync(
      path.join(phase3EvidenceDir, 'mandatory-3-quantity-calculations.png'),
      path.join(screenshotsDir, 'quantity-update.png')
    );
    console.log('Copied automated suite screenshots to artifacts/screenshots.');
  }

  // Copy all screenshots to brain artifact directory if it exists
  if (fs.existsSync(brainArtifactDir)) {
    const filesToCopy = [
      'empty-cart-manual.png',
      'rapid-double-click.png',
      'confirmation-screen.png',
      'desktop-view.png',
      'mobile-view.png',
      'successful-checkout.png',
      'missing-name-validation.png',
      'quantity-update.png',
    ];
    for (const f of filesToCopy) {
      const src = path.join(screenshotsDir, f);
      const dst = path.join(brainArtifactDir, f);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dst);
      }
    }
    console.log('Synced all screenshots to conversation artifact directory.');
  }

  // Copy playwright-report to artifacts/reports/playwright-report
  const reportsDir = path.resolve(process.cwd(), 'artifacts/reports/playwright-report');
  const sourceReportDir = path.resolve(process.cwd(), 'playwright-report');
  if (fs.existsSync(sourceReportDir)) {
    fs.cpSync(sourceReportDir, reportsDir, { recursive: true });
    console.log('Copied HTML report to artifacts/reports/playwright-report.');
  }

  await browser.close();
  server.kill('SIGTERM');

  console.log('\n--- Manual QA Execution Completed Successfully ---');
  setTimeout(() => process.exit(0), 500);
}

executeManualQAScenarios().catch((err) => {
  console.error('Manual QA failed:', err);
  process.exit(1);
});
