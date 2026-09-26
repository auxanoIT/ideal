import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import type { BlogPost } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Practical insights from Ideal Solutions on data centre infrastructure, onsite technical support, networking and IT operations in Nigeria.",
  path: "/blog",
});

export const revalidate = false;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const [featuredPost] = posts;
  const categories = Array.from(new Set(posts.map((post) => post.category)));

  return (
    <>
      <section className="bg-[var(--color-cloud)] py-16 sm:py-20">
        <Container>
          <SectionHeading
            as="h1"
            align="center"
            eyebrow="Insights"
            title="Practical content for teams buying, planning, and governing infrastructure."
            description="Articles on CCTV planning, managed IT, network monitoring, infrastructure decisions, and operational risk."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((category) => (
              <a
                key={category}
                href={`#${slugify(category)}`}
                className="rounded-full border border-[color:rgba(11,18,32,0.08)] bg-white px-4 py-2 text-sm font-semibold text-[var(--color-ink)] transition hover:border-[var(--color-electric)] hover:text-[var(--color-electric)]"
              >
                {category}
              </a>
            ))}
          </div>
        </Container>
      </section>

      {featuredPost ? (
        <section className="py-16 sm:py-20">
          <Container>
            <FeaturedPostCard post={featuredPost} />
          </Container>
        </section>
      ) : null}

      <section className="pb-20 sm:pb-24">
        <Container>
          <div className="space-y-16">
            {categories.map((category) => {
              const categoryPosts = posts.filter(
                (post) => post.category === category,
              );
              const visiblePosts =
                categoryPosts.length > 1
                  ? categoryPosts.filter(
                      (post) => post.slug !== featuredPost?.slug,
                    )
                  : categoryPosts;

              if (!visiblePosts.length) {
                return null;
              }

              return (
                <div
                  key={category}
                  id={slugify(category)}
                  className="scroll-mt-28"
                >
                  <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
                        Explore by category
                      </p>
                      <h2 className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
                        {category}
                      </h2>
                    </div>
                    <span className="text-sm text-[var(--color-muted)]">
                      {visiblePosts.length}{" "}
                      {visiblePosts.length === 1 ? "article" : "articles"}
                    </span>
                  </div>
                  <div className="grid gap-5 lg:grid-cols-3">
                    {visiblePosts.map((post) => (
                      <PostCard key={post.slug} post={post} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}

function FeaturedPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="grid overflow-hidden rounded-[2rem] border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_24px_70px_rgba(11,18,32,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative min-h-[22rem] overflow-hidden bg-[var(--color-cloud)]"
      >
        <PostImage post={post} priority />
        <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/8" />
      </Link>
      <div className="flex flex-col justify-center p-7 sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
          Featured - {post.category}
        </p>
        <Link href={`/blog/${post.slug}`} className="group mt-5">
          <h2 className="text-4xl font-semibold tracking-[-0.06em] text-[var(--color-ink)] transition group-hover:text-[var(--color-electric)]">
            {post.title}
          </h2>
        </Link>
        <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
          {post.excerpt}
        </p>
        <PostMeta post={post} className="mt-6" />
        <ButtonLink
          href={`/blog/${post.slug}`}
          variant="ghost"
          className="mt-7 justify-start px-0 text-[var(--color-electric)] hover:bg-transparent"
        >
          Read article
          <ArrowUpRight className="ml-2 h-4 w-4" />
        </ButtonLink>
      </div>
    </article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-[color:rgba(11,18,32,0.08)] bg-white shadow-[0_18px_50px_rgba(11,18,32,0.06)]">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative block aspect-[16/10] overflow-hidden bg-[var(--color-cloud)]"
      >
        <PostImage post={post} />
        <span className="absolute inset-0 bg-black/0 transition group-hover:bg-black/8" />
      </Link>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#ED6B37]">
          {post.category}
        </p>
        <Link href={`/blog/${post.slug}`} className="group mt-4 block">
          <h3 className="text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] transition group-hover:text-[var(--color-electric)]">
            {post.title}
          </h3>
        </Link>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">
          {post.excerpt}
        </p>
        <PostMeta post={post} className="mt-6" />
      </div>
    </article>
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
      sizes={
        priority
          ? "(min-width: 1024px) 52vw, 100vw"
          : "(min-width: 1024px) 33vw, 100vw"
      }
      className="object-cover transition duration-500 group-hover:scale-[1.03]"
    />
  );
}

function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <div
      className={`flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.18em] text-[var(--color-muted)] ${className ?? ""}`}
    >
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
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
