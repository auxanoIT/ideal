import fs from 'node:fs';
import assert from 'node:assert/strict';
const base=process.env.SUBSERVICE_TEST_URL ?? 'http://127.0.0.1:3106';
const nav=JSON.parse(fs.readFileSync('data/service-pillar-navigation.json','utf8'));
const routes=[...new Set(Object.values(nav).flat().map(item=>item.href))];
assert.equal(routes.length,29);
const sitemap=await fetch(base+'/sitemap.xml').then(r=>r.text());
for(const route of routes) {
  const response=await fetch(base+route);
  assert.equal(response.status,200,route);
  const html=await response.text();
  assert.equal((html.match(/<h1\b/g)||[]).length,1,route);
  assert(sitemap.includes(`https://idealsolutions.com.ng${route}</loc>`),route+' sitemap');
}
const service='Data Centre Rack-and-Stack Services';
const query=new URLSearchParams({service,section:'Rack Planning'});
const contact=await fetch(`${base}/contact?${query}`).then(r=>r.text());
assert(contact.includes(`selected="" value="${service}"`)||contact.includes(`value="${service}" selected=""`),'Service preselection');
assert(contact.includes('I would like to discuss rack planning.'),'Section context');
assert(contact.includes('id="project-enquiry"'),'Enquiry anchor');
const invalid=await fetch(`${base}/contact?service=Unknown&section=Unknown`).then(r=>r.text());
assert(!invalid.includes('I would like to discuss unknown.'),'Unknown query is not accepted as context');
console.log('PASS: all 29 service routes return 200, sitemap uses Ideal Solutions, contact service/section preselection works, invalid context ignored. No enquiries submitted.');
