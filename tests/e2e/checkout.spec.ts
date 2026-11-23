import { test, expect } from '@playwright/test';
import { CartFlowPage } from './pages/CartFlowPage';

test.describe('CartFlow 2.0 - Mandatory Checkout Scenarios', () => {
  let cartFlow: CartFlowPage;

  test.beforeEach(async ({ page }) => {
    cartFlow = new CartFlowPage(page);
    await cartFlow.goto();
  });

  /**
   * MANDATORY SCENARIO 1: Successful Checkout
   * Objective: Verify that a valid checkout produces exactly one visible confirmation.
   */
  test('Mandatory 1: Successful checkout produces visible confirmation and unique reference', async ({ page }) => {
    // 1. Verify both synthetic products are visible in catalog
    await expect(cartFlow.headphonesTitle).toBeVisible();
    await expect(cartFlow.backpackTitle).toBeVisible();

    // 2. Add product to cart
    await cartFlow.addHeadphones();
    await expect(cartFlow.headphonesLineTotal).toHaveText('₹1,499');
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');

    // 3. Enter valid customer name
    const customerName = 'Alex Morgan';
    await cartFlow.enterCustomerName(customerName);
    await expect(cartFlow.customerNameInput).toHaveValue(customerName);

    // 4. Submit order
    await cartFlow.placeOrder();

    // 5. Assert confirmation screen is visible
    await expect(cartFlow.confirmationView).toBeVisible();
    await expect(cartFlow.confirmationBadge).toBeVisible();

    // 6. Assert customer name is accurately displayed in confirmation
    await expect(cartFlow.confirmationCustomerName).toHaveText(customerName);

    // 7. Assert order reference is visible and follows documented format (CF-YYYYMMDD-XXXX)
    await expect(cartFlow.confirmationReference).toBeVisible();
    const referenceText = await cartFlow.confirmationReference.innerText();
    expect(referenceText).toMatch(/^CF-\d{8}-[A-Z0-9]{4}$/);

    // 8. Assert final settled total matches expected price
    await expect(cartFlow.confirmationTotal).toHaveText('₹1,499');

    // 9. Assert exactly one confirmation element exists in the DOM
    await expect(cartFlow.confirmationView).toHaveCount(1);

    // Take verification evidence screenshot
    await page.screenshot({ path: 'evidence/phase3/mandatory-1-successful-checkout.png', fullPage: true });
  });

  /**
   * MANDATORY SCENARIO 2: Missing Required Field
   * Objective: Verify that checkout is blocked when customer name is missing or whitespace-only.
   */
  test('Mandatory 2A: Missing customer name blocks checkout and displays visible validation message', async ({ page }) => {
    // 1. Add product to cart
    await cartFlow.addHeadphones();
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');

    // 2. Leave customer name field blank and attempt submission
    await cartFlow.enterCustomerName('');
    await cartFlow.placeOrder();

    // 3. Assert customer-facing validation alert is visible
    await expect(cartFlow.validationAlert).toBeVisible();
    await expect(cartFlow.customerNameError).toContainText('Please enter your name.');

    // 4. Assert order confirmation is NOT displayed
    await expect(cartFlow.confirmationView).not.toBeVisible();

    // 5. Assert cart remains populated with product intact
    await expect(cartFlow.headphonesLineTotal).toBeVisible();
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');

    // 6. Assert user remains on checkout page with Place Order button
    await expect(cartFlow.placeOrderButton).toBeVisible();

    // Take verification evidence screenshot
    await page.screenshot({ path: 'evidence/phase3/mandatory-2a-missing-name.png', fullPage: true });
  });

  test('Mandatory 2B: Whitespace-only customer name blocks checkout and preserves input', async ({ page }) => {
    // 1. Add product to cart
    await cartFlow.addHeadphones();

    // 2. Enter whitespace-only name
    const whitespaceInput = '     ';
    await cartFlow.enterCustomerName(whitespaceInput);

    // 3. Submit order
    await cartFlow.placeOrder();

    // 4. Assert validation alert for whitespace is visible
    await expect(cartFlow.validationAlert).toBeVisible();
    await expect(cartFlow.customerNameError).toContainText('whitespace');

    // 5. Assert user-entered whitespace is strictly preserved (not wiped out)
    await expect(cartFlow.customerNameInput).toHaveValue(whitespaceInput);

    // 6. Assert no confirmation screen
    await expect(cartFlow.confirmationView).not.toBeVisible();
    await expect(cartFlow.placeOrderButton).toBeVisible();

    // Take verification evidence screenshot
    await page.screenshot({ path: 'evidence/phase3/mandatory-2b-whitespace-name.png', fullPage: true });
  });

  /**
   * MANDATORY SCENARIO 3: Exact Quantity Calculation
   * Objective: Verify that changing product quantity updates the exact displayed total.
   */
  test('Mandatory 3: Changing quantity updates the exact displayed line total and order total', async ({ page }) => {
    // 1. Add Aero Wireless Headphones (₹1,499)
    await cartFlow.addHeadphones();

    // 2. Verify initial total is ₹1,499
    await expect(cartFlow.headphonesLineTotal).toHaveText('₹1,499');
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');

    // 3. Increase quantity of headphones to 2
    await cartFlow.increaseHeadphones();
    await expect(cartFlow.headphonesQtyValue).toHaveText('2');

    // 4. Verify headphones line total updates to exact ₹2,998
    await expect(cartFlow.headphonesLineTotal).toHaveText('₹2,998');
    await expect(cartFlow.orderTotal).toHaveText('₹2,998');

    // 5. Add Urban Everyday Backpack (₹999)
    await cartFlow.addBackpack();
    await expect(cartFlow.backpackLineTotal).toHaveText('₹999');

    // 6. Verify aggregate order total is exact ₹3,997 (₹2,998 + ₹999)
    await expect(cartFlow.orderTotal).toHaveText('₹3,997');

    // 7. Decrease headphones quantity to 1
    await cartFlow.decreaseHeadphones();
    await expect(cartFlow.headphonesQtyValue).toHaveText('1');

    // 8. Verify headphones line total returns to ₹1,499
    await expect(cartFlow.headphonesLineTotal).toHaveText('₹1,499');

    // 9. Verify order total updates to exact ₹2,498 (₹1,499 + ₹999)
    await expect(cartFlow.orderTotal).toHaveText('₹2,498');

    // Take verification evidence screenshot
    await page.screenshot({ path: 'evidence/phase3/mandatory-3-quantity-calculations.png', fullPage: true });
  });
});

