import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "tests",
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Max time a test runs for */
  timeout: 60000,
  expect: {
    /* Max time expect it should wait for */
    timeout: 10000,
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: "always" }],
    ['list'],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    launchOptions: {
      slowMo: 650,
    },
    baseURL: 'https://app.pws.int.cruk.org/',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'off',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off',
  },

  /* Configure projects for major browsers */
  projects: [
     {
       name: 'chromium',
       use: { ...devices['Desktop Chrome'] },
     },

   // {
     // name: 'firefox',
     // use: { ...devices['Desktop Firefox'] },
   // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    // /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { 
    //     ...devices['Desktop Edge'], 
    //     channel: 'msedge' 
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { 
    //     ...devices['Desktop Chrome'], 
    //     channel: 'chrome' 
    //   },
    // },
  ],

});
