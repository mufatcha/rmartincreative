import type { Metadata } from "next";
import Hero from "./components/Hero";
import MainOffersSection from "./components/MainOffersSection";
import ApproachSection from "./components/ApproachSection";
import PartnerPlanSection from "./components/PartnerPlanSection";
import MoreServicesSection from "./components/MoreServicesSection";
import TrustedBySection from "./components/TrustedBySection";
import CtaSection from "./components/CtaSection";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

// Rebuild the page hourly so the seasonal hero badge (app/lib/season.ts) stays current.
export const revalidate = 3600;

// Leads with three offers (websites, search + AI, the partner plan); everything else
// is linked from MoreServicesSection. Towns and service-area FAQs live on /service-area.
export default function Home() {
  return (
    <>
      <Hero />
      <MainOffersSection />
      <ApproachSection />
      <PartnerPlanSection />
      <MoreServicesSection />
      <TrustedBySection />
      <CtaSection />
    </>
  );
}
