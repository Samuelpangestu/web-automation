export const config = {
  // Base URL
  baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',

  // Timeouts (in milliseconds)
  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000'),
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
    action: parseInt(process.env.ACTION_TIMEOUT || '15000'),
    animation: parseInt(process.env.ANIMATION_TIMEOUT || '1000'),
    short: parseInt(process.env.SHORT_TIMEOUT || '500'),
  },

  // Browser settings
  browser: {
    headless: process.env.HEADLESS === 'true',
    slowMo: parseInt(process.env.SLOW_MO || '0'),
  },

  // Test credentials
  users: {
    standard: {
      username: process.env.STANDARD_USER || 'standard_user',
      password: process.env.STANDARD_PASSWORD || 'secret_sauce',
    },
    locked: {
      username: process.env.LOCKED_USER || 'locked_out_user',
      password: process.env.LOCKED_PASSWORD || 'secret_sauce',
    },
    problem: {
      username: process.env.PROBLEM_USER || 'problem_user',
      password: process.env.PROBLEM_PASSWORD || 'secret_sauce',
    },
  },

  // Test settings
  test: {
    retries: parseInt(process.env.TEST_RETRIES || '2'),
    workers: parseInt(process.env.TEST_WORKERS || '1'),
    screenshot: process.env.SCREENSHOT || 'only-on-failure',
    video: process.env.VIDEO || 'retain-on-failure',
    trace: process.env.TRACE || 'on-first-retry',
  },
};
