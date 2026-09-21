import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Packages from "@/components/Packages";
import EcommercePackages from "@/components/EcommercePackages";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "الباقات",
  description:
    "باقات مِزارو مقسّمة بوضوح: باقات المحاسبة والضريبة، وباقات التجارة الإلكترونية.",
};

export default function PackagesPage() {
  return (
    <>
      <Header />
      <main>
        <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الباقات
          </span>
          <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            باقات واضحة، مقسّمة حسب المجال
          </h1>
          <p className="mt-4 text-ink-500 leading-8">
            كل باقة مستقلة بسعرها ومزاياها، ويمكنك الجمع بين المجالين حسب
            احتياج نشاطك.
          </p>
        </div>
        <Packages />
        <EcommercePackages />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
