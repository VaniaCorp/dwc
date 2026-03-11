import type { SanityDocument, SanityImage, SanityColor } from "./sanity";

export interface Student extends SanityDocument {
  _type: "students";
  name?: string;
  image?: SanityImage;
  color?: SanityColor;
}
