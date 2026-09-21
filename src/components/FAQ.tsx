"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "هل الخدمة عن بُعد بالكامل؟",
    answer:
      "نعم، كل خدماتنا تُقدَّم عن بُعد عبر الواتساب والبريد الإلكتروني وأدوات التواصل الرقمية، بدون الحاجة لزيارة مكتب.",
  },
  {
    question: "هل تخدمون البوفيهات الصغيرة؟",
    answer:
      "أكيد، البوفيهات الصغيرة من أهم عملائنا، وباقاتنا مصممة أصلًا لتناسب حجم عملياتها اليومية.",
  },
  {
    question: "هل يمكن الاشتراك شهريًا؟",
    answer:
      "نعم، الاشتراك شهري بدون التزام طويل، وتقدر توقف الخدمة في أي وقت حسب سياسة الإلغاء المتفق عليها.",
  },
  {
    question: "هل تقدمون خدمة الإقرار الضريبي؟",
    answer:
      "نعم، نجهز ونساعدك في تقديم الإقرار الضريبي بما يتوافق مع الأنظمة المعمول بها لدى هيئة الزكاة والضريبة والجمارك.",
  },
  {
    question: "ما المستندات المطلوبة؟",
    answer:
      "غالبًا تحتاج: فواتير المبيعات والمشتريات، كشوف الحساب البنكي، وتقارير نظام نقاط البيع إن وجد. نوضح لك القائمة الدقيقة بعد مراجعة نشاطك.",
  },
  {
    question: "هل يمكن إلغاء الاشتراك؟",
    answer:
      "نعم، يمكنك إلغاء الاشتراك في أي وقت بالتواصل معنا، وسنوضح لك آلية الإلغاء عند بدء الاشتراك.",
  },
  {
    question: "هل تخدمون أكثر من فرع؟",
    answer:
      "نعم، للمنشآت متعددة الفروع لدينا الباقة المخصصة التي تشمل تقارير مجمّعة لكل فرع — تواصل معنا لتفاصيلها.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <span className="text-sm font-bold tracking-wide text-brand-600">
            الأسئلة الشائعة
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-brand-900 sm:text-4xl">
            عندك سؤال؟
          </h2>
        </div>

        <div className="mt-10 divide-y divide-neutral-200 border-t border-b border-neutral-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-right"
                >
                  <span className="text-base font-bold text-brand-900">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm leading-7 text-neutral-600">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
