import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class StorefrontPage extends BasePage {
  readonly searchInput: Locator;
  readonly clearSearchBtn: Locator;
  readonly egglessToggle: Locator;
  readonly bagButton: Locator;
  readonly bagBadge: Locator;
  readonly productCards: Locator;
  readonly emptyStateMsg: Locator;

  constructor(page: Page) {
    super(page);

    // Navbar Search Input
    this.searchInput = page.locator('input[placeholder*="Search sourdough"]');
    this.clearSearchBtn = page.locator('button[aria-label="Clear search"]');

    // 100% Eggless Toggle Container
    this.egglessToggle = page.locator('label:has-text("100% Eggless Only")');

    // Shopping Bag Trigger (Scoped strictly to Header/Nav to avoid 'Add to Bag' buttons)
    this.bagButton = page.locator('header, nav').getByRole('button', { name: /^bag/i });
    this.bagBadge = this.bagButton.locator('span');

    // Product Cards Grid in Menu Section
    this.productCards = page.locator('section#menu').locator('div.group');

    // Zero-State Message for Invalid Search
    this.emptyStateMsg = page.locator('text=No bakes matched your search');
  }

  async searchProduct(term: string) {
    await expect(this.searchInput).toBeVisible({ timeout: 10000 });
    await this.searchInput.fill(term);
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    if (await this.clearSearchBtn.isVisible()) {
      await this.clearSearchBtn.click();
    } else {
      await this.searchInput.clear();
    }
  }

  async toggleEgglessFilter() {
    await expect(this.egglessToggle).toBeVisible({ timeout: 10000 });
    await this.egglessToggle.click();
    await this.page.waitForTimeout(600);
  }

  async addProductToBag(productName: string) {
    const productCard = this.productCards.filter({ hasText: productName }).first();
    await expect(productCard).toBeVisible({ timeout: 15000 });
    
    const addToBagBtn = productCard.getByRole('button', { name: /Add to Bag|Added!/i });
    await addToBagBtn.click();
  }

  async openBag() {
    await expect(this.bagButton).toBeVisible({ timeout: 10000 });
    await this.bagButton.click();
    await this.page.waitForTimeout(500); // Wait for cart drawer slide-over
  }
}