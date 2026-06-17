import { expect, test } from '@playwright/test';
import { APP_URL, CHECKOUT_CUSTOMER, PRODUCTS } from './fixtures/checkout-data';
import { SauceDemoApp } from './pages/saucedemo-app';

async function openCheckoutInfoWithItem(app: SauceDemoApp): Promise<void> {
  await app.login();
  await app.addProducts(PRODUCTS.backpack);
  await app.openCart();
  await app.startCheckoutFromCart();
}

async function openCheckoutOverviewWithItem(app: SauceDemoApp): Promise<void> {
  await openCheckoutInfoWithItem(app);
  await app.fillCheckoutInfo(CHECKOUT_CUSTOMER);
  await app.continueCheckout();
  await app.expectOnOverviewPage();
}

test.describe('SauceDemo Checkout Navigation and Access Control', () => {
  test('cancel from checkout information returns to cart and keeps cart contents', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await openCheckoutInfoWithItem(app);
    await app.cancelButton.click();

    await app.expectOnCartPage();
    await app.expectCartItem(PRODUCTS.backpack);
    await app.expectCartBadgeCount(1);
  });

  test('cancel from checkout overview returns to inventory without placing an order', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await openCheckoutOverviewWithItem(app);
    await app.cancelButton.click();

    await app.expectOnInventoryPage();
    await app.expectCartBadgeCount(1);
    await expect(app.completeHeader).toHaveCount(0);
  });

  test('browser back from checkout information returns to cart and preserves items', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await openCheckoutInfoWithItem(app);
    await page.goBack();

    await app.expectOnCartPage();
    await app.expectCartItem(PRODUCTS.backpack);
    await app.expectCartBadgeCount(1);
  });

  test('blocks direct unauthenticated access to checkout routes', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await page.goto(`${APP_URL}/checkout-step-one.html`);

    await app.expectOnLoginPage();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.",
    );

    await page.goto(`${APP_URL}/cart.html`);

    await app.expectOnLoginPage();
    await expect(page.locator('[data-test="error"]')).toContainText(
      "Epic sadface: You can only access '/cart.html' when you are logged in.",
    );
  });
});