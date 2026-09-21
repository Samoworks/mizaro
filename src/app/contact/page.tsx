import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UnifiedContactForm from "@/components/UnifiedContactForm";
import { getSiteSettings, buildWhatsAppLinkAsync } from "@/lib/sanity-data";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع مِزارو لطلب خدمات المحاسبة والضريبة أو التجارة الإلكترونية.",
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
        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <span className="text-sm font-bold tracking-wide text-brand-600">
              تواصل معنا
            </span>
            <h1 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
              جاهز نبدأ؟ عبّي بياناتك
            </h1>
            <p className="mt-4 text-ink-500 leading-8">
              عبّي النموذج وسنتواصل معك لاقتراح الخطوة الأنسب لنشاطك.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6">
            <Suspense fallback={null}>
              <UnifiedContactForm whatsappNumber={settings.whatsappNumber} />
            </Suspense>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-8">
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
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
