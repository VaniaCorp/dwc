import type { Team } from "@/lib/types";
import Image from "../ui/image";
import { Arrow } from "@/assets/icons";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

const INITIAL_OFFSET = 280;

export default function TeamsDisplay({ teams }: { teams: Team[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let targetX = INITIAL_OFFSET;
    let currentX = INITIAL_OFFSET;
    gsap.set(track, { x: currentX });

    let rafId: number;
    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      gsap.set(track, { x: currentX });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const getMinX = () => container.offsetWidth - track.scrollWidth;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontalSwipe = Math.abs(e.deltaX) > Math.abs(e.deltaY);
      if (isHorizontalSwipe || e.shiftKey) {
        e.preventDefault();
        const delta = e.shiftKey && !isHorizontalSwipe ? e.deltaY : e.deltaX;
        targetX = Math.max(
          getMinX(),
          Math.min(INITIAL_OFFSET, targetX - delta)
        );
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    // Set initial hidden states for all cards before observer fires
    const cards = Array.from(track.children) as HTMLElement[];
    cards.forEach((card) => {
      gsap.set(card.querySelector(".team-badge"), {
        scale: 0,
        transformOrigin: "center center",
      });
      gsap.set(card.querySelector(".team-heading"), { yPercent: 100 });
      gsap.set(card.querySelector(".team-image"), { yPercent: 150 });
      gsap.set(card.querySelector(".team-button"), { yPercent: 110 });
    });

    // Play entrance timeline once per card as it enters the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const card = entry.target as HTMLElement;
          const badge = card.querySelector(".team-badge");
          const heading = card.querySelector(".team-heading");
          const image = card.querySelector(".team-image");
          const button = card.querySelector(".team-button");

          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

          tl.to(badge, { scale: 1, ease: "back.out(3)", duration: 0.5 })
            .to(heading, { yPercent: 0, duration: 0.7 }, "-=0.25")
            .to(image, { yPercent: 0, duration: 0.65 }, "-=0.5")
            .to(
              button,
              {
                yPercent: 0,
                ease: "elastic.out(1, 0.6)",
                duration: 0.9,
              },
              "-=0.3"
            );

          observer.unobserve(card);
        });
      },
      { threshold: 0.25 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      container.removeEventListener("wheel", handleWheel);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, [teams.length]);

  return (
    <div ref={containerRef} className="w-full pb-32 overflow-hidden">
      <div ref={trackRef} className="flex flex-row gap-4">
        {teams.map((item, idx) => (
          <div key={idx} className="shrink-0 w-92">
            <div className="w-full h-full px-10 py-6 flex flex-col items-start gap-2 bg-white border-6 border-purple rounded-[36.15px]">
              <div className="overflow-hidden">
                <span className="team-badge block text-xs px-3 py-1 rounded-2xl text-black border-2 border-background">
                  Project
                </span>
              </div>

              <div className="w-max overflow-hidden">
                <h3 className="team-heading h3 text-background/80 whitespace-nowrap capitalize">
                  Team {item.name}
                </h3>
              </div>

              <div className="w-full h-22 overflow-hidden">
                <Image
                  src={item.team_image!.asset.url!}
                  width={0}
                  height={0}
                  className="team-image w-full h-full"
                />
              </div>

              <div className="overflow-hidden self-end">
                <button
                  type="button"
                  className="team-button px-4 py-2 text-purple flex items-center gap-3 border-2 border-purple rounded-2xl"
                >
                  View Project
                  <Arrow className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
