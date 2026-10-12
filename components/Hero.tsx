import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { screens } from "@/lib/screens";
import { PhoneFrame } from "./PhoneFrame";
import { StoreButtons } from "./StoreButtons";

type Props = { dict: Dictionary };

function Chip({ children, className = "", animKey }: { children: ReactNode; className?: string; animKey: string }) {
  return (
    <div
      data-anim-key={animKey}
      className={`glass absolute z-20 flex items-center gap-2 rounded-full px-3.5 py-2 text-xs font-medium whitespace-nowrap text-white shadow-[0_8px_30px_rgba(0,0,0,0.4)] sm:text-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function Hero({ dict }: Props) {
  const t = dict.hero;
  return (
    <section data-anchor="hero" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 lg:pb-28">
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[-10%] left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-violet-deep/25 blur-[140px] lg:left-[72%]" />
        <div className="absolute top-[30%] left-[-10%] h-[420px] w-[420px] rounded-full bg-violet/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 lg:items-start px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-8">
        {/* Top-aligned on desktop so switching language (EN title wraps to 3 lines, ZH to 2) never moves the title or the phones. */}
        <div className="flex flex-col items-center text-center lg:items-start lg:pt-6 lg:text-left">
          <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-zinc-200 sm:text-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-violet" />
            </span>
            {t.eyebrow}
          </span>

          <h1 className="mt-6 font-display text-[44px] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-7xl lg:text-[84px] [&:lang(zh)]:leading-[1.15] [&:lang(zh)]:tracking-normal [&:lang(zh)]:lg:text-[68px]">
            {t.titleTop}
            <br />
            <span className="text-gradient">{t.titleAccent}</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-pretty text-zinc-300 sm:text-lg">{t.subtitle}</p>

          <StoreButtons dict={dict.store} className="mt-9 justify-center lg:justify-start" />
          <p className="mt-4 text-sm text-subtle">{t.note}</p>
        </div>

        {/* Phone composition */}
        <div className="relative mx-auto aspect-[520/600] w-full max-w-[520px]">
          <div className="absolute top-1/2 left-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/30 blur-[90px]" />

          <PhoneFrame
            screen={screens.chat}
            alt=""
            className="absolute top-[12%] left-[2%] w-[38%] -rotate-[9deg] opacity-80 sm:left-[4%]"
          />
          <PhoneFrame
            screen={screens.character}
            alt=""
            className="absolute top-[12%] right-[2%] w-[38%] rotate-[9deg] opacity-80 sm:right-[4%]"
          />
          <div data-anim-key="hero-phone" className="absolute top-0 left-1/2 z-10 w-[46%] -translate-x-1/2 animate-float">
            <PhoneFrame screen={screens.feed} alt="Hush AI home feed" priority />
          </div>

          <Chip animKey="chip-level" className="top-[16%] left-[-2%] animate-float-slow sm:left-[0%]">
            <span className="h-1.5 w-12 overflow-hidden rounded-full bg-white/15">
              <span className="block h-full w-2/3 rounded-full bg-mint" />
            </span>
            {t.chipLevel}
          </Chip>
          <Chip animKey="chip-thought" className="top-[54%] right-[-2%] animate-float [animation-delay:-2s] sm:right-[0%]">
            <span aria-hidden>💭</span>
            {t.chipThought}
          </Chip>
          <Chip animKey="chip-days" className="bottom-[4%] left-[6%] animate-float-slow [animation-delay:-4s]">
            <span aria-hidden className="text-violet">♥</span>
            {t.chipDays}
          </Chip>
        </div>
      </div>
    </section>
  );
}
