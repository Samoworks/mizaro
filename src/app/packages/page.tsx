import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Packages from "@/components/Packages";
import SavingsHighlight from "@/components/SavingsHighlight";
import FinalCta from "@/components/FinalCta";

export const metadata: Metadata = {
  title: "الباقات",
  description: "باقات مِزارو للمحاسبة والضريبة — أسعار واضحة، بدون رسوم مفاجئة.",
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
            باقة واضحة، بسعر أوفر من محاسب دائم
          </h1>
          <p className="mt-4 text-ink-500 leading-8">
            كل باقة واضحة السعر والمزايا، وتقدر تبدأ أو تلغي شهريًا.
          </p>
        </div>
        <Packages />
        <SavingsHighlight />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
