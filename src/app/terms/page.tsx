import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "الشروط والأحكام",
};

export default function TermsPage() {
  return (
    <LegalPage title="الشروط والأحكام" updatedAt="سبتمبر 2026">
      <p>
        هذه صياغة أولية عامة للشروط والأحكام، وننصح بمراجعتها من قِبل مختص
        قانوني قبل نشر الموقع بشكل نهائي، لضمان توافقها مع الأنظمة السارية
        في المملكة العربية السعودية.
      </p>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          طبيعة الخدمة
        </h2>
        <p>
          يقدم {siteConfig.companyName} خدمات محاسبية وضريبية شهرية عن بُعد
          لأصحاب البوفيهات والمطاعم والكافيهات والمتاجر الإلكترونية والمنشآت
          الصغيرة والمتوسطة، وفق الباقة التي يختارها العميل.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          مسؤولية العميل
        </h2>
        <p>
          يلتزم العميل بتزويدنا بالمستندات والبيانات المطلوبة بشكل صحيح
          وفي وقتها، وتقع مسؤولية دقة البيانات المُرسَلة على العميل نفسه.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          إخلاء مسؤولية
        </h2>
        <p>
          الخدمات الضريبية المقدمة تخضع للأنظمة والمتطلبات المعمول بها لدى
          هيئة الزكاة والضريبة والجمارك، ولا نقدّم أي ضمان قانوني بشأن
          الإعفاء من الغرامات أو نتائج القرارات الصادرة من الجهات الرسمية.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">
          الاشتراك والإلغاء
        </h2>
        <p>
          الاشتراك في الباقات شهري، ويمكن للعميل إلغاء الاشتراك بالتواصل
          معنا مسبقًا وفق الآلية المتفق عليها عند بدء التعاقد.
        </p>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold text-brand-900">التواصل</h2>
        <p>
          لأي استفسار متعلق بالشروط والأحكام، راسلنا على{" "}
          <a href={`mailto:${siteConfig.email}`} className="text-brand-700 underline">
            {siteConfig.email}
          </a>
          .
        </p>
      </section>
    </LegalPage>
  );
}
