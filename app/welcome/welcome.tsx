import { SendIcon } from "@/assets/icons";
import Navbar from "@/components/layout/navbar";
import SectionNavigation from "@/components/layout/sections-navigation";
import Courses from "@/components/sections/courses";
import HeroText from "@/components/sections/hero-text";
import IntroBento from "@/components/sections/intro-bento";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";

export function Welcome() {
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
    </>
  );
}
