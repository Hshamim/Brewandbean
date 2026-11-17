# Brew & Bean — Specialty Coffee, Melbourne

A portfolio project by **Code Shikhor**: an editorial homepage for a fictional, premium independent specialty coffee house.

## Stack

- **Next.js 16** (App Router, Turbopack), **React 19**, **TypeScript**
- **Tailwind CSS v4**: design tokens live in `@theme` in `src/app/globals.css`
- **Framer Motion**: scroll reveals, image reveals, menu tab transitions and the mobile menu
- **Lucide**: interface icons
- `next/font`: **Cormorant Garamond** for headings and **DM Sans** for body text, self-hosted with no layout shift
- `next/image`: statically imported photography with automatic sizing, AVIF/WebP and blur placeholders

## Run

```bash
npm install
npm run dev                   # http://localhost:3000
npm run build && npm start    # production build
```

## Deploy

Set the public URL so canonical links, Open Graph/Twitter cards, `robots.txt`, `sitemap.xml` and the JSON-LD use the real domain:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

On Vercel the production domain is picked up automatically.

## Before launch: replace the placeholders

All business details live in **`src/lib/site.ts`**:

- `CONTACT.addressLines`, `phoneDisplay`, `phoneHref` and `email` are **placeholders** (`123 Example Street`, `+61 3 0000 0000`, `hello@example.com`)
- `CONTACT.mapEmbedUrl`: paste a Google Maps "Embed a map" URL and a lazy-loaded iframe replaces the illustrated map
- `HOURS` and `SOCIAL` (social links currently point to the platforms' home pages)
- Then add `streetAddress`, `postalCode` and `telephone` to the JSON-LD in `src/app/page.tsx`

Menu content and prices live in **`src/lib/menu.ts`** (prices are fictional demo values in AUD).

## Structure

```
src/
  app/                layout (fonts, metadata), page (section order + JSON-LD), globals.css (design system)
                      icon.svg, apple-icon.png, favicon.ico, opengraph/twitter images, robots.ts, sitemap.ts
  lib/
    site.ts           brand copy, navigation, contact placeholders, hours, social links
    menu.ts           menu categories, items, prices and dietary information
  components/
    layout/           Navbar, Footer
    sections/         Hero, BrandStory, CoffeeMenu, CraftSection, Gallery, BrandStatement, VisitCafe, Newsletter
      visit/          OpeningHours (live "open now"), MapEmbed, ReservationDialog
    ui/               Button / ButtonLink / TextLink, SectionHeading + SectionMeta, Reveal, ImageReveal, Brand
    Providers.tsx     MotionConfig (reduced motion) + scrollbar measurement for full-bleed images
  assets/images/      photography (Unsplash License)
```

## Design system

| Token | Colour | Use |
|---|---|---|
| `ivory` | `#F5F1E9` | primary background |
| `sand` | `#EAE3D7` | secondary background, secondary text on dark |
| `ink` | `#211A16` | primary text |
| `espresso` | `#33231C` | brand dark section, small secondary text |
| `terracotta` | `#B94E37` | accent: CTAs, "Moments.", focus rings |
| `muted` | `#81766B` | large text, rules and decoration only |
| `white` | `#FFFFFF` | Our Craft section, button labels on terracotta |
| `night` | `#241A16` | footer |

Tailwind's default palette is reset, so only these colours exist in the codebase. Every text pairing is WCAG AA:

- **Muted** (3.9:1) and **terracotta** (4.4:1) are kept to large type on ivory.
- **Buttons** use white text on terracotta (5.0:1).

## Accessibility & performance

- **Contrast:** axe-core reports zero violations at 320–1920px.
- **Keyboard:**
  - The skip link moves focus to the main content.
  - Focus rings are terracotta from the first frame on every surface. The outline colour is pre-set so `transition-colors` can't fade it in.
  - The header reappears when it receives focus.
  - The coffee menu follows the WAI-ARIA tabs pattern: arrow keys, Home and End.
- **Mobile menu:** built with `AnimatePresence`. Opening it moves focus inside and makes the page behind it inert. Escape closes it and returns focus to the toggle.
- **Reservation dialog:** uses the native `<dialog>` element, so focus trapping, Escape-to-close and focus return come from the browser. It validates each field with linked error messages.
- **Motion:** respects `prefers-reduced-motion`. Without JavaScript, all content is still visible.
- **In-page navigation:** every same-page link (navbar, mobile menu, hero buttons, footer) goes through one handler in `Providers.tsx`. It waits for the mobile menu to release its scroll lock, scrolls smoothly (instantly with reduced motion) and moves focus into the target section, so the next Tab continues from there. Sections use a negative `scroll-margin-top`, so the chapter mark and headline land just below the navbar instead of behind the section's top padding.
- **Hero:** a full-screen cinematic photograph (a Server Component with zero client JS). The entrance zoom, slow "breathing" and scroll parallax are pure CSS and transform-only (scroll-driven animations where supported), so the LCP image paints on the first frame instead of waiting for hydration. Layered shading keeps every line of hero text at WCAG AA over the photo; the navbar is transparent with light text over the hero and turns solid ivory once the page scrolls.

## Notes

- Brand, menu and prices are fictional. The newsletter and reservation forms validate in the browser only and send nothing.
- Photography from [Unsplash](https://unsplash.com) under the Unsplash License. Replace it with commissioned shots for a real client.
