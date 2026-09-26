import Link from "next/link";
import { ArrowLeft, Calculator, PiggyBank } from "lucide-react";
import { getPricingPlans } from "@/lib/sanity-data";
import { savingsHighlight } from "@/lib/site-config";

/** يرجع أقل سعر رقمي من قائمة باقات (يتجاهل الأسعار النصية مثل "تواصل معي") */
function cheapestPrice(plans: { price: string }[]): number | null {
  const numbers = plans
    .map((p) => Number(p.price.replace(/[^\d.]/g, "")))
    .filter((n) => Number.isFinite(n) && n > 0);
  return numbers.length ? Math.min(...numbers) : null;
}

export default async function PackagesPreview() {
  const pricingPlans = await getPricingPlans();
  const accountingFrom = cheapestPrice(pricingPlans);

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الباقات
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            باقة واضحة تناسب نشاطك
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            أسعار معروفة مسبقًا بدون رسوم مفاجئة، وأقل بكثير من تكلفة توظيف
            محاسب دائم.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-ink-100 p-7">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                <Calculator className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <div>
                <h3 className="text-base font-bold text-ink-950">المحاسبة والضريبة</h3>
                <p className="mt-1 text-sm text-ink-500">
                  {accountingFrom
                    ? `تبدأ من ${accountingFrom} ريال / شهريًا`
                    : "باقات مرنة تناسب نشاطك"}
                </p>
              </div>
            </div>
            <Link href="/packages" className="shrink-0 text-brand-700">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>

          <div className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-brand-50/40 p-7">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-800 text-white">
              <PiggyBank className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <div>
              <h3 className="text-base font-bold text-ink-950">
                {savingsHighlight.title}
              </h3>
              <p className="mt-1 text-sm text-ink-500">
                مقارنة بتوظيف محاسب دائم بدوام كامل
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            استعرض الباقات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
