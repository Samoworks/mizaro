import { ShieldCheck } from "lucide-react";
import { dataProtection } from "@/lib/site-config";

export default function DataProtection() {
  return (
    <section className="bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="flex justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-300">
              <ShieldCheck className="h-7 w-7" strokeWidth={1.6} />
            </span>
          </span>
          <span className="mt-4 block text-sm font-bold tracking-wide text-brand-300">
            {dataProtection.eyebrow}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">
            {dataProtection.title}
          </h2>
          <p className="mt-4 leading-8 text-ink-300">
            {dataProtection.description}
          </p>
        </div>

        <ul className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
          {dataProtection.points.map((point) => (
            <li
              key={point}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-ink-200"
            >
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
