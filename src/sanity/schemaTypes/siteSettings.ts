import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "إعدادات الموقع العامة",
  type: "document",
  groups: [
    { name: "general", title: "عام", default: true },
    { name: "brand", title: "الهوية والبنرات" },
    { name: "contact", title: "التواصل" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "اسم العلامة (عربي)",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "companyNameEn",
      title: "اسم الشركة (إنجليزي)",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "tagline",
      title: "الشعار / الوصف القصير",
      type: "string",
      group: "general",
    }),
    defineField({
      name: "siteUrl",
      title: "رابط الموقع الرسمي",
      description: "مثال: https://mizaro.sa — يُستخدم في SEO وخريطة الموقع.",
      type: "url",
      group: "general",
    }),

    // ===== الهوية والبنرات =====
    defineField({
      name: "logo",
      title: "شعار الموقع",
      description:
        "صورة الشعار الظاهرة أعلى الموقع بجانب اسم الشركة. اتركه فارغًا لاستخدام الشعار الافتراضي.",
      type: "image",
      group: "brand",
      options: { hotspot: true },
    }),
    defineField({
      name: "primaryColor",
      title: "اللون الأساسي للموقع",
      description:
        "اختر لونًا واحدًا ويتولّد منه تلقائيًا كامل تدرج ألوان الموقع (الأزرار، الروابط، الخلفيات). اتركه فارغًا للون الافتراضي.",
      type: "color",
      group: "brand",
      options: { disableAlpha: true },
    }),
    defineField({
      name: "heroBadge",
      title: "النص الصغير أعلى العنوان الرئيسي",
      description: 'مثال: "حلول الأعمال والتجارة الرقمية"',
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "heroTitle",
      title: "العنوان الرئيسي في الصفحة الأولى",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "heroSubtitle",
      title: "الوصف تحت العنوان الرئيسي",
      type: "text",
      rows: 3,
      group: "brand",
    }),
    defineField({
      name: "heroImage",
      title: "صورة/بنر الصفحة الرئيسية",
      description:
        "صورة تظهر في الجانب البصري من قسم الهيرو (اختياري). اتركها فارغة لعرض التصميم الرسومي الافتراضي.",
      type: "image",
      group: "brand",
      options: { hotspot: true },
    }),

    defineField({
      name: "whatsappNumber",
      title: "رقم واتساب (بصيغة دولية بدون + أو مسافات)",
      description: "مثال: 966501234567",
      type: "string",
      group: "contact",
      validation: (rule) =>
        rule
          .regex(/^[0-9]{8,15}$/)
          .error("أدخل رقمًا دوليًا بدون + أو مسافات، مثال: 966501234567"),
    }),
    defineField({
      name: "whatsappDisplay",
      title: "رقم واتساب للعرض على الشاشة",
      description: "مثال: +966 50 123 4567",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "البريد الإلكتروني للتواصل",
      type: "string",
      group: "contact",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "whatsappDefaultMessage",
      title: "رسالة واتساب الافتراضية",
      type: "text",
      rows: 2,
      group: "contact",
    }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "tagline", media: "logo" },
  },
});
