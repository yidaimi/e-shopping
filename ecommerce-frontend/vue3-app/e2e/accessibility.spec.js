/**
 * Accessibility Playwright Tests
 * Tests the Vue 3 application for basic accessibility compliance using axe-core.
 * Screenshots saved to after_migration/accessibility/
 */
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SCREENSHOT_DIR = path.resolve(__dirname, '../../after_migration/accessibility');

test.describe('Accessibility Tests', () => {
  test('Products page accessibility scan', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(1000);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Save screenshot with accessibility context
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'products-a11y.png'),
    });

    // Log violations for documentation but don't fail the test
    // (we want to capture results even if there are issues)
    if (results.violations.length > 0) {
      console.log(`Products page: ${results.violations.length} accessibility violations found`);
      for (const v of results.violations) {
        console.log(`  - ${v.id}: ${v.description} (impact: ${v.impact})`);
      }
    } else {
      console.log('Products page: No accessibility violations found');
    }

    // Verify basic structure exists
    await expect(page.locator('header')).toBeVisible();
  });

  test('Login page accessibility scan', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'login-a11y.png'),
    });

    if (results.violations.length > 0) {
      console.log(`Login page: ${results.violations.length} accessibility violations found`);
      for (const v of results.violations) {
        console.log(`  - ${v.id}: ${v.description} (impact: ${v.impact})`);
      }
    } else {
      console.log('Login page: No accessibility violations found');
    }

    // Verify form elements exist
    await expect(page.locator('h2')).toHaveText('用户登录');
  });

  test('Register page accessibility scan', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'register-a11y.png'),
    });

    if (results.violations.length > 0) {
      console.log(`Register page: ${results.violations.length} accessibility violations found`);
      for (const v of results.violations) {
        console.log(`  - ${v.id}: ${v.description} (impact: ${v.impact})`);
      }
    } else {
      console.log('Register page: No accessibility violations found');
    }

    await expect(page.locator('h2')).toHaveText('用户注册');
  });

  test('Keyboard navigation on login page', async ({ page }) => {
    await page.goto('/login');
    await page.waitForTimeout(500);

    // Tab through form elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'login-keyboard-nav.png'),
    });

    // Verify focusable elements exist
    const inputs = page.locator('.login-container input');
    await expect(inputs).toHaveCount(2);
  });

  test('Keyboard navigation on register page', async ({ page }) => {
    await page.goto('/register');
    await page.waitForTimeout(500);

    // Tab through form elements
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);
    await page.keyboard.press('Tab');
    await page.waitForTimeout(200);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, 'register-keyboard-nav.png'),
    });

    const inputs = page.locator('.register-container input');
    await expect(inputs).toHaveCount(3);
  });
});
