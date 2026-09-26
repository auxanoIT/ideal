# Ideal Solutions SEO and launch checks

Production origin: **https://idealsolutions.com.ng**. Keep NEXT_PUBLIC_SITE_URL set to this exact origin in production and redeploy after changes. Do not switch to the .com domain without updating canonicals, redirects and verification.

## Implemented

- New internal page navigations reset to the document top; hash links and Back/Forward keep their intended behaviour.
- Self-referencing canonical URLs, branded page titles, descriptions and social sharing metadata.
- Sanity post/case-study meta titles and descriptions feed page metadata. Canonicals follow the actual page route, not arbitrary CMS overrides.
- Sitemap images come from page assets, including industry editorial/solution images, pillar/capability/audience images, sub-service section images and published blog body images. Decorative logos and unused assets are not bulk-indexed.
- Published posts/case studies supply their actual updated date. Static pages omit fabricated freshness dates.
- Organization/LocalBusiness identity and supplied Ikeja address; corrected blog publisher identity. Do not add ratings, certifications, hours or results without evidence.
- Google and Bing verification environment variables are connected in root metadata.
- Existing llms.txt is corrected to Ideal Solutions. It is a reference file, not an AI ranking mechanism or replacement for crawlable pages.

## Before launch (owner inputs)

1. Confirm the phone, sales/support WhatsApp and email. `data/site-content.ts` still contains `ask@auxanosolutions.net`; do not guess a replacement.
2. Replace/approve About team names, portraits, emails, office labels and metrics (founding date, years, cost savings, 24/7 availability). These are not verified Ideal Solutions claims.
3. Publish only approved Ideal Solutions posts, jobs and case studies in the new Sanity project. Do not reuse Auxano project results as Ideal Solutions results.
   The Terms page is explicitly placeholder legal copy; it is noindex and excluded from the sitemap until approved wording is supplied.
4. Set NEXT_PUBLIC_SITE_URL=https://idealsolutions.com.ng on the host. Add the production origin to Sanity CORS for `/sanity`; the .com URL from the earlier setup discussion is superseded.
5. Verify the domain in Google Search Console and Bing Webmaster Tools. Add verification values if using HTML verification, then submit https://idealsolutions.com.ng/sitemap.xml after deployment.
6. Check live pages return 200, redirects resolve to the canonical domain, robots.txt and sitemap.xml are reachable, and no staging noindex is present. Keep administrative and API pages out of the sitemap.
7. Validate representative live Service, BreadcrumbList and BlogPosting markup using appropriate validators; monitor indexing, Core Web Vitals and real enquiries. Sitemap acceptance is not an indexing or ranking guarantee.

## Checks

`node scripts/check-seo.mjs` checks local sitemap assets and sample rendered metadata/structured data/headings. `node scripts/check-navigation-scroll.mjs` checks Chrome desktop/mobile navigation and history (requires playwright-core in the temporary QA directory used during setup). Override QA_BASE_URL for another local server.

## Search guidance

- https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
- https://developers.google.com/search/docs/appearance/google-images
- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide

SEO foundations—useful content, accurate business information, crawlable links and accessible media—also support AI search discovery. There is no special AEO markup or guaranteed placement.
