# Sub-service blog resource clusters

In Sanity Studio, edit a Post and select **Related Sub-Service**. For Rack & Stack, choose **Rack & Stack — Data Centre Deployment…** (the parent title follows the option). Its stored key is `data-centre-deployment/rack-and-stack`. Category remains separate and unchanged.

Publish the article with its title, slug and cover image/alt text. The matching service page automatically displays its card after the FAQ and before the closing CTA. Existing `/blog/{slug}` URLs, canonicals and schemas are unchanged. No section is rendered when no matching published posts exist. Posts missing a cover image still receive a title-only card; add the cover image in Studio for the intended visual result.

No data migration or new service documents are required. Existing articles remain unchanged until an editor optionally assigns a sub-service and republishes. Deploy the updated application to expose the schema in the embedded `/sanity` Studio and the resource section on the site.

The central registry is derived from the existing canonical capability catalogue in `data/service-resource-clusters.ts`. Both the Studio dropdown and resource lookup use it. Adding a capability to that catalogue adds its option; production-template pages automatically participate. Keep stored keys stable when changing display labels, and plan a content migration if a canonical service route must change.

Queries retrieve only title, slug, cover image and publication date, in newest-first order. They use published content (not draft-preview results), the shared 24-hour fallback cache and the existing `posts` revalidation tag. A correctly configured Sanity publish/update/delete webhook invalidates that tag, including all cached service-resource queries. This also handles changing an article's assigned service without needing to pass that relationship in the webhook payload. No full rebuild is required for each publication. Without a working webhook, cached lists update after expiry and a subsequent request.

Checks: `node scripts/check-related-service-resources.mjs`. Optional `--browser` uses the existing temporary local Playwright QA installation to verify 0–6 card layouts at five viewport widths. Fixtures are never published to Sanity.
