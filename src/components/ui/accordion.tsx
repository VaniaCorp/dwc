import * as React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type AccordionType = "single" | "multiple";

type AccordionContextValue = {
  type: AccordionType;
  openItems: Set<string>;
  toggleItem: (value: string) => void;
};

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null
);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx)
    throw new Error("Accordion components must be used inside <Accordion>");
  return ctx;
}

type AccordionProps = React.ComponentProps<"div"> & {
  type?: AccordionType;
  defaultValue?: string | string[];
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ className, type = "single", defaultValue, children, ...props }, ref) => {
    const initial = React.useMemo(() => {
      if (!defaultValue) return new Set<string>();
      if (Array.isArray(defaultValue)) return new Set(defaultValue);
      return new Set([defaultValue]);
    }, [defaultValue]);

    const [openItems, setOpenItems] = React.useState<Set<string>>(initial);

    const toggleItem = React.useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);

          if (type === "single") {
            if (next.has(value)) return new Set();
            return new Set([value]);
          }

          if (next.has(value)) next.delete(value);
          else next.add(value);

          return next;
        });
      },
      [type]
    );

    const context = React.useMemo(
      () => ({
        type,
        openItems,
        toggleItem,
      }),
      [type, openItems, toggleItem]
    );

    return (
      <AccordionContext.Provider value={context}>
        <div
          ref={ref}
          data-slot="accordion"
          className={cn("flex w-full flex-col", className)}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  }
);

Accordion.displayName = "Accordion";

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext =
  React.createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext() {
  const ctx = React.useContext(AccordionItemContext);
  if (!ctx) throw new Error("Must be used inside AccordionItem");
  return ctx;
}

type AccordionItemProps = React.ComponentProps<"div"> & {
  value: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const context = React.useMemo(() => ({ value }), [value]);

    return (
      <AccordionItemContext.Provider value={context}>
        <div
          ref={ref}
          data-slot="accordion-item"
          data-value={value}
          className={cn(
            "bg-accent text-background rounded-4xl px-5",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, children, ...props }, ref) => {
  const { toggleItem, openItems } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const open = openItems.has(value);

  return (
    <button
      ref={ref}
      data-slot="accordion-trigger"
      aria-expanded={`${open}`}
      aria-controls={`accordion-content-${value}`}
      onClick={() => toggleItem(value)}
      className={cn(
        "group flex w-full items-center justify-between rounded-2xl py-3 text-left transition outline-none font-syne",
        "cursor-pointer disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}

      <span className="ml-auto flex size-12 items-center justify-center rounded-full bg-primary text-background">
        <Icon
          icon="material-symbols:add-rounded"
          className={cn(
            "size-6 transition-all ease-in-out duration-150",
            open && "rotate-45"
          )}
        />
      </span>
    </button>
  );
});

AccordionTrigger.displayName = "AccordionTrigger";

type AccordionContentProps = React.ComponentProps<"div">;

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ className, children, ...props }, ref) => {
  const { openItems } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const open = openItems.has(value);

  const contentRef = React.useRef<HTMLDivElement>(null);
  const mergedRef = React.useCallback(
    (node: HTMLDivElement) => {
      contentRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref]
  );

  const [height, setHeight] = React.useState<number>(0);

  React.useLayoutEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight);
    }
  }, [children, open]);

  return (
    <div
      id={`accordion-content-${value}`}
      role="region"
      aria-hidden={!open}
      data-slot="accordion-content"
      ref={mergedRef}
      style={{
        maxHeight: open ? height : 0,
      }}
      className={cn(
        "overflow-hidden font-syne transition-[max-height] duration-300 ease-in-out",
        className
      )}
      {...props}
    >
      <div className="pb-3 pt-1">{children}</div>
    </div>
  );
});

AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
