import {
  Package,
  Store,
  Search,
  Megaphone,
  ClipboardList,
  CreditCard,
  Truck,
  Users,
  BarChart3,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react";

type Stage = {
  icon: LucideIcon;
  label: string;
};

const stages: Stage[] = [
  { icon: Package, label: "المنتج" },
  { icon: Store, label: "المتجر" },
  { icon: Search, label: "SEO" },
  { icon: Megaphone, label: "الإعلان" },
  { icon: ClipboardList, label: "الطلب" },
  { icon: CreditCard, label: "الدفع" },
  { icon: Truck, label: "الشحن" },
  { icon: Users, label: "العميل" },
  { icon: BarChart3, label: "التحليل" },
];

export default function EcommerceFlow() {
  return (
    <section className="bg-brand-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-amber-600">
            نظرتنا للمتجر
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            من المتجر إلى العميل
          </h2>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-2 gap-y-4">
          {stages.map((stage, index) => (
            <div key={stage.label} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-2 rounded-2xl border border-amber-100 bg-white px-4 py-4 text-center shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                  <stage.icon className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span className="text-xs font-bold text-brand-900 sm:text-sm">
                  {stage.label}
                </span>
              </div>
              {index < stages.length - 1 && (
                <ChevronLeft
                  className="h-5 w-5 shrink-0 text-amber-300"
                  strokeWidth={2}
                />
              )}
            </div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-base font-bold text-brand-900">
          لا ننظر إلى المتجر كصفحة إلكترونية فقط، بل كمنظومة متكاملة تبدأ من
          المنتج وتنتهي بالعميل والبيانات.
        </p>
      </div>
    </section>
  );
}

