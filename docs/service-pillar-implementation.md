# Pillar imagery and implementation notes

## Generated assets

Generated with the built-in image-generation tool, inspected for anatomy and realistic equipment, then converted to 1440 × 960 WebP with Sharp. Originals remain untouched.

- `public/image/service-pillars/ideal-solutions-live-data-centre-deployment-nigeria.webp` — 135 KB
- `public/image/service-pillars/ideal-solutions-data-centre-project-coordination-nigeria.webp` — 123 KB

### Deployment prompt

Use case: photorealistic-natural. Asset type: Ideal Solutions enterprise website deployment section photograph, wide landscape 3:2. A realistic modern Nigerian data centre aisle, two Nigerian engineers wearing blue technical work shirts with small white embroidered 'IDEAL SOLUTIONS', conducting a controlled server deployment in an active facility. One engineer in side profile checks a tablet resting on an equipment trolley, the other seen from behind inspects a rack at eye level. Rows of real black enterprise racks, neat blue copper and yellow fibre patch leads with proper bend radii, overhead cable trays, cool neutral white illumination, dark navy and subtle gold details. Accurate anatomy, hands naturally supported or out of view, realistic pores and fabric texture. Professional documentary photography, no futuristic effects, no holograms, no floating labels, no baked-in headline, no watermarks. Show active infrastructure remaining organised around the work.

### Project coordination prompt

Use case: photorealistic-natural. Asset type: wide 3:2 enterprise website project and lifecycle management photograph. A Nigerian female Ideal Solutions project lead in a blue technical shirt reviewing a tablet on a waist-high trolley in the foreground, body seen three-quarter profile. In the background two Nigerian field engineers in blue shirts seen from behind working by neat enterprise racks in a realistic live Nigerian data centre. Tablet shows a small simple checklist with no readable sensitive information. Precise organised overhead blue and muted gold cable paths, black server cabinets, safe clear aisle, neutral practical lighting. The project lead's hands rest naturally on trolley edge, accurate anatomy, professional unposed documentary feel, real skin and fabric texture, high-end editorial quality. Small embroidered white 'IDEAL SOLUTIONS' on shirt. No holograms, no floating interfaces, no fake claims, no headlines or watermarks. Communicate planned coordinated documented technical delivery, realistic not futuristic.

## Design references

The supplied structures were reviewed at [Park Place Technologies](https://www.parkplacetechnologies.com/), [TradeZero](https://tradezero.com/), [HubSpot](https://www.hubspot.com/), [Vestmark](https://www.vestmark.com/) and [Hostinger](https://www.hostinger.com/). Copy remains Ideal Solutions' supplied content, not reference-site copy. UI palette follows the logo and current homepage: charcoal (#252b33), amber (#f2a900), warm ivory (#faf7f0), white and muted gold. Gradients stay within those colours; blue in photographs is not a UI accent.

## SEO decisions

- Seven unique parent pages, exact supplied title/description (no automatic clipping or doubled brand suffix).
- Canonical URLs follow the existing no-trailing-slash policy.
- Service schema references the existing organisation ID; visible breadcrumbs match BreadcrumbList.
- FAQ answers render in initial HTML using native details/summary. No FAQPage rich-result markup: [Google retired the feature in May 2026](https://developers.google.com/search/updates).
- Twelve summary-only destinations are noindex/follow and excluded from the sitemap pending full copy. Existing canonical service pages retain their service-specific content and URLs.
- No new claims about certifications, customer counts, SLAs or rankings.

## Motion and accessibility

Hero image movement is 6px vertical drift with very small scale change, a subtle scan line and status breathing. A pause control and prefers-reduced-motion are included; motion pauses offscreen. Benefits use CSS sticky positioning on desktop, natural flow on mobile. Scenario cards expand and reveal their details on hover, keyboard focus or tap; all supplied descriptions remain in the initial HTML. Escape closes the active details. FAQs work without JavaScript. Images reserve space and only hero images receive priority.

## Screenshot-driven correction

- Section 2: charcoal field, oversized centred white/amber heading, supporting copy and horizontal icon/text pairs (four supplied items arranged in two columns). No added button.
- Section 3: sticky left introduction; two columns of rounded white benefit cards with centred titles, dotted dividers and gold checkmarks. No invented benefit CTAs.
- Section 4: ivory/gold gradient, icon-and-rule header, horizontal snap carousel, larger raised central card, quieter neighbouring cards and circular previous/next arrows. Supplied detailed scope is retained in native disclosure panels inside each card. Touch scrolling and keyboard controls are supported.
- Section 5: centred heading as requested in the brief, tall rounded image with supplied-copy overlay, spacious icon-led benefits on the right without separator lines.
- Scenarios: charcoal field with a restrained warm-gold gradient, staggered narrow cards expanding into amber/gold panels with charcoal text on hover. On small screens the cards become tap-to-reveal vertical panels.
- Related capabilities use the same centre-emphasis carousel as sub-services, per the original brief.

These changes follow the screenshots supplied in the conversation, retaining Ideal Solutions typography and colours. The hero is unchanged in this correction.

## Checks

Run `node scripts/check-service-pillars.mjs` for content, route, menu and asset checks. Set `PILLAR_TEST_URL` to a running local server and rerun for HTTP, SSR, metadata and sitemap checks. Browser UI was unavailable in this session, so visual hover/mobile inspection remains a manual review item.
