"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

/** رابط Google Apps Script Web App لتسجيل كل طلب كصف جديد في جدول بيانات Google Sheets */
const GOOGLE_SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbw-ihXMVfE4_VFkLQUidaSFeWUr8auDHn-f60SDPZko2IKCo45ltr1dUPc3yXiqLaTx1g/exec";

type FormState = {
  name: string;
  phone: string;
  email: string;
  activityType: string;
  activitySize: string;
  branchesCount: string;
  requestedService: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  activityType: "",
  activitySize: "",
  branchesCount: "",
  requestedService: "",
  notes: "",
};

function buildSummaryMessage(form: FormState) {
  const lines = [
    "طلب تواصل جديد — مِزارو:",
    `الاسم: ${form.name}`,
    `الجوال: ${form.phone}`,
    form.email ? `البريد الإلكتروني: ${form.email}` : null,
    "— تفاصيل المحاسبة والضريبة —",
    `نوع النشاط: ${form.activityType || "غير محدد"}`,
    `حجم النشاط: ${form.activitySize || "غير محدد"}`,
    `عدد الفروع: ${form.branchesCount || "غير محدد"}`,
    `الخدمة المطلوبة: ${form.requestedService || "غير محدد"}`,
  ];

  if (form.notes) lines.push(`ملاحظات: ${form.notes}`);

  return lines.filter(Boolean).join("\n");
}

export default function UnifiedContactForm({
  whatsappNumber,
}: {
  whatsappNumber?: string;
}) {
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // نسجّل كل طلب كصف جديد في جدول بيانات Google Sheets (fire-and-forget،
    // ما نوقف فتح واتساب لو تأخر أو فشل الاتصال بأي سبب).
    try {
      fetch(GOOGLE_SHEET_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(form),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // تجاهل أي خطأ شبكة هنا — لا يمنع إتمام الطلب عبر واتساب
    }

    const message = buildSummaryMessage(form);
    const whatsappUrl = `https://wa.me/${
      whatsappNumber || siteConfig.whatsappNumber
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setForm(initialState);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-700" />
        <h3 className="text-xl font-extrabold text-ink-950">
          تم استلام طلبك، وبتواصل معك قريبًا.
        </h3>
        <p className="max-w-md text-sm leading-7 text-ink-500">
          فتحت لك محادثة واتساب بملخص طلبك لتسريع التواصل. إذا ما فتحت
          تلقائيًا، تقدر تراسلني مباشرة عبر زر واتساب في أسفل الشاشة.
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
      className="grid grid-cols-1 gap-5 rounded-[1.75rem] border border-ink-100 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-9"
    >
      <Field label="الاسم" htmlFor="name">
        <input
          id="name"
          required
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          placeholder="مثال: محمد العتيبي"
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

      <Field label="البريد الإلكتروني" htmlFor="email" full>
        <input
          id="email"
          type="email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
          placeholder="example@email.com"
        />
      </Field>

      <Field label="نوع النشاط" htmlFor="activityType">
        <input
          id="activityType"
          value={form.activityType}
          onChange={(e) => update("activityType", e.target.value)}
          className={inputClass}
          placeholder="مثال: متجر، نشاط خدمي، مشروع صغير..."
        />
      </Field>

      <Field label="حجم النشاط" htmlFor="activitySize">
        <input
          id="activitySize"
          value={form.activitySize}
          onChange={(e) => update("activitySize", e.target.value)}
          className={inputClass}
          placeholder="مثال: مبيعات شهرية تقريبية"
        />
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

      <Field label="الخدمة المطلوبة" htmlFor="requestedService">
        <input
          id="requestedService"
          value={form.requestedService}
          onChange={(e) => update("requestedService", e.target.value)}
          className={inputClass}
          placeholder="مثال: باقة متقدم، إقرار ضريبي..."
        />
      </Field>

      <Field label="ملاحظات" htmlFor="notes" full>
        <textarea
          id="notes"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          className={inputClass}
          placeholder="أي تفاصيل إضافية تحب تخبرني فيها"
        />
      </Field>

      <div className="sm:col-span-2">
        <button
          type="submit"
          className="w-full rounded-full bg-ink-950 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-800 sm:w-auto"
        >
          أرسل الطلب
        </button>
      </div>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

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
      <label htmlFor={htmlFor} className="mb-2 block text-sm font-bold text-ink-700">
        {label}
      </label>
      {children}
    </div>
  );
}
