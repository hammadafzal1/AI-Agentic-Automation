import { expect, test } from '@playwright/test';
import { CHECKOUT_CUSTOMER, PRODUCTS } from './fixtures/checkout-data';
import { SauceDemoApp } from './pages/saucedemo-app';
import { expectedTax, expectedTotal, formatMoney, lineItemTotal } from './utils/money';

test.describe('SauceDemo Checkout Happy Path and Totals', () => {
  test('completes a single-item checkout and clears the cart', async ({ page }) => {
    const app = new SauceDemoApp(page);
    const backpack = PRODUCTS.backpack;

    await app.login();
    await app.addProducts(backpack);
    await app.expectCartBadgeCount(1);

    await app.openCart();
    await app.expectCartItem(backpack);
    await expect(app.itemPrice(backpack)).toHaveText(formatMoney(backpack.price));

    await app.startCheckoutFromCart();
    await app.fillCheckoutInfo(CHECKOUT_CUSTOMER);
    await app.continueCheckout();
    await app.expectOnOverviewPage();

    await app.expectOverviewItem(backpack);
    await expect(app.itemPrice(backpack)).toHaveText(formatMoney(backpack.price));
    await expect(app.paymentInfo).toHaveText('SauceCard #31337');
    await expect(app.shippingInfo).toHaveText('Free Pony Express Delivery!');
    await expect(app.summaryItemTotal).toHaveText(`Item total: ${formatMoney(backpack.price)}`);
    await expect(app.summaryTax).toHaveText(`Tax: ${formatMoney(expectedTax(backpack.price))}`);
    await expect(app.summaryTotal).toHaveText(
      `Total: ${formatMoney(expectedTotal(backpack.price))}`,
    );
    await expect(app.cancelButton).toBeEnabled();
    await expect(app.finishButton).toBeEnabled();

    await app.finishCheckout();

    await expect(app.completeHeader).toHaveText('Thank you for your order!');
    await expect(app.completeText).toContainText('Your order has been dispatched');
    await app.expectCartBadgeCount(0);

    await app.backHome();
  });

  test('shows cart review details and preserves contents after continue shopping', async ({ page }) => {
    const app = new SauceDemoApp(page);
    const backpack = PRODUCTS.backpack;

    await app.login();
    await app.addProducts(backpack);
    await app.openCart();

    await expect(app.cartQuantityLabel).toHaveText('QTY');
    await expect(app.cartDescriptionLabel).toHaveText('Description');
    await expect(app.continueShoppingButton).toBeEnabled();
    await expect(app.checkoutButton).toBeEnabled();
    await app.expectCartItem(backpack);
    await expect(app.itemPrice(backpack)).toHaveText(formatMoney(backpack.price));

    await app.continueShopping();
    await app.openCart();
    await app.expectCartItem(backpack);
    await app.expectCartBadgeCount(1);
  });

  test('shows correct multi-item totals on the overview page', async ({ page }) => {
    const app = new SauceDemoApp(page);
    const selectedProducts = [PRODUCTS.backpack, PRODUCTS.bikeLight] as const;
    const itemTotal = lineItemTotal(selectedProducts);

    await app.login();
    await app.addProducts(...selectedProducts);
    await app.expectCartBadgeCount(selectedProducts.length);

    await app.openCart();
    for (const product of selectedProducts) {
      await app.expectCartItem(product);
      await expect(app.itemPrice(product)).toHaveText(formatMoney(product.price));
    }

    await app.startCheckoutFromCart();
    await app.fillCheckoutInfo(CHECKOUT_CUSTOMER);
    await app.continueCheckout();
    await app.expectOnOverviewPage();

    for (const product of selectedProducts) {
      await app.expectOverviewItem(product);
      await expect(app.itemPrice(product)).toHaveText(formatMoney(product.price));
    }

    await expect(app.summaryItemTotal).toHaveText(`Item total: ${formatMoney(itemTotal)}`);
    await expect(app.summaryTax).toHaveText(`Tax: ${formatMoney(expectedTax(itemTotal))}`);
    await expect(app.summaryTotal).toHaveText(`Total: ${formatMoney(expectedTotal(itemTotal))}`);
  });
});