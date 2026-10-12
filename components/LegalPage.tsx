import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import type { LegalDoc, LegalDocument } from "@/lib/legal";
import { Footer } from "./Footer";
import { LegalArticle } from "./LegalArticle";
import { LocaleScrollRestorer } from "./LocaleScrollRestorer";
import { Nav } from "./Nav";

type Props = {
  lang: Locale;
  dict: Dictionary;
  doc: LegalDoc;
  content: LegalDocument;
};

function Toc({ sections, label }: { sections: LegalDocument["sections"]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-col gap-0.5 text-sm">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className="block rounded-lg px-3 py-1.5 leading-snug text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function LegalPage({ lang, dict, doc, content }: Props) {
  const t = dict.legal;
  const localizedTitle = t[doc].title;

  return (
    <>
      {/* Keep first: restores the reading position before other components measure. */}
      <LocaleScrollRestorer />
      <Nav lang={lang} dict={dict.nav} />
      <main className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(138,56,245,0.22),transparent)]" />

        <header data-anchor="legal-header" className="relative mx-auto max-w-6xl px-4 pt-32 pb-12 sm:px-6 sm:pt-40">
          <span className="rounded-full border border-violet/30 bg-violet/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-lilac">
            {t.eyebrow}
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{localizedTitle}</h1>
          {lang !== "en" && <p className="mt-2 text-lg text-zinc-400">{content.title}</p>}
          <div className="mt-5 flex flex-col gap-1 text-sm text-muted">
            {content.meta.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          {t.notice && (
            <p className="glass mt-8 inline-flex items-start gap-2 rounded-2xl px-4 py-3 text-sm text-zinc-200">
              <span aria-hidden className="text-violet">ⓘ</span>
              {t.notice}
            </p>
          )}
        </header>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <aside className="hidden lg:block">
            <div className="no-scrollbar sticky top-24 max-h-[calc(100dvh-8rem)] overflow-y-auto">
              <p className="mb-3 px-3 text-xs font-medium uppercase tracking-[0.14em] text-subtle">{t.toc}</p>
              <Toc sections={content.sections} label={t.toc} />
            </div>
          </aside>

          <div className="min-w-0">
            <details className="mb-10 rounded-2xl border border-line bg-card/60 px-4 lg:hidden">
              <summary className="cursor-pointer py-3.5 text-sm font-medium">{t.toc}</summary>
              <div className="pb-3">
                <Toc sections={content.sections} label={t.toc} />
              </div>
            </details>
            <LegalArticle markdown={content.body} lang="en" className="max-w-[72ch]" />
          </div>
        </div>
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
