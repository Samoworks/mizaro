import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="سياسة الخصوصية" updatedAt="سبتمبر 2026">
      <p>
        هذه صياغة أولية عامة لسياسة الخصوصية، وننصح بمراجعتها من قِبل مختص
        قانوني قبل نشر الموقع بشكل نهائي، للتأكد من توافقها مع نظام حماية
        البيانات الشخصية (PDPL) في المملكة العربية السعودية.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          البيانات التي نجمعها
        </h2>
        <p>
          عند تعبئتك لنموذج طلب الخدمة على موقع {siteConfig.companyName}، نجمع
          بيانات مثل: اسمك، اسم منشأتك، رقم جوالك، مدينتك، ونوع نشاطك التجاري،
          وذلك بهدف التواصل معك وتقديم الاستشارة أو الخدمة المطلوبة.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          استخدام البيانات
        </h2>
        <p>
          تُستخدم البيانات المُرسَلة فقط لغرض التواصل معك وتقديم خدماتنا
          المحاسبية والضريبية، ولا تتم مشاركتها مع أي طرف ثالث دون إذن صريح
          منك، إلا إذا اقتضى ذلك نظام أو أمر من جهة رسمية مختصة.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          حقوقك في بياناتك
        </h2>
        <p>
          يحق لك في أي وقت طلب الاطلاع على بياناتك، تعديلها، أو حذفها من
          سجلاتنا، وذلك بالتواصل معنا عبر البريد الإلكتروني أو واتساب
          الموضّحين في أسفل الموقع.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">التواصل</h2>
        <p>
          لأي استفسار متعلق بالخصوصية، راسلنا على{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-700 underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
