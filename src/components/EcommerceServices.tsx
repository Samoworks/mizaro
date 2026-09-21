import {
  Store,
  Package,
  FileText,
  Search,
  BadgePercent,
  Share2,
  Music2,
  Rss,
  ListTree,
  Target,
  MousePointerClick,
  CreditCard,
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
    title: "تأسيس وتجهيز المتجر",
    description: "تجهيز بنية المتجر وتنظيم الأقسام والصفحات من الأساس.",
  },
  {
    icon: Package,
    title: "إدارة المنتجات",
    description: "تنظيم المنتجات والتصنيفات والأسعار وطريقة عرضها.",
  },
  {
    icon: FileText,
    title: "تحسين صفحات المنتجات",
    description: "تحسين الاسم والوصف والصور والعناصر التي تساعد على الشراء.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "تحسين ظهور المتجر والمنتجات في محركات البحث.",
  },
  {
    icon: BadgePercent,
    title: "Google Ads",
    description: "تجهيز الحملات الإعلانية وربطها بصفحات المنتجات والعروض.",
  },
  {
    icon: Share2,
    title: "Meta Ads",
    description: "إعداد وربط الحملات الإعلانية عبر Meta وفهم الكتالوج والتتبع.",
  },
  {
    icon: Music2,
    title: "TikTok Ads",
    description: "تجهيز الحملات والمحتوى المناسب للمنصة وربطها بالمتجر.",
  },
  {
    icon: Rss,
    title: "Product Feed",
    description: "تجهيز وربط بيانات المنتجات بالمنصات الإعلانية بشكل صحيح.",
  },
  {
    icon: ListTree,
    title: "Catalog",
    description: "بناء ومعالجة مشاكل الكتالوجات وربطها بالمنتجات.",
  },
  {
    icon: Target,
    title: "Pixel & Tracking",
    description: "إعداد ومراجعة أدوات التتبع والتحويلات وربطها بالحملات.",
  },
  {
    icon: MousePointerClick,
    title: "تحسين تجربة المستخدم",
    description: "تحسين رحلة العميل داخل المتجر من الدخول إلى الدفع.",
  },
  {
    icon: CreditCard,
    title: "تحسين الدفع والشحن",
    description: "تهيئة وعرض خيارات الدفع والشحن بطريقة واضحة داخل المتجر.",
  },
  {
    icon: Code2,
    title: "التعديلات HTML / CSS / JS",
    description: "تعديل واجهة المتجر مباشرة عند الحاجة لتخصيص دقيق.",
  },
  {
    icon: Wrench,
    title: "تحليل المشاكل التقنية",
    description: "تحليل مشاكل المتجر والعناصر الديناميكية وربط الخدمات.",
  },
];

export default function EcommerceServices() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-ink-500">
            خدماتنا
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            متجرك يحتاج أكثر من مجرد منتجات
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            المتجر الناجح ليس تصميمًا فقط. نعمل على المنتجات، تجربة المستخدم،
            الظهور في البحث، التتبع، الكتالوجات، الإعلانات، والتحسينات
            التقنية.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 text-right shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                <service.icon className="h-6 w-6" strokeWidth={1.7} />
              </span>
              <h3 className="text-base font-bold text-ink-950">
                {service.title}
              </h3>
              <p className="text-sm leading-7 text-ink-500">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
