import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "dark" | "light";

/*
 * Rectangular editorial buttons (no pills). A fill rises from the bottom on hover.
 * Contrast: primary = white on terracotta (5.0:1); dark = ivory on espresso (13.3:1);
 * light = espresso on ivory (13.3:1). Hover states keep white text on terracotta.
 */
const VARIANTS: Record<Variant, string> = {
  primary: "bg-terracotta text-white before:bg-espresso",
  dark: "bg-espresso text-ivory before:bg-terracotta hover:text-white focus-visible:text-white",
  light: "bg-ivory text-espresso before:bg-terracotta hover:text-white focus-visible:text-white",
};

const BASE =
  "group relative isolate inline-flex items-center gap-3 overflow-hidden whitespace-nowrap " +
  "font-sans text-[0.75rem] font-semibold uppercase leading-none tracking-[0.14em] " +
  "transition-colors duration-500 ease-editorial " +
  "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 " +
  "before:transition-transform before:duration-500 before:ease-editorial " +
  "hover:before:scale-y-100 focus-visible:before:scale-y-100";

const SIZES = {
  md: "px-6 py-[1.05rem]",
  sm: "px-4 py-[0.8rem] text-[0.6875rem]",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: keyof typeof SIZES;
  children: ReactNode;
  className?: string;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

export function ButtonLink({ href, variant = "primary", size = "md", children, className = "", external, ...rest }: ButtonLinkProps) {
  const Icon = external ? ArrowUpRight : ArrowRight;
  const content = (
    <>
      {children}
      <Icon aria-hidden className="size-4 shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1" strokeWidth={1.5} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: keyof typeof SIZES;
  icon?: boolean;
} & ComponentPropsWithoutRef<"button">;

export function Button({ variant = "primary", size = "md", icon = true, className = "", children, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={`${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`} {...rest}>
      {children}
      {icon && (
        <ArrowRight aria-hidden className="size-4 shrink-0 transition-transform duration-500 ease-editorial group-hover:translate-x-1" strokeWidth={1.5} />
      )}
    </button>
  );
}

/** Understated text link with a drawn underline that retracts on hover. */
export function TextLink({
  href,
  children,
  external,
  className = "",
  tone = "ink",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
  tone?: "ink" | "ivory";
}) {
  const cls =
    "group relative inline-flex items-center gap-2 py-1.5 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] " +
    "after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-right after:bg-current " +
    "after:transition-transform after:duration-500 after:ease-editorial hover:after:scale-x-0 " +
    (tone === "ivory" ? "text-ivory " : "text-ink ") +
    className;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowUpRight aria-hidden className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
