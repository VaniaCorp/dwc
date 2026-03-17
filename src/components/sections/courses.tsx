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
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

function CourseCard({ course, index }: { course: Course; index: number }) {
  const Icon = course.icon;
  const iconRef = useRef<HTMLElement>(null);
  const pathLengths = useRef<number[]>([]);

  useGSAP(
    () => {
      const svg = iconRef.current!.querySelector<SVGSVGElement>("svg");
      if (!svg) return;

      // Cleanup collectors for DOM event listeners (used by card 4)
      const cleanupFns: (() => void)[] = [];

      // ── Card 1: FigmaLine path draw → float loop ──────────────────────────
      if (index === 0) {
        const paths = iconRef.current!.querySelectorAll<SVGPathElement>("path");
        if (paths.length < 2) return;

        if (pathLengths.current.length === 0) {
          pathLengths.current = Array.from(paths).map((p) =>
            p.getTotalLength()
          );
        }
        const [len0, len1] = pathLengths.current;

        gsap.set(paths[0], { strokeDasharray: len0, strokeDashoffset: len0 });
        gsap.set(paths[1], { strokeDasharray: len1, strokeDashoffset: len1 });

        const tl = gsap.timeline({ repeat: -1 });

        tl.to(paths[0], {
          strokeDashoffset: 0,
          duration: 3,
          ease: "power1.inOut",
        })
          .to(
            paths[1],
            { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" },
            "<"
          )
          .to(svg, { y: -7, duration: 1.5, ease: "sine.inOut" })
          .to(svg, { y: 0, duration: 1.5, ease: "sine.inOut" })
          .to(paths[0], {
            strokeDashoffset: len0,
            duration: 2,
            ease: "power1.in",
          })
          .to(
            paths[1],
            { strokeDashoffset: len1, duration: 2, ease: "power1.in" },
            "<"
          );
      }

      // ── Card 2: Cursor path draw → drift left/right → click → repeat ──────
      if (index === 1) {
        const path = iconRef.current!.querySelector<SVGPathElement>("path");
        if (!path) return;

        if (pathLengths.current.length === 0) {
          pathLengths.current = [path.getTotalLength()];
        }
        const len = pathLengths.current[0];

        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(svg, { transformOrigin: "8% 1%" });

        const tl = gsap.timeline({ repeat: -1 });

        tl
          // Draw path
          .to(path, {
            strokeDashoffset: 0,
            duration: 2.5,
            ease: "power1.inOut",
          })
          // Drift left → right
          .to(svg, { x: -14, duration: 0.5, ease: "power2.inOut" })
          .to(svg, { x: 14, duration: 0.7, ease: "power2.inOut" })
          // Click — scale press from tip, snap back
          .to(svg, { scale: 0.82, duration: 0.1, ease: "power3.in" })
          .to(svg, { scale: 1, duration: 0.18, ease: "back.out(2)" })
          // Return to center
          .to(svg, { x: 0, duration: 0.6, ease: "power2.out" })
          // Drift left → right again
          .to(svg, { x: -14, duration: 0.5, ease: "power2.inOut" })
          .to(svg, { x: 14, duration: 0.7, ease: "power2.inOut" })
          // Click again
          .to(svg, { scale: 0.82, duration: 0.1, ease: "power3.in" })
          .to(svg, { scale: 1, duration: 0.18, ease: "back.out(2)" })
          // Clear path
          .to(svg, { x: 0, duration: 0.4, ease: "power2.out" })
          .to(path, {
            strokeDashoffset: len,
            duration: 1.8,
            ease: "power1.in",
          });
      }

      // ── Card 3: All paths drawn in → wait → serious face → squiggle write → clear ──
      if (index === 2) {
        const paths = Array.from(
          iconRef.current!.querySelectorAll<SVGPathElement>("path")
        );
        const ellipses = Array.from(
          iconRef.current!.querySelectorAll<SVGEllipseElement>("ellipse")
        );
        const circles = Array.from(
          iconRef.current!.querySelectorAll<SVGCircleElement>("circle")
        );

        const all = [...paths, ...ellipses, ...circles] as SVGGeometryElement[];
        if (all.length === 0) return;

        // Cache every element's total length once
        if (pathLengths.current.length === 0) {
          pathLengths.current = all.map((el) => el.getTotalLength());
        }

        // Hide every element via strokeDashoffset — no fades
        all.forEach((el, i) => {
          gsap.set(el, {
            strokeDasharray: pathLengths.current[i],
            strokeDashoffset: pathLengths.current[i],
          });
        });

        // Scale origins for face elements
        gsap.set(ellipses, { transformOrigin: "50% 50%" });
        gsap.set(paths[4], { transformOrigin: "50% 50%" });

        const eyebrows = [paths[2], paths[3]]; // brow paths sit above eyes
        const mouthPath = paths[4]; // complex face / mouth path

        const tl = gsap.timeline({ repeat: -1 });

        tl
          // 1. Draw — fromTo is explicit on every cycle, no ambiguity
          .fromTo(
            all,
            { strokeDashoffset: (i) => pathLengths.current[i] },
            { strokeDashoffset: 0, duration: 3, ease: "power1.inOut" }
          )
          // 2. Wait after fully revealed
          .to({}, { duration: 0.7 })
          // 3. Serious face — brows heavy, eyes narrow, mouth tight
          .to(eyebrows, { y: 5, duration: 0.3, ease: "power2.out" })
          .to(ellipses, { scaleY: 0.5, duration: 0.3, ease: "power2.out" }, "<")
          .to(
            mouthPath,
            {
              scaleX: 0.78,
              scaleY: 0.55,
              y: -2,
              duration: 0.3,
              ease: "power2.out",
            },
            "<"
          )
          // 4. Squiggle writing — 3 passes left/right with y wobble
          // Pass 1: right
          .to(svg, { x: -18, y: -5, duration: 0.32, ease: "none" })
          .to(svg, { x: 0, y: 4, duration: 0.28, ease: "none" })
          .to(svg, { x: 18, y: -5, duration: 0.32, ease: "none" })
          .to(svg, { x: 38, y: 4, duration: 0.28, ease: "none" })
          // Pass 2: back left
          .to(svg, { x: 22, y: -4, duration: 0.28, ease: "none" })
          .to(svg, { x: 6, y: 5, duration: 0.3, ease: "none" })
          .to(svg, { x: -14, y: -4, duration: 0.32, ease: "none" })
          .to(svg, { x: -38, y: 4, duration: 0.28, ease: "none" })
          // Pass 3: right again
          .to(svg, { x: -22, y: -5, duration: 0.3, ease: "none" })
          .to(svg, { x: -6, y: 4, duration: 0.28, ease: "none" })
          .to(svg, { x: 16, y: -4, duration: 0.32, ease: "none" })
          .to(svg, { x: 38, y: 4, duration: 0.28, ease: "none" })
          // Return to origin
          .to(svg, { x: 0, y: 0, duration: 0.55, ease: "power2.out" })
          // 5. Face returns to normal
          .to(eyebrows, { y: 0, duration: 0.3, ease: "back.out(1.5)" })
          .to(
            ellipses,
            { scaleY: 1, duration: 0.3, ease: "back.out(1.5)" },
            "<"
          )
          .to(
            mouthPath,
            {
              scaleX: 1,
              scaleY: 1,
              y: 0,
              duration: 0.3,
              ease: "back.out(1.5)",
            },
            "<"
          )
          // 6. Brief pause, then clear — fromTo guarantees start from fully drawn
          .to({}, { duration: 0.4 })
          .fromTo(
            all,
            { strokeDashoffset: 0 },
            {
              strokeDashoffset: (i) => pathLengths.current[i],
              duration: 2,
              ease: "power1.in",
            }
          );
      }

      // ── Card 4: Base outlines draw → colored circles draw → white→color bloom → alternate blink + hover ──
      if (index === 3) {
        const paths = Array.from(
          iconRef.current!.querySelectorAll<SVGPathElement>("path")
        );
        if (paths.length < 8) return;

        const basePaths = paths.slice(0, 4); // stroke-only outlines
        const coloredPaths = paths.slice(4, 8); // filled circles
        const fillColors = ["#689CF5", "#ACFD85", "#FF3434", "#9B1CFF"];

        // Cache all lengths once
        if (pathLengths.current.length === 0) {
          pathLengths.current = paths.map((p) => p.getTotalLength());
        }

        // Initial state — everything hidden, colored fills forced to white
        paths.forEach((p, i) => {
          gsap.set(p, {
            strokeDasharray: pathLengths.current[i],
            strokeDashoffset: pathLengths.current[i],
          });
        });
        gsap.set(coloredPaths, { fill: "white", cursor: "pointer" });

        // Blink loop — diagonal pairs alternate: (blue+red) vs (green+purple)
        const pairA = [coloredPaths[0], coloredPaths[2]]; // blue + red
        const pairB = [coloredPaths[1], coloredPaths[3]]; // green + purple

        const blinkTl = gsap.timeline({ repeat: -1, paused: true });
        blinkTl
          .to(pairA, { opacity: 0.25, duration: 0.55, ease: "power2.inOut" })
          .to(pairB, { opacity: 1, duration: 0.55, ease: "power2.inOut" }, "<")
          .to({}, { duration: 0.3 })
          .to(pairA, { opacity: 1, duration: 0.55, ease: "power2.inOut" })
          .to(
            pairB,
            { opacity: 0.25, duration: 0.55, ease: "power2.inOut" },
            "<"
          )
          .to({}, { duration: 0.3 });

        // One-time intro — plays once then hands off to blinkTl
        const intro = gsap.timeline({
          onComplete: () => {
            blinkTl.play();
          },
        });

        intro
          // Draw base outlines
          .fromTo(
            basePaths,
            { strokeDashoffset: (i) => pathLengths.current[i] },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power1.inOut",
              stagger: 0.12,
            }
          )
          // Draw colored circles on top, overlapping slightly
          .fromTo(
            coloredPaths,
            { strokeDashoffset: (i) => pathLengths.current[i + 4] },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power1.inOut",
              stagger: 0.12,
            },
            "-=0.8"
          )
          // Color blooms in sequentially
          .to(
            coloredPaths[0],
            { fill: fillColors[0], duration: 0.45, ease: "power2.inOut" },
            "-=0.15"
          )
          .to(
            coloredPaths[1],
            { fill: fillColors[1], duration: 0.45, ease: "power2.inOut" },
            "<0.12"
          )
          .to(
            coloredPaths[2],
            { fill: fillColors[2], duration: 0.45, ease: "power2.inOut" },
            "<0.12"
          )
          .to(
            coloredPaths[3],
            { fill: fillColors[3], duration: 0.45, ease: "power2.inOut" },
            "<0.12"
          );

        // Hover — pause blink, dim others, brighten hovered; restart cleanly on leave
        // NOTE: no overwrite — overwrite:true kills the timeline's own child tweens
        // permanently. While blinkTl is paused there is no competition, so standalone
        // tweens run freely. blinkTl.restart() reclaims control once hover ends.
        let hovered = false;

        coloredPaths.forEach((path) => {
          const onEnter = () => {
            hovered = true;
            blinkTl.pause();
            gsap.to(
              coloredPaths.filter((p) => p !== path),
              { opacity: 0.2, duration: 0.2 }
            );
            gsap.to(path, { opacity: 1, duration: 0.2 });
          };

          const onLeave = () => {
            hovered = false;
            gsap.to(coloredPaths, {
              opacity: 1,
              duration: 0.2,
              onComplete: () => {
                // guard: if cursor slid to another circle before this completed, skip
                if (!hovered) blinkTl.restart();
              },
            });
          };

          path.addEventListener("mouseenter", onEnter);
          path.addEventListener("mouseleave", onLeave);
          cleanupFns.push(() => {
            path.removeEventListener("mouseenter", onEnter);
            path.removeEventListener("mouseleave", onLeave);
          });
        });
      }

      // ── Card 5: Spring wind-in → compress/bounce → 3D rotation loop → unwind ──
      if (index === 4) {
        const allPaths = Array.from(
          iconRef.current!.querySelectorAll<SVGPathElement>("path")
        );
        if (allPaths.length === 0) return;

        // Cache all 14 path lengths once
        if (pathLengths.current.length === 0) {
          pathLengths.current = allPaths.map((p) => p.getTotalLength());
        }

        allPaths.forEach((p, i) => {
          gsap.set(p, {
            strokeDasharray: pathLengths.current[i],
            strokeDashoffset: pathLengths.current[i],
          });
        });

        gsap.set(svg, { transformOrigin: "50% 50%" });

        // Reversed array for staggered unwind (paths[13] → paths[0])
        const reversed = [...allPaths].reverse();

        const tl = gsap.timeline({ repeat: -1 });

        tl
          // 1. Staggered wind-in — coils appear one by one
          .fromTo(
            allPaths,
            { strokeDashoffset: (i) => pathLengths.current[i] },
            {
              strokeDashoffset: 0,
              duration: 1.5,
              ease: "power1.inOut",
              stagger: 0.06,
            }
          )
          // Pause — fully wound
          .to({}, { duration: 0.2 })
          // 2. Compress down, elastic snap back
          .to(svg, { scaleY: 0.65, duration: 0.28, ease: "power3.in" })
          .to(svg, { scaleY: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" })
          // 3. Two full 3D rotation cycles via scaleX oscillation
          .to(svg, { scaleX: 0.15, duration: 1.5, ease: "sine.inOut" })
          .to(svg, { scaleX: 1, duration: 1.5, ease: "sine.inOut" })
          .to(svg, { scaleX: 0.15, duration: 1.5, ease: "sine.inOut" })
          .to(svg, { scaleX: 1, duration: 1.5, ease: "sine.inOut" })
          // 4. Staggered unwind — coils disappear in reverse order
          .fromTo(
            reversed,
            { strokeDashoffset: 0 },
            {
              strokeDashoffset: (i) =>
                pathLengths.current[allPaths.length - 1 - i],
              duration: 1.2,
              ease: "power1.in",
              stagger: 0.06,
            }
          );
      }

      // ── Card 6: Persons draw → stand tall → celebrate → wiggle → draw out ──
      if (index === 5) {
        const path = iconRef.current!.querySelector<SVGPathElement>("path");
        if (!path) return;

        if (pathLengths.current.length === 0) {
          pathLengths.current = [path.getTotalLength()];
        }
        const len = pathLengths.current[0];

        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.set(svg, { transformOrigin: "50% 100%" });

        const tl = gsap.timeline({ repeat: -1 });

        tl
          // 1. Draw in
          .fromTo(
            path,
            { strokeDashoffset: len },
            { strokeDashoffset: 0, duration: 2.5, ease: "power1.inOut" }
          )
          // 2. Stand tall — figures step forward with pride
          .to(svg, { scale: 1.06, y: -5, duration: 0.5, ease: "back.out(2)" })
          // Brief proud hold
          .to({}, { duration: 0.5 })
          // 3. Celebration bounces — two jumps
          .to(svg, { y: -18, duration: 0.22, ease: "power2.out" })
          .to(svg, { y: -5, duration: 0.28, ease: "bounce.out" })
          .to(svg, { y: -18, duration: 0.22, ease: "power2.out" })
          .to(svg, { y: -5, duration: 0.28, ease: "bounce.out" })
          // 4. Wiggle — excited shoulder-bump energy
          .to(svg, { rotation: -4, duration: 0.1, ease: "power2.out" })
          .to(svg, { rotation: 4, duration: 0.1, ease: "power2.out" })
          .to(svg, { rotation: -4, duration: 0.1, ease: "power2.out" })
          .to(svg, { rotation: 0, duration: 0.1, ease: "power2.out" })
          // 5. Settle back to origin
          .to(svg, { scale: 1, y: 0, duration: 0.4, ease: "power2.inOut" })
          // Brief rest
          .to({}, { duration: 0.4 })
          // 6. Draw out
          .fromTo(
            path,
            { strokeDashoffset: 0 },
            { strokeDashoffset: len, duration: 2, ease: "power1.in" }
          );
      }

      if (cleanupFns.length > 0) {
        return () => cleanupFns.forEach((fn) => fn());
      }
    },
    { scope: iconRef }
  );

  return (
    <LiquidGlassCard className="flex h-98 p-4 gap-3">
      <aside
        ref={iconRef}
        className="w-[45%] shrink-0 h-full bg-background/35 border border-white/10 flex items-center justify-center rounded-2xl overflow-hidden"
      >
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
        <CourseCard key={index} course={course} index={index} />
      ))}
    </div>
  );
}
