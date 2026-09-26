/**
 * ============================================================
 *  طبقة جلب البيانات القابلة للتعديل من Sanity
 * ============================================================
 * كل دالة هنا تحاول جلب المحتوى من Sanity أولًا، وإذا لم يكن Sanity
 * مربوطًا بعد (لا توجد متغيرات بيئة) أو رجع فارغًا، تُستخدم القيم
 * الثابتة الافتراضية من site-config.ts تلقائيًا — الموقع لا يتعطل أبدًا.
 */
import { sanityClient } from "@/sanity/client";
import { urlForImage } from "@/sanity/image-url";
import { generateBrandScale } from "@/lib/color-scale";
import type { SanityImageSource } from "@sanity/image-url";
import {
  siteConfig as defaultSiteConfig,
  pricingPlans as defaultPricingPlans,
  faqs as defaultFaqs,
} from "@/lib/site-config";

export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period: string;
  features: readonly string[];
  ctaLabel: string;
  highlighted: boolean;
  tagline?: string | null;
};

export type Faq = { question: string; answer: string };

type SiteSettingsDoc = {
  companyName?: string;
  companyNameEn?: string;
  tagline?: string;
  siteUrl?: string;
  whatsappNumber?: string;
  whatsappDisplay?: string;
  email?: string;
  whatsappDefaultMessage?: string;
  logo?: SanityImageSource;
  heroImage?: SanityImageSource;
  heroBadge?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  primaryColor?: { hex?: string };
};

async function safeFetch<T>(query: string, fallback: T): Promise<T> {
  if (!sanityClient) return fallback;
  try {
    const result = await sanityClient.fetch<T>(query, {}, {
      next: { revalidate: 60 },
    });
    return result ?? fallback;
  } catch {
    // أي خطأ اتصال أو ضبط غير مكتمل — نستمر بالقيم الثابتة بصمت
    return fallback;
  }
}

/** إعدادات الموقع العامة (الاسم، واتساب، الإيميل...) مدمجة مع الافتراضي */
export async function getSiteSettings() {
  const doc = await safeFetch<SiteSettingsDoc | null>(
    `*[_type == "siteSettings"][0]{
      ...,
      logo,
      heroImage,
      primaryColor
    }`,
    null
  );

  const logoUrl = doc?.logo ? urlForImage(doc.logo)?.width(80).height(80).fit("max").url() ?? null : null;
  const heroImageUrl = doc?.heroImage
    ? urlForImage(doc.heroImage)?.width(900).height(900).fit("max").url() ?? null
    : null;

  // نولّد تدرج الألوان فقط إذا اختار المستخدم لونًا مخصصًا من لوحة التحكم،
  // حتى لا نغيّر مظهر الموقع الافتراضي بدون داعٍ
  const brandScale = doc?.primaryColor?.hex
    ? generateBrandScale(doc.primaryColor.hex)
    : null;

  return {
    companyName: doc?.companyName || defaultSiteConfig.companyName,
    companyNameEn: doc?.companyNameEn || defaultSiteConfig.companyNameEn,
    tagline: doc?.tagline || defaultSiteConfig.tagline,
    siteUrl: doc?.siteUrl || defaultSiteConfig.siteUrl,
    whatsappNumber: doc?.whatsappNumber || defaultSiteConfig.whatsappNumber,
    whatsappDisplay: doc?.whatsappDisplay || defaultSiteConfig.whatsappDisplay,
    email: doc?.email || defaultSiteConfig.email,
    whatsappDefaultMessage:
      doc?.whatsappDefaultMessage || defaultSiteConfig.whatsappDefaultMessage,
    logoUrl,
    heroImageUrl,
    heroBadge: doc?.heroBadge || defaultSiteConfig.heroBadge,
    heroTitle: doc?.heroTitle || defaultSiteConfig.heroTitle,
    heroSubtitle: doc?.heroSubtitle || defaultSiteConfig.heroSubtitle,
    brandScale,
  };
}

/** بناء رابط واتساب باستخدام رقم Sanity (أو الافتراضي) */
export async function buildWhatsAppLinkAsync(message?: string) {
  const settings = await getSiteSettings();
  const text = encodeURIComponent(message ?? settings.whatsappDefaultMessage);
  return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  const docs = await safeFetch<
    Array<{
      planId: string;
      name: string;
      price: string;
      period: string;
      features?: string[];
      ctaLabel?: string;
      highlighted?: boolean;
    }>
  >(
    `*[_type == "pricingPlan"] | order(order asc){planId, name, price, period, features, ctaLabel, highlighted}`,
    []
  );

  if (!docs.length) {
    return defaultPricingPlans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
      features: plan.features,
      ctaLabel: plan.ctaLabel,
      highlighted: plan.highlighted,
      tagline: "tagline" in plan ? plan.tagline : null,
    }));
  }

  return docs.map((plan) => ({
    id: plan.planId,
    name: plan.name,
    price: plan.price,
    period: plan.period,
    features: plan.features ?? [],
    ctaLabel: plan.ctaLabel ?? "اطلب الآن",
    highlighted: Boolean(plan.highlighted),
  }));
}

export async function getFaqs(): Promise<Faq[]> {
  const docs = await safeFetch<Faq[]>(
    `*[_type == "faq"] | order(order asc){question, answer}`,
    []
  );
  return docs.length ? docs : defaultFaqs.map((f) => ({ ...f }));
}
