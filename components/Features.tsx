import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { screens } from "@/lib/screens";
import { PhoneFrame } from "./PhoneFrame";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Level orb colours mirror the affinity panel in the app.
const LEVEL_COLORS = ["#8aa1c1", "#4f6b4f", "#7a6a3a", "#3c3f66", "#6b3434"];

function Tags({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((tag) => (
        <li key={tag} className="glass rounded-full px-3 py-1.5 text-sm text-zinc-200">
          {tag}
        </li>
      ))}
    </ul>
  );
}

function LevelTrack({ levels }: { levels: string[] }) {
  return (
    <ol className="relative grid grid-cols-5 gap-1">
      <span
        aria-hidden
        className="absolute top-5 right-[10%] left-[10%] h-px bg-gradient-to-r from-white/40 via-violet/60 to-violet"
      />
      {levels.map((level, i) => (
        <li key={level} className="relative flex flex-col items-center gap-2 text-center">
          <span
            className="size-10 rounded-full border border-white/20 shadow-[inset_0_2px_8px_rgba(255,255,255,0.25)]"
            style={{ background: `radial-gradient(circle at 35% 30%, ${LEVEL_COLORS[i]}ee, ${LEVEL_COLORS[i]}66)` }}
          />
          <span className={`text-xs sm:text-sm ${i === 0 ? "font-semibold text-white" : "text-muted"}`}>{level}</span>
        </li>
      ))}
    </ol>
  );
}

type Phone = { screen: StaticImageData; alt: string };

function PhoneStack({ phones }: { phones: Phone[] }) {
  if (phones.length === 1) {
    return <PhoneFrame screen={phones[0].screen} alt={phones[0].alt} className="w-[250px] sm:w-[280px]" />;
  }
  if (phones.length === 2) {
    return (
      <div className="relative h-[520px] w-full max-w-[440px] sm:h-[580px]">
        <PhoneFrame screen={phones[0].screen} alt={phones[0].alt} className="absolute top-0 left-0 z-10 w-[58%] -rotate-3" />
        <PhoneFrame screen={phones[1].screen} alt={phones[1].alt} className="absolute top-[12%] right-0 w-[54%] rotate-6 opacity-90" />
      </div>
    );
  }
  return (
    <div className="relative h-[480px] w-full max-w-[500px] sm:h-[560px]">
      <PhoneFrame screen={phones[0].screen} alt={phones[0].alt} className="absolute top-[10%] left-0 w-[44%] -rotate-8 opacity-85" />
      <PhoneFrame screen={phones[2].screen} alt={phones[2].alt} className="absolute top-[10%] right-0 w-[44%] rotate-8 opacity-85" />
      <PhoneFrame screen={phones[1].screen} alt={phones[1].alt} className="absolute top-0 left-1/2 z-10 w-[50%] -translate-x-1/2" />
    </div>
  );
}

type RowProps = {
  index: number;
  title: string;
  body: string;
  extra: ReactNode;
  phones: Phone[];
  reverse?: boolean;
};

function FeatureRow({ index, title, body, extra, phones, reverse }: RowProps) {
  return (
    <div data-anchor={`feature-${index}`} className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <Reveal className={`flex flex-col gap-6 ${reverse ? "lg:order-2" : ""}`}>
        <span className="font-display text-sm font-semibold text-violet">0{index}</span>
        <h3 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">{title}</h3>
        <p className="text-base leading-relaxed text-pretty text-zinc-400 sm:text-lg">{body}</p>
        {extra}
      </Reveal>
      <Reveal delay={150} className="relative flex justify-center">
        <div aria-hidden className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/20 blur-[100px]" />
        <PhoneStack phones={phones} />
      </Reveal>
    </div>
  );
}

export function Features({ dict }: { dict: Dictionary["features"] }) {
  const { story, bond, secrets, yours } = dict.items;
  return (
    <section id="features" data-anchor="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} />
        <div className="mt-20 flex flex-col gap-28 sm:gap-36">
          <FeatureRow
            index={1}
            title={story.title}
            body={story.body}
            extra={<Tags items={story.tags} />}
            phones={[{ screen: screens.chat, alt: story.title }]}
          />
          <FeatureRow
            index={2}
            reverse
            title={bond.title}
            body={bond.body}
            extra={<LevelTrack levels={bond.levels} />}
            phones={[
              { screen: screens.affinity, alt: bond.title },
              { screen: screens.relationshipGuide, alt: "" },
            ]}
          />
          <FeatureRow
            index={3}
            title={secrets.title}
            body={secrets.body}
            extra={<Tags items={secrets.tags} />}
            phones={[
              { screen: screens.innerThought, alt: secrets.title },
              { screen: screens.daysTogether, alt: "" },
            ]}
          />
          <FeatureRow
            index={4}
            reverse
            title={yours.title}
            body={yours.body}
            extra={<Tags items={yours.tags} />}
            phones={[
              { screen: screens.chatStyle, alt: "" },
              { screen: screens.memoryModel, alt: yours.title },
              { screen: screens.persona, alt: "" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
