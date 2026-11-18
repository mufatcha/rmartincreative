"use client";

import { useCallback, useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { itemDone, progress } from "../../lib/onboarding/progress";
import { UPLOAD_CATEGORIES, noteNeedsAck, type Item, type PortalFile, type PortalState } from "../../lib/onboarding/types";
import ChatPanel from "../components/ChatPanel";
import ContactEmail from "./ContactEmail";
import FeedbackForm from "./FeedbackForm";
import ReviewsSection from "./ReviewsSection";
import { ItemShell, ProgressBar, SaveIndicator } from "../components/ItemView";
import QuestionField from "../components/QuestionField";
import UploadArea from "../components/UploadArea";
import NotesAccordion from "../components/NotesAccordion";
import SiteAddresses from "../components/SiteAddresses";
import PlanView, { countPlanChanges } from "../components/PlanView";
import PortalNav, { type NavView } from "../components/PortalNav";
import { usePortal } from "../components/usePortal";
import LinkText from "../components/LinkText";

const ADMIN_NAME = "Ryan";

// ── Which view is open: the address bar's #hash ("" is the home view) ──────

const subscribeHash = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  window.addEventListener("popstate", onChange);
  return () => {
    window.removeEventListener("hashchange", onChange);
    window.removeEventListener("popstate", onChange);
  };
};
const readHash = () => decodeURIComponent(window.location.hash.slice(1)) || "home";

function goTo(key: string) {
  const url = key === "home" ? window.location.pathname + window.location.search : `#${key}`;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
  window.scrollTo({ top: 0 });
}

// ── Menu icons ───────────────────────────────────────────────────────────────

const svg = (d: ReactNode) => (
  <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {d}
  </svg>
);
const ICONS = {
  home: svg(<path d="M3.5 9 10 3.5 16.5 9v7a1 1 0 0 1-1 1H12v-4.5H8V17H4.5a1 1 0 0 1-1-1Z" />),
  plan: svg(<path d="M4 5h12M4 10h8M4 15h10" />),
  files: svg(
    <>
      <path d="M5 2.5h6.5L15 6v11.5H5Z" />
      <path d="M11.5 2.5V6H15M7.5 10h5M7.5 13h5" />
    </>
  ),
  upload: svg(<path d="M10 13V3.5m0 0L6.5 7M10 3.5 13.5 7M4 12.5v3a1.5 1.5 0 0 0 1.5 1.5h9a1.5 1.5 0 0 0 1.5-1.5v-3" />),
  star: svg(<path d="m10 2.8 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4-4.5 2.4.9-5-3.6-3.5 5-.7Z" />),
  chat: svg(<path d="M4 4.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" />),
};
/** Sections are numbered in menu order. */
const sectionIcon = (n: number) => <span className="text-[15px] font-bold tabular-nums leading-none">{n}</span>;

const NewChip = () => (
  <span className="ml-2 rounded-full bg-emerald-100 px-2 py-0.5 align-middle text-[11px] font-bold uppercase tracking-wide text-emerald-800 no-underline">New</span>
);

