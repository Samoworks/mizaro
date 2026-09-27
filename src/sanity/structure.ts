import type { StructureResolver, DefaultDocumentNodeResolver } from "sanity/structure";
import { Settings, Receipt, HelpCircle, Newspaper, LayoutDashboard } from "lucide-react";
import DashboardOverview from "./studio/DashboardOverview";
import PostsGrid from "./studio/PostsGrid";
import PostPreviewPane from "./studio/PostPreviewPane";

/**
 * تخصيص شريط التنقل في الاستوديو:
 * نظرة عامة (لوحة أرقام) ← إعدادات الموقع (Singleton) ← الباقات ← الأسئلة
 * الشائعة ← مقالات المدونة (Grid مخصص بدل قائمة نصية).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("محتوى مِزارو")
    .items([
      S.listItem()
        .id("overview")
        .title("نظرة عامة")
        .icon(LayoutDashboard)
        .child(S.component(DashboardOverview).id("overview-pane").title("نظرة عامة")),
      S.divider(),
      S.listItem()
        .id("siteSettings")
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
      S.documentTypeListItem("faq").title("الأسئلة الشائعة").icon(HelpCircle),
      S.divider(),
      S.listItem()
        .id("blogPosts")
        .title("مقالات المدونة")
        .icon(Newspaper)
        .child(S.component(PostsGrid).id("blogPosts-pane").title("مقالات المدونة")),
    ]);

/**
 * تبويب "معاينة" إضافي على محرر المقال (بجانب تبويب المحتوى)، يعمل بنفس
 * سلوك فتح المستند مهما كانت طريقة الوصول له (من الـGrid أو من رابط مباشر).
 */
export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  if (schemaType === "post") {
    return S.document().views([
      S.view.form().id("form").title("المحتوى"),
      S.view.component(PostPreviewPane).id("preview").title("معاينة"),
    ]);
  }
  return S.document();
};
