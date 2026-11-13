import type { Metadata } from "next";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, NameMatch, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: claim or add a business on Yelp. Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up your Yelp page",
  description: "Step-by-step: claim your business on Yelp, or add it if it isn't listed yet.",
  path: guidePath("yelp"),
  noindex: true,
});

export default function YelpGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 10 minutes"
      title="Setting up your Yelp page"
      intro={
        <p>
          Yelp often lists businesses before the owner ever signs up, so you may just need to claim yours. Either way, a Yelp page is free. You
          don&rsquo;t need to buy ads.
        </p>
      }
    >
      <Part id="claim" title="Claim or add your business">
        <Checklist
          items={[
            "An email address you check regularly",
            "Your business phone (Yelp may call or text it with a code)",
            "Your business name, address, and website",
          ]}
        />
        <NameMatch />
        <Steps>
          <Step n={1}>
            Go to <Ext href="https://biz.yelp.com/claim">biz.yelp.com/claim</Ext>. (Or use the <B>Yelp for Business</B> app and tap{" "}
            <UI>Create a business account for free</UI>.)
          </Step>
          <Step n={2}>
            Search for your business name and city. If it shows up, <B>select it</B> (and if Yelp&rsquo;s name for you is different, correct it once you&rsquo;re in). If it doesn&rsquo;t, choose the option to <B>add your business
            to Yelp</B> for free.
          </Step>
          <Step n={3}>
            Create your business account: fill in your business details and your email address. Enter your name <B>exactly as written on your onboarding page</B> (see the yellow box above).
          </Step>
          <Step n={4}>
            <B>Verify:</B> Yelp sends you a code by email, or by text or phone call to the number listed on your page. Enter the code.
          </Step>
          <Step n={5}>Add your hours, photos, and a short description of what you do.</Step>
        </Steps>
        <Callout>
          <B>New to Yelp?</B> New pages are reviewed by Yelp&rsquo;s moderators, usually within 1 to 2 days. They need a website or phone number to
          confirm the business is real.
        </Callout>
        <Callout tone="warn">
          <B>Yelp may call offering ads.</B> Your free page works without them. Feel free to tell them you&rsquo;re not interested, or check with me
          first.
        </Callout>
        <Callout>
          Someone else already claimed your business? Send me a message: Yelp support can sort it out with your business name and city.
        </Callout>
        <Video id="7e0YfuD5dFk" title="How to Add or Claim Your Yelp Business Page (Yelp University Quick Tips)" source="Yelp for Business" />
        <Help href="https://business.yelp.com/resources/articles/ultimate-guide-to-claiming-your-yelp-page/">The simple steps to claiming your Yelp Page</Help>
      </Part>
    </GuideShell>
  );
}
