import { createClient } from "next-sanity";
import "server-only";
import { apiVersion, dataset, projectId } from "../config";

export const previewToken = process.env.IDEALSOLUTIONS_SANITY_API_READ_TOKEN;

export const isSanityEnabled = Boolean(projectId);

export function getSanityClient(preview = false) {
  if (!isSanityEnabled) {
    return null;
  }

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: preview ? "drafts" : "published",
    token: preview ? previewToken : undefined,
  });
}

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  preview?: boolean;
};

export async function sanityFetch<T>({
  query,
  params,
  tags,
  preview = false,
}: SanityFetchOptions) {
  // Only these collections are managed in the Ideal Solutions Studio.
  if (!tags?.some((tag) => ["posts", "caseStudies", "careerOpenings"].includes(tag))) {
    return null;
  }
  const client = getSanityClient(preview);

  if (!client) {
    return null;
  }

  return client.fetch<T>(query, params ?? {}, {
    next: {
      tags,
      revalidate: preview ? 0 : 60,
    },
  });
}
