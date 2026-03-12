import type { Student } from "@/lib/types";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Image from "../ui/image";

const INITIAL_OFFSET = 280;

export default function StudentsDisplay({ students }: { students: Student[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let targetX = INITIAL_OFFSET;
    let currentX = INITIAL_OFFSET;
    gsap.set(track, { x: currentX });

    // Cache card metrics once — layout won't change at runtime
    const cards = Array.from(track.children) as HTMLElement[];
    const cardMetrics = cards.map((el) => ({
      el,
      offsetLeft: el.offsetLeft,
      halfWidth: el.offsetWidth / 2,
    }));

    let containerHalfWidth = container.offsetWidth / 2;

    // velocity tracks delta magnitude per wheel event; decays per frame.
    // scrollActivity is derived from velocity — mirrors deceleration exactly.
    let velocity = 0;
    let scrollActivity = 0;

    const applyCardTransforms = () => {
      cardMetrics.forEach(({ el, offsetLeft, halfWidth }) => {
        const cardCenter = currentX + offsetLeft + halfWidth;
        const t =
          (cardCenter - containerHalfWidth) / (containerHalfWidth * 1.1);
        const clamped = Math.max(-1.5, Math.min(1.5, t));

        const targetRotateY = clamped * 50;
        const targetScale = Math.max(0.55, 1 - Math.abs(clamped) * 0.3);

        gsap.set(el, {
          transformPerspective: 1200,
          rotateY: targetRotateY * scrollActivity,
          scale: 1 + (targetScale - 1) * scrollActivity,
          transformOrigin: "center center",
        });
      });
    };

    let rafId: number;
    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      // Decay velocity each frame — when wheel events stop firing, this reaches 0
      velocity *= 0.85;
      // Normalize: 20px/event = full effect, scales linearly below that
      scrollActivity = Math.min(1, velocity / 40);
      gsap.set(track, { x: currentX });
      applyCardTransforms();
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
        // Set velocity to actual delta magnitude — reflects real scroll speed
        velocity = Math.abs(delta);
      }
    };

    const handleResize = () => {
      containerHalfWidth = container.offsetWidth / 2;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(rafId);
    };
  }, [students.length]);

  return (
    <div ref={containerRef} className="w-full pb-20 overflow-hidden">
      <div ref={trackRef} className="flex flex-row gap-4 pr-8">
        {students.map((student, idx) => (
          <div key={idx} className="shrink-0 w-95">
            <Image
              src={student.image?.asset.url || ""}
              width={9}
              height={16}
              className="carousel-item"
              style={{ width: "480px", height: "641px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
