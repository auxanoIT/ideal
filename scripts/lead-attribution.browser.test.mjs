// Run against the local Next app with a temporary runner (no project dependency):
// npm exec --package=playwright -- node --test scripts/lead-attribution.browser.test.mjs
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { delimiter, join } from 'node:path';
import { test } from 'node:test';

const require = createRequire(import.meta.url);
function playwright() {
  try { return require('playwright'); } catch { /* npm exec exposes its bin directory. */ }
  for (const bin of (process.env.PATH ?? '').split(delimiter)) {
    try { return require(join(bin, '..', 'playwright')); } catch { /* Try the next bin. */ }
  }
  throw new Error('Run this browser test through npm exec --package=playwright.');
}

const base = process.env.LEAD_TEST_BASE_URL ?? 'http://127.0.0.1:3100';

test('attribution in the running Next app and real browser history', { timeout: 180_000 }, async t => {
  const browser = await playwright().chromium.launch({ channel: 'msedge', headless: true });
  t.after(() => browser.close());
  const context = await browser.newContext();
  t.after(() => context.close());
  // Never deliver test leads or analytics to external services.
  await context.route('**/*', route => {
    const url = route.request().url();
    if (url.startsWith(`${base}/api/lead`)) return route.fulfill({ json: { ok: true } });
    if (url.startsWith(base)) return route.continue();
    if (url.startsWith('https://challenges.cloudflare.com/turnstile/v0/api.js')) {
      return route.fulfill({ contentType: 'application/javascript', body:
        'window.turnstile = {render: (_node, options) => { setTimeout(() => options.callback("test-token"), 0); return "test-widget"; }, remove() {}, reset() {}};' });
    }
    return route.abort();
  });
  const page = await context.newPage();

  async function ready(target = page) {
    await target.waitForURL(url => url.pathname === '/book-consultation');
    await target.waitForFunction(() => {
      const form = document.querySelector('form');
      return form && Object.keys(form).some(key => key.startsWith('__reactProps$'));
    });
  }
  async function submit(expected, target = page) {
    await ready(target);
    const form = target.locator('form').filter({ has: target.locator('input[name="name"]') });
    await form.locator('[name="name"]').fill('Browser Test');
    await form.locator('[name="company"]').fill('Example');
    await form.locator('[name="email"]').fill('browser@example.com');
    await form.locator('[name="phone"]').fill('+2348012345678');
    await form.locator('[name="serviceInterest"]').selectOption('Smart Hands & Technical Support');
    await form.locator('[name="message"]').fill('Automated local browser test project.');
    await form.locator('[name="marketingConsent"]').check();
    await target.evaluate(() => {
      window.__leadEvents = [];
      window.gtag = (...args) => window.__leadEvents.push(args);
    });
    await form.locator('button[type="submit"]').click();
    await target.getByRole('status').filter({ hasText: 'Consultation request received' }).waitFor();
    assert.deepEqual(await target.evaluate(() => window.__leadEvents.filter(args => args[1] === 'generate_lead')), [
      ['event', 'generate_lead', { form_name: expected, currency: 'NGN' }],
    ]);
  }

  let contactUrl;
  await t.test('/contact redirects, strips conflicting markers, and submits as contact', async () => {
    await page.goto(`${base}/contact?enquiryContext=contact&enquiryContext=consultation`);
    await ready();
    assert.equal(new URL(page.url()).searchParams.has('enquiryContext'), false);
    assert.equal(new URL(page.url()).hash, '#project-enquiry');
    await submit('contact');
    contactUrl = page.url();
  });
  await t.test('copied URL in another tab defaults to consultation', async () => {
    const copied = await context.newPage();
    try { await copied.goto(contactUrl); await submit('consultation', copied); }
    finally { await copied.close(); }
  });
  await t.test('direct URLs ignore missing, invalid, conflicting, repeated, and bookmarked markers', async () => {
    for (const suffix of ['', '?enquiryContext=invalid', '?enquiryContext=contact',
      '?enquiryContext=contact&enquiryContext=consultation', '?enquiryContext=contact&enquiryContext=contact']) {
      await page.goto(`${base}/book-consultation${suffix}`);
      await submit('consultation');
    }
  });
  await t.test('browser back/forward restores each entry origin', async () => {
    await page.goto(`${base}/contact`); await ready();
    await page.goto(`${base}/book-consultation?enquiryContext=contact`); await ready();
    await page.goBack(); await submit('contact');
    await page.goForward(); await submit('consultation');
  });
  await t.test('a Next client navigation to consultation clears prior contact attribution', async () => {
    await page.goto(`${base}/contact`); await ready();
    await page.locator('a[href="/book-consultation"]').first().evaluate(link => link.click());
    await page.waitForFunction(() => !window.history.state?.idealLeadOrigin);
    await submit('consultation');
  });
  await t.test('without JavaScript the fallback still reaches the same visible form', async () => {
    const noScript = await browser.newContext({ javaScriptEnabled: false });
    try {
      const fallback = await noScript.newPage();
      await fallback.goto(`${base}/contact`);
      await fallback.waitForURL(url => url.pathname === '/book-consultation');
      await fallback.locator('form input[name="name"]').waitFor();
    } finally { await noScript.close(); }
  });
});
