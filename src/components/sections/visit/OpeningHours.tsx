"use client";

import { useEffect, useState } from "react";
import { HOURS } from "@/lib/site";

type Now = { day: number; hour: number };

function melbourneNow(): Now {
  const parts = new Intl.DateTimeFormat("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

/** Opening hours with a live "Open now" status in Melbourne time (computed client-side only). */
export default function OpeningHours() {
  const [now, setNow] = useState<Now | null>(null);

  useEffect(() => {
    const tick = () => setNow(melbourneNow());
    tick();
    const id = window.setInterval(tick, 60_000);
    return () => window.clearInterval(id);
  }, []);

  const today = now ? HOURS.find((h) => (h.days as readonly number[]).includes(now.day)) : undefined;
  const isOpen = !!(now && today && now.hour >= today.open && now.hour < today.close);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="eyebrow font-sans text-espresso">Opening Hours</h3>
        {now && (
          <span className="eyebrow inline-flex items-center gap-2 text-espresso">
            <span aria-hidden className={`size-1.5 rounded-full ${isOpen ? "bg-terracotta" : "bg-muted"}`} />
            {isOpen ? "Open now" : "Closed now"}
          </span>
        )}
      </div>
      <dl className="mt-4">
        {HOURS.map((h) => {
          const isToday = today === h;
          return (
            <div key={h.label} className="flex justify-between gap-4 border-b border-dotted border-ink/25 py-2.5 text-[0.9375rem] last:border-b-0">
              <dt className={isToday ? "font-semibold text-ink" : "text-espresso"}>
                {h.label}
                {isToday && <span className="sr-only"> (today)</span>}
              </dt>
              <dd className={`whitespace-nowrap ${isToday ? "font-semibold text-ink" : "text-espresso"}`}>{h.text}</dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
