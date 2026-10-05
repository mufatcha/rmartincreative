// Government passport acceptance facilities near the towns served, for the local
// passport photo pages (/passport-photos/[town]). Government offices only — no
// private or "expedited passport" businesses.
//
// Sources (checked 2026-10-05):
//  - Post offices: USPS location data (tools.usps.com) — only offices that list
//    passport application acceptance, with their local phone numbers.
//  - County offices: each county's official website.
//  - Chicago Passport Agency: travel.state.gov.
// Hours and appointment rules change, so recheck this file every year or two,
// and pages tell visitors to call ahead.

export const PASSPORT_OFFICES_CHECKED = "October 2026";

export type PassportOffice = {
  name: string;
  kind: "usps" | "county" | "state";
  street: string;
  city: string;
  state: "IL" | "WI";
  zip: string;
  phone: string;
  /** Official page for hours and appointments. */
  url: string;
  /** Short plain-language notes: hours, appointments, what it handles. */
  notes?: string;
};

const usps = (id: string) => `https://tools.usps.com/locations/details/${id}`;
const USPS_NOTE = "Post office passport acceptance. Book an appointment online at usps.com or call ahead.";

export const PASSPORT_OFFICES = {
  "usps-wilmot": {
    name: "Wilmot Post Office",
    kind: "usps",
    street: "30725 113th St",
    city: "Wilmot",
    state: "WI",
    zip: "53192",
    phone: "(262) 862-2728",
    url: usps("1387857"),
    notes: USPS_NOTE,
  },
  "usps-mchenry": {
    name: "McHenry Post Office",
    kind: "usps",
    street: "4530 W Crystal Lake Rd",
    city: "McHenry",
    state: "IL",
    zip: "60050",
    phone: "(815) 385-2108",
    url: usps("1372345"),
    notes: USPS_NOTE,
  },
  "usps-island-lake": {
    name: "Island Lake Post Office",
    kind: "usps",
    street: "129 E State Rd",
    city: "Island Lake",
    state: "IL",
    zip: "60042",
    phone: "(847) 526-6153",
    url: usps("1368097"),
    notes: USPS_NOTE,
  },
  "usps-crystal-lake": {
    name: "Crystal Lake Post Office",
    kind: "usps",
    street: "301 E Congress Pkwy",
    city: "Crystal Lake",
    state: "IL",
    zip: "60014",
    phone: "(815) 459-8084",
    url: usps("1359961"),
    notes: USPS_NOTE,
  },
  "usps-woodstock": {
    name: "Woodstock Post Office",
    kind: "usps",
    street: "1050 Country Club Rd",
    city: "Woodstock",
    state: "IL",
    zip: "60098",
    phone: "(815) 338-1094",
    url: usps("1388249"),
    notes: USPS_NOTE,
  },
  "usps-algonquin": {
    name: "Algonquin Post Office",
    kind: "usps",
    street: "801 W Algonquin Rd",
    city: "Algonquin",
    state: "IL",
    zip: "60102",
    phone: "(847) 658-0012",
    url: usps("1352686"),
    notes: USPS_NOTE,
  },
  "usps-elgin": {
    name: "Elgin Post Office",
    kind: "usps",
    street: "66 Grove Ct",
    city: "Elgin",
    state: "IL",
    zip: "60120",
    phone: "(847) 741-0725",
    url: usps("1362263"),
    notes: USPS_NOTE,
  },
  "usps-lake-villa": {
    name: "Lake Villa Post Office",
    kind: "usps",
    street: "206 Cedar Ave",
    city: "Lake Villa",
    state: "IL",
    zip: "60046",
    phone: "(847) 356-5995",
    url: usps("1369650"),
    notes: USPS_NOTE,
  },
  "usps-round-lake": {
    name: "Round Lake Post Office",
    kind: "usps",
    street: "1940 N Municipal Way",
    city: "Round Lake",
    state: "IL",
    zip: "60073",
    phone: "(847) 740-6528",
    url: usps("1379968"),
    notes: USPS_NOTE,
  },
  "usps-gurnee": {
    name: "Gurnee Post Office",
    kind: "usps",
    street: "1 N O'Plaine Rd",
    city: "Gurnee",
    state: "IL",
    zip: "60031",
    phone: "(847) 662-6943",
    url: usps("1365871"),
    notes: USPS_NOTE,
  },
  "usps-waukegan": {
    name: "Waukegan Post Office",
    kind: "usps",
    street: "326 N Genesee St",
    city: "Waukegan",
    state: "IL",
    zip: "60085",
    phone: "(847) 662-6802",
    url: usps("1386669"),
    notes: USPS_NOTE,
  },
  "usps-lake-geneva": {
    name: "Lake Geneva Post Office",
    kind: "usps",
    street: "672 W Main St",
    city: "Lake Geneva",
    state: "WI",
    zip: "53147",
    phone: "(262) 248-3545",
    url: usps("1438328"),
    notes: USPS_NOTE,
  },
  "usps-elkhorn": {
    name: "Elkhorn Post Office",
    kind: "usps",
    street: "102 E Walworth St",
    city: "Elkhorn",
    state: "WI",
    zip: "53121",
    phone: "(262) 723-2679",
    url: usps("1362333"),
    notes: USPS_NOTE,
  },
  "mchenry-county-treasurer": {
    name: "McHenry County Treasurer's Office",
    kind: "county",
    street: "2100 N Seminary Ave",
    city: "Woodstock",
    state: "IL",
    zip: "60098",
    phone: "(815) 334-4260",
    url: "https://www.mchenrycountyil.gov/departments/treasurer/passport-services",
    notes:
      "McHenry County's passport desk. Monday–Friday, 7:30 a.m.–4 p.m.; schedule online, or walk in when staff are available.",
  },
  "lake-county-circuit-clerk": {
    name: "Lake County Circuit Clerk, Passport Division",
    kind: "county",
    street: "18 N County St, 1st Floor",
    city: "Waukegan",
    state: "IL",
    zip: "60085",
    phone: "(847) 377-3351",
    url: "https://www.lakecountycircuitclerk.org/173/Apply-for-a-Passport",
    notes:
      "Monday–Friday, 8:30 a.m.–1:30 p.m. (last application at 1 p.m.). Appointments are recommended for families applying for three or more passports.",
  },
  "kane-county-clerk": {
    name: "Kane County Clerk's Office",
    kind: "county",
    street: "719 S Batavia Ave, Building B",
    city: "Geneva",
    state: "IL",
    zip: "60134",
    phone: "(630) 232-5964",
    url: "https://clerk.kanecountyil.gov/VitalRecords/Pages/Passports.aspx",
    notes:
      "No appointment needed. Monday, Tuesday, Thursday, and Friday 8:30 a.m.–4:30 p.m.; Wednesday until 8 p.m. Arrive at least 30 minutes before closing.",
  },
  "chicago-passport-agency": {
    name: "Chicago Passport Agency (U.S. Department of State)",
    kind: "state",
    street: "101 Ida B. Wells Dr, 9th Floor",
    city: "Chicago",
    state: "IL",
    zip: "60605",
    phone: "1-877-487-2778",
    url: "https://travel.state.gov/en/passports/apply/get-fast/make-appointment/chicago.html",
    notes:
      "By appointment only, for urgent international travel within 14 days (or a foreign visa needed within 28 days). Book by calling the National Passport Information Center at the number listed.",
  },
} satisfies Record<string, PassportOffice>;

export type PassportOfficeId = keyof typeof PASSPORT_OFFICES;

export function getPassportOffice(id: PassportOfficeId): PassportOffice {
  return PASSPORT_OFFICES[id];
}

/** Google Maps search link for an office's address. */
export function mapsUrl(o: PassportOffice): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${o.name}, ${o.street}, ${o.city}, ${o.state} ${o.zip}`)}`;
}
