import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import path from 'node:path';
import os from 'node:os';
const require = createRequire(import.meta.url);
const {chromium} = require(path.join(os.tmpdir(),'ideal-solutions-browser-qa/node_modules/playwright-core'));
const base = process.env.QA_BASE_URL || 'http://localhost:3001';
// Invalid requests must be rejected before reaching any external lead provider.
for (const endpoint of ['lead','estimate','checklist-lead']) {
  const response = await fetch(`${base}/api/${endpoint}`, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:' ',company:'',email:'invalid',phone:'letters'})});
  assert.equal(response.status,400);
  const data = await response.json();
  for(const field of ['name','company','email']) assert.ok(data.fieldErrors[field], `${endpoint}: ${field}`);
  assert.ok(!data.error.includes('Invalid form submission'));
}
const browser = await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 for(const width of [390,1440]) {
  const page = await browser.newPage({viewport:{width,height:900}});
  let requests = 0;
  await page.route('**/api/lead', route => { requests++; return route.abort('failed'); });
  await page.goto(base+'/book-consultation',{waitUntil:'domcontentloaded'});
  const decline = page.getByRole('button',{name:'Decline',exact:true});
  if(await decline.isVisible()) await decline.click();
  const form = page.locator('form').filter({has:page.locator('input[name="company"]')});
  const submit = form.locator('button[type="submit"]');
  await submit.click();
  for(const name of ['name','company','email','phone','serviceInterest','message','marketingConsent']) {
   assert.equal(await form.locator(`[name="${name}"]`).getAttribute('aria-invalid'),'true',name);
  }
  assert.equal(requests,0);
  assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('name')),'name');
  await form.locator('[name="name"]').fill('QA Test');
  await form.locator('[name="company"]').fill('Test company');
  await form.locator('[name="email"]').fill('qa@example.com');
  await form.locator('[name="phone"]').fill('+234 801 234 5678');
  await form.locator('[name="serviceInterest"]').selectOption({index:1});
  await form.locator('[name="message"]').fill('Testing form validation only.');
  await form.locator('[name="marketingConsent"]').check();
  await submit.click();
  await page.getByRole('alert').filter({hasText:'connection failed'}).waitFor();
  assert.equal(requests,1);
  assert.equal(await form.locator('[name="company"]').inputValue(),'Test company');
  assert.equal(await submit.isDisabled(),false);
  await page.close();
 }
 console.log('Form validation passed: three API error responses, mobile/desktop inline errors, first-error focus, no invalid submissions, and preserved input after mocked network failure. No real leads sent.');
} finally { await browser.close(); }
