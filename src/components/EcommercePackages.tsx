import { Check, ShieldAlert, Sparkles } from "lucide-react";
import {
  ecommercePackages,
  ecommerceAdditionalServices,
  buildWhatsAppLink,
} from "@/lib/site-config";

export default function EcommercePackages() {
  return (
    <section id="ecommerce-packages" className="bg-brand-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-amber-600">
            الباقات
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            باقات المتاجر الإلكترونية
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            اختر مستوى الخدمة المناسب لمتجرك، من الفحص والتحسين إلى المتابعة
            والتطوير.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-4">
          {ecommercePackages.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-brand-700 bg-brand-900 text-white shadow-xl shadow-brand-900/15"
                  : "border-neutral-200 bg-white"
              }`}
            >
              {plan.tagline && (
                <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-400/90 px-3 py-1 text-xs font-bold text-brand-950">
                  <Sparkles className="h-3.5 w-3.5" />
                  {plan.tagline}
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
                <span
                  className={`text-3xl font-extrabold ${
                    plan.highlighted ? "text-white" : "text-brand-900"
                  }`}
                >
                  {plan.price}
                </span>
                <span
                  className={
                    plan.highlighted ? "text-brand-100/80" : "text-neutral-500"
                  }
                >
                  ريال
                </span>
              </div>
              <p
                className={`mt-1 text-sm ${
                  plan.highlighted ? "text-brand-100/80" : "text-neutral-500"
                }`}
              >
                {plan.period.replace(/^.*—\s*/, "")}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={`mt-0.5 h-4.5 w-4.5 shrink-0 ${
                        plan.highlighted ? "text-amber-300" : "text-amber-600"
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
                href={buildWhatsAppLink(
                  `مرحبًا، أبي أستفسر عن "${plan.name}" الخاصة بالمتاجر الإلكترونية.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                  plan.highlighted
                    ? "bg-white text-brand-900 hover:bg-brand-50"
                    : "bg-brand-900 text-white hover:bg-brand-800"
                }`}
              >
                {plan.ctaLabel}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-right">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-7 text-amber-800">
            أسعار الباقات لا تشمل ميزانية الإعلانات المدفوعة أو اشتراكات
            التطبيقات والخدمات الخارجية. أي أعمال إضافية خارج نطاق الباقة يتم
            الاتفاق عليها مسبقًا.
          </p>
        </div>

        {/* خدمات إضافية */}
        <div className="mx-auto mt-16 max-w-4xl rounded-2xl border border-neutral-200 bg-white p-7 sm:p-9">
          <div className="text-center">
            <h3 className="text-xl font-extrabold text-brand-900 sm:text-2xl">
              خدمات إضافية
            </h3>
            <p className="mt-2 text-sm text-neutral-600 sm:text-base">
              يمكن إضافة خدمات منفصلة حسب احتياج المتجر.
            </p>
          </div>

          <ul className="mx-auto mt-7 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {ecommerceAdditionalServices.map((service) => (
              <li
                key={service}
                className="flex items-center gap-2.5 text-sm text-neutral-700"
              >
                <Check className="h-4.5 w-4.5 shrink-0 text-amber-600" />
                {service}
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center">
            <a
              href={buildWhatsAppLink(
                "مرحبًا، أبي أطلب عرضًا مخصصًا لخدمات إضافية لمتجري الإلكتروني."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-brand-900 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
            >
              اطلب عرضًا مخصصًا
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

