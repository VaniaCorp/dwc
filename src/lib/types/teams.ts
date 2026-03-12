import type { SanityDocument, SanityImage } from "./sanity";

export interface Team extends SanityDocument {
  _type: "teams";
  name?: string;
  team_image?: SanityImage;
  project_link?: string;
}
