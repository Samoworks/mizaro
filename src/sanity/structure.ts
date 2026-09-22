import type { StructureResolver } from "sanity/structure";
import {
  Settings,
  Receipt,
  ShoppingBag,
  HelpCircle,
} from "lucide-react";

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
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("إعدادات الموقع العامة")
        ),
      S.divider(),
      S.documentTypeListItem("pricingPlan")
        .title("باقات المحاسبة والضريبة")
        .icon(Receipt),
      S.documentTypeListItem("ecommercePackage")
        .title("باقات التجارة الإلكترونية")
        .icon(ShoppingBag),
      S.documentTypeListItem("faq").title("الأسئلة الشائعة").icon(HelpCircle),
    ]);
