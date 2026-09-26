import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemsSolutions from "@/components/ProblemsSolutions";
import Services from "@/components/Services";
import FinancialSnapshot from "@/components/FinancialSnapshot";
import ExternalDept from "@/components/ExternalDept";
import SavingsHighlight from "@/components/SavingsHighlight";
import WhyUs from "@/components/WhyUs";
import DataProtection from "@/components/DataProtection";
import BeforeAfter from "@/components/BeforeAfter";
import HowWeWork from "@/components/HowWeWork";
import Packages from "@/components/Packages";
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
        <HowWeWork />
        <FinancialSnapshot />
        <Packages />
        <PlanQuiz />
        <ExternalDept />
        <WhyUs />
        <DataProtection />
        <BeforeAfter />
        <SavingsHighlight />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
