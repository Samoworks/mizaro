import {
  Store,
  Package,
  FileText,
  Search,
  BadgePercent,
  Share2,
  Music2,
  ListTree,
  Target,
  MousePointerClick,
  CreditCard,
  Truck,
  Code2,
  Wrench,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: Store,
    title: "إنشاء وتجهيز المتجر",
    description: "تجهيز بنية المتجر وتنظيم الأقسام والصفحات وتجربة المستخدم.",
  },
  {
    icon: Package,
    title: "إدارة المنتجات",
    description:
      "تنظيم المنتجات والتصنيفات والأسعار والمواصفات وتحسين طريقة عرض المنتجات.",
  },
  {
    icon: FileText,
    title: "تحسين صفحات المنتجات",
    description:
      "تحسين اسم المنتج والوصف والمعلومات والصور والعناصر التي تساعد العميل على اتخاذ قرار الشراء.",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "تحسين ظهور المتجر والمنتجات في محركات البحث: Page Title وMeta Description وSEO URL وGoogle Search Console وSitemap وCanonical وتحسين محتوى المنتجات.",
  },
  {
    icon: BadgePercent,
    title: "Google Ads",
    description:
      "تجهيز الحملات الإعلانية وربطها بصفحات المنتجات أو صفحات العروض وتحسين بنية الإعلان.",
  },
  {
    icon: Share2,
    title: "Meta Ads",
    description: "إعداد وربط الحملات الإعلانية عبر Meta وفهم الكتالوج والتتبع.",
  },
  {
    icon: Music2,
    title: "TikTok Ads",
    description:
      "تجهيز الحملات الإعلانية والمحتوى المناسب للمنصة وربطها بالمتجر.",
  },
  {
    icon: ListTree,
    title: "الكتالوجات وProduct Feed",
    description:
      "ربط المنتجات بالكتالوجات والمنصات الإعلانية ومعالجة مشاكل عدم ظهور المنتجات.",
  },
  {
    icon: Target,
    title: "Pixel والتتبع",
    description: "إعداد ومراجعة أدوات التتبع والتحويلات وربطها بالحملات.",
  },
  {
    icon: MousePointerClick,
    title: "تحسين تجربة المستخدم",
    description:
      "تحسين رحلة العميل داخل المتجر: من الدخول → البحث → المنتج → السلة → الدفع.",
  },
  {
    icon: CreditCard,
    title: "الدفع والتقسيط",
    description:
      "تهيئة وعرض خيارات الدفع والتقسيط مثل تمارا وتابي بطريقة واضحة داخل المتجر.",
  },
  {
    icon: Truck,
    title: "الشحن والاستلام",
    description:
      "تحسين طريقة عرض خيارات الشحن والاستلام والمعلومات المتعلقة بها.",
  },
  {
    icon: Code2,
    title: "تخصيص المتجر",
    description:
      "تعديل واجهة المتجر باستخدام HTML وCSS وJavaScript عند الحاجة.",
  },
  {
    icon: Wrench,
    title: "تحليل المشاكل التقنية",
    description:
      "تحليل مشاكل المتجر والعناصر الديناميكية والواجهة وربط الخدمات المختلفة.",
  },
];

export default function EcommerceServices() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-amber-600">
            خدماتنا
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            خدمات التجارة الإلكترونية
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-right shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <service.icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="text-base font-bold text-brand-900">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-neutral-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

