"use client";

import { useCallback, useState } from "react";
import { itemDone, progress } from "../../lib/onboarding/progress";
import type { Item, PortalState } from "../../lib/onboarding/types";
import ChatPanel from "../components/ChatPanel";
import ContactEmail from "./ContactEmail";
import { ItemShell, ProgressBar, SaveIndicator } from "../components/ItemView";
import QuestionField from "../components/QuestionField";
import UploadArea from "../components/UploadArea";
import PlanDrawer from "../components/PlanDrawer";
import { countPlanChanges } from "../components/PlanView";
import { useMediaQuery } from "../components/useMediaQuery";
import { usePortal } from "../components/usePortal";

const ADMIN_NAME = "Ryan";

export default function OnboardingPortal({ initial, preview = false }: { initial: PortalState; preview?: boolean }) {
  const slug = initial.client.slug;
  const api = `/api/start/${slug}`;
  const { state, refresh, post, saveAnswer, setTask, status, lastError } = usePortal(initial, { stateUrl: api, postUrl: api });
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [chatOpen, setChatOpen] = useState(false);
  const [planOpen, setPlanOpen] = useState(false);
  // When the client last looked at the plan before this visit. Captured on the
  // first open so the New / Removed labels stay put while they read, even
  // though the server now records this visit as their latest look.
  const [planBaseline, setPlanBaseline] = useState<number | null | undefined>(undefined);

  const first = state.client.name.split(/\s+/)[0];
  const overall = progress(state.items, state);
  const allDone = overall.total > 0 && overall.done === overall.total;

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
  const livePlan = state.plan.filter((p) => p.removedAt === null);
  const planChanges = countPlanChanges(state.plan, state.planSeenAt);
  const planNeverSeen = state.planSeenAt === null && livePlan.length > 0;
  const hasPlan = livePlan.length > 0 || planChanges > 0;
  const planBadge = planNeverSeen ? "New" : planChanges > 0 ? String(planChanges) : null;

  const openPlan = () => {
    if (planBaseline === undefined) setPlanBaseline(state.planSeenAt);
    setPlanOpen(true);
    void post({ action: "planSeen" }).then(refresh);
  };
  const closePlan = useCallback(() => setPlanOpen(false), []);

  const onRead = useCallback(() => {
    void post({ action: "read" }).then(refresh);
  }, [post, refresh]);

  const renderItem = (item: Item) => {
    const done = itemDone(item, state);
    const titleId = `q-${item.id}`;
    if (item.kind === "question") {
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help}>
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
          badge={task?.done && task.doneBy === "admin" ? <span className="ml-2 text-xs font-medium text-emerald-600 no-underline">({ADMIN_NAME} checked this off)</span> : null}
        />
      );
    }
    if (item.kind === "upload") {
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help}>
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
        {item.title && <p className="font-semibold">{item.title}</p>}
        {item.help && <p className="mt-1 whitespace-pre-wrap text-ink-soft">{item.help}</p>}
      </div>
    );
  };

  const chat = (active: boolean) => (
    <ChatPanel
      messages={state.messages}
      viewer="client"
      otherName={ADMIN_NAME}
      unread={state.unread}
      active={active}
      onSend={onSend}
      onRead={onRead}
      emptyText={`Questions about anything here? Send ${ADMIN_NAME} a message. You'll get an email when there's a reply.`}
      className="h-full"
      readOnly={preview}
    />
  );

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
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-8">
        <div className="min-w-0">
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
                <strong className="font-semibold text-white">Keep this link private.</strong> It works as the passcode to your project
                information, so please don&rsquo;t post it on social media, review sites, or anywhere public.
              </span>
            </p>
            {hasPlan && (
              <button
                type="button"
                onClick={openPlan}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm transition hover:bg-violet-50"
              >
                <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4">
                  <path d="M4 5h12M4 10h8M4 15h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                See the project plan
                {planBadge && <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[11px] font-bold text-white">{planBadge}</span>}
              </button>
            )}
            {overall.total > 0 && (
              <div className="mt-6">
                {/* The percentage sits with the count, not at the bar's far end,
                    where it read as a marker for how far along things are. */}
                <p className="mb-2 text-sm font-medium">
                  {allDone ? (
                    "All done. Thank you!"
                  ) : (
                    <>
                      {overall.done} of {overall.total} done{" "}
                      <span className="text-violet-200">· {Math.round((overall.done / overall.total) * 100)}%</span>
                    </>
                  )}
                </p>
                <ProgressBar done={overall.done} total={overall.total} tone="light" />
              </div>
            )}
            {state.client.email && !preview && <ContactEmail email={state.client.email} onSave={saveEmail} />}
          </header>

          {!state.client.email && !preview && <ContactEmail email="" onSave={saveEmail} />}

          {state.sections.length > 1 && (
            <nav aria-label="Sections" className="-mx-4 mt-5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              <ul className="flex gap-2 pb-1">
                {state.sections.map((s) => {
                  const p = progress(state.items.filter((i) => i.sectionId === s.id), state);
                  const complete = p.total > 0 && p.done === p.total;
                  return (
                    <li key={s.id} className="shrink-0">
                      <a
                        href={`#section-${s.id}`}
                        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition hover:border-violet-400 ${
                          complete ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-ink/10 bg-white text-ink"
                        }`}
                      >
                        {complete && (
                          <svg viewBox="0 0 16 16" aria-hidden className="h-3.5 w-3.5 text-emerald-600">
                            <path d="m3.5 8.5 3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                        {s.title}
                        {p.total > 0 && !complete && <span className="text-xs text-ink-soft">{p.done}/{p.total}</span>}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          )}

          <div className="mt-5 space-y-5">
            {state.sections.map((s) => {
              const items = state.items.filter((i) => i.sectionId === s.id);
              if (!items.length) return null;
              const p = progress(items, state);
              return (
                <section key={s.id} id={`section-${s.id}`} className="scroll-mt-28 rounded-3xl border border-ink/10 bg-white px-5 pt-6 shadow-sm sm:px-7">
                  <div className="flex items-center gap-4">
                    <h2 className="flex-1 text-xl font-bold tracking-tight">{s.title}</h2>
                    {p.total > 0 && (
                      <span className={`text-sm font-medium ${p.done === p.total ? "text-emerald-600" : "text-ink-soft"}`}>
                        {p.done} of {p.total}
                      </span>
                    )}
                  </div>
                  {p.total > 0 && <ProgressBar done={p.done} total={p.total} className="mt-3 h-1.5" />}
                  <div className="divide-y divide-ink/10">{items.map(renderItem)}</div>
                </section>
              );
            })}

            <section className="rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm sm:px-7">
              <h2 className="text-xl font-bold tracking-tight">Anything else to share?</h2>
              <p className="mt-1 text-sm text-ink-soft">Extra photos, videos, documents: drop them here any time.</p>
              <div className="mt-4">
                <UploadArea
                  slug={slug}
                  itemId={null}
                  files={state.files.filter((f) => f.itemId === null)}
                  canUpload={!preview}
                  canRemove={(f) => !preview && f.uploadedBy === "client"}
                  register={post}
                  removeFile={(fileId) => post({ action: "deleteFile", fileId })}
                  onChange={refresh}
                />
              </div>
            </section>
          </div>
        </div>

        {/* Desktop: chat column */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex h-[calc(100dvh-9rem)] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm">
            <div className="border-b border-ink/10 px-5 py-4">
              <h2 className="font-bold">Messages</h2>
              <p className="text-xs text-ink-soft">With {ADMIN_NAME}. You&rsquo;ll get an email when there&rsquo;s a reply.</p>
            </div>
            {chat(desktop)}
          </div>
        </aside>
      </div>

      <div className={`fixed left-4 z-30 lg:bottom-4 ${hasPlan ? "bottom-20" : "bottom-4"}`}>
        {!preview && <SaveIndicator status={status} error={lastError} />}
      </div>

      {/* The plan: a tab on the left edge (desktop) or a button (phones) flies it in from the left. */}
      {hasPlan && (
        <button
          type="button"
          onClick={openPlan}
          aria-label={`Project plan${planBadge ? ` (${planNeverSeen ? "new" : `${planChanges} changes`})` : ""}`}
          className={`fixed z-40 inline-flex items-center gap-2 font-semibold text-white shadow-lg shadow-violet-700/25 transition ${
            desktop
              ? "left-0 top-1/2 -translate-y-1/2 flex-col rounded-r-2xl bg-violet-700 px-2.5 py-4 hover:pl-3.5"
              : "bottom-4 left-4 rounded-full bg-indigo-700 px-5 py-3"
          }`}
        >
          <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5 shrink-0">
            <path d="M4 5h12M4 10h8M4 15h10" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
          <span className={desktop ? "text-sm [writing-mode:vertical-rl] rotate-180" : ""}>{desktop ? "Project plan" : "Plan"}</span>
          {planBadge && <span className="rounded-full bg-emerald-400 px-1.5 py-0.5 text-[11px] font-bold leading-none text-emerald-950">{planBadge}</span>}
        </button>
      )}
      <PlanDrawer
        open={planOpen}
        onClose={closePlan}
        plan={state.plan}
        seen={planBaseline === undefined ? state.planSeenAt : planBaseline}
        changes={countPlanChanges(state.plan, planBaseline === undefined ? state.planSeenAt : planBaseline)}
      />

      {/* Phones and tablets: chat button and drawer */}
      {!desktop && (
        <>
          <button
            type="button"
            onClick={() => setChatOpen(true)}
            className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-600/30 lg:hidden"
          >
            <svg viewBox="0 0 20 20" aria-hidden className="h-5 w-5">
              <path d="M4 4.5h12a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H9l-4 3v-3H4a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            </svg>
            Messages
            {state.unread > 0 && <span className="rounded-full bg-white px-2 py-0.5 text-xs font-bold text-violet-700">{state.unread}</span>}
          </button>
          {chatOpen && (
            <div className="fixed inset-0 z-50 flex flex-col bg-white lg:hidden" role="dialog" aria-modal="true" aria-label="Messages">
              <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-3">
                <div className="flex-1">
                  <h2 className="font-bold">Messages</h2>
                  <p className="text-xs text-ink-soft">With {ADMIN_NAME}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setChatOpen(false)}
                  className="rounded-full px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
                >
                  Done
                </button>
              </div>
              {chat(true)}
            </div>
          )}
        </>
      )}
    </div>
  );
}
