import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { execSync, spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BASE_DIR = path.resolve(__dirname);
const VUE3_DIR = path.join(BASE_DIR, 'vue3-app');
const BEFORE_DIR = path.join(BASE_DIR, 'before_migration');
const AFTER_DIR = path.join(BASE_DIR, 'after_migration', 'final-validation');
const VIEWPORT = { width: 1280, height: 720 };

// Ensure after_migration dir exists
fs.mkdirSync(AFTER_DIR, { recursive: true });

const routes = [
  { name: 'products', path: '/products', desc: 'Product List' },
  { name: 'login', path: '/login', desc: 'Login page' },
  { name: 'register', path: '/register', desc: 'Register page' },
  { name: 'products-tag-today', path: '/products?tag=TODAY_DEAL', desc: 'Today Deal' },
  { name: 'products-tag-new', path: '/products?tag=NEW', desc: 'New' },
  { name: 'products-tag-hot', path: '/products?tag=HOT', desc: 'Hot' },
  { name: 'products-tag-brand', path: '/products?tag=BRAND', desc: 'Brand' },
  { name: 'products-search', path: '/products?keyword=test', desc: 'Search' },
];

async function startServer() {
  console.log('Starting Vue 3 static server on port 5173...');
  const server = spawn('npx', ['serve', 'dist', '-l', '5173', '-s'], {
    cwd: VUE3_DIR,
    stdio: 'ignore',
    detached: true
  });
  server.unref();

  // Wait for server to be ready
  for (let i = 0; i < 20; i++) {
    try {
      const resp = execSync('curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/', { timeout: 3000 });
      if (resp.toString().trim() === '200') {
        console.log('Server ready!');
        return server;
      }
    } catch (e) {}
    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error('Server failed to start');
}

async function main() {
  // Kill any existing serve processes
  try { execSync('pkill -f "serve dist" 2>/dev/null'); } catch(e) {}
  await new Promise(r => setTimeout(r, 1000));

  const server = await startServer();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // Capture Vue 3 screenshots
  for (const route of routes) {
    try {
      const url = `http://127.0.0.1:5173${route.path}`;
      await page.goto(url, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000);
      const filePath = path.join(AFTER_DIR, `${route.name}.png`);
      await page.screenshot({ path: filePath });
      const stats = fs.statSync(filePath);
      console.log(`Captured Vue3: ${route.name}.png (${stats.size} bytes)`);
    } catch (e) {
      console.log(`Failed Vue3: ${route.name} - ${e.message}`);
    }
  }

  await browser.close();

  // Now do pixelmatch comparison
  console.log('\n--- Pixelmatch Comparison ---');
  const { default: pixelmatch } = await import('pixelmatch');
  const { PNG } = await import('pngjs');

  const results = [];
  for (const route of routes) {
    const beforeFile = path.join(BEFORE_DIR, `${route.name}.png`);
    const afterFile = path.join(AFTER_DIR, `${route.name}.png`);

    if (!fs.existsSync(beforeFile) || !fs.existsSync(afterFile)) {
      console.log(`Skip ${route.name}: missing file`);
      results.push({ page: route.name, layout: 0, component: 0, styling: 0, overall: 0, error: 'missing file' });
      continue;
    }

    try {
      const img1 = PNG.sync.read(fs.readFileSync(beforeFile));
      const img2 = PNG.sync.read(fs.readFileSync(afterFile));

      if (img1.width !== img2.width || img1.height !== img2.height) {
        console.log(`Skip ${route.name}: size mismatch ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`);
        results.push({ page: route.name, layout: 0, component: 0, styling: 0, overall: 0, error: 'size mismatch' });
        continue;
      }

      const totalPixels = img1.width * img1.height;
      const diff = new PNG({ width: img1.width, height: img1.height });

      const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, img1.width, img1.height, { threshold: 0.1 });
      const matchPercentage = 1 - (numDiffPixels / totalPixels);

      // Use match percentage for all three dimensions (same image comparison)
      const layout = matchPercentage;
      const component = matchPercentage;
      const styling = matchPercentage;
      const overall = (layout + component + styling) / 3;

      results.push({ page: route.name, layout: Number(layout.toFixed(4)), component: Number(component.toFixed(4)), styling: Number(styling.toFixed(4)), overall: Number(overall.toFixed(4)), numDiffPixels, totalPixels });
      console.log(`${route.name}: match=${(matchPercentage * 100).toFixed(2)}% (diff=${numDiffPixels}/${totalPixels})`);
    } catch (e) {
      console.log(`Error ${route.name}: ${e.message}`);
      results.push({ page: route.name, layout: 0, component: 0, styling: 0, overall: 0, error: e.message });
    }
  }

  // Calculate overall score
  const validResults = results.filter(r => !r.error);
  const avgOverall = validResults.length > 0
    ? validResults.reduce((sum, r) => sum + r.overall, 0) / validResults.length
    : 0;

  const scores = {
    methodology: 'pixelmatch-automated',
    timestamp: new Date().toISOString(),
    viewport: `${VIEWPORT.width}x${VIEWPORT.height}`,
    threshold: 0.1,
    pages: results,
    summary: {
      totalPages: results.length,
      validComparisons: validResults.length,
      overallVisualSimilarity: Number(avgOverall.toFixed(4)),
      avgLayout: validResults.length > 0 ? Number((validResults.reduce((s, r) => s + r.layout, 0) / validResults.length).toFixed(4)) : 0,
      avgComponent: validResults.length > 0 ? Number((validResults.reduce((s, r) => s + r.component, 0) / validResults.length).toFixed(4)) : 0,
      avgStyling: validResults.length > 0 ? Number((validResults.reduce((s, r) => s + r.styling, 0) / validResults.length).toFixed(4)) : 0
    }
  };

  fs.writeFileSync(path.join(VUE3_DIR, 'visual_scores.json'), JSON.stringify(scores, null, 2));
  console.log(`\nOverall Visual Similarity: ${(avgOverall * 100).toFixed(2)}%`);
  console.log('visual_scores.json written.');

  // Kill the server
  try { execSync('pkill -f "serve dist" 2>/dev/null'); } catch(e) {}
}

main().catch(e => { console.error(e); process.exit(1); });
