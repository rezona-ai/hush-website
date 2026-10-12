import type { Dictionary } from "@/lib/dictionaries";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Faq({ dict }: { dict: Dictionary["faq"] }) {
  return (
    <section id="faq" data-anchor="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <Reveal className="mt-14 flex flex-col gap-3">
          {dict.items.map((item, i) => (
            <details
              key={item.q}
              open={i === 0}
              className="group rounded-2xl border border-line bg-card/60 px-5 transition open:bg-card"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid size-7 shrink-0 place-items-center rounded-full border border-line-strong text-zinc-300 transition group-open:rotate-45 group-open:border-violet group-open:text-violet"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 leading-relaxed text-pretty text-zinc-400">{item.a}</p>
            </details>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
