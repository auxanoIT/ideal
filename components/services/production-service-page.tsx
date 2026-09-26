import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/ui/json-ld';
import { SubserviceHero } from './subservice-hero';
import { SubserviceSectionNav } from './subservice-section-nav';
import { contextualLinks, enquiryHref, productionSectionImages, type ProductionService } from '@/data/subservice-production';
import { absoluteUrl } from '@/lib/utils';
import type { ServiceNavMedia } from '@/lib/types';
import styles from './production-service-page.module.css';

// Keep the handover section focused on delivery, not repeated cross-selling copy.
function deliveryBody(lines: string[]) {
  return lines.filter(line => !(/^(For |Where )/.test(line) && contextualLinks.some(([label]) => line.includes(label))));
}

export function productionMetadata(page: ProductionService): Metadata {
  return {title:{absolute:page.seoTitle},description:page.description,alternates:{canonical:absoluteUrl(page.href)},robots:{index:true,follow:true},openGraph:{title:page.seoTitle,description:page.description,url:absoluteUrl(page.href),siteName:'Ideal Solutions',type:'website',images:[{url:absoluteUrl(page.image.src),alt:page.image.alt}]},twitter:{card:'summary_large_image',title:page.seoTitle,description:page.description,images:[absoluteUrl(page.image.src)]}};
}

function LinkedCopy({text,current}: {text:string;current:string}) {
  const nodes: ReactNode[]=[];
  let rest=text;
  while(rest) {
    const matches=contextualLinks.filter(([,href])=>href!==current).map(([label,href])=>({label,href,index:rest.indexOf(label)})).filter(item=>item.index>=0).sort((a,b)=>a.index-b.index || b.label.length-a.label.length);
    const match=matches[0];
    if(!match) {nodes.push(rest);break;}
    nodes.push(rest.slice(0,match.index));
    nodes.push(<Link key={nodes.length} href={match.href}>{match.label}</Link>);
    rest=rest.slice(match.index+match.label.length);
  }
  return <>{nodes}</>;
}

function Body({lines,current}: {lines:string[];current:string}) {
  const blocks: {list:boolean;lines:string[]}[]=[];
  for(const line of lines) {
    const list=line.startsWith('•');
    if(list && blocks.at(-1)?.list) blocks.at(-1)!.lines.push(line.replace(/^•\s*/,''));
    else blocks.push({list,lines:[line.replace(/^•\s*/,'')]});
  }
  return <>{blocks.map((block,index)=>block.list?<ul key={index}>{block.lines.map(line=><li key={line}><LinkedCopy text={line} current={current}/></li>)}</ul>:<p key={index}><LinkedCopy text={block.lines[0]} current={current}/></p>)}</>;
}

export function ProductionServicePage({page,images=[]}: {page:ProductionService;images?:ServiceNavMedia[]}) {
  const crumbs=[{name:'Home',href:'/'},{name:'Solutions',href:'/services'},{name:page.parentTitle,href:page.parentHref},{name:page.hero.title,href:page.href}];
  // Existing assets are illustrative, never presented as verified customer work.
  const visuals=productionSectionImages(page,images);
  return <div className={styles.page}>
    <JsonLd data={[{'@context':'https://schema.org','@type':'Service',name:page.hero.title,description:page.description,url:absoluteUrl(page.href),provider:{'@id':`${absoluteUrl('/')}#organization`},areaServed:{'@type':'Country',name:'Nigeria'}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:crumbs.map((crumb,index)=>({'@type':'ListItem',position:index+1,name:crumb.name,item:absoluteUrl(crumb.href)}))}]} />
    <SubserviceHero title={page.hero.title} description={page.hero.description} image={page.image} parent={{title:page.parentTitle,href:page.parentHref}} href={page.href} copy={page.hero} introduction={page.intro} enquiryUrl={enquiryHref(page.hero.title)} />
    <SubserviceSectionNav title={page.hero.title} sections={page.sections.map(({id,navLabel})=>({id,navLabel}))} />
    <div className={styles.sections}>{page.sections.map((section,index)=>{
      const image=visuals[index%visuals.length];
      return <section className={styles.section} id={section.id} key={section.id} aria-labelledby={`${section.id}-title`}>
        <figure className={styles.visual}><div><Image src={image.src} alt={image.alt} fill sizes="(min-width:1024px) 43vw, 92vw" quality={80} className={styles.photo}/></div></figure>
        <div className={styles.copy}><h2 id={`${section.id}-title`}>{section.title}</h2><p className={styles.lead}>{section.lead}</p><Body lines={index === 3 ? deliveryBody(section.body) : section.body} current={page.href}/><Link className={styles.button} href={enquiryHref(page.hero.title,section.navLabel)}>{section.cta}<span aria-hidden="true">↗</span></Link></div>
      </section>;
    })}</div>
    <section className={styles.faq} aria-labelledby="service-faq-title"><div><h2 id="service-faq-title">{page.faq.title}</h2><div>{page.faq.items.map(item=><details key={item.title}><summary>{item.title}<span aria-hidden="true">+</span></summary><div>{item.body.map(line=><p key={line}>{line}</p>)}</div></details>)}</div></div></section>
    <section className={styles.closing}><h2>{page.closing.title}</h2><p>{page.closing.body}</p><Link className={styles.button} href={enquiryHref(page.hero.title)}>{page.closing.cta}<span aria-hidden="true">↗</span></Link><Link className={styles.parent} href={page.parentHref}>Explore {page.parentTitle} →</Link></section>
  </div>;
}
