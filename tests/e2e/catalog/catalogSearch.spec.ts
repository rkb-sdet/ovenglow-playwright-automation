import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Storefront - Catalog Search', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_CAT_001 & TC_SRCH_001: Verify product search filters menu accurately', async ({ storefront }) => {
    await storefront.searchProduct('Truffle');
    await expect(storefront.productCards.filter({ hasText: testData.products.primary })).toBeVisible();
  });
});