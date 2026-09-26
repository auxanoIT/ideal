import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';

const base = process.env.QA_BASE_URL || 'http://localhost:3000';
const decode = value => value.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const xml = await fetch(`${base}/sitemap.xml`).then(async response => { assert.equal(response.status, 200); return response.text(); });
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => ({
  url: decode(match[1].match(/<loc>(.*?)<\/loc>/)[1]),
  images: [...match[1].matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(image => decode(image[1])),
}));
assert(entries.length > 30);
assert.equal(new Set(entries.map(entry => entry.url)).size, entries.length, 'Duplicate canonical pages');
const failures = [];
let totalImages = 0;
for (const entry of entries) {
  assert.equal(new URL(entry.url).origin, 'https://idealsolutions.com.ng');
  assert(!/\/(sanity|studio)(\/|$)/.test(new URL(entry.url).pathname));
  assert.equal(new Set(entry.images).size, entry.images.length);
  for (const image of entry.images) {
    totalImages++;
    const url = new URL(image);
    if (url.origin === 'https://idealsolutions.com.ng' && !existsSync(path.join('public', decodeURIComponent(url.pathname)))) failures.push(image);
  }
}
assert.deepEqual(failures, [], 'Missing local sitemap images');
for (const pathname of ['/about', '/services/data-centre-deployment', '/services/data-centre-deployment/rack-and-stack', '/industries/data-centres', '/blog', '/careers']) {
  const response = await fetch(base + pathname);
  assert.equal(response.status, 200, pathname);
  const html = await response.text();
  const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
  assert.equal(canonical?.[1], 'https://idealsolutions.com.ng' + pathname, `Canonical: ${pathname}`);
  assert(html.includes('name="description"'), `Description: ${pathname}`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1: ${pathname}`);
  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(script[1]);
    assert(!JSON.stringify(data).includes('Auxano'), `Old brand in schema: ${pathname}`);
  }
  console.log('SEO OK:', pathname);
}
console.log(`Sitemap OK: ${entries.length} canonical pages, ${totalImages} page-image entries, ${new Set(entries.flatMap(entry => entry.images)).size} unique images.`);
