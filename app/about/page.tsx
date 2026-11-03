import { AboutGeneaInspired } from "@/components/sections/about-genea-inspired";
import { buildMetadata } from "@/lib/seo";

const description =
  "Meet Ideal Solutions: onsite deployment, technical support and infrastructure expertise for data centre operators and enterprise IT teams in Nigeria.";

const baseMetadata = buildMetadata({
  title: "About Ideal Solutions | Data Centre Infrastructure Services Nigeria",
  description,
  path: "/about",
  keywords: [
    "about Ideal Solutions",
    "data centre infrastructure support Nigeria",
    "IT infrastructure company Nigeria",
    "Smart Hands services Nigeria",
    "onsite technical support Nigeria",
  ],
});

export const metadata = {
  ...baseMetadata,
  description,
  openGraph: { ...baseMetadata.openGraph, description },
  twitter: { ...baseMetadata.twitter, description },
};

export default function AboutPage() {
  return <AboutGeneaInspired />;
}
