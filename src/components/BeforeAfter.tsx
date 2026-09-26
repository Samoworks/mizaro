import { X, Check, ArrowDown } from "lucide-react";
import { beforeAfter } from "@/lib/site-config";

export default function BeforeAfter() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            {beforeAfter.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {beforeAfter.title}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-4 sm:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-[1.75rem] border border-ink-100 bg-white p-7">
            <h3 className="text-base font-extrabold text-ink-950">
              {beforeAfter.before.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {beforeAfter.before.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <X className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ink-300" />
                  <span className="text-ink-500">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-center py-2 sm:rotate-[-90deg]" aria-hidden>
            <ArrowDown className="h-6 w-6 text-brand-500" />
          </div>

          <div className="rounded-[1.75rem] border border-ink-950 bg-ink-950 p-7 text-white shadow-xl shadow-ink-950/15">
            <h3 className="text-base font-extrabold text-white">
              {beforeAfter.after.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {beforeAfter.after.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 h-4.5 w-4.5 shrink-0 text-brand-300" />
                  <span className="text-ink-100">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
