"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";

/** Newsletter sign-up for the dark footer. Demo only: validated locally, nothing is sent. */
export default function Newsletter() {
  const id = useId();
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get("email") ?? "").trim();
    setStatus(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "done" : "error");
  };

  return (
    <div className="grid grid-cols-12 items-end gap-x-[clamp(1rem,2vw,2rem)] gap-y-10 border-b border-ivory/15 pb-[clamp(4rem,7vw,6rem)]">
      <div className="col-span-12 lg:col-span-7">
        <p className="eyebrow flex items-center gap-3 text-sand before:h-px before:w-7 before:bg-current">The Brew &amp; Bean Letter</p>
        <h2 className="mt-6 max-w-[17ch] text-[clamp(2.4rem,1.6rem+2.6vw,4.25rem)] leading-[0.98]">
          New origins, seasonal releases &amp; the occasional <em className="italic text-sand">slow-morning</em> note.
        </h2>
      </div>

      <div className="col-span-12 lg:col-span-5">
        {status === "done" ? (
          <p role="status" className="font-serif text-[1.75rem] leading-snug">
            Thank you — your first letter is on its way. <em className="italic text-sand">See you at the bar.</em>
          </p>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <div className="relative flex border-b border-ivory/50 transition-colors focus-within:border-ivory has-[[aria-invalid=true]]:border-terracotta">
              <label htmlFor={id} className="sr-only">
                Email address
              </label>
              <input
                id={id}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="Your email address"
                aria-invalid={status === "error"}
                aria-describedby={status === "error" ? `${id}-error` : `${id}-note`}
                onChange={() => status === "error" && setStatus("idle")}
                className="min-w-0 flex-1 bg-transparent py-4 text-[1.0625rem] text-ivory outline-none placeholder:text-sand/80"
              />
              <button
                type="submit"
                className="group flex items-center gap-2.5 pl-4 font-sans text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:text-sand"
              >
                Subscribe
                <ArrowRight aria-hidden className="size-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
            </div>
            {status === "error" ? (
              <p id={`${id}-error`} role="alert" className="mt-3 flex items-center gap-2 text-sm text-ivory">
                <span aria-hidden className="h-3 w-0.5 bg-terracotta" />
                Please enter a valid email address.
              </p>
            ) : (
              <p id={`${id}-note`} className="mt-3 text-sm text-sand">
                One letter a month. Unsubscribe any time.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
