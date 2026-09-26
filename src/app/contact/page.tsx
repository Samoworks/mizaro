import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedContactForm from "@/components/UnifiedContactForm";
import { getSiteSettings, buildWhatsAppLinkAsync } from "@/lib/sanity-data";

export const metadata: Metadata = {
  title: "تواصل معي",
  description: "تواصل مع مِزارو لطلب خدمات المحاسبة والضريبة عن بُعد.",
};

export default async function ContactPage() {
  const [settings, whatsappLink] = await Promise.all([
    getSiteSettings(),
    buildWhatsAppLinkAsync(),
  ]);

  return (
    <>
      <Header />
      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="text-sm font-bold tracking-wide text-brand-600">
              تواصل معي
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
              أخبرني عن مشروعك
            </h1>
            <p className="mt-4 text-ink-500 leading-8">
              وسأساعدك في تحديد احتياجك المحاسبي خلال دقائق قليلة.
            </p>
          </div>

          <div className="mx-auto mt-10 px-4 sm:px-6">
            <Suspense fallback={null}>
              <UnifiedContactForm />
            </Suspense>
          </div>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col items-center justify-center gap-4 px-4 text-center sm:flex-row sm:gap-8 sm:px-6">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-bold text-ink-700 hover:text-brand-800"
            >
              <MessageCircle className="h-4 w-4" />
              {settings.whatsappDisplay}
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="flex items-center gap-2 text-sm font-bold text-ink-700 hover:text-brand-800"
            >
              <Mail className="h-4 w-4" />
              {settings.email}
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
