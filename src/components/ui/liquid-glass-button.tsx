import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

export default function LiquidGlassButton({
  ref,
  children,
  className,
  ...props
}: {
  ref?: React.RefObject<HTMLButtonElement>;
  children: React.ReactNode;
  className?: string;
  props?: ButtonHTMLAttributes<HTMLButtonElement>;
}) {
  return (
    <>
      <button
        ref={ref}
        className={cn("relative overflow-hidden w-max glass-button", className)}
        {...props}
      >
        {children}
      </button>

      <svg style={{ display: "none" }}>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency="0.01"
            numOctaves="2"
            result="turbulence"
          />

          <feDisplacementMap
            in="SourceGraphic"
            in2="turbulence"
            scale="200"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>
    </>
  );
}
