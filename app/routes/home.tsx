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

const SITE_URL = "https://dwchq.co.uk/";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dgtoh3s2a/image/upload/v1777793802/dwc_2_boasga.png";

const MOBILE_LAYOUT_QUERY = "(max-width: 830px)";

const isMobileLayout = () =>
  typeof window !== "undefined" &&
  typeof window.matchMedia === "function" &&
  window.matchMedia(MOBILE_LAYOUT_QUERY).matches;

const metaTitle = "DWC (Design with Chike) | Figma pen-tool bootcamp — 8 weeks";
const metaDescription =
  "DWC — live virtual Figma illustration training (designwithchike). Master the pen tool and vector illustration in 8 weeks. Visit dwchq.co.uk.";
const metaKeywords =
  "DWC, dwc, design with chike, designwithchike, dwchq, dwchq.co.uk, figma bootcamp, figma pen tool, figma illustration, vector art, live illustration training, product design, pentool";

export function meta({}: Route.MetaArgs) {
  return [
    { title: metaTitle },
    {
      tagName: "link",
      rel: "canonical",
      href: SITE_URL,
    },
    {
      name: "description",
      content: metaDescription,
    },
    {
      name: "keywords",
      content: metaKeywords,
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: metaTitle },
    {
      name: "twitter:description",
      content: metaDescription,
    },
    {
      name: "twitter:image",
      content: DEFAULT_OG_IMAGE,
    },
    { name: "twitter:site", content: "@designwithchike" },
    { name: "twitter:creator", content: "@chikeivor" },
    { property: "og:type", content: "website" },
    {
      property: "og:url",
      content: SITE_URL,
    },
    { property: "og:title", content: metaTitle },
    {
      property: "og:description",
      content: metaDescription,
    },
    { property: "og:site_name", content: "DWC (Design with Chike)" },
    {
      property: "og:image",
      content: DEFAULT_OG_IMAGE,
    },
    {
      property: "og:image:alt",
      content:
        "DWC — Design with Chike: Figma pen-tool and illustration training",
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
