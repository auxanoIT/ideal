import { defineField, defineType } from "sanity";
import { galleryCategories, starterGallery } from "../../data/work-gallery";

export const galleryAlbum = defineType({
  name: "galleryAlbum", title: "Our Work Album", type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: r => r.required() }),
    defineField({ name: "slug", title: "Album URL", type: "slug", options: { source: "title", maxLength: 80 }, description: "Required for new albums. Original albums keep their existing URLs.", validation: r => r.custom((slug, context) => context.document?.starterAlbum || context.document?.hidden || (slug && typeof slug === "object" && "current" in slug && slug.current) ? true : "Add a URL for this new album.") }),
    defineField({ name: "category", type: "string", options: { list: [...galleryCategories] }, validation: r => r.required() }),
    defineField({ name: "description", type: "text", rows: 3, validation: r => r.required().max(300) }),
    defineField({ name: "starterAlbum", title: "Replace an original album (optional)", type: "string", options: { list: starterGallery.map(a => ({ title: a.title, value: a.id })) }, description: "Choose an original album to edit or hide it. Leave blank for a new album. Only create one replacement per original album." }),
    defineField({ name: "hidden", title: "Hide from the gallery", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 10 }),
    defineField({ name: "photos", type: "array", description: "Drag to reorder. The first photo is the cover. For an original album, leave empty to keep its original photos. Upload only photos approved for public use; Sanity assets are public, including draft uploads.", of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Description / caption", type: "string", validation: r => r.required().max(220) })] }], validation: r => r.custom((photos, context) => context.document?.starterAlbum || context.document?.hidden || (Array.isArray(photos) && photos.length) ? true : "Add at least one photo to a new album.") }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "photos.0" } },
});
