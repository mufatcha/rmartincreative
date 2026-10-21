import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BeforeAfterSlider from "./BeforeAfterSlider";
import QuoteModal from "./QuoteModal";
import Reveal from "./Reveal";
import ServiceFaqs from "./ServiceFaqs";
import { IconArrowRight } from "./icons";
import { NEXTDOOR_GROUP, SITE_URL } from "../lib/business";
import { ABOUT } from "../lib/data/about";
import { EXTRAS_HUB, extraShareMetadata, getExtra, getExtraCategory, getExtraSeries } from "../lib/data/extras";
import { renderInlineLinks } from "../lib/inline-links";
import { pageTitle } from "../lib/seo";
import type { ServiceFaq } from "../lib/services-data";

// The shared layout for written Notes & Freebies articles. Each article page is
// just its content: plain strings (with optional "[text](/link)" links) arranged
// into blocks, so a new article never needs new layout code.

export type ArticleBlock =
  | { type: "numbered"; heading: string; items: { title: string; body: string }[] }
  | { type: "steps"; heading: string; items: string[]; note?: string }
  | { type: "bullets"; heading: string; items: string[] }
  | { type: "text"; heading: string; paragraphs: string[] }
  /** A code sample (shown as-is, not run through `rich`), with optional text before and after. */
  | { type: "code"; heading: string; paragraphs: string[]; code: string; note?: string }
  /** A comparison table: the first column labels each row. */
  | { type: "table"; heading: string; paragraphs: string[]; columns: string[]; rows: string[][]; note?: string }
  /** A before-and-after slider, for real fixes (share them only with the owner's permission). */
  | {
      type: "beforeAfter";
      heading: string;
      paragraphs: string[];
      beforeSrc: string;
      afterSrc: string;
      beforeAlt: string;
      afterAlt: string;
      caption?: string;
    };

export type ArticleContent = {
  intro: string[];
  blocks: ArticleBlock[];
  cta: {
    heading: string;
    body: string;
    serviceId: string;
    button: string;
    /** Makes the button a link (e.g. to a page's own form) instead of opening the quote form. */
    buttonHref?: string;
    link: { href: string; label: string };
  };
  faqs: ServiceFaq[];
};

function getArticle(slug: string) {
  const extra = getExtra(slug);
  if (!extra) notFound();
  return extra;
}

export function extraArticleMetadata(slug: string): Metadata {
  const extra = getArticle(slug);
  return {
    title: pageTitle(extra.title),
    description: extra.description,
    alternates: { canonical: `/extras/${slug}` },
    ...extraShareMetadata(extra),
  };
}

const p = "leading-relaxed text-ink-soft";

/**
 * Article text: "[text](/link)" links (see inline-links), plus **bold** and
 * `code` (for settings to type in, like a server name).
 */
