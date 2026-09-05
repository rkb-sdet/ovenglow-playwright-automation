import { test, expect } from '../../src/fixtures/testFixtures';
import { testData } from '../../src/data/testData';

test.describe('OvenGlow Storefront & Express Checkout Suite', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_CAT_001 & TC_SRCH_001: Verify product search filters menu accurately', async ({ storefront }) => {
    await storefront.searchProduct('Truffle');
    await expect(storefront.productCards.filter({ hasText: testData.products.primary })).toBeVisible();
  });

  test('TC_CAT_003: 100% Eggless filter renders only eggless items', async ({ storefront, page }) => {
    // 1. Pehle database se initial cards load hone ka wait karein
    await expect(storefront.productCards.first()).toBeVisible({ timeout: 10000 });

    // 2. Eggless toggle switch click karein
    await storefront.toggleEgglessFilter();
    await page.waitForTimeout(800);

    // 3. Filtered products count verify karein
    const count = await storefront.productCards.count();
    expect(count).toBeGreaterThan(0);

    // 4. Sabhi visible cards me "Eggless" ya green badge present hona verify karein
    for (let i = 0; i < count; i++) {
      const card = storefront.productCards.nth(i);
      await expect(card.locator('text=/Eggless/i').or(card.locator('.bg-emerald-500, .text-emerald-500, .bg-green-500'))).toBeVisible();
    }
  });

  test('TC_SRCH_002: Verify zero state message for non-matching query', async ({ storefront }) => {
    await storefront.searchProduct('xyzinvalidproduct999');
    await expect(storefront.emptyStateMsg).toBeVisible();
  });

  test('TC_CHK_003: End-to-end order placement and Order ID generation', async ({ storefront, checkout, page }) => {
    // 1. Add product to bag
    await expect(storefront.productCards.first()).toBeVisible({ timeout: 10000 });
    await storefront.addProductToBag(testData.products.primary);
    await page.waitForTimeout(600);

    // 2. Open Bag & Proceed
    await storefront.openBag();
    await checkout.proceedFromBag();

    // 3. Fill checkout form
    await checkout.fillCustomerDetails(
      testData.customer.valid.name,
      testData.customer.valid.phone,
      testData.customer.valid.address,
      'instant'
    );

    // 4. Order place and confirm tracking/ID
    const orderId = await checkout.submitOrder();
    expect(orderId.length).toBeGreaterThan(0);
  });
});