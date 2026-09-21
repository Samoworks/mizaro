/**
 * ============================================================
 *  طبقة جلب البيانات القابلة للتعديل من Sanity
 * ============================================================
 * كل دالة هنا تحاول جلب المحتوى من Sanity أولًا، وإذا لم يكن Sanity
 * مربوطًا بعد (لا توجد متغيرات بيئة) أو رجع فارغًا، تُستخدم القيم
 * الثابتة الافتراضية من site-config.ts تلقائيًا — الموقع لا يتعطل أبدًا.
 */
import { sanityClient } from "@/sanity/client";
import {
  siteConfig as defaultSiteConfig,
  pricingPlans as defaultPricingPlans,
  ecommercePackages as defaultEcommercePackages,
  ecommercePackagesNote as defaultEcommercePackagesNote,
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
  ecommercePackagesNote?: string;
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
    `*[_type == "siteSettings"][0]`,
    null
  );

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
  };
}

/** بناء رابط واتساب باستخدام رقم Sanity (أو الافتراضي) */
export async function buildWhatsAppLinkAsync(message?: string) {
  const settings = await getSiteSettings();
  const text = encodeURIComponent(message ?? settings.whatsappDefaultMessage);
  return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
}

export async function getEcommercePackagesNote(): Promise<string> {
  const doc = await safeFetch<{ ecommercePackagesNote?: string } | null>(
    `*[_type == "siteSettings"][0]{ecommercePackagesNote}`,
    null
  );
  return doc?.ecommercePackagesNote || defaultEcommercePackagesNote;
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

export async function getEcommercePackages(): Promise<PricingPlan[]> {
  const docs = await safeFetch<
    Array<{
      planId: string;
      name: string;
      price: string;
      period: string;
      tagline?: string | null;
      features?: string[];
      ctaLabel?: string;
      highlighted?: boolean;
    }>
  >(
    `*[_type == "ecommercePackage"] | order(order asc){planId, name, price, period, tagline, features, ctaLabel, highlighted}`,
    []
  );

  if (!docs.length) {
    return defaultEcommercePackages.map((plan) => ({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      period: plan.period,
      tagline: plan.tagline,
      features: plan.features,
      ctaLabel: plan.ctaLabel,
      highlighted: plan.highlighted,
    }));
  }

  return docs.map((plan) => ({
    id: plan.planId,
    name: plan.name,
    price: plan.price,
    period: plan.period,
    tagline: plan.tagline ?? null,
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
