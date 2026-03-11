import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

export const getSanityClient = (): SanityClient => {
  if (!_client) {
    _client = createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID ?? "",
      dataset: import.meta.env.VITE_SANITY_DATASET ?? "production",
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION ?? "2024-06-15",
      useCdn: import.meta.env.VITE_SANITY_USE_CDN === "true",
      stega: false,
    });
  }
  return _client;
};
