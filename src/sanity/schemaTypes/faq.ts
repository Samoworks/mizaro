import { defineField, defineType } from "sanity";

export default defineType({
  name: "faq",
  title: "الأسئلة الشائعة",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "السؤال",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "الجواب",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
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
    select: { title: "question" },
  },
});
