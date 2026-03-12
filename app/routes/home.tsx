import type { Route } from "./+types/home";
import { SendIcon } from "@/assets/icons";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SectionNavigation from "@/components/layout/sections-navigation";
import Courses from "@/components/sections/courses";
import FAQs from "@/components/sections/faqs";
import StudentsDisplay from "@/components/sections/students";
import HeroText from "@/components/sections/hero-text";
import IntroBento from "@/components/sections/intro-bento";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";
import { getFaqs, getStudents } from "@/lib/sanity/queries";

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
    return { faqs, students };
  } catch (error) {
    console.error("[clientLoader] Failed to fetch Sanity data:", error);
    return { faqs: [], students: [] };
  }
}

clientLoader.hydrate = true;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { faqs, students } = loaderData;

  return (
    <>
      <Navbar />
      <main
        className="w-full h-max 2xl:h-[57vh] flex items-center flex-col justify-center pt-4 xl:pt-16 pb-4"
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

      <section className="w-full" id="faqs" data-cursor-slot="#FFCE2B">
        <FAQs faqs={faqs} />
      </section>

      <Footer />
    </>
  );
}
