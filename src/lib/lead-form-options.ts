/**
 * ============================================================
 *  خيارات نموذج تأهيل العميل (Lead Qualification Form)
 * ============================================================
 * كل القوائم والخيارات الثابتة المستخدمة في نموذج صفحة التواصل
 * متعدد الخطوات. فصلها هنا يخلي site-config.ts مركّزًا على محتوى
 * التسويق العام، ويخلي تعديل خيارات النموذج أسهل مستقبلًا.
 */

export const saudiCities = [
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "الظهران",
  "الأحساء",
  "الطائف",
  "تبوك",
  "بريدة",
  "خميس مشيط",
  "أبها",
  "نجران",
  "حائل",
  "جازان",
  "ينبع",
  "القطيف",
  "عرعر",
  "سكاكا",
  "مدينة أخرى",
] as const;

export const activityTypes = [
  "متجر إلكتروني",
  "تجارة",
  "مطعم / كافيه",
  "خدمات",
  "مقاولات",
  "عيادة / مركز طبي",
  "مكتب مهني",
  "صناعة",
  "أخرى",
] as const;

export const businessAgeOptions = [
  "أقل من سنة",
  "1–3 سنوات",
  "3–5 سنوات",
  "أكثر من 5 سنوات",
] as const;

export const monthlySalesOptions = [
  "أقل من 50,000 ريال",
  "50,000 – 100,000 ريال",
  "100,000 – 300,000 ريال",
  "300,000 – 500,000 ريال",
  "أكثر من 500,000 ريال",
  "أفضل عدم الإجابة",
] as const;

export const invoicesCountOptions = [
  "أقل من 50",
  "50 – 200",
  "200 – 500",
  "أكثر من 500",
  "لا أعرف",
] as const;

export const employeesCountOptions = [
  "لا يوجد",
  "1–5",
  "6–20",
  "21–50",
  "أكثر من 50",
] as const;

export const inventoryManagementOptions = [
  "برنامج محاسبي",
  "Excel",
  "نظام مستودعات",
  "يدوي",
  "أخرى",
] as const;

export const bankAccountsCountOptions = ["1", "2–3", "أكثر من 3"] as const;

export const ecommercePlatformOptions = [
  "سلة",
  "زد",
  "Shopify",
  "WooCommerce",
  "أخرى",
] as const;

export const paymentGatewayOptions = [
  "مدى",
  "Apple Pay",
  "STC Pay",
  "تحويل بنكي",
  "بطاقات ائتمانية",
  "أخرى",
] as const;

export const activeProjectsCountOptions = ["1", "2–5", "6–10", "أكثر من 10"] as const;

export const currentAccountingStatusOptions = [
  "لا توجد محاسبة منظمة",
  "أقوم بها بنفسي",
  "موظف محاسبة داخلي",
  "محاسب مستقل",
  "مكتب محاسبة خارجي",
  "أكثر من شخص / جهة",
] as const;

export const switchReasonOptions = [
  "أحتاج متابعة أكثر",
  "أحتاج تقارير أوضح",
  "أحتاج تنظيم الحسابات",
  "أحتاج خدمات إضافية",
  "أريد تغيير مقدم الخدمة",
  "أخرى",
] as const;

export const currentSoftwareOptions = [
  "قيود",
  "دفترة",
  "Zoho Books",
  "QuickBooks",
  "Excel",
  "برنامج آخر",
  "لا يوجد برنامج محاسبي",
] as const;

export const lastClosingOptions = [
  "هذا الشهر",
  "خلال آخر 3 أشهر",
  "خلال آخر 6 أشهر",
  "أكثر من 6 أشهر",
  "لا أعرف",
  "لم يتم الإقفال",
] as const;

export const requestedServiceOptions = [
  "مسك الحسابات",
  "تنظيم الفواتير والمصروفات",
  "التقارير المالية الشهرية",
  "إقفال الحسابات",
  "ضريبة القيمة المضافة",
  "الفوترة الإلكترونية",
  "الرواتب",
  "إدارة ومتابعة الذمم",
  "المخزون",
  "التسويات البنكية",
  "خدمة محاسبية متكاملة",
] as const;

export const servicePreferenceOptions = [
  "خدمة محاسبية شهرية مستمرة",
  "ترتيب وتنظيم الحسابات أولًا",
  "خدمة محددة",
  "لا أعرف وأحتاج توصية",
] as const;

export const preferredTimeOptions = ["صباحًا", "ظهرًا", "مساءً", "أي وقت"] as const;

export const preferredContactMethodOptions = [
  "واتساب",
  "اتصال",
  "بريد إلكتروني",
] as const;

export const FORM_STEP_LABELS = [
  "نشاطك",
  "حجم النشاط",
  "المحاسبة",
  "احتياجك",
  "التواصل",
] as const;
