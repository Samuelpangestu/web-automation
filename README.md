# Web Automation - SauceDemo

Web automation testing using Playwright + TypeScript with centralized configuration and Page Object Model architecture.

---

## Quick Start

```bash
cd web-automation

# Run all tests (Allure report auto-opens)
./run_test.sh chromium

# Run specific tags
./run_test.sh chromium @smoke
./run_test.sh chromium @login
./run_test.sh firefox @dashboard
```

**Note:** Script automatically opens Allure report in browser after test completion. Press `Ctrl+C` to stop the report server.

---

## Tech Stack

- **Framework:** Playwright 1.40.0 + TypeScript
- **Build Tool:** npm
- **Design Pattern:** Page Object Model + BasePage
- **Reporting:** Allure 2.25.0 + Playwright HTML
- **Architecture:** Centralized config, locators, and wait helpers

---

## Features

- Centralized configuration (all settings in `config.ts`)
- Centralized locators (all selectors in `locators.ts`)
- DRY architecture with BasePage (eliminates code duplication)
- Separate hooks file for setup/teardown
- WaitHelper utility (no hardcoded waits)
- TypeScript for type safety
- Professional Allure test reports
- 17 test scenarios covering login and dashboard flows

---

## Prerequisites

```bash
# Required
Node.js 18+
npm 9+
```

---

## Installation

```bash
# 1. Navigate to project
cd web-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

---

## Project Structure

```
web-automation/
├── src/
│   ├── config/
│   │   ├── config.ts              # All settings (URLs, timeouts, credentials)
│   │   └── locators.ts            # All element selectors
│   ├── pages/
│   │   ├── BasePage.ts            # Common methods (DRY)
│   │   ├── LoginPage.ts           # Login page object
│   │   └── InventoryPage.ts       # Dashboard/inventory page object
│   └── utils/
│       ├── WaitHelper.ts          # Standardized waits
│       └── hooks.ts               # Separate hooks file
├── tests/
│   ├── login.spec.ts              # 6 login test scenarios
│   └── dashboard.spec.ts          # 11 dashboard test scenarios
├── playwright.config.ts
└── run_test.sh                    # Dynamic test runner
```

---

## Running Tests

### Using Script (Recommended)

```bash
# Run all tests
./run_test.sh chromium

# Run by browser
./run_test.sh firefox
./run_test.sh webkit

# Run by tags
./run_test.sh chromium @smoke      # Smoke tests
./run_test.sh chromium @login      # Login tests
./run_test.sh chromium @dashboard  # Dashboard tests
./run_test.sh chromium @negative   # Negative tests
```

### Manual Execution

```bash
# Run all tests
npx playwright test

# Run specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run by tags
npx playwright test --grep "@smoke"
npx playwright test --grep "@login"

# View Allure report
npx allure serve allure-results

# View Playwright HTML report
npx playwright show-report
```

---

## Configuration

### Settings (`src/config/config.ts`)

```typescript
export const config = {
  baseURL: 'https://www.saucedemo.com',
  timeouts: {
    default: 30000,
    navigation: 30000,
    action: 15000,
    animation: 1000,
    short: 500,
  },
  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    locked: { username: 'locked_out_user', password: 'secret_sauce' },
  },
};
```

**To modify:** Edit `config.ts` - no code changes needed!

### Locators (`src/config/locators.ts`)

```typescript
export const locators = {
  login: {
    usernameInput: '#user-name',
    passwordInput: '#password',
    loginButton: '#login-button',
  },
  inventory: {
    pageTitle: '.title',
    addToCartButtons: '[data-test*="add-to-cart"]',
  },
};
```

**To modify:** Edit `locators.ts` - no code changes needed!

---

## Test Coverage

**Total: 17 Test Scenarios**

| Category | Test Count | Status |
|----------|-----------|--------|
| Login | 6 | Verified |
| Dashboard | 11 | Verified |

**Login Tests:**
- Successful login flow
- Dashboard elements visible after login
- Invalid username error
- Invalid password error
- Empty credentials error
- Locked user error

**Dashboard Tests:**
- Product display verification
- Add product to cart
- Remove product from cart
- Sort products (A-Z, Z-A, Price low-high, Price high-low)
- Navigate to cart
- Logout functionality
- Add product by name

---

## Architecture Highlights

### Centralized Design
- **config.ts** - All settings (timeouts, URLs, credentials)
- **locators.ts** - All element selectors
- **BasePage.ts** - Common methods (DRY principle)
- **WaitHelper.ts** - Standardized waits (no hardcoded values)
- **hooks.ts** - Separate hooks file (setup/teardown)

### Page Objects
All page objects extend `BasePage` for DRY:
- `LoginPage.ts` - 72 lines (uses BasePage methods)
- `InventoryPage.ts` - 147 lines (uses BasePage methods)

---

## Adding New Tests

**1. Add locator to config:**
```typescript
// src/config/locators.ts
export const locators = {
  newElement: '.new-selector',
};
```

**2. Add page method:**
```typescript
// src/pages/NewPage.ts
export class NewPage extends BasePage {
  async doSomething() {
    await this.click(locators.newElement);  // Reuse BasePage!
  }
}
```

**3. Add test:**
```typescript
// tests/new.spec.ts
import { test, expect } from '../src/utils/hooks';

test('@new TC_18 - New test', async ({ page }) => {
  // Test implementation
});
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Locator not found | Update selector in `src/config/locators.ts` |
| Timeout exception | Adjust timeouts in `src/config/config.ts` |
| Browser not installed | Run `npx playwright install` |
| Test data needs change | Edit users section in `src/config/config.ts` |
| Port already in use | Kill process using port 9323 |

---

## CI/CD Integration

This project can be integrated with:
- Jenkins pipelines
- GitHub Actions workflows
- GitLab CI/CD

See main repository documentation for CI/CD setup examples.

---

## Documentation

For complete architecture and design decisions, see root documentation folder.

---

## Created by

Samuel
