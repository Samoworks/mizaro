import { getFaqs } from "@/lib/sanity-data";
import FaqAccordion from "@/components/FaqAccordion";

export default async function FAQ() {
  const faqs = await getFaqs();

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الأسئلة الشائعة
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            عندك سؤال؟
          </h2>
        </div>

        <FaqAccordion faqs={faqs} />
      </div>
    </section>
  );
}
