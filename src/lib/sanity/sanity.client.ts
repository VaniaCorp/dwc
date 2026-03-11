import { createClient, type SanityClient } from "@sanity/client";

let _client: SanityClient | null = null;

export const getSanityClient = (): SanityClient => {
  if (!_client) {
    _client = createClient({
      projectId: "7y6sulnq",
      dataset: "production",
      apiVersion: "2024-06-15",
      useCdn: false,
      stega: false,
    });
  }
  return _client;
};
