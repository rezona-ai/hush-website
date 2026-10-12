"use client";

import { useLayoutEffect } from "react";
import { restoreLocaleSwitch } from "@/lib/locale-switch";

/**
 * Must be rendered before every other client component on the page: React runs
 * sibling layout effects in order, so this restores the scroll position before
 * <Reveal> and <Nav> measure anything.
 */
export function LocaleScrollRestorer() {
  useLayoutEffect(() => {
    restoreLocaleSwitch();
  }, []);
  return null;
}
