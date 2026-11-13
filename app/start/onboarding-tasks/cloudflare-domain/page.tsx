import type { Metadata } from "next";
import Link from "next/link";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../../../lib/business";
import { CLOUDFLARE_INVITE_EMAIL, cleanDomain, guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import { B, Callout, Ext, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: Namecheap domain → the client's own Cloudflare account, then
// invite Ryan. Unlisted and noindex (also X-Robots-Tag on /start). Add
// ?domain=example.com to fill in the client's domain.
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Move your domain to Cloudflare",
  description: "Step-by-step: create a free Cloudflare account, add your domain, and switch its nameservers at Namecheap.",
  path: guidePath("cloudflare-domain"),
  noindex: true,
});

export default async function CloudflareDomainGuide({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const domain = cleanDomain((await searchParams).domain);
  const D = domain ? <B>{domain}</B> : <B>your domain</B>;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
          <p className="text-sm font-medium text-violet-200">Onboarding guide · about 10 minutes</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Move {domain ?? "your domain"} to Cloudflare</h1>
          <p className="mt-3 max-w-2xl text-violet-100">
            This sets up a free Cloudflare account for {domain ?? "your domain"}, which lets me manage its settings: things like your email address and
            website. You only do it once. Your domain stays registered with Namecheap; we&rsquo;re only changing where its settings live.
          </p>
          <ul className="mt-5 grid gap-2 text-sm text-violet-100 sm:grid-cols-2">
            <li className="rounded-xl bg-white/10 px-3 py-2">You&rsquo;ll need your Namecheap login.</li>
            <li className="rounded-xl bg-white/10 px-3 py-2">Open two browser tabs: Cloudflare and Namecheap.</li>
          </ul>
        </header>

        <nav aria-label="Parts" className="mt-5 flex flex-wrap gap-2 text-sm">
          {["Create your Cloudflare account", "Add your domain", "Switch nameservers at Namecheap", "Share access with me"].map((t, i) => (
            <a key={t} href={`#part-${i + 1}`} className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-medium hover:border-violet-400">
              {i + 1}. {t}
            </a>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          <Part id="part-1" eyebrow="Part 1" title="Create your Cloudflare account">
            <Steps start={1}>
              <Step n={1}>
                Go to <Ext href="https://dash.cloudflare.com/sign-up">dash.cloudflare.com/sign-up</Ext> and sign up with your email address and a new
                password.
              </Step>
              <Step n={2}>Check your email for a message from Cloudflare and click the link to verify your address.</Step>
            </Steps>
            <Callout>
              Use an email you&rsquo;ll keep long-term. This account is yours and controls {D}&rsquo;s settings.
            </Callout>
          </Part>

          <Part id="part-2" eyebrow="Part 2" title={`Add ${domain ?? "your domain"} to Cloudflare`}>
            <Steps start={3}>
              <Step n={3}>
                Click <UI>Add a domain</UI> (it may say <UI>Onboard a domain</UI>).
              </Step>
              <Step n={4}>
                Type {D}, leave <UI>Quick scan for DNS records</UI> selected, and click <UI>Continue</UI>.
              </Step>
              <Step n={5}>
                When asked to pick a plan, scroll down to the <B>Free</B> plan, select it, and click <UI>Continue</UI>.
              </Step>
              <Step n={6}>
                You&rsquo;ll see a list of DNS records Cloudflare found. <B>Don&rsquo;t change anything.</B> Just click <UI>Continue</UI> (it may say{" "}
                <UI>Continue to activation</UI>).
              </Step>
              <Step n={7}>
                Cloudflare now shows you <B>two nameservers</B>. They look something like this:
                <pre className="mt-2 overflow-x-auto rounded-xl bg-ink px-4 py-3 font-mono text-sm leading-relaxed text-white">
                  ada.ns.cloudflare.com{"\n"}bob.ns.cloudflare.com
                </pre>
                <p className="mt-2">
                  Yours will have different names. <B>Keep this page open</B>: you&rsquo;ll copy them in the next part.
                </p>
              </Step>
            </Steps>
            <Video id="7hY3gp_-9EU" title="Adding a new domain to Cloudflare" source="Cloudflare" />
          </Part>

          <Part id="part-3" eyebrow="Part 3" title="Switch your nameservers at Namecheap">
            <Steps start={8}>
              <Step n={8}>
                In your other tab, sign in to Namecheap: <Ext href="https://www.namecheap.com/myaccount/login/">namecheap.com/myaccount/login</Ext>
              </Step>
              <Step n={9}>
                In the left-hand menu, click <UI>Domain List</UI>, then click <UI>Manage</UI> next to {D}.
              </Step>
              <Step n={10}>
                On the <UI>Domain</UI> tab, scroll to <B>Nameservers</B>. Click the dropdown (it probably says <UI>Namecheap BasicDNS</UI>) and choose{" "}
                <UI>Custom DNS</UI>.
              </Step>
              <Step n={11}>
                Copy the two nameservers from your Cloudflare page into the two boxes, one per box. If there are extra boxes, delete them with the
                trash icon.
              </Step>
              <Step n={12}>
                Click the <B>green checkmark</B> to save.
              </Step>
              <Step n={13}>
                Back in Cloudflare, click <UI>Check nameservers now</UI> (or <UI>Done, check nameservers</UI>). Cloudflare emails you when {D} is
                active: usually within an hour, sometimes up to 24 hours.
              </Step>
            </Steps>
            <Callout tone="warn">
              <B>Seeing a message about &ldquo;DNSSEC&rdquo;?</B> Stop here and send me a message. It needs to be switched off first, and I&rsquo;ll
              walk you through it.
            </Callout>
            <Video id="uqlo3lCqiy0" title="Changing your domain nameservers to Cloudflare" source="Cloudflare" />
            <Video id="YbJr7YPmDsQ" title="What are the domain DNS options?" source="Namecheap" />
            <p className="mt-3 text-sm text-ink-soft">
              Namecheap&rsquo;s own help article:{" "}
              <Ext href="https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-change-dns-for-a-domain/">How to change DNS for a domain</Ext>
            </p>
          </Part>

          <Part id="part-4" eyebrow="Part 4" title="Share access with me">
            <Steps start={14}>
              <Step n={14}>
                In Cloudflare, click <UI>Manage Account</UI> in the left-hand menu, then <UI>Members</UI>.
              </Step>
              <Step n={15}>
                Click <UI>Invite</UI>, enter <B>{CLOUDFLARE_INVITE_EMAIL}</B>, choose the <B>Administrator</B> role, and send the invite.
              </Step>
            </Steps>
            <Callout>
              This lets me work on {D}&rsquo;s settings without your password. You stay the owner, and you can remove my access any time from the same
              Members page.
            </Callout>
            <Video id="QfxBbv0rkAw" title="How to Invite a User to Your Cloudflare Account (Updated 2026)" source="JOSHUA on YouTube" />
          </Part>

          <section className="rounded-3xl border-2 border-emerald-200 bg-emerald-50 px-5 py-6 sm:px-8">
            <h2 className="text-xl font-bold tracking-tight text-emerald-950">That&rsquo;s everything!</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-emerald-950">
              I&rsquo;ll take it from here and let you know what&rsquo;s next. If anything doesn&rsquo;t match these steps, stop and send me a message on
              your onboarding page (a screenshot helps), or call or text{" "}
              <a href={BUSINESS_PHONE_TEL} className="font-semibold underline underline-offset-2">
                {BUSINESS_PHONE_DISPLAY}
              </a>
              .
            </p>
          </section>

          <p className="text-center text-sm text-ink-soft">
            <Link href="/start/onboarding-tasks" className="font-medium text-violet-700 hover:text-violet-800">
              All onboarding guides
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
