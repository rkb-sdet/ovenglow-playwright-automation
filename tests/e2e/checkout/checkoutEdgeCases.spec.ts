import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Express Checkout - Form & Delivery Slot Edge Cases', () => {
  test.beforeEach(async ({ storefront, checkout, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
    await storefront.addProductToBag(testData.products.primary);
    await storefront.openBag();
    await checkout.proceedFromBag();
  });

  test('TC_CHK_001: Prevent checkout submission with empty input fields', async ({ checkout, page }) => {
    await checkout.placeOrderBtn.click();
    
    // Verify HTML5 required validation on Name field
    const nameInput = checkout.nameInput.first();
    const isRequired = await nameInput.getAttribute('required');
    expect(isRequired).not.toBeNull();

    // Success confirmation should not be visible
    await expect(checkout.successHeader).not.toBeVisible();
  });

  test('TC_CHK_002: Delivery slot switching maintains state styling', async ({ checkout }) => {
    // Switch to Morning slot
    await checkout.scheduledSlotBtn.click();
    await expect(checkout.scheduledSlotBtn).toHaveClass(/border-bakery-gold|ring-2/);

    // Switch back to Instant slot
    await checkout.instantSlotBtn.click();
    await expect(checkout.instantSlotBtn).toHaveClass(/border-bakery-gold|ring-2/);
  });
});