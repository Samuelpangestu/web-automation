import { Page } from '@playwright/test';
import { config } from '../config/config';

export class WaitHelper {
  private static readonly ANIMATION_WAIT = config.timeouts.animation;
  private static readonly SHORT_WAIT = config.timeouts.short;
  private static readonly NAVIGATION_WAIT = config.timeouts.navigation;

  /**
   * Wait for animation to complete
   */
  static async waitForAnimation(page: Page): Promise<void> {
    await page.waitForTimeout(this.ANIMATION_WAIT);
  }

  /**
   * Wait for navigation/page transition
   */
  static async waitForNavigation(page: Page): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout: this.NAVIGATION_WAIT });
  }

  /**
   * Short wait for quick operations
   */
  static async waitShort(page: Page): Promise<void> {
    await page.waitForTimeout(this.SHORT_WAIT);
  }

  /**
   * Wait for element to be visible (uses config timeout)
   */
  static async waitForElement(page: Page, selector: string): Promise<void> {
    await page.locator(selector).waitFor({
      state: 'visible',
      timeout: config.timeouts.action
    });
  }

  /**
   * Wait for element to be clickable
   */
  static async waitForClickable(page: Page, selector: string): Promise<void> {
    await page.locator(selector).waitFor({
      state: 'visible',
      timeout: config.timeouts.action
    });
  }
}
