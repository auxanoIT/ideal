import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import vm from 'node:vm';
const require = createRequire(import.meta.url);
const {chromium} = require(path.join(os.tmpdir(),'ideal-solutions-browser-qa/node_modules/playwright-core'));
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
const output = fs.mkdtempSync(path.join(os.tmpdir(),'ideal-about-redesign-'));
const base = process.env.QA_BASE_URL || 'http://localhost:3001';
const source = fs.readFileSync('data/about-content.ts','utf8');
const content = vm.runInNewContext('('+source.match(/export const aboutContent = ([\s\S]*?);\n/)[1]+')');
const principles = vm.runInNewContext('('+source.match(/export const aboutPrinciples = ([\s\S]*?);\n/)[1]+')');
const caps = vm.runInNewContext('('+source.match(/export const aboutCapabilities = ([\s\S]*?);\n/)[1]+')');
try {
 let page = await browser.newPage();
 const errors = [];
 page.on('pageerror', error => errors.push(error.message));
 for(const width of [320,390,768,1440]) {
  await page.close();
  page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({width,height:900});
  assert.equal((await page.goto(base+'/about')).status(),200);
  await page.getByRole('heading',{level:1}).waitFor();
  const decline=page.getByRole('button',{name:'Decline',exact:true});
  if(await decline.isVisible())await decline.click();
  assert.equal(await page.locator('h1').count(),1);
  const hero=page.locator('main section').first();
  assert.equal(await hero.locator('a,button').count(),0);
  assert.equal(await page.locator('main [class*="eyebrow"],main [class*="number"]').count(),0);
  assert.ok(!(await page.locator('main').innerText()).includes("Today's Infrastructure Work Shapes Tomorrow's Support."));
  const headings=await page.locator('main h2, main h3').allTextContents();
  assert.ok(headings.indexOf('Infrastructure Is Technical. Delivery Is Human.') < headings.indexOf('Understand Before You Touch.'));
  const purpose=page.locator('section').filter({has:page.getByRole('heading',{name:content.purpose.title,exact:true})});
  assert.equal(await purpose.locator('p').count(),1);
  assert.equal(await page.title(),'About Ideal Solutions | Data Centre Infrastructure Services Nigeria');
  assert.equal(await page.locator('meta[name="description"]').getAttribute('content'),'Learn how Ideal Solutions helps data centre operators, enterprise IT teams and technology partners deploy, support and improve critical infrastructure through skilled onsite execution in Nigeria.');
  const body=await page.locator('main').innerText();
  for(const item of [...Object.values(content),...principles]) {
   assert.ok(body.includes(item.title),item.title);
   for(const text of item.paragraphs)assert.ok(body.includes(text),text);
  }
  for(const claim of ['35%','24/7','Auxano'])assert.ok(!body.includes(claim));
  for(const image of await page.locator('main img').all()) {
   await image.evaluate(img=>{img.loading='eager';});
   await image.scrollIntoViewIfNeeded();
   try { await page.waitForFunction(img=>img.complete && img.naturalWidth>0,await image.elementHandle(),{timeout:15000}); }
   catch(error) { console.log(width,await image.evaluate(i=>({html:i.outerHTML,current:i.currentSrc,complete:i.complete,width:i.naturalWidth}))); throw error; }
  }
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
  await page.evaluate(()=>scrollTo({top:0,behavior:'instant'}));
  await page.waitForTimeout(1000);
  await page.screenshot({path:path.join(output,width+'-hero.png')});
  if(width===1440)await page.screenshot({path:path.join(output,'desktop-full.png'),fullPage:true});
 }
 for(const slug of [...caps.map(item=>item.slug),'data-centre-project-lifecycle-management']) {
  assert.equal((await page.request.get(base+'/services/'+slug)).status(),200,slug);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.goto(base+'/about');
 assert.ok(await page.locator('h1').isVisible());
 assert.deepEqual(errors,[]);
 console.log('About redesign passed: complete supplied copy, metadata, one H1, all images, seven service routes, responsive overflow and reduced-motion checks. Screenshots: '+output);
} finally {await browser.close();}
