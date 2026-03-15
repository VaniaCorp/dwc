import type { Comment } from "@/lib/types";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import Image from "../ui/image";

export default function CommentsDisplay({ comments }: { comments: Comment[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const filtered = comments.filter((c) => c.image?.asset?.url);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const slots = container.querySelectorAll<HTMLElement>(".comment-slot");
    gsap.set(slots, { y: -760 });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        gsap.to(slots, {
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power3.in",
        });
        observer.disconnect();
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [filtered.length]);

  return (
    <div className="w-full px-6 py-12">
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl h-280 mx-auto rounded-4xl border border-lime overflow-hidden"
      >
        {filtered.map((comment, i) => (
          <div key={comment._id} className={`comment-slot comment-slot-${i}`}>
            <Image
              src={comment.image!.asset.url!}
              width={600}
              height={400}
              sizes="60vw"
              alt={comment.title ?? "Comment"}
              className="w-full h-auto object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
