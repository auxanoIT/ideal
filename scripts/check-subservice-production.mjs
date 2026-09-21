import fs from 'node:fs';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import path from 'node:path';
import ts from 'typescript';
const cache=new Map();
function load(filename) {
  filename=path.resolve(filename);
  if(cache.has(filename)) return cache.get(filename);
  const loaded={exports:{}};
  const native=createRequire(filename);
  const require=name=>name.startsWith('@/')?load(name.slice(2)+'.ts'):name.startsWith('.')&&!path.extname(name)?load(path.resolve(path.dirname(filename),name+'.ts')):native(name);
  const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
  new Function('require','module','exports',code)(require,loaded,loaded.exports);
  cache.set(filename,loaded.exports);return loaded.exports;
}
const {productionServices,contextualLinks,enquiryHref}=load('data/subservice-production.ts');
assert.equal(productionServices.length,29);
assert.equal(new Set(productionServices.map(p=>p.href)).size,29);
const routes=new Set([...productionServices.map(p=>p.href),...productionServices.map(p=>p.parentHref)]);
for(const [,href] of contextualLinks) assert(routes.has(href),href);
const escape=text=>text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#x27;');
for(const page of productionServices) {
  assert.equal(page.intro.cards.length,4);
  assert.equal(page.sections.length,4);
  assert.equal(page.faq.items.length,5);
  assert(fs.existsSync('public'+page.image.src),page.image.src);
  assert(!/SEO Setup|Visual direction|Primary Keyword|Long-Tail Keyword|Internal Linking Model|This gives Sub-Pillar/.test(JSON.stringify(page.sections)));
  const file=`.next/server/app${page.href}.html`;
  if(!process.argv.includes('--source-only')) {
    const html=fs.readFileSync(file,'utf8');
    const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
    assert(main,page.href+' main');
    assert.equal((main.match(/<h1\b/g)||[]).length,1,page.href+' H1');
    assert.equal((main.match(/<details\b/g)||[]).length,5,page.href+' FAQ');
    assert(html.includes(`<title>${escape(page.seoTitle)}</title>`),page.href+' metadata');
    assert(html.includes(`href="https://idealsolutions.com.ng${page.href}"`),page.href+' canonical');
    assert(html.includes('name="robots" content="index, follow"'),page.href+' indexing');
    assert(html.includes('"@type":"Service"')&&html.includes('"@type":"BreadcrumbList"'),page.href+' schema');
    assert(!main.includes('Auxano'),page.href+' visible branding');
    assert(main.includes(`href="${page.parentHref}"`),page.href+' parent link');
    assert(main.includes(escape(enquiryHref(page.hero.title))),page.href+' enquiry');
    for(const section of page.sections) {
      assert(main.includes(`id="${section.id}"`),page.href+' anchor target');
      assert(main.includes(`href="#${section.id}"`),page.href+' anchor link');
      // Strip inline links to verify every supplied sentence remains public.
      const text=main.replace(/<[^>]+>/g,'');
      for(const line of [section.title,section.lead,...section.body]) assert(text.includes(escape(line.replace(/^•\s*/,''))),page.href+' missing copy: '+line);
    }
    for(const item of page.faq.items) for(const line of [item.title,...item.body]) assert(main.includes(escape(line)),page.href+' FAQ copy');
    for(const match of main.matchAll(/href="(\/services\/[^"?#]+)"/g)) assert(routes.has(match[1])||match[1]==='/services',page.href+' unknown link '+match[1]);
  }
}
// Test delivery acknowledgements with stubs: this sends NO real enquiry.
const apiCode=ts.transpileModule(fs.readFileSync('app/api/lead/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText;
for(const [hubspot,email,expected] of [[true,false,200],[false,true,200],[false,false,503]]) {
  const loaded={exports:{}};
  const require=name=>name==='next/server'?{NextResponse:{json:(value,init)=>Response.json(value,init)}}:name.endsWith('schemas')?{leadSchema:{safeParse:data=>({success:true,data})}}:{verifyTurnstile:async()=>true,submitToHubSpot:async()=>hubspot,sendFallbackEmail:async()=>email,buildHubSpotConsentOptions:()=>({}),getRequestIpAddress:()=>''};
  new Function('require','module','exports',apiCode)(require,loaded,loaded.exports);
  const response=await loaded.exports.POST(new Request('https://example.test/api/lead',{method:'POST',body:JSON.stringify({name:'Test',company:'Test',email:'test@example.test',phone:'000000',serviceInterest:'Test',message:'Local mocked test only',context:'contact'})}));
  assert.equal(response.status,expected);
}
console.log('PASS: 29 unique service pages, copy/structure/routes, and 3 mocked enquiry-delivery outcomes'+(process.argv.includes('--source-only')?' (source checks).':'; built HTML, metadata, schema, FAQs and canonicals verified.'));
