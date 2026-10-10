import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";

const SLUG = "free-domain-email-gmail-cloudflare-resend";
const HOSTING = "/services/website-design-development/website-hosting";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// Example address used throughout the steps.
const ADDRESS = "hello@yourbusiness.com";

const CONTENT: ArticleContent = {
  intro: [
    `An email address like \`${ADDRESS}\` looks far more professional than a Gmail or Yahoo address on a business card, an invoice, or a quote. Most people assume it means paying for a business email plan every month, for every person. It doesn't have to.`,
    "With three free services, you can receive and send email at your own domain, right from the Gmail inbox you already use. Setup takes about 30 minutes, and once it's done, you won't have to think about it again.",
  ],
  blocks: [
    {
      type: "numbered",
      heading: "How it works",
      items: [
        {
          title: "Cloudflare receives your email",
          body: `Cloudflare Email Routing catches every message sent to \`${ADDRESS}\` and forwards it to your Gmail inbox. It's free, but your domain has to use Cloudflare for its DNS (the settings that tell the internet where your website and email live).`,
        },
        {
          title: "Resend sends your email",
          body: "Cloudflare only forwards mail in; it can't send. Resend handles sending, so your replies come from your own domain and are signed so other email providers can tell they're really from you.",
        },
        {
          title: "Gmail is where you read and write",
          body: "Everything comes together in Gmail. Messages to your domain arrive in your inbox, and your domain address can be set as the default “From” address, so every email you write or reply to goes out from your domain automatically.",
        },
      ],
    },
    {
      type: "bullets",
      heading: "What you'll need",
      items: [
        "**A domain name** using Cloudflare for its DNS. If your domain is registered somewhere else, you can usually switch its nameservers to Cloudflare for free and keep your registrar.",
        "**A Gmail account.** A free @gmail.com account works fine.",
        "**A free Resend account** from resend.com.",
      ],
    },
    {
      type: "steps",
      heading: "Step 1: Forward incoming email with Cloudflare",
      items: [
        "Log in to Cloudflare and select your domain.",
        "Go to **Email** → **Email Routing** and click **Get started**.",
        `Create your custom address, like \`${ADDRESS}\`, and choose your Gmail address as the destination.`,
        "Cloudflare emails your Gmail a verification link. Open it and click **Verify email address**.",
        "When Cloudflare offers to add the email DNS records it needs, click **Add records and enable**.",
        `Send a test message to \`${ADDRESS}\` from another email account. It should show up in Gmail within a minute or two.`,
      ],
      note: "Want info@, billing@, and anything else to reach you too? Turn on the **catch-all** address in Email Routing and point it at your Gmail.",
    },
    {
      type: "steps",
      heading: "Step 2: Set up sending with Resend",
      items: [
        "Sign up for a free account at resend.com.",
        "Go to **Domains** → **Add Domain** and enter your domain.",
        "Resend lists a few DNS records to add. If it offers to set them up automatically with Cloudflare, use that. Otherwise, in Cloudflare go to **DNS** → **Records** and add each one exactly as shown.",
        "Back in Resend, click **Verify**. It's often verified within minutes, though DNS changes can take longer.",
        "Go to **API Keys** → **Create API Key**. Give it **Sending access**, limit it to your domain, and copy the key (it starts with `re_`). Resend only shows it once, so keep it handy for the next step.",
      ],
      note: "Resend's records go on a separate “send” subdomain, so they won't clash with the records Cloudflare added in Step 1.",
    },
    {
      type: "steps",
      heading: "Step 3: Send from your domain in Gmail",
      items: [
        "In Gmail on a computer, click the gear icon → **See all settings** → **Accounts and Import**.",
        "Next to **Send mail as**, click **Add another email address**.",
        `Enter your name and \`${ADDRESS}\`, leave **Treat as an alias** checked, and click **Next Step**.`,
        "Fill in the server settings: SMTP Server `smtp.resend.com`, Port `587`, Username `resend`, and your Resend API key as the password. Leave **Secured connection using TLS** selected and click **Add Account**.",
        `Gmail sends a confirmation email to \`${ADDRESS}\`, and thanks to Step 1, it lands right in your Gmail. Click the link or enter the code.`,
        "Back in **Accounts and Import**, click **make default** next to your domain address, so every new email and reply goes out from it automatically.",
      ],
      note: "The default carries over to the Gmail app on your phone. To send from a different address now and then, just tap the “From” line.",
    },
    {
      type: "steps",
      heading: "Step 4 (recommended): Add a DMARC record",
      items: [
        "In Cloudflare, go to **DNS** → **Records** → **Add record**.",
        "Choose type **TXT**, enter `_dmarc` as the name, and `v=DMARC1; p=none;` as the content. Save.",
      ],
      note: "DMARC tells Gmail, Yahoo, and other providers that your domain has an email policy. It's a small step that helps your messages reach the inbox instead of spam.",
    },
    {
      type: "text",
      heading: "Is this better than Google Workspace?",
      paragraphs: [
        "It depends on what you need. Google Workspace is a paid plan, billed per person, that gives each person a separate mailbox plus shared calendars, Drive storage, and admin controls. For a growing team, it's worth it.",
        "For a one-person business or a small team that's happy reading email in a personal Gmail inbox, the free setup does the job: a professional address, sent and received in an inbox you already know.",
      ],
    },
  ],
  cta: {
    heading: "Want it set up for you?",
    body: "Email forwarding at your domain is part of every starter website I build. Already have a site? I can set up your domain email on its own, too.",
    serviceId: "website",
    button: "Ask about domain email",
    link: { href: HOSTING, label: "Website hosting & management" },
  },
  faqs: [
    {
      question: "Is custom-domain email with Gmail, Cloudflare, and Resend really free?",
      answer:
        "Yes, for typical small business use. Gmail and Cloudflare Email Routing are free, and Resend's free plan currently includes up to 3,000 emails a month (100 a day), which is plenty for everyday business email. You still pay for your domain name itself.",
    },
    {
      question: "Will people see my Gmail address when I send from my domain?",
      answer:
        "No. When you send from your domain address, the recipient sees only that address, and their replies come back to it.",
    },
    {
      question: "Will my emails go to spam?",
      answer:
        "Setting up Resend's DNS records and a DMARC record means your messages are signed and verified as coming from your domain, which is what email providers check. No one can promise every message reaches every inbox, but this is the same kind of authentication that big senders use.",
    },
    {
      question: "Can I have more than one address, like info@ and billing@?",
      answer:
        "Yes. Add each address in Cloudflare Email Routing (or use the catch-all), and add each one under “Send mail as” in Gmail so you can reply from it.",
    },
    {
      question: "Can I use this setup to send newsletters?",
      answer:
        "It isn't meant for that. Newsletters need an email marketing platform that handles sign-ups, unsubscribes, and bulk sending. See [email marketing](/services/email-marketing) for that.",
    },
    {
      question: "Does my domain have to be on Cloudflare?",
      answer:
        "For Cloudflare Email Routing, yes: Cloudflare has to manage your domain's DNS. Moving your DNS to Cloudflare is free, and you can usually keep your domain registered where it is. It's also how I host websites, so many of my clients are already set up.",
    },
  ],
};

export default function FreeDomainEmailPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
