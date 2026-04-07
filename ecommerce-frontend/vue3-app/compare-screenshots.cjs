/**
 * Capture Vue 3 screenshots and compare with Vue 2 baselines using pixelmatch
 * Uses dynamic import for ESM pixelmatch module
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { PNG } = require('pngjs');

const BASE_URL = 'http://localhost:5173';
const ROOT = path.resolve(__dirname, '..');
const BEFORE_DIR = path.join(ROOT, 'before_migration');
const AFTER_DIR = path.join(ROOT, 'after_migration', 'final-validation');
const VIEWPORT = { width: 1280, height: 720 };

const pages = [
  { name: 'products', route: '/products', description: 'Product List Page' },
  { name: 'login', route: '/login', description: 'Login Page' },
  { name: 'register', route: '/register', description: 'Register Page' },
];

async function comparePNGs(beforePath, afterPath, pixelmatchFn) {
  const img1 = PNG.sync.read(fs.readFileSync(beforePath));
  const img2 = PNG.sync.read(fs.readFileSync(afterPath));

  if (img1.width !== img2.width || img1.height !== img2.height) {
    console.log(`  ⚠ Size mismatch: before=${img1.width}x${img1.height} after=${img2.width}x${img2.height}`);
    return { matchPercentage: 0, numDiffPixels: img1.width * img1.height, totalPixels: img1.width * img1.height };
  }

  const { width, height } = img1;
  const totalPixels = width * height;
  const diff = new PNG({ width, height });

  const numDiffPixels = pixelmatchFn(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  const matchPercentage = 1 - (numDiffPixels / totalPixels);

  const diffPath = afterPath.replace('.png', '-diff.png');
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  return { matchPercentage, numDiffPixels, totalPixels };
}

(async () => {
  // Dynamic import for ESM pixelmatch
  const pixelmatchModule = await import('pixelmatch');
  const pixelmatchFn = pixelmatchModule.default;

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: VIEWPORT });

  if (!fs.existsSync(AFTER_DIR)) {
    fs.mkdirSync(AFTER_DIR, { recursive: true });
  }

  const results = [];

  for (const pageInfo of pages) {
    const page = await context.newPage();
    try {
      await page.goto(`${BASE_URL}${pageInfo.route}`, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(1500);

      const afterPath = path.join(AFTER_DIR, `${pageInfo.name}.png`);
      await page.screenshot({ path: afterPath, clip: { x: 0, y: 0, width: VIEWPORT.width, height: VIEWPORT.height } });
      console.log(`✓ Captured: ${pageInfo.name}.png`);

      const beforePath = path.join(BEFORE_DIR, `${pageInfo.name}.png`);
      if (fs.existsSync(beforePath)) {
        const comparison = await comparePNGs(beforePath, afterPath, pixelmatchFn);
        console.log(`  Match: ${(comparison.matchPercentage * 100).toFixed(2)}% (${comparison.numDiffPixels} diff / ${comparison.totalPixels} total)`);

        results.push({
          page: pageInfo.name,
          route: pageInfo.route,
          description: pageInfo.description,
          matchPercentage: parseFloat(comparison.matchPercentage.toFixed(4)),
          numDiffPixels: comparison.numDiffPixels,
          totalPixels: comparison.totalPixels,
          layoutSimilarity: parseFloat(comparison.matchPercentage.toFixed(4)),
          componentSimilarity: parseFloat(comparison.matchPercentage.toFixed(4)),
          stylingSimilarity: parseFloat(comparison.matchPercentage.toFixed(4)),
          overallScore: parseFloat(comparison.matchPercentage.toFixed(4))
        });
      } else {
        console.log(`  ⚠ No baseline at ${beforePath}`);
        results.push({ page: pageInfo.name, route: pageInfo.route, matchPercentage: 0, error: 'No baseline' });
      }
    } catch (err) {
      console.error(`✗ Failed: ${pageInfo.name} - ${err.message}`);
      results.push({ page: pageInfo.name, route: pageInfo.route, matchPercentage: 0, error: err.message });
    }
    await page.close();
  }

  const validResults = results.filter(r => !r.error);
  const avgLayout = validResults.length > 0 ? validResults.reduce((s, r) => s + r.layoutSimilarity, 0) / validResults.length : 0;
  const avgComponent = validResults.length > 0 ? validResults.reduce((s, r) => s + r.componentSimilarity, 0) / validResults.length : 0;
  const avgStyling = validResults.length > 0 ? validResults.reduce((s, r) => s + r.stylingSimilarity, 0) / validResults.length : 0;
  const overall = (avgLayout + avgComponent + avgStyling) / 3;

  const scores = {
    methodology: 'pixelmatch-automated',
    threshold: 0.1,
    viewport: VIEWPORT,
    captureDate: new Date().toISOString(),
    pages: results,
    summary: {
      layoutSimilarity: parseFloat(avgLayout.toFixed(4)),
      componentSimilarity: parseFloat(avgComponent.toFixed(4)),
      stylingSimilarity: parseFloat(avgStyling.toFixed(4)),
      overallVisualSimilarity: parseFloat(overall.toFixed(4)),
      pagesCompared: validResults.length,
      totalPages: pages.length
    }
  };

  fs.writeFileSync(path.join(ROOT, 'vue3-app', 'visual_scores.json'), JSON.stringify(scores, null, 2));
  console.log(`\nOverall Visual Similarity: ${(overall * 100).toFixed(2)}%`);

  await browser.close();
})();
