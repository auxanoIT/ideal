# Sanity Setup

> Ideal Solutions: use [the current setup guide](docs/sanity-setup.md). The legacy instructions below describe the previous Auxano configuration and must not be used for this project. Ideal Solutions uses project `jl9vqh9l`, dataset `production` and `/sanity`.

This project already has an embedded Sanity Studio at `/studio`. You do not need to create a separate Studio app.

## 1. Login From This Project

```bash
npx sanity login
```

This opens a browser login. Use the same account you registered with on Sanity.

## 2. Create Or Select A Sanity Project

If you already created a Sanity project, get the project ID from:

```txt
https://www.sanity.io/manage
```

If you have not created one yet:

```bash
npx sanity projects create auxano-solutions --dataset production
```

Then copy the project ID.

## 3. Configure Environment Variables

Create `.env.local` from `.env.example` and set:

```txt
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token_for_draft_preview
SANITY_REVALIDATE_SECRET=make_a_long_random_secret
```

For normal published website content, the simplest setup is a public Sanity dataset. If you make the dataset private, the Sanity client needs to be changed to send a read token for published requests too.

## 4. Add CORS Origins In Sanity

In Sanity Manage, add these CORS origins with credentials enabled:

```txt
http://localhost:3000
https://your-production-domain.com
```

You can also add them from the terminal:

```bash
npx sanity cors add http://localhost:3000 --credentials
npx sanity cors add https://your-production-domain.com --credentials
```

## 5. Run The Site And Open Studio

```bash
npm run dev
```

Open:

```txt
http://localhost:3000/studio
```

## Blog Content

Create a new document with type `Posts`.

Required/recommended fields:

- `Title`: article headline
- `Slug`: generate from title
- `Category`: example `CCTV Planning`, `Managed IT`, `Networking`
- `Published At`: publication date
- `Reading Time`: example `5 min read`
- `Author`: optional byline
- `Cover Image`: image shown on blog cards and at the top of the article
- `Excerpt`: short summary for blog listing and SEO
- `Takeaways`: bullet points shown near the top of the article
- `Body`: add Heading, Paragraph, and Image blocks
- `SEO`: optional meta title and description

Published posts automatically appear at:

```txt
/blog
/blog/post-slug
```

Headings in the body become clickable article sections. Set `Anchor ID` if you want a clean link such as `network-planning`; otherwise the site generates one from the heading text.

To unpublish a post, open the post in Studio, then click the down arrow on the green `Published` status button in the top-right document header. Choose `Unpublish` there. If you do not see it, open the three-dot document actions menu in the right document toolbar. This removes the published version from the live site while keeping a draft you can edit or publish again later.

Changing a Sanity document changes the content the site reads for that document, but it does not delete the fallback content stored in this codebase. For example, if you create a Sanity `Pages` document with slug `home`, the website uses that Sanity home page. If you delete or unpublish it, the site can fall back to the local `data/site-content.ts` version.

## Careers Page

The careers page is available at:

```txt
/careers
```

Open positions are controlled only by Sanity. Create a document with type `Career Openings` for each role you want to show.

Required/recommended fields:

- `Job Title`: role name shown on the card
- `Department`: optional label above the role name
- `Location`: example `Lagos, Nigeria`
- `Employment Type`: example `Full Time` or `Contract`
- `Role Summary`: short role description
- `Open Position`: keep enabled to show the role on the live site
- `Display Order`: optional; lower numbers appear first

If there are no published open roles, the careers page shows `No open position. Please try checking again later.`

## Publishing Changes

After editing content in Sanity, the site refreshes cached content automatically on its normal revalidation window. For immediate updates, call the revalidation API with `SANITY_REVALIDATE_SECRET`.
