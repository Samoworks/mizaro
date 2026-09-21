import { type LucideIcon } from "lucide-react";

type DomainIntroProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  variant: "accounting" | "ecommerce";
};

export default function DomainIntro({
  icon: Icon,
  eyebrow,
  title,
  description,
  variant,
}: DomainIntroProps) {
  const isEcommerce = variant === "ecommerce";

  return (
    <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-24">
      <span
        className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
          isEcommerce ? "bg-amber-50 text-amber-600" : "bg-brand-50 text-brand-700"
        }`}
      >
        <Icon className="h-7 w-7" strokeWidth={1.8} />
      </span>
      <span
        className={`mt-5 block text-sm font-bold tracking-wide ${
          isEcommerce ? "text-amber-600" : "text-brand-600"
        }`}
      >
        {eyebrow}
      </span>
      <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-neutral-600 leading-8">{description}</p>
    </div>
  );
}

