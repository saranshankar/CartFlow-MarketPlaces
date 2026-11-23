import { test, expect } from '@playwright/test';

test.describe('CartFlow 3.0 - Product Detail Page (PDP) Automation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
  });

  test('PDP-01: Direct navigation loads Aero Wireless Headphones with exact price and specifications', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    await expect(page.getByTestId('product-detail-page')).toBeVisible();
    await expect(page.getByTestId('pdp-product-name')).toHaveText('Aero Wireless Headphones');
    await expect(page.getByTestId('pdp-product-price')).toHaveText('₹1,499');
    await expect(page.getByText('Pure Fixed Price • Zero Fees')).toBeVisible();
    await expect(page.getByText('Verified Feature Highlights')).toBeVisible();
  });

  test('PDP-02: Direct navigation loads Urban Everyday Backpack with exact price and specifications', async ({ page }) => {
    await page.goto('/product/prod-urban-backpack');

    await expect(page.getByTestId('product-detail-page')).toBeVisible();
    await expect(page.getByTestId('pdp-product-name')).toHaveText('Urban Everyday Backpack');
    await expect(page.getByTestId('pdp-product-price')).toHaveText('₹999');
    await expect(page.getByText('Pure Fixed Price • Zero Fees')).toBeVisible();
  });

  test('PDP-03: PDP breadcrumbs render hierarchy and navigate correctly', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    const breadcrumbs = page.getByTestId('pdp-breadcrumbs');
    await expect(breadcrumbs).toBeVisible();
    await expect(breadcrumbs.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(breadcrumbs.getByRole('link', { name: 'Categories' })).toBeVisible();
    await expect(breadcrumbs.getByRole('link', { name: 'Electronics' })).toBeVisible();

    // Click Category link and verify route
    await breadcrumbs.getByRole('link', { name: 'Electronics' }).click();
    await expect(page).toHaveURL(/\/category\/electronics/);
  });

  test('PDP-04: Quantity stepper updates item count and subtotal deterministically', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    const qtyValue = page.getByTestId('pdp-qty-value');
    const incrementBtn = page.getByTestId('pdp-qty-increment');
    const decrementBtn = page.getByTestId('pdp-qty-decrement');

    await expect(qtyValue).toHaveText('1');
    await expect(decrementBtn).toBeDisabled();

    // Increment to 3
    await incrementBtn.click();
    await expect(qtyValue).toHaveText('2');
    await expect(page.getByText('Subtotal: ₹2,998')).toBeVisible();

    await incrementBtn.click();
    await expect(qtyValue).toHaveText('3');
    await expect(page.getByText('Subtotal: ₹4,497')).toBeVisible();

    // Decrement back to 2
    await decrementBtn.click();
    await expect(qtyValue).toHaveText('2');
    await expect(page.getByText('Subtotal: ₹2,998')).toBeVisible();
  });

  test('PDP-05: Adding multi-quantity to bag updates cart badge and opens drawer with accurate subtotal', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    // Increase to 2 units (₹2,998)
    await page.getByTestId('pdp-qty-increment').click();
    await expect(page.getByTestId('pdp-qty-value')).toHaveText('2');

    // Click Add to Bag
    await page.getByTestId('pdp-add-to-cart').click();

    // Verify cart drawer automatically opens with accurate items and total
    await expect(page.getByTestId('cart-drawer')).toBeVisible();
    await expect(page.getByTestId('cart-item-prod-aero-headphones')).toBeVisible();
    await expect(page.getByTestId('cart-drawer').getByTestId('order-total')).toHaveText('₹2,998');

    // Verify cart badge reflects 2 items
    await expect(page.getByTestId('cart-badge')).toHaveText('2');
  });

  test('PDP-06: Wishlist toggle from PDP updates state and header wishlist badge', async ({ page }) => {
    await page.goto('/product/prod-urban-backpack');

    const wishlistBtn = page.getByTestId('pdp-toggle-wishlist');
    await expect(wishlistBtn).toHaveText(/Wishlist/i);

    // Toggle wishlist ON
    await wishlistBtn.click();
    await expect(wishlistBtn).toHaveText(/Saved/i);
    await expect(page.getByLabel(/Wishlist containing 1 items/i)).toBeVisible();

    // Toggle wishlist OFF
    await wishlistBtn.click();
    await expect(wishlistBtn).toHaveText(/Wishlist/i);
    await expect(page.getByLabel(/Wishlist containing 0 items/i)).toBeVisible();
  });

  test('PDP-07: Invalid product ID renders graceful error state with return link', async ({ page }) => {
    await page.goto('/product/unknown-non-existent-sku');

    const errorState = page.getByTestId('invalid-product-state');
    await expect(errorState).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Product Not Found' })).toBeVisible();

    // Click return link
    await page.getByRole('link', { name: /Return to Marketplace Catalogue/i }).click();
    await expect(page).toHaveURL(/\/shop/);
  });

  test('PDP-08: Demonstration feedback form allows submitting evaluation reviews', async ({ page }) => {
    await page.goto('/product/prod-aero-headphones');

    const feedbackSection = page.getByTestId('demo-feedback-section');
    await expect(feedbackSection).toBeVisible();
    await expect(page.getByText(/Demonstration Feedback Section/i)).toBeVisible();

    // Fill form
    await page.getByTestId('feedback-author-input').fill('Jordan Senior SDET');
    await page.getByTestId('star-select-5').click();
    await page.getByTestId('feedback-comment-input').fill('Outstanding audio clarity and build quality in testing.');
    await page.getByTestId('feedback-submit-btn').click();

    // Verify submission appears in list
    await expect(page.getByText('Jordan Senior SDET')).toBeVisible();
    await expect(page.getByText('Outstanding audio clarity and build quality in testing.')).toBeVisible();
    await expect(page.getByText(/Demo comment added to local list!/i)).toBeVisible();
  });

  test('PDP-09: Navigation from Homepage product card opens PDP', async ({ page }) => {
    await page.goto('/');

    // Click product title link on Aero Headphones in catalog
    const productCard = page.getByTestId('product-card-prod-aero-headphones');
    await productCard.getByRole('heading', { name: 'Aero Wireless Headphones' }).click();

    await expect(page).toHaveURL(/\/product\/prod-aero-headphones/);
    await expect(page.getByTestId('pdp-product-name')).toHaveText('Aero Wireless Headphones');
  });
});
