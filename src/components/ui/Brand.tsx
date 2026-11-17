/** Wordmark: tracked sans caps with an italic serif ampersand in terracotta. */
export function Wordmark({ className = "", ampClassName = "text-terracotta" }: { className?: string; ampClassName?: string }) {
  return (
    <span className={`whitespace-nowrap font-sans text-[0.875rem] font-semibold uppercase leading-none tracking-[0.28em] ${className}`}>
      Brew
      {/* Asymmetric margins compensate for the italic ampersand's right-hand overhang */}
      <span className={`ml-[0.12em] mr-[0.3em] inline-block translate-y-[0.04em] font-serif text-[1.6em] font-medium normal-case italic tracking-normal ${ampClassName}`}>
        &amp;
      </span>
      Bean
    </span>
  );
}

/** Hand-drawn coffee bean — the brand's single graphic device. */
export function BeanMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <ellipse cx="16" cy="16" rx="9.5" ry="13" transform="rotate(32 16 16)" stroke="currentColor" strokeWidth="1.4" />
      <path d="M10.4 25.2c3.3-2.6 3.2-6.2 4.6-9.3 1.4-3.1 4.3-5 6.6-9.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}
