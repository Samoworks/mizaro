"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const platforms = ["سلة", "زد", "شوبيفاي", "ووكومرس", "منصة أخرى"];
const yesNo = ["نعم", "لا"];

type FormState = {
  name: string;
  phone: string;
  storeUrl: string;
  platform: string;
  activityType: string;
  isLive: string;
  hasAds: string;
  mainProblem: string;
  budget: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  storeUrl: "",
  platform: platforms[0],
  activityType: "",
  isLive: "نعم",
  hasAds: "لا",
  mainProblem: "",
  budget: "",
  notes: "",
};

function buildSummaryMessage(form: FormState) {
  return [
    "طلب تقييم متجر إلكتروني:",
    `الاسم: ${form.name}`,
    `الجوال: ${form.phone}`,
    `رابط المتجر: ${form.storeUrl}`,
    `منصة المتجر: ${form.platform}`,
    `نوع النشاط: ${form.activityType || "غير محدد"}`,
    `هل المتجر يعمل حاليًا: ${form.isLive}`,
    `هل لديه حملات إعلانية: ${form.hasAds}`,
    `المشكلة الأساسية: ${form.mainProblem || "غير محدد"}`,
    `الميزانية التقريبية: ${form.budget || "غير محدد"}`,
    form.notes ? `ملاحظات: ${form.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export default function EcommerceContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

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
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-amber-600" />
        <h3 className="text-xl font-extrabold text-brand-900">
          تم استلام طلبك، وسنتواصل معك لمراجعة احتياج متجرك.
        </h3>
        <p className="max-w-md text-sm leading-7 text-neutral-600">
          فتحنا لك محادثة واتساب بملخص طلبك لتسريع التواصل. إذا ما فتحت
          تلقائيًا، تقدر تراسلنا مباشرة عبر زر واتساب في أسفل الشاشة.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm font-bold text-amber-700 underline underline-offset-4"
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
      <Field label="الاسم" htmlFor="name">
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          placeholder="مثال: سارة القحطاني"
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

      <Field label="رابط المتجر" htmlFor="storeUrl" full>
        <input
          id="storeUrl"
          type="url"
          required
          value={form.storeUrl}
          onChange={(e) => update("storeUrl", e.target.value)}
          className={inputClass}
          placeholder="https://mystore.com"
        />
      </Field>

      <Field label="منصة المتجر" htmlFor="platform">
        <select
          id="platform"
          value={form.platform}
          onChange={(e) => update("platform", e.target.value)}
          className={inputClass}
        >
          {platforms.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </Field>

      <Field label="نوع النشاط" htmlFor="activityType">
        <input
          id="activityType"
          value={form.activityType}
          onChange={(e) => update("activityType", e.target.value)}
          className={inputClass}
          placeholder="مثال: أزياء، مستلزمات منزلية..."
        />
      </Field>

      <fieldset>
        <legend className="mb-2 block text-sm font-bold text-neutral-700">
          هل المتجر يعمل حاليًا؟
        </legend>
        <div className="flex gap-4">
          {yesNo.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <input
                type="radio"
                name="isLive"
                value={option}
                checked={form.isLive === option}
                onChange={(e) => update("isLive", e.target.value)}
                className="h-4 w-4 accent-amber-600"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 block text-sm font-bold text-neutral-700">
          هل لديك حملات إعلانية؟
        </legend>
        <div className="flex gap-4">
          {yesNo.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <input
                type="radio"
                name="hasAds"
                value={option}
                checked={form.hasAds === option}
                onChange={(e) => update("hasAds", e.target.value)}
                className="h-4 w-4 accent-amber-600"
              />
              {option}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="ما المشكلة الأساسية؟" htmlFor="mainProblem" full>
        <input
          id="mainProblem"
          value={form.mainProblem}
          onChange={(e) => update("mainProblem", e.target.value)}
          className={inputClass}
          placeholder="مثال: المبيعات ضعيفة، المنتجات لا تظهر في Google..."
        />
      </Field>

      <Field label="الميزانية التقريبية" htmlFor="budget">
        <input
          id="budget"
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className={inputClass}
          placeholder="مثال: 1,000 ريال"
        />
      </Field>

      <Field label="ملاحظات" htmlFor="notes">
        <textarea
          id="notes"
          rows={3}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={inputClass}
          placeholder="أي تفاصيل إضافية تحب تخبرنا فيها"
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-xl bg-brand-900 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-800 sm:w-auto"
        >
          اطلب تقييم المتجر
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-100";

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

