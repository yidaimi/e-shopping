// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'on',
    viewport: { width: 1280, height: 720 },
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
      testMatch: /\/(ui-behavior|flow-steps|business-rules|accessibility)\.spec\.js$/,
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
      testMatch: /\/cross-browser\.spec\.js$/,
    },
    {
      name: 'chromium-cross-browser',
      use: { browserName: 'chromium' },
      testMatch: /\/cross-browser\.spec\.js$/,
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 30000,
  },
});
