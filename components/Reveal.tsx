"use client";

import { useLayoutEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { isRestoringLocaleSwitch } from "@/lib/locale-switch";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms. */
  delay?: number;
  as?: ElementType;
};

/** Fades and lifts its children in the first time they scroll into view. */
export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    // After a language switch the reader has already seen what's on screen:
    // show it immediately instead of replaying the entrance animation.
    if (isRestoringLocaleSwitch()) {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        // Jump straight to the visible state: disable the transition inline, flush
        // styles so the end state is committed, then hand the transition back.
        el.style.transition = "none";
        el.dataset.visible = "true";
        void getComputedStyle(el).opacity;
        el.style.removeProperty("transition");
        return;
      }
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.visible = "true";
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
