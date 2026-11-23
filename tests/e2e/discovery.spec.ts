import { test, expect } from '@playwright/test';

test.describe('CartFlow 3.0 - Global Search Automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Clear storage for clean test isolation
    await page.evaluate(() => localStorage.clear());
    await page.goto('/');
  });

  test('SEARCH-01: Search by product name displays matching product', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('headphones');
    await page.getByTestId('search-button').first().click();

    await expect(page).toHaveURL(/\/explore\?q=headphones/);
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).not.toBeVisible();
  });

  test('SEARCH-02: Search by category name displays matching products', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('Accessories');
    await page.getByTestId('search-button').first().click();

    await expect(page).toHaveURL(/\/explore\?q=Accessories/);
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).not.toBeVisible();
  });

  test('SEARCH-03: Case-insensitive search with leading and trailing whitespace', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('   HeAdPhOnEs   ');
    await page.keyboard.press('Enter');

    await expect(page).toHaveURL(/\/explore\?q=HeAdPhOnEs/);
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
  });

  test('SEARCH-04: No-results state for unknown search query', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('quantum smartphone');
    await page.keyboard.press('Enter');

    await expect(page.getByTestId('no-search-results')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'No Products Found' })).toBeVisible();
  });

  test('SEARCH-05: Clear search button resets input field', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('headphones');
    await expect(searchInput).toHaveValue('headphones');

    await page.getByTestId('clear-search-button').first().click();
    await expect(searchInput).toHaveValue('');
  });

  test('SEARCH-06: Autocomplete dropdown displays suggestions and navigates on selection', async ({ page }) => {
    const searchInput = page.getByTestId('search-input').first();
    await searchInput.fill('aero');

    // Assert autocomplete is visible
    const autocomplete = page.getByTestId('search-autocomplete').first();
    await expect(autocomplete).toBeVisible();

    // Select suggestion
    const item = page.getByTestId('autocomplete-item-prod-aero-headphones').first();
    await expect(item).toBeVisible();
    await item.click();

    await expect(page).toHaveURL(/\/explore\?q=Aero%20Wireless%20Headphones/);
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
  });
});

test.describe('CartFlow 3.0 - Wishlist Engine Automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/shop');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('WISH-01: Add product to wishlist updates live count and saves product', async ({ page }) => {
    // Click wishlist button on Aero Headphones
    const wishBtn = page.getByRole('button', { name: /Add Aero Wireless Headphones to wishlist/i });
    await wishBtn.click();

    // Verify header wishlist counter
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    // Visit Wishlist page
    await page.goto('/wishlist');
    await expect(page.getByTestId('wishlist-item-prod-aero-headphones')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
  });

  test('WISH-02: Remove product from wishlist displays empty wishlist state', async ({ page }) => {
    // Add item first
    const wishBtn = page.getByRole('button', { name: /Add Aero Wireless Headphones to wishlist/i });
    await wishBtn.click();

    await page.goto('/wishlist');
    await expect(page.getByTestId('wishlist-item-prod-aero-headphones')).toBeVisible();

    // Click remove button
    await page.getByTestId('remove-wishlist-prod-aero-headphones').click();

    // Assert empty state
    await expect(page.getByTestId('empty-wishlist-state')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Your Wishlist is Empty' })).toBeVisible();
  });

  test('WISH-03: Toggle wishlist button prevents duplicate entries', async ({ page }) => {
    const wishBtn = page.getByRole('button', { name: /Add Aero Wireless Headphones to wishlist/i });
    // First click: add
    await wishBtn.click();
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    // Second click: remove
    const removeBtn = page.getByRole('button', { name: /Remove Aero Wireless Headphones from wishlist/i });
    await removeBtn.click();
    await expect(page.getByLabel(/Wishlist containing 0 items/i)).toBeVisible();
  });

  test('WISH-04: Wishlist state persists across page reload', async ({ page }) => {
    const wishBtn = page.getByRole('button', { name: /Add Urban Everyday Backpack to wishlist/i });
    await wishBtn.click();

    // Reload page
    await page.reload();
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    await page.goto('/wishlist');
    await expect(page.getByTestId('wishlist-item-prod-urban-backpack')).toBeVisible();
  });

  test('WISH-05: Move wishlist product to cart updates shopping bag and removes from wishlist', async ({ page }) => {
    // Save headphones
    const wishBtn = page.getByRole('button', { name: /Add Aero Wireless Headphones to wishlist/i });
    await wishBtn.click();

    await page.goto('/wishlist');
    await expect(page.getByTestId('wishlist-item-prod-aero-headphones')).toBeVisible();

    // Click Move to Bag
    await page.getByTestId('move-to-cart-prod-aero-headphones').click();

    // Drawer opens with item
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    // Wishlist is now empty
    await expect(page.getByTestId('empty-wishlist-state')).toBeVisible();
  });
});

