import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { navigation } from './helpers/lead-navigation.mjs';

const require = createRequire(import.meta.url);

// Execute the actual component and validation code without a browser or new dependencies.
function harness(context, fetch, gtag = 'record', attributeContactRedirect = false, env = {}) {
  const events = [];
  const timers = new Map();
  const delays = [];
  let now = 0;
  let timerId = 0;
  const nav = navigation();
  const browser = nav.browser;
  browser.gtag = gtag === 'record' ? (...args) => events.push(args) : gtag ?? undefined;
  let active;
  let cursor = 0;
  const jsx = (type, props) => ({ type, props });
  const react = {
    useId: () => 'test',
    useState: (initial) => {
      const { states } = active;
      const index = cursor++;
      if (!(index in states)) states[index] = initial;
      return [states[index], value => { states[index] = typeof value === 'function' ? value(states[index]) : value; }];
    },
    useRef: (initial) => {
      const index = cursor++;
      return active.refs[index] ??= { current: initial };
    },
    useTransition: () => {
      const instance = active;
      return [instance.isPending, callback => {
        instance.isPending = true;
        instance.pending = Promise.resolve(callback()).finally(() => { instance.isPending = false; });
      }];
    },
  };
  const cache = {};
  function load(path) {
    if (cache[path]) return cache[path];
    const source = readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
    const code = ts.transpileModule(source, { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    } }).outputText;
    const compiledModule = { exports: {} };
    vm.runInNewContext(code, {
      module: compiledModule, exports: compiledModule.exports,
      require: name => {
        if (name === 'react') return react;
        if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
        if (name === 'lucide-react') return { CalendarDays: 'icon' };
        if (name.endsWith('/turnstile-field')) return { TurnstileField: 'turnstile' };
        if (name === '@/lib/utils') return { cn: () => '', getBrowserCookie: () => undefined };
        if (name === 'next/server') return require('next/server');
        if (name.startsWith('@/')) return load(`${name.slice(2)}.ts`);
        return require(name);
      },
      window: browser,
      setTimeout: (callback, delay) => { delays.push(delay); timers.set(++timerId, { callback, at: now + delay }); return timerId; },
      clearTimeout: id => timers.delete(id),
      Date: class extends Date { static now() { return now; } },
      performance: { now: () => now },
      fetch, process: { env }, URLSearchParams, URL, AbortSignal,
      FormData: class { constructor(data) { return data; } },
      HTMLElement: class {},
    }, { filename: path });
    return cache[path] = compiledModule.exports;
  }
  const { LeadForm } = load('components/forms/lead-form.tsx');
  function find(node, type) {
    if (!node || typeof node !== 'object') return undefined;
    if (node.type === type) return node;
    return [node.props?.children].flat(Infinity).map(child => find(child, type)).find(Boolean);
  }
  function instance(instanceContext = context, attribution = attributeContactRedirect) {
    const state = { states: [], refs: [], isPending: false, pending: undefined };
    let mounted = true;
    function render() {
      assert.ok(mounted, 'cannot render an unmounted form');
      active = state; cursor = 0;
      return LeadForm({ context: instanceContext, attributeContactRedirect: attribution });
    }
    function submit(overrides = {}, onSubmit = find(render(), 'form').props.onSubmit) {
      const values = { name: 'Test User', company: 'Example', email: 'test@example.com',
        phone: '+2348012345678', serviceInterest: 'Smart Hands',
        message: 'A project brief for testing.', marketingConsent: 'on', ...overrides };
      onSubmit({ preventDefault() {}, currentTarget: { get: key => values[key] ?? null } });
      return state.pending;
    }
    return {
      submit,
      captureSubmit() {
        const onSubmit = find(render(), 'form').props.onSubmit;
        return overrides => submit(overrides, onSubmit);
      },
      token(value) { find(render(), 'turnstile').props.onVerify(value); },
      unmount() { mounted = false; },
      button: () => find(render(), 'button').props,
      message: () => find(render(), 'div').props.children.at(-1),
    };
  }
  function advance(milliseconds) {
    const target = now + milliseconds;
    while (timers.size) {
      const [id, next] = [...timers.entries()].sort((a, b) => a[1].at - b[1].at)[0];
      if (next.at > target) break;
      now = Math.max(now, next.at); timers.delete(id); next.callback();
      assert.ok(timers.size <= 1, 'only one queue timer may be active');
    }
    now = target;
  }
  return {
    ...instance(),
    events,
    navigation: nav,
    contactRedirect(destination = '/book-consultation#project-enquiry') {
      nav.navigate('/contact');
      load('lib/lead-attribution.ts').redirectContactEnquiry(destination);
    },
    instance,
    advance,
    suspend(milliseconds) { now += milliseconds; },
    delays,
    timerCount: () => timers.size,
    track: name => load('lib/lead-analytics.ts').trackLead(name),
    api: body => load('app/api/lead/route.ts').POST(new Request('https://example.com/api/lead', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
    })),
    loadAnalytics(fn = (...args) => events.push(args)) { browser.gtag = fn; },
    tick() { if (timers.size) advance(Math.max(0, Math.min(...[...timers.values()].map(timer => timer.at)) - now)); },
  };
}

