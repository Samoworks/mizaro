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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.companyName}`,
  },
  description:
    "خدمتان مستقلتان: محاسبة وضريبة شهرية عن بُعد للبوفيهات والمطاعم والكافيهات والمنشآت الصغيرة والمتوسطة، وخدمات تطوير وتحسين المتاجر الإلكترونية في السعودية.",
  keywords: [
    "محاسبة مطاعم",
    "محاسب بوفيهات",
    "ضريبة القيمة المضافة",
    "إقرار ضريبي",
    "محاسب عن بعد السعودية",
    "تطوير متاجر إلكترونية",
    "تحسين محركات بحث للمتاجر",
    "إدارة حملات إعلانية للمتاجر",
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
    description:
      "محاسبة وضريبة للمنشآت الصغيرة والمتوسطة، وخدمات مستقلة لتطوير وتحسين المتاجر الإلكترونية.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.companyName} | ${siteConfig.tagline}`,
    description:
      "محاسبة وضريبة للمنشآت الصغيرة والمتوسطة، وخدمات مستقلة لتطوير وتحسين المتاجر الإلكترونية.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.companyName,
  description:
    "خدمة محاسبة وضريبة شهرية عن بُعد للبوفيهات والمطاعم والكافيهات والمنشآت الصغيرة والمتوسطة، وخدمات مستقلة لتطوير وتحسين المتاجر الإلكترونية في السعودية.",
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
