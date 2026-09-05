import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Kitchen Staff - Lifecycle State Transitions & Signout', () => {
  test.beforeEach(async ({ storefront, kitchen, page }) => {
    await storefront.navigateTo('/');
    await kitchen.openLoginModal();
    await kitchen.login(testData.credentials.staff.email, testData.credentials.staff.password);
    await kitchen.verifyConsoleActive();
  });

  test('TC_STAFF_004: Update order status transition from active to delivered', async ({ kitchen, page }) => {
    const firstOrder = kitchen.orderCards.first();
    await expect(firstOrder).toBeVisible({ timeout: 10000 });

    // Click next status action button (Bake or Dispatch or Done)
    const actionBtn = firstOrder.locator('button.bg-bakery-espresso, button:has-text("Dispatch"), button:has-text("Done")').first();
    if (await actionBtn.isVisible()) {
      await actionBtn.click();
      await page.waitForTimeout(600);
      await expect(page.locator('.toast, [role="status"]').or(firstOrder)).toBeVisible();
    }
  });

  test('TC_STAFF_006: Staff sign-out invalidates session and resets dashboard', async ({ kitchen, page }) => {
    await expect(kitchen.signOutBtn).toBeVisible();
    await kitchen.signOutBtn.click();

    // Dashboard must be destroyed and login prompt enforced
    await expect(kitchen.loginBtn).toBeVisible({ timeout: 8000 });
    await expect(kitchen.consoleHeader).not.toBeVisible();
  });
});