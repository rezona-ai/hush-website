"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import iceKing from "@/public/images/characters/ice-king.webp";

type Line = { kind: string; text: string };
type Message = { from: "character"; lines: Line[] } | { from: "user"; text: string };

const TYPING_MS = 1500;

/** Renders `*action*` text the way the app does: italic and muted. */
function UserText({ text }: { text: string }) {
  const isAction = text.startsWith("*") && text.endsWith("*");
  return isAction ? <em className="text-zinc-300">{text.slice(1, -1)}</em> : <>{text}</>;
}

function CharacterBubble({ lines }: { lines: Line[] }) {
  return (
    <div className="max-w-[86%] self-start rounded-3xl bg-black/60 px-4 py-3 backdrop-blur-md">
      {lines.map((line, i) => (
        <p
          key={i}
          className={
            line.kind === "narration"
              ? "text-[13px] leading-relaxed text-muted"
              : "mt-2 text-[15px] leading-relaxed font-medium text-white first:mt-0"
          }
        >
          {line.text}
        </p>
      ))}
    </div>
  );
}

export function ChatDemo({ dict, ctaLabel }: { dict: Dictionary["demo"]; ctaLabel: string }) {
  const [messages, setMessages] = useState<Message[]>([{ from: "character", lines: dict.opening }]);
  const [round, setRound] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  const finished = round >= dict.rounds.length && !typing;

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const choose = (choiceIndex: number) => {
    if (typing || round >= dict.rounds.length) return;
    const choice = dict.rounds[round][choiceIndex];
    const isLastRound = round === dict.rounds.length - 1;
    setMessages((m) => [...m, { from: "user", text: choice.label }]);
    setTyping(true);
    setRound((r) => r + 1);
    later(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "character", lines: choice.reply }]);
      if (isLastRound) {
        setShowToast(true);
        later(() => setShowToast(false), 3200);
      }
    }, TYPING_MS);
  };

  const replay = () => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    setMessages([{ from: "character", lines: dict.opening }]);
    setRound(0);
    setTyping(false);
    setShowToast(false);
  };

  return (
    <div className="relative mx-auto flex h-[640px] w-full max-w-[420px] flex-col overflow-hidden rounded-[36px] border border-line bg-black shadow-[0_40px_120px_-40px_rgba(138,56,245,0.6)]">
      <Image src={iceKing} alt="" fill sizes="420px" placeholder="blur" decoding="sync" className="object-cover object-top opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/85" />

      {/* Header — mirrors the app's chat header */}
      <div className="relative z-10 flex items-center gap-2.5 px-4 pt-4 pb-3">
        <div className="relative size-9 overflow-hidden rounded-full border border-white/60">
          <Image src={iceKing} alt="" fill sizes="36px" className="object-cover object-top" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">{dict.name}</p>
          <p className="text-[11px] text-zinc-300">{dict.status}</p>
        </div>
        <span className="glass rounded-full px-2.5 py-1 text-[11px] text-zinc-200">{dict.model}</span>
      </div>

      {showToast && (
        <div
          role="status"
          className="glass absolute top-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/40 px-4 py-2.5 text-xs whitespace-nowrap shadow-lg"
        >
          <span className="text-violet">♥</span>
          {dict.affinity}
        </div>
      )}

      {/* Messages */}
      <div ref={listRef} className="no-scrollbar relative z-10 flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-4" aria-live="polite">
        {messages.map((m, i) =>
          m.from === "character" ? (
            <CharacterBubble key={i} lines={m.lines} />
          ) : (
            <div key={i} className="glass max-w-[80%] self-end rounded-3xl px-4 py-2.5 text-[14px] leading-relaxed">
              <UserText text={m.text} />
            </div>
          ),
        )}
        {typing && (
          <div className="flex items-center gap-2 self-start rounded-3xl bg-black/60 px-4 py-3 text-xs text-muted backdrop-blur-md">
            <span className="flex gap-1" aria-hidden>
              {[0, 1, 2].map((d) => (
                <span key={d} className="size-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: `${d * 150}ms` }} />
              ))}
            </span>
            {dict.typing}
          </div>
        )}
      </div>

      {/* Composer: inspiration choices, or the end card */}
      <div className="relative z-10 border-t border-white/10 bg-black/70 px-4 pt-3 pb-5 backdrop-blur-xl">
        {finished ? (
          <div className="flex flex-col items-center gap-3 py-2 text-center">
            <p className="font-display text-lg font-semibold">{dict.endTitle}</p>
            <p className="text-sm text-muted">{dict.endBody}</p>
            <div className="mt-1 flex gap-2">
              <a href="#download" className="btn-primary rounded-full px-5 py-2.5 text-sm font-semibold">
                {ctaLabel}
              </a>
              <button
                type="button"
                onClick={replay}
                className="rounded-full border border-line-strong px-5 py-2.5 text-sm text-zinc-200 transition hover:bg-white/10"
              >
                ↺ {dict.replay}
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="mb-2 flex items-center justify-center gap-1.5 text-xs text-zinc-300">
              <span aria-hidden>💡</span>
              {dict.inspiration}
            </p>
            <div className="flex flex-col gap-2">
              {dict.rounds[Math.min(round, dict.rounds.length - 1)].map((choice, i) => (
                <button
                  key={choice.label}
                  type="button"
                  disabled={typing}
                  onClick={() => choose(i)}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] px-3.5 py-2.5 text-left text-[13px] leading-snug text-zinc-100 transition hover:border-violet/60 hover:bg-violet/10 disabled:cursor-wait disabled:opacity-40"
                >
                  <span className="mr-1.5 font-semibold text-violet">{String.fromCharCode(65 + i)}.</span>
                  <UserText text={choice.label} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
