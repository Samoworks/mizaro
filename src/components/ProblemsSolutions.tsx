import { CheckCircle2 } from "lucide-react";
import { accountingProblems, problemsClosingLine } from "@/lib/site-config";

export default function ProblemsSolutions() {
  return (
    <section id="problems" className="bg-brand-50/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            مشغول بإدارة مشروعك؟
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            مشغول بإدارة مشروعك… لكن من يدير أرقامه؟
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {accountingProblems.map((item) => (
            <div
              key={item.problem}
              className="rounded-2xl border border-ink-100 bg-white p-6 shadow-sm"
            >
              <p className="text-sm font-bold text-ink-400">{item.problem}</p>
              <div className="mt-3 flex items-start gap-2.5">
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                  strokeWidth={1.8}
                />
                <p className="text-base font-bold leading-7 text-ink-950">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xl font-extrabold text-ink-950">
          {problemsClosingLine}
        </p>
      </div>
    </section>
  );
}