export default function OnboardingPortal({ initial, preview = false }: { initial: PortalState; preview?: boolean }) {
  const slug = initial.client.slug;
  const api = `/api/start/${slug}`;
  const { state, setServer, refresh, post, saveAnswer, setTask, status, lastError } = usePortal(initial, { stateUrl: api, postUrl: api });
  const hashView = useSyncExternalStore(subscribeHash, readHash, () => "home");
  const [chatOpen, setChatOpen] = useState(false);
  // What the client had seen before opening a view in this visit, so the New
  // labels stay put while they read even though the server now has this look.
  const [baselines, setBaselines] = useState<Record<string, number | null | undefined>>({});

  // Record the visit once the page is actually open in a browser (see page.tsx).
  useEffect(() => {
    if (preview) return;
    const ping = () => {
      if (document.visibilityState !== "visible") return false;
      void fetch(`${api}?visible=1&v=${initial.version}`, { cache: "no-store" }).catch(() => {});
      return true;
    };
    if (ping()) return;
    const onVisible = () => ping() && document.removeEventListener("visibilitychange", onVisible);
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [api, initial.version, preview]);

  const first = state.client.name.split(/\s+/)[0];
  const overall = progress(state.items, state);
  const allDone = overall.total > 0 && overall.done === overall.total;

  /** Ryan's change at `t` is new to the client in view `key` (never, before their first visit). */
  const isNew = (t: number, key: string) => {
    const b = state.viewsSeen[key] ?? state.viewsSeen["*"];
    return b !== undefined && t > b;
  };

  // ── The views, in menu order ──
  const livePlan = state.plan.filter((p) => p.removedAt === null);
  const planChanges = countPlanChanges(state.plan, state.planSeenAt);
  const hasPlan = livePlan.length > 0 || planChanges > 0;
  const sections = state.sections
    .map((s) => ({ section: s, items: state.items.filter((i) => i.sectionId === s.id) }))
    .filter((s) => s.items.length > 0);

  const views: NavView[] = [
    {
      key: "home",
      label: "Home",
      icon: ICONS.home,
      fresh: state.notes.filter(noteNeedsAck).length,
      todo: !state.client.email && !preview ? 1 : 0,
    },
    { key: "messages", label: "Messages", icon: ICONS.chat, fresh: state.unread, todo: 0 },
  ];
  if (hasPlan) {
    views.push({
      key: "plan",
      label: "Project plan",
      icon: ICONS.plan,
      fresh: state.planSeenAt === null ? livePlan.length : planChanges,
      todo: 0,
    });
  }
  if (state.reviews.length) {
    views.push({
      key: "files",
      label: `Files from ${ADMIN_NAME}`,
      icon: ICONS.files,
      fresh: state.reviews.filter(
        (r) => r.versions.some((v) => isNew(v.createdAt, "files")) || r.comments.some((c) => c.author === "admin" && isNew(c.createdAt, "files"))
      ).length,
      todo: state.reviews.filter((r) => r.status === "waiting").length,
    });
  }
  // Photos, video & logo: on every page, after Ryan's files.
  const inCategory = (key: string) => (f: PortalFile) => f.itemId === null && (f.category ?? "misc") === key;
  views.push({
    key: "uploads",
    label: "Upload photos, video & more",
    icon: ICONS.upload,
    fresh: 0,
    todo: UPLOAD_CATEGORIES.filter((c) => c.required && !state.files.some(inCategory(c.key))).length,
  });
  sections.forEach(({ section, items }, i) => {
    const key = `section-${section.id}`;
    const p = progress(items, state);
    views.push({
      key,
      label: section.title,
      icon: sectionIcon(i + 1),
      fresh: items.filter((it) => isNew(it.createdAt, key)).length,
      todo: p.total - p.done,
    });
  });

  // Last: onboarding feedback. Red until they've sent some, as a gentle nudge.
  views.push({ key: "feedback", label: "Feedback", icon: ICONS.star, fresh: 0, todo: state.feedbackCount === 0 && !preview ? 1 : 0 });

  const current = views.some((v) => v.key === hashView) ? hashView : "home";

  // Opening a view clears its green count (on the server), after noting what
  // was new so this visit still shows it.
  const seenBefore = (key: string) => (key === "plan" ? state.planSeenAt : (state.viewsSeen[key] ?? state.viewsSeen["*"] ?? null));
  const markSeen = useCallback(
    async (key: string) => {
      if (key === "plan") {
        await post({ action: "planSeen" }, { quiet: true });
        return refresh();
      }
      const res = (await post({ action: "viewSeen", view: key }, { quiet: true })) as { viewsSeen?: Record<string, number> };
      if (res.viewsSeen) setServer((st) => ({ ...st, viewsSeen: res.viewsSeen! }));
    },
    [post, refresh, setServer]
  );
  /** Views whose green count clears on opening (Messages clears as they're read). */
  const tracked = (key: string) => key !== "home" && key !== "messages";
  const markOpened = (key: string) => {
    if (preview || !tracked(key)) return;
    setBaselines((b) => (key in b ? b : { ...b, [key]: seenBefore(key) }));
    void markSeen(key);
  };
  // A link straight to a view (#plan, #section-3 from an email) counts as opening it.
  const [landed, setLanded] = useState<string | null>(null);
  if (landed === null && current !== "home") {
    setLanded(current);
    if (!preview && tracked(current)) setBaselines((b) => ({ ...b, [current]: seenBefore(current) }));
  }
  useEffect(() => {
    if (landed && !preview && tracked(landed)) void markSeen(landed);
  }, [landed, preview, markSeen]);

  const pick = (key: string) => {
    if (key === current) return;
    setChatOpen(false);
    markOpened(key);
    goTo(key);
  };

  const onSend = useCallback(
    async (body: string) => {
      const res = await post({ action: "message", body });
      await refresh();
      return res;
    },
    [post, refresh]
  );
  const saveEmail = useCallback(
    async (email: string) => {
      const res = await post({ action: "email", email });
      await refresh();
      return res;
    },
    [post, refresh]
  );
  const onRead = useCallback(() => {
    void post({ action: "read" }, { quiet: true }).then(refresh);
  }, [post, refresh]);

  const renderItem = (item: Item, key: string) => {
    const done = itemDone(item, state);
    const titleId = `q-${item.id}`;
    const base = baselines[key];
    const fresh = base !== undefined && base !== null && item.createdAt > base ? <NewChip /> : null;
    if (item.kind === "question") {
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help} badge={fresh}>
          <QuestionField item={item} value={state.responses[item.id]?.value} onSave={(v, o) => void saveAnswer(item.id, v, o)} disabled={preview} />
        </ItemShell>
      );
    }
    if (item.kind === "task") {
      const task = state.tasks[item.id];
      return (
        <ItemShell
          key={item.id}
          done={done}
          onToggle={preview ? undefined : () => void setTask(item.id, !done)}
          title={item.title}
          titleId={titleId}
          help={item.help}
          badge={
            <>
              {fresh}
              {task?.done && task.doneBy === "admin" && <span className="ml-2 text-xs font-medium text-emerald-600 no-underline">({ADMIN_NAME} checked this off)</span>}
            </>
          }
        />
      );
    }
    if (item.kind === "upload") {
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help} badge={fresh}>
          <UploadArea
            slug={slug}
            itemId={item.id}
            files={state.files.filter((f) => f.itemId === item.id)}
            canUpload={!preview}
            canRemove={(f) => !preview && f.uploadedBy === "client"}
            register={post}
            removeFile={(fileId) => post({ action: "deleteFile", fileId })}
            onChange={refresh}
          />
        </ItemShell>
      );
    }
    return (
      <div key={item.id} className="my-4 rounded-2xl bg-violet-50 px-5 py-4 text-[15px] text-ink">
        {item.title && (
          <p className="font-semibold">
            {item.title}
            {fresh}
          </p>
        )}
        {item.help && (
          <p className="mt-1 whitespace-pre-wrap text-ink-soft">
            <LinkText text={item.help} />
          </p>
        )}
      </div>
    );
  };

  const chat = (active: boolean, className: string) => (
    <ChatPanel
      messages={state.messages}
      viewer="client"
      otherName={ADMIN_NAME}
      unread={state.unread}
      active={active}
      onSend={onSend}
      onRead={onRead}
      emptyText={`Questions about anything here? Send ${ADMIN_NAME} a message. You'll get an email when there's a reply.`}
      className={className}
      readOnly={preview}
    />
  );

  const card = "rounded-3xl border border-ink/10 bg-white shadow-sm";

  // ── Home: welcome, notes, site address, messages ──
  const home = (
    <>
      <header className="rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-6 py-7 text-white shadow-lg sm:px-8 sm:py-9">
        <p className="text-sm font-medium text-violet-200">Your onboarding page</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Welcome, {first}</h1>
        <p className="mt-3 max-w-2xl whitespace-pre-wrap text-violet-100">
          {state.client.intro ||
            "Here's everything I need to get started. Answer what you can, upload photos and videos, and check things off as you go. Everything saves automatically, so you can come back any time."}
        </p>
        <p className="mt-4 flex max-w-2xl items-start gap-2 rounded-2xl bg-white/10 px-3.5 py-2.5 text-sm text-violet-100">
          <svg viewBox="0 0 20 20" aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white">
            <rect x="4" y="9" width="12" height="8" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 9V6.5a3 3 0 0 1 6 0V9" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span>
            <strong className="font-semibold text-white">Keep this link private.</strong> It works as the passcode to your project information, so
            please don&rsquo;t post it on social media, review sites, or anywhere public.
          </span>
        </p>
        <div className="mt-4 space-y-1 text-sm text-violet-100">
          <p>Use the menu on the left to move between parts of your page.</p>
          <p>
            A <span className="rounded-full bg-emerald-500 px-1.5 font-bold text-white">green</span> number means something new from {ADMIN_NAME}.
          </p>
          <p>
            A <span className="rounded-full bg-rose-500 px-1.5 font-bold text-white">red</span> number is what&rsquo;s left for you to do.
          </p>
        </div>
        {overall.total > 0 && (
          <div className="mt-6">
            {/* The percentage sits with the count, not at the bar's far end,
                where it read as a marker for how far along things are. */}
            <p className="mb-2 text-sm font-medium">
              {allDone ? (
                "All done. Thank you!"
              ) : (
                <>
                  {overall.done} of {overall.total} done <span className="text-violet-200">· {Math.round((overall.done / overall.total) * 100)}%</span>
                </>
              )}
            </p>
            <ProgressBar done={overall.done} total={overall.total} tone="light" />
          </div>
        )}
        {state.client.email && !preview && <ContactEmail email={state.client.email} onSave={saveEmail} />}
      </header>

      {!state.client.email && !preview && <ContactEmail email="" onSave={saveEmail} />}

      <NotesAccordion
        notes={state.notes}
        from={ADMIN_NAME}
        readOnly={preview}
        onAcknowledge={async (id) => {
          await post({ action: "ackNote", id });
          await refresh();
        }}
      />

      <SiteAddresses testUrl={state.client.testUrl} liveUrl={state.client.liveUrl} className="mt-5" />
    </>
  );

  const sectionKeys = views.filter((v) => v.key.startsWith("section-")).map((v) => v.key);

  const body = (() => {
    if (current === "plan") {
      const seen = baselines.plan !== undefined ? baselines.plan : state.planSeenAt;
      const changes = countPlanChanges(state.plan, seen ?? null);
      return (
        <section aria-labelledby="plan-title" className={`${card} overflow-hidden`}>
          <div className="bg-gradient-to-br from-violet-700 to-indigo-700 px-6 pb-6 pt-7 text-white sm:px-8">
            <h1 id="plan-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
              Project plan
            </h1>
            <p className="mt-1 text-sm text-violet-100">What I&rsquo;m working on, what&rsquo;s next, and what you&rsquo;ll get.</p>
            {changes > 0 && (
              <p className="mt-3 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                {changes} change{changes === 1 ? "" : "s"} since you last looked
              </p>
            )}
          </div>
          <div className="px-6 py-6 sm:px-8">
            <PlanView plan={state.plan} seen={seen ?? null} empty="The plan will show up here soon." />
          </div>
        </section>
      );
    }
    if (current === "feedback") {
      return (
        <section aria-labelledby="feedback-title" className={`${card} overflow-hidden`}>
          <div className="bg-gradient-to-br from-orange-600 to-rose-700 px-6 pb-6 pt-7 text-white sm:px-8">
            <h1 id="feedback-title" className="text-2xl font-bold tracking-tight sm:text-3xl">
              How&rsquo;s it going?
            </h1>
            <p className="mt-1 max-w-xl text-sm text-white">
              I&rsquo;m always working to make getting started easier. A quick rating or a few honest words about this page and the process so far
              helps me a lot, good or bad.
            </p>
          </div>
          <div className="px-6 py-6 sm:px-8">
            <FeedbackForm first={first} adminName={ADMIN_NAME} readOnly={preview} post={async (b) => {
              const res = await post(b);
              await refresh();
              return res;
            }} />
          </div>
        </section>
      );
    }
    if (current === "messages") {
      return (
        <section aria-labelledby="messages-title" className={`${card} flex h-[calc(100dvh-10rem)] min-h-[28rem] flex-col overflow-hidden sm:h-[calc(100dvh-11rem)]`}>
          <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4 sm:px-7">
            <div className="flex-1">
              <h1 id="messages-title" className="text-2xl font-bold tracking-tight">
                Messages
              </h1>
              <p className="text-xs text-ink-soft">With {ADMIN_NAME}. You&rsquo;ll get an email when there&rsquo;s a reply.</p>
            </div>
          </div>
          {chat(true, "flex-1 min-h-0")}
        </section>
      );
    }
    if (current === "files") {
      return <ReviewsSection state={state} adminName={ADMIN_NAME} readOnly={preview} post={post} refresh={refresh} />;
    }
    if (current === "uploads") {
      return (
        <section aria-labelledby="uploads-title" className={`${card} px-5 pt-6 sm:px-7`}>
          <h1 id="uploads-title" className="text-2xl font-bold tracking-tight">
            Upload photos, video &amp; more
          </h1>
          <p className="mt-1 text-sm text-ink-soft">Drop files in any time. Everything saves as it uploads, and you can add more later.</p>
          <div className="divide-y divide-ink/10">
            {UPLOAD_CATEGORIES.map((c) => {
              const files = state.files.filter(inCategory(c.key));
              return (
                <ItemShell
                  key={c.key}
                  done={files.length > 0}
                  title={c.title}
                  titleId={`upload-${c.key}`}
                  help={c.help}
                  badge={c.required ? null : <span className="ml-2 text-xs font-medium text-ink-soft">(optional)</span>}
                >
                  <UploadArea
                    slug={slug}
                    itemId={null}
                    category={c.key}
                    files={files}
                    canUpload={!preview}
                    canRemove={(f) => !preview && f.uploadedBy === "client"}
                    register={post}
                    removeFile={(fileId) => post({ action: "deleteFile", fileId })}
                    onChange={refresh}
                  />
                </ItemShell>
              );
            })}
          </div>
        </section>
      );
    }
    const found = sections.find((s) => `section-${s.section.id}` === current);
    if (found) {
      const p = progress(found.items, state);
      const at = sectionKeys.indexOf(current);
      const prev = views.find((v) => v.key === sectionKeys[at - 1]);
      const next = views.find((v) => v.key === sectionKeys[at + 1]);
      return (
        <>
          <section aria-labelledby="section-title" className={`${card} px-5 pt-6 sm:px-7`}>
            <div className="flex items-center gap-4">
              <h1 id="section-title" className="flex-1 text-2xl font-bold tracking-tight">
                {found.section.title}
              </h1>
              {p.total > 0 && (
                <span className={`text-sm font-medium ${p.done === p.total ? "text-emerald-600" : "text-ink-soft"}`}>
                  {p.done} of {p.total}
                </span>
              )}
            </div>
            {p.total > 0 && <ProgressBar done={p.done} total={p.total} className="mt-3 h-1.5" />}
            <div className="divide-y divide-ink/10">{found.items.map((i) => renderItem(i, current))}</div>
          </section>
          {(prev || next) && (
            <div className="mt-4 flex gap-3">
              {prev && (
                <button type="button" onClick={() => pick(prev.key)} className="min-w-0 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-violet-400">
                  <span className="block truncate">&larr; {prev.label}</span>
                </button>
              )}
              {next && (
                <button
                  type="button"
                  onClick={() => pick(next.key)}
                  className="ml-auto min-w-0 rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  <span className="block truncate">Next: {next.label} &rarr;</span>
                </button>
              )}
            </div>
          )}
        </>
      );
    }
    return home;
  })();

  return (
    <div data-clarity-mask className="pb-28 pt-28 sm:pt-32">
      {preview && (
        <div className="mx-auto mb-4 max-w-6xl px-4 sm:px-6">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            <strong>Admin preview.</strong>
            <span className="flex-1">
              This visit doesn&rsquo;t count as {first}&rsquo;s: their New labels and unread messages stay as they are. Editing is off here. To see the
              page exactly as they do, open it in a private window.
            </span>
            <a href={`/start/admin/${slug}`} className="font-semibold underline underline-offset-2">
              Back to admin
            </a>
          </p>
        </div>
      )}
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-3 sm:gap-6 sm:px-6">
        <PortalNav views={views} current={current} onPick={pick} />
        <main className="min-w-0 flex-1">{body}</main>
      </div>

      <div className="fixed bottom-4 right-4 z-30 flex flex-col items-end gap-2">
        {!preview && <SaveIndicator status={status} error={lastError} />}
        {/* Messages have their own view; elsewhere this opens them over the page. */}
        {current !== "messages" && (
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-600/30 hover:bg-violet-700"
          >
            {ICONS.chat}
            Messages
            {state.unread > 0 && <span className="rounded-full bg-emerald-400 px-2 py-0.5 text-xs font-bold text-emerald-950">{state.unread}</span>}
          </button>
        )}
      </div>

      {chatOpen && current !== "messages" && (
        <div className="fixed inset-0 z-[60] flex justify-end" role="dialog" aria-modal="true" aria-label="Messages">
          <div aria-hidden onClick={() => setChatOpen(false)} className="absolute inset-0 hidden bg-ink/40 backdrop-blur-[2px] sm:block" />
          <div className="relative flex h-full w-full flex-col bg-white shadow-2xl sm:w-[26rem]">
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-3">
              <div className="flex-1">
                <h2 className="font-bold">Messages</h2>
                <p className="text-xs text-ink-soft">With {ADMIN_NAME}</p>
              </div>
              <button type="button" onClick={() => setChatOpen(false)} className="rounded-full px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50">
                Done
              </button>
            </div>
            {chat(true, "flex-1 min-h-0")}
          </div>
        </div>
      )}
    </div>
  );
}
