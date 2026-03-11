import { createClient } from "@sanity/client";
import type { FAQ } from "@/lib/types/faqs";
import type { Comment } from "@/lib/types/comments";
import type { Student } from "@/lib/types/students";
import type { HallOfFame } from "@/lib/types/hall-of-fame";
import type { Team } from "@/lib/types/teams";

let _client: ReturnType<typeof createClient> | null = null;

const getSanityClient = () => {
  if (!_client) {
    _client = createClient({
      projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
      dataset: import.meta.env.VITE_SANITY_DATASET,
      apiVersion: import.meta.env.VITE_SANITY_API_VERSION,
      useCdn: import.meta.env.VITE_SANITY_USE_CDN,
    });
  }
  return _client;
};

export const getFaqs = (): Promise<FAQ[]> =>
  getSanityClient().fetch(`*[_type == "faqs"] | order(_createdAt asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    question,
    answer
  }`);

export const getComments = (): Promise<Comment[]> =>
  getSanityClient().fetch(`*[_type == "comments"] | order(_createdAt desc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    name,
    comment,
    image
  }`);

export const getStudents = (): Promise<Student[]> =>
  getSanityClient().fetch(`*[_type == "students"] | order(name asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    name,
    image,
    color
  }`);

export const getStudentById = (id: string): Promise<Student | null> =>
  getSanityClient().fetch(
    `*[_type == "students" && _id == $id][0] {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      image,
      color
    }`,
    { id }
  );

export const getHallOfFame = (): Promise<HallOfFame[]> =>
  getSanityClient().fetch(`*[_type == "hall-of-fame"] | order(cohort desc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    cohort,
    title,
    color,
    student_name,
    student_image
  }`);

export const getHallOfFameByCohort = (cohort: string): Promise<HallOfFame[]> =>
  getSanityClient().fetch(
    `*[_type == "hall-of-fame" && cohort == $cohort] | order(_createdAt asc) {
      _id, _type, _createdAt, _updatedAt, _rev,
      cohort,
      title,
      color,
      student_name,
      student_image
    }`,
    { cohort }
  );

export const getTeams = (): Promise<Team[]> =>
  getSanityClient().fetch(`*[_type == "teams"] | order(name asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    name,
    project_link,
    team_lead-> {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      image,
      color
    },
    team_members[]-> {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      image,
      color
    }
  }`);

export const getTeamById = (id: string): Promise<Team | null> =>
  getSanityClient().fetch(
    `*[_type == "teams" && _id == $id][0] {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      project_link,
      team_lead-> {
        _id, _type, _createdAt, _updatedAt, _rev,
        name,
        image,
        color
      },
      team_members[]-> {
        _id, _type, _createdAt, _updatedAt, _rev,
        name,
        image,
        color
      }
    }`,
    { id }
  );
