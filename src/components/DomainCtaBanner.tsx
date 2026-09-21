import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type DomainCtaBannerProps = {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  ctaLabel: string;
  variant: "accounting" | "ecommerce";
};

export default function DomainCtaBanner({
  eyebrow,
  title,
  description,
  href,
  ctaLabel,
  variant,
}: DomainCtaBannerProps) {
  const isEcommerce = variant === "ecommerce";

  return (
    <section className={isEcommerce ? "bg-white py-16 sm:py-20" : "bg-brand-50/50 py-16 sm:py-20"}>
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span
          className={`text-sm font-bold tracking-wide ${
            isEcommerce ? "text-ink-500" : "text-brand-600"
          }`}
        >
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-ink-500 leading-8">{description}</p>

        <div className="mt-8">
          <Link
            href={href}
            className={`inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-white transition-colors ${
              isEcommerce ? "bg-ink-950 hover:bg-brand-800" : "bg-brand-800 hover:bg-brand-700"
            }`}
          >
            {ctaLabel}
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
