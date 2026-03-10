import type { SVGProps } from "react";

const SVGCursor = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="189"
    height="224"
    viewBox="0 0 189 224"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g filter="url(#filter0_d_231_1051)">
      <path
        d="M15.0216 2.16614L187.609 122.54C187.609 122.54 123.691 108.993 93.7473 127.763C63.8036 146.532 48.1364 209.964 48.1364 209.964L15.0216 2.16614Z"
        stroke="white"
        strokeWidth="2"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="filter0_d_231_1051"
        x="0.000227928"
        y="0"
        width="188.181"
        height="223.867"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dx="-13.6633" dy="13.6633" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_231_1051"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_231_1051"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
);

export default SVGCursor;
