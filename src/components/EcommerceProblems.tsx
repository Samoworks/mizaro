import {
  SearchX,
  ListX,
  TrendingDown,
  RadioTower,
  FileWarning,
  Compass,
  Waypoints,
  Tag,
  Settings2,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

type Problem = {
  icon: LucideIcon;
  label: string;
};

const problems: Problem[] = [
  { icon: SearchX, label: "المنتجات لا تظهر في Google" },
  { icon: ListX, label: "الكتالوج لا يعرض المنتجات" },
  { icon: TrendingDown, label: "الإعلانات لا تحقق النتيجة المطلوبة" },
  { icon: RadioTower, label: "التتبع غير مضبوط" },
  { icon: FileWarning, label: "صفحات المنتجات ضعيفة" },
  { icon: Compass, label: "المتجر غير مهيأ لمحركات البحث" },
  { icon: Waypoints, label: "تجربة العميل معقدة" },
  { icon: Tag, label: "العروض غير واضحة" },
  { icon: Settings2, label: "المتجر يحتاج تحسينًا تقنيًا" },
  { icon: HelpCircle, label: "لا تعرف أين يضيع العميل أثناء رحلة الشراء" },
];

export default function EcommerceProblems() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-amber-600">
            المشاكل التي نحلها
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            متجرك يعمل، لكن هل يعمل بالشكل الصحيح؟
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((problem) => (
            <div
              key={problem.label}
              className="flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-5 text-center shadow-sm"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <problem.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="text-sm font-bold text-brand-900">
                {problem.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

