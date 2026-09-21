import { Store, ShoppingCart, Truck, Megaphone, type LucideIcon } from "lucide-react";

type Point = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const points: Point[] = [
  {
    icon: Store,
    title: "إدارة المتجر",
    description:
      "خبرة عملية في إدارة المنتجات والتصنيفات والأسعار والعروض وتنظيم بيانات المتجر.",
  },
  {
    icon: ShoppingCart,
    title: "المبيعات والطلبات",
    description:
      "فهم دورة البيع الإلكتروني من المنتج والطلب إلى الدفع وخدمة العميل.",
  },
  {
    icon: Truck,
    title: "الدفع والشحن",
    description:
      "التعامل عمليًا مع خيارات الدفع والتقسيط والشحن والاستلام وتأثيرها على تجربة العميل.",
  },
  {
    icon: Megaphone,
    title: "التسويق والأداء",
    description:
      "خبرة عملية في Google وMeta وTikTok وSEO وGoogle Search Console وقياس أداء الحملات.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-brand-900 sm:text-4xl">
            نفهم نشاطك قبل أن نراجع أرقامه
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            لدينا تجربة عملية في إدارة وتشغيل المتاجر الإلكترونية، والتعامل مع
            المنتجات والمبيعات والطلبات والدفع والشحن والعروض والتسويق. لذلك
            نفهم أن الأرقام المالية مرتبطة بطريقة عمل النشاط وليست مجرد أرقام
            منفصلة.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => (
            <div
              key={point.title}
              className="group flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-right transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700 transition-colors duration-300 group-hover:bg-brand-800 group-hover:text-white">
                <point.icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <h3 className="text-base font-bold text-brand-900">
                {point.title}
              </h3>
              <p className="text-sm leading-7 text-neutral-600">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base font-bold text-brand-900">
          لهذا السبب نتعامل مع حسابات النشاط من واقع طريقة عمله، وليس من
          الأرقام وحدها.
        </p>
      </div>
    </section>
  );
}

