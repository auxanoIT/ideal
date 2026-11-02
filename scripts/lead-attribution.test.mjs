import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';
import { navigation } from './helpers/lead-navigation.mjs';

function harness(initialUrl = 'https://example.com/contact') {
  const nav = navigation(initialUrl);
  const effects = [];
  const cache = new Map();
  const LeadForm = Symbol('LeadForm');
  const jsx = (type, props) => ({ type, props });
  function load(path) {
    if (cache.has(path)) return cache.get(path);
    const code = ts.transpileModule(readFileSync(new URL(`../${path}`, import.meta.url), 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const mod = { exports: {} };
    vm.runInNewContext(code, {
      module: mod, exports: mod.exports, URL, URLSearchParams, window: nav.browser,
      require: name => {
        if (name === 'react') return { useEffect: callback => effects.push(callback) };
        if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx };
        if (name === '@/components/forms/lead-form') return { LeadForm };
        if (name === '@/components/forms/contact-redirect') return load('components/forms/contact-redirect.tsx');
        if (name === '@/lib/lead-attribution') return load('lib/lead-attribution.ts');
        if (name === '@/lib/seo') return { buildMetadata: () => ({}) };
        if (name === '@/lib/utils') return { absoluteUrl: path => path };
        if (name === '@/data/subservice-production') return { productionServices: [
          { hero: { title: 'Smart Hands' }, sections: [{ navLabel: 'Support' }] },
        ] };
        if (name.endsWith('.module.css')) return { default: {} };
        return {};
      },
    });
    cache.set(path, mod.exports);
    return mod.exports;
  }
  function findForm(node) {
    if (!node || typeof node !== 'object') return undefined;
    if (node.type === LeadForm) return node.props;
    return [node.props?.children].flat(Infinity).map(findForm).find(Boolean);
  }
  return {
    ...nav,
    attribution: () => load('lib/lead-attribution.ts').consultationFormName(),
    redirect: destination => load('lib/lead-attribution.ts').redirectContactEnquiry(destination),
    async contact(query = {}) {
      const element = await load('app/contact/page.tsx').default({ searchParams: Promise.resolve(query) });
      const fallback = element.type(element.props);
      return { destination: element.props.destination, fallback, mount() { effects.splice(0).forEach(effect => effect()); } };
    },
    async consultation(query = {}) {
      return findForm(await load('app/book-consultation/page.tsx').default({ searchParams: Promise.resolve(query) }));
    },
  };
}

test('/contact hands off controlled history state, keeps queries/anchor, and redirects once', async () => {
  const h = harness();
  h.browser.history.replaceState({ __NA: true, routerState: 'preserved' }, '');
  const contact = await h.contact({ service: 'Smart Hands', section: 'Support', tag: ['a', 'b'],
    enquiryContext: ['consultation', 'contact'] });
  assert.equal(h.attribution(), 'consultation'); // Prefetch/render alone has no side effects.
  assert.equal(h.reloads(), 0);
  assert.equal(contact.fallback.type, 'noscript');
  assert.equal(contact.fallback.props.children.props.httpEquiv, 'refresh');
  assert.equal(contact.fallback.props.children.props.content, `0;url=${contact.destination}`);
  contact.mount();
  assert.equal(h.browser.location.pathname, '/book-consultation');
  assert.equal(h.browser.location.hash, '#project-enquiry');
  assert.equal(h.browser.location.searchParams.get('service'), 'Smart Hands');
  assert.equal(h.browser.location.searchParams.get('section'), 'Support');
  assert.deepEqual(h.browser.location.searchParams.getAll('tag'), ['a', 'b']);
  assert.equal(h.browser.location.searchParams.has('enquiryContext'), false);
  assert.equal(h.attribution(), 'contact');
  assert.equal(h.browser.history.state.routerState, 'preserved');
  assert.equal(h.reloads(), 1);
  h.redirect(contact.destination); // Strict Mode replay must not reload again.
  assert.equal(h.reloads(), 1);
  assert.equal(h.entries(), 1);
  const form = await h.consultation({ service: 'Smart Hands', section: 'Support' });
  assert.equal(form.context, 'consultation');
  assert.equal(form.attributeContactRedirect, true);
  assert.equal(form.initialService, 'Smart Hands');
  assert.equal(form.initialSection, 'Support');
});

for (const [name, marker] of [
  ['missing', undefined], ['invalid', 'invalid'], ['old contact marker', 'contact'],
  ['conflicting', ['consultation', 'contact']], ['repeated', ['contact', 'contact']],
]) {
  test(`contact ignores ${name} marker and uses the actual route`, async () => {
    const h = harness();
    const contact = await h.contact({ enquiryContext: marker });
    contact.mount();
    assert.equal(h.attribution(), 'contact');
    assert.equal(h.browser.location.search, '');
  });
  test(`direct consultation ignores ${name} marker`, async () => {
    const values = marker === undefined ? [] : Array.isArray(marker) ? marker : [marker];
    const params = new URLSearchParams(values.map(value => ['enquiryContext', value]));
    const h = harness(`https://example.com/book-consultation?${params}`);
    const form = await h.consultation({ enquiryContext: marker });
    assert.equal(form.attributeContactRedirect, true);
    assert.equal(h.attribution(), 'consultation');
  });
}

test('repeated service/section parameters are safely excluded from prefilling', async () => {
  const h = harness('https://example.com/book-consultation');
  const form = await h.consultation({ service: ['Smart Hands', 'Other'], section: ['Support', 'Other'] });
  assert.equal(form.initialService, undefined);
  assert.equal(form.initialSection, undefined);
});

test('copied/bookmarked URLs do not inherit history attribution, even in the same tab', async () => {
  const h = harness();
  (await h.contact()).mount();
  const url = h.browser.location.href;
  assert.equal(h.attribution(), 'contact');
  const otherTab = harness(url);
  assert.equal(otherTab.attribution(), 'consultation');
  const oldBookmark = harness(`${url.replace('#project-enquiry', '')}?enquiryContext=contact`);
  assert.equal(oldBookmark.attribution(), 'consultation');
  h.navigate(url);
  assert.equal(h.attribution(), 'consultation');
});

test('reload and back/forward restore attribution per entry without leaking it to a new navigation', async () => {
  const h = harness();
  (await h.contact()).mount();
  h.browser.location.reload();
  assert.equal(h.attribution(), 'contact');
  h.navigate('/book-consultation?enquiryContext=contact');
  assert.equal(h.attribution(), 'consultation');
  h.browser.history.back();
  assert.equal(h.attribution(), 'contact');
  h.browser.history.forward();
  assert.equal(h.attribution(), 'consultation');
  h.navigate('/industries/example');
  assert.equal(h.attribution(), 'consultation');
});

test('history state is tied to the exact destination and is ignored elsewhere', async () => {
  const h = harness();
  (await h.contact()).mount();
  h.browser.history.replaceState(h.browser.history.state, '', '/book-consultation?service=Other');
  assert.equal(h.attribution(), 'consultation');
  h.browser.history.replaceState(h.browser.history.state, '', '/contact');
  assert.equal(h.attribution(), 'consultation');
});

test('restricted history falls back to the existing form and consultation attribution', () => {
  const h = harness();
  h.browser.history.replaceState = () => { throw new Error('Restricted'); };
  h.redirect('/book-consultation#project-enquiry');
  assert.equal(h.browser.location.pathname, '/book-consultation');
  assert.equal(h.browser.location.hash, '#project-enquiry');
  assert.equal(h.attribution(), 'consultation');
});

test('handoff cannot target another origin or route', () => {
  for (const destination of ['https://other.example/book-consultation', '/other']) {
    const h = harness();
    h.redirect(destination);
    assert.equal(h.browser.location.pathname, '/contact');
    assert.equal(h.reloads(), 0);
  }
});
