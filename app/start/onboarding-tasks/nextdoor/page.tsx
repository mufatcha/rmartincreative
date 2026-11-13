import type { Metadata } from "next";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, NameMatch, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: claim or create a Nextdoor business page. Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up your Nextdoor business page",
  description: "Step-by-step: claim or create your free Nextdoor business page.",
  path: guidePath("nextdoor"),
  noindex: true,
});

export default function NextdoorGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 10 minutes"
      title="Setting up your Nextdoor business page"
      intro={
        <p>
          Nextdoor is where neighbors ask each other for recommendations. A free business page lets them find you, recommend you, and see your
          updates. Your business may already be listed, waiting to be claimed.
        </p>
      }
    >
      <Part id="claim" title="Claim or create your page">
        <Checklist
          items={[
            "Your business name, address, phone, and website",
            "Your Nextdoor login, if you already use Nextdoor as a neighbor",
            "Your logo and a photo of your work",
          ]}
        />
        <NameMatch />
        <Steps>
          <Step n={1}>
            Go to <Ext href="https://business.nextdoor.com/en-us/getting-started/business-page">Nextdoor&rsquo;s business page sign-up</Ext>. Already
            use Nextdoor? Sign in first, then click your <B>profile picture</B> and choose <UI>Add business page</UI>.
          </Step>
          <Step n={2}>
            Search with your <B>business name and address</B>. If your business shows up, choose <UI>Claim</UI>. If it doesn&rsquo;t, scroll down
            and click <UI>Not here? Create your business page</UI>.
          </Step>
          <Step n={3}>
            Fill in your business details: your name <B>exactly as written on your onboarding page</B> (see the yellow box above), plus address, phone, category, and website. Claiming an existing page? Fix the
            name if Nextdoor has it slightly different.
          </Step>
          <Step n={4}>
            Follow Nextdoor&rsquo;s verification steps. It may confirm by phone, or ask for a business document (like a license) for some kinds of
            business.
          </Step>
          <Step n={5}>Add your logo, a cover photo, and a few sentences about what you do.</Step>
        </Steps>
        <Callout>
          Nextdoor will offer to link the business page to your personal neighbor account. That&rsquo;s fine: it lets you switch between the two
          without logging out.
        </Callout>
        <Callout tone="warn">
          If the <UI>Claim</UI> button is missing or greyed out, someone has already claimed the page. Send me a message and we&rsquo;ll ask Nextdoor
          to transfer it to you.
        </Callout>
        <Video id="xdXKDT6FkfY" title="How to Set Up a Business Page on Nextdoor" source="How To Dept on YouTube" />
        <Help href="https://help.nextdoor.com/s/article/How-to-claim-your-business-page?language=en_US">Claim or create your business page</Help>
      </Part>
    </GuideShell>
  );
}
