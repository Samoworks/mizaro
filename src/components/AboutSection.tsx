import { Laptop, HandCoins, Store } from "lucide-react";

const points = [
  {
    icon: HandCoins,
    text: "أتابع حسابات المنشآت الصغيرة والمتوسطة شهريًا عن بُعد، بشكل واضح ومباشر بدون تعقيد.",
  },
  {
    icon: Store,
    text: "لدي تجربة عملية في تشغيل وتطوير المتاجر الإلكترونية، تساعدني أفهم طبيعة عمل المتجر قبل أي تعديل.",
  },
  {
    icon: Laptop,
    text: "أعمل بشكل مستقل عن بُعد، وكل خدمة أقدمها موضّحة النطاق من البداية بدون وعود غير واقعية.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-brand-50/60 py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <span className="text-sm font-bold tracking-wide text-brand-600">
          من نحن
        </span>
        <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
          مجالان مستقلان، بخبرة عملية في كل واحد
        </h2>
        <p className="mt-4 text-neutral-600 leading-8">
          محاسبك يقدّم خدمتين منفصلتين: متابعة محاسبية وضريبية شهرية، وخدمات
          لتطوير وتحسين المتاجر الإلكترونية. كل خدمة تُقدَّم بوضوح دون خلط
          بينهما، ودون وعود أو ضمانات غير مؤكدة.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {points.map((point) => (
            <div
              key={point.text}
              className="flex flex-col items-center gap-3 rounded-2xl border border-brand-100 bg-white p-6 text-center"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-800 text-white">
                <point.icon className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <p className="text-sm leading-7 text-neutral-600">
                {point.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

