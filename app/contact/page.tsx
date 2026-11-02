import { ContactRedirect } from "@/components/forms/contact-redirect";

// Preserve old bookmarks and enquiry context without a duplicate contact page.
export default async function ContactPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    for (const item of Array.isArray(value) ? value : value === undefined ? [] : [value]) params.append(key, item);
  }
  // Old, arbitrary or repeated attribution markers never control the handoff.
  params.delete("enquiryContext");
  const destination = `/book-consultation${params.size ? `?${params}` : ""}#project-enquiry`;
  return <ContactRedirect destination={destination} />;
}
