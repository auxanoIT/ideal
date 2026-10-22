import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const article = '/blog/how-to-choose-a-data-centre-deployment-provider-in-nigeria';

try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const response = await page.goto(base + article, { waitUntil: 'networkidle', timeout: 120000 });
    assert.equal(response.status(), 200);
    const cookie = page.getByRole('button', { name: 'Decline', exact: true });
    if (await cookie.isVisible()) await cookie.click();

    assert.equal(await page.locator('article h1').count(), 1);
    assert.ok(await page.locator('article header nav[aria-label="Breadcrumb"]').isVisible());
    assert.ok(await page.locator('article header figure img').count());
    await page.locator('article header figure img').evaluate(image => image.decode());
    const image = await page.locator('article header figure img').evaluate(image => ({ naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight, width: image.getBoundingClientRect().width, height: image.getBoundingClientRect().height }));
    assert.ok(image.naturalWidth > 0 && image.naturalHeight > 0);
    assert.ok(Math.abs(image.width / image.height - image.naturalWidth / image.naturalHeight) < 0.03);

    const mobile = width < 1024;
    const contents = page.getByRole('button', { name: 'Contents', exact: true });
    assert.equal(await contents.isVisible(), mobile);
    assert.equal(await page.getByRole('navigation', { name: 'Article contents' }).count(), 0);
    if (mobile) {
      await contents.click();
      assert.equal(await contents.getAttribute('aria-expanded'), 'true');
      const panel = page.getByRole('navigation', { name: 'Article contents' });
      assert.ok(await panel.getByRole('link').count() > 0);
      await page.keyboard.press('Escape');
      assert.equal(await panel.count(), 0);
      assert.ok(await contents.evaluate(element => element === document.activeElement));
      await contents.click();
      await page.getByRole('button', { name: 'Close contents' }).click();
      assert.equal(await panel.count(), 0);
      assert.ok(await contents.evaluate(element => element === document.activeElement));
      await contents.click();
      const first = panel.getByRole('link').first();
      const id = new URL(await first.getAttribute('href'), base).hash.slice(1);
      await first.click();
      await page.waitForTimeout(300);
      assert.equal(await panel.count(), 0);
      assert.equal(new URL(page.url()).hash, `#${id}`);
      const headingTop = await page.locator(`#${id}`).evaluate(element => element.getBoundingClientRect().top);
      assert.ok(headingTop >= 130, `heading obscured at ${width}px: ${headingTop}`);
    } else {
      assert.ok(await page.getByRole('navigation').filter({ hasText: 'In this article' }).count() > 0);
    }

    await page.locator('article h1').evaluate(element => { element.textContent = 'A complete guide to planning and delivering a reliable data centre deployment across complex facilities and demanding operating environments in Nigeria'; });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}px`);
    assert.deepEqual(errors, []);
    console.log(`${width}px: hero, image, navigation, keyboard, long title, overflow OK`);
    await page.close();
  }
} finally {
  await browser.close();
}
