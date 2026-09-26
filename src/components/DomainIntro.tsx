import { type LucideIcon } from "lucide-react";

type DomainIntroProps = {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
};

export default function DomainIntro({
  icon: Icon,
  eyebrow,
  title,
  description,
}: DomainIntroProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-20 text-center sm:px-6 sm:pt-28">
      <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon className="h-7 w-7" strokeWidth={1.6} />
      </span>
      <span className="mt-5 block text-sm font-bold tracking-wide text-brand-600">
        {eyebrow}
      </span>
      <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
        {title}
      </h1>
      <p className="mt-4 text-ink-500 leading-8">{description}</p>
    </div>
  );
}
