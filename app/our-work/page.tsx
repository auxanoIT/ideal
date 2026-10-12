import Link from "next/link";
import { Container } from "@/components/ui/container";
import { WorkGallery } from "@/components/sections/work-gallery";
import { getWorkGallery } from "@/lib/work-gallery";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

// Request-driven refresh for sites whose Sanity webhook has not yet been updated.
export const revalidate = 86400;
export const metadata = buildMetadata({
  title: "Our Work | Ideal Solutions Photo Gallery",
  description: "See the Ideal Solutions team at work: data centre infrastructure, security and access equipment, and onsite installations in our project photo gallery.",
  path: "/our-work",
  imagePath: "/image/our-work/overhead-containment.webp",
  imageAlt: "Ideal Solutions technician working inside a data centre",
});

export default async function OurWorkPage() {
  const albums = await getWorkGallery();
  const structuredData = {
    "@context": "https://schema.org", "@type": "ImageGallery",
    name: "Ideal Solutions — Our Work", url: absoluteUrl("/our-work"),
    description: "Photographs of the Ideal Solutions team carrying out onsite infrastructure work.",
    image: albums.map(album => ({ "@type": "ImageObject", contentUrl: absoluteUrl(album.photos[0].src), caption: album.photos[0].alt })),
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="bg-[#faf7f0] pb-12 pt-16 sm:pb-16 sm:pt-24">
      <Container>
        <h1 className="max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight text-[#252b33] sm:text-7xl">Our team.<br />Onsite. <span className="text-[#a66e00]">At work.</span></h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">A look behind the work. Real moments from our team delivering, installing and supporting the infrastructure our clients depend on.</p>
      </Container>
    </section>
    <section aria-label="Our work photo albums" className="bg-[#faf7f0] pb-20 sm:pb-28"><Container><WorkGallery albums={albums} /></Container></section>
    <section className="border-t border-black/10 py-12"><Container className="flex flex-wrap items-center justify-between gap-5"><p className="text-lg">Want the story behind our projects?</p><Link href="/case-studies" className="font-semibold underline decoration-[#f2a900] decoration-2 underline-offset-8">Explore our case studies →</Link></Container></section>
  </>;
}
