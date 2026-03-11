import type { SanityDocument, SanityReference } from "./sanity";
import type { Student } from "./students";

/** Reference as stored in Sanity (unexpanded) */
type StudentRef = SanityReference;

/** Reference expanded via GROQ — use when your query dereferences the field */
type StudentExpanded = Student;

export interface Team extends SanityDocument {
  _type: "teams";
  name?: string;
  team_lead?: StudentRef | StudentExpanded;
  team_members?: (StudentRef | StudentExpanded)[];
  project_link?: string;
}
