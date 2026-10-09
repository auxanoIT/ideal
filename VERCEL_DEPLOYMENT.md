# Ideal Solutions Vercel deployment

Deploy this Next.js project using `npm ci` and `npm run build`. Leave the output
directory at the framework default. Use a Node version compatible with package.json.

Use `.env.example` as the configuration reference. Set
`NEXT_PUBLIC_SITE_URL=https://www.idealsolutions.com.ng` in Production.
Use Sanity project `jl9vqh9l`, dataset `production`. See
[Sanity setup](docs/sanity-setup.md) for CORS and the signed publish webhook.

Configure only verified Ideal Solutions forms, appointment URLs and email senders.
See [consultation delivery](docs/ideal-consultation-hubspot.md) for the integration
and external email-branding checks. Private tokens must not use NEXT_PUBLIC.
Local environment changes are not automatically copied to Vercel; redeploy after
changing deployment variables.

Run `npm run typecheck` and `npm run build` before deployment. Afterwards, verify
navigation, forms, customer emails, `/sanity`, `/robots.txt`, `/sitemap.xml` and
canonicals on the www production domain. Keep alternative domains redirected there.
See [SEO launch checks](docs/seo-launch-checklist.md) for remaining owner checks.
