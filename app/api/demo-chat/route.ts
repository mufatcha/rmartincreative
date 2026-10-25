// Streams a scripted answer for the Vantor AI demo (app/demos/vantor-ai), word by
// word, the way a real AI chat response arrives. There's no AI service behind it:
// the answers are canned, so it costs nothing to run and can't be misused.

const ANSWERS: { match: RegExp; text: string }[] = [
  {
    match: /price|pricing|cost|plan|pay|how much/i,
    text: "Vantor has three plans. Starter is free for one agent and 500 tasks a month. Team adds unlimited agents, shared workspaces, and approval steps. Enterprise adds single sign-on, audit logs, and a dedicated support engineer. Every plan includes a 14-day trial of Team, no card required.",
  },
  {
    match: /secur|privacy|data|safe/i,
    text: "Your data stays yours. Every agent runs in an isolated workspace, nothing you connect is used to train models, and every action an agent takes is written to an audit log you can export. Sensitive steps, like sending money or emailing a customer, can require a human approval before they run.",
  },
  {
    match: /integrat|connect|tool|app/i,
    text: "Vantor connects to the tools you already use: email, calendars, spreadsheets, CRMs, help desks, and payment systems. Connecting one takes about a minute. Once it's linked, any agent can read from it or act in it, within the permissions you set.",
  },
  {
    match: /how|work|agent/i,
    text: "You describe the outcome you want in plain English, like 'match new invoices to purchase orders and flag anything off by more than 2%.' Vantor plans the steps, runs them across your connected tools, checks its own work, and reports back. You can watch every step live, pause it, or take over at any time.",
  },
];

// Typed questions get this instead: the demo only knows the suggested questions.
const DEMO_NOTICE =
  "Thanks for asking! This is only a demo, so I'm not connected to a real AI and can't answer custom questions. My responses are limited to a few scripted answers. Tap one of the suggested questions below to see how a reply streams in.";

const encoder = new TextEncoder();

export async function POST(request: Request) {
  let prompt = "";
  let suggested = false;
  try {
    const body = (await request.json()) as { prompt?: unknown; suggested?: unknown };
    prompt = typeof body.prompt === "string" ? body.prompt.slice(0, 500) : "";
    suggested = body.suggested === true;
  } catch {}

  const answer = (suggested && ANSWERS.find((a) => a.match.test(prompt))?.text) || DEMO_NOTICE;
  const words = answer.split(/(?<= )/);

  let cancelled = false;
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // A short "thinking" pause before the first word, like a real model.
      await new Promise((r) => setTimeout(r, 450));
      try {
        for (const word of words) {
          if (cancelled || request.signal.aborted) return;
          controller.enqueue(encoder.encode(word));
          await new Promise((r) => setTimeout(r, 22 + Math.random() * 38));
        }
        controller.close();
      } catch {
        // The visitor pressed Stop or left; nothing left to send.
      }
    },
    cancel() {
      cancelled = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex",
    },
  });
}
