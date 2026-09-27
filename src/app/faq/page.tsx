import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import DomainCtaBanner from "@/components/DomainCtaBanner";

export const metadata: Metadata = {
  title: "الأسئلة الشائعة",
  description: "إجابات على أكثر الأسئلة تكرارًا حول خدمات مِزارو المحاسبية.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الأسئلة الشائعة
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            عندك سؤال؟
          </h1>
          <p className="mt-4 text-ink-500 leading-8">
            إذا ما لقيت إجابة سؤالك هنا، تواصل معي مباشرة وبجاوبك.
          </p>
        </div>
        <FAQ showHeading={false} />
        <DomainCtaBanner
          eyebrow="لسا عندك سؤال؟"
          title="تواصل معي مباشرة"
          description="أجاوبك على أي استفسار متعلق بخدمات المحاسبة والضريبة لمنشأتك."
          href="/contact"
          ctaLabel="تواصل معي"
        />
      </main>
      <Footer />
    </>
  );
}
