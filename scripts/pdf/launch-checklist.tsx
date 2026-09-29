// Builds public/downloads/new-business-launch-checklist.pdf from the same data
// as the /new-business page. Re-run after editing app/lib/launch-timeline.ts:
//   bun run pdf:checklist
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  Defs,
  Document,
  Font,
  Link,
  LinearGradient,
  Page,
  Rect,
  Stop,
  StyleSheet,
  Svg,
  Text,
  View,
  renderToFile,
} from "@react-pdf/renderer";
import {
  BUSINESS_EMAIL,
  BUSINESS_NAME,
  BUSINESS_PHONE_DISPLAY,
  PRODUCTION_URL,
} from "../../app/lib/business";
import { LAUNCH_PHASES, type LaunchItemKind } from "../../app/lib/launch-timeline";

const here = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(here, "..", "..", "public", "downloads", "new-business-launch-checklist.pdf");
const SITE = PRODUCTION_URL;
const SITE_LABEL = SITE.replace(/^https?:\/\//, "");

// Fixed text widths: react-pdf mis-measures wrapped text inside `flex: 1` boxes,
// leaving large gaps between lines. Content width = 612pt page - 2 × 54pt margins.
const CONTENT = 504;
const PHASE_BODY = CONTENT - 12 - 26 - 1.5; // rail margin + padding + border
const ITEM_TEXT = PHASE_BODY - 10 - 8 - 82; // checkbox + gap + tag column

Font.register({
  family: "Geist",
  fonts: [
    { src: join(here, "fonts", "Geist-Regular.ttf"), fontWeight: 400 },
    { src: join(here, "fonts", "Geist-Medium.ttf"), fontWeight: 500 },
    { src: join(here, "fonts", "Geist-SemiBold.ttf"), fontWeight: 600 },
    { src: join(here, "fonts", "Geist-Bold.ttf"), fontWeight: 700 },
  ],
});
// Keep words whole instead of hyphenating them.
Font.registerHyphenationCallback((word) => [word]);

// Brand colors (match app/globals.css and the site's Tailwind accents).
const C = {
  ink: "#201a2e",
  inkSoft: "#5a5270",
  line: "#e4dfec",
  violet: "#7c3aed",
  violetSoft: "#f5f3ff",
  fuchsia: "#d946ef",
  amber: "#f59e0b",
  paper: "#fffaf2",
};

const KIND: Record<LaunchItemKind, { label: string; bg: string; fg: string }> = {
  digital: { label: "DIGITAL", bg: "#e0f2fe", fg: "#0369a1" },
  print: { label: "PRINT", bg: "#fef3c7", fg: "#92400e" },
  both: { label: "DIGITAL + PRINT", bg: "#ede9fe", fg: "#6d28d9" },
};

const s = StyleSheet.create({
  page: { fontFamily: "Geist", fontSize: 10, color: C.ink, paddingTop: 48, paddingBottom: 64, paddingHorizontal: 54 },
  footer: {
    position: "absolute",
    bottom: 26,
    left: 54,
    right: 54,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderTopColor: C.line,
    paddingTop: 8,
    fontSize: 8,
    color: C.inkSoft,
  },
  eyebrow: { fontSize: 8, fontWeight: 600, letterSpacing: 1.2, color: C.violet },
  tag: { alignSelf: "flex-start", fontSize: 6.5, fontWeight: 600, letterSpacing: 0.6, paddingVertical: 2, paddingHorizontal: 5, borderRadius: 6 },
  checkbox: { width: 10, height: 10, borderWidth: 1, borderColor: C.inkSoft, borderRadius: 2, marginTop: 1 },
  // Blank room under each question for handwritten answers.
  answerSpace: { height: 48 },
  rail: { marginLeft: 12, paddingLeft: 26, borderLeftWidth: 1.5, borderLeftColor: "#ddd6fe" },
});

function GradientBar({ width, height, radius = 0 }: { width: number; height: number; radius?: number }) {
  return (
    <Svg width={width} height={height}>
      <Defs>
        <LinearGradient id="brand" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor={C.violet} />
          <Stop offset="0.55" stopColor={C.fuchsia} />
          <Stop offset="1" stopColor={C.amber} />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={width} height={height} rx={radius} ry={radius} fill="url(#brand)" />
    </Svg>
  );
}

function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <View style={{ width: size, height: size }}>
      <GradientBar width={size} height={size} radius={size * 0.25} />
      <Text
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: size,
          height: size,
          textAlign: "center",
          paddingTop: size * 0.3,
          fontSize: size * 0.34,
          fontWeight: 700,
          color: "#ffffff",
        }}
      >
        RM
      </Text>
    </View>
  );
}

