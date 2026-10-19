import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FreebieDownloadButton from "../../components/FreebieDownloadButton";
import QuoteModal from "../../components/QuoteModal";
import Reveal from "../../components/Reveal";
import ServiceFaqs from "../../components/ServiceFaqs";
import { IconArrowRight } from "../../components/icons";
import { SITE_URL } from "../../lib/business";
import { EXTRAS_HUB, extraShareMetadata, getExtra, getExtraCategory } from "../../lib/data/extras";
import { pageTitle } from "../../lib/seo";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "free-santa-gift-tags";
const IMG = "/webp-assets/personalized-santa-tags";
const CHRISTMAS_CARDS = "/services/greeting-cards/christmas-cards";

function extra() {
  const e = getExtra(SLUG);
  if (!e?.download || !e.image) notFound();
  return { ...e, download: e.download, image: e.image };
}

export function generateMetadata(): Metadata {
  const e = extra();
  return {
    title: pageTitle(e.title),
    description: e.description,
    alternates: { canonical: `/extras/${SLUG}` },
    ...extraShareMetadata(e),
  };
}

const DESIGNS = [
  "Nice List Delivery",
  "Made in My Workshop",
  "Delivered by Sleigh",
  "Checked by My Elves",
  "Special Delivery",
  "Ho Ho Ho!",
];

const FEATURES = [
  {
    title: "Six festive designs",
    body: `Every sheet has six different tags in a vintage North Pole style: ${DESIGNS.join(", ")} — each with its own little note from Santa.`,
    image: {
      src: `${IMG}/6-different-images.webp`,
      alt: "Six vintage-style gift tag designs: Made in My Workshop, Special Delivery, Checked by My Elves, Nice List Delivery, Ho Ho Ho!, and Delivered by Sleigh",
    },
  },
  {
    title: "Personalize every detail",
    body: "Type your child's name on the “For:” line, then check how Santa got in — Chimney, Window, or Door. “Nice” is already checked on every tag, and it stays that way: these are for the nice list only.",
    image: {
      src: `${IMG}/customizable.webp`,
      alt: "Close-up of a tag with a name typed on the “For:” line, Nice checked under “My list says,” and Door checked under “I came in through the…”",
    },
  },
  {
    title: "Type the name once",
    body: "The name fills in on all six tags at the same time, so a whole sheet is ready in seconds. Print it, change the name, and print again for the next child.",
    image: {
      src: `${IMG}/one-edit.webp`,
      alt: "Six filled-in tags showing the same sample name on every “For:” line, with Nice and Door checked, each signed “Love, Santa”",
    },
  },
];

const STEPS = [
  "Download the free PDF — no email or sign-up needed.",
  "Open it in a PDF reader. The free Adobe Acrobat Reader works best; most web browsers can fill it in too.",
  "Type the name once, then check Chimney, Window, or Door on each tag. (Nice is already checked for you.)",
  "Print on white cardstock — or cream cardstock for an authentic antiqued look — at 100% (“Actual size”), not “Fit to page.”",
  "Cut out the tags, punch the hole, and tie them on with ribbon or twine.",
];

const FAQS: ServiceFaq[] = [
  {
    question: "Are the “From Santa” gift tags really free?",
    answer:
      "Yes. Download and print as many as you like for your own family's presents — there's no email, sign-up, or payment.",
  },
  {
    question: "How do I type my child's name on the tags?",
    answer:
      "Open the PDF in a PDF reader such as the free Adobe Acrobat Reader, or in your web browser, and click the “For:” line. Type the name once and it appears on all six tags. Then click Chimney, Window, or Door on each tag to show how Santa got in. “Nice” is already checked and can't be changed — Santa only leaves tags for the nice list.",
  },
  {
    question: "What paper should I print the gift tags on?",
    answer:
      "White cardstock (65–110 lb) is the standard choice. For an authentic antiqued look, print on cream cardstock instead. Regular printer paper works too, but the tags won't be as sturdy. The sheet is standard 8.5×11 letter size — print at 100% or “Actual size” so the tags come out full size.",
  },
  {
    question: "Can I make tags for more than one child?",
    answer:
      "Yes. Type the first name and print, then change the name and print again. Each sheet makes six tags for one child.",
  },
  {
    question: "Can you design and print custom Santa tags for me?",
    answer: `Yes — personalized “From Santa” gift tags are designed and printed to order, with or without [Christmas cards](${CHRISTMAS_CARDS}). Use the quote form to tell me what you have in mind.`,
  },
];

