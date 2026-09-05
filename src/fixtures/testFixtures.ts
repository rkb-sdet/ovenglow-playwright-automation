import { test as baseTest, expect } from '@playwright/test';
import { StorefrontPage } from '../pages/StorefrontPage';
import { CheckoutModalPage } from '../pages/CheckoutModalPage';
import { KitchenConsolePage } from '../pages/KitchenConsolePage';
import { CartDrawerPage } from '../pages/CartDrawerPage';

type Pages = {
  storefront: StorefrontPage;
  checkout: CheckoutModalPage;
  kitchen: KitchenConsolePage;
  cartDrawer: CartDrawerPage;
};

export const test = baseTest.extend<Pages>({
  storefront: async ({ page }, use) => {
    await use(new StorefrontPage(page));
  },
  checkout: async ({ page }, use) => {
    await use(new CheckoutModalPage(page));
  },
  kitchen: async ({ page }, use) => {
    await use(new KitchenConsolePage(page));
  },
  cartDrawer: async ({ page }, use) => {
    await use(new CartDrawerPage(page));
  },
});

export { expect };