import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "مقالات المدونة",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "عنوان المقال",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "الرابط (Slug)",
      type: "slug",
      description: "يُستخدم في رابط المقال، مثال: /blog/عنوان-المقال",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "مقتطف قصير",
      description: "يظهر في صفحة المدونة وفي نتائج البحث (بحد أقصى سطرين إلى ثلاثة)",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "صورة الغلاف",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "نص بديل للصورة",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "محتوى المقال",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "نص بديل للصورة",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "تاريخ النشر",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "وصف SEO (اختياري)",
      description: "إذا تُرك فارغًا، يُستخدم المقتطف القصير تلقائيًا",
      type: "text",
      rows: 2,
    }),
  ],
  orderings: [
    {
      title: "الأحدث أولًا",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "coverImage" },
  },
});
