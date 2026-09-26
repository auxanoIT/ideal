import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type RevalidateBody = {
  _id?: string;
  _type?: string;
  slug?: string | { current?: string };
  paths?: string[];
  tags?: string[];
};

const documentTags: Record<string, string[]> = {
  careerOpening: ["careerOpenings"],
  caseStudy: ["caseStudies"],
  estimatorConfig: ["estimatorConfig"],
  faq: ["faqs"],
  footer: ["footer"],
  navigation: ["navigation"],
  page: ["pages"],
  post: ["posts"],
  service: ["services"],
  siteSettings: ["siteSettings"],
  testimonial: ["testimonials"],
};

const siteWideDocumentTypes = new Set(["footer", "navigation", "siteSettings"]);

export async function POST(request: NextRequest) {
  const secret = process.env.IDEALSOLUTIONS_SANITY_REVALIDATE_SECRET;

  if (!secret) {
    return NextResponse.json(
      { error: "Missing IDEALSOLUTIONS_SANITY_REVALIDATE_SECRET" },
      { status: 500 },
    );
  }

  const { body, isValidSignature } = await parseBody<RevalidateBody>(
    request,
    secret,
  );

  if (!isValidSignature) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!body) {
    return NextResponse.json({ error: "Missing webhook body" }, { status: 400 });
  }

  const slug = getSlug(body.slug);
  const tags = new Set([
    ...(body.tags ?? []),
    ...(body._type ? (documentTags[body._type] ?? []) : []),
  ]);
  const paths = new Set([
    ...(body.paths ?? []),
    ...getPathsForDocument(body._type, slug),
  ]);

  if (!tags.size && !paths.size) {
    return NextResponse.json(
      { error: "No matching tags or paths to revalidate" },
      { status: 400 },
    );
  }

  tags.forEach((tag) => revalidateTag(tag, { expire: 0 }));
  paths.forEach((path) => revalidatePath(path));

  if (body._type && siteWideDocumentTypes.has(body._type)) {
    revalidatePath("/", "layout");
  }

  return NextResponse.json({
    revalidated: true,
    type: body._type ?? null,
    slug: slug ?? null,
    tags: Array.from(tags),
    paths: Array.from(paths),
  });
}

function getSlug(slug: RevalidateBody["slug"]) {
  if (typeof slug === "string") {
    return slug;
  }

  return slug?.current;
}

function getPathsForDocument(type?: string, slug?: string) {
  if (!type) {
    return [];
  }

  switch (type) {
    case "careerOpening":
      return ["/careers"];
    case "caseStudy":
      return ["/case-studies", slug ? `/case-studies/${slug}` : null].filter(
        isPath,
      );
    case "faq":
    case "page":
    case "testimonial":
      return [slug && slug !== "home" ? `/${slug}` : "/"].filter(isPath);
    case "post":
      return ["/blog", slug ? `/blog/${slug}` : null].filter(isPath);
    case "service":
      return ["/services", slug ? `/services/${slug}` : null].filter(isPath);
    default:
      return [];
  }
}

function isPath(value: string | null | undefined): value is string {
  return Boolean(value);
}
