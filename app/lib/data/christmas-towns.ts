// Unique, town-specific content for the local Christmas card pages
// (/christmas-cards/[town]). Each entry is genuinely local — real traditions,
// landmarks, and logistics — so the pages aren't near-duplicates of each other.
// Keys are town slugs (see townKey) from TOWNS in ./towns.ts; object order is
// the order pages appear in lists.
//
// Facts were researched from village, tourism, and local news sites; review
// them each fall, since event details change year to year.

import type { ServiceFaq } from "../services-data";
import { TOWNS, type Town } from "./towns";

export type TownGroup = "mchenry" | "lake" | "wisconsin" | "chicago";

export type ChristmasTownContent = {
  group: TownGroup;
  /** Page name when it covers more than one town, e.g. "Wadsworth & Winthrop Harbor". */
  displayName?: string;
  headline: string;
  intro: string[];
  holidays: string[];
  designIdeas: { title: string; body: string }[];
  delivery: {
    method: "hand" | "ship" | "both";
    /** Approximate drive from Richmond, IL, in minutes (0 = home base). */
    driveMinutes: number;
    note: string;
  };
  faqs: ServiceFaq[];
  /** Official pages for local holiday events (dates change yearly, so link out). */
  events: { name: string; url: string }[];
  /** Other page keys, shown as "Nearby" links. */
  nearby: string[];
  /** Smaller communities covered by this page. */
  alsoServes?: string[];
  /** Chicago only: neighborhood names (from TOWNS) grouped by area. */
  neighborhoods?: { area: string; names: string[] }[];
};

export const TOWN_GROUPS: { id: TownGroup; label: string }[] = [
  { id: "mchenry", label: "McHenry County & the Fox River Valley" },
  { id: "lake", label: "Lake County" },
  { id: "wisconsin", label: "Southern Wisconsin" },
  { id: "chicago", label: "Chicago" },
];

