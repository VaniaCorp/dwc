import type { SVGProps } from "react";

const SvgKnotLine = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="41"
    viewBox="0 0 100 41"
    fill="none"
    {...props}
  >
    <path
      opacity="0.2"
      d="M0.500136 40.4279C0.500136 40.4279 20.191 38.0255 30.902 33.4682C46.9252 26.6506 63.0174 12.3109 57.2016 4.07954C54.3485 0.0413938 46.0391 -1.70146 40.6447 4.9527C33.7142 13.5016 47.503 23.582 61.4968 23.9087C73.0943 24.1795 99.1617 16.0328 99.1617 16.0328"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default SvgKnotLine;
