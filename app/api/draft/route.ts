import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") ?? "/";

  const expectedSecret = process.env.IDEALSOLUTIONS_SANITY_REVALIDATE_SECRET;
  if (!expectedSecret || !process.env.IDEALSOLUTIONS_SANITY_API_READ_TOKEN || secret !== expectedSecret) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  if (!slug.startsWith("/") || slug.startsWith("//") || slug.includes("\\")) {
    return NextResponse.json({ error: "Invalid preview path" }, { status: 400 });
  }

  const preview = await draftMode();
  preview.enable();

  return NextResponse.redirect(new URL(slug, request.url));
}
