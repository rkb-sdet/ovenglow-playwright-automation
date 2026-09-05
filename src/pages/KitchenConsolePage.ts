import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class KitchenConsolePage extends BasePage {
  readonly openConsoleBtn: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginBtn: Locator;
  readonly consoleHeader: Locator;
  readonly orderCards: Locator;
  readonly signOutBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.openConsoleBtn = page.locator('button:has-text("Staff Kitchen Console")');
    this.emailInput = page.locator('input[type="email"]');
    this.passwordInput = page.locator('input[type="password"]');
    this.loginBtn = page.locator('button:has-text("Access Kitchen Console")');
    this.consoleHeader = page.locator('h1:has-text("Live Kitchen Dispatch")');
    this.orderCards = page.locator('.max-w-7xl .bg-white.rounded-3xl');
    this.signOutBtn = page.locator('button:has-text("Sign Out")');
  }

  async openLoginModal() {
    await this.openConsoleBtn.click();
  }

  async login(email: string, pass: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.loginBtn.click();
  }

  async verifyConsoleActive() {
    await expect(this.consoleHeader).toBeVisible({ timeout: 10000 });
  }

  async updateOrderStatus(customerName: string, targetStatus: 'Bake' | 'Dispatch' | 'Done') {
    const card = this.orderCards.filter({ hasText: customerName }).first();
    await card.locator(`button:has-text("${targetStatus}")`).click();
  }
}