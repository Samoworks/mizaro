import { Compass, Search, Hammer, TrendingUp } from "lucide-react";
import { methodologySteps } from "@/lib/site-config";

const icons = [Compass, Search, Hammer, TrendingUp];

export default function HowWeWork() {
  return (
    <section className="bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-300">
            منهجية العمل
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            كيف أعمل؟
          </h2>
        </div>

        <div className="relative mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-[42px] hidden h-px bg-gradient-to-l from-transparent via-white/15 to-transparent lg:block"
          />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {methodologySteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="relative flex h-[84px] w-[84px] items-center justify-center rounded-full border border-white/15 bg-ink-900">
                    <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-[11px] font-extrabold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon className="h-8 w-8 text-brand-300" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-6 text-base font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[200px] text-sm leading-7 text-ink-400">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
