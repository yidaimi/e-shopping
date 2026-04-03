const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = path.join(__dirname, 'before_migration');

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
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  const page = await context.newPage();

  const manifest = {
    capturedAt: new Date().toISOString(),
    sourceVersion: 'Vue 2.7.16',
    viewport: '1280x720',
    server_method: 'npm run build + node serve-static.js on port 8080',
    screenshots: []
  };

  for (const route of routes) {
    try {
      await page.goto(`${BASE_URL}${route.path}`, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);

      const screenshotPath = path.join(SCREENSHOT_DIR, `${route.name}.png`);
      await page.screenshot({ path: screenshotPath });

      const stat = fs.statSync(screenshotPath);
      manifest.screenshots.push({
        file: `${route.name}.png`,
        route: route.path,
        description: route.description,
        uiState: 'default',
        viewport: '1280x720',
        timestamp: new Date().toISOString(),
        fileSize: stat.size
      });
      console.log(`✓ Captured: ${route.name} (${stat.size} bytes)`);
    } catch (err) {
      console.log(`✗ Failed: ${route.name} - ${err.message}`);
      manifest.screenshots.push({
        file: `${route.name}.png`,
        route: route.path,
        description: route.description,
        uiState: 'default',
        viewport: '1280x720',
        timestamp: new Date().toISOString(),
        error: err.message
      });
    }
  }

  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );

  await browser.close();
  console.log('\nManifest saved to before_migration/manifest.json');
  console.log(`Total captured: ${manifest.screenshots.filter(s => !s.error).length}/${routes.length}`);
})();
