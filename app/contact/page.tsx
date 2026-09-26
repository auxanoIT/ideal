import { permanentRedirect } from "next/navigation";

// Preserve old bookmarks and enquiry context without a duplicate contact page.
export default async function ContactRedirect({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    for (const item of Array.isArray(value) ? value : value === undefined ? [] : [value]) params.append(key, item);
  }
  permanentRedirect(`/book-consultation${params.size ? `?${params}` : ""}#project-enquiry`);
}