export default function SantaGiftTagsPage() {
  const { title, description, image, download, published, category } = extra();

  const documentJsonLd = {
    "@context": "https://schema.org",
    "@type": "DigitalDocument",
    name: title,
    description,
    url: `${SITE_URL}/extras/${SLUG}`,
    image: `${SITE_URL}${image.src}`,
    encodingFormat: "application/pdf",
    contentUrl: `${SITE_URL}${download.href}`,
    isAccessibleForFree: true,
    datePublished: published,
    inLanguage: "en-US",
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(documentJsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-rose-300 via-amber-200 to-transparent opacity-50 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Link href="/extras" className="text-xs font-semibold uppercase tracking-widest text-rose-600 hover:text-rose-700">
              {EXTRAS_HUB.title} · {getExtraCategory(category).label}
            </Link>
            <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
              Make Christmas morning a little more magical. This free printable sheet has six vintage-style tags
              signed &ldquo;Love, Santa&rdquo; — type your child&rsquo;s name once, check a few boxes, and print at home.
            </p>
            <div className="mt-8 flex flex-col items-start gap-3">
              <FreebieDownloadButton
                slug={SLUG}
                href={download.href}
                fileName={download.fileName}
                className="btn-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-rose-600 px-7 py-4 text-base font-semibold text-white shadow-lg shadow-rose-600/25 transition-transform hover:scale-105"
              >
                Download the free PDF
              </FreebieDownloadButton>
              <p className="text-sm text-ink-soft">{download.details} · No email required</p>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="relative rotate-2 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-ink/5 transition-transform duration-500 hover:rotate-0">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 1024px) 384px, 90vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* What's in it */}
      <section className="bg-paper-tint py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">What&rsquo;s on the sheet</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 80} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/5">
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-rose-50 to-amber-50">
                    <Image
                      src={f.image.src}
                      alt={f.image.alt}
                      fill
                      sizes="(min-width: 768px) 360px, 100vw"
                      className="object-contain p-3"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{f.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How to use it + upsell */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">How to use it</h2>
            <ol className="mt-6 space-y-4">
              {STEPS.map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-100 text-sm font-bold text-rose-700">
                    {i + 1}
                  </span>
                  <p className="pt-1 leading-relaxed text-ink-soft">{step}</p>
                </li>
              ))}
            </ol>
            <FreebieDownloadButton
              slug={SLUG}
              href={download.href}
              fileName={download.fileName}
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white"
            >
              Download the free PDF
            </FreebieDownloadButton>
          </div>

          <Reveal delay={100}>
            <div className="rounded-3xl border border-dashed border-rose-300 bg-rose-50/60 p-7">
              <p className="text-xs font-semibold uppercase tracking-widest text-rose-600">Want them made for you?</p>
              <h2 className="mt-2 text-xl font-bold tracking-tight">Custom printed Santa tags &amp; Christmas cards</h2>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                Skip the printer and scissors. I design and print personalized &ldquo;From Santa&rdquo; tags with each
                child&rsquo;s name — on their own or to match your family&rsquo;s Christmas cards.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <QuoteModal
                  initialServiceId="cards"
                  triggerClassName="rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
                >
                  Get a quote
                </QuoteModal>
                <Link
                  href={CHRISTMAS_CARDS}
                  className="group inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
                >
                  Christmas cards
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <ServiceFaqs faqs={FAQS} />
          <Link
            href="/extras"
            className="group mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700"
          >
            More {EXTRAS_HUB.title}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </>
  );
}
