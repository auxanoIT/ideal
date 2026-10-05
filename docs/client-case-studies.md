# Client-supplied Ideal Solutions project records

Source: `Ideal Solutions Case Study and Past Projects.pdf`, supplied by the client, dated 5 October 2026. Seven selected projects are stored in `data/ideal-case-studies.json`; additional experience from pages 6–8 is in `data/ideal-project-experience.ts`.

The document date is not a project completion date. No completion dates, testimonials, performance improvements, commissioning results or project photographs were invented. The 307 sensors, five data halls and ten access points are documented scope quantities, not performance KPIs. Locations are omitted except Ore, which the document explicitly supplies. Client names follow the supplied record; confirm any client confidentiality restrictions before deployment.

## Website and CMS behaviour

The seven records are available through the shared content layer on the index, detail routes, sitemap and navigation. Old local Auxano case studies are no longer used by the content layer. Existing Sanity content is preserved.

A Sanity record with the same slug overrides a local record, including its `published` flag. To hide one of these seeded records, retain a Sanity document with that slug and set Published to false; deleting the document restores the bundled record. Alternatively remove the record from the local JSON and redeploy. Editors should not change these slugs without a redirect and updating the bundled record.

No live Sanity writes are performed by this implementation. To manage these records in Sanity, first export:

```sh
node scripts/check-client-case-studies.mjs --export
```

Then, with the Ideal Solutions project selected and the owner authenticated, import into project `jl9vqh9l`, dataset `production`:

```sh
npx sanity dataset import tmp/ideal-case-studies.ndjson production --missing
```

The import contains published documents. Review the copy and check for existing documents with the same slugs before importing. `--missing` avoids overwriting matching document IDs. Do not use `--replace` on existing editorial work.

Deploy the updated schema/application first. At the owner's request, seven photorealistic AI-generated illustrations now accompany these records. They are mapped in `data/ideal-case-study-images.json`, labelled visibly, and included in metadata and the sitemap. Prompts and saved paths are in `docs/case-study-image-prompts.md`. No Project Photography still enables a text-only layout when needed. An approved Sanity image overrides the generated default; switch No Project Photography off and leave AI-Generated Illustration off for genuine photos. Enable AI-Generated Illustration if uploading a generated image to Sanity.

SEO uses each project's unique title and description, a self-referencing canonical, one H1, descriptive section headings, CreativeWork and BreadcrumbList structured data, and real related-pillar links. Source-only project information is preferable to fabricated outcomes or keyword repetition.

Check: `node scripts/check-client-case-studies.mjs`, `npm run typecheck`, targeted ESLint and `npm run build`.

For HTTP, canonical, sitemap, schema and responsive layout checks against a local production server, run `node scripts/check-client-case-studies.mjs --browser` (uses the temporary Playwright QA installation; defaults to port 3001).

References: [Sanity dataset import](https://www.sanity.io/docs/cli-reference/cli-datasets) and [Google's helpful content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content).
