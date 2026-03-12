import type { SanityDocument, SanityImage } from "./sanity";

export interface Comment extends SanityDocument {
  _type: "comments";
  title?: string;
  image?: SanityImage;
}
