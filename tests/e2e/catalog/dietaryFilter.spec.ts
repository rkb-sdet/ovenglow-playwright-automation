import { test, expect } from '../../../src/fixtures/testFixtures';

test.describe('Storefront - Dietary Eggless Filter', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_CAT_003: 100% Eggless filter renders only eggless items', async ({ storefront, page }) => {
    await expect(storefront.productCards.first()).toBeVisible({ timeout: 10000 });
    await storefront.toggleEgglessFilter();
    await page.waitForTimeout(800);

    const count = await storefront.productCards.count();
    expect(count).toBeGreaterThan(0);

    for (let i = 0; i < count; i++) {
      const card = storefront.productCards.nth(i);
      await expect(card.locator('text=/Eggless/i').or(card.locator('.bg-emerald-500, .text-emerald-500, .bg-green-500'))).toBeVisible();
    }
  });
});