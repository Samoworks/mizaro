"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const serviceTypes = [
  { id: "accounting", label: "المحاسبة والضريبة" },
  { id: "ecommerce", label: "التجارة الإلكترونية" },
  { id: "both", label: "كلاهما" },
] as const;

type ServiceType = (typeof serviceTypes)[number]["id"];

const platforms = ["سلة", "زد", "شوبيفاي", "ووكومرس", "منصة أخرى"];
const yesNo = ["نعم", "لا"];

type FormState = {
  name: string;
  phone: string;
  email: string;
  serviceType: ServiceType;
  // التجارة الإلكترونية
  storeUrl: string;
  platform: string;
  isLive: string;
  hasAds: string;
  mainProblem: string;
  // المحاسبة والضريبة
  activityType: string;
  activitySize: string;
  branchesCount: string;
  requestedService: string;
  // مشترك
  notes: string;
};

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  serviceType: "accounting",
  storeUrl: "",
  platform: platforms[0],
  isLive: "نعم",
  hasAds: "لا",
  mainProblem: "",
  activityType: "",
  activitySize: "",
  branchesCount: "",
  requestedService: "",
  notes: "",
};

function buildSummaryMessage(form: FormState) {
  const serviceLabel =
    serviceTypes.find((s) => s.id === form.serviceType)?.label ?? form.serviceType;

  const lines = [
    "طلب تواصل جديد — مِزارو:",
    `الاسم: ${form.name}`,
    `الجوال: ${form.phone}`,
    form.email ? `البريد الإلكتروني: ${form.email}` : null,
    `نوع الخدمة: ${serviceLabel}`,
  ];

  if (form.serviceType === "ecommerce" || form.serviceType === "both") {
    lines.push(
      "— تفاصيل التجارة الإلكترونية —",
      `رابط المتجر: ${form.storeUrl || "غير محدد"}`,
      `منصة المتجر: ${form.platform}`,
      `هل المتجر يعمل حاليًا: ${form.isLive}`,
      `هل لديه إعلانات: ${form.hasAds}`,
      `المشكلة الرئيسية: ${form.mainProblem || "غير محدد"}`
    );
  }

  if (form.serviceType === "accounting" || form.serviceType === "both") {
    lines.push(
      "— تفاصيل المحاسبة والضريبة —",
      `نوع النشاط: ${form.activityType || "غير محدد"}`,
      `حجم النشاط: ${form.activitySize || "غير محدد"}`,
      `عدد الفروع: ${form.branchesCount || "غير محدد"}`,
      `الخدمة المطلوبة: ${form.requestedService || "غير محدد"}`
    );
  }

  if (form.notes) lines.push(`ملاحظات: ${form.notes}`);

  return lines.filter(Boolean).join("\n");
}

export default function UnifiedContactForm() {
  const searchParams = useSearchParams();
  const [form, setForm] = useState<FormState>(() => {
    const preset = searchParams.get("service");
    if (preset === "accounting" || preset === "ecommerce" || preset === "both") {
      return { ...initialState, serviceType: preset };
    }
    return initialState;
  });
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // ملاحظة: لا يوجد اتصال بخادم حاليًا — النموذج يعرض رسالة تأكيد
    // ويفتح واتساب مع ملخص الطلب. لربطه بخادم فعلي أو بريد إلكتروني
    // أو جدول بيانات، أضف الاستدعاء هنا قبل setSubmitted(true).
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
        <h3 className="text-xl font-extrabold text-ink-950">
          تم استلام طلبك، وسنتواصل معك قريبًا.
        </h3>
        <p className="max-w-md text-sm leading-7 text-ink-500">
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

      <fieldset className="sm:col-span-2">
        <legend className="mb-2.5 block text-sm font-bold text-ink-700">
          نوع الخدمة
        </legend>
        <div className="flex flex-wrap gap-3">
          {serviceTypes.map((type) => (
            <label
              key={type.id}
              className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                form.serviceType === type.id
                  ? "border-brand-700 bg-brand-50 text-brand-800"
                  : "border-ink-200 text-ink-600 hover:border-ink-300"
              }`}
            >
              <input
                type="radio"
                name="serviceType"
                value={type.id}
                checked={form.serviceType === type.id}
                onChange={() => update("serviceType", type.id)}
                className="sr-only"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      {(form.serviceType === "ecommerce" || form.serviceType === "both") && (
        <>
          <Field label="رابط المتجر" htmlFor="storeUrl" full>
            <input
              id="storeUrl"
              type="url"
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

          <Field label="ما المشكلة الرئيسية؟" htmlFor="mainProblem">
            <input
              id="mainProblem"
              value={form.mainProblem}
              onChange={(e) => update("mainProblem", e.target.value)}
              className={inputClass}
              placeholder="مثال: المنتجات لا تظهر في Google"
            />
          </Field>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-ink-700">
              هل المتجر يعمل حاليًا؟
            </legend>
            <div className="flex gap-4">
              {yesNo.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="radio"
                    name="isLive"
                    value={option}
                    checked={form.isLive === option}
                    onChange={(e) => update("isLive", e.target.value)}
                    className="h-4 w-4 accent-brand-700"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-2 block text-sm font-bold text-ink-700">
              هل لديك إعلانات؟
            </legend>
            <div className="flex gap-4">
              {yesNo.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-ink-700">
                  <input
                    type="radio"
                    name="hasAds"
                    value={option}
                    checked={form.hasAds === option}
                    onChange={(e) => update("hasAds", e.target.value)}
                    className="h-4 w-4 accent-brand-700"
                  />
                  {option}
                </label>
              ))}
            </div>
          </fieldset>
        </>
      )}

      {(form.serviceType === "accounting" || form.serviceType === "both") && (
        <>
          <Field label="نوع النشاط" htmlFor="activityType">
            <input
              id="activityType"
              value={form.activityType}
              onChange={(e) => update("activityType", e.target.value)}
              className={inputClass}
              placeholder="مثال: متجر، شركة خدمية، مشروع صغير..."
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
        </>
      )}

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
