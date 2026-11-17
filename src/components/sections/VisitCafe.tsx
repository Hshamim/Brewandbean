import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import interior from "@/assets/images/visit-interior.jpg";
import { CONTACT } from "@/lib/site";
import { SectionMeta } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Reveal } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/Button";
import OpeningHours from "./visit/OpeningHours";
import MapEmbed from "./visit/MapEmbed";
import ReservationDialog from "./visit/ReservationDialog";

function Block({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/30 pb-8 pt-6">
      <h3 className="eyebrow flex items-center gap-2 font-sans text-espresso">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function VisitCafe() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="section-y">
      <div className="container-editorial">
        <SectionMeta index="06" label="Visit Our Café" />

        <div className="mb-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-6">
          <Reveal className="col-span-12 lg:col-span-8">
            <h2 id="visit-title" className="text-[clamp(3rem,1.2rem+5vw,7rem)] leading-[0.9] tracking-[-0.02em]">
              <span className="block">Your table is</span>{" "}
              <span className="block pl-[1.4em] italic text-terracotta">waiting.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="col-span-12 max-w-[34ch] text-[0.9375rem] text-espresso lg:col-span-4 lg:pb-3">
            <p>
              Long communal tables, quiet window seats for one, and a courtyard that catches the morning sun. Walk in, or reserve a
              table for your group.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-12 items-start gap-x-[clamp(1rem,2vw,2rem)] gap-y-12">
          {/* Photograph with the map set into its corner */}
          <div className="relative col-span-12 pb-[clamp(5rem,9vw,7.5rem)] lg:col-span-7">
            <ImageReveal className="aspect-[4/3.1]">
              <Image
                src={interior}
                alt="A café dining room with long timber tables and warm pendant lighting"
                placeholder="blur"
                sizes="(max-width: 1023px) 92vw, 56vw"
                className="size-full object-cover"
              />
            </ImageReveal>
            <Reveal
              delay={0.3}
              className="absolute bottom-0 right-0 w-[min(78%,18rem)] bg-ivory p-2.5 pb-0 shadow-[0_24px_48px_-28px_rgb(33_26_22/0.45)] lg:-right-[clamp(1rem,3vw,3rem)] lg:w-[clamp(15rem,24vw,21rem)]"
            >
              <MapEmbed />
            </Reveal>
          </div>

          {/* Details */}
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <Block title="Address" icon={<MapPin aria-hidden className="size-3.5" strokeWidth={1.75} />}>
                <address className="mt-4 font-serif text-[clamp(1.6rem,1.3rem+0.9vw,2.1rem)] not-italic leading-tight">
                  {CONTACT.addressLines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </address>
                <p className="eyebrow mt-2 text-espresso">{CONTACT.addressNote}</p>
                <div className="mt-5">
                  <TextLink href={CONTACT.directionsUrl} external>
                    Get Directions
                  </TextLink>
                </div>
              </Block>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="border-t border-ink/30 pb-8 pt-6">
                <OpeningHours />
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <Block title="Contact">
                <ul className="mt-4 grid gap-2.5 text-[0.9375rem]">
                  <li className="flex items-center gap-3">
                    <Phone aria-hidden className="size-4 text-espresso" strokeWidth={1.5} />
                    <span className="sr-only">Phone: </span>
                    <a href={CONTACT.phoneHref} className="underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-terracotta">
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <Mail aria-hidden className="size-4 text-espresso" strokeWidth={1.5} />
                    <span className="sr-only">Email: </span>
                    <a href={`mailto:${CONTACT.email}`} className="underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-terracotta">
                      {CONTACT.email}
                    </a>
                  </li>
                </ul>
                <div className="mt-7">
                  <ReservationDialog />
                </div>
              </Block>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
