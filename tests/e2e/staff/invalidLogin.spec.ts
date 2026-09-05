import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Kitchen Staff - Invalid Login Validation', () => {
  test.beforeEach(async ({ storefront }) => {
    await storefront.navigateTo('/');
  });

  test('TC_STAFF_002: Invalid credentials trigger authentication error', async ({ kitchen, page }) => {
    await kitchen.openLoginModal();
    await kitchen.login(testData.credentials.invalid.email, testData.credentials.invalid.password);
    await expect(page.locator('text=Invalid login credentials')).toBeVisible();
  });
});