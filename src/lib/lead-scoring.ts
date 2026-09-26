/**
 * ============================================================
 *  تصنيف داخلي لحجم/تعقيد العميل المحتمل (Lead Scoring)
 * ============================================================
 * تصنيف مساعد لفريق مِزارو فقط — لا يُعرض للعميل أبدًا ولا يُستخدم
 * لإخباره بأنه "مؤهل" أو "غير مؤهل". يعتمد على إجابات النموذج
 * لإعطاء فكرة سريعة عن حجم العمل المحاسبي المتوقع.
 */
import type { LeadFormAnswers } from "@/components/UnifiedContactForm";

export type LeadClassification = "Small" | "Medium" | "Large" | "Complex";

function tierScore(value: string, tiers: readonly string[]): number {
  const index = tiers.indexOf(value);
  return index === -1 ? 0 : index;
}

export function classifyLead(answers: LeadFormAnswers): LeadClassification {
  let points = 0;

  // حجم المبيعات وعدد العمليات هي أهم مؤشر لحجم العمل المحاسبي
  points += tierScore(answers.monthlySales, [
    "أفضل عدم الإجابة",
    "أقل من 50,000 ريال",
    "50,000 – 100,000 ريال",
    "100,000 – 300,000 ريال",
    "300,000 – 500,000 ريال",
    "أكثر من 500,000 ريال",
  ]);
  points += tierScore(answers.invoicesCount, [
    "لا أعرف",
    "أقل من 50",
    "50 – 200",
    "200 – 500",
    "أكثر من 500",
  ]);
  points += tierScore(answers.employeesCount, [
    "لا يوجد",
    "1–5",
    "6–20",
    "21–50",
    "أكثر من 50",
  ]);
  points += tierScore(answers.bankAccountsCount, ["1", "2–3", "أكثر من 3"]);

  if (answers.hasInventory === "نعم") points += 1;
  if (answers.hasMultipleProjects === "نعم") {
    points += tierScore(answers.activeProjectsCount, ["1", "2–5", "6–10", "أكثر من 10"]);
  }
  if (answers.requestedServices.length >= 4) points += 1;
  if (
    answers.currentAccountingStatus === "مكتب محاسبة خارجي" ||
    answers.currentAccountingStatus === "أكثر من شخص / جهة"
  ) {
    points += 1;
  }

  if (points >= 10) return "Complex";
  if (points >= 7) return "Large";
  if (points >= 4) return "Medium";
  return "Small";
}
