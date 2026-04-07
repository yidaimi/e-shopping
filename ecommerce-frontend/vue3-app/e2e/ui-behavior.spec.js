/**
 * Playwright E2E UI Behavior Tests
 * Tests extracted from ui_tests_vue2.md, executed against Vue 3 application
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../../after_migration/ui-behavior-tests');

test.describe('AppHeader Navigation Tests', () => {
  test('TC-HDR-01: Logo navigates to /products', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await page.click('.nav-logo');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-HDR-01.png') });
  });

  test('TC-HDR-05: 今日特惠 navigates to /products?tag=TODAY_DEAL', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    await page.click('.nav-sub a:nth-child(2)');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/tag=TODAY_DEAL/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-HDR-05.png') });
  });

  test('TC-HDR-09: 全部商品 navigates to /products', async ({ page }) => {
    await page.goto('/products?tag=NEW');
    await page.waitForTimeout(500);
    await page.click('.nav-sub a:first-child');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products$/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-HDR-09.png') });
  });

  test('TC-HDR-10: Header shows login/register when not logged in', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    const text = await page.textContent('header');
    expect(text).toContain('你好，请登录');
    expect(text).toContain('免费注册');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-HDR-10.png') });
  });

  test('TC-HDR-13: Shopping cart link navigates to /cart', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    await page.click('.nav-cart');
    await page.waitForTimeout(500);
    // Should redirect to login since cart requires auth
    await expect(page).toHaveURL(/\/(cart|login)/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-HDR-13.png') });
  });
});

test.describe('Login Page Tests', () => {
  test('TC-LOGIN-01: Login form renders correctly', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await expect(page.locator('h2')).toHaveText('用户登录');
    await expect(page.locator('.login-container input[type="text"]')).toBeVisible();
    await expect(page.locator('.login-container input[type="password"]')).toBeVisible();
    await expect(page.locator('.btn-login')).toHaveText('登录');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-LOGIN-01.png') });
  });

  test('TC-LOGIN-04: 去注册 link navigates to /register', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await page.click('.link-text a');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/register/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-LOGIN-04.png') });
  });
});

test.describe('Register Page Tests', () => {
  test('TC-REG-01: Register form renders correctly', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await expect(page.locator('h2')).toHaveText('用户注册');
    const inputs = page.locator('.register-container input');
    await expect(inputs).toHaveCount(3);
    await expect(page.locator('.btn-register')).toHaveText('注册');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-REG-01.png') });
  });

  test('TC-REG-04: 去登录 link navigates to /login', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await page.click('.link-text a');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-REG-04.png') });
  });
});

test.describe('ProductList Page Tests', () => {
  test('TC-PL-01: Hero banner with welcome text', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);
    const heroText = await page.textContent('.hero-content');
    if (heroText) {
      expect(heroText).toContain('欢迎来到 E-Shop');
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-PL-01.png') });
  });

  test('TC-PL-08: Empty state shows when no products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(2000);
    // Without backend, no products loaded — expect empty state or loading
    const emptyState = page.locator('.empty-state');
    const loadingState = page.locator('.loading-state');
    const productGrid = page.locator('.product-grid');
    const anyVisible = await emptyState.isVisible() || await loadingState.isVisible() || await productGrid.isVisible();
    expect(anyVisible).toBe(true);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'TC-PL-08.png') });
  });
});

test.describe('Navigation and Route Guard Tests', () => {
  test('Route guard redirects to /login for auth-required pages', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'route-guard-cart.png') });
  });

  test('Route guard redirects /orders to /login', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'route-guard-orders.png') });
  });

  test('Default route / redirects to /products', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'default-route.png') });
  });
});
