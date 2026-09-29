"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import FileDropzone from "./FileDropzone";
import Turnstile, { turnstileEnabled } from "./Turnstile";
import { IconArrowRight, IconClose } from "./icons";
import { useFileUploads } from "./useFileUploads";
import { BUSINESS_EMAIL, BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../lib/business";
import { SERVICES, type Field } from "../lib/quote-services";

// Step indexes, in order.
const STEP_SERVICE = 0;
const STEP_QUESTIONS = 1;
const STEP_FILES = 2;
const STEP_CONTACT = 3;

type Answers = Record<string, string | string[]>;
type ContactInfo = { name: string; email: string; phone: string; notes: string };
const EMPTY_CONTACT: ContactInfo = { name: "", email: "", phone: "", notes: "" };

export default function QuoteModal({
  triggerClassName,
  initialServiceId,
  children,
}: {
  triggerClassName?: string;
  /** Opens the form with this service already chosen, skipping the "What do you need?" step. */
  initialServiceId?: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [contact, setContact] = useState<ContactInfo>(EMPTY_CONTACT);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  // Bumped after each send attempt: a Turnstile token only works once, so a
  // retry needs a fresh widget (and a fresh token).
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const uploads = useFileUploads();
  const headingId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const service = SERVICES.find((s) => s.id === serviceId) ?? null;
  const stepCount = 4;

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
    setStep(0);
    setServiceId(null);
    setAnswers({});
    setContact(EMPTY_CONTACT);
    setSubmitted(false);
    setSending(false);
    setSendError(null);
    setTurnstileToken("");
    setHoneypot("");
    uploads.reset();
  }

  // Lets the Escape handler below always call the latest close().
  const closeFnRef = useRef(close);
  useEffect(() => {
    closeFnRef.current = close;
  });

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeFnRef.current();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function updateAnswer(id: string, value: string) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  function toggleCheckbox(id: string, option: string) {
    setAnswers((prev) => {
      const current = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const next = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [id]: next };
    });
  }

  async function handleSubmit() {
    if (!service) return;
    setSending(true);
    setSendError(null);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          answers,
          contact,
          files: uploads.uploaded.map((i) => ({ key: i.key, name: i.file.name, size: i.file.size })),
          turnstileToken,
          website: honeypot,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Your request couldn't be sent.");
      setSubmitted(true);
    } catch (err) {
      setSendError(err instanceof Error ? err.message : "Your request couldn't be sent.");
      setTurnstileToken("");
      setTurnstileKey((k) => k + 1);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <button ref={triggerRef} type="button" className={triggerClassName} onClick={() => {
          if (initialServiceId) {
            setServiceId(initialServiceId);
            setStep(1);
          }
          setOpen(true);
        }}
      >
        {children}
      </button>

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-paper p-6 text-ink shadow-2xl sm:p-8"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 rounded-full p-1.5 text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <IconClose className="h-5 w-5" />
            </button>

            {submitted ? (
              <div className="py-8 text-center">
                <h2 id={headingId} className="text-2xl font-bold">
                  Thanks — got it!
                </h2>
                <p className="mt-3 text-ink-soft">
                  I&rsquo;ll take a look and reply with a quote and timeline soon.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn-shine relative mt-8 overflow-hidden rounded-full bg-ink px-7 py-3 text-sm font-semibold text-paper shadow-lg"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-1.5 pr-8">
                  {Array.from({ length: stepCount }).map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-violet-600" : "bg-ink/10"}`}
                    />
                  ))}
                </div>

                <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-violet-600">
                  Step {step + 1} of {stepCount}
                </p>
                <h2 id={headingId} className="mt-1 pr-8 text-2xl font-bold tracking-tight">
                  {step === STEP_SERVICE && "What do you need?"}
                  {step === STEP_QUESTIONS && service?.label}
                  {step === STEP_FILES && "Have files to share?"}
                  {step === STEP_CONTACT && "How can I reach you?"}
                </h2>

                <div className="mt-6 space-y-5">
                  {step === STEP_SERVICE && (
                    <div className="grid gap-3 sm:grid-cols-2">
                      {SERVICES.map((s) => {
                        const Icon = s.icon;
                        const active = s.id === serviceId;
                        return (
                          <button
                            key={s.id}
                            type="button"
                            onClick={() => setServiceId(s.id)}
                            className={`flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors ${
                              active ? "border-violet-600 bg-violet-50" : "border-ink/10 hover:border-ink/25"
                            }`}
                          >
                            <Icon className="h-6 w-6 text-violet-600" />
                            <span className="text-sm font-semibold">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {step === STEP_QUESTIONS && service && (
                    <div className="space-y-5">
                      {service.questions.map((q) => (
                        <QuestionField
                          key={q.id}
                          field={q}
                          value={answers[q.id]}
                          onChange={(v) => updateAnswer(q.id, v)}
                          onToggle={(opt) => toggleCheckbox(q.id, opt)}
                        />
                      ))}
                    </div>
                  )}

                  {step === STEP_FILES && service && (
                    <FileDropzone
                      items={uploads.items}
                      hint={`Optional — ${service.fileHint}`}
                      onAdd={uploads.addFiles}
                      onRemove={uploads.remove}
                      onRetry={uploads.retry}
                    />
                  )}

                  {step === STEP_CONTACT && (
                    <div className="space-y-4">
                      <TextInput
                        label="Name"
                        required
                        value={contact.name}
                        onChange={(v) => setContact((c) => ({ ...c, name: v }))}
                      />
                      <TextInput
                        label="Email"
                        type="email"
                        required
                        value={contact.email}
                        onChange={(v) => setContact((c) => ({ ...c, email: v }))}
                      />
                      <TextInput
                        label="Phone (optional)"
                        type="tel"
                        value={contact.phone}
                        onChange={(v) => setContact((c) => ({ ...c, phone: v }))}
                      />
                      <TextAreaInput
                        label="Anything else I should know?"
                        value={contact.notes}
                        onChange={(v) => setContact((c) => ({ ...c, notes: v }))}
                      />
                      {/* Honeypot: hidden from people, filled in by bots. */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />
                      <Turnstile key={turnstileKey} onToken={setTurnstileToken} />
                      {uploads.uploading && (
                        <p className="text-sm text-ink-soft">Your files are still uploading — you can send once they finish.</p>
                      )}
                      {sendError && (
                        <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">
                          {sendError} You can also call{" "}
                          <a href={BUSINESS_PHONE_TEL} className="font-semibold underline">
                            {BUSINESS_PHONE_DISPLAY}
                          </a>{" "}
                          or email{" "}
                          <a href={`mailto:${BUSINESS_EMAIL}`} className="font-semibold underline">
                            {BUSINESS_EMAIL}
                          </a>
                          .
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-8 flex items-center justify-between">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep((s) => s - 1)}
                      className="text-sm font-semibold text-ink-soft hover:text-ink"
                    >
                      Back
                    </button>
                  ) : (
                    <span />
                  )}

                  {step < stepCount - 1 ? (
                    <button
                      type="button"
                      disabled={step === STEP_SERVICE && !serviceId}
                      onClick={() => setStep((s) => s + 1)}
                      className="btn-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {step === STEP_FILES && uploads.items.length === 0 ? "Skip for now" : "Next"}
                      <IconArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={
                        !contact.name ||
                        !contact.email ||
                        sending ||
                        uploads.uploading ||
                        (turnstileEnabled && !turnstileToken)
                      }
                      onClick={handleSubmit}
                      className="btn-shine relative overflow-hidden rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-amber-500 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition-transform enabled:hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      {sending ? "Sending…" : "Send request"}
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
          </div>,
          document.body
        )}
    </>
  );
}

function QuestionField({
  field,
  value,
  onChange,
  onToggle,
}: {
  field: Field;
  value: string | string[] | undefined;
  onChange: (value: string) => void;
  onToggle: (option: string) => void;
}) {
  if (field.type === "text") {
    return (
      <TextInput label={field.label} placeholder={field.placeholder} value={(value as string) ?? ""} onChange={onChange} />
    );
  }

  if (field.type === "url") {
    return (
      <UrlInput label={field.label} placeholder={field.placeholder} value={(value as string) ?? ""} onChange={onChange} />
    );
  }

  if (field.type === "textarea") {
    return (
      <TextAreaInput label={field.label} placeholder={field.placeholder} value={(value as string) ?? ""} onChange={onChange} />
    );
  }

  if (field.type === "select") {
    return (
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-ink">{field.label}</span>
        <select
          value={(value as string) ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-violet-500 focus:outline-none"
        >
          <option value="" disabled>
            Select one
          </option>
          {field.options?.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </label>
    );
  }

  if (field.type === "radio") {
    return (
      <fieldset>
        <legend className="mb-1.5 text-sm font-medium text-ink">{field.label}</legend>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((o) => (
            <button
              type="button"
              key={o}
              onClick={() => onChange(o)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                value === o ? "border-violet-600 bg-violet-50 text-violet-700" : "border-ink/15 text-ink-soft hover:border-ink/30"
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  const selected = Array.isArray(value) ? value : [];
  return (
    <fieldset>
      <legend className="mb-1.5 text-sm font-medium text-ink">{field.label}</legend>
      <div className="flex flex-wrap gap-2">
        {field.options?.map((o) => (
          <button
            type="button"
            key={o}
            onClick={() => onToggle(o)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              selected.includes(o) ? "border-violet-600 bg-violet-50 text-violet-700" : "border-ink/15 text-ink-soft hover:border-ink/30"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function TextInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-fuchsia-600"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-violet-500 focus:outline-none"
      />
    </label>
  );
}

const URL_PREFIX = "https://";

/** Text input with a fixed "https://" prefix — the visitor types just the domain, the stored value is the full URL. */
function UrlInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const domain = value.replace(/^https?:\/\//i, "");
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <div className="flex w-full items-center rounded-xl border border-ink/15 bg-white text-sm focus-within:border-violet-500">
        <span className="select-none pl-3.5 text-ink-soft">{URL_PREFIX}</span>
        <input
          type="text"
          inputMode="url"
          autoComplete="url"
          autoCapitalize="none"
          spellCheck={false}
          value={domain}
          placeholder={placeholder}
          onChange={(e) => {
            // Strip any protocol the visitor types or pastes so it isn't doubled up.
            const typed = e.target.value.trim().replace(/^https?:\/\//i, "");
            onChange(typed ? URL_PREFIX + typed : "");
          }}
          className="min-w-0 flex-1 rounded-r-xl bg-transparent py-2.5 pr-3.5 text-ink focus:outline-none"
        />
      </div>
    </label>
  );
}

function TextAreaInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full rounded-xl border border-ink/15 bg-white px-3.5 py-2.5 text-sm text-ink focus:border-violet-500 focus:outline-none"
      />
    </label>
  );
}
