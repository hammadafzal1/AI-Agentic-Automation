export const APP_URL = 'https://www.saucedemo.com';

export const STANDARD_USER = {
  username: 'standard_user',
  password: 'secret_sauce',
} as const;

export const CHECKOUT_CUSTOMER = {
  firstName: 'Jane',
  lastName: 'Doe',
  postalCode: '90210',
} as const;

export const ATYPICAL_CUSTOMER = {
  firstName: '@Jane',
  lastName: 'D03',
  postalCode: 'ABCDE',
} as const;

export type CheckoutInfo = {
  firstName: string;
  lastName: string;
  postalCode: string;
};

export const PRODUCTS = {
  backpack: {
    slug: 'sauce-labs-backpack',
    name: 'Sauce Labs Backpack',
    price: 29.99,
  },
  bikeLight: {
    slug: 'sauce-labs-bike-light',
    name: 'Sauce Labs Bike Light',
    price: 9.99,
  },
  boltTShirt: {
    slug: 'sauce-labs-bolt-t-shirt',
    name: 'Sauce Labs Bolt T-Shirt',
    price: 15.99,
  },
} as const;

export type Product = (typeof PRODUCTS)[keyof typeof PRODUCTS];