function Tag({ kind }: { kind: LaunchItemKind }) {
  const k = KIND[kind];
  return <Text style={[s.tag, { backgroundColor: k.bg, color: k.fg }]}>{k.label}</Text>;
}

function Footer() {
  return (
    <View style={s.footer} fixed>
      <Text>
        {BUSINESS_NAME} · {BUSINESS_PHONE_DISPLAY} · {SITE_LABEL}
      </Text>
      <Text render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
    </View>
  );
}

function Cover() {
  return (
    <Page size="LETTER" style={[s.page, { paddingTop: 0 }]}>
      <View style={{ marginHorizontal: -54 }}>
        <GradientBar width={612} height={10} />
      </View>

      <View style={{ marginTop: 34, flexDirection: "row", alignItems: "center" }}>
        <BrandMark size={42} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 13, fontWeight: 700 }}>Ryan Martin</Text>
          <Text style={{ fontSize: 10, color: C.inkSoft }}>Design &amp; Print</Text>
        </View>
      </View>

      <Text style={[s.eyebrow, { marginTop: 34 }]}>NEW BUSINESS LAUNCH GUIDE</Text>
      <Text style={{ marginTop: 10, fontSize: 36, fontWeight: 700, lineHeight: 1.1 }}>New Business Launch Checklist</Text>
      <Text style={{ marginTop: 10, fontSize: 14, color: C.violet, fontWeight: 500 }}>
        Branding, website, print &amp; marketing — week by week
      </Text>
      <Text style={{ marginTop: 14, fontSize: 11, lineHeight: 1.55, color: C.inkSoft, width: 440 }}>
        Everything a new business needs to look established from day one, in the order it needs to happen. Work
        through it yourself, or hand any part of it to me.
      </Text>

      <View style={{ marginTop: 22, padding: 16, backgroundColor: C.violetSoft, borderRadius: 10 }}>
        <Text style={{ fontSize: 11, fontWeight: 700 }}>How to use this checklist</Text>
        {[
          "Start with the phase that matches how far you are from opening.",
          "Tick each box as it's done, and jot answers under the questions.",
          "The tags show what's digital, what's printed, and what's both.",
        ].map((line, i) => (
          <View key={line} style={{ flexDirection: "row", marginTop: 5 }}>
            <Text style={{ width: 14, fontWeight: 700, color: C.violet }}>{i + 1}.</Text>
            <Text style={{ width: CONTENT - 32 - 14 }}>{line}</Text>
          </View>
        ))}
        <View style={{ flexDirection: "row", gap: 6, marginTop: 12 }}>
          <Tag kind="digital" />
          <Tag kind="print" />
          <Tag kind="both" />
        </View>
      </View>

      <Text style={[s.eyebrow, { marginTop: 22 }]}>THE TIMELINE</Text>
      <View style={{ marginTop: 8 }}>
        {LAUNCH_PHASES.map((phase, i) => (
          <View
            key={phase.id}
            style={{ flexDirection: "row", paddingVertical: 4, borderBottomWidth: 0.5, borderBottomColor: C.line }}
          >
            <Text style={{ width: 20, fontWeight: 700, color: C.violet }}>{i + 1}</Text>
            <Text style={{ width: CONTENT - 20 - 110, fontWeight: 600 }}>{phase.title}</Text>
            <Text style={{ width: 110, textAlign: "right", color: C.inkSoft }}>{phase.timeframe}</Text>
          </View>
        ))}
      </View>

      <Footer />
    </Page>
  );
}

