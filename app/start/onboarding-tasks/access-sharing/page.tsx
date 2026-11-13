import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { BUSINESS_PHONE_DISPLAY, BUSINESS_PHONE_TEL } from "../../../lib/business";
import { ACCESS_EMAILS, GUIDES, WORDPRESS_USERNAME, cleanDomain, guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import { B, Callout, Email, Ext, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: add Ryan to the services a project needs. Each service is its
// own section, linkable on its own (/start/onboarding-tasks/access-sharing#namecheap).
// Section ids and groups come from GUIDES in app/lib/onboarding/guides.ts.
// Steps follow each provider's help article (linked under each section).
// Unlisted and noindex.
export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "How to share account access",
  description: "Simple steps for sharing your domain, Google, social media, website, and email accounts, without sharing passwords.",
  path: guidePath("access-sharing"),
  noindex: true,
});

const SECTIONS = GUIDES.find((g) => g.slug === "access-sharing")!.sections!;
const GROUPS = [...new Set(SECTIONS.map((s) => s.group ?? ""))];

/** The provider's own help article, under a section. */
function Help({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="mt-3 text-sm text-ink-soft">
      Help article: <Ext href={href}>{children}</Ext>
    </p>
  );
}

function Intro({ children }: { children: ReactNode }) {
  return <p className="mb-4 text-[15px] leading-relaxed text-ink-soft">{children}</p>;
}

const groupOf = (id: string) => SECTIONS.find((s) => s.id === id)?.group;

