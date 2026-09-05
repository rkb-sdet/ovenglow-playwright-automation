import { test, expect } from '../../../src/fixtures/testFixtures';

test.describe('Kitchen Staff - Authentication Barrier', () => {
  test.beforeEach(async ({ storefront }) => {
    await storefront.navigateTo('/');
  });

  test('TC_STAFF_001: Kitchen console enforces authentication barrier for guests', async ({ kitchen }) => {
    await kitchen.openLoginModal();
    await expect(kitchen.loginBtn).toBeVisible();
    await expect(kitchen.consoleHeader).not.toBeVisible();
  });
});