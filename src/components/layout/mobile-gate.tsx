import { Link } from "react-router";
import { Logo, SendIcon } from "@/assets/icons";
import { RunningJerry, Spring } from "@/assets/images";
import LiquidGlassButton from "@/components/ui/liquid-glass-button";

export default function MobileGate() {
  return (
    <div className="hidden max-[830px]:flex fixed inset-0 z-50 bg-background flex-col items-center justify-center gap-6 px-8 overflow-hidden">
      <Spring className="absolute -top-16 -left-16 w-64 opacity-10 pointer-events-none" />
      <RunningJerry className="absolute -bottom-8 right-0 w-72 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center gap-6">
        <Logo className="w-20" />

        <div className="flex flex-col gap-2">
          <h1 className="font-syne text-3xl font-bold tracking-tight leading-tight">
            This one&apos;s built for
            <br />
            <span className="text-primary">desktop</span>
          </h1>
          <p className="font-sans text-sm text-white/50 max-w-67.5 leading-relaxed">
            The full experience lives on a bigger screen. Open on a laptop or
            desktop to explore everything.
          </p>
        </div>

        <Link to="https://bit.ly/designwithchike" target="_blank">
          <LiquidGlassButton className="flex items-center gap-3 px-10 py-5 rounded-3xl text-base">
            <SendIcon />
            Get Started
          </LiquidGlassButton>
        </Link>
      </div>
    </div>
  );
}
