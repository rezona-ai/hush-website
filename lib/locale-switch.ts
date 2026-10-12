/**
 * Keeps the reader's place when switching language.
 *
 * Switching /en/ ↔ /zh/ remounts the whole page, and the two locales have different
 * text lengths, so restoring the raw scrollY would land on different content. Instead
 * we remember which `[data-anchor]` block sits under the header and how far into it the
 * reader is, then put that same block back at the same spot after the new page mounts.
 * Long-running CSS animations tagged with `data-anim-key` (marquee, floating phones)
 * are resumed from where they were, so nothing visibly restarts.
 */

type Snapshot = {
  anchor: string;
  /** How far the reading line is into the anchor, as a fraction of its height. */
  progress: number;
  /** Raw scrollY, used when the reader was at the very top. */
  scrollY: number;
  animations: Record<string, number>;
};

/** The reading line: just below the fixed header. */
const READING_LINE = 64;

let pending: Snapshot | null = null;
let restoring = false;

export function captureLocaleSwitch() {
  const anchors = document.querySelectorAll<HTMLElement>("[data-anchor]");
  let current: HTMLElement | null = null;
  for (const el of anchors) {
    if (el.getBoundingClientRect().top <= READING_LINE) current = el;
    else break;
  }

  let anchor = "";
  let progress = 0;
  if (current) {
    const rect = current.getBoundingClientRect();
    anchor = current.dataset.anchor ?? "";
    progress = rect.height > 0 ? (READING_LINE - rect.top) / rect.height : 0;
  }

  const animations: Record<string, number> = {};
  document.querySelectorAll<HTMLElement>("[data-anim-key]").forEach((el) => {
    const time = el.getAnimations()[0]?.currentTime;
    if (typeof time === "number") animations[el.dataset.animKey!] = time;
  });

  pending = { anchor, progress, scrollY: window.scrollY, animations };
}

/**
 * Restores a pending snapshot. Call from a layout effect that runs before the
 * page's other effects, so it happens before the first paint of the new locale.
 * Returns true when a restore happened.
 */
export function restoreLocaleSwitch(): boolean {
  const snapshot = pending;
  pending = null;
  if (!snapshot) return false;

  let top = snapshot.scrollY;
  const el = snapshot.anchor
    ? document.querySelector<HTMLElement>(`[data-anchor="${snapshot.anchor}"]`)
    : null;
  if (el && snapshot.scrollY > 0) {
    const rect = el.getBoundingClientRect();
    top = window.scrollY + rect.top + snapshot.progress * rect.height - READING_LINE;
  }
  window.scrollTo({ top: Math.max(0, Math.round(top)), behavior: "instant" });

  document.querySelectorAll<HTMLElement>("[data-anim-key]").forEach((node) => {
    const time = snapshot.animations[node.dataset.animKey!];
    const animation = node.getAnimations()[0];
    if (animation && time !== undefined) animation.currentTime = time;
  });

  restoring = true;
  requestAnimationFrame(() => {
    restoring = false;
  });
  return true;
}

/** True while the page is being restored after a language switch (same commit). */
export const isRestoringLocaleSwitch = () => restoring;