function Phases() {
  return (
    <Page size="LETTER" style={s.page}>
      {LAUNCH_PHASES.map((phase, i) => (
        <View key={phase.id} style={{ marginBottom: 26 }}>
          {/* The header and the whole "What to do" list move to the next page together,
              so a phase title is never stranded at the bottom of a page. */}
          <View wrap={false}>
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: C.violet,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#ffffff", fontSize: 11, fontWeight: 700 }}>{i + 1}</Text>
            </View>
            <View style={{ marginLeft: 12, width: CONTENT - 26 - 12 }}>
              <Text style={s.eyebrow}>{phase.timeframe.toUpperCase()}</Text>
              <Text style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>{phase.title}</Text>
              <Text style={{ marginTop: 4, fontSize: 10, color: C.inkSoft, lineHeight: 1.4 }}>{phase.summary}</Text>
            </View>
          </View>

          <View style={[s.rail, { marginTop: 10, paddingBottom: 4 }]}>
            <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, marginBottom: 6 }}>WHAT TO DO</Text>
            {phase.items.map((item) => (
              <View key={item.label} style={{ flexDirection: "row", marginBottom: 6 }}>
                <View style={s.checkbox} />
                <View style={{ width: 82, marginLeft: 8 }}>
                  <Tag kind={item.kind} />
                </View>
                <View style={{ width: ITEM_TEXT }}>
                  <Text style={{ fontSize: 10, lineHeight: 1.35 }}>{item.label}</Text>
                  {item.note && (
                    <Text style={{ fontSize: 8.5, color: C.inkSoft, marginTop: 1, lineHeight: 1.35 }}>{item.note}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
          </View>

          <View style={s.rail}>
            {phase.questions.map((q, qi) => (
              <View key={q} wrap={false} style={{ marginBottom: 6 }}>
                {/* The heading rides with the first question so it's never left alone at a page bottom. */}
                {qi === 0 && (
                  <Text style={{ fontSize: 9, fontWeight: 700, letterSpacing: 1, marginTop: 6, marginBottom: 4, color: C.violet }}>
                    QUESTIONS TO ANSWER
                  </Text>
                )}
                <Text style={{ width: PHASE_BODY, fontSize: 10, lineHeight: 1.35 }}>{q}</Text>
                <View style={s.answerSpace} />
              </View>
            ))}

            <View wrap={false} style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 6 }}>
              <Text style={{ fontSize: 8.5, fontWeight: 600, color: C.inkSoft }}>HOW I CAN HELP:  </Text>
              {phase.help.map((h, hi) => (
                <Text key={h.label} style={{ fontSize: 8.5 }}>
                  {h.href ? (
                    <Link src={`${SITE}${h.href}`} style={{ color: C.violet, textDecoration: "none" }}>
                      {h.label}
                    </Link>
                  ) : (
                    <Text style={{ color: C.ink }}>{h.label}</Text>
                  )}
                  {hi < phase.help.length - 1 ? "  ·  " : ""}
                </Text>
              ))}
            </View>
          </View>
        </View>
      ))}
      <Footer />
    </Page>
  );
}

function Closing() {
  return (
    <Page size="LETTER" style={s.page}>
      <View style={{ marginTop: 120, borderRadius: 16, overflow: "hidden" }}>
        <GradientBar width={504} height={250} radius={16} />
        <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, padding: 36 }}>
          <Text style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
            Want help with any of this?
          </Text>
          <Text style={{ marginTop: 12, fontSize: 12, color: "#ffffff", lineHeight: 1.5 }}>
            Branding, website, print, and launch marketing — from one person who keeps it all consistent. Tell me your
            launch date and what you already have, and I&apos;ll put together a plan and a quote.
          </Text>
          <Link
            src={`${SITE}/new-business`}
            style={{
              marginTop: 22,
              alignSelf: "flex-start",
              backgroundColor: "#ffffff",
              color: C.ink,
              fontSize: 11,
              fontWeight: 700,
              paddingVertical: 9,
              paddingHorizontal: 16,
              borderRadius: 18,
              textDecoration: "none",
            }}
          >
            Plan my launch at {SITE_LABEL}/new-business
          </Link>
        </View>
      </View>

      <View style={{ marginTop: 36, flexDirection: "row", alignItems: "center" }}>
        <BrandMark size={34} />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>{BUSINESS_NAME}</Text>
          <Text style={{ marginTop: 2, color: C.inkSoft }}>
            {BUSINESS_PHONE_DISPLAY} · {BUSINESS_EMAIL} ·{" "}
            <Link src={SITE} style={{ color: C.violet, textDecoration: "none" }}>
              {SITE_LABEL}
            </Link>
          </Text>
        </View>
      </View>
      <Footer />
    </Page>
  );
}

function Checklist() {
  return (
    <Document
      title="New Business Launch Checklist"
      author={BUSINESS_NAME}
      subject="Branding, website, print & marketing checklist for launching a new business"
      creator={BUSINESS_NAME}
    >
      <Cover />
      <Phases />
      <Closing />
    </Document>
  );
}

mkdirSync(dirname(OUTPUT), { recursive: true });
await renderToFile(<Checklist />, OUTPUT);
console.log(`Wrote ${OUTPUT}`);
