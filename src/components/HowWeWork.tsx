import { PhoneCall, ClipboardList, PackageCheck, CalendarCheck2 } from "lucide-react";

const steps = [
  {
    icon: PhoneCall,
    title: "تواصل معنا",
    description: "راسلنا عبر واتساب أو النموذج، ونرد عليك بسرعة.",
  },
  {
    icon: ClipboardList,
    title: "نراجع نشاطك",
    description: "نفهم طبيعة عملك وحجم عملياتك اليومية.",
  },
  {
    icon: PackageCheck,
    title: "نختار الباقة المناسبة",
    description: "نقترح عليك الباقة اللي تناسب احتياجك الفعلي.",
  },
  {
    icon: CalendarCheck2,
    title: "نبدأ المتابعة الشهرية",
    description: "نتولى حساباتك وضرائبك أولًا بأول كل شهر.",
  },
];

export default function HowWeWork() {
  return (
    <section id="how-we-work" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            كيف نشتغل؟
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            أربع خطوات وتبدأ
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative flex flex-col gap-4 rounded-2xl border border-neutral-200 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-800 text-sm font-extrabold text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <step.icon className="h-6 w-6 text-brand-600" strokeWidth={1.8} />
              </div>
              <h3 className="text-base font-bold text-brand-900">{step.title}</h3>
              <p className="text-sm leading-7 text-neutral-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
