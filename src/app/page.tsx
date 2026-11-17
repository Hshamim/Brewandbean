import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import BrandStory from "@/components/sections/BrandStory";
import CoffeeMenu from "@/components/sections/CoffeeMenu";
import CraftSection from "@/components/sections/CraftSection";
import Gallery from "@/components/sections/Gallery";
import BrandStatement from "@/components/sections/BrandStatement";
import VisitCafe from "@/components/sections/VisitCafe";
import { HOURS, SITE, SITE_URL } from "@/lib/site";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const time = (h: number) => `${String(h).padStart(2, "0")}:00`;

/*
 * LocalBusiness structured data. Street address and phone are deliberately
 * omitted while the site uses placeholder contact details — add the real ones
 * (streetAddress, postalCode, telephone, geo) before launch.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: SITE.name,
  slogan: SITE.positioning,
  description: SITE.description,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image.jpg`,
  priceRange: "$",
  servesCuisine: "Specialty coffee",
  hasMenu: `${SITE_URL}/#menu`,
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "AU",
  },
  openingHoursSpecification: HOURS.map((h) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
    opens: time(h.open),
    closes: time(h.close),
  })),
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <a
        href="#main"
        className="skip-link fixed left-3 top-3 z-[100] -translate-y-[160%] bg-ink px-4 py-3 font-sans text-sm text-ivory transition-transform focus-visible:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <BrandStory />
        <CoffeeMenu />
        <CraftSection />
        <Gallery />
        <BrandStatement />
        <VisitCafe />
      </main>
      <Footer />
    </>
  );
}
