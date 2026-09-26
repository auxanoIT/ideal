import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, Info, Lightbulb, Quote } from "lucide-react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock, TypedObject } from "@portabletext/types";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { JsonLd } from "@/components/ui/json-ld";
import { getBlogPostBySlug, getBlogPostSlugs } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { BlogBodyBlock, BlogPost } from "@/lib/types";
import { absoluteUrl, formatDate } from "@/lib/utils";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const revalidate = false;

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();

  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: "Article not found",
      description: "The requested article could not be found.",
      path: `/blog/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    imagePath: post.coverImage?.src,
    keywords: [post.category, post.title],
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const postBody = Array.isArray(post.body) ? post.body : [];
  const takeaways = Array.isArray(post.takeaways)
    ? post.takeaways.filter(Boolean)
    : [];
  const headings = postBody
    .map(getBodyHeading)
    .filter((heading): heading is { text: string; id: string } =>
      Boolean(heading),
    );
  const bodyBlocks = normalizeBlogBody(postBody);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            description: post.excerpt,
            image: post.coverImage
              ? absoluteUrl(post.coverImage.src)
              : undefined,
            url: absoluteUrl(`/blog/${post.slug}`),
            mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
            author: {
              "@type": post.author && post.author !== "Ideal Solutions" ? "Person" : "Organization",
              name: post.author ?? "Ideal Solutions",
            },
            publisher: {
              "@type": "Organization",
              "@id": `${absoluteUrl("/")}#organization`,
              name: "Ideal Solutions",
              logo: {
                "@type": "ImageObject",
                url: absoluteUrl("/idealsolutions-logo.svg"),
              },
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: absoluteUrl("/"),
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: absoluteUrl("/blog"),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: post.title,
                item: absoluteUrl(`/blog/${post.slug}`),
              },
            ],
          },
        ]}
      />
      <article>
        <header className="bg-[var(--color-cloud)] py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                {post.category}
              </p>
              <h1 className="mt-6 text-balance text-4xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] sm:text-5xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-[var(--color-muted)]">
                <span>{formatDate(post.publishedAt)}</span>
                <span aria-hidden="true">/</span>
                <span>{post.readingTime}</span>
                {post.author ? (
                  <>
                    <span aria-hidden="true">/</span>
                    <span>{post.author}</span>
                  </>
                ) : null}
              </div>
              <p className="mt-8 text-lg leading-8 text-[var(--color-muted)]">
                {post.excerpt}
              </p>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] border border-white bg-white shadow-[0_24px_70px_rgba(11,18,32,0.08)]">
              <PostImage post={post} priority />
            </div>
          </Container>
        </header>

        <section className="py-16 sm:py-20">
          <Container className="grid gap-10 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              {headings.length ? (
                <nav className="rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white p-5 shadow-[0_16px_40px_rgba(11,18,32,0.05)]">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#ED6B37]">
                    In this article
                  </p>
                  <div className="mt-4 grid gap-2">
                    {headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className="rounded-xl px-3 py-2 text-sm leading-6 text-[var(--color-muted)] transition hover:bg-[var(--color-cloud)] hover:text-[var(--color-ink)]"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </div>
                </nav>
              ) : null}
            </aside>

            <div className="min-w-0">
              {takeaways.length ? (
                <div className="rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] p-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-electric)]">
                    Key takeaways
                  </p>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-ink)]">
                    {takeaways.map((takeaway) => (
                      <li key={takeaway} className="flex gap-3">
                        <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div
                className={takeaways.length ? "mt-10 space-y-8" : "space-y-8"}
              >
                <PortableText
                  value={bodyBlocks}
                  components={blogBodyComponents}
                />
              </div>

              <div className="mt-12 flex flex-wrap gap-4 border-t border-[color:rgba(11,18,32,0.08)] pt-8">
                <ButtonLink href="/book-consultation">
                  Book Consultation
                </ButtonLink>
                <ButtonLink href="/services" variant="secondary">
                  Explore services
                </ButtonLink>
              </div>
            </div>
          </Container>
        </section>
      </article>
    </>
  );
}

const blogBodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-8 text-[var(--color-muted)]">
        {children}
      </p>
    ),
    h2: ({ children, value }) => (
      <h2
        id={getPortableHeadingId(value)}
        className="group scroll-mt-28 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]"
      >
        <a
          href={`#${getPortableHeadingId(value)}`}
          className="transition hover:text-[var(--color-electric)]"
        >
          {children}
        </a>
      </h2>
    ),
    h3: ({ children, value }) => (
      <h3
        id={getPortableHeadingId(value)}
        className="group scroll-mt-28 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]"
      >
        <a
          href={`#${getPortableHeadingId(value)}`}
          className="transition hover:text-[var(--color-electric)]"
        >
          {children}
        </a>
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-ink)]">
        {children}
      </h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-[var(--color-electric)] pl-6">
        <Quote className="mb-4 h-6 w-6 text-[var(--color-electric)]" />
        <p className="text-xl font-medium leading-9 text-[var(--color-ink)]">
          {children}
        </p>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="space-y-3 pl-7 text-base leading-8 text-[var(--color-muted)] marker:text-[var(--color-electric)]">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-3 pl-7 text-base leading-8 text-[var(--color-muted)] marker:text-[var(--color-electric)]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="list-disc pl-2">{children}</li>,
    number: ({ children }) => <li className="pl-2">{children}</li>,
  },
  marks: {
    link: ({ children, value }) => {
      const href =
        typeof value?.href === "string" && value.href ? value.href : "#";
      const isExternal = href.startsWith("http");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="font-semibold text-[var(--color-electric)] underline-offset-4 hover:underline"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="rounded-md bg-[var(--color-cloud)] px-1.5 py-0.5 text-sm text-[var(--color-ink)]">
        {children}
      </code>
    ),
  },
  types: {
    blogPlainText: ({ value }) => (
      <p className="text-base leading-8 text-[var(--color-muted)]">
        {String(value.text ?? "")}
      </p>
    ),
    blogParagraph: ({ value }) => (
      <p className="text-base leading-8 text-[var(--color-muted)]">
        {String(value.text ?? "")}
      </p>
    ),
    blogHeading: ({ value }) => {
      const block = value as Extract<BlogBodyBlock, { _type: "blogHeading" }>;
      const id = getHeadingId(block);
      const HeadingTag = block.level === 3 ? "h3" : "h2";

      return (
        <HeadingTag
          id={id}
          className="group scroll-mt-28 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]"
        >
          <a
            href={`#${id}`}
            className="transition hover:text-[var(--color-electric)]"
          >
            {block.text}
          </a>
        </HeadingTag>
      );
    },
    blogList: ({ value }) => {
      const block = value as Extract<BlogBodyBlock, { _type: "blogList" }>;
      const ListTag = block.style === "number" ? "ol" : "ul";
      const listClassName = [
        "space-y-3 pl-7 text-base leading-8 text-[var(--color-muted)] marker:text-[var(--color-electric)]",
        block.style === "number" ? "list-decimal" : "list-disc",
      ].join(" ");

      return (
        <ListTag className={listClassName}>
          {block.items.map((item) => (
            <li key={item} className="pl-2">
              {item}
            </li>
          ))}
        </ListTag>
      );
    },
    blogCallout: ({ value }) => <BlogCallout value={value} />,
    blogQuote: ({ value }) => {
      const block = value as Extract<BlogBodyBlock, { _type: "blogQuote" }>;

      return (
        <blockquote className="border-l-4 border-[var(--color-electric)] pl-6">
          <Quote className="mb-4 h-6 w-6 text-[var(--color-electric)]" />
          <p className="text-xl font-medium leading-9 text-[var(--color-ink)]">
            {block.quote}
          </p>
          {block.attribution ? (
            <footer className="mt-4 text-sm font-semibold text-[var(--color-muted)]">
              {block.attribution}
            </footer>
          ) : null}
        </blockquote>
      );
    },
    blogTable: ({ value }) => <BlogTable value={value} />,
    image: ({ value }) => (
      <BlogImage value={value as Extract<BlogBodyBlock, { _type: "image" }>} />
    ),
    blogImageBlock: ({ value }) => (
      <BlogImage
        value={value as Extract<BlogBodyBlock, { _type: "blogImageBlock" }>}
      />
    ),
  },
};

