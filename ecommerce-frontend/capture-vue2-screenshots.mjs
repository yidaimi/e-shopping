import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const BASE_URL = 'http://localhost:8080';
const SCREENSHOT_DIR = path.resolve('before_migration');
const VIEWPORT = { width: 1280, height: 720 };

const pages = [
  { name: 'products', path: '/products', desc: 'Product List - Main page' },
  { name: 'login', path: '/login', desc: 'Login page' },
  { name: 'register', path: '/register', desc: 'Register page' },
  { name: 'product-detail-1', path: '/product/1', desc: 'Product Detail - Product 1' },
  { name: 'cart-unauthenticated', path: '/cart', desc: 'Cart - redirects to login when unauthenticated' },
  { name: 'orders-unauthenticated', path: '/orders', desc: 'Orders - redirects to login when unauthenticated' },
  { name: 'products-tag-today', path: '/products?tag=TODAY_DEAL', desc: 'Products - Today Deal tag' },
  { name: 'products-tag-new', path: '/products?tag=NEW', desc: 'Products - New tag' },
  { name: 'products-tag-hot', path: '/products?tag=HOT', desc: 'Products - Hot tag' },
  { name: 'products-tag-brand', path: '/products?tag=BRAND', desc: 'Products - Brand tag' },
  { name: 'products-search', path: '/products?keyword=test', desc: 'Products - Search keyword' },
];

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();
  const manifest = { screenshots: [], captureDate: new Date().toISOString(), viewport: VIEWPORT, server_method: 'npm run build + npx serve dist -l 8080' };

  for (const route of pages) {
    try {
      const url = BASE_URL + route.path;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);
      const filePath = path.join(SCREENSHOT_DIR, `${route.name}.png`);
      await page.screenshot({ path: filePath });
      const stats = fs.statSync(filePath);
      manifest.screenshots.push({
        file: `${route.name}.png`,
        route: route.path,
        description: route.desc,
        viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
        timestamp: new Date().toISOString(),
        fileSize: stats.size
      });
      console.log(`Captured: ${route.name}.png (${stats.size} bytes)`);
    } catch (e) {
      console.log(`Failed: ${route.name} - ${e.message}`);
      manifest.screenshots.push({
        file: `${route.name}.png`,
        route: route.path,
        description: route.desc,
        error: e.message
      });
    }
  }

  fs.writeFileSync(path.join(SCREENSHOT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written. Total: ${manifest.screenshots.length} screenshots.`);
  await browser.close();
}

main().catch(e => { console.error(e); process.exit(1); });
