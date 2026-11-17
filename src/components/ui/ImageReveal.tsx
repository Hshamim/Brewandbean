"use client";

import { m, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useParallaxGate } from "./Parallax";

const COVERS = {
  ivory: "bg-ivory",
  white: "bg-white",
  espresso: "bg-espresso",
};

/**
 * Editorial image reveal: a panel in the section's own colour retracts upward
 * while the photograph settles from a slight zoom. Transform-only (compositor
 * friendly) and the image is painted underneath from the start.
 *
 * Window parallax: the photograph sits on a layer slightly taller than its frame
 * and travels more slowly than the page as the frame crosses the viewport, so each
 * picture reads like a view through a window. `parallax` is the travel either way,
 * as a fraction of the frame's height (0 turns it off). Off with reduced motion.
 */
export function ImageReveal({
  children,
  className = "",
  cover = "ivory",
  delay = 0,
  parallax = 0.08,
}: {
  children: ReactNode;
  className?: string;
  cover?: keyof typeof COVERS;
  delay?: number;
  parallax?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const gate = useParallaxGate(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The layer overhangs the frame by `parallax` top and bottom; travel in % of the layer's own height.
  // Gated (0/1) so reduced motion always resolves to a still, centred photograph.
  const travel = (parallax / (1 + 2 * parallax)) * 100;
  const y = useTransform([scrollYProgress, gate], ([p, g]: number[]) => `${g * travel * (2 * p - 1)}%`);
  const overhang = `${-parallax * 100}%`;

  return (
    <m.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      <m.div
        className="absolute inset-x-0"
        style={{ top: overhang, bottom: overhang, y }}
      >
        <m.div
          className="absolute inset-0"
          variants={{ hidden: { scale: 1.08 }, shown: { scale: 1 } }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay }}
        >
          {children}
        </m.div>
      </m.div>
      <m.div
        aria-hidden
        data-reveal-cover
        className={`absolute inset-0 origin-top ${COVERS[cover]}`}
        variants={{ hidden: { scaleY: 1 }, shown: { scaleY: 0 } }}
        transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1], delay }}
      />
    </m.div>
  );
}
