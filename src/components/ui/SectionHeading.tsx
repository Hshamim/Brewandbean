import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/**
 * Chapter mark — opens every section directly above its headline:
 * an italic serif numeral in terracotta, a short drawn rule and the section name.
 * Compact on purpose: the headline follows immediately, so a visitor arriving from
 * the navigation sees the section's title and content, not a band of empty space.
 */
export function SectionMeta({ index, label, tone = "light" }: { index: string; label: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <Reveal y={14} className={`mb-[clamp(1.25rem,2.4vw,2.25rem)] flex items-center gap-4 ${dark ? "text-ivory" : "text-ink"}`}>
      {/* 24px italic numeral: "large text", so terracotta meets 3:1 on ivory and espresso */}
      <span className="font-serif text-[1.5rem] italic leading-none text-terracotta">{index}</span>
      <span aria-hidden className={`h-px w-12 ${dark ? "bg-ivory/35" : "bg-ink/30"}`} />
      <span className="eyebrow">{label}</span>
    </Reveal>
  );
}

const SIZES = {
  section: "text-[clamp(2.75rem,1.6rem+3.6vw,5.25rem)]",
  display: "text-[clamp(3.4rem,1rem+8vw,10rem)] leading-[0.9]",
};

/** Section headline — consistent serif scale, one size below the hero display. */
export function SectionHeading({
  id,
  children,
  size = "section",
  className = "",
  delay = 0,
}: {
  id?: string;
  children: ReactNode;
  size?: keyof typeof SIZES;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <h2 id={id} className={`${SIZES[size]} ${className}`}>
        {children}
      </h2>
    </Reveal>
  );
}
