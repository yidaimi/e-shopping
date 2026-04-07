/**
 * Capture Vue 2 baseline screenshots using Playwright
 * Saves to before_migration/ directory
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = path.join(__dirname, 'before_migration');
const VIEWPORT = { width: 1280, height: 720 };

const pages = [
  { name: 'products', route: '/products', description: 'Product List Page (Home)' },
  { name: 'login', route: '/login', description: 'Login Page' },
  { name: 'register', route: '/register', description: 'Register Page' },
  { name: 'cart', route: '/cart', description: 'Cart Page (requires auth)' },
  { name: 'orders', route: '/orders', description: 'Order List Page (requires auth)' },
];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const manifest = {
    captureDate: new Date().toISOString(),
    viewport: VIEWPORT,
    baseURL: BASE_URL,
    sourceVersion: 'Vue 2.7.16',
    server_method: 'npm run build && npx serve dist -l 8080',
    screenshots: []
  };

  for (const pageInfo of pages) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${pageInfo.route}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1000);
      
      const screenshotPath = path.join(SCREENSHOT_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: screenshotPath, clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height } });
      
      const stats = fs.statSync(screenshotPath);
      manifest.screenshots.push({
        file: `before_migration/${pageInfo.name}.png`,
        route: pageInfo.route,
        description: pageInfo.description,
        viewport: VIEWPORT,
        timestamp: new Date().toISOString(),
        fileSize: stats.size
      });
      console.log(`✓ Captured: ${pageInfo.name}.png (${stats.size} bytes)`);
    } catch (err) {
      console.error(`✗ Failed: ${pageInfo.name} - ${err.message}`);
    }
    await page.close();
  }

  // Write manifest
  fs.writeFileSync(
    path.join(SCREENSHOT_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  console.log('\nManifest written to before_migration/manifest.json');
  
  await browser.close();
})();
