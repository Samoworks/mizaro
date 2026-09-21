"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const activityTypes = ["بوفيه", "مطعم", "كافيه", "متجر إلكتروني", "بقالة", "أخرى"];

type FormState = {
  ownerName: string;
  businessName: string;
  phone: string;
  city: string;
  activityType: string;
  branchesCount: string;
  vatRegistered: string;
  monthlySales: string;
  notes: string;
};

const initialState: FormState = {
  ownerName: "",
  businessName: "",
  phone: "",
  city: "",
  activityType: activityTypes[0],
  branchesCount: "",
  vatRegistered: "لا",
  monthlySales: "",
  notes: "",
};

function buildSummaryMessage(form: FormState) {
  return [
    "طلب استشارة محاسبية جديد:",
    `الاسم: ${form.ownerName}`,
    `اسم المنشأة: ${form.businessName}`,
    `الجوال: ${form.phone}`,
    `المدينة: ${form.city}`,
    `نوع النشاط: ${form.activityType}`,
    `عدد الفروع: ${form.branchesCount || "غير محدد"}`,
    `مسجّل في ضريبة القيمة المضافة: ${form.vatRegistered}`,
    `المبيعات الشهرية التقريبية: ${form.monthlySales || "غير محدد"}`,
    form.notes ? `ملاحظات: ${form.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ملاحظة: لا يوجد اتصال بخادم حاليًا — النموذج يعرض رسالة تأكيد
    // ويفتح واتساب مع ملخص الطلب. لربطه بخادم فعلي أو بريد إلكتروني
    // (مثل Resend/EmailJS) أو بجدول بيانات، أضف الاستدعاء هنا قبل
    // setSubmitted(true).
    const message = buildSummaryMessage(form);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setForm(initialState);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-700" />
        <h3 className="text-xl font-extrabold text-brand-900">
          تم استلام طلبك، وسنتواصل معك قريبًا.
        </h3>
        <p className="max-w-md text-sm leading-7 text-neutral-600">
          فتحنا لك محادثة واتساب بملخص طلبك لتسريع التواصل. إذا ما فتحت
          تلقائيًا، تقدر تراسلنا مباشرة عبر زر واتساب في أسفل الشاشة.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-bold text-brand-700 underline underline-offset-4"
        >
          إرسال طلب جديد
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8"
    >
      <Field label="اسم صاحب المنشأة" htmlFor="ownerName">
        <input
          id="ownerName"
          required
          value={form.ownerName}
          onChange={(e) => update("ownerName", e.target.value)}
          className={inputClass}
          placeholder="مثال: محمد العتيبي"
        />
      </Field>

      <Field label="اسم المنشأة" htmlFor="businessName">
        <input
          id="businessName"
          required
          value={form.businessName}
          onChange={(e) => update("businessName", e.target.value)}
          className={inputClass}
          placeholder="مثال: بوفيه الأصايل"
        />
      </Field>

      <Field label="رقم الجوال" htmlFor="phone">
        <input
          id="phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={inputClass}
          placeholder="05xxxxxxxx"
        />
      </Field>

      <Field label="المدينة" htmlFor="city">
        <input
          id="city"
          required
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          className={inputClass}
          placeholder="مثال: الرياض"
        />
      </Field>

      <Field label="نوع النشاط" htmlFor="activityType">
        <select
          id="activityType"
          value={form.activityType}
          onChange={(e) => update("activityType", e.target.value)}
          className={inputClass}
        >
          {activityTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </Field>

      <Field label="عدد الفروع" htmlFor="branchesCount">
        <input
          id="branchesCount"
          type="number"
          min={1}
          value={form.branchesCount}
          onChange={(e) => update("branchesCount", e.target.value)}
          className={inputClass}
          placeholder="1"
        />
      </Field>

      <fieldset className="sm:col-span-2">
        <legend className="mb-2 block text-sm font-bold text-neutral-700">
          هل المنشأة مسجلة في ضريبة القيمة المضافة؟
        </legend>
        <div className="flex gap-4">
          {["نعم", "لا"].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <input
                type="radio"
                name="vatRegistered"
                value={option}
                checked={form.vatRegistered === option}
                onChange={(e) => update("vatRegistered", e.target.value)}
                className="h-4 w-4 accent-brand-700"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field
        label="حجم المبيعات الشهري التقريبي"
        htmlFor="monthlySales"
        full
      >
        <input
          id="monthlySales"
          value={form.monthlySales}
          onChange={(e) => update("monthlySales", e.target.value)}
          className={inputClass}
          placeholder="مثال: 40,000 ريال"
        />
      </Field>

      <Field label="ملاحظات" htmlFor="notes" full>
        <textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={inputClass}
          placeholder="أي تفاصيل إضافية تحب تخبرنا فيها"
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-800 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-700 sm:w-auto"
        >
          أرسل الطلب
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

function Field({
  label,
  htmlFor,
  children,
  full,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={full ? "sm:col-span-2" : undefined}>
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-neutral-700">
        {label}
      </label>
      {children}
    </div>
  );
}
