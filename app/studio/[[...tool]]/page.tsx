import type { Metadata } from "next";

import { redirect } from "next/navigation";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function StudioPage({ params }: { params: Promise<{ tool?: string[] }> }) {
  const { tool = [] } = await params;
  redirect(`/sanity${tool.length ? `/${tool.map(encodeURIComponent).join("/")}` : ""}`);
}
