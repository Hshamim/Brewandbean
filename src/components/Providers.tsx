"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// Animation engine loaded as a separate chunk after hydration (keeps it off the critical path)
const loadFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

/**
 * App-wide client providers:
 * - LazyMotion + `m` components: the animation engine is code-split and loaded
 *   after hydration. `strict` throws if a full `motion.*` component sneaks back in.
 * - Framer Motion follows the visitor's reduced-motion preference.
 * - The real scrollbar width is exposed as --scrollbar so full-bleed images
 *   end flush with the visible viewport on classic-scrollbar systems.
 */
/**
 * Moves the visitor to an in-page section: waits for the mobile menu to release its
 * scroll lock, scrolls (smoothly unless reduced motion is preferred) and moves keyboard /
 * screen-reader focus into the section, so the next Tab continues from there.
 */
function goToSection(target: HTMLElement, id: string) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let frames = 0;
  const run = () => {
    if (document.body.style.overflow === "hidden" && frames++ < 30) {
      requestAnimationFrame(run);
      return;
    }
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
  };
  requestAnimationFrame(run);
}

export default function Providers({ children }: { children: ReactNode }) {
  // One handler for every same-page link (nav, mobile menu, hero buttons, footer).
  // Capture phase + preventDefault, so next/link and the browser don't also jump.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      const id = link ? decodeURIComponent(link.hash.slice(1)) : "";
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      goToSection(target, id);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const set = () => root.style.setProperty("--scrollbar", `${window.innerWidth - root.clientWidth}px`);
    const raf = requestAnimationFrame(set);
    window.addEventListener("resize", set);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", set);
    };
  }, []);

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
