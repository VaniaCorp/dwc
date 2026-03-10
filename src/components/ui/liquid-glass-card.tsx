import { cn } from "@/lib/utils";

type LiquidGlassProps = {
  children: React.ReactNode;
  className?: string;
};

export function LiquidGlass({ children, className }: LiquidGlassProps) {
  return (
    <>
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

      <div className={cn("glass-card", className)}>{children}</div>
    </>
  );
}
