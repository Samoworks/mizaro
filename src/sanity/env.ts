/**
 * إعدادات الاتصال بـ Sanity (نظام إدارة المحتوى).
 * القيم تُقرأ من متغيرات البيئة — اضبطها في Vercel:
 * NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 *
 * ملاحظة: هذا الملف لا يرمي خطأ عند غياب المتغيرات، حتى يستمر الموقع
 * بالعمل بالبيانات الثابتة الافتراضية إذا لم يُربط Sanity بعد.
 */

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/** هل إعدادات Sanity مكتملة بما يكفي لمحاولة الاتصال؟ */
export const isSanityConfigured = Boolean(projectId && dataset);
