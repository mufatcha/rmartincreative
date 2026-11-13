import type { Metadata } from "next";
import Link from "next/link";
import { guidePath } from "../../../lib/onboarding/guides";
import { pageMetadata } from "../../../lib/seo";
import GuideShell from "../GuideShell";
import { B, Callout, Checklist, Ext, Help, NameMatch, Part, Step, Steps, UI } from "../GuideParts";
import Video from "../Video";

// Client guide: create a Facebook Page for a business. Unlisted and noindex.
export const metadata: Metadata = pageMetadata({
  title: "Setting up your Facebook Page",
  description: "Step-by-step: create a Facebook Page for your business, separate from your personal profile.",
  path: guidePath("facebook-page"),
  noindex: true,
});

export default function FacebookPageGuide() {
  return (
    <GuideShell
      eyebrow="Onboarding guide · about 10 minutes"
      title="Setting up your Facebook Page"
      intro={
        <p>
          A Facebook Page is your business&rsquo;s own presence on Facebook, separate from your personal profile. Facebook asks you to create it
          from a personal account, but your personal posts and details stay private.
        </p>
      }
    >
      <Part id="create" title="Create your Page">
        <Checklist
          items={[
            "Your personal Facebook login",
            "Your logo (for the profile picture)",
            "A wide photo of your work or team (for the cover photo)",
            "Your phone, email, website, address, and hours",
          ]}
        />
        <NameMatch />
        <Steps>
          <Step n={1}>
            On a computer, sign in to Facebook and go to <Ext href="https://www.facebook.com/pages/create">facebook.com/pages/create</Ext>.
          </Step>
          <Step n={2}>
            Enter your <B>Page name</B>: your business name, <B>exactly as written on your onboarding page</B> (see the yellow box above). Choose a <B>category</B> (start typing what you do and pick the closest match), and
            write a short <B>bio</B>. Click <UI>Create Page</UI>.
          </Step>
          <Step n={3}>Add your contact details: website, phone, email, address, and hours. Click <UI>Next</UI>.</Step>
          <Step n={4}>
            Add your logo as the <B>profile picture</B> and a wide photo as the <B>cover photo</B>. Click <UI>Next</UI>.
          </Step>
          <Step n={5}>
            You can skip the optional steps (connecting WhatsApp, inviting friends) for now. Click <UI>Done</UI>.
          </Step>
          <Step n={6}>
            Set your Page&rsquo;s <B>username</B> (your @name and web address), ideally the same name you use on other sites.
          </Step>
        </Steps>
        <Callout>
          <B>Already have a Page?</B> Search for your business on Facebook first. If an old or unofficial Page exists, send me a message and we&rsquo;ll
          work out the best way to handle it.
        </Callout>
        <Callout>
          When you&rsquo;re done, you can share the Page with me using{" "}
          <Link
            href={`${guidePath("access-sharing")}#facebook-instagram`}
            className="font-semibold text-violet-700 underline decoration-violet-300 underline-offset-2 hover:text-violet-800"
          >
            these steps
          </Link>
          .
        </Callout>
        <Video id="C2XswLE17Dc" title="Create A Facebook Business Page in 2026 (Full Tutorial)" source="Porkmoo on YouTube" />
        <Help href="https://www.facebook.com/business/help/1968057156746246">Set up your Facebook business Page</Help>
      </Part>
    </GuideShell>
  );
}
