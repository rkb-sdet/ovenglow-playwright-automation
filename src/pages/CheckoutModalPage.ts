import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CheckoutModalPage extends BasePage {
  readonly proceedCheckoutBtn: Locator;
  readonly checkoutModal: Locator;
  readonly instantSlotBtn: Locator;
  readonly scheduledSlotBtn: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly placeOrderBtn: Locator;
  readonly successHeader: Locator;
  readonly orderIdBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.proceedCheckoutBtn = page.getByRole('button', { name: /Proceed to Checkout/i });
    this.checkoutModal = page.locator('text=/Express.*Checkout/i');
    this.instantSlotBtn = page.getByRole('button', { name: /Instant 30 Min/i });
    this.scheduledSlotBtn = page.getByRole('button', { name: /Morning 8 AM/i });
    this.nameInput = page.locator('input[placeholder*="Name"], input[name="name"]');
    this.phoneInput = page.locator('input[placeholder*="Phone"], input[type="tel"]');
    this.addressInput = page.locator('textarea[placeholder*="Address"], textarea[name="address"]');
    this.placeOrderBtn = page.getByRole('button', { name: /Place Order/i });
    
    // Exact single target element for success
    this.successHeader = page.getByRole('heading', { name: /Baking in Progress/i });
    this.orderIdBadge = page.locator('span.font-mono').filter({ hasText: /OG-/i });
  }

  async proceedFromBag() {
    await expect(this.proceedCheckoutBtn).toBeVisible({ timeout: 10000 });
    await this.proceedCheckoutBtn.click();
    await this.page.waitForTimeout(500);
  }

  async fillCustomerDetails(name: string, phone: string, address: string, slot: 'instant' | 'scheduled' = 'instant') {
    if (slot === 'instant' && await this.instantSlotBtn.isVisible()) {
      await this.instantSlotBtn.click();
    }
    await this.nameInput.first().fill(name);
    await this.phoneInput.first().fill(phone);
    await this.addressInput.first().fill(address);
  }

  async submitOrder(): Promise<string> {
    await this.placeOrderBtn.click();

    // 1. Wait specifically for success confirmation header
    await expect(this.successHeader).toBeVisible({ timeout: 20000 });

    // 2. Fetch the generated Order ID
    const badge = this.orderIdBadge.first();
    await expect(badge).toBeVisible({ timeout: 5000 });
    const badgeText = await badge.textContent();

    return badgeText ? badgeText.trim() : 'OG-CONFIRMED';
  }
}