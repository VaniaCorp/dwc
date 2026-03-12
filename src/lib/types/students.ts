import type { SanityDocument, SanityImage } from "./sanity";

export interface Student extends SanityDocument {
  _type: "students";
  name?: string;
  image?: SanityImage;
}
