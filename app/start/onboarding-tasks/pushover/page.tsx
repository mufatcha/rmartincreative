import type { Metadata } from "next";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, Intro, Part, Step, Steps, UI } from "../GuideParts";

// Client guide: set up Pushover so the client's website can send alerts to their
// phone, and send Ryan the user key and app token. Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up Pushover alerts",
  description: "Step-by-step: install Pushover, find your user key, and create an app token so your website can send alerts to your phone.",
  path: guidePath("pushover"),
  noindex: true,
});

export default function PushoverGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 10 minutes"
      title="Setting up Pushover alerts"
      intro={
        <p>
          Pushover sends alerts from your website straight to your phone, like when someone fills in your contact form. I need two codes from your
          account to connect it: your <B>user key</B> and an <B>app token</B>.
        </p>
      }
      contents={[
        ["install", "Install Pushover"],
        ["user-key", "Find your user key"],
        ["app-token", "Create your app token"],
        ["send", "Send me both codes"],
      ]}
    >
      <Part id="install" eyebrow="Step 1" title="Install Pushover and create your account">
        <Checklist items={["Your phone", "An email address you check regularly"]} />
        <Steps>
          <Step n={1}>
            Install the <B>Pushover</B> app from the App Store (iPhone) or Google Play (Android).
          </Step>
          <Step n={2}>
            Open it and tap <UI>Create an account</UI> (or sign up at <Ext href="https://pushover.net/signup">pushover.net/signup</Ext>). Confirm your
            email when Pushover sends you a link.
          </Step>
          <Step n={3}>Sign in on the app and give your phone a name when asked (for example, &ldquo;My iPhone&rdquo;). Allow notifications.</Step>
        </Steps>
        <Callout>
          <B>What it costs:</B> the first 30 days are free. After that the app is a <B>one-time $4.99</B> per type of device (iPhone, Android, or
          desktop). There&rsquo;s no subscription.
        </Callout>
        <Help href="https://support.pushover.net/i8-cost">How much does Pushover cost?</Help>
      </Part>

      <Part id="user-key" eyebrow="Step 2" title="Find your user key">
        <Intro>Your user key tells Pushover which account the alerts go to.</Intro>
        <Steps>
          <Step n={1}>
            On a computer (or your phone&rsquo;s browser), sign in at <Ext href="https://pushover.net">pushover.net</Ext>.
          </Step>
          <Step n={2}>
            Your account page opens. Look for <B>Your User Key</B>: a string of about 30 letters and numbers.
          </Step>
          <Step n={3}>Copy it and keep it handy for Step 4.</Step>
        </Steps>
      </Part>

      <Part id="app-token" eyebrow="Step 3" title="Create your app token">
        <Intro>
          The app token is what your website uses to send alerts. Creating it is <B>free</B> and covers up to <B>10,000 alerts a month</B>, far more
          than you&rsquo;ll need.
        </Intro>
        <Steps>
          <Step n={1}>
            Still signed in at pushover.net, scroll down to <B>Your Applications</B> and click <UI>Create an Application/API Token</UI>. (Or go
            straight to <Ext href="https://pushover.net/apps/build">pushover.net/apps/build</Ext>.)
          </Step>
          <Step n={2}>
            For <B>Name</B>, type your <B>business name</B>. It shows at the top of every alert, so you&rsquo;ll know where it came from.
          </Step>
          <Step n={3}>Leave the other fields as they are (or add your website address and a short description if you like). Adding an icon is optional.</Step>
          <Step n={4}>
            Tick the box to agree to the terms, then click <UI>Create Application</UI>.
          </Step>
          <Step n={5}>
            The next page shows your <B>API Token/Key</B>. Copy it.
          </Step>
        </Steps>
      </Part>

      <Part id="send" eyebrow="Step 4" title="Send me both codes">
        <p className="text-[15px] leading-relaxed">
          Send me your <B>user key</B> and your <B>app token</B> in a message on your onboarding page. Label which is which, then I&rsquo;ll connect
          your website and send you a test alert.
        </p>
        <Callout tone="warn">
          <B>Don&rsquo;t send your Pushover password.</B> I only need the two codes. They let your website send you alerts, nothing else.
        </Callout>
        <Callout>
          <B>Want alerts on more than one phone?</B> Install Pushover on the other phone and sign in with the same account. Every phone on the account
          gets the alerts.
        </Callout>
      </Part>
    </GuideShell>
  );
}
