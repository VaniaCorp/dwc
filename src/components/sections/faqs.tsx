import type { FAQ } from "@/lib/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQs({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="w-full max-w-5xl mx-auto pb-20 flex flex-col gap-5">
      {faqs.map((faq) => (
        <Accordion type="multiple" key={faq._id}>
          <AccordionItem value={faq._id}>
            <AccordionTrigger className="text-3xl font-semibold">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="w-10/12 text-background">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
}
