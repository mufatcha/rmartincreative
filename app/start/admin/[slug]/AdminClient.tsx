"use client";

import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";
import { answerText, itemDone, progress } from "../../../lib/onboarding/progress";
import { KIND_LABELS, type AdminPortalState, type Item, type Section } from "../../../lib/onboarding/types";
import ChatPanel from "../../components/ChatPanel";
import { ItemShell, ProgressBar, SaveIndicator } from "../../components/ItemView";
import QuestionField from "../../components/QuestionField";
import UploadArea from "../../components/UploadArea";
import { usePortal } from "../../components/usePortal";
import ItemEditor, { type ItemDraft } from "../ItemEditor";
import PlanEditor from "../PlanEditor";

export function ago(t: number | null): string {
  if (!t) return "never";
  const s = Math.round((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} hr ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} days ago`;
  return new Date(t).toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" });
}

function IconButton({ label, onClick, children, danger }: { label: string; onClick: () => void; children: ReactNode; danger?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-7 w-7 items-center justify-center rounded-full text-ink-soft transition hover:bg-paper-tint ${danger ? "hover:text-rose-600" : "hover:text-ink"}`}
    >
      {children}
    </button>
  );
}

const icons = {
  up: <path d="M10 15V5m0 0-4 4m4-4 4 4" />,
  down: <path d="M10 5v10m0 0-4-4m4 4 4-4" />,
  edit: <path d="M4 16h3l8.5-8.5a2.1 2.1 0 0 0-3-3L4 13v3Z" />,
  trash: <path d="M5 6h10M8 6V4.5h4V6m-6 0 .6 9.5h6.8L14 6" />,
};
const Icon = ({ d }: { d: keyof typeof icons }) => (
  <svg viewBox="0 0 20 20" aria-hidden className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {icons[d]}
  </svg>
);

const input =
  "w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-200";

