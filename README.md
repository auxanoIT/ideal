# Ideal Solutions Website

## Getting Started

Install dependencies and run the development server:

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Quality Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

This project is prepared for Vercel. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for the production setup, environment variables, domain configuration, and post-deploy checks.

## Environment

Copy `.env.example` to `.env.local` for local development, or pull from Vercel after linking the project:

```bash
npx vercel env pull .env.local
```

Keep secrets in `.env.local` locally and in Vercel environment variables for deployed environments.
