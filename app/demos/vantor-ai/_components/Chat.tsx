"use client";

import { useEffect, useRef, useState } from "react";
import { VantorLogo } from "./Nav";

type Message = { role: "user" | "assistant"; text: string };

const SUGGESTIONS = ["How does it work?", "What does it connect to?", "Is my data safe?", "How much does it cost?"];

/** A chat box whose answers stream in word by word from /api/demo-chat. */
export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Hi, I'm Vantor. Ask me anything about putting AI agents to work for your team." },
  ]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages]);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function send(prompt: string, suggested = false) {
    const text = prompt.trim();
    if (!text || streaming) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text }, { role: "assistant", text: "" }]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text, suggested }),
        signal: controller.signal,
      });
      if (!res.body) throw new Error("No stream");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        setMessages((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, text: last.text + chunk };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        setMessages((m) => {
          const next = [...m];
          next[next.length - 1] = { role: "assistant", text: "Sorry, I lost the connection. Try that again?" };
          return next;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  const waitingForFirstWord = streaming && messages[messages.length - 1]?.text === "";

  return (
    <div className="v-panel flex h-[30rem] flex-col overflow-hidden rounded-3xl shadow-2xl">
      <div className="flex items-center gap-2 border-b border-[var(--v-line)] px-5 py-3">
        <VantorLogo className="h-5 w-5" />
        <span className="text-sm font-semibold">Vantor Assistant</span>
        <span className="v-mono ml-auto text-[10px] uppercase tracking-widest text-[var(--v-muted)]">
          {streaming ? "Streaming…" : "Online"}
        </span>
      </div>
      <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5" aria-live="polite">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === "user" ? "v-button text-white" : "bg-[var(--v-panel-strong)]"
              }`}
            >
              {m.text}
              {streaming && i === messages.length - 1 && m.role === "assistant" && m.text && (
                <span className="v-caret text-[var(--v-accent-2)]" aria-hidden />
              )}
              {waitingForFirstWord && i === messages.length - 1 && (
                <span className="flex gap-1 py-1" aria-label="Thinking">
                  {[0, 150, 300].map((d) => (
                    <span key={d} className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--v-muted)]" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 px-5 pb-3">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={streaming}
            onClick={() => send(s, true)}
            className="rounded-full border border-[var(--v-line)] px-3 py-1 text-xs text-[var(--v-muted)] transition-colors hover:border-[var(--v-accent)] hover:text-[var(--v-text)] disabled:opacity-40"
          >
            {s}
          </button>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
        className="flex items-center gap-2 border-t border-[var(--v-line)] p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          placeholder="Ask Vantor anything…"
          aria-label="Message"
          className="w-full rounded-xl bg-transparent px-3 py-2 text-sm outline-none placeholder:text-[var(--v-muted)]"
        />
        {streaming ? (
          <button
            type="button"
            onClick={() => abortRef.current?.abort()}
            className="shrink-0 rounded-xl border border-[var(--v-line)] px-4 py-2 text-sm font-semibold"
          >
            Stop
          </button>
        ) : (
          <button type="submit" disabled={!input.trim()} className="v-button shrink-0 rounded-xl px-4 py-2 text-sm font-semibold text-white disabled:opacity-40">
            Send
          </button>
        )}
      </form>
    </div>
  );
}
