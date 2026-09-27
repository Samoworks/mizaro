import type { Metadata } from "next";
import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DomainIntro from "@/components/DomainIntro";
import Services from "@/components/Services";
import HowWeWork from "@/components/HowWeWork";
import DomainCtaBanner from "@/components/DomainCtaBanner";

export const metadata: Metadata = {
  title: "الخدمات",
  description:
    "خدمات محاسبية مرنة للمنشآت الصغيرة والمتوسطة، يقدمها محاسب مستقل بشكل مباشر وعن بُعد: مسك الحسابات، التقارير المالية، الفواتير والمصروفات، والخدمات الضريبية.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <DomainIntro
          icon={Calculator}
          eyebrow="الخدمات المحاسبية"
          title="خدمات محاسبية مرنة للمنشآت الصغيرة والمتوسطة"
          description="أتعامل معك مباشرة كمحاسب مستقل، وأقدّم لك خدمة محاسبية واضحة النطاق تناسب حجم نشاطك، عن بُعد بالكامل."
        />
        <Services />
        <HowWeWork />
        <DomainCtaBanner
          eyebrow="جاهز نبدأ؟"
          title="جاهز ترتب حسابات نشاطك؟"
          description="عبّي بياناتك في تقييم مجاني، وبتواصل معك بنفسي لاقتراح الخدمة الأنسب."
          href="/assessment"
          ctaLabel="احصل على تقييم مجاني"
        />
      </main>
      <Footer />
    </>
  );
}
