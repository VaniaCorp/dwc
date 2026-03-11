import type { SanityDocument } from "./sanity";

export interface FAQ extends SanityDocument {
  _type: "faqs";
  question: string;
  answer: string;
}
