import Image from "next/image";
import leaves from "@/assets/images/statement-leaves.jpg";
import light from "@/assets/images/statement-light.jpg";
import { SectionMeta } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

/** Full-width espresso section — the emotional pause in the page's story. */
export default function BrandStatement() {
  return (
    <section aria-labelledby="statement-title" className="section-y overflow-hidden bg-espresso text-ivory">
      <div className="container-editorial">
        <SectionMeta index="05" label="A Better Kind of Coffee Ritual" tone="dark" />

        <Reveal>
          <h2 id="statement-title" className="text-[clamp(3.4rem,0.9rem+8.6vw,10.5rem)] leading-[0.9] tracking-[-0.025em]">
            {/* The two lines slide in from opposite sides and settle on their designed positions */}
            <Parallax as="span" x={[110, 0]} minWidth={1024} className="flex flex-wrap items-center gap-x-[0.2em]">
              Take a
              {/* A photograph set into the line of type */}
              <span aria-hidden className="relative inline-block h-[0.72em] w-[1.5em] translate-y-[0.04em] overflow-hidden sm:w-[1.85em]">
                <Image src={light} alt="" placeholder="blur" sizes="20vw" className="size-full object-cover" />
              </span>
              moment.
            </Parallax>{" "}
            <Parallax as="span" x={[-110, 0]} minWidth={1024} className="flex flex-wrap pl-[0.6em] lg:justify-end lg:pl-0">
              Make it&nbsp;<em className="italic text-terracotta">yours.</em>
            </Parallax>
          </h2>
        </Reveal>

        <div className="mt-[clamp(3.5rem,7vw,6.5rem)] grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-12">
          <Reveal delay={0.15} className="col-span-12 grid justify-items-start gap-8 lg:col-span-4 lg:pb-12">
            <p className="max-w-[28ch] text-[clamp(1.0625rem,0.98rem+0.35vw,1.25rem)] leading-relaxed text-sand">
              Life moves quickly. Good coffee gives us a reason to slow down.
            </p>
            <ButtonLink href="#story" variant="light">
              Discover Our Story
            </ButtonLink>
          </Reveal>

          <figure className="col-span-12 lg:col-span-7 lg:col-start-6">
            <ImageReveal cover="espresso" className="aspect-[16/10]">
              <Image
                src={leaves}
                alt="A cup of black coffee on a timber tray surrounded by fresh green leaves"
                placeholder="blur"
                sizes="(max-width: 1023px) 92vw, 56vw"
                className="size-full object-cover"
              />
            </ImageReveal>
            <figcaption className="eyebrow mt-3.5 text-sand">
              <span className="mr-4 text-ivory">Fig. 04</span>Batch brew, served black
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
