import ExtraArticle, { extraArticleMetadata, type ArticleContent } from "../../components/ExtraArticle";
import type { ServiceFaq } from "../../lib/services-data";

const SLUG = "modern-design-without-the-gimmicks";
const WEB = "/services/website-design-development";

export function generateMetadata() {
  return extraArticleMetadata(SLUG);
}

// The article body follows the downloadable PDF (public/downloads/Modern-Design-Without-the-Gimmicks.pdf),
// so the two stay in step. Plain strings, so inline "[text](/link)" links work.
const PART_1 = [
  {
    title: "Ask three questions before adding anything (10 min)",
    body: "Before you add a feature, ask: **Does it help a customer do something?** (call you, book, find your hours, see prices, get directions). **Does it work well on a phone?** Most local customers will see it on one. **Does it slow anything down?** That means page speed, or the time it takes to find what they came for. If a feature fails any one of these, skip it. An animated cursor that follows the mouse fails all three: it helps no one, phones don't have a cursor, and it slows things down. A tap-to-call button that stays on screen passes all three.",
  },
  {
    title: "Run the parking lot test (5 min)",
    body: "Pull up your own website on your phone, the way a customer would while sitting in their car, and time how long it takes to find your **phone number**, your **hours**, and your **service area**. Aim for under 5 seconds each. A customer on a phone is usually in a hurry, and every bit of decoration they have to get past is a chance for them to hit the back button and call someone else.",
  },
];

const PART_2 = [
  {
    title: "Built for phones first (5 min)",
    body: "Open your site on your phone and check that the text is readable without zooming, buttons are big enough for a thumb, and nothing makes you scroll sideways.",
  },
  {
    title: "Fast loading (5 min)",
    body: "Run your homepage through [Google PageSpeed Insights](https://pagespeed.web.dev). If large images are flagged, shrink them with a free tool like [TinyPNG](https://tinypng.com) and re-upload them.",
  },
  {
    title: "Plain, specific headlines (5 min)",
    body: "Read the big headline at the top of your homepage. It should say what you do and where. “Elevating Your Comfort” and “Welcome to Our Website” say nothing; “Furnace & AC Repair in McHenry County” and “Family Dentist in Richmond, IL. New Patients Welcome” say it all.",
  },
  {
    title: "Real photos (5 min)",
    body: "Swap stock photos for real ones of you, your team, your work, and your storefront or vehicles. A decent phone photo in good daylight beats a polished stock image, because customers can tell the difference.",
  },
  {
    title: "Easy ways to reach you (5 min)",
    body: "Make your phone number tap-to-call, keep contact forms short (name, phone, what you need), and add online booking if customers in your industry expect it.",
  },
  {
    title: "Easy to read for everyone (5 min)",
    body: "Check that body text is a comfortable size (about 16px or larger), dark text sits on a light background, and buttons say what they do (“Get a Quote” instead of “Submit”). This helps older customers and anyone reading in bright sunlight.",
  },
];

const HABITS = [
  "**Notice the businesses you buy from.** When a website is easy to use, or annoying, take note of why. That's real-world research.",
  "**Check your own site monthly.** Five minutes on your phone, running the parking lot test.",
  "**Look at your numbers.** If you use Google Search Console or analytics, check which pages people leave quickly. Those are the ones to simplify.",
  "**Ask one question of every pitch.** “What does this do for my customers, and how will we know it worked?” If the answer is vague, pass.",
  "**Change one thing at a time.** That way you can tell what helped.",
  "**Watch a real person use your site.** Ask a friend or customer to find your hours or request a quote while you watch quietly. You'll learn more in two minutes than from any trend list.",
];

