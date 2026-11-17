/**
 * Site configuration — the single place to change brand copy, links and
 * business details. Address, phone, email and map are intentionally
 * PLACEHOLDERS: replace them with the client's real details before launch.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE = {
  name: "Brew & Bean",
  title: "Brew & Bean — Specialty Coffee, Melbourne",
  positioning: "Good Coffee. Better Moments.",
  description:
    "Brew & Bean is an independent specialty coffee house in Melbourne. Thoughtfully sourced beans, carefully crafted coffee, and moments worth slowing down for.",
  statement: "Specialty coffee, roasted with care and poured with intention — a quieter kind of daily ritual.",
};

export const NAV_LINKS = [
  { href: "#story", label: "Our Story", id: "story" },
  { href: "#menu", label: "Coffee Menu", id: "menu" },
  { href: "#craft", label: "Our Craft", id: "craft" },
  { href: "#journal", label: "Journal", id: "journal" },
] as const;

export const VISIT_CTA = { href: "#visit", label: "Visit Our Café" } as const;

/** Placeholder contact details — clearly fictional, not a real business. */
export const CONTACT = {
  addressLines: ["123 Example Street", "Melbourne VIC 3000"],
  addressNote: "Address placeholder",
  phoneDisplay: "+61 3 0000 0000",
  phoneHref: "tel:+61300000000",
  email: "hello@example.com",
  /** Paste a Google Maps "Embed a map" URL here to replace the illustrated placeholder. */
  mapEmbedUrl: null as string | null,
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=Melbourne+VIC",
};

export const HOURS = [
  { label: "Monday – Friday", days: [1, 2, 3, 4, 5], open: 7, close: 16, text: "7:00am – 4:00pm" },
  { label: "Saturday", days: [6], open: 8, close: 16, text: "8:00am – 4:00pm" },
  { label: "Sunday", days: [0], open: 8, close: 15, text: "8:00am – 3:00pm" },
] as const;

export const SOCIAL = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.tiktok.com/", label: "TikTok" },
  { href: "https://www.pinterest.com/", label: "Pinterest" },
] as const;
