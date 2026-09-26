"use client";

import { useState, type FormEvent } from "react";
import { X, CheckCircle2, Sparkles } from "lucide-react";
import { googleSheetEndpoint, planQuiz } from "@/lib/site-config";

type QuizState = {
  activityType: string;
  monthlySales: string;
  invoicesCount: string;
  branchesCount: string;
  vatRegistered: string;
  biggestProblem: string;
  whatsapp: string;
};

const initialState: QuizState = {
  activityType: "",
  monthlySales: "",
  invoicesCount: "",
  branchesCount: "",
  vatRegistered: "",
  biggestProblem: "",
  whatsapp: "",
};

const inputClass =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function PlanQuiz() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<QuizState>(initialState);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  function update<K extends keyof QuizState>(key: K, value: QuizState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function closeAndReset() {
    setOpen(false);
    setStatus("idle");
    setForm(initialState);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    try {
      await fetch(googleSheetEndpoint, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          name: form.whatsapp,
          phone: form.whatsapp,
          activityType: form.activityType,
          activitySize: form.monthlySales,
          branchesCount: form.branchesCount,
          notes: `عدد الفواتير: ${form.invoicesCount} | مسجّل بالضريبة: ${form.vatRegistered} | أكبر مشكلة: ${form.biggestProblem}`,
          requestType: "اختبار الباقة المناسبة",
        }),
        keepalive: true,
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="quiz" className="bg-ink-950 py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-brand-300">
          <Sparkles className="h-6 w-6" strokeWidth={1.7} />
        </span>
        <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
          {planQuiz.ctaTitle}
        </h2>
        <p className="mt-4 text-base leading-8 text-ink-300">
          {planQuiz.ctaDescription}
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-bold text-ink-950 transition-colors hover:bg-brand-50"
        >
          {planQuiz.ctaLabel}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 p-4"
          onClick={closeAndReset}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.75rem] bg-white p-6 text-right shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg font-extrabold text-ink-950">
                {planQuiz.ctaLabel}
              </h3>
              <button
                type="button"
                onClick={closeAndReset}
                aria-label="إغلاق"
                className="shrink-0 rounded-full p-1.5 text-ink-400 hover:bg-ink-50 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {status === "sent" ? (
              <div className="mt-8 flex flex-col items-center gap-3 py-4 text-center">
                <CheckCircle2 className="h-12 w-12 text-brand-700" />
                <p className="text-base font-bold leading-7 text-ink-950">
                  {planQuiz.successMessage}
                </p>
                <button
                  type="button"
                  onClick={closeAndReset}
                  className="mt-2 text-sm font-bold text-brand-700 underline underline-offset-4"
                >
                  إغلاق
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink-700">
                    نوع النشاط؟
                  </label>
                  <input
                    required
                    value={form.activityType}
                    onChange={(e) => update("activityType", e.target.value)}
                    className={inputClass}
                    placeholder="مثال: متجر إلكتروني، مشروع خدمي..."
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink-700">
                    متوسط المبيعات الشهرية؟
                  </label>
                  <input
                    value={form.monthlySales}
                    onChange={(e) => update("monthlySales", e.target.value)}
                    className={inputClass}
                    placeholder="مثال: 30,000 ريال تقريبًا"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-ink-700">
                      عدد الفواتير تقريبًا؟
                    </label>
                    <input
                      value={form.invoicesCount}
                      onChange={(e) => update("invoicesCount", e.target.value)}
                      className={inputClass}
                      placeholder="شهريًا"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-bold text-ink-700">
                      عدد الفروع؟
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={form.branchesCount}
                      onChange={(e) => update("branchesCount", e.target.value)}
                      className={inputClass}
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink-700">
                    هل أنت مسجّل في ضريبة القيمة المضافة؟
                  </label>
                  <select
                    required
                    value={form.vatRegistered}
                    onChange={(e) => update("vatRegistered", e.target.value)}
                    className={inputClass}
                  >
                    <option value="" disabled>
                      اختر إجابة
                    </option>
                    <option value="نعم">نعم</option>
                    <option value="لا">لا</option>
                    <option value="مو متأكد">مو متأكد</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink-700">
                    ما أكبر مشكلة محاسبية تواجهك؟
                  </label>
                  <textarea
                    rows={3}
                    value={form.biggestProblem}
                    onChange={(e) => update("biggestProblem", e.target.value)}
                    className={inputClass}
                    placeholder="اكتب باختصار"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-bold text-ink-700">
                    رقم واتساب
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.whatsapp}
                    onChange={(e) => update("whatsapp", e.target.value)}
                    className={inputClass}
                    placeholder="05xxxxxxxx"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm font-bold text-amber-700">
                    ما قدرنا نرسل بياناتك، جرّب مرة ثانية.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="mt-2 w-full rounded-full bg-ink-950 px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-800 disabled:opacity-60"
                >
                  {status === "sending" ? "جارٍ الإرسال..." : "أرسل واعرف الباقة المناسبة"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
