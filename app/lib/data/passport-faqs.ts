// The common passport photo questions, answered on every passport page: the main
// Passport Photos service page and each local /passport-photos/[town] page.
// Prices come from ./pricing and the phone number from ../business, so they
// stay in sync.

import type { ServiceFaq } from "../services-data";
import { BUSINESS_PHONE_DISPLAY } from "../business";
import { PASSPORT_INFANT_EXTRA, PASSPORT_VISIT, priceAnswer, usd } from "./pricing";

export function passportCommonFaqs(): ServiceFaq[] {
  return [
    {
      question: "Do I need an appointment, or do you take walk-ins?",
      answer: `Passport photos are by appointment only — I come to your home or business, so there's no counter to walk up to. Book through the quote form or call ${BUSINESS_PHONE_DISPLAY}. Weekend and evening appointments are available.`,
    },
    {
      question: "Are you open on weekends or late evenings?",
      answer:
        "Yes. Weekend and evening appointments are available, so you don't have to take time off work or pull the kids out of school.",
    },
    {
      question: "How long will it take to get my physical photos printed?",
      answer:
        "Your photos are printed and cut the same day they're taken, then mailed right away — free USPS delivery usually takes 3–4 business days. Same-day hand delivery can be arranged for a quoted fee. Your digital file is sent the same day by email or text.",
    },
    {
      question: "How much do you charge for a set of passport photos?",
      answer: `A visit is ${usd(PASSPORT_VISIT)} and includes one person's compliant photo, a printed and cut pair, and the digital file. ${priceAnswer("passport-photos")}`,
    },
    {
      question: "How many printed photos are included in the price?",
      answer:
        "Each person's photo comes with one printed and cut pair — two official 2×2 photos — plus the digital file. Each additional pair is just $1.",
    },
    {
      question: "Do you guarantee that the photo will meet U.S. State Department requirements?",
      answer:
        "Yes. Every photo is checked with compliance software and reviewed by me against the State Department's photo requirements before it's printed, and it's guaranteed to meet them.",
    },
    {
      question: "What happens if my passport photo gets rejected at the post office or agency?",
      answer:
        "I'll retake and reprint it for free. Just let me know and send along the rejection notice or the reason they gave, and we'll set up a new photo.",
    },
    {
      question:
        "Do you use compliance software or automatic biometrics to check shadows, eye level, and head size before printing?",
      answer:
        "Yes. Compliance software measures head size, eye position, and the background and checks for shadows against the official specifications, and then I review every photo myself before anything is printed.",
    },
    {
      question: "Can we review or retake the photo on screen before you print it?",
      answer:
        "Absolutely. You'll see each shot on screen, and I'll retake it as many times as it takes — until it meets the requirements and you're happy with it.",
    },
    {
      question: "Do you take passport photos for babies, infants, or toddlers?",
      answer: `Yes — and at home, where little ones are comfortable, it's much easier. Babies need their eyes open, facing the camera, with no hands or toys in the frame. Infant photos are an extra ${usd(PASSPORT_INFANT_EXTRA)} each, so a home visit just for a baby's photo is ${usd(PASSPORT_VISIT + PASSPORT_INFANT_EXTRA)}.`,
    },
    {
      question: "Can you accommodate individuals in wheelchairs or with mobility assistance devices?",
      answer:
        "Yes. Photos can be taken seated, right in your wheelchair, wherever you're most comfortable — and since I come to you, there's no trip or waiting room to deal with.",
    },
  ];
}
