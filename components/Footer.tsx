import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { Logo } from "./Logo";

// Operator and support address, as named in the Terms of Service and Privacy Policy.
const COMPANY = "LINKOVA PTE. LTD.";
const CONTACT_EMAIL = "contact@linkova.net";

export function Footer({ dict, lang }: { dict: Dictionary["footer"]; lang: Locale }) {
  const year = new Date().getFullYear();
  return (
    <footer data-anchor="footer" className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <Logo size={24} />
          <p className="text-sm text-muted">{dict.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-400">
          <Link href={`/${lang}/terms/`} className="transition hover:text-white">{dict.terms}</Link>
          <Link href={`/${lang}/privacy/`} className="transition hover:text-white">{dict.privacy}</Link>
          <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-white">{dict.contact}</a>
        </nav>
      </div>
      <p className="mx-auto max-w-6xl px-4 pb-10 text-xs text-subtle sm:px-6">
        © {year} {COMPANY} {dict.rights}
      </p>
    </footer>
  );
}
