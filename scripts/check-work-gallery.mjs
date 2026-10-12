import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
const require = createRequire(import.meta.url);
const { chromium } = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser = await chromium.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true });
const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const out = fs.mkdtempSync(path.join(os.tmpdir(), 'ideal-gallery-'));
try {
  const page = await browser.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    const response = await page.goto(base + '/our-work', { waitUntil: 'domcontentloaded' });
    assert.equal(response.status(), 200);
    const decline = page.getByRole('button', { name: 'Decline', exact: true });
    await decline.waitFor({ state: 'visible' });
    await decline.click();
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('link[rel="canonical"]').getAttribute('href'), 'https://www.idealsolutions.com.ng/our-work');
    assert.equal(await page.getByRole('button', { name: /^Open .* photos$/ }).count(), 4);
    await page.getByRole('button', { name: 'Security & Access', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: /^Open .* photos$/ }).count(), 1);
    const open = page.getByRole('button', { name: /^Open At the perimeter/ });
    await open.click();
    await page.getByRole('dialog').waitFor();
    await page.getByRole('button', { name: 'Next photo', exact: true }).click();
    assert.ok((await page.getByRole('dialog').innerText()).includes('2 / 6'));
    await page.keyboard.press('ArrowLeft');
    assert.ok((await page.getByRole('dialog').innerText()).includes('1 / 6'));
    const img = page.getByRole('dialog').locator('img');
    await page.waitForFunction(el => el.complete && el.naturalWidth > 0, await img.elementHandle());
    await page.screenshot({ path: path.join(out, `${width}-viewer.png`) });
    await page.keyboard.press('Escape');
    assert.equal(await page.getByRole('dialog').count(), 0);
    assert.equal(await open.evaluate(el => el === document.activeElement), true);
    await page.getByRole('button', { name: 'All work', exact: true }).click();
    await page.getByRole('button', { name: 'Data Centre Work', exact: true }).click();
    assert.equal(await page.getByRole('button', { name: /^Open .* photos$/ }).count(), 2);
    await page.getByRole('button', { name: 'Open Rack deployment, front to rear, 18 photos' }).click();
    assert.ok((await page.getByRole('dialog').innerText()).includes('1 / 18'));
    await page.keyboard.press('Escape');
    await page.getByRole('button', { name: 'All work', exact: true }).click();
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: path.join(out, `${width}-gallery.png`), fullPage: true });
  }
  const sitemap = await page.request.get(base + '/sitemap.xml');
  const sitemapText = await sitemap.text();
  assert.ok(sitemapText.includes('/our-work'));
  assert.ok(sitemapText.includes('ideal-solutions-data-centre-rack-r07-11-front.webp'));
  for (const [album, count] of [['rack-deployment', 18], ['data-centre-work', 3], ['security-access', 6], ['onsite-installations', 9]]) {
    const url = base + '/our-work/' + album;
    const response = await page.request.get(url);
    assert.equal(response.status(), 200, album);
    const html = await response.text();
    assert.equal((html.match(/<figure\b/g) || []).length, count, album + ' visible photos');
    assert.ok(html.includes('rel="canonical"'), album + ' canonical');
    assert.ok(sitemapText.includes('www.idealsolutions.com.ng/our-work/' + album), album + ' sitemap');
    assert.ok(html.includes('application/ld+json'), album + ' structured data');
    assert.ok(html.includes('target="_blank"'), album + ' full image links');
  }
  const service = await page.goto(base + '/services/data-centre-deployment/rack-and-stack', { waitUntil: 'domcontentloaded' });
  assert.equal(service.status(), 200);
  assert.equal(await page.getByRole('link', { name: /View the rack photo album/ }).getAttribute('href'), '/our-work/rack-deployment');
  const realRack = page.locator('img[alt="Front of data centre rack R07-11 with mounted servers and connected equipment"]');
  await realRack.scrollIntoViewIfNeeded();
  await page.waitForFunction(el => el.complete && el.naturalWidth > 0, await realRack.elementHandle());
  await page.screenshot({ path: path.join(out, 'rack-service.png') });
  for (const file of fs.readdirSync('public/image/our-work')) {
    assert.equal((await page.request.get(base + '/image/our-work/' + file)).status(), 200);
  }
  assert.deepEqual(errors, []);
  console.log('Gallery passed desktop/mobile filters, viewer, keyboard, focus return, images, canonical and sitemap. Screenshots: ' + out);
} finally { await browser.close(); }
