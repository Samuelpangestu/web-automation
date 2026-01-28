import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { locators } from '../config/locators';

export class InventoryPage extends BasePage {
  // Locators from centralized config
  readonly pageTitle: Locator;
  readonly inventoryItems: Locator;
  readonly shoppingCartBadge: Locator;
  readonly shoppingCartLink: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly productSortDropdown: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    // Use centralized locators
    this.pageTitle = this.locator(locators.inventory.pageTitle);
    this.inventoryItems = this.locator(locators.inventory.inventoryItems);
    this.shoppingCartBadge = this.locator(locators.inventory.shoppingCartBadge);
    this.shoppingCartLink = this.locator(locators.inventory.shoppingCartLink);
    this.menuButton = this.locator(locators.inventory.menuButton);
    this.logoutLink = this.locator(locators.inventory.logoutLink);
    this.productSortDropdown = this.locator(locators.inventory.productSortDropdown);
    this.addToCartButtons = this.locator(locators.inventory.addToCartButtons);
  }

  /**
   * Check if inventory page is displayed
   */
  async isDisplayed(): Promise<boolean> {
    return await this.isVisible(locators.inventory.pageTitle);
  }

  /**
   * Get page title text
   */
  async getPageTitle(): Promise<string> {
    return await this.getText(locators.inventory.pageTitle);
  }

  /**
   * Get number of products displayed
   */
  async getProductCount(): Promise<number> {
    await this.waitForElement(locators.inventory.inventoryItems);
    return await this.getCount(locators.inventory.inventoryItems);
  }

  /**
   * Get shopping cart item count
   */
  async getCartItemCount(): Promise<number> {
    const isVisible = await this.isVisible(locators.inventory.shoppingCartBadge);
    if (!isVisible) return 0;
    const text = await this.getText(locators.inventory.shoppingCartBadge);
    return parseInt(text || '0');
  }

  /**
   * Add product to cart by index
   */
  async addProductToCart(index: number): Promise<void> {
    const button = this.addToCartButtons.nth(index);
    await button.waitFor({ state: 'visible' });
    await button.click();
  }

  /**
   * Add product to cart by name
   */
  async addProductToCartByName(productName: string): Promise<void> {
    const selector = `[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
    await this.click(selector);
  }

  /**
   * Remove product from cart by index
   */
  async removeProductFromCart(index: number): Promise<void> {
    const button = this.locator(locators.inventory.removeButtons).nth(index);
    await button.click();
  }

  /**
   * Sort products
   */
  async sortProducts(sortOption: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.selectOption(locators.inventory.productSortDropdown, sortOption);
  }

  /**
   * Get product names
   */
  async getProductNames(): Promise<string[]> {
    await this.waitForElement(locators.inventory.inventoryItemName);
    return await this.getAllTexts(locators.inventory.inventoryItemName);
  }

  /**
   * Get product prices
   */
  async getProductPrices(): Promise<number[]> {
    await this.waitForElement(locators.inventory.inventoryItemPrice);
    const priceTexts = await this.getAllTexts(locators.inventory.inventoryItemPrice);
    return priceTexts.map(price => parseFloat(price.replace('$', '')));
  }

  /**
   * Click on product name to view details
   */
  async clickProductByName(productName: string): Promise<void> {
    const productLocator = this.page.locator(locators.inventory.inventoryItemName, { hasText: productName });
    await productLocator.click();
  }

  /**
   * Go to shopping cart
   */
  async goToCart(): Promise<void> {
    await this.click(locators.inventory.shoppingCartLink);
  }

  /**
   * Logout from application
   */
  async logout(): Promise<void> {
    await this.click(locators.inventory.menuButton);
    await this.waitForElement(locators.inventory.logoutLink);
    await this.click(locators.inventory.logoutLink);
  }

  /**
   * Check if product is in cart
   */
  async isProductInCart(productName: string): Promise<boolean> {
    const selector = `[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`;
    return await this.isVisible(selector);
  }
}
