import { expect, test, type TestInfo } from '@playwright/test';
import {
  ATYPICAL_CUSTOMER,
  CHECKOUT_CUSTOMER,
  PRODUCTS,
} from './fixtures/checkout-data';
import { SauceDemoApp } from './pages/saucedemo-app';

function noteStoryGap(testInfo: TestInfo, description: string): void {
  testInfo.annotations.push({ type: 'story-gap', description });
}

async function openCheckoutInfoWithItem(app: SauceDemoApp): Promise<void> {
  await app.login();
  await app.addProducts(PRODUCTS.backpack);
  await app.openCart();
  await app.startCheckoutFromCart();
}

test.describe('SauceDemo Checkout Validation and Story Gaps', () => {
  test('blocks checkout when all checkout information fields are empty', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await openCheckoutInfoWithItem(app);
    await app.continueCheckout();

    await app.expectOnCheckoutInfoPage();
    await expect(app.checkoutError).toContainText('Error: First Name is required');
  });

  test('shows required-field errors in sequence for partial checkout information', async ({ page }) => {
    const app = new SauceDemoApp(page);

    await openCheckoutInfoWithItem(app);

    await app.firstNameInput.fill(CHECKOUT_CUSTOMER.firstName);
    await app.continueCheckout();
    await expect(app.checkoutError).toContainText('Error: Last Name is required');

    await app.lastNameInput.fill(CHECKOUT_CUSTOMER.lastName);
    await app.continueCheckout();
    await expect(app.checkoutError).toContainText('Error: Postal Code is required');

    await app.expectOnCheckoutInfoPage();
  });

  test('accepts atypical non-empty checkout data and documents the story gap', async ({ page }, testInfo) => {
    const app = new SauceDemoApp(page);

    noteStoryGap(
      testInfo,
      'SauceDemo accepts atypical non-empty values such as @Jane / D03 / ABCDE instead of enforcing richer format validation from the story.',
    );

    await openCheckoutInfoWithItem(app);
    await app.fillCheckoutInfo(ATYPICAL_CUSTOMER);
    await app.continueCheckout();

    await app.expectOnOverviewPage();
    await expect(app.checkoutError).toHaveCount(0);
  });

  test('allows empty-cart checkout and documents the story gap', async ({ page }, testInfo) => {
    const app = new SauceDemoApp(page);

    noteStoryGap(
      testInfo,
      'SauceDemo allows an empty cart to proceed into checkout step one even though the story expects checkout to be blocked.',
    );

    await app.login();
    await app.openCart();

    await expect(app.itemRow(PRODUCTS.backpack)).toHaveCount(0);
    await expect(app.checkoutButton).toBeEnabled();

    await app.startCheckoutFromCart();
    await app.expectOnCheckoutInfoPage();
  });
});