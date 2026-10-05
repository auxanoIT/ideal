import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
const require = createRequire(import.meta.url);
const records = require('../data/ideal-case-studies.json');
const pillars = require('../data/service-pillars-content.json');
const images = require('../data/ideal-case-study-images.json');
assert.equal(records.length, 7);
assert.equal(new Set(records.map(r => r.slug)).size, 7);
for (const record of records) {
  assert.match(record.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  for (const key of ['title','client','industry','summary','challenge','result']) assert.ok(record[key]);
  assert.ok(record.solution.length);
  assert.ok(record.seo.metaTitle && record.seo.metaDescription);
  assert.ok(record.relatedServices.every(slug => pillars.some(p => p.slug === slug)));
  assert.ok(!record.projectDate && !record.image && !record.quote);
  assert.ok(!JSON.stringify(record).includes('Auxano'));
  assert.ok(images[record.slug]);
  assert.ok(fs.existsSync(`public${images[record.slug].src}`));
  assert.ok(fs.statSync(`public${images[record.slug].src}`).size < 160 * 1024);
  assert.match(images[record.slug].alt, /AI-generated illustration/);
}
assert.equal(new Set(records.map(r => r.seo.metaTitle)).size, 7);
assert.equal(new Set(records.map(r => r.seo.metaDescription)).size, 7);
console.log('Seven client case studies validated: unique routes and metadata, valid pillar links, no invented project dates or photography.');

if (process.argv.includes('--browser')) {
  const {chromium} = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
  const browser = await chromium.launch({executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true});
  const base = process.env.QA_BASE_URL || 'http://localhost:3001';
  try {
    const page = await browser.newPage();
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    for (const record of records) {
      const route = `/case-studies/${record.slug}`;
      assert.ok(sitemap.includes(`https://www.idealsolutions.com.ng${route}</loc>`));
      const response = await page.goto(`${base}${route}`);
      assert.equal(response.status(), 200);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('h1').innerText(), record.title);
      assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), `https://www.idealsolutions.com.ng${route}`);
      assert.equal(await page.title(), record.seo.metaTitle);
      assert.ok((await page.locator('meta[name=robots]').getAttribute('content')).includes('index'));
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      for (const schema of schemas) JSON.parse(schema);
      assert.ok(schemas.some(schema => schema.includes('CreativeWork')));
      assert.ok(await page.locator('main img').count() > 0);
      assert.ok(sitemap.includes(`https://www.idealsolutions.com.ng${images[record.slug].src}</image:loc>`));
      assert.ok((await page.locator('figure figcaption').innerText()).includes('Not a photograph'));
      const heroImage = page.locator('figure img');
      await heroImage.evaluate(image => image.decode());
      assert.ok(await heroImage.evaluate(image => image.naturalWidth > 0));
    }
    const out = fs.mkdtempSync(path.join(os.tmpdir(),'ideal-case-study-qa-'));
    for (const width of [390,1440]) {
      await page.setViewportSize({width,height:900});
      for (const route of ['/case-studies', `/case-studies/${records[1].slug}`]) {
        await page.goto(`${base}${route}`);
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.screenshot({path:path.join(out,`${width}-${route === '/case-studies' ? 'index' : 'detail'}.png`),fullPage:true});
      }
    }
    console.log(`HTTP, metadata, sitemap, structured data and mobile/desktop layout checks passed. Screenshots: ${out}`);
  } finally { await browser.close(); }
}

// Optional, non-network export for the owner's authenticated Sanity CLI.
// Stable IDs make a repeated import identifiable. Never replace existing CMS docs.
if (process.argv.includes('--export')) {
  const output = path.resolve('tmp/ideal-case-studies.ndjson');
  fs.mkdirSync(path.dirname(output), {recursive: true});
  fs.writeFileSync(output, records.map(record => JSON.stringify({
    ...record,
    _id: `ideal-client-project-${record.slug}`,
    _type: 'caseStudy',
    textOnly: false,
    slug: {_type: 'slug', current: record.slug},
  })).join('\n') + '\n');
  console.log(`Sanity import file: ${output}`);
}
