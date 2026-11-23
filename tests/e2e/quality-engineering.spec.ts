import { test, expect } from '@playwright/test';

test.describe('CartFlow 3.0 - Phase 4E SDET Quality Engineering Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('QE-01: Zero console errors and unhandled exceptions across all major routes', async ({ page }) => {
    const consoleErrors: string[] = [];
    const unhandledExceptions: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(`${page.url()}: ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      unhandledExceptions.push(`${page.url()}: ${err.message}`);
    });

    const routes = [
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
    ];

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('body')).toBeVisible();
    }

    expect(consoleErrors, `Expected 0 console errors, but encountered:\n${consoleErrors.join('\n')}`).toEqual([]);
    expect(
      unhandledExceptions,
      `Expected 0 unhandled exceptions, but encountered:\n${unhandledExceptions.join('\n')}`
    ).toEqual([]);
  });

  test('QE-02: Quantity maximum boundary (10) disables increment on PDP', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    const incrementBtn = page.getByTestId('pdp-qty-increment');
    const qtyValue = page.getByTestId('pdp-qty-value');

    // Click increment until reaching 10 (starts at 1, requires 9 clicks)
    for (let i = 0; i < 9; i++) {
      await incrementBtn.click();
    }

    await expect(qtyValue).toHaveText('10');
    await expect(incrementBtn).toBeDisabled();

    // Line subtotal for 10 units at ₹1,499 = ₹14,490 -> ₹14,990
    await expect(page.getByText('Subtotal: ₹14,990')).toBeVisible();
  });

  test('QE-03: Cart state persists deterministically across browser reload', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');
    await page.getByTestId('pdp-qty-increment').click(); // 2 units
    await page.getByTestId('pdp-add-to-cart').click();

    // Verify badge shows 2
    await expect(page.getByTestId('cart-badge')).toHaveText('2');

    // Reload browser page
    await page.reload();

    // Verify badge and stored items persist
    await expect(page.getByTestId('cart-badge')).toHaveText('2');

    // Open Cart Drawer and verify total
    await page.getByTestId('header-cart-button').click();
    await expect(page.getByTestId('cart-drawer')).toBeVisible();
    await expect(page.getByTestId('cart-item-prod-aero-headphones')).toBeVisible();
    await expect(page.getByTestId('cart-drawer').getByTestId('order-total')).toHaveText('₹2,998');
  });

  test('QE-04: Repeated rapid add-to-cart actions increment quantity cleanly without corruption', async ({ page }) => {
    await page.goto('/shop');

    // Rapidly click add on headphones 3 times
    const addBtn = page.getByRole('button', { name: /Add Aero Wireless Headphones to cart/i }).first();
    await addBtn.click();

    // Close drawer to allow subsequent clicks on shop page
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('cart-drawer')).not.toBeVisible();

    // Second and third adds from shop page
    await addBtn.click();
    await page.keyboard.press('Escape');
    await addBtn.click();

    // Verify cart drawer is opened on final add and reflects exactly 3 items and ₹4,497 (3 * 1499)
    await expect(page.getByTestId('cart-drawer')).toBeVisible();
    await expect(page.getByTestId('cart-drawer').getByTestId('order-total')).toHaveText('₹4,497');

    // Close drawer and verify header badge reflects 3
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('cart-badge')).toHaveText('3');
  });

  test('QE-05: Empty and whitespace-only search queries navigate safely to explore catalog', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('     ');
    await searchInput.press('Enter');

    await expect(page).toHaveURL(/\/explore/);
    await expect(page.getByTestId('explore-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Curated Essentials' })).toBeVisible();
  });

  test('QE-06: Seamless navigation across all major routes maintains valid URL state', async ({ page }) => {
    await page.goto('/');

    // Navigate to Shop
    await page.getByRole('link', { name: /Collection/i }).first().click();
    await expect(page).toHaveURL(/\/shop/);

    // Navigate to Categories
    await page.getByRole('link', { name: /Departments/i }).first().click();
    await expect(page).toHaveURL(/\/categories/);

    // Navigate to Wishlist
    await page.getByLabel(/Wishlist containing/i).first().click();
    await expect(page).toHaveURL(/\/wishlist/);

    // Navigate to Cart
    await page.goto('/cart');
    await expect(page).toHaveURL(/\/cart/);
  });

  test('QE-07: Corrupted or non-array localStorage data is sanitized gracefully without crash', async ({ page }) => {
    await page.goto('/');
    // Inject non-array and corrupted values into localStorage
    await page.evaluate(() => {
      localStorage.setItem('cartflow_items', '{"not": "an array"}');
      localStorage.setItem('cartflow_wishlist', '{"invalid": true}');
      localStorage.setItem('cartflow_confirmed_order', '"corrupted"');
    });

    // Reload page
    await page.reload();

    // Verify application boots cleanly and remains fully functional
    await expect(page.getByTestId('cart-badge')).toHaveText('0');
    await expect(page.getByRole('heading', { name: /The Curated Collection|Curated Essentials/i }).first()).toBeVisible();
  });
});