export default async function AccessSharingGuide({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const domain = cleanDomain((await searchParams).domain);
  const D = domain ? <B>{domain}</B> : <B>your domain</B>;
  const cloudflareGuide = `${guidePath("cloudflare-domain")}${domain ? `?domain=${encodeURIComponent(domain)}` : ""}`;

  return (
    <div className="pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <header className="rounded-3xl bg-gradient-to-br from-violet-700 to-indigo-700 px-6 py-8 text-white shadow-lg sm:px-9 sm:py-10">
          <p className="text-sm font-medium text-violet-200">Onboarding guide · a few minutes each</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">How to share account access</h1>
          <p className="mt-3 max-w-2xl text-violet-100">
            Each of these services has a simple way to share access, so I can help with your project without ever needing your password. You stay
            the owner, you decide what I can change, and you can remove me whenever you like.{" "}
            <strong className="font-semibold text-amber-200">You only need the ones I&rsquo;ve mentioned.</strong>
          </p>
          <p className="mt-6 inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-2xl bg-white/10 px-4 py-3 text-base text-violet-50 sm:text-lg">
            Stuck, or something doesn&rsquo;t match? Call or text{" "}
            <a href={BUSINESS_PHONE_TEL} className="whitespace-nowrap text-lg font-bold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white sm:text-xl">
              {BUSINESS_PHONE_DISPLAY}
            </a>
          </p>
        </header>

        {/* Desktop: a grid with the service type on the left and its services on
            the right. Phones: no type labels, all services in one wrapping list
            (each group's wrapper is `display: contents` there). */}
        <nav
          aria-label="Services"
          className="mt-5 flex flex-wrap gap-2 text-sm sm:grid sm:grid-cols-[10rem_minmax(0,1fr)] sm:items-start sm:gap-x-5 sm:gap-y-3 sm:rounded-3xl sm:border sm:border-ink/10 sm:bg-white sm:p-5 sm:shadow-sm"
        >
          {GROUPS.map((g) => (
            <div key={g} className="contents">
              <span className="hidden pt-2 text-xs font-semibold uppercase tracking-wide text-ink-soft sm:block">{g}</span>
              <div className="contents sm:flex sm:flex-wrap sm:gap-2">
                {SECTIONS.filter((s) => (s.group ?? "") === g).map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    className="rounded-full border border-ink/10 bg-white px-3.5 py-1.5 font-medium hover:border-violet-400 sm:bg-paper-tint/40"
                  >
                    {s.title}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-5 space-y-5">
          {/* ── Domain & DNS ─────────────────────────────────────────── */}
          <Part id="namecheap" eyebrow={groupOf("namecheap")} title="Namecheap">
            <Intro>Lets me manage {D}&rsquo;s settings (like nameservers and DNS) while it stays registered to you.</Intro>
            <Steps>
              <Step n={1}>
                Sign in to Namecheap: <Ext href="https://www.namecheap.com/myaccount/login/">namecheap.com/myaccount/login</Ext>
              </Step>
              <Step n={2}>
                In the left-hand menu, click <UI>Domain List</UI>, then click <UI>Manage</UI> next to {D}.
              </Step>
              <Step n={3}>
                Open the <UI>Sharing &amp; Transfer</UI> tab and find the <B>Share Access</B> section.
              </Step>
              <Step n={4}>
                In the <UI>New Manager</UI> box, enter <Email>{ACCESS_EMAILS.namecheap}</Email> and click <UI>Add</UI>.
              </Step>
              <Step n={5}>
                Choose what I can change: select the <B>DNS and nameserver</B> options. You can leave anything about contacts or transferring the
                domain unchecked. Then confirm with your Namecheap password.
              </Step>
            </Steps>
            <Callout>I&rsquo;ll get an email to accept (it&rsquo;s good for 7 days). Nothing else changes in your account.</Callout>
            <Video id="KfbgEDI4gK8" title="How to share access to a domain with other users" source="Namecheap" />
            <Help href="https://www.namecheap.com/support/knowledgebase/article.aspx/192/46/how-do-i-share-access-to-my-domain-with-other-users/">
              How do I share access to my domain with other users?
            </Help>
          </Part>

          <Part id="godaddy" eyebrow={groupOf("godaddy")} title="GoDaddy">
            <Intro>GoDaddy calls this &ldquo;Delegate Access&rdquo;. I can manage {D} without seeing your password or payment details.</Intro>
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://www.godaddy.com/">godaddy.com</Ext>, click your name in the top-right corner, and choose{" "}
                <UI>Account Settings</UI>.
              </Step>
              <Step n={2}>
                Open <UI>Delegate Access</UI>, then click <UI>Invite to Access</UI>.
              </Step>
              <Step n={3}>
                Enter my name and <Email>{ACCESS_EMAILS.godaddy}</Email>.
              </Step>
              <Step n={4}>
                For the access level, choose <B>Products &amp; Domains</B>. If you don&rsquo;t see it, pick the closest option that doesn&rsquo;t
                include purchasing.
              </Step>
              <Step n={5}>
                Click <UI>Invite</UI>.
              </Step>
            </Steps>
            <Callout>
              GoDaddy invites expire in 2 to 3 days, so let me know when you&rsquo;ve sent it. I can&rsquo;t see your passwords, payment methods, or
              order history, and you can remove me any time from the same page.
            </Callout>
            <Video id="DBiAyocY-k8" title="How to Invite a Delegate to Access Your GoDaddy Account" source="Gradelink on YouTube" />
            <Help href="https://www.godaddy.com/help/invite-a-delegate-to-access-my-godaddy-account-12376">Invite a delegate to access my GoDaddy account</Help>
          </Part>

          <Part id="squarespace-domains" eyebrow={groupOf("squarespace-domains")} title="Squarespace Domains">
            <Intro>For domains registered with Squarespace, including ones that came over from Google Domains.</Intro>
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://account.squarespace.com/domains">account.squarespace.com/domains</Ext> and click {D}.
              </Step>
              <Step n={2}>
                Open <UI>Permissions</UI> and click <UI>Invite domain manager</UI>.
              </Step>
              <Step n={3}>
                Enter my name and <Email>{ACCESS_EMAILS.squarespace}</Email>, then send the invite.
              </Step>
            </Steps>
            <Callout>
              A domain manager can work on DNS and settings, but can&rsquo;t see billing, turn off auto-renew, or delete the domain. If your domain is
              billed together with a Squarespace website, use the <a href="#squarespace" className="font-semibold underline underline-offset-2">Squarespace website</a> steps
              instead.
            </Callout>
            <Video id="Y2osVVj3jkA" title="How to Give Your Web Designer Access to Your Squarespace Domain" source="Christy Price on YouTube" />
            <Help href="https://support.squarespace.com/hc/en-us/articles/25974568684557-Managing-domain-permissions">Managing domain permissions</Help>
          </Part>

          <Part id="cloudflare" eyebrow={groupOf("cloudflare")} title="Cloudflare">
            <Intro>Lets me set up DNS, email forwarding, and other settings for {D}.</Intro>
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://dash.cloudflare.com/login">dash.cloudflare.com</Ext>. No Cloudflare account yet? Follow{" "}
                <Link href={cloudflareGuide} className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800">
                  Move your domain to Cloudflare
                </Link>{" "}
                instead. It includes this step.
              </Step>
              <Step n={2}>
                Click <UI>Manage Account</UI> in the left-hand menu, then <UI>Members</UI>.
              </Step>
              <Step n={3}>
                Click <UI>Invite</UI> and enter <Email>{ACCESS_EMAILS.cloudflare}</Email>.
              </Step>
              <Step n={4}>
                Choose the <B>Administrator</B> role and send the invite.
              </Step>
            </Steps>
            <Callout>You can remove me any time from the same Members page.</Callout>
            <Video id="QfxBbv0rkAw" title="How to Invite a User to Your Cloudflare Account (Updated 2026)" source="JOSHUA on YouTube" />
          </Part>

          {/* ── Google & Bing ────────────────────────────────────────── */}
          <Part id="google-business-profile" eyebrow={groupOf("google-business-profile")} title="Google Business Profile">
            <Intro>Lets me update your business info, photos, and posts on Google Search and Maps, and reply to reviews.</Intro>
            <Steps>
              <Step n={1}>
                On a computer, sign in to the Google account that owns your Business Profile and go to{" "}
                <Ext href="https://business.google.com/">business.google.com</Ext>. (Or search for your business name on Google: your profile
                appears with editing options.)
              </Step>
              <Step n={2}>
                Open the <UI>⋮</UI> menu (it may say <UI>More</UI> or <UI>Menu</UI>) and choose <UI>Business Profile settings</UI>.
              </Step>
              <Step n={3}>
                Click <UI>People and access</UI> (it may say <UI>Managers</UI>).
              </Step>
              <Step n={4}>
                Click <UI>Add</UI> (the person icon with a +) and enter <Email>{ACCESS_EMAILS.google}</Email>.
              </Step>
              <Step n={5}>
                Under <B>Access</B>, choose <B>Manager</B>, then click <UI>Invite</UI>.
              </Step>
            </Steps>
            <Callout>
              Only the profile&rsquo;s <B>owner</B> can add people. If you don&rsquo;t see the option, you may be a manager yourself: tell me and
              I&rsquo;ll help find the owner. Google limits some features for new managers for their first 7 days, so the sooner the better.
            </Callout>
            <Video id="G_VTzLj5ksI" title="Add and remove managers for your business" source="Google Business Profile" />
            <Help href="https://support.google.com/business/answer/3403100?hl=en">Manage your Business Profile owners &amp; managers</Help>
          </Part>

          <Part id="google-analytics" eyebrow={groupOf("google-analytics")} title="Google Analytics">
            <Intro>Lets me see how people find and use your website, and set up tracking.</Intro>
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://analytics.google.com/">analytics.google.com</Ext> and pick your website&rsquo;s property.
              </Step>
              <Step n={2}>
                Click <UI>Admin</UI> (the gear icon, bottom left).
              </Step>
              <Step n={3}>
                Under <B>Property</B>, click <UI>Property access management</UI>.
              </Step>
              <Step n={4}>
                Click the <UI>+</UI> button (top right), then <UI>Add users</UI>.
              </Step>
              <Step n={5}>
                Enter <Email>{ACCESS_EMAILS.google}</Email>, choose the <B>Editor</B> role, and click <UI>Add</UI>.
              </Step>
            </Steps>
            <Callout>You need the Administrator role in Analytics to add people. If the + button is missing, tell me who set up your Analytics.</Callout>
            <Video id="pIRd5g7H0As" title="How to add users to a Google Analytics 4 Property" source="Global Reach Internet Productions on YouTube" />
            <Help href="https://support.google.com/analytics/answer/9305788?hl=en">Add, edit, and delete Analytics users and user groups</Help>
          </Part>

          <Part id="google-search-console" eyebrow={groupOf("google-search-console")} title="Google Search Console">
            <Intro>Lets me see how your site shows up in Google search and fix problems Google finds.</Intro>
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://search.google.com/search-console">search.google.com/search-console</Ext> and pick your website (top
                left).
              </Step>
              <Step n={2}>
                Click <UI>Settings</UI> in the left-hand menu, then <UI>Users and permissions</UI>.
              </Step>
              <Step n={3}>
                Click <UI>Add user</UI> and enter <Email>{ACCESS_EMAILS.google}</Email>.
              </Step>
              <Step n={4}>
                Set permission to <B>Full</B> and click <UI>Add</UI>.
              </Step>
            </Steps>
            <Callout>Only owners see &ldquo;Users and permissions&rdquo;. If it&rsquo;s missing, tell me and I&rsquo;ll help find the owner.</Callout>
            <Video id="6EQ6R6gPPdA" title="How to add a user to Google Search Console (Full or Restricted Access)" source="Marie Haynes on YouTube" />
            <Help href="https://support.google.com/webmasters/answer/7687615?hl=en">Managing owners, users, and permissions</Help>
          </Part>

          <Part id="bing-places" eyebrow={groupOf("bing-places")} title="Bing Places">
            <Intro>Your listing on Bing and Bing Maps (which also feeds Microsoft Copilot and other AI tools).</Intro>
            <p className="text-[15px] leading-relaxed">
              <B>Usually there&rsquo;s nothing for you to do here.</B> Bing Places doesn&rsquo;t have an &ldquo;add a manager&rdquo; option, but it
              can copy your listing straight from Google. Once you&rsquo;ve added me to your{" "}
              <a href="#google-business-profile" className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2">
                Google Business Profile
              </a>
              , I can bring it into Bing for you.
            </p>
            <Callout>
              Already have a Bing listing you manage yourself? Send me a message with the email you use for it, and we&rsquo;ll sort out the best way
              to share it.
            </Callout>
            <Help href="https://www.bing.com/forbusiness">Bing Places for Business</Help>
          </Part>

          {/* ── Social media ─────────────────────────────────────────── */}
          <Part id="facebook-instagram" eyebrow={groupOf("facebook-instagram")} title="Facebook & Instagram">
            <Intro>Lets me post, update your Page, and manage your Instagram through Meta Business Suite.</Intro>
            <Steps>
              <Step n={1}>
                On a computer, go to <Ext href="https://business.facebook.com/">business.facebook.com</Ext> and sign in with the Facebook account that
                runs your Page.
              </Step>
              <Step n={2}>
                Click <UI>Settings</UI> (the gear icon, bottom left), then <UI>People</UI>.
              </Step>
              <Step n={3}>
                Click <UI>Invite people</UI> (it may say <UI>+ Add</UI>) and enter <Email>{ACCESS_EMAILS.meta}</Email>.
              </Step>
              <Step n={4}>
                When asked what I can access, select your <B>Facebook Page</B> and your <B>Instagram account</B>, and give <B>full control</B> (it may
                say &ldquo;Everything&rdquo;).
              </Step>
              <Step n={5}>
                Send the invite.
              </Step>
            </Steps>
            <Callout>
              <B>Don&rsquo;t use Business Suite?</B> You can share just the Page: on Facebook, switch to your Page, then go to <UI>Settings</UI> →{" "}
              <UI>Page setup</UI> → <UI>Page access</UI> → <UI>Add new</UI>, enter {ACCESS_EMAILS.meta}, and allow full control. If your Instagram
              isn&rsquo;t connected to your Facebook Page yet, tell me and I&rsquo;ll help link them.
            </Callout>
            <Video id="3REN71Ma8aU" title="How To Add Someone To Meta Business Suite (2026)" source="Guide Sphere on YouTube" />
            <Help href="https://www.facebook.com/business/help/2169003770027706">Add people to a business portfolio and assign a business asset</Help>
          </Part>

          {/* ── Website ──────────────────────────────────────────────── */}
          <Part id="wordpress" eyebrow={groupOf("wordpress")} title="WordPress">
            <Intro>Creates my own login on your website, so I don&rsquo;t need yours.</Intro>
            <Steps>
              <Step n={1}>
                Log in to your website&rsquo;s dashboard. It&rsquo;s usually{" "}
                <B>{domain ? `${domain}/wp-admin` : "yourwebsite.com/wp-admin"}</B>.
              </Step>
              <Step n={2}>
                In the left-hand menu, go to <UI>Users</UI> → <UI>Add New User</UI> (it may say <UI>Add New</UI>).
              </Step>
              <Step n={3}>
                Fill in: Username <Email>{WORDPRESS_USERNAME}</Email>, Email <Email>{ACCESS_EMAILS.wordpress}</Email>. Leave the password WordPress
                suggests: I&rsquo;ll set my own.
              </Step>
              <Step n={4}>
                Leave <UI>Send the new user an email</UI> checked, set <B>Role</B> to <B>Administrator</B>, and click <UI>Add New User</UI>.
              </Step>
            </Steps>
            <Callout>
              Is your site on <B>WordPress.com</B>? There it&rsquo;s <UI>Users</UI> → <UI>Add new user</UI> (or <UI>Invite</UI>): enter{" "}
              {ACCESS_EMAILS.wordpress} and choose <B>Administrator</B>.
            </Callout>
            <Video id="ANteRUD_DF4" title="How to Add a New WordPress Admin User" source="SolidWP on YouTube" />
            <Help href="https://wordpress.org/documentation/article/users-add-new-screen/">Users Add New screen</Help>
          </Part>

          <Part id="wix" eyebrow={groupOf("wix")} title="Wix">
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://www.wix.com/">wix.com</Ext> and open your site&rsquo;s dashboard.
              </Step>
              <Step n={2}>
                Go to <UI>Settings</UI> → <UI>Roles &amp; Permissions</UI>.
              </Step>
              <Step n={3}>
                Click <UI>Invite Collaborators</UI> (it may say <UI>Invite People</UI>) and enter <Email>{ACCESS_EMAILS.wix}</Email>.
              </Step>
              <Step n={4}>
                Choose the <B>Admin (Co-Owner)</B> role and click <UI>Send Invite</UI>.
              </Step>
            </Steps>
            <Callout>
              Admins can&rsquo;t delete or transfer your site. Wix includes one free collaborator seat on most sites; if it asks you to buy one, tell
              me first.
            </Callout>
            <Video id="loqh6Vxb494" title="How To Invite a Collaborator on Wix | Wix Roles & Permissions" source="Wix Made Simple on YouTube" />
            <Help href="https://support.wix.com/en/article/inviting-people-to-contribute-to-your-site">Inviting people to collaborate on your site</Help>
          </Part>

          <Part id="squarespace" eyebrow={groupOf("squarespace")} title="Squarespace website">
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://www.squarespace.com/">squarespace.com</Ext> and open your website.
              </Step>
              <Step n={2}>
                Go to <UI>Settings</UI> → <UI>Permissions &amp; ownership</UI> (it may say <UI>Permissions</UI>).
              </Step>
              <Step n={3}>
                Click <UI>Invite contributor</UI> and enter <Email>{ACCESS_EMAILS.squarespace}</Email>.
              </Step>
              <Step n={4}>
                Choose <B>Administrator</B> and send the invite.
              </Step>
            </Steps>
            <Video id="3Fe79cm5sy4" title="How to Invite a Contributor and Set Permissions | Squarespace 7.1" source="Squarespace" />
            <Help href="https://support.squarespace.com/hc/en-us/articles/206537287-Invite-a-contributor">Invite a contributor</Help>
          </Part>

          {/* ── Email marketing ──────────────────────────────────────── */}
          <Part id="mailchimp" eyebrow={groupOf("mailchimp")} title="Mailchimp">
            <Steps>
              <Step n={1}>
                Sign in at <Ext href="https://login.mailchimp.com/">mailchimp.com</Ext>, click your profile icon, and choose <UI>Account &amp; billing</UI>.
              </Step>
              <Step n={2}>
                Open the <UI>Settings</UI> menu and click <UI>Users</UI> (it may say <UI>Users &amp; access</UI>).
              </Step>
              <Step n={3}>
                Click <UI>Invite a user</UI> and enter <Email>{ACCESS_EMAILS.mailchimp}</Email>.
              </Step>
              <Step n={4}>
                Choose <B>Admin</B> (or <B>Manager</B> if Admin isn&rsquo;t offered) and send the invite.
              </Step>
            </Steps>
            <Callout>
              Mailchimp&rsquo;s free plan may not allow extra users. If you can&rsquo;t invite me, send me a message and we&rsquo;ll find another way.
            </Callout>
            <Video id="7EFuTbPvDp4" title="How to Add a New Admin User to Your Mailchimp Account" source="PMN Online on YouTube" />
            <Help href="https://mailchimp.com/help/manage-user-levels-in-your-account/">Manage user levels in your account</Help>
          </Part>

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
