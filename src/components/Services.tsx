import {
  BookOpenCheck,
  FileStack,
  ReceiptText,
  FileSpreadsheet,
  ScanLine,
  BarChart3,
  FileBarChart,
  CalendarCheck2,
  type LucideIcon,
} from "lucide-react";

type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const services: Service[] = [
  {
    icon: BookOpenCheck,
    title: "مسك الدفاتر",
    description: "تسجيل وتنظيم كل حركاتك المالية أولًا بأول بدقة واحترافية.",
  },
  {
    icon: FileStack,
    title: "تنظيم الفواتير",
    description: "ترتيب فواتير المبيعات والمشتريات ومراجعتها للتأكد من صحتها.",
  },
  {
    icon: ReceiptText,
    title: "ضريبة القيمة المضافة",
    description: "احتساب ومتابعة ضريبة القيمة المضافة أولًا بأول دون تأخير.",
  },
  {
    icon: FileSpreadsheet,
    title: "الإقرارات الضريبية",
    description: "إعداد إقراراتك الضريبية وتجهيزها للتقديم في مواعيدها.",
  },
  {
    icon: ScanLine,
    title: "الفوترة الإلكترونية",
    description: "التأكد من مطابقة فواتيرك لمتطلبات الفوترة الإلكترونية.",
  },
  {
    icon: BarChart3,
    title: "مراجعة المبيعات والمصروفات",
    description: "مراجعة دورية لحركة المبيعات والمصروفات لضبط أرقام نشاطك.",
  },
  {
    icon: FileBarChart,
    title: "التقارير المالية",
    description: "تقارير مالية واضحة توضح لك أداء منشأتك بشكل دوري.",
  },
  {
    icon: CalendarCheck2,
    title: "المتابعة الشهرية",
    description: "متابعة مستمرة لحساباتك وضرائبك كل شهر دون انقطاع.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            خدماتنا
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            محاسبتك تحت السيطرة
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            نرتب أرقام نشاطك ونساعدك على متابعة التزاماتك المالية والضريبية
            بوضوح، دون الحاجة إلى بناء قسم محاسبي كامل من البداية.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-6 text-right shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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
