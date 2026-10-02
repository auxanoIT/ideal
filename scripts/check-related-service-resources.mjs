// Local fixture tests: never create or publish test documents in Sanity.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const ts=require('typescript');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const cache=new Map();
function load(filename) {
  const absolute=path.resolve(filename);
  if(cache.has(absolute)) return cache.get(absolute).exports;
  const loadedModule={exports:{}};
  cache.set(absolute,loadedModule);
  const source=fs.readFileSync(absolute,'utf8');
  const compiled=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.CommonJS,esModuleInterop:true}}).outputText;
  const localRequire=id=>{
    if(id.endsWith('.module.css')) return {__esModule:true,default:new Proxy({},{get:(_,key)=>key})};
    if(id==='next/image') return {__esModule:true,default:({src,alt,sizes})=>React.createElement('img',{src,alt,sizes,style:{position:'absolute',width:'100%',height:'100%'}})};
    if(id==='next/link') return {__esModule:true,default:({href,children,...props})=>React.createElement('a',{href,...props},children)};
    if(id.startsWith('.')||id.startsWith('@/')) {
      const base=id.startsWith('@/')?path.resolve(id.slice(2)):path.resolve(path.dirname(absolute),id);
      if(base.endsWith('.json')) return require(base);
      const file=['','.ts','.tsx'].map(extension=>base+extension).find(candidate=>fs.existsSync(candidate)&&fs.statSync(candidate).isFile());
      return load(file);
    }
    return require(id);
  };
  new Function('require','module','exports',compiled)(localRequire,loadedModule,loadedModule.exports);
  return loadedModule.exports;
}
const {serviceResourceClusters,resourceClusterForHref}=load('data/service-resource-clusters.ts');
const production=require('../data/subservice-production.json');
const {capabilityHref}=load('data/service-pillars.ts');
assert.equal(new Set(serviceResourceClusters.map(c=>c.value)).size,serviceResourceClusters.length);
for(const page of production) assert.ok(resourceClusterForHref(capabilityHref(page.proposedHref)));
assert.equal(resourceClusterForHref('/services/data-centre-deployment/rack-and-stack').title,'Rack & Stack');
const {RelatedServiceResources}=load('components/services/related-service-resources.tsx');
const fixtures=Array.from({length:6},(_,index)=>({title:`Rack planning article ${index+1}`,slug:`rack-planning-${index+1}`,publishedAt:'2026-10-01',coverImage:{src:'/image/service-pillars/data-centre-rack-and-stack-deployment-nigeria.webp',alt:`Installation photo ${index+1}`}}));
const render=count=>renderToStaticMarkup(React.createElement(RelatedServiceResources,{title:'Rack & Stack',posts:fixtures.slice(0,count)}));
assert.equal(render(0),'');
for(const count of [1,2,3,4,5,6]) {
  const html=render(count);
  assert.equal((html.match(/<li /g)||[]).length,count);
  assert.ok(html.includes('Related Rack &amp; Stack Resources'));
  assert.ok(html.includes('href="/blog/rack-planning-1"'));
  assert.ok(html.includes('alt="Installation photo 1"'));
}
console.log(`Rendering and registry checks passed for ${production.length} production services and 0–6 articles.`);
const {parse,evaluate}=require('groq-js');
const querySource=fs.readFileSync('sanity/lib/queries.ts','utf8');
const query=querySource.match(/export const blogPostsByRelatedServiceQuery = groq`([\s\S]*?)`;/)[1];
const relatedService='data-centre-deployment/rack-and-stack';
const doc=(id,service,date)=>({_id:id,_type:'post',title:id,slug:{current:id},relatedService:service,publishedAt:date,body:[{text:'Must not be fetched'}]});
const result=await (await evaluate(parse(query),{params:{relatedService},dataset:[
  doc('older',relatedService,'2026-09-01'),doc('newer',relatedService,'2026-10-01'),
  doc('unrelated','another-service','2026-10-02'),doc('unassigned',undefined,'2026-10-02'),
  doc('drafts.secret',relatedService,'2026-10-03'),doc('versions.release.secret',relatedService,'2026-10-03'),
]})).get();
assert.deepEqual(result.map(post=>post.title),['newer','older']);
assert.ok(result.every(post=>!('body' in post)));
console.log('Query checks passed: exact service match, newest first, no drafts/versions or full bodies.');
if(process.argv.includes('--browser')) {
  const {chromium}=require(path.join(os.tmpdir(),'ideal-solutions-browser-qa/node_modules/playwright-core'));
  const browser=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
  try {
    for(const width of [320,390,768,1024,1440]) {
      const page=await browser.newPage({viewport:{width,height:900}});
      // Use only local assets; no analytics or external service requests.
      await page.route('**/*',route=>route.abort());
      for(const count of [0,1,2,3,4,5,6]) {
        await page.setContent(`<style>*{box-sizing:border-box}body{margin:0;font-family:Arial}a{text-decoration:none}${fs.readFileSync('components/services/related-service-resources.module.css','utf8')}</style>${render(count)}`);
        assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
        if(!count) continue;
        const geometry=await page.evaluate(()=>{
          const track=document.querySelector('.track');
          const items=[...document.querySelectorAll('.item')];
          return {sameRow:items.every(item=>item.offsetTop===items[0].offsetTop),scrolls:track.scrollWidth>track.clientWidth};
        });
        assert.ok(geometry.sameRow);
        if(width===1440) assert.equal(geometry.scrolls,count>4);
        if(width<600&&count>1) assert.ok(geometry.scrolls);
      }
      await page.close();
    }
    console.log('Responsive layout passed at 320, 390, 768, 1024 and 1440px for 0–6 articles.');
  } finally {await browser.close();}
}
