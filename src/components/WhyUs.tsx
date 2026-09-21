import { Check } from "lucide-react";
import { whyMizaroReasons } from "@/lib/site-config";

export default function WhyUs() {
  return (
    <section className="bg-brand-50/50 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            لماذا مِزارو؟
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            لأننا ننظر إلى العمل كمنظومة واحدة
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyMizaroReasons.map((reason) => (
            <div
              key={reason}
              className="flex items-center gap-3.5 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
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
  );
}
