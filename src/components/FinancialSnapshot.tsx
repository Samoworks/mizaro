import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, Users2 } from "lucide-react";
import { financialSnapshot } from "@/lib/site-config";

const indicatorIcons = [TrendingUp, TrendingDown, ArrowUpRight, Wallet, Users2];

export default function FinancialSnapshot() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            {financialSnapshot.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {financialSnapshot.title}
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            {financialSnapshot.description}
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-[1.75rem] border border-ink-100 bg-ink-950 shadow-xl shadow-ink-950/10">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-8">
            <span className="text-sm font-bold text-white">
              {financialSnapshot.monthLabel}
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-brand-200">
              مثال توضيحي
            </span>
          </div>

          <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-3">
            <div className="bg-ink-950 p-6 sm:p-7">
              <p className="text-xs font-bold text-ink-400">
                {financialSnapshot.revenue.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {financialSnapshot.revenue.value}
                <span className="mr-1.5 text-sm font-bold text-ink-400">
                  {financialSnapshot.revenue.unit}
                </span>
              </p>
            </div>
            <div className="bg-ink-950 p-6 sm:p-7">
              <p className="text-xs font-bold text-ink-400">
                {financialSnapshot.expenses.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {financialSnapshot.expenses.value}
                <span className="mr-1.5 text-sm font-bold text-ink-400">
                  {financialSnapshot.expenses.unit}
                </span>
              </p>
            </div>
            <div className="bg-brand-800 p-6 sm:p-7">
              <p className="text-xs font-bold text-brand-200">
                {financialSnapshot.netProfit.label}
              </p>
              <p className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                {financialSnapshot.netProfit.value}
                <span className="mr-1.5 text-sm font-bold text-brand-200">
                  {financialSnapshot.netProfit.unit}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-5 lg:gap-3">
            {financialSnapshot.indicators.map((indicator, index) => {
              const Icon = indicatorIcons[index] ?? TrendingUp;
              return (
                <div
                  key={indicator.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <Icon className="h-5 w-5 text-brand-300" strokeWidth={1.7} />
                  <p className="mt-3 text-xs font-bold text-ink-400">
                    {indicator.label}
                  </p>
                  <p className="mt-1 text-base font-extrabold text-white">
                    {indicator.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-ink-400">
          {financialSnapshot.disclaimer}
        </p>
      </div>
    </section>
  );
}
