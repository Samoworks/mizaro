import { defineField, defineType } from "sanity";

export default defineType({
  name: "ecommercePackage",
  title: "باقات التجارة الإلكترونية",
  type: "document",
  fields: [
    defineField({
      name: "planId",
      title: "معرّف الباقة",
      description: "معرّف ثابت بالإنجليزي بدون مسافات، مثال: audit أو starter أو growth أو pro",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "اسم الباقة",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "السعر",
      description: "مثال: 199 أو 899",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "الفترة / الوصف تحت السعر",
      description: "مثال: ريال — مرة واحدة، أو ريال / شهريًا",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "وصف مختصر فوق الباقة (اختياري)",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "المزايا",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "ctaLabel",
      title: "نص زر الطلب",
      type: "string",
    }),
    defineField({
      name: "highlighted",
      title: "إبراز الباقة (الأكثر شمولًا)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "ترتيب الظهور",
      type: "number",
    }),
  ],
  orderings: [
    {
      title: "الترتيب",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "price" },
  },
});
