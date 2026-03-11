import type { SanityDocument, SanityImage } from "./sanity";

export interface Comment extends SanityDocument {
  _type: "comments";
  name?: string;
  image?: SanityImage;
  comment?: string;
}