test.describe('CartFlow 3.0 - Category Discovery Automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/categories');
  });

  test('CAT-01: Categories directory lists all departments with derived product counts', async ({ page }) => {
    await expect(page.getByTestId('category-card-electronics')).toBeVisible();
    await expect(page.getByTestId('category-card-accessories')).toBeVisible();

    await expect(page.getByTestId('category-count-electronics')).toHaveText('1 Product');
    await expect(page.getByTestId('category-count-accessories')).toHaveText('1 Product');
  });

  test('CAT-02: Navigating to category detail filters products correctly', async ({ page }) => {
    await page.getByTestId('explore-category-electronics').click();
    await expect(page).toHaveURL(/\/category\/electronics/);

    await expect(page.getByRole('heading', { name: 'Electronics & Audio' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).not.toBeVisible();
  });

  test('CAT-03: Invalid category slug renders graceful empty state', async ({ page }) => {
    await page.goto('/category/non-existent-department');
    await expect(page.getByTestId('invalid-category-state')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Category Not Found' })).toBeVisible();
  });

  test('CAT-04: Breadcrumb navigation restores directory navigation', async ({ page }) => {
    await page.goto('/category/electronics');
    const breadcrumb = page.getByTestId('breadcrumb-navigation');
    await expect(breadcrumb).toBeVisible();

    // Click "Categories" link in breadcrumbs
    await breadcrumb.getByRole('link', { name: 'Categories' }).click();
    await expect(page).toHaveURL(/\/categories/);
  });
});

test.describe('CartFlow 3.0 - Explore Page Filtering & Sorting', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/explore');
  });

  test('EXP-01: Price sorting orders products correctly', async ({ page }) => {
    const sortSelect = page.getByTestId('explore-sort-select');

    // 1. Sort Low to High
    await sortSelect.selectOption('price-asc');
    const firstProductLow = page.locator('[data-testid="product-catalog-grid"] article').first();
    await expect(firstProductLow.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();

    // 2. Sort High to Low
    await sortSelect.selectOption('price-desc');
    const firstProductHigh = page.locator('[data-testid="product-catalog-grid"] article').first();
    await expect(firstProductHigh.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
  });

  test('EXP-02: Category filter chips filter product view', async ({ page }) => {
    const chips = page.getByTestId('category-filter-chips');

    // Click Electronics
    await chips.getByRole('button', { name: 'Electronics & Audio' }).click();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).not.toBeVisible();

    // Click Bags & Accessories
    await chips.getByRole('button', { name: 'Bags & Accessories' }).click();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).not.toBeVisible();
  });

  test('EXP-03: Clear filters button resets all query filters', async ({ page }) => {
    await page.goto('/explore?category=electronics&sort=price-desc');
    await expect(page.getByTestId('clear-all-filters-btn')).toBeVisible();

    await page.getByTestId('clear-all-filters-btn').click();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
  });

  test('EXP-04: URL query parameter persistence across navigation', async ({ page }) => {
    await page.goto('/explore?q=backpack&sort=price-asc');

    // Verify backpack is shown
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Aero Wireless Headphones' })).not.toBeVisible();

    // Reload page
    await page.reload();
    await expect(page.getByRole('heading', { name: 'Urban Everyday Backpack' })).toBeVisible();
    await expect(page.getByTestId('explore-sort-select')).toHaveValue('price-asc');
  });
});
