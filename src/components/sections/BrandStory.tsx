import Image from "next/image";
import beanToCup from "@/assets/images/story-bean-to-cup.jpg";
import espresso from "@/assets/images/philosophy-espresso.jpg";
import { SectionMeta, SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

const DETAILS = [
  { value: "04", label: "Origins in seasonal rotation" },
  { value: "Weekly", label: "Small-batch roasting" },
  { value: "100%", label: "Traceable, named lots" },
];

export default function BrandStory() {
  return (
    <section id="story" aria-labelledby="story-title" className="section-y">
      <div className="container-editorial">
        <SectionMeta index="01" label="Our Story" />

        {/* Headline and copy set as a two-column editorial spread */}
        <div className="grid grid-cols-12 gap-x-[clamp(1rem,2vw,2rem)] gap-y-8">
          <div className="col-span-12 lg:col-span-6">
            <SectionHeading id="story-title" className="max-w-[14ch]">
              More than a morning <em className="italic">ritual.</em>
            </SectionHeading>
          </div>
          <Reveal delay={0.12} className="col-span-12 grid max-w-[31rem] gap-5 lg:col-span-5 lg:col-start-8 lg:pt-3">
            <p className="text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] leading-relaxed first-letter:float-left first-letter:pr-2 first-letter:pt-1 first-letter:font-serif first-letter:text-[4.4em] first-letter:leading-[0.78] first-letter:text-terracotta">
              Great coffee begins long before the first sip. From carefully selected beans to the hands that craft every cup, we
              believe the details make the difference.
            </p>
            <p className="text-[0.9375rem] text-espresso">
              We work with a small circle of producers who share our care for quality and sustainability, roast in small batches
              each week, and dial in every morning before the doors open — so the cup in front of you tastes exactly as it should.
            </p>
          </Reveal>
        </div>

        {/* Stepped image pair: a small preparation study against a wide, atmospheric scene */}
        <div className="mt-[clamp(3rem,5.5vw,5rem)] grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-7">
          <Parallax as="figure" y={80} className="col-span-7 sm:col-span-5 lg:col-span-3">
            <ImageReveal className="aspect-[4/5]">
              <Image
                src={espresso}
                alt="A short espresso in a glass on a pale blue saucer"
                placeholder="blur"
                sizes="(max-width: 1023px) 58vw, 24vw"
                className="size-full object-cover"
              />
            </ImageReveal>
            <figcaption className="eyebrow mt-3.5 text-espresso">
              <span className="mr-4 text-ink">Fig. 02</span>Espresso, pulled short
            </figcaption>
          </Parallax>

          <figure className="col-span-12 bleed-right pl-[12%] lg:col-span-8 lg:col-start-5 lg:pl-0">
            <ImageReveal className="aspect-[16/10]" delay={0.15}>
              <Image
                src={beanToCup}
                alt="Whole beans, fresh grounds, a portafilter and a finished latte laid out on dark timber boards"
                placeholder="blur"
                sizes="(max-width: 1023px) 92vw, 66vw"
                className="size-full object-cover"
              />
            </ImageReveal>
            <figcaption className="eyebrow mt-3.5 text-espresso">
              <span className="mr-4 text-ink">Fig. 03</span>From bean to cup
            </figcaption>
          </figure>
        </div>

        {/* Sourcing details, aligned to the wide image */}
        <dl className="mt-[clamp(3rem,5vw,4.5rem)] grid grid-cols-1 border-t border-ink/30 sm:grid-cols-3 lg:grid-cols-12 lg:gap-x-[clamp(1rem,2vw,2rem)]">
          {DETAILS.map((d, i) => (
            <Reveal
              key={d.label}
              delay={i * 0.08}
              className={`flex items-baseline justify-between gap-4 border-b border-ink/15 py-4 sm:flex-col-reverse sm:justify-end sm:border-b-0 sm:pb-0 sm:pt-6 ${
                ["lg:col-span-3 lg:col-start-5", "lg:col-span-3", "lg:col-span-2"][i]
              }`}
            >
              <dt className="max-w-[18ch] text-xs leading-snug text-espresso">{d.label}</dt>
              <dd className="font-serif text-[clamp(2.25rem,1.5rem+2vw,3.5rem)] leading-none text-espresso">{d.value}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
