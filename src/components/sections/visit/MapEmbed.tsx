import { CONTACT } from "@/lib/site";

/**
 * Google Maps integration point. Set CONTACT.mapEmbedUrl (lib/site.ts) to a
 * Google Maps "Embed a map" URL and a lazy-loaded iframe replaces the
 * illustrated placeholder below.
 */
export default function MapEmbed() {
  if (CONTACT.mapEmbedUrl) {
    return (
      <iframe
        src={CONTACT.mapEmbedUrl}
        title="Map showing the café location"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="aspect-[4/3] w-full border-0"
      />
    );
  }

  return (
    <figure>
      <svg viewBox="0 0 320 240" role="img" aria-labelledby="map-title" className="block h-auto w-full">
        <title id="map-title">Illustrated map placeholder — the Google Maps embed appears here once configured</title>
        <rect width="320" height="240" fill="var(--color-ivory)" />
        <g fill="var(--color-sand)">
          <rect x="18" y="18" width="92" height="64" />
          <rect x="128" y="18" width="70" height="64" />
          <rect x="216" y="18" width="86" height="64" />
          <rect x="18" y="104" width="92" height="118" />
          <rect x="128" y="104" width="70" height="50" />
          <rect x="128" y="168" width="70" height="54" />
          <rect x="216" y="104" width="86" height="118" />
        </g>
        <rect x="236" y="124" width="48" height="76" fill="var(--color-muted)" opacity="0.35" />
        <g stroke="var(--color-white)" strokeWidth="14">
          <path d="M0 93h320M119 0v240M207 0v240" />
        </g>
        <path d="M128 161h70" stroke="var(--color-white)" strokeWidth="6" />
        <g transform="translate(176 161)">
          <circle r="9" fill="var(--color-terracotta)" className="origin-center [transform-box:fill-box] [animation:map-pulse_3s_cubic-bezier(0.22,1,0.36,1)_1s_4_both]" />
          <circle r="6.5" fill="var(--color-terracotta)" stroke="var(--color-ivory)" strokeWidth="2.5" />
        </g>
      </svg>
      <figcaption className="eyebrow flex flex-wrap justify-between gap-x-3 gap-y-1 px-1.5 pb-3.5 pt-3 text-[0.625rem] text-espresso sm:text-[0.6875rem]">
        <span className="whitespace-nowrap text-ink">Brew &amp; Bean</span>
        <span className="whitespace-nowrap">Map placeholder</span>
      </figcaption>
    </figure>
  );
}
