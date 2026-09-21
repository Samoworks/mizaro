"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/lib/sanity-data";

export default function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-10 divide-y divide-ink-100 border-t border-b border-ink-100">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-right"
            >
              <span className="text-base font-bold text-ink-950">
                {faq.question}
              </span>
              <ChevronDown
                className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="pb-5 text-sm leading-7 text-ink-500">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
