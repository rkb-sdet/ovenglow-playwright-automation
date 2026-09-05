import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Kitchen Staff - Live Operations & WebSocket Dispatch', () => {
  test.beforeEach(async ({ storefront }) => {
    await storefront.navigateTo('/');
  });

  test('TC_STAFF_003 & TC_STAFF_004: Staff login and verify real-time dispatch dashboard', async ({ kitchen }) => {
    await kitchen.openLoginModal();
    await kitchen.login(testData.credentials.staff.email, testData.credentials.staff.password);
    await kitchen.verifyConsoleActive();

    // Verify WebSocket connection indicator
    await expect(kitchen.page.locator('text=WebSocket Connected')).toBeVisible({ timeout: 10000 });
  });
});