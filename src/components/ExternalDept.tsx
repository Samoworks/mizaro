import { X, Check } from "lucide-react";
import { externalDeptSection, siteConfig } from "@/lib/site-config";

export default function ExternalDept() {
  return (
    <section className="bg-brand-50/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            {externalDeptSection.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            {externalDeptSection.title}
          </h2>
          <p className="mt-5 text-lg font-bold leading-8 text-ink-800">
            {siteConfig.coreMessage}
          </p>
          <p className="mt-4 text-ink-500 leading-8">
            {externalDeptSection.description}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-[1.75rem] border border-ink-100 bg-white p-7">
            <h3 className="text-base font-extrabold text-ink-950">
              {externalDeptSection.hiringColumn.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {externalDeptSection.hiringColumn.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm">
                  <X className="mt-0.5 h-4.5 w-4.5 shrink-0 text-ink-300" />
                  <span className="text-ink-500">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[1.75rem] border border-ink-950 bg-ink-950 p-7 text-white shadow-xl shadow-ink-950/15">
            <h3 className="text-base font-extrabold text-white">
              {externalDeptSection.mizaroColumn.title}
            </h3>
            <ul className="mt-6 flex flex-col gap-3.5">
              {externalDeptSection.mizaroColumn.points.map((point) => (
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
