import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedContactForm from "@/components/UnifiedContactForm";
import { getSiteSettings, buildWhatsAppLinkAsync } from "@/lib/sanity-data";

export const metadata: Metadata = {
  title: "تواصل معي",
  description: "تواصل مع مِزارو لطلب خدمات المحاسبة والضريبة عن بُعد.",
};

const afterSubmitSteps = [
  "أراجع بيانات نشاطك.",
  "أتواصل معك.",
  "أفهم احتياجك.",
  "أقترح الخدمة المناسبة.",
  "تبدأ الخدمة.",
];

export default async function ContactPage() {
  const [settings, whatsappLink] = await Promise.all([
    getSiteSettings(),
    buildWhatsAppLinkAsync(),
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="text-sm font-bold tracking-wide text-brand-600">
              تواصل معي
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
              أخبرني عن مشروعك
            </h1>
            <p className="mt-4 text-ink-500 leading-8">
              وسأساعدك في تحديد احتياجك المحاسبي — عبّي النموذج وبتواصل معك
              بنفسي لاقتراح الخطوة الأنسب لنشاطك.
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <Suspense fallback={null}>
              <UnifiedContactForm />
            </Suspense>

            <div className="rounded-[1.75rem] border border-ink-100 bg-brand-50/40 p-6 sm:p-7">
              <h2 className="text-base font-extrabold text-ink-950">
                ماذا يحدث بعد إرسال الطلب؟
              </h2>
              <ul className="mt-5 flex flex-col gap-4">
                {afterSubmitSteps.map((step, index) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-800 text-xs font-extrabold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-0.5 text-sm font-bold leading-7 text-ink-800">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-start gap-2.5 border-t border-ink-100 pt-5">
                <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-700" />
                <p className="text-xs leading-6 text-ink-500">
                  ما فيه التزام عليك بمجرد التعبئة — أراجع طلبك وأتواصل معك
                  لأشرح لك التفاصيل قبل أي خطوة.
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:gap-8 sm:px-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-ink-700 hover:text-brand-800"
            >
              <MessageCircle className="h-4 w-4" />
              {settings.whatsappDisplay}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 text-sm font-bold text-ink-700 hover:text-brand-800"
            >
              <Mail className="h-4 w-4" />
              {settings.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
