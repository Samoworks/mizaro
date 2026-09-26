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
  "مِزارو تقدم حلول المحاسبة والضريبة والتجارة الإلكترونية للمنشآت وأصحاب الأعمال، من التنظيم المالي إلى تحسين المتاجر والأداء الرقمي.";

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
    "محاسبة وضريبة عن بعد",
    "ضريبة القيمة المضافة",
    "إقرار ضريبي",
    "محاسب عن بعد السعودية",
    "محاسب في الدمام",
    "محاسبة عن بعد الدمام",
    "شركة محاسبة الدمام",
    "تطوير متاجر إلكترونية",
    "تحسين محركات بحث للمتاجر",
    "إدارة حملات إعلانية للمتاجر",
    "حلول الأعمال الرقمية",
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