function rich(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**"))
      return (
        <strong key={i} className="font-semibold text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    if (part.startsWith("`") && part.endsWith("`"))
      return (
        <code key={i} className="rounded bg-ink/5 px-1.5 py-0.5 font-mono text-[0.9em] text-ink">
          {part.slice(1, -1)}
        </code>
      );
    return <Fragment key={i}>{renderInlineLinks(part)}</Fragment>;
  });
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "numbered":
      return (
        <ol className="mt-8 space-y-5">
          {block.items.map((item, i) => (
            <li key={item.title}>
              <Reveal delay={i * 60}>
                <div className="flex gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sm font-bold text-sky-700">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className={`mt-2 ${p}`}>{rich(item.body)}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      );
    case "steps":
      return (
        <>
          <ol className="mt-6 space-y-4">
            {block.items.map((step, i) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-600 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <p className={`pt-1 ${p}`}>{rich(step)}</p>
              </li>
            ))}
          </ol>
          {block.note && <p className={`mt-6 text-sm ${p}`}>{rich(block.note)}</p>}
        </>
      );
    case "bullets":
      return (
        <ul className="mt-6 space-y-4">
          {block.items.map((item) => (
            <li key={item} className={`flex gap-3 ${p}`}>
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" />
              <span>{rich(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "text":
      return (
        <>
          {block.paragraphs.map((para) => (
            <p key={para} className={`mt-4 text-lg ${p}`}>
              {rich(para)}
            </p>
          ))}
        </>
      );
    case "code":
      return (
        <>
          {block.paragraphs.map((para) => (
            <p key={para} className={`mt-4 text-lg ${p}`}>
              {rich(para)}
            </p>
          ))}
          <pre className="mt-6 overflow-x-auto rounded-2xl bg-ink p-6 text-sm leading-relaxed text-paper shadow-sm">
            <code className="font-mono">{block.code}</code>
          </pre>
          {block.note && <p className={`mt-6 text-sm ${p}`}>{rich(block.note)}</p>}
        </>
      );
    case "table":
      return (
        <>
          {block.paragraphs.map((para) => (
            <p key={para} className={`mt-4 text-lg ${p}`}>
              {rich(para)}
            </p>
          ))}
          <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-ink/5">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead>
                <tr className="border-b border-ink/10">
                  {block.columns.map((col) => (
                    <th key={col} scope="col" className="px-5 py-4 font-semibold text-ink">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {block.rows.map(([label, ...cells]) => (
                  <tr key={label} className="align-top">
                    <th scope="row" className="px-5 py-4 font-semibold text-ink">
                      {label}
                    </th>
                    {cells.map((cell, i) => (
                      <td key={i} className={`px-5 py-4 ${p}`}>
                        {rich(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className={`mt-6 text-sm ${p}`}>{rich(block.note)}</p>}
        </>
      );
    case "beforeAfter":
      return (
        <>
          {block.paragraphs.map((para) => (
            <p key={para} className={`mt-4 text-lg ${p}`}>
              {rich(para)}
            </p>
          ))}
          <div className="mt-6 overflow-hidden rounded-2xl shadow-xl ring-1 ring-ink/5">
            <BeforeAfterSlider
              beforeSrc={block.beforeSrc}
              afterSrc={block.afterSrc}
              beforeAlt={block.beforeAlt}
              afterAlt={block.afterAlt}
            />
          </div>
          {block.caption && <p className={`mt-3 text-center text-sm ${p}`}>{rich(block.caption)}</p>}
        </>
      );
  }
}

export default function ExtraArticle({ slug, content }: { slug: string; content: ArticleContent }) {
  const { title, description, published, category, image, series, download } = getArticle(slug);

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_URL}/extras/${slug}`,
    datePublished: published,
    inLanguage: "en-US",
    ...(image ? { image: `${SITE_URL}${image.src}` } : {}),
    ...(ABOUT.published ? { author: { "@type": "Person", "@id": `${SITE_URL}/about#ryan-martin`, name: "Ryan Martin" } } : {}),
    publisher: { "@id": `${SITE_URL}/#business` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Intro */}
      <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
        <div
          aria-hidden
          className="animate-drift-a pointer-events-none absolute -left-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-gradient-to-br from-sky-400 via-indigo-300 to-transparent opacity-40 blur-3xl"
        />
        <div className="relative mx-auto max-w-3xl px-6">
          <Link href="/extras" className="text-xs font-semibold uppercase tracking-widest text-sky-600 hover:text-sky-700">
            {EXTRAS_HUB.title} · {series ? getExtraSeries(series).label : getExtraCategory(category).label}
          </Link>
          <h1 className="mt-3 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h1>
          {content.intro.map((para, i) => (
            <p key={para} className={`${i === 0 ? "mt-6" : "mt-4"} text-lg ${p}`}>
              {rich(para)}
            </p>
          ))}
          {download && (
            <a
              href={download.href}
              download={download.fileName}
              className="btn-shine group relative mt-8 inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-lg shadow-ink/20 transition-transform hover:scale-105"
            >
              Download the free PDF
              <span className="font-normal text-paper/70">{download.details}</span>
              <IconArrowRight className="h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
            </a>
          )}
          {image && (
            <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-ink/5">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 768px) 720px, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Body: blocks alternate between plain and tinted bands */}
      {content.blocks.map((block, i) => (
        <section key={block.heading} className={i % 2 === 1 ? "bg-paper-tint py-16 sm:py-20" : "py-16 sm:py-20"}>
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{block.heading}</h2>
            <Block block={block} />
          </div>
        </section>
      ))}

      {/* Call to action + FAQs */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          {series && (
            <p className="mb-8 rounded-2xl bg-white p-5 text-sm leading-relaxed text-ink-soft shadow-sm ring-1 ring-ink/5">
              This started in our free Nextdoor group,{" "}
              <span className="font-semibold text-ink">Website Help for Local Business Owners</span>.{" "}
              <a
                href={NEXTDOOR_GROUP.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#1B8851] hover:underline"
              >
                Join to ask your own questions
              </a>
              .
            </p>
          )}
          <Reveal>
            <div className="rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-indigo-600 p-8 text-white shadow-xl">
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">{content.cta.heading}</h2>
              <p className="mt-3 leading-relaxed text-white/90">{content.cta.body}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                {content.cta.buttonHref ? (
                  <Link
                    href={content.cta.buttonHref}
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
                  >
                    {content.cta.button}
                  </Link>
                ) : (
                  <QuoteModal
                    initialServiceId={content.cta.serviceId}
                    triggerClassName="rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-lg transition-transform hover:scale-105"
                  >
                    {content.cta.button}
                  </QuoteModal>
                )}
                <Link href={content.cta.link.href} className="group inline-flex items-center gap-2 text-sm font-semibold text-white">
                  {content.cta.link.label}
                  <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>

          <ServiceFaqs faqs={content.faqs} />
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
