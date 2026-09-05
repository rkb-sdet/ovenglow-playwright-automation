import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Cart & Pricing Engine - Edge Cases', () => {
  test.beforeEach(async ({ storefront, page }) => {
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');
  });

  test('TC_CART_002 & 003: Decrement item to zero removes it from global state', async ({ storefront, cartDrawer, page }) => {
    // 1. Add product to bag
    await storefront.addProductToBag(testData.products.primary);
    
    // 2. Verify bag badge updates to 1
    await expect(storefront.bagBadge).toHaveText(/1/, { timeout: 10000 });

    // 3. Open bag drawer
    await storefront.openBag();

    // 4. Item text should be visible on screen
    await expect(page.getByText(/Truffle/i).first()).toBeVisible({ timeout: 10000 });

    // 5. Decrement item (1 -> 0)
    await cartDrawer.decrementFirstItem();

    // 6. Item zero hone ke baad ya toh empty message aayega ya badge 1 se hat jayega
    const emptyOrZeroBadge = cartDrawer.emptyCartMsg.or(storefront.bagBadge.filter({ hasNotText: '1' }));
    await expect(emptyOrZeroBadge.first()).toBeVisible({ timeout: 10000 });
  });

  test('TC_PRIC_001: Free delivery threshold applied on orders >= ₹499', async ({ storefront, cartDrawer }) => {
    await storefront.addProductToBag(testData.products.primary);
    await expect(storefront.bagBadge).toHaveText(/1/, { timeout: 10000 });
    await storefront.openBag();

    await expect(cartDrawer.deliveryFeeText).toHaveText(/FREE/i, { timeout: 10000 });
  });

  test('TC_PRIC_002: Delivery charge added for orders below threshold (< ₹499)', async ({ storefront, cartDrawer }) => {
    await storefront.searchProduct('Croissant');

    const croissantCard = storefront.productCards.filter({ hasText: /Croissant/i }).first();
    await expect(croissantCard).toBeVisible({ timeout: 10000 });

    const addToBagBtn = croissantCard.getByRole('button', { name: /Add to Bag|Added!/i });
    await addToBagBtn.click();
    await expect(storefront.bagBadge).toHaveText(/1/, { timeout: 10000 });

    await storefront.openBag();
    await expect(cartDrawer.deliveryFeeText).toContainText('₹49', { timeout: 10000 });
  });
});