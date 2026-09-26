import type { Metadata } from "next";
import { Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HowWeWork from "@/components/HowWeWork";
import TrustAreas from "@/components/TrustAreas";
import FinalCta from "@/components/FinalCta";
import { siteConfig, whyMizaroReasons } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "من أنا",
  description:
    "مِزارو محاسب مستقل يقدّم خدمات المحاسبة والضريبة عن بُعد للمنشآت وأصحاب الأعمال، بأسعار أوضح بكثير من تكلفة توظيف محاسب دائم.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            من أنا
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {siteConfig.companyName}: محاسب مستقل عن بُعد
          </h1>
          <p className="mt-5 text-ink-500 leading-8">
            أنا محاسب مستقل أقدّم خدمات المحاسبة والضريبة عن بُعد للمنشآت
            الصغيرة والمتوسطة وأصحاب الأعمال في السعودية. أتابع حساباتك بنفسي
            مباشرة، بدون فريق كبير أو وسطاء، وبسعر أوضح بكثير من تكلفة توظيف
            محاسب دائم بدوام كامل.
          </p>
        </div>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold tracking-wide text-brand-600">
                لماذا تتعامل معي؟
              </span>
              <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
                خبرة تتعامل معها مباشرة، بدون وسطاء
              </h2>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {whyMizaroReasons.map((reason) => (
                <div
                  key={reason}
                  className="flex items-center gap-3.5 rounded-2xl border border-brand-100 bg-brand-50/40 p-5"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-800 text-white">
                    <Check className="h-4.5 w-4.5" strokeWidth={2} />
                  </span>
                  <p className="text-sm font-bold text-ink-900">{reason}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <HowWeWork />
        <TrustAreas />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
