import { defineField, defineType } from "sanity";
import { TitleInputWithCounter, SeoDescriptionInputWithPreview } from "../studio/SeoFieldComponents";

export default defineType({
  name: "post",
  title: "مقالات المدونة",
  type: "document",
  groups: [
    { name: "content", title: "المحتوى", default: true },
    { name: "settings", title: "الصورة والنشر" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "عنوان المقال",
      description: "يُستخدم أيضًا كعنوان meta title في نتائج البحث — يُفضّل ألا يتجاوز 60 حرفًا",
      type: "string",
      group: "content",
      components: { input: TitleInputWithCounter },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "الرابط (Slug)",
      type: "slug",
      description: "يُستخدم في رابط المقال، مثال: /blog/عنوان-المقال",
      group: "content",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "مقتطف قصير",
      description: "يظهر في صفحة المدونة، وكوصف SEO احتياطي إذا لم يُكتب وصف SEO مخصص",
      type: "text",
      rows: 3,
      group: "content",
      validation: (rule) => rule.required().max(220),
    }),
    defineField({
      name: "body",
      title: "محتوى المقال",
      type: "array",
      group: "content",
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
      name: "coverImage",
      title: "صورة الغلاف",
      type: "image",
      group: "settings",
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
      name: "publishedAt",
      title: "تاريخ النشر",
      description: "تاريخ في المستقبل يعني أن المقال لن يظهر على الموقع إلا بعد حلوله",
      type: "datetime",
      group: "settings",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "seoDescription",
      title: "وصف SEO (اختياري)",
      description: "إذا تُرك فارغًا، يُستخدم المقتطف القصير تلقائيًا — يُفضّل ألا يتجاوز 160 حرفًا",
      type: "text",
      rows: 2,
      group: "seo",
      components: { input: SeoDescriptionInputWithPreview },
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
    select: {
      title: "title",
      subtitle: "excerpt",
      media: "coverImage",
      isDraft: "_id",
    },
    prepare({ title, subtitle, media, isDraft }) {
      const status = typeof isDraft === "string" && isDraft.startsWith("drafts.") ? "مسودة" : "منشور";
      return {
        title,
        subtitle: `● ${status} — ${subtitle ?? ""}`,
        media,
      };
    },
  },
});
