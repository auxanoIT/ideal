import { AboutGeneaInspired } from "@/components/sections/about-genea-inspired";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About Ideal Solutions | Data Centre Infrastructure Support Nigeria",
  description:
    "Ideal Solutions provides onsite data centre and IT infrastructure support for critical environments and enterprise teams in Nigeria.",
  path: "/about",
  keywords: [
    "about Ideal Solutions",
    "data centre infrastructure support Nigeria",
    "IT infrastructure company Nigeria",
    "Smart Hands services Nigeria",
    "onsite technical support Nigeria",
  ],
});

export default function AboutPage() {
  return <AboutGeneaInspired />;
}
