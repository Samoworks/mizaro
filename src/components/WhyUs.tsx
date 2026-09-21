import {
  BadgeDollarSign,
  RefreshCw,
  Laptop,
  FileBarChart,
  PiggyBank,
  Store,
  type LucideIcon,
} from "lucide-react";

type Reason = {
  icon: LucideIcon;
  title: string;
};

const reasons: Reason[] = [
  { icon: BadgeDollarSign, title: "سعر شهري واضح بدون مفاجآت" },
  { icon: RefreshCw, title: "متابعة مستمرة لحساباتك" },
  { icon: Laptop, title: "خدمة كاملة عن بُعد" },
  { icon: FileBarChart, title: "تقارير سهلة ومفهومة" },
  { icon: PiggyBank, title: "توفير تكلفة محاسب بدوام كامل" },
  { icon: Store, title: "مصممة خصيصًا للمنشآت الصغيرة" },
];

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-brand-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            ليش تختارني؟
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            شريكك المحاسبي الموثوق
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-5 shadow-sm"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-800 text-white">
                <reason.icon className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <p className="text-base font-bold text-brand-900">
                {reason.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
