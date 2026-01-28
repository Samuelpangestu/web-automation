export const locators = {
  // Login Page
  login: {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
    errorMessage: '[data-test="error"]',
    loginLogo: '.login_logo',
  },

  // Inventory/Dashboard Page
  inventory: {
    pageTitle: '.title',
    inventoryItems: '.inventory_item',
    inventoryItemName: '.inventory_item_name',
    inventoryItemPrice: '.inventory_item_price',
    shoppingCartBadge: '.shopping_cart_badge',
    shoppingCartLink: '.shopping_cart_link',
    menuButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    productSortDropdown: '.product_sort_container, [data-test="product_sort_container"], select.product_sort_container',
    addToCartButtons: '[data-test*="add-to-cart"]',
    removeButtons: '[data-test*="remove"]',
  },

  // Cart Page
  cart: {
    pageTitle: '.title',
    cartItems: '.cart_item',
    checkoutButton: '#checkout',
    continueShoppingButton: '#continue-shopping',
    removeButtons: '[data-test*="remove"]',
  },

  // Checkout Page
  checkout: {
    firstName: '#first-name',
    lastName: '#last-name',
    postalCode: '#postal-code',
    continueButton: '#continue',
    cancelButton: '#cancel',
    finishButton: '#finish',
    completeHeader: '.complete-header',
  },
};
