import {
  FigmaLine,
  Cursor,
  DWCPen,
  Circles,
  Spring,
  Persons,
} from "@/assets/images";
import { LiquidGlassCard } from "../ui/liquid-glass-card";
import { CurvedLine, FourStarIcon } from "@/assets/icons";
import type { SVGProps } from "react";

type Course = {
  title: string;
  icon: React.FC<SVGProps<SVGSVGElement>>;
  color: string;
  objectives: string[];
};

const courses: Course[] = [
  {
    title: "Introduction to Figma",
    icon: FigmaLine,
    color: "#FFCE2B",
    objectives: [
      "Participants will be able to navigate Figma.",
      "Participants will be able to understand the tools available on Figma.",
    ],
  },
  {
    title: "Mastery of Figma Illustration Tools",
    icon: Cursor,
    color: "#689CF5",
    objectives: [
      "Participants will be able to learn the basic illustration tools on Figma.",
      "Participants will be able to understand the use of each tool and how to apply it.",
    ],
  },
  {
    title: "Use of Figma Pen-Tool",
    icon: DWCPen,
    color: "#9B1CFF",
    objectives: [
      "Participants will be able to practice with the Figma Pen Tool.",
      "Participants will be able to understand the principles guiding the use of the Figma Pen Tool.",
    ],
  },
  {
    title: "BASIC PRINCIPLES OF ADDING COLOUR",
    icon: Circles,
    color: "#ACFD85",
    objectives: [
      "Participants will learn how to add colours to their illustrations.",
      "Participants will be able to understand gradients and how to apply it. ",
    ],
  },
  {
    title: "USE OF FIGMA EFFECTS TO CREATE 3D ILLUSTRATIONS",
    icon: Spring,
    color: "#FFCE2B",
    objectives: [
      "Participants will understand how to use effects.",
      "Participants will be able to understand blend mode and how to apply it.",
    ],
  },
  {
    title: "PROJECT & CERTIFICATION",
    icon: Persons,
    color: "#689CF5",
    objectives: [
      "Participants will work in a group to execute a project.",
      "Participants will be issued certification of completion on the day of graduation.",
    ],
  },
];

function CourseCard({ course }: { course: Course }) {
  const Icon = course.icon;

  return (
    <LiquidGlassCard className="flex h-98 p-4 gap-3">
      <aside className="w-[45%] shrink-0 h-full bg-background/35 border border-white/10 flex items-center justify-center rounded-2xl overflow-hidden">
        <Icon className="w-3/4 h-auto max-h-[80%] object-contain" />
      </aside>

      <article className="flex-1 min-w-0 grid grid-rows-[9rem_auto_1fr] pt-6 gap-3">
        <h2 className="h3 xl:h2 font-bold! uppercase self-start">
          {course.title}
        </h2>

        <div className="inline-flex flex-col w-max">
          <p className="p text-center" style={{ color: course.color }}>
            Objectives
          </p>
          <CurvedLine color={course.color} className="w-full h-1.5" />
        </div>

        <ul className="space-y-2 self-start">
          {course.objectives.map((obj, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-white/80 leading-snug"
            >
              <FourStarIcon
                className="size-3.5 shrink-0 mt-0.5"
                style={{ color: course.color }}
              />
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </article>
    </LiquidGlassCard>
  );
}

export default function Courses() {
  return (
    <div className="w-full mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-5 max-2xl:px-6">
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
}
