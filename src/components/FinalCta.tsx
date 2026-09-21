import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { buildWhatsAppLinkAsync } from "@/lib/sanity-data";

export default async function FinalCta() {
  const whatsappLink = await buildWhatsAppLinkAsync();

  return (
    <section className="relative overflow-hidden bg-ink-950 py-20 sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-brand-600/20 blur-[110px]"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-extrabold leading-tight text-white sm:text-5xl">
          جاهز ترتب أعمالك؟
        </h2>
        <p className="mt-5 text-base leading-8 text-ink-300 sm:text-lg">
          ابدأ مع مِزارو بخطوة واضحة.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-brand-50 sm:w-auto"
          >
            ابدأ الآن
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            <MessageCircle className="h-4 w-4" />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
