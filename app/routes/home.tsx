import type { Route } from "./+types/home";
import { SendIcon } from "@/assets/icons";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SectionNavigation from "@/components/layout/sections-navigation";
import Courses from "@/components/sections/courses";
import FAQs from "@/components/sections/faqs";
import StudentsDisplay from "@/components/sections/students";
import TeamsDisplay from "@/components/sections/teams";
import HeroText from "@/components/sections/hero-text";
import IntroBento from "@/components/sections/intro-bento";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";
import {
  getComments,
  getFaqs,
  getStudents,
  getTeams,
} from "@/lib/sanity/queries";
import CommentsDisplay from "@/components/sections/comments";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Design with Chike" },
    {
      name: "description",
      content: "Welcome to the Design with Chike Website",
    },
  ];
}

export async function clientLoader() {
  try {
    const faqs = await getFaqs();
    const students = await getStudents();
    const teams = await getTeams();
    const comments = await getComments();
    return { faqs, students, teams, comments };
  } catch (error) {
    console.error("[clientLoader] Failed to fetch Sanity data:", error);
    return { faqs: [], students: [], teams: [], comments: [] };
  }
}

clientLoader.hydrate = true;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { faqs, students, teams, comments } = loaderData;

  return (
    <div className="w-full h-full">
      <Navbar />
      <main
        className="w-full 2xl:h-[57vh] flex items-center flex-col justify-center pt-4 xl:pt-16 pb-4"
        data-cursor-slot="#FFCE2B"
      >
        <IntroBento />
        <HeroText />
        <LiquidGlassButton className="flex items-center text-xl! gap-3 px-24 py-6 mt-18 rounded-3xl">
          <SendIcon />
          Get Started
        </LiquidGlassButton>
      </main>

      <SectionNavigation />

      <section className="w-full" id="courses" data-cursor-slot="#FF3434">
        <Courses />
      </section>

      <SectionNavigation />

      <section className="w-full" id="students" data-cursor-slot="#689CF5">
        <StudentsDisplay students={students} />
      </section>

      <SectionNavigation />

      <section className="w-full" id="team" data-cursor-slot="#9B1CFF">
        <TeamsDisplay teams={teams} />
      </section>

      <SectionNavigation />

      <section className="w-full" id="feedbacks" data-cursor-slot="#ACFD85">
        <CommentsDisplay comments={comments} />
      </section>

      <SectionNavigation />

      <section className="w-full" id="faqs" data-cursor-slot="#FFCE2B">
        <FAQs faqs={faqs} />
      </section>

      <Footer />
    </div>
  );
}
