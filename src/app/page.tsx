import { Calculator } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DomainSelector from "@/components/DomainSelector";
import AboutSection from "@/components/AboutSection";
import DomainIntro from "@/components/DomainIntro";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Packages from "@/components/Packages";
import HowWeWork from "@/components/HowWeWork";
import RestaurantFit from "@/components/RestaurantFit";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import EcommerceIntro from "@/components/EcommerceIntro";
import EcommerceServices from "@/components/EcommerceServices";
import EcommerceFlow from "@/components/EcommerceFlow";
import EcommerceProblems from "@/components/EcommerceProblems";
import EcommercePackages from "@/components/EcommercePackages";
import EcommerceContactSection from "@/components/EcommerceContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DomainSelector />
        <AboutSection />

        {/* المحاسبة والضريبة */}
        <div id="accounting">
          <DomainIntro
            icon={Calculator}
            eyebrow="المحاسبة والضريبة"
            title="محاسبة تفهم نشاطك"
            description="متابعة شهرية عن بُعد للبوفيهات والمطاعم والكافيهات والمنشآت الصغيرة والمتوسطة — هذا القسم مستقل تمامًا عن خدمات التجارة الإلكترونية."
            variant="accounting"
          />
          <Services />
          <WhyUs />
          <Packages />
          <HowWeWork />
          <RestaurantFit />
          <ContactSection />
          <FAQ />
        </div>

        {/* التجارة الإلكترونية */}
        <EcommerceIntro />
        <EcommerceServices />
        <EcommerceFlow />
        <EcommerceProblems />
        <EcommercePackages />
        <EcommerceContactSection />
      </main>
      <Footer />
    </>
  );
}
