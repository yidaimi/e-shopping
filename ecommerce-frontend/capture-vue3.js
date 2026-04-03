const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const SCREENSHOT_DIR = path.join(__dirname, 'after_migration', 'final-validation');

const routes = [
  { name: 'products', path: '/products', description: 'Product List Page' },
  { name: 'login', path: '/login', description: 'Login Page' },
  { name: 'register', path: '/register', description: 'Register Page' },
  { name: 'product-detail', path: '/product/1', description: 'Product Detail Page' },
  { name: 'cart', path: '/cart', description: 'Cart Page (requires auth)' },
  { name: 'orders', path: '/orders', description: 'Order List Page (requires auth)' },
  { name: 'order-detail', path: '/order/1', description: 'Order Detail Page (requires auth)' },
];

(async () => {
  // Ensure directory exists
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  for (const route of routes) {
    try {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);

      const screenshotPath = path.join(SCREENSHOT_DIR, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath });

      const stat = fs.statSync(screenshotPath);
      console.log(`✓ Captured: ${route.name} (${stat.size} bytes)`);
    } catch (err) {
      console.log(`✗ Failed: ${route.name} - ${err.message}`);
    }
  }

  await browser.close();
  console.log('\nAll Vue 3 screenshots captured to after_migration/final-validation/');
})();
