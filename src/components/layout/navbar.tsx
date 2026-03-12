import {
  ChatIcon,
  CoursesIcon,
  HomeIcon,
  InfoIcon,
  Logo,
  RegisterIcon,
} from "@/assets/icons";
import LiquidGlassButton from "../ui/liquid-glass-button";
import { Link } from "react-router";
import { useState, type SVGProps, type ComponentType } from "react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  return (
    <header className="w-full px-24 py-6 border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Logo />

        <nav className="w-max flex items-center gap-12 md:gap-24 xl:gap-32">
          <NavigationContainer
            to="/"
            title="Home"
            className="text-red"
            Icon={HomeIcon}
          />
          <NavigationContainer to="/" title="Info" Icon={InfoIcon} />
          <NavigationContainer to="/" title="Courses" Icon={CoursesIcon} />
          <NavigationContainer to="/" title="Chat" Icon={ChatIcon} />
        </nav>

        <LiquidGlassButton className="flex items-center gap-2 rounded-[20px] px-12 py-4">
          <RegisterIcon color="#FFCE2B" />
          Register
        </LiquidGlassButton>
      </div>
    </header>
  );
}

export type NavigationContainerProps = {
  to: string;
  title?: string;
  className?: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const NavigationContainer = ({
  to,
  title,
  className,
  Icon,
  ...props
}: NavigationContainerProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Link
      to={to}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative w-max grid place-items-center", className)}
      aria-label={title}
      {...props}
    >
      <div className="relative w-full h-full grid place-items-center">
        <Icon
          className={`absolute transition-all duration-300 ease-out ${
            isHovered ? "-translate-y-1" : "translate-y-0"
          }`}
        />
        {/* <p
          className={`transition-all duration-300 ease-out ${
            isHovered ? "opacity-100 translate-y-4" : "opacity-0 translate-y-0"
          }`}
        >
          {title}
        </p> */}
      </div>
    </Link>
  );
};
