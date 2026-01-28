import { test, expect } from '../src/utils/hooks';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { config } from '../src/config/config';

test.describe('SauceDemo Dashboard Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);

    // Login before each test
    await loginPage.goto();
    await loginPage.login(config.users.standard.username, config.users.standard.password);
    await expect(inventoryPage.pageTitle).toBeVisible();
  });

  test('@smoke @dashboard TC_07 - Verify all products are displayed', async ({ page }) => {
    // Assert
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBe(6);

    // Verify all products have names and prices
    const productNames = await inventoryPage.getProductNames();
    expect(productNames).toHaveLength(6);
    productNames.forEach(name => {
      expect(name).toBeTruthy();
    });

    const productPrices = await inventoryPage.getProductPrices();
    expect(productPrices).toHaveLength(6);
    productPrices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  });

  test('@dashboard TC_08 - Add product to cart', async ({ page }) => {
    // Act - Add first product to cart
    await inventoryPage.addProductToCart(0);

    // Assert
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Verify badge is visible
    await expect(inventoryPage.shoppingCartBadge).toBeVisible();
  });

  test('@dashboard TC_09 - Add multiple products to cart', async ({ page }) => {
    // Act - Add 3 products to cart
    await inventoryPage.addProductToCart(0);
    await inventoryPage.addProductToCart(1);
    await inventoryPage.addProductToCart(2);

    // Assert
    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(3);
  });

  test('@dashboard TC_10 - Remove product from cart', async ({ page }) => {
    // Arrange - Add product to cart
    await inventoryPage.addProductToCart(0);
    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);

    // Act - Remove product from cart
    await inventoryPage.removeProductFromCart(0);

    // Assert
    cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(0);

    // Badge should not be visible
    await expect(inventoryPage.shoppingCartBadge).not.toBeVisible();
  });

  test('@dashboard TC_11 - Sort products by name (A to Z)', async ({ page }) => {
    // Act
    await inventoryPage.sortProducts('az');

    // Assert
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort();
    expect(productNames).toEqual(sortedNames);
  });

  test('@dashboard TC_12 - Sort products by name (Z to A)', async ({ page }) => {
    // Act
    await inventoryPage.sortProducts('za');

    // Assert
    const productNames = await inventoryPage.getProductNames();
    const sortedNames = [...productNames].sort().reverse();
    expect(productNames).toEqual(sortedNames);
  });

  test('@dashboard TC_13 - Sort products by price (low to high)', async ({ page }) => {
    // Act
    await inventoryPage.sortProducts('lohi');

    // Assert
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => a - b);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('@dashboard TC_14 - Sort products by price (high to low)', async ({ page }) => {
    // Act
    await inventoryPage.sortProducts('hilo');

    // Assert
    const productPrices = await inventoryPage.getProductPrices();
    const sortedPrices = [...productPrices].sort((a, b) => b - a);
    expect(productPrices).toEqual(sortedPrices);
  });

  test('@dashboard TC_15 - Navigate to shopping cart', async ({ page }) => {
    // Act
    await inventoryPage.goToCart();

    // Assert
    await expect(page).toHaveURL(/.*cart.html/);
  });

  test('@dashboard TC_16 - Logout functionality', async ({ page }) => {
    // Act
    await inventoryPage.logout();

    // Assert
    await expect(page).toHaveURL(/.*\//);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('@dashboard TC_17 - Add product by name', async ({ page }) => {
    // Act
    await inventoryPage.addProductToCartByName('sauce-labs-backpack');

    // Assert
    const isInCart = await inventoryPage.isProductInCart('sauce-labs-backpack');
    expect(isInCart).toBeTruthy();

    const cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBe(1);
  });
});
