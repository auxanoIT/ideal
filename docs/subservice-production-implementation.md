# Sub-service production copy — 16 September 2026

The replacement brief `89be769f-a335-47d1-9869-df6c58dcd884/pasted-text.txt` supersedes the earlier Pillar 1 draft. Its 29 unique pages span all seven pillars. Public copy is mechanically imported into `data/subservice-production.json`; SEO/editorial instructions are excluded from visible content.

## Structure

- Existing full-width charcoal/gold hero and overlapping moving introduction panel retained.
- Four service-specific cards, four real section anchors, four alternating image/text sections and five server-rendered FAQ disclosures per page.
- Supplied paragraph and list content retained; no forced two-paragraph truncation.
- Shared closing copy is specific to each pillar; deployment uses the previously supplied non-logo fallback. No new partnership claims or statistics.
- Existing relevant illustrations are reused and labelled illustrative, not represented as customer project evidence.
- Parent and contextual service links resolve to established canonical routes. The 17 existing flat service URLs remain; the 12 former nested summaries are now complete pages. Shared remediation, verification, maintenance and MAC pages are not duplicated.
- Pillar 6 and 7 shared-capability descriptions use the new assessment/lifecycle context.

## Metadata and enquiries

Unique supplied SEO titles/descriptions, self-referencing canonicals, Service and BreadcrumbList schema. All completed nested pages are indexable and included in the sitemap. FAQ content remains in HTML without FAQPage enhancement claims.

Local `NEXT_PUBLIC_SITE_URL` was still Auxano. It is now `https://idealsolutions.com.ng`; set the same production value in the hosting environment (local environment files are not deployed automatically).

CTAs use the existing `/contact` flow with validated service and section preselection. Users can change the service. The lead endpoint now returns an error when neither HubSpot nor the email fallback acknowledges delivery. No external delivery destinations or account credentials were changed. Verify the intended Ideal Solutions CRM/email recipients and sender configuration before launch; the existing integrations may still belong to the former brand.

## Checks and remaining review

Run `node scripts/check-subservice-production.mjs --source-only` before a build; run without the flag after building to verify the generated HTML for every page. It checks copy preservation, section anchors, internal links, one H1, FAQs, indexing, schema, canonicals and three mocked enquiry delivery outcomes. No actual enquiry is sent by this test.

Visual/mobile/browser-keyboard verification requires a connected browser. This session's computer-use helper returned a missing native-pipe error and the browser inventory was empty. Delivery capabilities and real project assets still require business approval; implementation is not independent verification of the claims supplied in the brief.
