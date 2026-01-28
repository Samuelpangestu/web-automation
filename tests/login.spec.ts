import { test, expect } from '../src/utils/hooks';
import { LoginPage } from '../src/pages/LoginPage';
import { InventoryPage } from '../src/pages/InventoryPage';
import { config } from '../src/config/config';

test.describe('SauceDemo Login Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('@smoke @login TC_01 - Successful login with standard user', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act
    await loginPage.login(config.users.standard.username, config.users.standard.password);

    // Assert
    await expect(page).toHaveURL(/.*inventory.html/);
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('@smoke @login TC_02 - Verify dashboard elements after login', async ({ page }) => {
    // Arrange
    const inventoryPage = new InventoryPage(page);

    // Act
    await loginPage.login(config.users.standard.username, config.users.standard.password);

    // Assert - Verify main dashboard elements
    await expect(inventoryPage.pageTitle).toBeVisible();
    await expect(inventoryPage.shoppingCartLink).toBeVisible();
    await expect(inventoryPage.menuButton).toBeVisible();
    await expect(inventoryPage.productSortDropdown).toBeVisible();

    // Verify products are displayed
    const productCount = await inventoryPage.getProductCount();
    expect(productCount).toBeGreaterThan(0);
    expect(productCount).toBe(6); // SauceDemo has 6 products
  });

  test('@negative @login TC_03 - Login with invalid username', async ({ page }) => {
    // Act
    await loginPage.login('invalid_user', config.users.standard.password);

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  test('@negative @login TC_04 - Login with invalid password', async ({ page }) => {
    // Act
    await loginPage.login(config.users.standard.username, 'wrong_password');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  test('@negative @login TC_05 - Login with empty credentials', async ({ page }) => {
    // Act
    await loginPage.login('', '');

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username is required');
  });

  test('@negative @login TC_06 - Login with locked out user', async ({ page }) => {
    // Act
    await loginPage.login(config.users.locked.username, config.users.locked.password);

    // Assert
    await expect(loginPage.errorMessage).toBeVisible();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Sorry, this user has been locked out');
  });
});
