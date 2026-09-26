import type { Metadata } from "next";
// نستخدم @fontsource بدل next/font/google لتفادي الاعتماد على اتصال
// وقت البناء بخوادم Google Fonts (يعمل محليًا كملفات مستضافة ذاتيًا).
import "@fontsource/tajawal/300.css";
import "@fontsource/tajawal/400.css";
import "@fontsource/tajawal/500.css";
import "@fontsource/tajawal/700.css";
import "@fontsource/tajawal/800.css";
import "@fontsource/tajawal/900.css";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { getSiteSettings } from "@/lib/sanity-data";
import { BRAND_SHADES } from "@/lib/color-scale";
import WhatsAppFloatButton from "@/components/WhatsAppFloatButton";

const description =
  "مِزارو قسم المحاسبة الخارجي لمشروعك — محاسب عن بُعد يتولى مسك الدفاتر وضريبة القيمة المضافة والفوترة الإلكترونية للمنشآت والمتاجر الإلكترونية في السعودية، بدون تكلفة محاسب دائم.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description,
  keywords: [
    "مِزارو",
    "Mizaro",
    "محاسب عن بعد",
    "محاسب للشركات الصغيرة",
    "خدمات محاسبية",
    "مسك دفاتر",
    "محاسب للشركات",
    "خدمات محاسبية في السعودية",
    "محاسب للمتاجر الإلكترونية",
    "خدمات ضريبة القيمة المضافة",
    "الفوترة الإلكترونية",
    "إقرار ضريبي",
    "محاسب عن بعد السعودية",
    "محاسب في الدمام",
    "توفير تكلفة محاسب",
  ],
  authors: [{ name: siteConfig.companyName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteConfig.siteUrl,
    siteName: siteConfig.companyName,
    title: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "DS8MlfLkgwOuE2ZEtqI1BxF7_Ia6HNkTLfrRwlNR448",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.companyName,
  alternateName: siteConfig.companyNameEn,
  description,
  areaServed: [
    { "@type": "Country", name: "SA" },
    { "@type": "City", name: "الدمام" },
    { "@type": "City", name: "الخبر" },
    { "@type": "City", name: "الظهران" },
    { "@type": "AdministrativeArea", name: "المنطقة الشرقية" },
  ],
  url: siteConfig.siteUrl,
  telephone: `+${siteConfig.whatsappNumber}`,
  email: siteConfig.email,
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  // إذا اختار المستخدم لونًا مخصصًا من لوحة Sanity، نحقن متغيرات CSS
  // تكتب فوق تدرج ألوان "brand" الافتراضي في كل صفحات الموقع دفعة واحدة
  const brandOverrideCss = settings.brandScale
    ? `:root{${BRAND_SHADES.map(
        (shade) => `--brand-${shade}:${settings.brandScale![shade]};`
      ).join("")}}`
    : null;

  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
        {brandOverrideCss && (
          <style dangerouslySetInnerHTML={{ __html: brandOverrideCss }} />
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppFloatButton />
      </body>
    </html>
  );
}
