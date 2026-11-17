"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { CalendarDays, Check, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const TIMES = ["07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00"];

type Errors = Partial<Record<"name" | "email" | "date", string>>;
type Booking = { name: string; date: string; time: string; guests: string };

const FIELD =
  "mt-2 w-full border border-ink/30 bg-white px-3.5 py-3 font-sans text-[0.9375rem] font-normal normal-case tracking-normal text-ink outline-none transition-colors " +
  "focus:border-ink aria-[invalid=true]:border-terracotta";

/**
 * Table-reservation request built on the native <dialog>: the browser provides
 * the focus trap, Escape-to-close, an inert page behind it and focus return.
 * Demo only — the request is validated client-side and never sent anywhere.
 */
export default function ReservationDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [booking, setBooking] = useState<Booking | null>(null);
  const [minDate, setMinDate] = useState<string>();

  const open = () => {
    // Computed on open (client-side) rather than during render
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    setErrors({});
    setBooking(null);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const next: Errors = {};
    if (get("name").length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(get("email"))) next.email = "Please enter a valid email address.";
    if (!get("date") || (minDate && get("date") < minDate)) next.date = "Please choose today or a future date.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = Object.keys(next)[0];
      e.currentTarget.querySelector<HTMLInputElement>(`[name="${first}"]`)?.focus();
      return;
    }
    setBooking({ name: get("name"), date: get("date"), time: get("time"), guests: get("guests") });
  };

  const err = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`${uid}-${k}-error`} className="mt-1.5 flex items-center gap-2 text-xs font-medium normal-case tracking-normal text-ink">
        <span aria-hidden className="h-3 w-0.5 bg-terracotta" />
        {errors[k]}
      </p>
    ) : null;

  const prettyDate = (iso: string) =>
    new Date(`${iso}T00:00:00`).toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" });

  return (
    <>
      <Button onClick={open} aria-haspopup="dialog">
        Reserve a Table
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby={`${uid}-title`}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-auto max-h-[calc(100svh-2rem)] w-[min(34rem,calc(100vw-2rem))] overflow-y-auto bg-ivory p-0 text-ink
          opacity-0 transition-[opacity,translate,display,overlay] duration-500 ease-editorial transition-discrete
          translate-y-4 open:translate-y-0 open:opacity-100 starting:open:translate-y-4 starting:open:opacity-0
          backdrop:bg-ink/0 backdrop:transition-[background-color,display,overlay] backdrop:duration-500 backdrop:transition-discrete
          open:backdrop:bg-ink/60 starting:open:backdrop:bg-ink/0"
      >
        <div className="relative p-[clamp(1.5rem,5vw,2.75rem)]">
          <button
            type="button"
            onClick={close}
            aria-label="Close reservation form"
            className="absolute right-3 top-3 grid size-11 place-items-center text-ink transition-colors hover:text-terracotta"
          >
            <X aria-hidden className="size-5" strokeWidth={1.5} />
          </button>

          {booking ? (
            <div role="status" className="py-4">
              <span className="grid size-12 place-items-center rounded-full bg-espresso text-ivory">
                <Check aria-hidden className="size-5" />
              </span>
              <h2 id={`${uid}-title`} className="mt-6 text-[2.5rem]">
                Thank you, {booking.name.split(" ")[0]}.
              </h2>
              <p className="mt-4 text-[0.9375rem] text-espresso">
                Your request for {booking.guests} {booking.guests === "1" ? "guest" : "guests"} on {prettyDate(booking.date)} at {booking.time} has
                been noted. We’ll confirm by email.
              </p>
              <p className="mt-3 text-xs text-espresso">Demonstration only — no booking has been sent.</p>
              <Button onClick={close} variant="dark" className="mt-8" icon={false}>
                Close
              </Button>
            </div>
          ) : (
            <>
              <p className="eyebrow flex items-center gap-2 text-espresso">
                <CalendarDays aria-hidden className="size-4" strokeWidth={1.5} /> Reservations
              </p>
              <h2 id={`${uid}-title`} className="mt-4 text-[clamp(2.25rem,1.8rem+1.6vw,3rem)]">
                Reserve a <em className="italic">table.</em>
              </h2>
              <p className="mt-3 text-[0.9375rem] text-espresso">Tables for up to 10. For larger groups, please call ahead.</p>

              <form onSubmit={onSubmit} noValidate className="mt-7 grid gap-5 sm:grid-cols-2">
                <label className="eyebrow block text-espresso sm:col-span-2">
                  Name
                  <input
                    name="name"
                    autoComplete="name"
                    className={FIELD}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? `${uid}-name-error` : undefined}
                  />
                  {err("name")}
                </label>
                <label className="eyebrow block text-espresso sm:col-span-2">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={FIELD}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                  />
                  {err("email")}
                </label>
                <label className="eyebrow block text-espresso">
                  Date
                  <input
                    name="date"
                    type="date"
                    min={minDate}
                    className={FIELD}
                    aria-invalid={!!errors.date}
                    aria-describedby={errors.date ? `${uid}-date-error` : undefined}
                  />
                  {err("date")}
                </label>
                <label className="eyebrow block text-espresso">
                  Time
                  <select name="time" defaultValue="09:00" className={FIELD}>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </label>
                <label className="eyebrow block text-espresso sm:col-span-2">
                  Guests
                  <select name="guests" defaultValue="2" className={FIELD}>
                    {Array.from({ length: 10 }, (_, i) => String(i + 1)).map((n) => (
                      <option key={n} value={n}>
                        {n} {n === "1" ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </label>
                <div className="sm:col-span-2">
                  <Button type="submit" className="mt-2 w-full justify-center sm:w-auto">
                    Request Booking
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
