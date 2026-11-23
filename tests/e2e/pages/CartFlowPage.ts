import { Page, Locator, expect } from '@playwright/test';

/**
 * Enterprise Page Object Model for CartFlow 2.0.
 * Supports multi-page navigation across Landing, Shop, Cart, Checkout, and Confirmation routes.
 * Strictly avoids arbitrary fixed sleeps.
 */
export class CartFlowPage {
  readonly page: Page;

  // Catalog Section Locators
  readonly catalogHeading: Locator;
  readonly headphonesTitle: Locator;
  readonly backpackTitle: Locator;
  readonly addHeadphonesButton: Locator;
  readonly addBackpackButton: Locator;

  // Cart & Pricing Locators
  readonly cartSummaryHeading: Locator;
  readonly orderTotal: Locator;
  readonly emptyCartState: Locator;
  readonly cartItemsList: Locator;

  // Steppers & Item Controls
  readonly headphonesLineTotal: Locator;
  readonly backpackLineTotal: Locator;
  readonly headphonesQtyValue: Locator;
  readonly backpackQtyValue: Locator;
  readonly headphonesIncrementBtn: Locator;
  readonly headphonesDecrementBtn: Locator;
  readonly backpackIncrementBtn: Locator;
  readonly backpackDecrementBtn: Locator;
  readonly removeHeadphonesBtn: Locator;
  readonly removeBackpackBtn: Locator;

  // Checkout Form Locators
  readonly customerNameInput: Locator;
  readonly placeOrderButton: Locator;
  readonly validationAlert: Locator;
  readonly customerNameError: Locator;
  readonly cartError: Locator;

  // Confirmation View Locators
  readonly confirmationView: Locator;
  readonly confirmationBadge: Locator;
  readonly confirmationCustomerName: Locator;
  readonly confirmationReference: Locator;
  readonly confirmationTotal: Locator;
  readonly startNewOrderButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Catalog
    this.catalogHeading = page.getByRole('heading', {
      name: /Curated Synthetic Collection|Curated Essentials|The Curated Collection|Everyday essentials|Active Rituals/i,
    });
    this.headphonesTitle = page.getByRole('heading', { name: /Aero Wireless Headphones/i }).first();
    this.backpackTitle = page.getByRole('heading', { name: /Urban Everyday Backpack/i }).first();
    this.addHeadphonesButton = page.getByRole('button', { name: /Add Aero Wireless Headphones to cart/i }).first();
    this.addBackpackButton = page.getByRole('button', { name: /Add Urban Everyday Backpack to cart/i }).first();

    // Cart Summary
    this.cartSummaryHeading = page.getByRole('heading', { name: /Shopping (Cart|Bag)|My Shopping Bag/i });
    this.orderTotal = page.getByTestId('order-total').first();
    this.emptyCartState = page.getByTestId('empty-cart-state').first();
    this.cartItemsList = page.getByTestId('cart-items-list').first();

    // Controls
    this.headphonesLineTotal = page.getByTestId('line-total-prod-aero-headphones').first();
    this.backpackLineTotal = page.getByTestId('line-total-prod-urban-backpack').first();
    this.headphonesQtyValue = page.getByTestId('quantity-value-prod-aero-headphones').first();
    this.backpackQtyValue = page.getByTestId('quantity-value-prod-urban-backpack').first();
    this.headphonesIncrementBtn = page.getByRole('button', { name: /Increase quantity of Aero Wireless Headphones/i }).first();
    this.headphonesDecrementBtn = page.getByRole('button', { name: /Decrease quantity of Aero Wireless Headphones/i }).first();
    this.backpackIncrementBtn = page.getByRole('button', { name: /Increase quantity of Urban Everyday Backpack/i }).first();
    this.backpackDecrementBtn = page.getByRole('button', { name: /Decrease quantity of Urban Everyday Backpack/i }).first();
    this.removeHeadphonesBtn = page.getByRole('button', { name: /Remove Aero Wireless Headphones from cart/i }).first();
    this.removeBackpackBtn = page.getByRole('button', { name: /Remove Urban Everyday Backpack from cart/i }).first();

    // Checkout Form
    this.customerNameInput = page.getByLabel(/Customer Name/i);
    this.placeOrderButton = page.getByRole('button', { name: /Place Order/i });
    this.validationAlert = page.getByRole('alert');
    this.customerNameError = page.getByTestId('customer-name-error');
    this.cartError = page.getByTestId('cart-error');

    // Confirmation
    this.confirmationView = page.getByTestId('order-confirmation-view');
    this.confirmationBadge = page.getByTestId('order-confirmation-view').getByText('Order Confirmed', { exact: true });
    this.confirmationCustomerName = page.getByTestId('confirmation-customer-name');
    this.confirmationReference = page.getByTestId('order-reference');
    this.confirmationTotal = page.getByTestId('confirmation-total');
    this.startNewOrderButton = page.getByRole('button', { name: /Start New Order/i });
  }

  async goto(path = '/') {
    await this.page.goto(path);
    await expect(this.catalogHeading.first()).toBeVisible();
  }

  async closeDrawerIfOpen() {
    const closeBtn = this.page.getByRole('button', { name: /Close Shopping Bag Drawer/i });
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(closeBtn).not.toBeVisible();
    }
  }

  async addHeadphones() {
    await this.closeDrawerIfOpen();
    if (!(await this.addHeadphonesButton.first().isVisible())) {
      await this.page.goto('/shop');
      await expect(this.addHeadphonesButton.first()).toBeVisible();
    }
    await this.addHeadphonesButton.first().click();
  }

  async addBackpack() {
    await this.closeDrawerIfOpen();
    if (!(await this.addBackpackButton.first().isVisible())) {
      await this.page.goto('/shop');
      await expect(this.addBackpackButton.first()).toBeVisible();
    }
    await this.addBackpackButton.first().click();
  }

  async enterCustomerName(name: string) {
    await this.closeDrawerIfOpen();
    if (!(await this.customerNameInput.isVisible())) {
      await this.page.goto('/checkout');
      await expect(this.customerNameInput).toBeVisible();
    }
    await this.customerNameInput.fill(name);
  }

  async placeOrder() {
    await this.closeDrawerIfOpen();
    if (!(await this.placeOrderButton.isVisible())) {
      await this.page.goto('/checkout');
      await expect(this.placeOrderButton).toBeVisible();
    }
    await this.placeOrderButton.click();
  }

  async increaseHeadphones() {
    await this.headphonesIncrementBtn.click();
  }

  async decreaseHeadphones() {
    await this.headphonesDecrementBtn.click();
  }

  async increaseBackpack() {
    await this.backpackIncrementBtn.click();
  }

  async decreaseBackpack() {
    await this.backpackDecrementBtn.click();
  }

  async removeHeadphones() {
    await this.removeHeadphonesBtn.click();
  }

  async removeBackpack() {
    await this.removeBackpackBtn.click();
  }

  async startNewOrder() {
    await this.startNewOrderButton.click();
    await expect(this.catalogHeading.first()).toBeVisible();
  }
}
