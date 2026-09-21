import type { StructureResolver } from "sanity/structure";

/**
 * تخصيص شريط التنقل في الاستوديو: "إعدادات الموقع" وثيقة واحدة فقط
 * (Singleton)، والباقي قوائم عادية.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("محتوى مِزارو")
    .items([
      S.listItem()
        .title("إعدادات الموقع العامة")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("pricingPlan").title("باقات المحاسبة والضريبة"),
      S.documentTypeListItem("ecommercePackage").title(
        "باقات التجارة الإلكترونية"
      ),
      S.documentTypeListItem("faq").title("الأسئلة الشائعة"),
    ]);
