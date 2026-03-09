import type { SVGProps } from "react";

const SvgFourStar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.53906 0.531596C6.27699 -0.177199 5.26005 -0.177199 4.99798 0.531596L3.8088 3.75243L0.539582 4.92402C-0.179861 5.1822 -0.179861 6.1841 0.539582 6.44228L3.8088 7.61387L4.99798 10.8347C5.26005 11.5435 6.27699 11.5435 6.53906 10.8347L7.72824 7.61387L10.9975 6.44228C11.7169 6.1841 11.7169 5.1822 10.9975 4.92402L7.72824 3.75243L6.53906 0.531596Z"
      fill="currentColor"
    />
  </svg>
);

export default SvgFourStar;
