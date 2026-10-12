import "server-only";
import { starterGallery, type GalleryAlbum } from "@/data/work-gallery";
import { sanityFetch } from "@/sanity/lib/client";

type ManagedAlbum = GalleryAlbum & { starterAlbum?: string; hidden?: boolean };
export async function getWorkGallery(): Promise<GalleryAlbum[]> {
  let managed: ManagedAlbum[] | null = null;
  try {
    managed = await sanityFetch<ManagedAlbum[]>({
      tags: ["galleryAlbums"],
      query: `*[_type == "galleryAlbum"] | order(order asc, _createdAt asc) {
        "id": _id, title, category, description, starterAlbum, hidden,
        "photos": photos[defined(asset->url)] { "src": asset->url, alt,
          "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height }
      }`,
    });
  } catch {
    console.error("Gallery content could not be loaded; using the approved original albums.");
  }
  const albums = new Map(starterGallery.map(album => [album.id, album]));
  for (const album of managed ?? []) {
    const id = album.starterAlbum || album.id;
    if (album.hidden) { albums.delete(id); continue; }
    const original = starterGallery.find(a => a.id === id);
    const photos = album.photos?.length ? album.photos : original?.photos ?? [];
    if (photos.length) albums.set(id, { ...album, id, photos });
  }
  return [...albums.values()];
}