test.describe('CartFlow 2.0 - High-Value Regression & Multi-Page Scenarios', () => {
  let cartFlow: CartFlowPage;

  test.beforeEach(async ({ page }) => {
    cartFlow = new CartFlowPage(page);
    await cartFlow.goto();
  });

  test('REG-01: Empty cart checkout is blocked with visible alert', async ({ page }) => {
    // Navigate directly to checkout
    await page.goto('/checkout');

    // Enter name and attempt checkout
    await cartFlow.enterCustomerName('John Doe');
    await cartFlow.placeOrder();

    // Assert cart error alert appears
    await expect(cartFlow.cartError).toBeVisible();
    await expect(cartFlow.cartError).toContainText('Your cart is empty');

    // Assert confirmation is NOT rendered
    await expect(cartFlow.confirmationView).not.toBeVisible();
  });

  test('REG-02: Removing a product recalculates the total correctly', async () => {
    // Add both products: ₹1,499 + ₹999 = ₹2,498
    await cartFlow.addHeadphones();
    await cartFlow.addBackpack();
    await expect(cartFlow.orderTotal).toHaveText('₹2,498');

    // Remove Backpack
    await cartFlow.removeBackpack();

    // Assert only Headphones remain and total is ₹1,499
    await expect(cartFlow.backpackLineTotal).not.toBeVisible();
    await expect(cartFlow.headphonesLineTotal).toBeVisible();
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');
  });

  test('REG-03: Decrement button is disabled at minimum quantity (1)', async () => {
    await cartFlow.addHeadphones();
    await expect(cartFlow.headphonesQtyValue).toHaveText('1');

    // Assert decrement button has HTML disabled attribute
    await expect(cartFlow.headphonesDecrementBtn).toBeDisabled();

    // Attempting to click does not change quantity
    await cartFlow.headphonesDecrementBtn.click({ force: true });
    await expect(cartFlow.headphonesQtyValue).toHaveText('1');
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');
  });

  test('REG-04: Removing the last product displays the empty cart state', async () => {
    await cartFlow.addHeadphones();
    await expect(cartFlow.emptyCartState).not.toBeVisible();

    await cartFlow.removeHeadphones();
    await expect(cartFlow.emptyCartState).toBeVisible();
  });

  test('REG-05: Adding the same product twice updates quantity instead of duplicating rows', async ({ page }) => {
    await cartFlow.addHeadphones();
    await cartFlow.addHeadphones();

    // Verify quantity is 2
    await expect(cartFlow.headphonesQtyValue).toHaveText('2');

    // Verify exactly one row exists for this product in cart drawer/list
    const itemRows = page.locator('[data-testid="cart-items-list"] [data-testid^="cart-item-prod-"]');
    await expect(itemRows).toHaveCount(1);
    await expect(cartFlow.orderTotal).toHaveText('₹2,998');
  });

  test('REG-06: Rapid double-click prevents duplicate order confirmations', async () => {
    await cartFlow.addHeadphones();
    await cartFlow.enterCustomerName('Siddharth Sen');

    // Trigger rapid successive clicks
    const submitBtn = cartFlow.placeOrderButton;
    await Promise.all([
      submitBtn.click(),
      submitBtn.click().catch(() => {}),
    ]);

    // Wait for confirmation view
    await expect(cartFlow.confirmationView).toBeVisible();

    // Assert exactly one confirmation exists
    await expect(cartFlow.confirmationView).toHaveCount(1);
  });

  test('REG-07: Customer name with leading and trailing spaces is trimmed on confirmation receipt', async () => {
    await cartFlow.addHeadphones();
    await cartFlow.enterCustomerName('   Sneha Patel   ');
    await cartFlow.placeOrder();

    await expect(cartFlow.confirmationView).toBeVisible();
    // Trimmed value asserted
    await expect(cartFlow.confirmationCustomerName).toHaveText('Sneha Patel');
  });

  test('REG-08: Order reset workflow restores clean application baseline', async () => {
    await cartFlow.addHeadphones();
    await cartFlow.enterCustomerName('Test User');
    await cartFlow.placeOrder();

    await expect(cartFlow.confirmationView).toBeVisible();

    // Click "Start New Order"
    await cartFlow.startNewOrder();

    // Verify returned to catalog/shop and customer name input is cleared on next checkout visit
    await expect(cartFlow.catalogHeading.first()).toBeVisible();
    await cartFlow.page.goto('/checkout');
    await expect(cartFlow.customerNameInput).toHaveValue('');
    await expect(cartFlow.emptyCartState).toBeVisible();
  });

  test('REG-09: Multi-page navigation seamlessly transitions across routes', async ({ page }) => {
    // 1. Visit Home (/)
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Everyday essentials/i })).toBeVisible();

    // 2. Navigate to Collection (/shop)
    await page.getByRole('link', { name: 'Collection', exact: true }).click();
    await expect(page).toHaveURL(/\/shop/);
    await expect(page.getByRole('heading', { name: /Curated Essentials/i })).toBeVisible();

    // 3. Navigate to Cart (/cart)
    await page.getByRole('link', { name: 'Cart', exact: true }).click();
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.getByRole('heading', { name: /My Shopping Bag/i })).toBeVisible();

    // 4. Navigate to Checkout (/checkout)
    await page.getByRole('link', { name: 'Checkout', exact: true }).click();
    await expect(page).toHaveURL(/\/checkout/);
    await expect(page.getByRole('heading', { name: /Checkout/i })).toBeVisible();
  });

  test('REG-10: Cart state persists across route navigations', async ({ page }) => {
    // 1. Add Headphones on /shop
    await page.goto('/shop');
    await cartFlow.addHeadphones();
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    // 2. Navigate to Home (/) and verify cart badge persists
    await page.goto('/');
    await expect(page.getByTestId('cart-badge')).toHaveText('1');

    // 3. Navigate to /cart and verify product details persist
    await page.goto('/cart');
    await expect(cartFlow.headphonesLineTotal).toHaveText('₹1,499');
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');

    // 4. Navigate to /checkout and verify order total persists
    await page.goto('/checkout');
    await expect(cartFlow.orderTotal).toHaveText('₹1,499');
  });
});
