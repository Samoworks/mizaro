import { defineField, defineType } from "sanity";

export default defineType({
  name: "pricingPlan",
  title: "باقات المحاسبة والضريبة",
  type: "document",
  fields: [
    defineField({
      name: "planId",
      title: "معرّف الباقة",
      description: "معرّف ثابت بالإنجليزي بدون مسافات، مثال: basic أو advanced أو custom",
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
      description: "رقم فقط مثل 299، أو نص مثل \"تواصل معنا\" للباقة المخصصة",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "period",
      title: "الفترة / الوصف تحت السعر",
      description: "مثال: ريال / شهريًا",
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
      title: "إبراز الباقة (الأكثر طلبًا)",
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
