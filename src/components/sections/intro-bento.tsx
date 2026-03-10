import {
  NigerianIcon,
  GhanaIcon,
  BritainIcon,
  FinlandIcon,
  USAIcon,
  EnglandIcon,
  FourStarIcon,
} from "@/assets/icons";
import { LiquidGlass } from "../ui/liquid-glass";
import { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText);

export default function IntroBento() {
  const container = useRef(null);
  const textRef = useRef(null);
  const flagsRef = useRef<HTMLSpanElement>(null);
  const starRef = useRef(null);

  useGSAP(
    () => {
      const split = SplitText.create(textRef.current, { type: "chars" });
      if (!flagsRef.current) return;
      const flags = flagsRef.current.children;
      const secondToLastIndex = flags.length - 2;

      // Set initial states
      gsap.set(split.chars, { opacity: 0, y: 12 });
      gsap.set(flags, { scale: 0, opacity: 0 });
      gsap.set(starRef.current, { x: -30, opacity: 0, scale: 0.5 });

      const tl = gsap.timeline({ defaults: { ease: "back.out(1.7)" } });

      // 1. Text staggers in
      tl.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.02,
        ease: "power3.out",
      });

      // 2. First flag scales in
      tl.to(
        flags[0],
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
        },
        "-=0.15"
      );

      // 3. Remaining flags emerge from behind the first
      tl.fromTo(
        Array.from(flags).slice(1),
        {
          scale: 0,
          opacity: 0,
          x: -20,
        },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 0.3,
          stagger: 0.08,
        },
        "-=0.1"
      );

      // 4. Four-star slides in from left, timed to the second-to-last flag
      // stagger delay for the second-to-last flag (index - 1 since slice starts at 1)
      const flagStaggerOffset = (secondToLastIndex - 1) * 0.08;

      tl.to(
        starRef.current,
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        // Align with the start of the remaining-flags tween + offset to second-to-last
        `<+${flagStaggerOffset}`
      );

      return () => split.revert();
    },
    { scope: container }
  );

  return (
    <div ref={container}>
      <LiquidGlass className="w-max px-8 py-5 flex items-center gap-1 mx-auto my-12">
        <span ref={starRef} className="inline-flex shrink-0">
          <FourStarIcon className="text-primary size-5" />
        </span>
        <p ref={textRef} className="p font-sans">
          Trained over 190+ students in Africa & Europe
        </p>
        <span ref={flagsRef} className="flex items-center gap-1">
          {countries.map((CountryIcon, index) => (
            <span key={index} className="inline-flex shrink-0">
              <CountryIcon className="size-5" />
            </span>
          ))}
        </span>
      </LiquidGlass>
    </div>
  );
}

const countries = [
  NigerianIcon,
  GhanaIcon,
  BritainIcon,
  USAIcon,
  FinlandIcon,
  EnglandIcon,
];
