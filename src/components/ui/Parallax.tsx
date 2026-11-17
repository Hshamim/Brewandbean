"use client";

import { m, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * A 0/1 motion value saying whether scroll-linked motion should run: never with
 * prefers-reduced-motion, and (unless `minWidth` is 0) only from tablet width up,
 * where layouts have room to move.
 *
 * It is a motion value (not React state) on purpose: transforms derived from it switch
 * off reliably, even when the preference changes after a transform has been applied.
 */
export function useParallaxGate(minWidth = 768): MotionValue<number> {
  const reduce = useReducedMotion();
  const gate = useMotionValue(0);
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const update = () => gate.set(!reduce && (minWidth === 0 || mq.matches) ? 1 : 0);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [minWidth, reduce, gate]);
  return gate;
}

const TAGS = { div: m.div, span: m.span, figure: m.figure, li: m.li };

/**
 * Moves its content at a different speed from the page while it crosses the viewport.
 * `y` (px): positive rises faster than the page, negative lags behind; offset is 0 when the
 * element is centred in the viewport, so the resting layout is exactly the designed one.
 * `x` (px): horizontal drift, for kinetic type. Either a number (symmetric, like `y`) or a
 * [from, to] pair across the element's pass through the viewport, e.g. [90, 0] slides in
 * from the right and settles exactly on the designed position — never past the margins.
 */
export function Parallax({
  children,
  className,
  y = 0,
  x = 0,
  as = "div",
  minWidth = 768,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  x?: number | [number, number];
  as?: keyof typeof TAGS;
  minWidth?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const gate = useParallaxGate(minWidth);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // progress 0 → +amount, 0.5 → 0 (designed layout), 1 → −amount; multiplied by the gate
  const ty = useTransform([scrollYProgress, gate], ([p, g]: number[]) => g * y * (1 - 2 * p));
  // A [from, to] pair arrives at `to` when the element reaches the middle of the viewport, then holds
  const settle = typeof x !== "number";
  const [x0, x1] = settle ? x : [x, -x];
  const tx = useTransform([scrollYProgress, gate], ([p, g]: number[]) => g * (x0 + (x1 - x0) * (settle ? Math.min(1, p * 2) : p)));
  const Tag = TAGS[as] as typeof m.div;
  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} style={{ y: ty, x: tx }}>
      {children}
    </Tag>
  );
}
