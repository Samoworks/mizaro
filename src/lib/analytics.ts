/**
 * ============================================================
 *  Analytics events خفيفة لتتبع تقدّم نموذج تأهيل العميل
 * ============================================================
 * إذا كان الموقع مربوطًا لاحقًا بـ Google Tag Manager أو أي أداة
 * تحليلات تقرأ window.dataLayer، هذه الأحداث تنعكس فيها تلقائيًا.
 * إذا ما فيه أي أداة تحليلات مربوطة، الدالة ما تسوي شي (no-op آمن)
 * ولا تكسر الموقع أبدًا.
 */

export type FormAnalyticsEvent =
  | "form_started"
  | "form_step_1_completed"
  | "form_step_2_completed"
  | "form_step_3_completed"
  | "form_step_4_completed"
  | "form_submitted"
  | "form_abandoned"
  | "whatsapp_clicked";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: FormAnalyticsEvent, payload?: Record<string, unknown>) {
  try {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...payload });
  } catch {
    // أي خطأ هنا لا يجب أن يؤثر على تجربة تعبئة النموذج
  }
}
