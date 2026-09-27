import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getFaqs } from "@/lib/sanity-data";
import FaqAccordion from "@/components/FaqAccordion";

type FAQProps = {
  /** أظهر ترويسة القسم (العنوان الفرعي + العنوان)، أو أخفها إذا كانت الصفحة توفّر H1 خاص بها */
  showHeading?: boolean;
  /** حد أقصى لعدد الأسئلة المعروضة (تُستخدم للنسخة المختصرة في الرئيسية) */
  limit?: number;
};

export default async function FAQ({ showHeading = true, limit }: FAQProps = {}) {
  const allFaqs = await getFaqs();
  const faqs = limit ? allFaqs.slice(0, limit) : allFaqs;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {showHeading && (
          <div className="text-center">
            <span className="text-sm font-bold tracking-wide text-brand-600">
              الأسئلة الشائعة
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
              عندك سؤال؟
            </h2>
          </div>
        )}

        <FaqAccordion faqs={faqs} />

        {limit && allFaqs.length > limit && (
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 underline underline-offset-4"
            >
              عرض جميع الأسئلة
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
