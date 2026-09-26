import type { Metadata } from "next";
import { StudioApp } from "@/components/studio/studio-app";

export const dynamic = "force-static";
export const metadata: Metadata = {
  title: "Content Studio",
  robots: { index: false, follow: false },
};

export default function SanityPage() {
  return <StudioApp />;
}
