# Vercel Deployment

> Legacy deployment handoff: do not reuse the Auxano identifiers below. For Ideal Solutions, use `.env.example` and [the current Sanity setup guide](docs/sanity-setup.md). The new editor is `/sanity`, project `jl9vqh9l`, dataset `production`.

This project is a standard Next.js App Router application and is ready for Vercel's zero-config Next.js deployment.

## Recommended Setup

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. In Vercel, choose **Add New > Project** and import the repository.
3. Keep the detected framework as **Next.js**.
4. Use these project settings:

```txt
Install Command: npm ci
Build Command: npm run build
Output Directory: leave empty
Node.js Version: 20.x or newer
```

The committed `vercel.json` pins the install and build commands so the dashboard and CLI stay aligned.

## Environment Variables

Set these in **Vercel Project > Settings > Environment Variables**. Apply them to Production, Preview, and Development unless noted otherwise.

```txt
NEXT_PUBLIC_SITE_URL=https://auxanosolutions.net

NEXT_PUBLIC_SANITY_PROJECT_ID=6utd56gk
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=

NEXT_PUBLIC_GA_MEASUREMENT_ID=
NEXT_PUBLIC_CLARITY_ID=
NEXT_PUBLIC_HUBSPOT_TRACKING_ID=148498868

HUBSPOT_PORTAL_ID=148498868
HUBSPOT_FORM_ID=d6f9322b-5773-4473-8cce-e39d0549ab74
HUBSPOT_ESTIMATE_FORM_ID=986d836e-420f-4a8c-91c2-eb9638fd6f14
HUBSPOT_MEETINGS_URL=

TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=

RESEND_API_KEY=
RESEND_FROM_EMAIL=
LEAD_FALLBACK_EMAIL=

NEXT_PUBLIC_SALES_WHATSAPP=
NEXT_PUBLIC_SUPPORT_WHATSAPP=
```

Private values should stay server-only. Do not prefix secrets with `NEXT_PUBLIC_`.

## Turnstile

Turnstile still comes from Cloudflare even though the website is deployed on Vercel. Create the widget before production launch and add these hostnames:

```txt
auxanosolutions.net
www.auxanosolutions.net
localhost
```

Use the widget site key for `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the secret key for `TURNSTILE_SECRET_KEY`.
After the first Vercel preview deployment, add its `*.vercel.app` hostname too if you want to test protected forms on preview URLs.

## Local Vercel Workflow

Install or run the Vercel CLI through `npx`:

```bash
npx vercel login
npx vercel link
npx vercel env pull .env.local
```

Then verify locally:

```bash
npm run lint
npm run typecheck
npm run build
```

For a preview deployment:

```bash
npx vercel
```

For production:

```bash
npx vercel --prod
```

## Domain

After the first successful production deployment, add the production domain in Vercel:

```txt
auxanosolutions.net
www.auxanosolutions.net
```

If the domain uses Cloudflare DNS, keep Cloudflare as DNS only and point the domain records to Vercel from Vercel's domain instructions.

## Post-Deploy Checks

After production deploy, verify:

```txt
https://auxanosolutions.net/
https://auxanosolutions.net/robots.txt
https://auxanosolutions.net/sitemap.xml
https://auxanosolutions.net/opengraph-image
```

Submit a test lead and estimator request to confirm HubSpot, Turnstile, and fallback email behavior.
