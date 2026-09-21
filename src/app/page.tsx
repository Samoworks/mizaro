import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Packages from "@/components/Packages";
import HowWeWork from "@/components/HowWeWork";
import RestaurantFit from "@/components/RestaurantFit";
import ContactSection from "@/components/ContactSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Packages />
        <HowWeWork />
        <RestaurantFit />
        <ContactSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
