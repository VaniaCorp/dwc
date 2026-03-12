import {
  Envelope,
  Facebook,
  Instagram,
  Linkedin,
  Logo,
  // Phone,
  XIcon,
} from "@/assets/icons";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="w-full max-w-5xl xl:max-w-6xl 2xl:max-w-7xl px-12 2xl:px-0 mx-auto">
      <hr className="h-px bg-white w-full max-w-7xl mx-auto my-32" />

      <section className="flex items-center justify-between gap-54 my-8">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="w-full flex items-center justify-between">
          {navLinks.map((link) => (
            <Link key={link.title} to={link.link} className="h2 font-medium!">
              {link.title}
            </Link>
          ))}
        </nav>
      </section>

      <hr className="h-px bg-white w-full max-w-7xl mx-auto my-32" />

      <section className="w-full flex items-center justify-between pb-12">
        <p className="h2 font-medium!">
          &copy; {new Date().getFullYear()} &nbsp; DWC. All Rights Reserved.
        </p>

        <aside className="flex items-center gap-4">
          {socials.map((social, index) => (
            <Link
              key={index}
              to={social.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.title}
              aria-labelledby={social.title}
              data-cursor-slot={social.color}
              data-cursor-slot-title={social.title}
              className="transition-all duration-150 ease-in-out hover:-translate-y-1.5"
            >
              <social.icon />
            </Link>
          ))}
        </aside>
      </section>
    </footer>
  );
}

const navLinks = [
  {
    title: "Courses",
    link: "/#courses",
  },
  {
    title: "Students",
    link: "/#students",
  },
  {
    title: "Team",
    link: "/#team",
  },
  {
    title: "Feedbacks",
    link: "/#feedbacks",
  },
  {
    title: "FAQs",
    link: "/#faqs",
  },
];

const socials = [
  {
    icon: Envelope,
    link: "mailto:designwithchike@gmail.com",
    title: "Email us",
    color: "#FFCE2B",
  },
  // {
  //   icon: Phone,
  //   link: "",
  // },
  {
    icon: XIcon,
    link: "https://x.com/designwithchike",
    title: "Follow on X",
    color: "#0e1113",
  },
  {
    icon: Instagram,
    link: "https://instagram.com/dwc.hq",
    title: "View on Instagram",
    color: "#E1306C",
  },
  {
    icon: Facebook,
    link: "https://www.facebook.com/share/188sRBGpNg/",
    title: "Poke us on Facebook",
    color: "#1877F2",
  },
  {
    icon: Linkedin,
    link: "https://linkedin.com/company/dwchq/",
    title: "Reach us on LinkedIn",
    color: "#0077B5",
  },
];
