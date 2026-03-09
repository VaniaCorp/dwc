import Navbar from "@/components/layout/navbar";
import HeroText from "@/components/sections/hero-text";

export function Welcome() {
  return (
    <>
      <Navbar />
      <main className="flex items-center justify-center pt-16 pb-4 no-scrollbar">
        <HeroText />
      </main>
    </>
  );
}
