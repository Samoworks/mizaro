import { Check, ShieldAlert } from "lucide-react";
import { getPricingPlans, buildWhatsAppLinkAsync } from "@/lib/sanity-data";

export default async function Packages() {
  const [pricingPlans, whatsappCustomLink] = await Promise.all([
    getPricingPlans(),
    buildWhatsAppLinkAsync(
      "مرحبًا، عندي منشأة بفروع متعددة وأبي أعرف تفاصيل الباقة المخصصة."
    ),
  ]);

  return (
    <section id="accounting" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            باقات المحاسبة والضريبة
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            اختر الباقة المناسبة لعملك
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            بدون التزامات طويلة أو رسوم خفية — تقدر تبدأ وتلغي شهريًا.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan) => {
            const isCustom = plan.id === "custom";
            return (
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
                  {isCustom ? (
                    <span
                      className={`text-2xl font-extrabold ${
                        plan.highlighted ? "text-white" : "text-ink-950"
                      }`}
                    >
                      {plan.price}
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-4xl font-extrabold ${
                          plan.highlighted ? "text-white" : "text-ink-950"
                        }`}
                      >
                        {plan.price}
                      </span>
                      <span
                        className={plan.highlighted ? "text-ink-300" : "text-ink-400"}
                      >
                        ريال
                      </span>
                    </>
                  )}
                </div>
                <p
                  className={`mt-1 text-sm ${
                    plan.highlighted ? "text-ink-300" : "text-ink-400"
                  }`}
                >
                  {isCustom ? plan.period : `/ ${plan.period.replace("ريال / ", "")}`}
                </p>

                <ul className="mt-6 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
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

                <a
                  href={
                    isCustom ? whatsappCustomLink : "/contact?service=accounting"
                  }
                  target={isCustom ? "_blank" : undefined}
                  rel={isCustom ? "noopener noreferrer" : undefined}
                  className={`mt-7 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold transition-colors ${
                    plan.highlighted
                      ? "bg-white text-ink-950 hover:bg-brand-50"
                      : "bg-ink-950 text-white hover:bg-brand-800"
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
