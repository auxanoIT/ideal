import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import ts from 'typescript';

const cache=new Map();
function load(relative) {
  const filename=path.resolve(relative);
  if(cache.has(filename)) return cache.get(filename);
  const loadedModule={exports:{}};
  cache.set(filename,loadedModule.exports);
  const code=ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,esModuleInterop:true,target:ts.ScriptTarget.ES2022}}).outputText;
  const nativeRequire=createRequire(filename);
  const localRequire=name=>name.startsWith('@/')?(name.endsWith('.json')?nativeRequire(path.resolve(name.slice(2))):load(name.slice(2)+'.ts')):name.startsWith('.')&&!path.extname(name)?load(path.resolve(path.dirname(filename),name+'.ts')):nativeRequire(name);
  new Function('require','module','exports',code)(localRequire,loadedModule,loadedModule.exports);
  cache.set(filename,loadedModule.exports);
  return loadedModule.exports;
}
const {servicePillars,capabilityPages,summaryCapabilityPages,capabilityHref,capabilityImage,audienceHref}=load('data/service-pillars.ts');
const {productionServices}=load('data/subservice-production.ts');
const navigation=Object.fromEntries(servicePillars.map(p=>[p.categoryId,p.capabilities.items.map(item=>({title:item.title,href:capabilityHref(item.href),image:capabilityImage(item.href,p)}))]));
if(process.argv.includes('--refresh-navigation')) fs.writeFileSync('data/service-pillar-navigation.json',JSON.stringify(navigation,null,2)+'\n');
assert.deepEqual(JSON.parse(fs.readFileSync('data/service-pillar-navigation.json','utf8')),navigation,'Regenerate lightweight navigation after changing pillar routes: --refresh-navigation');
const {services,solutionCategories}=load('data/solution-catalog.ts');
const {getSolutionMenuServices}=load('data/solution-menu.ts');
const existingSlugs=new Set(services.map(s=>s.slug));
const allPaths=new Set(['/','/contact','/services','/industries/financial-services',...services.map(s=>`/services/${s.slug}`),...servicePillars.map(p=>`/services/${p.slug}`),...capabilityPages.map(p=>p.href)]);
assert.equal(servicePillars.length,7);
assert.equal(new Set(servicePillars.map(p=>p.slug)).size,7);
const seenShared=new Map();
for (const [index,p] of servicePillars.entries()) {
  assert.equal(p.intro.items.length,4);
  assert.equal(p.benefits.items.length,5);
  assert.equal(p.liveCopy.items.length,4);
  assert.equal(p.related.items.length,4);
  assert.equal(p.faq.items.length,index===0?8:9);
  assert.equal(p.capabilities.items.length,[5,3,4,8,6,3,4][index]);
  assert.equal(p.scenarios.items.length,index===0?6:8);
  assert(p.heroCopy.title && p.seoTitle.endsWith('| Ideal Solutions') && p.description);
  assert(!/PLACEHOLDER|Follow the same|Use the same|This becomes|This should be|No button|Target URL|Hero visual|Possible small tags|https?:\/\//i.test(JSON.stringify(p)),p.slug+' editorial instructions leaked');
  for(const image of [p.hero,p.live,...p.capabilities.items.map(item=>capabilityImage(item.href,p))]) assert(fs.existsSync(path.join('public',image.src)),image.src);
  for(const item of p.capabilities.items) {
    const href=capabilityHref(item.href),leaf=item.href.split('/').at(-1);
    assert(allPaths.has(href),href);
    if(seenShared.has(leaf)) assert.equal(href,seenShared.get(leaf));
    seenShared.set(leaf,href);
  }
  for(const item of p.related.items) assert(allPaths.has(item.href),item.href);
  for(const item of p.audience.items) {const href=audienceHref(item.title);if(href) assert(allPaths.has(href));}
  const category=solutionCategories.find(c=>c.id===p.categoryId);
  assert.equal(category.href,`/services/${p.slug}`);
  assert.deepEqual(getSolutionMenuServices(category,services).map(s=>s.menuHref),p.capabilities.items.map(i=>capabilityHref(i.href)));
}
for(const page of capabilityPages.filter(p=>!p.isSummary)) assert(existingSlugs.has(page.href.split('/').at(-1)),page.href);

const base=process.env.PILLAR_TEST_URL;
if(base) {
  const sitemap=await fetch(`${base}/sitemap.xml`).then(r=>r.text());
  for(const p of servicePillars) {
    const res=await fetch(`${base}/services/${p.slug}`);
    assert.equal(res.status,200,p.slug);
    const html=await res.text();
    assert.equal((html.match(/<h1\b/g)||[]).length,1,p.slug+' H1 count');
    assert(html.includes(p.seoTitle.replace(/&/g,'&amp;')),p.slug+' SEO title');
    assert(html.includes('name="robots" content="index, follow"'),p.slug+' robots');
    assert(html.includes('rel="canonical"'),p.slug+' canonical');
    assert(html.includes('"@type":"BreadcrumbList"'),p.slug+' breadcrumb schema');
    assert(html.includes('"@type":"Service"'),p.slug+' service schema');
    assert(!html.includes('"@type":"FAQPage"'),p.slug+' obsolete FAQ rich result schema');
    const visible=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
    assert(visible.includes(p.faq.items.at(-1).title.replace(/&/g,'&amp;')),p.slug+' SSR FAQ');
    assert(sitemap.includes(`/services/${p.slug}</loc>`),p.slug+' sitemap');
  }
  for(const page of summaryCapabilityPages) {
    const res=await fetch(base+page.href);
    assert.equal(res.status,200,page.href);
    const html=await res.text();
    const completed=productionServices.some(item=>item.href===page.href);
    assert(html.includes(`name="robots" content="${completed?'index':'noindex'}, follow"`),page.href+' robots');
    assert.equal((html.match(/<h1\b/g)||[]).length,1);
    assert.equal(sitemap.includes(page.href+'</loc>'),completed,page.href+' sitemap status');
  }
  for(const page of capabilityPages.filter(p=>!p.isSummary)) {
    const res=await fetch(base+page.href);
    assert.equal(res.status,200,page.href);
    const html=await res.text();
    const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]?.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,'');
    assert(main && !/Auxano/i.test(main),page.href+' visible brand copy');
    assert.equal((html.match(/<h1\b/g)||[]).length,1,page.href+' H1 count');
    assert(html.includes(`/services/${page.pillar.slug}`),page.href+' parent link');
  }
  console.log('HTTP checks passed: all pillar pages, summary pages, SSR content, schema and sitemap.');
}
console.log(`PASS: 7 pillars, ${capabilityPages.length} unique capabilities (${capabilityPages.length-summaryCapabilityPages.length} existing, ${summaryCapabilityPages.length} summaries), shared routes and menu links.`);
if(process.argv.includes('--report')) {
  const rows=servicePillars.flatMap(p=>p.capabilities.items.map(i=>`| ${p.title} | ${i.title} | ${capabilityHref(i.href)} | ${capabilityHref(i.href).split('/').length===4?'Summary — full copy pending':'Existing canonical page retained'} |`));
  fs.writeFileSync('docs/service-pillar-route-audit.md',`# Ideal Solutions service route audit\n\nThe original 32 service URLs are preserved. Matching full service pages are reused and rebranded; missing, distinct service intents receive concise supplied-copy summaries. Summary pages are noindex/follow and excluded from the sitemap until full copy is approved. No legacy routes were moved or deleted. Trailing slashes follow the existing Next.js policy (canonical URLs have no trailing slash).\n\n| Pillar | Capability | Canonical destination | Status |\n| --- | --- | --- | --- |\n${rows.join('\n')}\n\n## Full sub-service copy still needed\n\n${summaryCapabilityPages.map(p=>`- [${p.item.title}](${p.href})`).join('\n')}\n\n## Industry pages pending\n\nOnly the existing financial-services page is linked from matching Banks/Fintech cards. Data centre operators, operations teams, enterprise IT, OEMs, system integrators, MSPs, international teams, telecoms and project/procurement audiences remain readable cards without invented destinations. Their specialised industry pages can be developed separately.\n`);
}
