import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { buildWhatsAppLinkAsync, getSiteSettings } from "@/lib/sanity-data";

export default async function Hero() {
  const [whatsappLink, settings] = await Promise.all([
    buildWhatsAppLinkAsync(),
    getSiteSettings(),
  ]);

  return (
    <section className="relative overflow-hidden bg-ink-950">
      {/* شبكة نقاط خفيفة + توهّج زمردي — عنصر بصري مجرّد بدل الصور التقليدية */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-brand-600/20 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:py-32">
        <div className="text-center lg:text-right">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-wide text-brand-200 sm:text-sm">
            {settings.heroBadge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
            {settings.heroTitle}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-ink-300 sm:text-lg lg:mx-0">
            {settings.heroSubtitle}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-brand-50 sm:w-auto"
            >
              احصل على تقييم مجاني
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
            >
              <MessageCircle className="h-4 w-4" />
              تحدث معنا عبر واتساب
            </a>
          </div>

          <Link
            href="/#quiz"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-400 transition-colors hover:text-white"
          >
            أو اعرف الباقة المناسبة لك أولًا
          </Link>
        </div>

        {settings.heroImageUrl ? (
          /* صورة/بنر مرفوعة من لوحة التحكم */
          <div className="relative mx-auto hidden aspect-square w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 lg:block">
            <Image
              src={settings.heroImageUrl}
              alt={settings.heroTitle}
              fill
              sizes="(min-width: 1024px) 28rem, 0px"
              className="object-cover"
            />
          </div>
        ) : (
          /* عنصر بصري مجرّد: Business + Finance + Digital Commerce */
          <div className="relative mx-auto hidden aspect-square w-full max-w-md lg:block" aria-hidden>
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent" />
            <div className="absolute inset-8 rounded-[2rem] border border-white/10" />

            <div className="absolute right-6 top-8 flex items-end gap-1.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              {[40, 65, 50, 80, 60].map((h, i) => (
                <span
                  key={i}
                  className="w-2.5 rounded-full bg-brand-400/80"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>

            <div className="absolute left-6 top-24 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left backdrop-blur-sm">
              <span className="block text-[10px] font-bold tracking-widest text-ink-400">
                VAT
              </span>
              <span className="mt-1 block text-xl font-extrabold text-white">15%</span>
            </div>

            <div className="absolute bottom-10 right-10 h-24 w-24 rounded-full border border-brand-400/40" />
            <div className="absolute bottom-16 left-10 h-3 w-3 rounded-full bg-brand-400" />
            <div className="absolute left-14 bottom-28 h-2 w-2 rounded-full bg-white/60" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 400"
              fill="none"
            >
              <path
                d="M60 300 L150 220 L220 260 L340 120"
                stroke="url(#heroLine)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="heroLine" x1="60" y1="300" x2="340" y2="120">
                  <stop offset="0%" stopColor="#4a9f7d" stopOpacity="0" />
                  <stop offset="50%" stopColor="#4a9f7d" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}
      </div>
    </section>
  );
}