export const CHRISTMAS_TOWNS: Record<string, ChristmasTownContent> = {
  richmond: {
    group: "mchenry",
    headline: "Christmas cards designed right here in Richmond.",
    intro: [
      "Richmond is home base — the studio is here, so your cards are designed, proofed, and handed over without ever leaving the village. If you'd rather see paper samples in person or talk through a photo, it's a short trip across town.",
      "Small-town Christmas cards deserve the same care as a big-city mailer: real layout and color decisions, not a template with your photo dropped in. That's the whole idea behind every card I make.",
    ],
    holidays: [
      "Richmond's Christmas of Yesteryear has been a village tradition for more than 55 years: a multi-day celebration in the downtown District on Main Street with caroling, vendors, the St. Joseph's Cookie Walk, crafts, and photos with Santa.",
      "In December, the Cocoa Walk turns downtown into a trail of hot cocoa. Pick up a Cocoa Card at Anderson's Candy Shop or Harper G, get it stamped at each stop, visit with Santa, and help the Richmond–Spring Grove Area Food Pantry along the way.",
    ],
    designIdeas: [
      {
        title: "Christmas of Yesteryear",
        body: "A vintage-inspired card with old-fashioned lettering and warm, antique colors, straight out of Richmond's longest-running holiday tradition.",
      },
      {
        title: "Cocoa Walk",
        body: "A cozy design with steaming mugs, candy-shop stripes, and a hand-drawn Main Street map of your family's favorite stops.",
      },
      {
        title: "Main Street glow",
        body: "An illustrated winter scene of downtown Richmond's storefronts, with your family's name lettered on a shop window.",
      },
    ],
    delivery: {
      method: "hand",
      driveMinutes: 0,
      note: "Richmond is where the studio is, so finished cards can be picked up or hand delivered — no shipping wait at all.",
    },
    faqs: [
      {
        question: "Can I see paper and finish samples in person?",
        answer:
          "Yes. Since the studio is in Richmond, you can look at folded and flat 5×7 samples, finishes, and rounded corners in person before choosing.",
      },
      {
        question: "How late can a Richmond family order Christmas cards?",
        answer:
          "Local pickup saves shipping time, but finishes and print slots fill up by late November, so ordering in October or early November gives you the most choice.",
      },
    ],
    events: [
      { name: "Christmas of Yesteryear", url: "https://www.facebook.com/christmasofyesteryear/" },
      { name: "Richmond Cocoa Walk", url: "https://mchenrylife.com/events/community-social-events/richmond/richmonds-cocoa-walk-weekend/" },
    ],
    nearby: ["mchenry", "spring-grove", "hebron", "genoa-city"],
  },

  mchenry: {
    group: "mchenry",
    headline: "Christmas cards for McHenry, from a designer just up the road.",
    intro: [
      "McHenry is the biggest town near the studio in Richmond, about 20 minutes away, so McHenry families and businesses get easy, local service: meet about photos, check a proof in person, and get your cards hand delivered.",
      "From the Riverwalk to the downtown shops, McHenry does the holidays right, and your card can capture that same warmth.",
    ],
    holidays: [
      "The Downtown McHenry Holiday Walk lights up Veterans Memorial Park and the downtown streets with thousands of twinkling lights, with horse-drawn sleigh rides, trolley rides, caroling by the McHenry High School Vocal Warriors, and Santa under the gazebo.",
      "Along the Fox River, the Riverwalk Shoppes host a German-style holiday market in Miller Point Park, downtown windows come alive during Living Windows & the Cocoa Crawl, and a Festival of Trees shows off trees decorated by local businesses.",
    ],
    designIdeas: [
      {
        title: "Riverwalk in winter",
        body: "An illustrated Fox River Riverwalk dusted in snow, with twinkling lights reflected on the water.",
      },
      {
        title: "Sleigh ride",
        body: "A horse-drawn sleigh through a glowing downtown, inspired by the Holiday Walk.",
      },
      {
        title: "Living windows",
        body: "A storefront-window frame around your family photo, like the Living Windows displays downtown.",
      },
    ],
    delivery: {
      method: "hand",
      driveMinutes: 20,
      note: "McHenry is about 20 minutes from Richmond, so cards are hand delivered, and meeting in person about photos or proofs is easy.",
    },
    faqs: [
      {
        question: "Can we meet in McHenry to go over photos or proofs?",
        answer:
          "Yes. McHenry is close to the studio, so meeting in person to choose photos, look at paper samples, or review a proof is easy to arrange.",
      },
      {
        question: "Do you make holiday cards for McHenry businesses?",
        answer:
          "Yes. Branded client cards and team greetings for McHenry businesses are a big part of my season, with hand delivery for local orders.",
      },
      {
        question: "Do you cover Ringwood, Solon Mills, and Prairie Grove?",
        answer: "Yes. The communities around McHenry get the same hand delivery and in-person service.",
      },
    ],
    events: [
      { name: "Downtown McHenry Holiday Walk", url: "https://mchenrychamber.com/downtown-holiday-walk/" },
    ],
    nearby: ["richmond", "crystal-lake", "spring-grove", "algonquin"],
    alsoServes: ["Ringwood", "Solon Mills", "Prairie Grove"],
  },

  "spring-grove": {
    group: "mchenry",
    headline: "Christmas cards for Spring Grove families, from just down the road.",
    intro: [
      "Spring Grove is minutes from the studio in Richmond, which makes it easy to meet about photos, check a proof, or pick up your finished cards.",
      "Whether your card features the whole family bundled up at the tree farm or a simple, elegant design with a message, it's built from scratch around you.",
    ],
    holidays: [
      "Spring Grove's \"Merry and Bright\" celebration brings kids' crafts, hot cocoa, cookies, and a visit with Santa to the village in early December, with donations collected for the local food pantry.",
      "Just outside town, Richardson Adventure Farm opens its choose-and-cut Christmas tree fields the day after Thanksgiving — for plenty of families, it's where the Christmas card photo gets taken.",
    ],
    designIdeas: [
      {
        title: "Tree farm photo card",
        body: "A layout built around your tree-cutting photo, with rows of evergreens framing the greeting.",
      },
      {
        title: "Merry & bright",
        body: "A cheerful, colorful design with hand-drawn lights and cocoa-mug details.",
      },
      {
        title: "Country Christmas",
        body: "A rustic flat card with kraft-paper textures and a plaid back, ideal for rounded corners.",
      },
    ],
    delivery: {
      method: "hand",
      driveMinutes: 10,
      note: "Spring Grove is about 10 minutes from Richmond, so finished cards are hand delivered or ready for quick pickup.",
    },
    faqs: [
      {
        question: "Can you design around a photo from the Christmas tree farm?",
        answer:
          "Absolutely — outdoor tree-farm photos make great cards. Send your favorites and I'll build the layout around the best one, or combine a few.",
      },
      {
        question: "Do you deliver in Spring Grove?",
        answer: "Yes. Spring Grove is a short drive from the studio, so hand delivery is easy.",
      },
    ],
    events: [
      { name: "Merry and Bright in Spring Grove", url: "https://www.springgrovevillage.com/event/tree-lighting-visit-with-santa/" },
      { name: "Richardson Christmas Tree Farm", url: "https://richardsonadventurefarm.com/ChristmasTreeFarm/Home" },
    ],
    nearby: ["richmond", "mchenry", "fox-lake", "antioch"],
  },

  "fox-lake": {
    group: "lake",
    headline: "Christmas cards with a Fox Lake, Chain O'Lakes feel.",
    intro: [
      "Fox Lake families know winter on the Chain O'Lakes: frozen shorelines, ice fishing shanties, and the quiet of the lakes after the boats come out. That's a great backdrop for a holiday card.",
      "I design each card from scratch around your photos and style, then hand deliver or ship the finished cards.",
    ],
    holidays: [
      "Fox Lake's Festival of Lights opens the season in late November with a parade from Grant Community High School to Millennium Park, followed by the annual tree lighting, the Grant choir, and a visit with Santa. In past years, a Kris Kringle Winter Market has added to the celebration.",
      "It's one of the area's warmest small-town kickoffs to the season.",
    ],
    designIdeas: [
      {
        title: "Frozen Chain O'Lakes",
        body: "A wintry lakeside illustration in icy blues, with your greeting written across the ice.",
      },
      {
        title: "Festival of Lights",
        body: "A photo card with a parade-light border inspired by Fox Lake's lighted parade.",
      },
      {
        title: "Cozy lake house",
        body: "A folded card with a warm cabin-window scene outside and room for a longer family letter inside.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 20,
      note: "Fox Lake is about 20 minutes from Richmond, so cards can be hand delivered, or shipped if that's easier.",
    },
    faqs: [
      {
        question: "Can you include a family newsletter inside the card?",
        answer:
          "Yes. A folded 5×7 card has a full inside spread, which works well for a short year-in-review letter or extra photos.",
      },
      {
        question: "Do you serve homes around the lakes, not just the village?",
        answer: "Yes. Fox Lake and the surrounding Chain O'Lakes neighborhoods are all within easy delivery range.",
      },
    ],
    events: [
      { name: "Fox Lake Festival of Lights", url: "https://www.foxlake.org/389/Festival-of-Lights" },
    ],
    nearby: ["spring-grove", "antioch", "lake-villa", "richmond"],
  },

  antioch: {
    group: "lake",
    headline: "Christmas cards for Antioch, Channel Lake & Lake Catherine.",
    intro: [
      "Antioch does Christmas in a big, old-fashioned way, and your cards can too. I design custom holiday cards for Antioch families and businesses, plus the lake communities of Channel Lake and Lake Catherine.",
      "Every design starts from scratch with your photos, your colors, and your message, then gets proofed with you before it's printed.",
    ],
    holidays: [
      "Antioch's Christmas Parade and Tree Lighting fills downtown Main Street the day after Thanksgiving, ending with the tree lighting at Sequoit Creek Park.",
      "The season keeps going with Kringle's Christmas Village and its Dickens-inspired holiday scenes, plus musical light shows at the Bandshell each December night leading up to Christmas.",
    ],
    designIdeas: [
      {
        title: "Dickens village",
        body: "A storybook-style illustration with Victorian lettering, inspired by Antioch's Dickens Holiday Village scenes.",
      },
      {
        title: "Main Street parade",
        body: "A bright, festive photo card with marching-band and parade-light touches.",
      },
      {
        title: "Lakeside winter",
        body: "A calm lake scene in soft winter tones for Channel Lake and Lake Catherine families.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 20,
      note: "Antioch is about 20 minutes from Richmond, so cards can be hand delivered in Antioch, Channel Lake, and Lake Catherine, or shipped.",
    },
    faqs: [
      {
        question: "Do you serve Channel Lake and Lake Catherine too?",
        answer: "Yes. Both lake communities are covered, with the same hand delivery or shipping options as downtown Antioch.",
      },
      {
        question: "Can my card have a vintage, Dickens-style look?",
        answer:
          "Definitely. Victorian lettering, storybook illustration, and warm antique colors work beautifully on both folded and flat cards.",
      },
    ],
    events: [
      { name: "Antioch special events, including the Christmas Parade & Tree Lighting", url: "https://www.antioch.il.gov/special-events" },
      { name: "Lake County holiday guide", url: "https://www.visitlakecounty.org/holiday-guide" },
    ],
    nearby: ["lake-villa", "fox-lake", "richmond", "wadsworth"],
    alsoServes: ["Channel Lake", "Lake Catherine"],
  },

  "lake-villa": {
    group: "lake",
    headline: "Christmas cards for Lake Villa, Lindenhurst & Old Mill Creek.",
    intro: [
      "From Cedar Avenue to the neighborhoods around Cedar Lake and Deep Lake, Lake Villa and Lindenhurst families get custom Christmas cards designed around their own photos and style, not a template.",
      "The same goes for Old Mill Creek's open country: if your card photo was taken in a snowy field or on the farm, the design can lean into that.",
    ],
    holidays: [
      "Lake Villa's lighted Holiday Parade steps off from Palombi Middle School in late November and heads down Cedar Avenue to Lehmann Park for the tree lighting and a visit with Santa in the park pavilion.",
      "Next door, the Lindenhurst Park District hosts its own holiday tree lighting and Santa meet-and-greet in early December.",
    ],
    designIdeas: [
      {
        title: "Lighted parade",
        body: "A night-sky photo card with glowing string-light borders, inspired by the lighted parade down Cedar Avenue.",
      },
      {
        title: "Snowy countryside",
        body: "A minimal, airy design with open space and fine type, suited to Old Mill Creek's open land.",
      },
      {
        title: "Neighborhood classic",
        body: "A timeless red-and-green photo card with a family name banner, ideal as a flat double-sided card.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 25,
      note: "Lake Villa is about 25 minutes from Richmond, so cards can be hand delivered in Lake Villa, Lindenhurst, and Old Mill Creek, or shipped.",
    },
    faqs: [
      {
        question: "Do you cover Lindenhurst and Old Mill Creek?",
        answer: "Yes. Both are included, with hand delivery or shipping, just like Lake Villa.",
      },
      {
        question: "Can you print a small batch for a neighborhood or HOA?",
        answer: "Yes. Small runs for neighborhood associations and clubs are welcome, as are family orders.",
      },
    ],
    events: [
      { name: "Lake County holiday guide", url: "https://www.visitlakecounty.org/holiday-guide" },
    ],
    nearby: ["antioch", "fox-lake", "gurnee", "wadsworth"],
    alsoServes: ["Lindenhurst", "Old Mill Creek"],
  },

  gurnee: {
    group: "lake",
    headline: "Custom Christmas cards for Gurnee families and businesses.",
    intro: [
      "Gurnee is where a lot of my clients live and work, from families around Old Grand Avenue to businesses sending holiday mailers to their customers.",
      "Every card is designed from scratch, proofed with you, and printed on the format and finish you choose.",
    ],
    holidays: [
      "Gurnee's Holiday Lights celebration fills Welton Plaza on Old Grand Avenue in late November, with carolers, fire pits and s'mores, craft stations, and a visit with Mr. and Mrs. Claus. It's co-hosted by the Gurnee Park District, the Village, and the Chamber of Commerce.",
    ],
    designIdeas: [
      {
        title: "Old Grand Avenue glow",
        body: "A cozy evening scene with fire-pit warmth and carolers, inspired by Holiday Lights at Welton Plaza.",
      },
      {
        title: "Corporate holiday mailer",
        body: "A polished, on-brand card for Gurnee businesses to send to clients and teams.",
      },
      {
        title: "Modern family photo",
        body: "A clean flat 5×7 card with a full-bleed photo on the front, a second photo and message on the back, and rounded corners.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 35,
      note: "Gurnee is about 35 minutes from Richmond, so cards can be hand delivered, or shipped for larger business mailers.",
    },
    faqs: [
      {
        question: "Can a Gurnee business order branded holiday cards for clients?",
        answer:
          "Yes. Corporate holiday cards can include your logo and brand colors, and I can help with mailing lists for larger sends.",
      },
      {
        question: "Can I get both folded and flat versions?",
        answer:
          "Yes. Some families order flat photo cards for friends and folded cards with a letter for close family, both from the same design.",
      },
    ],
    events: [
      { name: "Holiday Lights at Welton Plaza", url: "https://www.gurneeparkdistrict.com/event/holiday-lights-2/" },
      { name: "Gurnee holiday events", url: "https://www.visitlakecounty.org/holiday-your-way-gurnee-events" },
    ],
    nearby: ["waukegan", "wadsworth", "lake-villa", "antioch"],
  },

  waukegan: {
    group: "lake",
    headline: "Christmas cards with a Waukegan lakefront and harbor spirit.",
    intro: [
      "Waukegan has something few towns do: a real Lake Michigan harbor, with the red-brick Waukegan Harbor Light standing at the end of the pier. Winter on the lakefront makes a striking holiday card.",
      "I design custom Christmas cards for Waukegan families, churches, and businesses, each one built around your photos and message.",
    ],
    holidays: [
      "Downtown Waukegan lights up for the season with a tree lighting, and the arts come out in force: holiday performances at the Jack Benny Center for the Arts, a Kris Kringle Market with local artisans, and ArtWauk evenings at the Waukegan Arts Council.",
    ],
    designIdeas: [
      {
        title: "Harbor Light",
        body: "An illustrated Waukegan Harbor lighthouse on a wintry Lake Michigan, with your greeting in the sky.",
      },
      {
        title: "Downtown arts",
        body: "A bold, artistic card with a painterly feel, inspired by Waukegan's arts scene.",
      },
      {
        title: "Church & community",
        body: "A warm, classic card for churches and community groups sending greetings to members.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 40,
      note: "Waukegan is about 40 minutes from Richmond, so cards can be hand delivered, or shipped to save you the wait.",
    },
    faqs: [
      {
        question: "Can churches and community groups order cards?",
        answer: "Yes. Group orders for congregations, clubs, and nonprofits are welcome, with designs that fit your organization.",
      },
      {
        question: "Can my card include a greeting in Spanish or another language?",
        answer:
          "Yes. Send the exact wording you'd like, in any language or in two side by side, and I'll design the layout so both read beautifully.",
      },
    ],
    events: [
      { name: "Waukegan holiday events", url: "https://www.visitlakecounty.org/holiday-your-way-waukegan-events" },
    ],
    nearby: ["gurnee", "wadsworth", "kenosha", "lake-villa"],
  },

  wadsworth: {
    group: "lake",
    displayName: "Wadsworth & Winthrop Harbor",
    headline: "Christmas cards for Wadsworth & Winthrop Harbor.",
    intro: [
      "Two very different corners of northern Lake County: Wadsworth, the self-described \"Village of Country Living\" with its prairies, woods, and horse farms, and Winthrop Harbor, home to North Point Marina on Lake Michigan.",
      "Whichever side your family is on, your card is designed around your photos and the look you love.",
    ],
    holidays: [
      "Winter changes both places: Wadsworth's open fields and woodlands turn quiet and snowy, and the docks at North Point Marina — one of the biggest marinas on the Great Lakes — sit still under the Lake Michigan winter sky.",
      "They're two very different, very local backdrops for a holiday card.",
    ],
    designIdeas: [
      {
        title: "Country living",
        body: "A horse-farm or prairie winter scene with split-rail fences and soft snowfall, for Wadsworth families.",
      },
      {
        title: "Marina winter",
        body: "Quiet docks and masts under a pale winter sky, for Winthrop Harbor families.",
      },
      {
        title: "Nautical Christmas",
        body: "Navy and red with rope and anchor details, a fun twist on a classic card.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 35,
      note: "Wadsworth and Winthrop Harbor are about 35 minutes from Richmond, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Do you deliver to both Wadsworth and Winthrop Harbor?",
        answer: "Yes. Both villages get the same options: hand delivery or shipping.",
      },
      {
        question: "Can my card show where we live — horses, the marina, the countryside?",
        answer:
          "That's my favorite kind of card. Send a photo or describe the scene, and I'll design an illustration or layout around it.",
      },
    ],
    events: [
      { name: "Lake County holiday guide", url: "https://www.visitlakecounty.org/holiday-guide" },
    ],
    nearby: ["gurnee", "waukegan", "pleasant-prairie", "antioch"],
  },

  "crystal-lake": {
    group: "mchenry",
    headline: "Christmas cards for Crystal Lake, from a McHenry County designer.",
    intro: [
      "Crystal Lake has one of the most festive downtowns in the area during the holidays, and your Christmas card can capture that same glow.",
      "I design custom cards for Crystal Lake families and businesses, proofed with you and printed as folded or flat 5×7 cards.",
    ],
    holidays: [
      "The Festival of Lights Parade — McHenry County's only nighttime parade — brings Santa downtown the night after Thanksgiving and ends with a tree lighting at the Brink Street Market courtyard.",
      "Through December, Christmas Tree Lane lines Brink and Grant Streets with trees decorated by local groups, Luminary Nights light up Williams Street on Thursday evenings, and the Park District's Luminaria Walk glows through Veteran Acres Park.",
    ],
    designIdeas: [
      {
        title: "Luminary night",
        body: "Candle-lit luminaries along a snowy sidewalk, in warm golds and deep blues.",
      },
      {
        title: "Christmas Tree Lane",
        body: "A row of individually decorated trees, one for each member of your family.",
      },
      {
        title: "Nighttime parade",
        body: "A dark, sparkling photo card inspired by the only nighttime parade in McHenry County.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 30,
      note: "Crystal Lake is about 30 minutes from Richmond, so cards can be hand delivered, or shipped if you prefer.",
    },
    faqs: [
      {
        question: "Can my card include a photo taken downtown?",
        answer:
          "Yes. Downtown Crystal Lake at night makes a gorgeous backdrop, and I can adjust the colors so the lights really glow in print.",
      },
      {
        question: "Do you work with Crystal Lake businesses?",
        answer: "Yes. Branded holiday cards and client mailers for local businesses are a big part of my season.",
      },
    ],
    events: [
      { name: "The holiday season in Downtown Crystal Lake", url: "https://downtowncl.org/holidays/" },
    ],
    nearby: ["mchenry", "algonquin", "woodstock", "hebron"],
    alsoServes: ["Lakewood"],
  },

  woodstock: {
    group: "mchenry",
    headline: "Christmas cards inspired by Woodstock's historic Square.",
    intro: [
      "Few places look more like a holiday card than the Woodstock Square in December, lit up with thousands of white lights around the historic district.",
      "I design custom Christmas cards for Woodstock families and businesses, from classic photo cards to illustrated scenes of the Square.",
    ],
    holidays: [
      "The Lighting of the Square opens the season in late November with Santa's arrival, Dickens carolers, and Woodstock Willie, followed by a Christmas parade.",
      "Famously, the lights stay up through Groundhog Days in early February. Woodstock stood in for Punxsutawney in the 1993 film \"Groundhog Day,\" and the town celebrates it every winter.",
    ],
    designIdeas: [
      {
        title: "The Square at night",
        body: "An illustrated Woodstock Square wrapped in white lights, with your family's greeting in the snowy park.",
      },
      {
        title: "Dickens carolers",
        body: "A Victorian caroling scene with top hats, lanterns, and antique lettering.",
      },
      {
        title: "Groundhog greetings",
        body: "A playful card starring a groundhog in a scarf, perfect for Woodstock families with a sense of humor.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 25,
      note: "Woodstock is about 25 minutes from Richmond, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Can you illustrate the Woodstock Square on my card?",
        answer:
          "Yes. A custom illustration of the Square is a special keepsake, and it pairs well with a family photo on the back of a flat card.",
      },
      {
        question: "Can I send cards after Christmas?",
        answer:
          "Sure. Plenty of people send New Year's cards, and in Woodstock the lights stay up well into winter, so a late card fits right in.",
      },
    ],
    events: [
      { name: "Lighting of the Square", url: "https://realwoodstock.com/event/annual-lighting-of-the-square/602/" },
      { name: "Woodstock annual events", url: "https://woodstockil.gov/435/Annual-Events" },
    ],
    nearby: ["crystal-lake", "mchenry", "hebron", "richmond"],
  },

  hebron: {
    group: "mchenry",
    headline: "Christmas cards for Hebron, from right next door.",
    intro: [
      "Hebron is a small village with a big story: in 1952, Hebron High School, with fewer than 100 students, won the Illinois state basketball championship. The water tower still wears a basketball paint job in its honor.",
      "Just minutes from the studio in Richmond, Hebron families get personal, hands-on service for their Christmas cards.",
    ],
    holidays: [
      "Hebron gathers at the Village Center each December for a Christmas Market and Memorial Tree Lighting, with a local market, Santa photos, hot cocoa and cookies, food trucks, and kids' crafts.",
    ],
    designIdeas: [
      {
        title: "Hometown water tower",
        body: "An illustrated winter view of Hebron's basketball water tower, for a card only Hebron could send.",
      },
      {
        title: "Memorial tree",
        body: "A gentle, meaningful design honoring loved ones, inspired by the Memorial Tree Lighting.",
      },
      {
        title: "Farm country Christmas",
        body: "Barns and snowy fields in warm, rustic colors.",
      },
    ],
    delivery: {
      method: "hand",
      driveMinutes: 10,
      note: "Hebron is about 10 minutes from Richmond, so cards are hand delivered or ready for quick pickup.",
    },
    faqs: [
      {
        question: "Can you design a memorial Christmas card?",
        answer:
          "Yes. Cards honoring a loved one who has passed can be gentle and beautiful. We'll choose the photo and wording together.",
      },
      {
        question: "Is pickup available for Hebron?",
        answer: "Yes. Hebron is close to the studio in Richmond, so pickup and hand delivery are both easy.",
      },
    ],
    events: [
      { name: "Christmas Market & Memorial Tree Lighting", url: "https://www.hebronvillage.org/calendar/christmas-market-amp-memorial-tree-lighting" },
    ],
    nearby: ["richmond", "genoa-city", "spring-grove", "woodstock"],
  },

  algonquin: {
    group: "mchenry",
    displayName: "Algonquin & Lake in the Hills",
    headline: "Christmas cards for Algonquin & Lake in the Hills.",
    intro: [
      "Algonquin's historic downtown on the Fox River and the neighborhoods of Lake in the Hills sit side by side, and both get custom Christmas cards designed around their own photos and style.",
      "I'm on this corridor regularly, so cards can be hand delivered or shipped, whichever is easier for you.",
    ],
    holidays: [
      "Algonquin's Miracle on Main fills the Main Street plaza with live holiday performances, ice sculptures, live reindeer, photos with Santa and Mrs. Claus, and a tree lighting at the historic village hall.",
      "Down by the Fox River, Holiday Rock on the Fox brings a tree lighting, Santa, and holiday music to Riverfront Park.",
    ],
    designIdeas: [
      {
        title: "Miracle on Main",
        body: "A festive downtown scene with ice sculptures and reindeer, in crisp winter blues and silver.",
      },
      {
        title: "Fox River lights",
        body: "The Fox River at dusk with a lit tree on the bank, for a calm, glowing card.",
      },
      {
        title: "Neighborhood photo card",
        body: "A clean, modern flat 5×7 with a full-bleed family photo and rounded corners, a favorite for busy families.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 40,
      note: "Algonquin and Lake in the Hills are about 40 minutes from Richmond, on a route I drive regularly, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Do you deliver to Lake in the Hills as well as Algonquin?",
        answer: "Yes. Both are on my regular route, with the same hand delivery or shipping options.",
      },
      {
        question: "Can my card show downtown Algonquin or the Fox River?",
        answer:
          "Absolutely. A custom illustration of a local spot makes a card people keep, and it pairs well with a family photo on the back.",
      },
    ],
    events: [
      { name: "Algonquin Miracle on Main", url: "https://mchenrylife.com/events/community-social-events/algonquin/miracle-on-main/" },
    ],
    nearby: ["crystal-lake", "west-dundee", "mchenry", "woodstock"],
  },

  "west-dundee": {
    group: "mchenry",
    displayName: "East & West Dundee",
    headline: "Christmas cards for East & West Dundee, Carpentersville & Sleepy Hollow.",
    intro: [
      "The Dundees know how to do an old-fashioned Christmas, and your cards can have that same Victorian warmth, or something completely modern.",
      "I design custom holiday cards for families and businesses in East Dundee, West Dundee, Carpentersville, and Sleepy Hollow, and I'm on this route regularly for hand delivery.",
    ],
    holidays: [
      "Dickens in Dundee turns downtown East and West Dundee into a Victorian Christmas the first weekend of December, with tree lightings in both villages, a Festival of Trees, Santa's East Side Market at the Depot, and Living Windows.",
      "The Riverside Parade of Lights ties it all together, starting in West Dundee, crossing the Main Street bridge into Carpentersville, and ending in East Dundee.",
    ],
    designIdeas: [
      {
        title: "Dickens in Dundee",
        body: "A Victorian street scene with gas lamps, top hats, and antique lettering.",
      },
      {
        title: "Parade of Lights",
        body: "Glowing parade floats crossing a bridge over the Fox River, on a deep night-blue card.",
      },
      {
        title: "Living windows",
        body: "Your family photo framed in a decorated shop window, inspired by the downtown displays.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 50,
      note: "The Dundees and Carpentersville are about 50 minutes from Richmond, on a route I drive regularly, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Do you serve Carpentersville and Sleepy Hollow too?",
        answer: "Yes. East Dundee, West Dundee, Carpentersville, and Sleepy Hollow all get hand delivery or shipping.",
      },
      {
        question: "Can you design a Victorian, Dickens-style card?",
        answer:
          "Yes, and it's a perfect fit for the Dundees. Think gas-lamp scenes, ornate borders, and antique colors, on either a folded or a flat card.",
      },
    ],
    events: [
      { name: "Dickens in Dundee", url: "https://www.dickensindundee.org/" },
    ],
    nearby: ["algonquin", "crystal-lake", "mchenry", "woodstock"],
    alsoServes: ["Carpentersville", "Sleepy Hollow"],
  },

  "lake-geneva": {
    group: "wisconsin",
    headline: "Christmas cards with Lake Geneva charm.",
    intro: [
      "Lake Geneva in winter is postcard-perfect: the Riviera on the frozen shore, grand lakefront estates, and a downtown dressed up for the holidays.",
      "I design custom Christmas cards for Lake Geneva families, lake homes, and businesses, from elegant photo cards to illustrated lake scenes.",
    ],
    holidays: [
      "The holidays in Lake Geneva include Santa cruises on Geneva Lake and the Grand Geneva's Gingerbread House Walk.",
      "Then in early February, Winterfest takes over Riviera Plaza and Flat Iron Park with America's Snow Sculpting Invitational, an ice sculpture walk downtown, and bonfires on the beach.",
    ],
    designIdeas: [
      {
        title: "The Riviera in snow",
        body: "An illustrated Riviera building on a frozen Geneva Lake, in soft blues and gold.",
      },
      {
        title: "Lake house holidays",
        body: "A cozy estate-style card for lake homes, with an elegant serif greeting.",
      },
      {
        title: "Snow sculpture",
        body: "A crisp white design with sculpted, dimensional lettering, inspired by Winterfest.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 20,
      note: "Lake Geneva is about 20 minutes from Richmond, just over the state line, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Can you ship cards to a primary home out of state?",
        answer:
          "Yes. Plenty of Lake Geneva homes are second homes, so I can ship finished cards to wherever you live, or hand deliver them to the lake house.",
      },
      {
        question: "Do you work with Lake Geneva businesses?",
        answer: "Yes. Resorts, shops, and restaurants can order branded holiday cards for guests and clients.",
      },
    ],
    events: [
      { name: "Lake Geneva Winterfest", url: "https://www.visitlakegeneva.com/winterfest/" },
      { name: "The holidays in Lake Geneva", url: "https://www.visitlakegeneva.com/blog/post/embrace-the-holiday-spirit-in-lake-geneva/" },
    ],
    nearby: ["genoa-city", "richmond", "kenosha", "pleasant-prairie"],
  },

  "genoa-city": {
    group: "wisconsin",
    headline: "Christmas cards for Genoa City, just across the state line.",
    intro: [
      "Genoa City sits just over the Wisconsin line from Richmond, only minutes from the studio, so Genoa City families get the same easy, local service as neighbors on the Illinois side.",
      "Every card is designed around your photos, proofed with you, and printed as a folded or flat 5×7 card.",
    ],
    holidays: [
      "The village celebrates the season in early December with the Jingle Bell Parade, Santa's arrival, and a tree lighting, plus wagon rides, a petting zoo, and letters to Santa.",
      "Nearby, Farm of Lights puts on a drive-through show with more than a hundred thousand LED lights and light tunnels, running nightly from late November through New Year's Eve.",
    ],
    designIdeas: [
      {
        title: "Jingle Bell Parade",
        body: "A cheerful illustrated parade with bells and wagons in bright, playful colors.",
      },
      {
        title: "Tunnel of lights",
        body: "A photo card framed in glowing arches, inspired by the drive-through light show.",
      },
      {
        title: "State-line greetings",
        body: "A fun card for families with roots on both sides of the Illinois–Wisconsin line.",
      },
    ],
    delivery: {
      method: "hand",
      driveMinutes: 10,
      note: "Genoa City is about 10 minutes from Richmond, so cards are hand delivered or ready for quick pickup.",
    },
    faqs: [
      {
        question: "Do you really serve Wisconsin?",
        answer:
          "Yes. Genoa City is closer to the studio than many Illinois towns, so delivery is quick and easy.",
      },
      {
        question: "Can you add a letter to Santa design for kids?",
        answer: "Yes. A folded card with a kid-drawn letter or artwork inside is a lovely keepsake for grandparents.",
      },
    ],
    events: [
      { name: "Celebrate the Season", url: "https://genoaareachamber.com/chamber-event/celebrate-the-season/" },
      { name: "Farm of Lights", url: "https://farmoflights.com/" },
    ],
    nearby: ["richmond", "lake-geneva", "hebron", "spring-grove"],
  },

  kenosha: {
    group: "wisconsin",
    headline: "Christmas cards with a Kenosha harbor and streetcar spirit.",
    intro: [
      "Kenosha has a holiday look all its own: the North Pier Lighthouse on Lake Michigan, the historic electric streetcars rolling through downtown, and a harbor that lights up for the season.",
      "I design custom Christmas cards for Kenosha families and businesses, built around your photos and printed as folded or flat 5×7 cards.",
    ],
    holidays: [
      "Kenosha's Lightin' Up Downtown and city tree lighting open the season the day after Thanksgiving, with a drone show over the harbor, family activities, and free streetcar rides all day.",
      "In December, the Holiday HarborMarket brings dozens of vendors, live music, and food to the lakefront.",
    ],
    designIdeas: [
      {
        title: "Streetcar Christmas",
        body: "A vintage electric streetcar decked in garland, rolling through a snowy downtown.",
      },
      {
        title: "North Pier Lighthouse",
        body: "Kenosha's lighthouse against a winter Lake Michigan sky, with a warm greeting.",
      },
      {
        title: "Harbor lights",
        body: "A night photo card with twinkling harbor reflections and bold modern type.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 45,
      note: "Kenosha is about 45 minutes from Richmond, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Can you illustrate a Kenosha streetcar or the lighthouse?",
        answer:
          "Yes. A custom local illustration makes a card people keep, and it works well on the front of a folded card or the back of a flat one.",
      },
      {
        question: "Do you make holiday cards for Kenosha businesses?",
        answer: "Yes. Branded client cards and team greetings for Kenosha businesses are welcome.",
      },
    ],
    events: [
      { name: "Lightin' Up Downtown Kenosha", url: "https://www.visitkenosha.com/holidays/lightin-up/" },
      { name: "Kenosha Holiday HarborMarket", url: "https://www.visitkenosha.com/event/kenosha-holiday-winter-harbormarket/394/" },
    ],
    nearby: ["pleasant-prairie", "lake-geneva", "waukegan", "wadsworth"],
    alsoServes: ["Paddock Lake", "Wheatland", "New Munster", "Slades Corners"],
  },

  "pleasant-prairie": {
    group: "wisconsin",
    headline: "Christmas cards for Pleasant Prairie families.",
    intro: [
      "Pleasant Prairie mixes lakeside parks with some of the area's brightest holiday displays, and the village even puts together its own holiday lights tour.",
      "I design custom Christmas cards for Pleasant Prairie families and businesses, from bright photo cards to elegant designs with a family letter inside.",
    ],
    holidays: [
      "In December, Pleasant Prairie's self-guided Holiday Lights Tour points families to the village's best displays, with treats and activities along the route.",
      "The season ends with a unique tradition: the Twelfth Night Holiday Tree Bonfire on January 6, when bare holiday trees are burned on the shore of Lake Andrea while neighbors warm up with hot chocolate.",
    ],
    designIdeas: [
      {
        title: "Lights tour",
        body: "A photo card with a map-style border of twinkling house lights.",
      },
      {
        title: "Twelfth Night glow",
        body: "Warm bonfire oranges against a snowy lakeshore, for a card that feels like the whole season.",
      },
      {
        title: "Lake Andrea winter",
        body: "A calm, minimal lakeside scene in cool winter tones.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 40,
      note: "Pleasant Prairie is about 40 minutes from Richmond, so cards can be hand delivered or shipped.",
    },
    faqs: [
      {
        question: "Can I send a card after Christmas, like a New Year's card?",
        answer:
          "Yes. New Year's cards are a great option, especially if December gets busy, and they fit Pleasant Prairie's Twelfth Night tradition.",
      },
      {
        question: "Do you deliver to Pleasant Prairie?",
        answer: "Yes. Hand delivery or shipping are both available.",
      },
    ],
    events: [
      { name: "Pleasant Prairie Holiday Lights Tour", url: "https://www.visitpleasantprairie.com/things-to-do/signature-experiences/holiday-lights-tour/" },
    ],
    nearby: ["kenosha", "wadsworth", "lake-geneva", "gurnee"],
  },

  chicago: {
    group: "chicago",
    headline: "Custom Christmas cards for Chicago, neighborhood by neighborhood.",
    intro: [
      "Chicago families and businesses get the same thing my suburban clients do: a Christmas card designed from scratch around your photos, your style, and your neighborhood, not a template.",
      "Whether your card photo was taken on the lakefront, in front of a greystone in Logan Square, or under the lights on Michigan Avenue, the design is built around it.",
    ],
    holidays: [
      "Chicago's season officially kicks off with the Magnificent Mile Lights Festival, when Michigan Avenue glows with more than a million lights, followed by fireworks over the Chicago River.",
      "Christkindlmarket has brought German holiday traditions to Daley Plaza every year since 1996, with a second market in Wrigleyville, and ZooLights fills Lincoln Park Zoo with millions of lights through the new year.",
    ],
    designIdeas: [
      {
        title: "Skyline in snow",
        body: "An illustrated Chicago skyline under falling snow, with your greeting across the lake.",
      },
      {
        title: "Your neighborhood",
        body: "A card that names and celebrates your neighborhood, from Andersonville to Pilsen to Hyde Park.",
      },
      {
        title: "Christkindlmarket",
        body: "A cozy German-market design with wooden stalls, mugs of cocoa, and string lights.",
      },
    ],
    delivery: {
      method: "both",
      driveMinutes: 90,
      note: "Finished cards can be shipped to your door anywhere in the city, or hand delivered — just let me know which works best for you.",
    },
    faqs: [
      {
        question: "Do you work with Chicago clients even though you're in Richmond?",
        answer:
          "Yes. Photos and proofs are easy to handle online, and finished cards are shipped anywhere in the city or hand delivered, whichever you prefer.",
      },
      {
        question: "Can my card mention my Chicago neighborhood?",
        answer:
          "Absolutely. Neighborhood names, landmarks, and local touches make a Chicago card feel personal, and they're one of my favorite details to design.",
      },
      {
        question: "How early should Chicago clients order?",
        answer: "Aim for October or early November to leave time for proofs, printing, and delivery before the holiday rush.",
      },
    ],
    events: [
      { name: "Magnificent Mile Lights Festival", url: "https://themagnificentmile.com/lights-festival/" },
      { name: "Christkindlmarket Chicago", url: "https://www.christkindlmarket.com/" },
      { name: "ZooLights at Lincoln Park Zoo", url: "https://www.lpzoo.org/zoolights/" },
      { name: "Chicago holiday traditions", url: "https://www.choosechicago.com/articles/holidays/top-chicago-winter-holiday-traditions/" },
    ],
    nearby: ["waukegan", "gurnee", "kenosha", "crystal-lake"],
    neighborhoods: [
      { area: "Downtown & Near North", names: ["Loop / Downtown", "West Loop", "River North", "Gold Coast", "Old Town"] },
      {
        area: "North Side & Lakefront",
        names: [
          "Lincoln Park",
          "Lakeview",
          "Roscoe Village",
          "Lincoln Square",
          "Andersonville",
          "Uptown",
          "Edgewater",
          "Rogers Park",
        ],
      },
      {
        area: "Northwest & West Side",
        names: [
          "Wicker Park",
          "Bucktown",
          "Logan Square",
          "Avondale",
          "Irving Park",
          "Albany Park",
          "Pilsen",
          "Little Village",
        ],
      },
      { area: "South Side", names: ["Chinatown", "Bridgeport", "Bronzeville", "Hyde Park"] },
    ],
  },
};

/** Stable key for a town, from its name: "Lake in the Hills" -> "lake-in-the-hills". */
export function townKey(town: Town): string {
  return town.name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export type ChristmasTownPage = {
  key: string;
  town: Town;
  /** Page name: displayName, or the town's own name. */
  name: string;
  slug: string;
  content: ChristmasTownContent;
};

/** Every town page, grouped in TOWN_GROUPS order and otherwise in CHRISTMAS_TOWNS order. */
export function getChristmasTownPages(): ChristmasTownPage[] {
  const pages: ChristmasTownPage[] = [];
  for (const [key, content] of Object.entries(CHRISTMAS_TOWNS)) {
    const town = TOWNS.find((t) => townKey(t) === key);
    if (!town) continue; // key not in towns.ts — skip rather than break the build
    pages.push({
      key,
      town,
      name: content.displayName ?? town.name,
      slug: `${key}-${town.state.toLowerCase()}`,
      content,
    });
  }
  const order = TOWN_GROUPS.map((g) => g.id);
  return pages.sort((x, y) => order.indexOf(x.content.group) - order.indexOf(y.content.group));
}

export function getChristmasTownBySlug(slug: string): ChristmasTownPage | undefined {
  return getChristmasTownPages().find((p) => p.slug === slug);
}

export function getChristmasTownByKey(key: string): ChristmasTownPage | undefined {
  return getChristmasTownPages().find((p) => p.key === key);
}
