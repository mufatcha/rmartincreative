export const BUSINESS_NAME = "Ryan Martin Design & Print";
export const BUSINESS_PHONE_DISPLAY = "(XXX) XXX-XXXX"; // TODO: swap before launch
export const BUSINESS_PHONE_TEL = "tel:+1XXXXXXXXXX"; // TODO: swap before launch
export const BUSINESS_EMAIL = "mufatcha@gmail.com";

const PRODUCTION_URL = "https://rmartincreative.com";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");

export const SERVICE_AREA_CITIES = [
  "Richmond",
  "Spring Grove",
  "Fox Lake",
  "Round Lake",
  "Antioch",
  "Lake Villa",
  "Wadsworth",
  "Gurnee",
] as const;

export const SERVICE_HUB_CITY = "Gurnee";
export const SERVICE_HOME_CITY = "Richmond";
export const SERVICE_STATE = "Illinois";
export const SERVICE_STATE_ABBR = "IL";