export default function AdminClient({ initial, siteUrl }: { initial: AdminPortalState; siteUrl: string }) {
  const slug = initial.client.slug;
  const { state, refresh, post, saveAnswer, setTask, status, lastError } = usePortal(initial, {
    stateUrl: `/api/start/admin?slug=${encodeURIComponent(slug)}`,
    postUrl: "/api/start/admin",
    extra: { slug },
  });
  const [editing, setEditing] = useState<string | null>(null); // "item-3", "add-5", "section-2", "add-section"
  const [tab, setTab] = useState<"chat" | "activity">("chat");
  const [copied, setCopied] = useState(false);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteNote, setInviteNote] = useState("");
  const [notice, setNotice] = useState<string | null>(null);

  const link = `${siteUrl}/start/${slug}`;
  const overall = progress(state.items, state);
  const first = state.client.name.split(/\s+/)[0];

  const act = useCallback(
    async (body: Record<string, unknown>) => {
      const res = await post(body);
      await refresh();
      return res;
    },
    [post, refresh]
  );

  const onSend = useCallback((body: string) => act({ action: "message", body }), [act]);
  const onRead = useCallback(() => void act({ action: "read" }), [act]);

  const saveClientField = (field: "name" | "email" | "intro", value: string) => {
    if (value === (field === "email" ? state.admin.email : state.client[field])) return;
    void act({ action: "updateClient", [field]: value });
  };

  const saveItem = async (draft: ItemDraft, item?: Item) => {
    const res = await act(item ? { action: "updateItem", id: item.id, ...draft } : { action: "addItem", ...draft });
    if (!res.error) setEditing(null);
    return res;
  };

  const renderItem = (item: Item, section: Section) => {
    if (editing === `item-${item.id}`) {
      return (
        <ItemEditor
          key={item.id}
          item={item}
          sectionId={section.id}
          sections={state.sections}
          onSave={(d) => saveItem(d, item)}
          onCancel={() => setEditing(null)}
        />
      );
    }
    const done = itemDone(item, state);
    const tools = (
      <div className="flex shrink-0 items-center">
        <IconButton label="Move up" onClick={() => void act({ action: "moveItem", id: item.id, dir: -1 })}>
          <Icon d="up" />
        </IconButton>
        <IconButton label="Move down" onClick={() => void act({ action: "moveItem", id: item.id, dir: 1 })}>
          <Icon d="down" />
        </IconButton>
        <IconButton label="Edit" onClick={() => setEditing(`item-${item.id}`)}>
          <Icon d="edit" />
        </IconButton>
        <IconButton
          label="Delete"
          danger
          onClick={() => {
            if (window.confirm(`Delete “${item.title || "this note"}”? Any answer stays in the database but is hidden.`)) {
              void act({ action: "updateItem", id: item.id, archived: true });
            }
          }}
        >
          <Icon d="trash" />
        </IconButton>
      </div>
    );
    const badge = <span className="ml-2 rounded-full bg-paper-tint px-2 py-0.5 align-middle text-[11px] font-semibold text-ink-soft">{KIND_LABELS[item.kind]}</span>;
    const titleId = `q-${item.id}`;

    if (item.kind === "question") {
      const r = state.responses[item.id];
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help} badge={badge} tools={tools}>
          <QuestionField item={item} value={r?.value} onSave={(v, o) => void saveAnswer(item.id, v, o)} />
          {r && answerText(r.value) && <p className="mt-1.5 text-xs text-ink-soft">Updated {ago(r.updatedAt)}</p>}
        </ItemShell>
      );
    }
    if (item.kind === "task") {
      const t = state.tasks[item.id];
      return (
        <ItemShell
          key={item.id}
          done={done}
          onToggle={() => void setTask(item.id, !done)}
          title={item.title}
          titleId={titleId}
          help={item.help}
          badge={
            <>
              {badge}
              {t?.done && <span className="ml-2 text-xs font-medium text-emerald-600">by {t.doneBy === "admin" ? "you" : first}, {ago(t.updatedAt)}</span>}
            </>
          }
          tools={tools}
        />
      );
    }
    if (item.kind === "upload") {
      return (
        <ItemShell key={item.id} done={done} title={item.title} titleId={titleId} help={item.help} badge={badge} tools={tools}>
          <UploadArea
            slug={slug}
            itemId={item.id}
            files={state.files.filter((f) => f.itemId === item.id)}
            canUpload={false}
            canRemove={() => true}
            register={post}
            removeFile={(fileId) => post({ action: "deleteFile", fileId })}
            onChange={refresh}
          />
          {!state.files.some((f) => f.itemId === item.id) && <p className="text-sm text-ink-soft">Nothing uploaded yet.</p>}
        </ItemShell>
      );
    }
    return (
      <div key={item.id} className="my-4 flex gap-3 rounded-2xl bg-violet-50 px-5 py-4 text-[15px]">
        <div className="min-w-0 flex-1">
          {item.title && <p className="font-semibold">{item.title}</p>}
          {item.help && <p className="mt-1 whitespace-pre-wrap text-ink-soft">{item.help}</p>}
        </div>
        {tools}
      </div>
    );
  };

  return (
    <div className="pb-28 pt-28 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:grid lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-8">
        <div className="min-w-0">
          <Link href="/start/admin" className="text-sm font-medium text-violet-700 hover:text-violet-800">
            &larr; All clients
          </Link>

          <header className="mt-3 rounded-3xl border border-ink/10 bg-white p-5 shadow-sm sm:p-7">
            <div className="flex flex-wrap items-start gap-3">
              <input
                key={`name-${state.client.name}`}
                defaultValue={state.client.name}
                onBlur={(e) => saveClientField("name", e.target.value)}
                aria-label="Client name"
                className="min-w-0 flex-1 rounded-lg bg-transparent px-1 py-0.5 text-2xl font-bold tracking-tight outline-none hover:bg-paper-tint focus:bg-paper-tint sm:text-3xl"
              />
              <SaveIndicator status={status} error={lastError} />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <code className="min-w-0 max-w-full truncate rounded-lg bg-paper-tint px-3 py-2 text-sm">{link}</code>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(link);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
              >
                {copied ? "Copied" : "Copy link"}
              </button>
              <a href={`/start/${slug}`} target="_blank" rel="noopener" className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:border-violet-400">
                Open as client
              </a>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="client-email" className="mb-1 block text-xs font-semibold text-ink-soft">
                  Client email (for notifications)
                </label>
                <input
                  id="client-email"
                  key={`email-${state.admin.email}`}
                  type="email"
                  defaultValue={state.admin.email}
                  onBlur={(e) => saveClientField("email", e.target.value.trim())}
                  placeholder="Leave blank: they can add it on their page"
                  className={input}
                />
              </div>
              <div className="text-sm text-ink-soft sm:pt-5">
                <p>
                  Last opened: <strong className="text-ink">{ago(state.admin.lastSeenAt)}</strong>
                </p>
                <p>
                  Invite: <strong className="text-ink">{state.admin.invitedAt ? `sent ${ago(state.admin.invitedAt)}` : "not sent"}</strong>
                </p>
              </div>
            </div>

            <div className="mt-4">
              {inviteOpen ? (
                <div className="space-y-2 rounded-2xl bg-paper-tint/70 p-4">
                  <label htmlFor="invite-note" className="block text-xs font-semibold text-ink-soft">
                    Personal note for the invite email (optional)
                  </label>
                  <textarea id="invite-note" rows={2} value={inviteNote} onChange={(e) => setInviteNote(e.target.value)} className={`${input} field-sizing-content min-h-16`} />
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const res = await act({ action: "invite", note: inviteNote });
                        setNotice(res.error ?? `Invite sent to ${state.admin.email}.`);
                        if (!res.error) setInviteOpen(false);
                      }}
                      className="rounded-full bg-violet-600 px-4 py-2 text-sm font-semibold text-white hover:bg-violet-700"
                    >
                      Send invite
                    </button>
                    <button type="button" onClick={() => setInviteOpen(false)} className="px-3 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : state.admin.email ? (
                <button type="button" onClick={() => setInviteOpen(true)} className="text-sm font-semibold text-violet-700 hover:text-violet-800">
                  {state.admin.invitedAt ? "Resend invite email" : "Email the link to the client"}
                </button>
              ) : (
                <p className="text-sm text-ink-soft">No email yet: share the link yourself. The page asks the client for their email, and their notifications start once they open it.</p>
              )}
              {notice && <p className="mt-2 text-sm text-emerald-700">{notice}</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="client-intro" className="mb-1 block text-xs font-semibold text-ink-soft">
                Welcome note at the top of their page (blank uses the default)
              </label>
              <textarea
                id="client-intro"
                key={`intro-${state.client.intro}`}
                rows={2}
                defaultValue={state.client.intro}
                onBlur={(e) => saveClientField("intro", e.target.value)}
                className={`${input} field-sizing-content min-h-16`}
              />
            </div>

            {overall.total > 0 && (
              <div className="mt-5">
                <p className="mb-1.5 text-sm font-medium">
                  {overall.done} of {overall.total} done{" "}
                  <span className="text-ink-soft">· {Math.round((overall.done / overall.total) * 100)}%</span>
                </p>
                <ProgressBar done={overall.done} total={overall.total} />
              </div>
            )}
          </header>

          <div className="mt-5 space-y-5">
            <PlanEditor plan={state.plan} planSeenAt={state.planSeenAt} clientFirst={first} act={act} ago={ago} />

            {state.sections.length === 0 && (
              <div className="rounded-3xl border-2 border-dashed border-ink/15 p-8 text-center">
                <p className="font-semibold">This page is empty.</p>
                <p className="mt-1 text-sm text-ink-soft">Start from the standard kickoff questions, or add your own sections.</p>
                <button
                  type="button"
                  onClick={() => void act({ action: "template" })}
                  className="mt-4 rounded-full bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Add starter sections
                </button>
              </div>
            )}

            {state.sections.map((s) => {
              const items = state.items.filter((i) => i.sectionId === s.id);
              const p = progress(items, state);
              return (
                <section key={s.id} className="rounded-3xl border border-ink/10 bg-white px-5 pt-5 shadow-sm sm:px-7">
                  <div className="flex items-center gap-2">
                    {editing === `section-${s.id}` ? (
                      <form
                        className="flex flex-1 gap-2"
                        onSubmit={async (e) => {
                          e.preventDefault();
                          const title = new FormData(e.currentTarget).get("title");
                          const res = await act({ action: "updateSection", id: s.id, title });
                          if (!res.error) setEditing(null);
                        }}
                      >
                        <input name="title" autoFocus defaultValue={s.title} aria-label="Section title" className={input} />
                        <button className="rounded-full bg-violet-600 px-4 text-sm font-semibold text-white">Save</button>
                      </form>
                    ) : (
                      <h2 className="flex-1 text-xl font-bold tracking-tight">{s.title}</h2>
                    )}
                    {p.total > 0 && <span className="text-sm font-medium text-ink-soft">{p.done} of {p.total}</span>}
                    <IconButton label="Move section up" onClick={() => void act({ action: "moveSection", id: s.id, dir: -1 })}>
                      <Icon d="up" />
                    </IconButton>
                    <IconButton label="Move section down" onClick={() => void act({ action: "moveSection", id: s.id, dir: 1 })}>
                      <Icon d="down" />
                    </IconButton>
                    <IconButton label="Rename section" onClick={() => setEditing(`section-${s.id}`)}>
                      <Icon d="edit" />
                    </IconButton>
                    <IconButton
                      label="Delete section"
                      danger
                      onClick={() => {
                        if (window.confirm(`Delete the “${s.title}” section and everything in it?`)) void act({ action: "updateSection", id: s.id, archived: true });
                      }}
                    >
                      <Icon d="trash" />
                    </IconButton>
                  </div>
                  {p.total > 0 && <ProgressBar done={p.done} total={p.total} className="mt-3 h-1.5" />}
                  <div className="divide-y divide-ink/10">{items.map((i) => renderItem(i, s))}</div>
                  <div className="pb-5 pt-2">
                    {editing === `add-${s.id}` ? (
                      <ItemEditor sectionId={s.id} sections={state.sections} onSave={(d) => saveItem(d)} onCancel={() => setEditing(null)} />
                    ) : (
                      <button type="button" onClick={() => setEditing(`add-${s.id}`)} className="text-sm font-semibold text-violet-700 hover:text-violet-800">
                        + Add question, task, or request
                      </button>
                    )}
                  </div>
                </section>
              );
            })}

            {editing === "add-section" ? (
              <form
                className="flex gap-2 rounded-3xl border border-ink/10 bg-white p-5"
                onSubmit={async (e) => {
                  e.preventDefault();
                  const res = await act({ action: "addSection", title: new FormData(e.currentTarget).get("title") });
                  if (!res.error) setEditing(null);
                }}
              >
                <input name="title" autoFocus placeholder="Section title" aria-label="Section title" className={input} />
                <button className="shrink-0 rounded-full bg-violet-600 px-4 text-sm font-semibold text-white">Add section</button>
                <button type="button" onClick={() => setEditing(null)} className="px-2 text-sm text-ink-soft">
                  Cancel
                </button>
              </form>
            ) : (
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => setEditing("add-section")} className="rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold hover:border-violet-400">
                  + Add section
                </button>
                {state.sections.length > 0 && (
                  <button type="button" onClick={() => void act({ action: "template" })} className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:text-ink">
                    Add starter sections
                  </button>
                )}
              </div>
            )}

            <section className="rounded-3xl border border-ink/10 bg-white px-5 py-6 shadow-sm sm:px-7">
              <h2 className="text-xl font-bold tracking-tight">General files</h2>
              <p className="mt-1 text-sm text-ink-soft">Uploads from &ldquo;Anything else to share?&rdquo;</p>
              <div className="mt-4">
                <UploadArea
                  slug={slug}
                  itemId={null}
                  files={state.files.filter((f) => f.itemId === null)}
                  canUpload={false}
                  canRemove={() => true}
                  register={post}
                  removeFile={(fileId) => post({ action: "deleteFile", fileId })}
                  onChange={refresh}
                />
                {!state.files.some((f) => f.itemId === null) && <p className="text-sm text-ink-soft">Nothing yet.</p>}
              </div>
            </section>

            <label className="flex items-center gap-2 text-sm text-ink-soft">
              <input
                type="checkbox"
                checked={state.admin.archived}
                onChange={(e) => void act({ action: "updateClient", archived: e.target.checked })}
              />
              Archived (the client&rsquo;s link stops working)
            </label>
          </div>
        </div>

        <aside className="mt-8 lg:mt-0">
          <div className="flex h-[70dvh] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm lg:sticky lg:top-28 lg:h-[calc(100dvh-9rem)]">
            <div className="flex border-b border-ink/10" role="tablist">
              {(["chat", "activity"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`flex-1 px-4 py-3 text-sm font-semibold ${tab === t ? "border-b-2 border-violet-600 text-ink" : "text-ink-soft"}`}
                >
                  {t === "chat" ? "Messages" : "Activity"}
                  {t === "chat" && state.unread > 0 && <span className="ml-1.5 rounded-full bg-violet-600 px-1.5 py-0.5 text-[11px] text-white">{state.unread}</span>}
                </button>
              ))}
            </div>
            {tab === "chat" ? (
              <ChatPanel
                messages={state.messages}
                viewer="admin"
                otherName={first}
                unread={state.unread}
                active
                onSend={onSend}
                onRead={onRead}
                emptyText={`No messages yet. ${first} gets an email a few minutes after you send one, unless they're on the page already.`}
                className="flex-1"
              />
            ) : (
              <ul className="flex-1 space-y-3 overflow-y-auto p-4 text-sm">
                {state.admin.events.length === 0 && <li className="text-ink-soft">Nothing yet.</li>}
                {state.admin.events.map((e) => (
                  <li key={e.id} className="flex gap-2">
                    <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${e.actor === "client" ? "bg-violet-500" : "bg-ink/25"}`} />
                    <div className="min-w-0">
                      <p className="break-words">
                        <strong>{e.actor === "client" ? first : "You"}</strong>: {e.summary}
                      </p>
                      <p className="text-xs text-ink-soft">{ago(e.createdAt)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
