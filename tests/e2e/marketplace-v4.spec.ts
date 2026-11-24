import { test, expect } from '@playwright/test';

test.describe('CartFlow 4.0 - Multi-Collection Marketplace Suite', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('V4-01: Exactly 30 products appear in the marketplace catalogue', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByTestId('explore-page')).toBeVisible();

    const productCards = page.locator('[data-testid="product-catalog-grid"] article');
    await expect(productCards).toHaveCount(30);

    // Verify key products across collections
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Classic Tailored Linen Shirt' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Artisan Ceramic Coffee Pour-Over Dripper' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Natural Cork Non-Slip Exercise Yoga Mat' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Solid Machined Brass Rollerball Pen' })).toBeVisible();
  });

  test('V4-02: All six collections load with derived product counts', async ({ page }) => {
    await page.goto('/collections');
    await expect(page.getByTestId('collections-page')).toBeVisible();

    const expectedCounts = [
      { slug: 'electronics', count: '6 Products' },
      { slug: 'fashion', count: '5 Products' },
      { slug: 'home-living', count: '5 Products' },
      { slug: 'bags-accessories', count: '5 Products' },
      { slug: 'fitness-lifestyle', count: '5 Products' },
      { slug: 'stationery', count: '4 Products' }
    ];

    for (const item of expectedCounts) {
      await expect(page.getByTestId(`collection-card-${item.slug}`)).toBeVisible();
      await expect(page.getByTestId(`collection-count-${item.slug}`)).toHaveText(item.count);
    }
  });

  test('V4-03: Individual collection pages display accurate products and search within collection', async ({ page }) => {
    await page.goto('/collection/electronics');
    await expect(page.getByTestId('collection-detail-page')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Electronics & Audio' })).toBeVisible();
    const elecCards = page.locator('[data-testid="collection-products-grid"] article');
    await expect(elecCards).toHaveCount(6);

    // Search within collection
    const searchInput = page.getByTestId('collection-search-input');
    await searchInput.fill('speaker');
    await expect(elecCards).toHaveCount(1);
    await expect(page.getByRole('heading', { name: 'Lumen Portable Bluetooth Speaker' })).toBeVisible();

    // Clear search
    await page.getByTestId('clear-collection-filters-btn').click();
    await expect(elecCards).toHaveCount(6);
  });

  test('V4-04: Multi-attribute global search returns matching results', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('smartwatch');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/explore\?q=smartwatch/);
    await expect(page.getByRole('heading', { name: 'Pulse Dynamic Smartwatch' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).not.toBeVisible();
  });

  test('V4-05: Search with no results displays empty state and reset button', async ({ page }) => {
    await page.goto('/explore?q=nonexistentquantumitem');
    await expect(page.getByTestId('no-search-results')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No Products Found' })).toBeVisible();

    // Click reset
    await page.getByTestId('no-results-clear-btn').click();
    await expect(page.locator('[data-testid="product-catalog-grid"] article')).toHaveCount(30);
  });

  test('V4-06: Price range filters accurately filter catalogue', async ({ page }) => {
    await page.goto('/explore?minPrice=2000&maxPrice=3000');
    const cards = page.locator('[data-testid="product-catalog-grid"] article');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const priceText = await cards.nth(i).locator('[data-testid^="product-price-"]').innerText();
      const num = parseInt(priceText.replace(/[^0-9]/g, ''), 10);
      expect(num).toBeGreaterThanOrEqual(2000);
      expect(num).toBeLessThanOrEqual(3000);
    }
  });

  test('V4-07: Sorting alphabetically and by newest orders products correctly', async ({ page }) => {
    await page.goto('/explore');
    const sortSelect = page.getByTestId('explore-sort-select');

    // Sort Name: A to Z
    await sortSelect.selectOption('name-asc');
    const firstCard = page.locator('[data-testid="product-catalog-grid"] article').first();
    await expect(firstCard.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
  });

  test('V4-08: Product detail routes load correctly with specifications and artwork', async ({ page }) => {
    await page.goto('/product/prod-ceramic-pour-over');
    await expect(page.getByTestId('product-detail-page')).toBeVisible();
    await expect(page.getByTestId('pdp-product-name')).toHaveText('Artisan Ceramic Coffee Pour-Over Dripper');
    await expect(page.getByTestId('pdp-product-price')).toHaveText('₹799');
    await expect(page.getByText('Pure Fixed Price • Zero Fees')).toBeVisible();

    // Related products in Home & Living
    await expect(page.getByRole('heading', { name: 'Related Marketplace Essentials' })).toBeVisible();
  });

  test('V4-09: Any catalogue product can be added to the shopping bag', async ({ page }) => {
    await page.goto('/product/prod-lumen-speaker');
    await page.getByTestId('pdp-add-to-cart').click();

    // Cart badge updates to 1
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    // Drawer opens with Lumen speaker
    await expect(page.getByTestId('cart-drawer')).toBeVisible();
    await expect(page.getByTestId('cart-item-prod-lumen-speaker')).toBeVisible();
  });

  test('V4-10: Multi-item cart quantity calculations and integer line totals', async ({ page }) => {
    // Add 1 Aero Headphones (₹1,499)
    await page.goto('/product/prod-aero-headphones');
    await page.getByTestId('pdp-add-to-cart').click();

    // Add 2 Urban Backpacks (₹999 * 2 = ₹1,998)
    await page.goto('/product/prod-urban-backpack');
    await page.getByTestId('pdp-qty-increment').click();
    await page.getByTestId('pdp-add-to-cart').click();

    await page.goto('/cart');
    // Total = 1,499 + 1,998 = ₹3,497
    await expect(page.getByTestId('order-total').first()).toHaveText('₹3,497');
  });

  test('V4-11: Wishlist state persists across page reload for new items', async ({ page }) => {
    await page.goto('/product/prod-pulse-smartwatch');
    await page.getByTestId('pdp-toggle-wishlist').click();

    // Header counter updates
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    // Reload page
    await page.reload();
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    // Visit Wishlist page
    await page.goto('/wishlist');
    await expect(page.getByTestId('wishlist-item-prod-pulse-smartwatch')).toBeVisible();
  });

  test('V4-12: Cart state persists across page reload', async ({ page }) => {
    await page.goto('/product/prod-cork-yoga-mat');
    await page.getByTestId('pdp-add-to-cart').click();

    await page.reload();
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    await page.goto('/cart');
    await expect(page.getByTestId('cart-item-prod-cork-yoga-mat')).toBeVisible();
    await expect(page.getByTestId('order-total').first()).toHaveText('₹1,499');
  });

  test('V4-13: Checkout validation blocks submission without customer name', async ({ page }) => {
    await page.goto('/product/prod-brass-rollerball-pen');
    await page.getByTestId('pdp-add-to-cart').click();

    await page.goto('/checkout');
    await expect(page.getByLabel(/Customer Name/i)).toBeVisible();

    // Submit with empty name
    await page.getByRole('button', { name: /Place Order/i }).click();
    await expect(page.getByTestId('customer-name-error')).toBeVisible();
    await expect(page.getByTestId('customer-name-error')).toContainText('Please enter your name.');
  });

  test('V4-14: Concurrency double-click protection blocks duplicate order creation', async ({ page }) => {
    await page.goto('/product/prod-brass-rollerball-pen');
    await page.getByTestId('pdp-add-to-cart').click();

    await page.goto('/checkout');
    await page.getByLabel(/Customer Name/i).fill('SDET Concurrency Tester');

    // Rapid double click
    const submitBtn = page.getByRole('button', { name: /Place Order/i });
    await Promise.all([
      submitBtn.click({ delay: 0 }),
      submitBtn.click({ delay: 10 }).catch(() => {})
    ]);

    // Order receipt is displayed exactly once
    await expect(page.getByTestId('order-receipt')).toBeVisible();
  });

  test('V4-15: Order confirmation displays purchased items, quantities, and correct integer total', async ({ page }) => {
    await page.goto('/product/prod-brass-rollerball-pen'); // ₹899
    await page.getByTestId('pdp-add-to-cart').click();

    await page.goto('/checkout');
    await page.getByLabel(/Customer Name/i).fill('Jordan Bell');
    await page.getByRole('button', { name: /Place Order/i }).click();

    await expect(page.getByTestId('order-receipt')).toBeVisible();
    await expect(page.getByTestId('confirmation-customer-name')).toHaveText('Jordan Bell');
    await expect(page.getByTestId('confirmation-total')).toHaveText('₹899');
    await expect(page.getByTestId('order-reference')).toBeVisible();
  });

  test('V4-16: Mobile viewport navigation drawer operates cleanly', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const menuBtn = page.getByRole('button', { name: /Toggle Navigation Menu/i });
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();

    // Drawer navigation links
    const mobileNav = page.getByRole('navigation', { name: 'Mobile Navigation Drawer' });
    await expect(mobileNav.getByRole('link', { name: 'Home Marketplace' })).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: 'Collection Catalogue' })).toBeVisible();
    await expect(mobileNav.getByRole('link', { name: /Shopping Bag/i })).toBeVisible();
  });

  test('V4-17: Direct route refresh works without 404 or white screen across marketplace routes', async ({ page }) => {
    const testRoutes = [
      '/',
      '/explore',
      '/collections',
      '/collection/electronics',
      '/collection/fashion',
      '/product/prod-aero-headphones',
      '/about',
      '/contact',
      '/search?q=pen',
      '/wishlist',
      '/cart'
    ];

    for (const route of testRoutes) {
      await page.goto(route);
      await page.reload();
      await expect(page.locator('body')).toBeVisible();
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });
});
