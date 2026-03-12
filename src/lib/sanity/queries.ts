import type { FAQ } from "@/lib/types/faqs";
import type { Comment } from "@/lib/types/comments";
import type { Student } from "@/lib/types/students";
import type { Team } from "@/lib/types/teams";
import { getSanityClient } from "./sanity.client";

export const getFaqs = (): Promise<FAQ[]> =>
  getSanityClient().fetch(`*[_type == "faqs"] | order(_createdAt asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    question,
    answer
  }`);

export const getComments = (): Promise<Comment[]> =>
  getSanityClient().fetch(`*[_type == "comments"] | order(_createdAt desc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    title,
    image
  }`);

export const getStudents = (): Promise<Student[]> =>
  getSanityClient().fetch(`*[_type == "students"] | order(name asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    name,
    image
  }`);

export const getStudentById = (id: string): Promise<Student | null> =>
  getSanityClient().fetch(
    `*[_type == "students" && _id == $id][0] {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      image
    }`,
    { id }
  );

export const getTeams = (): Promise<Team[]> =>
  getSanityClient().fetch(`*[_type == "teams"] | order(name asc) {
    _id, _type, _createdAt, _updatedAt, _rev,
    name,
    team_image,
    project_link
  }`);

export const getTeamById = (id: string): Promise<Team | null> =>
  getSanityClient().fetch(
    `*[_type == "teams" && _id == $id][0] {
      _id, _type, _createdAt, _updatedAt, _rev,
      name,
      team_image,
      project_link
    }`,
    { id }
  );
