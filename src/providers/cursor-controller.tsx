import * as React from "react";

type CursorVariant = "default" | "pointer" | "not-allowed";

export default function CursorController() {
  const cursorRef = React.useRef<HTMLDivElement>(null);
  const iconRef = React.useRef<SVGSVGElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const mouse = React.useRef({ x: 0, y: 0 });
  const raf = React.useRef<number | null>(null);

  const scale = React.useRef(1);

  const activeSlot = React.useRef<string | null>(null);
  const activeTitle = React.useRef<string | null>(null);
  const activeVariant = React.useRef<CursorVariant>("default");

  const lastCursorTarget = React.useRef<HTMLElement | null>(null);

  React.useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      const target = e.target as HTMLElement;

      /* --------------------------------
         FORCE DISABLE NATIVE CURSOR
      -------------------------------- */

      if (lastCursorTarget.current && lastCursorTarget.current !== target) {
        lastCursorTarget.current.style.cursor = "";
      }

      target.style.cursor = "none";
      lastCursorTarget.current = target;

      /* -----------------------------
         COLOR SLOT
      ----------------------------- */

      const slot = target.closest("[data-cursor-slot]") as HTMLElement | null;
      const color = slot?.dataset.cursorSlot ?? "black";

      if (cursorRef.current && color !== activeSlot.current) {
        activeSlot.current = color;

        cursorRef.current.style.color = color;

        if (titleRef.current) {
          titleRef.current.style.backgroundColor = color;
          titleRef.current.style.borderColor = "white";
          titleRef.current.style.color = "white";
        }
      }

      /* -----------------------------
         TITLE SLOT
      ----------------------------- */

      const titleEl = target.closest(
        "[data-cursor-slot-title]"
      ) as HTMLElement | null;

      const title = titleEl?.dataset.cursorSlotTitle ?? null;
      const titleTextColor =
        titleEl?.dataset.cursorSlotTitleTextColor ?? "white";

      if (title !== activeTitle.current && titleRef.current) {
        activeTitle.current = title;

        if (title) {
          titleRef.current.textContent = title;
          titleRef.current.style.color = titleTextColor;
          titleRef.current.style.opacity = "1";
        } else {
          titleRef.current.style.opacity = "0";
        }
      }

      /* -----------------------------
         CURSOR TYPE DETECTION
      ----------------------------- */

      const computed = window.getComputedStyle(target).cursor;

      let nextVariant: CursorVariant = "default";

      if (computed === "pointer") nextVariant = "pointer";
      if (computed === "not-allowed") nextVariant = "not-allowed";

      if (nextVariant !== activeVariant.current) {
        activeVariant.current = nextVariant;

        const icon = iconRef.current;
        if (!icon) return;

        switch (nextVariant) {
          case "pointer":
            scale.current = 0.65;
            icon.innerHTML = cursorArrow;
            break;

          case "not-allowed":
            scale.current = 0.8;
            icon.innerHTML = cursorNotAllowed;
            break;

          default:
            scale.current = 1;
            icon.innerHTML = cursorArrow;
        }
      }
    };

    const frame = () => {
      const el = cursorRef.current;

      if (el) {
        el.style.transform = `translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0) scale(${scale.current})`;
      }

      raf.current = requestAnimationFrame(frame);
    };

    window.addEventListener("mousemove", move);

    raf.current = requestAnimationFrame(frame);

    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", move);

      if (raf.current) cancelAnimationFrame(raf.current);

      if (lastCursorTarget.current) {
        lastCursorTarget.current.style.cursor = "";
      }

      document.body.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] will-change-transform text-black"
    >
      <svg
        ref={iconRef}
        width="27"
        height="35"
        viewBox="0 0 27 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: cursorArrow }}
      />

      <div
        ref={titleRef}
        className="absolute left-6 top-6 whitespace-nowrap rounded-full border px-4 py-1 text-xs font-medium opacity-0 transition-opacity"
      />
    </div>
  );
}

/* -------------------------------- */
/* Cursor Icons */
/* -------------------------------- */

const cursorArrow = `
<path
d="M2.34917 1.62026C2.40572 0.637921 3.60984 0.199661 4.28459 0.915831L25.6029 23.5426C26.4403 24.4314 25.3658 26.0541 24.1939 25.711C20.431 24.6092 15.4091 23.6455 11.9234 24.9142C8.43768 26.1829 5.21014 30.1492 3.03578 33.4119C2.35862 34.428 0.492414 33.8756 0.562589 32.6565L2.34917 1.62026Z"
fill="currentColor"
stroke="white"
stroke-width="1.12121"
/>
`;

const cursorNotAllowed = `
<circle cx="14" cy="14" r="10" stroke="red" stroke-width="2"/>
<line x1="7" y1="21" x2="21" y2="7" stroke="red" stroke-width="2"/>
`;
