"use client";

import { AnimatePresence, m } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS, VISIT_CTA, CONTACT } from "@/lib/site";
import { ButtonLink } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Brand";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const wasOpen = useRef(false);

  // The navbar is always visible (fixed). At the top it is transparent over the dark
  // hero; once the page scrolls, it gains a solid ivory background and hairline so it
  // stays legible over any section.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section indicator
  useEffect(() => {
    const ids = [...NAV_LINKS.map((l) => l.id), "visit"];
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => window.scrollY < 200 && setActive(null);
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Mobile menu: lock scroll, make everything behind it inert, manage focus, Escape closes.
  useEffect(() => {
    const background = [document.querySelector(".skip-link"), document.getElementById("main"), document.querySelector("footer")].filter(
      Boolean,
    ) as HTMLElement[];
    if (open) {
      document.body.style.overflow = "hidden";
      background.forEach((el) => (el.inert = true));
    } else if (wasOpen.current) {
      toggleRef.current?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      background.forEach((el) => (el.inert = false));
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Close the overlay if the viewport grows to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);
  // At the very top the bar floats, transparent, over the dark cinematic hero → light text.
  // Once scrolled it becomes a solid ivory bar → dark text. The open menu is dark as well.
  const light = open || !scrolled;

  return (
    <header
      data-scrolled={scrolled}
      data-open={open}
      // The frosted bar applies only while the menu is closed: a backdrop-filter makes the header the
      // containing block for its fixed children, which would squeeze the full-screen menu into the bar.
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ease-editorial ${
        scrolled && !open ? "bg-ivory/95 shadow-[0_1px_0_rgb(33_26_22/0.12)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-editorial relative z-10 flex h-[var(--nav-h)] items-center justify-between gap-8">
        <a href="#top" onClick={close} aria-label="Brew & Bean — back to top" className={`transition-colors duration-500 ${light ? "text-ivory" : "text-ink"}`}>
          <Wordmark ampClassName={light ? "text-sand" : "text-terracotta"} />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-[clamp(1.75rem,2.8vw,3rem)]">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  aria-current={active === l.id ? "location" : undefined}
                  className={`relative py-2 font-sans text-[0.8125rem] font-medium tracking-[0.02em] transition-colors duration-500 ${light ? "text-ivory" : "text-ink"}
                    after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-terracotta
                    after:transition-transform after:duration-500 after:ease-editorial
                    hover:after:scale-x-100 aria-[current=location]:after:scale-x-100`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          {/* Visibility lives on a wrapper: the button's own display utility would otherwise override `hidden` */}
          <div className="hidden lg:block">
            <ButtonLink href={VISIT_CTA.href} variant={light ? "light" : "dark"} size="sm">
              {VISIT_CTA.label}
            </ButtonLink>
          </div>

          <button
            ref={toggleRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-11 items-center gap-3 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 lg:hidden ${
              light ? "text-ivory" : "text-ink"
            }`}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="relative h-2.5 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-full bg-current transition-all duration-500 ease-editorial ${
                  open ? "top-[4.25px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute right-0 h-[1.5px] bg-current transition-all duration-500 ease-editorial ${
                  open ? "top-[4.25px] w-full -rotate-45" : "top-[8.5px] w-2/3"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-0 bg-espresso text-ivory lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            onAnimationStart={() => firstLinkRef.current?.focus({ preventScroll: true })}
          >
            <div className="container-editorial flex h-full flex-col pb-8 pt-[calc(var(--nav-h)+2.5rem)]">
              <p aria-hidden className="eyebrow text-sand">
                Navigate
              </p>
              <ul className="mt-6 border-t border-ivory/20">
                {[...NAV_LINKS, VISIT_CTA].map((l, i) => (
                  <m.li
                    key={l.href}
                    className="border-b border-ivory/20"
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.06 }}
                  >
                    <a
                      ref={i === 0 ? firstLinkRef : undefined}
                      href={l.href}
                      onClick={close}
                      className="flex items-baseline gap-4 py-3.5 font-serif text-[clamp(2.25rem,9vw,3.5rem)] leading-tight"
                    >
                      <span aria-hidden className="eyebrow -translate-y-[1.1em] text-sand">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </m.li>
                ))}
              </ul>
              <m.div
                className="mt-auto space-y-1 font-sans text-sm text-sand"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <p>{CONTACT.addressLines.join(", ")}</p>
                <p>Open daily from 7am</p>
              </m.div>
            </div>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
