"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { googleSheetEndpoint } from "@/lib/site-config";
import { trackEvent } from "@/lib/analytics";
import { classifyLead } from "@/lib/lead-scoring";
import {
  saudiCities,
  activityTypes,
  businessAgeOptions,
  monthlySalesOptions,
  invoicesCountOptions,
  employeesCountOptions,
  inventoryManagementOptions,
  bankAccountsCountOptions,
  ecommercePlatformOptions,
  paymentGatewayOptions,
  activeProjectsCountOptions,
  currentAccountingStatusOptions,
  switchReasonOptions,
  currentSoftwareOptions,
  lastClosingOptions,
  requestedServiceOptions,
  servicePreferenceOptions,
  preferredTimeOptions,
  preferredContactMethodOptions,
  FORM_STEP_LABELS,
} from "@/lib/lead-form-options";

/* ============================================================
 *  شكل بيانات النموذج الكامل
 * ============================================================ */
export type LeadFormAnswers = {
  // الخطوة 1 — عن نشاطك
  businessName: string;
  activityType: string;
  activityTypeOther: string;
  city: string;
  businessDescription: string;
  businessAge: string;
  // شرطي — متجر إلكتروني
  ecommercePlatform: string;
  ecommercePlatformOther: string;
  paymentGateways: string[];
  // شرطي — مطعم/كافيه
  hasPOS: string;
  posSystemName: string;
  // شرطي — مقاولات
  hasMultipleProjects: string;
  activeProjectsCount: string;
  // شرطي — عيادة/مركز طبي
  hasClinicSystem: string;
  clinicSystemName: string;

  // الخطوة 2 — حجم نشاطك
  monthlySales: string;
  invoicesCount: string;
  employeesCount: string;
  hasInventory: string;
  inventoryManagement: string;
  inventoryManagementOther: string;
  bankAccountsCount: string;

  // الخطوة 3 — وضعك المحاسبي الحالي
  currentAccountingStatus: string;
  hasCurrentAccountant: string;
  switchReason: string;
  switchReasonOther: string;
  currentSoftware: string;
  currentSoftwareOther: string;
  lastClosingDate: string;

  // الخطوة 4 — احتياجك
  requestedServices: string[];
  biggestProblem: string;
  servicePreference: string;

  // الخطوة 5 — بيانات التواصل
  name: string;
  phone: string;
  email: string;
  preferredTime: string;
  preferredContactMethod: string;
};

const initialAnswers: LeadFormAnswers = {
  businessName: "",
  activityType: "",
  activityTypeOther: "",
  city: "",
  businessDescription: "",
  businessAge: "",
  ecommercePlatform: "",
  ecommercePlatformOther: "",
  paymentGateways: [],
  hasPOS: "",
  posSystemName: "",
  hasMultipleProjects: "",
  activeProjectsCount: "",
  hasClinicSystem: "",
  clinicSystemName: "",
  monthlySales: "",
  invoicesCount: "",
  employeesCount: "",
  hasInventory: "",
  inventoryManagement: "",
  inventoryManagementOther: "",
  bankAccountsCount: "",
  currentAccountingStatus: "",
  hasCurrentAccountant: "",
  switchReason: "",
  switchReasonOther: "",
  currentSoftware: "",
  currentSoftwareOther: "",
  lastClosingDate: "",
  requestedServices: [],
  biggestProblem: "",
  servicePreference: "",
  name: "",
  phone: "",
  email: "",
  preferredTime: "",
  preferredContactMethod: "",
};

const REQUIRED_FIELD_MSG = "هذا الحقل مطلوب";
const SAUDI_PHONE_PATTERN = /^(?:\+?966|0)?5\d{8}$/;

const inputClass =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";
const errorInputClass =
  "w-full rounded-lg border border-red-300 bg-red-50/40 px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-sm font-bold text-ink-700">{children}</label>;
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-red-600">
      <AlertCircle className="h-3.5 w-3.5" />
      {message}
    </p>
  );
}

