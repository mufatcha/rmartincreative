import SiteHeader from "./components/SiteHeader";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ServicesSection from "./components/ServicesSection";
import HolidaySpotlight from "./components/HolidaySpotlight";
import GreetingCardsSection from "./components/GreetingCardsSection";
import BusinessPrintingSection from "./components/BusinessPrintingSection";
import PhotoToDigitalSection from "./components/PhotoToDigitalSection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import ServiceAreaSection from "./components/ServiceAreaSection";
import CtaSection from "./components/CtaSection";
import SiteFooter from "./components/SiteFooter";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <ServicesSection />
        <HolidaySpotlight />
        <GreetingCardsSection />
        <BusinessPrintingSection />
        <PhotoToDigitalSection />
        <ProcessSection />
        <PortfolioSection />
        <ServiceAreaSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  );
}
