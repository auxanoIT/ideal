import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { getWorkAlbum, getWorkGallery } from "@/lib/work-gallery";
import { buildMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ album: string }> };

export const dynamicParams = true;
// Request-driven refresh for sites whose Sanity webhook has not yet been updated.
export const revalidate = 86400;

export async function generateStaticParams() {
  return (await getWorkGallery()).map(album => ({ album: album.id }));
}

export async function generateMetadata({ params }: Props) {
  const { album: id } = await params;
  const album = await getWorkAlbum(id);
  if (!album) return { title: "Album not found", robots: { index: false, follow: false } };
  return buildMetadata({
    title: `${album.title} Photos | Ideal Solutions`,
    description: `${album.description} Explore ${album.photos.length} project photographs from Ideal Solutions.`,
    path: `/our-work/${album.id}`,
    imagePath: album.photos[0].src,
    imageAlt: album.photos[0].alt,
  });
}

export default async function WorkAlbumPage({ params }: Props) {
  const { album: id } = await params;
  const album = await getWorkAlbum(id);
  if (!album) notFound();
  const url = absoluteUrl(`/our-work/${album.id}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: album.title,
    description: album.description,
    url,
    image: album.photos.map(photo => ({ "@type": "ImageObject", contentUrl: absoluteUrl(photo.src), caption: photo.alt })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <section className="bg-[#faf7f0] pb-16 pt-12 sm:pb-24 sm:pt-20">
      <Container>
        <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-[#62656a]">
          <Link href="/our-work" className="underline decoration-[#f2a900] underline-offset-4">Our Work</Link><span aria-hidden="true">/</span><span aria-current="page">{album.title}</span>
        </nav>
        <h1 className="max-w-4xl text-4xl font-semibold leading-tight tracking-tight text-[#252b33] sm:text-6xl">{album.title}</h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-[#5e6267] sm:text-lg">{album.description}</p>
        <p className="mt-3 text-sm text-[#62656a]">{album.photos.length} photographs · {album.category}</p>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {album.photos.map((photo, index) => <figure key={photo.src} className="min-w-0">
            <a href={photo.src} target="_blank" rel="noopener noreferrer" aria-label={`View full photograph: ${photo.alt}`} className="group block rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a66e00]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#252b33]">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-contain transition-transform duration-300 motion-safe:group-hover:scale-[1.03]" priority={index === 0} />
              </div>
            </a>
            <figcaption className="mt-3 text-sm leading-6 text-[#555b61]">{photo.alt}</figcaption>
          </figure>)}
        </div>
        <Link href="/our-work" className="mt-14 inline-flex min-h-12 items-center rounded-full border border-[#252b33] px-6 font-semibold text-[#252b33] hover:bg-white">← All photo albums</Link>
      </Container>
    </section>
  </>;
}
