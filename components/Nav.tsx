"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { localeLabels, locales, type Locale } from "@/lib/i18n";
import { captureLocaleSwitch } from "@/lib/locale-switch";
import { Logo } from "./Logo";

type Props = { lang: Locale; dict: Dictionary["nav"] };

export function Nav({ lang, dict }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Layout effect so the header background is right on the first paint after a
  // language switch (the page remounts with the scroll position already restored).
  useLayoutEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The section links target the home page; on sub-pages (terms, privacy) they
  // navigate back to it. The language switch keeps the current sub-page.
  const pathname = usePathname();
  const subPath = pathname.replace(/^\/[^/]+/, "").replace(/^\/+|\/+$/g, "");
  const onHome = subPath === "";
  const section = (id: string) => (onHome ? `#${id}` : `/${lang}/#${id}`);
  const localeHref = (locale: Locale) => `/${locale}/${subPath ? `${subPath}/` : ""}`;

  const links = [
    { href: section("features"), label: dict.features },
    { href: section("characters"), label: dict.characters },
    { href: section("demo"), label: dict.demo },
    { href: section("premium"), label: dict.premium },
    { href: section("faq"), label: dict.faq },
  ];

  const switchLocale = (locale: Locale) => {
    if (locale !== lang) captureLocaleSwitch();
    try {
      localStorage.setItem("hush-locale", locale);
    } catch {
      // Storage may be unavailable (private mode); the URL still carries the locale.
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-black/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href={`/${lang}/`} aria-label="Hush AI" onClick={() => setOpen(false)}>
          <Logo size={26} />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="rounded-full px-3 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label={dict.language}
            className="flex rounded-full border border-line bg-white/5 p-0.5 text-xs"
          >
            {locales.map((locale) => (
              <Link
                key={locale}
                href={localeHref(locale)}
                scroll={false}
                onClick={() => switchLocale(locale)}
                aria-current={locale === lang ? "true" : undefined}
                className={`rounded-full px-2.5 py-1 transition ${
                  locale === lang ? "bg-white text-black" : "text-zinc-400 hover:text-white"
                }`}
              >
                {localeLabels[locale]}
              </Link>
            ))}
          </div>
          <Link
            href={section("download")}
            className="btn-primary hidden rounded-full px-4 py-2 text-sm font-semibold text-white sm:inline-flex"
          >
            {dict.cta}
          </Link>
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full border border-line bg-white/5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.close : dict.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line px-4 pb-6 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line py-4 text-lg text-zinc-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={section("download")}
            onClick={() => setOpen(false)}
            className="btn-primary mt-4 flex h-12 items-center justify-center rounded-full font-semibold"
          >
            {dict.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
