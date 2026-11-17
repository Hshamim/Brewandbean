import { ArrowUp, ArrowUpRight } from "lucide-react";
import { CONTACT, HOURS, NAV_LINKS, SITE, SOCIAL, VISIT_CTA } from "@/lib/site";
import Newsletter from "@/components/sections/Newsletter";
import { BeanMark, Wordmark } from "@/components/ui/Brand";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-[0.9375rem] leading-relaxed text-sand">
      <h3 className="eyebrow mb-4 font-sans text-sand/90">{title}</h3>
      {children}
    </div>
  );
}

const LINK = "transition-colors duration-300 hover:text-ivory";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-night pt-[clamp(5rem,9vw,8.5rem)] text-ivory">
      <div className="container-editorial">
        <Newsletter />

        <div className="grid grid-cols-2 gap-x-8 gap-y-11 py-[clamp(3rem,5vw,4.5rem)] md:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_0.8fr_0.8fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Wordmark className="text-ivory" />
            <p className="mt-5 max-w-[30ch] text-[0.9375rem] leading-relaxed text-sand">{SITE.statement}</p>
          </div>

          <Column title="Visit">
            <address className="not-italic">
              {CONTACT.addressLines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <p className="mt-3">
              <a href={CONTACT.phoneHref} className={LINK}>
                {CONTACT.phoneDisplay}
              </a>
            </p>
            <p>
              <a href={`mailto:${CONTACT.email}`} className={LINK}>
                {CONTACT.email}
              </a>
            </p>
          </Column>

          <Column title="Hours">
            <dl>
              {HOURS.map((h) => (
                <div key={h.label}>
                  <dt className="inline">{h.label.replace("Monday – Friday", "Mon – Fri")}</dt>
                  <dd className="block text-ivory">{h.text}</dd>
                </div>
              ))}
            </dl>
          </Column>

          <Column title="Explore">
            <nav aria-label="Footer">
              <ul className="space-y-1">
                {[...NAV_LINKS, VISIT_CTA].map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className={LINK}>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </Column>

          <Column title="Follow">
            <ul className="space-y-1">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${LINK}`}>
                    {s.label}
                    <ArrowUpRight aria-hidden className="size-3.5" strokeWidth={1.5} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Column>
        </div>

        {/* Closing brand typography */}
        <p
          aria-hidden
          className="select-none whitespace-nowrap pt-2 text-center font-serif text-[clamp(4.25rem,18.5vw,19rem)] font-medium leading-[0.8] tracking-[-0.035em]"
        >
          Brew <em className="italic text-terracotta">&amp;</em> Bean
        </p>

        <div className="mt-[clamp(1.5rem,3vw,2.5rem)] flex flex-col gap-4 border-t border-ivory/15 pb-8 pt-7 text-xs text-sand md:flex-row md:items-center md:justify-between">
          <p className="inline-flex items-center gap-2.5 font-serif text-base text-ivory">
            <BeanMark className="size-4 text-terracotta" />
            {SITE.positioning}
          </p>
          <p>© {SITE.name}. A fictional brand for demonstration purposes.</p>
          <p>
            Designed &amp; developed by <span className="font-semibold text-ivory">Code Shikhor</span>
          </p>
          <a href="#top" className="eyebrow inline-flex items-center gap-1.5 text-ivory transition-colors hover:text-sand">
            Back to top <ArrowUp aria-hidden className="size-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
