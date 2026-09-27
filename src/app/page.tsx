import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import Services from "@/components/Services";
import FinancialSnapshot from "@/components/FinancialSnapshot";
import ExternalDept from "@/components/ExternalDept";
import WhyUs from "@/components/WhyUs";
import DataProtection from "@/components/DataProtection";
import BeforeAfter from "@/components/BeforeAfter";
import HowWeWork from "@/components/HowWeWork";
import PricingTeaser from "@/components/PricingTeaser";
import PlanQuiz from "@/components/PlanQuiz";
import FAQ from "@/components/FAQ";
import TrustAreas from "@/components/TrustAreas";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

// الصفحة الرئيسية أصبحت نظرة عامة مختصرة تحوّل الزائر إلى عميل محتمل،
// بينما التفاصيل الكاملة (الخدمات، الباقات، الأسئلة الشائعة) لها صفحاتها
// المستقلة: /services، /pricing، /faq.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustAreas />
        <ProblemsSolutions />
        <Services />
        <HowWeWork />
        <FinancialSnapshot />
        <PricingTeaser />
        <PlanQuiz />
        <ExternalDept />
        <WhyUs />
        <DataProtection />
        <BeforeAfter />
        <FAQ limit={4} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
