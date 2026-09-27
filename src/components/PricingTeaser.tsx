import Link from "next/link";
import { ArrowLeft, Check } from "lucide-react";
import { getPricingPlans } from "@/lib/sanity-data";

/** نسخة مختصرة من الباقات للصفحة الرئيسية — التفاصيل الكاملة في /pricing */
export default async function PricingTeaser() {
  const allPlans = await getPricingPlans();
  const plans = allPlans.filter((plan) => plan.price !== "مجانًا");

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الباقات
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            باقة واضحة تناسب حجم نشاطك
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            بدون التزامات طويلة أو رسوم خفية — تقدر تبدأ وتلغي شهريًا.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-[1.75rem] border p-7 ${
                plan.highlighted
                  ? "border-ink-950 bg-ink-950 text-white shadow-xl shadow-ink-950/15"
                  : "border-ink-100 bg-white"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                  الأكثر طلبًا
                </span>
              )}
              <h3
                className={`text-lg font-extrabold ${
                  plan.highlighted ? "text-white" : "text-ink-950"
                }`}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-2">
                <span
                  className={`text-3xl font-extrabold ${
                    plan.highlighted ? "text-white" : "text-ink-950"
                  }`}
                >
                  {plan.price}
                </span>
                <span className={plan.highlighted ? "text-ink-300" : "text-ink-400"}>
                  ريال / شهريًا
                </span>
              </div>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                        plan.highlighted ? "text-brand-300" : "text-brand-600"
                      }`}
                    />
                    <span className={plan.highlighted ? "text-ink-100" : "text-ink-700"}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            عرض جميع الباقات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
