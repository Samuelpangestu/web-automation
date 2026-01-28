import { Page, Locator } from '@playwright/test';
import { config } from '../config/config';
import { WaitHelper } from '../utils/WaitHelper';

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // ===== NAVIGATION =====

  /**
   * Navigate to URL and wait for page load
   */
  protected async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    await WaitHelper.waitForNavigation(this.page);
  }

  /**
   * Navigate to relative path
   */
  protected async navigateToPath(path: string): Promise<void> {
    await this.page.goto(`${config.baseURL}${path}`);
    await WaitHelper.waitForNavigation(this.page);
  }

  // ===== LOCATOR HELPERS =====

  /**
   * Get locator by selector
   */
  protected locator(selector: string): Locator {
    return this.page.locator(selector);
  }

  /**
   * Get locator and wait for visibility
   */
  protected async getElement(selector: string): Promise<Locator> {
    await WaitHelper.waitForElement(this.page, selector);
    return this.locator(selector);
  }

  // ===== ACTIONS =====

  /**
   * Click element
   */
  protected async click(selector: string): Promise<void> {
    await WaitHelper.waitForClickable(this.page, selector);
    await this.locator(selector).click();
  }

  /**
   * Click and wait for navigation
   */
  protected async clickAndWait(selector: string): Promise<void> {
    await this.click(selector);
    await WaitHelper.waitForNavigation(this.page);
  }

  /**
   * Fill input field
   */
  protected async fill(selector: string, text: string): Promise<void> {
    await WaitHelper.waitForElement(this.page, selector);
    await this.locator(selector).fill(text);
  }

  /**
   * Clear input field
   */
  protected async clear(selector: string): Promise<void> {
    await this.locator(selector).clear();
  }

  /**
   * Select option from dropdown
   */
  protected async selectOption(selector: string, value: string): Promise<void> {
    await WaitHelper.waitForElement(this.page, selector);
    await this.locator(selector).selectOption(value);
    await WaitHelper.waitShort(this.page);
  }

  // ===== CHECKS =====

  /**
   * Check if element is visible
   */
  protected async isVisible(selector: string): Promise<boolean> {
    try {
      return await this.locator(selector).isVisible();
    } catch {
      return false;
    }
  }

  /**
   * Check if element is enabled
   */
  protected async isEnabled(selector: string): Promise<boolean> {
    return await this.locator(selector).isEnabled();
  }

  /**
   * Get text content
   */
  protected async getText(selector: string): Promise<string> {
    return await this.locator(selector).textContent() || '';
  }

  /**
   * Get all text contents
   */
  protected async getAllTexts(selector: string): Promise<string[]> {
    return await this.locator(selector).allTextContents();
  }

  /**
   * Get element count
   */
  protected async getCount(selector: string): Promise<number> {
    return await this.locator(selector).count();
  }

  // ===== WAIT METHODS =====

  /**
   * Wait for animation
   */
  protected async waitForAnimation(): Promise<void> {
    await WaitHelper.waitForAnimation(this.page);
  }

  /**
   * Wait for navigation
   */
  protected async waitForNavigation(): Promise<void> {
    await WaitHelper.waitForNavigation(this.page);
  }

  /**
   * Short wait
   */
  protected async waitShort(): Promise<void> {
    await WaitHelper.waitShort(this.page);
  }

  /**
   * Wait for element
   */
  protected async waitForElement(selector: string): Promise<void> {
    await WaitHelper.waitForElement(this.page, selector);
  }
}
