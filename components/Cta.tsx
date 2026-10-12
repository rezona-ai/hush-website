import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import group from "@/public/images/characters/group.webp";
import { Logo } from "./Logo";
import { Reveal } from "./Reveal";
import { StoreButtons } from "./StoreButtons";

export function Cta({ dict }: { dict: Dictionary }) {
  return (
    <section id="download" data-anchor="download" className="relative px-4 py-20 sm:px-6 sm:py-28">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-line bg-gradient-to-br from-deep via-[#160d24] to-black">
        <div aria-hidden className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-violet-deep/30 blur-[120px]" />
        <div className="relative grid items-center gap-6 lg:grid-cols-2">
          <div className="flex flex-col items-center gap-6 px-6 pt-14 text-center sm:px-12 lg:items-start lg:py-20 lg:text-left">
            <Logo size={34} />
            <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {dict.cta.title}
            </h2>
            <p className="text-lg text-zinc-300">{dict.cta.body}</p>
            <StoreButtons dict={dict.store} className="justify-center lg:justify-start" />
          </div>
          <div className="relative mx-auto w-full max-w-[420px] self-end lg:max-w-[460px] lg:pt-10">
            <Image
              src={group}
              alt=""
              sizes="(min-width: 1024px) 560px, 90vw"
              placeholder="blur"
              decoding="sync"
              className="h-auto w-full [mask-image:radial-gradient(ellipse_70%_70%_at_50%_55%,#000_55%,transparent_75%)]"
            />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
