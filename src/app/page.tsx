import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import Services from "@/components/Services";
import FinancialSnapshot from "@/components/FinancialSnapshot";
import ExternalDept from "@/components/ExternalDept";
import SavingsHighlight from "@/components/SavingsHighlight";
import WhyUs from "@/components/WhyUs";
import HowWeWork from "@/components/HowWeWork";
import PackagesPreview from "@/components/PackagesPreview";
import PlanQuiz from "@/components/PlanQuiz";
import FAQ from "@/components/FAQ";
import TrustAreas from "@/components/TrustAreas";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustAreas />
        <ProblemsSolutions />
        <Services />
        <FinancialSnapshot />
        <ExternalDept />
        <SavingsHighlight />
        <WhyUs />
        <HowWeWork />
        <PackagesPreview />
        <PlanQuiz />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
