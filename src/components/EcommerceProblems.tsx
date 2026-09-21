import Link from "next/link";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { ecommerceProblems } from "@/lib/site-config";

export default function EcommerceProblems() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            هل تواجه أيًا من هذا؟
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            عندك مشكلة في متجرك؟ ابدأ من هنا.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {ecommerceProblems.map((problem) => (
            <div
              key={problem}
              className="flex items-start gap-3 rounded-xl border border-ink-100 bg-white p-4.5"
            >
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.8} />
              <p className="text-sm font-medium leading-7 text-ink-700">
                {problem}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/contact?service=ecommerce"
            className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-brand-800"
          >
            حلل مشكلتك معنا
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
