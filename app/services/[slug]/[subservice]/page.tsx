import type { Metadata } from "next";
import { SubserviceHero } from "@/components/services/subservice-hero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { ServiceCapabilityFlow } from "@/components/sections/service-capability-flow";
import { summaryCapabilityPages, capabilityImage, capabilityPages } from "@/data/service-pillars";
import type { Service } from "@/lib/types";
import { absoluteUrl } from "@/lib/utils";
import { productionServiceAt } from "@/data/subservice-production";
import { ProductionServicePage, productionMetadata } from "@/components/services/production-service-page";

type Props = { params: Promise<{ slug: string; subservice: string }> };
export const dynamicParams = false;
export const revalidate = false;
export function generateStaticParams() {
  return summaryCapabilityPages.map(page => ({ slug: page.href.split("/")[2], subservice: page.href.split("/")[3] }));
}
async function resolvePage(params: Props["params"]) {
  const {slug,subservice} = await params;
  return summaryCapabilityPages.find(page => page.href === `/services/${slug}/${subservice}`);
}
export async function generateMetadata({params}: Props): Promise<Metadata> {
  const page=await resolvePage(params);
  if(!page) return {title:"Service not found",robots:{index:false,follow:false}};
  const production = productionServiceAt(page.href);
  if(production) return productionMetadata(production);
  const title=`${page.item.title} | Ideal Solutions`;
  const image=capabilityImage(page.item.href,page.pillar);
  return {
    title:{absolute:title},description:page.item.body[0],alternates:{canonical:absoluteUrl(page.href)},
    // Supplied summaries are useful destinations but await full service copy.
    robots:{index:false,follow:true},
    openGraph:{title,description:page.item.body[0],url:absoluteUrl(page.href),type:"website",siteName:"Ideal Solutions",images:[{url:absoluteUrl(image.src),alt:image.alt}]},
    twitter:{card:"summary_large_image",title,description:page.item.body[0],images:[absoluteUrl(image.src)]},
  };
}
export default async function CapabilitySummaryPage({params}:Props) {
  const page=await resolvePage(params);
  if(!page) notFound();
  const production = productionServiceAt(page.href);
  if(production) return <ProductionServicePage page={production} />;
  const {item,pillar}=page;
  const image=capabilityImage(item.href,pillar);
  const parentHref=`/services/${pillar.slug}`;
  const service:Service={slug:page.href.split("/").at(-1)!,title:item.title,category:"Infrastructure",summary:item.lead,description:item.body[0],positioning:item.lead,outcome:item.lead,heroLabel:item.title,highlights:[],capabilities:[],deliverables:[],industries:[],serviceMixId:page.href,navDescription:item.lead,navImage:image};
  const crumbs=[{name:"Home",href:"/"},{name:"Services",href:"/services"},{name:pillar.title,href:parentHref},{name:item.title,href:page.href}];
  return <>
    <JsonLd data={{"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:crumbs.map((crumb,index)=>({"@type":"ListItem",position:index+1,name:crumb.name,item:absoluteUrl(crumb.href)}))}} />
    <SubserviceHero title={item.title} description={item.lead} image={image} parent={{title:pillar.title,href:parentHref}} href={page.href} />
    <ServiceCapabilityFlow service={service} sections={[{id:"service-scope",navLabel:"Service scope",title:item.lead,lead:item.body[0],body:item.body.slice(1),image}]} />
    <section className="bg-[#faf7f0] py-12"><Container><h2 className="mb-5 text-2xl font-medium text-[#102444]">Explore the wider capability</h2><Link className="inline-flex min-h-11 items-center text-[#245ea3] underline underline-offset-4" href={parentHref}>{pillar.title} →</Link>{capabilityPages.filter(other=>other.href!==page.href&&other.pillar.slug===pillar.slug).slice(0,2).map(other=><div key={other.href}><Link className="inline-flex min-h-11 items-center text-[#245ea3] underline underline-offset-4" href={other.href}>{other.item.title} →</Link></div>)}</Container></section>
  </>;
}
