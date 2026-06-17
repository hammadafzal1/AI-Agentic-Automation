import { expect, test, devices, type Locator, type Page } from '@playwright/test';
import { CHECKOUT_CUSTOMER, PRODUCTS } from './fixtures/checkout-data';
import { SauceDemoApp } from './pages/saucedemo-app';

const iPhone12 = devices['iPhone 12'];

test.use({ ...iPhone12 });

async function expectReachableInViewport(page: Page, locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
  await expect(locator).toBeVisible();

  const viewport = page.viewportSize();
  const box = await locator.boundingBox();

  expect(viewport).not.toBeNull();
  expect(box).not.toBeNull();

  if (!viewport || !box) {
    return;
  }

  expect(box.x).toBeGreaterThanOrEqual(0);
  expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
}

test.describe('SauceDemo Checkout Mobile Responsiveness', () => {
  test('keeps checkout controls readable and reachable on a mobile viewport', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await app.login();
    await app.addProducts(PRODUCTS.backpack);
    await app.openCart();

    await expectReachableInViewport(page, app.checkoutButton);
    await app.startCheckoutFromCart();

    await expectReachableInViewport(page, app.firstNameInput);
    await expectReachableInViewport(page, app.lastNameInput);
    await expectReachableInViewport(page, app.postalCodeInput);
    await expectReachableInViewport(page, app.continueButton);

    await app.fillCheckoutInfo(CHECKOUT_CUSTOMER);
    await app.continueCheckout();
    await app.expectOnOverviewPage();

    await expect(app.paymentInfo).toHaveText('SauceCard #31337');
    await expect(app.shippingInfo).toHaveText('Free Pony Express Delivery!');
    await expectReachableInViewport(page, app.summaryTotal);
    await expectReachableInViewport(page, app.finishButton);

    await app.finishCheckout();

    await expect(app.completeHeader).toHaveText('Thank you for your order!');
    await expectReachableInViewport(page, app.backHomeButton);
  });
});