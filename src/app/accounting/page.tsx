import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DomainIntro from "@/components/DomainIntro";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import FAQ from "@/components/FAQ";
import DomainCtaBanner from "@/components/DomainCtaBanner";

export const metadata: Metadata = {
  title: "المحاسبة والضريبة",
  description:
    "متابعة محاسبية وضريبية شهرية عن بُعد للمنشآت الصغيرة والمتوسطة — مسك الدفاتر، الفواتير، ضريبة القيمة المضافة، والإقرارات الضريبية.",
};

export default function AccountingPage() {
  return (
    <>
      <Header />
      <main>
        <DomainIntro
          icon={Calculator}
          eyebrow="المحاسبة والضريبة"
          title="محاسبتك تحت السيطرة"
          description="أرتب أرقام نشاطك وأساعدك على متابعة التزاماتك المالية والضريبية بوضوح، دون الحاجة إلى توظيف محاسب دائم."
        />
        <Services />
        <Packages />
        <DomainCtaBanner
          eyebrow="جاهز نبدأ؟"
          title="جاهز ترتب حسابات نشاطك؟"
          description="عبّي بياناتك، وبتواصل معك بنفسي لاقتراح الباقة الأنسب."
          href="/contact"
          ctaLabel="اطلب الخدمة"
        />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
