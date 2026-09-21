import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DomainIntro from "@/components/DomainIntro";
import EcommerceServices from "@/components/EcommerceServices";
import EcommerceFlow from "@/components/EcommerceFlow";
import EcommerceProblems from "@/components/EcommerceProblems";
import EcommercePackages from "@/components/EcommercePackages";
import FAQ from "@/components/FAQ";
import DomainCtaBanner from "@/components/DomainCtaBanner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "التجارة الإلكترونية",
  description:
    "خدمات مستقلة لتطوير وتحسين المتاجر الإلكترونية — المنتجات، SEO، الإعلانات، التتبع، وتجربة المستخدم.",
};

export default function EcommercePage() {
  return (
    <>
      <Header />
      <main>
        <DomainIntro
          icon={ShoppingBag}
          eyebrow="التجارة الإلكترونية"
          title="متجرك يحتاج أكثر من مجرد منتجات"
          description="المتجر الناجح ليس تصميمًا فقط. نعمل على المنتجات، تجربة المستخدم، الظهور في البحث، التتبع، الكتالوجات، الإعلانات، والتحسينات التقنية — كخدمة مستقلة بالكامل، وليست محاسبة للمتاجر."
          variant="ecommerce"
        />
        <EcommerceServices />
        <EcommerceFlow />
        <EcommerceProblems />
        <EcommercePackages />
        <DomainCtaBanner
          eyebrow="جاهز نبدأ؟"
          title="جاهز تطوّر متجرك؟"
          description={`عبّي بياناتك وسيراجع فريق ${siteConfig.companyName} متجرك ويتواصل معك بأنسب طريقة للتطوير.`}
          href="/contact?service=ecommerce"
          ctaLabel="اطلب تقييم المتجر"
          variant="ecommerce"
        />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
