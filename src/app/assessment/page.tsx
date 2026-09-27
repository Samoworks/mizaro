import type { Metadata } from "next";
import { Suspense } from "react";
import { ClipboardCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedContactForm from "@/components/UnifiedContactForm";

export const metadata: Metadata = {
  title: "تقييم مجاني",
  description:
    "احصل على تقييم مجاني لاحتياج منشأتك المحاسبي — عبّي بيانات نشاطك وبتواصل معك بنفسي لاقتراح الخدمة والباقة الأنسب.",
  alternates: { canonical: "/assessment" },
};

export default function AssessmentPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <ClipboardCheck className="h-7 w-7" strokeWidth={1.6} />
            </span>
            <span className="mt-5 block text-sm font-bold tracking-wide text-brand-600">
              تقييم مجاني
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
              احصل على تقييم مجاني لاحتياج منشأتك المحاسبي
            </h1>
            <p className="mt-4 text-ink-500 leading-8">
              عبّي بيانات نشاطك خلال دقائق، وبراجعها بنفسي وأتواصل معك مباشرة
              لاقتراح الخدمة والباقة الأنسب لحجم عملياتك — بدون أي التزام.
            </p>
          </div>

          <div className="mx-auto mt-10 px-4 sm:px-6">
            <Suspense fallback={null}>
              <UnifiedContactForm />
            </Suspense>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
