import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartDrawerPage extends BasePage {
  readonly deliveryFeeText: Locator;
  readonly emptyCartMsg: Locator;

  constructor(page: Page) {
    super(page);
    this.deliveryFeeText = page.locator('text=/Delivery Fee|Delivery/i').locator('..').locator('span').last();
    this.emptyCartMsg = page.locator('text=/Your bag is empty|Bag is empty|Explore Menu|No items/i').first();
  }

  // Find the decrement (-) button inside whatever cart/drawer container is currently visible
  async decrementFirstItem() {
    // Minus button ko locate karein (svg, aria-label, ya minus character)
    const decBtn = this.page.locator('button').filter({
      has: this.page.locator('svg.lucide-minus, svg.lucide-trash, svg.lucide-trash-2')
    }).or(this.page.locator('button[aria-label*="decrease" i], button[aria-label*="decrement" i], button:has-text("−"), button:has-text("-")')).first();

    await expect(decBtn).toBeVisible({ timeout: 10000 });
    await decBtn.click({ force: true });
    await this.page.waitForTimeout(600);
  }
}