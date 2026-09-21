// One-time, deterministic conversion of the supplied editorial brief to page data.
// Run with: node scripts/import-service-pillars.mjs <path-to-pillar.md>
import fs from 'node:fs';
import assert from 'node:assert/strict';

const raw = fs.readFileSync(process.argv[2], 'utf8');
const clean = (s) => s.trim().replace(/^#+\s*/, '').replace(/\*\*/g, '').replace(/`/g, '').replace(/\\([.\-[\]#])/g, '$1').trim();
const tokens = raw.split(/\r?\n/).filter(s => s.trim() && !/^[—-]{3,}/.test(s.trim())).map(s => ({text: clean(s), level: s.trim().match(/^#+/)?.[0].length || (s.trim().startsWith('**') ? 3 : 0), bullet: /^\* /.test(s.trim())}));
const starts = tokens.flatMap((t,i) => /^Pillar \d/.test(t.text) ? [i] : []);
const groups = (lines, level) => {
  const indices = lines.flatMap((t,i) => t.level === level ? [i] : []);
  return indices.map((i,n) => ({title:lines[i].text, lines:lines.slice(i+1,indices[n+1] ?? lines.length)}));
};
const prose = lines => lines.filter(t => !t.level && !t.text.startsWith('/') && !/^(Target|No button|This is a shared|Keep this|Again, use|Use the|This should|Each block|This becomes)/i.test(t.text)).map(t => t.text);
const details = lines => {
  const stop = lines.findIndex(t => /^(CTA:|Target:?|Target URL:)/i.test(t.text));
  return prose(stop < 0 ? lines : lines.slice(0,stop));
};
const output = starts.map((start,number) => {
  const all = tokens.slice(start,starts[number+1] ?? tokens.length);
  const nextValue = name => all[all.findIndex(t=>t.text.toLowerCase()===name.toLowerCase())+1].text;
  const section = n => {
    const i = all.findIndex(t=>new RegExp(`^Section ${n} `).test(t.text));
    const end = all.findIndex((t,j)=>j>i && /^Section \d /.test(t.text));
    return all.slice(i+1,end<0?all.length:end);
  };
  const headlineIndex = lines => lines.findIndex(t => t.level===1 && !/^(Please check|Section|Hero)/.test(t.text));
  const main = n => {const lines=section(n); return lines.slice(headlineIndex(lines));};
  const heroStart=all.findIndex(t=>/^Hero Section/.test(t.text));
  const hero=all.slice(heroStart+1,all.findIndex(t=>/^Section 2 /.test(t.text)));
  const hi=headlineIndex(hero);
  const intro=main(2), benefits=main(3), caps=main(4), live=main(5), audiences=main(6), scenarios=main(7), related=main(8), faq=section(9);
  const ready=section(2); const ei=ready.findIndex(t=>t.text.startsWith('Eyebrow'));
  const eyebrow=ready[ei].text.includes(':')?ready[ei].text.split(':').slice(1).join(':').trim():ready[ei+1].text;
  const firstBenefit=benefits.findIndex(t=>t.level===3);
  const right=live.findIndex(t=>/^Right[- ]side benefits$/i.test(t.text));
  const liveOverlay=live.slice(1,right).filter(t=>t.level===1).map(t=>t.text).join(' ');
  const makeItem=({title,lines})=>({title,body:details(lines)});
  const capabilities=groups(caps.slice(1),2).map(({title,lines})=>({
    title, lead:lines.find(t=>t.level===3)?.text ?? '', body:details(lines),
    cta:lines[lines.findIndex(t=>t.text==='CTA:')+1]?.text,
    href:lines.find(t=>t.text.startsWith('/services/'))?.text.replace(/\/$/,'')
  }));
  const audienceItems=number===0?audiences.filter(t=>t.bullet).map(t=>({title:t.text.slice(2),body:[]})):groups(audiences.slice(1),3).filter(g=>g.title!=='Target:').map(makeItem);
  // Target labels are bold as well; include them in their original group for parsing.
  const faqTitle=faq.find(t=>t.text.includes('Questions, Answered')).text;
  const faqStart=faq.findIndex(t=>t.text===faqTitle);
  const faqItems=groups(faq.slice(faqStart+1),number===0?2:3).map(makeItem);
  const result={slug:nextValue('Recommended URL').split('/')[2],title:all[0].text.replace(/^Pillar \d — /,''),seoTitle:nextValue('SEO Title'),description:nextValue('Meta Description'),keywords:[nextValue('Primary Keyword'),...nextValue('Secondary Keyword Themes').replace(/\.$/,'').split(/, */)],
    hero:{title:hero[hi].text,body:prose(hero.slice(hi+1,hero.findIndex(t=>t.text==='Primary CTA:'))),primaryCta:hero[hero.findIndex(t=>t.text==='Primary CTA:')+1].text,secondaryCta:hero[hero.findIndex(t=>t.text==='Secondary CTA:')+1].text},
    intro:{eyebrow,title:intro[0].text,body:prose(intro.slice(1,intro.findIndex(t=>t.level===3))),items:groups(intro.slice(1),3).map(makeItem)},
    benefits:{title:benefits[0].text,body:prose(benefits.slice(1,firstBenefit)),items:groups(benefits.slice(firstBenefit),3).map(makeItem)},
    capabilities:{title:caps[0].text,items:capabilities},
    live:{title:live[0].text,overlay:liveOverlay,items:groups(live.slice(right+1),3).map(makeItem)},
    audience:{title:audiences[0].text,items:audienceItems},
    scenarios:{title:scenarios[0].text,items:groups(scenarios.slice(1),number===0?2:3).map(makeItem)},
    related:{title:related[0].text,items:groups(related.slice(1).map(t=>/^(Explore|Target)/.test(t.text)?{...t,level:0}:t),number===0?3:2).map(({title,lines})=>({title,body:details(lines).filter(t=>!t.startsWith('Explore')),cta:lines.find(t=>t.text.startsWith('Explore'))?.text,href:lines.find(t=>t.text.startsWith('/services/'))?.text.replace(/\/$/,'')}))},
    faq:{title:faqTitle,items:faqItems}
  };
  return result;
});
assert.equal(output.length,7);
for(const p of output){
  assert.equal(p.intro.items.length,4,p.slug+' intro');
  assert.equal(p.benefits.items.length,5,p.slug+' benefits');
  assert.equal(p.live.items.length,4,p.slug+' live');
  assert.equal(p.related.items.length,4,p.slug+' related');
  assert(p.related.items.every(i=>i.href&&i.cta),p.slug+' related links');
  assert(p.capabilities.items.every(i=>i.href&&i.cta&&i.body.length),p.slug+' capabilities');
  assert(p.faq.items.length>=8,p.slug+' faq');
}
fs.writeFileSync('data/service-pillars-content.json',JSON.stringify(output,null,2)+'\n');
console.log(output.map(p=>({slug:p.slug,capabilities:p.capabilities.items.length,audiences:p.audience.items.length,scenarios:p.scenarios.items.length,faq:p.faq.items.length})));
