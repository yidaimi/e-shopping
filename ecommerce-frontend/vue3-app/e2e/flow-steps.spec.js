/**
 * Application Flow Steps - Playwright E2E Tests
 * Tests all application flows documented in application_flows.txt.
 * Screenshots saved to after_migration/flow-steps/
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../../after_migration/flow-steps');

test.describe('Flow 1: User Registration Flow', () => {
  test('Step 1-2: Navigate to register and see form', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await expect(page.locator('h2')).toHaveText('用户注册');
    await expect(page.locator('.register-container input')).toHaveCount(3);
    await expect(page.locator('.btn-register')).toHaveText('注册');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow1-step1-register-form.png') });
  });

  test('Step 3: Fill registration form fields', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await page.fill('.register-container input[type="text"]', 'testuser');
    await page.fill('.register-container input[type="password"]', 'testpass123');
    const emailInput = page.locator('.register-container input[type="email"], .register-container input[placeholder*="邮箱"], .register-container input:nth-of-type(3)');
    if (await emailInput.count() > 0) {
      await emailInput.first().fill('test@example.com');
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow1-step3-register-filled.png') });
  });

  test('Step 5b: Registration link to login page', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await page.click('.link-text a');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow1-step5b-go-to-login.png') });
  });
});

test.describe('Flow 2: User Login Flow', () => {
  test('Step 1-2: Navigate to login and see form', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await expect(page.locator('h2')).toHaveText('用户登录');
    await expect(page.locator('.login-container input[type="text"]')).toBeVisible();
    await expect(page.locator('.login-container input[type="password"]')).toBeVisible();
    await expect(page.locator('.btn-login')).toHaveText('登录');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow2-step1-login-form.png') });
  });

  test('Step 3: Fill login form fields', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await page.fill('.login-container input[type="text"]', 'testuser');
    await page.fill('.login-container input[type="password"]', 'testpass123');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow2-step3-login-filled.png') });
  });
});

test.describe('Flow 3: Product Browsing Flow', () => {
  test('Step 1-3: Products page with hero banner and header', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);
    await expect(page.locator('.nav-logo')).toBeVisible();
    await expect(page.locator('.nav-sub')).toBeVisible();
    // Hero banner should be visible on products page (no filter)
    const hero = page.locator('.hero-content, .hero-banner, .hero');
    if (await hero.count() > 0) {
      await expect(hero.first()).toBeVisible();
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow3-step1-products-page.png') });
  });

  test('Step 5b: Filter by tag 今日特惠', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    await page.click('.nav-sub a:nth-child(2)');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/tag=TODAY_DEAL/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow3-step5b-tag-today-deal.png') });
  });

  test('Step 5b: Filter by tag 新品上市', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    // Navigate to NEW tag
    const navLinks = page.locator('.nav-sub a');
    const count = await navLinks.count();
    if (count >= 3) {
      await navLinks.nth(2).click();
      await page.waitForTimeout(500);
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow3-step5b-tag-new.png') });
  });

  test('Step 5a: Return to all products', async ({ page }) => {
    await page.goto('/products?tag=TODAY_DEAL');
    await page.waitForTimeout(500);
    await page.click('.nav-sub a:first-child');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products$/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow3-step5a-all-products.png') });
  });
});

test.describe('Flow 7: Navigation Flow', () => {
  test('Step 1: Logo navigates to /products', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await page.click('.nav-logo');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-step1-logo-nav.png') });
  });

  test('Step 2: Route guard redirects to login for /cart', async ({ page }) => {
    await page.goto('/cart');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-step2-guard-cart.png') });
  });

  test('Step 2: Route guard redirects to login for /orders', async ({ page }) => {
    await page.goto('/orders');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-step2-guard-orders.png') });
  });

  test('Step 3: Default route / redirects to /products', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-step3-default-route.png') });
  });

  test('Step 1: Logged-out header shows login/register links', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    const headerText = await page.textContent('header');
    expect(headerText).toContain('登录');
    expect(headerText).toContain('注册');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-step1-logged-out-header.png') });
  });

  test('Navigation: login to register link', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await page.click('.link-text a');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/register/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-nav-login-to-register.png') });
  });

  test('Navigation: register to login link', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await page.click('.link-text a');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'flow7-nav-register-to-login.png') });
  });
});
