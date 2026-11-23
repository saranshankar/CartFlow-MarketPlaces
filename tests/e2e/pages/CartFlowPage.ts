import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the CartFlow Commerce Application.
 * Employs semantic role, label, and accessible locators.
 * Strictly avoids arbitrary fixed timeouts.
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
    this.catalogHeading = page.getByRole('heading', { name: /Synthetic Catalog/i });
    this.headphonesTitle = page.getByRole('heading', { name: /Aero Wireless Headphones/i });
    this.backpackTitle = page.getByRole('heading', { name: /Urban Everyday Backpack/i });
    this.addHeadphonesButton = page.getByRole('button', { name: /Add Aero Wireless Headphones to cart/i });
    this.addBackpackButton = page.getByRole('button', { name: /Add Urban Everyday Backpack to cart/i });

    // Cart Summary
    this.cartSummaryHeading = page.getByRole('heading', { name: /Shopping Cart/i });
    this.orderTotal = page.getByTestId('order-total');
    this.emptyCartState = page.getByTestId('empty-cart-state');
    this.cartItemsList = page.getByTestId('cart-items-list');

    // Controls
    this.headphonesLineTotal = page.getByTestId('line-total-prod-aero-headphones');
    this.backpackLineTotal = page.getByTestId('line-total-prod-urban-backpack');
    this.headphonesQtyValue = page.getByTestId('quantity-value-prod-aero-headphones');
    this.backpackQtyValue = page.getByTestId('quantity-value-prod-urban-backpack');
    this.headphonesIncrementBtn = page.getByRole('button', { name: /Increase quantity of Aero Wireless Headphones/i });
    this.headphonesDecrementBtn = page.getByRole('button', { name: /Decrease quantity of Aero Wireless Headphones/i });
    this.backpackIncrementBtn = page.getByRole('button', { name: /Increase quantity of Urban Everyday Backpack/i });
    this.backpackDecrementBtn = page.getByRole('button', { name: /Decrease quantity of Urban Everyday Backpack/i });
    this.removeHeadphonesBtn = page.getByRole('button', { name: /Remove Aero Wireless Headphones from cart/i });
    this.removeBackpackBtn = page.getByRole('button', { name: /Remove Urban Everyday Backpack from cart/i });

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

  async goto() {
    await this.page.goto('/');
    await expect(this.catalogHeading).toBeVisible();
  }

  async addHeadphones() {
    await this.addHeadphonesButton.click();
  }

  async addBackpack() {
    await this.addBackpackButton.click();
  }

  async enterCustomerName(name: string) {
    await this.customerNameInput.fill(name);
  }

  async placeOrder() {
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
    await expect(this.catalogHeading).toBeVisible();
  }
}
