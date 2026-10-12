import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale, htmlLang, locales } from "@/lib/i18n";
import type { LegalDoc } from "@/lib/legal";

/** Shared metadata for /[lang]/terms and /[lang]/privacy. */
export function legalMetadata(lang: string, doc: LegalDoc): Metadata {
  if (!hasLocale(lang)) return {};
  const { title, description } = getDictionary(lang).legal[doc];
  return {
    title: `${title} — Hush AI`,
    description,
    alternates: {
      canonical: `/${lang}/${doc}/`,
      languages: Object.fromEntries(locales.map((l) => [htmlLang[l], `/${l}/${doc}/`])),
    },
  };
}
