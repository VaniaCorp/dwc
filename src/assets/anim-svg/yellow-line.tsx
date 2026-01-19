import type { SVGProps } from "react";
import { forwardRef } from "react";

const SvgYellowLine = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      width="274"
      height="8"
      viewBox="0 0 274 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 6.75C0.75 6.75 44.6384 1.36007 137.292 0.785736C229.945 0.2114 272.75 6.75 272.75 6.75"
        stroke="#FFCE2B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
);

SvgYellowLine.displayName = "SvgYellowLine";

export default SvgYellowLine;
