# Our Work gallery

Public page: `/our-work`. Linked from Resources and the footer. Includes 36 approved photographs in four starter albums. The rack deployment album has 18 front and rear images; filenames retain the supplied rack identifiers (R07 and R08) and descriptions distinguish the view. `R08-.jpeg` has no complete rack identifier, so its export is named `ideal-solutions-data-centre-rack-row-rear.webp`. Original source photographs are unchanged. WebP exports omit EXIF metadata.

The Rack-and-Stack service page also features the R07-11 front photograph and links directly to the rack album. Existing wide service hero images were retained because these new portraits do not crop well into their wide layouts.

## Manage photos

Open `/sanity` → **Our Work / Photo Albums** → create an album. Enter a title, category and description, then upload approved photos and give each a descriptive caption. Drag photos into order; the first is the cover. Publish to show the album.

To change one of the four original albums, choose it under **Replace an original album**. Leave photos empty to retain the original photographs, or upload a complete replacement selection. Publish **Hide from the gallery** to remove that album from public display. Create only one replacement document per original album. Deleting a replacement restores the original album; use Hide instead to keep it off the page.

New albums appear after the original albums, ordered using Display Order (`order`). Deleting or unpublishing a new album removes it from the gallery after cache refresh. Sanity assets are publicly accessible even for draft documents: do not upload confidential images. Removing an album does not revoke previously shared image URLs.

## Webhook

Add `"galleryAlbum"` to the existing Sanity webhook's document type filter:

```groq
coalesce(after()._type, before()._type) in ["post", "caseStudy", "careerOpening", "galleryAlbum"] && !(coalesce(after()._id, before()._id) in path("drafts.**")) && !(coalesce(after()._id, before()._id) in path("versions.**"))
```

Keep the existing URL, secret, projection and Create/Update/Delete events. The endpoint now invalidates `/our-work`, `/sitemap.xml` and the gallery data. Without the filter change, the existing request-driven 24-hour cache still refreshes; it does not run every minute or trigger a deployment.

No photos have been uploaded to Sanity by the code changes. The approved starter photos ship with the website, so the gallery works before CMS albums are created. If Sanity is unavailable, the local starter albums are shown.
