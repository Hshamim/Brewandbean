import Image, { type StaticImageData } from "next/image";
import closeup from "@/assets/images/gallery-closeup.jpg";
import espressoBar from "@/assets/images/gallery-espresso.jpg";
import beans from "@/assets/images/gallery-portafilters.jpg";
import pourOver from "@/assets/images/gallery-barista.jpg";
import interior from "@/assets/images/gallery-interior.jpg";
import together from "@/assets/images/gallery-together.jpg";
import { SectionMeta, SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";

type Shot = { src: StaticImageData; alt: string; caption: string; sizes: string; place: string; depth: number };

/*
 * Editorial grid: 12 columns × fixed row unit, every frame placed by hand,
 * leaving deliberate open cells (one holds the pull-quote). Mobile becomes a
 * two-column mosaic with dense packing.
 */
const SHOTS: Shot[] = [
  {
    src: closeup,
    alt: "Overhead view of a cappuccino with leaf latte art on a white saucer",
    caption: "The morning cappuccino",
    sizes: "(max-width: 767px) 92vw, 40vw",
    place: "col-span-2 row-span-4 md:[grid-column:1/6] md:[grid-row:1/8]",
    depth: 0,
  },
  {
    src: beans,
    alt: "Three portafilters holding latte art, fresh grounds and whole roasted beans",
    caption: "Bean, grind, pour",
    sizes: "(max-width: 767px) 46vw, 24vw",
    place: "col-span-1 row-span-3 md:[grid-column:6/9] md:[grid-row:2/6]",
    depth: 70,
  },
  {
    src: interior,
    alt: "A light-filled café interior with hanging plants and timber tables",
    caption: "The front room, 8:15am",
    sizes: "(max-width: 767px) 46vw, 32vw",
    place: "col-span-1 row-span-2 md:[grid-column:9/13] md:[grid-row:1/5]",
    depth: 45,
  },
  {
    src: pourOver,
    alt: "A barista preparing a row of pour-over coffees at the brew bar",
    caption: "Pour-over at the brew bar",
    sizes: "(max-width: 767px) 46vw, 24vw",
    place: "col-span-1 row-span-3 md:[grid-column:10/13] md:[grid-row:6/12]",
    depth: 0,
  },
  {
    src: espressoBar,
    alt: "A polished espresso machine with portafilters, warmly lit behind the bar",
    caption: "Espresso, pulled to order",
    sizes: "(max-width: 767px) 46vw, 24vw",
    place: "col-span-1 row-span-2 md:[grid-column:2/5] md:[grid-row:9/13]",
    depth: -30,
  },
  {
    src: together,
    alt: "Friends bringing their coffee cups together over a table",
    caption: "Coffee, together",
    sizes: "(max-width: 767px) 92vw, 40vw",
    place: "col-span-2 row-span-3 md:[grid-column:5/10] md:[grid-row:8/12]",
    depth: 0,
  },
];

export default function Gallery() {
  return (
    <section id="journal" aria-labelledby="journal-title" className="section-y">
      <div className="container-editorial">
        <SectionMeta index="04" label="The Journal" />

        {/* Header flips the usual alignment: handle left, headline right */}
        <div className="mb-[clamp(2.5rem,4vw,3.5rem)] grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-5">
          <div className="col-span-12 md:col-span-7 md:col-start-6 md:row-start-1 md:justify-self-end md:text-right">
            <SectionHeading id="journal-title" className="max-w-[15ch]">
              Moments worth <em className="italic">staying</em> for.
            </SectionHeading>
          </div>
          <Reveal className="col-span-12 md:col-span-5 md:row-start-1 md:pb-2">
            <TextLink href="https://www.instagram.com/" external>
              @brewandbean
            </TextLink>
          </Reveal>
        </div>

        <div className="grid grid-flow-row-dense grid-cols-2 gap-3 [grid-auto-rows:22vw] md:grid-cols-12 md:gap-[clamp(0.75rem,1.4vw,1.25rem)] md:[grid-auto-rows:clamp(2.75rem,4.6vw,5rem)]">
          {SHOTS.map((s, i) => (
            <Parallax as="figure" key={s.caption} y={s.depth} className={`group relative overflow-hidden ${s.place}`}>
              <ImageReveal className="size-full" delay={(i % 3) * 0.1}>
                <Image
                  src={s.src}
                  alt={s.alt}
                  placeholder="blur"
                  sizes={s.sizes}
                  className="size-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.045]"
                />
              </ImageReveal>
              <figcaption
                className="eyebrow absolute bottom-0 left-0 flex gap-3 bg-ivory px-3.5 py-2.5 text-ink transition-transform duration-500 ease-editorial
                  [@media(hover:hover)]:translate-y-full [@media(hover:hover)]:group-hover:translate-y-0"
              >
                <span className="text-espresso">Nº {String(i + 1).padStart(2, "0")}</span>
                {s.caption}
              </figcaption>
            </Parallax>
          ))}

          <Reveal className="col-span-2 row-span-2 self-center border-l border-terracotta pl-4 md:[grid-column:6/10] md:[grid-row:6/8] md:pl-6">
            <p className="max-w-[30ch] font-serif text-[clamp(1.25rem,1rem+0.7vw,1.65rem)] leading-snug">
              Long tables, morning light and the low hum of the grinder — Brew &amp; Bean is designed as a place to linger, not just a
              place to queue.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
