import { MessageCircle, ArrowLeft } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/site-config";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-900">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-7 px-4 py-20 text-center sm:px-6 sm:py-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-brand-400/40 bg-brand-800/60 px-4 py-1.5 text-xs font-bold text-brand-100 sm:text-sm">
          محاسبة شهرية عن بُعد للمنشآت الصغيرة والمتوسطة
        </span>

        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-5xl md:text-6xl">
          خل حسابات مطعمك علينا
        </h1>

        <p className="max-w-2xl text-base leading-8 text-brand-100/90 sm:text-lg">
          محاسبة وضريبة للبوفيهات والمطاعم والمتاجر الإلكترونية بدون الحاجة
          إلى محاسب دوام كامل.
        </p>

        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-base font-bold text-brand-900 shadow-lg shadow-black/10 transition-transform hover:scale-[1.02]"
          >
            اطلب استشارة مجانية
            <ArrowLeft className="h-5 w-5" />
          </a>
          <a
            href={buildWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/5 px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
          >
            <MessageCircle className="h-5 w-5" />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
