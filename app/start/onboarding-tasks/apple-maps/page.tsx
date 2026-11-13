import type { Metadata } from "next";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, NameMatch, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: claim or add a place on Apple Maps with Apple Business
// (formerly Apple Business Connect). Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up your Apple Maps listing",
  description: "Step-by-step: claim or add your business on Apple Maps with Apple Business.",
  path: guidePath("apple-maps"),
  noindex: true,
});

export default function AppleMapsGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 15 minutes, plus Apple's review"
      title="Setting up your Apple Maps listing"
      intro={
        <p>
          Apple Maps is what iPhone users and Siri see when they look you up. Apple often already has a basic listing for your business; claiming it
          lets you make sure it&rsquo;s right. It&rsquo;s free, and Apple calls the tool <B>Apple Business</B> (it used to be Apple Business
          Connect).
        </p>
      }
    >
      <Part id="claim" title="Claim or add your business">
        <Checklist
          items={[
            "An Apple Account (the one you use on your iPhone works, or create one with your business email)",
            "Your business phone: Apple may call it with a code",
            "Your business name, address, website, and hours",
            "Possibly a business document (like a license or utility bill) if Apple asks",
          ]}
        />
        <NameMatch />
        <Steps>
          <Step n={1}>
            On a computer, go to <Ext href="https://business.apple.com/">business.apple.com</Ext> and sign in with your Apple Account.
          </Step>
          <Step n={2}>
            <B>First time?</B> Apple asks a few questions about your business to set up your organization. Fill them in and submit. Apple reviews
            your business, which can take a few days.
          </Step>
          <Step n={3}>
            To add your listing, go to <UI>Brands</UI> → <UI>Locations</UI> and click <UI>Add</UI> (top right). Type your business name. If Apple
            finds your business, select it to claim it. If not, choose <UI>Add a new location with this name</UI>.
          </Step>
          <Step n={4}>
            Check the address and <B>drag the map pin</B> onto your actual building or entrance if it&rsquo;s off. Add your display name, <B>exactly as written on your onboarding page</B> (see the yellow box above), then your phone,
            website, category, and hours.
          </Step>
          <Step n={5}>
            <B>Verify by phone</B> (for businesses already on Apple Maps): choose <UI>Location Verification</UI>, then <UI>Phone Verification</UI>.
            Apple calls the number it has on file for your business; enter the 4-digit code it gives you.
          </Step>
          <Step n={6}>Once approved, add your logo and photos so your listing stands out.</Step>
        </Steps>
        <Callout tone="warn">
          See <UI>This location is already managed</UI>? Someone else claimed it. Continue adding it anyway: Apple lets you request a transfer once
          it&rsquo;s added. Send me a message if you get stuck.
        </Callout>
        <Video id="X0xw09CPytI" title="Claim Your Apple Maps Business Listing in Under 2 Minutes" source="Small Business Squad on YouTube" />
        <p className="mt-2 text-xs text-ink-soft">This video may show the older &ldquo;Business Connect&rdquo; name; the steps are the same.</p>
        <Help href="https://support.apple.com/guide/business/add-a-single-location-abcb98816a34/web">Add a single location in Apple Business</Help>
      </Part>
    </GuideShell>
  );
}
