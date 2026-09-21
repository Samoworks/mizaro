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
  areaServed: {
    "@type": "Country",
    name: "SA",
  },
  url: siteConfig.siteUrl,
  telephone: `+${siteConfig.whatsappNumber}`,
  email: siteConfig.email,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen bg-white font-sans text-foreground antialiased">
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
