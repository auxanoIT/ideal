import assert from 'node:assert/strict';

const base = process.env.QA_BASE_URL || 'http://localhost:3001';
const legacyBrand = /auxano|auxanosolutions\.net/i;
const sitemap = await fetch(base + '/sitemap.xml').then(response => {
  assert.equal(response.status, 200);
  return response.text();
});
assert.ok(!legacyBrand.test(sitemap), 'Legacy branding in sitemap');
const paths = [...new Set([
  '/', '/book-consultation', '/terms',
  ...[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname),
])];
let next = 0;
const failures = [];
await Promise.all(Array.from({length: 3}, async () => {
  while (next < paths.length) {
    const pathname = paths[next++];
    try {
      const response = await fetch(base + pathname);
      assert.equal(response.status, 200, pathname);
      const html = await response.text();
      // Exclude executable code/flight data, but retain SEO JSON-LD for inspection.
      const schema = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
        .map(match => match[1]).join('\n');
      const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
        .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
      assert.ok(!legacyBrand.test(markup + schema), `Legacy branding in page, metadata or schema: ${pathname}`);
    } catch (error) { failures.push(error.message); }
  }
}));
assert.deepEqual(failures, []);
console.log(`Ideal Solutions branding passed: ${paths.length} pages, including metadata, image attributes, structured data and sitemap.`);
