import {createRequire} from 'node:module';
import path from 'node:path';
import os from 'node:os';
const require=createRequire(import.meta.url);
const {chromium}=require(path.join(os.tmpdir(),'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
  for (const width of [1440,390]) {
    const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
    for (const route of ['/careers','/services/data-centre-deployment','/services/fire-alarm-safety-systems']) {
      await page.goto('http://localhost:3000'+route);
      await page.waitForTimeout(1200);
      if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)) throw Error(`${route} overflow ${width}`);
      console.log(width,route,'no overflow');
      if(route==='/services/data-centre-deployment') {
        await page.locator('[aria-labelledby="audience-heading"]').scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>Array.from(document.querySelectorAll('[aria-labelledby="audience-heading"] img')).slice(0,3).every(img=>img.complete && img.naturalWidth>0),null,{timeout:60000});
      }
      await page.screenshot({path:`.next/qa-${route.split('/').pop()}-${width}.png`});
    }
    const services=page.locator('footer').getByRole('link',{name:'Everything You Need Right Here',exact:true});
    await services.click();
    await page.waitForURL('**/services');
    await page.waitForTimeout(800);
    if(await page.evaluate(()=>scrollY)>2) throw Error('Services did not start at top');
    await services.click();
    await page.waitForTimeout(600);
    if(await page.evaluate(()=>scrollY)>2) throw Error('Same-page services link did not reset');
    console.log('Services top OK',width);
    await page.goto('http://localhost:3000/services/data-centre-deployment/rack-and-stack');
    const booking=page.locator('a[href*="book-consultation?service="]').first();
    await booking.click();
    await page.waitForURL('**/book-consultation?**');
    const selected=await page.locator('select[name="serviceInterest"]').inputValue();
    if(!selected.includes('Rack-and-Stack')) throw Error(`Service context missing: ${selected}`);
    console.log('Booking service preserved:',selected);
    await page.close();
  }
  const response=await fetch('http://localhost:3000/contact?service=test',{redirect:'manual'});
  if(response.status!==308||!response.headers.get('location')?.includes('/book-consultation?service=test')) throw Error('Contact redirect failed');
  console.log('Contact permanent redirect OK');
} finally {await browser.close();}
