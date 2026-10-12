import type { Dictionary } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Index of the plan to highlight (Tier 1 — the plan shown first in the app's store).
const FEATURED = 1;

function Gem() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 shrink-0 text-violet" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 3h12l4 6-10 12L2 9l4-6Z" strokeLinejoin="round" />
      <path d="M2 9h20M12 21 8 9l4-6 4 6-4 12" strokeLinejoin="round" />
    </svg>
  );
}

export function Pricing({ dict }: { dict: Dictionary["premium"] }) {
  return (
    <section id="premium" data-anchor="premium" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dict.plans.map((plan, i) => {
            const featured = i === FEATURED;
            return (
              <Reveal
                key={plan.name}
                delay={i * 80}
                className={`relative flex flex-col rounded-3xl p-6 ${
                  featured
                    ? "border border-violet/70 bg-gradient-to-b from-violet/15 to-card shadow-[0_20px_60px_-20px_rgba(196,101,255,0.5)]"
                    : "border border-line bg-card/70"
                }`}
              >
                {featured && (
                  <span className="btn-primary absolute -top-3 left-6 rounded-full px-3 py-1 text-xs font-semibold">
                    {dict.popular}
                  </span>
                )}
                <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.blurb}</p>
                <p className="mt-6 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold tracking-tight">{plan.price}</span>
                  {i > 0 && <span className="text-sm text-muted">{dict.perMonth}</span>}
                </p>
                <p className="mt-1 h-5 text-xs text-lilac">{featured ? dict.yearlyNote : ""}</p>
                <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <Gem />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#download"
                  className={`mt-8 flex h-11 items-center justify-center rounded-full text-sm font-semibold transition ${
                    featured ? "btn-primary" : "border border-line-strong hover:bg-white/10"
                  }`}
                >
                  {dict.choose}
                </a>
              </Reveal>
            );
          })}
        </div>
        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-subtle">{dict.footnote}</p>
      </div>
    </section>
  );
}
