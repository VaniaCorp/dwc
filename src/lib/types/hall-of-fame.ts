import type { SanityDocument, SanityImage, SanityColor } from "./sanity";

export interface HallOfFame extends SanityDocument {
  _type: "hall-of-fame";
  cohort?: string;
  title?: string;
  color?: SanityColor;
  student_name?: string;
  student_image?: SanityImage;
}