const CLARITY = [
  {
    title: "Create your free account (5 min)",
    body: "Go to [Microsoft Clarity](https://clarity.microsoft.com) and sign in with a Microsoft, Google, or Facebook account. Click **Add new project** and enter your business name and website address.",
  },
  {
    title: "Connect it to your website (10 min)",
    body: "On **WordPress**, install the free “Microsoft Clarity” plugin (Plugins > Add New), then link it to your Clarity project. On **Wix** or **Shopify**, pick your platform on Clarity's setup screen and follow the guided steps. On **Squarespace** and most other builders, copy the tracking code Clarity gives you and paste it into the header code area in your site settings (often called Code Injection or Custom Code). Data usually starts showing within about two hours; visit your own site from your phone to give it something to record.",
  },
  {
    title: "Learn the three views that matter (5 min)",
    body: "**Heatmaps** are a color map of where people click or tap and how far down the page they scroll; warmer colors mean more activity. **Recordings** are anonymous replays of real visits, so you can watch how people move through your site. The **Dashboard** shows frustration signals: rage clicks (tapping the same spot over and over), dead clicks (tapping something that isn't a link), and quick backs (leaving a page right after arriving).",
  },
  {
    title: "Use it to judge your design (10 min a week)",
    body: "Once a week, check the **scroll heatmap** on your homepage (if most visitors never reach your phone number or “Get a Quote” button, move it higher), the **click heatmap** (if people keep tapping a photo or heading that isn't a link, make it a link), **rage and dead clicks**, which point straight to broken or confusing spots, and **five recordings from phone visitors**, noting where they hesitate, get stuck, or leave. Then make one change, give it two to four weeks, and compare.",
  },
];

const CHECKLIST = [
  "Parking lot test done: phone, hours, and service area each found in under 5 seconds",
  "Site checked on a phone: readable text, thumb-sized buttons, no sideways scrolling",
  "Homepage run through PageSpeed Insights, and large images compressed",
  "Homepage headline says what you do and where",
  "At least one stock photo replaced with a real one",
  "Phone number is tap-to-call, contact form is short, and text is easy to read",
  "Skip-list features removed or toned down",
  "Microsoft Clarity account created and connected to your site",
  "Privacy policy updated to mention Clarity",
  "First weekly Clarity check done, and one change made",
];

const FAQS: ServiceFaq[] = [
  {
    question: "Do I need to be a web designer to do this?",
    answer:
      "No. Most of the review is looking at your own site on your phone and asking simple questions. The only setup is Microsoft Clarity, which takes about 15 minutes with a plugin or a copy-and-paste code.",
  },
  {
    question: "Does any of it cost money?",
    answer:
      "No. PageSpeed Insights, TinyPNG, and Microsoft Clarity are all free, and Clarity has no traffic limits. The only cost is about 90 minutes of your time.",
  },
  {
    question: "Are animations always bad?",
    answer:
      "No. A button that changes color when you hover over it, or a gentle fade, is fine. The rule of thumb: motion should point people toward something useful, never make them wait for it.",
  },
  {
    question: "Is Microsoft Clarity safe to use on my site?",
    answer:
      "Clarity hides what visitors type into forms by default, and recordings are anonymous. Add a sentence to your privacy policy saying you use Microsoft Clarity to understand how visitors use your site. I use it on this website too.",
  },
  {
    question: "What if I get stuck?",
    answer: `Ask in our free Nextdoor group, or [request a quote](${WEB}/website-overhaul) if you'd rather have the fixes done for you.`,
  },
];

