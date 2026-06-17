import type { Product } from '../fixtures/checkout-data';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function formatMoney(value: number): string {
  return usd.format(value);
}

export function lineItemTotal(products: readonly Product[]): number {
  return Number(products.reduce((sum, product) => sum + product.price, 0).toFixed(2));
}

export function expectedTax(itemTotal: number): number {
  return Number((itemTotal * 0.08).toFixed(2));
}

export function expectedTotal(itemTotal: number): number {
  return Number((itemTotal + expectedTax(itemTotal)).toFixed(2));
}