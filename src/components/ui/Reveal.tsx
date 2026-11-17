"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Gentle fade-and-rise as content enters the viewport (once).
 * Respects prefers-reduced-motion through <MotionConfig reducedMotion="user">,
 * and stays visible without JavaScript via the [data-reveal] noscript rule.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <m.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </m.div>
  );
}
