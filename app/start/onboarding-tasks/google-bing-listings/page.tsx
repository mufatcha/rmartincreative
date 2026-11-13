import type { Metadata } from "next";
import Link from "next/link";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, Intro, NameMatch, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: create a Google Business Profile, import it into Bing Places,
// and keep Bing synced. Sections are linkable (#google-business-profile,
// #bing-places, #keep-bing-in-sync). Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up your Google & Bing listings",
  description: "Step-by-step: create a Google Business Profile, add it to Bing Places, and keep Bing in sync.",
  path: guidePath("google-bing-listings"),
  noindex: true,
});

const link = "font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800";

export default function GoogleBingListingsGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 20 minutes, plus Google's review"
      title="Setting up your Google & Bing listings"
      intro={
        <p>
          Your Google Business Profile is what shows up on Google Search and Maps when people look for you. Once it&rsquo;s set up, Bing can copy
          it, so you only ever update one place.
        </p>
      }
      contents={[
        ["google-business-profile", "Google Business Profile"],
        ["bing-places", "Bing Places"],
        ["keep-bing-in-sync", "Keep Bing in sync"],
      ]}
    >
      <Part id="google-business-profile" eyebrow="Part 1" title="Create your Google Business Profile">
        <Checklist
          items={[
            "A Google account (a Gmail address works). Use one you'll keep long-term.",
            "Your business name, exactly as written on your onboarding page",
            "Your address, or the towns you serve if you go to customers",
            "Your business phone number and website",
          ]}
        />
        <NameMatch />
        <Steps>
          <Step n={1}>
            Go to <Ext href="https://business.google.com/add">business.google.com/add</Ext> and sign in with your Google account.
          </Step>
          <Step n={2}>
            Type your business name, <B>exactly as written on your onboarding page</B> (see the yellow box above). If Google suggests a listing that&rsquo;s already yours, <B>select it</B> to claim it instead of making a
            second one.
          </Step>
          <Step n={3}>Choose your business category. Pick the most specific one that fits (for example &ldquo;Landscaper&rdquo; rather than &ldquo;Service&rdquo;).</Step>
          <Step n={4}>
            When asked if you have a location customers can visit: choose <B>Yes</B> for a shop or office and enter the address. If you go to your
            customers instead, choose <B>No</B> and add the towns you serve.
          </Step>
          <Step n={5}>Add your phone number and website (if you have one), then continue.</Step>
          <Step n={6}>
            <B>Verify your business.</B> Google chooses which options you get: a phone call or text, email, a short video, a live video call, or a
            postcard. Follow the steps on screen. For a video, Google usually wants one continuous clip showing your location or vehicle, your
            tools or equipment, and something only the owner has (like keys or business paperwork).
          </Step>
          <Step n={7}>
            Google reviews it, which can take up to 5 business days (postcards take up to 2 weeks to arrive). Then add your hours, photos, and a
            short description.
          </Step>
        </Steps>
        <Callout>
          <B>Already on Google?</B> Search for your business name on Google. If you see <UI>Own this business?</UI> or <UI>Claim this business</UI>,
          click it to claim the existing listing instead.
        </Callout>
        <Callout>
          When you&rsquo;re done, you can share it with me using{" "}
          <Link href={`${guidePath("access-sharing")}#google-business-profile`} className={link}>
            these steps
          </Link>
          .
        </Callout>
        <Video id="TNrsBxxkjbA" title="Google Business Profile Set Up: 2026 Step-by-Step Tutorial" source="Santrel Media on YouTube" />
        <Video id="KyVIM3EDiu8" title="Manage your Business Profile directly on Google" source="Google Business Profile" />
        <Help href="https://support.google.com/business/answer/2911778?hl=en">Add or claim your Business Profile</Help>
        <Help href="https://support.google.com/business/answer/7107242?hl=en">Verify your business on Google</Help>
      </Part>

      <Part id="bing-places" eyebrow="Part 2" title="Add it to Bing Places">
        <Intro>
          Bing Places puts you on Bing and Bing Maps (which also feed Microsoft Copilot). Instead of typing everything again, Bing copies your Google
          profile, so the name will match as long as it&rsquo;s right on Google. <B>Do this after Google has verified your profile</B>: Bing then
          verifies you automatically.
        </Intro>
        <Steps>
          <Step n={1}>
            Go to <Ext href="https://www.bing.com/forbusiness">bing.com/forbusiness</Ext> and sign in. Choose <B>Google</B> and use the{" "}
            <B>same Google account</B> as your Business Profile. Your Bing listing will belong to whichever account you sign in with.
          </Step>
          <Step n={2}>
            Choose <UI>Import from Google Business Profile</UI>.
          </Step>
          <Step n={3}>
            Pick how often Bing should copy your changes from Google: <B>weekly</B> is best (you can also choose every two weeks or monthly).
          </Step>
          <Step n={4}>Sign in to Google again if asked, and allow Bing to read your Business Profile. Bing finds your listing automatically.</Step>
          <Step n={5}>Review the details and confirm. It can take a few days before your listing shows up on Bing.</Step>
        </Steps>
        <Callout tone="warn">
          If your Google profile hides your street address (common when you go to customers), the import may not work. Send me a message and
          we&rsquo;ll set Bing up another way.
        </Callout>
        <Video id="A-_95N6eeZA" title="How To Import Your Google Business Profile To Bing Places" source="Asterisk Marketing on YouTube" />
        <Help href="https://www.bing.com/forbusiness/help/getStarted">Bing Places: Get started</Help>
      </Part>

      <Part id="keep-bing-in-sync" eyebrow="Part 3" title="Keep Bing in sync when things change">
        <Intro>Changed your hours, phone number, or photos? Here&rsquo;s how to make sure Bing shows the same thing as Google.</Intro>
        <Steps>
          <Step n={1}>
            <B>Make the change on Google, not Bing.</B> Bing listings copied from Google can&rsquo;t be edited on Bing directly.
          </Step>
          <Step n={2}>
            That&rsquo;s usually all: Bing copies it over on the schedule you picked (weekly, every two weeks, or monthly). It can take a little
            longer to appear.
          </Step>
          <Step n={3}>
            Need it sooner? Sign in at <Ext href="https://www.bing.com/forbusiness">bing.com/forbusiness</Ext>, open your listing, and use the{" "}
            <UI>Sync</UI> option to copy the latest from Google now. You can change how often it syncs in the same place.
          </Step>
        </Steps>
        <Callout>Turning sync off doesn&rsquo;t disconnect Bing from Google; it just stops the automatic updates until you turn it back on.</Callout>
        <Video id="hjwB6htdeb0" title="How to Sync Google my Business Updates into Bing Places for Business" source="TM Blast on YouTube" />
        <Help href="https://www.bing.com/forbusiness/help/syncGoogleBusinessProfile">Sync your Google Business Profile with Bing Places</Help>
      </Part>
    </GuideShell>
  );
}
