import type { Metadata } from "next";
import CtaSection from "../components/CtaSection";
import GreetingCardsSection from "../components/GreetingCardsSection";
import HolidaySpotlight from "../components/HolidaySpotlight";
import PersonalHero from "../components/PersonalHero";
import PhotoServicesSection from "../components/PhotoServicesSection";

export const metadata: Metadata = {
  title: "Custom Cards, Invitations & Photo Restoration",
  description:
    "Custom family Christmas cards, birthday and greeting cards, wedding invitations, and photo restoration — designed for you, proofed, and printed. Serving families in Northern Illinois.",
  alternates: { canonical: "/cards-and-photos" },
};

export default function PersonalPage() {
  return (
    <>
      <PersonalHero />
      <HolidaySpotlight />
      <GreetingCardsSection />
      <PhotoServicesSection />
      <CtaSection
        heading="Let’s make something worth keeping."
        body="Whether it’s this year’s family Christmas card, a wedding invitation, or a box of old photos — tell me what you have in mind and I’ll reply with a quote and timeline."
      />
    </>
  );
}
