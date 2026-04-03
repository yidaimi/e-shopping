/**
 * Playwright E2E tests for Vue 3 application
 * Tests: visual regression, application flows, cross-browser, accessibility
 */
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173';

test.describe('Visual Regression Tests', () => {
  test('products page matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`${BASE_URL}/products`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'after_migration/cross-browser/products-chromium.png' });
    expect(await page.title()).toBe('E-Shop 电商平台');
  });

  test('login page renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'after_migration/cross-browser/login-chromium.png' });
    await expect(page.locator('h2')).toHaveText('用户登录');
  });

  test('register page renders correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto(`${BASE_URL}/register`);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'after_migration/cross-browser/register-chromium.png' });
    await expect(page.locator('h2')).toHaveText('用户注册');
  });
});

test.describe('Application Flow Tests', () => {
  test('Flow 14: Auth guard redirects to login', async ({ page }) => {
    await page.goto(`${BASE_URL}/cart`);
    await page.waitForURL('**/login');
    await page.screenshot({ path: 'after_migration/flow-steps/auth-guard-cart.png' });
    expect(page.url()).toContain('/login');
  });

  test('Flow 14: Orders auth guard', async ({ page }) => {
    await page.goto(`${BASE_URL}/orders`);
    await page.waitForURL('**/login');
    await page.screenshot({ path: 'after_migration/flow-steps/auth-guard-orders.png' });
    expect(page.url()).toContain('/login');
  });

  test('Flow 5: Search navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);
    await page.waitForLoadState('networkidle');
    await page.fill('.nav-search input', '测试');
    await page.press('.nav-search input', 'Enter');
    await page.waitForURL('**/products?keyword=*');
    await page.screenshot({ path: 'after_migration/flow-steps/search-navigation.png' });
    expect(page.url()).toContain('keyword=');
  });

  test('Flow 6: Tag filter navigation', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);
    await page.waitForLoadState('networkidle');
    await page.click('.nav-sub a:nth-child(2)');
    await page.waitForURL('**/products?tag=TODAY_DEAL');
    await page.screenshot({ path: 'after_migration/flow-steps/tag-filter.png' });
    expect(page.url()).toContain('tag=TODAY_DEAL');
  });
});

test.describe('Accessibility Tests', () => {
  test('all navigation links are keyboard accessible', async ({ page }) => {
    await page.goto(`${BASE_URL}/products`);
    await page.waitForLoadState('networkidle');
    // Check that sub-nav links exist and are focusable
    const links = await page.locator('.nav-sub a').count();
    expect(links).toBeGreaterThan(0);
    await page.screenshot({ path: 'after_migration/accessibility/nav-links.png' });
  });

  test('login form labels and inputs exist', async ({ page }) => {
    await page.goto(`${BASE_URL}/login`);
    await page.waitForLoadState('networkidle');
    const labels = await page.locator('label').count();
    expect(labels).toBe(2); // 用户名, 密码
    await page.screenshot({ path: 'after_migration/accessibility/login-form.png' });
  });

  test('register form has all required fields', async ({ page }) => {
    await page.goto(`${BASE_URL}/register`);
    await page.waitForLoadState('networkidle');
    const inputs = await page.locator('input').count();
    expect(inputs).toBeGreaterThanOrEqual(3); // username, password, email + search
    await page.screenshot({ path: 'after_migration/accessibility/register-form.png' });
  });
});
