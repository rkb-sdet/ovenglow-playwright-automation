import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Express Checkout - End-to-End Order Flow', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_CHK_003: End-to-end order placement and Order ID generation', async ({ storefront, checkout, page }) => {
    test.setTimeout(60000);

    await expect(storefront.productCards.first()).toBeVisible({ timeout: 15000 });
    await storefront.addProductToBag(testData.products.primary);
    await page.waitForTimeout(800);

    await storefront.openBag();
    await checkout.proceedFromBag();

    await checkout.fillCustomerDetails(
      testData.customer.valid.name,
      testData.customer.valid.phone,
      testData.customer.valid.address,
      'instant'
    );

    const orderId = await checkout.submitOrder();
    expect(orderId.length).toBeGreaterThan(0);
  });
});