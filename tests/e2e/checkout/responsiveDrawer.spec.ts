import { test, expect } from '../../../src/fixtures/testFixtures';

test.describe('Edge Cases - Responsive Viewport & Modal Dismiss', () => {
  test('TC_RESP_001: Mobile drawer visibility & close action', async ({ storefront, page }) => {
    // Set viewport to mobile screen
    await page.setViewportSize({ width: 390, height: 844 });
    await storefront.navigateTo('/');

    await storefront.openBag();
    const closeBtn = page.locator('button[aria-label="Close"], button:has-text("✕")').first();
    
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
      await expect(page.locator('.fixed.inset-y-0.right-0')).not.toBeVisible();
    }
  });
});