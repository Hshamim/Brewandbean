"use client";

import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { DIETARY, MENU, type Dietary } from "@/lib/menu";
import { SectionMeta, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { BeanMark } from "@/components/ui/Brand";

const EASE = [0.22, 1, 0.36, 1] as const;

function DietaryTags({ tags }: { tags: Dietary[] }) {
  return (
    <ul className="flex gap-1.5" aria-label="Dietary information">
      {tags.map((t) => (
        <li key={t}>
          <abbr title={DIETARY[t]} className="eyebrow inline-block border border-espresso/40 px-1.5 py-1 text-[0.625rem] tracking-[0.12em] text-espresso no-underline">
            {t}
          </abbr>
          <span className="sr-only">: {DIETARY[t]}</span>
        </li>
      ))}
    </ul>
  );
}

export default function CoffeeMenu() {
  const [activeId, setActiveId] = useState(MENU[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = MENU.findIndex((c) => c.id === activeId);
  const active = MENU[activeIndex];

  // WAI-ARIA tabs: arrows / Home / End move focus and select
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = MENU.length - 1;
    const next = { ArrowRight: activeIndex + 1, ArrowLeft: activeIndex - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const i = (next + MENU.length) % MENU.length;
    setActiveId(MENU[i].id);
    tabRefs.current[i]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="menu-title" className="section-y border-t border-ink/10">
      <div className="container-editorial">
        <SectionMeta index="02" label="Coffee Menu" />

        <div className="grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-6">
          <div className="col-span-12 lg:col-span-7">
            <SectionHeading id="menu-title" className="max-w-[16ch]">
              Find your everyday <em className="italic">favourite.</em>
            </SectionHeading>
          </div>
          <Reveal delay={0.1} className="col-span-12 max-w-[34ch] text-[0.9375rem] text-espresso lg:col-span-4 lg:col-start-9 lg:pb-2">
            <p>Every coffee is made with our house blend or a rotating single origin, and any drink can be made with oat, almond or lactose-free milk.</p>
            <p className="eyebrow mt-3 text-espresso">Prices in AUD</p>
          </Reveal>
        </div>

        {/* Category navigation */}
        <Reveal className="mt-[clamp(2.5rem,5vw,4rem)]">
          <div
            role="tablist"
            aria-label="Menu categories"
            onKeyDown={onKeyDown}
            className="-mx-[var(--gutter)] flex gap-[clamp(1.5rem,3vw,3rem)] overflow-x-auto border-b border-ink/15 px-[var(--gutter)] [scrollbar-width:none] lg:mx-0 lg:px-0"
          >
            {MENU.map((c, i) => {
              const selected = c.id === activeId;
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls="menu-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(c.id)}
                  className={`relative flex shrink-0 items-baseline gap-2 pb-4 pt-1 font-serif text-[clamp(1.35rem,1.1rem+0.8vw,1.85rem)] leading-none transition-colors duration-300 ${
                    selected ? "text-ink" : "text-espresso/70 hover:text-ink"
                  }`}
                >
                  <span aria-hidden className="eyebrow text-[0.625rem] text-espresso">
                    0{i + 1}
                  </span>
                  {c.label}
                  {/* CSS indicator (draws in from the left) — avoids shipping Framer's layout engine */}
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 -bottom-px h-0.5 origin-left bg-terracotta transition-transform duration-500 ease-editorial ${
                      selected ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-[clamp(2rem,4vw,3.5rem)] grid grid-cols-12 items-start gap-x-[clamp(1rem,2vw,2rem)] gap-y-10">
          {/* Category photograph — all four stacked and crossfaded so switching never flashes */}
          <div className="col-span-12 md:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+1.5rem)]">
            <div className="relative aspect-[4/3] overflow-hidden bg-espresso md:aspect-[4/4.8]">
              {MENU.map((c) => (
                <Image
                  key={c.id}
                  src={c.image}
                  alt={c.id === activeId ? c.imageAlt : ""}
                  aria-hidden={c.id !== activeId}
                  placeholder="blur"
                  sizes="(max-width: 767px) 92vw, 40vw"
                  className={`absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[900ms] ease-editorial ${
                    c.id === activeId ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}
              <div className="absolute bottom-0 left-0 flex items-baseline gap-3 bg-ivory py-3.5 pl-4 pr-5">
                <span className="eyebrow text-espresso">Nº 0{activeIndex + 1}</span>
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={active.id}
                    className="font-serif text-2xl leading-none"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {active.label}
                  </m.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Items */}
          <div
            id="menu-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            tabIndex={0}
            className="col-span-12 md:col-span-7 lg:col-span-6 lg:col-start-7"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <p className="mb-2 max-w-[42ch] font-serif text-[1.35rem] italic leading-snug text-espresso">{active.intro}</p>
                <ul className="border-t border-ink/30">
                  {active.items.map((item) => (
                    <li key={item.name} className="group border-b border-ink/15 py-[clamp(1.4rem,2.2vw,2rem)]">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-[clamp(1.85rem,1.3rem+1.6vw,2.6rem)] leading-none transition-colors duration-300 group-hover:text-terracotta">
                          {item.name}
                        </h3>
                        <span aria-hidden className="min-w-6 flex-1 -translate-y-1.5 border-b-2 border-dotted border-ink/25" />
                        <p className="whitespace-nowrap font-serif text-[clamp(1.5rem,1.25rem+0.8vw,2rem)] leading-none">
                          <span className="sr-only">Price: </span>
                          <span className="mr-0.5 align-[0.55em] text-[0.55em] text-espresso">$</span>
                          {item.price}
                        </p>
                      </div>
                      <p className="mt-2.5 max-w-[46ch] text-[0.9375rem] text-espresso">{item.description}</p>
                      {(item.dietary || item.signature) && (
                        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
                          {item.signature && (
                            <span className="eyebrow inline-flex items-center gap-1.5 text-espresso">
                              <BeanMark className="size-3.5 text-terracotta" />
                              House signature
                            </span>
                          )}
                          {item.dietary && <DietaryTags tags={item.dietary} />}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </m.div>
            </AnimatePresence>

            <dl className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-espresso">
              {Object.entries(DIETARY).map(([k, v]) => (
                <div key={k} className="flex gap-1.5">
                  <dt className="font-semibold">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-3 text-xs text-espresso">Fictional demonstration prices in AUD.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
