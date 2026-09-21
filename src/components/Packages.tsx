import { Check, ShieldAlert } from "lucide-react";
import { pricingPlans, buildWhatsAppLink } from "@/lib/site-config";

export default function Packages() {
  return (
    <section id="packages" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الباقات
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            اختر الباقة المناسبة لعملك
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            بدون التزامات طويلة أو رسوم خفية — تقدر تبدأ وتلغي شهريًا.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const isCustom = plan.id === "custom";
            return (
              <div
                key={plan.id}
                className={`flex flex-col rounded-2xl border p-7 ${
                  plan.highlighted
                    ? "border-brand-700 bg-brand-900 text-white shadow-xl shadow-brand-900/15"
                    : "border-neutral-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <span className="mb-4 inline-block w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold">
                    الأكثر طلبًا
                  </span>
                )}
                <h3
                  className={`text-lg font-extrabold ${
                    plan.highlighted ? "text-white" : "text-brand-900"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-2">
                  {isCustom ? (
                    <span
                      className={`text-2xl font-extrabold ${
                        plan.highlighted ? "text-white" : "text-brand-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-4xl font-extrabold ${
                          plan.highlighted ? "text-white" : "text-brand-900"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={
                          plan.highlighted
                            ? "text-brand-100/80"
                            : "text-neutral-500"
                        }
                      >
                        ريال
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`mt-1 text-sm ${
                    plan.highlighted ? "text-brand-100/80" : "text-neutral-500"
                  }`}
                >
                  {isCustom ? plan.period : `/ ${plan.period.replace("ريال / ", "")}`}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                          plan.highlighted ? "text-brand-200" : "text-brand-600"
                        }`}
                      />
                      <span
                        className={
                          plan.highlighted ? "text-brand-50" : "text-neutral-700"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={
                    isCustom
                      ? buildWhatsAppLink(
                          "مرحبًا، عندي مطعم/متجر بفروع متعددة وأبي أعرف تفاصيل الباقة المخصصة."
                        )
                      : "#contact"
                  }
                  target={isCustom ? "_blank" : undefined}
                  rel={isCustom ? "noopener noreferrer" : undefined}
                  className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                    plan.highlighted
                      ? "bg-white text-brand-900 hover:bg-brand-50"
                      : "bg-brand-800 text-white hover:bg-brand-700"
                  }`}
                >
                  {plan.ctaLabel}
                </a>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-right">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-7 text-amber-800">
            الخدمات الضريبية المقدمة تخضع للأنظمة والمتطلبات المعمول بها لدى
            هيئة الزكاة والضريبة والجمارك في المملكة العربية السعودية، ولا
            تُقدَّم أي ضمانات أو تعهدات بشأن الإعفاء من الغرامات أو قرارات
            الجهات الرسمية.
          </p>
        </div>
      </div>
    </section>
  );
}
