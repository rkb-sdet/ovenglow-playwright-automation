import { test, expect } from '../../src/fixtures/testFixtures';
import { testData } from '../../src/data/testData';

test.describe('OvenGlow Kitchen Operations & Security Suite', () => {
  test.beforeEach(async ({ storefront }) => {
    await storefront.navigateTo('/');
  });

  test('TC_STAFF_001: Kitchen console enforces authentication barrier', async ({ kitchen }) => {
    await kitchen.openLoginModal();
    await expect(kitchen.loginBtn).toBeVisible();
    await expect(kitchen.consoleHeader).not.toBeVisible();
  });

  test('TC_STAFF_002: Invalid credentials trigger authentication error', async ({ kitchen, page }) => {
    await kitchen.openLoginModal();
    await kitchen.login(testData.credentials.invalid.email, testData.credentials.invalid.password);
    await expect(page.locator('text=Invalid login credentials')).toBeVisible();
  });

  test('TC_STAFF_003 & TC_STAFF_004: Staff login and live dispatch operations', async ({ kitchen }) => {
    await kitchen.openLoginModal();
    await kitchen.login(testData.credentials.staff.email, testData.credentials.staff.password);
    await kitchen.verifyConsoleActive();

    // Check if real-time socket indicator is active
    await expect(kitchen.page.locator('text=WebSocket Connected')).toBeVisible({ timeout: 10000 });
  });
});