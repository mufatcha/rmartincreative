// Shapes shared by the onboarding pages (app/start), their API routes, and the
// admin pages. Safe to import from client components.

export type Viewer = "client" | "admin";

export const ITEM_KINDS = ["question", "task", "upload", "note"] as const;
export type ItemKind = (typeof ITEM_KINDS)[number];

export const FIELD_TYPES = ["text", "textarea", "select", "radio", "checkboxes", "date", "url", "email", "phone"] as const;
export type FieldType = (typeof FIELD_TYPES)[number];

export const FIELD_TYPE_LABELS: Record<FieldType, string> = {
  text: "Short answer",
  textarea: "Long answer",
  select: "Dropdown",
  radio: "Pick one",
  checkboxes: "Pick any",
  date: "Date",
  url: "Web address",
  email: "Email",
  phone: "Phone",
};

export const KIND_LABELS: Record<ItemKind, string> = {
  question: "Question",
  task: "Checklist task",
  upload: "File request",
  note: "Info text",
};

/** A question's answer: text, or the picked options for "Pick any". */
export type AnswerValue = string | string[];

export type Section = { id: number; title: string; sort: number };

export type Item = {
  id: number;
  sectionId: number;
  kind: ItemKind;
  title: string;
  help: string;
  fieldType: FieldType;
  options: string[];
  sort: number;
  createdAt: number;
};

export type TaskState = { done: boolean; doneBy: Viewer; updatedAt: number };

export type PortalFile = {
  id: number;
  itemId: number | null;
  name: string;
  size: number;
  type: string;
  uploadedBy: Viewer;
  createdAt: number;
  /** Opens the file (a redirect to a short-lived R2 link). Add ?download=1 to save it. */
  url: string;
};

export type Message = { id: number; sender: Viewer; body: string; createdAt: number };

/** One uploaded version of a shared file. */
export type ReviewVersion = {
  /** The file's id (also its address: /api/start/<slug>/files/<id>). */
  id: number;
  /** 1, 2, 3… in upload order. */
  number: number;
  name: string;
  size: number;
  type: string;
  /** What changed in this version. */
  note: string;
  createdAt: number;
  url: string;
  /** For a shared link (Figma…): the link itself, and the iframe address when it can be embedded. */
  link: string | null;
  embed: string | null;
};

export type ReviewComment = {
  id: number;
  versionId: number;
  author: Viewer;
  body: string;
  /** Where on the image it's pinned, 0–1 from the left and top (null: not pinned). */
  pinX: number | null;
  pinY: number | null;
  resolved: boolean;
  createdAt: number;
};

export type ReviewDecision = {
  id: number;
  versionId: number;
  decision: "approved" | "changes";
  /** The name the client typed to approve. */
  name: string;
  note: string;
  createdAt: number;
};

/** waiting: needs the client's approval of the latest version · approved ·
 *  changes: client asked for changes · shared: no approval needed. */
export type ReviewStatus = "waiting" | "approved" | "changes" | "shared";

/** A file Ryan shares on the page, optionally for approval. */
export type Review = {
  id: number;
  title: string;
  note: string;
  needsApproval: boolean;
  createdAt: number;
  /** Oldest first; the last one is current. */
  versions: ReviewVersion[];
  comments: ReviewComment[];
  decisions: ReviewDecision[];
  status: ReviewStatus;
};

export const PLAN_STAGES = ["now", "next", "feature", "done"] as const;
export type PlanStage = (typeof PLAN_STAGES)[number];

export const PLAN_STAGE_LABELS: Record<PlanStage, { title: string; blurb: string }> = {
  now: { title: "Working on now", blurb: "What's in progress at the moment." },
  next: { title: "Up next", blurb: "What I'll start once the current work is done." },
  feature: { title: "Features you'll get", blurb: "What your finished project will include." },
  done: { title: "Finished", blurb: "Completed work." },
};

/** A note from Ryan: longer than a chat message, acknowledged by the client. */
export type Note = {
  id: number;
  title: string;
  body: string;
  /** YYYY-MM-DD, shown on the note. */
  date: string;
  createdAt: number;
  updatedAt: number;
  acknowledgedAt: number | null;
};

/** Unread: never acknowledged, or changed since. */
export const noteNeedsAck = (n: Note) => n.acknowledgedAt === null || n.updatedAt > n.acknowledgedAt;

export type PlanItem = {
  id: number;
  stage: PlanStage;
  title: string;
  detail: string;
  sort: number;
  createdAt: number;
  updatedAt: number;
  removedAt: number | null;
};

export type PortalState = {
  /** Bumped on every change (clients.changed_at). Polls send it back and get
   *  `{ unchanged: true }` when nothing changed, which costs one row read. */
  version: number;
  /** email: where reply notifications go. Ryan sets it, or the client adds it on the page. */
  client: { slug: string; name: string; intro: string; email: string };
  sections: Section[];
  items: Item[];
  responses: Record<number, { value: AnswerValue; updatedAt: number }>;
  tasks: Record<number, TaskState>;
  files: PortalFile[];
  messages: Message[];
  /** Messages from the other side the viewer hasn't seen yet. */
  unread: number;
  /** Includes removed items, so the client can see what came off since their last look. */
  plan: PlanItem[];
  /** When the client last opened the plan (null: never). */
  planSeenAt: number | null;
  /** Newest date first. */
  notes: Note[];
  /** Files shared for viewing or approval, newest first. */
  reviews: Review[];
};

export type ActivityEvent = {
  id: number;
  actor: Viewer;
  type: string;
  summary: string;
  createdAt: number;
};

export type AdminPortalState = PortalState & {
  admin: {
    email: string;
    archived: boolean;
    createdAt: number;
    invitedAt: number | null;
    /** Changes not emailed yet: they go out when Ryan presses "Share updates". */
    unshared: string[];
    lastSeenAt: number | null;
    events: ActivityEvent[];
  };
};

export type ClientSummary = {
  slug: string;
  name: string;
  email: string;
  archived: boolean;
  createdAt: number;
  lastSeenAt: number | null;
  done: number;
  total: number;
  unread: number;
  lastActivity: number | null;
};
