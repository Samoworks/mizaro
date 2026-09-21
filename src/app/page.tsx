import Header from "@/components/Header";
import Hero from "@/components/Hero";
import DomainSelector from "@/components/DomainSelector";
import WhyUs from "@/components/WhyUs";
import HowWeWork from "@/components/HowWeWork";
import PackagesPreview from "@/components/PackagesPreview";
import TrustAreas from "@/components/TrustAreas";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <DomainSelector />
        <TrustAreas />
        <WhyUs />
        <HowWeWork />
        <PackagesPreview />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
