// "Before your photo" tips for the Passport Photos page, based on U.S. State
// Department photo requirements. Shown as a section on the page and summarized
// in its FAQ (services-data.ts), so edit them here.

export const PASSPORT_PREP: { heading: string; items: string[] }[] = [
  {
    heading: "What to wear",
    items: [
      "Wear an everyday shirt or top in a darker color like blue, black, or gray — white and light colors blend into the white background.",
      "No uniforms or camouflage.",
      "Take off hats and large jewelry. Head coverings worn daily for religious or medical reasons are fine with a signed statement, as long as they don't shadow your face.",
      "No glasses, sunglasses, or tinted lenses, unless you have a signed doctor's note.",
    ],
  },
  {
    heading: "Your hair",
    items: [
      "Up or down, curly or straight — just keep it off your eyes, eyebrows, and the edges of your face.",
      "Bangs are fine if your eyes and eyebrows show. Pin longer bangs back with a small bobby pin.",
      "No big headbands, bows, clips, or scarves. Thin hair ties and plain bobby pins are fine.",
      "A low ponytail, bun, or braid is the easiest way to keep hair out of your face.",
      "Tuck your hair behind your ears. It's the simplest way to keep your face fully visible and one of the best ways to avoid a rejection.",
    ],
  },
];

/** One-paragraph version for the FAQ. */
export const PASSPORT_PREP_SUMMARY =
  "Wear an everyday shirt in a color that isn't white or very light — blue, black, or gray work best — and no uniform or camouflage. Take off hats, large jewelry, and glasses (glasses only with a signed doctor's note; daily religious or medical head coverings need a signed statement). Keep your hair off your eyes, eyebrows, and the edges of your face: a low ponytail, bun, or braid is easiest, small bobby pins are fine, and big headbands or bows aren't.";