for (const context of ['consultation', 'contact']) {
  test(`successful ${context}: one event, inline success, and later submissions allowed`, async () => {
    let resolve;
    let requests = 0;
    const h = harness(context, () => { requests++; return new Promise(r => { resolve = r; }); });
    // Reuse one render's handler to exercise the ref guard before React can
    // update isPending, as well as the normal pending-state guard below.
    const sameRenderSubmit = h.captureSubmit();
    const first = sameRenderSubmit();
    sameRenderSubmit();
    h.submit();
    assert.equal(requests, 1);
    assert.equal(h.events.length, 0);
    resolve(Response.json({ ok: true }));
    await first;
    assert.deepEqual(h.events.map(args => JSON.parse(JSON.stringify(args))), [
      ['event', 'generate_lead', { form_name: context, currency: 'NGN' }],
    ]);
    assert.equal(h.message().props.role, 'status');
    assert.match(h.message().props.children, /received/);
    assert.equal(h.events.length, 1);
    const next = h.submit();
    resolve(Response.json({ ok: true }));
    await next;
    assert.equal(h.events.length, 2);
  });
}

for (const [name, response] of [
  ['API error', () => Response.json({ error: 'Delivery failed' }, { status: 503 })],
  ['unconfirmed success', () => Response.json({ ok: false })],
  ['missing confirmation', () => Response.json({})],
  ['invalid JSON', () => new Response('invalid')],
  ['null body', () => Response.json(null)],
  ['network failure', () => { throw new Error('Offline'); }],
]) {
  test(`${name}: error message and no event`, async () => {
    const h = harness('contact', async () => response(), null);
    await h.submit();
    h.loadAnalytics();
    h.tick();
    assert.equal(h.events.length, 0);
    assert.equal(h.message().props.role, 'alert');
    assert.ok(h.message().props.children);
    if (name === 'API error') assert.equal(h.message().props.children, 'Delivery failed');
  });
}

for (const context of ['contact', 'consultation']) {
  test(`delayed analytics: ${context} delivered once, after success`, async () => {
    const h = harness(context, async () => Response.json({ ok: true }), null);
    await h.submit();
    assert.equal(h.message().props.role, 'status');
    h.tick();
    assert.equal(h.events.length, 0);
    await h.submit();
    h.loadAnalytics();
    h.tick();
    h.tick();
    assert.deepEqual(JSON.parse(JSON.stringify(h.events)), Array.from({ length: 2 }, () =>
      ['event', 'generate_lead', { form_name: context, currency: 'NGN' }]));
  });
}

test('queued analytics that accepts then throws is never retried', async () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  await h.submit();
  let calls = 0;
  h.loadAnalytics(() => { calls++; throw new Error('After acceptance'); });
  h.tick();
  h.tick();
  assert.equal(calls, 1);
  assert.equal(h.message().props.role, 'status');
});

test('controlled contact origin is captured before API response and preserved through queueing', async () => {
  let resolve;
  let body;
  const h = harness('consultation', (_url, init) => {
    body = JSON.parse(init.body);
    return new Promise(r => { resolve = r; });
  }, null, true);
  h.contactRedirect();
  const submitted = h.submit();
  h.navigation.navigate('/book-consultation?enquiryContext=contact');
  resolve(Response.json({ ok: true })); await submitted;
  h.loadAnalytics(); h.tick();
  assert.equal(h.events[0][2].form_name, 'contact');
  assert.equal(body.context, 'consultation'); // Keep backend delivery unchanged.
  await (() => {
    const next = h.submit(); resolve(Response.json({ ok: true })); return next;
  })();
  assert.equal(h.events[1][2].form_name, 'consultation');
});

