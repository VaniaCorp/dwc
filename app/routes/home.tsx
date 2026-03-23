import * as React from "react";
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
import MobileGate from "@/components/layout/mobile-gate";
import { Link } from "react-router";

const MOBILE_LAYOUT_QUERY = "(max-width: 830px)";

const isMobileLayout = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(MOBILE_LAYOUT_QUERY).matches;

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Design with Chike" },
    {
      name: "description",
      content:
        "Learn to create stunning illustrations and vector art from scratch with expert guidance",
    },
    {
      name: "keywords",
      content:
        "design, chike, illustrations, vector art, learning, figma, product design, pen tool, designwithchike, chikeivor designwithchike, dwc, dwchq, figma, figma illustration, figma illustrator, figma pentool, pentool, pentool benders",
    },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: "designwithchike" },
    {
      name: "twitter:description",
      content:
        "Learn to create stunning illustrations and vector art from scratch with expert guidance",
    },
    {
      name: "twitter:image",
      content:
        "https://res.cloudinary.com/dgtoh3s2a/image/upload/v1774273954/dwc_pllnfy.png",
    },
    { name: "twitter:creator", content: "@chikeivor" },
    { name: "twitter:creator:id", content: "https://x.com/chikeoivor" },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: "https://www.linkedin.com/company/design-with-chike/",
    },
    { property: "og:title", content: "Design With Chike" },
    {
      property: "og:description",
      content: "Hey, let's bend those lines",
    },
    { property: "og:site_name", content: "Design with Chike" },
    {
      property: "og:image",
      content:
        "https://res.cloudinary.com/dgtoh3s2a/image/upload/v1774274236/dwc-students_ktaptd.png",
    },
  ];
}

export async function clientLoader() {
  // Mobile renders only the gate component; skip section data requests.
  if (isMobileLayout()) {
    return { faqs: [], students: [], teams: [], comments: [] };
  }

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
  const [mobileOnly, setMobileOnly] = React.useState<boolean>(isMobileLayout);

  React.useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    )
      return;

    const mql = window.matchMedia(MOBILE_LAYOUT_QUERY);
    const updateMobileState = (event: MediaQueryListEvent) =>
      setMobileOnly(event.matches);

    setMobileOnly(mql.matches);
    mql.addEventListener("change", updateMobileState);

    return () => {
      mql.removeEventListener("change", updateMobileState);
    };
  }, []);

  if (mobileOnly) {
    return <MobileGate />;
  }

  return (
    <div className="w-full h-full">
      <Navbar />
      <main
        className="w-full 2xl:h-[57vh] flex items-center flex-col justify-center pt-4 xl:pt-16 pb-4"
        data-cursor-slot="#FFCE2B"
      >
        <IntroBento />
        <HeroText />
        <Link to="https://bit.ly/designwithchike" target="_blank">
          <LiquidGlassButton className="flex items-center text-xl! gap-3 px-24 py-6 mt-18 rounded-3xl">
            <SendIcon />
            Get Started
          </LiquidGlassButton>
        </Link>
      </main>

      <SectionNavigation />

      <section className="w-full pb-20" id="courses" data-cursor-slot="#FF3434">
        <Courses />
      </section>

      <SectionNavigation />

      <section
        className="w-full pb-20"
        id="students"
        data-cursor-slot="#689CF5"
      >
        <StudentsDisplay students={students} />
      </section>

      <SectionNavigation />

      <section className="w-full pb-20" id="team" data-cursor-slot="#9B1CFF">
        <TeamsDisplay teams={teams} />
      </section>

      <SectionNavigation />

      <section
        className="w-full pb-20"
        id="feedbacks"
        data-cursor-slot="#ACFD85"
      >
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
