import assert from 'node:assert/strict';
import { test } from 'node:test';
import { submitToHubSpot, sendFallbackEmail, buildHubSpotConsentOptions } from '../lib/integrations.ts';
import { consultationHubSpotDestination } from '../lib/consultation-hubspot.ts';

test('consultation delivery uses its own form and handles provider failures', async (t) => {
  const oldFetch = globalThis.fetch;
  const oldEnv = { ...process.env };
  t.after(() => { globalThis.fetch = oldFetch; process.env = oldEnv; });
  delete process.env.IDEALSOLUTIONS_HUBSPOT_PORTAL_ID;
  delete process.env.IDEALSOLUTIONS_HUBSPOT_CONSULTATION_FORM_ID;
  process.env.IDEALSOLUTIONS_HUBSPOT_FORM_ID = 'other-form';
  const destination = consultationHubSpotDestination();
  assert.equal(destination.formId, '1f691f5a-7ade-4a3a-b32c-87b531f0423d');
  globalThis.fetch = async (url, init) => {
    assert.equal(url, `https://api.hsforms.com/submissions/v3/integration/submit/148498868/${destination.formId}`);
    const body = JSON.parse(init.body);
    assert.equal(body.fields[0].value, 'Test request');
    assert.equal(body.context.pageName, 'Book Consultation');
    return new Response('{}', { status: 200 });
  };
  const request = { ...destination, fields: [{ name: 'message', value: 'Test request' }], pageUri: 'https://example.com/book-consultation', pageName: 'Book Consultation' };
  assert.equal(await submitToHubSpot(request), true);
  globalThis.fetch = async () => new Response('{}', { status: 400 });
  assert.equal(await submitToHubSpot(request), false);
  globalThis.fetch = async () => { throw new Error('Network unavailable'); };
  assert.equal(await submitToHubSpot(request), false);
  process.env.RESEND_API_KEY = 'test-only';
  process.env.IDEALSOLUTIONS_RESEND_FROM_EMAIL = 'test@example.com';
  process.env.IDEALSOLUTIONS_LEAD_FALLBACK_EMAIL = 'owner@example.com';
  assert.equal(await sendFallbackEmail('Test', ['<b>literal customer input</b>']), false);
  globalThis.fetch = async (_url, init) => {
    const body = JSON.parse(init.body);
    assert.equal(body.text, '<b>literal customer input</b>');
    assert.equal(body.html, undefined);
    return new Response('{}', { status: 200 });
  };
  assert.equal(await sendFallbackEmail('Test', ['<b>literal customer input</b>']), true);
  for (const invalid of ['', 'invalid', '0', '-1', '1.2']) {
    process.env.IDEALSOLUTIONS_HUBSPOT_SUBSCRIPTION_TYPE_ID = invalid;
    assert.deepEqual(buildHubSpotConsentOptions().consent.communications, []);
  }
  process.env.IDEALSOLUTIONS_HUBSPOT_SUBSCRIPTION_TYPE_ID = '123';
  assert.equal(buildHubSpotConsentOptions().consent.communications[0].subscriptionTypeId, 123);
});