for (const suffix of ['', '?enquiryContext=contact', '?enquiryContext=invalid',
  '?enquiryContext=contact&enquiryContext=consultation', '?enquiryContext=contact&enquiryContext=contact']) {
  test(`direct consultation form ignores URL attribution: ${suffix || 'missing'}`, async () => {
    const h = harness('consultation', async () => Response.json({ ok: true }), 'record', true);
    h.navigation.navigate(`/book-consultation${suffix}`);
    await h.submit();
    assert.equal(h.events[0][2].form_name, 'consultation');
  });
}

test('validation failure sends neither request nor event; corrected retry succeeds', async () => {
  let requests = 0;
  const h = harness('contact', async () => { requests++; return Response.json({ ok: true }); });
  await h.submit({ email: 'invalid' });
  assert.equal(requests, 0);
  assert.equal(h.events.length, 0);
  assert.equal(h.message().props.role, 'alert');
  await h.submit();
  assert.equal(h.events.length, 1);
});

for (const gtag of [null, () => { throw new Error('Analytics failed'); }]) {
  test(`analytics ${gtag === null ? 'unavailable' : 'throws'}: submission still succeeds`, async () => {
    const h = harness('contact', async () => Response.json({ ok: true }), gtag);
    await h.submit();
    assert.equal(h.message().props.role, 'status');
    assert.match(h.message().props.children, /received/);
  });
}

test('permanently unavailable analytics expires at 30 seconds and stops its backoff timer', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  h.track('contact');
  h.advance(29_999);
  assert.equal(h.timerCount(), 1);
  h.advance(1);
  assert.equal(h.timerCount(), 0);
  assert.deepEqual(h.delays, [250, 500, 1000, 2000, 4000, 4000, 4000, 4000, 4000, 4000, 2250]);
  h.loadAnalytics();
  h.advance(60_000);
  assert.equal(h.events.length, 0);
  h.track('consultation');
  assert.equal(h.events.length, 1);
  assert.equal(h.timerCount(), 0);
});

test('analytics available just before expiry dispatches once and clears the timer', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  h.track('contact');
  h.advance(27_000);
  h.loadAnalytics();
  h.advance(750); // Last scheduled readiness check before the deadline.
  assert.equal(h.events.length, 1);
  assert.equal(h.timerCount(), 0);
  h.advance(60_000);
  assert.equal(h.events.length, 1);
});

test('expiry applies to each submission and a newer event retains its own deadline', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  h.track('contact');
  h.advance(10_000);
  h.track('consultation');
  h.advance(20_000);
  h.loadAnalytics();
  h.tick();
  assert.deepEqual(JSON.parse(JSON.stringify(h.events)), [
    ['event', 'generate_lead', { form_name: 'consultation', currency: 'NGN' }],
  ]);
  assert.equal(h.timerCount(), 0);
});

test('queue caps at 50 events, drops newest overflow, and maintains one active timer', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  for (let i = 0; i < 50; i++) { h.track('contact'); assert.equal(h.timerCount(), 1); }
  h.track('consultation');
  h.loadAnalytics();
  h.tick();
  assert.equal(h.events.length, 50);
  assert.ok(h.events.every(event => event[2].form_name === 'contact'));
  assert.equal(h.timerCount(), 0);
  h.tick();
  assert.equal(h.events.length, 50);
});

test('a delayed background timer discards expired entries without dispatching them', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  h.track('contact');
  h.suspend(31_000);
  h.loadAnalytics();
  h.tick();
  assert.equal(h.events.length, 0);
  assert.equal(h.timerCount(), 0);
});

test('synchronous reentry uses the same processor and dispatches each entry once', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  const names = [];
  h.loadAnalytics((_command, _event, parameters) => {
    names.push(parameters.form_name);
    if (names.length === 1) h.track('consultation');
  });
  h.track('contact');
  assert.deepEqual(names, ['contact', 'consultation']);
  assert.equal(h.timerCount(), 0);
});

test('throw before acceptance is not retried and does not prevent other queued attempts', () => {
  const h = harness('contact', async () => Response.json({ ok: true }), null);
  h.track('contact'); h.track('consultation');
  let calls = 0;
  h.loadAnalytics(() => { calls++; throw new Error('Before acceptance'); });
  h.tick();
  h.loadAnalytics();
  h.advance(60_000);
  assert.equal(calls, 2);
  assert.equal(h.events.length, 0);
  assert.equal(h.timerCount(), 0);
});

