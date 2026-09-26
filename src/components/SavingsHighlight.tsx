import Link from "next/link";
import { PiggyBank, ArrowLeft } from "lucide-react";
import { savingsHighlight } from "@/lib/site-config";

export default function SavingsHighlight() {
  return (
    <section className="relative overflow-hidden bg-ink-950 py-16 sm:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/20 blur-[100px]"
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-300">
          <PiggyBank className="h-7 w-7" strokeWidth={1.6} />
        </span>
        <span className="text-sm font-bold tracking-wide text-brand-300">
          {savingsHighlight.eyebrow}
        </span>
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          {savingsHighlight.title}
        </h2>
        <p className="max-w-2xl text-base leading-8 text-ink-300 sm:text-lg">
          {savingsHighlight.description}
        </p>
        <p className="text-xs text-ink-500">{savingsHighlight.note}</p>
        <Link
          href="/packages"
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-brand-50"
        >
          استعرض الباقات
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
