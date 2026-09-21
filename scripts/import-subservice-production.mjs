import fs from 'node:fs';
import assert from 'node:assert/strict';

// Mechanical import of the user's production copy. Editorial instructions never
// enter the public payload. Re-run only when a replacement brief is approved.
const source = fs.readFileSync(process.argv[2], 'utf8').replace(/\r/g, '');
const clean = text => text.split('\n').map(line => line.trim()).filter(line => line && !/^_{5,}$/.test(line));
const groups = source.split(/(?=Ideal Solutions — Pillar \d Sub-Service Production Copy)/).filter(group => group.startsWith('Ideal Solutions — Pillar'));
assert.equal(groups.length, 7);
const pages = [];
for (const group of groups) {
  const parentTitle = group.match(/Parent Pillar\n([^\n]+)/)[1].trim();
  const parentHref = group.match(/Parent URL:\n([^\n]+)/)[1].trim().replace(/\/$/, '');
  const closingMatch = group.match(/Shared Closing Section\n([^\n]+)\n([^\n]+)\nCTA:\n([^\n]+)/);
  const closing = closingMatch ? {title:closingMatch[1],body:closingMatch[2],cta:closingMatch[3]} : {title:'Your technical direction. Our onsite execution.',body:'Based in Ikeja, Lagos, supporting infrastructure projects across Nigeria.',cta:'Discuss Your Requirements'};
  for (const match of group.matchAll(/^PAGE \d+ —[^\n]+\n([\s\S]*?)(?=^PAGE \d+ —|^Internal Linking Model|^Shared Internal-Linking Model|^EXISTING SHARED SERVICE|$(?![\s\S]))/gm)) {
    const block = match[1];
    if (!block.includes('SEO Setup')) continue;
    const field = label => block.match(new RegExp(`${label}\\n([^\\n]+)`))?.[1].trim();
    const sections = [...block.matchAll(/^([1-8])\. [^\n]+\n([\s\S]*?)(?=^\d\. |^_{5,}\n(?:PAGE|Internal|Shared|EXISTING)|$(?![\s\S]))/gm)];
    const part = number => clean(sections.find(s => +s[1]===number)?.[2] ?? '');
    const hero = part(1), intro = part(2), nav = part(3);
    const details = [4,5,6,7].map((number,index) => {
      const lines = part(number), ctaIndex=lines.indexOf('CTA:');
      assert(ctaIndex>2, `${field('Recommended URL')} section ${number}`);
      return {id:nav[index].toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/-$/,''),navLabel:nav[index],title:lines[0],lead:lines[1],body:lines.slice(2,ctaIndex),cta:lines[ctaIndex+1]};
    });
    const faqLines=part(8), questions=[];
    for (const line of faqLines.slice(1)) {
      if(line.endsWith('?')) questions.push({title:line,body:[]});
      else if(questions.length) questions.at(-1).body.push(line);
    }
    assert.equal(intro.length,9,field('Recommended URL')+' intro');
    assert.equal(nav.length,4);
    assert.equal(questions.length,5,field('Recommended URL')+' FAQ');
    assert(questions.every(q=>q.body.length));
    pages.push({proposedHref:field('Recommended URL').replace(/\/$/,''),parentTitle,parentHref,seoTitle:field('SEO Title'),description:field('Meta Description'),hero:{title:hero[0],description:hero[1],cta:hero[hero.indexOf('CTA:')+1]},intro:{title:intro[0],cards:[0,1,2,3].map(i=>({title:intro[1+i*2],body:intro[2+i*2]}))},sections:details,faq:{title:faqLines[0],items:questions},closing});
  }
}
assert.equal(pages.length,29);
assert(!/Visual direction|SEO Setup|Internal Linking Model|Primary Keyword/.test(JSON.stringify(pages)));
fs.writeFileSync('data/subservice-production.json',JSON.stringify(pages,null,2)+'\n');
console.log(`Imported ${pages.length} pages: 116 sections, 116 intro cards, 145 FAQs.`);
