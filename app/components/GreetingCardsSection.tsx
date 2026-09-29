import Image from "next/image";
import Reveal from "./Reveal";
import { IconArrowRight, IconCard } from "./icons";

const OCCASIONS = [
  "Birthdays",
  "Thank-yous",
  "Invitations",
  "Announcements",
  "Get well & sympathy",
  "Just because",
];

export default function GreetingCardsSection() {
  return (
    <section
      id="greeting-cards"
      className="relative overflow-hidden bg-gradient-to-br from-fuchsia-50 via-white to-amber-50 py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="animate-drift-a pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-fuchsia-200/60 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-drift-b pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-amber-200/60 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-[1fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-fuchsia-600">
              <IconCard className="h-3.5 w-3.5" />
              Greeting Cards
            </span>
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A card for every moment worth marking.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Not every occasion needs a holiday budget. Whether it&rsquo;s a
              single birthday card or a full set for a shop shelf, you get
              the same care with layout, type, and color — sized right for
              print or ready to share digitally.
            </p>
            <ul className="mt-7 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
              {OCCASIONS.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-500" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              className="btn-shine relative mt-9 inline-flex items-center gap-2 overflow-hidden rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Design my card
              <IconArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative mx-auto flex w-full max-w-md items-center justify-center py-6">
            <div className="animate-sparkle absolute h-72 w-72 rounded-full bg-gradient-to-br from-fuchsia-300/50 to-amber-200/50 blur-2xl" />
            <div className="relative w-full rotate-[2deg] rounded-2xl bg-gradient-to-br from-fuchsia-300 via-pink-400 to-amber-300 p-[3px] shadow-[0_30px_60px_-15px_rgba(112,26,117,0.45)] transition-transform duration-500 hover:rotate-0">
              <div className="relative aspect-square overflow-hidden rounded-[13px]">
                <Image
                  src="/jpg-assets/birthday-card.jpg"
                  alt="Custom floral birthday card reading “Happy Birthday, Sweetest Chloe!” held on a fridge by a bird magnet"
                  fill
                  sizes="(max-width: 1024px) 90vw, 448px"
                  className="object-cover object-[85%_50%]"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
