import { notFound } from "next/navigation";
import { LegalPage } from "@/components/LegalPage";
import { getDictionary } from "@/lib/dictionaries";
import { hasLocale } from "@/lib/i18n";
import { getLegalDocument } from "@/lib/legal";
import { legalMetadata } from "@/lib/legal-route";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">) {
  return legalMetadata((await params).lang, "terms");
}

export default async function TermsPage({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const content = await getLegalDocument("terms");
  return <LegalPage lang={lang} dict={getDictionary(lang)} doc="terms" content={content} />;
}
