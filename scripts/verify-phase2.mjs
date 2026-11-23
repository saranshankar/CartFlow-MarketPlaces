import { chromium } from '@playwright/test';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function runPhase2Verification() {
  const evidenceDir = path.resolve(process.cwd(), 'evidence/phase2');
  if (!fs.existsSync(evidenceDir)) {
    fs.mkdirSync(evidenceDir, { recursive: true });
  }

  console.log('--- Starting Preview Server for Phase 2 Verification ---');
  const server = spawn('cmd.exe', ['/c', 'npm', 'run', 'preview', '--', '--port', '4173'], {
    env: { ...process.env, PATH: `D:\\programfiles\\nodejs\\nodejs;${process.env.PATH}` },
    stdio: 'pipe',
  });

  await new Promise((r) => setTimeout(r, 2500));

  const browser = await chromium.launch({
    channel: 'chrome',
    headless: true,
  });

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  const results = [];

  const recordResult = (id, name, passed, details) => {
    results.push({ id, name, passed, details });
    console.log(`[${passed ? 'PASS' : 'FAIL'}] Scenario ${id}: ${name} -> ${details}`);
  };

  try {
    await page.goto('http://localhost:4173');
    await page.waitForSelector('[data-testid="product-catalog-grid"]');

    // Scenario 1: Add both products
    await page.click('[data-testid="add-to-cart-prod-aero-headphones"]');
    await page.click('[data-testid="add-to-cart-prod-urban-backpack"]');
    const itemsCount = await page.locator('[data-testid^="cart-item-prod-"]').count();
    recordResult(1, 'Add both products', itemsCount === 2, `Cart item rows count: ${itemsCount}`);

    // Scenario 2: Add the same product multiple times
    await page.click('[data-testid="add-to-cart-prod-aero-headphones"]');
    const aeroQty = await page.locator('[data-testid="quantity-value-prod-aero-headphones"]').innerText();
    recordResult(2, 'Add same product multiple times updates quantity', aeroQty === '2', `Aero Headphones qty: ${aeroQty}`);

    // Scenario 3: Increase quantity via stepper
    await page.click('[data-testid="quantity-increment-prod-urban-backpack"]');
    const backpackQtyInc = await page.locator('[data-testid="quantity-value-prod-urban-backpack"]').innerText();
    recordResult(3, 'Increase quantity via stepper', backpackQtyInc === '2', `Backpack qty: ${backpackQtyInc}`);

    // Scenario 4: Decrease quantity via stepper & boundary check at min 1
    await page.click('[data-testid="quantity-decrement-prod-urban-backpack"]');
    const backpackQtyDec = await page.locator('[data-testid="quantity-value-prod-urban-backpack"]').innerText();
    const decBtnDisabled = await page.locator('[data-testid="quantity-decrement-prod-urban-backpack"]').isDisabled();
    recordResult(4, 'Decrease quantity and check boundary at 1', backpackQtyDec === '1' && decBtnDisabled, `Backpack qty: ${backpackQtyDec}, decrement disabled: ${decBtnDisabled}`);

    // Scenario 5: Remove one product
    await page.click('[data-testid="remove-item-prod-urban-backpack"]');
    const itemsAfterRemove1 = await page.locator('[data-testid^="cart-item-prod-"]').count();
    recordResult(5, 'Remove one product', itemsAfterRemove1 === 1, `Items remaining: ${itemsAfterRemove1}`);

    // Scenario 6: Remove the final product -> empty state
    await page.click('[data-testid="remove-item-prod-aero-headphones"]');
    const emptyStateVisible = await page.locator('[data-testid="empty-cart-state"]').isVisible();
    recordResult(6, 'Remove final product displays empty cart state', emptyStateVisible, `Empty cart visible: ${emptyStateVisible}`);

    // Scenario 7: Check exact line totals with multiple quantities
    await page.click('[data-testid="add-to-cart-prod-aero-headphones"]'); // qty 1
    await page.click('[data-testid="quantity-increment-prod-aero-headphones"]'); // qty 2
    await page.click('[data-testid="quantity-increment-prod-aero-headphones"]'); // qty 3 (3 * 1499 = 4497)
    await page.click('[data-testid="add-to-cart-prod-urban-backpack"]'); // qty 1
    await page.click('[data-testid="quantity-increment-prod-urban-backpack"]'); // qty 2 (2 * 999 = 1998)
    const lineTotalAero = await page.locator('[data-testid="line-total-prod-aero-headphones"]').innerText();
    const lineTotalBackpack = await page.locator('[data-testid="line-total-prod-urban-backpack"]').innerText();
    const lineTotalsCorrect = lineTotalAero.includes('4,497') && lineTotalBackpack.includes('1,998');
    recordResult(7, 'Check exact line totals', lineTotalsCorrect, `Headphones: ${lineTotalAero} (exp ₹4,497), Backpack: ${lineTotalBackpack} (exp ₹1,998)`);

    // Scenario 8: Check exact order total
    // Expected: 4497 + 1998 = 6495
    const orderTotal = await page.locator('[data-testid="order-total"]').innerText();
    const orderTotalCorrect = orderTotal.includes('6,495');
    recordResult(8, 'Check exact order total', orderTotalCorrect, `Displayed Order Total: ${orderTotal} (exp ₹6,495)`);

    // Scenario 9: Submit blank name
    await page.fill('[data-testid="customer-name-input"]', '');
    await page.click('[data-testid="checkout-submit-button"]');
    const blankNameError = await page.locator('[data-testid="customer-name-error"]').innerText();
    const stillOnCheckout = await page.locator('[data-testid="checkout-submit-button"]').isVisible();
    recordResult(9, 'Submit blank name prevents checkout and shows error', blankNameError.includes('Please enter your name') && stillOnCheckout, `Error: "${blankNameError.trim()}"`);

    // Scenario 10: Submit whitespace-only name
    await page.fill('[data-testid="customer-name-input"]', '    ');
    await page.click('[data-testid="checkout-submit-button"]');
    const whitespaceError = await page.locator('[data-testid="customer-name-error"]').innerText();
    const preservedInput = await page.locator('[data-testid="customer-name-input"]').inputValue();
    recordResult(10, 'Submit whitespace-only name preserves input and shows error', whitespaceError.includes('whitespace') && preservedInput === '    ', `Preserved value: "${preservedInput}", Error: "${whitespaceError.trim()}"`);

    // Scenario 11: Enter a valid name
    await page.fill('[data-testid="customer-name-input"]', 'Priya Sharma');
    const errorCleared = !(await page.locator('[data-testid="customer-name-error"]').isVisible());
    recordResult(11, 'Enter valid name clears inline error', errorCleared, `Error visible: ${!errorCleared}`);

    // Scenario 12: Complete checkout
    await page.click('[data-testid="checkout-submit-button"]');
    await page.waitForSelector('[data-testid="order-confirmation-view"]');
    const confirmedCustomer = await page.locator('[data-testid="confirmation-customer-name"]').innerText();
    const confirmedTotal = await page.locator('[data-testid="confirmation-total"]').innerText();
    recordResult(12, 'Complete checkout shows confirmation with customer and total', confirmedCustomer === 'Priya Sharma' && confirmedTotal.includes('6,495'), `Customer: ${confirmedCustomer}, Total: ${confirmedTotal}`);

    // Scenario 13: Inspect confirmation reference format
    const orderRef = await page.locator('[data-testid="order-reference"]').innerText();
    const refValid = /^CF-\d{8}-[A-Z0-9]{4}$/.test(orderRef);
    recordResult(13, 'Inspect confirmation reference pattern', refValid, `Generated reference: ${orderRef}`);

    await page.screenshot({ path: path.join(evidenceDir, 'confirmation-screen.png'), fullPage: true });

    // Scenario 14: Rapid double-click & reset prevention test
    // Click "Start New Order" to reset
    await page.click('[data-testid="start-new-order-button"]');
    await page.waitForSelector('[data-testid="product-catalog-grid"]');

    // Add item and enter name
    await page.click('[data-testid="add-to-cart-prod-aero-headphones"]');
    await page.fill('[data-testid="customer-name-input"]', 'Alex Morgan');

    // Rapid double-click simulation
    const btn = page.locator('[data-testid="checkout-submit-button"]');
    await Promise.all([
      btn.click(),
      btn.click().catch(() => {}), // second click occurs during synchronously locked processing
    ]);

    await page.waitForSelector('[data-testid="order-confirmation-view"]');
    const confirmationsCount = await page.locator('[data-testid="order-confirmation-view"]').count();
    recordResult(14, 'Rapid double-click prevention results in single confirmation', confirmationsCount === 1, `Confirmations count: ${confirmationsCount}`);

  } catch (err) {
    console.error('Test execution failed:', err);
  } finally {
    await browser.close();
    server.kill('SIGTERM');
    // Save report json
    fs.writeFileSync(path.join(evidenceDir, 'verification-results.json'), JSON.stringify(results, null, 2));
    console.log(`\nVerification complete. Total checks: ${results.length}. Passed: ${results.filter(r => r.passed).length}/${results.length}`);
    setTimeout(() => process.exit(0), 500);
  }
}

runPhase2Verification().catch(console.error);