const calloutStyles = {
  important: {
    title: "Important",
    icon: AlertTriangle,
    className: "border-amber-400 bg-amber-50 text-amber-700",
  },
  warning: {
    title: "Warning",
    icon: AlertTriangle,
    className: "border-red-400 bg-red-50 text-red-700",
  },
  note: {
    title: "Note",
    icon: Info,
    className: "border-blue-400 bg-blue-50 text-blue-700",
  },
  tip: {
    title: "Tip",
    icon: Lightbulb,
    className: "border-emerald-400 bg-emerald-50 text-emerald-700",
  },
} as const;

function BlogCallout({
  value,
}: {
  value: Extract<BlogBodyBlock, { _type: "blogCallout" }>;
}) {
  const tone = value.tone ?? "important";
  const config = calloutStyles[tone];
  const Icon = config.icon;

  return (
    <aside className={`rounded-[1.25rem] border-l-4 p-5 ${config.className}`}>
      <div className="flex items-start gap-3">
        <Icon className="mt-1 h-5 w-5 shrink-0" />
        <div>
          <p className="text-base font-semibold leading-7 text-[var(--color-ink)]">
            {value.title || config.title}
          </p>
          <p className="mt-2 text-base leading-8 text-[var(--color-muted)]">
            {value.text}
          </p>
        </div>
      </div>
    </aside>
  );
}

