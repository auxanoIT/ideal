# Ideal Solutions content editor

- Project: `jl9vqh9l`; organisation: `onu9eywww` (not needed by the client).
- Dataset: `production`, confirmed available for public reads.
- Local editor: http://localhost:3000/sanity
- Future editor: https://idealsolutions.com.ng/sanity (confirmed production domain; after deployment).
- The old `/studio` path redirects to `/sanity`.

Only posts/blog, case studies and careers are managed here. Other website content remains in the existing local files. Existing blog fields, rich text, table paste support, images, callouts and SEO structure are preserved. No Auxano documents are imported.

## Configuration

Public defaults are in `sanity/config.ts`; deployment overrides can be set as:

```dotenv
NEXT_PUBLIC_IDEALSOLUTIONS_SANITY_PROJECT_ID=jl9vqh9l
NEXT_PUBLIC_IDEALSOLUTIONS_SANITY_DATASET=production
```

Restart `npm run dev` after environment changes. Old `NEXT_PUBLIC_SANITY_*` and `SANITY_*` variables are not used. Public published reads do not require a token. Studio editing uses the logged-in Sanity user's project permissions.

In https://www.sanity.io/manage select this project, then API > CORS Origins. Allow `http://localhost:3000` with credentials. Before launch add the actual controlled production origin, such as `https://idealsolutions.com.ng`, with credentials; do not include `/sanity` in the origin. Add `www` only if the Studio is also served there. No wildcard origins.

Setup check: the project API returned HTTP 200 for the production dataset and allowed the localhost origin with credentials. The dataset was empty at setup. Studio sign-in and a real publishing action still need the project member to log in.

## Publishing

- Posts / Blog: complete title, slug, date, author, excerpt, cover image/alt, body and SEO; Publish. Existing frontend blog design is unchanged.
- Case Studies: complete the project fields and slug, turn on the **Published** approval field, then Publish. Draft or unapproved case studies stay hidden.
- Careers: complete job title, location, employment type and summary, enable **Open Position**, then Publish. Disable Open Position and publish to close it.
- Empty collections remain empty; the integration does not seed demonstration content.

Published queries use the origin API and a 60-second revalidation interval. Without a webhook, the first visit after cache expiry can serve cached content while refresh runs; reload after refresh. No webhook is required for initial local editing.

## Optional immediate publish updates / draft preview

Store a new randomly generated `IDEALSOLUTIONS_SANITY_REVALIDATE_SECRET` only in local/deployment secrets. Never reuse an Auxano secret or commit a token.

For a production webhook in the project's API settings:

- URL: `https://idealsolutions.com.ng/api/revalidate` (use the final deployed origin)
- Method: POST; trigger on Create, Update and Delete; dataset production
- Filter: `_type in ["post", "caseStudy", "careerOpening"]`
- Projection: `{_id, _type, "slug": slug.current}`
- Secret: same new revalidation secret; exclude drafts.

Localhost is not publicly reachable by Sanity webhooks. Use timed revalidation locally.

Draft preview additionally requires a Viewer token from this project in `IDEALSOLUTIONS_SANITY_API_READ_TOKEN`. Do not expose it using NEXT_PUBLIC. Preview is disabled without both token and secret. Draft preview UI is not added by this setup.

When connecting the domain, also update NEXT_PUBLIC_SITE_URL and deployment environment values. Domain/DNS and Sanity account-level changes are separate from local code.
