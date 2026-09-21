import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "إعدادات الموقع العامة",
  type: "document",
  groups: [
    { name: "general", title: "عام", default: true },
    { name: "contact", title: "التواصل" },
    { name: "packages", title: "الباقات" },
  ],
  fields: [
    defineField({
      name: "companyName",
      title: "اسم الشركة (عربي)",
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
    defineField({
      name: "ecommercePackagesNote",
      title: "ملاحظة أسفل باقات التجارة الإلكترونية",
      type: "text",
      rows: 2,
      group: "packages",
    }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "tagline" },
  },
});
