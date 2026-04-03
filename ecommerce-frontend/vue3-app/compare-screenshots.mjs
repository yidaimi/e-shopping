import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BEFORE_DIR = path.join(__dirname, '..', 'before_migration');
const AFTER_DIR = path.join(__dirname, '..', 'after_migration', 'final-validation');
const SCORES_FILE = path.join(__dirname, 'visual_scores.json');

const pages = ['products', 'login', 'register', 'product-detail', 'cart', 'orders', 'order-detail'];

async function comparePair(name) {
  const beforePath = path.join(BEFORE_DIR, `${name}.png`);
  const afterPath = path.join(AFTER_DIR, `${name}.png`);

  if (!fs.existsSync(beforePath) || !fs.existsSync(afterPath)) {
    return { page: name, error: 'Missing screenshot file', matchPercentage: 0 };
  }

  const img1 = PNG.sync.read(fs.readFileSync(beforePath));
  const img2 = PNG.sync.read(fs.readFileSync(afterPath));

  if (img1.width !== img2.width || img1.height !== img2.height) {
    return { page: name, error: `Size mismatch: ${img1.width}x${img1.height} vs ${img2.width}x${img2.height}`, matchPercentage: 0 };
  }

  const { width, height } = img1;
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
  const totalPixels = width * height;
  const matchPercentage = 1 - (numDiffPixels / totalPixels);

  return {
    page: name,
    width,
    height,
    totalPixels,
    numDiffPixels,
    matchPercentage: Math.round(matchPercentage * 10000) / 10000,
    layoutSimilarity: Math.round(matchPercentage * 10000) / 10000,
    componentSimilarity: Math.round(matchPercentage * 10000) / 10000,
    stylingSimilarity: Math.round(matchPercentage * 10000) / 10000
  };
}

async function main() {
  const results = [];
  for (const page of pages) {
    const result = await comparePair(page);
    results.push(result);
    console.log(`${page}: matchPercentage=${result.matchPercentage}${result.error ? ` (${result.error})` : ''} diffPixels=${result.numDiffPixels || 0}`);
  }

  const validResults = results.filter(r => !r.error);
  const avgLayout = validResults.length > 0 ? validResults.reduce((s, r) => s + r.layoutSimilarity, 0) / validResults.length : 0;
  const avgComponent = validResults.length > 0 ? validResults.reduce((s, r) => s + r.componentSimilarity, 0) / validResults.length : 0;
  const avgStyling = validResults.length > 0 ? validResults.reduce((s, r) => s + r.stylingSimilarity, 0) / validResults.length : 0;
  const overallScore = (avgLayout + avgComponent + avgStyling) / 3;

  const scores = {
    methodology: 'pixelmatch-automated',
    threshold: 0.1,
    viewport: '1280x720',
    executedAt: new Date().toISOString(),
    pages: results,
    summary: {
      totalPages: pages.length,
      comparedPages: validResults.length,
      averageLayoutSimilarity: Math.round(avgLayout * 10000) / 10000,
      averageComponentSimilarity: Math.round(avgComponent * 10000) / 10000,
      averageStylingSimilarity: Math.round(avgStyling * 10000) / 10000,
      overallVisualSimilarity: Math.round(overallScore * 10000) / 10000
    }
  };

  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2));
  console.log(`\nOverall Visual Similarity: ${scores.summary.overallVisualSimilarity}`);
  console.log(`Scores written to ${SCORES_FILE}`);
}

main().catch(console.error);
