// Unique, town-specific content for the local passport photo pages
// (/passport-photos/[town]). Keys match the Christmas card town keys
// (townKey in ./christmas-towns.ts), so drive times and nearby links are shared.
// Offices come from ./passport-offices.ts (government facilities only), listed
// nearest first.

import type { ServiceFaq } from "../services-data";
import { getChristmasTownByKey, townKey } from "./christmas-towns";
import type { PassportOfficeId } from "./passport-offices";
import { PASSPORT_INFANT_EXTRA, usd } from "./pricing";
import { TOWNS, type Town } from "./towns";

export type PassportTownContent = {
  /** Page name when it covers more than one town. */
  displayName?: string;
  headline: string;
  intro: string[];
  /** Where and how visits usually happen in this town. */
  visitNote: string;
  /** Government facilities to turn in a first-time application, nearest first. */
  offices: PassportOfficeId[];
  faqs: ServiceFaq[];
  /** Other page keys, shown as "Nearby" links. */
  nearby: string[];
  alsoServes?: string[];
};

export const PASSPORT_TOWNS: Record<string, PassportTownContent> = {
  richmond: {
    headline: "Passport photos in Richmond, right from home.",
    intro: [
      "Richmond is my home base, so a passport photo visit here is quick to schedule — I bring the backdrop, lighting, and camera to your house, take the photo, and check it against the State Department's rules before I leave.",
      "It's an easy way to handle a whole family at once, especially with kids or a baby who'd rather not sit in a waiting room.",
    ],
    visitNote: "Richmond is home base, so visits here are the easiest to fit into your schedule.",
    offices: ["usps-wilmot", "usps-mchenry", "mchenry-county-treasurer"],
    faqs: [
      {
        question: "Does the Richmond post office take passport applications?",
        answer:
          "Not currently — the Richmond post office doesn't list passport application services. The closest post offices that do are Wilmot, just over the Wisconsin line, and McHenry. The McHenry County Treasurer's Office in Woodstock also accepts first-time applications.",
      },
      {
        question: "Can I apply for a U.S. passport in Wisconsin if I live in Richmond?",
        answer:
          "Yes. You can turn in a first-time application at any passport acceptance facility in the country, so the Wilmot post office works just as well as one in Illinois.",
      },
    ],
    nearby: ["mchenry", "woodstock", "lake-geneva"],
  },

  mchenry: {
    headline: "At-home passport photos for McHenry families.",
    intro: [
      "Instead of lining up at a counter, have your passport photos taken at home in McHenry. I set up a plain backdrop and proper lighting in your living room, take as many shots as it takes, and check each one against the requirements.",
      "Two printed copies go in the mail the same day, and the digital file lands in your email or texts that afternoon.",
    ],
    visitNote: "McHenry is about 20 minutes from Richmond, so home visits are easy to schedule.",
    offices: ["usps-mchenry", "usps-island-lake", "mchenry-county-treasurer"],
    faqs: [
      {
        question: "Where can I turn in a passport application in McHenry?",
        answer:
          "The McHenry post office on West Crystal Lake Road accepts passport applications, and the Island Lake post office is close by. The McHenry County Treasurer's Office in Woodstock is the county's passport desk.",
      },
      {
        question: "Can you do passport photos for a group at a McHenry business?",
        answer:
          "Yes — I can set up at your office for a whole team in one visit, which is handy when several people are traveling for work.",
      },
    ],
    nearby: ["richmond", "crystal-lake", "woodstock"],
    alsoServes: ["Ringwood", "Solon Mills", "Prairie Grove"],
  },

  "crystal-lake": {
    headline: "Passport photos in Crystal Lake, without the drugstore line.",
    intro: [
      "Crystal Lake has plenty of places to get a quick photo snapped, but not all of them check it carefully — and a rejected photo can push your passport back by weeks. I take yours at home or at work and don't stop until it meets every requirement.",
      "Have a good photo already? Send it over and I'll remove the background and size it to passport standards instead.",
    ],
    visitNote: "Crystal Lake is about 30 minutes from Richmond; home and office visits are both easy to arrange.",
    offices: ["usps-crystal-lake", "usps-algonquin", "mchenry-county-treasurer"],
    faqs: [
      {
        question: "Does the Crystal Lake post office accept passport applications?",
        answer:
          "Yes — the post office on East Congress Parkway accepts passport applications. Book an appointment through usps.com or call the office before you go.",
      },
      {
        question: "Why does a passport photo get rejected?",
        answer:
          "Most rejections are small things: shadows on the background, a head that's too big or small in the frame, glare, or a photo that's been edited. I check each photo against the State Department's requirements before you're done, and retake it as many times as needed.",
      },
    ],
    nearby: ["algonquin", "woodstock", "mchenry"],
    alsoServes: ["Lakewood", "Prairie Grove"],
  },

  woodstock: {
    headline: "Woodstock passport photos, taken at your home or office.",
    intro: [
      "Woodstock is the county seat, and the McHenry County Treasurer's passport desk is right here — so once your photo is done, turning in a first-time application is a short trip.",
      "I come to you with everything needed for a compliant photo, then mail your printed copies the same day and send the digital file by email or text.",
    ],
    visitNote: "Woodstock is about 25 minutes from Richmond, so visits are easy to fit in.",
    offices: ["mchenry-county-treasurer", "usps-woodstock", "usps-crystal-lake"],
    faqs: [
      {
        question: "Where is the passport office in Woodstock?",
        answer:
          "The McHenry County Treasurer's Office at 2100 N. Seminary Ave. handles passport applications for the county. The Woodstock post office on Country Club Road accepts them too.",
      },
      {
        question: "Can you fill out my application before I go to the county office?",
        answer:
          "Yes. I can fill out and print your first-time application (or a renewal by mail) and send it with your photos, so all you do at the county desk is show your documents and sign in front of the agent.",
      },
    ],
    nearby: ["crystal-lake", "mchenry", "richmond"],
  },

  algonquin: {
    displayName: "Algonquin & Lake in the Hills",
    headline: "Passport photos in Algonquin and Lake in the Hills.",
    intro: [
      "Whether you're near Randall Road or down in old town Algonquin, I'll bring the passport photo setup to you — a plain backdrop, the right lighting, and a careful check against the requirements before I pack up.",
      "It's an easy way to get the whole family's photos done in one visit, with printed copies mailed the same day.",
    ],
    visitNote: "Algonquin and Lake in the Hills are about 40 minutes from Richmond, on a route I drive regularly.",
    offices: ["usps-algonquin", "usps-crystal-lake", "usps-elgin"],
    faqs: [
      {
        question: "Is there a passport office in Lake in the Hills?",
        answer:
          "Lake in the Hills doesn't have its own passport acceptance facility, but the Algonquin post office on West Algonquin Road is close by, and the Crystal Lake post office is another nearby option.",
      },
      {
        question: "Do you come to both Algonquin and Lake in the Hills?",
        answer: "Yes — same service and price in both towns, at your home or your business.",
      },
    ],
    nearby: ["crystal-lake", "west-dundee", "woodstock"],
  },

  "west-dundee": {
    displayName: "East & West Dundee",
    headline: "Passport photos for East and West Dundee.",
    intro: [
      "On either side of the Fox River, I'll come to your home or business with everything needed for a passport photo that meets the State Department's requirements — and retake it until it does.",
      "If you're applying for the first time, I can also fill out your application so it's ready for the post office or the Kane County Clerk.",
    ],
    visitNote: "The Dundees are about 50 minutes from Richmond, on a route I drive regularly, so it helps to book a little ahead.",
    offices: ["usps-elgin", "usps-algonquin", "kane-county-clerk"],
    faqs: [
      {
        question: "Where can I turn in a passport application near the Dundees?",
        answer:
          "The Elgin post office on Grove Court and the Algonquin post office both accept passport applications. The Dundees are in Kane County, so the Kane County Clerk's Office in Geneva is another option — no appointment needed there.",
      },
      {
        question: "Do you also serve Carpentersville and Sleepy Hollow?",
        answer: "Yes — the same at-home and on-site passport photo service covers Carpentersville and Sleepy Hollow.",
      },
    ],
    nearby: ["algonquin", "crystal-lake"],
    alsoServes: ["Carpentersville", "Sleepy Hollow"],
  },

  "lake-villa": {
    headline: "Lake Villa passport photos, taken at home.",
    intro: [
      "Skip the trip and the waiting room — I'll set up a passport photo station right in your Lake Villa home, take the photo, and check it against every requirement before I go.",
      "It's especially handy for families with little ones; infant photos are much easier where the baby is comfortable.",
    ],
    visitNote: "Lake Villa is about 25 minutes from Richmond, so home visits are easy to schedule.",
    offices: ["usps-lake-villa", "usps-round-lake", "lake-county-circuit-clerk"],
    faqs: [
      {
        question: "Does the Lake Villa post office take passport applications?",
        answer:
          "Yes — the Lake Villa post office on Cedar Avenue accepts passport applications, and so does the Round Lake post office nearby. Book through usps.com or call ahead.",
      },
      {
        question: "Can you take my baby's passport photo at home?",
        answer:
          `Yes. Babies need their eyes open, facing the camera, with no hands or toys in the frame — much easier at home than at a counter. Infant photos are an extra ${usd(PASSPORT_INFANT_EXTRA)} each.`,
      },
    ],
    nearby: ["gurnee", "richmond"],
    alsoServes: ["Lindenhurst", "Old Mill Creek"],
  },

  gurnee: {
    headline: "Gurnee passport photos at your home or business.",
    intro: [
      "I'll bring the passport photo setup to your Gurnee home or office, take the photo, and make sure it meets the State Department's requirements before I leave — unlimited retakes included.",
      "Need your application done too? I can fill it out and print it, ready for the Gurnee post office or the Lake County passport desk in Waukegan.",
    ],
    visitNote: "Gurnee is about 35 minutes from Richmond; home and office visits are both available.",
    offices: ["usps-gurnee", "lake-county-circuit-clerk", "usps-waukegan"],
    faqs: [
      {
        question: "Where can I apply for a passport near Gurnee?",
        answer:
          "The Gurnee post office on North O'Plaine Road accepts passport applications. The Lake County Circuit Clerk's passport division in Waukegan is about 5 miles away and takes walk-ins on weekday mornings.",
      },
      {
        question: "Can you do passport photos for employees at a Gurnee business?",
        answer: "Yes — I can set up at your business and take photos for one person or a whole team in one visit.",
      },
    ],
    nearby: ["lake-villa", "richmond"],
  },

  "lake-geneva": {
    headline: "Passport photos in Lake Geneva, Wisconsin.",
    intro: [
      "I come to your Lake Geneva home, business, or rental with everything needed for a compliant U.S. passport photo, and retake it until it's right.",
      "Your two printed copies are mailed the same day, and the digital file arrives by email or text — useful if you're planning a trip from the lake.",
    ],
    visitNote: "Lake Geneva is about 20 minutes from Richmond, just over the state line.",
    offices: ["usps-lake-geneva", "usps-elkhorn"],
    faqs: [
      {
        question: "Does the Lake Geneva post office accept passport applications?",
        answer:
          "Yes — the Lake Geneva post office on West Main Street accepts passport applications, and the Elkhorn post office is another option nearby. Book through usps.com or call ahead.",
      },
      {
        question: "Do you come to Lake Geneva from Illinois?",
        answer:
          "Yes. I'm based in Richmond, Illinois, about 20 minutes away, and serve Lake Geneva and the surrounding Walworth County area.",
      },
    ],
    nearby: ["richmond"],
  },
};

export type PassportTownPage = {
  key: string;
  town: Town;
  name: string;
  slug: string;
  content: PassportTownContent;
  /** Drive from Richmond in minutes, from the Christmas town data. */
  driveMinutes?: number;
};

export function getPassportTownPages(): PassportTownPage[] {
  return Object.entries(PASSPORT_TOWNS).flatMap(([key, content]) => {
    const town = TOWNS.find((t) => townKey(t) === key);
    if (!town) return [];
    return [
      {
        key,
        town,
        name: content.displayName ?? town.name,
        slug: `${key}-${town.state.toLowerCase()}`,
        content,
        driveMinutes: getChristmasTownByKey(key)?.content.delivery.driveMinutes,
      },
    ];
  });
}

export function getPassportTownBySlug(slug: string): PassportTownPage | undefined {
  return getPassportTownPages().find((p) => p.slug === slug);
}

export function getPassportTownByKey(key: string): PassportTownPage | undefined {
  return getPassportTownPages().find((p) => p.key === key);
}
