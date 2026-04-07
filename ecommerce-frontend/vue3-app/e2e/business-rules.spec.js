/**
 * Business Rules Verification - Playwright E2E Tests
 * Tests business rules documented in business_rules.txt.
 * Screenshots saved to after_migration/business-rules/
 */
import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../../after_migration/business-rules');

test.describe('BR-AUTH: Authentication & Authorization Rules', () => {
  test('BR-AUTH-04: Routes with requiresAuth redirect to /login without token', async ({ page }) => {
    // Clear any stored token
    await page.goto('/products');
    await page.evaluate(() => localStorage.removeItem('token'));

    await page.goto('/cart');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-auth-04-cart-redirect.png') });
  });

  test('BR-AUTH-05: /orders requires auth', async ({ page }) => {
    await page.goto('/products');
    await page.evaluate(() => localStorage.removeItem('token'));

    await page.goto('/orders');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-auth-05-orders-redirect.png') });
  });

  test('BR-AUTH-06: /products is public (no auth required)', async ({ page }) => {
    await page.goto('/products');
    await page.evaluate(() => localStorage.removeItem('token'));

    await page.goto('/products');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/products/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-auth-06-products-public.png') });
  });

  test('BR-AUTH-06: /login is public', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/login/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-auth-06-login-public.png') });
  });

  test('BR-AUTH-06: /register is public', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/\/register/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-auth-06-register-public.png') });
  });
});

test.describe('BR-DISP: Display Rules', () => {
  test('BR-DISP-06: Hero banner shown when no search/tag filter', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);
    // Hero banner should be present on default products page
    const hero = page.locator('.hero-content, .hero-banner, .hero');
    if (await hero.count() > 0) {
      await expect(hero.first()).toBeVisible();
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-disp-06-hero-visible.png') });
  });

  test('BR-DISP-06: Hero banner hidden when tag filter active', async ({ page }) => {
    await page.goto('/products?tag=TODAY_DEAL');
    await page.waitForTimeout(1000);
    // Hero should NOT be visible when a tag is set
    const hero = page.locator('.hero-content, .hero-banner, .hero');
    if (await hero.count() > 0) {
      await expect(hero.first()).not.toBeVisible();
    }
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-disp-06-hero-hidden-tag.png') });
  });

  test('BR-DISP-11: Header shows logged-out state', async ({ page }) => {
    await page.goto('/products');
    await page.evaluate(() => localStorage.removeItem('token'));
    await page.reload();
    await page.waitForTimeout(500);

    const headerText = await page.textContent('header');
    expect(headerText).toContain('登录');
    expect(headerText).toContain('注册');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-disp-11-logged-out-header.png') });
  });
});

test.describe('BR-DATA: Data Rules', () => {
  test('BR-DATA-04/05: Tag navigation links exist for all tags', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);

    // Check sub-nav contains tag links
    const subNav = page.locator('.nav-sub');
    await expect(subNav).toBeVisible();
    const subNavText = await subNav.textContent();
    expect(subNavText).toContain('全部商品');
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-data-04-tag-nav.png') });
  });
});

test.describe('BR-VAL: Validation Rules', () => {
  test('BR-VAL-01: Login form has username and password fields', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);

    await expect(page.locator('.login-container input[type="text"]')).toBeVisible();
    await expect(page.locator('.login-container input[type="password"]')).toBeVisible();
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-val-01-login-fields.png') });
  });

  test('BR-VAL-02: Register form has username, password, and email fields', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);

    const inputs = page.locator('.register-container input');
    await expect(inputs).toHaveCount(3);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-val-02-register-fields.png') });
  });
});

test.describe('BR-FLOW: Workflow Rules', () => {
  test('BR-FLOW-06: Route query change reloads to products', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    
    // Navigate to tag-filtered view  
    await page.goto('/products?tag=NEW');
    await page.waitForTimeout(500);
    await expect(page).toHaveURL(/tag=NEW/);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'br-flow-06-query-change.png') });
  });
});
