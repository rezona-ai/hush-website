import Image from "next/image";
import { characters, type Character } from "@/lib/characters";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { SectionHeading } from "./SectionHeading";

function CharacterCard({ character, lang, hidden }: { character: Character; lang: Locale; hidden?: boolean }) {
  return (
    <article
      aria-hidden={hidden || undefined}
      className="group relative aspect-[3/4.2] w-[200px] shrink-0 overflow-hidden rounded-2xl border border-line bg-card sm:w-[240px]"
    >
      <Image
        src={character.image}
        alt={hidden ? "" : character.name[lang]}
        fill
        sizes="240px"
        placeholder="blur"
        decoding="sync"
        className="object-cover object-top transition duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 bg-gradient-to-b from-transparent via-black/80 to-black px-3.5 pt-16 pb-3.5">
        <h3 className="text-sm leading-snug font-semibold text-white">{character.name[lang]}</h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted">{character.hook[lang]}</p>
        <div className="mt-1 flex flex-wrap gap-1">
          {character.tags[lang].map((tag) => (
            <span key={tag} className="rounded-full border border-line-strong px-2 py-0.5 text-[10px] text-zinc-300">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function MarqueeRow({ items, lang, reverse, animKey }: { items: Character[]; lang: Locale; reverse?: boolean; animKey: string }) {
  return (
    <div className="mask-fade-x flex overflow-hidden">
      <div
        data-anim-key={animKey}
        className={`flex w-max animate-marquee gap-4 pr-4 hover:[animation-play-state:paused] ${
          reverse ? "[animation-direction:reverse]" : ""
        }`}
      >
        {items.map((c) => (
          <CharacterCard key={c.id} character={c} lang={lang} />
        ))}
        {/* Duplicate set for a seamless loop */}
        {items.map((c) => (
          <CharacterCard key={`${c.id}-dup`} character={c} lang={lang} hidden />
        ))}
      </div>
    </div>
  );
}

export function CharacterMarquee({ dict, lang }: { dict: Dictionary["characters"]; lang: Locale }) {
  const half = Math.ceil(characters.length / 2);
  return (
    <section id="characters" data-anchor="characters" className="relative py-20 sm:py-28">
      <div className="px-4">
        <SectionHeading eyebrow={dict.eyebrow} title={dict.title} subtitle={dict.subtitle} />
      </div>
      <div className="mt-14 flex flex-col gap-4">
        <MarqueeRow items={characters.slice(0, half)} lang={lang} animKey="marquee-1" />
        <MarqueeRow items={characters.slice(half)} lang={lang} reverse animKey="marquee-2" />
      </div>
    </section>
  );
}