const CONTENT: ArticleContent = {
  intro: [
    "New design ideas show up constantly, from your web builder, a salesperson, or a competitor's site. Some make your site faster and easier to use. Others look impressive in a demo and quietly cost you customers.",
    "This guide gives you a simple test for any new feature, a review you can run on your own site, a list of trends to skip, and a free tool that shows you what real visitors actually do. It takes about 90 minutes, and every tool is free. Download the printable PDF with a checklist, or follow along below.",
  ],
  blocks: [
    {
      type: "table",
      heading: "How the guide breaks down",
      paragraphs: ["Work through it in order: the test in Part 1 is what you'll use to judge everything after it."],
      columns: ["", "What you'll do", "Time"],
      rows: [
        ["Part 1", "The 3-question feature test and the parking lot test", "15 min"],
        ["Part 2", "Phones first, speed, headlines, real photos, contact, readability", "30 min"],
        ["Part 3", "Trends to skip or tone down", "15 min"],
        ["Bonus", "Staying current without the overwhelm", "Ongoing"],
        ["Wrap-up", "See what visitors do with Microsoft Clarity", "30 min, then 10 min a week"],
      ],
    },
    { type: "numbered", heading: "Part 1: The 3-question feature test", items: PART_1 },
    { type: "numbered", heading: "Part 2: Trends worth keeping", items: PART_2 },
    {
      type: "text",
      heading: "Also worth a look",
      paragraphs: [
        "A short menu (five to seven items, using words your customers use), and trust signals near the top of the page, such as reviews, licenses, years in business, and the towns you serve.",
      ],
    },
    {
      type: "table",
      heading: "Part 3: Trends to skip or tone down",
      paragraphs: [
        "These features look impressive in a demo but tend to get in the way of real customers. If your site has any of them, consider removing or toning them down.",
      ],
      columns: ["Trend", "Why it gets in the way", "Better choice"],
      rows: [
        ["Custom cursors and cursor trails", "Phones don't have a cursor, and on a computer they distract and can lag", "A normal cursor"],
        ["Video or music that plays on its own", "Startles visitors, uses up phone data, slows the page", "A video with a play button and captions"],
        [
          "Heavy scroll animations",
          "Things flying in from the sides keep content hidden until they finish moving, which feels slow and can make some people dizzy",
          "Content that's simply there, or a subtle fade",
        ],
        ["Homepage slideshows (carousels)", "Most visitors never see past the first slide, and they slow the page", "One strong photo with a clear headline"],
        [
          "Pop-ups the moment someone arrives",
          "Blocks what they came for, and Google may rank pages lower when pop-ups cover content on phones",
          "A small banner, or no pop-up at all",
        ],
        ["Scrolling that's been taken over (scroll-jacking)", "The page moves at its own speed instead of the visitor's", "Normal scrolling"],
        ["Tiny, light-gray “minimal” text", "Hard to read, especially for older customers", "Larger, darker text"],
        ["Chat bots that can't answer real questions", "Frustrates people who just want a human", "A clear phone number, plus an FAQ section"],
      ],
      note: "Tone down, don't ban: a button that changes color on hover, or a gentle fade, is fine. Motion should point people toward something useful, never make them wait for it.",
    },
    { type: "bullets", heading: "Bonus: Staying current without the overwhelm", items: HABITS },
    { type: "numbered", heading: "Wrap-up: See what visitors actually do with Microsoft Clarity", items: CLARITY },
    {
      type: "text",
      heading: "This closes the loop",
      paragraphs: [
        "Trends and checklists are educated guesses. The 3-question test helps you decide before you add a feature; Clarity tells you afterward whether it worked. If visitors scroll right past an animation, ignore a slideshow, or rage-click a fancy menu, you have your answer, no guessing required.",
        "A quick privacy note: Clarity hides what visitors type into forms by default. Add a sentence to your website's privacy policy saying you use Microsoft Clarity to understand how visitors use your site.",
      ],
    },
    { type: "bullets", heading: "Your progress checklist", items: CHECKLIST },
  ],
  cta: {
    heading: "Want a hand with any of this?",
    body: "If your site is stuck with slideshows, pop-ups, and tiny gray text, I can rebuild it to be fast, clear, and easy to use on a phone, with the same plain-English approach as this guide.",
    serviceId: "website",
    button: "Get a free quote",
    link: { href: `${WEB}/website-overhaul`, label: "Website Overhaul" },
  },
  faqs: FAQS,
};

export default function ModernDesignWithoutTheGimmicksPage() {
  return <ExtraArticle slug={SLUG} content={CONTENT} />;
}