function BlogTable({
  value,
}: {
  value: Extract<BlogBodyBlock, { _type: "blogTable" }>;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.25rem] border border-[color:rgba(11,18,32,0.08)] bg-white">
      {value.caption ? (
        <figcaption className="border-b border-[color:rgba(11,18,32,0.08)] bg-[var(--color-cloud)] px-5 py-4 text-sm font-semibold text-[var(--color-ink)]">
          {value.caption}
        </figcaption>
      ) : null}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-[var(--color-cloud)] text-[var(--color-ink)]">
            <tr>
              {value.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-5 py-4 font-semibold"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[color:rgba(11,18,32,0.08)]">
            {value.rows.map((row, rowIndex) => (
              <tr key={`${row.cells.join("-")}-${rowIndex}`}>
                {value.columns.map((column, cellIndex) => (
                  <td
                    key={`${column}-${rowIndex}-${cellIndex}`}
                    className="px-5 py-4 leading-7 text-[var(--color-muted)]"
                  >
                    {row.cells[cellIndex] ?? ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

function BlogImage({
  value,
}: {
  value:
    | Extract<BlogBodyBlock, { _type: "image" }>
    | Extract<BlogBodyBlock, { _type: "blogImageBlock" }>;
}) {
  if (!value.image?.src) {
    return null;
  }

  const width = value.image.width ?? 1200;
  const height = value.image.height ?? 675;

  return (
    <figure>
      <Image
        src={value.image.src}
        alt={value.image.alt}
        width={width}
        height={height}
        sizes="(min-width: 1024px) 760px, 100vw"
        className="mx-auto h-auto max-w-full rounded-[1.5rem] bg-[var(--color-cloud)]"
      />
      {value.caption ? (
        <figcaption className="mt-3 text-sm leading-6 text-[var(--color-muted)]">
          {value.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function PostImage({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  const image = post.coverImage ?? {
    src: "/image/service-details/network-design-diagrams.webp",
    alt: post.title,
  };

  return (
    <Image
      src={image.src}
      alt={image.alt}
      fill
      priority={priority}
      sizes="(min-width: 1024px) 55vw, 100vw"
      className="object-cover"
    />
  );
}

function getHeadingId(block: Extract<BlogBodyBlock, { _type: "blogHeading" }>) {
  return block.anchor || slugify(block.text);
}

function getBodyHeading(block: BlogBodyBlock) {
  if (isLegacyHeading(block)) {
    return {
      text: block.text,
      id: getHeadingId(block),
    };
  }

  if (
    isPortableBlock(block) &&
    (block.style === "h2" || block.style === "h3")
  ) {
    const text = getPortableBlockText(block);

    if (!text) {
      return null;
    }

    return {
      text,
      id: slugify(text),
    };
  }

  return null;
}

function normalizeBlogBody(
  body: BlogBodyBlock[],
): Array<TypedObject | PortableTextBlock> {
  return body.map((block, index) =>
    typeof block === "string"
      ? {
          _type: "blogPlainText",
          _key: `plain-${index}`,
          text: block,
        }
      : block,
  ) as Array<TypedObject | PortableTextBlock>;
}

function isLegacyHeading(
  block: BlogBodyBlock,
): block is Extract<BlogBodyBlock, { _type: "blogHeading" }> {
  return (
    typeof block !== "string" &&
    block._type === "blogHeading" &&
    "text" in block
  );
}

function isPortableBlock(block: BlogBodyBlock): block is PortableTextBlock {
  return (
    typeof block !== "string" &&
    block._type === "block" &&
    "children" in block &&
    Array.isArray(block.children)
  );
}

function getPortableHeadingId(value: PortableTextBlock) {
  return slugify(getPortableBlockText(value));
}

function getPortableBlockText(block: PortableTextBlock) {
  return (
    block.children
      ?.map((child) => ("text" in child ? child.text : ""))
      .join("")
      .trim() ?? ""
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
