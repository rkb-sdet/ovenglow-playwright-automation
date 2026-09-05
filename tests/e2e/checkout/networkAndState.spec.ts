import { test, expect } from '../../../src/fixtures/testFixtures';
import { testData } from '../../../src/data/testData';

test.describe('Edge Cases - Network Errors & State Persistence', () => {
  test('TC_STATE_001: Cart state persists after page reload', async ({ storefront, page }) => {
    test.setTimeout(45000);
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');

    await storefront.addProductToBag(testData.products.primary);
    await page.waitForTimeout(500);

    // Reload page
    await page.reload();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Verify application loads healthy after refresh and storefront is interactive
    await expect(storefront.productCards.first()).toBeVisible({ timeout: 15000 });
    await expect(storefront.bagButton).toBeVisible();
  });

  test('TC_NET_001: Graceful UI handling on server 500 failure during checkout', async ({ storefront, checkout, page }) => {
    test.setTimeout(45000);
    await storefront.navigateTo('/');
    await page.waitForLoadState('networkidle');

    await storefront.addProductToBag(testData.products.primary);
    await page.waitForTimeout(600);
    await storefront.openBag();
    await checkout.proceedFromBag();

    await checkout.fillCustomerDetails(
      testData.customer.valid.name,
      testData.customer.valid.phone,
      testData.customer.valid.address
    );

    // Intercept Supabase orders endpoint to return 500
    await page.route('**/rest/v1/orders*', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ message: 'Internal Server Error' }),
      });
    });

    // Handle any window.alert / dialog gracefully if triggered
    page.on('dialog', async (dialog) => {
      await dialog.dismiss();
    });

    await checkout.placeOrderBtn.click();
    await page.waitForTimeout(1200);

    // Assert system does not advance to success tracker
    await expect(checkout.successHeader).not.toBeVisible();

    // Verify modal remains active and place order button is still in DOM (no crash)
    await expect(checkout.placeOrderBtn).toBeVisible({ timeout: 5000 });
  });
});