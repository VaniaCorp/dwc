import type { SVGProps } from "react";

const SVGX = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_201_3225)">
      <path
        d="M23.9067 4H27.96L19.1067 14.1867L29.56 28H21.3467L14.9467 19.6267L7.58667 28H3.53333L13.0267 17.12L3 4H11.4267L17.24 11.68L23.9067 4ZM22.4667 25.5467H24.7067L10.2 6.29333H7.74667L22.4667 25.5467Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_201_3225">
        <rect
          width="26.56"
          height="24"
          fill="white"
          transform="translate(3 4)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SVGX;
