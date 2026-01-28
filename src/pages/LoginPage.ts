import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { locators } from '../config/locators';

export class LoginPage extends BasePage {
  // Locators from centralized config
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly loginLogo: Locator;

  constructor(page: Page) {
    super(page);
    // Use centralized locators
    this.usernameInput = this.locator(locators.login.usernameInput);
    this.passwordInput = this.locator(locators.login.passwordInput);
    this.loginButton = this.locator(locators.login.loginButton);
    this.errorMessage = this.locator(locators.login.errorMessage);
    this.loginLogo = this.locator(locators.login.loginLogo);
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    await this.navigateToPath('/');
    await this.waitForElement(locators.login.loginLogo);
  }

  /**
   * Perform login
   */
  async login(username: string, password: string): Promise<void> {
    await this.fill(locators.login.usernameInput, username);
    await this.fill(locators.login.passwordInput, password);
    await this.clickAndWait(locators.login.loginButton);
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    return await this.getText(locators.login.errorMessage);
  }

  /**
   * Check if login page is displayed
   */
  async isDisplayed(): Promise<boolean> {
    return await this.isVisible(locators.login.loginLogo);
  }

  /**
   * Clear username field
   */
  async clearUsername(): Promise<void> {
    await this.clear(locators.login.usernameInput);
  }

  /**
   * Clear password field
   */
  async clearPassword(): Promise<void> {
    await this.clear(locators.login.passwordInput);
  }
}
