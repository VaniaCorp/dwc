import type { SVGProps } from "react";

const SVGCurvedLine = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      height="4"
      viewBox="0 0 64 4"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.524414 2.62206C0.524414 2.62206 10.6783 0.7377 32.1144 0.536908C53.5505 0.336116 63.4537 2.62206 63.4537 2.62206"
        stroke="currentColor"
        strokeWidth="1.04882"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default SVGCurvedLine;
