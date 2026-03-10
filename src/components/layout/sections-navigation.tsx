import {
  CoursesIcon2,
  FAQIcon,
  FeedbacksIcon,
  StudentsIcon,
  TeamIcon,
} from "@/assets/icons";
import type { NavigationContainerProps } from "./navbar";
import { Link } from "react-router";
import { cn } from "@/lib/utils";

export default function SectionNavigation() {
  return (
    <div className="relative w-full flex my-20">
      <hr className="w-full h-px text-foreground/20 absolute inset-0" />
      <nav className="p-3 w-3xl flex items-center justify-between mx-auto -translate-y-1/2">
        {navigation.map((item) => (
          <NavContent
            key={item.title}
            to={item.link}
            title={item.title}
            Icon={item.icon}
            bgColor={item.color}
          />
        ))}
      </nav>
    </div>
  );
}

type NavContentProps = NavigationContainerProps & { bgColor?: string };

const NavContent = ({
  to,
  title,
  className,
  Icon,
  bgColor,
}: NavContentProps) => {
  return (
    <Link
      to={to}
      className={cn(
        "w-12 h-12 flex items-center justify-center rounded-full border border-white",
        className
      )}
      style={{ backgroundColor: bgColor }}
      aria-label={title}
      aria-labelledby={title}
      data-cursor-slot={bgColor}
      data-cursor-slot-title={title}
    >
      <Icon className="size-6" color="white" />
    </Link>
  );
};

const navigation = [
  {
    title: "Courses",
    link: "/#courses",
    icon: CoursesIcon2,
    color: "#FF3434",
  },
  {
    title: "Students",
    link: "/#students",
    icon: StudentsIcon,
    color: "#689CF5",
  },
  {
    title: "Team",
    link: "/#team",
    icon: TeamIcon,
    color: "#9B1CFF",
  },
  {
    title: "Feedbacks",
    link: "/#feedbacks",
    icon: FeedbacksIcon,
    color: "#ACFD85",
  },
  {
    title: "FAQs",
    link: "/#faqs",
    icon: FAQIcon,
    color: "#FFCE2B",
  },
];
