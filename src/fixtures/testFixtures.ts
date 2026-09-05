import { test as baseTest } from '@playwright/test';
import { StorefrontPage } from '../pages/StorefrontPage';
import { CheckoutModalPage } from '../pages/CheckoutModalPage';
import { KitchenConsolePage } from '../pages/KitchenConsolePage';

type Pages = {
  storefront: StorefrontPage;
  checkout: CheckoutModalPage;
  kitchen: KitchenConsolePage;
};

export const test = baseTest.extend<Pages>({
  storefront: async ({ page }, use) => {
    const storefront = new StorefrontPage(page);
    await use(storefront);
  },
  checkout: async ({ page }, use) => {
    const checkout = new CheckoutModalPage(page);
    await use(checkout);
  },
  kitchen: async ({ page }, use) => {
    const kitchen = new KitchenConsolePage(page);
    await use(kitchen);
  },
});

export { expect } from '@playwright/test';