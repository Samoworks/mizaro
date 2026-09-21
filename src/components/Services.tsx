import {
  BookOpenCheck,
  FileStack,
  ReceiptText,
  FileSpreadsheet,
  ScanLine,
  BarChart3,
  ShoppingCart,
  Headset,
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
    title: "مسك الحسابات",
    description: "تسجيل وتنظيم كل حركاتك المالية أولًا بأول بدقة واحترافية.",
  },
  {
    icon: FileStack,
    title: "تنظيم ومراجعة الفواتير",
    description: "ترتيب فواتير المبيعات والمشتريات ومراجعتها للتأكد من صحتها.",
  },
  {
    icon: ReceiptText,
    title: "متابعة ضريبة القيمة المضافة",
    description: "احتساب ومتابعة ضريبة القيمة المضافة أولًا بأول دون تأخير.",
  },
  {
    icon: FileSpreadsheet,
    title: "تجهيز الإقرارات الضريبية",
    description: "إعداد إقراراتك الضريبية وتجهيزها للتقديم في مواعيدها.",
  },
  {
    icon: ScanLine,
    title: "متابعة الفوترة الإلكترونية",
    description: "التأكد من مطابقة فواتيرك لمتطلبات الفوترة الإلكترونية.",
  },
  {
    icon: BarChart3,
    title: "تقارير شهرية للمبيعات والمصروفات",
    description: "تقرير شهري واضح يوضح لك أداء منشأتك ماليًا.",
  },
  {
    icon: ShoppingCart,
    title: "محاسبة المتاجر الإلكترونية",
    description: "متابعة الطلبات والمبيعات والعمولات الخاصة بمتجرك الإلكتروني.",
  },
  {
    icon: Headset,
    title: "دعم ومتابعة شهرية",
    description: "أنا معك بشكل مستمر للإجابة عن استفساراتك المحاسبية والضريبية.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            خدماتي
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            كل ما تحتاجه بقالتك أو مطعمك محاسبيًا
          </h2>
          <p className="mt-4 text-neutral-600 leading-8">
            خدمات محاسبية وضريبية شاملة مصممة خصيصًا لطبيعة عمل البوفيهات
            والمطاعم والمتاجر الإلكترونية.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <div
              key={service.title}
              className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 text-right shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
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
