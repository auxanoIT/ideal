import { createRequire } from 'node:module';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
try {
  for (const mobile of [false, true]) {
    const page = await browser.newPage({ viewport: mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(base, { waitUntil: 'domcontentloaded', timeout: 120000 });
    await page.waitForTimeout(2000);
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
    if (mobile) await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    const link = mobile ? page.getByRole('dialog').getByRole('link', { name: 'About', exact: true }) : page.locator('header').getByRole('link', { name: 'About', exact: true });
    await link.click();
    await page.waitForURL('**/about', { timeout: 120000 });
    await page.waitForTimeout(1200);
    const top = await page.evaluate(() => window.scrollY);
    if (top > 2) throw new Error(`${mobile ? 'Mobile' : 'Desktop'} About starts at ${top}`);
    console.log(`${mobile ? 'Mobile' : 'Desktop'} About: scrollY=${top}`);
    await page.locator('a[href="#about-purpose"]').filter({ visible: true }).click();
    await page.waitForTimeout(500);
    const anchorY = await page.evaluate(() => window.scrollY);
    if (anchorY < 100) throw new Error('Section anchor did not scroll');
    console.log('Section anchor preserved:', anchorY);
    if (!mobile) {
      await page.evaluate(() => window.scrollTo({ top: 500, behavior: 'instant' }));
      await page.locator('header').getByRole('link', { name: 'Case Studies', exact: true }).click();
      await page.waitForURL('**/case-studies');
      await page.waitForTimeout(700);
      if (await page.evaluate(() => window.scrollY) > 2) throw new Error('Case Studies did not start at top');
      await page.goBack();
      await page.waitForTimeout(700);
      const restored = await page.evaluate(() => window.scrollY);
      if (Math.abs(restored - 500) > 5) throw new Error(`History position lost: ${restored}`);
      console.log('Case Studies top and Back restoration OK');
    }
    await page.screenshot({ path: `.next/navigation-${mobile ? 'mobile' : 'desktop'}.png` });
    await page.close();
  }
} finally { await browser.close(); }
