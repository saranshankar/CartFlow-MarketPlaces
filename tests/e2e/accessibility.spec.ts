import { test, expect } from '@playwright/test';

test.describe('CartFlow 3.0 - Phase 4C Accessibility & Semantic HTML Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('A11Y-01: Skip to main content link becomes visible on keyboard focus and shifts focus', async ({ page }) => {
    await page.goto('/');

    // Tab once to focus the skip link
    await page.keyboard.press('Tab');
    const skipLink = page.getByRole('link', { name: /Skip to main content/i });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    // Trigger Enter to skip
    await page.keyboard.press('Enter');
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeFocused();
  });

  test('A11Y-02: Heading hierarchy contains valid H1 on all primary customer routes', async ({ page }) => {
    const routes = [
      '/',
      '/shop',
      '/categories',
      '/cart',
      '/checkout',
      '/product/prod-aero-headphones',
      '/product/prod-urban-backpack',
    ];

    for (const route of routes) {
      await page.goto(route);
      const h1Count = await page.locator('h1').count();
      expect(h1Count, `Expected at least one H1 heading on ${route}`).toBeGreaterThanOrEqual(1);
    }
  });

  test('A11Y-03: Search input implements WAI-ARIA combobox pattern', async ({ page }) => {
    const searchInput = page.getByRole('combobox', { name: /Search marketplace products/i }).first();
    await expect(searchInput).toBeVisible();
    await expect(searchInput).toHaveAttribute('aria-autocomplete', 'list');
    await expect(searchInput).toHaveAttribute('aria-expanded', 'false');

    // Type query to expand combobox
    await searchInput.fill('headphones');
    await expect(searchInput).toHaveAttribute('aria-expanded', 'true');

    // Press Escape to dismiss
    await searchInput.press('Escape');
    await expect(searchInput).toHaveAttribute('aria-expanded', 'false');
  });

  test('A11Y-04: All interactive buttons provide discernible accessible names', async ({ page }) => {
    await page.goto('/shop');

    // Audit all buttons in the viewport
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      if (await button.isVisible()) {
        const ariaLabel = await button.getAttribute('aria-label');
        const textContent = await button.innerText();
        const hasAccessibleName = Boolean((ariaLabel && ariaLabel.trim()) || (textContent && textContent.trim()));
        expect(hasAccessibleName, `Button at index ${i} is missing an accessible name`).toBe(true);
      }
    }
  });

  test('A11Y-05: Checkout form input is explicitly linked to semantic label and error alerts', async ({ page }) => {
    // Add product to enable normal checkout flow
    await page.goto('/product/prod-aero-headphones');
    await page.getByTestId('pdp-add-to-cart').click();

    await page.goto('/checkout');

    const customerInput = page.getByLabel(/Customer Name/i);
    await expect(customerInput).toBeVisible();
    await expect(customerInput).toHaveAttribute('id', 'customerName');

    // Attempt invalid submission to trigger error
    await page.getByTestId('checkout-submit-button').click();

    // Verify aria-invalid and aria-describedby
    await expect(customerInput).toHaveAttribute('aria-invalid', 'true');
    await expect(customerInput).toHaveAttribute('aria-describedby', 'customer-name-error');

    // Verify error container has role="alert"
    const alert = page.getByRole('alert').first();
    await expect(alert).toBeVisible();
  });

  test('A11Y-06: Live announcement region exists and is configured for screen readers', async ({ page }) => {
    await page.goto('/');
    const liveRegion = page.locator('[aria-live="polite"]');
    await expect(liveRegion).toHaveCount(1);
    await expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
  });

  test('A11Y-07: Cart Drawer implements dialog semantics and responds to Escape key', async ({ page }) => {
    await page.goto('/');

    // Open Cart Drawer
    await page.getByTestId('header-cart-button').click();

    const drawer = page.getByTestId('cart-drawer');
    await expect(drawer).toBeVisible();
    await expect(drawer).toHaveAttribute('role', 'dialog');
    await expect(drawer).toHaveAttribute('aria-modal', 'true');

    // Press Escape to close
    await page.keyboard.press('Escape');
    await expect(drawer).not.toBeVisible();
  });
});
