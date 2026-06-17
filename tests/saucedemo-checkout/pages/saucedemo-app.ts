import { expect, type Locator, type Page } from '@playwright/test';
import {
  APP_URL,
  CHECKOUT_CUSTOMER,
  type CheckoutInfo,
  type Product,
  STANDARD_USER,
} from '../fixtures/checkout-data';

export class SauceDemoApp {
  constructor(private readonly page: Page) {}

  get title(): Locator {
    return this.page.locator('[data-test="title"]');
  }

  get usernameInput(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get passwordInput(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  get cartLink(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get cartQuantityLabel(): Locator {
    return this.page.locator('[data-test="cart-quantity-label"]');
  }

  get cartDescriptionLabel(): Locator {
    return this.page.locator('[data-test="cart-desc-label"]');
  }

  get continueShoppingButton(): Locator {
    return this.page.locator('[data-test="continue-shopping"]');
  }

  get checkoutButton(): Locator {
    return this.page.locator('[data-test="checkout"]');
  }

  get firstNameInput(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameInput(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  get postalCodeInput(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  get cancelButton(): Locator {
    return this.page.locator('[data-test="cancel"]');
  }

  get continueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  get checkoutError(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  get paymentInfo(): Locator {
    return this.page.locator('[data-test="payment-info-value"]');
  }

  get shippingInfo(): Locator {
    return this.page.locator('[data-test="shipping-info-value"]');
  }

  get summaryItemTotal(): Locator {
    return this.page.locator('[data-test="subtotal-label"]');
  }

  get summaryTax(): Locator {
    return this.page.locator('[data-test="tax-label"]');
  }

  get summaryTotal(): Locator {
    return this.page.locator('[data-test="total-label"]');
  }

  get finishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  get completeHeader(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  get completeText(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }

  get backHomeButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }

  async gotoLogin(): Promise<void> {
    await this.page.goto(APP_URL);
    await this.expectOnLoginPage();
  }

  async login(
    username: string = STANDARD_USER.username,
    password: string = STANDARD_USER.password,
  ): Promise<void> {
    await this.gotoLogin();
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await this.expectOnInventoryPage();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
    await this.expectOnCartPage();
  }

  async addProducts(...products: readonly Product[]): Promise<void> {
    for (const product of products) {
      await this.addToCartButton(product).click();
    }
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
    await this.expectOnInventoryPage();
  }

  async startCheckoutFromCart(): Promise<void> {
    await this.checkoutButton.click();
    await this.expectOnCheckoutInfoPage();
  }

  async fillCheckoutInfo(info: CheckoutInfo = CHECKOUT_CUSTOMER): Promise<void> {
    await this.firstNameInput.fill(info.firstName);
    await this.lastNameInput.fill(info.lastName);
    await this.postalCodeInput.fill(info.postalCode);
  }

  async continueCheckout(): Promise<void> {
    await this.continueButton.click();
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
    await this.expectOnCompletePage();
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
    await this.expectOnInventoryPage();
  }

  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.loginButton).toBeVisible();
  }

  async expectOnInventoryPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title).toHaveText('Products');
  }

  async expectOnCartPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title).toHaveText('Your Cart');
  }

  async expectOnCheckoutInfoPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async expectOnOverviewPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async expectOnCompletePage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async expectCartBadgeCount(count: number): Promise<void> {
    if (count === 0) {
      await expect(this.cartBadge).toHaveCount(0);
      return;
    }

    await expect(this.cartBadge).toHaveText(String(count));
  }

  async expectItemVisible(product: Product): Promise<void> {
    const row = this.itemRow(product);
    await expect(row).toBeVisible();
    await expect(row.locator('[data-test="inventory-item-name"]')).toHaveText(product.name);
    await expect(row.locator('[data-test="inventory-item-desc"]')).toBeVisible();
  }

  async expectCartItem(product: Product): Promise<void> {
    await this.expectItemVisible(product);
    await expect(this.itemQuantity(product)).toHaveText('1');
  }

  async expectOverviewItem(product: Product): Promise<void> {
    await this.expectItemVisible(product);
    await expect(this.itemQuantity(product)).toHaveText('1');
  }

  addToCartButton(product: Product): Locator {
    return this.page.locator(`[data-test="add-to-cart-${product.slug}"]`);
  }

  itemRow(product: Product): Locator {
    return this.page
      .locator('[data-test="inventory-item"]')
      .filter({ has: this.page.getByText(product.name, { exact: true }) });
  }

  itemPrice(product: Product): Locator {
    return this.itemRow(product).locator('[data-test="inventory-item-price"]');
  }

  itemQuantity(product: Product): Locator {
    return this.itemRow(product).locator('[data-test="item-quantity"]');
  }
}