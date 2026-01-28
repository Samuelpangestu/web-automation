import { test as base, Page } from '@playwright/test';
import { config } from '../config/config';

/**
 * Before Each Test Hook
 * - Configures page with timeouts from config
 */
export const setupTest = async (page: Page): Promise<void> => {
  // Set timeouts from config
  page.setDefaultTimeout(config.timeouts.default);
  page.setDefaultNavigationTimeout(config.timeouts.navigation);
};

/**
 * After Each Test Hook
 * - Takes screenshot on failure (handled by Playwright config)
 * - Cleanup handled automatically by Playwright
 */
export const teardownTest = async (page: Page, testInfo: any): Promise<void> => {
  // Screenshot on failure is handled by playwright.config.ts
  // Additional cleanup can be added here if needed

  if (testInfo.status === 'failed') {
    // Custom failure handling can be added here
    console.log(`Test failed: ${testInfo.title}`);
  }
};

/**
 * Extended test with automatic hooks
 */
export const test = base.extend({
  page: async ({ page }, use, testInfo) => {
    // Before each test
    await setupTest(page);

    // Run the test
    await use(page);

    // After each test
    await teardownTest(page, testInfo);
  },
});

export { expect } from '@playwright/test';