test('independent forms and remounts share one processor without duplicate dispatch', async () => {
  const responses = [];
  const h = harness('contact', () => new Promise(resolve => responses.push(resolve)), null);
  const first = h.instance('contact');
  const second = h.instance('consultation');
  const a = first.submit(); const b = second.submit();
  assert.equal(first.button().disabled, true);
  assert.equal(first.button().children.at(-1), 'Sending...');
  first.submit(); second.submit();
  assert.equal(responses.length, 2);
  first.unmount(); // Its original successful request may still queue its one event.
  const remounted = h.instance('contact');
  responses[0](Response.json({ ok: true })); responses[1](Response.json({ ok: true }));
  await Promise.all([a, b]);
  assert.equal(second.button().disabled, false);
  assert.equal(h.timerCount(), 1);
  const c = remounted.submit();
  responses[2](Response.json({ ok: true })); await c;
  remounted.unmount();
  h.instance('contact');
  assert.equal(h.timerCount(), 1);
  h.loadAnalytics(); h.tick(); h.advance(60_000);
  assert.deepEqual(h.events.map(event => event[2].form_name), ['contact', 'consultation', 'contact']);
  assert.equal(h.timerCount(), 0);
});

test('missing and expired client Turnstile tokens exclude submissions and permit corrected retry', async () => {
  let requests = 0;
  const h = harness('contact', async () => { requests++; return Response.json({ ok: true }); }, 'record', undefined,
    { NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test-site' });
  await h.submit();
  assert.equal(requests, 0);
  assert.match(h.message().props.children, /verification/);
  h.token('verified-token');
  h.token(''); // Actual widget's expiry callback clears the token this way.
  await h.submit();
  assert.equal(requests, 0);
  assert.equal(h.events.length, 0);
  h.token('fresh-token');
  await h.submit();
  assert.equal(requests, 1);
  assert.equal(h.events.length, 1);
});

// Execute the real route, schema and provider helpers; mock only external HTTP.
for (const scenario of ['invalid-token', 'expired-token', 'provider-rejection', 'network-failure', 'success', 'fallback-success']) {
  test(`form through actual /api/lead handler: ${scenario}`, async () => {
    const calls = [];
    let h;
    h = harness('consultation', async (url, init) => {
      if (url === '/api/lead') return h.api(JSON.parse(init.body));
      calls.push(url);
      if (url.includes('siteverify')) {
        const token = new URLSearchParams(init.body).get('response');
        assert.equal(token, scenario);
        return Response.json({ success: !['invalid-token', 'expired-token'].includes(token),
          'error-codes': token === 'expired-token' ? ['timeout-or-duplicate'] : ['invalid-input-response'] });
      }
      if (scenario === 'network-failure') throw new Error('Offline');
      if (url.includes('api.resend.com')) return Response.json({}, { status: scenario === 'fallback-success' ? 200 : 503 });
      assert.ok(url.includes('api.hsforms.com'));
      return Response.json({}, { status: scenario === 'success' ? 200 : 503 });
    }, null, undefined, {
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: 'test-site', TURNSTILE_SECRET_KEY: 'test-secret',
      RESEND_API_KEY: 'test-key', IDEALSOLUTIONS_RESEND_FROM_EMAIL: 'test@example.com',
      IDEALSOLUTIONS_LEAD_FALLBACK_EMAIL: 'owner@example.com',
    });
    h.token(scenario);
    await h.submit();
    h.loadAnalytics(); h.tick();
    const success = ['success', 'fallback-success'].includes(scenario);
    assert.equal(h.events.length, success ? 1 : 0);
    assert.equal(h.message().props.role, success ? 'status' : 'alert');
    if (scenario.endsWith('token')) {
      assert.equal(calls.length, 1);
      assert.match(h.message().props.children, /Bot verification failed/);
    }
  });
}

test('actual /api/lead rejects a missing token and malformed payload before provider delivery', async () => {
  let externalCalls = 0;
  const h = harness('contact', async () => { externalCalls++; throw new Error('Unexpected external call'); }, null, undefined,
    { TURNSTILE_SECRET_KEY: 'test-secret' });
  const body = { name: 'Test User', company: 'Example', email: 'test@example.com', phone: '+2348012345678',
    serviceInterest: 'Smart Hands', message: 'A test project brief.', marketingConsent: true, context: 'contact' };
  const missing = await h.api(body);
  assert.equal(missing.status, 400);
  assert.equal((await missing.json()).error, 'Bot verification failed.');
  const invalid = await h.api({ ...body, email: 'invalid' });
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).fieldErrors.email);
  assert.equal(externalCalls, 0);
});
