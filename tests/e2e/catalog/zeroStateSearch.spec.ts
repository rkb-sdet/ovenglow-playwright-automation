import { test, expect } from '../../../src/fixtures/testFixtures';

test.describe('Storefront - Zero State Search Result', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_SRCH_002: Verify zero state message for non-matching query', async ({ storefront }) => {
    await storefront.searchProduct('xyzinvalidproduct999');
    await expect(storefront.emptyStateMsg).toBeVisible();
  });
});