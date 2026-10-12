import { notFound } from "next/navigation";
import { CharacterMarquee } from "@/components/CharacterMarquee";
import { Cta } from "@/components/Cta";
import { DemoSection } from "@/components/DemoSection";
import { Discover } from "@/components/Discover";
import { Faq } from "@/components/Faq";
import { Features } from "@/components/Features";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LocaleScrollRestorer } from "@/components/LocaleScrollRestorer";
import { Nav } from "@/components/Nav";
import { Pricing } from "@/components/Pricing";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      {/* Keep first: restores the reading position before other components measure. */}
      <LocaleScrollRestorer />
      <Nav lang={lang} dict={dict.nav} />
      <main>
        <Hero dict={dict} />
        <CharacterMarquee dict={dict.characters} lang={lang} />
        <Discover dict={dict.discover} lang={lang} />
        <Features dict={dict.features} />
        <DemoSection dict={dict} />
        <Pricing dict={dict.premium} />
        <Faq dict={dict.faq} />
        <Cta dict={dict} />
      </main>
      <Footer dict={dict.footer} lang={lang} />
    </>
  );
}
