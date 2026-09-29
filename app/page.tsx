import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import ComparisonSection from "./components/ComparisonSection";
import ServicesSection from "./components/ServicesSection";
import PartnerPlanSection from "./components/PartnerPlanSection";
import BusinessPrintingSection from "./components/BusinessPrintingSection";
import TShirtSection from "./components/TShirtSection";
import WebDesignSection from "./components/WebDesignSection";
import SearchAiSection from "./components/SearchAiSection";
import ProcessSection from "./components/ProcessSection";
import PortfolioSection from "./components/PortfolioSection";
import ServiceAreaSection from "./components/ServiceAreaSection";
import TrustedBySection from "./components/TrustedBySection";
import CtaSection from "./components/CtaSection";

// Rebuild the page hourly so the seasonal hero badge (app/lib/season.ts) stays current.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ComparisonSection />
      <ServicesSection />
      <PartnerPlanSection />
      <BusinessPrintingSection />
      <WebDesignSection />
      <SearchAiSection />
      <TShirtSection />
      <ProcessSection />
      <PortfolioSection />
      <ServiceAreaSection />
      <TrustedBySection />
      <CtaSection />
    </>
  );
}
