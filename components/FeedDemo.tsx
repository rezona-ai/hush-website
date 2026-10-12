"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { characters } from "@/lib/characters";
import type { Locale } from "@/lib/i18n";

const FEED_IDS = ["ice-king", "elf", "silver", "don"];
const feed = FEED_IDS.map((id) => characters.find((c) => c.id === id)!);
const AUTO_ADVANCE_MS = 3800;

type Props = { lang: Locale; startLabel: string };

/** A live, scrollable recreation of the app's home feed, rendered inside a PhoneFrame. */
export function FeedDemo({ lang, startLabel }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [userTookOver, setUserTookOver] = useState(false);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.6,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || userTookOver) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      const el = scroller.current;
      if (!el) return;
      const next = Math.round(el.scrollTop / el.clientHeight) + 1;
      el.scrollTo({ top: (next % feed.length) * el.clientHeight, behavior: "smooth" });
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [inView, userTookOver]);

  const stopAuto = () => setUserTookOver(true);

  return (
    <div className="relative h-full w-full bg-black text-white">
      <div
        ref={scroller}
        onWheel={stopAuto}
        onTouchStart={stopAuto}
        onPointerDown={stopAuto}
        className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-contain"
      >
        {feed.map((c, i) => (
          <div key={c.id} className="relative h-full w-full snap-start snap-always">
            <Image
              src={c.image}
              alt={c.name[lang]}
              fill
              sizes="300px"
              placeholder="blur"
              decoding="sync"
              className="object-cover object-top"
              loading={i === 0 ? "eager" : "lazy"}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />
            <div className="absolute inset-x-0 bottom-[17%] flex flex-col gap-2 px-2">
              <p className="line-clamp-2 rounded-lg bg-black/45 px-2.5 py-1.5 text-[10px] leading-snug text-zinc-100 backdrop-blur-sm">
                {c.hook[lang]}
              </p>
              <div className="flex items-center gap-2 px-0.5">
                <div className="relative size-9 shrink-0 overflow-hidden rounded-full border border-white/70">
                  <Image src={c.image} alt="" fill sizes="36px" className="object-cover object-top" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold">{c.name[lang]}</p>
                  <p className="truncate text-[10px] text-zinc-300">{c.tags[lang].join(" · ")}</p>
                </div>
                <span aria-hidden className="text-sm">★</span>
              </div>
              <div className="flex h-8 items-center justify-center rounded-xl bg-white/15 text-[11px] font-medium backdrop-blur-md">
                {startLabel}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Static chrome: status bar + bottom navigation, as in the app */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between px-6 pt-3 text-[11px] font-semibold">
        <span>9:41</span>
        <span className="flex items-center gap-1" aria-hidden>
          <span className="h-2 w-3 rounded-sm bg-white/90" />
          <span className="h-2.5 w-5 rounded-[3px] border border-white/80 p-px">
            <span className="block h-full w-3/4 rounded-[1px] bg-white" />
          </span>
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-2 bottom-[4%] flex items-center justify-between rounded-full border border-white/15 bg-black/60 p-1 backdrop-blur-md">
        {["home", "explore", "chat", "me"].map((item, i) => (
          <span
            key={item}
            className={`grid h-7 flex-1 place-items-center rounded-full ${i === 0 ? "bg-white/25" : ""}`}
          >
            <NavIcon name={item} active={i === 0} />
          </span>
        ))}
      </div>
    </div>
  );
}

function NavIcon({ name, active }: { name: string; active: boolean }) {
  const cls = `size-3.5 ${active ? "text-white" : "text-zinc-400"}`;
  const common = { viewBox: "0 0 24 24", className: cls, fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true } as const;
  switch (name) {
    case "home":
      return (
        <svg {...common} fill="currentColor" stroke="none">
          <path d="M12 3 3 10v10a1 1 0 0 0 1 1h5v-6h6v6h5a1 1 0 0 0 1-1V10l-9-7Z" />
        </svg>
      );
    case "explore":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 12a8 8 0 1 1 3.5 6.6L4 20l1.2-3.4A7.9 7.9 0 0 1 4 12Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      );
  }
}
