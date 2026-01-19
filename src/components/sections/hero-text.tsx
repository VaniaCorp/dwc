import { GiftAnimated, YellowLine } from "@/assets/anim-svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, SplitText);

const DEFAULTS = {
  stagger: {
    y: 100,
    stagger: 0.05,
    duration: 0.6,
    ease: "power3.out",
  },
  reveal: {
    y: 100,
    duration: 0.8,
    ease: "power3.out",
  },
};

export default function HeroText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const startTextRef = useRef<HTMLSpanElement>(null);
  const giftRef = useRef<SVGSVGElement>(null);
  const figmaTextRef = useRef<HTMLSpanElement>(null);
  const justRef = useRef<HTMLSpanElement>(null);
  const weeksTextRef = useRef<HTMLSpanElement>(null);
  const yellowLineRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create(startTextRef.current, {
        type: "chars, words",
      });
      const words = SplitText.create(weeksTextRef.current, { type: "words" });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(split.chars, {
        ...DEFAULTS.stagger,
      });

      tl.from(
        figmaTextRef.current,
        {
          xPercent: -100,
          duration: 0.6,
        },
        "+=0.2"
      );

      tl.from(
        giftRef.current,
        {
          opacity: 0,
          scale: 0,
          width: 0,
          duration: 0.6,
          onStart: () => {
            if (giftRef.current) {
              const animateElements =
                giftRef.current.querySelectorAll("animateTransform");
              animateElements.forEach((anim) => {
                (anim as SVGAnimateTransformElement).beginElement();
              });
            }
          },
        },
        "<"
      );

      tl.from(
        words.words,
        {
          ...DEFAULTS.reveal,
        },
        "+=0.2"
      );

      tl.from(
        justRef.current,
        {
          xPercent: 300,
          opacity: 0,
          duration: 0.6,
        },
        "<"
      );

      // Animate yellow line drawing after "8 weeks" appears
      if (yellowLineRef.current) {
        const path = yellowLineRef.current.querySelector("path");
        if (path) {
          const pathLength = path.getTotalLength();
          // Set initial state
          gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
          });

          // Animate the line drawing
          tl.to(
            path,
            {
              strokeDashoffset: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "+=0.1"
          );
        }
      }
    },
    { scope: containerRef }
  );

  return (
    <>
      <h1
        ref={containerRef}
        className="w-full max-w-5xl text-center text-4xl md:text-[80px] grid place-items-center"
      >
        <div className="flex items-center">
          <OverflowContainer>
            <span ref={startTextRef} id="start-text">
              Master the
            </span>
          </OverflowContainer>
          <GiftAnimated ref={giftRef} className="size-6 md:size-18" />
          <OverflowContainer>
            <span ref={figmaTextRef} className="inline-block">
              Figma Pen-Tool
            </span>
          </OverflowContainer>
        </div>

        <div className="flex items-center gap-4">
          <OverflowContainer>
            <span ref={justRef} className="inline-block">
              in just
            </span>
          </OverflowContainer>
          <OverflowContainer className="relative">
            <span ref={weeksTextRef}>8 weeks</span>
            <YellowLine ref={yellowLineRef} />
          </OverflowContainer>
        </div>
      </h1>
    </>
  );
}

const OverflowContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-max overflow-hidden", className)}>{children}</div>
  );
};
