import {
  BookOpenCheck,
  FileBarChart,
  FileStack,
  ReceiptText,
  SearchCheck,
  MessageCircle,
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
    description: "تنظيم وتسجيل العمليات المالية لنشاطك بشكل مستمر.",
  },
  {
    icon: FileBarChart,
    title: "التقارير الشهرية",
    description: "تعرف على الإيرادات والمصروفات والربح والتدفق النقدي كل شهر.",
  },
  {
    icon: FileStack,
    title: "الفواتير والمصروفات",
    description: "تنظيم ومراجعة فواتير المبيعات والمشتريات والمصروفات.",
  },
  {
    icon: ReceiptText,
    title: "الضريبة والفوترة الإلكترونية",
    description: "مساعدة في الالتزامات والإجراءات ذات العلاقة وفق نطاق الخدمة.",
  },
  {
    icon: SearchCheck,
    title: "المراجعة المالية",
    description: "أراجع أرقام مشروعك وأوضح لك ما يحدث فعليًا في حساباتك.",
  },
  {
    icon: MessageCircle,
    title: "دعم مباشر",
    description: "تواصل سريع معي مباشرة عند الحاجة، بدون وسطاء.",
  },
];

export default function Services() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            نظام محاسبي متكامل
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-ink-950 sm:text-4xl">
            كل ما يحتاجه مشروعك محاسبيًا في مكان واحد
          </h2>
          <p className="mt-4 text-ink-500 leading-8">
            أرتب أرقام نشاطك وأساعدك على متابعة التزاماتك المالية والضريبية
            بوضوح، دون الحاجة إلى توظيف محاسب دائم بدوام كامل.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
