import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
const {chromium} = require(path.join(os.tmpdir(), 'ideal-solutions-browser-qa/node_modules/playwright-core'));
const base = process.env.QA_BASE_URL || 'http://localhost:3001';
const embed = 'https://embed.tawk.to/6ac8b50b43669534c41c0f96/1k4g06dli';
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:true});
try {
  for (const width of [390, 1440]) {
    const context = await browser.newContext({viewport:{width,height:900}});
    let loads = 0;
    await context.route(embed, route => {
      loads++;
      return route.fulfill({contentType:'application/javascript',body:`
        window.Tawk_API.showWidget = () => { window.__chatVisible = true; };
        window.Tawk_API.hideWidget = () => { window.__chatVisible = false; };
        window.Tawk_API.onLoad();
      `});
    });
    const page = await context.newPage();
    await page.goto(base + '/about', {waitUntil:'domcontentloaded'});
    await page.getByRole('button',{name:'Decline',exact:true}).click();
    assert.equal(loads,0,'No chat before consent or after declining');
    await page.reload({waitUntil:'domcontentloaded'});
    await page.getByRole('button',{name:'Accept',exact:true}).click();
    await page.waitForFunction(() => window.__chatVisible === true);
    assert.equal(loads,1);
    assert.equal(await page.locator('#ideal-solutions-tawk').count(),1);
    assert.equal(await page.locator('#ideal-solutions-tawk').getAttribute('crossorigin'),'*');
    // A client-side link must retain the script and conversation, not load twice.
    await page.locator('main a[href="/services"]').click();
    await page.waitForURL('**/services');
    assert.equal(loads,1);
    assert.equal(await page.evaluate(() => window.__chatVisible),true);
    await page.goto(base + '/sanity', {waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#ideal-solutions-tawk').count(),0);
    assert.equal(loads,1,'No chat in the editor, even with accepted consent');
    await context.close();
  }
  console.log('Tawk integration passed: mobile/desktop consent gating, exact widget URL, single load across navigation, and editor exclusion (mocked provider).');
} finally { await browser.close(); }
