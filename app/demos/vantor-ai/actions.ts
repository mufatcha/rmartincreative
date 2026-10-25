"use server";

// The Vantor demo's waitlist form. A real Server Action: the form posts straight to
// this function on the server, with no API route to write. It's a demo, so it only
// validates and answers; nothing is stored or sent anywhere.

export type WaitlistState = {
  status: "idle" | "error" | "success";
  message: string;
  fieldErrors?: { email?: string; company?: string };
  position?: number;
  values?: { email: string; company: string };
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function joinWaitlist(_prev: WaitlistState, formData: FormData): Promise<WaitlistState> {
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const company = String(formData.get("company") ?? "").trim().slice(0, 200);

  const fieldErrors: WaitlistState["fieldErrors"] = {};
  if (!EMAIL.test(email)) fieldErrors.email = "Enter a work email, like dana@company.com.";
  if (company.length < 2) fieldErrors.company = "Tell us where you work.";
  if (fieldErrors.email || fieldErrors.company) {
    return { status: "error", message: "Almost there. Check the highlighted fields.", fieldErrors, values: { email, company } };
  }

  // Stand-in for a database write.
  await new Promise((r) => setTimeout(r, 900));

  return {
    status: "success",
    message: `You're on the list. We'll email ${email} when ${company}'s spot opens.`,
    position: 1200 + Math.floor(Math.random() * 300),
  };
}