/** مجموعة اختيار واحد بشكل أزرار كبيرة سهلة الضغط (بدل select تقليدي) */
function ChoiceGroup({
  options,
  value,
  onChange,
  error,
  columns = 2,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  columns?: 2 | 3;
}) {
  return (
    <div>
      <div
        className={`grid gap-2.5 ${columns === 3 ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}
      >
        {options.map((option) => {
          const selected = value === option;
          return (
            <button
              type="button"
              key={option}
              onClick={() => onChange(option)}
              className={`rounded-xl border px-4 py-3 text-sm font-bold transition-colors ${
                selected
                  ? "border-ink-950 bg-ink-950 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

/** مجموعة اختيار متعدد بشكل chips قابلة للتفعيل */
function MultiChoiceGroup({
  options,
  values,
  onToggle,
  error,
}: {
  options: readonly string[];
  values: string[];
  onToggle: (option: string) => void;
  error?: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const selected = values.includes(option);
          return (
            <button
              type="button"
              key={option}
              onClick={() => onToggle(option)}
              className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${
                selected
                  ? "border-brand-700 bg-brand-700 text-white"
                  : "border-ink-200 bg-white text-ink-700 hover:border-brand-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
      <FieldError message={error} />
    </div>
  );
}

function SelectField({
  options,
  value,
  onChange,
  error,
  placeholder,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder: string;
}) {
  return (
    <div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={error ? errorInputClass : inputClass}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError message={error} />
    </div>
  );
}

type Errors = Partial<Record<keyof LeadFormAnswers, string>>;

export default function UnifiedContactForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<LeadFormAnswers>(initialAnswers);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const startedRef = useRef(false);
  const submittedRef = useRef(false);

  useEffect(() => {
    function handleUnload() {
      if (startedRef.current && !submittedRef.current) {
        trackEvent("form_abandoned", { lastStep: step + 1 });
      }
    }
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function update<K extends keyof LeadFormAnswers>(key: K, value: LeadFormAnswers[K]) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_started");
    }
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function toggleMulti(key: "paymentGateways" | "requestedServices", option: string) {
    if (!startedRef.current) {
      startedRef.current = true;
      trackEvent("form_started");
    }
    setAnswers((prev) => {
      const current = prev[key];
      const next = current.includes(option)
        ? current.filter((v) => v !== option)
        : [...current, option];
      return { ...prev, [key]: next };
    });
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validateStep(index: number): Errors {
    const e: Errors = {};
    if (index === 0) {
      if (!answers.businessName.trim()) e.businessName = REQUIRED_FIELD_MSG;
      if (!answers.activityType) e.activityType = "اختر خيارًا واحدًا على الأقل";
      if (answers.activityType === "أخرى" && !answers.activityTypeOther.trim())
        e.activityTypeOther = REQUIRED_FIELD_MSG;
      if (!answers.city) e.city = "اختر خيارًا واحدًا على الأقل";
      if (!answers.businessDescription.trim()) e.businessDescription = REQUIRED_FIELD_MSG;

      if (answers.activityType === "متجر إلكتروني") {
        if (!answers.ecommercePlatform) e.ecommercePlatform = "اختر خيارًا واحدًا على الأقل";
        if (answers.ecommercePlatform === "أخرى" && !answers.ecommercePlatformOther.trim())
          e.ecommercePlatformOther = REQUIRED_FIELD_MSG;
      }
      if (answers.activityType === "مطعم / كافيه" && !answers.hasPOS) {
        e.hasPOS = "اختر خيارًا واحدًا على الأقل";
      }
      if (answers.activityType === "مطعم / كافيه" && answers.hasPOS === "نعم" && !answers.posSystemName.trim()) {
        e.posSystemName = REQUIRED_FIELD_MSG;
      }
      if (answers.activityType === "مقاولات" && !answers.hasMultipleProjects) {
        e.hasMultipleProjects = "اختر خيارًا واحدًا على الأقل";
      }
      if (
        answers.activityType === "مقاولات" &&
        answers.hasMultipleProjects === "نعم" &&
        !answers.activeProjectsCount
      ) {
        e.activeProjectsCount = "اختر خيارًا واحدًا على الأقل";
      }
      if (answers.activityType === "عيادة / مركز طبي" && !answers.hasClinicSystem) {
        e.hasClinicSystem = "اختر خيارًا واحدًا على الأقل";
      }
      if (
        answers.activityType === "عيادة / مركز طبي" &&
        answers.hasClinicSystem === "نعم" &&
        !answers.clinicSystemName.trim()
      ) {
        e.clinicSystemName = REQUIRED_FIELD_MSG;
      }
    }

    if (index === 1) {
      if (!answers.monthlySales) e.monthlySales = "اختر خيارًا واحدًا على الأقل";
      if (!answers.invoicesCount) e.invoicesCount = "اختر خيارًا واحدًا على الأقل";
      if (!answers.employeesCount) e.employeesCount = "اختر خيارًا واحدًا على الأقل";
      if (!answers.hasInventory) e.hasInventory = "اختر خيارًا واحدًا على الأقل";
      if (answers.hasInventory === "نعم" && !answers.inventoryManagement)
        e.inventoryManagement = "اختر خيارًا واحدًا على الأقل";
      if (
        answers.hasInventory === "نعم" &&
        answers.inventoryManagement === "أخرى" &&
        !answers.inventoryManagementOther.trim()
      )
        e.inventoryManagementOther = REQUIRED_FIELD_MSG;
      if (!answers.bankAccountsCount) e.bankAccountsCount = "اختر خيارًا واحدًا على الأقل";
    }

    if (index === 2) {
      if (!answers.currentAccountingStatus)
        e.currentAccountingStatus = "اختر خيارًا واحدًا على الأقل";
      if (!answers.hasCurrentAccountant) e.hasCurrentAccountant = "اختر خيارًا واحدًا على الأقل";
      if (answers.hasCurrentAccountant === "نعم" && !answers.switchReason)
        e.switchReason = "اختر خيارًا واحدًا على الأقل";
      if (answers.switchReason === "أخرى" && !answers.switchReasonOther.trim())
        e.switchReasonOther = REQUIRED_FIELD_MSG;
      if (!answers.currentSoftware) e.currentSoftware = "اختر خيارًا واحدًا على الأقل";
      if (answers.currentSoftware === "برنامج آخر" && !answers.currentSoftwareOther.trim())
        e.currentSoftwareOther = REQUIRED_FIELD_MSG;
      if (!answers.lastClosingDate) e.lastClosingDate = "اختر خيارًا واحدًا على الأقل";
    }

    if (index === 3) {
      if (answers.requestedServices.length === 0)
        e.requestedServices = "اختر خيارًا واحدًا على الأقل";
      if (!answers.biggestProblem.trim()) e.biggestProblem = REQUIRED_FIELD_MSG;
      if (!answers.servicePreference) e.servicePreference = "اختر خيارًا واحدًا على الأقل";
    }

    if (index === 4) {
      if (!answers.name.trim()) e.name = REQUIRED_FIELD_MSG;
      if (!answers.phone.trim()) e.phone = REQUIRED_FIELD_MSG;
      else if (!SAUDI_PHONE_PATTERN.test(answers.phone.replace(/\s/g, "")))
        e.phone = "يرجى إدخال رقم جوال سعودي صحيح";
      if (!answers.preferredTime) e.preferredTime = "اختر خيارًا واحدًا على الأقل";
      if (!answers.preferredContactMethod)
        e.preferredContactMethod = "اختر خيارًا واحدًا على الأقل";
    }

    return e;
  }

  const stepCompletedEvents = [
    "form_step_1_completed",
    "form_step_2_completed",
    "form_step_3_completed",
    "form_step_4_completed",
  ] as const;

  function goNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    trackEvent(stepCompletedEvents[step]);
    setStep((s) => Math.min(s + 1, 4));
    setErrors({});
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
    setErrors({});
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const stepErrors = validateStep(4);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setStatus("sending");
    const leadClassification = classifyLead(answers);

    const payload = {
      requestType: "نموذج تأهيل عميل",
      leadClassification,
      basicInfo: {
        name: answers.name,
        phone: answers.phone,
        email: answers.email,
      },
      businessInfo: {
        businessName: answers.businessName,
        activityType:
          answers.activityType === "أخرى" ? answers.activityTypeOther : answers.activityType,
        city: answers.city,
        businessDescription: answers.businessDescription,
        businessAge: answers.businessAge,
      },
      activitySize: {
        monthlySales: answers.monthlySales,
        invoicesCount: answers.invoicesCount,
        employeesCount: answers.employeesCount,
        hasInventory: answers.hasInventory,
        inventoryManagement:
          answers.inventoryManagement === "أخرى"
            ? answers.inventoryManagementOther
            : answers.inventoryManagement,
        bankAccountsCount: answers.bankAccountsCount,
      },
      accountingStatus: {
        currentAccountingStatus: answers.currentAccountingStatus,
        hasCurrentAccountant: answers.hasCurrentAccountant,
        switchReason:
          answers.switchReason === "أخرى" ? answers.switchReasonOther : answers.switchReason,
        lastClosingDate: answers.lastClosingDate,
      },
      currentSoftware:
        answers.currentSoftware === "برنامج آخر"
          ? answers.currentSoftwareOther
          : answers.currentSoftware,
      requestedServices: answers.requestedServices,
      painPoints: answers.biggestProblem,
      contactPreferences: {
        preferredTime: answers.preferredTime,
        preferredContactMethod: answers.preferredContactMethod,
        servicePreference: answers.servicePreference,
      },
      conditionalAnswers: {
        ecommercePlatform:
          answers.ecommercePlatform === "أخرى"
            ? answers.ecommercePlatformOther
            : answers.ecommercePlatform,
        paymentGateways: answers.paymentGateways,
        hasPOS: answers.hasPOS,
        posSystemName: answers.posSystemName,
        hasMultipleProjects: answers.hasMultipleProjects,
        activeProjectsCount: answers.activeProjectsCount,
        hasClinicSystem: answers.hasClinicSystem,
        clinicSystemName: answers.clinicSystemName,
      },
      createdAt: new Date().toISOString(),
    };

    // نطابق أيضًا مفاتيح مسطّحة يفهمها كود Google Apps Script الحالي
    const flat = {
      name: answers.name,
      phone: answers.phone,
      email: answers.email,
      activityType: payload.businessInfo.activityType,
      activitySize: answers.monthlySales,
      branchesCount: answers.activeProjectsCount || "1",
      requestedService: answers.requestedServices.join("، "),
      notes: answers.biggestProblem,
    };

    try {
      await fetch(googleSheetEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...flat, ...payload }),
        keepalive: true,
      });
      submittedRef.current = true;
      trackEvent("form_submitted", { leadClassification });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  function handleWhatsappClick() {
    trackEvent("whatsapp_clicked");
  }

  if (status === "sent") {
    const whatsappMessage = encodeURIComponent(
      "مرحبًا مِزارو، قمت بتعبئة نموذج احتياج الخدمة وأرغب في معرفة الباقة المناسبة لنشاطي."
    );
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 rounded-[1.75rem] border border-brand-200 bg-brand-50 p-8 text-center sm:p-10">
        <CheckCircle2 className="h-14 w-14 text-brand-700" />
        <h3 className="text-xl font-extrabold text-ink-950">
          تم استلام بيانات نشاطك ✓
        </h3>
        <p className="max-w-md text-sm leading-7 text-ink-600">
          شكرًا لك. راجعنا احتياجك وسنتواصل معك لمناقشة الحل المناسب لنشاطك.
        </p>
        <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href={`https://wa.me/966569200561?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsappClick}
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" />
            تواصل معنا عبر واتساب
          </a>
          <a
            href="/"
            className="text-sm font-bold text-ink-500 underline underline-offset-4 hover:text-ink-800"
          >
            العودة للرئيسية
          </a>
        </div>
      </div>
    );
  }

  const progressPercent = ((step + 1) / 5) * 100;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
      {/* الشريط الجانبي التسويقي — يظهر فقط على الديسكتوب */}
      <div className="hidden rounded-[1.75rem] border border-ink-100 bg-ink-950 p-7 text-white lg:block">
        <span className="text-lg font-extrabold">مِزارو</span>
        <p className="mt-2 text-sm leading-7 text-ink-300">
          قسم المحاسبة لمشروعك، بدون تكلفة محاسب بدوام كامل.
        </p>
        <ul className="mt-6 flex flex-col gap-3 text-sm font-bold text-ink-100">
          <li className="flex items-center gap-2.5">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-brand-300" />
            تنظيم حساباتك
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-brand-300" />
            تقارير مالية واضحة
          </li>
          <li className="flex items-center gap-2.5">
            <ShieldCheck className="h-4.5 w-4.5 shrink-0 text-brand-300" />
            خدمة محاسبية مستمرة
          </li>
        </ul>
      </div>

      <div className="rounded-[1.75rem] border border-ink-100 bg-white p-6 shadow-sm sm:p-8">
        {/* Progress indicator */}
        <div className="mb-7">
          <div className="flex items-center justify-between text-xs font-bold text-ink-400">
            <span>
              الخطوة {step + 1} من 5 — {FORM_STEP_LABELS[step]}
            </span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-ink-100">
            <div
              className="h-full rounded-full bg-brand-700 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="mt-3 hidden items-center gap-1.5 text-[11px] font-bold text-ink-300 sm:flex">
            {FORM_STEP_LABELS.map((label, index) => (
              <span key={label} className="flex items-center gap-1.5">
                <span className={index <= step ? "text-brand-700" : ""}>{label}</span>
                {index < FORM_STEP_LABELS.length - 1 && <span>←</span>}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1 */}
          {step === 0 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-extrabold text-ink-950">خلّنا نتعرف على نشاطك</h2>
                <p className="mt-1.5 text-sm leading-7 text-ink-500">
                  أعطنا معلومات بسيطة عن نشاطك حتى نقدر نفهم احتياجك المحاسبي بشكل أدق.
                </p>
              </div>

              <div>
                <FieldLabel>اسم المنشأة</FieldLabel>
                <input
                  value={answers.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  className={errors.businessName ? errorInputClass : inputClass}
                  placeholder="مثال: مؤسسة النخبة التجارية"
                />
                <FieldError message={errors.businessName} />
              </div>

              <div>
                <FieldLabel>نوع النشاط</FieldLabel>
                <ChoiceGroup
                  options={activityTypes}
                  value={answers.activityType}
                  onChange={(v) => update("activityType", v)}
                  error={errors.activityType}
                  columns={3}
                />
              </div>

              {answers.activityType === "أخرى" && (
                <div>
                  <FieldLabel>اذكر نوع النشاط</FieldLabel>
                  <input
                    value={answers.activityTypeOther}
                    onChange={(e) => update("activityTypeOther", e.target.value)}
                    className={errors.activityTypeOther ? errorInputClass : inputClass}
                  />
                  <FieldError message={errors.activityTypeOther} />
                </div>
              )}

              {/* شرطي: متجر إلكتروني */}
              {answers.activityType === "متجر إلكتروني" && (
                <>
                  <div>
                    <FieldLabel>ما منصة متجرك؟</FieldLabel>
                    <ChoiceGroup
                      options={ecommercePlatformOptions}
                      value={answers.ecommercePlatform}
                      onChange={(v) => update("ecommercePlatform", v)}
                      error={errors.ecommercePlatform}
                      columns={3}
                    />
                  </div>
                  {answers.ecommercePlatform === "أخرى" && (
                    <div>
                      <FieldLabel>اذكر اسم المنصة</FieldLabel>
                      <input
                        value={answers.ecommercePlatformOther}
                        onChange={(e) => update("ecommercePlatformOther", e.target.value)}
                        className={errors.ecommercePlatformOther ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.ecommercePlatformOther} />
                    </div>
                  )}
                  <div>
                    <FieldLabel>ما بوابات الدفع المستخدمة؟</FieldLabel>
                    <MultiChoiceGroup
                      options={paymentGatewayOptions}
                      values={answers.paymentGateways}
                      onToggle={(o) => toggleMulti("paymentGateways", o)}
                    />
                  </div>
                </>
              )}

              {/* شرطي: مطعم / كافيه */}
              {answers.activityType === "مطعم / كافيه" && (
                <>
                  <div>
                    <FieldLabel>هل تستخدم نظام نقاط بيع (POS)؟</FieldLabel>
                    <ChoiceGroup
                      options={["نعم", "لا"]}
                      value={answers.hasPOS}
                      onChange={(v) => update("hasPOS", v)}
                      error={errors.hasPOS}
                    />
                  </div>
                  {answers.hasPOS === "نعم" && (
                    <div>
                      <FieldLabel>ما اسم نظام نقاط البيع؟</FieldLabel>
                      <input
                        value={answers.posSystemName}
                        onChange={(e) => update("posSystemName", e.target.value)}
                        className={errors.posSystemName ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.posSystemName} />
                    </div>
                  )}
                </>
              )}

              {/* شرطي: مقاولات */}
              {answers.activityType === "مقاولات" && (
                <>
                  <div>
                    <FieldLabel>هل لديك مشاريع متعددة حاليًا؟</FieldLabel>
                    <ChoiceGroup
                      options={["نعم", "لا"]}
                      value={answers.hasMultipleProjects}
                      onChange={(v) => update("hasMultipleProjects", v)}
                      error={errors.hasMultipleProjects}
                    />
                  </div>
                  {answers.hasMultipleProjects === "نعم" && (
                    <div>
                      <FieldLabel>كم عدد المشاريع النشطة تقريبًا؟</FieldLabel>
                      <ChoiceGroup
                        options={activeProjectsCountOptions}
                        value={answers.activeProjectsCount}
                        onChange={(v) => update("activeProjectsCount", v)}
                        error={errors.activeProjectsCount}
                      />
                    </div>
                  )}
                </>
              )}

              {/* شرطي: عيادة / مركز طبي */}
              {answers.activityType === "عيادة / مركز طبي" && (
                <>
                  <div>
                    <FieldLabel>هل تستخدم نظامًا لإدارة العيادة؟</FieldLabel>
                    <ChoiceGroup
                      options={["نعم", "لا"]}
                      value={answers.hasClinicSystem}
                      onChange={(v) => update("hasClinicSystem", v)}
                      error={errors.hasClinicSystem}
                    />
                  </div>
                  {answers.hasClinicSystem === "نعم" && (
                    <div>
                      <FieldLabel>اذكر النظام</FieldLabel>
                      <input
                        value={answers.clinicSystemName}
                        onChange={(e) => update("clinicSystemName", e.target.value)}
                        className={errors.clinicSystemName ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.clinicSystemName} />
                    </div>
                  )}
                </>
              )}

              <div>
                <FieldLabel>المدينة</FieldLabel>
                <SelectField
                  options={saudiCities}
                  value={answers.city}
                  onChange={(v) => update("city", v)}
                  error={errors.city}
                  placeholder="اختر مدينتك"
                />
              </div>

              <div>
                <FieldLabel>صف لنا نشاطك باختصار</FieldLabel>
                <textarea
                  rows={3}
                  value={answers.businessDescription}
                  onChange={(e) => update("businessDescription", e.target.value)}
                  className={errors.businessDescription ? errorInputClass : inputClass}
                  placeholder="مثال: متجر إلكتروني لبيع الملابس، لدينا مستودع ونبيع عبر سلة ونستخدم شركات شحن."
                />
                <FieldError message={errors.businessDescription} />
              </div>

              <div>
                <FieldLabel>عمر النشاط</FieldLabel>
                <ChoiceGroup
                  options={businessAgeOptions}
                  value={answers.businessAge}
                  onChange={(v) => update("businessAge", v)}
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 1 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-extrabold text-ink-950">خلّنا نفهم حجم نشاطك</h2>
                <p className="mt-1.5 text-sm leading-7 text-ink-500">
                  هذه المعلومات تساعدنا على فهم حجم العمل المحاسبي المتوقع واقتراح الخدمة
                  المناسبة.
                </p>
              </div>

              <div>
                <FieldLabel>متوسط المبيعات الشهرية</FieldLabel>
                <SelectField
                  options={monthlySalesOptions}
                  value={answers.monthlySales}
                  onChange={(v) => update("monthlySales", v)}
                  error={errors.monthlySales}
                  placeholder="اختر نطاق المبيعات"
                />
              </div>

              <div>
                <FieldLabel>عدد الفواتير / العمليات شهريًا</FieldLabel>
                <ChoiceGroup
                  options={invoicesCountOptions}
                  value={answers.invoicesCount}
                  onChange={(v) => update("invoicesCount", v)}
                  error={errors.invoicesCount}
                />
              </div>

              <div>
                <FieldLabel>عدد الموظفين</FieldLabel>
                <ChoiceGroup
                  options={employeesCountOptions}
                  value={answers.employeesCount}
                  onChange={(v) => update("employeesCount", v)}
                  error={errors.employeesCount}
                />
              </div>

              <div>
                <FieldLabel>هل لديك مخزون؟</FieldLabel>
                <ChoiceGroup
                  options={["نعم", "لا"]}
                  value={answers.hasInventory}
                  onChange={(v) => update("hasInventory", v)}
                  error={errors.hasInventory}
                />
              </div>

              {answers.hasInventory === "نعم" && (
                <>
                  <div>
                    <FieldLabel>كيف تتم إدارة المخزون حاليًا؟</FieldLabel>
                    <ChoiceGroup
                      options={inventoryManagementOptions}
                      value={answers.inventoryManagement}
                      onChange={(v) => update("inventoryManagement", v)}
                      error={errors.inventoryManagement}
                    />
                  </div>
                  {answers.inventoryManagement === "أخرى" && (
                    <div>
                      <FieldLabel>اذكر الطريقة</FieldLabel>
                      <input
                        value={answers.inventoryManagementOther}
                        onChange={(e) => update("inventoryManagementOther", e.target.value)}
                        className={errors.inventoryManagementOther ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.inventoryManagementOther} />
                    </div>
                  )}
                </>
              )}

              <div>
                <FieldLabel>عدد الحسابات البنكية المستخدمة في النشاط</FieldLabel>
                <ChoiceGroup
                  options={bankAccountsCountOptions}
                  value={answers.bankAccountsCount}
                  onChange={(v) => update("bankAccountsCount", v)}
                  error={errors.bankAccountsCount}
                />
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-extrabold text-ink-950">
                  كيف تتم إدارة حساباتك حاليًا؟
                </h2>
              </div>

              <div>
                <FieldLabel>كيف تتم المحاسبة حاليًا؟</FieldLabel>
                <SelectField
                  options={currentAccountingStatusOptions}
                  value={answers.currentAccountingStatus}
                  onChange={(v) => update("currentAccountingStatus", v)}
                  error={errors.currentAccountingStatus}
                  placeholder="اختر الوضع الحالي"
                />
              </div>

              <div>
                <FieldLabel>هل لديك محاسب حاليًا؟</FieldLabel>
                <ChoiceGroup
                  options={["نعم", "لا"]}
                  value={answers.hasCurrentAccountant}
                  onChange={(v) => update("hasCurrentAccountant", v)}
                  error={errors.hasCurrentAccountant}
                />
              </div>

              {answers.hasCurrentAccountant === "نعم" && (
                <>
                  <div>
                    <FieldLabel>ما السبب الذي يجعلك تبحث عن خدمة محاسبية جديدة؟</FieldLabel>
                    <SelectField
                      options={switchReasonOptions}
                      value={answers.switchReason}
                      onChange={(v) => update("switchReason", v)}
                      error={errors.switchReason}
                      placeholder="اختر السبب"
                    />
                  </div>
                  {answers.switchReason === "أخرى" && (
                    <div>
                      <FieldLabel>اذكر السبب</FieldLabel>
                      <input
                        value={answers.switchReasonOther}
                        onChange={(e) => update("switchReasonOther", e.target.value)}
                        className={errors.switchReasonOther ? errorInputClass : inputClass}
                      />
                      <FieldError message={errors.switchReasonOther} />
                    </div>
                  )}
                </>
              )}

              <div>
                <FieldLabel>ما البرنامج المحاسبي المستخدم؟</FieldLabel>
                <SelectField
                  options={currentSoftwareOptions}
                  value={answers.currentSoftware}
                  onChange={(v) => update("currentSoftware", v)}
                  error={errors.currentSoftware}
                  placeholder="اختر البرنامج"
                />
              </div>
              {answers.currentSoftware === "برنامج آخر" && (
                <div>
                  <FieldLabel>اذكر اسم البرنامج</FieldLabel>
                  <input
                    value={answers.currentSoftwareOther}
                    onChange={(e) => update("currentSoftwareOther", e.target.value)}
                    className={errors.currentSoftwareOther ? errorInputClass : inputClass}
                  />
                  <FieldError message={errors.currentSoftwareOther} />
                </div>
              )}

              <div>
                <FieldLabel>متى تم آخر إقفال للحسابات؟</FieldLabel>
                <SelectField
                  options={lastClosingOptions}
                  value={answers.lastClosingDate}
                  onChange={(v) => update("lastClosingDate", v)}
                  error={errors.lastClosingDate}
                  placeholder="اختر"
                />
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 3 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-extrabold text-ink-950">
                  ما الذي تحتاج مِزارو أن يساعدك فيه؟
                </h2>
              </div>

              <MultiChoiceGroup
                options={requestedServiceOptions}
                values={answers.requestedServices}
                onToggle={(o) => toggleMulti("requestedServices", o)}
                error={errors.requestedServices}
              />

              <div>
                <FieldLabel>ما أكبر مشكلة تواجهك في حسابات نشاطك حاليًا؟</FieldLabel>
                <textarea
                  rows={3}
                  value={answers.biggestProblem}
                  onChange={(e) => update("biggestProblem", e.target.value)}
                  className={errors.biggestProblem ? errorInputClass : inputClass}
                  placeholder="اكتب لنا باختصار ما الذي تريد تحسينه أو المشكلة التي تريد حلها."
                />
                <FieldError message={errors.biggestProblem} />
              </div>

              <div>
                <FieldLabel>كيف تفضل الحصول على الخدمة؟</FieldLabel>
                <ChoiceGroup
                  options={servicePreferenceOptions}
                  value={answers.servicePreference}
                  onChange={(v) => update("servicePreference", v)}
                  error={errors.servicePreference}
                />
                {answers.servicePreference === "لا أعرف وأحتاج توصية" && (
                  <p className="mt-3 rounded-lg bg-brand-50 p-3 text-xs font-bold leading-6 text-brand-800">
                    لا مشكلة، سنراجع بيانات نشاطك ونساعدك في تحديد الاحتياج المناسب.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 5 */}
          {step === 4 && (
            <div className="flex flex-col gap-5">
              <div>
                <h2 className="text-lg font-extrabold text-ink-950">كيف نتواصل معك؟</h2>
              </div>

              <div>
                <FieldLabel>الاسم</FieldLabel>
                <input
                  value={answers.name}
                  onChange={(e) => update("name", e.target.value)}
                  className={errors.name ? errorInputClass : inputClass}
                  placeholder="مثال: محمد العتيبي"
                />
                <FieldError message={errors.name} />
              </div>

              <div>
                <FieldLabel>رقم الجوال / واتساب</FieldLabel>
                <input
                  type="tel"
                  value={answers.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={errors.phone ? errorInputClass : inputClass}
                  placeholder="05xxxxxxxx"
                />
                <FieldError message={errors.phone} />
              </div>

              <div>
                <FieldLabel>البريد الإلكتروني (اختياري)</FieldLabel>
                <input
                  type="email"
                  value={answers.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass}
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <FieldLabel>أفضل وقت للتواصل</FieldLabel>
                <ChoiceGroup
                  options={preferredTimeOptions}
                  value={answers.preferredTime}
                  onChange={(v) => update("preferredTime", v)}
                  error={errors.preferredTime}
                  columns={3}
                />
              </div>

              <div>
                <FieldLabel>طريقة التواصل المفضلة</FieldLabel>
                <ChoiceGroup
                  options={preferredContactMethodOptions}
                  value={answers.preferredContactMethod}
                  onChange={(v) => update("preferredContactMethod", v)}
                  error={errors.preferredContactMethod}
                  columns={3}
                />
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-4 text-right">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
              <p className="text-sm leading-7 text-amber-800">
                ما قدرنا نرسل بياناتك بسبب مشكلة اتصال. بياناتك محفوظة، جرّب الإرسال مرة ثانية.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-bold text-ink-700 transition-colors hover:bg-ink-50"
              >
                <ArrowRight className="h-4 w-4" />
                رجوع
              </button>
            ) : (
              <span />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800"
              >
                التالي
                <ArrowLeft className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="inline-flex items-center gap-2 rounded-full bg-ink-950 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
              >
                {status === "sending" ? "جارٍ الإرسال..." : "اعرف الباقة المناسبة لنشاطك"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
