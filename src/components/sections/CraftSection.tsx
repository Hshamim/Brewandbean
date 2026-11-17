import Image, { type StaticImageData } from "next/image";
import sourced from "@/assets/images/exp-sourced.jpg";
import roasted from "@/assets/images/exp-roasted.jpg";
import crafted from "@/assets/images/exp-crafted.jpg";
import { SectionMeta } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/ImageReveal";
import { Parallax } from "@/components/ui/Parallax";
import { Reveal } from "@/components/ui/Reveal";

type Step = {
  no: string;
  title: string;
  text: string;
  detail: string;
  image: StaticImageData;
  alt: string;
  frame: string; // aspect + vertical offset give each step its own rhythm
};

const STEPS: Step[] = [
  {
    no: "01",
    title: "Thoughtfully Sourced",
    text: "We choose exceptional beans from producers who care about quality and sustainability.",
    detail: "Direct relationships · Traceable lots",
    image: sourced,
    alt: "A ceramic bowl filled with freshly roasted whole coffee beans",
    frame: "aspect-[4/5]",
  },
  {
    no: "02",
    title: "Expertly Roasted",
    text: "Every roast is carefully developed to bring out the character of each origin.",
    detail: "Small batch · Profiled weekly",
    image: roasted,
    alt: "Roasted coffee beans and fresh grounds scattered beside a cup of coffee",
    frame: "aspect-[4/4.4] md:mt-[clamp(4rem,10vw,10rem)]",
  },
  {
    no: "03",
    title: "Beautifully Crafted",
    text: "From the first grind to the final pour, every detail matters.",
    detail: "Dialled in daily · Poured by hand",
    image: crafted,
    alt: "A barista pouring steamed milk into a cup to form latte art",
    frame: "aspect-[4/5.4] md:mt-[clamp(2rem,5vw,5rem)]",
  },
];

export default function CraftSection() {
  return (
    <section id="craft" aria-labelledby="craft-title" className="section-y bg-white">
      <div className="container-editorial">
        <SectionMeta index="03" label="Our Craft" />

        <div className="mb-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-6">
          <Reveal className="col-span-12 lg:col-span-9">
            <h2 id="craft-title" className="text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)]">
              <span className="block">Crafted slowly.</span>{" "}
              <span className="block pl-[clamp(2rem,12vw,13rem)] italic text-espresso">Enjoyed fully.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.12} className="col-span-12 max-w-[30ch] text-[0.9375rem] text-espresso lg:col-span-3 lg:pb-2">
            <p>Every cup we pour is the last step of a long, careful chain. Here is how we look after each one.</p>
          </Reveal>
        </div>

        <ol className="grid gap-16 md:grid-cols-3 md:gap-[clamp(1.25rem,3vw,3.5rem)]">
          {STEPS.map((s, i) => (
            <Parallax as="li" key={s.no} y={[0, 70, 30][i]} className={`group ${i === 1 ? "pl-[18%] md:pl-0" : i === 2 ? "pr-[12%] md:pr-0" : ""}`}>
              <ImageReveal cover="white" delay={i * 0.12} className={s.frame}>
                <Image
                  src={s.image}
                  alt={s.alt}
                  placeholder="blur"
                  sizes="(max-width: 767px) 88vw, 30vw"
                  className="size-full object-cover transition-transform duration-[1400ms] ease-editorial group-hover:scale-[1.04]"
                />
              </ImageReveal>
              <Reveal delay={0.1 + i * 0.12} className="mt-6 grid grid-cols-[auto_1fr] gap-5 border-t border-ink/15 pt-7">
                <span className="font-serif text-[clamp(2.75rem,2rem+2vw,3.75rem)] leading-[0.8] text-terracotta">{s.no}</span>
                <div>
                  <h3 className="text-[clamp(1.75rem,1.4rem+1vw,2.4rem)] leading-none">{s.title}</h3>
                  <p className="mt-3 max-w-[32ch] text-[0.9375rem] text-espresso">{s.text}</p>
                  <p className="eyebrow mt-4 text-espresso">{s.detail}</p>
                </div>
              </Reveal>
            </Parallax>
          ))}
        </ol>
      </div>
    </section>
  );
}
