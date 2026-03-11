import type { Route } from "./+types/home";
import { SendIcon } from "@/assets/icons";
import Navbar from "@/components/layout/navbar";
import SectionNavigation from "@/components/layout/sections-navigation";
import Courses from "@/components/sections/courses";
import FAQs from "@/components/sections/faqs";
import HeroText from "@/components/sections/hero-text";
import IntroBento from "@/components/sections/intro-bento";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";
import { getFaqs } from "@/lib/sanity/queries";

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
    return { faqs };
  } catch (error) {
    console.error("[clientLoader] Failed to fetch Sanity data:", error);
    return { faqs: [] };
  }
}

clientLoader.hydrate = true;

export default function Home({ loaderData }: Route.ComponentProps) {
  const { faqs } = loaderData;

  return (
    <>
      <Navbar />
      <main
        className="w-full h-[57vh] flex items-center flex-col justify-center pt-16 pb-4"
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

      <section className="w-full" id="faqs" data-cursor-slot="#FFCE2B">
        <FAQs faqs={faqs} />
      </section>

      <SectionNavigation />
    </>
  );
}
