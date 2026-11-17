import Image from "next/image";
import heroPourover from "@/assets/images/hero-pourover.jpg";
import { ButtonLink, TextLink } from "@/components/ui/Button";

/*
 * Hero — cinematic, full-screen.
 * One dark photograph (a pour-over being brewed at the bar) fills the viewport, settles in
 * with a slow zoom and keeps breathing very gently. Shading layers keep ivory text legible
 * over every part of the photo. Café details sit along the bottom edge.
 *
 * Performance & access:
 * - Server Component, zero client JS. Entrance and motion are pure CSS (transform only), so
 *   the photograph (LCP) paints on frame one and never waits for hydration.
 * - Scroll parallax uses CSS scroll-driven animations where supported; otherwise it is static.
 * - Reduced motion: everything resolves to its final state; nothing drifts.
 */

const DETAILS = [
  { label: "On the bar today", value: "Guji, Ethiopia", note: "Jasmine · Bergamot · Peach" },
  { label: "Open daily", value: "From 7am", note: "Weekends from 8am" },
  { label: "Roasted", value: "Every week", note: "Small batches, in-house" },
];

const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as React.CSSProperties;

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-clip bg-night text-ivory">
      {/* Photograph + shading */}
      <div className="absolute inset-0 -z-10">
        <div className="hero-parallax absolute inset-0">
          <div className="hero-breathe absolute inset-0">
            <Image
              src={heroPourover}
              alt="A barista pouring hot water from a gooseneck kettle into a pour-over brewer on a dim café bar"
              fill
              priority
              quality={85}
              sizes="100vw"
              placeholder="blur"
              // Portrait screens crop to the kettle and the pour; wide screens show the whole bar
              className="hero-zoom object-cover object-[67%_50%] lg:object-[42%_50%]"
            />
          </div>
        </div>
        {/* Even tone over the whole photo, a deeper pool behind the headline, and darker edges top and bottom */}
        {/* Portrait crops put the bright filter paper behind the copy, so small screens get a deeper tone */}
        <div className="absolute inset-0 bg-night/60 lg:bg-night/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_50%,rgb(36_26_22/0.6),transparent_80%)]" />
        <div className="absolute inset-x-0 top-0 h-56 bg-linear-to-b from-night/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[55%] bg-linear-to-t from-night via-night/70 to-transparent" />
      </div>

      <div className="hero-recede container-editorial flex flex-1 flex-col pt-[var(--nav-h)]">
        {/* Centre stage */}
        <div className="flex flex-1 flex-col items-center justify-center py-[clamp(1.5rem,6vh,6rem)] text-center">
          <p
            className="rise-in eyebrow flex items-center gap-4 text-sand before:h-px before:w-8 before:bg-current after:h-px after:w-8 after:bg-current"
            style={delay(200)}
          >
            Specialty Coffee · Melbourne
          </p>

          <h1
            id="hero-title"
            className="mt-[clamp(1.25rem,4vh,2.5rem)] text-[clamp(2.75rem,min(0.35rem+13.6vw,15.5vh),8.75rem)] leading-[0.9] tracking-[-0.03em]"
          >
            {/* nowrap guarantees the two-line break; the size keeps each line inside the viewport */}
            <span className="line-mask whitespace-nowrap">
              <span style={delay(350)}>Good Coffee.</span>
            </span>{" "}
            <span className="line-mask whitespace-nowrap">
              <span style={delay(480)}>
                Better <em className="font-normal italic text-sand">Moments.</em>
              </span>
            </span>
          </h1>

          {/* slide-in (no fade): may be the LCP element on phones, so it is visible from frame one */}
          <p
            className="slide-in mt-[clamp(1.25rem,3.5vh,2.25rem)] max-w-[40ch] text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] leading-relaxed text-sand"
            style={delay(650)}
          >
            Thoughtfully sourced beans, carefully crafted coffee, and beautiful moments worth slowing down for.
          </p>

          <div className="rise-in mt-[clamp(1.75rem,4.5vh,2.75rem)] flex flex-col items-center gap-5 xs:flex-row xs:gap-8" style={delay(800)}>
            <ButtonLink href="#menu">Explore Our Coffee</ButtonLink>
            <TextLink href="#visit" tone="ivory">
              Visit Our Café
            </TextLink>
          </div>
        </div>

        {/* Café details along the bottom edge: a label/value list on phones, three columns from tablet up */}
        <div className="rise-in pb-[clamp(1.25rem,4vh,2.5rem)]" style={delay(1000)}>
          <dl className="grid grid-cols-1 border-t border-ivory/20 sm:grid-cols-3">
            {DETAILS.map((d, i) => (
              <div
                key={d.label}
                className={`flex items-baseline justify-between gap-4 border-b border-ivory/10 py-3 sm:block sm:border-b-0 sm:pb-0 sm:pt-5 ${
                  i > 0 ? "sm:border-l sm:border-ivory/15 sm:pl-[clamp(1rem,2.5vw,2.5rem)]" : ""
                } ${i < 2 ? "sm:pr-[clamp(1rem,2.5vw,2.5rem)]" : ""}`}
              >
                <dt className="eyebrow flex items-center gap-2 whitespace-nowrap text-sand">
                  {i === 0 && <span aria-hidden className="size-1.5 rounded-full bg-terracotta [animation:pulse-soft_2.4s_ease-in-out_4]" />}
                  {d.label}
                </dt>
                <dd className="text-right sm:mt-2 sm:text-left">
                  <span className="block whitespace-nowrap font-serif text-[clamp(1.3rem,1.1rem+0.5vw,1.6rem)] leading-tight text-ivory">{d.value}</span>
                  <span className="hidden text-xs text-sand sm:block">{d.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
