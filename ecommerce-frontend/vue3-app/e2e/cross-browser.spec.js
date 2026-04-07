/**
 * Cross-Browser Playwright Tests
 * Tests the Vue 3 application across chromium and firefox browsers.
 * Screenshots saved to after_migration/cross-browser/
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../../after_migration/cross-browser');

const pages = [
  { name: 'products', url: '/products', waitMs: 1000 },
  { name: 'login', url: '/login', waitMs: 500 },
  { name: 'register', url: '/register', waitMs: 500 },
];

for (const pg of pages) {
  test(`Cross-browser: ${pg.name} page renders correctly`, async ({ page, browserName }) => {
    await page.goto(pg.url);
    await page.waitForTimeout(pg.waitMs);

    // Verify the page loaded by checking the header is present
    await expect(page.locator('header')).toBeVisible();

    // Page-specific assertions
    if (pg.name === 'products') {
      // Header logo should be visible
      await expect(page.locator('.nav-logo')).toBeVisible();
      // Sub-nav should be present
      await expect(page.locator('.nav-sub')).toBeVisible();
    } else if (pg.name === 'login') {
      await expect(page.locator('h2')).toHaveText('用户登录');
      await expect(page.locator('.btn-login')).toBeVisible();
    } else if (pg.name === 'register') {
      await expect(page.locator('h2')).toHaveText('用户注册');
      await expect(page.locator('.btn-register')).toBeVisible();
    }

    // Save screenshot per browser per page
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${browserName}-${pg.name}.png`),
    });
  });
}

test('Cross-browser: Navigation from login to register', async ({ page, browserName }) => {
  await page.goto('/login');
  await page.waitForTimeout(500);
  await page.click('.link-text a');
  await page.waitForTimeout(500);
  await expect(page).toHaveURL(/\/register/);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${browserName}-nav-login-to-register.png`),
  });
});

test('Cross-browser: Route guard redirects unauthenticated users', async ({ page, browserName }) => {
  await page.goto('/cart');
  await page.waitForTimeout(500);
  await expect(page).toHaveURL(/\/login/);
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${browserName}-route-guard.png`),
  });
});
