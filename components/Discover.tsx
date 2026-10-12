import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { screens } from "@/lib/screens";
import { FeedDemo } from "./FeedDemo";
import { PhoneFrame } from "./PhoneFrame";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Discover({ dict, lang }: { dict: Dictionary["discover"]; lang: Locale }) {
  return (
    <section data-anchor="discover" className="relative py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.body} align="left" />
          <Reveal as="ul" className="flex flex-col gap-3" delay={120}>
            {dict.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-zinc-300">
                <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-violet/20 text-[11px] text-violet">
                  ✓
                </span>
                {point}
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="relative mx-auto flex h-[560px] w-full max-w-[460px] items-center justify-center sm:h-[620px]" delay={150}>
          <div className="absolute h-[80%] w-[80%] rounded-full bg-violet-deep/25 blur-[100px]" />
          <PhoneFrame
            screen={screens.explore}
            alt=""
            className="absolute top-[8%] right-0 w-[52%] rotate-6 opacity-60"
          />
          <div className="relative z-10 flex flex-col items-center gap-3 lg:-translate-x-[18%]">
            <PhoneFrame className="w-[260px] sm:w-[280px]">
              <FeedDemo lang={lang} startLabel={dict.start} />
            </PhoneFrame>
            <p className="text-xs text-subtle">↕ {dict.hint}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
