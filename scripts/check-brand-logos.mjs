import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
const require=createRequire(import.meta.url);
const {chromium}=require(path.join(os.tmpdir(),'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const base=process.env.QA_BASE_URL||'http://localhost:3000';
const out=fs.mkdtempSync(path.join(os.tmpdir(),'ideal-logo-'));
try {
 const page=await browser.newPage();
 for(const width of [390,1440]) {
  await page.setViewportSize({width,height:900});
  await page.goto(base+'/about',{waitUntil:'domcontentloaded'});
  const decline=page.getByRole('button',{name:'Decline',exact:true});
  await decline.waitFor();
  await decline.click();
  for(const selector of ['header img','footer img']) {
   const img=page.locator(selector).first();
   await img.scrollIntoViewIfNeeded();
   await page.waitForFunction(el=>el.complete && el.naturalWidth>0,await img.elementHandle());
  }
  assert.equal(await page.locator('img[src*="idealsolutions-logo.svg"]').count(),0);
  assert.ok(await page.locator('link[rel="icon"][href*="/brand/favicon.png"]').count());
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.locator('header').first().screenshot({path:path.join(out,`${width}-header.png`)});
  await page.locator('footer a[aria-label="Ideal Solutions home"]').screenshot({path:path.join(out,`${width}-footer.png`)});
 }
 for(const asset of ['/brand/ideal-globe.png','/brand/ideal-full-logo.png','/brand/favicon.png','/apple-touch-icon.png','/icon.png','/opengraph-image']) {
  const response=await page.request.get(base+asset);
  assert.equal(response.status(),200,asset);
  if(asset==='/opengraph-image') fs.writeFileSync(path.join(out,'social.png'),await response.body());
 }
 console.log('New logos, icons and social image passed. Screenshots: '+out);
} finally {await browser.close();}
